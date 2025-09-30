'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  columns?: 5
}

const ProductGrid = ({ products, columns = 5 }: ProductGridProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getGridCols = () => {
    return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
  }

  return (
    <div className={`grid ${getGridCols()} gap-6 lg:gap-8`}>
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="card overflow-hidden">
            
            {/* Product Image */}
            <Link href={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-luxury-50 block">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {product.newProduct && (
                  <span className="badge-new">
                    Nuevo
                  </span>
                )}
                {product.onSale && (
                  <span className="badge-sale">
                    Oferta
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(product.id)}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-300 shadow-lg"
                >
                  {favorites.has(product.id) ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors duration-300 shadow-lg"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>

              {/* Stock Status */}
              {product.stock < 5 && product.stock > 0 && (
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full border border-orange-200">
                    ¡Últimas {product.stock} unidades!
                  </span>
                </div>
              )}

              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg">
                    Agotado
                  </span>
                </div>
              )}
            </Link>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-1">
                <span className="text-xs text-luxury-500 uppercase tracking-wider font-medium">
                  {product.subcategory}
                </span>
              </div>
              
              <h3 className="font-display font-medium text-sm text-dark-800 mb-2 group-hover:text-luxury-600 transition-colors duration-300 line-clamp-2 leading-tight">
                <Link href={`/product/${product.id}`} className="hover:underline">
                  {product.name}
                </Link>
              </h3>

              {/* Price */}
              <div className="flex items-center space-x-1.5 mb-2">
                <span className="text-base font-bold text-luxury-600 font-display">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-luxury-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Colors */}
              <div className="flex items-center space-x-1.5 mb-2">
                <span className="text-xs text-luxury-500 font-medium">Colores:</span>
                <div className="flex space-x-1">
                  {product.colors.slice(0, 2).map((color) => (
                    <div
                      key={color.name}
                      className={`w-3 h-3 rounded-full border border-luxury-200 ${
                        !color.available ? 'opacity-50' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                  {product.colors.length > 2 && (
                    <div className="w-3 h-3 rounded-full border border-luxury-200 bg-luxury-100 flex items-center justify-center">
                      <span className="text-xs text-luxury-600 font-medium">+{product.colors.length - 2}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sizes */}
              <div className="flex items-center space-x-1.5">
                <span className="text-xs text-luxury-500 font-medium">Tallas:</span>
                <div className="flex space-x-0.5">
                  {product.sizes.slice(0, 2).map((size) => (
                    <span
                      key={size.name}
                      className={`px-1 py-0.5 text-xs border rounded font-medium ${
                        size.available 
                          ? 'border-luxury-200 text-luxury-700 bg-luxury-50' 
                          : 'border-luxury-100 text-luxury-400 line-through'
                      }`}
                    >
                      {size.name}
                    </span>
                  ))}
                  {product.sizes.length > 2 && (
                    <span className="px-1 py-0.5 text-xs border border-luxury-200 text-luxury-700 bg-luxury-50 rounded font-medium">
                      +{product.sizes.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Add to Cart Button - Visible on Hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/product/${product.id}`}
                  className="w-full btn-primary text-center block text-sm"
                >
                  Ver Detalles
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ProductGrid

