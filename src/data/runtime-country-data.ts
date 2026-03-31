import type { AddressRecord, CountryRecord, RegionRecord } from "./countries";
import type { Locale } from "./site";
import { usGeneratedAddresses } from "./us-generated";

export type GeneratorProfile = "default" | "tax-free";

const usTaxFreeRegionCodes = ["AK", "DE", "MT", "NH", "OR"] as const;

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
const runtimeVariantSlotsByCountry: Partial<Record<CountryRecord["slug"], number>> = {
  us: 4
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

function getWesternStreetDelta(variantIndex: number) {
  if (variantIndex <= 0) {
    return 0;
  }

  const blockOffset = Math.floor((variantIndex - 1) / 12) * 100;
  const unitOffset = (((variantIndex - 1) % 12) + 1) * 2;

  return blockOffset + unitOffset;
}

function offsetHouseToken(token: string, delta: number) {
  if (delta <= 0) {
    return token;
  }

  return token.replace(/\d+/g, (value) => {
    const original = Number(value);
    const parity = original % 2;
    let next = original + delta;

    if (next % 2 !== parity) {
      next += 1;
    }

    return String(next);
  });
}

function buildWesternStyleStreet(
  street: string,
  variantIndex: number,
  random: () => number
) {
  const leadingMatch = street.match(/^([0-9A-Za-z;:-]+)(\s+.*)$/u);

  if (leadingMatch) {
    if (variantIndex <= 0) {
      return street;
    }

    const delta = getWesternStreetDelta(variantIndex);
    const nextToken = offsetHouseToken(leadingMatch[1], delta);

    return `${nextToken}${leadingMatch[2]}`;
  }

  return `${100 + variantIndex * 2 + randomInt(random, 0, 8)} ${street}`;
}

function buildJapaneseStyleStreet(
  street: string,
  variantIndex: number,
  random: () => number
) {
  const digitMatches = [...street.matchAll(/\d+/g)];

  if (!digitMatches.length) {
    return `${street}${1 + variantIndex}-${1 + variantIndex}-${randomInt(random, 1, 9)}`;
  }

  let replaceIndex = 0;

  return street.replace(/\d+/g, (value) => {
    replaceIndex += 1;
    const base = Number(value);
    const offset =
      replaceIndex === 1
        ? Math.max(1, variantIndex)
        : Math.max(1, Math.floor(variantIndex / 2) + randomInt(random, 1, 4));
    return String(Math.max(1, base + offset));
  });
}

function buildVariantStreet(
  country: CountryRecord,
  street: string,
  variantIndex: number,
  random: () => number
) {
  switch (country.code) {
    case "JP":
      return buildJapaneseStyleStreet(street, variantIndex, random);
    default:
      return buildWesternStyleStreet(street, variantIndex, random);
  }
}

function hasExplicitStreetNumber(country: CountryRecord, street: string) {
  if (country.code === "JP") {
    return /\d/u.test(street);
  }

  return /^\d/u.test(street);
}

function replaceLocalizedStreet(
  fullAddress: AddressRecord["fullAddress"],
  previousStreet: string,
  nextStreet: string
) {
  return {
    zh: fullAddress.zh.includes(previousStreet)
      ? fullAddress.zh.replace(previousStreet, nextStreet)
      : fullAddress.zh,
    en: fullAddress.en.includes(previousStreet)
      ? fullAddress.en.replace(previousStreet, nextStreet)
      : fullAddress.en,
    ja: fullAddress.ja.includes(previousStreet)
      ? fullAddress.ja.replace(previousStreet, nextStreet)
      : fullAddress.ja
  };
}

function buildVariantEntry(
  entry: AddressRecord,
  variantId: string,
  street: string
) {
  return {
    ...entry,
    id: variantId,
    street,
    fullAddress: replaceLocalizedStreet(entry.fullAddress, entry.street, street)
  };
}

function buildMaterializedEntry(entry: AddressRecord, street: string) {
  if (street === entry.street) {
    return entry;
  }

  return {
    ...entry,
    street,
    fullAddress: replaceLocalizedStreet(entry.fullAddress, entry.street, street)
  };
}

function buildSyntheticAddressVariants(country: CountryRecord, addresses: AddressRecord[]) {
  const variantCount = syntheticVariantCountByCountry[country.slug] ?? 1;

  if (variantCount <= 1) {
    return addresses;
  }

  return addresses.flatMap((entry) => {
    const variants = [];
    const explicitStreetNumber = hasExplicitStreetNumber(country, entry.street);

    if (explicitStreetNumber) {
      variants.push(entry);
    } else {
      const baseRandom = createSeededRandom(`${country.slug}:${entry.id}:variant:0`);
      const street = buildVariantStreet(country, entry.street, 1, baseRandom);

      variants.push(buildVariantEntry(entry, `${entry.id}-v0`, street));
    }

    for (let index = 1; index < variantCount; index += 1) {
      const random = createSeededRandom(`${country.slug}:${entry.id}:variant:${index}`);
      const effectiveIndex = explicitStreetNumber ? index : index + 1;
      const street = buildVariantStreet(country, entry.street, effectiveIndex, random);

      variants.push(buildVariantEntry(entry, `${entry.id}-v${index}`, street));
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
  const baseRegions = country.regions;

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

export function materializeRuntimeAddress(
  country: CountryRecord,
  entry: AddressRecord,
  seed: string
) {
  const runtimeSlotCount = runtimeVariantSlotsByCountry[country.slug] ?? 1;

  if (runtimeSlotCount <= 1) {
    return entry;
  }

  const random = createSeededRandom(`${country.slug}:${entry.id}:${seed}:runtime`);
  const variantIndex = hashSeed(`${country.slug}:${entry.id}:${seed}:slot`) % runtimeSlotCount;
  const street = buildVariantStreet(country, entry.street, variantIndex, random);

  return buildMaterializedEntry(entry, street);
}

export function getRuntimeRegionName(
  country: CountryRecord,
  regionCode: string,
  locale: Locale,
  profile: GeneratorProfile = "default"
) {
  return getRuntimeRegions(country, profile).find((region) => region.code === regionCode)?.name[locale] ?? regionCode;
}
