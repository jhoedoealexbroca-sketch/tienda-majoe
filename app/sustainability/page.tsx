'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeftIcon, LeafIcon, RecycleIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const SustainabilityPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
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
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Compromiso con la Sostenibilidad
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              En MAJOE, creemos que la moda puede ser hermosa sin dañar nuestro planeta. 
              Nuestro compromiso con la sostenibilidad guía cada decisión que tomamos.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <LeafIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-green-900 mb-2">Materiales Eco-Friendly</h3>
                <p className="text-green-700 text-sm">Algodón orgánico y fibras recicladas</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <RecycleIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-blue-900 mb-2">Economía Circular</h3>
                <p className="text-blue-700 text-sm">Programa de reciclaje de prendas</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <GlobeAltIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-purple-900 mb-2">Impacto Positivo</h3>
                <p className="text-purple-700 text-sm">Reducción de huella de carbono</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nuestras Iniciativas</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Materiales Sostenibles</h3>
                <p className="text-gray-600">
                  Utilizamos exclusivamente algodón orgánico certificado, fibras recicladas y 
                  materiales de origen responsable en todas nuestras colecciones.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Producción Ética</h3>
                <p className="text-gray-600">
                  Trabajamos únicamente con talleres que garantizan condiciones laborales justas, 
                  salarios dignos y respeto por los derechos humanos.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Packaging Eco-Friendly</h3>
                <p className="text-gray-600">
                  Nuestros empaques son 100% reciclables y biodegradables, minimizando 
                  el impacto ambiental en cada envío.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Programa de Reciclaje</h3>
                <p className="text-gray-600">
                  Acepta tus prendas MAJOE usadas y recibe descuentos en tu próxima compra. 
                  Las prendas son recicladas o donadas a organizaciones benéficas.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🌱 Nuestro Compromiso 2025</h4>
              <ul className="text-green-800 space-y-1">
                <li>• Reducir emisiones de CO2 en un 50%</li>
                <li>• Alcanzar 100% materiales sostenibles</li>
                <li>• Implementar energía renovable en toda la cadena</li>
                <li>• Plantar 1000 árboles por cada 100 prendas vendidas</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SustainabilityPage
