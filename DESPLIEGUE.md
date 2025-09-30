# 🚀 Guía de Despliegue en Producción - Majoe Store

## 📋 **Opciones de Despliegue**

### 🥇 **Opción 1: Vercel (Recomendada - Gratis)**
La más fácil y rápida para Next.js

### 🥈 **Opción 2: Netlify (Alternativa Gratis)**
Excelente para sitios estáticos

### 🥉 **Opción 3: Railway/Heroku (Con Base de Datos)**
Para cuando agregues backend

---

## 🚀 **DESPLIEGUE EN VERCEL (Paso a Paso)**

### **Paso 1: Preparar el Proyecto**

1. **Crear repositorio en GitHub:**
   ```bash
   # Si no tienes Git inicializado
   git init
   git add .
   git commit -m "Initial commit - Majoe Store"
   
   # Crear repositorio en GitHub y conectar
   git remote add origin https://github.com/TU_USUARIO/majoe-store.git
   git push -u origin main
   ```

2. **Optimizar para producción:**
   ```bash
   # Verificar que el build funcione
   npm run build
   ```

### **Paso 2: Desplegar en Vercel**

1. **Ir a [vercel.com](https://vercel.com)**
2. **Crear cuenta** (usa tu GitHub)
3. **Hacer clic en "New Project"**
4. **Importar tu repositorio** de GitHub
5. **Configurar proyecto:**
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

6. **Variables de entorno** (si las necesitas):
   ```
   NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
   ```

7. **Hacer clic en "Deploy"** ✨

### **Paso 3: Configurar Dominio Personalizado**

1. **En el dashboard de Vercel:**
   - Ve a tu proyecto → Settings → Domains
   - Agregar dominio personalizado: `majoe.com`

2. **Configurar DNS** (en tu proveedor de dominio):
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

---

## 🔧 **CONFIGURACIÓN AVANZADA**

### **1. Optimización de Imágenes**

Actualizar `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      }
    ],
  },
  // Optimización para producción
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}

module.exports = nextConfig
```

### **2. Variables de Entorno de Producción**

Crear `.env.production`:
```bash
NEXT_PUBLIC_SITE_URL=https://majoe.com
NEXT_PUBLIC_ADMIN_PASSWORD=tu_password_seguro
NEXT_PUBLIC_ANALYTICS_ID=tu_google_analytics_id
```

### **3. Configurar Redirects y Headers**

En `next.config.js`:
```javascript
const nextConfig = {
  // ... configuración anterior
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
  
  async redirects() {
    return [
      {
        source: '/productos',
        destination: '/men',
        permanent: true,
      },
    ]
  },
}
```

---

## 📊 **MONITOREO Y ANALYTICS**

### **1. Google Analytics**

Agregar a `app/layout.tsx`:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### **2. Vercel Analytics**

```bash
npm install @vercel/analytics
```

En `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🛡️ **SEGURIDAD**

### **1. Configurar HTTPS**
Vercel lo hace automáticamente ✅

### **2. Proteger Panel de Admin**

Crear middleware `middleware.ts`:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Proteger rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('admin_authenticated')
    
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
```

---

## 📈 **OPTIMIZACIÓN DE RENDIMIENTO**

### **1. Lazy Loading**

En componentes:
```typescript
import dynamic from 'next/dynamic'

const ProductGrid = dynamic(() => import('@/components/ProductGrid'), {
  loading: () => <div>Cargando productos...</div>
})
```

### **2. Optimización de Fuentes**

En `app/layout.tsx`:
```typescript
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
})
```

---

## 🔄 **CI/CD AUTOMÁTICO**

### **Configuración Automática con Vercel:**

1. **Cada push a `main`** → Deploy automático a producción
2. **Pull requests** → Deploy de preview automático
3. **Rollback** → Un clic en Vercel dashboard

### **Configurar Branch Protection:**

En GitHub:
1. Settings → Branches
2. Add rule para `main`
3. ✅ Require pull request reviews
4. ✅ Require status checks to pass

---

## 🎯 **CHECKLIST PRE-DESPLIEGUE**

### **✅ Técnico:**
- [ ] `npm run build` funciona sin errores
- [ ] Todas las imágenes cargan correctamente
- [ ] Links internos funcionan
- [ ] Responsive en móvil/tablet/desktop
- [ ] Panel de admin protegido
- [ ] Variables de entorno configuradas

### **✅ SEO:**
- [ ] Meta tags configurados
- [ ] Sitemap.xml generado
- [ ] robots.txt configurado
- [ ] Open Graph tags
- [ ] Favicon agregado

### **✅ UX:**
- [ ] Tiempos de carga < 3 segundos
- [ ] Formularios funcionan
- [ ] Carrito de compras funcional
- [ ] Navegación intuitiva
- [ ] Mensajes de error claros

---

## 🚀 **COMANDOS RÁPIDOS**

```bash
# Preparar para producción
npm run build
npm run start

# Verificar optimización
npm run lint
npm audit

# Deploy manual (si usas CLI)
vercel --prod

# Verificar sitio
curl -I https://tu-dominio.com
```

---

## 🎉 **¡LISTO!**

Tu tienda **Majoe** estará disponible en:
- **URL temporal:** `https://majoe-store-xxx.vercel.app`
- **Dominio personalizado:** `https://majoe.com`

### **Panel de Admin:**
- **URL:** `https://tu-dominio.com/admin`
- **Usuario:** `admin`
- **Contraseña:** `majoe2024`

---

## 📞 **Soporte Post-Despliegue**

### **Monitoreo:**
- Vercel Dashboard para métricas
- Google Analytics para tráfico
- Vercel Analytics para performance

### **Mantenimiento:**
- Updates automáticos con git push
- Backup automático en GitHub
- Rollback en 1 clic

**¡Tu tienda está lista para conquistar el mundo! 🌟**
