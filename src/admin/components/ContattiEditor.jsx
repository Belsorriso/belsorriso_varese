import { useState, useEffect } from 'react';
import ArrayEditor from './common/ArrayEditor';
import { API_URL } from '../../config/api';

function ContattiEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('header');
  const [content, setContent] = useState({
    header: { title: '', subtitle: '' },
    main: { title: '', icon1: '', label1: '', icon2: '', label2: '', icon3: '', label3: '', icon4: '', label4: '' },
    info: { email: '', telefono: '', cell1: '', indirizzo1: '', indirizzo2: '' },
    posizione: [],
    servizi: { title: '', text: '' },
    pagamenti: []
  });

  useEffect(() => { fetchContent(); }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_URL}/content/contatti`);
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
      const response = await fetch(`${API_URL}/content/contatti/${section}`, {
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

  const posizioneFields = [
    { name: 'distance', label: 'Distanza / Tempo', type: 'text', placeholder: 'Es: 250 metri' },
    { name: 'description', label: 'Descrizione', type: 'text', placeholder: 'Es: dalle stazioni ferroviarie' }
  ];

  const pagamentoFields = [
    { name: 'text', label: 'Metodo', type: 'text', placeholder: 'Es: Contanti' }
  ];

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="editor-container">
      {message && <div className={`status-message ${message.type}`}>{message.text}</div>}

      <div className="editor-tabs">
        <button className={`editor-tab ${activeSection === 'header' ? 'active' : ''}`} onClick={() => setActiveSection('header')}>Header</button>
        <button className={`editor-tab ${activeSection === 'info' ? 'active' : ''}`} onClick={() => setActiveSection('info')}>Dati Contatto</button>
        <button className={`editor-tab ${activeSection === 'posizione' ? 'active' : ''}`} onClick={() => setActiveSection('posizione')}>Posizione ({content.posizione?.length || 0})</button>
        <button className={`editor-tab ${activeSection === 'servizi' ? 'active' : ''}`} onClick={() => setActiveSection('servizi')}>Servizi</button>
        <button className={`editor-tab ${activeSection === 'pagamenti' ? 'active' : ''}`} onClick={() => setActiveSection('pagamenti')}>Pagamenti ({content.pagamenti?.length || 0})</button>
      </div>

      {activeSection === 'header' && (
        <div className="editor-section">
          <h3>Header Pagina</h3>
          <div className="form-group">
            <label>Titolo</label>
            <input type="text" value={content.header?.title || ''}
              onChange={e => setContent({ ...content, header: { ...content.header, title: e.target.value } })}
              placeholder="Es: Contatti e Dove Siamo" />
          </div>
          <div className="form-group">
            <label>Sottotitolo</label>
            <input type="text" value={content.header?.subtitle || ''}
              onChange={e => setContent({ ...content, header: { ...content.header, subtitle: e.target.value } })}
              placeholder="Es: Raggiungerci è facilissimo" />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('header', content.header)} disabled={saving === 'header'}>
            {saving === 'header' ? 'Salvataggio...' : 'Salva Header'}
          </button>

          <h3 style={{ marginTop: '30px' }}>Titoli e Icone Sezione</h3>
          <div className="form-group">
            <label>Titolo sezione contatti</label>
            <input type="text" value={content.main?.title || ''}
              onChange={e => setContent({ ...content, main: { ...content.main, title: e.target.value } })}
              placeholder="Es: Come Contattarci" />
          </div>
          {[1, 2, 3, 4].map(i => (
            <div className="form-row" key={i}>
              <div className="form-group">
                <label>Icona {i}</label>
                <input type="text" value={content.main?.[`icon${i}`] || ''}
                  onChange={e => setContent({ ...content, main: { ...content.main, [`icon${i}`]: e.target.value } })}
                  placeholder={['📧', '📞', '📱', '📍'][i - 1]} />
              </div>
              <div className="form-group">
                <label>Etichetta {i}</label>
                <input type="text" value={content.main?.[`label${i}`] || ''}
                  onChange={e => setContent({ ...content, main: { ...content.main, [`label${i}`]: e.target.value } })}
                  placeholder={['Email', 'Telefono', 'Cellulari', 'Indirizzo'][i - 1]} />
              </div>
            </div>
          ))}
          <button className="btn btn-primary" onClick={() => handleSave('main', content.main)} disabled={saving === 'main'}>
            {saving === 'main' ? 'Salvataggio...' : 'Salva Titoli/Icone'}
          </button>
        </div>
      )}

      {activeSection === 'info' && (
        <div className="editor-section">
          <h3>Dati di Contatto</h3>
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={content.info?.email || ''}
              onChange={e => setContent({ ...content, info: { ...content.info, email: e.target.value } })}
              placeholder="belsorrisovarese@gmail.com" />
          </div>
          <div className="form-group">
            <label>Telefono fisso</label>
            <input type="text" value={content.info?.telefono || ''}
              onChange={e => setContent({ ...content, info: { ...content.info, telefono: e.target.value } })}
              placeholder="+39 0332 830744" />
          </div>
          <div className="form-group">
            <label>Cellulare</label>
            <input type="text" value={content.info?.cell1 || ''}
              onChange={e => setContent({ ...content, info: { ...content.info, cell1: e.target.value } })}
              placeholder="+39 342 18 95 829" />
          </div>
          <div className="form-group">
            <label>Indirizzo riga 1</label>
            <input type="text" value={content.info?.indirizzo1 || ''}
              onChange={e => setContent({ ...content, info: { ...content.info, indirizzo1: e.target.value } })}
              placeholder="Piazza Biroldi, 8" />
          </div>
          <div className="form-group">
            <label>Indirizzo riga 2</label>
            <input type="text" value={content.info?.indirizzo2 || ''}
              onChange={e => setContent({ ...content, info: { ...content.info, indirizzo2: e.target.value } })}
              placeholder="21100 Varese (VA) - Italia" />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('info', content.info)} disabled={saving === 'info'}>
            {saving === 'info' ? 'Salvataggio...' : 'Salva Dati Contatto'}
          </button>
        </div>
      )}

      {activeSection === 'posizione' && (
        <div className="editor-section">
          <h3>Posizione Strategica</h3>
          <p className="section-description">Ogni voce: distanza/tempo + descrizione (es: "250 metri — dalle stazioni ferroviarie").</p>
          <ArrayEditor
            items={content.posizione || []}
            onChange={posizione => setContent({ ...content, posizione })}
            fields={posizioneFields}
            itemLabel="Distanza"
            maxItems={10}
            renderPreview={item => `${item.distance || ''} ${item.description || ''}`}
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => handleSave('posizione', content.posizione)} disabled={saving === 'posizione'}>
              {saving === 'posizione' ? 'Salvataggio...' : 'Salva Posizione'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'servizi' && (
        <div className="editor-section">
          <h3>Servizi nelle Vicinanze</h3>
          <div className="form-group">
            <label>Titolo sezione</label>
            <input type="text" value={content.servizi?.title || ''}
              onChange={e => setContent({ ...content, servizi: { ...content.servizi, title: e.target.value } })}
              placeholder="Es: Servizi nelle Vicinanze" />
          </div>
          <div className="form-group">
            <label>Testo</label>
            <textarea rows={4} value={content.servizi?.text || ''}
              onChange={e => setContent({ ...content, servizi: { ...content.servizi, text: e.target.value } })}
              placeholder="Es: Nella zona sono disponibili bar, farmacia, supermercato e banca." />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('servizi', content.servizi)} disabled={saving === 'servizi'}>
            {saving === 'servizi' ? 'Salvataggio...' : 'Salva Servizi'}
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
    </div>
  );
}

export default ContattiEditor;
