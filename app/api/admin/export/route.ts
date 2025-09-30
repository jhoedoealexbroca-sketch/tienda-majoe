import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('API: Iniciando exportación de productos')
    
    // Importación dinámica para evitar ejecución en build time
    const { default: dbConnect } = await import('@/lib/mongodb')
    const { default: ProductModel } = await import('@/models/Product')
    
    await dbConnect()
    
    const products = await ProductModel.find({})
    console.log(`API: Exportando ${products.length} productos`)
    
    // Crear el archivo JSON para descarga
    const exportData = {
      timestamp: new Date().toISOString(),
      count: products.length,
      products: products
    }
    
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="productos-export.json"'
      }
    })
  } catch (error) {
    console.error('API Error exporting products:', error)
    return NextResponse.json({ 
      error: 'Error exporting products',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
