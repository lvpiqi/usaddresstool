import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const FALLBACK_REFERENCE_HOMEPAGE_URL = "https://usaddressgen.com/";
const USER_AGENT = "USAddressToolDatasetBuilder/1.0";
// Collect a deeper per-state seed pool so runtime house-number offsets can
// fan out from more real streets instead of repeating the same 4 entries.
const DEFAULT_ADDRESS_TARGET_PER_STATE = 50;
const TAX_FREE_ADDRESS_TARGET_PER_STATE = 50;
const TAX_FREE_STATE_CODES = new Set(["AK", "DE", "MT", "NH", "OR"]);
const REQUEST_DELAY_MS = 1400;
const MAX_FETCH_ATTEMPTS = 4;
const RETRY_BASE_DELAY_MS = 2200;
const EXTRA_CITY_NAMES_BY_STATE = {
  DE: ["Georgetown", "Middletown", "Smyrna", "Milford", "Lewes", "Rehoboth Beach", "Seaford"]
};
const KEYWORDS = [
  "state capitol",
  "city hall",
  "courthouse",
  "museum",
  "library",
  "post office",
  "town hall",
  "visitor center",
  "science center",
  "convention center",
  "art museum",
  "county courthouse",
  "public library",
  "community center",
  "civic center",
  "transit center",
  "hospital",
  "medical center",
  "government center",
  "performing arts center",
  "public market",
  "arena",
  "airport",
  "regional airport",
  "police department",
  "fire station",
  "college",
  "community college",
  "city office",
  "county office",
  "archives",
  "state park",
  "public works"
];
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const statesArg = args.find((arg) => arg.startsWith("--states="));
const referenceArg = args.find((arg) => arg.startsWith("--reference="));
const requestedStateCodes = statesArg
  ? statesArg
      .slice("--states=".length)
      .split(",")
      .map((code) => code.trim().toUpperCase())
      .filter(Boolean)
  : [];
const requestedStateSet = new Set(requestedStateCodes);
const HOMEPAGE_URL =
  referenceArg?.slice("--reference=".length).trim() ||
  process.env.US_ADDRESS_REFERENCE_URL?.trim() ||
  FALLBACK_REFERENCE_HOMEPAGE_URL;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildRequestHeaders() {
  return {
    "Accept-Language": "en-US,en;q=0.9",
    "User-Agent": USER_AGENT
  };
}

async function fetchWithRetry(url, options = {}, label = String(url)) {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_FETCH_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return response;
      }

      const error = new Error(`Request failed for ${label}: ${response.status} ${response.statusText}`);

      if (attempt >= MAX_FETCH_ATTEMPTS || (response.status < 500 && response.status !== 429)) {
        throw error;
      }

      lastError = error;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt >= MAX_FETCH_ATTEMPTS) {
        break;
      }
    }

    await sleep(RETRY_BASE_DELAY_MS * attempt);
  }

  throw lastError ?? new Error(`Request failed for ${label}`);
}

async function fetchJson(url) {
  const response = await fetchWithRetry(url, {
    headers: buildRequestHeaders()
  });

  return response.json();
}

async function fetchText(url) {
  const response = await fetchWithRetry(url, {
    headers: buildRequestHeaders()
  });

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

function buildStateSearchQueries(stateName, cityNames) {
  const stateLevelKeywords = [
    "state capitol",
    "state capitol building",
    "state museum",
    "state library",
    "state courthouse",
    "department of health",
    "department of transportation",
    "state university",
    "department of education",
    "state archives",
    "state fairgrounds",
    "visitor center"
  ];
  const queries = stateLevelKeywords.map((keyword) => `${keyword}, ${stateName}, USA`);

  for (const cityName of cityNames) {
    for (const query of buildSearchQueries(stateName, cityName)) {
      queries.push(query);
    }
  }

  return [...new Set(queries)];
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
  url.searchParams.set("limit", "8");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("q", query);

  const response = await fetchWithRetry(
    url,
    {
      headers: buildRequestHeaders()
    },
    `Nominatim search for "${query}"`
  );

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

function sortAddresses(addresses) {
  return [...addresses].sort((left, right) => {
    const regionCompare = left.regionCode.localeCompare(right.regionCode);

    if (regionCompare !== 0) {
      return regionCompare;
    }

    const cityCompare = left.city.localeCompare(right.city);

    if (cityCompare !== 0) {
      return cityCompare;
    }

    return left.id.localeCompare(right.id);
  });
}

function loadExistingAddresses() {
  try {
    const existingModule = require(path.resolve("src/data/us-generated.ts"));
    return Array.isArray(existingModule.usGeneratedAddresses)
      ? existingModule.usGeneratedAddresses
      : [];
  } catch (error) {
    console.warn("Unable to load existing US generated data:", error instanceof Error ? error.message : error);
    return [];
  }
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
  const targetRegions = requestedStateSet.size
    ? regions.filter((region) => requestedStateSet.has(region.code))
    : regions;
  const addresses = [];

  if (requestedStateSet.size && targetRegions.length !== requestedStateSet.size) {
    const discovered = new Set(targetRegions.map((region) => region.code));
    const missing = requestedStateCodes.filter((code) => !discovered.has(code));
    throw new Error(`Unknown state codes: ${missing.join(", ")}`);
  }

  for (const region of targetRegions) {
    const stateCode = region.code;
    const stateName = region.name.en;
    const addressTarget = TAX_FREE_STATE_CODES.has(stateCode)
      ? TAX_FREE_ADDRESS_TARGET_PER_STATE
      : DEFAULT_ADDRESS_TARGET_PER_STATE;
    const cityPool = usCities.states?.[stateCode]?.cities ?? [];
    const dedupe = new Set();
    const stateAddresses = [];
    const cityNames = [
      ...new Set([
        ...cityPool.map((city) => city.name.en),
        ...(EXTRA_CITY_NAMES_BY_STATE[stateCode] ?? [])
      ])
    ];
    const searchQueue = buildStateSearchQueries(stateName, cityNames).map((query) => ({
      cityName: cityNames.find((cityName) => query.includes(cityName)) ?? stateName,
      query
    }));

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

  const nextAddresses = requestedStateSet.size
    ? sortAddresses([
        ...loadExistingAddresses().filter((entry) => !requestedStateSet.has(entry.regionCode)),
        ...addresses
      ])
    : sortAddresses(addresses);

  const output = `// This file is auto-generated by scripts/build-us-address-data.mjs\n\nexport const usGeneratedRegions = ${renderValue(regions)};\n\nexport const usGeneratedAddresses = ${renderValue(nextAddresses)};\n`;
  const outputPath = path.resolve("src/data/us-generated.ts");

  await fs.writeFile(outputPath, output, "utf8");

  console.log(
    `Wrote ${regions.length} regions and ${nextAddresses.length} addresses to ${outputPath}`
  );
}

await main();
