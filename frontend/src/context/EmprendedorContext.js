import React, { createContext, useContext, useState, useEffect } from 'react';

const EmprendedorContext = createContext();

export const EmprendedorProvider = ({ children }) => {
   
    const [emprendedorId, setEmprendedorId] = useState(() => {
        if (typeof window !== "undefined") {  
            return localStorage.getItem('emprendedorId') || null;
        }
        return null;
    });

    useEffect(() => {
        if (emprendedorId !== null && typeof window !== "undefined") {
            localStorage.setItem('emprendedorId', emprendedorId);
        }
    }, [emprendedorId]);

    return (
        <EmprendedorContext.Provider value={{ emprendedorId, setEmprendedorId }}>
            {children}
        </EmprendedorContext.Provider>
    );
};

export const useEmprendedor = () => useContext(EmprendedorContext);
