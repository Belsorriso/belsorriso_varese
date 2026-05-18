import { useState, useEffect } from 'react';
import { API_URL } from '../../config/api';

function HomeEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState(null);
  const [content, setContent] = useState({
    hero: { title: '', subtitle: '', background: '' },
    welcome: { title: '', text: '', text2: '', image: '' },
    featuresIntro: { title: '', subtitle: '' },
    contactCta: { title: '', subtitle: '' },
    contact: { phone1: '', phone2: '', email: '', address1: '', address2: '' }
  });

  useEffect(() => { fetchContent(); }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch(`${API_URL}/content/home`);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') setContent(prev => ({ ...prev, ...data }));
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSave = async (section, data) => {
    setSaving(section);
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/content/home/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: data })
      });
      if (res.ok) setMessage({ type: 'success', text: 'Salvato!' });
      else throw new Error('Errore salvataggio');
    } catch (e) { setMessage({ type: 'error', text: e.message }); }
    finally { setSaving(null); setTimeout(() => setMessage(null), 3000); }
  };

  const field = (section, key, label, type = 'input', rows = 3) => (
    <div className="form-group" key={key}>
      <label>{label}</label>
      {type === 'input'
        ? <input type="text" value={content[section]?.[key] || ''}
            onChange={e => setContent({ ...content, [section]: { ...content[section], [key]: e.target.value } })} />
        : <textarea rows={rows} value={content[section]?.[key] || ''}
            onChange={e => setContent({ ...content, [section]: { ...content[section], [key]: e.target.value } })} />
      }
    </div>
  );

  const saveBtn = (section, label) => (
    <button className="btn btn-primary" onClick={() => handleSave(section, content[section])} disabled={saving === section}>
      {saving === section ? 'Salvataggio...' : label}
    </button>
  );

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="editor-container">
      {message && <div className={`status-message ${message.type}`}>{message.text}</div>}

      <div className="editor-section">
        <h3>Hero Section</h3>
        {field('hero', 'title', 'Titolo principale')}
        {field('hero', 'subtitle', 'Sottotitolo', 'textarea')}
        {field('hero', 'background', 'Immagine sfondo (URL)')}
        {saveBtn('hero', 'Salva Hero')}
      </div>

      <div className="editor-section">
        <h3>Sezione Benvenuto</h3>
        {field('welcome', 'title', 'Titolo')}
        {field('welcome', 'text', 'Testo paragrafo 1', 'textarea', 4)}
        {field('welcome', 'text2', 'Testo paragrafo 2', 'textarea', 4)}
        {field('welcome', 'image', 'Immagine (URL)')}
        {saveBtn('welcome', 'Salva Benvenuto')}
      </div>

      <div className="editor-section">
        <h3>Sezione Punti di Forza</h3>
        {field('featuresIntro', 'title', 'Titolo')}
        {field('featuresIntro', 'subtitle', 'Sottotitolo')}
        {saveBtn('featuresIntro', 'Salva Punti di Forza')}
      </div>

      <div className="editor-section">
        <h3>Sezione Contatti (Titoli)</h3>
        {field('contactCta', 'title', 'Titolo sezione')}
        {field('contactCta', 'subtitle', 'Sottotitolo', 'textarea')}
        {saveBtn('contactCta', 'Salva Titoli Contatti')}
      </div>

      <div className="editor-section">
        <h3>Dati di Contatto</h3>
        {field('contact', 'phone1', 'Telefono 1')}
        {field('contact', 'phone2', 'Telefono 2')}
        {field('contact', 'email', 'Email')}
        {field('contact', 'address1', 'Indirizzo riga 1')}
        {field('contact', 'address2', 'Indirizzo riga 2')}
        {saveBtn('contact', 'Salva Dati Contatto')}
      </div>
    </div>
  );
}

export default HomeEditor;
