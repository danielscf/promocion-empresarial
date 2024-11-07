import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
  
    useEffect(() => {
     
      const savedToken = localStorage.getItem('token');
    //  const savedUser = JSON.parse(localStorage.getItem('user'));
  
      if (savedToken ) {
        setToken(savedToken);
        //setUser(savedUser);
      }
    }, []);
  
    const login = (token) => {
      setToken(token);
    //  setUser(userData);
      localStorage.setItem('token', token);
      //localStorage.setItem('user', JSON.stringify(userData));
    };
  
    const logout = () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    };
  
    return (
      <AuthContext.Provider value={{ token, login }}>
        {children}
      </AuthContext.Provider>
    );
  };
