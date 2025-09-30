import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

// Declarar el tipo global para mongoose
declare global {
  var mongoose: {
    conn: any | null
    promise: Promise<any> | null
  }
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  // Si ya tenemos una conexión activa, la usamos
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log('Usando conexión existente a MongoDB')
    return cached.conn
  }

  // Si no hay promesa de conexión, creamos una nueva
  if (!cached.promise) {
    console.log('Creando nueva conexión a MongoDB...')
    console.log('MONGODB_URI configurado:', !!MONGODB_URI)
    
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4, // Usar IPv4
    }

    // Opciones adicionales para producción
    if (process.env.NODE_ENV === 'production') {
      opts.retryWrites = true
      opts.w = 'majority'
    }
    
    cached.promise = mongoose.connect(MONGODB_URI!, opts)
  }

  try {
    console.log('Esperando conexión a MongoDB...')
    cached.conn = await cached.promise
    
    console.log('Conexión establecida. Estado:', mongoose.connection.readyState)
    console.log('Base de datos:', mongoose.connection.name)
    
    return cached.conn
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error)
    // Limpiar cache en caso de error
    cached.promise = null
    cached.conn = null
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export default dbConnect