import type { APIRoute } from "astro";
import {
  generateAddress,
  isLocale,
  type GenerateAddressOptions
} from "../../../data/address-generator";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const country = url.searchParams.get("country")?.trim().toLowerCase();
  const region = url.searchParams.get("region")?.trim().toUpperCase() || undefined;
  const localeParam = url.searchParams.get("locale");
  const seed = url.searchParams.get("seed")?.trim() || undefined;
  const excludeEntryIds =
    url.searchParams
      .get("exclude")
      ?.split(",")
      .map((value) => value.trim())
      .filter(Boolean) || undefined;
  const profileParam = url.searchParams.get("profile")?.trim().toLowerCase();
  const locale = isLocale(localeParam) ? localeParam : "zh";
  const profile = profileParam === "tax-free" ? "tax-free" : "default";
const cacheControl = seed
    ? "public, s-maxage=86400, stale-while-revalidate=604800"
    : "no-store";
  const baseHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "X-Robots-Tag": "noindex, nofollow, noarchive"
  };

  if (!country) {
    return new Response(JSON.stringify({ error: "Missing country parameter" }), {
      status: 400,
      headers: baseHeaders
    });
  }

  try {
    const payload = generateAddress({
      countrySlug: country,
      regionCode: region,
      locale,
      seed,
      excludeEntryIds,
      profile
    } satisfies GenerateAddressOptions);

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        ...baseHeaders,
        "Cache-Control": cacheControl,
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to generate address";

    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: baseHeaders
    });
  }
};
