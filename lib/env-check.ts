/**
 * Utilidad para validar variables de entorno requeridas
 */

interface EnvConfig {
  MONGODB_URI: string
  NODE_ENV: string
}

export function validateEnvironment(): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Verificar variables de entorno requeridas
  if (!process.env.MONGODB_URI) {
    errors.push('MONGODB_URI is required')
  }
  
  if (!process.env.NODE_ENV) {
    errors.push('NODE_ENV is required')
  }
  
  // Validar formato de MONGODB_URI
  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.startsWith('mongodb')) {
    errors.push('MONGODB_URI must be a valid MongoDB connection string')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function getEnvConfig(): Partial<EnvConfig> {
  return {
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV || 'development'
  }
}

export function logEnvironmentStatus(): void {
  const validation = validateEnvironment()
  const config = getEnvConfig()
  
  console.log('=== Environment Status ===')
  console.log('NODE_ENV:', config.NODE_ENV)
  console.log('MONGODB_URI:', config.MONGODB_URI ? '✓ Set' : '✗ Missing')
  
  if (!validation.isValid) {
    console.error('Environment validation failed:')
    validation.errors.forEach(error => console.error(`- ${error}`))
  } else {
    console.log('✓ Environment validation passed')
  }
  console.log('========================')
}

// Auto-ejecutar en desarrollo
if (process.env.NODE_ENV === 'development') {
  logEnvironmentStatus()
}
