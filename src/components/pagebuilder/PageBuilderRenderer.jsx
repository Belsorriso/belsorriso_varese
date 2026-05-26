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
import { useAuth } from '../../admin/context/AuthContext';
import PageBuilderEditor from '../../admin/components/pagebuilder/PageBuilderEditor';
import ElementPalette from '../../admin/components/pagebuilder/ElementPalette';
import ElementSettings from '../../admin/components/pagebuilder/ElementSettings';
import { LAYOUTS, buildDefaultColumns } from '../../admin/components/pagebuilder/RowEditor';
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

/* ── live inline column editor ── */

function LiveColumnEditor({ column, onUpdateColumn }) {
  const [showPalette, setShowPalette] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  const handleAdd = (type) => {
    const newEl = { id: uuidv4(), type, settings: {} };
    const updated = { ...column, elements: [...(column.elements || []), newEl] };
    onUpdateColumn(updated);
    setShowPalette(false);
    setEditingElement(newEl);
  };

  const handleDelete = (elId) => {
    onUpdateColumn({ ...column, elements: (column.elements || []).filter(e => e.id !== elId) });
    if (editingElement?.id === elId) setEditingElement(null);
  };

  const handleUpdateEl = (updated) => {
    onUpdateColumn({ ...column, elements: (column.elements || []).map(e => e.id === updated.id ? updated : e) });
    setEditingElement(updated);
  };

  return (
    <div className="pbr-live-col-editor">
      {(column.elements || []).map(el => (
        <div key={el.id} className="pbr-live-el-wrapper">
          <div className="pbr-live-el-actions">
            <button className="pbr-live-el-btn" onClick={() => setEditingElement(el)} title="Modifica">✏️</button>
            <button className="pbr-live-el-btn danger" onClick={() => handleDelete(el.id)} title="Elimina">🗑️</button>
          </div>
          <ElementRenderer element={el} />
        </div>
      ))}
      <button className="pbr-live-add-el-btn" onClick={() => setShowPalette(true)}>
        + Aggiungi Elemento
      </button>
      {showPalette && <ElementPalette onSelect={handleAdd} onClose={() => setShowPalette(false)} />}
      {editingElement && (
        <ElementSettings
          element={editingElement}
          onChange={handleUpdateEl}
          onClose={() => setEditingElement(null)}
        />
      )}
    </div>
  );
}

function LiveCustomRowContent({ row, onUpdateRow }) {
  const settings = row.settings || {};
  const padding = PADDING_MAP[settings.padding] || PADDING_MAP.normal;
  const rowStyle = { padding, background: settings.background || undefined };
  const innerStyle = settings.fullWidth
    ? {}
    : { maxWidth: 1200, margin: '0 auto', padding: '0 20px' };

  const handleUpdateColumn = (updatedCol) => {
    onUpdateRow({ ...row, columns: (row.columns || []).map(c => c.id === updatedCol.id ? updatedCol : c) });
  };

  return (
    <div className="pbr-row" style={rowStyle}>
      <div className="pbr-row-inner" style={innerStyle}>
        <div className="pbr-columns">
          {(row.columns || []).map(col => (
            <div key={col.id} className="pbr-column" style={{ flex: col.width }}>
              <LiveColumnEditor column={col} onUpdateColumn={handleUpdateColumn} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── live-edit draggable row wrapper ── */

function DraggableRow({ row, onDelete, onUpdateRow }) {
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
  const isCustomRow = row.type !== 'section';

  return (
    <div ref={setNodeRef} style={style} className={`pbr-live-row-wrapper ${isDragging ? 'dragging' : ''}`}>
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
      {isCustomRow
        ? <LiveCustomRowContent row={row} onUpdateRow={onUpdateRow} />
        : <RowContent row={row} />
      }
    </div>
  );
}

/* ── layout picker modal (shown before inserting a new row) ── */

function LiveLayoutPicker({ onSelect, onClose }) {
  return (
    <div className="pbr-palette-overlay" onClick={onClose}>
      <div className="pbr-palette pbr-layout-picker-modal" onClick={e => e.stopPropagation()}>
        <div className="pbr-palette-header">
          <h3>Scegli il Layout</h3>
          <button className="pbr-palette-close" onClick={onClose}>✕</button>
        </div>
        <div className="pbr-layout-picker-grid">
          {LAYOUTS.map(l => (
            <button key={l.key} className="pbr-layout-picker-item" onClick={() => onSelect(l.key)}>
              <div className="pbr-layout-bars">
                {l.bars.map((bar, i) => (
                  <span key={i} className="pbr-layout-bar-preview" style={{ flex: parseFloat(bar.width) }} />
                ))}
              </div>
              <span className="pbr-layout-picker-label">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
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
  const [insertIndex, setInsertIndex] = useState(null);
  const { isEditMode, isAdmin } = useEditMode();
  const { getToken } = useAuth();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const loadBuilderData = useCallback(() => {
    if (!page) return;

    // Show defaults immediately — no spinner for public users
    const def = DEFAULT_BUILDER_DATA[page] || null;
    setSavedData(def);
    setLocalRows(def ? [...def.rows] : null);
    setLoading(false);

    // Fetch real data in background, update silently when ready
    fetch(`${API_BASE}/content/${page}`)
      .then(r => r.json())
      .then(data => {
        const builder = data.builder;
        if (builder && builder.rows && builder.rows.length > 0) {
          setSavedData(builder);
          setLocalRows([...builder.rows]);
        }
      })
      .catch(() => {/* keep defaults */});
  }, [page]);

  useEffect(() => { loadBuilderData(); }, [loadBuilderData]);

  // reset working copy when saved data changes
  useEffect(() => {
    if (savedData) setLocalRows([...savedData.rows]);
  }, [savedData]);

  const isDirty = localRows && savedData
    ? JSON.stringify(localRows) !== JSON.stringify(savedData.rows)
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
    setInsertIndex(index);
  };

  const handleLayoutSelected = (layoutKey) => {
    const newRow = {
      id: uuidv4(),
      layout: layoutKey,
      settings: { padding: 'normal', background: '', fullWidth: false },
      columns: buildDefaultColumns(layoutKey),
    };
    setLocalRows(prev => {
      const updated = [...prev];
      updated.splice(insertIndex, 0, newRow);
      return updated;
    });
    setInsertIndex(null);
  };

  const handleDeleteRow = (rowId) => {
    setLocalRows(prev => prev.filter(r => r.id !== rowId));
  };

  const handleUpdateRow = (updatedRow) => {
    setLocalRows(prev => prev.map(r => r.id === updatedRow.id ? updatedRow : r));
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
                {saving ? 'Salvataggio...' : '✓ Salva'}
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
                  <DraggableRow row={row} onDelete={handleDeleteRow} onUpdateRow={handleUpdateRow} />
                  <InsertZone onInsert={() => handleInsertAt(index + 1)} />
                </div>
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Layout picker modal */}
      {insertIndex !== null && (
        <LiveLayoutPicker
          onSelect={handleLayoutSelected}
          onClose={() => setInsertIndex(null)}
        />
      )}

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
