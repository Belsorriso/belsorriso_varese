import { useState, useEffect } from 'react';
import ArrayEditor from './common/ArrayEditor';
import { API_URL } from '../../config/api';

function StrutturaEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('header');
  const [content, setContent] = useState({
    header: { title: '', subtitle: '' },
    main: { title: '', intro: '' },
    dotazioni: [],
    serviziAggiuntivi: [],
    supplementi: { bambini: '', tassa: '', soggiorni: '' },
    pagamenti: [],
    sidebar: { contattiTitle: '', posizioneTitle: '' },
    sidebarContatti: [],
    sidebarPosizione: []
  });

  useEffect(() => { fetchContent(); }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_URL}/content/struttura`);
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
      const response = await fetch(`${API_URL}/content/struttura/${section}`, {
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

  const listItemFields = [
    { name: 'text', label: 'Testo', type: 'text', placeholder: 'Es: Riscaldamento autonomo' }
  ];

  const contattoFields = [
    { name: 'label', label: 'Etichetta', type: 'text', placeholder: 'Es: Email' },
    { name: 'value', label: 'Valore', type: 'text', placeholder: 'Es: belsorrisovarese@gmail.com' }
  ];

  const posizioneFields = [
    { name: 'text', label: 'Distanza / servizio', type: 'text', placeholder: 'Es: 250m dalle stazioni ferroviarie' }
  ];

  const pagamentoFields = [
    { name: 'text', label: 'Metodo', type: 'text', placeholder: 'Es: Contanti' }
  ];

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="editor-container">
      {message && <div className={`status-message ${message.type}`}>{message.text}</div>}

      <div className="editor-tabs">
        {[
          { id: 'header', label: 'Header' },
          { id: 'main', label: 'Contenuto' },
          { id: 'dotazioni', label: `Dotazioni (${content.dotazioni?.length || 0})` },
          { id: 'serviziAggiuntivi', label: `Servizi (${content.serviziAggiuntivi?.length || 0})` },
          { id: 'supplementi', label: 'Supplementi' },
          { id: 'pagamenti', label: `Pagamenti (${content.pagamenti?.length || 0})` },
          { id: 'sidebar', label: 'Sidebar' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`editor-tab ${activeSection === tab.id ? 'active' : ''}`}
            onClick={() => setActiveSection(tab.id)}
          >{tab.label}</button>
        ))}
      </div>

      {activeSection === 'header' && (
        <div className="editor-section">
          <h3>Header Pagina</h3>
          <div className="form-group">
            <label>Titolo</label>
            <input type="text" value={content.header?.title || ''}
              onChange={e => setContent({ ...content, header: { ...content.header, title: e.target.value } })}
              placeholder="Es: Struttura e Servizi" />
          </div>
          <div className="form-group">
            <label>Sottotitolo</label>
            <input type="text" value={content.header?.subtitle || ''}
              onChange={e => setContent({ ...content, header: { ...content.header, subtitle: e.target.value } })}
              placeholder="Es: Ambiente accogliente ed informale" />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('header', content.header)} disabled={saving === 'header'}>
            {saving === 'header' ? 'Salvataggio...' : 'Salva Header'}
          </button>
        </div>
      )}

      {activeSection === 'main' && (
        <div className="editor-section">
          <h3>Contenuto Principale</h3>
          <div className="form-group">
            <label>Titolo sezione</label>
            <input type="text" value={content.main?.title || ''}
              onChange={e => setContent({ ...content, main: { ...content.main, title: e.target.value } })}
              placeholder="Es: Le Nostre Camere" />
          </div>
          <div className="form-group">
            <label>Testo introduttivo</label>
            <textarea rows={5} value={content.main?.intro || ''}
              onChange={e => setContent({ ...content, main: { ...content.main, intro: e.target.value } })}
              placeholder="Descrizione della struttura..." />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('main', content.main)} disabled={saving === 'main'}>
            {saving === 'main' ? 'Salvataggio...' : 'Salva Contenuto'}
          </button>
        </div>
      )}

      {activeSection === 'dotazioni' && (
        <div className="editor-section">
          <h3>Dotazioni delle Camere</h3>
          <p className="section-description">Ogni voce è una dotazione mostrata con la spunta ✓.</p>
          <ArrayEditor
            items={content.dotazioni || []}
            onChange={dotazioni => setContent({ ...content, dotazioni })}
            fields={listItemFields}
            itemLabel="Dotazione"
            maxItems={20}
            renderPreview={item => item.text || 'Nuova dotazione'}
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => handleSave('dotazioni', content.dotazioni)} disabled={saving === 'dotazioni'}>
              {saving === 'dotazioni' ? 'Salvataggio...' : 'Salva Dotazioni'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'serviziAggiuntivi' && (
        <div className="editor-section">
          <h3>Servizi Aggiuntivi</h3>
          <p className="section-description">Servizi extra disponibili (es: animali ammessi).</p>
          <ArrayEditor
            items={content.serviziAggiuntivi || []}
            onChange={serviziAggiuntivi => setContent({ ...content, serviziAggiuntivi })}
            fields={listItemFields}
            itemLabel="Servizio"
            maxItems={15}
            renderPreview={item => item.text || 'Nuovo servizio'}
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => handleSave('serviziAggiuntivi', content.serviziAggiuntivi)} disabled={saving === 'serviziAggiuntivi'}>
              {saving === 'serviziAggiuntivi' ? 'Salvataggio...' : 'Salva Servizi'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'supplementi' && (
        <div className="editor-section">
          <h3>Supplementi e Condizioni</h3>
          <div className="form-group">
            <label>Bambini</label>
            <input type="text" value={content.supplementi?.bambini || ''}
              onChange={e => setContent({ ...content, supplementi: { ...content.supplementi, bambini: e.target.value } })}
              placeholder="Es: Bambini fino a 3 anni: soggiorno gratuito" />
          </div>
          <div className="form-group">
            <label>Tassa di soggiorno</label>
            <input type="text" value={content.supplementi?.tassa || ''}
              onChange={e => setContent({ ...content, supplementi: { ...content.supplementi, tassa: e.target.value } })}
              placeholder="Es: 1 euro a notte per adulti" />
          </div>
          <div className="form-group">
            <label>Soggiorni lunghi</label>
            <input type="text" value={content.supplementi?.soggiorni || ''}
              onChange={e => setContent({ ...content, supplementi: { ...content.supplementi, soggiorni: e.target.value } })}
              placeholder="Es: Offerte speciali disponibili su richiesta" />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('supplementi', content.supplementi)} disabled={saving === 'supplementi'}>
            {saving === 'supplementi' ? 'Salvataggio...' : 'Salva Supplementi'}
          </button>
        </div>
      )}

      {activeSection === 'pagamenti' && (
        <div className="editor-section">
          <h3>Metodi di Pagamento</h3>
          <ArrayEditor
            items={content.pagamenti || []}
            onChange={pagamenti => setContent({ ...content, pagamenti })}
            fields={pagamentoFields}
            itemLabel="Metodo"
            maxItems={10}
            renderPreview={item => item.text || 'Nuovo metodo'}
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => handleSave('pagamenti', content.pagamenti)} disabled={saving === 'pagamenti'}>
              {saving === 'pagamenti' ? 'Salvataggio...' : 'Salva Pagamenti'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'sidebar' && (
        <div className="editor-section">
          <h3>Sidebar – Contatti Rapidi</h3>
          <div className="form-group">
            <label>Titolo contatti sidebar</label>
            <input type="text" value={content.sidebar?.contattiTitle || ''}
              onChange={e => setContent({ ...content, sidebar: { ...content.sidebar, contattiTitle: e.target.value } })}
              placeholder="Es: Contatti Rapidi" />
          </div>
          <ArrayEditor
            items={content.sidebarContatti || []}
            onChange={sidebarContatti => setContent({ ...content, sidebarContatti })}
            fields={contattoFields}
            itemLabel="Contatto"
            maxItems={8}
            renderPreview={item => `${item.label || ''}: ${item.value || ''}`}
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => { handleSave('sidebar', content.sidebar); handleSave('sidebarContatti', content.sidebarContatti); }} disabled={saving !== null}>
              {saving !== null ? 'Salvataggio...' : 'Salva Contatti Sidebar'}
            </button>
          </div>

          <h3 style={{ marginTop: '30px' }}>Sidebar – Posizione Strategica</h3>
          <div className="form-group">
            <label>Titolo posizione sidebar</label>
            <input type="text" value={content.sidebar?.posizioneTitle || ''}
              onChange={e => setContent({ ...content, sidebar: { ...content.sidebar, posizioneTitle: e.target.value } })}
              placeholder="Es: Posizione Strategica" />
          </div>
          <ArrayEditor
            items={content.sidebarPosizione || []}
            onChange={sidebarPosizione => setContent({ ...content, sidebarPosizione })}
            fields={posizioneFields}
            itemLabel="Distanza"
            maxItems={10}
            renderPreview={item => item.text || 'Nuova distanza'}
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => handleSave('sidebarPosizione', content.sidebarPosizione)} disabled={saving === 'sidebarPosizione'}>
              {saving === 'sidebarPosizione' ? 'Salvataggio...' : 'Salva Posizione Sidebar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StrutturaEditor;
