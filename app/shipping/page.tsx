'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeftIcon, TruckIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'

const ShippingPage = () => {
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
            Información de Envío
          </h1>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <TruckIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-green-900 mb-2">Envío Gratuito</h3>
                <p className="text-green-700 text-sm">En pedidos superiores a S/. 150</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <ClockIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-blue-900 mb-2">Entrega Rápida</h3>
                <p className="text-blue-700 text-sm">2-5 días hábiles</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <MapPinIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-purple-900 mb-2">Cobertura Nacional</h3>
                <p className="text-purple-700 text-sm">Todo el Perú</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Opciones de Envío</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Envío Estándar</h3>
                  <p className="text-gray-600 mb-2">Entrega en 3-5 días hábiles</p>
                  <p className="text-sm text-gray-500">Costo: S/. 15 (Gratis en pedidos superiores a S/. 150)</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Envío Express</h3>
                  <p className="text-gray-600 mb-2">Entrega en 1-2 días hábiles</p>
                  <p className="text-sm text-gray-500">Costo: S/. 25</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Recojo en Tienda</h3>
                  <p className="text-gray-600 mb-2">Disponible en nuestras tiendas físicas</p>
                  <p className="text-sm text-gray-500">Costo: Gratuito</p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Zonas de Cobertura</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Lima Metropolitana</h4>
                <p className="text-gray-600 mb-4">Entrega en 24-48 horas</p>
                
                <h4 className="font-semibold text-gray-900 mb-3">Provincias</h4>
                <p className="text-gray-600">Entrega en 3-5 días hábiles a través de nuestros socios logísticos</p>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">📦 Seguimiento de Pedido</h4>
                <p className="text-yellow-800">
                  Recibirás un código de seguimiento por email una vez que tu pedido sea despachado.
                  Podrás rastrear tu paquete en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ShippingPage
