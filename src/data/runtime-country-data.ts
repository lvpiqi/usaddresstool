import type { AddressRecord, CountryRecord, RegionRecord } from "./countries";
import type { Locale } from "./site";
import { usGeneratedAddresses, usGeneratedRegions } from "./us-generated";

export type GeneratorProfile = "default" | "tax-free";

const usTaxFreeRegionCodes = ["AK", "DE", "MT", "NH", "OR"] as const;

const regionOverrides: Record<string, RegionRecord[]> = {
  us: usGeneratedRegions as RegionRecord[]
};

const addressOverrides: Record<string, AddressRecord[]> = {
  us: usGeneratedAddresses as AddressRecord[]
};
const syntheticVariantCountByCountry: Partial<Record<CountryRecord["slug"], number>> = {
  hk: 24,
  uk: 28,
  jp: 28,
  ca: 28,
  in: 28
};
const expandedAddressCache = new Map<string, AddressRecord[]>();

function hashSeed(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed: string) {
  let state = hashSeed(seed) || 1;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function randomInt(random: () => number, min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function buildWesternStyleStreet(street: string, random: () => number) {
  const leadingMatch = street.match(/^(\d+)([A-Za-z]?)(\s+.*)$/u);

  if (leadingMatch) {
    const original = Number(leadingMatch[1]);
    const parity = original % 2;
    let next = original + randomInt(random, 2, 96);

    if (next % 2 !== parity) {
      next += 1;
    }

    return `${next}${leadingMatch[2]}${leadingMatch[3]}`;
  }

  return `${randomInt(random, 3, 240)} ${street}`;
}

function buildJapaneseStyleStreet(street: string, random: () => number) {
  const digitMatches = [...street.matchAll(/\d+/g)];

  if (!digitMatches.length) {
    return `${street}${randomInt(random, 1, 20)}-${randomInt(random, 1, 20)}`;
  }

  let replaceIndex = 0;

  return street.replace(/\d+/g, (value) => {
    replaceIndex += 1;
    const base = Number(value);
    const offset = replaceIndex === 1 ? randomInt(random, 1, 4) : randomInt(random, 1, 8);
    return String(Math.max(1, base + offset));
  });
}

function buildVariantStreet(country: CountryRecord, street: string, random: () => number) {
  switch (country.code) {
    case "JP":
      return buildJapaneseStyleStreet(street, random);
    default:
      return buildWesternStyleStreet(street, random);
  }
}

function hasExplicitStreetNumber(country: CountryRecord, street: string) {
  if (country.code === "JP") {
    return /\d/u.test(street);
  }

  return /^\d+[A-Za-z]?(\s|$)/u.test(street);
}

function buildSyntheticAddressVariants(country: CountryRecord, addresses: AddressRecord[]) {
  const variantCount = syntheticVariantCountByCountry[country.slug] ?? 1;

  if (variantCount <= 1) {
    return addresses;
  }

  return addresses.flatMap((entry) => {
    const variants = [];

    if (hasExplicitStreetNumber(country, entry.street)) {
      variants.push(entry);
    } else {
      const baseRandom = createSeededRandom(`${country.slug}:${entry.id}:variant:0`);

      variants.push({
        ...entry,
        id: `${entry.id}-v0`,
        street: buildVariantStreet(country, entry.street, baseRandom)
      });
    }

    for (let index = 1; index < variantCount; index += 1) {
      const random = createSeededRandom(`${country.slug}:${entry.id}:variant:${index}`);
      const street = buildVariantStreet(country, entry.street, random);

      variants.push({
        ...entry,
        id: `${entry.id}-v${index}`,
        street
      });
    }

    return variants;
  });
}

function filterTaxFreeRegions(regions: RegionRecord[]) {
  const priority = new Map(usTaxFreeRegionCodes.map((code, index) => [code, index]));

  return regions
    .filter((region) => priority.has(region.code as (typeof usTaxFreeRegionCodes)[number]))
    .sort((left, right) => (priority.get(left.code) ?? 99) - (priority.get(right.code) ?? 99));
}

function filterTaxFreeAddresses(addresses: AddressRecord[]) {
  const allowed = new Set(usTaxFreeRegionCodes);

  return addresses.filter((address) => allowed.has(address.regionCode as (typeof usTaxFreeRegionCodes)[number]));
}

export function getRuntimeRegions(
  country: CountryRecord,
  profile: GeneratorProfile = "default"
) {
  const baseRegions = regionOverrides[country.slug] ?? country.regions;

  if (country.slug === "us" && profile === "tax-free") {
    return filterTaxFreeRegions(baseRegions);
  }

  return baseRegions;
}

export function getRuntimeRegionDisplayName(
  country: CountryRecord,
  region: RegionRecord,
  locale: Locale
) {
  const baseName = region.name[locale];

  if (country.slug === "us") {
    return `${baseName} (${region.code})`;
  }

  return baseName;
}

export function getRuntimeAddresses(
  country: CountryRecord,
  profile: GeneratorProfile = "default"
) {
  const cacheKey = `${country.slug}:${profile}`;

  if (expandedAddressCache.has(cacheKey)) {
    return expandedAddressCache.get(cacheKey) ?? [];
  }

  const rawAddresses = addressOverrides[country.slug] ?? country.addresses;
  const baseAddresses = buildSyntheticAddressVariants(country, rawAddresses);

  if (country.slug === "us" && profile === "tax-free") {
    const filtered = filterTaxFreeAddresses(baseAddresses);
    expandedAddressCache.set(cacheKey, filtered);
    return filtered;
  }

  expandedAddressCache.set(cacheKey, baseAddresses);
  return baseAddresses;
}

export function getRuntimeRegionName(
  country: CountryRecord,
  regionCode: string,
  locale: Locale,
  profile: GeneratorProfile = "default"
) {
  return getRuntimeRegions(country, profile).find((region) => region.code === regionCode)?.name[locale] ?? regionCode;
}
