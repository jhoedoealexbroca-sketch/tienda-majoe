'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CloudArrowDownIcon, 
  CloudArrowUpIcon, 
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { exportProducts, importProducts } from '@/lib/productStorage'

const DataManager = () => {
  const [isImporting, setIsImporting] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning'
    message: string
  } | null>(null)

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleExport = () => {
    try {
      const productsJson = exportProducts()
      const blob = new Blob([productsJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `majoe-products-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      showNotification('success', 'Productos exportados correctamente')
    } catch (error) {
      showNotification('error', 'Error al exportar productos')
    }
  }

  const handleImport = async () => {
    if (!importFile) return

    setIsImporting(true)
    try {
      const text = await importFile.text()
      const success = await importProducts(text)
      
      if (success) {
        showNotification('success', 'Productos importados correctamente')
        // Recargar la página para mostrar los cambios
        setTimeout(() => window.location.reload(), 1000)
      } else {
        showNotification('error', 'Error al importar productos. Verifica el formato del archivo.')
      }
    } catch (error) {
      showNotification('error', 'Error al procesar el archivo')
    } finally {
      setIsImporting(false)
      setImportFile(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/json') {
      setImportFile(file)
    } else {
      showNotification('warning', 'Por favor selecciona un archivo JSON válido')
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Notificación */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-4 rounded-lg border flex items-center space-x-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : notification.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : notification.type === 'warning' ? (
            <ExclamationTriangleIcon className="h-5 w-5" />
          ) : (
            <ExclamationTriangleIcon className="h-5 w-5" />
          )}
          <span>{notification.message}</span>
        </motion.div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-dark-800">Gestión de Datos</h2>
        <p className="text-luxury-600">Exporta e importa tus productos para hacer respaldos.</p>
      </div>

      {/* Export Section */}
      <div className="bg-white rounded-xl border border-luxury-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <CloudArrowDownIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark-800">Exportar Productos</h3>
            <p className="text-luxury-600 text-sm">Descarga todos tus productos en un archivo JSON</p>
          </div>
        </div>
        
        <motion.button
          onClick={handleExport}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex items-center space-x-2"
        >
          <DocumentArrowDownIcon className="h-5 w-5" />
          <span>Exportar Productos</span>
        </motion.button>
      </div>

      {/* Import Section */}
      <div className="bg-white rounded-xl border border-luxury-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <CloudArrowUpIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-dark-800">Importar Productos</h3>
            <p className="text-luxury-600 text-sm">Carga productos desde un archivo JSON</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="block w-full text-sm text-luxury-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-luxury-50 file:text-luxury-700 hover:file:bg-luxury-100"
            />
          </div>
          
          <motion.button
            onClick={handleImport}
            disabled={!importFile || isImporting}
            whileHover={{ scale: importFile && !isImporting ? 1.02 : 1 }}
            whileTap={{ scale: importFile && !isImporting ? 0.98 : 1 }}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isImporting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Importando...</span>
              </>
            ) : (
              <>
                <DocumentArrowUpIcon className="h-5 w-5" />
                <span>Importar Productos</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="h-6 w-6 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Información Importante</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• <strong>Exportar:</strong> Descarga todos tus productos actuales</li>
              <li>• <strong>Importar:</strong> Reemplaza todos los productos existentes</li>
              <li>• <strong>Formato:</strong> Solo archivos JSON válidos</li>
              <li>• <strong>Respaldo:</strong> Siempre exporta antes de importar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataManager
