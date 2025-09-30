import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ProductModel from '@/models/Product'

export async function GET() {
  try {
    console.log('API: Iniciando exportación de productos')
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
