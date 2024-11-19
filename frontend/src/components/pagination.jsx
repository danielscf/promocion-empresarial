import React from 'react';

const Pagination = ({ currentPage, totalPages, handleNextPage, handlePreviousPage }) => {
    return (
        <div className="flex items-center justify-center gap-4 mt-6">
            <button 
                onClick={handlePreviousPage} 
                disabled={currentPage === 1} 
                className={`text-white bg-blue-800 p-2 rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            >
               <p>Previous</p>
            </button>
            <span className="text-blue-800 font-semibold">{currentPage} / {totalPages}</span>
            <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages} 
                className={`text-white bg-blue-800 p-2 rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
            >
                <p>Next</p>
            </button>
        </div>
    );
}

export default Pagination;

