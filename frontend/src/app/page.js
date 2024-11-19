'use client'

import React, { useState } from 'react'
import './styles/login.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {

  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioUsuario: data.usuarioUsuario,
          usuarioContrasena: data.usuarioContrasena
        }),
      });

      if (response.ok) {

        const { token, expiration, usuario } = await response.json();
       // console.log('Token:', token);
        console.log('Expiration Time:', expiration);
        login(token, expiration, usuario);
        
        router.push('/promocion-empresarial/home');
      } else {
        const errorData = await response.json();
        console.log('Error en la respuesta:', errorData);
        setError('Credenciales incorrectas. Intenta nuevamente.');
      }
    } catch (err) {
      console.error('Error de autenticación:', err);
      setError('Hubo un problema con la autenticación. Revisa tu conexión o intenta más tarde.');
    }
  };

  return (
    <div
      className="login-page min-h-screen flex items-center justify-center"
      style={{backgroundImage: `url(${'/images/parque.jpeg'})`,backgroundSize: 'cover',backgroundPosition: 'center',
        width: '100vw',height: '100vh'}}
    >
      <div className="login-box p-10 shadow-lg bg-white rounded-lg">
        <div className="text-center mb-6">
          <img src="/images/escudo.jpg" alt="Logo" className="mb-4 mx-auto w-16" />
          <h3 className="text-red-600 font-bold text-xl">Login</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border text-neutral-950 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ingrese su usuario"
              {...register('usuarioUsuario', { required: 'El nombre de usuario es requerido' })}
            />
            {errors.usuarioUsuario && <p className="text-red-500 text-sm">{errors.usuarioUsuario.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-normal-950 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 text-normal-950 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ingrese su contraseña"
              {...register('usuarioContrasena', { required: 'La contraseña es requerida' })}
            />
            {errors.usuarioContrasena && <p className="text-red-500 text-sm">{errors.usuarioContrasena.message}</p>}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Acceder
            </button>
          </div>
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-red-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
