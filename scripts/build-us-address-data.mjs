import fs from "node:fs/promises";
import path from "node:path";

const HOMEPAGE_URL = "https://usaddresstool.com/";
const USER_AGENT = "USAddressTool/0.1 (https://usaddresstool.com/; US dataset builder)";
const DEFAULT_ADDRESS_TARGET_PER_STATE = 4;
const HIGH_PRIORITY_STATE_TARGETS = {
  AK: 8,
  DE: 8,
  MT: 8,
  NH: 8,
  OR: 8
};
const REQUEST_DELAY_MS = 900;
const KEYWORDS = [
  "state capitol",
  "city hall",
  "courthouse",
  "museum",
  "library",
  "visitor center",
  "science center",
  "convention center",
  "art museum",
  "county courthouse",
  "public library"
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": USER_AGENT
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": USER_AGENT
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function discoverReferenceUrls() {
  const homepage = await fetchText(HOMEPAGE_URL);
  const usDataMatch = homepage.match(/usData:"([^"]+)"/);
  const usCitiesMatch = homepage.match(/usCitiesData:"([^"]+)"/);

  if (!usDataMatch || !usCitiesMatch) {
    throw new Error("Could not discover US data URLs from the reference homepage");
  }

  return {
    usDataUrl: new URL(usDataMatch[1], HOMEPAGE_URL).toString(),
    usCitiesUrl: new URL(usCitiesMatch[1], HOMEPAGE_URL).toString()
  };
}

function escapeText(value) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"');
}

function toTitleId(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function normalizeCity(value) {
  return value.replace(/^City of /i, "").trim();
}

function buildSearchQueries(stateName, cityName) {
  const queries = [
    `${stateName} State Capitol`,
    `${stateName} State Capitol Building`
  ];

  for (const keyword of KEYWORDS) {
    queries.push(`${keyword}, ${cityName}, ${stateName}, USA`);
  }

  return queries;
}

function pickStateCode(address) {
  const isoCode = address["ISO3166-2-lvl4"];

  if (typeof isoCode === "string" && isoCode.startsWith("US-")) {
    return isoCode.slice(3).toUpperCase();
  }

  return null;
}

function normalizeAddressRecord(result, stateCode, stateName, fallbackCity, index) {
  const address = result.address ?? {};
  const matchedStateCode = pickStateCode(address);

  if (matchedStateCode !== stateCode) {
    return null;
  }

  const road = address.road || address.street || address.pedestrian || address.footway;
  const houseNumber = address.house_number;
  const postcode = address.postcode;
  const city = normalizeCity(address.city || address.town || address.village || fallbackCity || "");

  if (!road || !houseNumber || !postcode || !city) {
    return null;
  }

  const venue =
    result.name ||
    address.amenity ||
    address.office ||
    address.tourism ||
    address.historic ||
    "Public Address";
  const street = `${houseNumber} ${road}`.trim();
  const entryId = `us-${stateCode.toLowerCase()}-${toTitleId(city)}-${toTitleId(venue)}-${index}`;

  return {
    id: entryId,
    regionCode: stateCode,
    venue: {
      zh: venue,
      en: venue,
      ja: venue
    },
    recipient: {
      zh: "测试收件人",
      en: "Test Receiver",
      ja: "テスト受取人"
    },
    street,
    city,
    postalCode: postcode,
    phone: "+1 202-555-0100",
    email: `seed.us.${stateCode.toLowerCase()}.${index}@example.dev`,
    fullAddress: {
      zh: `${venue}, ${street}, ${city}, ${stateCode} ${postcode}, USA`,
      en: `${venue}, ${street}, ${city}, ${stateCode} ${postcode}, USA`,
      ja: `${venue}, ${street}, ${city}, ${stateCode} ${postcode}, USA`
    },
    latitude: Number(result.lat),
    longitude: Number(result.lon)
  };
}

async function searchPlaces(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "6");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("q", query);

  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": USER_AGENT
    }
  });

  if (!response.ok) {
    throw new Error(`Nominatim search failed for "${query}": ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function buildRegionEntries(states) {
  return Object.entries(states)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([code, state]) => ({
      code,
      name: {
        zh: state.name.zh,
        en: state.name.en,
        ja: state.name.ja
      }
    }));
}

function renderValue(value, depth = 0) {
  const indent = "  ".repeat(depth);
  const nextIndent = "  ".repeat(depth + 1);

  if (Array.isArray(value)) {
    if (!value.length) {
      return "[]";
    }

    return `[\n${value.map((item) => `${nextIndent}${renderValue(item, depth + 1)}`).join(",\n")}\n${indent}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);

    if (!entries.length) {
      return "{}";
    }

    return `{\n${entries
      .map(([key, item]) => `${nextIndent}${key}: ${renderValue(item, depth + 1)}`)
      .join(",\n")}\n${indent}}`;
  }

  if (typeof value === "string") {
    return `"${escapeText(value)}"`;
  }

  return String(value);
}

async function main() {
  const { usDataUrl, usCitiesUrl } = await discoverReferenceUrls();
  const [usData, usCities] = await Promise.all([fetchJson(usDataUrl), fetchJson(usCitiesUrl)]);
  const regions = buildRegionEntries(usData.states);
  const addresses = [];

  for (const region of regions) {
    const stateCode = region.code;
    const stateName = region.name.en;
    const addressTarget = HIGH_PRIORITY_STATE_TARGETS[stateCode] ?? DEFAULT_ADDRESS_TARGET_PER_STATE;
    const cityPool = usCities.states?.[stateCode]?.cities ?? [];
    const dedupe = new Set();
    const stateAddresses = [];
    const cityNames = cityPool.map((city) => city.name.en);
    const searchQueue = [];

    for (const cityName of cityNames) {
      for (const query of buildSearchQueries(stateName, cityName)) {
        searchQueue.push({ cityName, query });
      }
    }

    if (!searchQueue.length) {
      console.warn(`Skipping ${stateCode}: no city pool discovered`);
      continue;
    }

    let resultIndex = 0;

    for (const item of searchQueue) {
      if (stateAddresses.length >= addressTarget) {
        break;
      }

      let results = [];

      try {
        results = await searchPlaces(item.query);
      } catch (error) {
        console.warn(`Search failed for ${stateCode} / ${item.query}:`, error instanceof Error ? error.message : error);
        await sleep(REQUEST_DELAY_MS);
        continue;
      }

      for (const result of results) {
        if (stateAddresses.length >= addressTarget) {
          break;
        }

        const normalized = normalizeAddressRecord(result, stateCode, stateName, item.cityName, resultIndex + 1);

        if (!normalized) {
          continue;
        }

        const dedupeKey = `${normalized.street}|${normalized.city}|${normalized.postalCode}`;

        if (dedupe.has(dedupeKey)) {
          continue;
        }

        dedupe.add(dedupeKey);
        resultIndex += 1;
        normalized.id = `us-${stateCode.toLowerCase()}-${toTitleId(normalized.city)}-${toTitleId(normalized.venue.en)}-${resultIndex}`;
        normalized.email = `seed.us.${stateCode.toLowerCase()}.${String(resultIndex).padStart(2, "0")}@example.dev`;
        stateAddresses.push(normalized);
      }

      await sleep(REQUEST_DELAY_MS);
    }

    if (!stateAddresses.length) {
      console.warn(`No exact-address seeds found for ${stateCode}`);
    } else {
      console.log(`${stateCode}: collected ${stateAddresses.length} seeds`);
      addresses.push(...stateAddresses);
    }
  }

  const output = `// This file is auto-generated by scripts/build-us-address-data.mjs\n\nexport const usGeneratedRegions = ${renderValue(regions)};\n\nexport const usGeneratedAddresses = ${renderValue(addresses)};\n`;
  const outputPath = path.resolve("src/data/us-generated.ts");

  await fs.writeFile(outputPath, output, "utf8");

  console.log(`Wrote ${regions.length} regions and ${addresses.length} addresses to ${outputPath}`);
}

await main();
