import { useState, useEffect } from 'react';

function HomeEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState({
    hero: { title: '', subtitle: '' },
    welcome: { title: '', text: '' },
    features: []
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/content/home');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const contentObj = {};
          data.forEach(item => {
            contentObj[item.section] = item.content;
          });
          setContent(prev => ({ ...prev, ...contentObj }));
        }
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
      const response = await fetch(`http://localhost:5001/api/content/home/${section}`, {
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

      {/* Hero Section */}
      <div className="editor-section">
        <h3>Hero Section</h3>
        <div className="form-group">
          <label>Titolo principale</label>
          <input
            type="text"
            value={content.hero?.title || ''}
            onChange={(e) => setContent({
              ...content,
              hero: { ...content.hero, title: e.target.value }
            })}
            placeholder="Es: Benvenuti al BelSorriso"
          />
        </div>
        <div className="form-group">
          <label>Sottotitolo</label>
          <textarea
            value={content.hero?.subtitle || ''}
            onChange={(e) => setContent({
              ...content,
              hero: { ...content.hero, subtitle: e.target.value }
            })}
            placeholder="Es: La vostra casa lontano da casa nel cuore di Varese"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleSave('hero', content.hero)}
          disabled={saving}
        >
          {saving ? 'Salvataggio...' : 'Salva Hero'}
        </button>
      </div>

      {/* Welcome Section */}
      <div className="editor-section">
        <h3>Sezione Benvenuto</h3>
        <div className="form-group">
          <label>Titolo</label>
          <input
            type="text"
            value={content.welcome?.title || ''}
            onChange={(e) => setContent({
              ...content,
              welcome: { ...content.welcome, title: e.target.value }
            })}
            placeholder="Es: Benvenuti"
          />
        </div>
        <div className="form-group">
          <label>Testo</label>
          <textarea
            value={content.welcome?.text || ''}
            onChange={(e) => setContent({
              ...content,
              welcome: { ...content.welcome, text: e.target.value }
            })}
            placeholder="Descrizione della struttura..."
            rows={5}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleSave('welcome', content.welcome)}
          disabled={saving}
        >
          {saving ? 'Salvataggio...' : 'Salva Benvenuto'}
        </button>
      </div>
    </div>
  );
}

export default HomeEditor;
