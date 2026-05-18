import { EditableText, EditableSection, EditableImage } from '../../editable';

function TerritorioHeader() {
  return (
    <EditableSection label="Header">
      <EditableImage
        page="territorio"
        section="header"
        field="bgImage"
        defaultValue=""
        asBackground
        className="page-header"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
      >
        <div className="container">
          <EditableText
            page="territorio"
            section="header"
            field="title"
            tag="h1"
            defaultValue="Il Territorio"
          />
          <EditableText
            page="territorio"
            section="header"
            field="subtitle"
            tag="p"
            defaultValue="Scopri le attrazioni di Varese e dintorni"
          />
        </div>
      </EditableImage>
    </EditableSection>
  );
}

export default TerritorioHeader;
