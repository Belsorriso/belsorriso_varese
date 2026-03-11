import { useState } from 'react';

function CodeWidget({ settings, onChange }) {
  const [showPreview, setShowPreview] = useState(false);

  const update = (key, val) => onChange({ ...settings, [key]: val });

  return (
    <div className="pb-widget">
      <div className="pb-field">
        <label>HTML / CSS</label>
        <textarea
          rows={12}
          value={settings.code || ''}
          onChange={(e) => update('code', e.target.value)}
          placeholder="Inserisci HTML o CSS grezzo..."
          style={{ fontFamily: 'monospace', fontSize: 12 }}
        />
      </div>

      <div className="pb-field">
        <button className="pb-btn pb-btn-secondary" onClick={() => setShowPreview(v => !v)}>
          {showPreview ? 'Nascondi Anteprima' : 'Mostra Anteprima'}
        </button>
      </div>

      {showPreview && settings.code && (
        <div className="pb-code-preview">
          <div className="pb-code-preview-label">Anteprima</div>
          <div dangerouslySetInnerHTML={{ __html: settings.code }} />
        </div>
      )}
    </div>
  );
}

export default CodeWidget;
