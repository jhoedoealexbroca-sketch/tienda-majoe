import { MongoClient, Db } from 'mongodb'
import { Product } from '@/types'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'majoe-store'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  
  const db = client.db(MONGODB_DB)
  
  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getProducts(): Promise<Product[]> {
  const { db } = await connectToDatabase()
  const products = await db.collection('products').find({}).toArray()
  return products.map(product => ({
    id: product.id || product._id.toString(),
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory,
    images: product.images,
    sizes: product.sizes,
    colors: product.colors,
    stock: product.stock,
    featured: product.featured,
    isNew: product.isNew,
    onSale: product.onSale
  }))
}

export async function getProductById(id: string): Promise<Product | null> {
  const { db } = await connectToDatabase()
  const product = await db.collection('products').findOne({ id })
  if (!product) return null
  
  return {
    id: product.id || product._id.toString(),
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory,
    images: product.images,
    sizes: product.sizes,
    colors: product.colors,
    stock: product.stock,
    featured: product.featured,
    isNew: product.isNew,
    onSale: product.onSale
  }
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const { db } = await connectToDatabase()
  const newProduct: Product = {
    id: Math.random().toString(36).substr(2, 9),
    ...product,
  }
  
  await db.collection('products').insertOne(newProduct)
  return newProduct
}

export async function updateProduct(id: string, product: Omit<Product, 'id'>): Promise<Product | null> {
  const { db } = await connectToDatabase()
  const updatedProduct = { ...product, id }
  
  const result = await db.collection('products').findOneAndUpdate(
    { id },
    { $set: updatedProduct },
    { returnDocument: 'after' }
  )
  
  return result as Product | null
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { db } = await connectToDatabase()
  const result = await db.collection('products').deleteOne({ id })
  return result.deletedCount > 0
}
