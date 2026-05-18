import { useState, useEffect } from 'react';
import ArrayEditor from './common/ArrayEditor';
import { API_URL } from '../../config/api';

function StanzeEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('intro');
  const [content, setContent] = useState({
    intro: { title: '', text: '' },
    camere: [],
    appartamenti: []
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_URL}/content/stanze`);
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
      const response = await fetch(`${API_URL}/content/stanze/${section}`, {
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

  const cameraFields = [
    { name: 'nome', label: 'Nome Camera', type: 'text', placeholder: 'Es: Bordeaux' },
    { name: 'tipo', label: 'Tipo', type: 'text', placeholder: 'Es: Camera' },
    { name: 'capacita', label: 'Capacità ospiti', type: 'text', placeholder: 'Es: Da 1 a 2 ospiti' },
    { name: 'codice', label: 'Codice struttura', type: 'text', placeholder: 'Es: 012133-FOR-00015' },
    { name: 'features', label: 'Dotazioni (una per riga)', type: 'textarea', placeholder: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata', rows: 7 }
  ];

  const appartamentoFields = [
    { name: 'nome', label: 'Nome Appartamento', type: 'text', placeholder: 'Es: Bilo 1B Comfort' },
    { name: 'tipo', label: 'Tipo', type: 'text', placeholder: 'Es: Bilocale' },
    { name: 'descrizione', label: 'Piano / Note', type: 'text', placeholder: 'Es: Primo piano' },
    { name: 'mq', label: 'Superficie', type: 'text', placeholder: 'Es: 60 m²' },
    { name: 'features', label: 'Dotazioni (una per riga)', type: 'textarea', placeholder: 'Bagno privato\nAngolo cottura\nLavatrice', rows: 7 }
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
        <button
          className={`editor-tab ${activeSection === 'intro' ? 'active' : ''}`}
          onClick={() => setActiveSection('intro')}
        >
          Introduzione
        </button>
        <button
          className={`editor-tab ${activeSection === 'camere' ? 'active' : ''}`}
          onClick={() => setActiveSection('camere')}
        >
          Camere ({content.camere?.length || 0})
        </button>
        <button
          className={`editor-tab ${activeSection === 'appartamenti' ? 'active' : ''}`}
          onClick={() => setActiveSection('appartamenti')}
        >
          Appartamenti ({content.appartamenti?.length || 0})
        </button>
      </div>

      {activeSection === 'intro' && (
        <div className="editor-section">
          <h3>Introduzione Pagina Le Stanze</h3>
          <div className="form-group">
            <label>Titolo sezione</label>
            <input
              type="text"
              value={content.intro?.title || ''}
              onChange={(e) => setContent({
                ...content,
                intro: { ...content.intro, title: e.target.value }
              })}
              placeholder="Es: Le Nostre Sistemazioni"
            />
          </div>
          <div className="form-group">
            <label>Testo introduttivo</label>
            <textarea
              value={content.intro?.text || ''}
              onChange={(e) => setContent({
                ...content,
                intro: { ...content.intro, text: e.target.value }
              })}
              placeholder="Descrizione generale delle sistemazioni..."
              rows={4}
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

      {activeSection === 'camere' && (
        <div className="editor-section">
          <h3>Gestione Camere</h3>
          <p className="section-description">
            Gestisci le camere della struttura. Puoi aggiungere fino a 10 camere.
          </p>
          <ArrayEditor
            items={content.camere || []}
            onChange={(camere) => setContent({ ...content, camere })}
            fields={cameraFields}
            itemLabel="Camera"
            maxItems={10}
            renderPreview={(item) => `${item.nome || 'Nuova Camera'} — ${item.capacita || ''} ${item.tipo ? '· ' + item.tipo : ''}`}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('camere', content.camere)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Camere'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'appartamenti' && (
        <div className="editor-section">
          <h3>Gestione Appartamenti</h3>
          <p className="section-description">
            Gestisci gli appartamenti della struttura. Puoi aggiungere fino a 15 appartamenti.
          </p>
          <ArrayEditor
            items={content.appartamenti || []}
            onChange={(appartamenti) => setContent({ ...content, appartamenti })}
            fields={appartamentoFields}
            itemLabel="Appartamento"
            maxItems={15}
            renderPreview={(item) => `${item.nome || 'Nuovo Appartamento'} — ${item.tipo || ''} ${item.mq ? '· ' + item.mq : ''} ${item.descrizione ? '· ' + item.descrizione : ''}`}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('appartamenti', content.appartamenti)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Appartamenti'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StanzeEditor;
