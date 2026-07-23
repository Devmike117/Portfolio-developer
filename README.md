# devmike117 — Portfolio

Portafolio personal con perfil, proyectos, timeline de experiencia, skills e integración en tiempo real con Steam.

![Vista previa](https://raw.githubusercontent.com/Devmike117/Devmike117/refs/heads/main/assets/macbook%20pro%2016.png)

<table align="center">
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/Devmike117/Devmike117/refs/heads/main/assets/phone.png" width="200" alt="Vista móvil" />
      <br /><strong>Móvil</strong>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/Devmike117/Devmike117/refs/heads/main/assets/ipad.png" width="350" alt="Vista tablet" />
      <br /><strong>Tablet</strong>
    </td>
  </tr>
</table>

## Stack

**Frontend**
- React 19.2.0 + TypeScript 5.6.2
- Vite 7.1.8
- Tailwind CSS 4.1.14
- Lucide React

**Backend / APIs**
- Netlify Functions (serverless)
- Steam Web API (estado en línea / juego actual)
- Node.js runtime

**Tooling**
- ESLint
- Bun
- Git

## Features

- Grid de proyectos con detalle en modal
- Timeline de experiencia
- Skills técnicos con iconos
- Dark/light mode con persistencia
- Integración Steam en tiempo real
- Reproductor de música
- Formulario de contacto vía Netlify Functions
- Responsivo

## Estructura

```plaintext
Profile-developer-react/
├── src/
│   ├── components/             # Componentes de UI
│   │   ├── Header.tsx          # Encabezado del perfil con dark mode toggle
│   │   ├── Navigation.tsx      # Navegación por pestañas
│   │   ├── GridProjects.tsx    # Cuadrícula de proyectos
│   │   ├── ModalProject.tsx    # Detalles de proyecto
│   │   ├── GridExperience.tsx  # Línea de tiempo
│   │   ├── SongPlayer.tsx      # Sección de música
│   │   ├── GridSkills.tsx      # Habilidades técnicas
│   │   ├── SteamStatus.tsx     # Integración Steam en tiempo real
│   │   ├── ContactButton.jsx   # Botón de contacto
│   │   └── index.ts            # Exportador de componentes
│   ├── constants/              # Información estática del portafolio
│   │   └── index.tsx
│   ├── types/                  # Tipado global
│   │   └── index.ts
│   ├── App.tsx                 # Componente raíz con dark mode
│   ├── main.tsx                # Punto de entrada
│   ├── index.css               # Estilos globales y config Tailwind v4
│   └── vite-env.d.ts           # Tipos de Vite
├── netlify/
│   └── functions/              # Funciones serverless
│       ├── sendEmail.js        # API para envío de emails
│       └── sendSteamStatus.js  # API para integración Steam
├── api/                        # APIs alternativas (Vercel)
│   ├── sendEmail.js
│   └── sendSteamStatus.js
├── public/                     # Assets estáticos
├── index.html                  # HTML principal
├── package.json                # Dependencias y scripts
├── bun.lockb                   # Lock file de Bun
├── vite.config.ts              # Configuración de Vite
├── tailwind.config.ts          # Configuración de Tailwind CSS
├── tsconfig.json               # Configuración de TypeScript
├── tsconfig.app.json           # Config TypeScript para app
├── tsconfig.node.json          # Config TypeScript para Node
├── eslint.config.js            # Configuración de ESLint
└── README.md                   # Documentación del proyecto
```


## Setup

Requiere Node 18+. Bun recomendado.

```bash
git clone https://github.com/Devmike117/Profile-developer-react.git
cd Profile-developer-react
bun install   # o npm install
bun run dev   # o npm run dev
```

Servidor en `http://localhost:3000`.
