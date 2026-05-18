import { useState, useEffect } from 'react';
import { API_URL } from '../../config/api';

function FooterEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('company');
  const [content, setContent] = useState({
    company: { title: '' },
    company1: { name: '', brand: '', address1: '', address2: '', city: '', piva: '' },
    company2: { name: '', address1: '', address2: '', city: '', piva: '' },
    cin: { cin1name: '', cin1: '', cin2name: '', cin2: '', cin3name: '', cin3: '' },
    contactsIt: { title: '', email: '' }
  });

  useEffect(() => { fetchContent(); }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_URL}/content/footer`);
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
      const response = await fetch(`${API_URL}/content/footer/${section}`, {
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

  const field = (section, key, label, placeholder = '') => (
    <div className="form-group" key={key}>
      <label>{label}</label>
      <input type="text" value={content[section]?.[key] || ''}
        onChange={e => setContent({ ...content, [section]: { ...content[section], [key]: e.target.value } })}
        placeholder={placeholder} />
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

      <div className="editor-tabs">
        <button className={`editor-tab ${activeSection === 'company' ? 'active' : ''}`} onClick={() => setActiveSection('company')}>Brand</button>
        <button className={`editor-tab ${activeSection === 'company1' ? 'active' : ''}`} onClick={() => setActiveSection('company1')}>Azienda 1</button>
        <button className={`editor-tab ${activeSection === 'company2' ? 'active' : ''}`} onClick={() => setActiveSection('company2')}>Azienda 2</button>
        <button className={`editor-tab ${activeSection === 'cin' ? 'active' : ''}`} onClick={() => setActiveSection('cin')}>CIN</button>
        <button className={`editor-tab ${activeSection === 'contactsIt' ? 'active' : ''}`} onClick={() => setActiveSection('contactsIt')}>Contatti</button>
      </div>

      {activeSection === 'company' && (
        <div className="editor-section">
          <h3>Brand / Titolo Footer</h3>
          {field('company', 'title', 'Titolo brand', 'Es: BelSorrisoVarese – Dormire Felice')}
          {saveBtn('company', 'Salva Brand')}
        </div>
      )}

      {activeSection === 'company1' && (
        <div className="editor-section">
          <h3>Prima Azienda (Select di Pecchio Nicolò)</h3>
          {field('company1', 'name', 'Ragione Sociale', 'Es: Select di Pecchio Nicolò')}
          {field('company1', 'brand', 'Brand', 'Es: BelSorrisoVarese')}
          {field('company1', 'address1', 'Sede Legale', 'Es: Sede Legale: Piazza Biroldi, 8')}
          {field('company1', 'address2', 'Sede Operativa', 'Es: Sede Operativa: Piazza Biroldi, 20')}
          {field('company1', 'city', 'Città', 'Es: 21100 Varese')}
          {field('company1', 'piva', 'Partita IVA', 'Es: P.IVA 02087850125')}
          {saveBtn('company1', 'Salva Azienda 1')}
        </div>
      )}

      {activeSection === 'company2' && (
        <div className="editor-section">
          <h3>Seconda Azienda (HAPPI DAY SRL)</h3>
          {field('company2', 'name', 'Ragione Sociale', 'Es: HAPPI DAY SRL')}
          {field('company2', 'address1', 'Sede Legale', 'Es: Sede Legale: P.za Motta, 6')}
          {field('company2', 'address2', 'Sede Operativa', 'Es: Sede Operativa: P.za Biroldi, 7')}
          {field('company2', 'city', 'Città', 'Es: 21100 Varese')}
          {field('company2', 'piva', 'Partita IVA', 'Es: Partita IVA 03645460126')}
          {saveBtn('company2', 'Salva Azienda 2')}
        </div>
      )}

      {activeSection === 'cin' && (
        <div className="editor-section">
          <h3>Codici CIN (Codice Identificativo Nazionale)</h3>
          <div className="form-row">
            {field('cin', 'cin1name', 'Nome struttura 1', 'Es: • Foresteria Belsorriso Happi')}
            {field('cin', 'cin1', 'CIN 1', 'Es: CIN: IT012133B4I9KHS63N')}
          </div>
          <div className="form-row">
            {field('cin', 'cin2name', 'Nome struttura 2', 'Es: • Casa e Appartamenti per Vacanze Belsorriso')}
            {field('cin', 'cin2', 'CIN 2', 'Es: CIN: IT012133B4ZUUYL2CK')}
          </div>
          <div className="form-row">
            {field('cin', 'cin3name', 'Nome struttura 3', 'Es: • Belsorriso Foresteria Lombarda')}
            {field('cin', 'cin3', 'CIN 3', 'Es: CIN: IT012133B45H2APG6U')}
          </div>
          {saveBtn('cin', 'Salva CIN')}
        </div>
      )}

      {activeSection === 'contactsIt' && (
        <div className="editor-section">
          <h3>Contatti Footer</h3>
          {field('contactsIt', 'title', 'Titolo sezione contatti', 'Es: Contatti')}
          {field('contactsIt', 'email', 'Email', 'Es: belsorrisovarese@gmail.com')}
          {saveBtn('contactsIt', 'Salva Contatti')}
        </div>
      )}
    </div>
  );
}

export default FooterEditor;
