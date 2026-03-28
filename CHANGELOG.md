# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-03-28

### 🎉 Initial Release

#### ✨ New Features

- **Public Website**
  - Manga-themed landing page with GSAP animations
  - Interactive hero section with dynamic text effects
  - Event timeline with custom dot-nodes
  - Tracks section showcasing 3 domains (AI, Vibeathon, UI/UX)
  - Prizes and rules sections
  - FAQ accordion with manga styling
  - Gallery section for past events
  - Community links and social media integration

- **Registration System**
  - Multi-member team registration (up to 3 members)
  - Domain selection (vibecoding, agenticai, uiux)
  - GitHub/Figma submission URL validation
  - Problem statement reveal with countdown timer
  - Confetti animation on registration success

- **Judge Portal**
  - Secure passcode authentication
  - 8-lab navigation system
  - Team listing by lab with scoring status
  - Real-time scoring form with 6 criteria
    - Innovation, Execution, Presentation
    - Impact, Feasibility, Scalability
  - Domain leaderboards (lab round)
  - Final round team management
  - Final leaderboard

- **Admin Dashboard**
  - Secure login with JWT authentication
  - Comprehensive team management
  - Score tracking and analytics
  - Team promotion to finals (top 5 per domain)
  - Full results export functionality
  - Certificate management

- **Certificate System**
  - Automated certificate generation using Canvas API
  - Custom certificate template support
  - Participant lookup by team name
  - Downloadable PNG certificates
  - All names rendered in UPPERCASE
  - Certificate save to profile functionality

#### 🛠️ Technical Features

- **Frontend**
  - Next.js 16 with App Router and Turbopack
  - React 19 with TypeScript 5
  - Tailwind CSS v4 for styling
  - shadcn/ui component library
  - GSAP for advanced animations
  - React Hook Form with Zod validation
  - Sonner for toast notifications
  - TanStack Query for data fetching

- **Backend**
  - Next.js API Routes
  - MongoDB with Mongoose ODM
  - Server Actions for form submissions
  - JWT-based authentication
  - Cookie-based sessions for judges

- **Database**
  - 73 teams seeded across 8 labs
  - 3 domains (vibecoding, agenticai, uiux)
  - Score tracking per judge per team
  - Certificate storage per participant
  - Leaderboard aggregation pipeline

#### 🎨 Design System

- Manga/comic book aesthetic
- Custom CSS classes (manga-panel, action-text, halftone-bg)
- Hard black borders with comic-style shadows
- Dynamic typography inspired by comic sound effects
- Responsive design for all screen sizes
- Dark theme with electric purple and red accents

#### 📝 Documentation

- Comprehensive README.md
- MIT License
- Contributing guidelines
- Code of Conduct
- Issue templates (bug report, feature request)
- Pull request template
- This CHANGELOG.md

#### 🗃️ Database Seeding

- `seed.ts` - Main seeder for all 73 competition teams
- `partseed.ts` - Seeder with participant certificates
- `singleseed.ts` - Individual team seeder for updates

---

## [Unreleased]

### 🚧 In Progress

- Enhanced certificate templates
- Real-time leaderboard updates
- Email notifications for participants
- Advanced analytics dashboard

### 🔮 Planned

- Multi-language support
- PWA (Progressive Web App) features
- AI-powered team matching
- Virtual judging interface
- Mobile app companion

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-03-28 | Initial release with full hackathon platform |

---

## How to Update This Changelog

When adding new entries:

1. Add changes under `[Unreleased]` section
2. Use categories: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`
3. Move items to version section when releasing
4. Follow [Keep a Changelog](https://keepachangelog.com/) format

**Example:**
```markdown
### Added
- New feature description

### Fixed
- Bug fix description
```

---

<p align="center">
  <strong>TechBlitz 2026 - CODE. DESIGN. TRANSFORM. 💥</strong>
</p>
