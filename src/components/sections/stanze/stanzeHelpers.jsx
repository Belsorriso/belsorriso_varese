import { useState } from 'react';
import EditableGallery from '../../editable/EditableGallery';
import { useContent } from '../../../hooks/useContent';
import MediaLibrary from '../../../admin/components/media/MediaLibrary';
import { API_BASE_URL } from '../../../config/api';

export function getSlug(nome) {
  const slugMap = {
    'Bordeaux': 'bordeaux',
    'Azzurra': 'azzurra',
    'Rossa': 'rossa',
    'Arancio': 'arancio',
    'Blu': 'blu',
    'Avorio': 'avorio',
    'Verde': 'verde',
    'Lilla A': 'lilla-a',
    'Lilla B': 'lilla-b',
    'Bilo 1B Comfort': 'bilo1b',
    'Bilo 2': 'bilo2',
    'Bilo 5': 'bilo5',
    'Bilo 6': 'bilo6',
    'Bilo 8': 'bilo8',
    'Mono 3': 'mono3',
    'Mono 4': 'mono4',
    'Mono 7': 'mono7',
    'Suite Mono 8': 'suitemono8',
    'Trilocale Superior 9': 'trilocale9',
  };
  return slugMap[nome] || nome.toLowerCase().replace(/\s+/g, '-');
}

export const roomImageMap = {
  'Bordeaux': { folder: 'lilla', count: 9 },
  'Azzurra': { folder: 'azzura', count: 8 },
  'Rossa': { folder: 'rosso', count: 6 },
  'Arancio': { folder: 'arancio', count: 8 },
  'Blu': { folder: 'blu', count: 8 },
  'Avorio': { folder: 'avorio', count: 6 },
  'Verde': { folder: 'verde', count: 7 },
  'Lilla A': { folder: 'bordeaux', count: 6 },
  'Lilla B': { folder: 'lillab', count: 7 },
  'Bilo 1B Comfort': { folder: 'bilo1b', count: 5 },
  'Bilo 2': { folder: 'bilo2', count: 7 },
  'Bilo 5': { folder: 'bilo5', count: 8 },
  'Bilo 6': { folder: 'bilo6', count: 6 },
  'Bilo 8': { folder: 'bilo8', count: 10 },
  'Mono 3': { folder: 'mono4e7', count: 8 },
  'Mono 4': { folder: 'mono4e7', count: 8 },
  'Mono 7': { folder: 'mono4e7', count: 8 },
  'Suite Mono 8': { folder: 'suitemono8', count: 8 },
  'Trilocale Superior 9': { folder: 'trilo9', count: 9 },
};

export const imageFiles = {
  bordeaux: ['1-IMG_9562.webp', '2-IMG_9572.webp', '3-IMG_9574.webp', '4-IMG_9577.webp', '5-IMG_9583.webp', '6-IMG_9584_jpg.webp'],
  azzura: ['1-IMG_9640.webp', '2-IMG_9647.webp', '3-IMG_9648.webp', '4-IMG_9651.webp', '5-IMG_9659.webp', '6-IMG_9660.webp', '7-IMG_9661.webp', '8-IMG_9662.webp'],
  rosso: ['1-IMG_1016.webp', '2-IMG_1019.webp', '3-IMG_1022.webp', '4-IMG_1025.webp', '5-IMG_1030.webp', '6-IMG_1035.webp'],
  arancio: ['1-IMG_0496.webp', '2-IMG_0507.webp', '3-IMG_0517.webp', '4-IMG_0519.webp', '5-IMG_0523.webp', '6-IMG_0526.webp', '7-IMG_0530.webp', '8-IMG_0532.webp'],
  blu: ['1-IMG_0270.webp', '2-IMG_0271.webp', '3-IMG_0272.webp', '4-IMG_0277.webp', '5-IMG_0279.webp', '6-IMG_0282.webp', '7-IMG_0290.webp', '8-IMG_0296.webp'],
  avorio: ['3-IMG_0392.webp', '4-IMG_0394.webp', '5-IMG_0395.webp', '6-IMG_0397.webp', '2-IMG_0387.webp', '1-IMG_0385.webp'],
  verde: ['2-IMG_4017.webp', '3-IMG_4045.webp', '4-IMG_4049.webp', '5-IMG_4053.webp', '6-IMG_4059.webp', '7-IMG_4063.webp', '1-IMG_4012.webp'],
  lilla: ['1-IMG_9378.webp', '2-IMG_9379.webp', '3-IMG_9386.webp', '4-IMG_9390.webp', '5-IMG_9392.webp', '6-IMG_9393.webp', '7-IMG_9394.webp', '8-IMG_9397.webp', '9-IMG_9412.webp'],
  lillab: ['1-IMG_0831.webp', '2-IMG_0833.webp', '3-IMG_0836.webp', '4-IMG_0838.webp', '5-IMG_0839.webp', '6-IMG_0841.webp', '7-IMG_0850.webp'],
  bilo1b: ['592029793.webp', '592029791.webp', '592029794.webp', 'bf9b3d58-e5e7-4fa4-a2ea-70470d047810.avif', 'e36bbf53-cc85-43be-8bec-a17a3c9d9983.avif'],
  mono4e7: ['3-IMG_0175.webp', '1-IMG_0167.webp', '2-IMG_0171.webp', '4-IMG_0176.webp', '5-IMG_0178.webp', '6-IMG_0180.webp', '7-IMG_0182.webp', '8-IMG_0184.webp'],
  suitemono8: ['1-IMG_5169.webp', '2-IMG_5172.webp', '3-IMG_5174.webp', '4-IMG_5175.webp', '5-IMG_5190.webp', '6-IMG_5192.webp', '7-IMG_5193.webp', '8-IMG_5199.webp'],
  bilo2: ['3-IMG_0745.webp', '1-IMG_0739.webp', '2-IMG_0740.webp', '4-IMG_0749.webp', '5-IMG_0750.webp', '6-IMG_0753.webp', '7-IMG_0754.webp'],
  bilo5: ['1-IMG_4739.webp', '2-IMG_4752.webp', '3-IMG_5230.webp', '4-IMG_5232.webp', '5-IMG_5235.webp', '6-IMG_5240.webp', '7-IMG_5241.webp', '8-IMG_5243.webp'],
  bilo6: ['2-IMG_1937.webp', '1-IMG_1935.webp', '3-IMG_1943.webp', '4-IMG_1944.webp', '5-IMG_1948.webp', '6-IMG_1949.webp'],
  bilo8: ['3-IMG_0787.webp', '1-IMG_0784.webp', '2-IMG_0786.webp', '4-IMG_0788.webp', '5-IMG_0790.webp', '6-IMG_0792.webp', '7-IMG_0794.webp', '8-IMG_0802.webp', '9-IMG_0803.webp', '10-IMG_0809.webp'],
  trilo9: ['1-IMG_5150.webp', '2-IMG_5154.webp', '3-IMG_5156.webp', '4-IMG_5158.webp', '5-IMG_5160.webp', '6-IMG_5163.webp', '7-IMG_5164.webp', '8-IMG_5165.webp', '9-IMG_5166.webp'],
};

function getRoomDefaultImages(roomName) {
  const info = roomImageMap[roomName];
  if (!info) return [];
  return (imageFiles[info.folder] || []).map(f => `/images/stanze/${info.folder}/${f}`);
}

function resolveUrl(url) {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `${API_BASE_URL}${url}`;
}

export function RoomPhotoEditor({ roomName }) {
  const slug = getSlug(roomName);
  const defaultImages = getRoomDefaultImages(roomName);
  const { getArray, updateSection } = useContent('stanze');
  const [current, setCurrent] = useState(0);
  const [showManager, setShowManager] = useState(false);
  const [showMediaLib, setShowMediaLib] = useState(false);

  const raw = getArray(`gallery-${slug}`, defaultImages);
  const images = Array.isArray(raw) && raw.length > 0 ? raw : defaultImages;

  const handleSelectMedia = (media) => {
    const url = resolveUrl(media.url);
    updateSection(`gallery-${slug}`, [...images, url]);
    setShowMediaLib(false);
  };

  const handleRemove = (idx) => {
    const updated = images.filter((_, i) => i !== idx);
    updateSection(`gallery-${slug}`, updated);
    setCurrent(c => Math.min(c, Math.max(0, updated.length - 1)));
  };

  return (
    <div>
      {images.length > 0 && (
        <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
          <img
            src={resolveUrl(images[current])}
            alt={`${roomName} ${current + 1}`}
            style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
          />
          {images.length > 1 && (
            <>
              <button onClick={() => setCurrent(p => (p - 1 + images.length) % images.length)}
                style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>‹</button>
              <button onClick={() => setCurrent(p => (p + 1) % images.length)}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>›</button>
            </>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={() => setShowManager(true)}
        style={{ display: 'block', width: '100%', padding: '10px', background: '#f5f3ff', border: '2px dashed #c4b5fd', borderRadius: 8, color: '#7c3aed', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}
      >
        🖼️ Gestisci foto ({images.length})
      </button>

      {showManager && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowManager(false)}>
          <div style={{ background: '#fff', borderRadius: 12, maxWidth: 640, width: '90%', maxHeight: '80vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: 16 }}>Foto — {roomName}</h3>
              <button onClick={() => setShowManager(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: 16 }}>
              {images.length === 0 && <p style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center' }}>Nessuna foto.</p>}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                {images.map((url, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={resolveUrl(url)} alt={`Foto ${i + 1}`} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6 }} />
                    <button type="button" onClick={() => handleRemove(i)}
                      style={{ position: 'absolute', top: 4, right: 4, background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 6px', cursor: 'pointer', fontSize: 12 }}>✕</button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setShowMediaLib(true)}
                style={{ width: '100%', padding: '10px', background: '#f5f3ff', border: '2px dashed #c4b5fd', borderRadius: 8, color: '#7c3aed', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                + Aggiungi dalla libreria media
              </button>
            </div>
          </div>
        </div>
      )}

      {showMediaLib && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowMediaLib(false)}>
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

export function RoomGallery({ roomName, forceManage = false }) {
  const defaultImages = getRoomDefaultImages(roomName);
  const slug = getSlug(roomName);
  return (
    <div className="room-gallery">
      <div className="room-gallery-main">
        <EditableGallery
          page="stanze"
          section={`gallery-${slug}`}
          defaultImages={defaultImages}
          altPrefix={roomName}
          imgStyle={{ width: '100%', height: '220px', objectFit: 'cover' }}
          forceManage={forceManage}
        />
      </div>
    </div>
  );
}
