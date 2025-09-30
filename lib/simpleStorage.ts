import { Product } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import productsData from '@/data/products.json'

const STORAGE_KEY = 'majoe_products'

// Función para validar la categoría del producto
const isValidCategory = (category: string): category is Product['category'] => {
  return ['men', 'women', 'kids-boys', 'kids-girls'].includes(category)
}

// Función para validar y convertir un producto
const validateProduct = (product: any): Product => {
  if (!product || typeof product !== 'object') throw new Error('Invalid product data')

  if (!isValidCategory(product.category)) {
    throw new Error(`Invalid category: ${product.category}`)
  }

  return {
    id: String(product.id),
    name: String(product.name),
    price: Number(product.price),
    originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
    description: String(product.description),
    category: product.category,
    subcategory: String(product.subcategory),
    images: Array.isArray(product.images) ? product.images.map(String) : [],
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    colors: Array.isArray(product.colors) ? product.colors : [],
    stock: Number(product.stock),
    featured: Boolean(product.featured),
    isNew: Boolean(product.isNew),
    onSale: Boolean(product.onSale)
  }
}

// Función para validar un array de productos
const validateProducts = (products: any[]): Product[] => {
  return products.map(validateProduct)
}

// Validar productos iniciales
const getValidatedInitialProducts = (): Product[] => {
  try {
    return validateProducts(productsData)
  } catch (error) {
    console.error('Error validating initial products:', error)
    return []
  }
}

// Inicializar productos si no existen
const initializeProducts = () => {
  if (typeof window !== 'undefined') {
    const existingProducts = localStorage.getItem(STORAGE_KEY)
    if (!existingProducts) {
      const validatedProducts = getValidatedInitialProducts()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validatedProducts))
    }
  }
}

// Inicializar al cargar el módulo
if (typeof window !== 'undefined') {
  initializeProducts()
}

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return getValidatedInitialProducts()
  
  const productsJson = localStorage.getItem(STORAGE_KEY)
  if (productsJson) {
    try {
      const parsedProducts = JSON.parse(productsJson)
      return validateProducts(parsedProducts)
    } catch (error) {
      console.error('Error parsing products:', error)
      return getValidatedInitialProducts()
    }
  }
  
  return getValidatedInitialProducts()
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
