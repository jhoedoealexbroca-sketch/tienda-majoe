'use client'

import { motion } from 'framer-motion'
import ProductGrid from '@/components/ProductGrid'
import { useCategoryProducts } from '@/hooks/useCategoryProducts'

const NewPage = () => {
  const { products: newProducts, loading } = useCategoryProducts({ newProduct: true })

  return (
    <div className="pt-20">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 to-emerald-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Nuevos Productos
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Descubre las últimas incorporaciones a nuestra colección. 
              Tendencias frescas y estilos innovadores que marcarán la diferencia.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {newProducts.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Recién Llegados
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {newProducts.length} productos nuevos esperándote
              </p>
            </motion.div>

            <ProductGrid products={newProducts} />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">✨</span>
            </div>
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              Próximamente
            </h3>
            <p className="text-gray-600 mb-8">
              Estamos preparando nuevos productos increíbles. ¡Vuelve pronto!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default NewPage

