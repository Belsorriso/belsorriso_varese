import { EditableText, EditableSection, EditableList } from '../../editable';

const defaultCategorie = [
  {
    title: 'Natura e Spiritualita',
    items: ['Sacro Monte di Varese', 'Parco Campo dei Fiori', 'Osservatorio Astronomico', 'Lago di Varese', 'Lago di Monate (con pista ciclabile)', 'Isolino Virginia', 'Palude Brabbia']
  },
  {
    title: 'Laghi della Zona',
    items: ['Lago di Como', 'Lago di Lugano', 'Lago Maggiore', 'Isole Borromee']
  },
  {
    title: 'Cultura e Storia',
    items: ['Palazzo e Giardini Estensi', 'Villa Ponti', 'Museo Villa Panza', 'Parco Villa Toeplitz', 'Museo Pogliaghi', 'Civico Museo Archeologico']
  },
  {
    title: 'Arte Religiosa',
    items: ['Basilica di S. Vittore', 'Battistero S. Giovanni', 'Centro Storico']
  },
  {
    title: 'Sport e Tempo Libero',
    items: ['Stadio "F. Ossola"', 'Ippodromo', 'Palaa2a (basket)', 'Golf Club Luvinate', 'Golf Panorama', 'Volo a vela']
  },
  {
    title: 'Business e Eventi',
    items: ['Centro Congressi Ville Ponti']
  }
];

function TerritorioContent() {
  return (
    <section className="content-section">
      <div className="container">
        <EditableSection label="Intro">
          <div className="section-title">
            <EditableText
              page="territorio"
              section="intro"
              field="title"
              tag="h2"
              defaultValue="Attrazioni nelle Vicinanze"
            />
            <EditableText
              page="territorio"
              section="intro"
              field="subtitle"
              tag="p"
              defaultValue="Varese offre numerose opportunita per cultura, natura e sport"
            />
          </div>
        </EditableSection>

        <EditableSection label="Categorie Attrazioni">
          <EditableList
            page="territorio"
            section="categorie"
            className="attractions-grid"
            addLabel="Aggiungi categoria"
            emptyMessage="Nessuna categoria configurata"
            itemTemplate={{ title: 'Nuova Categoria', items: ['Attrazione 1', 'Attrazione 2'] }}
            defaultItems={defaultCategorie}
            renderItem={(item) => (
              <div className="attraction-category">
                <h3>{item.title}</h3>
                <ul>
                  {(item.items || []).map((attraction, i) => (
                    <li key={i}>{attraction}</li>
                  ))}
                </ul>
              </div>
            )}
            renderEditItem={(item, updateField) => (
              <>
                <div className="form-group">
                  <label>Titolo Categoria</label>
                  <input type="text" value={item.title || ''} onChange={(e) => updateField('title', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Attrazioni (una per riga)</label>
                  <textarea
                    value={(item.items || []).join('\n')}
                    onChange={(e) => updateField('items', e.target.value.split('\n').filter(s => s.trim()))}
                    rows={6}
                    placeholder="Inserisci un'attrazione per riga"
                  />
                </div>
              </>
            )}
          />
        </EditableSection>
      </div>
    </section>
  );
}

export default TerritorioContent;
