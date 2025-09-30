# 🚀 Guía de Instalación - Majoe Store

## ⚠️ Prerrequisitos

Antes de instalar el proyecto, necesitas tener instalado **Node.js** en tu sistema.

### 📥 Instalar Node.js

1. **Descargar Node.js:**
   - Ve a [https://nodejs.org](https://nodejs.org)
   - Descarga la versión **LTS** (recomendada)
   - Ejecuta el instalador y sigue las instrucciones

2. **Verificar instalación:**
   ```bash
   node --version
   npm --version
   ```

## 🛠️ Instalación del Proyecto

### Opción 1: Instalación Automática (Recomendada)

**En Windows:**
```cmd
install.bat
```

**En Mac/Linux:**
```bash
chmod +x install.sh
./install.sh
```

### Opción 2: Instalación Manual

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 🎯 Comandos Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Construir para producción
npm run build

# Ejecutar versión de producción
npm run start

# Verificar código (linting)
npm run lint
```

## ✅ Verificación de la Instalación

Si todo está correcto, deberías ver:

1. **Terminal mostrando:**
   ```
   ▲ Next.js 14.0.0
   - Local:        http://localhost:3000
   - ready in 2.3s
   ```

2. **Navegador mostrando:**
   - Página principal de Majoe
   - Header con logo y navegación
   - Productos en grid responsive
   - Footer completo

## 🔧 Solución de Problemas

### Error: "npm no se reconoce como comando"
- **Solución:** Instalar Node.js desde [nodejs.org](https://nodejs.org)
- Reiniciar la terminal después de la instalación

### Error: "Cannot find module"
- **Solución:** Ejecutar `npm install` nuevamente
- Verificar que el archivo `package.json` existe

### Puerto 3000 ocupado
- **Solución:** El proyecto se ejecutará automáticamente en el siguiente puerto disponible
- O usar: `npm run dev -- -p 3001`

### Problemas con dependencias
```bash
# Limpiar cache y reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🌐 URLs Importantes

Una vez instalado, podrás acceder a:

- **Inicio:** http://localhost:3000
- **Hombres:** http://localhost:3000/men  
- **Mujeres:** http://localhost:3000/women
- **Nuevos:** http://localhost:3000/new
- **Ofertas:** http://localhost:3000/sale
- **Producto ejemplo:** http://localhost:3000/product/1

## 📱 Prueba la Responsividad

1. **Desktop:** Pantalla completa
2. **Tablet:** Redimensiona a ~768px
3. **Mobile:** Redimensiona a ~375px

O usa las herramientas de desarrollador del navegador (F12 > Toggle device toolbar)

## 🎨 Personalización

### Colores
Edita `tailwind.config.js` para cambiar la paleta de colores.

### Productos
Modifica `data/products.json` para agregar/editar productos.

### Estilos
Personaliza `app/globals.css` para cambios globales de estilo.

## 🚀 ¡Listo!

Si seguiste todos los pasos correctamente, ahora tienes una tienda web moderna y completamente funcional ejecutándose en tu máquina local.

**¡Disfruta explorando Majoe Store!** 🛍️✨

