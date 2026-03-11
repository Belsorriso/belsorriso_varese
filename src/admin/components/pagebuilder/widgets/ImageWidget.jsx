import { useState, useRef } from 'react';
import useApi from '../../../hooks/useApi';

function ImageWidget({ settings, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);
  const api = useApi();

  const update = (key, val) => onChange({ ...settings, [key]: val });

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');
    try {
      const data = await api.upload('/media/upload', file);
      onChange({
        ...settings,
        src: `http://localhost:5001${data.url}`,
        alt: settings.alt || data.alt || file.name,
      });
    } catch (err) {
      setUploadError(err.message || 'Errore nel caricamento');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="pb-widget">
      <div className="pb-field">
        <label>Immagine</label>

        {settings.src && (
          <img
            src={settings.src}
            alt={settings.alt || ''}
            style={{
              maxWidth: '100%',
              maxHeight: 120,
              objectFit: 'contain',
              borderRadius: 6,
              border: '1px solid #e5e7eb',
              marginBottom: 8,
              display: 'block',
            }}
          />
        )}

        {/* Upload area */}
        <div
          className="pb-upload-area"
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          {uploading ? (
            <span>Caricamento in corso...</span>
          ) : (
            <>
              <span className="pb-upload-icon">📁</span>
              <span>{settings.src ? 'Clicca per cambiare immagine' : 'Clicca per scegliere immagine dal desktop'}</span>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {uploadError && (
          <span className="pb-upload-error">{uploadError}</span>
        )}
      </div>

      <div className="pb-field">
        <label>Testo Alt</label>
        <input
          type="text"
          value={settings.alt || ''}
          onChange={(e) => update('alt', e.target.value)}
          placeholder="Descrizione immagine..."
        />
      </div>

      <div className="pb-field">
        <label>Link (opzionale)</label>
        <input
          type="url"
          value={settings.link || ''}
          onChange={(e) => update('link', e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="pb-field-row">
        <div className="pb-field">
          <label>Allineamento</label>
          <div className="pb-align-group">
            {['left', 'center', 'right'].map(a => (
              <button
                key={a}
                className={`pb-align-btn ${(settings.align || 'center') === a ? 'active' : ''}`}
                onClick={() => update('align', a)}
                title={a}
              >
                {a === 'left' ? '⬅' : a === 'center' ? '↔' : '➡'}
              </button>
            ))}
          </div>
        </div>

        <div className="pb-field">
          <label>Larghezza</label>
          <select value={settings.width || '100%'} onChange={(e) => update('width', e.target.value)}>
            <option value="25%">25%</option>
            <option value="50%">50%</option>
            <option value="75%">75%</option>
            <option value="100%">100%</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ImageWidget;
