import { useState, useEffect } from 'react';

function ContattiEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('info');
  const [content, setContent] = useState({
    info: {
      nome: '',
      indirizzo: '',
      citta: '',
      cap: '',
      provincia: '',
      telefono: '',
      cellulare: '',
      email: '',
      pec: ''
    },
    posizione: {
      lat: '',
      lng: '',
      zoom: 15,
      indicazioni: ''
    },
    orari: {
      reception: '',
      note: ''
    }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/content/contatti');
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
      const response = await fetch(`http://localhost:5001/api/content/contatti/${section}`, {
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
          className={`editor-tab ${activeSection === 'posizione' ? 'active' : ''}`}
          onClick={() => setActiveSection('posizione')}
        >
          Posizione
        </button>
        <button
          className={`editor-tab ${activeSection === 'orari' ? 'active' : ''}`}
          onClick={() => setActiveSection('orari')}
        >
          Orari
        </button>
      </div>

      {activeSection === 'info' && (
        <div className="editor-section">
          <h3>Informazioni di Contatto</h3>

          <div className="form-group">
            <label>Nome struttura</label>
            <input
              type="text"
              value={content.info?.nome || ''}
              onChange={(e) => setContent({
                ...content,
                info: { ...content.info, nome: e.target.value }
              })}
              placeholder="Es: BelSorriso Varese"
            />
          </div>

          <div className="form-group">
            <label>Indirizzo</label>
            <input
              type="text"
              value={content.info?.indirizzo || ''}
              onChange={(e) => setContent({
                ...content,
                info: { ...content.info, indirizzo: e.target.value }
              })}
              placeholder="Es: Via Roma, 123"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Citta</label>
              <input
                type="text"
                value={content.info?.citta || ''}
                onChange={(e) => setContent({
                  ...content,
                  info: { ...content.info, citta: e.target.value }
                })}
                placeholder="Es: Varese"
              />
            </div>
            <div className="form-group">
              <label>CAP</label>
              <input
                type="text"
                value={content.info?.cap || ''}
                onChange={(e) => setContent({
                  ...content,
                  info: { ...content.info, cap: e.target.value }
                })}
                placeholder="Es: 21100"
              />
            </div>
            <div className="form-group">
              <label>Provincia</label>
              <input
                type="text"
                value={content.info?.provincia || ''}
                onChange={(e) => setContent({
                  ...content,
                  info: { ...content.info, provincia: e.target.value }
                })}
                placeholder="Es: VA"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Telefono</label>
              <input
                type="text"
                value={content.info?.telefono || ''}
                onChange={(e) => setContent({
                  ...content,
                  info: { ...content.info, telefono: e.target.value }
                })}
                placeholder="Es: +39 0332 123456"
              />
            </div>
            <div className="form-group">
              <label>Cellulare</label>
              <input
                type="text"
                value={content.info?.cellulare || ''}
                onChange={(e) => setContent({
                  ...content,
                  info: { ...content.info, cellulare: e.target.value }
                })}
                placeholder="Es: +39 333 1234567"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={content.info?.email || ''}
                onChange={(e) => setContent({
                  ...content,
                  info: { ...content.info, email: e.target.value }
                })}
                placeholder="Es: info@belsorriso.it"
              />
            </div>
            <div className="form-group">
              <label>PEC (opzionale)</label>
              <input
                type="email"
                value={content.info?.pec || ''}
                onChange={(e) => setContent({
                  ...content,
                  info: { ...content.info, pec: e.target.value }
                })}
                placeholder="Es: belsorriso@pec.it"
              />
            </div>
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

      {activeSection === 'posizione' && (
        <div className="editor-section">
          <h3>Posizione e Mappa</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Latitudine</label>
              <input
                type="text"
                value={content.posizione?.lat || ''}
                onChange={(e) => setContent({
                  ...content,
                  posizione: { ...content.posizione, lat: e.target.value }
                })}
                placeholder="Es: 45.8206"
              />
            </div>
            <div className="form-group">
              <label>Longitudine</label>
              <input
                type="text"
                value={content.posizione?.lng || ''}
                onChange={(e) => setContent({
                  ...content,
                  posizione: { ...content.posizione, lng: e.target.value }
                })}
                placeholder="Es: 8.8251"
              />
            </div>
            <div className="form-group">
              <label>Zoom mappa</label>
              <input
                type="number"
                value={content.posizione?.zoom || 15}
                onChange={(e) => setContent({
                  ...content,
                  posizione: { ...content.posizione, zoom: parseInt(e.target.value) }
                })}
                min="10"
                max="20"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Come raggiungerci</label>
            <textarea
              value={content.posizione?.indicazioni || ''}
              onChange={(e) => setContent({
                ...content,
                posizione: { ...content.posizione, indicazioni: e.target.value }
              })}
              placeholder="Indicazioni stradali, mezzi pubblici, parcheggi..."
              rows={5}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={() => handleSave('posizione', content.posizione)}
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Posizione'}
          </button>
        </div>
      )}

      {activeSection === 'orari' && (
        <div className="editor-section">
          <h3>Orari di Apertura</h3>

          <div className="form-group">
            <label>Orari Reception</label>
            <textarea
              value={content.orari?.reception || ''}
              onChange={(e) => setContent({
                ...content,
                orari: { ...content.orari, reception: e.target.value }
              })}
              placeholder="Es: Lun-Ven: 8:00-20:00&#10;Sab-Dom: 9:00-18:00"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Note aggiuntive</label>
            <textarea
              value={content.orari?.note || ''}
              onChange={(e) => setContent({
                ...content,
                orari: { ...content.orari, note: e.target.value }
              })}
              placeholder="Altre informazioni sugli orari..."
              rows={3}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={() => handleSave('orari', content.orari)}
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Orari'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ContattiEditor;
