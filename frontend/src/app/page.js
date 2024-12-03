'use client'

import React, { useState } from 'react'
import './styles/login.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Image from 'next/image';
import axios from 'axios';

function LoginPage() {

  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setError('');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          usuarioUsuario: data.usuarioUsuario,
          usuarioContrasena: data.usuarioContrasena,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const { token, expiration, usuario } = response.data;
        console.log('Expiration Time:', expiration);
        login(token, expiration, usuario);
        router.push('/promocion-empresarial/home');
      } else {
        console.log('Error en la respuesta:', response.data);
        setError('Credenciales incorrectas. Intenta nuevamente.');
      }
    } catch (err) {
      if (err.response) {
        console.error('Error en la respuesta del servidor:', err.response.data);
        setError(err.response.data.message || 'Credenciales incorrectas. Intenta nuevamente.');
      } else if (err.request) {
        console.error('No se recibió respuesta del servidor:', err.request);
        setError('No se pudo conectar con el servidor. Intenta más tarde.');
      } else {
        console.error('Error al configurar la solicitud:', err.message);
        setError('Ocurrió un problema inesperado. Intenta nuevamente.');
      }
    }

  };

  return (
    <div
      className="login-page min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${'/images/parque.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center',
        width: '100vw', height: '100vh'
      }}
    >
      <div className="login-box p-10 shadow-lg bg-white rounded-lg">
        <div className="text-center mb-6">
          <Image src="/images/escudo.jpg" priority={true} quality={80} alt="Logo" className="mb-4 mx-auto" width={64} height={64} />
          <h3 className="text-red-600 font-bold text-xl">Login</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
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
