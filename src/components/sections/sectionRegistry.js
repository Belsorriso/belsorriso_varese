import HomeHero from './home/HomeHero';
import HomeWelcome from './home/HomeWelcome';
import HomeFeatures from './home/HomeFeatures';
import HomeContact from './home/HomeContact';
import StanzeHeader from './stanze/StanzeHeader';
import StanzeCamere from './stanze/StanzeCamere';
import StanzeAppartamenti from './stanze/StanzeAppartamenti';
import StanzeInfoBox from './stanze/StanzeInfoBox';
import StrutturaHeader from './struttura/StrutturaHeader';
import StrutturaMain from './struttura/StrutturaMain';
import RegolamentoHeader from './regolamento/RegolamentoHeader';
import RegolamentoContent from './regolamento/RegolamentoContent';
import TerritorioHeader from './territorio/TerritorioHeader';
import TerritorioContent from './territorio/TerritorioContent';
import ContattiHeader from './contatti/ContattiHeader';
import ContattiDetails from './contatti/ContattiDetails';

export const SECTION_REGISTRY = {
  'home-hero':        { label: 'Hero',              component: HomeHero },
  'home-welcome':     { label: 'Benvenuto',          component: HomeWelcome },
  'home-features':    { label: 'Punti di Forza',     component: HomeFeatures },
  'home-contact':     { label: 'Contatti',           component: HomeContact },

  'stanze-header':         { label: 'Header',             component: StanzeHeader },
  'stanze-camere':         { label: 'Camere',             component: StanzeCamere },
  'stanze-appartamenti':   { label: 'Appartamenti',       component: StanzeAppartamenti },
  'stanze-infobox':        { label: 'Info Box',           component: StanzeInfoBox },

  'struttura-header': { label: 'Header',             component: StrutturaHeader },
  'struttura-main':   { label: 'Contenuto e Sidebar',component: StrutturaMain },

  'regolamento-header':  { label: 'Header',          component: RegolamentoHeader },
  'regolamento-content': { label: 'Contenuto',       component: RegolamentoContent },

  'territorio-header':  { label: 'Header',           component: TerritorioHeader },
  'territorio-content': { label: 'Attrazioni',       component: TerritorioContent },

  'contatti-header':  { label: 'Header',             component: ContattiHeader },
  'contatti-details': { label: 'Dettagli e Mappa',   component: ContattiDetails },
};
