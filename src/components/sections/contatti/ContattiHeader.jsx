import { EditableText, EditableSection } from '../../editable';

function ContattiHeader() {
  return (
    <EditableSection label="Header">
      <section className="page-header">
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
      </section>
    </EditableSection>
  );
}

export default ContattiHeader;
