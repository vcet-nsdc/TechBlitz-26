# Contributing to TechBlitz 2026

First off, thank you for considering contributing to TechBlitz 2026! It's people like you that make this hackathon platform a great tool for the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/techblitz-2026.git
cd techblitz-2026

# Add the upstream repository
git remote add upstream https://github.com/vcet-nsdc/techblitz-2026.git
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your configuration
# See README.md for required variables

# Start development server
npm run dev
```

### 3. Create a Branch

```bash
# Fetch latest changes from upstream
git fetch upstream

# Create your feature branch from main
git checkout -b feature/your-feature-name upstream/main
```

---

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please:
1. Check the [existing issues](https://github.com/vcet-nsdc/techblitz-2026/issues) to avoid duplicates
2. Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)

**When submitting a bug report, include:**
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

### Suggesting Features

Feature requests are welcome! Please:
1. Check if the feature already exists or has been requested
2. Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)

**When submitting a feature request, include:**
- A clear description of the feature
- Why this feature would be useful
- Possible implementation approach
- Any relevant mockups or examples

### Contributing Code

1. Look for issues labeled `good first issue` or `help wanted`
2. Comment on the issue to express interest
3. Wait for maintainer assignment before starting work

---

## 🔄 Development Workflow

### Branch Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/description` | `feature/judge-scoring-ui` |
| Bug Fix | `fix/description` | `fix/certificate-download` |
| Documentation | `docs/description` | `docs/api-endpoints` |
| Refactor | `refactor/description` | `refactor/score-calculation` |
| Hotfix | `hotfix/description` | `hotfix/auth-bypass` |

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Update your local main branch
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

---

## 🎨 Style Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### TypeScript Guidelines

- Use **strict TypeScript** with proper type annotations
- Avoid `any` types unless absolutely necessary
- Define interfaces for all data structures
- Use enum types for fixed sets of values

```typescript
// ✅ Good
interface Team {
  id: string;
  name: string;
  domain: 'vibecoding' | 'agenticai' | 'uiux';
  members: string[];
}

// ❌ Avoid
const team: any = { ... };
```

### React/Next.js Guidelines

- Use **functional components** with hooks
- Follow the **App Router** patterns
- Use **Server Components** by default
- Use **Client Components** only when needed (interactivity)
- Implement proper **error boundaries**

```typescript
// ✅ Server Component (default)
export default async function TeamPage() {
  const teams = await getTeams();
  return <TeamList teams={teams} />;
}

// ✅ Client Component (when needed)
'use client';
export default function InteractiveForm() {
  const [state, setState] = useState();
  // ...
}
```

### Tailwind CSS Guidelines

- Use **Tailwind classes** over inline styles
- Follow the **mobile-first** approach
- Use **custom theme colors** from the project
- Group related classes logically

```tsx
// ✅ Good
<button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 
                   text-white font-semibold rounded-lg 
                   hover:from-red-700 hover:to-red-900 
                   transition-all duration-300">
  Submit Score
</button>
```

### File Organization

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── sections/    # Page section components
├── lib/             # Utilities and helpers
├── hooks/           # Custom React hooks
└── types/           # TypeScript types
```

---

## 📝 Commit Message Guidelines

We follow **Conventional Commits** specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(judge): add scoring form validation` |
| `fix` | Bug fix | `fix(api): resolve MongoDB serialization error` |
| `docs` | Documentation | `docs(readme): update installation steps` |
| `style` | Code style | `style(components): fix indentation` |
| `refactor` | Code refactoring | `refactor(scores): optimize calculation logic` |
| `test` | Tests | `test(auth): add judge login tests` |
| `chore` | Maintenance | `chore(deps): update mongoose to v9` |

### Examples

```bash
# Feature commit
git commit -m "feat(judge): implement real-time scoring form"

# Fix with scope
git commit -m "fix(api): resolve team lookup case sensitivity issue"

# Documentation update
git commit -m "docs(readme): add API endpoint documentation"

# Breaking change
git commit -m "feat(auth)!: migrate to JWT-based authentication

BREAKING CHANGE: Session cookies replaced with JWT tokens"
```

---

## 🔀 Pull Request Process

### Before Submitting

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and linting**
   ```bash
   npm run lint
   npm run build
   ```

3. **Test your changes**
   - Manual testing in browser
   - Test on different screen sizes
   - Verify database operations work

### Creating the PR

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Fill out the PR template** completely
   - Describe what changes were made
   - Link related issues
   - Include screenshots for UI changes

3. **Request review** from maintainers

### PR Review Process

- **Automated checks** must pass (CI/CD)
- **Code review** by at least one maintainer
- **Approval** required before merge
- **Squash and merge** is the default strategy

### After Merge

- Your branch will be deleted after merge
- Changes will be deployed automatically (if CI/CD configured)

---

## 🆘 Need Help?

- **Discord**: Join our [community Discord](https://discord.gg/vcet-nsdc)
- **Email**: techblitz@vcet.edu.in
- **Issues**: Create a [GitHub issue](https://github.com/vcet-nsdc/techblitz-2026/issues)

---

## 🙏 Thank You!

Your contributions help make TechBlitz 2026 better for everyone. We appreciate your time and effort!

<p align="center">
  <strong>Happy Contributing! 💥</strong>
</p>
