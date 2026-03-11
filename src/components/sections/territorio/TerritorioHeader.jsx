import { EditableText, EditableSection } from '../../editable';

function TerritorioHeader() {
  return (
    <EditableSection label="Header">
      <section className="page-header">
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
      </section>
    </EditableSection>
  );
}

export default TerritorioHeader;
