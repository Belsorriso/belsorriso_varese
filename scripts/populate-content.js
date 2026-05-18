import 'dotenv/config';

const API = process.env.VITE_API_URL || 'http://localhost:5001/api';
const EMAIL = 'admin@belsorriso.it';
const PASSWORD = 'admin123';

async function login() {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD })
  });
  const data = await res.json();
  if (!data.token) throw new Error('Login fallito: ' + JSON.stringify(data));
  return data.token;
}

async function save(token, page, section, content) {
  const res = await fetch(`${API}/content/${page}/${section}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content })
  });
  const data = await res.json();
  console.log(`✓ ${page}/${section}`);
  return data;
}

const CONTENT = {
  home: {
    hero: {
      title: 'Camere private, comfort garantito',
      subtitle: "Relax e charme in un cortile dal fascino d'altri tempi",
      background: '/images/hero-bg.webp'
    },
    welcome: {
      title: 'Benvenuti a BelSorrisoVarese',
      text: 'La nostra struttura si trova in posizione strategica, vicino al centro di Varese, alle stazioni ferroviarie e agli ospedali. Offriamo camere silenziose con ingresso indipendente e Wi-Fi gratuito.',
      text2: "Ambiente accogliente ed informale con entrata autonoma in una corte dal fascino d'altri tempi. Le nostre camere sono completamente ristrutturate e dotate di ogni comfort per garantirvi un soggiorno piacevole.",
      image: '/images/belsorriso_house_1.webp'
    },
    featuresIntro: {
      title: 'I Nostri Punti di Forza',
      subtitle: 'Tutto quello che serve per un soggiorno confortevole'
    },
    contactCta: {
      title: 'Contattaci',
      subtitle: 'Siamo a tua disposizione per qualsiasi informazione',
      icon1: '📞', label1: 'Telefono',
      icon2: '📧', label2: 'Email',
      icon3: '📍', label3: 'Indirizzo'
    },
    contact: {
      phone1: '+39 0332 830744',
      phone2: '+39 342 1895829',
      email: 'belsorrisovarese@gmail.com',
      address1: 'Piazza Biroldi, 8',
      address2: '21100 Varese (VA)'
    }
  },

  stanze: {
    header: {
      title: 'Le Stanze',
      subtitle: 'Per prenotare scegli una camera o un appartamento!'
    },
    camereIntro: {
      title: 'Camere',
      subtitle: 'Le nostre camere, tutte con bagno privato e servizi inclusi'
    },
    appartamentiIntro: {
      title: 'Appartamenti',
      subtitle: 'Soluzioni più ampie per soggiorni prolungati o famiglie'
    },
    camere: [
      { nome: 'Bordeaux', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '012133-FOR-00015', features: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero' },
      { nome: 'Azzurra', tipo: 'Camera', capacita: 'Da 1 a 4 ospiti', codice: '012133-FOR-00015', features: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero' },
      { nome: 'Rossa', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '012133-FOR-00015', features: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero' },
      { nome: 'Arancio', tipo: 'Camera', capacita: 'Da 1 a 3 ospiti', codice: '012133-FOR-00015', features: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero' },
      { nome: 'Blu', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '012133-FOR-00012', features: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero' },
      { nome: 'Avorio', tipo: 'Camera', capacita: 'Da 1 a 4 ospiti', codice: '012133-FOR-00012', features: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero' },
      { nome: 'Verde', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '012133-FOR-00012', features: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero' },
      { nome: 'Lilla A', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '', features: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero' },
      { nome: 'Lilla B', tipo: 'Camera', capacita: 'Da 1 a 2 ospiti', codice: '', features: 'Bagno privato con doccia\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito\nCassaforte\nFrigorifero' }
    ],
    appartamenti: [
      { nome: 'Bilo 1B Comfort', tipo: 'Bilocale', descrizione: 'Quarto piano', mq: '58 m²', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nLavatrice\nWi-Fi gratuito' },
      { nome: 'Bilo 2', tipo: 'Bilocale', descrizione: 'Primo piano', mq: '60 m²', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nLavatrice\nWi-Fi gratuito' },
      { nome: 'Bilo 5', tipo: 'Bilocale', descrizione: 'Primo piano – due livelli', mq: '70 m²', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nLavatrice\nWi-Fi gratuito' },
      { nome: 'Bilo 6', tipo: 'Bilocale', descrizione: 'Primo piano', mq: '65 m²', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nLavatrice\nWi-Fi gratuito' },
      { nome: 'Bilo 8', tipo: 'Bilocale', descrizione: 'Secondo piano', mq: '75 m²', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nLavatrice\nWi-Fi gratuito' },
      { nome: 'Mono 3', tipo: 'Monolocale', descrizione: 'Piano terra', mq: '45 m²', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nLavatrice\nWi-Fi gratuito' },
      { nome: 'Mono 4', tipo: 'Monolocale', descrizione: 'Primo piano', mq: '45 m²', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nLavatrice\nWi-Fi gratuito' },
      { nome: 'Mono 7', tipo: 'Monolocale', descrizione: 'Secondo piano', mq: '45 m²', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nLavatrice\nWi-Fi gratuito' },
      { nome: 'Suite Mono 8', tipo: 'Monolocale', descrizione: 'Primo piano', mq: '33 m²', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nWi-Fi gratuito' },
      { nome: 'Trilocale Superior 9', tipo: 'Trilocale', descrizione: 'Secondo piano', mq: '', features: 'Bagno privato\nAngolo cottura\nRiscaldamento\nAria condizionata\nTV Smart 32"\nLavatrice\nWi-Fi gratuito' }
    ]
  },

  struttura: {
    header: {
      title: 'Struttura e Servizi',
      subtitle: 'Ambiente accogliente ed informale - Ingresso indipendente - Pulito, comodo, pratico'
    },
    main: {
      title: 'Le Nostre Camere',
      intro: 'La struttura offre camere completamente ristrutturate in un ambiente informale con entrata autonoma in una corte. Le camere dispongono di materasso e cuscini ignifughi in memory e bagno privato con doccia, direttamente comunicante con la camera.'
    },
    dotazioni: {
      title: 'Dotazioni delle Camere'
    },
    serviziAggiuntivi: {
      title: 'Servizi Aggiuntivi'
    }
  },

  regolamento: {
    header: {
      title: 'Regolamento ed Informazioni',
      subtitle: 'Tutto quello che devi sapere per il tuo soggiorno'
    }
  },

  territorio: {
    header: {
      title: 'Il Territorio',
      subtitle: 'Scopri le attrazioni di Varese e dintorni'
    }
  },

  contatti: {
    header: {
      title: 'Contatti e Dove Siamo',
      subtitle: 'Raggiungerci è facilissimo'
    },
    main: {
      title: 'Come Contattarci',
      icon1: '📧', label1: 'Email',
      icon2: '📞', label2: 'Telefono',
      icon3: '📱', label3: 'Cellulari',
      icon4: '📍', label4: 'Indirizzo'
    },
    info: {
      email: 'belsorrisovarese@gmail.com',
      telefono: '+39 0332 830744',
      cell1: '+39 342 18 95 829',
      indirizzo1: 'Piazza Biroldi, 8',
      indirizzo2: '21100 Varese (VA) - Italia'
    },
    posizione: {
      title: 'Posizione Strategica'
    }
  },

  footer: {
    company: {
      title: 'BelSorrisoVarese – Dormire Felice'
    },
    company1: {
      name: 'Select di Pecchio Nicolò',
      brand: 'BelSorrisoVarese',
      address1: 'Sede Legale: Piazza Biroldi, 8',
      address2: 'Sede Operativa: Piazza Biroldi, 20',
      city: '21100 Varese',
      piva: 'P.IVA 02087850125'
    },
    company2: {
      name: 'HAPPI DAY SRL',
      address1: 'Sede Legale: P.za Motta, 6',
      address2: 'Sede Operativa: P.za Biroldi, 7',
      city: '21100 Varese',
      piva: 'Partita IVA 03645460126'
    },
    cin: {
      cin1name: '• Foresteria Belsorriso Happi',
      cin1: 'CIN: IT012133B4I9KHS63N',
      cin2name: '• Casa e Appartamenti per Vacanze Belsorriso',
      cin2: 'CIN: IT012133B4ZUUYL2CK',
      cin3name: '• Belsorriso Foresteria Lombarda',
      cin3: 'CIN: IT012133B45H2APG6U'
    },
    contactsIt: {
      title: 'Contatti',
      email: 'belsorrisovarese@gmail.com'
    }
  }
};

async function main() {
  console.log('Login...');
  const token = await login();
  console.log('Token OK\n');

  for (const [page, sections] of Object.entries(CONTENT)) {
    for (const [section, content] of Object.entries(sections)) {
      await save(token, page, section, content);
    }
  }

  console.log('\n✅ Tutti i contenuti popolati nel DB!');
}

main().catch(console.error);
