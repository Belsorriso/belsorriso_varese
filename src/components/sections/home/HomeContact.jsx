import { EditableText, EditableSection } from '../../editable';

function HomeContact() {
  return (
    <EditableSection label="Contatti">
      <section className="section">
        <div className="container">
          <div className="section-title">
            <EditableText
              page="home"
              section="contactCta"
              field="title"
              tag="h2"
              defaultValue="Contattaci"
            />
            <EditableText
              page="home"
              section="contactCta"
              field="subtitle"
              tag="p"
              defaultValue="Siamo a tua disposizione per qualsiasi informazione"
            />
          </div>

          <div className="contact-info">
            <div className="contact-card">
              <EditableText page="home" section="contactCta" field="icon1" tag="div" className="icon" defaultValue="📞" />
              <EditableText page="home" section="contactCta" field="label1" tag="h3" defaultValue="Telefono" />
              <EditableText page="home" section="contact" field="phone1" tag="p" defaultValue="+39 0332 830744" />
              <EditableText page="home" section="contact" field="phone2" tag="p" defaultValue="+39 342 1895829" />
              <EditableText page="home" section="contact" field="phone3" tag="p" defaultValue="+39 342 1818610" />
            </div>

            <div className="contact-card">
              <EditableText page="home" section="contactCta" field="icon2" tag="div" className="icon" defaultValue="📧" />
              <EditableText page="home" section="contactCta" field="label2" tag="h3" defaultValue="Email" />
              <EditableText page="home" section="contact" field="email" tag="p" defaultValue="belsorrisovarese@gmail.com" />
            </div>

            <div className="contact-card">
              <EditableText page="home" section="contactCta" field="icon3" tag="div" className="icon" defaultValue="📍" />
              <EditableText page="home" section="contactCta" field="label3" tag="h3" defaultValue="Indirizzo" />
              <EditableText page="home" section="contact" field="address1" tag="p" defaultValue="Piazza Biroldi, 8" />
              <EditableText page="home" section="contact" field="address2" tag="p" defaultValue="21100 Varese (VA)" />
            </div>
          </div>
        </div>
      </section>
    </EditableSection>
  );
}

export default HomeContact;
