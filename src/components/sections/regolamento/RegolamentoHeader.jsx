import { EditableText, EditableSection, EditableImage } from '../../editable';

function RegolamentoHeader() {
  return (
    <EditableSection label="Header">
      <EditableImage
        page="regolamento"
        section="header"
        field="bgImage"
        defaultValue=""
        asBackground
        className="page-header"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
      >
        <div className="container">
          <EditableText
            page="regolamento"
            section="header"
            field="title"
            tag="h1"
            defaultValue="Regolamento ed Informazioni"
          />
          <EditableText
            page="regolamento"
            section="header"
            field="subtitle"
            tag="p"
            defaultValue="Tutto quello che devi sapere per il tuo soggiorno"
          />
        </div>
      </EditableImage>
    </EditableSection>
  );
}

export default RegolamentoHeader;
