import { EditableText, EditableSection, EditableImage } from '../../editable';

function ContattiHeader() {
  return (
    <EditableSection label="Header">
      <EditableImage
        page="contatti"
        section="header"
        field="bgImage"
        defaultValue=""
        asBackground
        className="page-header"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
      >
        <div className="container">
          <EditableText
            page="contatti"
            section="header"
            field="title"
            tag="h1"
            defaultValue="Contatti e Dove Siamo"
          />
          <EditableText
            page="contatti"
            section="header"
            field="subtitle"
            tag="p"
            defaultValue="Raggiungerci e facilissimo"
          />
        </div>
      </EditableImage>
    </EditableSection>
  );
}

export default ContattiHeader;
