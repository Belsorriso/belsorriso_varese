import { EditableText, EditableImage, EditableSection } from '../../editable';

function HomeWelcome() {
  return (
    <EditableSection label="Benvenuto">
      <section className="section">
        <div className="container">
          <div className="welcome">
            <div className="welcome-image">
              <EditableImage
                page="home"
                section="welcome"
                field="image"
                alt="BelSorriso Varese - La struttura"
                defaultValue="/images/belsorriso_house_1.png"
              />
            </div>
            <div className="welcome-content">
              <EditableText
                page="home"
                section="welcome"
                field="title"
                tag="h2"
                defaultValue="Benvenuti a BelSorriso Varese"
              />
              <EditableText
                page="home"
                section="welcome"
                field="text"
                tag="p"
                multiline
                defaultValue="La nostra struttura si trova in posizione strategica, vicino al centro di Varese, alle stazioni ferroviarie e agli ospedali. Offriamo camere silenziose con ingresso indipendente e Wi-Fi gratuito."
              />
              <EditableText
                page="home"
                section="welcome"
                field="text2"
                tag="p"
                multiline
                defaultValue="Ambiente accogliente ed informale con entrata autonoma in una corte dal fascino d'altri tempi. Le nostre camere sono completamente ristrutturate e dotate di ogni comfort per garantirvi un soggiorno piacevole."
              />
              <div className="signature">
                <img src="/images/Firma_trasparente-294x300.png" alt="Firma" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

export default HomeWelcome;
