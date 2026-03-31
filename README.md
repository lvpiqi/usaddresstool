# US Address Tool

`US Address Tool` is a multilingual address-generator site built for `GitHub + Cloudflare`, with a `Cloudflare runtime API` and a `self-owned address data layer`.

The homepage opens directly on the generator. Each country keeps its own SEO landing page, while the generator itself is shared and runs from the same component system.

## Current architecture

- `Astro` renders static SEO pages, canonical tags, sitemap, and `hreflang`
- a lightweight client script powers the central generator UI
- `@astrojs/cloudflare` provides the Cloudflare-compatible runtime
- `/api/address/generate` generates a deterministic result on demand
- `src/data/countries.ts` stores your source country, region, and address seed data
- `src/data/address-generator.ts` turns those seeds into structured output fields such as name, gender, phone, email, street, city, region, postal code, and full address

This means the project is no longer a frontend-only random picker. The address result is generated at runtime and can be restored by `seed + region`.

## What the project already includes

- Chinese homepage on `/`
- English homepage on `/en/`
- Japanese homepage on `/ja/`
- Country pages such as `/uk-address-generator/`, `/jp-address-generator/`, `/hk-address-generator/`
- Region filter at the top of the tool
- Field-level copy buttons
- Full-address copy
- Shareable result URLs using `?region=...&seed=...`
- Local save in browser storage
- Blog pages, format-guide pages, and legal pages
- Responsive layout for desktop and mobile

## Core files

- `src/data/countries.ts`
  Your base country records, region lists, FAQ content, and address seeds.
- `src/data/address-generator.ts`
  The server-side generator layer. This is where deterministic generation, name pools, email formatting, and final full-address assembly happen.
- `src/pages/api/address/generate.ts`
  The runtime API endpoint used by the frontend generator.
- `src/components/AddressGeneratorTool.astro`
  The main generator shell rendered into each tool page.
- `src/scripts/address-generator.js`
  The client-side generator logic for region selection, generation, copy, share, and save.
- `src/components/CountryPage.astro`
  The SEO country-page template. This is the core page structure used for the homepage country and every additional country page.
- `src/data/site.ts`
  Shared labels, locale config, navigation labels, and route helpers.

## Local development

```bash
npm install
npm run dev
```

Recommended local env:

```txt
SITE_URL=http://127.0.0.1:4321
ASTRO_TELEMETRY_DISABLED=1
```

## Build

```bash
npm run build
```

If `dist/` is busy on Windows because a preview process is still holding files, you can still run a clean release verification build without touching the live output folder:

```bash
npm run build:verify
```

The build output goes to `dist/` and contains:

- static HTML for SEO pages
- Cloudflare-compatible runtime assets for dynamic API routes

## Deploy with GitHub + Cloudflare Pages

1. Push the project to GitHub.
2. In Cloudflare, open `Workers & Pages`.
3. Create a new `Pages` project from that GitHub repository.
4. Use these build settings:

```txt
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: /
```

5. Add environment variables:

```txt
SITE_URL=https://usaddresstool.com
```

6. Deploy once, then bind your custom domain.

The repository already includes `wrangler.jsonc`, so you can also use Wrangler-based deployment workflows later if you want CLI deploys.

## SEO model for many countries

The correct scalable structure is:

- one indexable URL per country
- shared header, footer, and generator component
- unique SEO copy per country page
- generated results are not separate indexable pages
- share URLs use query parameters, not new pages

Examples:

- `/`
- `/uk-address-generator/`
- `/jp-address-generator/`
- `/hk-address-generator/`

Do not create one URL per generated address like:

- `/uk-address-generator/#uk-nir-belfast`
- `/jp-address-generator/#jp-tokyo-skytree`

Those are share states, not SEO landing pages.

For each country page, keep these unique:

- title
- meta description
- H1
- intro paragraph
- region notes
- format rules
- FAQ
- sample address
- internal links

That is the right SEO pattern if you later add many countries such as `HK`, `UK`, `JP`, `CA`, `IN`, `AU`, `DE`, or `FR`.

## Real-data strategy

Do not call a public free geocoding API every time a visitor clicks `Generate`.

That approach is slow, unstable, rate-limited, and risky for SEO traffic spikes.

The low-cost production pattern is:

1. Collect source data from open datasets such as `OpenStreetMap`, `OpenAddresses`, and official government open data portals where available.
2. Clean and normalize the records offline.
3. Store the final serving layer in your own data source such as:
   - repository JSON for the first small release
   - Cloudflare KV for lightweight key-value serving
   - Cloudflare D1 for searchable structured queries
   - R2 if you want country or region JSON bundles
4. Let the Worker API read from your own prepared layer and return results quickly.

Public APIs are better reserved for:

- one-time enrichment
- internal admin QA
- offline verification jobs

They are not a good primary data source for end-user generation traffic.

For the US seed builder, the default maintenance path is now self-owned:

1. reuse your checked-in `src/data/us-generated.ts`
2. or use local cached snapshots such as `tmp_us_data_live.json` and `tmp_us_cities_live.json`
3. only use `--reference=...` or direct `--us-data-url=... --us-cities-url=...` when you intentionally want to refresh from an external source

## How to add a new country

1. Add the country record, localized content, regions, and address seeds in `src/data/countries.ts`.
2. Make sure the country has unique SEO copy, not just translated boilerplate.
3. Reuse the same generator component and route helper logic.
4. Add a format-guide page and supporting blog content for that country.
5. Build and test the new page in all supported locales.

## Product notes

- Share links restore a result with `seed`, not an indexable city page.
- Saved results stay in the browser for the first release, so no account system is required.
- The project is intended for testing, QA, demo data, and address-format learning, not impersonation or fraud.
