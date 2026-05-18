import { useState, useEffect } from 'react';
import ArrayEditor from './common/ArrayEditor';
import { API_URL } from '../../config/api';

function RegolamentoEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('header');
  const [content, setContent] = useState({
    header: { title: '', subtitle: '' },
    regole: [],
    pagamenti: { title: '', text: '' },
    contattiSection: { title: '', icon1: '', label1: '', icon2: '', label2: '', icon3: '', label3: '' },
    contatti: { telefonoFisso: '', cell1: '', email: '' }
  });

  useEffect(() => { fetchContent(); }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_URL}/content/regolamento`);
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
      const response = await fetch(`${API_URL}/content/regolamento/${section}`, {
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

  const regolaFields = [
    { name: 'title', label: 'Titolo Regola', type: 'text', placeholder: 'Es: Divieto di Fumo' },
    { name: 'text', label: 'Descrizione', type: 'textarea', placeholder: 'Descrizione della regola...', rows: 4 }
  ];

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="editor-container">
      {message && <div className={`status-message ${message.type}`}>{message.text}</div>}

      <div className="editor-tabs">
        <button className={`editor-tab ${activeSection === 'header' ? 'active' : ''}`} onClick={() => setActiveSection('header')}>Header</button>
        <button className={`editor-tab ${activeSection === 'regole' ? 'active' : ''}`} onClick={() => setActiveSection('regole')}>Regole ({content.regole?.length || 0})</button>
        <button className={`editor-tab ${activeSection === 'pagamenti' ? 'active' : ''}`} onClick={() => setActiveSection('pagamenti')}>Pagamenti</button>
        <button className={`editor-tab ${activeSection === 'contatti' ? 'active' : ''}`} onClick={() => setActiveSection('contatti')}>Contatti</button>
      </div>

      {activeSection === 'header' && (
        <div className="editor-section">
          <h3>Header Pagina</h3>
          <div className="form-group">
            <label>Titolo</label>
            <input type="text" value={content.header?.title || ''}
              onChange={e => setContent({ ...content, header: { ...content.header, title: e.target.value } })}
              placeholder="Es: Regolamento ed Informazioni" />
          </div>
          <div className="form-group">
            <label>Sottotitolo</label>
            <input type="text" value={content.header?.subtitle || ''}
              onChange={e => setContent({ ...content, header: { ...content.header, subtitle: e.target.value } })}
              placeholder="Es: Tutto quello che devi sapere per il tuo soggiorno" />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('header', content.header)} disabled={saving === 'header'}>
            {saving === 'header' ? 'Salvataggio...' : 'Salva Header'}
          </button>
        </div>
      )}

      {activeSection === 'regole' && (
        <div className="editor-section">
          <h3>Regole della Casa</h3>
          <p className="section-description">Ogni regola è mostrata come una card con titolo e testo.</p>
          <ArrayEditor
            items={content.regole || []}
            onChange={regole => setContent({ ...content, regole })}
            fields={regolaFields}
            itemLabel="Regola"
            maxItems={15}
            renderPreview={item => item.title || 'Nuova Regola'}
          />
          <div className="form-actions">
            <button className="btn btn-primary" onClick={() => handleSave('regole', content.regole)} disabled={saving === 'regole'}>
              {saving === 'regole' ? 'Salvataggio...' : 'Salva Regole'}
            </button>
          </div>
        </div>
      )}

      {activeSection === 'pagamenti' && (
        <div className="editor-section">
          <h3>Metodi di Pagamento</h3>
          <div className="form-group">
            <label>Titolo sezione</label>
            <input type="text" value={content.pagamenti?.title || ''}
              onChange={e => setContent({ ...content, pagamenti: { ...content.pagamenti, title: e.target.value } })}
              placeholder="Es: Metodi di Pagamento Accettati" />
          </div>
          <div className="form-group">
            <label>Testo</label>
            <textarea rows={3} value={content.pagamenti?.text || ''}
              onChange={e => setContent({ ...content, pagamenti: { ...content.pagamenti, text: e.target.value } })}
              placeholder="Es: Contanti - Bonifici bancari - Carte di credito - Satispay" />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('pagamenti', content.pagamenti)} disabled={saving === 'pagamenti'}>
            {saving === 'pagamenti' ? 'Salvataggio...' : 'Salva Pagamenti'}
          </button>
        </div>
      )}

      {activeSection === 'contatti' && (
        <div className="editor-section">
          <h3>Sezione Contatti – Titoli e Icone</h3>
          <div className="form-group">
            <label>Titolo sezione contatti</label>
            <input type="text" value={content.contattiSection?.title || ''}
              onChange={e => setContent({ ...content, contattiSection: { ...content.contattiSection, title: e.target.value } })}
              placeholder="Es: Contatti per Informazioni" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Icona 1</label>
              <input type="text" value={content.contattiSection?.icon1 || ''}
                onChange={e => setContent({ ...content, contattiSection: { ...content.contattiSection, icon1: e.target.value } })}
                placeholder="📞" />
            </div>
            <div className="form-group">
              <label>Etichetta 1</label>
              <input type="text" value={content.contattiSection?.label1 || ''}
                onChange={e => setContent({ ...content, contattiSection: { ...content.contattiSection, label1: e.target.value } })}
                placeholder="Telefono Fisso" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Icona 2</label>
              <input type="text" value={content.contattiSection?.icon2 || ''}
                onChange={e => setContent({ ...content, contattiSection: { ...content.contattiSection, icon2: e.target.value } })}
                placeholder="📱" />
            </div>
            <div className="form-group">
              <label>Etichetta 2</label>
              <input type="text" value={content.contattiSection?.label2 || ''}
                onChange={e => setContent({ ...content, contattiSection: { ...content.contattiSection, label2: e.target.value } })}
                placeholder="Cellulari" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Icona 3</label>
              <input type="text" value={content.contattiSection?.icon3 || ''}
                onChange={e => setContent({ ...content, contattiSection: { ...content.contattiSection, icon3: e.target.value } })}
                placeholder="📧" />
            </div>
            <div className="form-group">
              <label>Etichetta 3</label>
              <input type="text" value={content.contattiSection?.label3 || ''}
                onChange={e => setContent({ ...content, contattiSection: { ...content.contattiSection, label3: e.target.value } })}
                placeholder="Email" />
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('contattiSection', content.contattiSection)} disabled={saving === 'contattiSection'}>
            {saving === 'contattiSection' ? 'Salvataggio...' : 'Salva Titoli/Icone'}
          </button>

          <h3 style={{ marginTop: '30px' }}>Dati di Contatto</h3>
          <div className="form-group">
            <label>Telefono fisso</label>
            <input type="text" value={content.contatti?.telefonoFisso || ''}
              onChange={e => setContent({ ...content, contatti: { ...content.contatti, telefonoFisso: e.target.value } })}
              placeholder="+39 0332 830744" />
          </div>
          <div className="form-group">
            <label>Cellulare</label>
            <input type="text" value={content.contatti?.cell1 || ''}
              onChange={e => setContent({ ...content, contatti: { ...content.contatti, cell1: e.target.value } })}
              placeholder="+39 342 1895829" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={content.contatti?.email || ''}
              onChange={e => setContent({ ...content, contatti: { ...content.contatti, email: e.target.value } })}
              placeholder="belsorrisovarese@gmail.com" />
          </div>
          <button className="btn btn-primary" onClick={() => handleSave('contatti', content.contatti)} disabled={saving === 'contatti'}>
            {saving === 'contatti' ? 'Salvataggio...' : 'Salva Dati Contatto'}
          </button>
        </div>
      )}
    </div>
  );
}

export default RegolamentoEditor;
