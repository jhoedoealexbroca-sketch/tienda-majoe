'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  PhotoIcon, 
  CloudArrowUpIcon, 
  XMarkIcon,
  PlusIcon 
} from '@heroicons/react/24/outline'
import Image from 'next/image'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

const ImageUpload = ({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) => {
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Convertir archivo a base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  // Manejar selección de archivos
  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return

    const newImages: string[] = []
    
    for (let i = 0; i < Math.min(files.length, maxImages - images.length); i++) {
      const file = files[i]
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} no es una imagen válida`)
        continue
      }
      
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} es muy grande. Máximo 5MB por imagen.`)
        continue
      }
      
      try {
        const base64 = await fileToBase64(file)
        newImages.push(base64)
      } catch (error) {
        console.error('Error converting file to base64:', error)
        alert(`Error al procesar ${file.name}`)
      }
    }
    
    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages])
    }
  }

  // Manejar drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  // Eliminar imagen
  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  // Abrir selector de archivos
  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      
      {/* Input oculto para archivos */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Zona de carga */}
      {images.length < maxImages && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openFileSelector}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
            dragOver 
              ? 'border-luxury-500 bg-luxury-50' 
              : 'border-luxury-300 hover:border-luxury-400 hover:bg-luxury-25'
          }`}
        >
          <CloudArrowUpIcon className="h-12 w-12 text-luxury-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-dark-800 mb-2">
            Subir Imágenes
          </h4>
          <p className="text-luxury-600 mb-4">
            Arrastra y suelta las imágenes aquí o haz clic para seleccionar
          </p>
          <div className="text-sm text-luxury-500 space-y-1">
            <p>• Máximo {maxImages} imágenes</p>
            <p>• Formatos: JPG, PNG, WEBP</p>
            <p>• Tamaño máximo: 5MB por imagen</p>
          </div>
          
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 btn-primary text-sm inline-flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Seleccionar Imágenes</span>
          </motion.button>
        </motion.div>
      )}

      {/* Preview de imágenes */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-dark-800">
            Imágenes del Producto ({images.length}/{maxImages})
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={image}
                  alt={`Producto ${index + 1}`}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay con controles */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeImage(index)}
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </motion.button>
                </div>
                
                {/* Indicador de imagen principal */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-luxury-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Principal
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <p className="text-sm text-luxury-600">
            💡 La primera imagen será la imagen principal del producto
          </p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
