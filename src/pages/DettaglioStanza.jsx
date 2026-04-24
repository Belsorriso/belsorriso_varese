import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Dati completi delle stanze (ROOMS)
const stanzeData = {
  // Camere
  'bordeaux': {
    nome: 'Bordeaux',
    tipo: 'Camera',
    mq: '21 m²',
    piano: 'Primo piano',
    descrizione: 'La Bordeaux è una camera calda e avvolgente, perfetta per coppie che desiderano un soggiorno intimo e rilassante nel cuore di Varese. I suoi toni profondi creano un\'atmosfera accogliente, ideale per staccare dopo una giornata di lavoro o di scoperta della città.\n\nDispone di letto matrimoniale (convertibile in due letti singoli su richiesta), bagno privato con doccia e set di cortesia, Smart TV da 32", Wi-Fi ad alta velocità, aria condizionata e riscaldamento autonomo, piccolo frigorifero, cassaforte, macchina per caffè e tè con biscotti di cortesia.\n\nLa struttura è insonorizzata e pet friendly, per permettere a tutta la famiglia di viaggiare insieme.',
    immagini: ['1-IMG_9378.jpg', '2-IMG_9379.jpg', '3-IMG_9386.jpg', '4-IMG_9390.jpg', '5-IMG_9392.jpg', '6-IMG_9393.jpg', '7-IMG_9394.jpg', '8-IMG_9397.jpg', '9-IMG_9412.jpg'],
    folder: 'lilla',
  },
  'azzurra': {
    nome: 'Azzurra',
    tipo: 'Camera',
    mq: '21 m²',
    piano: 'Primo piano',
    descrizione: 'Spaziosa e luminosa, Azzurra è la soluzione ideale per famiglie con due bambini. È composta da un letto matrimoniale e due letti singoli a castello, offrendo comfort e praticità in un ambiente semplice e funzionale.\n\nLa camera dispone di bagno privato con doccia e set di cortesia, Smart TV da 32", Wi-Fi ad alta velocità, aria condizionata e riscaldamento autonomo, piccolo frigorifero, cassaforte, macchina per caffè e tè con biscotti di cortesia.\n\nL\'edificio è insonorizzato e pet friendly.',
    immagini: ['1-IMG_9640.jpg', '2-IMG_9647.jpg', '3-IMG_9648.jpg', '4-IMG_9651.jpg', '5-IMG_9659.jpg', '6-IMG_9660.jpg', '7-IMG_9661.jpg', '8-IMG_9662.jpg'],
    folder: 'azzura',
  },
  'rossa': {
    nome: 'Rossa',
    tipo: 'Camera',
    mq: '18 m²',
    piano: 'Primo piano',
    descrizione: 'Accogliente e fresca, Rossa è perfetta per coppie che cercano un ambiente rilassato e confortevole. Le sue dimensioni intime la rendono ideale per brevi soggiorni o weekend romantici.\n\nDispone di letto matrimoniale, bagno privato con doccia e set di cortesia, Smart TV da 32", Wi-Fi ad alta velocità, aria condizionata e riscaldamento autonomo, piccolo frigorifero, cassaforte, macchina per caffè e tè con biscotti di cortesia.\n\nStruttura insonorizzata e pet friendly.',
    immagini: ['1-IMG_1016.jpg', '2-IMG_1019.jpg', '3-IMG_1022.jpg', '4-IMG_1025.jpg', '5-IMG_1030.jpg', '6-IMG_1035.jpg'],
    folder: 'rosso',
  },
  'verde': {
    nome: 'Verde',
    tipo: 'Camera',
    mq: '22 m²',
    piano: 'Secondo piano',
    descrizione: 'Luminosa e tranquilla, Verde si distingue per il suo balconcino con vista sul cortile interno, che regala un angolo riservato e piacevole per respirare un po\' di aria fresca.\n\nÈ dotata di letto matrimoniale (convertibile in due letti singoli su richiesta), bagno privato con doccia e set di cortesia, Smart TV da 32", Wi-Fi ad alta velocità, aria condizionata e riscaldamento autonomo, piccolo frigorifero, cassaforte, macchina per caffè e tè con biscotti di cortesia.\n\nLa struttura è insonorizzata e pet friendly.',
    immagini: ['1-IMG_4012.jpg', '2-IMG_4017.jpg', '3-IMG_4045.jpg', '4-IMG_4049.jpg', '5-IMG_4053.jpg', '6-IMG_4059.jpg', '7-IMG_4063.jpg'],
  },
  'arancio': {
    nome: 'Arancio',
    tipo: 'Camera',
    mq: '16 m²',
    piano: 'Secondo piano',
    descrizione: 'Compatta e funzionale, Arancio offre una soluzione pratica per famiglie o piccoli gruppi. Dispone di un letto alla francese e due letti singoli a castello, in uno spazio ben organizzato.\n\nLa camera include bagno privato con doccia e set di cortesia, Smart TV da 32", Wi-Fi ad alta velocità, aria condizionata e riscaldamento autonomo, piccolo frigorifero, cassaforte, macchina per caffè e tè con biscotti di cortesia.\n\nEdificio insonorizzato e pet friendly.',
    immagini: ['1-IMG_0496.jpg', '2-IMG_0507.jpg', '3-IMG_0517.jpg', '4-IMG_0519.jpg', '5-IMG_0523.jpg', '6-IMG_0526.jpg', '7-IMG_0530.jpg', '8-IMG_0532.jpg'],
  },
  'blu': {
    nome: 'Blu',
    tipo: 'Camera',
    mq: '22 m²',
    piano: 'Secondo piano',
    descrizione: 'Elegante ed equilibrata, Blu trasmette calma e ordine fin dal primo momento. È ideale sia per coppie sia per chi viaggia per lavoro e cerca un ambiente silenzioso e rilassante.\n\nDispone di letto matrimoniale (convertibile in due letti singoli su richiesta), bagno privato con doccia e set di cortesia, Smart TV da 32", Wi-Fi ad alta velocità, aria condizionata e riscaldamento autonomo, piccolo frigorifero, cassaforte, macchina per caffè e tè con biscotti di cortesia.\n\nStruttura insonorizzata e pet friendly.',
    immagini: ['1-IMG_0270.jpg', '2-IMG_0271.jpg', '3-IMG_0272.jpg', '4-IMG_0277.jpg', '5-IMG_0279.jpg', '6-IMG_0282.jpg', '7-IMG_0290.jpg', '8-IMG_0296.jpg'],
  },
  'avorio': {
    nome: 'Avorio',
    tipo: 'Camera',
    mq: '21 m²',
    piano: 'Secondo piano',
    descrizione: 'Ampia e armoniosa, Avorio è una camera versatile e tranquilla, ideale per famiglie. Dispone di un letto matrimoniale e due letti singoli a castello, offrendo uno spazio comodo e ben distribuito.\n\nLa camera è dotata di bagno privato con doccia e set di cortesia, Smart TV da 32", Wi-Fi ad alta velocità, aria condizionata e riscaldamento autonomo, piccolo frigorifero, cassaforte, macchina per caffè e tè con biscotti di cortesia.\n\nL\'edificio è insonorizzato e pet friendly.',
    immagini: ['3-IMG_0392.jpg', '4-IMG_0394.jpg', '5-IMG_0395.jpg', '6-IMG_0397.jpg', '2-IMG_0387.jpg', '1-IMG_0385.jpg'],
  },
  // Camere Lilla
  'lilla-a': {
    nome: 'Lilla A',
    tipo: 'Camera',
    mq: '25 m²',
    piano: 'Primo piano',
    descrizione: 'La più spaziosa tra le camere, luminosa e versatile. Lilla A dispone di letto matrimoniale (convertibile in due letti singoli su richiesta) e può essere collegata internamente alla Lilla B tramite porta comunicante, diventando la soluzione ideale per famiglie o gruppi di amici.\n\nInclude bagno privato con doccia e set di cortesia, Smart TV da 32", Wi-Fi ad alta velocità, aria condizionata e riscaldamento autonomo, piccolo frigorifero, cassaforte, macchina per caffè e tè con biscotti di cortesia.\n\nStruttura insonorizzata e pet friendly.',
    immagini: ['1-IMG_9562.jpg', '2-IMG_9572.jpg', '3-IMG_9574.jpg', '4-IMG_9577.jpg', '5-IMG_9583.jpg', '6-IMG_9584_jpg.jpg'],
    folder: 'bordeaux',
  },
  'lilla-b': {
    nome: 'Lilla B',
    tipo: 'Camera',
    mq: '14 m²',
    piano: 'Primo piano',
    descrizione: 'Funzionale e accogliente, Lilla B è dotata di due letti singoli a castello. Può essere prenotata indipendentemente oppure collegata alla Lilla A per creare uno spazio più ampio e comunicante.\n\nLa camera dispone di bagno privato con doccia e set di cortesia, Smart TV da 32", Wi-Fi ad alta velocità, aria condizionata e riscaldamento autonomo, piccolo frigorifero, cassaforte, macchina per caffè e tè con biscotti di cortesia.\n\nEdificio insonorizzato e pet friendly.',
    immagini: ['1-IMG_0831.jpg', '2-IMG_0833.jpg', '3-IMG_0836.jpg', '4-IMG_0838.jpg', '5-IMG_0839.jpg', '6-IMG_0841.jpg', '7-IMG_0850.jpg'],
    folder: 'lillab',
  },
  // Appartamenti
  'bilo1b': {
    nome: 'Bilo 1B Comfort',
    tipo: 'Bilocale',
    mq: '58 m²',
    piano: 'Quarto piano (ultimo piano – accesso con scale, ascensore disponibile)',
    descrizione: 'Luminoso e riservato, Bilo 1B Comfort si trova all\'ultimo piano della struttura, offrendo tranquillità e una piacevole sensazione di indipendenza. È composto da una camera da letto matrimoniale e un soggiorno con due letti singoli, ideale per famiglie o piccoli gruppi.\n\nDispone di TV sia nel soggiorno sia nella camera da letto, cucina completa con forno e tutti gli utensili necessari, lavatrice con stendibiancheria e detersivo, bagno privato e zona pranzo funzionale.\n\nIngresso indipendente, pet friendly, con acqua e biscotti di benvenuto.\n\nPulizia inclusa una volta a settimana per soggiorni superiori a 7 notti.',
    immagini: ['592029791.jpg', '592029793.jpg', '592029794.jpg', 'bf9b3d58-e5e7-4fa4-a2ea-70470d047810.avif', 'e36bbf53-cc85-43be-8bec-a17a3c9d9983.avif'],
  },
  'bilo2': {
    nome: 'Bilo 2',
    tipo: 'Bilocale',
    mq: '60 m²',
    piano: 'Primo piano',
    descrizione: 'Spazioso e versatile, Bilo 2 è ideale per chi desidera comfort e flessibilità. La camera da letto dispone di un letto matrimoniale con possibilità di aggiungere un letto singolo. Nel soggiorno è presente un divano letto per una persona.\n\nL\'appartamento include TV in camera, cucina completa con forno, lavatrice con stendibiancheria e detersivo, bagno privato e ingresso indipendente.\n\nPet friendly, con acqua e biscotti di benvenuto.\n\nPulizia settimanale inclusa per soggiorni oltre 7 notti.',
    immagini: ['1-IMG_0739.jpg', '2-IMG_0740.jpg', '3-IMG_0745.jpg', '4-IMG_0749.jpg', '5-IMG_0750.jpg', '6-IMG_0753.jpg', '7-IMG_0754.jpg'],
  },
  'bilo5': {
    nome: 'Bilo 5',
    tipo: 'Bilocale',
    mq: '70 m²',
    piano: 'Primo piano – struttura su due livelli',
    descrizione: 'Originale e funzionale, Bilo 5 si sviluppa su due livelli. Al piano superiore si trovano la camera matrimoniale e il bagno privato. Al livello inferiore sono presenti due letti singoli e una cucina completa con zona pranzo.\n\nL\'appartamento è dotato di lavatrice, stendibiancheria, detersivo e ingresso indipendente, offrendo una soluzione dinamica e confortevole per famiglie o gruppi.\n\nPet friendly, con acqua e biscotti di benvenuto.\n\nPulizia inclusa una volta a settimana per soggiorni superiori a 7 notti.',
    immagini: ['1-IMG_4739.jpg', '2-IMG_4752.jpg', '3-IMG_5230.jpg', '4-IMG_5232.jpg', '5-IMG_5235.jpg', '6-IMG_5240.jpg', '7-IMG_5241.jpg', '8-IMG_5243.jpg'],
  },
  'bilo6': {
    nome: 'Bilo 6',
    tipo: 'Bilocale',
    mq: '65 m²',
    piano: 'Primo piano',
    descrizione: 'Accogliente e ben distribuito, Bilo 6 dispone di una camera matrimoniale e di due letti singoli nel soggiorno, garantendo spazio e comfort.\n\nInclude cucina completa con forno, lavatrice con stendibiancheria e detersivo, bagno privato e ingresso indipendente.\n\nPet friendly, con acqua e biscotti di benvenuto.\n\nPulizia settimanale inclusa per soggiorni superiori a 7 notti.',
    immagini: ['1-IMG_1935.jpg', '2-IMG_1937.jpg', '3-IMG_1943.jpg', '4-IMG_1944.jpg', '5-IMG_1948.jpg', '6-IMG_1949.jpg'],
  },
  'bilo8': {
    nome: 'Bilo 8',
    tipo: 'Bilocale',
    mq: '75 m²',
    piano: 'Secondo piano',
    descrizione: 'Ampio e completo, Bilo 8 è ideale per soggiorni prolungati. Dispone di una camera matrimoniale con TV e zona lavoro, soggiorno con due letti singoli e TV, cucina completa con forno e lavastoviglie, oltre a una comoda zona lavanderia.\n\nL\'appartamento offre bagno privato, ingresso indipendente e tutti i comfort per sentirsi a casa.\n\nPet friendly, con acqua e biscotti di benvenuto.\n\nPulizia settimanale inclusa per soggiorni superiori a 7 notti.',
    immagini: ['1-IMG_0784.jpg', '2-IMG_0786.jpg', '3-IMG_0787.jpg', '4-IMG_0788.jpg', '5-IMG_0790.jpg', '6-IMG_0792.jpg', '7-IMG_0794.jpg', '8-IMG_0802.jpg', '9-IMG_0803.jpg', '10-IMG_0809.jpg'],
  },
  'mono3': {
    nome: 'Mono 3',
    tipo: 'Monolocale',
    mq: '45 m²',
    piano: 'Piano terra',
    descrizione: 'Monolocale pratico e funzionale, perfetto per soggiorni di lavoro o brevi permanenze. Dispone di zona giorno con cucina completa, area notte integrata e bagno privato.\n\nInclude lavatrice, stendibiancheria, detersivo e ingresso indipendente.\n\nPet friendly, con acqua e biscotti di benvenuto.\n\nPulizia settimanale inclusa per soggiorni superiori a 7 notti.',
    immagini: ['1-IMG_0167.jpg', '2-IMG_0171.jpg', '3-IMG_0175.jpg', '4-IMG_0176.jpg', '5-IMG_0178.jpg', '6-IMG_0180.jpg', '7-IMG_0182.jpg', '8-IMG_0184.jpg'],
    folder: 'mono4e7',
  },
  'mono4': {
    nome: 'Mono 4',
    tipo: 'Monolocale',
    mq: '45 m²',
    piano: 'Primo piano',
    descrizione: 'Monolocale accogliente e ben organizzato, con cucina completa, zona notte integrata e bagno privato.\n\nDotato di lavatrice, stendibiancheria, detersivo e ingresso indipendente.\n\nPet friendly, con acqua e biscotti di benvenuto.\n\nPulizia settimanale inclusa per soggiorni superiori a 7 notti.',
    immagini: ['1-IMG_0167.jpg', '2-IMG_0171.jpg', '3-IMG_0175.jpg', '4-IMG_0176.jpg', '5-IMG_0178.jpg', '6-IMG_0180.jpg', '7-IMG_0182.jpg', '8-IMG_0184.jpg'],
    folder: 'mono4e7',
  },
  'mono7': {
    nome: 'Mono 7',
    tipo: 'Monolocale',
    mq: '45 m²',
    piano: 'Secondo piano',
    descrizione: 'Monolocale luminoso e funzionale, ideale per soggiorni comodi e indipendenti. Offre cucina completa, zona notte integrata e bagno privato.\n\nInclude lavatrice, stendibiancheria, detersivo e ingresso indipendente.\n\nPet friendly, con acqua e biscotti di benvenuto.\n\nPulizia settimanale inclusa per soggiorni superiori a 7 notti.',
    immagini: ['1-IMG_0167.jpg', '2-IMG_0171.jpg', '3-IMG_0175.jpg', '4-IMG_0176.jpg', '5-IMG_0178.jpg', '6-IMG_0180.jpg', '7-IMG_0182.jpg', '8-IMG_0184.jpg'],
    folder: 'mono4e7',
  },
  'suitemono8': {
    nome: 'Suite Mono 8',
    tipo: 'Monolocale',
    mq: '33 m²',
    piano: 'Primo piano – ascensore e scale disponibili',
    descrizione: 'Mini studio con angolo cottura e balcone privato, ideale per soggiorni brevi e indipendenti.\n\nDispone di bagno privato e zona cucina funzionale (senza lavatrice).\n\nIngresso indipendente, pet friendly, con acqua e biscotti di benvenuto.\n\nPulizia settimanale inclusa per soggiorni superiori a 7 notti.',
    immagini: ['1-IMG_5169.jpg', '2-IMG_5172.jpg', '3-IMG_5174.jpg', '4-IMG_5175.jpg', '5-IMG_5190.jpg', '6-IMG_5192.jpg', '7-IMG_5193.jpg', '8-IMG_5199.jpg'],
  },
  'trilocale9': {
    nome: 'Trilocale Superior 9',
    tipo: 'Trilocale',
    mq: '',
    piano: 'Secondo piano',
    descrizione: 'Spazioso e completo, Trilocale Superior 9 è pensato per famiglie numerose o gruppi. Dispone di due camere da letto:\n– Camera 1 con letto matrimoniale\n– Camera 2 con letto matrimoniale e due letti singoli\n\nNel soggiorno è presente un divano letto per due persone. L\'appartamento offre TV in tutte e tre le stanze, zona lavoro dedicata, cucina completa con forno e lavastoviglie, lavatrice con stendibiancheria e detersivo.\n\nBagno privato e ingresso indipendente completano l\'esperienza.\n\nPet friendly, con acqua e biscotti di benvenuto.\n\nPulizia inclusa una volta a settimana per soggiorni superiori a 7 notti.',
    immagini: ['1-IMG_5150.jpg', '2-IMG_5154.jpg', '3-IMG_5156.jpg', '4-IMG_5158.jpg', '5-IMG_5160.jpg', '6-IMG_5163.jpg', '7-IMG_5164.jpg', '8-IMG_5165.jpg', '9-IMG_5166.jpg'],
    folder: 'trilo9',
  },
};

function DettaglioStanza() {
  const { slug } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll to top quando la pagina viene caricata
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const stanza = stanzeData[slug];

  if (!stanza) {
    return (
      <>
        <section className="page-header">
          <div className="container">
            <h1>Camera non trovata</h1>
            <p>La camera richiesta non esiste.</p>
          </div>
        </section>
        <section className="content-section">
          <div className="container" style={{ textAlign: 'center' }}>
            <Link to="/stanze" className="btn-primary">Torna alle Stanze</Link>
          </div>
        </section>
      </>
    );
  }

  const folder = stanza.folder || slug;
  const images = stanza.immagini;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>{stanza.nome}</h1>
          <p>{stanza.tipo} {stanza.mq && `- ${stanza.mq}`} {stanza.piano && `- ${stanza.piano}`}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="stanza-detail">
            <div className="stanza-gallery">
              <div className="stanza-gallery-main">
                <img
                  src={`/images/stanze/${folder}/${images[currentIndex]}`}
                  alt={`${stanza.nome} - Foto ${currentIndex + 1}`}
                />
                {images.length > 1 && (
                  <>
                    <button className="gallery-nav gallery-prev" onClick={prevImage}>&lt;</button>
                    <button className="gallery-nav gallery-next" onClick={nextImage}>&gt;</button>
                  </>
                )}
              </div>
              <div className="stanza-gallery-thumbs">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`stanza-thumb ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <img src={`/images/stanze/${folder}/${img}`} alt={`Miniatura ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="stanza-info">
              <div className="stanza-info-header">
                <span className="stanza-type-badge">{stanza.tipo}</span>
                {stanza.mq && <span className="stanza-size">{stanza.mq}</span>}
                {stanza.piano && <span className="stanza-piano">{stanza.piano}</span>}
              </div>

              <div className="stanza-description">
                {stanza.descrizione.split('\n\n').map((paragrafo, idx) => (
                  <p key={idx}>{paragrafo}</p>
                ))}
              </div>

              <div className="stanza-actions">
                <a
                  href="https://belsorrisovarese.kross.travel/"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prenota Ora
                </a>
                <Link to="/stanze" className="btn-secondary">
                  Torna alle Stanze
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DettaglioStanza;
