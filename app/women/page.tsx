'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FunnelIcon } from '@heroicons/react/24/outline'
import ProductGrid from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

const WomenPage = () => {
  const { products } = useProducts()
  const [sortBy, setSortBy] = useState('featured')
  const [filterBy, setFilterBy] = useState('all')
  
  // Filter products for women
  const womenProducts = products.filter(product => product.category === 'women')
  
  // Get unique subcategories
  const subcategories = Array.from(new Set(womenProducts.map(p => p.subcategory)))
  
  // Apply filters
  let filteredProducts = womenProducts
  
  if (filterBy !== 'all') {
    filteredProducts = womenProducts.filter(product => product.subcategory === filterBy)
  }
  
  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'newest':
        return b.isNew ? 1 : -1
      default:
        return b.featured ? 1 : -1
    }
  })

  const sortOptions = [
    { value: 'featured', label: 'Destacados' },
    { value: 'newest', label: 'Más Nuevos' },
    { value: 'price-low', label: 'Precio: Menor a Mayor' },
    { value: 'price-high', label: 'Precio: Mayor a Menor' },
    { value: 'name', label: 'Nombre A-Z' },
  ]

  return (
    <div className="pt-20">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-accent-900 to-pink-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Moda para Mujeres
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Explora nuestra colección femenina llena de elegancia, estilo y sofisticación. 
              Desde looks casuales hasta vestidos de gala, encuentra tu outfit perfecto.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          
          {/* Left side - Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-600" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="input py-2 pr-8 text-sm min-w-[150px]"
              >
                <option value="all">Todas las categorías</option>
                {subcategories.map(category => (
                  <option key={category} value={category} className="capitalize">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input py-2 pr-8 text-sm min-w-[180px]"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

            {/* Right side - Results Count */}
            <div className="flex items-center justify-end">
              <span className="text-accent-600 text-sm font-medium">
                {sortedProducts.length} productos encontrados
              </span>
            </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <ProductGrid products={sortedProducts} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">👗</span>
            </div>
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              No hay productos disponibles
            </h3>
            <p className="text-gray-600 mb-8">
              No encontramos productos que coincidan con tus filtros actuales.
            </p>
            <button
              onClick={() => {
                setFilterBy('all')
                setSortBy('featured')
              }}
              className="btn-primary"
            >
              Limpiar Filtros
            </button>
          </motion.div>
        )}

        {/* Category Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-pink-50 to-accent-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
              Elegancia Femenina Sin Límites
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              En Majoe, celebramos la feminidad en todas sus formas. Nuestra colección para mujeres 
              está diseñada para empoderar, inspirar y realzar tu belleza natural. Cada pieza cuenta 
              una historia de elegancia, confianza y estilo único que te acompañará en cada momento especial.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-accent-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">👗</span>
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">
                  Diseños Únicos
                </h3>
                <p className="text-gray-600 text-sm">
                  Piezas exclusivas que destacan tu personalidad
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-accent-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">
                  Elegancia Atemporal
                </h3>
                <p className="text-gray-600 text-sm">
                  Estilos que trascienden las tendencias
                </p>
              </div>
              
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-accent-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">
                  Comodidad Premium
                </h3>
                <p className="text-gray-600 text-sm">
                  Telas suaves y cortes favorecedores
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WomenPage

