// Default builder data for each page.
// Used when no saved builder data exists in the database.
// Each page starts with its existing hardcoded sections as draggable rows.

export const DEFAULT_BUILDER_DATA = {
  home: {
    version: '1.0',
    rows: [
      { id: 'default-home-hero',     type: 'section', sectionId: 'home-hero' },
      { id: 'default-home-welcome',  type: 'section', sectionId: 'home-welcome' },
      { id: 'default-home-features', type: 'section', sectionId: 'home-features' },
      { id: 'default-home-contact',  type: 'section', sectionId: 'home-contact' },
    ],
  },
  stanze: {
    version: '1.0',
    rows: [
      { id: 'default-stanze-header',       type: 'section', sectionId: 'stanze-header' },
      { id: 'default-stanze-camere',       type: 'section', sectionId: 'stanze-camere' },
      { id: 'default-stanze-appartamenti', type: 'section', sectionId: 'stanze-appartamenti' },
      { id: 'default-stanze-infobox',      type: 'section', sectionId: 'stanze-infobox' },
    ],
  },
  struttura: {
    version: '1.0',
    rows: [
      { id: 'default-struttura-header', type: 'section', sectionId: 'struttura-header' },
      { id: 'default-struttura-main',   type: 'section', sectionId: 'struttura-main' },
    ],
  },
  regolamento: {
    version: '1.0',
    rows: [
      { id: 'default-regolamento-header',  type: 'section', sectionId: 'regolamento-header' },
      { id: 'default-regolamento-content', type: 'section', sectionId: 'regolamento-content' },
    ],
  },
  territorio: {
    version: '1.0',
    rows: [
      { id: 'default-territorio-header',  type: 'section', sectionId: 'territorio-header' },
      { id: 'default-territorio-content', type: 'section', sectionId: 'territorio-content' },
    ],
  },
  contatti: {
    version: '1.0',
    rows: [
      { id: 'default-contatti-header',  type: 'section', sectionId: 'contatti-header' },
      { id: 'default-contatti-details', type: 'section', sectionId: 'contatti-details' },
    ],
  },
};
