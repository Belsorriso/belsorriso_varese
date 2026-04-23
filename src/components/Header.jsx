import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/images/main_logo-178x100.png" alt="BelSorrisoVarese - Home" />
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? '\u2715' : '\u2630'}
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
          <Link
            to="/stanze"
            className={isActive('/stanze') ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            Le Stanze
          </Link>
          <Link
            to="/struttura-servizi"
            className={isActive('/struttura-servizi') ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            Struttura e Servizi
          </Link>
          <Link
            to="/regolamento"
            className={isActive('/regolamento') ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            Regolamento
          </Link>
          <Link
            to="/territorio"
            className={isActive('/territorio') ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            Territorio
          </Link>
          <Link
            to="/contatti"
            className={isActive('/contatti') ? 'active' : ''}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contatti
          </Link>
          <a
            href="https://belsorrisovarese.kross.travel/"
            className="btn-prenota"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prenota!
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
