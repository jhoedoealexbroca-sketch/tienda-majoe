'use client'

import { motion } from 'framer-motion'
import ProductGrid from '@/components/ProductGrid'
import { useCategoryProducts } from '@/hooks/useCategoryProducts'

const SalePage = () => {
  const { products: saleProducts, loading } = useCategoryProducts({ onSale: true })

  return (
    <div className="pt-20">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-900 to-pink-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Ofertas Especiales
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Aprovecha nuestras ofertas exclusivas. Productos de calidad premium 
              a precios increíbles por tiempo limitado.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {saleProducts.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Productos en Oferta
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {saleProducts.length} productos con descuentos especiales
              </p>
            </motion.div>

            <ProductGrid products={saleProducts} />

            {/* Sale Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 lg:p-12 text-white text-center"
            >
              <h3 className="text-3xl font-display font-bold mb-4">
                🔥 ¡Ofertas por Tiempo Limitado!
              </h3>
              <p className="text-xl mb-6 text-red-100">
                No dejes pasar estas oportunidades únicas. Descuentos de hasta el 40% en productos seleccionados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">48</div>
                  <div className="text-sm text-red-200">Horas</div>
                </div>
                <div className="text-2xl">:</div>
                <div className="text-center">
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-red-200">Minutos</div>
                </div>
                <div className="text-2xl">:</div>
                <div className="text-center">
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-red-200">Segundos</div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🏷️</span>
            </div>
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              No hay ofertas activas
            </h3>
            <p className="text-gray-600 mb-8">
              Suscríbete a nuestro newsletter para ser el primero en conocer nuestras ofertas especiales.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SalePage

