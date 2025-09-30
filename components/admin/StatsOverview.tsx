'use client'

import { motion } from 'framer-motion'
import { 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  UsersIcon, 
  ChartBarIcon,
  EyeIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { useProducts } from '@/hooks/useProducts'

const StatsOverview = () => {
  const { products } = useProducts()
  
  // Calcular estadísticas
  const totalProducts = products.length
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0)
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0)
  const outOfStock = products.filter(product => product.stock === 0).length
  const lowStock = products.filter(product => product.stock > 0 && product.stock < 5).length

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const stats = [
    {
      name: 'Total Productos',
      value: totalProducts.toString(),
      icon: ShoppingBagIcon,
      color: 'from-luxury-500 to-luxury-600',
      bgColor: 'bg-luxury-50',
      textColor: 'text-luxury-700'
    },
    {
      name: 'Valor Inventario',
      value: formatPrice(totalValue),
      icon: CurrencyDollarIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      name: 'Stock Total',
      value: totalStock.toString(),
      icon: ChartBarIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'Sin Stock',
      value: outOfStock.toString(),
      icon: EyeIcon,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ]

  const recentProducts = products
    .filter(product => product.isNew)
    .slice(0, 5)

  const lowStockProducts = products
    .filter(product => product.stock > 0 && product.stock < 5)
    .slice(0, 5)

  return (
    <div className="space-y-8">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-2xl p-6 border border-opacity-20`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className={`text-2xl font-bold ${stat.textColor} font-display`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-luxury-50 rounded-2xl p-6 border border-luxury-200"
        >
          <h3 className="text-lg font-display font-semibold text-dark-800 mb-4">
            Productos Nuevos
          </h3>
          
          <div className="space-y-4">
            {recentProducts.length > 0 ? recentProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-luxury-100">
                <div className="w-12 h-12 bg-luxury-100 rounded-lg flex items-center justify-center">
                  <ShoppingBagIcon className="h-6 w-6 text-luxury-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark-800 truncate">{product.name}</p>
                  <p className="text-sm text-luxury-600">{formatPrice(product.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-luxury-700">Stock: {product.stock}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Nuevo
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-luxury-600 text-center py-4">No hay productos nuevos</p>
            )}
          </div>
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-50 rounded-2xl p-6 border border-red-200"
        >
          <h3 className="text-lg font-display font-semibold text-dark-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            Stock Bajo (Menos de 5)
          </h3>
          
          <div className="space-y-4">
            {lowStockProducts.length > 0 ? lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-red-100">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <ShoppingBagIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark-800 truncate">{product.name}</p>
                  <p className="text-sm text-red-600">{formatPrice(product.price)}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock === 0 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-green-600 text-center py-4">✓ Todos los productos tienen stock suficiente</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-luxury-100 to-accent-100 rounded-2xl p-6 border border-luxury-200"
      >
        <h3 className="text-lg font-display font-semibold text-dark-800 mb-4">
          Acciones Rápidas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary text-sm">
            + Agregar Producto
          </button>
          <button className="btn-secondary text-sm">
            📊 Exportar Inventario
          </button>
          <button className="btn-secondary text-sm">
            🔄 Actualizar Stock
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default StatsOverview
