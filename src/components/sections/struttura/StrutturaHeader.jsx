import { EditableText, EditableSection } from '../../editable';

function StrutturaHeader() {
  return (
    <EditableSection label="Header">
      <section className="page-header">
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
      </section>
    </EditableSection>
  );
}

export default StrutturaHeader;
