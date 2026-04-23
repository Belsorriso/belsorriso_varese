import { useState } from 'react';
import { EditableText, EditableSection, EditableList } from '../../editable';

const areaRelaxImages = [
  '/images/area-relax/1-IMG_6626.jpg',
  '/images/area-relax/2-IMG_6625.jpg',
  '/images/area-relax/3-IMG_6624.jpg',
  '/images/area-relax/4-IMG_6622.jpg',
];

function AreaRelaxGallery() {
  const [current, setCurrent] = useState(0);
  return (
    <div style={{ position: 'relative', marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}>
      <img
        src={areaRelaxImages[current]}
        alt={`Area Relax ${current + 1}`}
        style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
      />
      {areaRelaxImages.length > 1 && (
        <>
          <button onClick={() => setCurrent((p) => (p - 1 + areaRelaxImages.length) % areaRelaxImages.length)}
            style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>‹</button>
          <button onClick={() => setCurrent((p) => (p + 1) % areaRelaxImages.length)}
            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>›</button>
          <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
            {areaRelaxImages.map((_, i) => (
              <span key={i} onClick={() => setCurrent(i)}
                style={{ width: 8, height: 8, borderRadius: '50%', background: i === current ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'block' }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const defaultDotazioni = [
  { text: 'Riscaldamento autonomo (termosifoni + split condizionatore)' },
  { text: 'TV Smart 32" a parete' },
  { text: 'Connessione wireless ADSL gratuita' },
  { text: 'Cassaforte e frigorifero' },
  { text: 'Bagno privato con set asciugamani, asciugacapelli, bagno schiuma e shampoo' },
  { text: 'Angolo colazione con macchinetta elettrica per caffe, te, tisane' },
  { text: 'Insonorizzazione garantita' }
];

const defaultServizi = [
  { text: 'Accoglienza animali' },
];

const defaultPagamenti = [
  { text: 'Contanti' },
  { text: 'Bonifico Bancario' },
  { text: 'Carte di Credito' },
  { text: 'Satispay' },
  { text: 'PayPal' },
];

const defaultContatti = [
  { label: 'Email', value: 'belsorrisovarese@gmail.com' },
  { label: 'Tel', value: '+39 0332 830744' },
  { label: 'Cell', value: '+39 342 18 95 829' },
  { label: 'Indirizzo', value: 'Piazza Biroldi, 8 - 21100 Varese' },
];

const defaultPosizione = [
  { text: '250m dalle stazioni ferroviarie' },
  { text: "60m dall'Ospedale Filippo del Ponte" },
  { text: '4 minuti a piedi dal centro' },
  { text: '20m dalla fermata autobus' },
];

const listItemStyle = { padding: '8px 0', paddingLeft: '25px', position: 'relative', color: 'var(--text-light)' };
const checkStyle = { position: 'absolute', left: 0, color: 'var(--primary-color)', fontWeight: 'bold' };

function StrutturaMain() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="content-grid">
          <div className="content-main">
            <EditableSection label="Contenuto Principale">
              <EditableText
                page="struttura"
                section="main"
                field="title"
                tag="h2"
                defaultValue="Le Nostre Camere"
              />
              <EditableText
                page="struttura"
                section="main"
                field="intro"
                tag="p"
                multiline
                defaultValue="La struttura offre camere completamente ristrutturate in un ambiente informale con entrata autonoma in una corte. Le camere dispongono di materasso e cuscini ignifughi in memory e bagno privato con doccia, direttamente comunicante con la camera."
              />

              <EditableText
                page="struttura"
                section="dotazioni"
                field="title"
                tag="h3"
                defaultValue="Dotazioni delle Camere"
              />
              <EditableList
                page="struttura"
                section="dotazioni"
                className=""
                addLabel="Aggiungi dotazione"
                emptyMessage="Nessuna dotazione configurata"
                itemTemplate={{ text: 'Nuova dotazione' }}
                defaultItems={defaultDotazioni}
                renderItem={(item) => (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li style={listItemStyle}>
                      <span style={checkStyle}>✓</span>
                      {item.text}
                    </li>
                  </ul>
                )}
                renderEditItem={(item, updateField) => (
                  <div className="form-group">
                    <label>Dotazione</label>
                    <input type="text" value={item.text || ''} onChange={(e) => updateField('text', e.target.value)} />
                  </div>
                )}
              />

              <EditableText
                page="struttura"
                section="serviziAggiuntivi"
                field="title"
                tag="h3"
                defaultValue="Servizi Aggiuntivi"
              />
              <EditableList
                page="struttura"
                section="serviziAggiuntivi"
                className=""
                addLabel="Aggiungi servizio"
                emptyMessage="Nessun servizio configurato"
                itemTemplate={{ text: 'Nuovo servizio' }}
                defaultItems={defaultServizi}
                renderItem={(item) => (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li style={listItemStyle}>
                      <span style={checkStyle}>✓</span>
                      {item.text}
                    </li>
                  </ul>
                )}
                renderEditItem={(item, updateField) => (
                  <div className="form-group">
                    <label>Servizio</label>
                    <input type="text" value={item.text || ''} onChange={(e) => updateField('text', e.target.value)} />
                  </div>
                )}
              />

              <EditableText
                page="struttura"
                section="supplementi"
                field="title"
                tag="h3"
                defaultValue="Supplementi e Condizioni"
              />
              <EditableText page="struttura" section="supplementi" field="bambini" tag="p" defaultValue="Bambini fino a 3 anni: soggiorno gratuito con lettini e culle disponibili" />
              <EditableText page="struttura" section="supplementi" field="tassa" tag="p" defaultValue="Tassa di soggiorno: 1 euro a notte per adulti" />
              <EditableText page="struttura" section="supplementi" field="soggiorni" tag="p" defaultValue="Soggiorni lunghi: offerte speciali disponibili su richiesta" />

              <EditableText
                page="struttura"
                section="pagamenti"
                field="title"
                tag="h3"
                defaultValue="Metodi di Pagamento"
              />
              <EditableList
                page="struttura"
                section="pagamenti"
                className="payment-methods"
                itemClassName="payment-method"
                addLabel="Aggiungi metodo"
                emptyMessage="Nessun metodo configurato"
                itemTemplate={{ text: 'Nuovo metodo' }}
                defaultItems={defaultPagamenti}
                renderItem={(item) => <span>{item.text}</span>}
                renderEditItem={(item, updateField) => (
                  <div className="form-group">
                    <label>Metodo di pagamento</label>
                    <input type="text" value={item.text || ''} onChange={(e) => updateField('text', e.target.value)} />
                  </div>
                )}
              />
            </EditableSection>
          </div>

          <div className="content-relax">
            <EditableSection label="Area Relax">
              <h2>Area Relax</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '12px' }}>
                Area comune a disposizione degli ospiti delle camere, pensata per offrire comfort e praticità durante il soggiorno. L'area dispone di:
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {[
                  'Microonde',
                  'Macchine del caffè',
                  'Bollitore con selezione di tè',
                  'Scaldalatte per bambini',
                  'Angolo lavaggio con acqua e sapone per la pulizia di piccoli oggetti',
                  'Scrivanie utilizzabili sia per lavorare che per mangiare',
                  'Cavi per la ricarica dei dispositivi',
                  'Giochi, giocattoli e libri da colorare per bambini',
                  'Divano per rilassarsi',
                  'Connessione internet disponibile',
                ].map((item, i) => (
                  <li key={i} style={{ padding: '4px 0', paddingLeft: '20px', position: 'relative', color: 'var(--text-light)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--primary-color)', fontWeight: 'bold' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <AreaRelaxGallery />
            </EditableSection>
          </div>

          <aside className="content-sidebar">
            <EditableSection label="Sidebar">
              <EditableText
                page="struttura"
                section="sidebar"
                field="contattiTitle"
                tag="h3"
                defaultValue="Contatti Rapidi"
              />
              <EditableList
                page="struttura"
                section="sidebarContatti"
                className=""
                addLabel="Aggiungi contatto"
                emptyMessage=""
                itemTemplate={{ label: 'Etichetta', value: 'Valore' }}
                defaultItems={defaultContatti}
                renderItem={(item) => (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li style={{ padding: '4px 0' }}><strong>{item.label}:</strong> {item.value}</li>
                  </ul>
                )}
                renderEditItem={(item, updateField) => (
                  <>
                    <div className="form-group">
                      <label>Etichetta</label>
                      <input type="text" value={item.label || ''} onChange={(e) => updateField('label', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Valore</label>
                      <input type="text" value={item.value || ''} onChange={(e) => updateField('value', e.target.value)} />
                    </div>
                  </>
                )}
              />

              <EditableText
                page="struttura"
                section="sidebar"
                field="posizioneTitle"
                tag="h3"
                defaultValue="Posizione Strategica"
                style={{ marginTop: '30px' }}
              />
              <EditableList
                page="struttura"
                section="sidebarPosizione"
                className=""
                addLabel="Aggiungi distanza"
                emptyMessage=""
                itemTemplate={{ text: 'Nuova distanza' }}
                defaultItems={defaultPosizione}
                renderItem={(item) => (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li style={{ padding: '4px 0' }}>{item.text}</li>
                  </ul>
                )}
                renderEditItem={(item, updateField) => (
                  <div className="form-group">
                    <label>Distanza / servizio</label>
                    <input type="text" value={item.text || ''} onChange={(e) => updateField('text', e.target.value)} />
                  </div>
                )}
              />
            </EditableSection>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default StrutturaMain;
