import { useState, useCallback } from 'react';
import { API_URL as API_BASE } from '../../config/api';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        ...options.headers,
      };

      // Add auth token if available
      const token = getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Add content-type for JSON requests (not for FormData)
      if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
        body: options.body instanceof FormData
          ? options.body
          : options.body ? JSON.stringify(options.body) : undefined
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Errore nella richiesta');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((endpoint) => request(endpoint), [request]);

  const post = useCallback((endpoint, body) =>
    request(endpoint, { method: 'POST', body }), [request]);

  const put = useCallback((endpoint, body) =>
    request(endpoint, { method: 'PUT', body }), [request]);

  const del = useCallback((endpoint) =>
    request(endpoint, { method: 'DELETE' }), [request]);

  const upload = useCallback(async (endpoint, file, additionalData = {}) => {
    const formData = new FormData();
    formData.append('file', file);

    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return request(endpoint, { method: 'POST', body: formData });
  }, [request]);

  const uploadMultiple = useCallback(async (endpoint, files, additionalData = {}) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return request(endpoint, { method: 'POST', body: formData });
  }, [request]);

  return {
    loading,
    error,
    get,
    post,
    put,
    del,
    upload,
    uploadMultiple,
    clearError: () => setError(null)
  };
}

export default useApi;
