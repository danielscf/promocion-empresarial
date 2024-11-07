'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, title, children,handleClose }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">                 
                        <button
                            onClick={handleClose} 
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-bold mb-4">{title}</h2>
                        {children}
                    </div>
                </div>
            )}

        </>
    );
};

export default Modal;
