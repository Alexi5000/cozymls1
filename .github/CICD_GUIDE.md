# CI/CD Pipeline Guide

This project has a complete CI/CD pipeline configured with GitHub Actions. This guide explains how to set up and use it.

## 🚀 Quick Start

### 1. Configure GitHub Secrets

Go to your repository settings → Secrets and variables → Actions, and add these secrets:

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
```

You can find these values in your `.env` file (never commit the `.env` file!).

### 2. Enable Branch Protection

Go to Settings → Branches → Add rule for `main`:

- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Required checks: `Lint Check`, `TypeScript Type Check`, `Build Verification`

### 3. Push to GitHub

All workflows will start automatically on your next push!

---

## 📋 Workflows Overview

### 🔧 CI Workflow (`.github/workflows/ci.yml`)

**Triggers:** Every push and pull request

**What it does:**
- ✅ Runs ESLint to check code quality
- ✅ Runs TypeScript type checking
- ✅ Builds the project to verify it compiles
- ✅ Runs security audit for vulnerable dependencies

**When it runs:** Automatically on every push and PR

---

### 🚀 Deploy Workflow (`.github/workflows/deploy.yml`)

**Triggers:** Push to `main` branch only

**What it does:**
- ✅ Builds production-optimized bundle
- ✅ Uploads build artifacts (kept for 30 days)
- ✅ Provides deployment notifications

**When it runs:** Automatically when code is merged to `main`

**Note:** Lovable handles the actual deployment automatically. This workflow validates the build.

---

### 🔍 PR Checks Workflow (`.github/workflows/pr-checks.yml`)

**Triggers:** Pull requests opened, updated, or reopened

**What it does:**
- ✅ Validates PR title follows [Conventional Commits](https://www.conventionalcommits.org/)
- ✅ Compares bundle size between base and PR branch
- ✅ Runs code quality checks (lint, type check)
- ✅ Warns about console.log statements

**PR Title Format:**
```
feat: add user profile page
fix(auth): resolve login redirect bug
docs: update installation guide
refactor: simplify property card component
```

---

### 🔒 Security Workflow (`.github/workflows/security.yml`)

**Triggers:** 
- Weekly schedule (Monday 9 AM UTC)
- Push to `main`
- Manual trigger

**What it does:**
- ✅ Scans for dependency vulnerabilities with npm audit
- ✅ Runs CodeQL static analysis for security issues
- ✅ Checks for exposed secrets in code
- ✅ Verifies Supabase RLS policies are configured

**Manual trigger:** Go to Actions → Security Scan → Run workflow

---

### ⚡ Performance Workflow (`.github/workflows/performance.yml`)

**Triggers:** 
- Push to `main`
- Pull requests
- Manual trigger

**What it does:**
- ✅ Analyzes bundle size and composition
- ✅ Lists largest files in the build
- ✅ Warns if bundle exceeds 5MB threshold
- ✅ Measures build time

---

### 🎉 Release Workflow (`.github/workflows/release.yml`)

**Triggers:** Manual only

**What it does:**
- ✅ Bumps version (patch/minor/major)
- ✅ Generates changelog from commit history
- ✅ Creates Git tag
- ✅ Creates GitHub Release with notes
- ✅ Uploads build artifacts

**How to create a release:**

1. Go to Actions → Release → Run workflow
2. Choose version type:
   - **Patch** (1.0.0 → 1.0.1): Bug fixes
   - **Minor** (1.0.0 → 1.1.0): New features
   - **Major** (1.0.0 → 2.0.0): Breaking changes
3. Check "Pre-release" if this is a beta/RC
4. Click "Run workflow"

---

## 🎯 Best Practices

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
feat: add property search filter
feat(dashboard): implement real-time stats

# Bug Fixes
fix: resolve mobile menu overflow
fix(auth): handle expired token gracefully

# Documentation
docs: add deployment instructions
docs(api): document webhook endpoints

# Refactoring
refactor: simplify contact form validation
refactor(hooks): optimize useProperties hook

# Other
chore: update dependencies
style: fix formatting issues
test: add unit tests for property card
perf: optimize image loading
```

### Pull Request Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feat/add-property-filters
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add property filters"
   git push origin feat/add-property-filters
   ```

3. **Open PR on GitHub:**
   - Title must follow Conventional Commits format
   - All CI checks must pass
   - Bundle size change will be reported
   - Review bundle size warnings

4. **After approval, merge to main:**
   - Squash commits (recommended)
   - Delete branch after merge

### Security Best Practices

- ✅ Never commit `.env` files
- ✅ Never commit API keys or secrets
- ✅ Use GitHub Secrets for sensitive data
- ✅ Review security scan results weekly
- ✅ Keep dependencies up to date
- ✅ Run `npm audit fix` when vulnerabilities found

### Performance Best Practices

- ✅ Monitor bundle size in PR checks
- ✅ Keep total bundle under 5MB
- ✅ Use code splitting for large components
- ✅ Lazy load routes and heavy components
- ✅ Optimize images before committing

---

## 🐛 Troubleshooting

### CI Build Fails

1. **Check workflow logs:**
   - Go to Actions tab
   - Click on failed workflow
   - Review error messages

2. **Common issues:**
   - TypeScript errors: Run `npx tsc --noEmit` locally
   - Linting errors: Run `npm run lint` locally
   - Build errors: Run `npm run build` locally
   - Missing secrets: Check repository secrets are configured

### Bundle Size Warning

If PR shows large bundle size increase:

1. Check what files changed
2. Identify large dependencies
3. Consider:
   - Code splitting
   - Lazy loading
   - Tree shaking
   - Removing unused dependencies

### Security Vulnerabilities

1. Review the security scan results
2. Run `npm audit` locally
3. Fix automatically: `npm audit fix`
4. If automatic fix fails: `npm audit fix --force` (use with caution)
5. For unfixable vulnerabilities, assess risk and document

---

## 📊 Monitoring

### GitHub Actions Dashboard

View all workflow runs:
- Repository → Actions tab
- Filter by workflow, branch, or status
- Download logs and artifacts

### Workflow Status Badges

Add to your README:

```markdown
![CI](https://github.com/USERNAME/REPO/workflows/CI/badge.svg)
![Deploy](https://github.com/USERNAME/REPO/workflows/Deploy/badge.svg)
![Security](https://github.com/USERNAME/REPO/workflows/Security/badge.svg)
```

Replace `USERNAME` and `REPO` with your details.

---

## 🔧 Customization

### Modify Workflows

Edit `.github/workflows/*.yml` files to:
- Change trigger conditions
- Add/remove jobs
- Configure notifications
- Integrate with external services

### Add More Checks

Examples:
- Unit tests with Vitest
- E2E tests with Playwright
- Lighthouse CI for performance
- Visual regression tests
- Custom linting rules

### Notifications

Add Slack/Discord/Email notifications:
- Use GitHub Actions marketplace actions
- Configure in workflow files
- Set up webhooks in your messaging platform

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [npm Audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🆘 Support

If you encounter issues:
1. Check this guide first
2. Review workflow logs in Actions tab
3. Search GitHub Actions marketplace for solutions
4. Check GitHub Discussions/Issues

---

**Last Updated:** 2025-01-07
**Pipeline Version:** 1.0.0
