import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const requiredPages = [
  "index.html",
  "about.html",
  "services.html",
  "industries.html",
  "coverage.html",
  "safety.html",
  "blog.html",
  "blog/fall-freight-prep-before-peak-season.html",
  "blog/ai-in-trucking.html",
  "blog/diesel-record-highs-2026.html",
  "blog/broker-liability-carrier-vetting.html",
];

describe("static site contract", () => {
  it("creates the required pages", () => {
    for (const page of requiredPages) {
      assert.equal(existsSync(join(root, page)), true, `${page} should exist`);
    }
  });

  it("labels the driver application link as Apply and opens it in a new tab", () => {
    const html = read("index.html");
    assert.match(
      html,
      /href="https:\/\/intelliapp\.driverapponline\.com\/c\/daatsco\?uri_b=ia_daatsco_596246394"[^>]*target="_blank"/,
    );
    assert.match(html, />Apply<\/a>/);
    assert.doesNotMatch(html, />Careers<\/a>/);
    assert.equal(existsSync(join(root, "careers.html")), false);
  });

  it("renders the homepage hero truck as a full-height mirrored image without cover-cropping", () => {
    const html = read("index.html");
    const css = read("assets/site.css");

    assert.match(html, /<img class="hero-art flip-horizontal" src="assets\/images\/home-hero-dock\.png" alt="Daats truck at a loading dock">/);
    assert.match(
      css,
      /\.hero-media\s*\{[\s\S]*justify-content:\s*center;[\s\S]*align-items:\s*flex-end;/m,
    );
    assert.match(
      css,
      /\.hero-art\s*\{[\s\S]*height:\s*100%;[\s\S]*width:\s*auto;[\s\S]*object-fit:\s*contain;[\s\S]*object-position:\s*center bottom;[\s\S]*opacity:\s*0\.75;/m,
    );
  });

  it("renders the homepage hero lead copy in white for contrast", () => {
    const html = read("index.html");
    const css = read("assets/site.css");

    assert.match(
      html,
      /<p class="lead">Daats Companies is a full-service trucking carrier out of Dallas, Texas - dry-van and refrigerated freight delivered safely and on time, from local runs to nationwide over-the-road\.<\/p>/,
    );
    assert.match(
      css,
      /\.hero\s+\.lead\s*\{[\s\S]*color:\s*#fff;/m,
      "homepage hero lead copy should render in white",
    );
  });

  it("uses the official transparent Daats logo mark in the brand", () => {
    const html = read("index.html");
    assert.equal(existsSync(join(root, "assets", "images", "daats-logo-mark-transparent.png")), true);
    assert.match(html, /<img class="brand-mark" src="assets\/images\/daats-logo-mark-transparent\.png"/);
    assert.match(html, /<span class="brand-text"><strong>DAATS<\/strong><small>COMPANIES<\/small><\/span>/);
  });

  it("renders shared loader hooks and a footer tagline hook", () => {
    const html = read("index.html");

    assert.match(html, /<div class="site-loader" data-site-loader hidden>/);
    assert.match(html, /<p class="site-loader-lockup" data-loader-lockup>DAATS<span>COMPANIES<\/span><\/p>/);
    assert.match(html, /<div class="site-loader-mark" data-loader-mark><img src="assets\/images\/daats-logo-mark-transparent\.png" alt="" aria-hidden="true"><\/div>/);
    assert.match(html, /<p class="site-loader-percent" data-loader-percent>0%<\/p>/);
    assert.match(html, /<p class="footer-tagline">SERVICE WITH INTEGRITY<\/p>/);
  });

  it("has generated category hero images for Services, Industries, Coverage, and Safety", () => {
    for (const name of ["services", "industries", "coverage", "safety"]) {
      const file = join(root, "assets", "images", `${name}-hero.png`);
      assert.equal(existsSync(file), true, `${name}-hero.png should exist`);
    }
  });

  it("uses unique generated images for all blog articles", () => {
    const blogImages = readdirSync(join(root, "assets", "images"))
      .filter((name) => name.startsWith("blog-") && name.endsWith(".png"))
      .sort();

    assert.deepEqual(blogImages, [
      "blog-ai-trucking.png",
      "blog-broker-vetting.png",
      "blog-diesel-prices.png",
      "blog-fall-freight-prep.png",
    ]);

    for (const page of requiredPages.filter((page) => page.startsWith("blog/"))) {
      const html = read(page);
      const hero = html.match(/<div class="container article-hero-image"><img[^>]+src="([^"]+)"/);
      assert.ok(hero, `${page} should have one article hero image`);
      assert.match(hero[1], /assets\/images\/blog-/);
    }
  });

  it("keeps article bodies between 4 and 8 minutes and removes mid-article images", () => {
    for (const page of requiredPages.filter((page) => page.startsWith("blog/"))) {
      const html = read(page);
      const article = html.match(/<article class="article-body">([\s\S]*?)<\/article>/);
      assert.ok(article, `${page} should have an article body`);
      assert.equal(/<img\b/.test(article[1]), false, `${page} should not embed images in the article body`);
      const words = article[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/&[a-z]+;/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      assert.ok(words.length >= 800, `${page} should be at least 4 minutes, got ${words.length} words`);
      assert.ok(words.length <= 1600, `${page} should be at most 8 minutes, got ${words.length} words`);
    }
  });

  it("renders the new August article with the expected metadata", () => {
    const html = read("blog/fall-freight-prep-before-peak-season.html");

    assert.match(html, /<p class="meta category">Industry News<\/p>/);
    assert.match(html, /<h1>How Shippers Should Prepare for Fall Freight Before Peak Season Hits<\/h1>/);
    assert.match(html, /<p class="meta">AUG 30, 2026 - 4 MIN READ<\/p>/);
    assert.match(html, /<div class="container article-hero-image"><img src="\.\.\/assets\/images\/blog-fall-freight-prep\.png"/);
  });

  it("applies the Daats maroon hover treatment to links and elevates cards site-wide", () => {
    const css = read("assets/site.css");

    assert.match(
      css,
      /\.button\s*\{[\s\S]*border:\s*1px solid #fff;[\s\S]*background:\s*#fff;[\s\S]*color:\s*#000;/m,
      "default buttons should use a white background with black text for contrast",
    );
    assert.match(
      css,
      /a:where\(:not\(\.button\)\):hover,\s*a:where\(:not\(\.button\)\):focus-visible\s*\{[\s\S]*color:\s*var\(--red\);/m,
      "non-button links should turn Daats maroon on hover and focus",
    );
    assert.match(
      css,
      /a:where\(:not\(\.button\)\):focus-visible\s*\{[\s\S]*outline:\s*2px\s+solid\s+var\(--red\)/m,
      "non-button links should get a Daats-colored focus ring",
    );
    assert.match(
      css,
      /\.(service-card|info-card|blog-card|credential-card):hover,\s*\n\.(service-card|info-card|blog-card|credential-card):focus-within\s*\{[\s\S]*transform:\s*translateY\(-?\d+px\)/m,
      "card hover state should lift cards off the page",
    );
    assert.match(
      css,
      /\.(service-card|info-card|blog-card|credential-card):hover,\s*\n\.(service-card|info-card|blog-card|credential-card):focus-within\s*\{[\s\S]*border-color:\s*var\(--red\)/m,
      "card hover state should use the Daats maroon border",
    );
  });

  it("defines shared spacing, feature-card hover treatment, CTA height, and loader styling", () => {
    const css = read("assets/site.css");

    assert.match(
      css,
      /\.section-copy \+ \.card-grid,\s*\n\.section-copy \+ \.blog-grid,\s*\n\.section-copy \+ \.feature-grid\s*\{[\s\S]*margin-top:\s*\d+px;/m,
      "intro copy should add shared spacing before card-based grids",
    );
    assert.match(
      css,
      /\.feature-item\s*\{[\s\S]*border:\s*1px solid var\(--line\);[\s\S]*border-radius:\s*var\(--radius\);[\s\S]*background:\s*rgba\(4,\s*4,\s*4,\s*0\.7\)/m,
      "feature items should use card-like base styling",
    );
    assert.match(
      css,
      /\.feature-item:hover,\s*\n\.feature-item:focus-within\s*\{[\s\S]*border-color:\s*var\(--red\);[\s\S]*transform:\s*translateY\(-8px\)/m,
      "feature items should lift and use the maroon hover treatment",
    );
    assert.match(
      css,
      /\.cta-band\s*\{[\s\S]*min-height:\s*460px;/m,
      "cta band should be taller to avoid cropping the truck roof",
    );
    assert.match(
      css,
      /\.cta-content\s*\{[\s\S]*min-height:\s*460px;/m,
      "cta content height should match the taller band",
    );
    assert.match(
      css,
      /\.footer-tagline\s*\{[\s\S]*letter-spacing:\s*0\.34em;[\s\S]*text-transform:\s*uppercase;/m,
      "footer tagline should use the lockup-like uppercase tracking treatment",
    );
    assert.match(
      css,
      /\.site-loader\s*\{[\s\S]*position:\s*fixed;[\s\S]*inset:\s*0;[\s\S]*background:\s*#000;/m,
      "loader should occupy the full viewport on a black background",
    );
    assert.match(
      css,
      /\.site-loader-mark\s*\{[\s\S]*animation:\s*loader-breathe 2\.4s ease-in-out infinite;/m,
      "loader mark should use the approved breathing animation",
    );
  });

  it("keeps a diesel prices table on the homepage between credentials and blog insights", () => {
    const html = read("index.html");

    assert.match(html, /<section class="section diesel-section" id="diesel-prices">/);
    assert.match(html, /<h2>Weekly diesel prices<\/h2>/);
    assert.match(html, /<div class="diesel-topbar"><h3>Diesel Fuel Price<\/h3><p class="diesel-release-line">Diesel Fuel Release Date: August 25, 2026 \| Next Release Date: September 1, 2026<\/p><\/div>/);
    assert.doesNotMatch(html, /EIA weekly benchmark snapshot/);
    assert.doesNotMatch(html, /U\.S\. On-Highway Diesel Fuel Prices\*\s*\(dollars per gallon\)/);
    assert.doesNotMatch(html, /diesel-release-badges/);
    assert.match(html, /<th>Region<\/th><th>08\/10\/26<\/th><th>08\/17\/26<\/th><th>08\/24\/26<\/th><th>Week Ago<\/th><th>Year Ago<\/th>/);
    assert.match(html, /<tr class="diesel-row-highlight"><th scope="row">U\.S\.<\/th><td>5\.257<\/td><td>5\.454<\/td><td>5\.652<\/td><td>0\.198<\/td><td>1\.944<\/td><\/tr>/);
    assert.match(html, /<tr class=""><th scope="row">Gulf Coast \(PADD3\)<\/th><td>5\.044<\/td><td>5\.237<\/td><td>5\.481<\/td><td>0\.244<\/td><td>2\.153<\/td><\/tr>/);
    assert.match(html, /href="https:\/\/www\.eia\.gov\/petroleum\/gasdiesel\/" target="_blank" rel="noopener noreferrer"/);

    const credentialsIndex = html.indexOf("Credentials you<br>can check yourself");
    const dieselIndex = html.indexOf('id="diesel-prices"');
    const insightsIndex = html.indexOf("Insights from the road");

    assert.ok(credentialsIndex >= 0, "credentials section should exist");
    assert.ok(dieselIndex > credentialsIndex, "diesel section should appear after credentials");
    assert.ok(insightsIndex > dieselIndex, "diesel section should appear before blog insights");
  });

  it("uses contained category hero artwork for industries, coverage, and safety pages", () => {
    const industriesHtml = read("industries.html");
    const coverageHtml = read("coverage.html");
    const safetyHtml = read("safety.html");
    const css = read("assets/site.css");

    assert.match(industriesHtml, /class="page-hero[^"]*page-hero-industries[^"]*page-hero-contained[^"]*"/);
    assert.match(coverageHtml, /class="page-hero[^"]*page-hero-coverage[^"]*page-hero-contained[^"]*"/);
    assert.match(safetyHtml, /class="page-hero[^"]*page-hero-safety[^"]*page-hero-contained[^"]*"/);
    assert.match(industriesHtml, /<img class="page-hero-art" src="assets\/images\/industries-hero\.png"/);
    assert.match(coverageHtml, /<img class="page-hero-art" src="assets\/images\/coverage-hero\.png"/);
    assert.match(safetyHtml, /<img class="page-hero-art" src="assets\/images\/safety-hero\.png"/);
    assert.match(css, /\.page-hero-contained \.page-hero-art\s*\{[\s\S]*object-fit:\s*contain;/m);
  });

  it("adds breadcrumbs and previous/next article navigation on blog articles", () => {
    const pages = requiredPages.filter((page) => page.startsWith("blog/"));

    for (const page of pages) {
      const html = read(page);
      assert.match(html, /<nav class="breadcrumbs" aria-label="Breadcrumb">/);
      assert.match(html, /href="\.\.\/index\.html">Home<\/a>/);
      assert.match(html, /href="\.\.\/blog\.html">Blog<\/a>/);
      assert.match(html, /<div class="article-pagination">/);
      assert.match(html, /class="button article-nav article-nav-prev"/);
      assert.match(html, /class="button primary article-nav article-nav-next"/);
      assert.doesNotMatch(html, />Previous: /);
      assert.doesNotMatch(html, />Next: /);
    }

    const css = read("assets/site.css");
    assert.match(css, /\.article-pagination\s*\{[\s\S]*justify-content:\s*space-between;/m);
    assert.match(css, /\.article-pagination\s*\{[\s\S]*width:\s*min\(820px,\s*calc\(100%\s*-\s*64px\)\);/m);
    assert.match(css, /\.article-nav\s*\{[\s\S]*flex:\s*0 1 320px;/m);
    assert.match(css, /\.article-nav\s*\{[\s\S]*flex-direction:\s*column;/m);
    assert.match(css, /\.article-nav\s*\{[\s\S]*gap:\s*0;/m);
    assert.match(css, /\.article-nav-prev\s*\{[\s\S]*align-items:\s*flex-start;[\s\S]*text-align:\s*left;/m);
    assert.match(css, /\.article-nav-next\s*\{[\s\S]*align-items:\s*flex-end;[\s\S]*text-align:\s*right;/m);
    assert.match(css, /\.article-nav span,\s*\n\.article-nav strong\s*\{[\s\S]*width:\s*100%;/m);
  });

  it("keeps the CTA phone button wide enough for a single-line phone number", () => {
    const html = read("blog.html");
    const css = read("assets/site.css");

    assert.match(html, /<div class="cta-actions">[\s\S]*href="tel:\+19725604040"[\s\S]*972-560-4040[\s\S]*<\/div>/m);
    assert.match(
      css,
      /\.cta-actions\s+\.button\[href\^="tel:"\]\s*\{[\s\S]*white-space:\s*nowrap;[\s\S]*flex:\s*0 0 auto;[\s\S]*min-width:\s*\d+px;/m,
    );
  });
});
