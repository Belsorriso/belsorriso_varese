import TextWidget from './widgets/TextWidget';
import ImageWidget from './widgets/ImageWidget';
import CodeWidget from './widgets/CodeWidget';
import ShortcodeWidget from './widgets/ShortcodeWidget';
import CarouselWidget from './widgets/CarouselWidget';

const TYPE_LABELS = {
  text: 'Testo',
  image: 'Immagine',
  code: 'Codice HTML',
  shortcode: 'Shortcode',
  carousel: 'Carosello',
};

function ElementSettings({ element, onChange, onClose }) {
  const handleChange = (newSettings) => {
    onChange({ ...element, settings: newSettings });
  };

  const renderWidget = () => {
    const props = {
      settings: element.settings || {},
      onChange: handleChange,
    };

    switch (element.type) {
      case 'text': return <TextWidget {...props} />;
      case 'image': return <ImageWidget {...props} />;
      case 'code': return <CodeWidget {...props} />;
      case 'shortcode': return <ShortcodeWidget {...props} />;
      case 'carousel': return <CarouselWidget {...props} />;
      default: return <div>Tipo elemento non supportato: {element.type}</div>;
    }
  };

  return (
    <>
      <div className="pb-settings-overlay" onClick={onClose} />
      <div className="pb-settings-panel">
        <div className="pb-settings-header">
          <h3>Modifica: {TYPE_LABELS[element.type] || element.type}</h3>
          <button className="pb-palette-close" onClick={onClose}>×</button>
        </div>
        <div className="pb-settings-body">
          {renderWidget()}
        </div>
        <div className="pb-settings-footer">
          <button className="pb-btn pb-btn-primary" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </>
  );
}

export default ElementSettings;
