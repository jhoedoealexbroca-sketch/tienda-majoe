'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const SizeGuidePage = () => {
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
            Guía de Tallas
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Encuentra tu talla perfecta con nuestra guía completa de medidas.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ropa de Hombre</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Talla</th>
                        <th className="px-4 py-2 text-left">Pecho (cm)</th>
                        <th className="px-4 py-2 text-left">Cintura (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="px-4 py-2 border-t">S</td><td className="px-4 py-2 border-t">88-96</td><td className="px-4 py-2 border-t">76-84</td></tr>
                      <tr><td className="px-4 py-2 border-t">M</td><td className="px-4 py-2 border-t">96-104</td><td className="px-4 py-2 border-t">84-92</td></tr>
                      <tr><td className="px-4 py-2 border-t">L</td><td className="px-4 py-2 border-t">104-112</td><td className="px-4 py-2 border-t">92-100</td></tr>
                      <tr><td className="px-4 py-2 border-t">XL</td><td className="px-4 py-2 border-t">112-120</td><td className="px-4 py-2 border-t">100-108</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ropa de Mujer</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Talla</th>
                        <th className="px-4 py-2 text-left">Busto (cm)</th>
                        <th className="px-4 py-2 text-left">Cintura (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="px-4 py-2 border-t">XS</td><td className="px-4 py-2 border-t">78-82</td><td className="px-4 py-2 border-t">58-62</td></tr>
                      <tr><td className="px-4 py-2 border-t">S</td><td className="px-4 py-2 border-t">82-86</td><td className="px-4 py-2 border-t">62-66</td></tr>
                      <tr><td className="px-4 py-2 border-t">M</td><td className="px-4 py-2 border-t">86-90</td><td className="px-4 py-2 border-t">66-70</td></tr>
                      <tr><td className="px-4 py-2 border-t">L</td><td className="px-4 py-2 border-t">90-94</td><td className="px-4 py-2 border-t">70-74</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Consejos para medir</h4>
              <ul className="text-blue-800 space-y-1">
                <li>• Usa una cinta métrica flexible</li>
                <li>• Mide sobre ropa interior ligera</li>
                <li>• Mantén la cinta ajustada pero no apretada</li>
                <li>• Si estás entre dos tallas, elige la mayor</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SizeGuidePage
