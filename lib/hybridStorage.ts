import { Product } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import productsData from '@/data/products.json'
import ProductModel from '@/models/Product'
import dbConnect from './mongodb'

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
    newProduct: Boolean(product.newProduct || product.isNew),
    onSale: Boolean(product.onSale)
  }
}

// Función para validar un array de productos
const validateProducts = (products: any[]): Product[] => {
  return products.map(validateProduct)
}

// Inicializar productos en MongoDB si no existen
const initializeProducts = async (): Promise<void> => {
  await dbConnect()
  const count = await ProductModel.countDocuments()
  
  if (count === 0) {
    const validatedProducts = validateProducts(productsData)
    await ProductModel.insertMany(validatedProducts)
  }
}

// Inicializar al cargar el módulo
let initialized = false
const ensureInitialized = async () => {
  if (!initialized) {
    await initializeProducts()
    initialized = true
  }
}

// Funciones exportadas
export const getProducts = async (): Promise<Product[]> => {
  await ensureInitialized()
  await dbConnect()
  
  const products = await ProductModel.find({})
  return products.map(p => validateProduct(p.toObject()))
}

export const getProductById = async (id: string): Promise<Product | null> => {
  await ensureInitialized()
  await dbConnect()
  
  const product = await ProductModel.findOne({ id })
  return product ? validateProduct(product.toObject()) : null
}

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  await ensureInitialized()
  await dbConnect()
  
  const newProduct = validateProduct({
    ...productData,
    id: uuidv4()
  })
  
  const product = new ProductModel(newProduct)
  await product.save()
  return newProduct
}

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product | null> => {
  await ensureInitialized()
  await dbConnect()
  
  const product = await ProductModel.findOne({ id })
  if (!product) return null
  
  Object.assign(product, productData)
  await product.save()
  return validateProduct(product.toObject())
}

export const deleteProduct = async (id: string): Promise<boolean> => {
  await ensureInitialized()
  await dbConnect()
  
  const result = await ProductModel.deleteOne({ id })
  return result.deletedCount > 0
}

export const exportProducts = async (): Promise<string> => {
  const products = await getProducts()
  return JSON.stringify(products, null, 2)
}

export const importProducts = async (jsonString: string): Promise<boolean> => {
  try {
    const products = validateProducts(JSON.parse(jsonString))
    await dbConnect()
    await ProductModel.deleteMany({}) // Limpiar datos existentes
    await ProductModel.insertMany(products)
    return true
  } catch (error) {
    console.error('Error importing products:', error)
    return false
  }
}

// Función para migrar datos existentes del localStorage a MongoDB
export const migrateFromLocalStorage = async (): Promise<void> => {
  if (typeof window === 'undefined') return
  
  const localData = localStorage.getItem('majoe_products')
  if (localData) {
    try {
      const products = validateProducts(JSON.parse(localData))
      await dbConnect()
      await ProductModel.deleteMany({}) // Limpiar datos existentes
      await ProductModel.insertMany(products)
      
      // Limpiar localStorage después de migrar
      localStorage.removeItem('majoe_products')
      localStorage.removeItem('majoe_products_backup')
    } catch (error) {
      console.error('Error migrating data:', error)
      throw error
    }
  }
}