# 🛍️ Majoe - Tienda de Ropa Premium

Una tienda web moderna y elegante desarrollada con las últimas tecnologías web. Diseñada con un enfoque en UX/UI excepcional y funcionalidad completa de e-commerce.

## ✨ Características Principales

### 🎨 Diseño y UX
- **Diseño futurista y moderno** con gradientes y efectos visuales
- **Totalmente responsive** - optimizado para móvil, tablet y desktop
- **Animaciones fluidas** con Framer Motion
- **Tipografías elegantes** (Inter + Space Grotesk)
- **Paleta de colores profesional** diseñada por expertos
- **Efectos glassmorphism** y elementos interactivos

### 🛒 Funcionalidades de E-commerce
- **Catálogo completo** con categorías (Hombres/Mujeres)
- **Páginas de producto detalladas** con galería de imágenes
- **Sistema de carrito** completo con persistencia
- **Selección de tallas y colores** intuitiva
- **Filtros y ordenamiento** avanzados
- **Gestión de stock** en tiempo real
- **Productos destacados y ofertas** especiales

### 🔧 Tecnologías Utilizadas
- **Frontend:** Next.js 14, React 18, TypeScript
- **Estilos:** Tailwind CSS con configuración personalizada
- **Animaciones:** Framer Motion
- **Estado:** Zustand para gestión del carrito
- **UI Components:** Headless UI
- **Iconos:** Heroicons
- **Imágenes:** Next.js Image con optimización automática

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd TiendaWEB
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Comandos disponibles

```bash
# Desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm run start

# Linting
npm run lint
```

## 📱 Características Responsive

### Mobile First Design
- **Navegación móvil** con menú hamburguesa animado
- **Carrito lateral** optimizado para touch
- **Grids adaptativos** que se ajustan automáticamente
- **Imágenes optimizadas** para diferentes densidades de pantalla

### Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px  
- **Desktop:** > 1024px

## 🎯 Estructura del Proyecto

```
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── men/               # Categoría hombres
│   ├── women/             # Categoría mujeres
│   ├── product/[id]/      # Páginas de producto dinámicas
│   ├── new/               # Productos nuevos
│   └── sale/              # Ofertas especiales
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Navegación principal
│   ├── Footer.tsx         # Pie de página
│   ├── Cart.tsx           # Carrito de compras
│   └── ProductGrid.tsx    # Grid de productos
├── store/                 # Gestión de estado
│   └── cart.ts            # Store del carrito (Zustand)
├── data/                  # Datos estáticos
│   └── products.json      # Catálogo de productos
├── types/                 # Definiciones TypeScript
│   └── index.ts           # Tipos principales
└── public/                # Archivos estáticos
```

## 🎨 Sistema de Diseño

### Colores Principales
- **Primary:** Azules (#0ea5e9 - #0c4a6e)
- **Accent:** Violetas/Magentas (#d946ef - #701a75)
- **Dark:** Grises oscuros (#0f172a - #64748b)

### Tipografías
- **Display:** Space Grotesk (títulos y encabezados)
- **Body:** Inter (texto general)

### Componentes Reutilizables
- **Botones:** `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- **Tarjetas:** `.card` con efectos hover
- **Badges:** `.badge-new`, `.badge-sale`
- **Inputs:** `.input` con focus states

## 🛒 Funcionalidades del Carrito

### Estado Persistente
- Mantiene productos entre sesiones
- Actualización en tiempo real
- Cálculos automáticos de totales

### Operaciones Disponibles
- ✅ Agregar productos con talla y color
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Vaciar carrito completo
- ✅ Mostrar/ocultar carrito lateral

## 📊 Gestión de Productos

### Estructura de Datos
```typescript
interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: 'men' | 'women'
  subcategory: string
  images: string[]
  sizes: Size[]
  colors: Color[]
  stock: number
  featured?: boolean
  isNew?: boolean
  onSale?: boolean
}
```

### Características
- **Múltiples imágenes** por producto
- **Variantes de color y talla** con disponibilidad
- **Gestión de stock** automática
- **Precios con descuentos** calculados
- **Categorización** flexible

## 🔮 Próximas Mejoras

### Backend Integration
- [ ] API REST para productos
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Sistema de pagos (Stripe/PayPal)

### Funcionalidades Adicionales
- [ ] Lista de deseos
- [ ] Reseñas y calificaciones
- [ ] Búsqueda avanzada
- [ ] Recomendaciones personalizadas
- [ ] Chat en vivo

### Optimizaciones
- [ ] PWA (Progressive Web App)
- [ ] Carga lazy de imágenes
- [ ] Cache de productos
- [ ] Analytics integrado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Desarrollado por

**Majoe Team** - Especialistas en desarrollo web y e-commerce

---

⭐ ¡Si te gusta este proyecto, no olvides darle una estrella!

🚀 **¡Listo para revolucionar el e-commerce!**

