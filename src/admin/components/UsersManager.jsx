import { useState, useEffect } from 'react';
import { API_URL } from '../../config/api';

function UsersManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'editor' });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('${API_URL}/auth/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Errore caricamento utenti:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('${API_URL}/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Utente creato con successo!' });
        setNewUser({ name: '', email: '', password: '', role: 'editor' });
        setShowAddForm(false);
        fetchUsers();
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Errore nella creazione');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Sei sicuro di voler eliminare questo utente?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Utente eliminato!' });
        fetchUsers();
      } else {
        throw new Error('Errore nell\'eliminazione');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  if (loading) {
    return <div className="loading-spinner"><div className="spinner"></div></div>;
  }

  return (
    <div className="editor-container">
      {message && (
        <div className={`status-message ${message.type}`}>{message.text}</div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Annulla' : '+ Nuovo Utente'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-user-form">
          <h4>Aggiungi Nuovo Utente</h4>
          <form onSubmit={handleAddUser}>
            <div className="form-row">
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label>Ruolo</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Crea Utente
            </button>
          </form>
        </div>
      )}

      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ruolo</th>
            <th>Creato il</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge badge-${user.role}`}>
                  {user.role}
                </span>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString('it-IT')}</td>
              <td className="actions">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user._id)}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersManager;
