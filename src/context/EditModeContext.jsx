import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from '../admin/context/AuthContext';
import { API_URL } from '../config/api';

const EditModeContext = createContext(null);

export function EditModeProvider({ children }) {
  const { user, getToken } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [pendingChanges, setPendingChanges] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const isAdmin = user?.role === 'admin' || user?.role === 'editor';

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const toggleEditMode = useCallback(() => {
    if (isEditMode && isDirty) {
      if (!window.confirm('Ci sono modifiche non salvate. Vuoi uscire senza salvare?')) {
        return;
      }
      setPendingChanges({});
      setIsDirty(false);
    }
    setIsEditMode(!isEditMode);
  }, [isEditMode, isDirty]);

  const updateContent = useCallback((page, section, field, value) => {
    setPendingChanges(prev => {
      const newChanges = { ...prev };
      if (!newChanges[page]) {
        newChanges[page] = {};
      }
      if (!newChanges[page][section]) {
        newChanges[page][section] = {};
      }
      newChanges[page][section][field] = value;
      return newChanges;
    });
    setIsDirty(true);
  }, []);

  const updateSectionContent = useCallback((page, section, content) => {
    setPendingChanges(prev => {
      const newChanges = { ...prev };
      if (!newChanges[page]) {
        newChanges[page] = {};
      }
      newChanges[page][section] = content;
      return newChanges;
    });
    setIsDirty(true);
  }, []);

  const saveChanges = useCallback(async () => {
    if (!isDirty || Object.keys(pendingChanges).length === 0) {
      return;
    }

    setSaving(true);
    const token = getToken();

    try {
      const savePromises = [];

      for (const [page, sections] of Object.entries(pendingChanges)) {
        for (const [section, sectionContent] of Object.entries(sections)) {
          savePromises.push(
            fetch(`${API_URL}/content/${page}/${section}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ content: sectionContent })
            }).then(async (res) => {
              if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || `Errore nel salvare ${page}/${section}`);
              }
              return res.json();
            })
          );
        }
      }

      await Promise.all(savePromises);
      setPendingChanges({});
      setIsDirty(false);
      showMessage('success', 'Modifiche salvate con successo!');
    } catch (error) {
      showMessage('error', error.message || 'Errore nel salvare le modifiche');
      throw error;
    } finally {
      setSaving(false);
    }
  }, [isDirty, pendingChanges, getToken]);

  const discardChanges = useCallback(() => {
    if (isDirty) {
      if (!window.confirm('Sei sicuro di voler annullare tutte le modifiche?')) {
        return;
      }
    }
    setPendingChanges({});
    setIsDirty(false);
    window.location.reload();
  }, [isDirty]);

  const getPendingValue = useCallback((page, section, field) => {
    return pendingChanges[page]?.[section]?.[field];
  }, [pendingChanges]);

  const getPendingSection = useCallback((page, section) => {
    return pendingChanges[page]?.[section];
  }, [pendingChanges]);

  return (
    <EditModeContext.Provider value={{
      isEditMode,
      isDirty,
      isAdmin,
      saving,
      message,
      pendingChanges,
      toggleEditMode,
      updateContent,
      updateSectionContent,
      saveChanges,
      discardChanges,
      getPendingValue,
      getPendingSection,
      showMessage
    }}>
      {children}
    </EditModeContext.Provider>
  );
}

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};
