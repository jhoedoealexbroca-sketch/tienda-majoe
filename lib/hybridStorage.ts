import { Product } from '@/types'
import { v4 as uuidv4 } from 'uuid'

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

// Función para sincronizar con un archivo remoto (simulado)
const syncWithRemote = async (products: any[]) => {
  try {
    const validatedProducts = validateProducts(products)
    // En un entorno real, aquí harías una llamada a tu API
    // Por ahora, guardamos en localStorage como backup
    localStorage.setItem(BACKUP_KEY, JSON.stringify(validatedProducts))
    
    // También podrías enviar a un servicio como Firebase, Supabase, etc.
    console.log('Productos sincronizados:', validatedProducts.length)
  } catch (error) {
    console.error('Error sincronizando productos:', error)
  }
}

// Inicializar productos desde el archivo JSON si no existen en localStorage
const initializeProducts = () => {
  if (typeof window !== 'undefined') {
    const existingProducts = localStorage.getItem(STORAGE_KEY)
    if (!existingProducts) {
      // Cargar productos iniciales desde el archivo JSON
      try {
        import('@/data/products.json').then((productsData) => {
          const validatedProducts = validateProducts(productsData.default)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(validatedProducts))
          syncWithRemote(validatedProducts)
        }).catch((error) => {
          console.error('Error loading initial products:', error)
        })
      } catch (error) {
        console.error('Error initializing products:', error)
      }
    }
  }
}

// Inicializar al cargar el módulo
if (typeof window !== 'undefined') {
  initializeProducts()
}

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return []
  
  const productsJson = localStorage.getItem(STORAGE_KEY)
  if (productsJson) {
    return JSON.parse(productsJson)
  }
  
  // Fallback: intentar cargar desde backup
  const backupJson = localStorage.getItem(BACKUP_KEY)
  if (backupJson) {
    return JSON.parse(backupJson)
  }
  
  return []
}

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts()
  return products.find(product => product.id === id)
}

export const saveProducts = async (products: Product[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    await syncWithRemote(products)
  }
}

export const addProduct = async (newProductData: Omit<Product, 'id'>): Promise<Product> => {
  const products = getProducts()
  const newProduct: Product = {
    id: uuidv4(),
    ...newProductData,
  }
  
  const updatedProducts = [...products, newProduct]
  await saveProducts(updatedProducts)
  return newProduct
}

export const updateProduct = async (id: string, updatedProductData: Omit<Product, 'id'>): Promise<Product | undefined> => {
  const products = getProducts()
  const index = products.findIndex(product => product.id === id)
  
  if (index !== -1) {
    const updatedProduct = { ...products[index], ...updatedProductData, id }
    const updatedProducts = [...products]
    updatedProducts[index] = updatedProduct
    
    await saveProducts(updatedProducts)
    return updatedProduct
  }
  
  return undefined
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  const products = getProducts()
  const updatedProducts = products.filter(product => product.id !== id)
  
  if (updatedProducts.length < products.length) {
    await saveProducts(updatedProducts)
    return true
  }
  
  return false
}

// Función para exportar productos (útil para backup)
export const exportProducts = (): string => {
  const products = getProducts()
  return JSON.stringify(products, null, 2)
}

// Función para importar productos (útil para restaurar)
export const importProducts = async (productsJson: string): Promise<boolean> => {
  try {
    const products = JSON.parse(productsJson)
    if (Array.isArray(products)) {
      await saveProducts(products)
      return true
    }
  } catch (error) {
    console.error('Error importing products:', error)
  }
  return false
}
