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
  return products as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { db } = await connectToDatabase()
  const product = await db.collection('products').findOne({ id })
  return product as Product | null
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
