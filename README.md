# AFSHA Creative Solution

The AFSHA Creative Solution website is a dark, editorial-style marketing site for showcasing architectural metalwork, gates, railings, and related projects.

## Features

- Responsive landing page with hero, featured projects, collections, videos, testimonials, and contact sections.
- Collection tabs for browsing railing and metalwork offerings.
- Featured-project carousel with smooth horizontal navigation.
- Embedded AFSHA Creative Solution location map.
- WhatsApp, phone, email, and social-media contact links.
- Optimized local images, videos, fonts, and logos served from the `assets/` and `public/` directories.

## Tech stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/)
- [Lucide React](https://lucide.dev/) icons

## Requirements

- Node.js 20 or newer
- npm

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

The development server reloads automatically when files are changed.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |
| `npm run lint` | Run ESLint |

## Project structure

```text
app/
  contact/       Contact page
  layout.tsx     Root layout, metadata, fonts, and shared navigation
  page.tsx       Home page
components/      Page sections and reusable UI components
lib/             Shared utilities
public/          Publicly served images and videos
assets/          Source images, icons, fonts, and other media
utils/           Collection data, image mappings, and shared types
```

The `@/*` import alias points to the project root. For example:

```tsx
import Navbar from "@/components/navbar";
```

## Content and assets

Project and collection content is defined in `utils/data.ts`. Local media is kept in `assets/` and `public/`; update the relevant data entry and asset path when adding or replacing portfolio content.

The map section uses a Google Maps embed and does not require a Google Maps API key in the current implementation.

## Production build

Validate the application locally before deployment:

```bash
npm run lint
npm run build
npm run start
```

The application can be deployed to any platform that supports Next.js. For a managed deployment, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is private and intended for AFSHA Creative Solution. No public redistribution license is currently specified.
