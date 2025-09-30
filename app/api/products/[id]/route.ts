import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Importación dinámica para evitar ejecución en build time
    const { default: dbConnect } = await import('@/lib/mongodb')
    const { default: ProductModel } = await import('@/models/Product')
    
    await dbConnect()
    const product = await ProductModel.findOne({ id: params.id })
    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
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