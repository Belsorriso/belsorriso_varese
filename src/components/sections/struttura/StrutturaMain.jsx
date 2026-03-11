import { EditableText, EditableSection, EditableList } from '../../editable';

const defaultDotazioni = [
  { text: 'Riscaldamento autonomo e aria condizionata' },
  { text: 'Televisore LCD 24" a parete' },
  { text: 'Connessione wireless ADSL gratuita' },
  { text: 'Cassaforte e frigorifero' },
  { text: 'Bagno privato con set asciugamani, asciugacapelli, bagno schiuma e shampoo' },
  { text: 'Angolo colazione con macchinetta elettrica per caffe, te, tisane' },
  { text: 'Insonorizzazione garantita' }
];

const defaultServizi = [
  { text: 'Servizio navetta aeroporto/stazioni fino a 100 km da Varese' },
  { text: 'Angolo relax con bevande e biscotti' },
  { text: 'Accoglienza animali di piccola taglia' },
  { text: 'Connessione wireless sempre attiva' }
];

const defaultPagamenti = [
  { text: 'Contanti' },
  { text: 'Bonifico Bancario' },
  { text: 'Carte di Credito' },
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
                section="capacita"
                field="text"
                tag="p"
                defaultValue="Capacita: 2 persone adulte (family room disponibile su richiesta)"
                style={{ marginTop: '20px' }}
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
              <EditableText page="struttura" section="supplementi" field="bambini" tag="p" defaultValue="Bambini fino a 3 anni: soggiorno gratuito con lettini disponibili" />
              <EditableText page="struttura" section="supplementi" field="tassa" tag="p" defaultValue="Tassa di soggiorno: 1 euro a notte per persona (dal 2018)" />
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
