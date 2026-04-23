import { useState, useEffect } from 'react';
import ArrayEditor from './common/ArrayEditor';

function FooterEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('azienda');
  const [content, setContent] = useState({
    azienda: {
      nome: '',
      descrizione: '',
      partitaIva: '',
      codiceFiscale: ''
    },
    social: [],
    links: [],
    copyright: ''
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/content/footer');
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
      const response = await fetch(`http://localhost:5001/api/content/footer/${section}`, {
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

  const socialFields = [
    {
      name: 'piattaforma',
      label: 'Piattaforma',
      type: 'select',
      options: [
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'twitter', label: 'Twitter/X' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'tiktok', label: 'TikTok' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'tripadvisor', label: 'TripAdvisor' }
      ]
    },
    { name: 'url', label: 'URL', type: 'text', placeholder: 'https://...' },
    { name: 'label', label: 'Etichetta (opzionale)', type: 'text', placeholder: 'Es: Seguici su Facebook' }
  ];

  const linkFields = [
    { name: 'label', label: 'Testo link', type: 'text', placeholder: 'Es: Privacy Policy' },
    { name: 'url', label: 'URL', type: 'text', placeholder: '/privacy o https://...' },
    { name: 'esterno', label: 'Link esterno', type: 'checkbox', checkboxLabel: 'Apri in nuova finestra' }
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
          className={`editor-tab ${activeSection === 'azienda' ? 'active' : ''}`}
          onClick={() => setActiveSection('azienda')}
        >
          Dati Aziendali
        </button>
        <button
          className={`editor-tab ${activeSection === 'social' ? 'active' : ''}`}
          onClick={() => setActiveSection('social')}
        >
          Social ({content.social?.length || 0})
        </button>
        <button
          className={`editor-tab ${activeSection === 'links' ? 'active' : ''}`}
          onClick={() => setActiveSection('links')}
        >
          Links ({content.links?.length || 0})
        </button>
        <button
          className={`editor-tab ${activeSection === 'copyright' ? 'active' : ''}`}
          onClick={() => setActiveSection('copyright')}
        >
          Copyright
        </button>
      </div>

      {activeSection === 'azienda' && (
        <div className="editor-section">
          <h3>Dati Aziendali</h3>

          <div className="form-group">
            <label>Nome azienda/struttura</label>
            <input
              type="text"
              value={content.azienda?.nome || ''}
              onChange={(e) => setContent({
                ...content,
                azienda: { ...content.azienda, nome: e.target.value }
              })}
              placeholder="Es: BelSorrisoVarese S.r.l."
            />
          </div>

          <div className="form-group">
            <label>Descrizione breve</label>
            <textarea
              value={content.azienda?.descrizione || ''}
              onChange={(e) => setContent({
                ...content,
                azienda: { ...content.azienda, descrizione: e.target.value }
              })}
              placeholder="Breve descrizione per il footer..."
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Partita IVA</label>
              <input
                type="text"
                value={content.azienda?.partitaIva || ''}
                onChange={(e) => setContent({
                  ...content,
                  azienda: { ...content.azienda, partitaIva: e.target.value }
                })}
                placeholder="Es: IT12345678901"
              />
            </div>
            <div className="form-group">
              <label>Codice Fiscale</label>
              <input
                type="text"
                value={content.azienda?.codiceFiscale || ''}
                onChange={(e) => setContent({
                  ...content,
                  azienda: { ...content.azienda, codiceFiscale: e.target.value }
                })}
                placeholder="Es: 12345678901"
              />
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => handleSave('azienda', content.azienda)}
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Dati Aziendali'}
          </button>
        </div>
      )}

      {activeSection === 'social' && (
        <div className="editor-section">
          <h3>Social Network</h3>
          <p className="section-description">
            Aggiungi i link ai profili social della struttura.
          </p>
          <ArrayEditor
            items={content.social || []}
            onChange={(social) => setContent({ ...content, social })}
            fields={socialFields}
            itemLabel="Social"
            maxItems={10}
            renderPreview={(item) => item.piattaforma || 'Nuovo Social'}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('social', content.social)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Social'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'links' && (
        <div className="editor-section">
          <h3>Links Footer</h3>
          <p className="section-description">
            Links utili da mostrare nel footer (privacy, termini, etc.).
          </p>
          <ArrayEditor
            items={content.links || []}
            onChange={(links) => setContent({ ...content, links })}
            fields={linkFields}
            itemLabel="Link"
            maxItems={10}
            renderPreview={(item) => item.label || 'Nuovo Link'}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('links', content.links)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Links'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'copyright' && (
        <div className="editor-section">
          <h3>Testo Copyright</h3>

          <div className="form-group">
            <label>Copyright</label>
            <input
              type="text"
              value={content.copyright || ''}
              onChange={(e) => setContent({ ...content, copyright: e.target.value })}
              placeholder="Es: © 2024 BelSorrisoVarese. Tutti i diritti riservati."
            />
            <small className="field-help">
              Usa {'{year}'} per inserire l'anno corrente automaticamente.
            </small>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => handleSave('copyright', content.copyright)}
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Copyright'}
          </button>
        </div>
      )}
    </div>
  );
}

export default FooterEditor;
