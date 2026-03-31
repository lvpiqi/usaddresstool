import type { AddressRecord, RegionRecord } from "./countries";
import type { LocalizedText } from "./site";

export interface StreetSeed {
  slug: string;
  streetEn: string;
  streetZh?: string;
  streetJa?: string;
  venue?: LocalizedText;
}

export interface LocalitySeed {
  slug: string;
  cityEn: string;
  cityZh?: string;
  cityJa?: string;
  districtEn?: string;
  districtZh?: string;
  districtJa?: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  streets: StreetSeed[];
}

export interface RegionSeed<Code extends string = string> {
  code: Code;
  name: LocalizedText;
  localities: LocalitySeed[];
}

export type GeneratedAddressFormat = "default" | "uk" | "hk" | "india";

const defaultRecipient = text("测试收件人", "Test Receiver", "テスト受取人");

export function text(zh: string, en: string, ja: string): LocalizedText {
  return { zh, en, ja };
}

export function localizedText(en: string, zh?: string, ja?: string): LocalizedText {
  return text(zh ?? en, en, ja ?? en);
}

export function localizedOptionalText(
  en?: string,
  zh?: string,
  ja?: string
): LocalizedText | undefined {
  if (!en && !zh && !ja) {
    return undefined;
  }

  return text(zh ?? en ?? "", en ?? zh ?? "", ja ?? en ?? zh ?? "");
}

export function street(
  slug: string,
  streetEn: string,
  streetZh?: string,
  streetJa?: string,
  venue?: LocalizedText
): StreetSeed {
  return { slug, streetEn, streetZh, streetJa, venue };
}

export function locality(
  slug: string,
  cityEn: string,
  postalCode: string,
  latitude: number,
  longitude: number,
  streets: StreetSeed[],
  options?: {
    cityZh?: string;
    cityJa?: string;
    districtEn?: string;
    districtZh?: string;
    districtJa?: string;
  }
): LocalitySeed {
  return {
    slug,
    cityEn,
    cityZh: options?.cityZh,
    cityJa: options?.cityJa,
    districtEn: options?.districtEn,
    districtZh: options?.districtZh,
    districtJa: options?.districtJa,
    postalCode,
    latitude,
    longitude,
    streets
  };
}

function buildFullAddress(
  format: GeneratedAddressFormat,
  countryLabel: LocalizedText,
  regionName: LocalizedText,
  localitySeed: LocalitySeed,
  streetSeed: StreetSeed
) {
  const streetLabel = localizedText(
    streetSeed.streetEn,
    streetSeed.streetZh,
    streetSeed.streetJa
  );
  const cityLabel = localizedText(
    localitySeed.cityEn,
    localitySeed.cityZh,
    localitySeed.cityJa
  );
  const districtLabel = localizedOptionalText(
    localitySeed.districtEn,
    localitySeed.districtZh,
    localitySeed.districtJa
  );

  switch (format) {
    case "hk":
      return text(
        [streetLabel.zh, districtLabel?.zh, cityLabel.zh].filter(Boolean).join(", "),
        [streetLabel.en, districtLabel?.en, cityLabel.en].filter(Boolean).join(", "),
        [streetLabel.ja, districtLabel?.ja, cityLabel.ja].filter(Boolean).join(", ")
      );
    case "uk":
      return text(
        [streetLabel.zh, cityLabel.zh, regionName.zh, localitySeed.postalCode, countryLabel.zh]
          .filter(Boolean)
          .join(", "),
        [streetLabel.en, cityLabel.en, regionName.en, localitySeed.postalCode, countryLabel.en]
          .filter(Boolean)
          .join(", "),
        [streetLabel.ja, cityLabel.ja, regionName.ja, localitySeed.postalCode, countryLabel.ja]
          .filter(Boolean)
          .join(", ")
      );
    case "india":
      return text(
        [
          streetLabel.zh,
          districtLabel?.zh,
          cityLabel.zh,
          `${regionName.zh} ${localitySeed.postalCode}`,
          countryLabel.zh
        ]
          .filter(Boolean)
          .join(", "),
        [
          streetLabel.en,
          districtLabel?.en,
          cityLabel.en,
          `${regionName.en} ${localitySeed.postalCode}`,
          countryLabel.en
        ]
          .filter(Boolean)
          .join(", "),
        [
          streetLabel.ja,
          districtLabel?.ja,
          cityLabel.ja,
          `${regionName.ja} ${localitySeed.postalCode}`,
          countryLabel.ja
        ]
          .filter(Boolean)
          .join(", ")
      );
    default:
      return text(
        [streetLabel.zh, cityLabel.zh, `${regionName.zh} ${localitySeed.postalCode}`, countryLabel.zh]
          .filter(Boolean)
          .join(", "),
        [streetLabel.en, cityLabel.en, `${regionName.en} ${localitySeed.postalCode}`, countryLabel.en]
          .filter(Boolean)
          .join(", "),
        [streetLabel.ja, cityLabel.ja, `${regionName.ja} ${localitySeed.postalCode}`, countryLabel.ja]
          .filter(Boolean)
          .join(", ")
      );
  }
}

function offsetCoordinate(base: number, index: number, offset: number) {
  return Number((base + index * offset).toFixed(6));
}

export function buildGeneratedCountryData<Code extends string>(
  prefix: string,
  seeds: RegionSeed<Code>[],
  options: {
    countryLabel: LocalizedText;
    defaultPhone: string;
    format?: GeneratedAddressFormat;
  }
) {
  const format = options.format ?? "default";

  const regions: RegionRecord[] = seeds.map((seed) => ({
    code: seed.code,
    name: seed.name
  }));

  const addresses: AddressRecord[] = seeds.flatMap((regionSeed) =>
    regionSeed.localities.flatMap((localitySeed) =>
      localitySeed.streets.map((streetSeed, index) => {
        const districtLocalized = localizedOptionalText(
          localitySeed.districtEn,
          localitySeed.districtZh,
          localitySeed.districtJa
        );
        const cityLocalized = localizedText(
          localitySeed.cityEn,
          localitySeed.cityZh,
          localitySeed.cityJa
        );
        const streetLocalized = localizedText(
          streetSeed.streetEn,
          streetSeed.streetZh,
          streetSeed.streetJa
        );

        return {
          id: `${prefix}-${regionSeed.code.toLowerCase()}-${localitySeed.slug}-${streetSeed.slug}`,
          regionCode: regionSeed.code,
          venue:
            streetSeed.venue ??
            localizedText(
              localitySeed.districtEn ?? localitySeed.cityEn,
              localitySeed.districtZh ?? localitySeed.cityZh,
              localitySeed.districtJa ?? localitySeed.cityJa
            ),
          recipient: defaultRecipient,
          street: streetSeed.streetEn,
          streetLocalized,
          district: localitySeed.districtEn,
          districtLocalized,
          city: localitySeed.cityEn,
          cityLocalized,
          postalCode: localitySeed.postalCode,
          phone: options.defaultPhone,
          email: `${prefix}.${regionSeed.code.toLowerCase()}.${localitySeed.slug}.${streetSeed.slug}@example.dev`,
          fullAddress: buildFullAddress(
            format,
            options.countryLabel,
            regionSeed.name,
            localitySeed,
            streetSeed
          ),
          latitude: offsetCoordinate(localitySeed.latitude, index, 0.0021),
          longitude: offsetCoordinate(localitySeed.longitude, index, 0.0025)
        };
      })
    )
  );

  return { regions, addresses };
}
