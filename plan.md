# Judge Portal — Implementation Plan
> Next.js 16 (App Router) + MongoDB + Mongoose
> Cursor-ready: follow phases in order, seed.ts is last

---

## Data Map (extracted from PDFs)

### 3 Domains
| Domain | Labs |
|--------|------|
| AI | AI 114A, AI 114B |
| Vibeathon | VibeCoding Seminar Hall, Vibeathon 220, Vibeathon 221, Vibeathon 222 |
| UI/UX | UI/UX 308A, UI/UX 308B |

### 8 Labs & Team Count
| Lab ID | Lab Name | Domain | Teams |
|--------|----------|--------|-------|
| lab-1 | AI 114A | AI | 8 |
| lab-2 | AI 114B | AI | 9 |
| lab-3 | VibeCoding Seminar Hall | Vibeathon | 8 |
| lab-4 | Vibeathon 220 | Vibeathon | 12 |
| lab-5 | Vibeathon 221 | Vibeathon | 9 |
| lab-6 | Vibeathon 222 | Vibeathon | 8 |
| lab-7 | UI/UX 308A | UI/UX | 9 |
| lab-8 | UI/UX 308B | UI/UX | 10 |
| | **Total** | | **73** |

---

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB via Mongoose
- **Auth**: Simple passcode stored in env vars (no NextAuth needed)
- **Styling**: Tailwind CSS (match existing manga theme)
- **Session**: `cookies()` from next/headers for judge session

---

## Environment Variables to Add
```env
JUDGE_PASSCODE=your_judge_passcode
ADMIN_PASSCODE=your_existing_admin_passcode
MONGODB_URI=your_mongodb_uri
```

---

## Folder Structure to Create
```
app/
  judge-portal/
    page.tsx                        # Login page (passcode gate)
    layout.tsx                      # Auth wrapper for all judge routes
    lab/
      page.tsx                      # Lab selector (grid of 8 labs)
      [labId]/
        page.tsx                    # Teams list in lab + scoring status
        [teamId]/
          page.tsx                  # Scoring form for a specific team
    leaderboard/
      page.tsx                      # 3-domain leaderboard (lab round)
    final/
      page.tsx                      # Final teams list (inFinal=true only)
      [teamId]/
        page.tsx                    # Scoring form (final round)
      leaderboard/
        page.tsx                    # 3-domain final leaderboard

  admin/
    judge-portal/
      page.tsx                      # Overview + nav
      promote/
        page.tsx                    # Leaderboard + promote top-5 per domain
      results/
        page.tsx                    # Full score export table

lib/
  models/
    Team.ts                         # Mongoose Team model
    Score.ts                        # Mongoose Score model
    JudgeSession.ts                 # (optional) track judge identity
  db.ts                             # MongoDB connection singleton
  auth.ts                           # Judge + admin passcode helpers

actions/
  scores.ts                         # Server actions: submitScore, getScores
  teams.ts                          # Server actions: getTeamsByLab, promoteToFinal

scripts/
  seed.ts                           # Seed all 73 teams (Phase 3)
```

---

# PHASE 1 — Foundation (Database + Auth + Models)

## Step 1.1 — MongoDB Connection
**File**: `lib/db.ts`
- Create a singleton Mongoose connection using `MONGODB_URI`
- Export a `connectDB()` function called at the top of every server action/route

## Step 1.2 — Team Model
**File**: `lib/models/Team.ts`

```typescript
// Schema shape — implement this exactly
{
  id: String (unique slug, e.g. "grimoire-coders"),
  name: String,
  domain: "AI" | "Vibeathon" | "UI/UX",
  labId: String,  // "lab-1" through "lab-8"
  labName: String, // human readable e.g. "AI 114A"
  members: [String],
  inFinal: { type: Boolean, default: false },
  createdAt: Date,
}
```

## Step 1.3 — Score Model
**File**: `lib/models/Score.ts`

```typescript
// Schema shape — implement this exactly
{
  teamId: String,           // ref to Team.id
  judgeName: String,        // judge identifies themselves by name on login
  round: "lab" | "final",
  criteria: {
    innovation: Number,     // 0–10
    execution: Number,      // 0–10
    presentation: Number,   // 0–10
    impact: Number,         // 0–10
  },
  total: Number,            // auto-computed: sum of all 4 criteria (max 40)
  submittedAt: Date,
}
// Compound unique index: { teamId, judgeName, round }
// A judge can only submit one score per team per round (upsert on re-submit)
```

## Step 1.4 — Auth Helpers
**File**: `lib/auth.ts`

- `isJudgeAuthenticated(request)` — checks cookie `judge_session` value against `JUDGE_PASSCODE` env var
- `isAdminAuthenticated(request)` — checks against existing admin auth
- `setJudgeCookie(response, judgeName)` — sets httpOnly cookie with judge name + passcode hash
- Judge login form captures **judge name** (free text) + **passcode** — name is stored in cookie for score attribution

## Step 1.5 — Judge Portal Layout + Auth Guard
**File**: `app/judge-portal/layout.tsx`
- Server component — reads cookie via `cookies()`
- If not authenticated → redirect to `/judge-portal` (login page)
- Wrap all child routes with this layout (except the login page itself)

## Step 1.6 — Admin Judge Portal Auth Guard
**File**: `app/admin/judge-portal/layout.tsx`
- Use existing admin auth pattern from your codebase
- All `/admin/judge-portal/*` routes protected here

---

# PHASE 2 — Judge Portal UI + Scoring

## Step 2.1 — Judge Login Page
**File**: `app/judge-portal/page.tsx`
- Manga-themed login card (match site aesthetic)
- Two inputs: **Judge Name** (text) + **Passcode** (password)
- On submit → POST to `/api/judge-portal/auth`
- On success → set cookie → redirect to `/judge-portal/lab`

**File**: `app/api/judge-portal/auth/route.ts`
- Validates passcode against env var
- Sets `judge_session` httpOnly cookie containing: `{ name, token: hash(passcode) }`

## Step 2.2 — Lab Selector Page
**File**: `app/judge-portal/lab/page.tsx`
- Grid of 8 lab cards
- Each card shows: Lab name, domain badge (colored), team count, "X/Y scored" progress
- Click → navigate to `/judge-portal/lab/[labId]`
- Lab IDs: `lab-1` through `lab-8`

## Step 2.3 — Teams In Lab Page
**File**: `app/judge-portal/lab/[labId]/page.tsx`
- Fetches all teams where `labId === params.labId`
- For each team, check if current judge has already scored them this round
- Shows team cards with: team name, domain badge, member count, score status (✓ Scored / ○ Pending)
- Click team → `/judge-portal/lab/[labId]/[teamId]`

## Step 2.4 — Scoring Form (Reusable Component)
**File**: `components/judge/ScoringForm.tsx`

Props: `{ team: Team, existingScore?: Score, round: "lab" | "final", judgeName: string }`

UI:
- Team name + members list at top
- 4 sliders or number inputs (0–10 each):
  - 🔥 Innovation
  - ⚙️ Execution  
  - 🎤 Presentation
  - 🌍 Impact
- Live total score display (out of 40)
- Submit button → calls `submitScore` server action
- If `existingScore` provided → pre-fill form (edit mode)
- On success → redirect back to lab/final team list

## Step 2.5 — Lab Scoring Route
**File**: `app/judge-portal/lab/[labId]/[teamId]/page.tsx`
- Fetch team by `teamId`
- Fetch existing score for this judge + team + round:"lab"
- Render `<ScoringForm>` with round="lab"

## Step 2.6 — Score Server Action
**File**: `actions/scores.ts`

```typescript
// submitScore(data: ScoreInput) — server action
// 1. Validate all criteria are 0–10
// 2. Compute total = sum of 4 criteria
// 3. Upsert: findOneAndUpdate({ teamId, judgeName, round }, score, { upsert: true })
// 4. Return success/error

// getScoresByTeam(teamId, round) — returns all judge scores for a team
// getScoresByJudge(judgeName, round) — for showing judge's own history
// getLeaderboard(round) — aggregation pipeline (see below)
```

## Step 2.7 — Leaderboard Page (Lab Round)
**File**: `app/judge-portal/leaderboard/page.tsx`
- 3 tabs: AI | Vibeathon | UI/UX
- Each tab shows ranked table: Rank | Team Name | Lab | Avg Score | # Judges
- Sorted by `avg(total)` across all judge scores for that team in `round: "lab"`
- Auto-refreshes every 30 seconds (use `router.refresh()` on interval)
- Highlight top 5 per domain with gold/silver/bronze styling

**MongoDB Aggregation for leaderboard** (put in `actions/scores.ts`):
```typescript
// getLeaderboard(round: "lab" | "final")
// Pipeline:
// 1. Match scores by round
// 2. Group by teamId → avg total, count of judges
// 3. Lookup team details (name, domain, labId)
// 4. Sort by avgScore desc
// 5. Group by domain
```

## Step 2.8 — Final Round Pages
**File**: `app/judge-portal/final/page.tsx`
- Fetches teams where `inFinal: true`
- Same card layout as lab view but grouped by domain
- Shows 3 domain sections (AI / Vibeathon / UI/UX), up to 5 teams each

**File**: `app/judge-portal/final/[teamId]/page.tsx`
- Same as lab scoring but with `round="final"`
- Renders `<ScoringForm round="final">`

**File**: `app/judge-portal/final/leaderboard/page.tsx`
- Same component as lab leaderboard but queries `round: "final"`

---

# PHASE 3 — Admin Control Panel + Seed

## Step 3.1 — Admin Overview
**File**: `app/admin/judge-portal/page.tsx`
- Stats dashboard: total teams scored, domains progress, judges active
- Quick links to: Promote page, Results export

## Step 3.2 — Promote to Final Page
**File**: `app/admin/judge-portal/promote/page.tsx`

Layout: 3 columns (one per domain)

Each column:
- Live leaderboard sorted by avg lab score
- Top 5 highlighted with star ⭐
- Each team row has a toggle: "In Final" checkbox or button
- "Promote Top 5" bulk action button per domain
- Shows current status (already promoted teams marked)

**Server Action**: `promoteTeamToFinal(teamId: string, inFinal: boolean)`
- Updates `Team.inFinal` in MongoDB
- Can promote individually or bulk

## Step 3.3 — Results Export Page
**File**: `app/admin/judge-portal/results/page.tsx`
- Full table: all teams × all judges × all scores
- Filter by: domain, lab, round
- "Export CSV" button → downloads raw score data
- Shows per-judge breakdown (useful to spot outlier judges)

## Step 3.4 — API Routes Needed
```
POST /api/judge-portal/auth          # Judge login
POST /api/judge-portal/logout        # Clear cookie
GET  /api/judge-portal/scores        # Get scores (judge-scoped)
POST /api/judge-portal/scores        # Submit/update score
GET  /api/admin/judge-portal/leaderboard   # Full leaderboard for admin
POST /api/admin/judge-portal/promote       # Promote team to final
GET  /api/admin/judge-portal/export        # CSV export
```

## Step 3.5 — Seed File
**File**: `scripts/seed.ts`

> Run with: `npx ts-node --project tsconfig.json scripts/seed.ts`

Seed data (all 73 teams from PDFs):

```typescript
// ── AI DOMAIN ──────────────────────────────────────────────
// Lab: AI 114A (lab-1)
{ name: "Dynamic Duo (Plus One)", domain: "AI", labId: "lab-1", labName: "AI 114A",
  members: ["Saivamshi Jilla", "Shubham Barge", "Anshuman Jena"] },
{ name: "BreakPoint", domain: "AI", labId: "lab-1", labName: "AI 114A",
  members: ["Yash Kadam", "Dishant Sasane", "Yash Rane"] },
{ name: "BitWin Init", domain: "AI", labId: "lab-1", labName: "AI 114A",
  members: ["Nikhil Yadav", "Rohit Ravindra Khaire", "Aryan Bandekar"] },
{ name: "Vishpala Sena", domain: "AI", labId: "lab-1", labName: "AI 114A",
  members: ["Chaudhari Omkar Santosh", "Sawant Nikita Kiran", "Patil Tanishka Ashish"] },
{ name: "MetaMinds", domain: "AI", labId: "lab-1", labName: "AI 114A",
  members: ["Akhila Bijja", "Saikrishna Pasikanti", "Hrishita Vinherkar"] },
{ name: "Infinite Pointers", domain: "AI", labId: "lab-1", labName: "AI 114A",
  members: ["Tirth Rana", "Prajwal Kanade", "Ahmed Khan"] },
{ name: "Nexus", domain: "AI", labId: "lab-1", labName: "AI 114A",
  members: ["Tanishq Kiran Kuchekar", "Rutuja Renukadas Joshi", "Priyanka Vishnu Joshi"] },
{ name: "Coding Cuties", domain: "AI", labId: "lab-1", labName: "AI 114A",
  members: ["Sanskar Thakur", "Gayatri Sabat", "Nishit Tare"] },

// Lab: AI 114B (lab-2)
{ name: "Kadix", domain: "AI", labId: "lab-2", labName: "AI 114B",
  members: ["Devanshi Solanki", "Aditi Mishra", "Kajal Tiwari"] },
{ name: "Teen Titans Go", domain: "AI", labId: "lab-2", labName: "AI 114B",
  members: ["Sahil Rajesh Dhavale", "Shubham Jagannath Parande", "Vedaant Dinesh Ambolkar"] },
{ name: "Yadav's", domain: "AI", labId: "lab-2", labName: "AI 114B",
  members: ["Rishiraj Kamal Yadav", "Aniruddha Ravindra Yadav", "Visha Yadav"] },
{ name: "Kasukabe Defense Force", domain: "AI", labId: "lab-2", labName: "AI 114B",
  members: ["Arnav Gupta", "Yasmeen Ahmadabadwala"] },
{ name: "Sentinels", domain: "AI", labId: "lab-2", labName: "AI 114B",
  members: ["Madhusudan Chanda", "Rashmit Gaikwad", "Ravi Jethwa"] },
{ name: "M-Power", domain: "AI", labId: "lab-2", labName: "AI 114B",
  members: ["Meet Ninad Naik", "Misty Manushree", "Manthan Mesta"] },
{ name: "Agent-X", domain: "AI", labId: "lab-2", labName: "AI 114B",
  members: ["Sujal Vaishnav", "Vedant Dhawan"] },
{ name: "Code Smashers", domain: "AI", labId: "lab-2", labName: "AI 114B",
  members: ["Vedant Dhavan", "Suyash Dhulap"] },
{ name: "In Code We Trust", domain: "AI", labId: "lab-2", labName: "AI 114B",
  members: ["Swayam Raut", "Pranavakumar Murali", "Ruturaj Patil"] },

// ── VIBEATHON DOMAIN ───────────────────────────────────────
// Lab: VibeCoding Seminar Hall (lab-3)
{ name: "Aventre", domain: "Vibeathon", labId: "lab-3", labName: "VibeCoding Seminar Hall",
  members: ["Aarchi Dobriya", "Arambh Ranawat"] },
{ name: "TRIO", domain: "Vibeathon", labId: "lab-3", labName: "VibeCoding Seminar Hall",
  members: ["Ankush Pal", "Rahul Dashrath Pal", "Avnishkumar Upendra Pandey", "Himanshu Pandey"] },
{ name: "Terminators", domain: "Vibeathon", labId: "lab-3", labName: "VibeCoding Seminar Hall",
  members: ["Divakar Navik", "AdityaKumar Pandey"] },
{ name: "Vibechefs", domain: "Vibeathon", labId: "lab-3", labName: "VibeCoding Seminar Hall",
  members: ["Parth Ganesh Shelar", "Shagun Mithilesh Vishwakarma", "Prashant Mishra"] },
{ name: "Karatsuba", domain: "Vibeathon", labId: "lab-3", labName: "VibeCoding Seminar Hall",
  members: ["Rishabh Jhaveri", "Omkar Patil"] },
{ name: "Trident Ai", domain: "Vibeathon", labId: "lab-3", labName: "VibeCoding Seminar Hall",
  members: ["Aastha Upadhyay", "Aryan Gajana Ubale", "Sujal Verma"] },
{ name: "CodeZero", domain: "Vibeathon", labId: "lab-3", labName: "VibeCoding Seminar Hall",
  members: ["Yash Nilesh Kasare", "Gaurav Nevarekar", "Aman Mehtar"] },
{ name: "Accidental Programmers", domain: "Vibeathon", labId: "lab-3", labName: "VibeCoding Seminar Hall",
  members: ["Nitesh Rai", "Vinayak Shukla", "Ujjwal Tiwari"] },

// Lab: Vibeathon 220 (lab-4)
{ name: "team menuvr", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Shayaan Shaikh", "Anshu Gupta", "Ankit Vishwakarma"] },
{ name: "SouL", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Tanuj Sumant Rane", "Shivam Tashvant Teli", "Om Pujari"] },
{ name: "Team Encoders", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Parth Sadanand Gawad", "Shifa Javed Shaikh", "Sukanya Sanjay Jadhav"] },
{ name: "Try Catch", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Yash Vilas Karande", "Aditya Manoj Patil", "Siddhesh Namdev Devre"] },
{ name: "404 Not Found", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Kuldeep Kishan Kolage", "Ninad Patil", "Sahil Lakade"] },
{ name: "StackOfError", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Aman Mandal", "Yash Dhekale", "Priyanka Jain"] },
{ name: "Code Warriors", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Krutika Khamkar", "Nivrutti Chavan", "Vedant Ghadi"] },
{ name: "Team Hustlers", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Aryan Sawant", "Mitesh Ghadigaonkar", "Aman Kushwaha"] },
{ name: "NeuroNexus", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Nirja Navinkumar Chorghe", "Jeet Dipesh Gawad", "Sahil Sandeep Patil"] },
{ name: "404 Brain Not Found", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Manmeet Singh", "Pratham Mewada", "Advet Gavli"] },
{ name: "Debug_Squad", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Diah Bangera", "Mihika Chaudhari"] },
{ name: "CYBERPSYCHO", domain: "Vibeathon", labId: "lab-4", labName: "Vibeathon 220",
  members: ["Prasad Dagdu Dalvi", "Avishkar Choudhari", "Akash Prakash Chavan"] },

// Lab: Vibeathon 221 (lab-5)
{ name: "BlackFlag", domain: "Vibeathon", labId: "lab-5", labName: "Vibeathon 221",
  members: ["Omkar Ugalmugale", "Piyush Vishwakarma", "Bharat Solanki"] },
{ name: "The Defenders", domain: "Vibeathon", labId: "lab-5", labName: "Vibeathon 221",
  members: ["Sauhard Jadhav", "Pranav Shinde", "Aryan Singh"] },
{ name: "PKG", domain: "Vibeathon", labId: "lab-5", labName: "Vibeathon 221",
  members: ["Ayush Choudhar", "Prashant Dhuri", "Ritesh Gharat"] },
{ name: "Sun Slappers", domain: "Vibeathon", labId: "lab-5", labName: "Vibeathon 221",
  members: ["Samyak Ahire", "Saumit Bhojne", "Siddanth Chavan"] },
{ name: "Edge Runner", domain: "Vibeathon", labId: "lab-5", labName: "Vibeathon 221",
  members: ["Pranjal Badgujar", "Kshitij Atalkar", "Om P. Pethkar"] },
{ name: "Golden Pear", domain: "Vibeathon", labId: "lab-5", labName: "Vibeathon 221",
  members: ["Ashish Yadav", "Deepak Joshi", "Krishna Mishra"] },
{ name: "Syntax Squad", domain: "Vibeathon", labId: "lab-5", labName: "Vibeathon 221",
  members: ["Taanya Nigam", "Lavanya Kini", "Archita Gupta"] },
{ name: "Full Stack Alchemist's", domain: "Vibeathon", labId: "lab-5", labName: "Vibeathon 221",
  members: ["Aryan Nair", "Ved Vasaikar"] },
{ name: "Bug Slayers", domain: "Vibeathon", labId: "lab-5", labName: "Vibeathon 221",
  members: ["Sumeet Kadam", "Dhruv Choudhary", "Bhavya Damani"] },

// Lab: Vibeathon 222 (lab-6)
{ name: "DSE", domain: "Vibeathon", labId: "lab-6", labName: "Vibeathon 222",
  members: ["Swayam Dashrath Gode", "Vedant Kishor Mhatre"] },
{ name: "PARALLAX", domain: "Vibeathon", labId: "lab-6", labName: "Vibeathon 222",
  members: ["Pranay Patkar", "Varun Poojary", "Vihar Makwana"] },
{ name: "FromZero", domain: "Vibeathon", labId: "lab-6", labName: "Vibeathon 222",
  members: ["Sagar Rambade", "Deep Patil"] },
{ name: "Code Commanders", domain: "Vibeathon", labId: "lab-6", labName: "Vibeathon 222",
  members: ["Akash Holsambre", "Ajay Maurya", "Vaibhav Singh"] },
{ name: "Forget to Code", domain: "Vibeathon", labId: "lab-6", labName: "Vibeathon 222",
  members: ["Pradhyumna Bait", "Harsh Jethwa", "Parth Redij"] },
{ name: "Byte Blitz", domain: "Vibeathon", labId: "lab-6", labName: "Vibeathon 222",
  members: ["Krishna Pankaj Panchal", "Khan Huzaifa Khatoon", "Manyata Prashant Deshpande"] },
{ name: "Snack Overflow", domain: "Vibeathon", labId: "lab-6", labName: "Vibeathon 222",
  members: ["Mandar Prabhu", "Aryan Sadvilkar", "Niharika Mantri"] },
{ name: "Terminal Crew", domain: "Vibeathon", labId: "lab-6", labName: "Vibeathon 222",
  members: ["Aryan Kate", "Dipesh Mahesh Karalkar", "Aditya Anand Fandate"] },

// ── UI/UX DOMAIN ───────────────────────────────────────────
// Lab: UI/UX 308A (lab-7)
{ name: "Grimoire Coders", domain: "UI/UX", labId: "lab-7", labName: "UI/UX 308A",
  members: ["Gound Prince K.", "Prashant Hotkar B.", "Chatterjee Anik Tarun"] },
{ name: "Anything Works", domain: "UI/UX", labId: "lab-7", labName: "UI/UX 308A",
  members: ["Seon D'silva", "Niharika Raut", "Rishi Vartak"] },
{ name: "AIRNOVA", domain: "UI/UX", labId: "lab-7", labName: "UI/UX 308A",
  members: ["Saiesh Sutar", "Om Kanojiya", "Vikash Pandey"] },
{ name: "Pixel3", domain: "UI/UX", labId: "lab-7", labName: "UI/UX 308A",
  members: ["Madhuri Manohar Billa", "Varsha Anand Dasari", "Mayuri Sachin Gurav"] },
{ name: "The Fourth Vector", domain: "UI/UX", labId: "lab-7", labName: "UI/UX 308A",
  members: ["Kartikey Patil", "Akshay Kokate", "Vinanti Mhatre"] },
{ name: "UX Dominators", domain: "UI/UX", labId: "lab-7", labName: "UI/UX 308A",
  members: ["Vignesh Ashok Yemul", "Rohit Ganesh Mali", "Nishant Srinivas Usakoyala"] },
{ name: "UI NINJAS", domain: "UI/UX", labId: "lab-7", labName: "UI/UX 308A",
  members: ["Chintan Chavnekar", "Karm Gujrati", "Harsh Bharati"] },
{ name: "Hustlers", domain: "UI/UX", labId: "lab-7", labName: "UI/UX 308A",
  members: ["Om Anil Udeg", "Aayush Munnalal Yadav", "Shivam Ravindra Joshi"] },
{ name: "Technexis", domain: "UI/UX", labId: "lab-7", labName: "UI/UX 308A",
  members: ["Sunny Dinesh Gupta", "Shreya Agnihotri", "Aquib Ahmad"] },

// Lab: UI/UX 308B (lab-8)
{ name: "DesignOrbit", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Samiksha Subhash Desai", "Pankaj Murlidhar Chaudhari", "Shruti Ganesh Dhodi"] },
{ name: "MadhavX Coders", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Vinayak Prashant Kokkul", "Madhav Mittapelli", "Tanmay Patil"] },
{ name: "UX Wizards", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Deep Godhani", "Prajwala Bhandary", "Kartika Chavan"] },
{ name: "Creative Coders", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Konisha Jayesh Thakare", "Lavanya Nitin Murudkar"] },
{ name: "FlowCraft", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Pranjal Keshav Patil", "Shravani Sandeep Raut", "Aayush Hemant Patil"] },
{ name: "DSA", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Aditi Nandivikar", "Darsana Nair", "Simran Pawar"] },
{ name: "Prototype", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Bhavik Jain", "Soham Patil"] },
{ name: "Thinktank", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Adeena Deshmukh", "Vaidehi Haryan", "Sohan Ambhire"] },
{ name: "Shadow Coders", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Pratik Ghanwat", "Chetan Bhuyal", "Galaiya Vrusti"] },
{ name: "Monk Designers", domain: "UI/UX", labId: "lab-8", labName: "UI/UX 308B",
  members: ["Lokesh Rathod", "Aditya Rajak"] },
```

Seed script logic:
1. `connectDB()`
2. `await Team.deleteMany({})` — wipe existing
3. Generate slug IDs from team names (kebab-case)
4. `await Team.insertMany(teams)`
5. Log count per domain and per lab
6. `process.exit(0)`

Add to `package.json`:
```json
"scripts": {
  "seed": "ts-node --project tsconfig.json scripts/seed.ts"
}
```

---

## Key Implementation Notes for Cursor

### Important Constraints
- **No auth pages are linked from navbar/public pages** — routes exist but are invisible to participants
- **Judge name is captured at login** and stored in cookie — no accounts, no registration
- **Duplicate scoring**: upsert by `{ teamId, judgeName, round }` — judges can edit scores freely until you lock
- **Score locking**: optional — add `isLocked: boolean` to Score model if needed
- **Final round is separate**: scores with `round: "final"` never mix with `round: "lab"` in aggregations

### MongoDB Indexes to Create
```typescript
// In Score model
ScoreSchema.index({ teamId: 1, round: 1 })          // leaderboard queries
ScoreSchema.index({ judgeName: 1, round: 1 })        // judge's own scores
ScoreSchema.index({ teamId: 1, judgeName: 1, round: 1 }, { unique: true }) // prevent duplicates

// In Team model  
TeamSchema.index({ domain: 1 })
TeamSchema.index({ labId: 1 })
TeamSchema.index({ inFinal: 1 })
```

### Domain Color Scheme (for badges)
```typescript
const domainColors = {
  "AI":        "bg-purple-500",   // purple
  "Vibeathon": "bg-green-500",    // green
  "UI/UX":     "bg-blue-500",     // blue
}
```

### Scoring Criteria Max Points
| Criterion | Max | Description |
|-----------|-----|-------------|
| Innovation | 10 | Originality of idea |
| Execution | 10 | Working demo / code quality |
| Presentation | 10 | Clarity of explanation |
| Impact | 10 | Real-world usefulness |
| **Total** | **40** | |

---

## Build Order for Cursor (strict sequence)

```
Phase 1:
  1. lib/db.ts
  2. lib/models/Team.ts
  3. lib/models/Score.ts
  4. lib/auth.ts
  5. app/api/judge-portal/auth/route.ts
  6. app/judge-portal/layout.tsx (auth guard)
  7. app/admin/judge-portal/layout.tsx (admin guard)

Phase 2:
  8.  app/judge-portal/page.tsx (login)
  9.  app/judge-portal/lab/page.tsx (lab selector)
  10. app/judge-portal/lab/[labId]/page.tsx (team list)
  11. components/judge/ScoringForm.tsx (reusable)
  12. actions/scores.ts (submitScore, getLeaderboard)
  13. app/judge-portal/lab/[labId]/[teamId]/page.tsx
  14. app/judge-portal/leaderboard/page.tsx
  15. app/judge-portal/final/page.tsx
  16. app/judge-portal/final/[teamId]/page.tsx
  17. app/judge-portal/final/leaderboard/page.tsx

Phase 3:
  18. app/admin/judge-portal/page.tsx
  19. app/admin/judge-portal/promote/page.tsx
  20. app/admin/judge-portal/results/page.tsx
  21. app/api/admin/judge-portal/* routes
  22. scripts/seed.ts  ← LAST
```