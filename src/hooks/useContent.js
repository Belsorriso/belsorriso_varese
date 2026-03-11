import { useState, useEffect, useCallback } from 'react';
import { useEditMode } from '../context/EditModeContext';

const API_URL = 'http://localhost:5001/api';

export function useContent(page) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPendingSection, updateContent, updateSectionContent } = useEditMode();

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/content/${page}`);
      if (!response.ok) {
        throw new Error('Errore nel caricamento dei contenuti');
      }
      const data = await response.json();

      // L'API restituisce un array di { section, content }
      // Lo convertiamo in un oggetto { section: content }
      if (Array.isArray(data)) {
        const contentObj = {};
        data.forEach(item => {
          contentObj[item.section] = item.content;
        });
        setContent(contentObj);
      } else {
        setContent(data);
      }
    } catch (err) {
      setError(err.message);
      setContent({});
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getField = useCallback((section, field, defaultValue = '') => {
    const pendingSection = getPendingSection(page, section);
    if (pendingSection && field in pendingSection) {
      return pendingSection[field];
    }
    return content?.[section]?.[field] ?? defaultValue;
  }, [content, page, getPendingSection]);

  const getSection = useCallback((section, defaultValue = {}) => {
    const originalSection = content?.[section] || defaultValue;
    const pendingSection = getPendingSection(page, section);
    if (pendingSection) {
      return { ...originalSection, ...pendingSection };
    }
    return originalSection;
  }, [content, page, getPendingSection]);

  const getArray = useCallback((section, defaultValue = []) => {
    const pendingSection = getPendingSection(page, section);
    if (pendingSection) {
      return pendingSection;
    }
    return content?.[section] ?? defaultValue;
  }, [content, page, getPendingSection]);

  const updateField = useCallback((section, field, value) => {
    // Ottieni la sezione corrente (originale + modifiche pendenti)
    const originalSection = content?.[section] || {};
    const pendingSection = getPendingSection(page, section) || {};
    const mergedSection = { ...originalSection, ...pendingSection, [field]: value };
    updateSectionContent(page, section, mergedSection);
  }, [page, content, getPendingSection, updateSectionContent]);

  const updateSection = useCallback((section, newContent) => {
    updateSectionContent(page, section, newContent);
  }, [page, updateSectionContent]);

  return {
    content,
    loading,
    error,
    getField,
    getSection,
    getArray,
    updateField,
    updateSection,
    refetch: fetchContent
  };
}

export default useContent;
