# August Blog Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new August 30, 2026 Daats blog post with matching long-form copy, a unique generated hero image, and regenerated static pages that surface the post across the site.

**Architecture:** The site is generated from `scripts/build-site.mjs`, so the new article should be added once in the `articles` array and then propagated by the existing homepage, blog index, article page, and pagination generators. Verification stays centered on the existing site contract test plus one new generated image asset.

**Tech Stack:** Node.js static site generator, HTML, existing Node test runner, built-in image generation tool

---

### Task 1: Lock The New Blog Requirements In Tests

**Files:**
- Modify: `tests/site-contract.test.mjs`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
    assert.deepEqual(blogImages, [
      "blog-ai-trucking.png",
      "blog-broker-vetting.png",
      "blog-diesel-prices.png",
      "blog-fall-freight-prep.png",
    ]);
```

```js
  "blog/fall-freight-prep-before-peak-season.html",
```

```js
    assert.match(html, /AUG 30, 2026 - 4 MIN READ/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected:
- FAIL because the required page and image do not exist yet
- FAIL because the current blog output does not include `AUG 30, 2026 - 4 MIN READ`

- [ ] **Step 3: Keep the test focused on generated output**

```js
    const augustPost = read("blog/fall-freight-prep-before-peak-season.html");
    assert.match(augustPost, /<p class="meta category">Industry News<\/p>/);
    assert.match(augustPost, /<p class="meta">AUG 30, 2026 - 4 MIN READ<\/p>/);
```

- [ ] **Step 4: Re-run test and confirm it still fails for missing implementation**

Run: `npm test`

Expected:
- FAIL with missing page/image or unmatched article content

- [ ] **Step 5: Commit**

```bash
git add tests/site-contract.test.mjs
git commit -m "test: require new August blog article"
```

### Task 2: Generate The New Blog Hero Image

**Files:**
- Create: `assets/images/blog-fall-freight-prep.png`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Generate the image asset**

Prompt:

```text
Use case: ads-marketing
Asset type: trucking website blog hero image
Primary request: create a realistic blog hero image for an article about preparing for fall freight before peak season hits
Scene/backdrop: a late-summer distribution yard with active docks, trailers, and a clean commercial freight environment
Subject: a mixed fleet of modern 2025-style North American highway trucks staged near dock doors
Style/medium: realistic logistics marketing photography
Composition/framing: wide horizontal composition suitable for both a blog card and article hero, with clear truck presence and visible freight-yard depth
Lighting/mood: warm late-afternoon light, practical and professional, no dramatic stylization
Color palette: neutral commercial tones with subtle warm sunlight
Materials/textures: realistic truck body panels, trailers, asphalt, dock equipment
Constraints: no logos, no brand marks, no text in the image, keep the look aligned with the existing Daats blog imagery
Avoid: illustration style, cartoon look, night scene, close-up portrait framing, watermarks
```

- [ ] **Step 2: Save the selected output into the workspace**

Run:

```bash
Copy-Item "<generated-image-path>" "assets/images/blog-fall-freight-prep.png"
```

Expected:
- `assets/images/blog-fall-freight-prep.png` exists and is the final asset used by the site

- [ ] **Step 3: Verify the file exists**

Run: `Test-Path assets/images/blog-fall-freight-prep.png`

Expected: `True`

- [ ] **Step 4: Commit**

```bash
git add assets/images/blog-fall-freight-prep.png
git commit -m "feat: add August blog hero image"
```

### Task 3: Add The New Article To The Generator

**Files:**
- Modify: `scripts/build-site.mjs`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Add the new article object at the top of `articles`**

```js
  {
    slug: "fall-freight-prep-before-peak-season",
    title: "How Shippers Should Prepare for Fall Freight Before Peak Season Hits",
    category: "Industry News",
    date: "Aug 30, 2026",
    image: "assets/images/blog-fall-freight-prep.png",
    deck: "Late August is when smart freight teams tighten forecasts, lock in capacity, and clean up dock communication before fall pressure starts raising the cost of every avoidable mistake.",
    sections: [
      ["Late August is the planning window", [
        "..."
      ]]
    ],
  },
```

- [ ] **Step 2: Keep the content within the existing article structure**

Required shape:

```js
    sections: [
      ["Heading", ["Paragraph 1", "Paragraph 2"]],
      ["Heading", ["Paragraph 1", "Paragraph 2"]],
      ["Heading", ["Paragraph 1", "Paragraph 2"]],
      ["Heading", ["Paragraph 1", "Paragraph 2"]],
      ["Heading", ["Paragraph 1", "Paragraph 2", "Paragraph 3"]],
    ],
```

- [ ] **Step 3: Regenerate the site**

Run: `npm run build`

Expected:
- `index.html` shows the new card first in the blog section
- `blog.html` shows the new article first
- `blog/fall-freight-prep-before-peak-season.html` is created

- [ ] **Step 4: Verify the new article page renders**

Run:

```bash
Get-Content blog/fall-freight-prep-before-peak-season.html | Select-Object -First 40
```

Expected:
- correct title
- `AUG 30, 2026 - 4 MIN READ`
- hero image points to `../assets/images/blog-fall-freight-prep.png`

- [ ] **Step 5: Commit**

```bash
git add scripts/build-site.mjs index.html blog.html blog/fall-freight-prep-before-peak-season.html blog/ai-in-trucking.html blog/diesel-record-highs-2026.html blog/broker-liability-carrier-vetting.html
git commit -m "feat: add August freight planning blog article"
```

### Task 4: Verify The Full Generated Site Contract

**Files:**
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected:
- PASS
- the new blog image list matches exactly
- the new article stays within the existing word-count bounds

- [ ] **Step 2: Check the working tree**

Run: `git status --short`

Expected:
- only intended generated files and the known unrelated `DEPLOYMENT_NOTES.md` remain

- [ ] **Step 3: Commit any final test-aligned changes**

```bash
git add tests/site-contract.test.mjs
git commit -m "test: cover August blog article output"
```

### Task 5: Publish The Preview Update

**Files:**
- Modify: Git branch `preview`

- [ ] **Step 1: Push the branch**

Run: `git push origin preview`

Expected:
- remote `preview` updated

- [ ] **Step 2: Verify deployed preview content**

Run:

```bash
node -e "<fetch preview HTML and confirm the new article title exists>"
```

Expected:
- HTTP 200
- preview contains `How Shippers Should Prepare for Fall Freight Before Peak Season Hits`

- [ ] **Step 3: Return the existing public share link if still valid**

Expected:
- user receives a preview URL they can open without Vercel login

## Self-Review

Spec coverage:
- New August article: covered in Task 3
- Matching image asset: covered in Task 2
- Homepage and blog index visibility: covered in Task 3 and Task 5
- Similar article length and format: covered in Task 1 and Task 4

Placeholder scan:
- The only intentional placeholder is the article body draft marker in Task 3, which is resolved during implementation in `scripts/build-site.mjs`

Type consistency:
- Slug, image filename, page path, and metadata are consistent across tasks
