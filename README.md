# UFC FIGHTER — SPONSORSHIP HUB

A brutal, blood-black landing page template that pitches a UFC fighter to potential brand sponsors. Built with **Next.js 16 + Firebase + Tailwind v4 + shadcn/ui + Framer Motion + GSAP**.

## Features

- **Hero** with video background, glitch text, custom cursor, KO easter egg ("K"+"O" key combo)
- **Live stats bar** with animated CountUp counters + countdown to next fight
- **Highlight reel** with featured KO video + selectable thumbnails
- **Bento-grid gallery** with hover videos + full-screen lightbox
- **Sponsorship packages** (Bronze / Silver / Gold / Title) with custom tier cards
- **Gear visualizer** — clickable logo placement zones on fighter image
- **Price calculator** — pick services, see live total + CPM
- **Audience insights** — top countries with flags, age/gender/income demographics
- **Trust block** — past sponsor logos marquee + testimonial cards
- **Press block** — outlet marquee + article links + achievements grid
- **Booking form** — secure intake form, lead is stored in Firestore
- **Media kit** — email-gated PDF download
- **Full admin panel** at `/admin` with Firebase Auth (email/pwd + Google) — manage every block

## Setup

### 1. Install deps

```bash
npm install
```

### 2. Configure Firebase

Copy the env template:

```bash
cp .env.local.example .env.local
```

Fill in your Firebase **Web SDK** config (Firebase Console → Project Settings → Your apps) and **Service Account** key (Project Settings → Service Accounts → Generate Private Key).

### 3. Seed Firestore with placeholder data

```bash
npm run seed
```

Or wipe-and-seed:

```bash
npm run seed:clear
```

### 4. Add yourself as admin

1. Go to **Firebase Console → Authentication** → create user with your email (or sign in via Google once at `/admin/login`).
2. Copy your UID.
3. In **Firestore**, create a document at `admins/{your-uid}` with fields `{ email, displayName, role: "owner" }`.

### 5. Deploy security rules

```bash
firebase deploy --only firestore:rules,storage:rules
```

### 6. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing and [http://localhost:3000/admin](http://localhost:3000/admin) for the control room.

The site works without Firebase too — it falls back to rich placeholder data, so you can see what the template looks like immediately.

## Deploy (Firebase App Hosting)

Firebase Hosting + Next.js SSR uses **Firebase App Hosting**:

```bash
firebase init apphosting
```

Push to GitHub → connect repo via App Hosting → it builds + deploys on every push. The env vars are read from secrets defined in `apphosting.yaml`.

## Architecture

```
app/
  page.tsx                — server component, loads data via firebase-admin
  layout.tsx              — fonts + dark theme
  admin/
    login/page.tsx        — public sign-in (no auth guard)
    (protected)/
      layout.tsx          — wraps in AuthGuard + sidebar
      page.tsx            — dashboard
      profile|stats|socials|videos|gallery|packages|gear-zones|
        sponsors|testimonials|press|achievements|audience/page.tsx
      leads/page.tsx      — incoming sponsorship requests
      media-kit/page.tsx  — media-kit download log
  api/
    leads/route.ts        — server-side lead submission (Firebase Admin)
    media-kit-request/route.ts
components/
  sections/               — landing sections (one file each)
  admin/                  — admin shell, sidebar, MediaUploader, CollectionEditor
  effects/                — GlitchText, CountUp, CustomCursor, KOEasterEgg, etc.
  ui/                     — shadcn/ui primitives
lib/
  firebase/{client,admin,auth,collections,storage}.ts
  schemas/index.ts        — Zod schemas for every entity
  placeholder-data.ts     — fallback content (works without Firebase)
  load-landing-data-server.ts  — server-side data loader
```

## Design notes

- **Palette**: pure black, blood red `#dc143c`, deep blood `#8B0000`, bone white.
- **Typography**: `Anton` for huge display, `Bebas Neue` for headers, `Inter` for body, `JetBrains Mono` for metadata.
- **Motion**: Framer Motion for reveal / AnimatePresence, native CSS keyframes for glitch / shake / marquee.
- **Cursor**: custom blood-red circle on desktop (hidden on touch).
- **Easter egg**: press `K` then `O` anywhere on the landing for a full-screen KO.

## Customization

- **Replace placeholder data**: edit content via `/admin` — no code changes needed.
- **Brand colors**: tweak `--blood`, `--blood-bright` CSS vars in `app/globals.css`.
- **Add a section**: drop a new file in `components/sections/`, import in `app/page.tsx`.

## Security

- Firestore: public read for content collections; admin-only write. Lead/media-kit submissions are write-only public with validation.
- Storage: admin-only writes; public reads; 50MB cap, images/videos/PDFs only.
- Admin allowlist: only users in the `admins/{uid}` collection can access `/admin`.

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animations | Framer Motion + GSAP + native CSS |
| State / forms | React Hook Form + Zod |
| Backend | Firebase (Firestore + Auth + Storage) |
| Hosting | Firebase App Hosting |
| Icons | Lucide |
| Toasts | Sonner |
