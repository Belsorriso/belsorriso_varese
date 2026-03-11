import { useState, useRef } from 'react';
import useApi from '../../../hooks/useApi';

function CarouselWidget({ settings, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);
  const api = useApi();

  const images = settings.images || [];

  const update = (key, val) => onChange({ ...settings, [key]: val });

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setUploadError('');
    try {
      const uploaded = [];
      for (const file of files) {
        const data = await api.upload('/media/upload', file);
        uploaded.push({ url: `http://localhost:5001${data.url}`, alt: data.alt || file.name });
      }
      onChange({ ...settings, images: [...images, ...uploaded] });
    } catch (err) {
      setUploadError(err.message || 'Errore nel caricamento');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (idx) => {
    update('images', images.filter((_, i) => i !== idx));
  };

  const moveImage = (idx, dir) => {
    const next = [...images];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    update('images', next);
  };

  return (
    <div className="pb-widget">
      <div className="pb-field">
        <label>Immagini Carosello ({images.length})</label>

        {/* Image list */}
        {images.length > 0 && (
          <div className="pb-image-list">
            {images.map((img, idx) => (
              <div key={idx} className="pb-image-list-item">
                <img src={img.url} alt={img.alt} />
                <span>{img.url.split('/').pop()}</span>
                <button
                  onClick={() => moveImage(idx, -1)}
                  disabled={idx === 0}
                  title="Sposta su"
                  style={{ fontSize: 12, color: '#6b7280' }}
                >
                  ▲
                </button>
                <button
                  onClick={() => moveImage(idx, 1)}
                  disabled={idx === images.length - 1}
                  title="Sposta giù"
                  style={{ fontSize: 12, color: '#6b7280' }}
                >
                  ▼
                </button>
                <button onClick={() => removeImage(idx)} title="Rimuovi">×</button>
              </div>
            ))}
          </div>
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
              <span>Clicca per scegliere immagini dal desktop</span>
              <span className="pb-upload-hint">Puoi selezionare più file contemporaneamente</span>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {uploadError && (
          <span className="pb-upload-error">{uploadError}</span>
        )}
      </div>

      <hr className="pb-divider" />

      <div className="pb-field-row">
        <div className="pb-field">
          <label>Velocità transizione (ms)</label>
          <input
            type="number"
            value={settings.speed || 3000}
            min={500}
            max={10000}
            step={500}
            onChange={(e) => update('speed', Number(e.target.value))}
          />
        </div>

        <div className="pb-field">
          <label>Autoplay</label>
          <select
            value={settings.autoplay !== false ? 'true' : 'false'}
            onChange={(e) => update('autoplay', e.target.value === 'true')}
          >
            <option value="true">Attivo</option>
            <option value="false">Disattivo</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default CarouselWidget;
