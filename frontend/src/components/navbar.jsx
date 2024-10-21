'use client';

import { useState } from 'react';

const navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
      // Add your logout logic here (e.g., clearing tokens, redirecting to login page)
      console.log("Logging out...");
    };
    return (
        <nav className="bg-[#c2cece] border-b-2 border-[#0a79bc]"> {/* Background color */}
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-between">
              <div className="hidden sm:block">
                <div className="flex space-x-4">
                  <a href="#" className="rounded-md bg-[#b3c4c4] px-3 py-2 text-sm font-medium text-[#3d3d3d]" aria-current="page">Inicio</a>
                  <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-[#3d3d3d] hover:bg-[#a0b3b3] hover:text-white">Mis datos</a>
                  <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-[#3d3d3d] hover:bg-[#a0b3b3] hover:text-white">Usuarios</a>
                  <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-[#3d3d3d] hover:bg-[#a0b3b3] hover:text-white">Eventos</a>
                </div>
              </div>
            </div>
  
            {/* User dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex rounded-md bg-[#0a79bc] text-sm p-[10px] text-white focus:outline-none"
                  id="user-menu-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="mr-2">Username</span> {/* Replace with dynamic username */}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
  
              {dropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
  
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="#" className="block rounded-md bg-[#b3c4c4] px-3 py-2 text-base font-medium text-[#3d3d3d]" aria-current="page">Dashboard</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-[#3d3d3d] hover:bg-[#a0b3b3] hover:text-white">Team</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-[#3d3d3d] hover:bg-[#a0b3b3] hover:text-white">Projects</a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-[#3d3d3d] hover:bg-[#a0b3b3] hover:text-white">Calendar</a>
          </div>
        </div>
      </nav>
    )
}

export default navbar
