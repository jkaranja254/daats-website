# August Blog Image Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the August blog hero image with a geometrically correct dock scene using a 2025 Peterbilt-style truck face.

**Architecture:** This change is asset-only. Generate a new hero image, overwrite the existing blog image path, verify the file and unchanged site contract, then push `preview` so Vercel serves the corrected asset.

**Tech Stack:** Built-in image generation tool, PowerShell, Node test runner, Git, Vercel preview deployment

---

### Task 1: Generate And Replace The Blog Hero Asset

**Files:**
- Modify: `assets/images/blog-fall-freight-prep.png`

- [ ] **Step 1: Generate a corrected image**

Use a prompt that explicitly requires:
- full trailer visible including rear axle
- truck backed into dock at 90 degrees
- 2025 Peterbilt-style lead tractor without logos

- [ ] **Step 2: Replace the existing asset**

Run:

```bash
Copy-Item "<generated-image-path>" "assets/images/blog-fall-freight-prep.png" -Force
```

- [ ] **Step 3: Inspect the result**

Verify the trailer and dock geometry are correct.

### Task 2: Verify And Publish

**Files:**
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Run tests**

Run: `npm test`

Expected: PASS

- [ ] **Step 2: Commit the replacement asset**

```bash
git add assets/images/blog-fall-freight-prep.png docs/superpowers/specs/2026-08-30-august-blog-image-fix-design.md docs/superpowers/plans/2026-08-30-august-blog-image-fix.md
git commit -m "Fix August blog hero image geometry"
```

- [ ] **Step 3: Push preview**

Run: `git push origin preview`

- [ ] **Step 4: Verify the public preview link still resolves**

Check the existing Vercel share link returns HTTP 200.
