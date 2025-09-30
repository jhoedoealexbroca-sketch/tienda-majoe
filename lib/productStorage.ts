import { Product } from '@/types'
import productsData from '@/data/products.json'

const STORAGE_KEY = 'majoe_products'

// Inicializar productos si no existen en localStorage
const initializeProducts = (): Product[] => {
  if (typeof window === 'undefined') return productsData as Product[]
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData))
    return productsData as Product[]
  }
  return JSON.parse(stored)
}

// Obtener todos los productos
export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return productsData as Product[]
  return initializeProducts()
}

// Guardar productos
export const saveProducts = (products: Product[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

// Agregar nuevo producto
export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString() // ID simple basado en timestamp
  }
  
  const updatedProducts = [...products, newProduct]
  saveProducts(updatedProducts)
  return newProduct
}

// Actualizar producto existente
export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts()
  const index = products.findIndex(p => p.id === id)
  
  if (index === -1) return null
  
  const updatedProduct = { ...products[index], ...updates }
  const updatedProducts = [...products]
  updatedProducts[index] = updatedProduct
  
  saveProducts(updatedProducts)
  return updatedProduct
}

// Eliminar producto
export const deleteProduct = (id: string): boolean => {
  const products = getProducts()
  const filteredProducts = products.filter(p => p.id !== id)
  
  if (filteredProducts.length === products.length) return false
  
  saveProducts(filteredProducts)
  return true
}

// Obtener producto por ID
export const getProductById = (id: string): Product | null => {
  const products = getProducts()
  return products.find(p => p.id === id) || null
}

// Buscar productos
export const searchProducts = (query: string, category?: 'men' | 'women'): Product[] => {
  const products = getProducts()
  return products.filter(product => {
    const matchesQuery = query === '' || 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    
    const matchesCategory = !category || product.category === category
    
    return matchesQuery && matchesCategory
  })
}
