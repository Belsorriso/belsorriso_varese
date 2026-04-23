import { EditableText, EditableSection, EditableList } from '../../editable';

const linkStyle = { color: 'var(--primary-color)', textDecoration: 'underline' };
const listItemStyle = { padding: '6px 0', paddingLeft: '20px', position: 'relative', color: 'var(--text-light)' };
const dotStyle = { position: 'absolute', left: 0, color: 'var(--primary-color)' };

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

        <EditableSection label="Riferimenti Turistici">
          <div style={{ margin: '40px 0 30px' }}>
            <h3 style={{ marginBottom: '16px' }}>Riferimenti Turistici Utili</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={listItemStyle}>
                <span style={dotStyle}>›</span>
                <a href="https://www.in-lombardia.it/" target="_blank" rel="noopener noreferrer" style={linkStyle}>In Lombardia</a>
                {' – portale turistico della Regione Lombardia'}
              </li>
              <li style={listItemStyle}>
                <span style={dotStyle}>›</span>
                <a href="https://www.varesedoyoulake.it/it/infopoint" target="_blank" rel="noopener noreferrer" style={linkStyle}>Varese DoYouLake Infopoint</a>
                {' – informazioni turistiche su Varese e dintorni'}
              </li>
            </ul>
          </div>
        </EditableSection>

        <EditableSection label="Posizione">
          <div style={{ margin: '0 0 40px' }}>
            <h3 style={{ marginBottom: '16px' }}>Nelle Vicinanze</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={listItemStyle}><span style={dotStyle}>✓</span>A 60 mt dall'Ospedale Filippo Del Ponte</li>
              <li style={listItemStyle}><span style={dotStyle}>✓</span>A 350 mt dall'Ospedale di Circolo e Fondazione Macchi</li>
              <li style={listItemStyle}><span style={dotStyle}>✓</span>Università dell'Insubria a pochi minuti a piedi</li>
              <li style={listItemStyle}><span style={dotStyle}>✓</span>250 mt dalle stazioni ferroviarie</li>
              <li style={listItemStyle}><span style={dotStyle}>✓</span>4 minuti a piedi dal centro</li>
              <li style={listItemStyle}><span style={dotStyle}>✓</span>20 mt dalla fermata autobus</li>
            </ul>
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
