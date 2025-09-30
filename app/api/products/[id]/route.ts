import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('API: Buscando producto con ID:', params.id)
    
    // Importación dinámica para evitar ejecución en build time
    const { default: dbConnect } = await import('@/lib/mongodb')
    const { default: ProductModel } = await import('@/models/Product')
    
    await dbConnect()
    
    // Intentar buscar por diferentes campos
    let product = await ProductModel.findOne({ id: params.id })
    
    if (!product) {
      // Intentar buscar por _id si es un ObjectId válido
      console.log('API: No encontrado por id, intentando por _id...')
      try {
        product = await ProductModel.findById(params.id)
      } catch (e) {
        console.log('API: ID no es un ObjectId válido')
      }
    }
    
    if (!product) {
      console.log('API: Producto no encontrado en ningún campo')
      // Listar todos los productos para debug (solo en desarrollo)
      if (process.env.NODE_ENV === 'development') {
        const allProducts = await ProductModel.find({}).limit(5)
        console.log('API: Productos disponibles:', allProducts.map(p => ({ id: p.id, _id: p._id, name: p.name })))
      }
      
      return NextResponse.json(
        { 
          error: 'Producto no encontrado',
          message: `No se encontró un producto con ID: ${params.id}`
        },
        { status: 404 }
      )
    }
    
    console.log('API: Producto encontrado:', product.name)
    return NextResponse.json(product)
  } catch (error) {
    console.error('API Error fetching product:', error)
    return NextResponse.json(
      { error: 'Error al cargar el producto' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Importación dinámica para evitar ejecución en build time
    const { default: dbConnect } = await import('@/lib/mongodb')
    const { default: ProductModel } = await import('@/models/Product')
    
    await dbConnect()
    const data = await req.json()
    const product = await ProductModel.findOneAndUpdate(
      { id: params.id },
      data,
      { new: true }
    )
    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el producto' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Importación dinámica para evitar ejecución en build time
    const { default: dbConnect } = await import('@/lib/mongodb')
    const { default: ProductModel } = await import('@/models/Product')
    
    await dbConnect()
    const product = await ProductModel.findOneAndDelete({ id: params.id })
    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el producto' },
      { status: 500 }
    )
  }
}