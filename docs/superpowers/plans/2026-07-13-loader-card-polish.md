# Daats Loader And Card Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved first-visit Daats preloader, unify shared card spacing and hover behavior, enlarge the CTA band, and restyle the footer tagline.

**Architecture:** Keep all structural changes in the generator and all presentation and interaction changes in shared assets. Drive the loader from shared markup plus `assets/site.js`, and cover the new hooks and shared CSS behaviors with contract tests before regenerating pages.

**Tech Stack:** Static HTML generator (`scripts/build-site.mjs`), shared CSS (`assets/site.css`), shared browser JavaScript (`assets/site.js`), Node test runner (`node:test`)

---

## File Structure

- `scripts/build-site.mjs`
  - Shared page shell, footer markup, and generated page output.
  - Add the preloader shell and a footer tagline hook.
- `assets/site.css`
  - Loader visuals and animation.
  - Shared section-spacing rules.
  - Feature-card hover treatment.
  - CTA height adjustment.
  - Footer tagline typography.
- `assets/site.js`
  - Session-based first-visit loader behavior.
  - Perceived percentage progression and exit sequencing.
- `tests/site-contract.test.mjs`
  - Contract coverage for generated loader hooks and shared CSS rules.

### Task 1: Add Contract Coverage For Loader And Shared UI Hooks

**Files:**
- Modify: `tests/site-contract.test.mjs`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Write the failing test for generated loader and footer hooks**

```js
  it("renders shared loader hooks and a footer tagline hook", () => {
    const html = read("index.html");

    assert.match(html, /<div class="site-loader" data-site-loader hidden>/);
    assert.match(html, /<div class="site-loader-mark" data-loader-mark>/);
    assert.match(html, /<p class="site-loader-lockup" data-loader-lockup>DAATS<span>COMPANIES<\/span><\/p>/);
    assert.match(html, /<p class="site-loader-percent" data-loader-percent>0%<\/p>/);
    assert.match(html, /<p class="footer-tagline">SERVICE WITH INTEGRITY<\/p>/);
  });
```

- [ ] **Step 2: Write the failing test for shared CSS hooks**

```js
  it("defines shared spacing, feature-card hover treatment, CTA height, and loader styling", () => {
    const css = read("assets/site.css");

    assert.match(css, /\.section-copy \+ \.card-grid,\s*\n\.section-copy \+ \.blog-grid\s*\{[\s\S]*margin-top:\s*\d+px;/m);
    assert.match(css, /\.feature-item\s*\{[\s\S]*border:\s*1px solid var\(--line\);[\s\S]*border-radius:\s*var\(--radius\);/m);
    assert.match(css, /\.feature-item:hover,\s*\n\.feature-item:focus-within\s*\{[\s\S]*border-color:\s*var\(--red\);[\s\S]*transform:\s*translateY\(-8px\)/m);
    assert.match(css, /\.cta-band\s*\{[\s\S]*min-height:\s*4\d{2}px;/m);
    assert.match(css, /\.site-loader\s*\{[\s\S]*position:\s*fixed;[\s\S]*inset:\s*0;[\s\S]*background:\s*#000;/m);
  });
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test tests/site-contract.test.mjs`

Expected: FAIL with missing loader markup, missing `.footer-tagline`, and missing new CSS selectors.

- [ ] **Step 4: Commit test changes after the later green run**

```bash
git add tests/site-contract.test.mjs
git commit -m "test: cover loader and shared card polish"
```

### Task 2: Add Shared Preloader Markup And Footer Tagline Hook

**Files:**
- Modify: `scripts/build-site.mjs`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Add the preloader shell helper in the generator**

```js
function siteLoader(depth = 0) {
  return `<div class="site-loader" data-site-loader hidden><div class="site-loader-inner"><p class="site-loader-lockup" data-loader-lockup>DAATS<span>COMPANIES</span></p><div class="site-loader-orbit" aria-hidden="true"><div class="site-loader-ring site-loader-ring-outer"></div><div class="site-loader-ring site-loader-ring-mid"></div><div class="site-loader-mark" data-loader-mark><img src="${pathTo("assets/images/daats-logo-mark-transparent.png", depth)}" alt="" aria-hidden="true"></div></div><p class="site-loader-percent" data-loader-percent>0%</p></div></div>`;
}
```

- [ ] **Step 2: Inject the loader into the page shell and add a footer tagline hook**

```js
function layout({ title, description, body, depth = 0 }) {
  return `<!doctype html>
  <html lang="en">
  <head>...</head>
  <body>
    <div class="site-shell">
      ${siteLoader(depth)}
      ${header(depth)}
      ${body}
      ${footer(depth)}
    </div>
    <script src="${pathTo("assets/site.js", depth)}" defer></script>
  </body>
  </html>`;
}

function footer(depth = 0) {
  return `<footer class="site-footer" id="contact">...<div class="container footer-bottom"><p>&copy; 2026 Daats Companies, Inc. All rights reserved.</p><p class="footer-tagline">SERVICE WITH INTEGRITY</p></div></footer>`;
}
```

- [ ] **Step 3: Run test to verify it still fails only on missing CSS and JS behavior**

Run: `node --test tests/site-contract.test.mjs`

Expected: FAIL with CSS-related and behavior-hook assertions still missing, but loader markup and footer-tagline assertions present.

- [ ] **Step 4: Commit generator changes after the later green run**

```bash
git add scripts/build-site.mjs tests/site-contract.test.mjs
git commit -m "feat: add shared loader and footer hooks"
```

### Task 3: Implement Loader Behavior In Shared JavaScript

**Files:**
- Modify: `assets/site.js`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Read the existing shared script and add a minimal loader controller**

```js
const loader = document.querySelector("[data-site-loader]");
const loaderPercent = document.querySelector("[data-loader-percent]");
const loaderMark = document.querySelector("[data-loader-mark]");
const loaderSeenKey = "daats-loader-seen";

if (loader && loaderPercent && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  initSiteLoader({ loader, loaderPercent, loaderSeenKey });
}
```

- [ ] **Step 2: Implement the controller with session gating, perceived progress, and reveal exit**

```js
function initSiteLoader({ loader, loaderPercent, loaderSeenKey }) {
  if (sessionStorage.getItem(loaderSeenKey) === "true") return;

  const startedAt = performance.now();
  let progress = 0;
  let loaded = false;

  loader.hidden = false;
  document.documentElement.classList.add("is-loading");

  const tick = window.setInterval(() => {
    const ceiling = loaded ? 99 : 92;
    progress = Math.min(progress + (progress < 45 ? 4 : progress < 78 ? 2 : 1), ceiling);
    loaderPercent.textContent = `${progress}%`;
  }, 80);

  const finish = () => {
    loaded = true;
    const elapsed = performance.now() - startedAt;
    const wait = Math.max(0, 1800 - elapsed);

    window.setTimeout(() => {
      window.clearInterval(tick);
      loaderPercent.textContent = "100%";
      loader.classList.add("is-complete");
      sessionStorage.setItem(loaderSeenKey, "true");
      window.setTimeout(() => {
        loader.classList.add("is-hidden");
        document.documentElement.classList.remove("is-loading");
        window.setTimeout(() => {
          loader.hidden = true;
        }, 320);
      }, 220);
    }, wait);
  };

  if (document.readyState === "complete") {
    finish();
  } else {
    window.addEventListener("load", finish, { once: true });
  }
}
```

- [ ] **Step 3: Run test to verify markup-oriented tests still fail only on CSS expectations**

Run: `node --test tests/site-contract.test.mjs`

Expected: FAIL only on CSS rules that have not been added yet. No new JS runtime assertions are required in the contract suite.

- [ ] **Step 4: Commit shared script changes after the later green run**

```bash
git add assets/site.js
git commit -m "feat: add first-visit site loader behavior"
```

### Task 4: Implement Loader Styling And Shared Layout Polish

**Files:**
- Modify: `assets/site.css`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Add shared spacing rules for intro-copy-to-card layouts**

```css
.section-copy + .card-grid,
.section-copy + .blog-grid,
.section-copy + .feature-grid {
  margin-top: 34px;
}
```

- [ ] **Step 2: Add loader visuals and motion**

```css
.site-loader {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  background: #000;
  transition:
    opacity 320ms ease,
    visibility 320ms ease;
}

.site-loader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.site-loader-lockup {
  position: absolute;
  left: 50%;
  top: calc(50% - 132px);
  transform: translateX(-50%);
}

.site-loader-percent {
  position: absolute;
  left: 50%;
  top: calc(50% + 88px);
  transform: translateX(-50%);
}

.site-loader-mark {
  animation: loader-breathe 2.4s ease-in-out infinite;
}
```

- [ ] **Step 3: Convert feature rows into hoverable cards and enlarge the CTA**

```css
.feature-grid {
  gap: 20px;
}

.feature-item {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 30px 28px;
  background: rgba(4, 4, 4, 0.7);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    background-color 220ms ease;
}

.feature-item:hover,
.feature-item:focus-within {
  border-color: var(--red);
  background: rgba(10, 6, 6, 0.94);
  transform: translateY(-8px);
  box-shadow:
    0 26px 56px rgba(0, 0, 0, 0.42),
    0 0 0 1px var(--red-soft);
}

.cta-band,
.cta-content {
  min-height: 460px;
}
```

- [ ] **Step 4: Apply the footer tagline style and reduced-motion fallback**

```css
.footer-tagline {
  color: var(--muted);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.34em;
  text-transform: uppercase;
}

@media (prefers-reduced-motion: reduce) {
  .site-loader,
  .site-loader * {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test tests/site-contract.test.mjs`

Expected: PASS with all contract tests green.

- [ ] **Step 6: Commit shared CSS changes after the later full verification run**

```bash
git add assets/site.css tests/site-contract.test.mjs
git commit -m "feat: polish loader cards cta and footer styling"
```

### Task 5: Rebuild Generated Pages And Run Full Verification

**Files:**
- Modify: `index.html`
- Modify: `about.html`
- Modify: `services.html`
- Modify: `industries.html`
- Modify: `coverage.html`
- Modify: `safety.html`
- Modify: `blog.html`
- Modify: `blog/*.html`

- [ ] **Step 1: Rebuild the generated site**

Run: `node scripts/build-site.mjs`

Expected: generator completes with updated HTML pages containing loader markup and footer tagline class.

- [ ] **Step 2: Run the full contract suite again**

Run: `node --test tests/site-contract.test.mjs`

Expected: PASS with zero failing tests.

- [ ] **Step 3: Perform a browser sanity check on the homepage**

Run:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/index.html` and verify:

- first visit shows the loader
- refresh in the same session skips the loader
- `Why shippers stay with Daats` cards hover like the other cards
- the CTA truck roof has more headroom
- footer tagline uses the lockup-like style

- [ ] **Step 4: Commit the generated output after verification**

```bash
git add scripts/build-site.mjs assets/site.css assets/site.js tests/site-contract.test.mjs index.html about.html services.html industries.html coverage.html safety.html blog.html blog/*.html
git commit -m "feat: add demo loader and shared card polish"
```

## Self-Review

- Spec coverage check:
  - loader direction, session gating, background load, and percentage are covered in Tasks 2 through 4
  - spacing normalization is covered in Task 4
  - feature-card hover parity is covered in Task 4
  - CTA height and footer tagline are covered in Task 4
  - generator rebuild and verification are covered in Task 5
- Placeholder scan:
  - no `TODO`, `TBD`, or "implement later" placeholders remain
  - each code-changing task contains concrete code or selectors
- Type and naming consistency:
  - loader hooks consistently use `data-site-loader`, `data-loader-mark`, `data-loader-lockup`, and `data-loader-percent`
  - footer tagline consistently uses `.footer-tagline`
