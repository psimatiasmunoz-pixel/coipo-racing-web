<!-- IMPORTANT: Replace with your own Supabase project URL -->
<a href="https://vercel.com/new/clone?repository-url=https://github.com/YOUR_REPO/coipo-racing-web&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_WHATSAPP_NUMBER&envDescription=Credenciales%20de%20Supabase%20y%20WhatsApp&project-name=coipo-racing-web">
  <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
</a>

# Coipo Racing Web

Catálogo web profesional para Coipo Racing, orientado a la exhibición de suplementos deportivos, gestión de productos y conversión comercial a través de WhatsApp.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth + Storage)

## Variables de entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://oymcmwoatjxvzsiukomu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=56965967077
```

## Instalación

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
```

Deploy en Vercel conectando el repositorio de GitHub.
