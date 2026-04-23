# 🏁 Coipo Racing - Suplementos Deportivos

Plataforma de catálogo digital de alto rendimiento para **Coipo Racing**, enfocada en suplementos deportivos y nutrición. Este proyecto actúa como una vitrina digital premium que se integra con WhatsApp para transacciones directas y utiliza WooCommerce como un Headless CMS (Panel de control oculto) para la gestión del inventario.

---

## 🏗️ Arquitectura Técnica

### 1. Frontend (Lo que ve el usuario)
- **Framework**: Next.js 14+ (App Router)
- **Estilos**: Tailwind CSS con un sistema de diseño "Premium" (rojo `#be1e2d`, negros profundos y glassmorphism)
- **Lenguaje**: TypeScript para máxima seguridad y autocompletado en el desarrollo.
- **Iconografía**: `lucide-react` para iconos modernos y ligeros.
- **Alojamiento**: Desplegado activamente bajo la plataforma de **Vercel** (`coipo-racing-nextjs.vercel.app`).

### 2. Backend & Gestión (Lo que usa el administrador)
- **Sistema Base**: WordPress con la extensión de WooCommerce operando como **Headless CMS**.
- **Conexión**: El catálogo de Next.js consume, renderiza y cachea autónomamente los datos gracias a la **WooCommerce REST API v3**.
- **Seguridad**: Todas las dependencias (como Supabase Legacy) se han resguardado correctamente para futuras actualizaciones.
- **Base de Datos Original**: Originalmente conectado a una base de datos PostgreSQL mediante **Supabase** (que sigue configurado para uso secundario o paneles nativos de administración en `/admin`).

---

## 🔥 Funcionalidades Clave

* **Diseño Orientado a Conversión**: Rediseño visual agresivo e impactante de alto contraste (basado en la Propuesta Comercial).
* **Catálogo en Tiempo Real**: Lista de productos agrupados por categorías e indicadores de "*Top Ventas*" o "*Agotado*".
* **Filtros Dinámicos**: Los usuarios pueden ordenar y filtrar productos de inmediato (Proteínas, Creatinas, etc.).
* **Generador de WhatsApp Mágico**: Cada producto del catálogo tiene un botón de compra que arma automáticamente un mensaje personalizable pre-rellenado para que el cliente contacte al dueño instantáneamente con intención de compra real. Ej: 
  👉 *"Hola Coipo Racing 🏁 Me interesa el producto: Proteína Whey Coipo. ¿Está disponible y cuál es el precio? 💪"*
* **Botón Flotante Global**: Un contacto omnipresente de WhatsApp para dudas comerciales generales.

---

## 💻 Entorno Local y Despliegue

### Requisitos Mínimos
* Node.js v18+
* Gestor de paquetes npm o yarn.

### Instalación Local
1. Clonar el repositorio.
2. Instalar dependencias con:
   ```bash
   npm install
   ```
3. Configurar el archivo de variables entorno `.env.local` con las claves base (Se deben pedir a la administración):
   ```env
   # Backend WordPress (Actual Catálogo Activo)
   WORDPRESS_URL=https://tu-wordpress.com
   WC_CONSUMER_KEY=ck_XXXXXXXXXXXXXXXXX
   WC_CONSUMER_SECRET=cs_XXXXXXXXXXXXXXXXX

   # Backend Supabase (Legacy / Opcional Server-Side)
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_anonima_jwt

   # Contacto
   NEXT_PUBLIC_WHATSAPP_NUMBER=56965967077
   ```
4. Correr servidor de desarrollo con visualización activa:
   ```bash
   npm run dev
   ```

### Desplegar en Producción (Vercel)
Se automatiza todo *push* que sube a la rama `main` en GitHub. Si necesitas inyectarlo forzosamente vía Terminal:
```bash
vercel deploy --prod
```

---

*Proyecto diseñado y desarrollado en el marco de la Propuesta Comercial "Despliegue de Sitio Web Catálogo y Panel Administrador".*
