'use client';

import { useState } from 'react';
import Link from 'next/link'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const navigation = [
  { name: 'Inicio', href: '/promocion-empresarial/home' },
  { name: 'Mis Datos', href: '/promocion-empresarial/mis-datos/datos-personales' },
  { name: 'Usuarios', href: '/promocion-empresarial/usuarios' },
  { name: 'Emprendedor', href: '/promocion-empresarial/emprendedor/datos-emprendedor' },
  { name: 'Emprendedores', href: '/promocion-empresarial/emprendedores' },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Inicio');
  const { logout, user } = useContext(AuthContext)
  const handleLinkClick = (name) => {
    setActiveLink(name);
  };

  const filteredNavigation = user?.roles?.[0]?.rolNombre
    ? navigation.filter(item => {
        if (user.roles[0].rolNombre === 'Administrador' || 'Operador') {
          return item.name !== 'Emprendedor';
        } else if (user.roles[0].rolNombre === 'Emprendedor') {
          return item.name === 'Inicio' || item.name === 'Emprendedor';
        }
        return false;
      })
    : [];

  return (
    <Disclosure as="nav" className="bg-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Escudo"
                src="/images/escudo.jpg"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleLinkClick(item.name)}
                    className={classNames(
                      activeLink === item.name
                        ? 'bg-blue-700 text-white'
                        : 'text-gray-200 hover:bg-blue-600 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <Menu as="div" className="relative ml-3">

              <MenuButton className="relative flex items-center rounded-full bg-blue-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <p className='text-white p-2 mr-1'>{user ? user.usuarioUsuario : 'Cargando...'}</p>
                <FontAwesomeIcon icon={faChevronDown} className="text-white mr-2" />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                <MenuItem>
                  {({ active }) => (
                    <a onClick={() => logout()} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                      Cerrar sesion
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {filteredNavigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              onClick={() => handleLinkClick(item.name)}
              className={classNames(
                activeLink === item.name
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-200 hover:bg-blue-600 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};


export default Navbar
