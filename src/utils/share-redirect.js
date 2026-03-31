import { getCountryBySlug } from "../data/countries";
import { getCountryPath, getTaxFreePath } from "../data/site";
import { parseShareToken } from "./share-link";

function createInvalidShareResponse() {
  return new Response("Invalid share link", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}

export function createShareRedirectResponse(token, requestUrl) {
  const parsed = parseShareToken(token);

  if (!parsed || !getCountryBySlug(parsed.countrySlug)) {
    return createInvalidShareResponse();
  }

  const targetPath =
    parsed.profile === "tax-free"
      ? getTaxFreePath(parsed.locale)
      : getCountryPath(parsed.locale, parsed.countrySlug);

  const targetUrl = new URL(targetPath, requestUrl);
  targetUrl.searchParams.set("seed", parsed.seed);

  if (parsed.regionCode) {
    targetUrl.searchParams.set("region", parsed.regionCode);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: targetUrl.toString(),
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}
