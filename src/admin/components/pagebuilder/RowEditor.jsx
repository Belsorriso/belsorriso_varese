import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import ColumnEditor from './ColumnEditor';
import { SECTION_REGISTRY } from '../../../components/sections/sectionRegistry';

const LAYOUTS = [
  {
    key: 'full',
    label: 'Pieno',
    bars: [{ width: '100%' }],
    columns: [{ width: 100 }],
  },
  {
    key: 'two-cols-equal',
    label: '2 Colonne Uguali',
    bars: [{ width: '48%' }, { width: '48%' }],
    columns: [{ width: 50 }, { width: 50 }],
  },
  {
    key: 'two-cols-left',
    label: '1/3 + 2/3',
    bars: [{ width: '30%' }, { width: '66%' }],
    columns: [{ width: 33 }, { width: 67 }],
  },
  {
    key: 'two-cols-right',
    label: '2/3 + 1/3',
    bars: [{ width: '66%' }, { width: '30%' }],
    columns: [{ width: 67 }, { width: 33 }],
  },
  {
    key: 'three-cols',
    label: '3 Colonne',
    bars: [{ width: '30%' }, { width: '30%' }, { width: '30%' }],
    columns: [{ width: 33 }, { width: 33 }, { width: 34 }],
  },
  {
    key: 'sidebar-left',
    label: 'Sidebar Sinistra',
    bars: [{ width: '25%' }, { width: '71%' }],
    columns: [{ width: 30 }, { width: 70 }],
  },
  {
    key: 'sidebar-right',
    label: 'Sidebar Destra',
    bars: [{ width: '71%' }, { width: '25%' }],
    columns: [{ width: 70 }, { width: 30 }],
  },
];

const PADDING_OPTIONS = ['none', 'small', 'normal', 'large'];

function buildDefaultColumns(layout) {
  const def = LAYOUTS.find(l => l.key === layout) || LAYOUTS[0];
  return def.columns.map(col => ({
    id: uuidv4(),
    width: col.width,
    elements: [],
  }));
}

function SectionRow({ row, onDelete, setNodeRef, style, attributes, listeners, isDragging }) {
  const sectionInfo = SECTION_REGISTRY[row.sectionId];
  const label = sectionInfo ? sectionInfo.label : row.sectionId;

  return (
    <div ref={setNodeRef} style={style} className={`pb-row pb-section-row ${isDragging ? 'dragging' : ''}`}>
      <div className="pb-row-header">
        <span className="pb-drag-handle" {...attributes} {...listeners} title="Trascina per riordinare">
          ⠿
        </span>
        <span className="pb-section-badge">SEZIONE</span>
        <span className="pb-row-label">{label}</span>
        <div className="pb-row-actions">
          <button className="pb-icon-btn danger" onClick={() => onDelete(row.id)} title="Rimuovi sezione">
            🗑️
          </button>
        </div>
      </div>
      <div className="pb-section-preview">
        Questa riga contiene la sezione <strong>{label}</strong>. Trascina per riordinarla.
      </div>
    </div>
  );
}

function RowEditor({ row, onUpdate, onDelete }) {
  const [showSettings, setShowSettings] = useState(false);

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
  };

  // Section rows use a simplified display, passing sortable props down
  if (row.type === 'section') {
    return (
      <SectionRow
        row={row}
        onDelete={onDelete}
        setNodeRef={setNodeRef}
        style={style}
        attributes={attributes}
        listeners={listeners}
        isDragging={isDragging}
      />
    );
  }

  const currentLayout = LAYOUTS.find(l => l.key === row.layout) || LAYOUTS[0];

  const handleLayoutChange = (layoutKey) => {
    const def = LAYOUTS.find(l => l.key === layoutKey);
    if (!def) return;

    const existingCols = row.columns || [];
    const newCols = def.columns.map((colDef, idx) => {
      const existing = existingCols[idx];
      return {
        id: existing ? existing.id : uuidv4(),
        width: colDef.width,
        elements: existing ? existing.elements : [],
      };
    });

    onUpdate({ ...row, layout: layoutKey, columns: newCols });
  };

  const handleColumnUpdate = (updatedColumn) => {
    const columns = row.columns.map(col =>
      col.id === updatedColumn.id ? updatedColumn : col
    );
    onUpdate({ ...row, columns });
  };

  const handleSettingChange = (key, val) => {
    onUpdate({ ...row, settings: { ...(row.settings || {}), [key]: val } });
  };

  const settings = row.settings || {};

  return (
    <div ref={setNodeRef} style={style} className={`pb-row ${isDragging ? 'dragging' : ''}`}>
      <div className="pb-row-header">
        <span className="pb-drag-handle" {...attributes} {...listeners} title="Trascina per riordinare">
          ⠿
        </span>
        <span className="pb-row-label">Riga — {currentLayout.label}</span>
        <div className="pb-row-actions">
          <button
            className="pb-row-settings-toggle"
            onClick={() => setShowSettings(v => !v)}
            title="Impostazioni riga"
          >
            ⚙ {showSettings ? '▲' : '▼'}
          </button>
          <button className="pb-icon-btn danger" onClick={() => onDelete(row.id)} title="Elimina riga">
            🗑️
          </button>
        </div>
      </div>

      {/* Layout Picker */}
      <div className="pb-layout-picker">
        <label>Layout:</label>
        {LAYOUTS.map(l => (
          <button
            key={l.key}
            className={`pb-layout-option ${row.layout === l.key ? 'active' : ''}`}
            onClick={() => handleLayoutChange(l.key)}
            title={l.label}
          >
            {l.bars.map((bar, i) => (
              <span key={i} className="pb-layout-bar" style={{ width: bar.width }} />
            ))}
          </button>
        ))}
      </div>

      {/* Row Settings (collapse) */}
      {showSettings && (
        <div className="pb-row-settings">
          <div className="pb-setting-group">
            <label>Padding:</label>
            <select
              value={settings.padding || 'normal'}
              onChange={(e) => handleSettingChange('padding', e.target.value)}
            >
              {PADDING_OPTIONS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="pb-setting-group">
            <label>Sfondo:</label>
            <input
              type="color"
              value={settings.background || '#ffffff'}
              onChange={(e) => handleSettingChange('background', e.target.value)}
            />
            <input
              type="text"
              value={settings.background || ''}
              onChange={(e) => handleSettingChange('background', e.target.value)}
              placeholder="#ffffff o URL immagine"
              style={{ width: 160 }}
            />
          </div>

          <div className="pb-setting-group">
            <label>
              <input
                type="checkbox"
                checked={settings.fullWidth || false}
                onChange={(e) => handleSettingChange('fullWidth', e.target.checked)}
              />
              {' '}Larghezza Piena
            </label>
          </div>
        </div>
      )}

      {/* Columns */}
      <div className="pb-columns">
        {(row.columns || []).map(col => (
          <div
            key={col.id}
            className="pb-column"
            style={{ flex: col.width }}
          >
            <ColumnEditor
              column={col}
              rowId={row.id}
              onUpdate={handleColumnUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export { buildDefaultColumns };
export default RowEditor;
