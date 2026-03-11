import { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';

function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api.get('/stats');
      setStats(data);
    } catch (error) {
      console.error('Errore caricamento statistiche:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  return (
    <div className="overview-container">
      <div className="welcome-section">
        <h2>Benvenuto nel Pannello di Controllo</h2>
        <p>Gestisci i contenuti del sito BelSorriso Varese da qui.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon articles-icon">📝</div>
          <div className="stat-content">
            <div className="stat-number">{stats?.articles?.total || 0}</div>
            <div className="stat-label">Articoli Totali</div>
            <div className="stat-details">
              <span className="published">{stats?.articles?.published || 0} pubblicati</span>
              <span className="drafts">{stats?.articles?.drafts || 0} bozze</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon media-icon">🖼️</div>
          <div className="stat-content">
            <div className="stat-number">{stats?.media || 0}</div>
            <div className="stat-label">File Media</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pages-icon">📄</div>
          <div className="stat-content">
            <div className="stat-number">{stats?.pages || 0}</div>
            <div className="stat-label">Contenuti Pagine</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon users-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats?.users || 0}</div>
            <div className="stat-label">Utenti</div>
          </div>
        </div>
      </div>

      <div className="overview-panels">
        <div className="panel">
          <h3>Articoli Recenti</h3>
          {stats?.recentArticles?.length > 0 ? (
            <ul className="recent-list">
              {stats.recentArticles.map(article => (
                <li key={article._id}>
                  <div className="recent-item">
                    <span className="recent-title">{article.title}</span>
                    <span className={`status-badge ${article.status}`}>
                      {article.status === 'published' ? 'Pubblicato' : 'Bozza'}
                    </span>
                  </div>
                  <span className="recent-date">
                    {new Date(article.updatedAt).toLocaleDateString('it-IT')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">Nessun articolo ancora</p>
          )}
        </div>

        <div className="panel">
          <h3>Media Recenti</h3>
          {stats?.recentMedia?.length > 0 ? (
            <div className="recent-media-grid">
              {stats.recentMedia.map(item => (
                <div key={item._id} className="recent-media-item">
                  <img
                    src={`http://localhost:5001${item.url}`}
                    alt={item.originalName}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">Nessun file caricato</p>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <h3>Azioni Rapide</h3>
        <div className="actions-grid">
          <button className="action-card" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'articles' }))}>
            <span className="action-icon">✏️</span>
            <span className="action-label">Nuovo Articolo</span>
          </button>
          <button className="action-card" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'media' }))}>
            <span className="action-icon">📤</span>
            <span className="action-label">Carica Media</span>
          </button>
          <button className="action-card" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }))}>
            <span className="action-icon">🏠</span>
            <span className="action-label">Modifica Home</span>
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="action-card">
            <span className="action-icon">👁️</span>
            <span className="action-label">Visualizza Sito</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Overview;
