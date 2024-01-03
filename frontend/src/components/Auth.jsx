import { useState, useEffect } from 'react';

export const UseAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    const storedAuthToken = localStorage.getItem('authToken');
    setAuthToken(storedAuthToken);
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  return { authToken, login, logout };
};