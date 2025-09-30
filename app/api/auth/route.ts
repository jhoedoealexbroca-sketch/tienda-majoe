'use server'

import { NextRequest, NextResponse } from 'next/server'

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'majoe2024'
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json(
      { error: 'Credenciales incorrectas' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Error en autenticación:', error)
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}