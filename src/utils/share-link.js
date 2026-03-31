const localeCodeByLocale = {
  zh: "z",
  en: "e",
  ja: "j"
};

const localeByLocaleCode = {
  z: "zh",
  e: "en",
  j: "ja"
};

const profileCodeByProfile = {
  default: "d",
  "tax-free": "t"
};

const profileByProfileCode = {
  d: "default",
  t: "tax-free"
};

const base36Digits = "0123456789abcdefghijklmnopqrstuvwxyz";

function isHexSeed(seed) {
  return /^[0-9a-f]+$/i.test(seed);
}

function normalizeCountrySlug(countrySlug) {
  const normalized = String(countrySlug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");

  return normalized || null;
}

function normalizeRegionCode(regionCode) {
  const normalized = String(regionCode || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  return normalized || "0";
}

function normalizeSeed(seed) {
  const normalized = String(seed || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return normalized || null;
}

function encodeSeedForToken(seed) {
  if (!isHexSeed(seed)) {
    return `r${seed}`;
  }

  return `x${BigInt(`0x${seed}`).toString(36)}`;
}

function base36ToBigInt(value) {
  let result = 0n;

  for (const character of value) {
    const digit = base36Digits.indexOf(character);

    if (digit < 0) {
      return null;
    }

    result = result * 36n + BigInt(digit);
  }

  return result;
}

function decodeSeedFromToken(value) {
  const normalized = normalizeSeed(value);

  if (!normalized || normalized.length < 2) {
    return normalized;
  }

  const mode = normalized[0];
  const encoded = normalized.slice(1);

  if (!encoded) {
    return null;
  }

  if (mode === "x") {
    const parsed = base36ToBigInt(encoded);

    if (parsed === null) {
      return null;
    }

    return parsed.toString(16).padStart(12, "0");
  }

  if (mode === "r") {
    return encoded;
  }

  return normalized;
}

export function buildShareToken({
  countrySlug,
  locale = "zh",
  profile = "default",
  regionCode,
  seed
}) {
  const countryPart = normalizeCountrySlug(countrySlug);
  const localePart = localeCodeByLocale[locale] || localeCodeByLocale.zh;
  const profilePart = profileCodeByProfile[profile] || profileCodeByProfile.default;
  const regionPart = normalizeRegionCode(regionCode);
  const seedPart = normalizeSeed(seed);

  if (!countryPart || !seedPart) {
    return null;
  }

  return `${countryPart}.${localePart}${profilePart}.${regionPart}.${encodeSeedForToken(seedPart)}`;
}

export function parseShareToken(token) {
  const normalized = String(token || "").trim();
  const parts = normalized.split(".");

  if (parts.length !== 4) {
    return null;
  }

  const [countryPart, localeProfilePart, regionPartRaw, seedPartRaw] = parts;
  const countrySlug = normalizeCountrySlug(countryPart);
  const regionCode = normalizeRegionCode(regionPartRaw);
  const seed = decodeSeedFromToken(seedPartRaw);

  if (!countrySlug || localeProfilePart.length !== 2 || !seed) {
    return null;
  }

  const locale = localeByLocaleCode[localeProfilePart[0]];
  const profile = profileByProfileCode[localeProfilePart[1]];

  if (!locale || !profile) {
    return null;
  }

  return {
    countrySlug,
    locale,
    profile,
    regionCode: regionCode === "0" ? "" : regionCode,
    seed
  };
}

export function buildSharePath(payload) {
  const token = buildShareToken(payload);

  if (!token) {
    return null;
  }

  return `/s/${token}/`;
}
