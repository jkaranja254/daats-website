# Client Contact, Service Duration, and Fuel Display Update

## Scope

Update the generated public website and deploy it to GitHub Pages.

## Content

- Replace the footer office address with `4001 McEwen Rd Suite 404, Dallas, TX 75244`.
- Add the mailing address: `6841 Virginia Pkwy, Suite 103-402, McKinney, TX 75071`.
- Remove public USDOT and MC numbers from every generated page, including footer, homepage metadata, credentials, and supporting copy.
- Display years in service using `current calendar year - 2007`. The value is 19 in 2026 and advances automatically each January 1.
- Keep the diesel release date, make its date value bold, and remove the parenthetical release date from the EIA source line.

## Implementation

`scripts/build-site.mjs` remains the single source of truth. It will define address and founding-year constants, derive the years-in-service copy at build time, and generate the shared footer and homepage/fuel markup. Running `npm run build` regenerates all static pages.

## Validation

Contract tests will assert both addresses, absence of DOT/MC identifiers in generated pages, the 2026 years-in-service output and formula, and the adjusted diesel markup. The full test suite and production build must pass before committing and pushing the `preview` branch, which triggers the GitHub Pages deployment.
