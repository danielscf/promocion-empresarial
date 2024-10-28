import React from 'react'
import './styles/login.css'

function LoginPage() {
  return (
    <div
      className="login-page min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${'/images/parque.jpeg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh'
      }}
    >
      <div className="login-box p-10 shadow-lg bg-white rounded-lg">
        <div className="text-center mb-6">
          <img src="/images/escudo.jpg" alt="Logo" className="mb-4 mx-auto w-16" />
          <h3 className="text-red-600 font-bold text-xl">Login</h3>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border text-neutral-950 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-normal-950 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 text-normal-950  rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
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
