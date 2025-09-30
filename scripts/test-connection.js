const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Probando conexión a MongoDB...');
  console.log('MONGODB_URI configurado:', process.env.MONGODB_URI ? '✓ Sí' : '✗ No');
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI no está configurado en .env');
    return;
  }

  try {
    console.log('🔌 Intentando conectar...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      authSource: 'admin',
      ssl: true
    });
    
    console.log('✅ ¡Conexión exitosa a MongoDB!');
    console.log('📊 Estado de la conexión:', mongoose.connection.readyState);
    console.log('🏷️  Base de datos:', mongoose.connection.name);
    
    // Probar una operación simple
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Colecciones encontradas:', collections.length);
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n🔧 Posibles soluciones:');
      console.log('1. Verificar usuario y contraseña en MongoDB Atlas');
      console.log('2. Verificar que el usuario tenga permisos');
      console.log('3. Verificar Network Access (IP whitelist)');
      console.log('4. Probar con una contraseña sin caracteres especiales');
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

testConnection();
