import { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../context/AuthContext';
import RowEditor, { buildDefaultColumns } from './RowEditor';
import { DEFAULT_BUILDER_DATA } from '../../../components/pagebuilder/defaultBuilderData';
import './pagebuilder.css';

import { API_URL as API_BASE } from '../../../config/api';

const PAGES = [
  { id: 'home', label: 'Home Page' },
  { id: 'stanze', label: 'Le Stanze' },
  { id: 'struttura', label: 'Struttura e Servizi' },
  { id: 'regolamento', label: 'Regolamento' },
  { id: 'territorio', label: 'Territorio' },
  { id: 'contatti', label: 'Contatti' },
  { id: 'footer', label: 'Footer' },
];

function PageBuilderEditor({ defaultPage, lockPage = false, onSaved }) {
  const [selectedPage, setSelectedPage] = useState(defaultPage || 'home');
  const [builderData, setBuilderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const { getToken } = useAuth();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchBuilderData = useCallback(async (page) => {
    setLoading(true);
    setSaveStatus('');
    try {
      const res = await fetch(`${API_BASE}/content/${page}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      const builderSection = data.builder;
      if (builderSection && builderSection.rows && builderSection.rows.length > 0) {
        setBuilderData(builderSection);
      } else {
        // Seed with default sections for this page, or empty if no defaults
        setBuilderData(DEFAULT_BUILDER_DATA[page] || { version: '1.0', rows: [] });
      }
    } catch {
      setBuilderData({ version: '1.0', rows: [] });
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchBuilderData(selectedPage);
  }, [selectedPage, fetchBuilderData]);

  const handlePageChange = (page) => {
    setSelectedPage(page);
    setBuilderData(null);
  };

  const makeNewRow = () => ({
    id: uuidv4(),
    layout: 'full',
    settings: { padding: 'normal', background: '', fullWidth: false },
    columns: buildDefaultColumns('full'),
  });

  const handleAddRow = () => {
    setBuilderData(prev => ({
      ...prev,
      rows: [...(prev.rows || []), makeNewRow()],
    }));
  };

  const handleInsertRowAt = (index) => {
    setBuilderData(prev => {
      const updated = [...prev.rows];
      updated.splice(index, 0, makeNewRow());
      return { ...prev, rows: updated };
    });
  };

  const handleDeleteRow = (rowId) => {
    setBuilderData(prev => ({
      ...prev,
      rows: prev.rows.filter(r => r.id !== rowId),
    }));
  };

  const handleUpdateRow = (updatedRow) => {
    setBuilderData(prev => ({
      ...prev,
      rows: prev.rows.map(r => r.id === updatedRow.id ? updatedRow : r),
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setBuilderData(prev => {
      const oldIndex = prev.rows.findIndex(r => r.id === active.id);
      const newIndex = prev.rows.findIndex(r => r.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return { ...prev, rows: arrayMove(prev.rows, oldIndex, newIndex) };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('');
    try {
      const res = await fetch(`${API_BASE}/content/${selectedPage}/builder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ content: builderData }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Errore nel salvataggio');
      }
      setSaveStatus('success');
      if (onSaved) onSaved();
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handlePreview = () => {
    const pageUrls = {
      home: '/',
      stanze: '/stanze',
      struttura: '/struttura-servizi',
      regolamento: '/regolamento',
      territorio: '/territorio',
      contatti: '/contatti',
      footer: '/',
    };
    window.open(pageUrls[selectedPage] || '/', '_blank');
  };

  const rows = builderData?.rows || [];

  return (
    <div className="pb-editor">
      <div className="pb-toolbar">
        <div className="pb-toolbar-left">
          {!lockPage && (
            <>
              <label htmlFor="pb-page-select" style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                Pagina:
              </label>
              <select
                id="pb-page-select"
                value={selectedPage}
                onChange={(e) => handlePageChange(e.target.value)}
              >
                {PAGES.map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </>
          )}
          {lockPage && (
            <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
              🧩 Page Builder — {PAGES.find(p => p.id === selectedPage)?.label || selectedPage}
            </span>
          )}

          {saveStatus === 'success' && (
            <span className="pb-message success">Salvato!</span>
          )}
          {saveStatus === 'error' && (
            <span className="pb-message error">Errore nel salvataggio</span>
          )}
        </div>

        <div className="pb-toolbar-right">
          {!lockPage && (
            <button className="pb-btn pb-btn-secondary" onClick={handlePreview}>
              Anteprima
            </button>
          )}
          <button
            className="pb-btn pb-btn-primary"
            onClick={handleSave}
            disabled={saving || loading || !builderData}
          >
            {saving ? 'Salvataggio...' : 'Salva'}
          </button>
        </div>
      </div>

      <div className="pb-canvas">
        {loading ? (
          <div className="pb-loading">Caricamento...</div>
        ) : rows.length === 0 ? (
          <div className="pb-empty-canvas">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="9" x2="9" y2="21" />
            </svg>
            <h3>Canvas Vuoto</h3>
            <p>Aggiungi la tua prima riga per iniziare a costruire la pagina.</p>
            <button className="pb-btn pb-btn-primary" onClick={handleAddRow}>
              + Aggiungi Prima Riga
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={rows.map(r => r.id)} strategy={verticalListSortingStrategy}>
              {/* Insert button before first row */}
              <div className="pb-insert-row-zone">
                <button className="pb-insert-row-btn" onClick={() => handleInsertRowAt(0)}>
                  <span className="pb-insert-row-line" />
                  <span className="pb-insert-row-plus">+ Inserisci riga</span>
                  <span className="pb-insert-row-line" />
                </button>
              </div>

              {rows.map((row, index) => (
                <div key={row.id}>
                  <RowEditor
                    row={row}
                    onUpdate={handleUpdateRow}
                    onDelete={handleDeleteRow}
                  />
                  {/* Insert button after each row */}
                  <div className="pb-insert-row-zone">
                    <button className="pb-insert-row-btn" onClick={() => handleInsertRowAt(index + 1)}>
                      <span className="pb-insert-row-line" />
                      <span className="pb-insert-row-plus">+ Inserisci riga</span>
                      <span className="pb-insert-row-line" />
                    </button>
                  </div>
                </div>
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}

export default PageBuilderEditor;
