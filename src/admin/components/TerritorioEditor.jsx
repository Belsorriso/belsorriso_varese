import { useState, useEffect } from 'react';
import ArrayEditor from './common/ArrayEditor';
import { API_URL } from '../../config/api';

function TerritorioEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('header');
  const [content, setContent] = useState({
    header: { title: '', subtitle: '' },
    intro: { title: '', subtitle: '' },
    categorie: []
  });

  useEffect(() => { fetchContent(); }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_URL}/content/territorio`);
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
    setSaving(section);
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/content/territorio/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: data })
      });
      if (response.ok) setMessage({ type: 'success', text: 'Salvato!' });
      else throw new Error('Errore nel salvataggio');
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const categoriaFields = [
    { name: 'title', label: 'Titolo Categoria', type: 'text', placeholder: 'Es: Natura e Spiritualità' },
    { name: 'items', label: 'Attrazioni (una per riga)', type: 'textarea', placeholder: 'Sacro Monte di Varese\nParco Campo dei Fiori\nLago di Varese', rows: 6 }
  ];

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="editor-container">
      {message && <div className={`status-message ${message.type}`}>{message.text}</div>}

      <div className="editor-tabs">
        <button className={`editor-tab ${activeSection === 'header' ? 'active' : ''}`} onClick={() => setActiveSection('header')}>Header</button>
        <button className={`editor-tab ${activeSection === 'intro' ? 'active' : ''}`} onClick={() => setActiveSection('intro')}>Intro Sezione</button>
        <button className={`editor-tab ${activeSection === 'categorie' ? 'active' : ''}`} onClick={() => setActiveSection('categorie')}>Categorie ({content.categorie?.length || 0})</button>
      </div>

      {activeSection === 'header' && (
        <div className="editor-section">
          <h3>Header Pagina</h3>
          <div className="form-group">
            <label>Titolo</label>
            <input type="text" value={content.header?.title || ''}
              onChange={e => setContent({ ...content, header: { ...content.header, title: e.target.value } })}
              placeholder="Es: Il Territorio" />
          </div>
          <div className="form-group">
            <label>Sottotitolo</label>
            <input type="text" value={content.header?.subtitle || ''}
              onChange={e => setContent({ ...content, header: { ...content.header, subtitle: e.target.value } })}
              placeholder="Es: Scopri le attrazioni di Varese e dintorni" />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('header', content.header)} disabled={saving === 'header'}>
            {saving === 'header' ? 'Salvataggio...' : 'Salva Header'}
          </button>
        </div>
      )}

      {activeSection === 'intro' && (
        <div className="editor-section">
          <h3>Titoli Sezione Attrazioni</h3>
          <div className="form-group">
            <label>Titolo</label>
            <input type="text" value={content.intro?.title || ''}
              onChange={e => setContent({ ...content, intro: { ...content.intro, title: e.target.value } })}
              placeholder="Es: Attrazioni nelle Vicinanze" />
          </div>
          <div className="form-group">
            <label>Sottotitolo</label>
            <input type="text" value={content.intro?.subtitle || ''}
              onChange={e => setContent({ ...content, intro: { ...content.intro, subtitle: e.target.value } })}
              placeholder="Es: Varese offre numerose opportunità per cultura, natura e sport" />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('intro', content.intro)} disabled={saving === 'intro'}>
            {saving === 'intro' ? 'Salvataggio...' : 'Salva Intro'}
          </button>
        </div>
      )}

      {activeSection === 'categorie' && (
        <div className="editor-section">
          <h3>Categorie di Attrazioni</h3>
          <p className="section-description">
            Ogni categoria ha un titolo e una lista di attrazioni (una per riga nel campo testo).
          </p>
          <ArrayEditor
            items={content.categorie || []}
            onChange={categorie => setContent({ ...content, categorie })}
            fields={categoriaFields}
            itemLabel="Categoria"
            maxItems={10}
            renderPreview={item => `${item.title || 'Nuova Categoria'} (${(item.items || []).length} attrazioni)`}
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => handleSave('categorie', content.categorie)} disabled={saving === 'categorie'}>
              {saving === 'categorie' ? 'Salvataggio...' : 'Salva Categorie'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TerritorioEditor;
