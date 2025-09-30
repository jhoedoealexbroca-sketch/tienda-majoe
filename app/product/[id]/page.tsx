'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { 
  HeartIcon, 
  StarIcon, 
  ShoppingBagIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import ProductGrid from '@/components/ProductGrid'
// import { getProductById, getProducts } from '@/lib/hybridStorage'
import { Product } from '@/types'

const ProductDetailPage = () => {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const { addItem } = useCartStore()

  // Cargar producto y productos relacionados
  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Cargar producto específico
        const productResponse = await fetch(`/api/products/${productId}`)
        if (!productResponse.ok) {
          throw new Error('Producto no encontrado')
        }
        const foundProduct = await productResponse.json()
        setProduct(foundProduct)
        
        if (foundProduct) {
          // Cargar todos los productos para obtener relacionados
          const allProductsResponse = await fetch('/api/products')
          if (allProductsResponse.ok) {
            const allProducts = await allProductsResponse.json()
            const related = allProducts
              .filter((p: Product) => p.id !== productId && p.category === foundProduct.category)
              .slice(0, 4)
            setRelatedProducts(related)
          }
        }
      } catch (error) {
        console.error('Error loading product:', error)
        setError(error instanceof Error ? error.message : 'Error al cargar el producto')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadProduct()
  }, [productId])

  useEffect(() => {
    if (product) {
      // Set default selections
      const availableSize = product.sizes.find(size => size.available)
      const availableColor = product.colors.find(color => color.available)
      
      if (availableSize) setSelectedSize(availableSize.value)
      if (availableColor) setSelectedColor(availableColor.value)
    }
  }, [product])

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-4">
            {error || 'Producto no encontrado'}
          </h1>
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
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

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor selecciona talla y color')
      return
    }
    
    addItem(product, selectedSize, selectedColor, quantity)
    // Show success message or animation
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const selectedColorInfo = product.colors.find(color => color.value === selectedColor)
  const selectedSizeInfo = product.sizes.find(size => size.value === selectedSize)

  return (
    <div className="pt-20">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary-600 transition-colors duration-300">
            Inicio
          </Link>
          <span>/</span>
          <Link 
            href={`/${product.category}`} 
            className="hover:text-primary-600 transition-colors duration-300 capitalize"
          >
            {product.category === 'men' ? 'Hombres' : 'Mujeres'}
          </Link>
          <span>/</span>
          <span className="text-gray-900 capitalize">{product.subcategory}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Images */}
          <div className="space-y-6">
            
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col space-y-2">
                {product.newProduct && (
                  <span className="badge-new">Nuevo</span>
                )}
                {product.onSale && (
                  <span className="badge-sale">Oferta</span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'border-primary-500 ring-2 ring-primary-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.subcategory}
                </span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                  >
                    {isFavorite ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300">
                    <ShareIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid 
                      key={i} 
                      className="h-5 w-5 text-yellow-400" 
                    />
                  ))}
                </div>
                <span className="text-gray-600">(127 reseñas)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.onSale && product.originalPrice && (
                  <span className="badge-sale">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Descripción
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Color: {selectedColorInfo?.name}
                </h3>
              </div>
              
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color.value)}
                    disabled={!color.available}
                    className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                      selectedColor === color.value
                        ? 'border-primary-500 ring-2 ring-primary-200'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${
                      !color.available ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {!color.available && (
                      <div className="w-full h-full rounded-full bg-white/80 flex items-center justify-center">
                        <span className="text-xs text-gray-500">✕</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Talla: {selectedSizeInfo?.name}
                </h3>
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-primary-600 hover:text-primary-700 underline"
                >
                  Guía de tallas
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => size.available && setSelectedSize(size.value)}
                    disabled={!size.available}
                    className={`py-3 px-4 border rounded-xl font-medium transition-all duration-300 ${
                      selectedSize === size.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    } ${
                      !size.available 
                        ? 'opacity-50 cursor-not-allowed line-through' 
                        : ''
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cantidad
              </h3>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <span className="text-xl">−</span>
                  </button>
                  <span className="px-4 py-3 font-semibold min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
                
                <span className="text-gray-500">
                  Stock disponible: {product.stock}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                <span>
                  {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-secondary text-lg py-4"
              >
                Comprar Ahora
              </motion.button>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-gray-600">
                <TruckIcon className="h-5 w-5 text-primary-600" />
                <span>Envío gratuito en pedidos superiores a 50€</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <ShieldCheckIcon className="h-5 w-5 text-primary-600" />
                <span>Garantía de calidad premium</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <CheckIcon className="h-5 w-5 text-primary-600" />
                <span>Devoluciones gratuitas en 30 días</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
              Productos Relacionados
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage

