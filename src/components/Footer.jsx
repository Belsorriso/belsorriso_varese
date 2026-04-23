import { EditableText, EditableSection } from './editable';
import { useContent } from '../hooks/useContent';
import { useEditMode } from '../context/EditModeContext';

function Footer() {
  const { loading, getField } = useContent('footer');
  const { isEditMode, isAdmin } = useEditMode();

  if (loading) {
    return null;
  }

  const fbUrl = getField('social', 'facebookUrl', 'https://www.facebook.com/belsorrisovarese');
  const igUrl = getField('social', 'instagramUrl', 'https://www.instagram.com/belsorriso.varese/');
  const ttUrl = getField('social', 'tiktokUrl', 'https://www.tiktok.com/@belsorrisovarese2');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <EditableSection label="Azienda">
            <div className="footer-col">
              <EditableText
                page="footer"
                section="company"
                field="title"
                tag="h4"
                defaultValue="BelSorrisoVarese – Dormire Felice"
              />
              <div className="footer-divider"></div>

              {/* Select di Pecchio Nicolò */}
              <EditableText page="footer" section="company1" field="name" tag="p" className="company-name" defaultValue="Select di Pecchio Nicolò" />
              <EditableText page="footer" section="company1" field="brand" tag="p" defaultValue="BelSorrisoVarese" />
              <EditableText page="footer" section="company1" field="address1" tag="p" defaultValue="Sede Legale: Piazza Biroldi, 8" />
              <EditableText page="footer" section="company1" field="address2" tag="p" defaultValue="Sede Operativa: Piazza Biroldi, 20" />
              <EditableText page="footer" section="company1" field="city" tag="p" defaultValue="21100 Varese" />
              <EditableText page="footer" section="company1" field="piva" tag="p" defaultValue="P.IVA 02087850125" />

              {/* Codici CIN */}
              <p className="company-name" style={{ marginTop: '20px' }}>Codici CIN delle Strutture</p>
              <EditableText page="footer" section="cin" field="cin1name" tag="p" defaultValue="• Foresteria Belsorriso Happi" />
              <EditableText page="footer" section="cin" field="cin1" tag="p" defaultValue="CIN: IT012133B4I9KHS63N" />
              <EditableText page="footer" section="cin" field="cin2name" tag="p" defaultValue="• Casa e Appartamenti per Vacanze Belsorriso" />
              <EditableText page="footer" section="cin" field="cin2" tag="p" defaultValue="CIN: IT012133B4ZUUYL2CK" />
              <EditableText page="footer" section="cin" field="cin3name" tag="p" defaultValue="• Belsorriso Foresteria Lombarda" />
              <EditableText page="footer" section="cin" field="cin3" tag="p" defaultValue="CIN: IT012133B45H2APG6U" />

              {/* Happi Day SRL */}
              <EditableText page="footer" section="company2" field="name" tag="p" className="company-name" style={{ marginTop: '20px' }} defaultValue="HAPPI DAY SRL" />
              <EditableText page="footer" section="company2" field="address1" tag="p" defaultValue="Sede Legale: P.za Motta, 6" />
              <EditableText page="footer" section="company2" field="address2" tag="p" defaultValue="Sede Operativa: P.za Biroldi, 7" />
              <EditableText page="footer" section="company2" field="city" tag="p" defaultValue="21100 Varese" />
              <EditableText page="footer" section="company2" field="piva" tag="p" defaultValue="Partita IVA 03645460126" />
            </div>
          </EditableSection>

          <EditableSection label="Contatti IT">
            <div className="footer-col">
              <EditableText
                page="footer"
                section="contactsIt"
                field="title"
                tag="h4"
                defaultValue="Contatti"
              />
              <div className="footer-divider"></div>

              <div className="footer-contact-item">
                <span className="footer-icon">&#9993;</span>
                <EditableText
                  page="footer"
                  section="contactsIt"
                  field="email"
                  tag="span"
                  defaultValue="belsorrisovarese@gmail.com"
                />
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">&#9742;</span>
                <EditableText
                  page="footer"
                  section="contactsIt"
                  field="phone1"
                  tag="span"
                  defaultValue="+39 0332 830744"
                />
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">&#9742;</span>
                <EditableText
                  page="footer"
                  section="contactsIt"
                  field="phone2"
                  tag="span"
                  defaultValue="+39 342 18 95 829"
                />
              </div>
            </div>
          </EditableSection>

          <EditableSection label="Social">
            <div className="footer-col">
              <EditableText
                page="footer"
                section="social"
                field="title"
                tag="h4"
                defaultValue="Social"
              />
              <div className="footer-divider"></div>

              <a
                href={fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
                style={{ marginLeft: '12px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
              <a
                href={ttUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="TikTok"
                style={{ marginLeft: '12px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/>
                </svg>
              </a>
              {isEditMode && isAdmin && (
                <EditableText
                  page="footer"
                  section="social"
                  field="facebookUrl"
                  tag="div"
                  defaultValue="https://www.facebook.com/belsorrisovarese"
                  style={{ fontSize: '11px', marginTop: '6px', wordBreak: 'break-all', opacity: 0.7 }}
                />
              )}
            </div>
          </EditableSection>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
