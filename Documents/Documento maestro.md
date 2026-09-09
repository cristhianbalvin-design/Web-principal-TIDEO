# Documento Maestro — Web Principal TIDEO Tech & Strategy

> **Repositorio:** `cristhianbalvin-design/Web-principal-TIDEO`
> **Dominio de producción:** `www.tideo.tech`
> **Tipo de documento:** Documentación técnica, funcional y de negocio integral
> **Última actualización de este documento:** Actualizado con la integración completa del widget Calendly inline, resolución de bugs de CORS y deduplicación de leads, y lecciones operativas de infraestructura y control de versiones.

---

## Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Contexto de negocio y posicionamiento de marca](#2-contexto-de-negocio-y-posicionamiento-de-marca)
3. [Arquitectura técnica y stack tecnológico](#3-arquitectura-técnica-y-stack-tecnológico)
4. [Estructura del repositorio](#4-estructura-del-repositorio)
5. [Rutas y páginas](#5-rutas-y-páginas)
6. [Sistema de diseño (Design System)](#6-sistema-de-diseño-design-system)
7. [Componentes de la página principal (`site/`)](#7-componentes-de-la-página-principal-site)
8. [Módulo estrella: Diagnóstico Digital Interactivo](#8-módulo-estrella-diagnóstico-digital-interactivo)
9. [Backend e integraciones (Supabase Edge Functions)](#9-backend-e-integraciones-supabase-edge-functions)
10. [Formulario de contacto](#10-formulario-de-contacto)
11. [Infraestructura de servidor (SSR / manejo de errores)](#11-infraestructura-de-servidor-ssr--manejo-de-errores)
12. [Variables de entorno requeridas](#12-variables-de-entorno-requeridas)
13. [Scripts y flujo de desarrollo local](#13-scripts-y-flujo-de-desarrollo-local)
14. [Despliegue e infraestructura](#14-despliegue-e-infraestructura)
15. [SEO y metadatos](#15-seo-y-metadatos)
16. [Tono de voz y lineamientos de contenido](#16-tono-de-voz-y-lineamientos-de-contenido)
17. [Estado actual, deuda técnica y pendientes](#17-estado-actual-deuda-técnica-y-pendientes)
18. [Glosario](#18-glosario)

---

## 1. Resumen ejecutivo

`Web-principal-TIDEO` es el código fuente de la **web comercial institucional** de **TIDEO Tech & Strategy**, una firma de transformación digital orientada a empresas medianas de Latinoamérica. El sitio combina:

- Una **landing page premium** de una sola página (`/`) con estética *dark editorial*, construida para posicionar a TIDEO como una firma de estrategia y tecnología (no como una agencia de software genérica).
- Una **landing dedicada para OPERA** (`/opera` a través de `opera.tideo.tech`) para vender el ERP como producto, integrada isomórficamente en el mismo proyecto.
- Un **formulario de contacto** (`/contacto`) conectado a un backend serverless.
- Un **módulo de diagnóstico digital interactivo** (el activo más sofisticado del proyecto): un cuestionario tipo "radar de madurez digital" que evalúa 10 áreas del negocio del visitante, calcula un puntaje de madurez y genera —vía la API de Anthropic (Claude)— un diagnóstico personalizado en lenguaje natural, con recomendación de servicios TIDEO. El resultado se envía por correo (Resend) y opcionalmente se reenvía a un CRM/automatización externa vía webhook de Make.

El proyecto está construido con **React 19 + TanStack Start (SSR) + Vite 7 + Tailwind CSS v4**, fue **generado y es mantenido con Lovable.dev** (`@lovable.dev/vite-tanstack-config`), y tiene configuración de despliegue dual: **Cloudflare Workers** (`wrangler.jsonc`) y **Vercel** (`vercel.json`). El backend de lógica de negocio (envío de correos y llamado a IA) vive en **Supabase Edge Functions** (Deno), no en el propio servidor de la app.

No es (todavía, según el propio documento de dirección del proyecto): portal de alumnos, ERP SaaS, intranet ni dashboard administrativo. Es la puerta de entrada comercial y el generador de leads B2B de TIDEO.

---

## 2. Contexto de negocio y posicionamiento de marca

Esta sección resume el documento de dirección de marca y contenido incluido en el propio repositorio (`TIDEO_Web_Principal_V2_Premium.md`), que funciona como brief creativo/estratégico de la web.

### 2.1 Qué es TIDEO

TIDEO diseña, automatiza y construye soluciones digitales para empresas que necesitan ordenar su operación, integrar procesos y crecer con tecnología útil. El principio rector explícito del proyecto es:

> "El trabajo, la claridad estratégica y la prueba visual deben convencer antes que la lista de servicios."

### 2.2 Ecosistema de unidades de negocio

El código (`Ecosystem.tsx`, `get-diagnostic` Edge Function) modela **cuatro unidades** con un color de marca propio cada una (ver también sección 6, Design System):

| Unidad | Rol | Color de marca (token CSS) |
|---|---|---|
| **TIDEO Consulting** | Estrategia y arquitectura de negocio: auditoría de procesos, rediseño de flujos, ingeniería de procesos + IA. Se recomienda cuando la empresa no tiene procesos definidos ni estandarizados. | `--consulting` (verde esmeralda) |
| **TIDEO Labs** | Desarrollo ágil e ingeniería: ERPs a medida, CRMs, automatizaciones, apps internas, agentes de IA. Es la unidad "estrella" y el núcleo de la mayoría de recomendaciones. | `--labs` (cian) |
| **TIDEO Academy** | Formación y transferencia de conocimiento: talleres de IA aplicada, Power BI, Power Platform, n8n, Make. Se recomienda cuando la empresa tiene herramientas pero no las domina. | `--academy` (naranja) |
| **TIDEO Studio** | Diseño y experiencia de usuario: piezas de marketing, UX, identidad visual, con IA generativa. | `--studio` (púrpura) |

### 2.3 Mensaje central del ERP (frase ancla usada literalmente en el prompt de IA)

> "Un ERP donde el núcleo de tu operación no se adapta a un software estándar: se construye desde cero para funcionar exactamente como tu negocio genera valor."

Esta frase es tratada como **concepto de venta central** y aparece codificada de forma literal en el *system prompt* de la función `get-diagnostic` (ver sección 9.1) como regla obligatoria de redacción del diagnóstico automatizado.

### 2.4 Tono de voz

**Debe sonar:** estratégico, directo, moderno, seguro, humano, empresarial, con criterio técnico sin sonar complicado.

**No debe sonar:** genérico, como freelancer, como academia únicamente, como agencia de marketing, como consultora de solo documentos, como vendedor de herramientas sueltas.

**Frases prohibidas explícitamente** en el brief: *"ofrecemos soluciones integrales"*, *"somos una empresa líder en tecnología"*, *"soluciones personalizadas para todos los rubros"*.

Ver sección 16 para el detalle completo de lineamientos editoriales, ya que este documento resume solo lo esencial para no duplicar contenido.

### 2.5 Público objetivo

Empresas medianas (perfiles de 1 a 200+ colaboradores, segmentados explícitamente en el módulo de diagnóstico) que **"ya no quieren seguir operando con Excel, WhatsApp, correos y sistemas que no conversan entre sí"** — frase literal usada en el Hero de la home.

---

## 3. Arquitectura técnica y stack tecnológico

### 3.1 Stack principal

| Capa | Tecnología | Versión (package.json) | Notas |
|---|---|---|---|
| Framework de UI | React | ^19.2.0 | Con `react-dom` ^19.2.0 |
| Meta-framework / SSR | TanStack Start | ^1.167.50 | Renderizado en servidor + routing basado en archivos |
| Router | TanStack Router | ^1.168.25 | `routeTree.gen.ts` autogenerado |
| Data fetching / cache | TanStack Query | ^5.83.0 | `QueryClientProvider` en el root |
| Build tool | Vite | ^7.3.1 | Configurado vía `@lovable.dev/vite-tanstack-config` |
| Estilos | Tailwind CSS | ^4.2.1 | Modo `@theme inline`, variables OKLCH |
| Componentes base | Radix UI (vía shadcn/ui, estilo "new-york") | múltiples paquetes `@radix-ui/*` | Ver `components.json` |
| Iconos | lucide-react | ^0.575.0 | |
| Formularios | react-hook-form + @hookform/resolvers + zod | ^7.71 / ^5.2 / ^3.24 | Infraestructura disponible; el formulario de contacto actual usa estado nativo de React, no RHF |
| Integraciones de agenda | react-calendly | ^4.4.0 | Widget `InlineWidget` embebido en la landing de OPERA (`QualificationForm`) |
| Gráficos | recharts | ^2.15.4 | Disponible vía `components/ui/chart.tsx`, no usado activamente en el diagnóstico (el radar es SVG manual) |
| Animaciones auxiliares | tw-animate-css, embla-carousel-react, vaul | — | |
| Lenguaje | TypeScript | ^5.8.3 | `strict` vía `tsconfig.json` |
| Linting / formato | ESLint 9 (flat config) + Prettier 3 | ^9.32 / ^3.7 | `eslint.config.js` |
| Gestor de paquetes | npm (con lockfile) y Bun (con `bun.lock`) | — | Ambos lockfiles coexisten en el repo; en la práctica hay que fijar uno solo para evitar builds inconsistentes |

### 3.2 Generador / plataforma de origen

El proyecto usa `@lovable.dev/vite-tanstack-config`, lo que indica que la base del código fue creada y se sigue administrando con **Lovable** (plataforma de generación de apps con IA). El propio `vite.config.ts` advierte explícitamente:

```ts
// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
```

Esto es relevante para cualquier desarrollador nuevo: **no se debe tocar la configuración base de Vite/plugins manualmente**; solo se puede extender vía `defineConfig({ vite: { ... } })`.

### 3.3 Backend / servicios externos

El frontend **no tiene backend propio con lógica de negocio persistente** (no hay base de datos SQL propia en este repo). La lógica de negocio vive en:

| Servicio | Rol |
|---|---|
| **Supabase Edge Functions** (Deno) | 3 funciones serverless: `get-diagnostic`, `send-contact-email`, `send-diagnostic-email` |
| **API de Anthropic (Claude)** | Motor de generación del diagnóstico personalizado (modelo `claude-sonnet-4-6`, llamado desde `get-diagnostic`) |
| **Resend** | Envío de correos transaccionales (contacto y diagnóstico) |
| **Make (Integromat)** | Webhook opcional para reenviar leads de diagnóstico a un flujo de automatización externo (CRM, Sheets, etc.) |

### 3.4 Hosting / despliegue

Existen **dos configuraciones de despliegue simultáneas** en el repo, lo cual debe resolverse/documentarse como decisión de infraestructura (ver sección 14 y sección 17):

- **Cloudflare Workers** vía `wrangler.jsonc` (`main: src/server.ts`, `nodejs_compat`).
- **Vercel** vía `vercel.json` (`buildCommand: npm run build`, `outputDirectory: dist/client`).

El propio `vite.config.ts` tiene `cloudflare: false` en la configuración de Lovable, sugiriendo que el flujo activo actual prioriza Vercel, y que Cloudflare quedó configurado pero no necesariamente en uso productivo.

---

## 4. Estructura del repositorio

```text
Web-principal-TIDEO/
├── TIDEO_Web_Principal_V2_Premium.md      # Brief de marca, contenido y dirección de la web (ver sección 2 y 16)
├── research-webs-referencia.md            # Benchmark de 12 webs premium usadas como referencia de diseño
├── package.json / package-lock.json       # Dependencias (npm)
├── bun.lock                                # Dependencias (Bun) — lockfile duplicado, ver sección 17
├── components.json                        # Configuración shadcn/ui (estilo "new-york")
├── eslint.config.js                       # Lint (flat config, ESLint 9)
├── tsconfig.json                          # TypeScript config
├── vite.config.ts                         # Config de build (envuelto por Lovable)
├── vercel.json                            # Config de despliegue en Vercel
├── wrangler.jsonc                         # Config de despliegue en Cloudflare Workers
├── public/
│   ├── demo-tideo.mp4                     # Video demo mostrado en modal de "Selected Work"
│   ├── favicon*, apple-touch-icon.png, icon-192/512.png, og-image.png
│   └── site.webmanifest
├── src/
│   ├── assets/                            # Imágenes y videos del hero/preloader/footer (ver 4.1)
│   ├── components/
│   │   ├── site/                          # Componentes de la landing (Hero, Nav, Footer, etc. — sección 7)
│   │   ├── diagnostic/                    # Módulo de diagnóstico digital (sección 8)
│   │   │   ├── DiagnosticModal.tsx        # 958 líneas — componente principal, máquina de estados
│   │   │   └── data.ts                    # 414 líneas — modelo de datos, preguntas, scoring
│   │   └── ui/                            # ~45 componentes shadcn/ui + extras (3d-card, focus-cards, etc.)
│   ├── hooks/
│   │   └── use-mobile.tsx                 # Hook de detección de breakpoint móvil
│   ├── lib/
│   │   ├── utils.ts                       # Helper `cn()` (clsx + tailwind-merge)
│   │   ├── error-capture.ts               # Captura de errores no manejados para SSR
│   │   └── error-page.ts                  # HTML de página de error de fallback
│   ├── server-fns/
│   │   └── diagnostic.ts                  # Server Function de TanStack Start (llamada server-side a Supabase)
│   ├── routes/
│   │   ├── __root.tsx                     # Layout raíz, metadatos globales, manejo de 404/errores
│   │   ├── index.tsx                      # Home (`/`)
│   │   └── contacto.tsx                   # Página de contacto (`/contacto`)
│   ├── routeTree.gen.ts                   # Autogenerado por TanStack Router — no editar a mano
│   ├── router.tsx                         # Configuración del router + QueryClient
│   ├── server.ts                          # Entry point de servidor (wrapper de errores para Cloudflare/SSR)
│   ├── start.ts                           # Middleware de errores de TanStack Start
│   └── styles.css                         # Tema global (Tailwind v4, tokens OKLCH — sección 6)
└── supabase/
    └── functions/
        ├── import_map.json
        ├── get-diagnostic/index.ts        # Edge Function: genera diagnóstico con Claude (sección 9.1)
        ├── send-contact-email/index.ts    # Edge Function: correo de contacto vía Resend (sección 9.2)
        └── send-diagnostic-email/index.ts # Edge Function: correo de diagnóstico + webhook Make (sección 9.3)
```

### 4.1 Assets multimedia (`src/assets/`)

| Archivo | Peso aprox. | Uso |
|---|---|---|
| `hero-tideo-animated.webm` | ~5.8 MB | Video de fondo del Hero |
| `hero-tideo.jpg` | ~83 KB | Imagen de fondo / poster del video del Hero |
| `tideo-logo-preloader.webm` | ~4.1 MB | Video del preloader inicial de la app |
| `tideo-logo-vertical.png` | ~14 KB | Logo usado en el Footer |
| `tideo-isotipo.png` | ~9 KB | Isotipo usado en el Nav |

> **Nota de rendimiento:** los dos videos `.webm` suman cerca de 10 MB, y `public/demo-tideo.mp4` (mostrado en el modal de "Selected Work") pesa 16 MB. En conjunto son el mayor factor de peso de la página y candidatos naturales a optimización (compresión adicional, `poster` ya presente en el hero, lazy-load del modal de demo que ya se implementa al no cargar el video hasta abrir el diálogo).

---

## 5. Rutas y páginas

El proyecto usa **file-based routing** de TanStack Router. Solo existen 2 rutas de página más el layout raíz.

### 5.1 `src/routes/__root.tsx`

- Define el `<html>`, metadatos globales (`title`, `description`, Open Graph, Twitter Card, favicons, manifest) y estilos globales.
- Envuelve la app en `QueryClientProvider`.
- Renderiza el `<Preloader />` (video de marca) antes del contenido de cada página.
- Define `notFoundComponent` (404 genérico) y `errorComponent` (pantalla de error con botón "Try again" que invalida el router).

### 5.2 `src/routes/index.tsx` — Home (`/`)

Composición de la home, en este orden exacto (coincide con el orden recomendado en el brief de marca, sección 6 del documento original):

```text
Nav
└── main
    └── TracingBeam (envoltorio visual con línea de scroll animada)
        ├── Hero
        ├── TrustBar
        ├── SelectedWork      (id="trabajo")
        ├── Ecosystem         (id="ecosistema")
        ├── LabsFeature
        ├── Methodology
        ├── Differential
        ├── Insights          (id="insights")
        └── FinalCTA
Footer
DiagnosticModal (modal, se abre desde SelectedWork)
Botón flotante de WhatsApp (decorativo, sin `href` funcional — ver sección 17)
```

### 5.3 `src/routes/contacto.tsx` — Contacto (`/contacto`)

Formulario de contacto de una sola página. Ver detalle completo en sección 10.

- Soporta **prefill automático** vía `sessionStorage` (`tideo:diagnostic-contact-prefill`) cuando el usuario llega desde el diagnóstico con `?origen=diagnostico` en la URL — es el puente entre el módulo de diagnóstico y el formulario de contacto tradicional.

### 5.4 `src/routes/opera/index.tsx` — Landing de OPERA (`/opera`)

Página dedicada exclusivamente a vender el ERP "OPERA". Sirve a los dominios `opera.tideo.tech` y `www.opera.tideo.tech`.
- **Estructura de contenido:** Hero con parallax (capas de imágenes, en placeholder pendiente de maquinaria), problema del sector, qué es OPERA, tipos de operación objetivo, arquitectura ERP+MOM, diferenciador de integración nativa, comparativa vs alternativas, beneficios, pasos de implementación y un formulario final de calificación.
- **Formulario de calificación y lógica de descarte:**
  - **Campos:** Datos de contacto + tipo de operación + herramienta actual + presupuesto (>$7,000 USD: sí/no/aún no definido) + plazo de implementación.
  - **Descarte automático:** Si el presupuesto es insuficiente, el widget de Calendly se oculta y el visitante ve el mensaje de agradecimiento. El lead se envía a la API con estado `"descartado"` y un `motivo_descarte`.
  - **Manejo robusto de errores del formulario:** Se corrigió un bug donde el bloque `finally` forzaba `submitted = true` incondicionalmente, fingiendo éxito incluso si la petición fallaba en la red o por CORS. Ahora solo avanza ante respuestas HTTP exitosas (`json.success === true`), mostrando una alerta visual (`errorMessage`) con icono `AlertCircle` si ocurre cualquier fallo.
  - **Widget embebido de Calendly (`InlineWidget` de `react-calendly`):** Se sustituyó el botón que abría una pestaña externa por un calendario incrustado directamente en la página con `InlineWidget`.
  - **Transición y auto-confirmación:** Al calificar favorablemente (`isQualified === true`), la interfaz presenta durante 2.4 segundos una pantalla de confirmación ("¡Perfecto! Calificas para nuestra solución") con animación de pulso mediante `CheckCircle2` (`lucide-react`). Tras el temporizador, transiciona de forma 100% automática al calendario embebido sin requerir clic del usuario, expandiendo fluidamente el contenedor a `max-w-4xl`.
  - **Paleta visual integrada:** Parámetros `pageSettings` de Calendly alineados a la marca: fondo `060B14` (`--background`), texto `f7f8fa` (`--foreground`) y acento cian `3aced6` (`--labs`).
  - **Prellenado automático (Prefill):** Nombre y correo (`formData.nombre` y `formData.correo`) se transfieren directamente a Calendly vía prop `prefill`, eliminando la necesidad de reescribirlos.
  - **Trazabilidad única de `salesforce_uuid`:** Para la vinculación con el CRM, el `lead_id` se pasa como query parameter en la URL del widget (`?salesforce_uuid=${leadId}`). Aunque `react-calendly` admite `salesforce_uuid` dentro de su objeto `utm`, usar ambas simultáneamente provocaba duplicidad en la query string final generada por `formatCalendlyUrl`; se determinó conservar únicamente el query param en la URL base como vía canónica.
  - **Resolución de URL de Calendly:** La URL `https://calendly.com/tideo/30min` arrojaba error 404 inicialmente por un desajuste en el slug del evento configurado dentro de la cuenta de Calendly (no por fallo de código). Se corrigió en la plataforma de Calendly y el código conservó la URL estándar.
  - Todo lead entrante desde aquí tiene `fuente: "opera_landing"`.

---

## 6. Sistema de diseño (Design System)

Definido en `src/styles.css` con Tailwind CSS v4 (sintaxis `@theme inline`) y variables de color en formato **OKLCH**. `components.json` fija el estilo shadcn/ui en **"new-york"**, sin RSC, con prefijo de clases vacío.

### 6.1 Tipografía

| Token | Fuente | Uso |
|---|---|---|
| `--font-sans` | Inter (300–700) | Texto general, UI |
| `--font-serif` | Instrument Serif (itálica) | Palabras clave destacadas dentro de titulares (clase `font-serif-italic`), ej. "*negocio*", "*operar mejor*" |

Ambas se cargan vía Google Fonts en la primera línea de `styles.css`.

### 6.2 Paleta de color base (modo dark, único modo soportado activamente)

| Token | Valor OKLCH | Aproximación HEX | Uso |
|---|---|---|---|
| `--background` | `oklch(0.145 0.024 260)` | `#060B14` | Fondo base (deep navy casi negro) |
| `--foreground` | `oklch(0.97 0.005 250)` | `#F7F8FA` | Texto principal |
| `--surface` | `oklch(0.18 0.028 260)` | navy oscuro | Fondos de cards/secciones alternas |
| `--surface-elevated` | `oklch(0.22 0.035 260)` | — | Elementos elevados |
| `--hairline` | `oklch(1 0 0 / 0.08)` | blanco 8% opacidad | Bordes sutiles entre secciones/cards |
| `--primary` / `--accent` | `oklch(0.78 0.12 200)` | cian | Color de marca principal (coincide con `--labs`) |
| `--muted-foreground` | `oklch(0.7 0.02 250)` | gris pizarra | Texto secundario |
| `--destructive` | `oklch(0.62 0.22 25)` | rojo | Estados de error |

### 6.3 Colores por unidad de negocio (acentos)

| Token | Valor aprox. | Unidad |
|---|---|---|
| `--consulting` | Verde esmeralda (`oklch(0.72 0.17 145)`) | TIDEO Consulting |
| `--labs` | Cian (`oklch(0.78 0.12 200)`) | TIDEO Labs (= color primario de marca) |
| `--academy` | Naranja (`oklch(0.78 0.16 60)`) | TIDEO Academy |
| `--studio` | Púrpura (`oklch(0.6 0.22 320)`) | TIDEO Studio |

Estos 4 tokens se usan de forma consistente en `Ecosystem.tsx`, `SelectedWork.tsx` (mapa `cardColors`) e `Insights.tsx` para que cada card "herede" visualmente el color de la unidad de negocio que representa, incluso cuando el copy no la menciona explícitamente.

### 6.4 Radios, sombras y efectos

- Radio base `--radius: 0.75rem`, con variantes derivadas `sm/md/lg/xl/2xl`.
- Clases utilitarias custom relevantes usadas en componentes: `text-gradient`, `shadow-glow`, `grid-bg`, `hero-cyan-pulse`, `bg-hero`, `final-cta-gradient` — definidas en `styles.css` (no shadcn por defecto), pensadas para reforzar la estética "dark premium" pedida en el brief.

### 6.5 Componentes UI reutilizables destacados (`src/components/ui/`)

Además del set estándar de shadcn/ui (accordion, dialog, dropdown-menu, select, tabs, sidebar, etc.), el proyecto incluye componentes visuales **custom/no estándar** que vale la pena documentar aparte porque son los que le dan la identidad "premium" al sitio:

| Componente | Propósito |
|---|---|
| `tracing-beam.tsx` | Línea vertical animada que sigue el scroll, usada como envoltorio de toda la home |
| `3d-card.tsx` (`CardContainer`, `CardBody`, `CardItem`) | Efecto de tarjeta 3D con parallax al mover el mouse, usado en `Ecosystem.tsx` |
| `focus-cards.tsx` | Sistema de "focus" que atenúa/difumina las tarjetas no enfocadas al hacer hover, usado en `SelectedWork.tsx` |
| `card-hover-effect.tsx` | Efecto de highlight que sigue el cursor, usado en `Methodology.tsx` |
| `hover-border-gradient.tsx` | Botón con borde en gradiente animado al hover, usado en casi todos los CTAs (Hero, Nav, FinalCTA, LabsFeature) |
| `loader.tsx` (`LoaderOne`) | Loader mostrado durante el `Preloader` y durante la generación del diagnóstico |

---

## 7. Componentes de la página principal (`site/`)

Cada componente es una sección de la home, autocontenida, sin props obligatorias salvo `SelectedWork` (que recibe `onDiagnostic` para abrir el modal).

| Componente | Contenido / responsabilidad | Notas técnicas |
|---|---|---|
| **`Nav.tsx`** | Barra de navegación fija. Cambia de transparente a `backdrop-blur` al hacer scroll (>8px). Links a anclas (`#trabajo`, `#ecosistema`, `#insights`) y a `/contacto`. | Estado `scrolled` con listener de `scroll` pasivo |
| **`Hero.tsx`** | Sección de apertura: video de fondo en loop (`hero-tideo-animated.webm`), headline "*Tecnología que entiende tu negocio*", subheadline, doble CTA ("Ver soluciones" → ancla `#trabajo`, "Cuéntanos tu proceso" → `/contacto`) | Composición de imagen + video + gradientes de máscara para el efecto "editorial dark" |
| **`TrustBar.tsx`** | Franja de 4 métricas de confianza (10+ años, 3×, 24h, "Semanas" para MVPs) con animación de conteo al entrar en viewport | Usa `IntersectionObserver`, respeta `prefers-reduced-motion` |
| **`SelectedWork.tsx`** | Grilla de 6 "soluciones tipo" (ERP, CRM, Automatización, BI, Apps internas, IA aplicada), con efecto focus/blur y modal de video demo | Contiene el botón "Realizar diagnóstico de la empresa" que abre `DiagnosticModal` (solo en la card `01`) y el botón "Ver video" que abre un `Dialog` con `demo-tideo.mp4` |
| **`Ecosystem.tsx`** | Presenta las 4 unidades de negocio (Consulting, Labs, Academy, Studio) en cards 3D con color propio | Usa `CardContainer/CardBody/CardItem` |
| **`LabsFeature.tsx`** | Sección dedicada a TIDEO Labs como "servicio estrella", con 4 pilares (proceso antes que software, MVP en semanas, tecnología adaptable, acompañamiento real) | CTA directo a `/contacto` |
| **`Methodology.tsx`** | Metodología en 5 pasos (Entendemos → Ordenamos → Diseñamos → Construimos → Escalamos), mostrada como cards y como flujo de píldoras con flechas | Efecto de highlight que sigue el mouse vía CSS custom properties (`--hover-x/y`) |
| **`Differential.tsx`** | Tabla comparativa: ERP estándar / ERP corporativo / software legacy / agencia de desarrollo vs. TIDEO | Tabla responsive (columnas en desktop, stack en mobile) |
| **`Insights.tsx`** | Grilla de 4 artículos "editoriales" (contenido de marcador de posición, sin backend de blog real) | `href="#"` — pendiente de contenido real (ver sección 17) |
| **`FinalCTA.tsx`** | CTA de cierre de página, con botón a `/contacto` | |
| **`Footer.tsx`** | Logo, navegación secundaria, correo de contacto, redes sociales | Los íconos de LinkedIn y WhatsApp son `<span>` decorativos sin link real (Facebook e Instagram sí son `<a>` funcionales) — ver sección 17 |
| **`Preloader.tsx`** | Video de marca a pantalla completa al cargar la app, con salida automática (por fin de video, timeout de 9s, o inmediata si `prefers-reduced-motion`) | Vive en `__root.tsx`, se muestra en cada carga de la SPA/SSR |
| **`SectionHeader.tsx`** | Componente de utilidad: eyebrow + título + descripción, reutilizado por casi todas las secciones | Prop `align` (`left` \| `center`) |

---

## 8. Módulo estrella: Diagnóstico Digital Interactivo

Este es, con diferencia, el módulo más complejo del proyecto (1,372 líneas entre `DiagnosticModal.tsx` y `data.ts`) y el principal generador de leads calificados. Funciona como un **cuestionario tipo radar** que evalúa la madurez digital de la empresa del visitante y termina en un diagnóstico redactado por IA.

### 8.1 Concepto funcional

El usuario:
1. Indica el tamaño de su empresa.
2. Ve un **mapa/radar de 10 módulos** de negocio y elige en qué orden completarlos (no es lineal forzoso).
3. Responde 1 a 3 preguntas de opción múltiple por módulo (cada opción vale de 1 a 4 puntos de madurez).
4. Al completar módulos, ve el radar llenarse en tiempo real (previsualización de su "mapa de madurez").
5. Responde un bloque final de 4 preguntas de impacto de negocio (horas perdidas, pérdida de clientes, urgencia, comunicación de marca).
6. Ingresa sus datos de contacto (nombre, empresa, teléfono, correo).
7. Recibe un diagnóstico personalizado generado por IA, con nivel de madurez, áreas críticas y recomendación de servicio TIDEO.
8. El diagnóstico se envía también por correo, y opcionalmente se dispara un webhook a un CRM externo.

### 8.2 Los 10 módulos evaluados (`MODULES` en `data.ts`)

| ID | Módulo | Preguntas |
|---|---|---|
| `crm` | CRM & Marketing | 2 |
| `comercial` | Comercial | 2 |
| `operaciones` | Operaciones | 2 |
| `rrhh` | RRHH | 2 |
| `logistica` | Logística | 2 |
| `compras` | Compras | 2 |
| `admin` | Administración | 2 |
| `cs` | Customer Success | 1 |
| `ia` | Inteligencia Artificial | 3 |
| `campo` | Campo Móvil | 1 |

Cada módulo tiene un `angle` (grados) que define su posición fija en el radar SVG (`nodePos()` en `data.ts`), y cada pregunta tiene 4 opciones ordenadas de menor a mayor madurez (valor implícito 1 a 4).

### 8.3 Ejes del radar visual (`RADAR_AXES`)

El radar que ve el usuario **no muestra los 10 módulos como ejes**, sino que los agrupa en **6 ejes de negocio**, promediando los módulos que completó dentro de cada eje:

| Eje mostrado | Módulos que agrupa |
|---|---|
| Comercial | `crm`, `comercial` |
| Operaciones | `operaciones` |
| Administración | `rrhh`, `compras`, `admin` |
| Logística | `logistica` |
| Tecnología | `ia`, `campo` |
| Clientes | `cs` |

### 8.4 Bloque final de impacto (`FINAL_QUESTIONS`)

4 preguntas transversales, independientes de los módulos, que alimentan directamente la lógica de urgencia y tono del diagnóstico generado por IA:

1. Horas semanales perdidas en tareas manuales/reprocesos.
2. Si ha perdido clientes/contratos por falta de información o lentitud operativa.
3. Urgencia percibida de resolver el problema.
4. Cómo resuelve hoy la comunicación de marca/marketing (esta pregunta alimenta la recomendación de **TIDEO Studio**).

### 8.5 Cálculo de puntajes (funciones puras en `data.ts`)

| Función | Qué calcula |
|---|---|
| `isModuleComplete(id, answers)` | Si un módulo tiene todas sus preguntas respondidas |
| `countCompleted(answers)` | Cuántos de los 10 módulos están completos |
| `calcRadarScores(answers)` | Promedio normalizado (0–1) por cada uno de los 6 ejes visuales, para dibujar el polígono del radar |
| `calcModuleScores(answers)` | Score normalizado (0–1) por módulo individual, usado en el radar de fondo del mapa de selección |
| `radarPolygonPoints(...)` / `nodePos(angle)` | Utilidades puramente geométricas (trigonometría) para posicionar puntos del SVG |
| `buildDiagPayload(answers, finalAnswers, context)` | **Función central**: arma el payload completo que se envía a la Edge Function `get-diagnostic`, incluyendo el score total, el % de madurez, las 3 áreas más críticas (menor puntaje promedio) y un prompt en texto plano con todas las respuestas legibles |

**Fórmula de madurez:** `maturityPercentage = round((totalScore / totalMax) * 100)`, donde `totalMax` es la suma de `preguntas × 4` en todos los módulos (máximo teórico si todas las respuestas fueran la opción de mayor madurez).

### 8.6 Máquina de estados de la UI (`DiagnosticModal.tsx`)

El modal es una máquina de estados finita controlada por un único `useState<View>`:

```text
welcome → map → questions → (map) → final → radar-preview → final-done → capture → result
```

| Vista | Componente interno | Qué hace |
|---|---|---|
| `welcome` | `WelcomeScreen` | Selección de tamaño de empresa (1 pregunta, 4 opciones) |
| `map` | `RadarMap` | Selector de módulo: grilla 2 columnas en mobile, radar SVG interactivo en desktop |
| `questions` | `QuestionPanel` | Preguntas del módulo elegido, con auto-avance |
| `final` | `FinalBlock` | Las 4 preguntas de impacto de negocio |
| `radar-preview` | (dentro de `RadarMap`/vista propia) | Muestra el radar completo antes de pasar a captura |
| `final-done` | `FinalDone` | Pantalla de transición ("completaste el diagnóstico") |
| `capture` | `CaptureForm` | Formulario de datos de contacto (nombre, empresa, teléfono, correo) |
| `result` | `DiagnosisResult` + `LoadingScreen` | Llama a la Edge Function, muestra loading, luego el diagnóstico final |

### 8.7 Flujo de datos hacia el backend

1. Al llegar a `result`, si faltan `SUPABASE_URL`/`SUPABASE_ANON_KEY` en el cliente, se muestra un mensaje de error explícito en pantalla (no falla en silencio) — pensado como ayuda de diagnóstico de despliegue para el propio equipo de TIDEO.
2. Se hace `fetch` a `${SUPABASE_URL}/functions/v1/get-diagnostic` con el payload de `buildDiagPayload`.
3. Con la respuesta (`json.diagnostic`), si hay configuración válida, se dispara **en paralelo, sin esperar la respuesta** (`fetch` sin `await` bloqueante del flujo de UI) una segunda llamada a `send-diagnostic-email` para notificar por correo al usuario y al equipo interno.
4. `getMaturityLevel(pct)` traduce el porcentaje a una etiqueta (`Inicial` ≤25%, `En desarrollo` ≤50%, `Avanzado` ≤75%, `Líder digital` >75%) — **misma lógica y mismos umbrales están duplicados en el system prompt de la Edge Function** (ver 9.1), por lo que cualquier cambio de umbrales debe hacerse en ambos lugares.
5. `extractRecommendedService(text)` parsea con regex el bloque `**Primer paso recomendado:**` de la respuesta de la IA para extraer el nombre del servicio recomendado (usado como metadato adicional en el correo).

### 8.8 Puente hacia el formulario de contacto

Existe también un camino corto: desde el mapa (`map`) o desde el bloque final (`final`), el usuario puede saltar directamente a completar solo sus datos, que se guardan en `sessionStorage` bajo la clave `tideo:diagnostic-contact-prefill` y se recuperan automáticamente en `/contacto?origen=diagnostico` (ver sección 5.3 y 10).

---

## 9. Backend e integraciones (Supabase Edge Functions)

Las 3 funciones viven en `supabase/functions/`, corren en **Deno** (runtime de Supabase Edge Functions) y comparten el mismo patrón: CORS abierto (`Access-Control-Allow-Origin: *`), manejo de `OPTIONS`, y lectura de secretos vía `Deno.env.get(...)`.

### 9.1 `get-diagnostic` — Generación de diagnóstico con IA

- **Modelo usado:** `claude-sonnet-4-6` vía la API de Anthropic (`https://api.anthropic.com/v1/messages`), `max_tokens: 1500`.
- **Secreto requerido:** `ANTHROPIC_API_KEY`.
- Contiene un **system prompt extenso y muy detallado** (ver contenido completo en el archivo fuente) que define:
  - Los 4 servicios de TIDEO y cuándo recomendar cada uno.
  - La **frase ancla obligatoria** sobre el ERP (sección 2.3), con instrucción explícita de usarla siempre que se detecte desconexión entre áreas.
  - Reglas de contextualización por tamaño de empresa (4 rangos).
  - Los mismos 4 rangos de madurez digital que en el frontend (`Inicial/En desarrollo/Avanzado/Líder digital`), con umbrales idénticos.
  - Reglas de cruce de respuestas del bloque de impacto (ej. "perdió clientes + más de 30h perdidas + urgencia alta" → tono urgente y ERP como solución central).
  - Un **formato de salida fijo** en Markdown con secciones obligatorias: título con nombre de la persona, empresa, nivel de madurez, situación actual, áreas críticas, qué construiría TIDEO, primer paso recomendado, y cierre.
  - Instrucción de personalización explícita: usar el nombre de la persona en el diagnóstico ("Carlos, lo que vemos en tu operación es...") en vez de "Tu empresa...".
- **Manejo de errores:** si Anthropic responde con error, la función responde `{ error: "No pudimos generar el diagnóstico en este momento" }` con status 500, sin exponer detalles internos.

> **Implicación importante de costos/gobernanza:** cada envío del diagnóstico consume una llamada a la API de Anthropic pagada por TIDEO. No hay rate-limiting visible en el código de la función — es una consideración a evaluar si el sitio recibe tráfico alto o abuso automatizado (ver sección 17).

### 9.2 `send-contact-email` — Notificación de formulario de contacto

- **Secreto requerido:** `RESEND_API_KEY`.
- Envía **un solo correo interno** (a `cristhian@tideo.tech`, con `reply_to` = correo del remitente) usando una plantilla HTML propia con tabla de datos del formulario (nombre, empresa, cargo, correo, WhatsApp, rubro, urgencia) y bloques destacados para "proceso a mejorar" y "herramientas actuales".
- **No responde con error real al frontend**: siempre retorna `{ success: true }`, incluso si el envío a Resend falla (el error solo se loguea en consola del servidor). Esto es una decisión de UX (no bloquear al usuario) pero significa que **un fallo de envío es invisible para el equipo de TIDEO** salvo que revisen logs de Supabase (ver sección 17).

### 9.3 `send-diagnostic-email` — Notificación de diagnóstico completado

- **Secretos requeridos:** `RESEND_API_KEY`, `MAKE_WEBHOOK_URL` (opcional).
- Envía **dos correos vía Resend**:
  1. Al usuario (`p.userEmail`): email de marca con el diagnóstico completo formateado en HTML (parsea el Markdown devuelto por Claude línea por línea para convertir negritas y listas a HTML), nivel de madurez destacado en una card, áreas críticas, y CTA a `/contacto`.
  2. Al equipo interno (`cristhian@tideo.tech`): notificación de nuevo lead con el nivel de madurez en el asunto.
- Si `MAKE_WEBHOOK_URL` está configurado, **dispara un webhook adicional** (fire-and-forget, sin esperar respuesta) con los datos estructurados del lead — pensado para integrarlo a un CRM, Google Sheets, o cualquier automatización externa vía Make/Integromat.

### 9.4 `import_map.json`

Archivo de mapeo de imports de Deno compartido por las funciones (estándar de Supabase Edge Functions, define de dónde se resuelven los módulos remotos como `https://deno.land/std@0.177.0/http/server.ts`).

### 9.5 Integración con ERP (`api-prospectos`, `api-reservas` y pipeline anti-duplicados)

- El formulario de la landing de OPERA se conecta con el backend principal de prospectos del ERP (`api-prospectos` para registro inicial y `api-reservas` para reservas agendadas vía Calendly).
- Se ajustó la API (`api-prospectos`) para respetar los campos `estado` y `motivo_descarte` en el payload entrante. Esto permite que la lógica de "descarte por presupuesto insuficiente" del frontend impacte correctamente en la base de datos de leads, manteniendo el fallback a estado "nuevo". (Catálogo validado: `nuevo`, `en_contacto`, `calificado`, `convertido`, `descartado`).
- **Resolución de bugs de deduplicación de leads (formulario ↔ Calendly):**
  Al registrar un lead desde OPERA (`fuente: "opera_landing"`) y posteriormente agendar en Calendly con `?salesforce_uuid=${leadId}`, el sistema creaba un segundo lead duplicado (`fuente: "calendly_directo"`) en vez de asociar la cita al lead existente. Se descubrieron y corrigieron dos causas encadenadas:
  1. **Discrepancia en la estructura del webhook de Calendly (`invitee.created`):** El endpoint `api-reservas` (repo ERP) intentaba leer el identificador en `payload.scheduled_event.tracking.salesforce_uuid`. Sin embargo, en el payload real del webhook v2 de Calendly, `tracking` vive en la raíz del payload (`payload.tracking.salesforce_uuid`). Se corrigió para leer directamente `payload.tracking`.
  2. **Columna inexistente en la sentencia UPDATE (`modificado_en` vs `updated_at`):** Tras corregir el path del payload, el duplicado persistía. El diagnóstico reveló que la sentencia `.update({ modificado_en: new Date().toISOString() })` en la tabla `leads` fallaba con error HTTP 400 (`PGRST204: Could not find the 'modificado_en' column of 'leads' in the schema cache`), dado que la columna real en la base de datos es `updated_at`. La función silenciaba el error en un `console.warn` genérico y asumía que el lead no existía, saltando a crear un lead duplicado. Se corrigió a `updated_at` y se reestructuró el logging para diferenciar un error de base de datos de un lead genuinamente inexistente.
  - Ambas correcciones fueron validadas de punta a punta con reservas reales antes del pase definitivo.

### 9.6 `submit-lead` — Función de captura de prospectos y CORS multi-dominio

- **Propósito:** Endpoint serverless en Supabase Edge Functions que recibe los datos de `QualificationForm.tsx` y los canaliza hacia el backend del ERP.
- **Bug crítico de CORS con subdominios:** Originalmente, `submit-lead/index.ts` mantenía un encabezado estático `Access-Control-Allow-Origin: "https://www.tideo.tech"`. Al incorporar el subdominio `opera.tideo.tech`, los navegadores bloqueaban silenciosamente todas las solicitudes del formulario (fallo de preflight OPTIONS / CORS), impidiendo la entrada de prospectos al CRM mientras la interfaz aparentaba éxito.
- **Solución implementada:** Se reemplazó el origen fijo por una función de resolución dinámica por request basada en una lista blanca autorizada:
  - `https://www.tideo.tech`
  - `https://tideo.tech`
  - `https://opera.tideo.tech`
  - `https://www.opera.tideo.tech`
  - Orígenes locales de desarrollo (`http://localhost:5173`, `http://localhost:4173`, `http://localhost:3000`).

---

## 10. Formulario de contacto

`src/routes/contacto.tsx` implementa un formulario controlado con `useState` (no usa react-hook-form pese a estar disponible en dependencias — inconsistencia a nivel de patrón de código, ver sección 17).

### 10.1 Campos

| Campo | Requerido | Tipo |
|---|---|---|
| Nombre | Sí | texto |
| Empresa | Sí | texto |
| Cargo | No | texto |
| Correo | Sí | email |
| WhatsApp | No | texto |
| Rubro de la empresa | No | texto |
| ¿Qué proceso quieres mejorar? | Sí | textarea |
| ¿Qué herramientas usas actualmente? | No | textarea |
| ¿Qué tan urgente es resolverlo? | — (radio con default) | 4 opciones tipo "chip" |

### 10.2 Envío

- `POST` directo desde el navegador a `${SUPABASE_URL}/functions/v1/send-contact-email`, autenticado con el header `Authorization: Bearer ${SUPABASE_ANON_KEY}` (clave anónima pública de Supabase, no un secreto — es seguro exponerla en el cliente).
- Si `SUPABASE_URL`/`SUPABASE_ANON_KEY` no están configuradas, el `fetch` simplemente no se ejecuta (el `if` lo evita), pero **la UI igual muestra "Recibido. Gracias."** — es decir, el usuario puede pensar que su mensaje se envió aunque no haya backend configurado. Ver sección 17.

### 10.3 Prefill desde el diagnóstico

Al montar el componente, si la URL tiene `?origen=diagnostico`, lee `sessionStorage.getItem("tideo:diagnostic-contact-prefill")` y precarga nombre, empresa, correo y WhatsApp — evitando que el usuario tenga que volver a escribir datos que ya dio en el diagnóstico.

---

## 11. Infraestructura de servidor (SSR / manejo de errores)

Esta capa es poco visible funcionalmente pero es importante para la estabilidad en producción:

- **`src/start.ts`**: define un middleware de TanStack Start que envuelve cada request; si ocurre un error sin `statusCode` (es decir, no es un error HTTP esperado), lo loguea y devuelve una página de error HTML de fallback (`renderErrorPage()`) en vez de dejar pasar un 500 genérico sin estilo.
- **`src/lib/error-capture.ts`**: escucha eventos globales `error` y `unhandledrejection` para "capturar" el error original antes de que el framework (h3) lo convierta en una respuesta 500 genérica sin stack trace útil. Guarda el último error por 5 segundos (TTL) para que `server.ts` pueda recuperarlo.
- **`src/server.ts`**: entry point real del servidor (usado por el build de Cloudflare/`wrangler`). Detecta específicamente el patrón de error "catastrófico" de h3 (`{"unhandled":true,"message":"HTTPError"}`) inspeccionando el body de la respuesta, y si lo encuentra, sustituye la respuesta por la página de error de marca, recuperando el error real capturado por `error-capture.ts` para el log del servidor.
- **`src/lib/error-page.ts`**: HTML plano (sin dependencias de framework) para la página de error, con botones "Try again" (recarga) y "Go home".

Este diseño es una solución de ingeniería a un problema conocido de TanStack Start sobre Cloudflare Workers (h3 "traga" errores de servidor y los convierte en JSON genérico); vale la pena que cualquier persona que dé mantenimiento entienda que **no es código redundante**, sino un workaround intencional documentado con comentarios en el propio código fuente.

### 11.1 Lección operativa: Desafío técnico con subdominios isomórficos (`opera.tideo.tech`)

**El problema:** Se requería que la aplicación (TanStack Start) mostrara la landing de OPERA en el subdominio `opera.tideo.tech`, haciendo que servidor y cliente coincidan en la ruta a procesar para evitar desajustes, a diferencia del ERP que vive en un proyecto separado de Vercel.

- **Intento 1 (Descartado):** Usar `rewrites` con `has: [{ type: "host", ... }]` en `vercel.json`. Descartado por ser poco confiable (documentado por Vercel).
- **Intento 2 (Causó incidente):** Mover la decisión a `beforeLoad` isomórfico con `getRequest()` del lado del servidor, excluyendo la ruta `/` del prerender estático para forzar SSR por solicitud. Esto rompió producción (~15 min caído) porque el proyecto no tiene el plugin `Nitro` activado, requisito de Vercel para SSR dinámico.
- **Solución final (Exitosa):** Una combinación de dos piezas que evitan tocar el prerenderizado:
  1. **Middleware de Edge de Vercel (`middleware.ts`)**: Reescribe la ruta a `/opera` en el borde (Edge) cuando el host es de OPERA, ignorando explícitamente recursos estáticos (JS, CSS) para no romperlos.
  2. **Opción `rewrite` de TanStack Router**: En `src/router.tsx` se agregó una regla de `rewrite` (input/output) que replica la transformación de host a ruta durante la hidratación del cliente. Esto soluciona el `hydration mismatch` (React error #418). Requirió subir a `@tanstack/react-router ^1.170.33`.

> **Patrón a replicar:** Para futuros subdominios dentro de este mismo proyecto, se debe agregar el hostname a `middleware.ts` y a las reglas en `src/router.tsx`, sin necesidad de reconstruir la solución.
> **Pruebas locales:** Para probar localmente, usar `npm run preview`, editar `C:\Windows\System32\drivers\etc\hosts` (dominio apuntando a `127.0.0.1`), y habilitar `preview.allowedHosts` en Vite. Probar en Preview deployments de Vercel vía IP no funciona si el dominio ya está registrado para producción.

---

## 12. Variables de entorno requeridas

### 12.1 Frontend (build-time, prefijo `VITE_`, expuestas al navegador)

| Variable | Usada en | Propósito |
|---|---|---|
| `VITE_SUPABASE_URL` | `contacto.tsx`, `DiagnosticModal.tsx` | URL base del proyecto Supabase, para invocar las Edge Functions |
| `VITE_SUPABASE_ANON_KEY` | `contacto.tsx`, `DiagnosticModal.tsx` | Clave anónima pública de Supabase (segura de exponer en cliente) |

### 12.2 Backend (server-side, `server-fns/diagnostic.ts`)

| Variable | Propósito |
|---|---|
| `SUPABASE_URL` | Igual que arriba, pero leída server-side (sin prefijo `VITE_`) en la Server Function de TanStack Start — nota: esta Server Function (`getDiagnosis`) existe en el código pero **no se ve invocada actualmente desde `DiagnosticModal.tsx`**, que llama directo a Supabase desde el cliente. Ver sección 17. |
| `SUPABASE_ANON_KEY` | Idem |

### 12.3 Supabase Edge Functions (secretos configurados en el proyecto de Supabase, no en el frontend)

| Variable | Función que la usa | Propósito |
|---|---|---|
| `ANTHROPIC_API_KEY` | `get-diagnostic` | Autenticación con la API de Anthropic para generar el diagnóstico |
| `RESEND_API_KEY` | `send-contact-email`, `send-diagnostic-email` | Autenticación con Resend para envío de correos |
| `MAKE_WEBHOOK_URL` | `send-diagnostic-email` | (Opcional) URL del webhook de Make para reenviar leads a un CRM/automatización externa |
| `CALENDLY_WEBHOOK_SECRET` | Backend ERP (`api-reservas`) | Valida la integridad del payload entrante desde Calendly a la infraestructura ERP. Rotado recientemente por exposición accidental en logs. Nueva URI de suscripción: `https://api.calendly.com/webhook_subscriptions/885706d3-2663-4f5d-a60b-6fbfd16e6017` |

> **Checklist de despliegue:** si el diagnóstico o el formulario "no hacen nada" en producción, el primer punto a revisar es que las 4 variables `VITE_*` estén configuradas en la plataforma de hosting (Vercel/Cloudflare) **y** que los 3 secretos de Supabase estén configurados en el dashboard de Supabase → Edge Functions → Secrets. El propio código del modal ya muestra un mensaje de error en pantalla si faltan las variables del cliente, como ayuda de diagnóstico.

---

## 13. Scripts y flujo de desarrollo local

Definidos en `package.json`:

| Script | Comando | Uso |
|---|---|---|
| `npm run dev` | `vite dev` | Servidor de desarrollo local con HMR |
| `npm run build` | `vite build` | Build de producción (SSR + prerender de `/` y `/contacto`, ver `vite.config.ts`) |
| `npm run build:dev` | `vite build --mode development` | Build sin minificar, útil para depurar el output |
| `npm run preview` | `vite preview` | Sirve el build de producción localmente |
| `npm run lint` | `eslint .` | Linting con la configuración flat de ESLint 9 |
| `npm run format` | `prettier --write .` | Formateo automático de todo el repo |

### 13.1 Pasos recomendados para levantar el proyecto localmente

```bash
git clone https://github.com/cristhianbalvin-design/Web-principal-TIDEO.git
cd Web-principal-TIDEO
npm install
# Crear un archivo .env (o .env.local) con:
#   VITE_SUPABASE_URL=...
#   VITE_SUPABASE_ANON_KEY=...
npm run dev
```

> **Nota sobre gestor de paquetes:** el repo incluye tanto `package-lock.json` (npm) como `bun.lock` (Bun). Se recomienda que el equipo defina **un solo gestor oficial** y elimine el lockfile del otro, para evitar resoluciones de dependencias distintas entre entornos de desarrollo y CI/CD (ver sección 17).

### 13.2 Control de ramas y prevención de colisiones (`git branch -a`)

- **Lección operativa en sesiones asistidas por IA:** Durante sesiones iterativas de desarrollo con agentes, se detectó el riesgo recurrente de nombrar ramas con identificadores previamente utilizados o genéricos. Esto causó escenarios donde commits quedaban mezclados en ramas antiguas no relacionadas o donde comandos como `git checkout -b <rama>` fallaban silenciosamente, derivando en commits accidentales directamente sobre `main` local.
- **Regla obligatoria de flujo:** Antes de crear cualquier rama nueva en cualquiera de los repositorios del ecosistema (`Web-principal-TIDEO` o `ERP - TIDEO`), se debe ejecutar:
  ```bash
  git branch -a
  ```
  para confirmar que el nombre propuesto no exista en local ni en remoto (`origin/`), evitando colisiones de historial.

---

## 14. Despliegue e infraestructura

### 14.1 Vercel (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "rewrites": [{ "source": "/:path*", "destination": "/index.html" }]
}
```

Esta configuración de `rewrites` es típica de una SPA pura; sin embargo, el proyecto usa **SSR con prerender** (`tanstackStart.prerender.enabled: true` en `vite.config.ts`, con `pages: [{ path: "/" }, { path: "/contacto" }]`). Vale la pena que el equipo de infraestructura confirme si el `rewrite` a `index.html` es compatible con el modo de salida real de TanStack Start en Vercel, o si debería usarse la integración nativa de Vercel para este framework en vez de un rewrite manual de SPA (ver sección 17).

### 14.2 Cloudflare Workers (`wrangler.jsonc`)

```jsonc
{
  "name": "tanstack-start-app",
  "compatibility_date": "2025-09-24",
  "compatibility_flags": ["nodejs_compat"],
  "main": "src/server.ts"
}
```

El punto de entrada (`src/server.ts`) es el wrapper de errores descrito en la sección 11, que a su vez importa dinámicamente el entry-point real generado por `@tanstack/react-start/server-entry`.

### 14.3 Dominio

- Dominio de producción objetivo: **`www.tideo.tech`**.
- El brief de marca especifica una redirección `tideo.tech → www.tideo.tech`, que debe configurarse a nivel de DNS/proveedor de hosting (no está en el código de la app).

### 14.4 Decisión pendiente

El proyecto tiene **dos rutas de despliegue configuradas en paralelo** (Vercel y Cloudflare). Se recomienda que el equipo defina explícitamente cuál es la plataforma de producción activa y documente esa decisión aquí, retirando o marcando claramente como "en desuso" la configuración que no corresponda, para evitar despliegues duplicados o confusión sobre dónde vive la fuente de verdad de producción.

### 14.5 Despliegue desacoplado de Supabase Edge Functions (proceso manual obligatorio)

- **Lección crítica de arquitectura CI/CD:** Las Supabase Edge Functions (`supabase/functions/*`) que coexisten dentro de este repositorio **no están conectadas al pipeline automático de GitHub / Vercel**. Al fusionar un Pull Request a la rama `main`, Vercel únicamente compila y despliega el frontend y el servidor TanStack Start.
- **Procedimiento manual requerido:** Todo cambio en el código o configuración de una Edge Function exige ejecutar manualmente desde terminal el comando de despliegue mediante Supabase CLI inmediatamente después del merge:
  ```bash
  supabase functions deploy <nombre-funcion> --project-ref <id-proyecto>
  ```
- **Caso real experimentado:** Durante la corrección del bloqueo de CORS en `submit-lead`, el código ya estaba en `main`, pero la función en producción siguió respondiendo con el código antiguo por varias horas, simulando que la corrección no funcionaba hasta que se ejecutó el despliegue explícito en Supabase.

---

## 15. SEO y metadatos

Definidos en dos lugares (con contenido casi idéntico, redundancia intencional para SSR/prerender):

- **`__root.tsx`** (metadatos globales, aplican a toda la app por defecto).
- **`routes/index.tsx`** y **`routes/contacto.tsx`** (override específico por página vía `head()`).

| Elemento | Valor (Home) |
|---|---|
| `title` | "TIDEO Tech & Strategy \| Tecnología que entiende tu negocio" |
| `description` | "TIDEO diseña, automatiza y construye soluciones digitales para empresas que buscan ordenar procesos, integrar datos y crecer con tecnología, IA y desarrollo ágil." |
| `og:title` / `og:description` | Variante corta para redes sociales |
| `og:image` / `twitter:image` | `/og-image.png` |
| `theme-color` | `#080B12` (coincide con el fondo dark de marca) |

El documento de brief (`TIDEO_Web_Principal_V2_Premium.md`, sección 31) define además una lista de **keywords objetivo** (transformación digital Perú, automatización de procesos, ERP personalizado, CRM personalizado, Power BI empresas, consultoría de procesos, IA para empresas, Power Platform Perú, desarrollo ágil con IA) que actualmente **no están implementadas como meta keywords ni reflejadas explícitamente en el copy on-page** más allá del uso natural del lenguaje — es una oportunidad de SEO on-page pendiente (ver sección 17).

No hay `sitemap.xml` ni `robots.txt` visibles en `public/` — pendiente si se busca indexación activa en buscadores.

---

## 16. Tono de voz y lineamientos de contenido

Resumen ejecutivo del brief completo (`TIDEO_Web_Principal_V2_Premium.md`, 1,441 líneas) que cualquier persona que redacte copy nuevo para el sitio debería leer completo antes de escribir. Puntos clave:

### 16.1 Principio rector
> El trabajo, la claridad estratégica y la prueba visual deben convencer antes que la lista de servicios.

### 16.2 Arquitectura narrativa recomendada de una página de venta
`Hero → Confianza/métricas → Trabajo/soluciones → Qué es la empresa → Ecosistema → Servicio estrella → Metodología → Diferencial → Insights → Prueba social → CTA final → Footer` — **la home actual (sección 5.2) sigue este orden casi al pie de la letra**, con la única omisión visible de una sección de "prueba social/testimonios/logos" explícita (ver sección 17).

### 16.3 Frases ancla de marca (uso recomendado)
- "Diseñamos, construimos y medimos."
- "Traducimos procesos de negocio en tecnología funcional."
- "Construimos software alrededor de tu operación, no al revés."
- "La tecnología debe adaptarse al negocio, no obligar al negocio a adaptarse a ella."
- "Automatizar no es digitalizar el caos. Es rediseñar el proceso para escalarlo."

### 16.4 Frases prohibidas
- "Ofrecemos soluciones integrales."
- "Somos una empresa líder en tecnología."
- "Tenemos servicios personalizados para todos los rubros."
- "Hacemos páginas web, automatizaciones y sistemas."

### 16.5 Qué evitar en el diseño/contenido de la primera versión de la web
Menús enormes, explicar todo el stack técnico en el hero, hablar del portal/subdominios futuros, decir que "se hace de todo", saturar con íconos o textos largos desde el inicio, inventar clientes/premios/métricas no reales.

### 16.6 Checklist de contenido pendiente antes de publicar (del propio brief)
**Imprescindible:** logo oficial en SVG/PNG transparente ✅ (ya presente en `assets/`), paleta validada ✅ (implementada en `styles.css`), tipografía definida ✅, foto/retrato del fundador ⬜, 3–6 soluciones/casos iniciales ✅ (implementado como "tipos de solución" genéricos, no casos reales con nombre de cliente), WhatsApp/correo oficial ✅ (correo sí, WhatsApp funcional pendiente — ver 17), texto legal/datos de empresa ⬜.

**Deseable:** testimonios reales ⬜, logos de clientes reales ⬜, artículos reales para Insights ⬜ (actualmente contenido de marcador de posición), mockups/video del proyecto ✅ (`demo-tideo.mp4`), showreel ✅.

---

## 17. Estado actual, deuda técnica y pendientes

Listado consolidado de observaciones encontradas durante el análisis del código, útil como backlog inicial de mejora:

### 17.1 Contenido / negocio
- [ ] La sección **Insights** usa artículos de marcador de posición con `href="#"` — no hay backend de blog ni contenido real conectado.
- [ ] No hay sección de **prueba social real** (testimonios, logos de clientes) pese a estar recomendada explícitamente en el brief de marca.
- [ ] Los 6 "casos" de `SelectedWork` son **tipos de solución genéricos**, no proyectos reales con nombre de cliente — coherente con la etapa actual del negocio, pero a evolucionar cuando existan casos reales.
- [ ] Faltan datos legales/de empresa y foto del fundador para la sección "Sobre TIDEO" (aún no implementada como página separada).

### 17.2 Funcionalidad / UX
- [ ] El **botón flotante de WhatsApp** en la home (`index.tsx`) es un `<span>` decorativo sin `href`/`onClick` — no es funcional actualmente.
- [ ] En el **Footer**, los íconos de **LinkedIn y WhatsApp** son `<span>` (no funcionales); solo Facebook e Instagram son enlaces reales.
- [ ] El formulario de `/contacto` muestra "Recibido. Gracias." **incluso si `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` no están configuradas** (el `fetch` simplemente no se dispara) — riesgo de perder leads silenciosamente sin que nadie lo note.
- [ ] `send-contact-email` siempre responde `{ success: true }` al frontend aunque Resend falle internamente — un fallo de envío solo queda en logs de Supabase, no genera alerta visible.
- [x] ~~**Falso éxito en formulario de OPERA ante caídas de red o CORS:**~~ Resuelto en `QualificationForm.tsx`. Se removió la bandera incondicional del `finally` y ahora se maneja estado de error visual explícito (`errorMessage` con `AlertCircle`).

### 17.3 Código / arquitectura
- [ ] **Doble lockfile** (`package-lock.json` + `bun.lock`): definir un gestor de paquetes oficial único.
- [ ] **Doble configuración de despliegue** (Vercel + Cloudflare Workers) sin que quede explícito en el repo cuál es la plataforma activa de producción.
- [ ] `src/server-fns/diagnostic.ts` (Server Function de TanStack Start, con su propia lectura de `SUPABASE_URL`/`SUPABASE_ANON_KEY` server-side) **existe pero no parece estar siendo invocada** desde `DiagnosticModal.tsx`, que llama directamente a Supabase desde el cliente con las variables `VITE_*`. Aclarar si es código muerto/en transición o si se planea migrar la llamada al servidor (lo cual sería más seguro, al no requerir exponer el flujo completo desde el cliente).
- [ ] El formulario de contacto usa `useState` nativo pese a que `react-hook-form` + `zod` están instalados como dependencias — inconsistencia de patrón; se podría migrar para validación más robusta y consistente con el resto del ecosistema de shadcn/ui.
- [ ] No hay **rate limiting** visible en `get-diagnostic` (llamada paga a Anthropic) ni en `send-contact-email`/`send-diagnostic-email` — expuesto a abuso/spam si el sitio recibe tráfico malicioso.
- [ ] La lógica de umbrales de "nivel de madurez" (`Inicial/En desarrollo/Avanzado/Líder digital`) está **duplicada** entre `DiagnosticModal.tsx` (`getMaturityLevel`) y el system prompt de `get-diagnostic` — cualquier cambio de criterio debe replicarse manualmente en ambos lugares.
- [ ] No hay `sitemap.xml` ni `robots.txt` en `public/`.
- [ ] No se detectaron tests automatizados (unitarios, de integración o e2e) en el repositorio.

### 17.4 Performance
- [ ] Los assets de video (`hero-tideo-animated.webm` ~5.8 MB, `tideo-logo-preloader.webm` ~4.1 MB, `demo-tideo.mp4` ~16 MB) son el mayor peso de carga del sitio; evaluar compresión adicional o CDN de streaming si el Lighthouse/Core Web Vitals lo justifica.

---

## 18. Glosario

| Término | Significado en este proyecto |
|---|---|
| **TanStack Start** | Meta-framework full-stack sobre React y Vite, con SSR y file-based routing (vía TanStack Router) |
| **Edge Function** | Función serverless de Supabase que corre en runtime Deno, usada aquí para lógica de backend (IA, correos) |
| **Lovable** | Plataforma de generación de aplicaciones asistida por IA usada como origen/mantenimiento de este proyecto (`@lovable.dev/vite-tanstack-config`) |
| **Madurez digital** | Métrica propia de TIDEO (0–100%) calculada a partir de las respuestas del módulo de diagnóstico, con 4 niveles: Inicial, En desarrollo, Avanzado, Líder digital |
| **Radar de módulos** | Visualización SVG tipo "radar chart" que resume visualmente el avance/puntaje del usuario en el diagnóstico |
| **Frase ancla del ERP** | Frase de venta obligatoria codificada en el system prompt de IA: *"Un ERP donde el núcleo de tu operación no se adapta a un software estándar: se construye desde cero para funcionar exactamente como tu negocio genera valor."* |
| **shadcn/ui** | Colección de componentes de UI basados en Radix UI + Tailwind, copiados directamente al repo (no instalados como paquete de terceros), configurados vía `components.json` |
| **OKLCH** | Espacio de color perceptualmente uniforme usado en `styles.css` para definir toda la paleta del sitio |

---

*Fin del documento. Generado a partir de análisis directo del código fuente del repositorio `cristhianbalvin-design/Web-principal-TIDEO` (rama `main`).*