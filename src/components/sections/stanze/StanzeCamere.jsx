import { Link } from 'react-router-dom';
import { EditableText, EditableSection, EditableList } from '../../editable';
import { RoomGallery, getSlug } from './stanzeHelpers';

const DEFAULT_CAMERA_FEATURES = 'Bagno privato con doccia\nRiscaldamento (termosifoni + split condizionatore)\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero';

const defaultCamere = [
  { nome: 'Bordeaux', tipo: 'Camera', capacita: 'Da 1 a 4 ospiti', codice: '012133-FOR-00015', features: DEFAULT_CAMERA_FEATURES },
  { nome: 'Azzurra', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '012133-FOR-00015', features: DEFAULT_CAMERA_FEATURES },
  { nome: 'Rossa', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '012133-FOR-00015', features: DEFAULT_CAMERA_FEATURES },
  { nome: 'Arancio', tipo: 'Camera', capacita: 'Da 1 a 3 ospiti', codice: '012133-FOR-00015', features: DEFAULT_CAMERA_FEATURES },
  { nome: 'Blu', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '012133-FOR-00012', features: DEFAULT_CAMERA_FEATURES },
  { nome: 'Avorio', tipo: 'Camera', capacita: 'Da 1 a 4 ospiti', codice: '012133-FOR-00012', features: DEFAULT_CAMERA_FEATURES },
  { nome: 'Verde', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '012133-FOR-00012', features: DEFAULT_CAMERA_FEATURES },
  { nome: 'Lilla A', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti (fino a 4 se combinata con Lilla B)', codice: '', features: DEFAULT_CAMERA_FEATURES },
  { nome: 'Lilla B', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti (fino a 4 se combinata con Lilla A)', codice: '', features: DEFAULT_CAMERA_FEATURES },
];

function StanzeCamere() {
  return (
    <section className="content-section">
      <div className="container">
        <EditableSection label="Sezione Camere">
          <div className="section-title">
            <EditableText
              page="stanze"
              section="camereIntro"
              field="title"
              tag="h2"
              defaultValue="Camere"
            />
            <EditableText
              page="stanze"
              section="camereIntro"
              field="subtitle"
              tag="p"
              defaultValue="Le nostre camere, tutte con bagno privato e servizi inclusi"
            />
          </div>

          <EditableList
            page="stanze"
            section="camere"
            className="rooms-grid"
            addLabel="Aggiungi camera"
            emptyMessage="Nessuna camera configurata"
            itemTemplate={{ nome: 'Nuova Camera', tipo: 'Camera', capacita: '2 ospiti', codice: '', features: DEFAULT_CAMERA_FEATURES }}
            defaultItems={defaultCamere}
            renderItem={(item) => (
              <div className="room-card">
                <RoomGallery roomName={item.nome} />
                <div className="room-card-header">
                  <h3>{item.nome}</h3>
                  <span className="room-type">{item.tipo}</span>
                </div>
                <div className="room-card-body">
                  <p className="room-capacity">{item.capacita}</p>
                  <ul className="room-features">
                    {(item.features || DEFAULT_CAMERA_FEATURES).split('\n').filter(f => f.trim()).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="room-card-footer">
                  <Link to={`/stanze/${getSlug(item.nome)}`} className="btn-primary">
                    Guarda la Camera
                  </Link>
                </div>
              </div>
            )}
            renderEditItem={(item, updateField) => (
              <>
                <div className="form-group">
                  <label>Nome Camera</label>
                  <input type="text" value={item.nome || ''} onChange={(e) => updateField('nome', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Tipo</label>
                  <input type="text" value={item.tipo || ''} onChange={(e) => updateField('tipo', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Capacita</label>
                  <input type="text" value={item.capacita || ''} onChange={(e) => updateField('capacita', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Codice</label>
                  <input type="text" value={item.codice || ''} onChange={(e) => updateField('codice', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Dotazioni (una per riga)</label>
                  <textarea
                    value={item.features || DEFAULT_CAMERA_FEATURES}
                    onChange={(e) => updateField('features', e.target.value)}
                    rows={6}
                    placeholder="Es: Bagno privato con doccia"
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

export default StanzeCamere;
