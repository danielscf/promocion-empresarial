import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {

    const savedToken = Cookies.get('token');
    //  const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedToken) {
      setToken(savedToken);
      //setUser(savedUser);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    //  setUser(userData);
    Cookies.set('token', token, { expires: 1 });
    //localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
   // setUser(null);
    Cookies.remove('token');
    //localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
