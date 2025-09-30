# Configuración de Variables de Entorno

## Paso 1: Crear archivo .env

Crea un archivo llamado `.env` (sin extensión) en la raíz del proyecto con este contenido:

```env
MONGODB_URI=mongodb+srv://joeladino46_db_user:123456789Fofo_@cluster0.kp6rmpp.mongodb.net/majoe_store?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
```

## Paso 2: Para Producción

Cuando despliegues en producción (Vercel, Netlify, etc.), agrega estas variables en la configuración:

### Vercel:
1. Ve a tu proyecto en vercel.com
2. Settings → Environment Variables
3. Agrega:
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://joeladino46_db_user:123456789Fofo_@cluster0.kp6rmpp.mongodb.net/majoe_store?retryWrites=true&w=majority&appName=Cluster0`
   - Name: `NODE_ENV`
   - Value: `production`

### Netlify:
1. Site settings → Environment variables
2. Agrega las mismas variables

## Paso 3: Verificar

Ejecuta tu aplicación:
```bash
npm run dev
```

Deberías ver en la consola:
```
=== Environment Status ===
NODE_ENV: development
MONGODB_URI: ✓ Set
✓ Environment validation passed
========================
```

## Paso 4: Probar Admin Panel

1. Ve a http://localhost:3000/admin
2. Usuario: admin
3. Contraseña: majoe2024

Si todo está bien configurado, el panel debería cargar sin errores.
