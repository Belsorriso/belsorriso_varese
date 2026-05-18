import { useState } from 'react';
import { EditableText, EditableSection } from '../../editable';
import { useEditMode } from '../../../context/EditModeContext';
import { useContent } from '../../../hooks/useContent';
import MediaLibrary from '../../../admin/components/media/MediaLibrary';

function HomeHero() {
  const { isEditMode, isAdmin } = useEditMode();
  const { getField, updateField } = useContent('home');
  const [showMedia, setShowMedia] = useState(false);

  const bgImage = getField('hero', 'background', '/images/hero-bg.webp');

  const handleSelect = (media) => {
    updateField('hero', 'background', media.url);
    setShowMedia(false);
  };

  return (
    <EditableSection label="Hero">
      <section
        className="hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-content">
          <EditableText
            page="home"
            section="hero"
            field="title"
            tag="h1"
            defaultValue="Camere private, comfort garantito"
          />
          <EditableText
            page="home"
            section="hero"
            field="subtitle"
            tag="p"
            defaultValue="Relax e charme in un cortile dal fascino d'altri tempi"
          />
          <a
            href="https://belsorrisovarese.kross.travel/"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Controlla Disponibilita
          </a>
        </div>

        {isEditMode && isAdmin && (
          <button
            className="hero-change-bg-btn"
            onClick={() => setShowMedia(true)}
          >
            🖼️ Cambia sfondo
          </button>
        )}
      </section>

      {showMedia && (
        <div className="media-modal-overlay" onClick={() => setShowMedia(false)}>
          <div className="media-modal" onClick={e => e.stopPropagation()}>
            <div className="media-modal-header">
              <h3>Seleziona immagine di sfondo</h3>
              <button className="media-modal-close" onClick={() => setShowMedia(false)}>&times;</button>
            </div>
            <div className="media-modal-content">
              <MediaLibrary onSelect={handleSelect} selectionMode={true} />
            </div>
          </div>
        </div>
      )}
    </EditableSection>
  );
}

export default HomeHero;
