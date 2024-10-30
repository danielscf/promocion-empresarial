'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const navbarUser = ({ children }) => {

  const [isExpanded, setIsExpanded] = useState(false);


  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">

      <div className={`bg-blue-500 p-5 text-white transition-all duration-300
        ${isExpanded ? 'w-56' : 'w-16'} md:w-56`}
      >

        <div className="flex justify-between items-center mb-4 md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="text-white cursor-pointer"
            onClick={toggleNavbar}
          />
        </div>

        <div className={`flex flex-col mt-4 ${isExpanded ? 'block' : 'hidden'} md:block`}>
          {children}
        </div>
      </div>

    </div>
  )
}

export default navbarUser