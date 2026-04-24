import { EditableText, EditableSection, EditableList } from '../../editable';

const defaultRegole = [
  {
    title: 'Divieto di Fumo',
    text: "È vietato fumare in tutte le camere e negli spazi comuni interni. È consentito fumare nel cortile o sui balconi delle camere e degli appartamenti."
  },
  {
    title: 'Colazione',
    text: 'La colazione è disponibile a pagamento in convenzione con i bar situati nella piazza pedonale di fronte alla struttura, con opzione di colazione tipica italiana.'
  },
  {
    title: 'Camere e Servizi',
    text: 'Le stanze includono bagno privato, asciugamani e biancheria rinnovati ogni tre giorni, asciugacapelli e prodotti per la doccia. Ogni camera dispone di una cassaforte. Nelle camere la pulizia viene effettuata ogni giorno e negli appartamenti una volta a settimana per soggiorni più lunghi di 1 settimana.'
  },
  {
    title: 'Custodia Effetti Personali',
    text: 'Gli ospiti sono responsabili dei propri oggetti. In caso di smarrimento delle chiavi, viene addebitato un costo di 30 euro per la sostituzione.'
  },
  {
    title: 'Check-in',
    text: "Il check-in è previsto dalle 14:00 alle 19:00. È possibile eseguire il check-in fuori dagli orari previsti, fino alla mezzanotte, contattandoci preventivamente."
  },
  {
    title: 'Check-out',
    text: 'Il check-out deve essere effettuato entro le 10:30. Per la pulizia, la camera deve restare libera entro le 11:00.'
  }
];

function RegolamentoContent() {
  return (
    <section className="content-section">
      <div className="container">
        <EditableSection label="Regole">
          <EditableList
            page="regolamento"
            section="regole"
            className="rules-grid"
            addLabel="Aggiungi regola"
            emptyMessage="Nessuna regola configurata"
            itemTemplate={{ title: 'Nuova Regola', text: 'Descrizione della regola...' }}
            defaultItems={defaultRegole}
            renderItem={(item) => (
              <div className="rule-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            )}
            renderEditItem={(item, updateField) => (
              <>
                <div className="form-group">
                  <label>Titolo</label>
                  <input type="text" value={item.title || ''} onChange={(e) => updateField('title', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Descrizione</label>
                  <textarea value={item.text || ''} onChange={(e) => updateField('text', e.target.value)} rows={4} />
                </div>
              </>
            )}
          />
        </EditableSection>

        <EditableSection label="Pagamenti">
          <div className="highlight-box">
            <EditableText
              page="regolamento"
              section="pagamenti"
              field="title"
              tag="h3"
              defaultValue="Metodi di Pagamento Accettati"
            />
            <EditableText
              page="regolamento"
              section="pagamenti"
              field="text"
              tag="p"
              defaultValue="Contanti (entro i limiti di legge) - Bonifici bancari anticipati - Carte di credito - Satispay - PayPal"
            />
          </div>
        </EditableSection>

        <EditableSection label="Contatti">
          <div className="content-section">
            <EditableText
              page="regolamento"
              section="contattiSection"
              field="title"
              tag="h2"
              defaultValue="Contatti per Informazioni"
              style={{ textAlign: 'center', marginBottom: '30px' }}
            />
            <div className="contact-info">
              <div className="contact-card">
                <EditableText page="regolamento" section="contattiSection" field="icon1" tag="div" className="icon" defaultValue="📞" />
                <EditableText page="regolamento" section="contattiSection" field="label1" tag="h3" defaultValue="Telefono Fisso" />
                <EditableText page="regolamento" section="contatti" field="telefonoFisso" tag="p" defaultValue="+39 0332 830744" />
              </div>
              <div className="contact-card">
                <EditableText page="regolamento" section="contattiSection" field="icon2" tag="div" className="icon" defaultValue="📱" />
                <EditableText page="regolamento" section="contattiSection" field="label2" tag="h3" defaultValue="Cellulari" />
                <EditableText page="regolamento" section="contatti" field="cell1" tag="p" defaultValue="+39 342 1895829" />
              </div>
              <div className="contact-card">
                <EditableText page="regolamento" section="contattiSection" field="icon3" tag="div" className="icon" defaultValue="📧" />
                <EditableText page="regolamento" section="contattiSection" field="label3" tag="h3" defaultValue="Email" />
                <EditableText page="regolamento" section="contatti" field="email" tag="p" defaultValue="belsorrisovarese@gmail.com" />
              </div>
            </div>
          </div>
        </EditableSection>
      </div>
    </section>
  );
}

export default RegolamentoContent;
