import fs from "node:fs/promises";
import path from "node:path";

const outputDir = process.argv[2]?.trim() || process.env.BUILD_OUT_DIR?.trim() || "dist";
const distPath = path.resolve(outputDir);
const assetsIgnorePath = path.join(distPath, ".assetsignore");
const sitemapIndexPath = path.join(distPath, "sitemap-index.xml");
const sitemapAliasPath = path.join(distPath, "sitemap.xml");
const workerIgnoreRule = "_worker.js\n";

function getSingleSitemapFilename(sitemapIndexXml) {
  const locMatches = Array.from(sitemapIndexXml.matchAll(/<loc>([^<]+)<\/loc>/g));

  if (locMatches.length !== 1) {
    return null;
  }

  try {
    const url = new URL(locMatches[0][1]);
    const filename = path.posix.basename(url.pathname);
    return filename || null;
  } catch {
    return null;
  }
}

async function main() {
  await fs.mkdir(distPath, { recursive: true });
  await fs.writeFile(assetsIgnorePath, workerIgnoreRule, "utf8");
  console.log(`Wrote ${assetsIgnorePath}`);

  try {
    const sitemapIndexXml = await fs.readFile(sitemapIndexPath, "utf8");
    const singleSitemapFilename = getSingleSitemapFilename(sitemapIndexXml);

    if (singleSitemapFilename) {
      const singleSitemapPath = path.join(distPath, singleSitemapFilename);
      const singleSitemapXml = await fs.readFile(singleSitemapPath, "utf8");
      await fs.writeFile(sitemapAliasPath, singleSitemapXml, "utf8");
    } else {
      await fs.writeFile(sitemapAliasPath, sitemapIndexXml, "utf8");
    }

    console.log(`Wrote ${sitemapAliasPath}`);
  } catch (error) {
    console.warn(
      `Skipped sitemap alias generation: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

await main();
