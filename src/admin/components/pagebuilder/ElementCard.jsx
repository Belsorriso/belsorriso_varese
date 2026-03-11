import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TYPE_ICONS = {
  text: '📝',
  image: '🖼️',
  code: '💻',
  shortcode: '⚡',
  carousel: '🎠',
};

const TYPE_LABELS = {
  text: 'Testo',
  image: 'Immagine',
  code: 'Codice HTML',
  shortcode: 'Shortcode',
  carousel: 'Carosello',
};

function ElementPreview({ element }) {
  const { type, settings = {} } = element;

  if (type === 'text') {
    const text = settings.content ? settings.content.replace(/<[^>]*>/g, '').slice(0, 80) : '(vuoto)';
    return <div className="pb-element-preview text-preview">{text}{text.length >= 80 ? '...' : ''}</div>;
  }

  if (type === 'image') {
    if (settings.src) {
      return (
        <div className="pb-element-preview">
          <img src={settings.src} alt={settings.alt || ''} />
        </div>
      );
    }
    return <div className="pb-element-preview" style={{ color: '#9ca3af' }}>Nessuna immagine selezionata</div>;
  }

  if (type === 'code') {
    const code = settings.code ? settings.code.slice(0, 60) : '(vuoto)';
    return <div className="pb-element-preview" style={{ fontFamily: 'monospace', fontSize: 11 }}>{code}</div>;
  }

  if (type === 'shortcode') {
    return (
      <div className="pb-element-preview">
        {settings.shortcode ? <code>[{settings.shortcode}]</code> : <span style={{ color: '#9ca3af' }}>Nessuno shortcode selezionato</span>}
      </div>
    );
  }

  if (type === 'carousel') {
    const count = (settings.images || []).length;
    return <div className="pb-element-preview">{count} immagini nel carosello</div>;
  }

  return null;
}

function ElementCard({ element, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`pb-element-card ${isDragging ? 'dragging' : ''}`}
    >
      <div className="pb-element-header">
        <span className="pb-drag-handle" {...attributes} {...listeners} title="Trascina per riordinare">
          ⠿
        </span>
        <span className="pb-element-type-badge">
          {TYPE_ICONS[element.type]} {TYPE_LABELS[element.type] || element.type}
        </span>
        <div className="pb-element-actions">
          <button className="pb-icon-btn" onClick={() => onEdit(element)} title="Modifica">
            ✏️
          </button>
          <button className="pb-icon-btn danger" onClick={() => onDelete(element.id)} title="Elimina">
            🗑️
          </button>
        </div>
      </div>
      <ElementPreview element={element} />
    </div>
  );
}

export default ElementCard;
