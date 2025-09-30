'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  PhotoIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Product } from '@/types'
import { useProducts } from '@/hooks/useProducts'
import ProductForm from './ProductForm'

const ProductManager = () => {
  const { 
    products, 
    loading, 
    error, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    refreshProducts 
  } = useProducts()

  // Todos los hooks deben estar al inicio del componente
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  // Todos los useEffect deben estar al inicio
  useEffect(() => {
    if (error) {
      setNotification({
        type: 'error',
        message: error
      })
    }
  }, [error])

  useEffect(() => {
    // Solo ejecutar una vez al montar el componente
    refreshProducts()
  }, []) // Array vacío para ejecutar solo una vez

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-luxury-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-luxury-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si existe
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={() => refreshProducts()}
            className="px-4 py-2 bg-luxury-500 text-white rounded-lg hover:bg-luxury-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Mostrar notificación
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (productId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const success = await deleteProduct(productId)
      if (success) {
        showNotification('success', 'Producto eliminado correctamente')
      } else {
        showNotification('error', 'Error al eliminar el producto')
      }
    }
  }

  const handleAddNew = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleSaveProduct = async (productData: Omit<Product, 'id'>) => {
    setFormLoading(true)
    try {
      if (editingProduct) {
        // Actualizar producto existente
        const updated = await updateProduct(editingProduct.id, productData)
        if (updated) {
          showNotification('success', 'Producto actualizado correctamente')
          setIsModalOpen(false)
          setEditingProduct(null)
        } else {
          showNotification('error', 'Error al actualizar el producto')
        }
      } else {
        // Crear nuevo producto
        const newProduct = await addProduct(productData)
        if (newProduct) {
          showNotification('success', 'Producto creado correctamente')
          setIsModalOpen(false)
        } else {
          showNotification('error', 'Error al crear el producto')
        }
      }
    } catch (err) {
      showNotification('error', 'Error inesperado')
    } finally {
      setFormLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Sin Stock', color: 'bg-red-100 text-red-800' }
    if (stock < 5) return { text: 'Stock Bajo', color: 'bg-orange-100 text-orange-800' }
    return { text: 'En Stock', color: 'bg-green-100 text-green-800' }
  }

  return (
    <div className="space-y-6">
      
      {/* Notificación */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-lg border flex items-center space-x-3 ${
              notification.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <ExclamationTriangleIcon className="h-5 w-5" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-display font-bold text-dark-800">
            Gestión de Productos
          </h2>
          <p className="text-luxury-600">
            {filteredProducts.length} de {products.length} productos
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddNew}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Agregar Producto</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-luxury-50 rounded-xl p-4 border border-luxury-200">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-luxury-500" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input min-w-[150px]"
          >
            <option value="all">Todas las categorías</option>
            <option value="men">Hombres</option>
            <option value="women">Mujeres</option>
            <option value="kids-boys">Niños</option>
            <option value="kids-girls">Niñas</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-luxury-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-luxury-50 border-b border-luxury-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-dark-800">Producto</th>
                <th className="text-left py-4 px-6 font-medium text-dark-800">Categoría</th>
                <th className="text-left py-4 px-6 font-medium text-dark-800">Precio</th>
                <th className="text-left py-4 px-6 font-medium text-dark-800">Stock</th>
                <th className="text-left py-4 px-6 font-medium text-dark-800">Estado</th>
                <th className="text-right py-4 px-6 font-medium text-dark-800">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-100">
              <AnimatePresence>
                {filteredProducts.map((product, index) => {
                  const stockStatus = getStockStatus(product.stock)
                  const productFeatures = []
                  if (product.newProduct) productFeatures.push('Nuevo')
                  if (product.onSale) productFeatures.push('Oferta')
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-luxury-25 transition-colors duration-200"
                    >
                      {/* Product Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-luxury-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-dark-800 truncate">
                              {product.name}
                            </p>
                            <p className="text-sm text-luxury-600 capitalize">
                              {product.subcategory}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          product.category === 'men' 
                            ? 'bg-blue-100 text-blue-800' 
                            : product.category === 'women'
                            ? 'bg-pink-100 text-pink-800'
                            : product.category === 'kids-boys'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {product.category === 'men' 
                            ? 'Hombres' 
                            : product.category === 'women'
                            ? 'Mujeres'
                            : product.category === 'kids-boys'
                            ? 'Niños'
                            : 'Niñas'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="font-semibold text-luxury-700">
                            {formatPrice(product.price)}
                          </p>
                          {product.originalPrice && (
                            <p className="text-xs text-luxury-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="py-4 px-6">
                        <p className="font-medium text-dark-800">
                          {product.stock} unidades
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                        <div className="flex items-center space-x-1 mt-1">
                          {productFeatures.map((feature, i) => (
                            <span 
                              key={i}
                              className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                feature === 'Nuevo' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.open(`/product/${product.id}`, '_blank')}
                            className="p-2 text-luxury-600 hover:text-luxury-800 hover:bg-luxury-100 rounded-lg transition-colors duration-200"
                            title="Ver producto"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                            title="Editar producto"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors duration-200"
                            title="Eliminar producto"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <PhotoIcon className="h-16 w-16 text-luxury-300 mx-auto mb-4" />
            <h3 className="text-lg font-display font-semibold text-dark-800 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-luxury-600">
              Intenta cambiar los filtros o agregar un nuevo producto
            </p>
          </div>
        )}
      </div>

      {/* Modal para agregar/editar productos */}
      <AnimatePresence>
        {isModalOpen && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCloseModal}
            loading={formLoading}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductManager
