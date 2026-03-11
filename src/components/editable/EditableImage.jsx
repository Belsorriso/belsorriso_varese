import { useState } from 'react';
import { useEditMode } from '../../context/EditModeContext';
import { useContent } from '../../hooks/useContent';
import MediaLibrary from '../../admin/components/media/MediaLibrary';

function EditableImage({
  page,
  section,
  field,
  className = '',
  alt = '',
  style = {},
  defaultValue = '',
  asBackground = false
}) {
  const { isEditMode, isAdmin } = useEditMode();
  const { getField, updateField } = useContent(page);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const currentValue = getField(section, field, defaultValue);
  const imageUrl = currentValue.startsWith('http') ? currentValue :
                   currentValue.startsWith('/') ? currentValue :
                   `http://localhost:5001${currentValue}`;

  const handleClick = (e) => {
    if (isEditMode && isAdmin) {
      e.preventDefault();
      e.stopPropagation();
      setShowMediaLibrary(true);
    }
  };

  const handleSelect = (media) => {
    const url = `http://localhost:5001${media.url}`;
    updateField(section, field, url);
    setShowMediaLibrary(false);
  };

  const handleClose = () => {
    setShowMediaLibrary(false);
  };

  if (asBackground) {
    return (
      <>
        <div
          className={`${className} ${isEditMode && isAdmin ? 'editable-element editable-image' : ''}`}
          style={{
            ...style,
            backgroundImage: currentValue ? `url(${imageUrl})` : 'none'
          }}
          onClick={handleClick}
          title={isEditMode && isAdmin ? 'Clicca per cambiare immagine' : ''}
        >
          {isEditMode && isAdmin && (
            <div className="editable-image-overlay">
              <span className="editable-image-icon">&#128247;</span>
              <span>Cambia immagine</span>
            </div>
          )}
        </div>

        {showMediaLibrary && (
          <div className="media-modal-overlay" onClick={handleClose}>
            <div className="media-modal" onClick={e => e.stopPropagation()}>
              <div className="media-modal-header">
                <h3>Seleziona Immagine</h3>
                <button className="media-modal-close" onClick={handleClose}>&times;</button>
              </div>
              <div className="media-modal-content">
                <MediaLibrary onSelect={handleSelect} selectionMode={true} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={`editable-image-wrapper ${isEditMode && isAdmin ? 'editable-element' : ''}`}
        onClick={handleClick}
        title={isEditMode && isAdmin ? 'Clicca per cambiare immagine' : ''}
      >
        <img
          src={imageUrl}
          alt={alt}
          className={className}
          style={style}
        />
        {isEditMode && isAdmin && (
          <div className="editable-image-overlay">
            <span className="editable-image-icon">&#128247;</span>
            <span>Cambia immagine</span>
          </div>
        )}
      </div>

      {showMediaLibrary && (
        <div className="media-modal-overlay" onClick={handleClose}>
          <div className="media-modal" onClick={e => e.stopPropagation()}>
            <div className="media-modal-header">
              <h3>Seleziona Immagine</h3>
              <button className="media-modal-close" onClick={handleClose}>&times;</button>
            </div>
            <div className="media-modal-content">
              <MediaLibrary onSelect={handleSelect} selectionMode={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditableImage;
