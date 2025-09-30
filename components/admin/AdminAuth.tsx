'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline'

interface AdminAuthProps {
  onAuthenticated: () => void
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Credenciales de administrador (en producción deberían estar en variables de entorno)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'majoe2024'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('admin_authenticated', 'true')
      onAuthenticated()
    } else {
      setError('Credenciales incorrectas')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-900 to-accent-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-luxury-600 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LockClosedIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold text-dark-800 mb-2">
            Panel de Administración
          </h1>
          <p className="text-luxury-600">
            Acceso exclusivo para administradores
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pr-12"
                placeholder="Ingresa tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-500 hover:text-luxury-700 transition-colors duration-300"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <LockClosedIcon className="h-5 w-5" />
                <span>Iniciar Sesión</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-luxury-50 rounded-lg border border-luxury-200">
          <p className="text-xs text-luxury-600 font-medium mb-2">Credenciales de demostración:</p>
          <div className="text-xs space-y-1">
            <div><strong>Usuario:</strong> admin</div>
            <div><strong>Contraseña:</strong> majoe2024</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminAuth
