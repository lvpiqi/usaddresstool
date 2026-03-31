import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

const defaultSiteUrl = "https://usaddresstool.com";
const siteUrl = process.env.SITE_URL?.trim() || defaultSiteUrl;

const excludedLeafSegments = new Set([
  "403",
  "404",
  "500",
  "503",
  "about",
  "privacy",
  "terms",
  "cookies"
]);

function shouldExcludeFromSitemap(page) {
  const pathname = new URL(page).pathname;
  const segments = pathname.split("/").filter(Boolean);
  const leaf = segments.at(-1);

  return leaf ? excludedLeafSegments.has(leaf) : false;
}

export default defineConfig({
  site: siteUrl,
  trailingSlash: "always",
  output: "static",
  session: {
    driver: "memory"
  },
  adapter: cloudflare({
    imageService: "compile"
  }),
  integrations: [
    sitemap({
      filter: (page) => !shouldExcludeFromSitemap(page)
    })
  ]
});
