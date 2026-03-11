import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Overview from '../components/dashboard/Overview';
import HomeEditor from '../components/HomeEditor';
import StanzeEditor from '../components/StanzeEditor';
import StrutturaEditor from '../components/StrutturaEditor';
import RegolamentoEditor from '../components/RegolamentoEditor';
import TerritorioEditor from '../components/TerritorioEditor';
import ContattiEditor from '../components/ContattiEditor';
import FooterEditor from '../components/FooterEditor';
import UsersManager from '../components/UsersManager';
import MediaLibrary from '../components/media/MediaLibrary';
import ArticlesList from '../components/blog/ArticlesList';
import ArticleEditor from '../components/blog/ArticleEditor';
import PageBuilderEditor from '../components/pagebuilder/PageBuilderEditor';
import '../admin.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingArticle, setEditingArticle] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState(['contenuti', 'blog', 'pagebuilder']);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigate = (e) => {
      setActiveTab(e.detail);
      if (e.detail === 'articles') {
        setEditingArticle(null);
      }
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleGroup = (group) => {
    setExpandedGroups(prev =>
      prev.includes(group)
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  const menuGroups = [
    {
      id: 'main',
      items: [
        { id: 'overview', label: 'Dashboard', icon: '📊' },
      ]
    },
    {
      id: 'contenuti',
      label: 'Contenuti',
      icon: '📝',
      items: [
        { id: 'home', label: 'Home Page', icon: '🏠' },
        { id: 'stanze', label: 'Le Stanze', icon: '🛏️' },
        { id: 'struttura', label: 'Struttura', icon: '🏨' },
        { id: 'regolamento', label: 'Regolamento', icon: '📋' },
        { id: 'territorio', label: 'Territorio', icon: '🗺️' },
        { id: 'contatti', label: 'Contatti', icon: '📞' },
        { id: 'footer', label: 'Footer', icon: '📄' },
        { id: 'pagebuilder', label: 'Page Builder', icon: '🧩' },
      ]
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: '✏️',
      items: [
        { id: 'articles', label: 'Tutti gli Articoli', icon: '📰' },
        { id: 'new-article', label: 'Nuovo Articolo', icon: '➕' },
      ]
    },
    {
      id: 'media-group',
      label: 'Media',
      icon: '🖼️',
      items: [
        { id: 'media', label: 'Libreria Media', icon: '📁' },
      ]
    }
  ];

  if (user?.role === 'admin') {
    menuGroups.push({
      id: 'settings',
      label: 'Impostazioni',
      icon: '⚙️',
      items: [
        { id: 'users', label: 'Utenti', icon: '👥' },
      ]
    });
  }

  const handleTabClick = (tabId) => {
    if (tabId === 'new-article') {
      setActiveTab('articles');
      setEditingArticle('new');
    } else {
      setActiveTab(tabId);
      setEditingArticle(null);
    }
  };

  const getPageTitle = () => {
    if (activeTab === 'articles' && editingArticle) {
      return editingArticle === 'new' ? 'Nuovo Articolo' : 'Modifica Articolo';
    }
    for (const group of menuGroups) {
      const item = group.items.find(i => i.id === activeTab);
      if (item) return item.label;
    }
    return 'Dashboard';
  };

  const renderContent = () => {
    if (activeTab === 'articles' && editingArticle) {
      return (
        <ArticleEditor
          articleId={editingArticle === 'new' ? null : editingArticle}
          onSave={() => {
            setEditingArticle(null);
          }}
          onCancel={() => setEditingArticle(null)}
        />
      );
    }

    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'home': return <HomeEditor />;
      case 'stanze': return <StanzeEditor />;
      case 'struttura': return <StrutturaEditor />;
      case 'regolamento': return <RegolamentoEditor />;
      case 'territorio': return <TerritorioEditor />;
      case 'contatti': return <ContattiEditor />;
      case 'footer': return <FooterEditor />;
      case 'pagebuilder': return <PageBuilderEditor />;
      case 'users': return <UsersManager />;
      case 'media': return <MediaLibrary />;
      case 'articles': return (
        <ArticlesList
          onEdit={(id) => setEditingArticle(id)}
          onNew={() => setEditingArticle('new')}
        />
      );
      default: return <Overview />;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src="/images/main_logo-178x100.png" alt="BelSorriso" />
          <span className="admin-title">Admin</span>
        </div>

        <nav className="admin-nav">
          {menuGroups.map(group => (
            <div key={group.id} className="nav-group">
              {group.label ? (
                <>
                  <button
                    className={`nav-group-header ${expandedGroups.includes(group.id) ? 'expanded' : ''}`}
                    onClick={() => toggleGroup(group.id)}
                  >
                    <span className="nav-icon">{group.icon}</span>
                    <span className="nav-label">{group.label}</span>
                    <span className="nav-arrow">{expandedGroups.includes(group.id) ? '▼' : '▶'}</span>
                  </button>
                  {expandedGroups.includes(group.id) && (
                    <div className="nav-group-items">
                      {group.items.map(item => (
                        <button
                          key={item.id}
                          className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                          onClick={() => handleTabClick(item.id)}
                        >
                          <span className="nav-icon">{item.icon}</span>
                          <span className="nav-label">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                group.items.map(item => (
                  <button
                    key={item.id}
                    className={`admin-nav-item top-level ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                ))
              )}
            </div>
          ))}
        </nav>

        <div className="admin-user">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Esci
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{getPageTitle()}</h1>
          <a href="/" target="_blank" rel="noopener noreferrer" className="view-site-btn">
            Visualizza Sito
          </a>
        </header>

        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
