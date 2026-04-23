import { Link } from 'react-router-dom';
import { EditableText, EditableSection, EditableList } from '../../editable';
import { RoomGallery, getSlug } from './stanzeHelpers';

const DEFAULT_APT_FEATURES = 'Bagno privato\nAngolo cottura\nRiscaldamento (termosifoni + split condizionatore)\nTV Smart 32"\nLavatrice\nWi-Fi gratuito';
const SUITE_MONO8_FEATURES = 'Bagno privato\nAngolo cottura\nRiscaldamento (termosifoni + split condizionatore)\nTV Smart 32"\nWi-Fi gratuito';

const defaultAppartamenti = [
  { nome: 'Bilo 1B Comfort', tipo: 'Bilocale', descrizione: 'Quarto piano', mq: '58 m²', features: DEFAULT_APT_FEATURES },
  { nome: 'Bilo 2', tipo: 'Bilocale', descrizione: 'Primo piano', mq: '60 m²', features: DEFAULT_APT_FEATURES },
  { nome: 'Bilo 5', tipo: 'Bilocale', descrizione: 'Primo piano – due livelli', mq: '70 m²', features: DEFAULT_APT_FEATURES },
  { nome: 'Bilo 6', tipo: 'Bilocale', descrizione: 'Primo piano', mq: '65 m²', features: DEFAULT_APT_FEATURES },
  { nome: 'Bilo 8', tipo: 'Bilocale', descrizione: 'Secondo piano', mq: '75 m²', features: DEFAULT_APT_FEATURES },
  { nome: 'Mono 3', tipo: 'Monolocale', descrizione: 'Piano terra', mq: '45 m²', features: DEFAULT_APT_FEATURES },
  { nome: 'Mono 4', tipo: 'Monolocale', descrizione: 'Primo piano', mq: '45 m²', features: DEFAULT_APT_FEATURES },
  { nome: 'Mono 7', tipo: 'Monolocale', descrizione: 'Secondo piano', mq: '45 m²', features: DEFAULT_APT_FEATURES },
  { nome: 'Suite Mono 8', tipo: 'Monolocale', descrizione: 'Primo piano', mq: '33 m²', features: SUITE_MONO8_FEATURES },
  { nome: 'Trilocale Superior 9', tipo: 'Trilocale', descrizione: 'Secondo piano', mq: '', features: DEFAULT_APT_FEATURES },
];

function StanzeAppartamenti() {
  return (
    <section className="content-section">
      <div className="container">
        <EditableSection label="Sezione Appartamenti">
          <div className="section-title" style={{ marginTop: '80px' }}>
            <EditableText
              page="stanze"
              section="appartamentiIntro"
              field="title"
              tag="h2"
              defaultValue="Appartamenti"
            />
            <EditableText
              page="stanze"
              section="appartamentiIntro"
              field="subtitle"
              tag="p"
              defaultValue="Soluzioni piu ampie per soggiorni prolungati o famiglie"
            />
          </div>

          <EditableList
            page="stanze"
            section="appartamenti"
            className="rooms-grid"
            addLabel="Aggiungi appartamento"
            emptyMessage="Nessun appartamento configurato"
            itemTemplate={{ nome: 'Nuovo Appartamento', tipo: 'Appartamento', descrizione: '', capacita: 'Max 2 ospiti', mq: '', features: DEFAULT_APT_FEATURES }}
            defaultItems={defaultAppartamenti}
            renderItem={(item) => (
              <div className="room-card apartment-card">
                <RoomGallery roomName={item.nome} />
                <div className="room-card-header">
                  <h3>{item.nome}</h3>
                  <span className="room-type">{item.tipo}</span>
                </div>
                <div className="room-card-body">
                  <p className="room-description">{item.descrizione}</p>
                  <p className="room-capacity">{item.capacita}</p>
                  {item.mq && <p className="room-size">{item.mq}</p>}
                  <ul className="room-features">
                    {(item.features || DEFAULT_APT_FEATURES).split('\n').filter(f => f.trim()).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="room-card-footer">
                  <Link to={`/stanze/${getSlug(item.nome)}`} className="btn-primary">
                    Guarda l'Appartamento
                  </Link>
                </div>
              </div>
            )}
            renderEditItem={(item, updateField) => (
              <>
                <div className="form-group">
                  <label>Nome</label>
                  <input type="text" value={item.nome || ''} onChange={(e) => updateField('nome', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Tipo</label>
                  <select value={item.tipo || ''} onChange={(e) => updateField('tipo', e.target.value)}>
                    <option value="Appartamento">Appartamento</option>
                    <option value="Monolocale">Monolocale</option>
                    <option value="Bilocale">Bilocale</option>
                    <option value="Trilocale">Trilocale</option>
                    <option value="Junior Suite">Junior Suite</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Descrizione</label>
                  <textarea value={item.descrizione || ''} onChange={(e) => updateField('descrizione', e.target.value)} rows={2} />
                </div>
                <div className="form-group">
                  <label>Capacita</label>
                  <input type="text" value={item.capacita || ''} onChange={(e) => updateField('capacita', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Metratura</label>
                  <input type="text" value={item.mq || ''} onChange={(e) => updateField('mq', e.target.value)} placeholder="Es: 70 m²" />
                </div>
                <div className="form-group">
                  <label>Dotazioni (una per riga)</label>
                  <textarea
                    value={item.features || DEFAULT_APT_FEATURES}
                    onChange={(e) => updateField('features', e.target.value)}
                    rows={4}
                    placeholder="Es: Bagno privato"
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

export default StanzeAppartamenti;
