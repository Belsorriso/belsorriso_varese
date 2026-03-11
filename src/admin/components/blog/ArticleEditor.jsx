import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import useApi from '../../hooks/useApi';
import MediaLibrary from '../media/MediaLibrary';

function ArticleEditor({ articleId, onSave, onCancel }) {
  const [article, setArticle] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    category: 'news',
    tags: [],
    status: 'draft'
  });
  const [loading, setLoading] = useState(!!articleId);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const api = useApi();

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      const data = await api.get(`/articles/${articleId}`);
      setArticle(data);
    } catch (error) {
      showMessage('error', 'Errore nel caricamento articolo');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSave = async (status = article.status) => {
    if (!article.title || !article.content) {
      showMessage('error', 'Titolo e contenuto sono obbligatori');
      return;
    }

    setSaving(true);
    try {
      const payload = { ...article, status };

      if (articleId) {
        await api.put(`/articles/${articleId}`, payload);
      } else {
        await api.post('/articles', payload);
      }

      showMessage('success', 'Articolo salvato con successo');
      setTimeout(() => onSave?.(), 1000);
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !article.tags.includes(tagInput.trim())) {
      setArticle({
        ...article,
        tags: [...article.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setArticle({
      ...article,
      tags: article.tags.filter(t => t !== tag)
    });
  };

  const handleMediaSelect = (media) => {
    setArticle({ ...article, featuredImage: media.url });
    setShowMediaPicker(false);
  };

  const generateSlug = () => {
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setArticle({ ...article, slug });
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['clean']
    ]
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  return (
    <div className="article-editor">
      {message && (
        <div className={`status-message ${message.type}`}>{message.text}</div>
      )}

      <div className="editor-header">
        <button className="btn btn-secondary" onClick={onCancel}>
          ← Torna alla lista
        </button>
        <div className="editor-actions">
          <button
            className="btn btn-secondary"
            onClick={() => handleSave('draft')}
            disabled={saving}
          >
            Salva Bozza
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSave('published')}
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Pubblica'}
          </button>
        </div>
      </div>

      <div className="editor-layout">
        <div className="editor-main">
          <div className="form-group">
            <label>Titolo *</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => setArticle({ ...article, title: e.target.value })}
              placeholder="Titolo dell'articolo..."
              className="title-input"
            />
          </div>

          <div className="form-group">
            <label>
              Slug
              <button type="button" className="btn-link" onClick={generateSlug}>
                Genera da titolo
              </button>
            </label>
            <input
              type="text"
              value={article.slug}
              onChange={(e) => setArticle({ ...article, slug: e.target.value })}
              placeholder="url-articolo"
            />
          </div>

          <div className="form-group">
            <label>Estratto</label>
            <textarea
              value={article.excerpt}
              onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
              placeholder="Breve descrizione dell'articolo..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Contenuto *</label>
            <ReactQuill
              theme="snow"
              value={article.content}
              onChange={(content) => setArticle({ ...article, content })}
              modules={quillModules}
              placeholder="Scrivi il contenuto dell'articolo..."
              className="content-editor"
            />
          </div>
        </div>

        <div className="editor-sidebar">
          <div className="sidebar-section">
            <h4>Immagine in Evidenza</h4>
            {article.featuredImage ? (
              <div className="featured-image-preview">
                <img
                  src={`http://localhost:5001${article.featuredImage}`}
                  alt="Immagine in evidenza"
                />
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => setArticle({ ...article, featuredImage: '' })}
                >
                  Rimuovi
                </button>
              </div>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => setShowMediaPicker(true)}
              >
                Seleziona Immagine
              </button>
            )}
          </div>

          <div className="sidebar-section">
            <h4>Categoria</h4>
            <select
              value={article.category}
              onChange={(e) => setArticle({ ...article, category: e.target.value })}
            >
              <option value="news">News</option>
              <option value="eventi">Eventi</option>
              <option value="territorio">Territorio</option>
              <option value="cucina">Cucina</option>
              <option value="consigli">Consigli</option>
            </select>
          </div>

          <div className="sidebar-section">
            <h4>Tag</h4>
            <div className="tags-input">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Aggiungi tag..."
              />
              <button className="btn btn-small" onClick={handleAddTag}>+</button>
            </div>
            <div className="tags-list">
              {article.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)}>x</button>
                </span>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Stato</h4>
            <select
              value={article.status}
              onChange={(e) => setArticle({ ...article, status: e.target.value })}
            >
              <option value="draft">Bozza</option>
              <option value="published">Pubblicato</option>
            </select>
          </div>
        </div>
      </div>

      {showMediaPicker && (
        <div className="modal-overlay" onClick={() => setShowMediaPicker(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Seleziona Immagine</h3>
              <button className="modal-close" onClick={() => setShowMediaPicker(false)}>x</button>
            </div>
            <MediaLibrary selectionMode onSelect={handleMediaSelect} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleEditor;
