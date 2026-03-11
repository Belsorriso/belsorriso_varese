import { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';

function ArticlesList({ onEdit, onNew }) {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const api = useApi();

  useEffect(() => {
    fetchArticles();
  }, [pagination.page, filter, search]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: 10
      });
      if (filter !== 'all') params.append('status', filter);
      if (search) params.append('search', search);

      const data = await api.get(`/articles?${params}`);
      setArticles(data.articles);
      setPagination(data.pagination);
    } catch (error) {
      showMessage('error', 'Errore nel caricamento articoli');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo articolo?')) return;

    try {
      await api.del(`/articles/${id}`);
      showMessage('success', 'Articolo eliminato con successo');
      fetchArticles();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/articles/${id}`, { status: newStatus });
      showMessage('success', `Articolo ${newStatus === 'published' ? 'pubblicato' : 'salvato come bozza'}`);
      fetchArticles();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const categories = {
    news: 'News',
    eventi: 'Eventi',
    territorio: 'Territorio',
    cucina: 'Cucina',
    consigli: 'Consigli'
  };

  return (
    <div className="articles-list">
      {message && (
        <div className={`status-message ${message.type}`}>{message.text}</div>
      )}

      <div className="articles-toolbar">
        <div className="toolbar-left">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => { setFilter('all'); setPagination(p => ({ ...p, page: 1 })); }}
            >
              Tutti ({pagination.total})
            </button>
            <button
              className={`filter-tab ${filter === 'published' ? 'active' : ''}`}
              onClick={() => { setFilter('published'); setPagination(p => ({ ...p, page: 1 })); }}
            >
              Pubblicati
            </button>
            <button
              className={`filter-tab ${filter === 'draft' ? 'active' : ''}`}
              onClick={() => { setFilter('draft'); setPagination(p => ({ ...p, page: 1 })); }}
            >
              Bozze
            </button>
          </div>
        </div>

        <div className="toolbar-right">
          <input
            type="text"
            placeholder="Cerca articoli..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination(p => ({ ...p, page: 1 }));
            }}
            className="search-input"
          />
          <button className="btn btn-primary" onClick={onNew}>
            + Nuovo Articolo
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner"><div className="spinner"></div></div>
      ) : articles.length === 0 ? (
        <div className="empty-state">
          <p>Nessun articolo trovato</p>
          <button className="btn btn-primary" onClick={onNew}>
            Crea il primo articolo
          </button>
        </div>
      ) : (
        <table className="articles-table">
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Categoria</th>
              <th>Autore</th>
              <th>Stato</th>
              <th>Data</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article._id}>
                <td>
                  <div className="article-title-cell">
                    {article.featuredImage && (
                      <img
                        src={`http://localhost:5001${article.featuredImage}`}
                        alt=""
                        className="article-thumbnail"
                      />
                    )}
                    <div>
                      <strong>{article.title}</strong>
                      {article.excerpt && (
                        <p className="article-excerpt">{article.excerpt.substring(0, 60)}...</p>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="category-badge">{categories[article.category]}</span>
                </td>
                <td>{article.author?.name}</td>
                <td>
                  <span className={`status-badge ${article.status}`}>
                    {article.status === 'published' ? 'Pubblicato' : 'Bozza'}
                  </span>
                </td>
                <td>
                  {new Date(article.updatedAt).toLocaleDateString('it-IT')}
                </td>
                <td>
                  <div className="table-actions">
                    <button
                      className="btn btn-small"
                      onClick={() => onEdit(article._id)}
                    >
                      Modifica
                    </button>
                    {article.status === 'draft' ? (
                      <button
                        className="btn btn-small btn-success"
                        onClick={() => handleStatusChange(article._id, 'published')}
                      >
                        Pubblica
                      </button>
                    ) : (
                      <button
                        className="btn btn-small btn-warning"
                        onClick={() => handleStatusChange(article._id, 'draft')}
                      >
                        Bozza
                      </button>
                    )}
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => handleDelete(article._id)}
                    >
                      Elimina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-secondary"
            onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
            disabled={pagination.page === 1}
          >
            Precedente
          </button>
          <span className="pagination-info">
            Pagina {pagination.page} di {pagination.pages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
            disabled={pagination.page === pagination.pages}
          >
            Successiva
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticlesList;
