import { EditableText, EditableSection } from '../../editable';

function RegolamentoHeader() {
  return (
    <EditableSection label="Header">
      <section className="page-header">
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
      </section>
    </EditableSection>
  );
}

export default RegolamentoHeader;
