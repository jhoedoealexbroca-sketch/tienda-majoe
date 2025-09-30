import { useState, useEffect } from 'react'
import { Product } from '@/types'

interface UseCategoryProductsOptions {
  category?: 'men' | 'women' | 'kids-boys' | 'kids-girls'
  featured?: boolean
  newProduct?: boolean
  onSale?: boolean
}

export const useCategoryProducts = (options: UseCategoryProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Construir URL con parámetros de consulta
        const params = new URLSearchParams()
        
        if (options.category) {
          params.append('category', options.category)
        }
        
        if (options.featured) {
          params.append('featured', 'true')
        }
        
        if (options.newProduct) {
          params.append('new', 'true')
        }
        
        if (options.onSale) {
          params.append('sale', 'true')
        }
        
        const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`
        console.log(`Cargando productos para categoría: ${options.category || 'todas'}`)
        
        const response = await fetch(url)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Error al cargar productos')
        }
        
        if (!Array.isArray(data)) {
          throw new Error('Formato de datos inválido')
        }
        
        console.log(`Productos cargados para ${options.category || 'todas'}:`, data.length)
        setProducts(data)
      } catch (err) {
        console.error('Error al cargar productos de categoría:', err)
        setError(err instanceof Error ? err.message : 'Error al cargar productos')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [options.category, options.featured, options.newProduct, options.onSale])

  return {
    products,
    loading,
    error
  }
}
