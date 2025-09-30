import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

async function dbConnect() {
  try {
    // En producción, verificar si ya hay conexión activa
    if (cached.conn && mongoose.connection.readyState === 1) {
      console.log('Usando conexión existente a MongoDB');
      return cached.conn;
    }

    if (!cached.promise) {
      console.log('Iniciando nueva conexión a MongoDB...');
      const opts = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 15000, // Más tiempo para conexión inicial
        socketTimeoutMS: 45000,
        bufferCommands: false,
        // Opciones adicionales para producción
        maxIdleTimeMS: 30000,
        retryWrites: true,
        // Opciones adicionales para problemas de autenticación
        authSource: 'admin',
        ssl: true
      };

      cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
        console.log('Conexión a MongoDB establecida exitosamente');
        return mongoose;
      });
    }

    try {
      cached.conn = await cached.promise;
      
      // Verificar el estado de la conexión
      if (mongoose.connection.readyState !== 1) {
        throw new Error('La conexión a MongoDB no está activa');
      }
      
      return cached.conn;
    } catch (e) {
      console.error('Error al establecer conexión:', e);
      cached.promise = null;
      cached.conn = null;
      throw e;
    }
  } catch (error) {
    console.error('Error crítico en dbConnect:', error);
    cached.promise = null;
    cached.conn = null;
    
    // En producción, lanzar error más descriptivo
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    throw error;
  }
}

export default dbConnect;