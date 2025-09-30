'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, SparklesIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import ProductGrid from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

const HomePage = () => {
  const { products, loading, error } = useProducts()

  // Evitar acceder a products si está cargando o hay un error
  const featuredProducts = !loading && !error ? products.filter(product => product.featured) : []
  const newProducts = !loading && !error ? products.filter(product => product.newProduct) : []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const categories = [
    {
      name: 'Hombres',
      href: '/men',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
      description: 'Estilo masculino moderno'
    },
    {
      name: 'Mujeres', 
      href: '/women',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c0763c0e?w=800&h=1000&fit=crop',
      description: 'Elegancia femenina única'
    },
    {
      name: 'Niños',
      href: '/kids-boys',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&h=1000&fit=crop',
      description: 'Aventura y diversión'
    },
    {
      name: 'Niñas',
      href: '/kids-girls',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop',
      description: 'Magia y elegancia'
    }
  ]

  const features = [
    {
      icon: TruckIcon,
      title: 'Envío Gratuito',
      description: 'En pedidos superiores a 50€'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Garantía Premium',
      description: 'Calidad garantizada en todos nuestros productos'
    },
    {
      icon: SparklesIcon,
      title: 'Últimas Tendencias',
      description: 'Siempre a la vanguardia de la moda'
    }
  ]

  return (
    <div className="pt-16 lg:pt-20">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-900/30 via-accent-900/30 to-dark-900/30 z-10" />
        
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-shadow">
              Descubre tu
              <span className="block text-gradient bg-gradient-to-r from-luxury-400 to-accent-400 bg-clip-text text-transparent">
                Estilo Único
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Moda premium que define tu personalidad. Calidad excepcional, 
              diseños únicos y las últimas tendencias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/new" className="btn-primary px-6 py-3 inline-flex items-center space-x-2">
                  <span>Explorar Colección</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/sale" className="btn-secondary px-6 py-3 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                  Ver Ofertas
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-16 h-16 bg-luxury-500/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-12 h-12 bg-accent-500/20 rounded-full blur-xl"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-800 mb-4">
              Explora por Categoría
            </h2>
            <p className="text-lg text-luxury-600 max-w-2xl mx-auto">
              Encuentra el estilo perfecto para cada ocasión
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-4xl font-display font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 mb-6 text-lg">
                      {category.description}
                    </p>
                    
                    <Link
                      href={category.href}
                      className="inline-flex items-center space-x-2 text-white font-semibold group-hover:text-primary-300 transition-colors duration-300"
                    >
                      <span>Comprar Ahora</span>
                      <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nuestra selección especial de productos más populares
            </p>
          </motion.div>

          <ProductGrid products={featuredProducts} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products" className="btn-primary px-6 py-3 inline-flex items-center space-x-2">
              <span>Ver Todos los Productos</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                Nuevos Productos
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Las últimas incorporaciones a nuestra colección
              </p>
            </motion.div>

            <ProductGrid products={newProducts} />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-accent-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              ¿Por qué elegir Majoe?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Comprometidos con la excelencia en cada detalle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="text-primary-100">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

