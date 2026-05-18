import { EditableText, EditableSection, EditableImage } from '../../editable';

function StrutturaHeader() {
  return (
    <EditableSection label="Header">
      <EditableImage
        page="struttura"
        section="header"
        field="bgImage"
        defaultValue=""
        asBackground
        className="page-header"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
      >
        <div className="container">
          <EditableText
            page="struttura"
            section="header"
            field="title"
            tag="h1"
            defaultValue="Struttura e Servizi"
          />
          <EditableText
            page="struttura"
            section="header"
            field="subtitle"
            tag="p"
            defaultValue="Ambiente accogliente ed informale - Ingresso indipendente - Pulito, comodo, pratico"
          />
        </div>
      </EditableImage>
    </EditableSection>
  );
}

export default StrutturaHeader;
