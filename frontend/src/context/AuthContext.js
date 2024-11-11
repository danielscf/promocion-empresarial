import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
 
  const router = useRouter()

  useEffect(() => {

    const savedToken = Cookies.get('token');
    const tokenExpiration = Cookies.get('tokenExpiration'); 

    if (savedToken && tokenExpiration) {
      const expirationDate = new Date(Number(tokenExpiration));  
      //console.log('expirationDate:', expirationDate);  
  
      if (expirationDate > new Date()) {    
        setToken(savedToken);
      } else {      
        alert('Tu sesión ha expirado, por favor inicia sesión nuevamente.');
        logout();
      }
    } 

  }, []);
 

  const login = (token, expiration, usuario) => {
    setToken(token);
    setUser(usuario);
    Cookies.set('token', token, { expires: 1 });
    Cookies.set('tokenExpiration', expiration, { expires: 1 });
    Cookies.set('usuario', expiration, { expires: 1 });
    //console.log("Token guardado en cookies:", token);
  };

  const logout = () => {
    setToken(null);
    Cookies.remove('token');
    Cookies.remove('tokenExpiration');
    Cookies.remove('usuario');
    router.push('/');  
  };
  const updateUserInContext = (updatedUser) => {
    setUser(updatedUser); 
};

  return (
    <AuthContext.Provider value={{ token, login,logout,user,updateUserInContext }}>
      {children}
    </AuthContext.Provider>
  );
};
