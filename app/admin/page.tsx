'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  PhotoIcon,
  EyeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import AdminAuth from '@/components/admin/AdminAuth'
import ProductManager from '@/components/admin/ProductManager'
import StatsOverview from '@/components/admin/StatsOverview'
import DataManager from '@/components/admin/DataManager'
import ErrorBoundary from '@/components/admin/ErrorBoundary'

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    console.log('AdminPage: Iniciando verificación de autenticación')
    
    const checkAuth = () => {
      try {
        // Verificar que estamos en el navegador antes de usar localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
          const adminAuth = localStorage.getItem('admin_authenticated')
          console.log('AdminPage: Estado de autenticación:', adminAuth)
          setIsAuthenticated(adminAuth === 'true')
        } else {
          console.warn('AdminPage: localStorage no disponible')
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('AdminPage: Error al verificar autenticación:', error)
        setIsAuthenticated(false)
      } finally {
        console.log('AdminPage: Finalizada verificación de autenticación')
        setIsLoading(false)
      }
    }

    // Pequeño delay para asegurar que el componente esté montado
    const timer = setTimeout(checkAuth, 100)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: ChartBarIcon },
    { id: 'products', name: 'Productos', icon: ShoppingBagIcon },
    { id: 'data', name: 'Datos', icon: DocumentArrowDownIcon },
    { id: 'orders', name: 'Pedidos', icon: UsersIcon },
  ]

  const handleLogout = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('admin_authenticated')
      }
      setIsAuthenticated(false)
      setActiveTab('overview')
      console.log('Sesión cerrada correctamente')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      // Forzar logout incluso si hay error con localStorage
      setIsAuthenticated(false)
      setActiveTab('overview')
    }
  }

  return (
    <div className="min-h-screen bg-luxury-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-luxury-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-luxury-600 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-display">M</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-dark-800">
                  Panel de Administración
                </h1>
                <p className="text-sm text-luxury-600">Majoe Store</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="btn-secondary text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-luxury-100 text-luxury-700 border border-luxury-200'
                    : 'text-luxury-600 hover:text-luxury-700 hover:bg-luxury-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-luxury-100 p-6">
          <ErrorBoundary>
            {activeTab === 'overview' && <StatsOverview />}
            {activeTab === 'products' && <ProductManager />}
            {activeTab === 'data' && <DataManager />}
            {activeTab === 'orders' && (
              <div className="text-center py-12">
                <ShoppingBagIcon className="h-16 w-16 text-luxury-300 mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-dark-800 mb-2">
                  Gestión de Pedidos
                </h3>
                <p className="text-luxury-600">
                  Próximamente: Sistema de gestión de pedidos y clientes
                </p>
              </div>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
