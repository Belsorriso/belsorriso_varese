import { useState, useEffect } from 'react';
import ArrayEditor from './common/ArrayEditor';

function StrutturaEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('info');
  const [content, setContent] = useState({
    info: { title: '', description: '' },
    dotazioni: [],
    servizi: [],
    spazi: []
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/content/struttura');
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
      const response = await fetch(`http://localhost:5001/api/content/struttura/${section}`, {
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

  const dotazioneFields = [
    { name: 'nome', label: 'Nome Dotazione', type: 'text', placeholder: 'Es: Parcheggio' },
    { name: 'descrizione', label: 'Descrizione', type: 'textarea', placeholder: 'Descrizione...', rows: 2 },
    { name: 'icona', label: 'Icona (emoji o classe)', type: 'text', placeholder: 'Es: 🚗' }
  ];

  const servizioFields = [
    { name: 'nome', label: 'Nome Servizio', type: 'text', placeholder: 'Es: Colazione' },
    { name: 'descrizione', label: 'Descrizione', type: 'textarea', placeholder: 'Descrizione del servizio...', rows: 2 },
    { name: 'orario', label: 'Orario (se applicabile)', type: 'text', placeholder: 'Es: 7:00 - 10:00' },
    { name: 'incluso', label: 'Incluso nel prezzo', type: 'checkbox', checkboxLabel: 'Servizio incluso' }
  ];

  const spazioFields = [
    { name: 'nome', label: 'Nome Spazio', type: 'text', placeholder: 'Es: Giardino' },
    { name: 'descrizione', label: 'Descrizione', type: 'textarea', placeholder: 'Descrizione dello spazio...', rows: 2 },
    { name: 'immagine', label: 'Immagine', type: 'image' }
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
          className={`editor-tab ${activeSection === 'info' ? 'active' : ''}`}
          onClick={() => setActiveSection('info')}
        >
          Informazioni
        </button>
        <button
          className={`editor-tab ${activeSection === 'dotazioni' ? 'active' : ''}`}
          onClick={() => setActiveSection('dotazioni')}
        >
          Dotazioni ({content.dotazioni?.length || 0})
        </button>
        <button
          className={`editor-tab ${activeSection === 'servizi' ? 'active' : ''}`}
          onClick={() => setActiveSection('servizi')}
        >
          Servizi ({content.servizi?.length || 0})
        </button>
        <button
          className={`editor-tab ${activeSection === 'spazi' ? 'active' : ''}`}
          onClick={() => setActiveSection('spazi')}
        >
          Spazi Comuni ({content.spazi?.length || 0})
        </button>
      </div>

      {activeSection === 'info' && (
        <div className="editor-section">
          <h3>Informazioni Struttura</h3>
          <div className="form-group">
            <label>Titolo pagina</label>
            <input
              type="text"
              value={content.info?.title || ''}
              onChange={(e) => setContent({
                ...content,
                info: { ...content.info, title: e.target.value }
              })}
              placeholder="Es: La Nostra Struttura"
            />
          </div>
          <div className="form-group">
            <label>Descrizione generale</label>
            <textarea
              value={content.info?.description || ''}
              onChange={(e) => setContent({
                ...content,
                info: { ...content.info, description: e.target.value }
              })}
              placeholder="Descrizione della struttura..."
              rows={5}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => handleSave('info', content.info)}
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Informazioni'}
          </button>
        </div>
      )}

      {activeSection === 'dotazioni' && (
        <div className="editor-section">
          <h3>Dotazioni della Struttura</h3>
          <ArrayEditor
            items={content.dotazioni || []}
            onChange={(dotazioni) => setContent({ ...content, dotazioni })}
            fields={dotazioneFields}
            itemLabel="Dotazione"
            maxItems={20}
            renderPreview={(item) => `${item.icona || ''} ${item.nome || 'Nuova Dotazione'}`}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('dotazioni', content.dotazioni)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Dotazioni'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'servizi' && (
        <div className="editor-section">
          <h3>Servizi Offerti</h3>
          <ArrayEditor
            items={content.servizi || []}
            onChange={(servizi) => setContent({ ...content, servizi })}
            fields={servizioFields}
            itemLabel="Servizio"
            maxItems={20}
            renderPreview={(item) => `${item.nome || 'Nuovo Servizio'}${item.incluso ? ' (incluso)' : ''}`}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('servizi', content.servizi)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Servizi'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'spazi' && (
        <div className="editor-section">
          <h3>Spazi Comuni</h3>
          <ArrayEditor
            items={content.spazi || []}
            onChange={(spazi) => setContent({ ...content, spazi })}
            fields={spazioFields}
            itemLabel="Spazio"
            maxItems={10}
            renderPreview={(item) => item.nome || 'Nuovo Spazio'}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('spazi', content.spazi)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Spazi'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StrutturaEditor;
