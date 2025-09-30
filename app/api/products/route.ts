import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  try {
    console.log('API: Iniciando GET /api/products')
    
    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const newProduct = searchParams.get('new')
    const onSale = searchParams.get('sale')
    
    console.log('API: Filtros aplicados:', { category, featured, newProduct, onSale })
    
    // Importación dinámica para evitar ejecución en build time
    const { validateEnvironment } = await import('@/lib/env-check')
    const { default: dbConnect } = await import('@/lib/mongodb')
    const { default: ProductModel } = await import('@/models/Product')
    
    // Validar entorno
    const envValidation = validateEnvironment()
    if (!envValidation.isValid) {
      console.error('API: Environment validation failed:', envValidation.errors)
      return NextResponse.json({ 
        error: 'Server configuration error',
        message: 'Environment variables not properly configured',
        details: envValidation.errors
      }, { status: 500 })
    }
    
    console.log('API: Intentando conectar a MongoDB...')
    await dbConnect()
    console.log('API: Conexión a BD establecida exitosamente')
    
    // Construir filtros de consulta
    const filters: any = {}
    
    if (category) {
      filters.category = category
    }
    
    if (featured === 'true') {
      filters.featured = true
    }
    
    if (newProduct === 'true') {
      filters.newProduct = true
    }
    
    if (onSale === 'true') {
      filters.onSale = true
    }
    
    console.log('API: Buscando productos con filtros:', filters)
    const products = await ProductModel.find(filters)
    console.log(`API: ${products.length} productos encontrados`)
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('API Error detallado:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown error type'
    })
    
    return NextResponse.json({ 
      error: 'Error fetching products',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('API: Iniciando POST /api/products')
    
    // Importación dinámica para evitar ejecución en build time
    const { default: dbConnect } = await import('@/lib/mongodb')
    const { default: ProductModel } = await import('@/models/Product')
    
    await dbConnect()
    
    const body = await request.json()
    console.log('API: Datos recibidos:', body)
    
    // Generar ID único si no se proporciona
    if (!body.id) {
      body.id = uuidv4()
    }
    
    // Validar datos requeridos
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ 
        error: 'Missing required fields: name, price, category' 
      }, { status: 400 })
    }
    
    const product = new ProductModel(body)
    const savedProduct = await product.save()
    console.log('API: Producto creado:', savedProduct.id)
    
    return NextResponse.json(savedProduct, { status: 201 })
  } catch (error) {
    console.error('API Error creating product:', error)
    return NextResponse.json({ 
      error: 'Error creating product',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}