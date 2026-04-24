/**
 * Script di migrazione per aggiornare i contenuti in MongoDB.
 * Esegui con: node server/migrate-content.js
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import Content from './models/Content.js';

const OLD_FEATURES = 'Bagno privato con doccia\nRiscaldamento (termosifoni + split condizionatore)\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero';
const NEW_FEATURES = 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero';

const NEW_COLAZIONE_TEXT = 'La colazione è disponibile a pagamento in convenzione con i bar situati nella piazza pedonale di fronte alla struttura, con opzione di colazione tipica italiana.';

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connesso a MongoDB');

    // 1. Aggiorna features camere (stanze.camere)
    const stanzeDoc = await Content.findOne({ page: 'stanze', section: 'camere' });
    if (stanzeDoc && Array.isArray(stanzeDoc.content)) {
      let changed = false;
      stanzeDoc.content = stanzeDoc.content.map(camera => {
        if (camera.features === OLD_FEATURES) {
          changed = true;
          return { ...camera, features: NEW_FEATURES };
        }
        return camera;
      });
      if (changed) {
        await stanzeDoc.save();
        console.log('✓ Features camere aggiornate (Riscaldamento / Aria condizionata separati)');
      } else {
        console.log('— Features camere: nessuna modifica necessaria');
      }
    } else {
      console.log('— stanze.camere non trovato in DB (si useranno i default del codice)');
    }

    // 2. Aggiorna testo colazione (regolamento.regole)
    const regolamentoDoc = await Content.findOne({ page: 'regolamento', section: 'regole' });
    if (regolamentoDoc && Array.isArray(regolamentoDoc.content)) {
      let changed = false;
      regolamentoDoc.content = regolamentoDoc.content.map(regola => {
        if (regola.title === 'Colazione') {
          changed = true;
          return { ...regola, text: NEW_COLAZIONE_TEXT };
        }
        return regola;
      });
      if (changed) {
        await regolamentoDoc.save();
        console.log('✓ Testo colazione aggiornato');
      } else {
        console.log('— regolamento.regole: nessuna modifica necessaria');
      }
    } else {
      console.log('— regolamento.regole non trovato in DB (si useranno i default del codice)');
    }

    await mongoose.disconnect();
    console.log('\nMigrazione completata.');
  } catch (error) {
    console.error('Errore:', error);
    process.exit(1);
  }
};

migrate();
