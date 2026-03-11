import { useState, useEffect } from 'react';
import ArrayEditor from './common/ArrayEditor';

function TerritorioEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('intro');
  const [content, setContent] = useState({
    intro: { title: '', description: '' },
    natura: [],
    cultura: [],
    sport: [],
    gastronomia: []
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/content/territorio');
      if (response.ok) {
        const data = await response.json();
        setContent(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Errore caricamento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section, data) => {
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/content/territorio/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: data })
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Salvato con successo!' });
      } else {
        throw new Error('Errore nel salvataggio');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const attrazioneFields = [
    { name: 'nome', label: 'Nome', type: 'text', placeholder: 'Es: Sacro Monte' },
    { name: 'descrizione', label: 'Descrizione', type: 'textarea', placeholder: 'Descrizione...', rows: 3 },
    { name: 'distanza', label: 'Distanza', type: 'text', placeholder: 'Es: 5 km' },
    { name: 'link', label: 'Link (opzionale)', type: 'text', placeholder: 'https://...' },
    { name: 'immagine', label: 'Immagine', type: 'image' }
  ];

  const sections = [
    { id: 'intro', label: 'Introduzione' },
    { id: 'natura', label: 'Natura', icon: '🌳' },
    { id: 'cultura', label: 'Cultura', icon: '🏛️' },
    { id: 'sport', label: 'Sport', icon: '⛷️' },
    { id: 'gastronomia', label: 'Gastronomia', icon: '🍷' }
  ];

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  return (
    <div className="editor-container">
      {message && (
        <div className={`status-message ${message.type}`}>{message.text}</div>
      )}

      <div className="editor-tabs">
        {sections.map(section => (
          <button
            key={section.id}
            className={`editor-tab ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.icon && <span>{section.icon} </span>}
            {section.label}
            {section.id !== 'intro' && ` (${content[section.id]?.length || 0})`}
          </button>
        ))}
      </div>

      {activeSection === 'intro' && (
        <div className="editor-section">
          <h3>Introduzione Territorio</h3>
          <div className="form-group">
            <label>Titolo pagina</label>
            <input
              type="text"
              value={content.intro?.title || ''}
              onChange={(e) => setContent({
                ...content,
                intro: { ...content.intro, title: e.target.value }
              })}
              placeholder="Es: Scopri il Territorio"
            />
          </div>
          <div className="form-group">
            <label>Descrizione</label>
            <textarea
              value={content.intro?.description || ''}
              onChange={(e) => setContent({
                ...content,
                intro: { ...content.intro, description: e.target.value }
              })}
              placeholder="Introduzione al territorio..."
              rows={5}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => handleSave('intro', content.intro)}
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Introduzione'}
          </button>
        </div>
      )}

      {activeSection === 'natura' && (
        <div className="editor-section">
          <h3>Natura e Paesaggi</h3>
          <p className="section-description">
            Parchi, laghi, montagne e percorsi naturalistici nelle vicinanze.
          </p>
          <ArrayEditor
            items={content.natura || []}
            onChange={(natura) => setContent({ ...content, natura })}
            fields={attrazioneFields}
            itemLabel="Attrazione"
            maxItems={15}
            renderPreview={(item) => `${item.nome || 'Nuova Attrazione'} - ${item.distanza || '?'}`}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('natura', content.natura)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Natura'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'cultura' && (
        <div className="editor-section">
          <h3>Arte e Cultura</h3>
          <p className="section-description">
            Musei, monumenti, chiese e siti storici da visitare.
          </p>
          <ArrayEditor
            items={content.cultura || []}
            onChange={(cultura) => setContent({ ...content, cultura })}
            fields={attrazioneFields}
            itemLabel="Attrazione"
            maxItems={15}
            renderPreview={(item) => `${item.nome || 'Nuova Attrazione'} - ${item.distanza || '?'}`}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('cultura', content.cultura)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Cultura'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'sport' && (
        <div className="editor-section">
          <h3>Sport e Attivita</h3>
          <p className="section-description">
            Attivita sportive, escursioni e divertimenti disponibili in zona.
          </p>
          <ArrayEditor
            items={content.sport || []}
            onChange={(sport) => setContent({ ...content, sport })}
            fields={attrazioneFields}
            itemLabel="Attivita"
            maxItems={15}
            renderPreview={(item) => `${item.nome || 'Nuova Attivita'} - ${item.distanza || '?'}`}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('sport', content.sport)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Sport'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'gastronomia' && (
        <div className="editor-section">
          <h3>Enogastronomia</h3>
          <p className="section-description">
            Ristoranti, cantine, prodotti tipici e esperienze culinarie.
          </p>
          <ArrayEditor
            items={content.gastronomia || []}
            onChange={(gastronomia) => setContent({ ...content, gastronomia })}
            fields={attrazioneFields}
            itemLabel="Punto"
            maxItems={15}
            renderPreview={(item) => `${item.nome || 'Nuovo Punto'} - ${item.distanza || '?'}`}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('gastronomia', content.gastronomia)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Gastronomia'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TerritorioEditor;
