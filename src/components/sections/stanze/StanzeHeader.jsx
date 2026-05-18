import { EditableText, EditableSection, EditableImage } from '../../editable';

function StanzeHeader() {
  return (
    <EditableSection label="Header">
      <EditableImage
        page="stanze"
        section="header"
        field="bgImage"
        defaultValue=""
        asBackground
        className="page-header"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
      >
        <div className="container">
          <EditableText
            page="stanze"
            section="header"
            field="title"
            tag="h1"
            defaultValue="Le Stanze"
          />
          <EditableText
            page="stanze"
            section="header"
            field="subtitle"
            tag="p"
            defaultValue="Per prenotare scegli una camera o un appartamento!"
          />
        </div>
      </EditableImage>
    </EditableSection>
  );
}

export default StanzeHeader;
