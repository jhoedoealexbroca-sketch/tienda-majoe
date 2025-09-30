'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeftIcon, HeartIcon, SparklesIcon, UsersIcon } from '@heroicons/react/24/outline'

const AboutPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Volver al inicio</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Sobre MAJOE
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más que una marca de ropa, somos una comunidad que celebra la individualidad, 
              la calidad y el estilo auténtico.
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  Nuestra Historia
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-4">
                    MAJOE nació en 2024 con una visión clara: crear ropa que no solo se vea bien, 
                    sino que también se sienta bien y represente los valores de quienes la usan.
                  </p>
                  <p className="mb-4">
                    Comenzamos como un pequeño proyecto familiar en Lima, Perú, con el sueño de 
                    ofrecer prendas de calidad premium a precios justos, sin comprometer nuestros 
                    principios de sostenibilidad y comercio ético.
                  </p>
                  <p>
                    Hoy, MAJOE es reconocida por su compromiso con la excelencia, la innovación 
                    en diseño y el respeto por nuestro planeta y comunidad.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                  alt="Nuestra historia"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                Pasión por la Calidad
              </h3>
              <p className="text-gray-600">
                Cada prenda es cuidadosamente diseñada y confeccionada con los mejores materiales, 
                garantizando durabilidad y comodidad excepcional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                Innovación Constante
              </h3>
              <p className="text-gray-600">
                Nos mantenemos a la vanguardia de las tendencias de moda, incorporando 
                tecnologías sostenibles y diseños únicos en cada colección.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UsersIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                Comunidad Primero
              </h3>
              <p className="text-gray-600">
                Valoramos profundamente a nuestra comunidad de clientes, colaboradores y 
                artesanos, construyendo relaciones basadas en respeto y transparencia.
              </p>
            </motion.div>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-sm p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Nuestra Misión
            </h2>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              Empoderar a las personas a expresar su autenticidad a través de la moda, 
              mientras construimos un futuro más sostenible y equitativo para la industria textil.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              ¿Quieres saber más?
            </h2>
            <p className="text-gray-600 mb-6">
              Nos encanta conectar con nuestra comunidad. No dudes en contactarnos.
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Contáctanos</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
