import { useState, useEffect } from 'react';
import ArrayEditor from './common/ArrayEditor';

function RegolamentoEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('orari');
  const [content, setContent] = useState({
    orari: { checkIn: '', checkOut: '', reception: '' },
    regole: [],
    pagamenti: { metodi: [], condizioni: '' },
    cancellazioni: { policy: '', rimborsi: '' }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/content/regolamento');
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
      const response = await fetch(`http://localhost:5001/api/content/regolamento/${section}`, {
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

  const regolaFields = [
    { name: 'titolo', label: 'Titolo Regola', type: 'text', placeholder: 'Es: Animali domestici' },
    { name: 'descrizione', label: 'Descrizione', type: 'textarea', placeholder: 'Descrizione della regola...', rows: 3 },
    { name: 'icona', label: 'Icona', type: 'text', placeholder: 'Es: 🐕' }
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
          className={`editor-tab ${activeSection === 'orari' ? 'active' : ''}`}
          onClick={() => setActiveSection('orari')}
        >
          Orari
        </button>
        <button
          className={`editor-tab ${activeSection === 'regole' ? 'active' : ''}`}
          onClick={() => setActiveSection('regole')}
        >
          Regole ({content.regole?.length || 0})
        </button>
        <button
          className={`editor-tab ${activeSection === 'pagamenti' ? 'active' : ''}`}
          onClick={() => setActiveSection('pagamenti')}
        >
          Pagamenti
        </button>
        <button
          className={`editor-tab ${activeSection === 'cancellazioni' ? 'active' : ''}`}
          onClick={() => setActiveSection('cancellazioni')}
        >
          Cancellazioni
        </button>
      </div>

      {activeSection === 'orari' && (
        <div className="editor-section">
          <h3>Orari della Struttura</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Check-in</label>
              <input
                type="text"
                value={content.orari?.checkIn || ''}
                onChange={(e) => setContent({
                  ...content,
                  orari: { ...content.orari, checkIn: e.target.value }
                })}
                placeholder="Es: dalle 14:00 alle 20:00"
              />
            </div>
            <div className="form-group">
              <label>Check-out</label>
              <input
                type="text"
                value={content.orari?.checkOut || ''}
                onChange={(e) => setContent({
                  ...content,
                  orari: { ...content.orari, checkOut: e.target.value }
                })}
                placeholder="Es: entro le 10:00"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Orari Reception</label>
            <textarea
              value={content.orari?.reception || ''}
              onChange={(e) => setContent({
                ...content,
                orari: { ...content.orari, reception: e.target.value }
              })}
              placeholder="Es: La reception e aperta dalle 8:00 alle 22:00..."
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

      {activeSection === 'regole' && (
        <div className="editor-section">
          <h3>Regole della Casa</h3>
          <ArrayEditor
            items={content.regole || []}
            onChange={(regole) => setContent({ ...content, regole })}
            fields={regolaFields}
            itemLabel="Regola"
            maxItems={20}
            renderPreview={(item) => `${item.icona || ''} ${item.titolo || 'Nuova Regola'}`}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSave('regole', content.regole)}
              disabled={saving}
            >
              {saving ? 'Salvataggio...' : 'Salva Regole'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'pagamenti' && (
        <div className="editor-section">
          <h3>Metodi di Pagamento</h3>
          <div className="form-group">
            <label>Metodi accettati (uno per riga)</label>
            <textarea
              value={(content.pagamenti?.metodi || []).join('\n')}
              onChange={(e) => setContent({
                ...content,
                pagamenti: {
                  ...content.pagamenti,
                  metodi: e.target.value.split('\n').filter(m => m.trim())
                }
              })}
              placeholder="Carta di credito&#10;Bonifico bancario&#10;Contanti"
              rows={5}
            />
          </div>
          <div className="form-group">
            <label>Condizioni di pagamento</label>
            <textarea
              value={content.pagamenti?.condizioni || ''}
              onChange={(e) => setContent({
                ...content,
                pagamenti: { ...content.pagamenti, condizioni: e.target.value }
              })}
              placeholder="Es: Il pagamento del saldo deve essere effettuato..."
              rows={4}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => handleSave('pagamenti', content.pagamenti)}
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Pagamenti'}
          </button>
        </div>
      )}

      {activeSection === 'cancellazioni' && (
        <div className="editor-section">
          <h3>Policy di Cancellazione</h3>
          <div className="form-group">
            <label>Policy di cancellazione</label>
            <textarea
              value={content.cancellazioni?.policy || ''}
              onChange={(e) => setContent({
                ...content,
                cancellazioni: { ...content.cancellazioni, policy: e.target.value }
              })}
              placeholder="Descrivi la policy di cancellazione..."
              rows={5}
            />
          </div>
          <div className="form-group">
            <label>Condizioni rimborsi</label>
            <textarea
              value={content.cancellazioni?.rimborsi || ''}
              onChange={(e) => setContent({
                ...content,
                cancellazioni: { ...content.cancellazioni, rimborsi: e.target.value }
              })}
              placeholder="Descrivi le condizioni di rimborso..."
              rows={4}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => handleSave('cancellazioni', content.cancellazioni)}
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Cancellazioni'}
          </button>
        </div>
      )}
    </div>
  );
}

export default RegolamentoEditor;
