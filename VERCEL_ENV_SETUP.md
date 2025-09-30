# 🔧 Configuración de Variables de Entorno en Vercel

## Pasos para configurar en Vercel Dashboard:

### 1. Ve a tu proyecto en Vercel
- URL: https://vercel.com/dashboard
- Selecciona: `tienda-majoe`

### 2. Configurar Variables de Entorno
- Ve a: **Settings** → **Environment Variables**

### 3. Agregar estas variables:

#### Variable 1: MONGODB_URI
```
Name: MONGODB_URI
Value: mongodb+srv://joeladino46_db_user:123456789Fofo_@cluster0.kp6rmpp.mongodb.net/majoe_store?retryWrites=true&w=majority&appName=Cluster0
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: NODE_ENV
```
Name: NODE_ENV
Value: production
Environments: ✅ Production
```

### 4. Redeploy
- Click en **"Redeploy"** después de agregar las variables
- O haz un nuevo commit para triggear deploy automático

## ✅ Resultado Esperado:
- ✅ Panel principal carga sin errores
- ✅ Admin panel funciona correctamente
- ✅ Base de datos conectada en producción

## 🚨 Importante:
- NUNCA subas el archivo .env a GitHub
- Las variables están seguras en Vercel
- Solo tú tienes acceso a estas credenciales
