Here's your complete Windsurf SWE-1.5 prompt:

---

```
You are building a full-stack Next.js 16 (App Router) web application for a tech event called **TechBlitz26**. This is an addition to an existing landing page project. Build everything described below with clean, production-grade code. The UI must be fully mobile-responsive using Tailwind CSS.

---

## 🎨 DESIGN SYSTEM

Use a dark-themed, techy aesthetic throughout:
- Background: #0a0a0f (near black)
- Primary accent: #6c47ff (electric purple)
- Secondary accent: #00d4ff (cyan)
- Text: #f0f0f0
- Card backgrounds: #13131a with border #ffffff10
- Font: `Space Grotesk` for headings, `Inter` for body (import from Google Fonts in layout)
- All pages must be mobile-first responsive (sm/md/lg breakpoints)
- Use subtle glowing effects, gradient borders, and animated transitions

---

## 📁 FILE STRUCTURE TO CREATE

```
app/
├── problem-statement/
│   ├── page.tsx                  ← Page 1: Team Registration
│   ├── submit/page.tsx           ← Page 2: GitHub/Figma Submission
│   └── reveal/page.tsx           ← Page 3: Problem Statement Reveal
├── certificates/
│   └── page.tsx                  ← Certificate Lookup
├── admin/
│   ├── page.tsx                  ← Admin Login
│   └── dashboard/page.tsx        ← Admin Dashboard
├── api/
│   ├── register/route.ts         ← POST: Save team to MongoDB
│   ├── teams/route.ts            ← GET: All teams (admin only)
│   ├── team/[teamName]/route.ts  ← GET: Team by name (certificate)
│   └── certificate/save/route.ts ← POST: Save generated certificate to DB
lib/
├── mongodb.ts                    ← MongoDB connection (use mongoose)
├── models/Team.ts                ← Mongoose Team model
├── problemStatements.ts          ← Problem statement content per domain
└── adminAuth.ts                  ← Admin auth helper
public/
└── certificate-template.png     ← (User will replace this placeholder)
components/
├── CertificateCanvas.tsx         ← Canvas-based certificate generator
└── AdminGuard.tsx                ← Admin auth wrapper
```

---

## 🗃️ MONGODB SCHEMA

Install: `npm install mongoose`

**Team Model** (`lib/models/Team.ts`):
```ts
{
  teamName: { type: String, required: true, unique: true },
  leaderName: { type: String, required: true },
  member2: { type: String, required: true },
  member3: { type: String },
  domain: { type: String, enum: ['vibecoding', 'agenticai', 'uiux'], required: true },
  submissionUrl: { type: String, required: true },
  certificates: [
    {
      participantName: String,
      certificateDataUrl: String,   // base64 PNG
      generatedAt: Date
    }
  ],
  createdAt: { type: Date, default: Date.now }
}
```

**MongoDB connection** (`lib/mongodb.ts`):
- Use a cached mongoose connection pattern
- Read URI from `process.env.MONGODB_URI`

---

## 🔐 ENVIRONMENT VARIABLES

Create `.env.local`:
```
MONGODB_URI=mongodb+srv://...
ADMIN_USERNAME=techblitz_admin
ADMIN_PASSWORD=techblitz@2026
ADMIN_SECRET=supersecrettoken123
```

---

## 📄 PAGE 1 — Team Registration (`/problem-statement`)

**Form fields:**
- Team Name (required)
- Leader Name (required)
- Member 2 Name (required)
- Member 3 Name (optional)
- Domain selector — styled as clickable cards with icons:
  - 💻 Vibe Coding (`vibecoding`)
  - 🤖 Agentic AI (`agenticai`)
  - 🎨 UI/UX (`uiux`)

**Behavior:**
- Validate all required fields before proceeding
- Store form data in `sessionStorage` (key: `tbz_registration`)
- On submit → navigate to `/problem-statement/submit`

**Design:**
- Centered card layout with glowing border
- Domain cards highlight on hover and show selected state with purple glow
- Animated entrance (fade + slide up on load)
- Progress indicator: Step 1 of 3

---

## 📄 PAGE 2 — Submission (`/problem-statement/submit`)

**Read domain from sessionStorage.**

**If domain = `vibecoding` or `agenticai`:**
- Show: GitHub Repository URL input
- Validate that the URL contains `TECHBLITZ26-` followed by the team name (case-insensitive)
- Show format hint: `https://github.com/username/TECHBLITZ26-TEAMNAME`
- Show error if format doesn't match

**If domain = `uiux`:**
- Show: Figma File URL input
- Validate it starts with `https://www.figma.com/`

**On Submit:**
- Call `POST /api/register` with all data from sessionStorage + submissionUrl
- On success → save response team data to sessionStorage (key: `tbz_team`) → navigate to `/problem-statement/reveal`
- Show loading spinner during API call
- Show error toast if team name already exists

**Design:**
- Same card layout, progress indicator: Step 2 of 3
- Animated transition from Page 1

---

## 📄 PAGE 3 — Problem Statement Reveal (`/problem-statement/reveal`)

**Read domain from sessionStorage.**

**Content** (`lib/problemStatements.ts`):
```ts
export const problemStatements = {
  vibecoding: {
    title: "Vibe Coding Challenge",
    statement: "Build a fully functional web application that solves a real-world problem using AI-assisted development tools. Your solution must demonstrate creative use of modern web technologies and be deployable.",
    requirements: ["Working demo", "Clean codebase", "README with setup instructions"],
    timeLimit: "24 hours"
  },
  agenticai: {
    title: "Agentic AI Challenge", 
    statement: "Design and build an autonomous AI agent that can complete multi-step tasks with minimal human intervention. The agent should demonstrate reasoning, tool use, and adaptive decision-making.",
    requirements: ["Agent architecture diagram", "Working prototype", "Demo video"],
    timeLimit: "24 hours"
  },
  uiux: {
    title: "UI/UX Design Challenge",
    statement: "Redesign the onboarding experience for a fintech application targeting first-time users in Tier 2 and Tier 3 Indian cities. Focus on accessibility, simplicity, and trust-building.",
    requirements: ["User research summary", "Wireframes", "High-fidelity Figma prototype"],
    timeLimit: "24 hours"
  }
}
```

**Reveal Animation:**
- On page load: show "Revealing your challenge..." with a 3-second countdown animation (large animated number)
- After countdown: dramatic reveal — problem statement slides up with glowing effect
- Title in large gradient text (purple → cyan)
- Statement in readable card
- Requirements as checklist
- Confetti burst on reveal (use `canvas-confetti`: `npm install canvas-confetti @types/canvas-confetti`)

**Design:**
- Full-screen dark background
- Progress indicator: Step 3 of 3 (completed)
- "Good luck! 🚀" message with team name from sessionStorage

---

## 🔐 ADMIN PANEL — Login (`/admin`)

- This route should NOT be linked anywhere in the UI
- Simple centered login card with username + password fields
- On submit: call internal function that checks against `ADMIN_USERNAME` and `ADMIN_PASSWORD` from env
- On success: set `adminToken` cookie (value = `ADMIN_SECRET`) with httpOnly, 24h expiry → redirect to `/admin/dashboard`
- On failure: show "Invalid credentials" error

**Middleware** (`middleware.ts`):
- Protect `/admin/dashboard` — if no valid `adminToken` cookie → redirect to `/admin`

---

## 🔐 ADMIN DASHBOARD (`/admin/dashboard`)

**Fetch from `GET /api/teams`** (verify adminToken cookie server-side before returning data)

**Display:**
- Page title: "TechBlitz26 — Registered Teams"
- Stats row: Total teams | Vibe Coding count | Agentic AI count | UI/UX count
- Responsive table (scrollable on mobile) with columns:
  - # | Team Name | Leader | Member 2 | Member 3 | Domain (colored badge) | Submission URL (clickable link) | Registered At
- Search/filter bar to filter by team name or domain
- Logout button (clears cookie → redirects to `/admin`)

**Design:**
- Dark dashboard aesthetic
- Domain badges: purple for vibecoding, blue for agenticai, pink for uiux
- Table rows with hover highlight

---

## 🎓 CERTIFICATE PAGE (`/certificates`)

**Step 1 — Lookup form:**
- Input: Team Name
- On submit → call `GET /api/team/[teamName]` → returns team data

**Step 2 — Certificate display:**
- Show one certificate per team member (leader + member2 + member3 if present)
- For each member: render `<CertificateCanvas>` component

**CertificateCanvas Component** (`components/CertificateCanvas.tsx`):
```
Props: { participantName: string, teamName: string, domain: string }

Implementation:
- Use HTML Canvas API
- Draw `/certificate-template.png` as background (full canvas size: 1200x850px)
- Overlay participantName in large, bold white text at coordinates roughly (600, 420) centered
- Overlay teamName below it at coordinates roughly (600, 490) centered  
- Overlay domain text at roughly (600, 540) in smaller text
- Export: useRef on canvas element
- Provide a "Download Certificate" button that calls canvas.toDataURL('image/png') and triggers download
- Provide a "Save to Profile" button that calls POST /api/certificate/save with { teamName, participantName, certificateDataUrl }
```

**Font for canvas text:**
- Participant name: 52px bold, font-family 'Georgia' or serif, color white, with subtle text shadow
- Team name: 28px, same font, color #d4af37 (gold)
- Domain: 22px, color #aaaaaa

**Certificate save API** (`/api/certificate/save`):
- Find team by teamName in MongoDB
- Push `{ participantName, certificateDataUrl, generatedAt: new Date() }` to `certificates` array
- Return success

**Design:**
- Certificate preview at 100% width on mobile, capped at 800px on desktop
- Download button with download icon
- Success toast when saved

---

## 🌐 API ROUTES

### `POST /api/register`
- Body: `{ teamName, leaderName, member2, member3, domain, submissionUrl }`
- Validate all required fields
- Check if teamName already exists → return 409 if so
- Save to MongoDB → return 201 with team object

### `GET /api/teams`
- Check `adminToken` cookie against `ADMIN_SECRET` env var
- Return all teams sorted by createdAt desc
- Return 401 if unauthorized

### `GET /api/team/[teamName]`
- Find team by teamName (case-insensitive)
- Return team data
- Return 404 if not found

### `POST /api/certificate/save`
- Body: `{ teamName, participantName, certificateDataUrl }`
- Find team, push to certificates array
- Return 200

---

## ✅ GENERAL REQUIREMENTS

1. Every page must work perfectly on mobile (320px+), tablet, and desktop
2. All forms must have proper validation with user-friendly error messages shown inline
3. Use `next/navigation` (`useRouter`, `useSearchParams`) for navigation — no `window.location`
4. Show loading states on all async operations
5. Use `sonner` or a simple custom toast for success/error notifications (`npm install sonner`)
6. Add proper TypeScript types throughout — no `any` types
7. All API routes must handle errors gracefully and return appropriate HTTP status codes
8. The admin route must not appear in any navigation or sitemap
9. Add a simple `not-found.tsx` page
10. Ensure `public/certificate-template.png` has a placeholder that displays a message: "Replace this file with your actual certificate template image (1200x850px recommended)"

---

## 🚀 PACKAGES TO INSTALL

```bash
npm install mongoose canvas-confetti sonner
npm install -D @types/canvas-confetti
```

---

Start by creating the file structure, then implement in this order:
1. `lib/mongodb.ts` and `lib/models/Team.ts`
2. All API routes
3. `lib/problemStatements.ts`
4. Page 1 → Page 2 → Page 3
5. Admin login → Admin dashboard
6. Certificate page + CertificateCanvas component
7. Middleware for admin protection

Do not use any placeholder "TODO" comments — implement every feature fully.
