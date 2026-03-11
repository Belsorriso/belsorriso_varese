import { EditableText, EditableSection } from '../../editable';

function StanzeHeader() {
  return (
    <EditableSection label="Header">
      <section className="page-header">
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
      </section>
    </EditableSection>
  );
}

export default StanzeHeader;
