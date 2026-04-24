import { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import { useEditMode } from '../../context/EditModeContext';
import PageBuilderEditor from '../../admin/components/pagebuilder/PageBuilderEditor';
import TextRenderer from './widgets/TextRenderer';
import ImageRenderer from './widgets/ImageRenderer';
import CodeRenderer from './widgets/CodeRenderer';
import ShortcodeRenderer from './widgets/ShortcodeRenderer';
import CarouselRenderer from './widgets/CarouselRenderer';
import { SECTION_REGISTRY } from '../sections/sectionRegistry';
import { DEFAULT_BUILDER_DATA } from './defaultBuilderData';
import './pagebuilder-public.css';
import { API_URL as API_BASE } from '../../config/api';

const PADDING_MAP = {
  none: '0',
  small: '16px 0',
  normal: '32px 0',
  large: '60px 0',
};

/* ── element / column / row renderers (read-only) ── */

function SectionRowRenderer({ row }) {
  const entry = SECTION_REGISTRY[row.sectionId];
  if (!entry) return null;
  const Component = entry.component;
  return <Component />;
}

function ElementRenderer({ element }) {
  const { type, settings = {} } = element;
  switch (type) {
    case 'text':      return <TextRenderer settings={settings} />;
    case 'image':     return <ImageRenderer settings={settings} />;
    case 'code':      return <CodeRenderer settings={settings} />;
    case 'shortcode': return <ShortcodeRenderer settings={settings} />;
    case 'carousel':  return <CarouselRenderer settings={settings} />;
    default:          return null;
  }
}

function ColumnRenderer({ column }) {
  return (
    <div className="pbr-column" style={{ flex: column.width }}>
      {(column.elements || []).map(el => (
        <div key={el.id} className="pbr-element">
          <ElementRenderer element={el} />
        </div>
      ))}
    </div>
  );
}

function RowContent({ row }) {
  if (row.type === 'section') return <SectionRowRenderer row={row} />;

  const settings = row.settings || {};
  const padding   = PADDING_MAP[settings.padding] || PADDING_MAP.normal;
  const rowStyle  = { padding, background: settings.background || undefined };
  const innerStyle = settings.fullWidth
    ? {}
    : { maxWidth: 1200, margin: '0 auto', padding: '0 20px' };

  return (
    <div className="pbr-row" style={rowStyle}>
      <div className="pbr-row-inner" style={innerStyle}>
        <div className="pbr-columns">
          {(row.columns || []).map(col => (
            <ColumnRenderer key={col.id} column={col} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── live-edit draggable row wrapper ── */

function DraggableRow({ row, onDelete, editMode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative',
    zIndex: isDragging ? 10 : undefined,
  };

  const sectionEntry = row.type === 'section' ? SECTION_REGISTRY[row.sectionId] : null;
  const label = sectionEntry ? sectionEntry.label : (row.layout ? `Riga — ${row.layout}` : 'Riga');

  return (
    <div ref={setNodeRef} style={style} className={`pbr-live-row-wrapper ${isDragging ? 'dragging' : ''}`}>
      {/* drag handle bar — always visible in edit mode */}
      <div className="pbr-live-row-handle">
        <span className="pbr-live-drag-icon" {...attributes} {...listeners} title="Trascina per riordinare">
          ⠿⠿
        </span>
        <span className="pbr-live-row-label">{label}</span>
        <button
          className="pbr-live-delete-btn"
          onClick={() => onDelete(row.id)}
          title="Rimuovi riga"
        >
          ✕
        </button>
      </div>
      <RowContent row={row} />
    </div>
  );
}

/* ── insert zone (visible on hover) ── */

function InsertZone({ onInsert }) {
  return (
    <div className="pbr-insert-zone">
      <button className="pbr-insert-zone-btn" onClick={onInsert}>
        <span className="pbr-insert-zone-line" />
        <span className="pbr-insert-zone-plus">+ Inserisci riga</span>
        <span className="pbr-insert-zone-line" />
      </button>
    </div>
  );
}

/* ── main component ── */

function PageBuilderRenderer({ page }) {
  const [savedData, setSavedData]   = useState(null);
  const [localRows, setLocalRows]   = useState(null); // working copy
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [modalOpen, setModalOpen]   = useState(false);
  const { isEditMode, isAdmin, getToken } = useEditMode();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const loadBuilderData = useCallback(() => {
    if (!page) return;
    setLoading(true);
    fetch(`${API_BASE}/content/${page}`)
      .then(r => r.json())
      .then(data => {
        const builder = data.builder;
        const resolved = (builder && builder.rows && builder.rows.length > 0)
          ? builder
          : (DEFAULT_BUILDER_DATA[page] || null);
        setSavedData(resolved);
        setLocalRows(resolved ? [...resolved.rows] : null);
      })
      .catch(() => {
        const def = DEFAULT_BUILDER_DATA[page] || null;
        setSavedData(def);
        setLocalRows(def ? [...def.rows] : null);
      })
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => { loadBuilderData(); }, [loadBuilderData]);

  // reset working copy when saved data changes
  useEffect(() => {
    if (savedData) setLocalRows([...savedData.rows]);
  }, [savedData]);

  const isDirty = localRows && savedData
    ? JSON.stringify(localRows.map(r => r.id)) !== JSON.stringify(savedData.rows.map(r => r.id))
      || localRows.length !== savedData.rows.length
    : false;

  /* ─ handlers ─ */

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setLocalRows(prev => {
      const oldIdx = prev.findIndex(r => r.id === active.id);
      const newIdx = prev.findIndex(r => r.id === over.id);
      if (oldIdx === -1 || newIdx === -1) return prev;
      return arrayMove(prev, oldIdx, newIdx);
    });
  };

  const handleInsertAt = (index) => {
    const newRow = {
      id: uuidv4(),
      layout: 'full',
      settings: { padding: 'normal', background: '', fullWidth: false },
      columns: [{ id: uuidv4(), width: 100, elements: [] }],
    };
    setLocalRows(prev => {
      const updated = [...prev];
      updated.splice(index, 0, newRow);
      return updated;
    });
  };

  const handleDeleteRow = (rowId) => {
    setLocalRows(prev => prev.filter(r => r.id !== rowId));
  };

  const handleSaveLayout = async () => {
    setSaving(true);
    setSaveStatus('');
    try {
      const payload = { ...(savedData || { version: '1.0' }), rows: localRows };
      const res = await fetch(`${API_BASE}/content/${page}/builder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ content: payload }),
      });
      if (!res.ok) throw new Error();
      setSavedData(payload);
      setSaveStatus('ok');
    } catch {
      setSaveStatus('err');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleModalSaved = () => {
    setModalOpen(false);
    loadBuilderData();
  };

  /* ─ render ─ */

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  const showEditBar = isEditMode && isAdmin;
  const rows = localRows || [];

  if (!rows.length && !showEditBar) return null;

  /* READ-ONLY mode (not in edit mode) */
  if (!showEditBar) {
    return (
      <div className="pbr-wrapper">
        {rows.map(row => <RowContent key={row.id} row={row} />)}
      </div>
    );
  }

  /* EDIT MODE — show live drag handles + insert zones */
  return (
    <>
      {/* Toolbar */}
      <div className="pbr-live-edit-bar">
        <span className="pbr-live-edit-label">🧩 Page Builder</span>
        <div className="pbr-live-edit-actions">
          {isDirty && (
            <>
              {saveStatus === 'ok'  && <span className="pbr-save-msg ok">Salvato!</span>}
              {saveStatus === 'err' && <span className="pbr-save-msg err">Errore</span>}
              <button
                className="pbr-live-edit-btn success"
                onClick={handleSaveLayout}
                disabled={saving}
              >
                {saving ? 'Salvataggio...' : '✓ Salva Ordine'}
              </button>
              <button
                className="pbr-live-edit-btn secondary"
                onClick={() => setLocalRows(savedData ? [...savedData.rows] : [])}
              >
                ↩ Annulla
              </button>
            </>
          )}
          <button className="pbr-live-edit-btn" onClick={() => setModalOpen(true)}>
            ✏️ Editor Avanzato
          </button>
        </div>
      </div>

      {/* Draggable rows with insert zones */}
      <div className="pbr-live-canvas">
        {rows.length === 0 ? (
          <div className="pbr-empty-live">
            <p>Nessuna riga. Aggiungi contenuto dall'Editor Avanzato.</p>
            <button className="pbr-live-edit-btn" onClick={() => setModalOpen(true)}>
              + Aggiungi Layout
            </button>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={rows.map(r => r.id)} strategy={verticalListSortingStrategy}>
              <InsertZone onInsert={() => handleInsertAt(0)} />
              {rows.map((row, index) => (
                <div key={row.id}>
                  <DraggableRow row={row} onDelete={handleDeleteRow} />
                  <InsertZone onInsert={() => handleInsertAt(index + 1)} />
                </div>
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Full editor modal (for element editing) */}
      {modalOpen && (
        <div className="pbr-modal-overlay">
          <div className="pbr-modal">
            <div className="pbr-modal-header">
              <span />
              <button className="pbr-modal-close" onClick={() => setModalOpen(false)}>
                ✕ Chiudi
              </button>
            </div>
            <div className="pbr-modal-body">
              <PageBuilderEditor defaultPage={page} lockPage onSaved={handleModalSaved} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PageBuilderRenderer;
