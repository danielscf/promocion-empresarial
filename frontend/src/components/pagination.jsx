import React from 'react';

const Pagination = ({ currentPage, totalPages, handleNextPage, handlePreviousPage, onPageChange}) => {
    return (
        <div className="flex items-center justify-center gap-2 my-4">

            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-md text-white ${
                    currentPage === 1
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                Previous
            </button>

            <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === currentPage;
                    return (
                        <button
                            key={index}
                            onClick={() => onPageChange(pageNumber)}
                            className={`px-3 py-1 border rounded-md ${
                                isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-blue-600 hover:bg-blue-100'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-md text-white ${
                    currentPage === totalPages
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
