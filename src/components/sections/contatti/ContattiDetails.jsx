import { EditableText, EditableSection, EditableList } from '../../editable';

const defaultPosizione = [
  { distance: '20 metri', description: 'dalla fermata autobus per le stazioni ferroviarie' },
  { distance: '250 metri', description: 'dalle due stazioni ferroviarie della citta' },
  { distance: '60 metri', description: "dall'Ospedale Filippo del Ponte" },
  { distance: '4 minuti', description: 'a piedi dal cuore della citta' },
];

const defaultPagamenti = [
  { text: 'Contanti' },
  { text: 'Bonifico Bancario' },
  { text: 'Carte di Credito' },
  { text: 'Satispay' },
  { text: 'PayPal' },
];

function ContattiDetails() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-details">
            <EditableSection label="Contatti">
              <EditableText page="contatti" section="main" field="title" tag="h2" defaultValue="Come Contattarci" />

              <div className="contact-item">
                <EditableText page="contatti" section="main" field="icon1" tag="span" className="icon" defaultValue="📧" />
                <div>
                  <EditableText page="contatti" section="main" field="label1" tag="h3" defaultValue="Email" />
                  <EditableText page="contatti" section="info" field="email" tag="p" defaultValue="belsorrisovarese@gmail.com" />
                </div>
              </div>

              <div className="contact-item">
                <EditableText page="contatti" section="main" field="icon2" tag="span" className="icon" defaultValue="📞" />
                <div>
                  <EditableText page="contatti" section="main" field="label2" tag="h3" defaultValue="Telefono" />
                  <EditableText page="contatti" section="info" field="telefono" tag="p" defaultValue="+39 0332 830744" />
                </div>
              </div>

              <div className="contact-item">
                <EditableText page="contatti" section="main" field="icon3" tag="span" className="icon" defaultValue="📱" />
                <div>
                  <EditableText page="contatti" section="main" field="label3" tag="h3" defaultValue="Cellulari" />
                  <EditableText page="contatti" section="info" field="cell1" tag="p" defaultValue="+39 342 18 95 829" />
                </div>
              </div>

              <div className="contact-item">
                <EditableText page="contatti" section="main" field="icon4" tag="span" className="icon" defaultValue="📍" />
                <div>
                  <EditableText page="contatti" section="main" field="label4" tag="h3" defaultValue="Indirizzo" />
                  <EditableText page="contatti" section="info" field="indirizzo1" tag="p" defaultValue="Piazza Biroldi, 8" />
                  <EditableText page="contatti" section="info" field="indirizzo2" tag="p" defaultValue="21100 Varese (VA) - Italia" />
                </div>
              </div>
            </EditableSection>

            <EditableSection label="Posizione">
              <EditableText
                page="contatti"
                section="posizione"
                field="title"
                tag="h2"
                defaultValue="Posizione Strategica"
                style={{ marginTop: '40px' }}
              />
              <EditableList
                page="contatti"
                section="posizione"
                className=""
                addLabel="Aggiungi distanza"
                emptyMessage=""
                itemTemplate={{ distance: 'X metri', description: 'da...' }}
                defaultItems={defaultPosizione}
                renderItem={(item) => (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e0e0e0' }}>
                      <strong>{item.distance}</strong> {item.description}
                    </li>
                  </ul>
                )}
                renderEditItem={(item, updateField) => (
                  <>
                    <div className="form-group">
                      <label>Distanza / Tempo</label>
                      <input type="text" value={item.distance || ''} onChange={(e) => updateField('distance', e.target.value)} placeholder="Es: 250 metri" />
                    </div>
                    <div className="form-group">
                      <label>Descrizione</label>
                      <input type="text" value={item.description || ''} onChange={(e) => updateField('description', e.target.value)} placeholder="Es: dalle stazioni ferroviarie" />
                    </div>
                  </>
                )}
              />
            </EditableSection>

            <EditableSection label="Servizi">
              <EditableText
                page="contatti"
                section="servizi"
                field="title"
                tag="h2"
                defaultValue="Servizi nelle Vicinanze"
                style={{ marginTop: '40px' }}
              />
              <EditableText
                page="contatti"
                section="servizi"
                field="text"
                tag="p"
                multiline
                defaultValue="Nella zona sono disponibili numerosi servizi come bar, farmacia, supermercato e banca."
                style={{ marginTop: '15px', color: '#666' }}
              />
            </EditableSection>

            <EditableSection label="Pagamenti">
              <EditableText
                page="contatti"
                section="pagamenti"
                field="title"
                tag="h2"
                defaultValue="Metodi di Pagamento"
                style={{ marginTop: '40px' }}
              />
              <EditableList
                page="contatti"
                section="pagamenti"
                className="payment-methods"
                itemClassName="payment-method"
                addLabel="Aggiungi metodo"
                emptyMessage=""
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

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.5!2d8.8237!3d45.8164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867e5c1a9b7e9b%3A0x1234567890abcdef!2sPiazza%20Biroldi%2C%208%2C%2021100%20Varese%20VA!5e0!3m2!1sit!2sit!4v1234567890"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa BelSorriso Varese"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContattiDetails;
