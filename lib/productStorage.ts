import { Product } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import productsData from '@/data/products.json'

const STORAGE_KEY = 'majoe_products'
const BACKUP_KEY = 'majoe_products_backup'

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
    id: String(product.id || uuidv4()),
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

// Función para sincronizar con almacenamiento
const syncWithStorage = (products: Product[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  localStorage.setItem(BACKUP_KEY, JSON.stringify(products))
}

// Inicializar productos
const initializeProducts = (): void => {
  if (typeof window === 'undefined') return
  
  const existingProducts = localStorage.getItem(STORAGE_KEY)
  if (!existingProducts) {
    const validatedProducts = validateProducts(productsData)
    syncWithStorage(validatedProducts)
  }
}

// Inicializar al cargar el módulo
if (typeof window !== 'undefined') {
  initializeProducts()
}

// Funciones exportadas
export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return validateProducts(productsData)
  
  const productsJson = localStorage.getItem(STORAGE_KEY)
  if (productsJson) {
    try {
      const parsedProducts = JSON.parse(productsJson)
      return validateProducts(parsedProducts)
    } catch (error) {
      console.error('Error parsing products:', error)
      return validateProducts(productsData)
    }
  }
  
  return validateProducts(productsData)
}

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts()
  return products.find(product => product.id === id)
}

export const addProduct = (productData: Omit<Product, 'id'>): Product => {
  const newProduct = validateProduct({
    ...productData,
    id: uuidv4()
  })
  
  const products = getProducts()
  const updatedProducts = [...products, newProduct]
  syncWithStorage(updatedProducts)
  return newProduct
}

export const updateProduct = (id: string, productData: Partial<Product>): Product | undefined => {
  const products = getProducts()
  const index = products.findIndex(p => p.id === id)
  
  if (index === -1) return undefined
  
  const updatedProduct = validateProduct({
    ...products[index],
    ...productData,
    id // Mantener el ID original
  })
  
  products[index] = updatedProduct
  syncWithStorage(products)
  return updatedProduct
}

export const deleteProduct = (id: string): boolean => {
  const products = getProducts()
  const filteredProducts = products.filter(p => p.id !== id)
  
  if (filteredProducts.length === products.length) return false
  
  syncWithStorage(filteredProducts)
  return true
}

export const exportProducts = (): string => {
  const products = getProducts()
  return JSON.stringify(products, null, 2)
}

export const importProducts = (jsonString: string): boolean => {
  try {
    const products = JSON.parse(jsonString)
    const validatedProducts = validateProducts(products)
    syncWithStorage(validatedProducts)
    return true
  } catch (error) {
    console.error('Error importing products:', error)
    return false
  }
}