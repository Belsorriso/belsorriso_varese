import { EditableText, EditableSection, EditableImage } from '../../editable';

function HomeHero() {
  return (
    <EditableSection label="Hero">
      <EditableImage
        page="home"
        section="hero"
        field="background"
        className="hero"
        asBackground={true}
        defaultValue="/images/hero-bg.webp"
      >
        <div className="hero-content">
          <EditableText
            page="home"
            section="hero"
            field="title"
            tag="h1"
            defaultValue="Camere private, comfort garantito"
          />
          <EditableText
            page="home"
            section="hero"
            field="subtitle"
            tag="p"
            defaultValue="Relax e charme in un cortile dal fascino d'altri tempi"
          />
          <a
            href="https://belsorrisovarese.kross.travel/"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Controlla Disponibilita
          </a>
        </div>
      </EditableImage>
    </EditableSection>
  );
}

export default HomeHero;
