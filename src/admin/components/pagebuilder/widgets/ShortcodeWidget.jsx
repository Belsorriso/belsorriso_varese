const SHORTCODES = [
  {
    id: 'booking-button',
    label: 'Pulsante Prenotazione',
    params: [
      { key: 'label', label: 'Testo Pulsante', default: 'Prenota Ora' },
      { key: 'url', label: 'URL Prenotazione', default: 'https://belsorrisovarese.kross.travel/' },
    ],
  },
  {
    id: 'google-map',
    label: 'Google Maps',
    params: [
      { key: 'address', label: 'Indirizzo', default: 'Piazza Biroldi, 8, 21100 Varese VA' },
      { key: 'height', label: 'Altezza (px)', default: '350' },
    ],
  },
  {
    id: 'phone-cta',
    label: 'CTA Telefono',
    params: [
      { key: 'phone', label: 'Numero di Telefono', default: '+39 342 1895829' },
      { key: 'label', label: 'Testo', default: 'Chiamaci' },
    ],
  },
  {
    id: 'social-links',
    label: 'Link Social',
    params: [
      { key: 'facebook', label: 'Facebook URL', default: '' },
      { key: 'instagram', label: 'Instagram URL', default: '' },
      { key: 'tripadvisor', label: 'TripAdvisor URL', default: '' },
    ],
  },
];

function ShortcodeWidget({ settings, onChange }) {
  const selected = settings.shortcode || '';
  const params = settings.params || {};

  const shortcodeDef = SHORTCODES.find(s => s.id === selected);

  const handleShortcodeChange = (id) => {
    const def = SHORTCODES.find(s => s.id === id);
    const defaultParams = {};
    if (def) {
      def.params.forEach(p => { defaultParams[p.key] = p.default; });
    }
    onChange({ ...settings, shortcode: id, params: defaultParams });
  };

  const handleParamChange = (key, val) => {
    onChange({ ...settings, params: { ...params, [key]: val } });
  };

  return (
    <div className="pb-widget">
      <div className="pb-field">
        <label>Tipo di Shortcode</label>
        <select value={selected} onChange={(e) => handleShortcodeChange(e.target.value)}>
          <option value="">-- Seleziona shortcode --</option>
          {SHORTCODES.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      {shortcodeDef && (
        <div className="pb-shortcode-params">
          <h4>Parametri</h4>
          {shortcodeDef.params.map(p => (
            <div className="pb-field" key={p.key} style={{ marginBottom: 10 }}>
              <label>{p.label}</label>
              <input
                type="text"
                value={params[p.key] !== undefined ? params[p.key] : p.default}
                onChange={(e) => handleParamChange(p.key, e.target.value)}
                placeholder={p.default}
              />
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="pb-field">
          <label>Preview Shortcode</label>
          <code style={{ background: '#f3f4f6', padding: '6px 10px', borderRadius: 4, fontSize: 12 }}>
            [{selected}]
          </code>
        </div>
      )}
    </div>
  );
}

export default ShortcodeWidget;
