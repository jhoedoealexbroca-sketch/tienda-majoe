// Script para verificar los IDs de productos en la base de datos
require('dotenv').config()
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { 
    type: String, 
    required: true,
    enum: ['men', 'women', 'kids-boys', 'kids-girls']
  },
  subcategory: { type: String, required: true },
  images: [{ type: String, required: true }],
  sizes: [{
    name: { type: String, required: true },
    value: { type: String, required: true },
    available: { type: Boolean, default: true }
  }],
  colors: [{
    name: { type: String, required: true },
    value: { type: String, required: true },
    available: { type: Boolean, default: true }
  }],
  stock: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
  newProduct: { type: Boolean, default: false },
  onSale: { type: Boolean, default: false }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)

async function checkProductIds() {
  try {
    console.log('🔍 Conectando a MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado exitosamente')
    
    console.log('\n📋 Verificando productos en la base de datos...')
    const products = await Product.find({})
    
    console.log(`\n📊 Total de productos encontrados: ${products.length}`)
    
    if (products.length > 0) {
      console.log('\n🆔 IDs de productos disponibles:')
      products.forEach((product, index) => {
        console.log(`${index + 1}. ID: "${product.id}" | _ID: "${product._id}" | Nombre: "${product.name}"`)
      })
      
      console.log('\n🔗 URLs de productos válidas:')
      products.forEach((product, index) => {
        console.log(`${index + 1}. /product/${product.id}`)
      })
    } else {
      console.log('\n⚠️  No se encontraron productos en la base de datos')
      console.log('💡 Necesitas agregar productos desde el panel admin')
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log('\n🔌 Desconectado de MongoDB')
  }
}

checkProductIds()
