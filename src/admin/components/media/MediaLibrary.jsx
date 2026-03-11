import { useState, useEffect, useRef } from 'react';
import useApi from '../../hooks/useApi';

function MediaLibrary({ onSelect, selectionMode = false }) {
  const [media, setMedia] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);
  const api = useApi();

  useEffect(() => {
    fetchMedia();
  }, [pagination.page, search]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: 20
      });
      if (search) params.append('search', search);

      const data = await api.get(`/media?${params}`);
      setMedia(data.media);
      setPagination(data.pagination);
    } catch (error) {
      showMessage('error', 'Errore nel caricamento media');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      if (files.length === 1) {
        await api.upload('/media/upload', files[0]);
      } else {
        await api.uploadMultiple('/media/upload-multiple', files);
      }
      showMessage('success', `${files.length} file caricati con successo`);
      fetchMedia();
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo file?')) return;

    try {
      await api.del(`/media/${id}`);
      showMessage('success', 'File eliminato con successo');
      fetchMedia();
      if (selectedMedia?._id === id) setSelectedMedia(null);
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleUpdateAlt = async (id, alt) => {
    try {
      await api.put(`/media/${id}`, { alt });
      showMessage('success', 'Alt text aggiornato');
      fetchMedia();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleSelect = (item) => {
    if (selectionMode && onSelect) {
      onSelect(item);
    } else {
      setSelectedMedia(selectedMedia?._id === item._id ? null : item);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="media-library">
      {message && (
        <div className={`status-message ${message.type}`}>{message.text}</div>
      )}

      <div className="media-toolbar">
        <div className="media-search">
          <input
            type="text"
            placeholder="Cerca file..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
          />
        </div>

        <div className="media-upload">
          <input
            ref={fileInputRef}
            type="file"
            id="media-upload-input"
            multiple
            accept="image/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
          <button
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Caricamento...' : '+ Carica File'}
          </button>
        </div>
      </div>

      <div className="media-content">
        <div className={`media-grid ${selectedMedia ? 'with-sidebar' : ''}`}>
          {loading ? (
            <div className="loading-spinner"><div className="spinner"></div></div>
          ) : media.length === 0 ? (
            <div className="media-empty">
              <p>Nessun file trovato</p>
              <button
                className="btn btn-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                Carica il primo file
              </button>
            </div>
          ) : (
            media.map(item => (
              <div
                key={item._id}
                className={`media-item ${selectedMedia?._id === item._id ? 'selected' : ''}`}
                onClick={() => handleSelect(item)}
              >
                <div className="media-thumbnail">
                  <img
                    src={`http://localhost:5001${item.url}`}
                    alt={item.alt || item.originalName}
                    loading="lazy"
                  />
                </div>
                <div className="media-item-name">{item.originalName}</div>
              </div>
            ))
          )}
        </div>

        {selectedMedia && !selectionMode && (
          <div className="media-sidebar">
            <div className="media-preview">
              <img
                src={`http://localhost:5001${selectedMedia.url}`}
                alt={selectedMedia.alt || selectedMedia.originalName}
              />
            </div>

            <div className="media-details">
              <h4>Dettagli File</h4>

              <div className="detail-row">
                <span className="detail-label">Nome:</span>
                <span className="detail-value">{selectedMedia.originalName}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Tipo:</span>
                <span className="detail-value">{selectedMedia.mimeType}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Dimensione:</span>
                <span className="detail-value">{formatFileSize(selectedMedia.size)}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Caricato:</span>
                <span className="detail-value">
                  {new Date(selectedMedia.createdAt).toLocaleDateString('it-IT')}
                </span>
              </div>

              <div className="form-group">
                <label>Alt Text</label>
                <input
                  type="text"
                  value={selectedMedia.alt || ''}
                  onChange={(e) => setSelectedMedia({ ...selectedMedia, alt: e.target.value })}
                  placeholder="Descrizione immagine..."
                />
                <button
                  className="btn btn-small"
                  onClick={() => handleUpdateAlt(selectedMedia._id, selectedMedia.alt)}
                >
                  Salva Alt
                </button>
              </div>

              <div className="form-group">
                <label>URL</label>
                <input
                  type="text"
                  value={`http://localhost:5001${selectedMedia.url}`}
                  readOnly
                  onClick={(e) => {
                    e.target.select();
                    navigator.clipboard.writeText(e.target.value);
                    showMessage('success', 'URL copiato!');
                  }}
                />
              </div>

              <div className="media-actions">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(selectedMedia._id)}
                >
                  Elimina File
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {pagination.pages > 1 && (
        <div className="media-pagination">
          <button
            className="btn btn-secondary"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
          >
            Precedente
          </button>
          <span className="pagination-info">
            Pagina {pagination.page} di {pagination.pages} ({pagination.total} file)
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.pages}
          >
            Successiva
          </button>
        </div>
      )}
    </div>
  );
}

export default MediaLibrary;
