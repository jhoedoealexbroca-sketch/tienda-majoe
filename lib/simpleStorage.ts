import { Product } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import productsData from '@/data/products.json'

const STORAGE_KEY = 'majoe_products'

// Inicializar productos si no existen
const initializeProducts = () => {
  if (typeof window !== 'undefined') {
    const existingProducts = localStorage.getItem(STORAGE_KEY)
    if (!existingProducts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData))
    }
  }
}

// Inicializar al cargar el módulo
if (typeof window !== 'undefined') {
  initializeProducts()
}

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return productsData
  
  const productsJson = localStorage.getItem(STORAGE_KEY)
  if (productsJson) {
    try {
      return JSON.parse(productsJson)
    } catch (error) {
      console.error('Error parsing products:', error)
      return productsData
    }
  }
  
  return productsData
}

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts()
  return products.find(product => product.id === id)
}

export const saveProducts = (products: Product[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }
}

export const addProduct = (newProductData: Omit<Product, 'id'>): Product => {
  const products = getProducts()
  const newProduct: Product = {
    id: uuidv4(),
    ...newProductData,
  }
  
  const updatedProducts = [...products, newProduct]
  saveProducts(updatedProducts)
  return newProduct
}

export const updateProduct = (id: string, updatedProductData: Omit<Product, 'id'>): Product | undefined => {
  const products = getProducts()
  const index = products.findIndex(product => product.id === id)
  
  if (index !== -1) {
    const updatedProduct = { ...products[index], ...updatedProductData, id }
    const updatedProducts = [...products]
    updatedProducts[index] = updatedProduct
    
    saveProducts(updatedProducts)
    return updatedProduct
  }
  
  return undefined
}

export const deleteProduct = (id: string): boolean => {
  const products = getProducts()
  const updatedProducts = products.filter(product => product.id !== id)
  
  if (updatedProducts.length < products.length) {
    saveProducts(updatedProducts)
    return true
  }
  
  return false
}

// Función para exportar productos
export const exportProducts = (): string => {
  const products = getProducts()
  return JSON.stringify(products, null, 2)
}

// Función para importar productos
export const importProducts = (productsJson: string): boolean => {
  try {
    const products = JSON.parse(productsJson)
    if (Array.isArray(products)) {
      saveProducts(products)
      return true
    }
  } catch (error) {
    console.error('Error importing products:', error)
  }
  return false
}
