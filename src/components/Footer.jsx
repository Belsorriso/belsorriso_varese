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
                defaultValue="BelsorrisoVarese – Dormire Felice"
              />
              <div className="footer-divider"></div>

              <EditableText
                page="footer"
                section="company1"
                field="name"
                tag="p"
                className="company-name"
                defaultValue="Select di Pecchio Nicolo"
              />
              <EditableText
                page="footer"
                section="company1"
                field="address1"
                tag="p"
                defaultValue="Piazza Biroldi, 8"
              />
              <EditableText
                page="footer"
                section="company1"
                field="address2"
                tag="p"
                defaultValue="21100 – Varese (VA) – Italia"
              />
              <EditableText
                page="footer"
                section="company1"
                field="piva"
                tag="p"
                defaultValue="P. IVA 02087850125"
              />
              <EditableText
                page="footer"
                section="company1"
                field="cin"
                tag="p"
                defaultValue="CIN IT012133B45H2APG6U"
              />

              <EditableText
                page="footer"
                section="company2"
                field="name"
                tag="p"
                className="company-name"
                style={{ marginTop: '20px' }}
                defaultValue="Happi Day srl"
              />
              <EditableText
                page="footer"
                section="company2"
                field="address1"
                tag="p"
                defaultValue="Piazza Biroldi, 8"
              />
              <EditableText
                page="footer"
                section="company2"
                field="address2"
                tag="p"
                defaultValue="21100 – Varese (VA) – Italia"
              />
              <EditableText
                page="footer"
                section="company2"
                field="piva"
                tag="p"
                defaultValue="P. IVA 02964020123"
              />
              <EditableText
                page="footer"
                section="company2"
                field="cin"
                tag="p"
                defaultValue="CIN IT012133B4I9KHS63N"
              />

              <EditableText
                page="footer"
                section="company3"
                field="name"
                tag="p"
                className="company-name"
                style={{ marginTop: '20px' }}
                defaultValue="Happi Cav"
              />
              <EditableText
                page="footer"
                section="company3"
                field="cin"
                tag="p"
                defaultValue="CIN IT012133B4ZUUYL2CK"
              />
              <EditableText
                page="footer"
                section="company3"
                field="code1"
                tag="p"
                defaultValue="012133-CIM-00013"
              />
              <EditableText
                page="footer"
                section="company3"
                field="code2"
                tag="p"
                defaultValue="012133-CIM-00011"
              />
            </div>
          </EditableSection>

          <EditableSection label="Contacts EN">
            <div className="footer-col">
              <EditableText
                page="footer"
                section="contactsEn"
                field="title"
                tag="h4"
                defaultValue="Contacts"
              />
              <div className="footer-divider"></div>

              <div className="footer-contact-item">
                <span className="footer-icon">&#9993;</span>
                <EditableText
                  page="footer"
                  section="contactsEn"
                  field="email"
                  tag="span"
                  defaultValue="belsorrisovarese@gmail.com"
                />
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">&#9742;</span>
                <EditableText
                  page="footer"
                  section="contactsEn"
                  field="phone1"
                  tag="span"
                  defaultValue="+39 0332 830744"
                />
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">&#9742;</span>
                <EditableText
                  page="footer"
                  section="contactsEn"
                  field="phone2"
                  tag="span"
                  defaultValue="+39 342 18 95 829"
                />
              </div>
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
