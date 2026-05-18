import { useState } from 'react';
import { useEditMode } from '../../context/EditModeContext';
import { useContent } from '../../hooks/useContent';
import MediaLibrary from '../../admin/components/media/MediaLibrary';
import { API_BASE_URL } from '../../config/api';

function resolveUrl(url) {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `${API_BASE_URL}${url}`;
}

function EditableGallery({ page, section, defaultImages = [], altPrefix = 'Foto', imgStyle = {} }) {
  const { isEditMode, isAdmin } = useEditMode();
  const { getArray, updateSection } = useContent(page);
  const [current, setCurrent] = useState(0);
  const [showManager, setShowManager] = useState(false);
  const [showMediaLib, setShowMediaLib] = useState(false);

  const raw = getArray(section, defaultImages);
  const images = Array.isArray(raw) && raw.length > 0 ? raw : defaultImages;

  const handleSelectMedia = (media) => {
    const url = resolveUrl(media.url);
    updateSection(section, [...images, url]);
    setShowMediaLib(false);
  };

  const handleRemove = (idx) => {
    const updated = images.filter((_, i) => i !== idx);
    updateSection(section, updated);
    setCurrent(c => Math.min(c, Math.max(0, updated.length - 1)));
  };

  const defaultImgStyle = { width: '100%', height: '220px', objectFit: 'cover', display: 'block', ...imgStyle };

  return (
    <div style={{ position: 'relative' }}>
      {images.length > 0 ? (
        <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', marginBottom: 8 }}>
          <img
            src={resolveUrl(images[current])}
            alt={`${altPrefix} ${current + 1}`}
            loading="lazy"
            decoding="async"
            style={defaultImgStyle}
          />
          {images.length > 1 && (
            <>
              <button onClick={() => setCurrent(p => (p - 1 + images.length) % images.length)}
                style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>‹</button>
              <button onClick={() => setCurrent(p => (p + 1) % images.length)}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>›</button>
              <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                {images.map((_, i) => (
                  <span key={i} onClick={() => setCurrent(i)}
                    style={{ width: 8, height: 8, borderRadius: '50%', background: i === current ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'block' }} />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div style={{ height: 120, border: '2px dashed #d1d5db', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 13, marginBottom: 8 }}>
          Nessuna foto
        </div>
      )}

      {isEditMode && isAdmin && (
        <button
          onClick={() => setShowManager(true)}
          style={{ display: 'block', width: '100%', padding: '8px', background: '#f5f3ff', border: '2px dashed #c4b5fd', borderRadius: 8, color: '#7c3aed', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}
        >
          🖼️ Gestisci foto
        </button>
      )}

      {showManager && (
        <div className="media-modal-overlay" onClick={() => setShowManager(false)}>
          <div className="media-modal" style={{ maxWidth: 640 }} onClick={e => e.stopPropagation()}>
            <div className="media-modal-header">
              <h3>Gestisci Foto — {altPrefix}</h3>
              <button className="media-modal-close" onClick={() => setShowManager(false)}>×</button>
            </div>
            <div className="media-modal-content" style={{ padding: 16 }}>
              {images.length === 0 && (
                <p style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', marginBottom: 12 }}>Nessuna foto. Aggiungine una.</p>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                {images.map((url, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={resolveUrl(url)} alt={`Foto ${i + 1}`} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6 }} />
                    <button
                      onClick={() => handleRemove(i)}
                      style={{ position: 'absolute', top: 4, right: 4, background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 6px', cursor: 'pointer', fontSize: 12 }}
                    >✕</button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowMediaLib(true)}
                style={{ width: '100%', padding: '10px', background: '#f5f3ff', border: '2px dashed #c4b5fd', borderRadius: 8, color: '#7c3aed', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                + Aggiungi dalla libreria media
              </button>
            </div>
          </div>
        </div>
      )}

      {showMediaLib && (
        <div className="media-modal-overlay" onClick={() => setShowMediaLib(false)}>
          <div className="media-modal" onClick={e => e.stopPropagation()}>
            <div className="media-modal-header">
              <h3>Seleziona Immagine</h3>
              <button className="media-modal-close" onClick={() => setShowMediaLib(false)}>×</button>
            </div>
            <div className="media-modal-content">
              <MediaLibrary onSelect={handleSelectMedia} selectionMode={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditableGallery;
