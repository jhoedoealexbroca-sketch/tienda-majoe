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
  UsersIcon
} from '@heroicons/react/24/outline'
import AdminAuth from '@/components/admin/AdminAuth'
import ProductManager from '@/components/admin/ProductManager'
import StatsOverview from '@/components/admin/StatsOverview'

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Verificar si ya está autenticado
    const adminAuth = localStorage.getItem('admin_authenticated')
    if (adminAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: ChartBarIcon },
    { id: 'products', name: 'Productos', icon: ShoppingBagIcon },
    { id: 'orders', name: 'Pedidos', icon: UsersIcon },
  ]

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
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
          {activeTab === 'overview' && <StatsOverview />}
          {activeTab === 'products' && <ProductManager />}
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
        </div>
      </div>
    </div>
  )
}

export default AdminPage
