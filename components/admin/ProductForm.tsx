'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  XMarkIcon, 
  PlusIcon, 
  TrashIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline'
import { Product, Size, Color } from '@/types'
import ImageUpload from './ImageUpload'

interface ProductFormProps {
  product?: Product | null
  onSave: (product: Omit<Product, 'id'>) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

const ProductForm = ({ product, onSave, onCancel, loading = false }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    category: 'men' as 'men' | 'women' | 'kids-boys' | 'kids-girls',
    subcategory: '',
    stock: '',
    featured: false,
    isNew: false,
    onSale: false
  })

  const [images, setImages] = useState<string[]>([''])
  const [sizes, setSizes] = useState<Size[]>([
    { name: 'S', value: 's', available: true },
    { name: 'M', value: 'm', available: true },
    { name: 'L', value: 'l', available: true }
  ])
  const [colors, setColors] = useState<Color[]>([
    { name: 'Negro', value: '#000000', available: true },
    { name: 'Blanco', value: '#FFFFFF', available: true }
  ])

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        description: product.description,
        category: product.category,
        subcategory: product.subcategory,
        stock: product.stock.toString(),
        featured: product.featured || false,
        isNew: product.isNew || false,
        onSale: product.onSale || false
      })
      setImages(product.images.length > 0 ? product.images : [''])
      setSizes(product.sizes)
      setColors(product.colors)
    }
  }, [product])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }


  const handleSizeChange = (index: number, field: keyof Size, value: string | boolean) => {
    const newSizes = [...sizes]
    newSizes[index] = { ...newSizes[index], [field]: value }
    setSizes(newSizes)
  }

  const addSize = () => {
    setSizes([...sizes, { name: '', value: '', available: true }])
  }

  const removeSize = (index: number) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter((_, i) => i !== index))
    }
  }

  const handleColorChange = (index: number, field: keyof Color, value: string | boolean) => {
    const newColors = [...colors]
    newColors[index] = { ...newColors[index], [field]: value }
    setColors(newColors)
  }

  const addColor = () => {
    setColors([...colors, { name: '', value: '#000000', available: true }])
  }

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      setColors(colors.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const productData: Omit<Product, 'id'> = {
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory,
      images: images.filter(img => img.trim() !== ''),
      sizes: sizes.filter(size => size.name && size.value),
      colors: colors.filter(color => color.name && color.value),
      stock: parseInt(formData.stock),
      featured: formData.featured,
      isNew: formData.isNew,
      onSale: formData.onSale
    }

    await onSave(productData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-luxury-200 pb-4">
            <h2 className="text-2xl font-display font-bold text-dark-800">
              {product ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-dark-800">Información Básica</h3>
              
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  required
                  placeholder="Ej: Camiseta Premium Básica"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Precio (S/) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input"
                    required
                    min="0"
                    step="0.01"
                    placeholder="89.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Precio Original (S/)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    className="input"
                    min="0"
                    step="0.01"
                    placeholder="119.99"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="input"
                  required
                  placeholder="Describe las características del producto..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input"
                    required
                  >
                    <option value="men">Hombres</option>
                    <option value="women">Mujeres</option>
                    <option value="kids-boys">Niños</option>
                    <option value="kids-girls">Niñas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Subcategoría *
                  </label>
                  <input
                    type="text"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    className="input"
                    required
                    placeholder="Ej: camisetas, pantalones, vestidos"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="input"
                  required
                  min="0"
                  placeholder="25"
                />
              </div>

              {/* Opciones */}
              <div className="space-y-3">
                <h4 className="font-medium text-dark-800">Opciones</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="rounded border-luxury-300 text-luxury-600 focus:ring-luxury-500"
                    />
                    <span className="text-sm text-dark-700">Producto Destacado</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleInputChange}
                      className="rounded border-luxury-300 text-luxury-600 focus:ring-luxury-500"
                    />
                    <span className="text-sm text-dark-700">Producto Nuevo</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="onSale"
                      checked={formData.onSale}
                      onChange={handleInputChange}
                      className="rounded border-luxury-300 text-luxury-600 focus:ring-luxury-500"
                    />
                    <span className="text-sm text-dark-700">En Oferta</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Imágenes, Tallas y Colores */}
            <div className="space-y-4">
              
              {/* Imágenes */}
              <div>
                <h3 className="text-lg font-semibold text-dark-800 mb-4">Imágenes del Producto</h3>
                <ImageUpload
                  images={images}
                  onImagesChange={setImages}
                  maxImages={5}
                />
              </div>

              {/* Tallas */}
              <div>
                <h4 className="font-semibold text-dark-800 mb-3">Tallas Disponibles</h4>
                <div className="space-y-2">
                  {sizes.map((size, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={size.name}
                        onChange={(e) => handleSizeChange(index, 'name', e.target.value)}
                        className="input flex-1"
                        placeholder="Nombre (S, M, L)"
                      />
                      <input
                        type="text"
                        value={size.value}
                        onChange={(e) => handleSizeChange(index, 'value', e.target.value)}
                        className="input flex-1"
                        placeholder="Valor (s, m, l)"
                      />
                      <label className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={size.available}
                          onChange={(e) => handleSizeChange(index, 'available', e.target.checked)}
                          className="rounded border-luxury-300 text-luxury-600 focus:ring-luxury-500"
                        />
                        <span className="text-xs text-dark-700">Disponible</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="p-1 text-red-500 hover:text-red-700"
                        disabled={sizes.length === 1}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSize}
                    className="flex items-center space-x-2 text-luxury-600 hover:text-luxury-700 font-medium text-sm"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Agregar Talla</span>
                  </button>
                </div>
              </div>

              {/* Colores */}
              <div>
                <h4 className="font-semibold text-dark-800 mb-3">Colores Disponibles</h4>
                <div className="space-y-2">
                  {colors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={color.name}
                        onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                        className="input flex-1"
                        placeholder="Nombre del color"
                      />
                      <input
                        type="color"
                        value={color.value}
                        onChange={(e) => handleColorChange(index, 'value', e.target.value)}
                        className="w-12 h-10 rounded border border-luxury-300"
                      />
                      <label className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={color.available}
                          onChange={(e) => handleColorChange(index, 'available', e.target.checked)}
                          className="rounded border-luxury-300 text-luxury-600 focus:ring-luxury-500"
                        />
                        <span className="text-xs text-dark-700">Disponible</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="p-1 text-red-500 hover:text-red-700"
                        disabled={colors.length === 1}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addColor}
                    className="flex items-center space-x-2 text-luxury-600 hover:text-luxury-700 font-medium text-sm"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Agregar Color</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-luxury-200">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <CloudArrowUpIcon className="h-5 w-5" />
                  <span>{product ? 'Actualizar Producto' : 'Crear Producto'}</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default ProductForm
