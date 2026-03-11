import { EditableText, EditableSection, EditableList } from '../../editable';

const defaultFeatures = [
  { icon: '&#127968;', title: 'Posizione Centrale', description: 'A 250 metri dalle stazioni ferroviarie e a 4 minuti a piedi dal centro citta' },
  { icon: '&#128246;', title: 'Ingresso Indipendente', description: 'Entrata autonoma in un cortile riservato per la massima privacy' },
  { icon: '&#128246;', title: 'Wi-Fi Gratuito', description: 'Connessione wireless ADSL sempre attiva in tutte le camere' },
  { icon: '&#127969;', title: 'Vicino agli Ospedali', description: "A soli 60 metri dall'Ospedale Filippo del Ponte" }
];

function HomeFeatures() {
  return (
    <EditableSection label="Punti di Forza">
      <section className="section section-alt">
        <div className="container">
          <div className="section-title">
            <EditableText
              page="home"
              section="featuresIntro"
              field="title"
              tag="h2"
              defaultValue="I Nostri Punti di Forza"
            />
            <EditableText
              page="home"
              section="featuresIntro"
              field="subtitle"
              tag="p"
              defaultValue="Tutto quello che serve per un soggiorno confortevole"
            />
          </div>

          <EditableList
            page="home"
            section="features"
            className="features"
            itemClassName="feature-card"
            addLabel="Aggiungi punto di forza"
            emptyMessage="Nessun punto di forza configurato"
            itemTemplate={{ icon: '&#127968;', title: 'Nuovo punto di forza', description: 'Descrizione...' }}
            defaultItems={defaultFeatures}
            renderItem={(item) => (
              <>
                <div className="feature-icon" dangerouslySetInnerHTML={{ __html: item.icon || '&#127968;' }} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </>
            )}
            renderEditItem={(item, updateField) => (
              <>
                <div className="form-group">
                  <label>Icona (HTML entity)</label>
                  <input
                    type="text"
                    value={item.icon || ''}
                    onChange={(e) => updateField('icon', e.target.value)}
                    placeholder="Es: &#127968;"
                  />
                </div>
                <div className="form-group">
                  <label>Titolo</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Titolo del punto di forza"
                  />
                </div>
                <div className="form-group">
                  <label>Descrizione</label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Descrizione..."
                    rows={3}
                  />
                </div>
              </>
            )}
          />
        </div>
      </section>
    </EditableSection>
  );
}

export default HomeFeatures;
