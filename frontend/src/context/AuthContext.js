import React, { createContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
export const AuthContext = createContext();
import { alertPersonalizado } from '@/app/utils/messages';


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter()


  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('tokenExpiration');
    Cookies.remove('usuario');
    router.push('/');
  }, [router]);

  useEffect(() => {

    const savedToken = Cookies.get('token');
    const tokenExpiration = Cookies.get('tokenExpiration');
    const savedUser = Cookies.get('usuario');

    if (savedToken && tokenExpiration) {
      const expirationDate = new Date(Number(tokenExpiration));
      //console.log('expirationDate:', expirationDate);  

      if (expirationDate > new Date()) {
        setToken(savedToken);
        if (savedUser) {
          setUser(JSON.parse(savedUser)); 
        }
      } else { 
        alertPersonalizado('Sesión expirada','Tu sesión ha expirado, por favor inicia sesión nuevamente.')
        logout();
      }
    }

  }, [logout]);


  const login = (token, expiration, usuario) => {
    setToken(token);
    setUser(usuario);
    Cookies.set('token', token, { expires: 1 });
    Cookies.set('tokenExpiration', expiration, { expires: 1 });
    Cookies.set('usuario', JSON.stringify(usuario), { expires: 1 });
    //console.log("Token guardado en cookies:", token);
  };
  const updateUserInContext = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user, updateUserInContext }}>
      {children}
    </AuthContext.Provider>
  );
};
