import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('API: Iniciando importación de productos')
    
    // Importación dinámica para evitar ejecución en build time
    const { default: dbConnect } = await import('@/lib/mongodb')
    const { default: ProductModel } = await import('@/models/Product')
    
    await dbConnect()
    
    const body = await request.json()
    
    if (!body.products || !Array.isArray(body.products)) {
      return NextResponse.json({ 
        error: 'Invalid data format. Expected products array.' 
      }, { status: 400 })
    }
    
    console.log(`API: Importando ${body.products.length} productos`)
    
    // Limpiar productos existentes (opcional)
    if (body.clearExisting) {
      await ProductModel.deleteMany({})
      console.log('API: Productos existentes eliminados')
    }
    
    // Insertar nuevos productos
    const insertedProducts = await ProductModel.insertMany(body.products)
    console.log(`API: ${insertedProducts.length} productos importados`)
    
    return NextResponse.json({
      success: true,
      imported: insertedProducts.length,
      message: `${insertedProducts.length} productos importados exitosamente`
    })
  } catch (error) {
    console.error('API Error importing products:', error)
    return NextResponse.json({ 
      error: 'Error importing products',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
