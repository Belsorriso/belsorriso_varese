const ELEMENT_TYPES = [
  { type: 'text', icon: '📝', label: 'Testo' },
  { type: 'image', icon: '🖼️', label: 'Immagine' },
  { type: 'code', icon: '💻', label: 'Codice HTML' },
  { type: 'shortcode', icon: '⚡', label: 'Shortcode' },
  { type: 'carousel', icon: '🎠', label: 'Carosello' },
];

function ElementPalette({ onSelect, onClose }) {
  return (
    <div className="pb-palette-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pb-palette">
        <div className="pb-palette-header">
          <h3>Aggiungi Elemento</h3>
          <button className="pb-palette-close" onClick={onClose}>×</button>
        </div>
        <div className="pb-palette-grid">
          {ELEMENT_TYPES.map((el) => (
            <button
              key={el.type}
              className="pb-palette-item"
              onClick={() => onSelect(el.type)}
            >
              <span className="pb-palette-item-icon">{el.icon}</span>
              <span className="pb-palette-item-label">{el.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ElementPalette;
