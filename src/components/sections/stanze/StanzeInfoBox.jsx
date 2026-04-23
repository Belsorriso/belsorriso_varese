import { EditableText, EditableSection, EditableList } from '../../editable';

const defaultInfoItems = [
  { icon: '📶', title: 'ADSL Gratuito', description: 'Connessione Wi-Fi in tutte le stanze' },
  { icon: '🚗', title: 'Parcheggio', description: 'Parcheggio privato a pagamento disponibile' },
  { icon: '🐶', title: 'Accoglienza animali', description: 'Accettiamo animali di piccola taglia' },
  { icon: '🚭', title: 'No Fumo', description: 'Vietato fumare nelle camere e negli spazi comuni. È consentito fumare nei balconi delle camere e degli appartamenti.' },
];

function StanzeInfoBox() {
  return (
    <section className="content-section">
      <div className="container">
        <EditableSection label="Info Box">
          <div className="info-box" style={{ marginTop: '60px' }}>
            <EditableText
              page="stanze"
              section="infoBox"
              field="title"
              tag="h3"
              defaultValue="Informazioni Utili"
            />
            <EditableList
              page="stanze"
              section="infoItems"
              className="info-grid"
              itemClassName="info-item"
              addLabel="Aggiungi info"
              emptyMessage="Nessuna informazione configurata"
              itemTemplate={{ icon: '📌', title: 'Titolo', description: 'Descrizione...' }}
              defaultItems={defaultInfoItems}
              renderItem={(item) => (
                <>
                  <span className="info-icon">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </>
              )}
              renderEditItem={(item, updateField) => (
                <>
                  <div className="form-group">
                    <label>Icona (emoji)</label>
                    <input
                      type="text"
                      value={item.icon || ''}
                      onChange={(e) => updateField('icon', e.target.value)}
                      placeholder="Es: 📶"
                    />
                  </div>
                  <div className="form-group">
                    <label>Titolo</label>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => updateField('title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Descrizione</label>
                    <textarea
                      value={item.description || ''}
                      onChange={(e) => updateField('description', e.target.value)}
                      rows={2}
                    />
                  </div>
                </>
              )}
            />
          </div>
        </EditableSection>
      </div>
    </section>
  );
}

export default StanzeInfoBox;
