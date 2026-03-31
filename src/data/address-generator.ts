import {
  getCountryBySlug,
  type AddressRecord,
  type CountryRecord
} from "./countries";
import {
  getRuntimeAddresses,
  getRuntimeRegionName,
  getRuntimeRegions,
  type GeneratorProfile
} from "./runtime-country-data";
import { locales, type Locale } from "./site";
import { usAreaCodes } from "./us-area-codes";

export type GeneratedGender = "male" | "female";

export interface GeneratedAddressRecord {
  seed: string;
  sourceEntryId?: string;
  countrySlug: string;
  countryCode: string;
  countryName: string;
  regionCode: string;
  regionName: string;
  lastName: string;
  firstName: string;
  gender: GeneratedGender;
  phone: string;
  email: string;
  street: string;
  city: string;
  district?: string;
  stateFullName: string;
  postalCode: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
}

interface NameBank {
  male: string[];
  female: string[];
  last: string[];
}

export interface GenerateAddressOptions {
  countrySlug: string;
  regionCode?: string;
  locale?: Locale;
  seed?: string;
  excludeEntryIds?: string[];
  profile?: GeneratorProfile;
}

const westernNameBank: NameBank = {
  male: ["James", "Noah", "Oliver", "Liam", "Henry", "Jack", "Ethan", "Lucas"],
  female: ["Emma", "Olivia", "Ava", "Sophia", "Amelia", "Mia", "Grace", "Chloe"],
  last: ["Smith", "Johnson", "Brown", "Miller", "Taylor", "Anderson", "Clark", "Wilson"]
};

const hongKongNameBank: NameBank = {
  male: ["Ka Ming", "Jun Ho", "Chi Wai", "Wing Lok", "Ho Yin", "Tsz Chun"],
  female: ["Mei Ling", "Siu Yan", "Wing Sze", "Hoi Lam", "Ka Yan", "Oi Kwan"],
  last: ["Chan", "Wong", "Lee", "Lam", "Cheung", "Ng", "Lau", "Chow"]
};

const japaneseNameBank: NameBank = {
  male: ["Haruto", "Sota", "Yuma", "Ren", "Kaito", "Daiki"],
  female: ["Yui", "Aoi", "Hina", "Mio", "Rin", "Sakura"],
  last: ["Sato", "Suzuki", "Takahashi", "Tanaka", "Ito", "Yamamoto"]
};

const indianNameBank: NameBank = {
  male: ["Aarav", "Vihaan", "Arjun", "Rohan", "Ishaan", "Aditya"],
  female: ["Ananya", "Diya", "Priya", "Myra", "Kavya", "Aadhya"],
  last: ["Sharma", "Patel", "Singh", "Gupta", "Rao", "Kapoor"]
};

const nameBankByCountryCode: Record<string, NameBank> = {
  US: westernNameBank,
  UK: westernNameBank,
  CA: westernNameBank,
  HK: hongKongNameBank,
  JP: japaneseNameBank,
  IN: indianNameBank
};
const ukRegionAreaCodes: Record<string, string[]> = {
  ENG: ["20", "121", "161", "191"],
  SCT: ["131", "141", "1224"],
  WLS: ["29", "1792", "1970"],
  NIR: ["28"]
};
const japanRegionAreaCodes: Record<string, string[]> = {
  TOKYO: ["3"],
  OSAKA: ["6"],
  KYOTO: ["75"],
  HOKKAIDO: ["11"]
};
const canadaRegionAreaCodes: Record<string, string[]> = {
  ON: ["226", "249", "289", "343", "365", "416", "437", "519", "613", "647", "705", "807", "905"],
  BC: ["236", "250", "604", "672", "778"],
  QC: ["367", "418", "438", "450", "514", "579", "581", "873"],
  AB: ["368", "403", "587", "780", "825"]
};
const indiaRegionAreaCodes: Record<string, string[]> = {
  MH: ["22"],
  DL: ["11"],
  KA: ["80"],
  WB: ["33"],
  TS: ["40"]
};
const japaneseNativePrefectureByRegionCode: Record<string, string> = {
  TOKYO: "東京都",
  OSAKA: "大阪府",
  KYOTO: "京都府",
  HOKKAIDO: "北海道"
};

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

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

function pickRandom<T>(items: T[], random: () => number) {
  if (!items.length) {
    return null;
  }

  const index = Math.floor(random() * items.length);
  return items[index] ?? null;
}

function createSeed() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

function sanitizeEmailPart(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")
    .replace(/\.{2,}/g, ".");
}

function buildEmail(firstName: string, lastName: string, countrySlug: string, seed: string) {
  const first = sanitizeEmailPart(firstName) || "user";
  const last = sanitizeEmailPart(lastName) || "address";
  const token = seed.slice(0, 4).toLowerCase();

  return `${first}.${last}.${countrySlug}.${token}@example.com`;
}

function fillDigitGroup(group: string, random: () => number) {
  if (!group.length) {
    return group;
  }

  const digits = group.split("");
  const firstDigitMin = group.length > 1 ? 2 : 1;
  digits[0] = String(firstDigitMin + Math.floor(random() * (10 - firstDigitMin)));

  for (let index = 1; index < digits.length; index += 1) {
    digits[index] = String(Math.floor(random() * 10));
  }

  const nextGroup = digits.join("");

  if (nextGroup !== group) {
    return nextGroup;
  }

  const lastIndex = digits.length - 1;
  digits[lastIndex] = String((Number(digits[lastIndex]) + 1) % 10);
  return digits.join("");
}

function getFallbackPhoneTemplate(countryCode: string) {
  switch (countryCode) {
    case "US":
    case "CA":
      return "+1 212-555-0100";
    case "UK":
      return "+44 20 7000 0000";
    case "JP":
      return "+81 3-3000-0000";
    case "HK":
      return "+852 2000 0000";
    case "IN":
      return "+91 22 2000 0000";
    default:
      return "+1 212-555-0100";
  }
}

function buildUsPhone(regionCode: string | undefined, seed: string) {
  const codes = (regionCode && usAreaCodes[regionCode]) || ["212"];
  const random = createSeededRandom(`phone:us:${regionCode || "default"}:${seed}`);
  const areaCode = pickRandom(codes, random) ?? codes[0];
  const exchange = fillDigitGroup("200", random);
  const line = fillDigitGroup("0000", random);

  return `+1 ${areaCode}-${exchange}-${line}`;
}

function buildCanadaPhone(regionCode: string | undefined, seed: string) {
  const random = createSeededRandom(`phone:ca:${regionCode || "default"}:${seed}`);
  const codes = (regionCode && canadaRegionAreaCodes[regionCode]) || ["416"];
  const areaCode = pickRandom(codes, random) ?? codes[0];
  return `+1 ${areaCode}-${fillDigitGroup("200", random)}-${fillDigitGroup("0000", random)}`;
}

function buildUkPhone(regionCode: string | undefined, seed: string) {
  const random = createSeededRandom(`phone:uk:${regionCode || "default"}:${seed}`);
  const codes = (regionCode && ukRegionAreaCodes[regionCode]) || ["20"];
  const areaCode = pickRandom(codes, random) ?? codes[0];

  if (areaCode.length === 2) {
    return `+44 ${areaCode} ${fillDigitGroup("7000", random)} ${fillDigitGroup("0000", random)}`;
  }

  return `+44 ${areaCode} ${fillDigitGroup("300", random)} ${fillDigitGroup("0000", random)}`;
}

function buildJapanPhone(regionCode: string | undefined, seed: string) {
  const random = createSeededRandom(`phone:jp:${regionCode || "default"}:${seed}`);
  const codes = (regionCode && japanRegionAreaCodes[regionCode]) || ["3"];
  const areaCode = pickRandom(codes, random) ?? codes[0];
  return `+81 ${areaCode}-${fillDigitGroup("3000", random)}-${fillDigitGroup("0000", random)}`;
}

function buildHongKongPhone(seed: string) {
  const random = createSeededRandom(`phone:hk:${seed}`);
  return `+852 ${fillDigitGroup("2000", random)} ${fillDigitGroup("0000", random)}`;
}

function buildIndiaPhone(regionCode: string | undefined, seed: string) {
  const random = createSeededRandom(`phone:in:${regionCode || "default"}:${seed}`);
  const codes = (regionCode && indiaRegionAreaCodes[regionCode]) || ["22"];
  const areaCode = pickRandom(codes, random) ?? codes[0];
  return `+91 ${areaCode} ${fillDigitGroup("2000", random)} ${fillDigitGroup("0000", random)}`;
}

function buildPhone(
  template: string | undefined,
  countryCode: string,
  regionCode: string | undefined,
  seed: string
) {
  switch (countryCode) {
    case "US":
      return buildUsPhone(regionCode, seed);
    case "CA":
      return buildCanadaPhone(regionCode, seed);
    case "UK":
      return buildUkPhone(regionCode, seed);
    case "JP":
      return buildJapanPhone(regionCode, seed);
    case "HK":
      return buildHongKongPhone(seed);
    case "IN":
      return buildIndiaPhone(regionCode, seed);
    default:
      break;
  }

  const baseTemplate = template?.trim() || getFallbackPhoneTemplate(countryCode);
  const groups = baseTemplate.match(/\d+/g);

  if (!groups?.length) {
    return baseTemplate;
  }

  const keepCount = groups.length >= 3 ? 2 : 1;
  const random = createSeededRandom(`phone:${countryCode}:${seed}:${baseTemplate}`);
  const nextGroups = groups.map((group, index) =>
    index < keepCount ? group : fillDigitGroup(group, random)
  );

  let replaceIndex = 0;

  return baseTemplate.replace(/\d+/g, () => nextGroups[replaceIndex++] ?? "");
}

function getNameBank(countryCode: string) {
  return nameBankByCountryCode[countryCode] ?? westernNameBank;
}

function buildFullAddress(
  country: CountryRecord,
  entry: AddressRecord,
  regionName: string,
  locale: Locale
) {
  const countryName = country.name[locale];

  switch (country.code) {
    case "HK":
      return [entry.street, entry.district, entry.city].filter(Boolean).join(", ");
    case "JP":
      if (locale === "en") {
        return [
          entry.street,
          entry.district,
          entry.city === japaneseNativePrefectureByRegionCode[entry.regionCode] ? "" : entry.city,
          `${regionName} ${entry.postalCode}`,
          countryName
        ]
          .filter(Boolean)
          .join(", ");
      }

      return `〒${entry.postalCode} ${regionName}${entry.city === japaneseNativePrefectureByRegionCode[entry.regionCode] ? "" : entry.city}${entry.district ?? ""}${entry.street}, ${countryName}`;
    case "UK":
      return [entry.street, entry.city, regionName, entry.postalCode, countryName]
        .filter(Boolean)
        .join(", ");
    default:
      return `${entry.street}, ${entry.city}, ${regionName} ${entry.postalCode}, ${countryName}`;
  }
}

function resolvePool(
  country: CountryRecord,
  profile: GeneratorProfile,
  requestedRegionCode?: string,
  excludeEntryIds?: string[]
) {
  const countryPool = getRuntimeAddresses(country, profile);
  const countryRegions = getRuntimeRegions(country, profile);
  const hasRequestedRegion =
    requestedRegionCode &&
    countryRegions.some((region) => region.code === requestedRegionCode);
  const filteredByRegion = hasRequestedRegion
    ? countryPool.filter((entry) => entry.regionCode === requestedRegionCode)
    : countryPool;
  const excludeSet = new Set((excludeEntryIds ?? []).filter(Boolean));
  const filtered =
    excludeSet.size > 0 && filteredByRegion.length > excludeSet.size
      ? filteredByRegion.filter((entry) => !excludeSet.has(entry.id))
      : filteredByRegion;

  if (filtered.length) {
    return filtered;
  }

  return filteredByRegion.length ? filteredByRegion : countryPool;
}

export function generateAddress({
  countrySlug,
  regionCode,
  locale = "zh",
  seed,
  excludeEntryIds,
  profile = "default"
}: GenerateAddressOptions): GeneratedAddressRecord {
  const country = getCountryBySlug(countrySlug);

  if (!country) {
    throw new Error(`Unsupported country slug: ${countrySlug}`);
  }

  const runtimeAddresses = getRuntimeAddresses(country, profile);

  if (!runtimeAddresses.length) {
    throw new Error(`Country ${countrySlug} has no address seeds`);
  }

  const resolvedSeed = seed || createSeed();
  const random = createSeededRandom(`${countrySlug}:${regionCode || "random"}:${resolvedSeed}`);
  const pool = resolvePool(country, profile, regionCode, excludeEntryIds);
  const entry = pickRandom(pool, random);

  if (!entry) {
    throw new Error(`Unable to resolve an address seed for ${countrySlug}`);
  }

  const bank = getNameBank(country.code);
  const gender: GeneratedGender = random() > 0.5 ? "female" : "male";
  const firstName = pickRandom(bank[gender], random) ?? "Alex";
  const lastName = pickRandom(bank.last, random) ?? "Taylor";
  const regionName = getRuntimeRegionName(country, entry.regionCode, locale, profile);
  const phone = buildPhone(
    entry.phone,
    country.code,
    entry.regionCode,
    `${entry.id}:${resolvedSeed}`
  );

  return {
    seed: resolvedSeed,
    sourceEntryId: entry.id,
    countrySlug: country.slug,
    countryCode: country.code,
    countryName: country.name[locale],
    regionCode: entry.regionCode,
    regionName,
    lastName,
    firstName,
    gender,
    phone,
    email: buildEmail(firstName, lastName, country.slug, resolvedSeed),
    street: entry.street,
    city: entry.city,
    district: entry.district,
    stateFullName: regionName,
    postalCode: entry.postalCode,
    fullAddress: buildFullAddress(country, entry, regionName, locale),
    latitude: entry.latitude,
    longitude: entry.longitude
  };
}
