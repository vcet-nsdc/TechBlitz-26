# TechBlitz 2026 - Manga Edition 💥

<p align="center">
  <img src="/public/images/hero.png" alt="TechBlitz 2026 Banner" width="800"/>
</p>

<p align="center">
  <a href="https://github.com/vcet-nsdc/techblitz-2026/actions">
    <img src="https://img.shields.io/github/workflow/status/vcet-nsdc/techblitz-2026/CI?style=for-the-badge&logo=github&color=6c47ff" alt="Build Status"/>
  </a>
  <a href="https://github.com/vcet-nsdc/techblitz-2026/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/vcet-nsdc/techblitz-2026?style=for-the-badge&color=00d4ff" alt="License"/>
  </a>
  <a href="https://github.com/vcet-nsdc/techblitz-2026/releases">
    <img src="https://img.shields.io/github/v/release/vcet-nsdc/techblitz-2026?style=for-the-badge&color=ff4757" alt="Version"/>
  </a>
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  </a>
</p>

---

## 🎯 Overview

**TechBlitz 2026** is the official hackathon platform for VCET NSDC's ultimate tech showdown. This high-voltage, manga-themed web application manages the entire hackathon lifecycle — from participant registration and team management to judge scoring and certificate generation.

**Mission**: CODE. DESIGN. TRANSFORM.

### What Problem It Solves

- **Streamlines 73-team hackathon management** across 8 labs and 3 domains
- **Provides real-time judge scoring** with lab round and final round capabilities
- **Automates certificate generation** for all participants
- **Offers admin oversight** with leaderboard tracking and team promotion
- **Delivers immersive manga-themed UX** for an unforgettable event experience

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [API Documentation](#-api-documentation)
- [Folder Structure](#-folder-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## ✨ Features

### 🎨 Public Website
- **Manga-themed landing page** with GSAP animations
- **3-domain tracks**: AI, Vibeathon (Vibe Coding), UI/UX
- **Interactive timeline** with event schedule
- **Team registration system** with multi-member support
- **Problem statement reveal** with countdown timer
- **Responsive design** for all devices

### ⚖️ Judge Portal
- **Secure passcode authentication**
- **8-lab navigation** with team distribution
- **Real-time scoring form** (6 criteria per team)
- **Leaderboard views** per domain
- **Final round scoring** for promoted teams

### 🔐 Admin Dashboard
- **Comprehensive team management**
- **Score tracking and analytics**
- **Team promotion to finals** (top 5 per domain)
- **Certificate management system**
- **Full results export**

### 📜 Certificate System
- **Automated certificate generation** with Canvas API
- **Custom certificate template** support
- **Participant lookup by team name**
- **Downloadable PNG certificates**
- **All names rendered in UPPERCASE**

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives) |
| **Animations** | [GSAP](https://gsap.com/) + `tw-animate-css` |
| **Database** | [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) |
| **State Management** | [TanStack Query](https://tanstack.com/query/latest) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Toast Notifications** | [Sonner](https://sonner.emilkowal.ski/) |

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** v18.17.0 or higher
- **npm** v9+ (or yarn/pnpm/bun)
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git** for version control

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vcet-nsdc/techblitz-2026.git
cd techblitz-2026
```

### 2. Install Dependencies

```bash
npm install
```

This installs 140+ dependencies including all shadcn/ui components.

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techblitz2026

# Admin Authentication
ADMIN_USERNAME=techblitz_admin
ADMIN_PASSWORD=your_secure_password
ADMIN_SECRET=your_admin_jwt_secret

# Judge Portal Authentication
JUDGE_PASSCODE=your_judge_passcode
```

### 4. Seed the Database

#### Option A: Seed All Competition Teams (73 teams)
```bash
npm run seed
```

#### Option B: Seed Teams with Participant Certificates
```bash
npm run partseed
```

#### Option C: Seed Individual Teams
Edit `scripts/singleseed.ts` with your team details, then run:
```bash
npm run singleseed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes |
| `ADMIN_USERNAME` | Admin dashboard username | ✅ Yes |
| `ADMIN_PASSWORD` | Admin dashboard password | ✅ Yes |
| `ADMIN_SECRET` | JWT secret for admin sessions | ✅ Yes |
| `JUDGE_PASSCODE` | Passcode for judge portal access | ✅ Yes |

### Domain Mapping

| Domain | Lab IDs | Description |
|--------|---------|-------------|
| AI (vibecoding) | lab-1, lab-2 | AI/ML and Agentic AI tracks |
| Vibeathon (agenticai) | lab-3, lab-4, lab-5, lab-6 | Vibe Coding competition |
| UI/UX (uiux) | lab-7, lab-8 | Design and user experience |

---

## 📖 Usage

### Public Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with manga theme |
| `/register` | Team registration form |
| `/certificates` | Certificate lookup and download |

### Judge Portal

| Route | Description |
|-------|-------------|
| `/judge-portal` | Judge login (passcode required) |
| `/judge-portal/lab` | Lab selector (8 labs) |
| `/judge-portal/lab/[labId]` | Teams in specific lab |
| `/judge-portal/lab/[labId]/[teamId]` | Scoring form for team |
| `/judge-portal/leaderboard` | Domain leaderboards |
| `/judge-portal/final` | Final round teams |
| `/judge-portal/final/leaderboard` | Final leaderboard |

### Admin Portal

| Route | Description |
|-------|-------------|
| `/admin` | Admin login |
| `/admin/dashboard` | Team management dashboard |
| `/admin/judge-portal` | Judge portal overview |

### Scoring Criteria (Lab Round)

1. **Innovation** (0-10 points)
2. **Execution** (0-10 points)
3. **Presentation** (0-10 points)
4. **Impact** (0-10 points)
5. **Feasibility** (0-10 points)

**Total**: 50 points max per judge

### Scoring Criteria (Final Round)

All lab criteria + **Scalability** (0-10 points)

**Total**: 60 points max per judge

---

## 📸 Screenshots

> 🖼️ *Screenshots will be added here showing key features*

| Feature | Preview |
|---------|---------|
| Hero Section | ![Hero](/public/images/hero.png) |
| Judge Portal | *Coming soon* |
| Scoring Form | *Coming soon* |
| Admin Dashboard | *Coming soon* |
| Certificate | *Coming soon* |

---

## 🔌 API Documentation

### Authentication Endpoints

#### POST `/api/admin/login`
Admin authentication endpoint.

**Request Body:**
```json
{
  "username": "techblitz_admin",
  "password": "your_password"
}
```

#### POST `/api/judge-portal/auth`
Judge authentication endpoint.

**Request Body:**
```json
{
  "judgeName": "Judge Name",
  "passcode": "your_judge_passcode"
}
```

### Team Endpoints

#### GET `/api/team/[teamName]`
Retrieve team details and certificates.

**Response:**
```json
{
  "teamName": "TEAM NAME",
  "leaderName": "LEADER NAME",
  "member2": "MEMBER 2",
  "member3": "MEMBER 3",
  "domain": "vibecoding",
  "certificates": [...]
}
```

#### GET `/api/teams`
Retrieve all registered teams (admin only).

### Score Endpoints

#### POST `/api/scores/submit`
Submit scores for a team.

**Request Body:**
```json
{
  "teamId": "team-id",
  "judgeName": "Judge Name",
  "round": "lab",
  "criteria": {
    "innovation": 8,
    "execution": 9,
    "presentation": 7,
    "impact": 8,
    "feasibility": 9
  }
}
```

### Certificate Endpoints

#### POST `/api/certificate/save`
Save generated certificate to team profile.

---

## 📁 Folder Structure

```
techblitz-2026/
├── .github/                    # GitHub templates
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── public/                     # Static assets
│   └── images/
├── scripts/                    # Database seeders
│   ├── seed.ts                 # Main seeder (73 teams)
│   ├── partseed.ts             # Participant certificates
│   └── singleseed.ts           # Individual team seeder
├── src/
│   ├── actions/                # Server Actions
│   │   ├── scores.ts           # Score management
│   │   └── teams.ts            # Team operations
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/           # Public routes
│   │   ├── admin/              # Admin portal
│   │   ├── api/                # API routes
│   │   ├── judge-portal/       # Judge portal
│   │   └── certificates/       # Certificate lookup
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   └── [sections].tsx      # Page sections
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities
│   │   ├── models/             # Mongoose models
│   │   ├── judgeAuth.ts        # Judge authentication
│   │   └── mongodb.ts          # Database connection
│   └── types/                  # TypeScript types
├── .env.local                  # Environment variables
├── .gitignore                  # Git ignore rules
├── CHANGELOG.md                # Version history
├── CODE_OF_CONDUCT.md          # Community guidelines
├── CONTRIBUTING.md             # Contribution guide
├── LICENSE                     # MIT License
├── README.md                   # This file
├── components.json             # shadcn/ui config
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies
├── plan.md                     # Implementation plan
└── tsconfig.json               # TypeScript config
```

---

## 🗺️ Roadmap

### ✅ Completed Features

- [x] Manga-themed public website
- [x] Team registration system
- [x] Judge portal with scoring
- [x] Admin dashboard
- [x] Certificate generation
- [x] Leaderboard system
- [x] Responsive design

### 🚧 In Progress

- [ ] Enhanced certificate templates
- [ ] Real-time leaderboard updates
- [ ] Email notifications for participants
- [ ] Advanced analytics dashboard

### 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] PWA (Progressive Web App)
- [ ] AI-powered team matching
- [ ] Virtual judging interface
- [ ] Mobile app companion

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 VCET NSDC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND...
```

---

## 🙏 Acknowledgements

### Team

- **VCET NSDC** - Organizing committee
- **TechBlitz 2026** Development Team

### Technologies

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [MongoDB](https://www.mongodb.com/) - Database
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [GSAP](https://gsap.com/) - Animation library

### Design Inspiration

- Manga/Comic book aesthetic
- Japanese street art influences
- Dynamic typography from comic book sound effects

---

<p align="center">
  <strong>Made with 💥 by VCET NSDC Team</strong>
</p>

<p align="center">
  <a href="https://github.com/vcet-nsdc/techblitz-2026">GitHub</a> •
  <a href="https://vcet.edu.in">VCET Website</a> •
  <a href="https://nsdc.vcet.edu.in">NSDC Portal</a>
</p>
