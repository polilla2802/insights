# ConSearch — Experiencias CDMX

Plataforma open source para descubrir restaurantes, museos, tours y eventos en la Ciudad de México, organizados por alcaldía. Incluye mapa interactivo con datos de densidad por zona, sistema de reservas y métricas urbanas.

![SvelteKit](https://img.shields.io/badge/SvelteKit-2.x-FF3E00?style=flat-square&logo=svelte)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=flat-square&logo=prisma)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## Tabla de contenidos

- [Vista general](#vista-general)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Configuración del entorno](#configuración-del-entorno)
- [Base de datos](#base-de-datos)
- [Firebase](#firebase)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Componentes](#componentes)
- [Modelo de datos](#modelo-de-datos)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## Vista general

ConSearch segmenta la Ciudad de México por sus 16 alcaldías y expone experiencias curadas de gastronomía, cultura, turismo y actividades. Las funcionalidades principales son:

- **Mapa interactivo** — choropleth por densidad de experiencias con popups de detalle
- **Explorador por alcaldía** — filtros por tipo de experiencia y búsqueda en tiempo real
- **Tarjetas de experiencia** — imagen, rating, precio, duración y botón de reserva
- **Panel de métricas** — índice de seguridad, afluencia turística y zonas de interés
- **Sistema de reservas** — modelo relacional completo (pendiente → confirmada → completada)
- **Soporte i18n** — español / inglés vía `svelte-i18n`

---

## Stack tecnológico

| Categoría | Librería / Servicio | Versión |
|---|---|---|
| Framework | [SvelteKit](https://svelte.dev/docs/kit) | ^2.57 |
| UI runtime | [Svelte 5](https://svelte.dev) | ^5.55 |
| Lenguaje | [TypeScript](https://www.typescriptlang.org) | ^5.0 |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com) | ^4.2 |
| ORM | [Prisma](https://www.prisma.io) | ^6.19 |
| Base de datos | [CockroachDB](https://www.cockroachlabs.com) | — |
| Auth / Storage | [Firebase](https://firebase.google.com) | ^12 |
| Admin SDK | [Firebase Admin](https://firebase.google.com/docs/admin/setup) | ^13 |
| Mapas | [Leaflet](https://leafletjs.com) | ^1.9 |
| Iconos | [@iconify/svelte](https://iconify.design) | ^5.2 |
| i18n | [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | ^4.0 |
| Build | [Vite](https://vite.dev) | ^8.0 |
| Env | [dotenv-cli](https://github.com/entropitor/dotenv-cli) | ^11 |
| Linter | [Prettier](https://prettier.io) + prettier-plugin-svelte | ^3.8 |

---

## Requisitos previos

Asegúrate de tener instalado lo siguiente antes de clonar el repositorio:

- **Node.js** ≥ 20 — [descargar](https://nodejs.org)
- **npm** ≥ 10 (incluido con Node)
- Una instancia de **CockroachDB** (local o en la nube — ver sección [Base de datos](#base-de-datos))
- Un proyecto de **Firebase** con Authentication y Firestore habilitados (opcional para correr en modo demo)

Verifica tu versión de Node:

```bash
node -v   # debe mostrar v20.x.x o superior
npm -v    # debe mostrar 10.x.x o superior
```

---

## Configuración del entorno

El proyecto usa archivos `.env` separados para desarrollo y producción gestionados con `dotenv-cli`. Los archivos `.env.*` están en `.gitignore` por seguridad.

### 1. Copia la plantilla de entorno

```bash
cp .env.example .env.development
```

### 2. Rellena las variables

Abre `.env.development` y completa cada valor:

```env
# ── Base de datos ──────────────────────────────────────────────
# Cadena de conexión a CockroachDB (incluye usuario, contraseña, cluster y base de datos)
DATABASE_URL='postgresql://usuario:contraseña@host:26257/ConSearch?sslmode=verify-full'

# ── Entorno ────────────────────────────────────────────────────
APP_ENV=development

# ── Servidor de desarrollo ─────────────────────────────────────
VITE_PORT=5173

# ── Firebase (cliente) ─────────────────────────────────────────
# Obtenlos en: Firebase Console → Configuración del proyecto → Tus apps → SDK de la Web
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""

# ── Firebase Admin (servidor) ──────────────────────────────────
# JSON de la cuenta de servicio (comprimido en una sola línea)
# Obtenlo en: Firebase Console → Configuración → Cuentas de servicio → Generar nueva clave privada
FIREBASE_ADMIN_CREDENTIALS=
```

Para producción repite el proceso con `.env.production`.

> **Nota:** nunca subas archivos `.env.*` con credenciales reales al repositorio.

---

## Base de datos

El proyecto usa **CockroachDB** como motor SQL distribuido a través de **Prisma ORM**.

### Opción A — CockroachDB Serverless (recomendado para empezar)

1. Crea una cuenta gratuita en [cockroachlabs.com](https://www.cockroachlabs.com/free-tier/)
2. Crea un cluster serverless
3. En el panel del cluster copia la **Connection string** en formato PostgreSQL
4. Pégala en `DATABASE_URL` de tu `.env.development`

### Opción B — Docker local

```bash
docker run -d \
  --name cockroach \
  -p 26257:26257 -p 8080:8080 \
  cockroachdb/cockroach:latest start-single-node --insecure

# Crea la base de datos
docker exec -it cockroach ./cockroach sql --insecure \
  -e "CREATE DATABASE ConSearch;"
```

`DATABASE_URL` para esta opción:
```
postgresql://root@localhost:26257/ConSearch?sslmode=disable
```

### Migraciones y generación del cliente

```bash
# Genera el Prisma Client (necesario antes de npm run dev)
npm run prisma:generate:dev

# Aplica las migraciones (crea las tablas)
npm run prisma:migrate:dev

# (Opcional) Carga datos de prueba
npm run prisma:seed:dev
```

---

## Firebase

Firebase se usa para autenticación de usuarios y almacenamiento de archivos. Para correr la app en **modo demo** (solo datos mock) puedes omitir esta configuración — el mapa y las vistas de experiencias funcionan sin Firebase.

### Configurar un proyecto de Firebase

1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Crea un nuevo proyecto
3. Activa **Authentication** → Método de inicio de sesión: Email/contraseña (o Google)
4. En **Configuración del proyecto → General → Tus apps** registra una app web y copia las credenciales a tu `.env.development`
5. En **Configuración → Cuentas de servicio** genera una clave privada, abre el JSON descargado, minifícalo y pégalo en `FIREBASE_ADMIN_CREDENTIALS`

---

## Instalación y ejecución

```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/ConSearch-cdmx.git
cd ConSearch-cdmx

# 2. Instala las dependencias
npm install

# 3. Copia y completa el archivo de entorno (ver sección anterior)
cp .env.example .env.development

# 4. Genera el cliente de Prisma
npm run prisma:generate:dev

# 5. Aplica las migraciones
npm run prisma:migrate:dev

# 6. Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run check` | Type-check con `svelte-check` |
| `npm run check:watch` | Type-check en modo observador |
| `npm run lint` | Verifica formato con Prettier |
| `npm run format` | Aplica formato automático |
| `npm run prisma:generate:dev` | Genera el Prisma Client (dev) |
| `npm run prisma:generate:prod` | Genera el Prisma Client (prod) |
| `npm run prisma:migrate:dev` | Crea y aplica migraciones (dev) |
| `npm run prisma:migrate:prod` | Aplica migraciones en producción |
| `npm run prisma:pull:dev` | Sincroniza schema desde la BD (dev) |
| `npm run prisma:reset:dev` | Resetea la BD de desarrollo |
| `npm run prisma:seed:dev` | Carga datos de prueba (dev) |

---

## Estructura del proyecto

```
ConSearch-cdmx/
├── prisma/
│   └── schema.prisma          # Modelos de base de datos
├── src/
│   ├── lib/
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── AlcaldiaCard.svelte
│   │   │   ├── BottomNav.svelte
│   │   │   ├── ExperienceCard.svelte
│   │   │   ├── FilterPills.svelte
│   │   │   ├── Hero.svelte
│   │   │   ├── MapSidePanel.svelte
│   │   │   ├── MapView.svelte
│   │   │   ├── MetricCard.svelte
│   │   │   ├── Navbar.svelte
│   │   │   └── SearchBar.svelte
│   │   ├── data/
│   │   │   ├── cdmx-geo.ts    # Polígonos y centroides de las 16 alcaldías
│   │   │   └── mock.ts        # Datos de ejemplo (alcaldías, categorías, experiencias)
│   │   ├── firebase/
│   │   │   └── index.ts       # Inicialización de Firebase
│   │   └── i18n/
│   │       └── index.ts       # Configuración de svelte-i18n
│   ├── locales/
│   │   ├── en.json            # Traducciones en inglés
│   │   └── es.json            # Traducciones en español
│   ├── routes/
│   │   ├── +layout.svelte     # Layout global (Navbar + BottomNav)
│   │   ├── +page.svelte       # Landing page
│   │   ├── alcaldias/
│   │   │   ├── +page.svelte           # Grid de todas las alcaldías
│   │   │   └── [slug]/+page.svelte    # Experiencias por alcaldía
│   │   ├── experiencias/
│   │   │   ├── +page.svelte           # Listado con filtros y búsqueda
│   │   │   └── [id]/+page.svelte      # Detalle de experiencia + reserva
│   │   └── mapa/
│   │       └── +page.svelte           # Mapa interactivo de la CDMX
│   ├── app.css                # Design tokens y utilidades Tailwind
│   ├── app.d.ts               # Tipos globales de SvelteKit
│   └── app.html               # Template HTML raíz
├── static/                    # Archivos estáticos (favicon, imágenes)
├── .env.example               # Plantilla de variables de entorno
├── svelte.config.js           # Configuración de SvelteKit
├── tailwind.config.ts         # Configuración de Tailwind CSS
├── tsconfig.json              # Configuración de TypeScript
└── vite.config.ts             # Configuración de Vite
```

---

## Rutas de la aplicación

| Ruta | Descripción |
|---|---|
| `/` | Landing page con hero, métricas urbanas, alcaldías y experiencias destacadas |
| `/experiencias` | Listado completo con búsqueda y filtros por alcaldía y categoría |
| `/experiencias/[id]` | Detalle de experiencia con panel de reserva |
| `/alcaldias` | Grid de las 16 alcaldías de la CDMX |
| `/alcaldias/[slug]` | Experiencias filtradas por alcaldía |
| `/mapa` | Mapa interactivo con choropleth por densidad y panel lateral |

---

## Componentes

| Componente | Descripción |
|---|---|
| `Navbar` | Barra de navegación superior, responsiva |
| `BottomNav` | Navegación inferior para móvil (solo visible en pantallas pequeñas) |
| `Hero` | Sección hero del landing con CTA configurable |
| `SearchBar` | Input de búsqueda con icono |
| `FilterPills` | Chips horizontales scrollables para filtros |
| `ExperienceCard` | Tarjeta con imagen, badge de tipo, rating, precio y botón Reservar |
| `AlcaldiaCard` | Tarjeta compacta con gradiente para el grid de alcaldías |
| `MetricCard` | Card de métrica urbana con variantes: seguridad, turismo, zonas de interés |
| `MapView` | Mapa Leaflet SSR-safe con polígonos por alcaldía, choropleth y markers de precio |
| `MapSidePanel` | Panel lateral deslizable con lista de experiencias de la alcaldía seleccionada |

---

## Modelo de datos

```
Alcaldia ──< Experiencia >── Categoria
                 │
                 └──< Reserva >── Usuario
```

| Modelo | Campos clave |
|---|---|
| `Alcaldia` | nombre, slug, descripcion, imagen, lat, lng |
| `Categoria` | nombre, slug, icono |
| `Experiencia` | titulo, descripcion, precio, duracion, tipo, imagen, rating, destacada |
| `Usuario` | nombre, email, foto, rol (`VISITANTE` / `HOST` / `ADMIN`) |
| `Reserva` | fecha, personas, total, estado (`PENDIENTE` → `CONFIRMADA` → `COMPLETADA`) |

Enums disponibles: `TipoExperiencia` (RESTAURANTE, MUSEO, EVENTO, TOUR, ACTIVIDAD), `Rol`, `EstadoReserva`.

---

## Contribuir

¡Las contribuciones son bienvenidas! Por favor sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/mi-feature`
3. Haz commit de tus cambios: `git commit -m 'feat: agrega mi feature'`
4. Haz push a la rama: `git push origin feature/mi-feature`
5. Abre un Pull Request

Por favor asegúrate de que tu código pase `npm run check` y `npm run lint` antes de abrir un PR.

---

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

```
MIT License — Copyright (c) 2025 ConSearch CDMX Contributors
```

Puedes usar, copiar, modificar, distribuir y sublicenciar este software libremente, con o sin modificaciones, siempre que incluyas el aviso de copyright original.
