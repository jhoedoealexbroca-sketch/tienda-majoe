import { useState, useEffect } from 'react'
import { Product } from '@/types'
import { 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  saveProducts 
} from '@/lib/hybridStorage'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar productos iniciales
  useEffect(() => {
    try {
      const initialProducts = getProducts()
      setProducts(initialProducts)
    } catch (err) {
      setError('Error al cargar productos')
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Refrescar productos
  const refreshProducts = () => {
    try {
      const updatedProducts = getProducts()
      setProducts(updatedProducts)
    } catch (err) {
      setError('Error al refrescar productos')
      console.error('Error refreshing products:', err)
    }
  }

  // Agregar producto
  const handleAddProduct = async (productData: Omit<Product, 'id'>): Promise<Product | null> => {
    try {
      setError(null)
      const newProduct = addProduct(productData)
      setProducts(prev => [...prev, newProduct])
      return newProduct
    } catch (err) {
      setError('Error al agregar producto')
      console.error('Error adding product:', err)
      return null
    }
  }

  // Actualizar producto
  const handleUpdateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    try {
      setError(null)
      const updatedProduct = updateProduct(id, updates)
      if (updatedProduct) {
        setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p))
        return updatedProduct
      }
      return null
    } catch (err) {
      setError('Error al actualizar producto')
      console.error('Error updating product:', err)
      return null
    }
  }

  // Eliminar producto
  const handleDeleteProduct = async (id: string): Promise<boolean> => {
    try {
      setError(null)
      const success = deleteProduct(id)
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== id))
        return true
      }
      return false
    } catch (err) {
      setError('Error al eliminar producto')
      console.error('Error deleting product:', err)
      return false
    }
  }

  // Buscar productos
  const handleSearchProducts = (query: string, category?: 'men' | 'women'): Product[] => {
    try {
      return searchProducts(query, category)
    } catch (err) {
      setError('Error en la búsqueda')
      console.error('Error searching products:', err)
      return []
    }
  }

  return {
    products,
    loading,
    error,
    refreshProducts,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    searchProducts: handleSearchProducts
  }
}
