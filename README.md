# TechBlitz 2026 - Manga Edition 💥

Welcome to the official **TechBlitz 2026** Hackathon website! This project is a high-voltage, manga-themed platform crafted to rally warriors (participants) for VCET NSDC's ultimate tech showdown: **CODE. DESIGN. TRANSFORM.**

![TechBlitz Hero Preview](/public/images/hero.png)

---

## 🚀 The Stack

This project was built for speed, style, and scale. Originally a Vite/React application, it has been fully migrated to a **Next.js 16 App Router** architecture.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **Animations**: [GSAP (GreenSock)](https://gsap.com/) & Native CSS `tw-animate-css`
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Fonts**: Space Mono, Oswald, Bangers, Permanent Marker, Creepster (via `next/font/google`)

---

## 🎨 Manga Theme Architecture

The website uses a custom, highly opinionated CSS framework (`globals.css`) built to resemble a comic book or manga:

- **`.manga-panel`**: Hard, thick black borders with solid, 0-blur drop shadows.
- **`.action-text`**: Dynamic, stroke-based text mimicking comic sound effects (e.g., *THWACK!*, *SWOOSH!*, *VROOOOM!*).
- **`.manga-speech-bubble`**: Pure CSS speech bubbles with directional tails.
- **`.speed-lines`**: CSS gradients used to simulate motion and intensity.
- **`halftone-bg`**: Classic dot-matrix comic book background patterns.

---

## 📂 Project Structure

The monolithic page has been modularized into highly reusable components under `src/components/`:

- `Navbar.tsx` - Responsive navigation with mobile hamburger.
- `PageLoader.tsx` - GSAP-powered `reveal-loader` entrance animation.
- `HeroSection.tsx` - The explosive landing banner.
- `AboutSection.tsx` - "The Quest" overview.
- `TracksSection.tsx` - Hackathon domains (AI, Vibeathon, UI/UX).
- `TimelineSection.tsx` - Event schedule with custom dot-nodes.
- `PrizesSection.tsx` - Visual breakdown of rewards.
- `JudgesSection.tsx` - Mentors and "The Elders".
- `SponsorsSection.tsx` - Tiered grid of event allies.
- `RulesSection.tsx` - Eligibility and judging criteria.
- `FaqSection.tsx` - Manga-styled interactive accordion.
- `GallerySection.tsx` - Past event highlights.
- `CommunitySection.tsx` - Social and contact links.
- `RegistrationCta.tsx` - Massive call to action.
- `RegisterForm.tsx` - Multi-member signup form.

---

## 🛠️ Local Development

Ready to enter the arena? Here is your setup guide:

### 1. Requirements

- **Node.js**: v18.17.0 or higher
- **npm** / **yarn** / **pnpm** / **bun**

### 2. Getting Started

Clone the repository and install the 140+ dependencies (including all shadcn/ui elements):

```bash
# Install dependencies
npm install

# Start the Turbopack dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Registration Page

You can preview the dedicated registration route at:
[http://localhost:3000/register](http://localhost:3000/register)

### 4. Building for Production

```bash
# Create an optimized production build
npm run build

# Start the deployed server locally
npm run start
```

---

## 📝 License

Vol 1: The Curse of the Algorithm © 2026 VCET NSDC. All rights reserved.
