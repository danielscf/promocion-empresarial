'use client';

import React from 'react';

const Modal = ({ isOpen, title, children, onClose }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{title}</h2>
                        {children}                       
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
