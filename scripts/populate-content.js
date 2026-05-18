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
    dotazioni: [
      { text: 'Riscaldamento autonomo (termosifoni + split condizionatore)' },
      { text: 'TV Smart 32" a parete' },
      { text: 'Connessione wireless ADSL gratuita' },
      { text: 'Cassaforte e frigorifero' },
      { text: 'Bagno privato con set asciugamani, asciugacapelli, bagno schiuma e shampoo' },
      { text: 'Angolo colazione con macchinetta elettrica per caffe, te, tisane' },
      { text: 'Insonorizzazione garantita' }
    ],
    serviziAggiuntivi: [
      { text: 'Accoglienza animali' }
    ],
    supplementi: {
      bambini: 'Bambini fino a 3 anni: soggiorno gratuito con lettini e culle disponibili',
      tassa: 'Tassa di soggiorno: 1 euro a notte per adulti',
      soggiorni: 'Soggiorni lunghi: offerte speciali disponibili su richiesta'
    },
    pagamenti: [
      { text: 'Contanti' },
      { text: 'Bonifico Bancario' },
      { text: 'Carte di Credito' },
      { text: 'Satispay' }
    ],
    sidebar: {
      contattiTitle: 'Contatti Rapidi',
      posizioneTitle: 'Posizione Strategica'
    },
    sidebarContatti: [
      { label: 'Email', value: 'belsorrisovarese@gmail.com' },
      { label: 'Tel', value: '+39 0332 830744' },
      { label: 'Cell', value: '+39 342 18 95 829' },
      { label: 'Indirizzo', value: 'Piazza Biroldi, 8 - 21100 Varese' }
    ],
    sidebarPosizione: [
      { text: '250m dalle stazioni ferroviarie' },
      { text: "60m dall'Ospedale Filippo del Ponte" },
      { text: '4 minuti a piedi dal centro' },
      { text: '20m dalla fermata autobus' }
    ]
  },

  regolamento: {
    header: {
      title: 'Regolamento ed Informazioni',
      subtitle: 'Tutto quello che devi sapere per il tuo soggiorno'
    },
    regole: [
      { title: 'Divieto di Fumo', text: "È vietato fumare in tutte le camere e negli spazi comuni interni. È consentito fumare nel cortile o sui balconi delle camere e degli appartamenti." },
      { title: 'Colazione', text: 'La colazione è disponibile a pagamento in convenzione con i bar situati nella piazza pedonale di fronte alla struttura, con opzione di colazione tipica italiana.' },
      { title: 'Camere e Servizi', text: 'Le stanze includono bagno privato, asciugamani e biancheria rinnovati ogni tre giorni, asciugacapelli e prodotti per la doccia. Ogni camera dispone di una cassaforte. Nelle camere la pulizia viene effettuata ogni giorno e negli appartamenti una volta a settimana per soggiorni più lunghi di 1 settimana.' },
      { title: 'Custodia Effetti Personali', text: 'Gli ospiti sono responsabili dei propri oggetti. In caso di smarrimento delle chiavi, viene addebitato un costo di 30 euro per la sostituzione.' },
      { title: 'Check-in', text: "Il check-in è previsto dalle 14:00 alle 19:00. È possibile eseguire il check-in fuori dagli orari previsti, fino alla mezzanotte, contattandoci preventivamente." },
      { title: 'Check-out', text: 'Il check-out deve essere effettuato entro le 10:30. Per la pulizia, la camera deve restare libera entro le 11:00.' }
    ],
    pagamenti: {
      title: 'Metodi di Pagamento Accettati',
      text: 'Contanti (entro i limiti di legge) - Bonifici bancari anticipati - Carte di credito - Satispay'
    },
    contattiSection: {
      title: 'Contatti per Informazioni',
      icon1: '📞', label1: 'Telefono Fisso',
      icon2: '📱', label2: 'Cellulari',
      icon3: '📧', label3: 'Email'
    },
    contatti: {
      telefonoFisso: '+39 0332 830744',
      cell1: '+39 342 1895829',
      email: 'belsorrisovarese@gmail.com'
    }
  },

  territorio: {
    header: {
      title: 'Il Territorio',
      subtitle: 'Scopri le attrazioni di Varese e dintorni'
    },
    intro: {
      title: 'Attrazioni nelle Vicinanze',
      subtitle: 'Varese offre numerose opportunità per cultura, natura e sport'
    },
    categorie: [
      { title: 'Natura e Spiritualità', items: ['Sacro Monte di Varese', 'Parco Campo dei Fiori', 'Osservatorio Astronomico', 'Lago di Varese', 'Lago di Monate (con pista ciclabile)', 'Isolino Virginia', 'Palude Brabbia'] },
      { title: 'Laghi della Zona', items: ['Lago di Como', 'Lago di Lugano', 'Lago Maggiore', 'Isole Borromee'] },
      { title: 'Cultura e Storia', items: ['Palazzo e Giardini Estensi', 'Villa Ponti', 'Museo Villa Panza', 'Parco Villa Toeplitz', 'Museo Pogliaghi', 'Civico Museo Archeologico'] },
      { title: 'Arte Religiosa', items: ['Basilica di S. Vittore', 'Battistero S. Giovanni', 'Centro Storico'] },
      { title: 'Sport e Tempo Libero', items: ['Stadio "F. Ossola"', 'Ippodromo', 'Palaa2a (basket)', 'Golf Club Luvinate', 'Golf Panorama', 'Volo a vela'] },
      { title: 'Business e Eventi', items: ['Centro Congressi Ville Ponti'] }
    ]
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
    posizione: [
      { distance: '20 metri', description: 'dalla fermata autobus per le stazioni ferroviarie' },
      { distance: '250 metri', description: 'dalle due stazioni ferroviarie della città' },
      { distance: '60 metri', description: "dall'Ospedale Filippo del Ponte" },
      { distance: '4 minuti', description: 'a piedi dal cuore della città' }
    ],
    servizi: {
      title: 'Servizi nelle Vicinanze',
      text: 'Nella zona sono disponibili numerosi servizi come bar, farmacia, supermercato e banca.'
    },
    pagamenti: [
      { text: 'Contanti' },
      { text: 'Bonifico Bancario' },
      { text: 'Carte di Credito' },
      { text: 'Satispay' }
    ]
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
