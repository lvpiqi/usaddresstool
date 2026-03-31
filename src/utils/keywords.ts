import type { BlogPost } from "../data/blog";
import type { CountryRecord } from "../data/countries";
import { siteConfig, type InfoPageKey, type Locale } from "../data/site";

type LocalizedKeywords = Record<Locale, string[]>;

const blockedStandaloneKeywords: Record<Locale, string[]> = {
  zh: ["美国", "加拿大", "日本", "香港", "英国", "印度"],
  en: [
    "united states",
    "us",
    "usa",
    "canada",
    "japan",
    "hong kong",
    "united kingdom",
    "uk",
    "india"
  ],
  ja: ["米国", "アメリカ", "カナダ", "日本", "香港", "英国", "イギリス", "インド"]
};

const maxKeywordCount: Record<Locale, number> = {
  zh: 6,
  en: 4,
  ja: 5
};

const brandKeywords: LocalizedKeywords = {
  zh: [siteConfig.name, siteConfig.domain, "地址生成工具"],
  en: [siteConfig.name, siteConfig.domain, "address generator tool"],
  ja: [siteConfig.name, siteConfig.domain, "住所生成ツール"]
};

const countryGeneratorKeywords: Record<string, LocalizedKeywords> = {
  us: {
    zh: ["美国地址生成器", "美国真实地址", "美国 ZIP 邮编", "美国州地址", "美国地址工具"],
    en: ["us address generator", "real us address", "us zip code", "us state address", "us address tool"],
    ja: ["米国住所生成", "アメリカ住所ジェネレーター", "米国 ZIP コード", "州別住所", "住所生成ツール"]
  },
  hk: {
    zh: ["香港地址生成器", "香港真实地址", "香港地区地址", "香港街道地址", "香港地址工具"],
    en: ["hong kong address generator", "real hong kong address", "hong kong district address", "hong kong street address", "hong kong address tool"],
    ja: ["香港住所生成", "香港住所ジェネレーター", "香港地区住所", "香港ストリート住所", "住所生成ツール"]
  },
  uk: {
    zh: ["英国地址生成器", "英国真实地址", "英国 postcode", "英国地区地址", "英国地址工具"],
    en: ["uk address generator", "real uk address", "uk postcode", "uk regional address", "uk address tool"],
    ja: ["英国住所生成", "英国住所ジェネレーター", "英国 postcode", "英国地域住所", "住所生成ツール"]
  },
  jp: {
    zh: ["日本地址生成器", "日本真实地址", "日本邮编", "日本都道府县地址", "日本地址工具"],
    en: ["japan address generator", "real japan address", "japan postal code", "japan prefecture address", "japan address tool"],
    ja: ["日本住所生成", "日本住所ジェネレーター", "日本郵便番号", "都道府県住所", "住所生成ツール"]
  },
  ca: {
    zh: ["加拿大地址生成器", "加拿大真实地址", "加拿大 postal code", "加拿大省地址", "加拿大地址工具"],
    en: ["canada address generator", "real canada address", "canada postal code", "canada province address", "canada address tool"],
    ja: ["カナダ住所生成", "カナダ住所ジェネレーター", "カナダ postal code", "州別住所", "住所生成ツール"]
  },
  in: {
    zh: ["印度地址生成器", "印度真实地址", "印度 PIN Code", "印度州地址", "印度地址工具"],
    en: ["india address generator", "real india address", "india pin code", "india state address", "india address tool"],
    ja: ["インド住所生成", "インド住所ジェネレーター", "インド PIN Code", "州別住所", "住所生成ツール"]
  }
};

const countryFormatKeywords: Record<string, LocalizedKeywords> = {
  us: {
    zh: ["美国地址格式", "美国地址怎么写", "美国 ZIP Code 格式", "美国州缩写"],
    en: ["us address format", "how to write a us address", "us zip code format", "us state abbreviation"],
    ja: ["米国住所形式", "アメリカ住所の書き方", "ZIP Code 形式", "州略称"]
  },
  hk: {
    zh: ["香港地址格式", "香港地址怎么写", "香港街道格式", "香港大厦地址"],
    en: ["hong kong address format", "how to write a hong kong address", "hong kong street format", "hong kong building address"],
    ja: ["香港住所形式", "香港住所の書き方", "香港ストリート形式", "香港ビル住所"]
  },
  uk: {
    zh: ["英国地址格式", "英国地址怎么写", "英国 postcode 格式", "英国 post town"],
    en: ["uk address format", "how to write a uk address", "uk postcode format", "uk post town"],
    ja: ["英国住所形式", "英国住所の書き方", "postcode 形式", "post town"]
  },
  jp: {
    zh: ["日本地址格式", "日本地址怎么写", "日本邮编格式", "日本都道府县写法"],
    en: ["japan address format", "how to write a japan address", "japan postal code format", "japan prefecture address"],
    ja: ["日本住所形式", "日本住所の書き方", "日本郵便番号形式", "都道府県表記"]
  },
  ca: {
    zh: ["加拿大地址格式", "加拿大地址怎么写", "加拿大 postal code 格式", "加拿大省缩写"],
    en: ["canada address format", "how to write a canada address", "canada postal code format", "canada province abbreviation"],
    ja: ["カナダ住所形式", "カナダ住所の書き方", "postal code 形式", "州略称"]
  },
  in: {
    zh: ["印度地址格式", "印度地址怎么写", "印度 PIN Code 格式", "印度 locality"],
    en: ["india address format", "how to write an india address", "india pin code format", "india locality address"],
    ja: ["インド住所形式", "インド住所の書き方", "PIN Code 形式", "locality 住所"]
  }
};

const blogKeywordsBySlug: Record<string, LocalizedKeywords> = {
  "us-address-format": {
    zh: ["美国地址格式", "美国地址怎么写", "Street City State ZIP", "美国 ZIP Code"],
    en: ["us address format", "how to write a us address", "street city state zip", "us zip code"],
    ja: ["米国住所形式", "アメリカ住所の書き方", "street city state zip", "ZIP Code"]
  },
  "japan-address-format": {
    zh: ["日本地址格式", "日本地址顺序", "日本邮编", "都道府县地址"],
    en: ["japan address format", "japanese address order", "japan postal code", "prefecture address"],
    ja: ["日本住所形式", "日本住所順序", "日本郵便番号", "都道府県住所"]
  },
  "zip-vs-postal-code": {
    zh: ["ZIP Code 和 Postal Code 区别", "邮编和邮政编码", "美国 ZIP", "英国 postcode"],
    en: ["zip code vs postal code", "difference between zip code and postal code", "us zip code", "uk postcode"],
    ja: ["ZIP Code と Postal Code の違い", "郵便番号の違い", "US ZIP Code", "UK postcode"]
  },
  "why-real-address-data": {
    zh: ["真实地址数据", "真实地址格式", "地址测试数据", "表单验证地址"],
    en: ["real address data", "real address format", "address testing data", "form validation address"],
    ja: ["実在住所データ", "実在住所形式", "住所テストデータ", "フォーム検証住所"]
  },
  "us-tax-free-states-intro": {
    zh: ["美国免税州", "免税州地址", "俄勒冈 特拉华 新罕布什尔", "美国免税州地址生成器"],
    en: ["us tax free states", "tax free state address", "oregon delaware new hampshire", "us tax free address generator"],
    ja: ["米国免税州", "免税州住所", "oregon delaware new hampshire", "免税州住所生成"]
  },
  "uk-address-format-guide": {
    zh: ["英国地址格式", "英国 postcode", "英国 post town", "英国地址怎么写"],
    en: ["uk address format", "uk postcode", "post town", "how to write a uk address"],
    ja: ["英国住所形式", "英国 postcode", "post town", "英国住所の書き方"]
  },
  "canada-address-format-guide": {
    zh: ["加拿大地址格式", "加拿大 postal code", "加拿大省缩写", "加拿大地址怎么写"],
    en: ["canada address format", "canada postal code", "canada province abbreviation", "how to write a canada address"],
    ja: ["カナダ住所形式", "カナダ postal code", "州略称", "カナダ住所の書き方"]
  },
  "india-address-format-guide": {
    zh: ["印度地址格式", "印度 PIN Code", "印度 locality", "印度地址怎么写"],
    en: ["india address format", "india pin code", "india locality", "how to write an india address"],
    ja: ["インド住所形式", "インド PIN Code", "locality", "インド住所の書き方"]
  }
};

const directoryKeywords: Record<"countries" | "blog" | "formats", LocalizedKeywords> = {
  countries: {
    zh: ["国家地址生成器", "多国家地址生成器", "地址生成国家列表", "真实地址工具目录"],
    en: ["country address generator", "multi country address generator", "address generator directory", "real address tool directory"],
    ja: ["国別住所生成", "複数国住所ジェネレーター", "住所生成ディレクトリ", "住所ツール一覧"]
  },
  blog: {
    zh: ["地址生成博客", "地址格式文章", "邮编指南", "地址工具文章"],
    en: ["address generator blog", "address format articles", "postal code guide", "address tool articles"],
    ja: ["住所生成ブログ", "住所形式記事", "郵便番号ガイド", "住所ツール記事"]
  },
  formats: {
    zh: ["地址格式大全", "国家地址格式", "邮编格式指南", "表单地址格式"],
    en: ["address format guide", "country address format", "postal code format guide", "form address format"],
    ja: ["住所形式ガイド", "国別住所形式", "郵便番号形式ガイド", "フォーム住所形式"]
  }
};

const legalKeywords: Record<InfoPageKey, LocalizedKeywords> = {
  about: {
    zh: ["关于我们", "网站说明", "地址生成器网站", "US Address Tool 关于"],
    en: ["about us", "site overview", "address generator site", "US Address Tool about"],
    ja: ["このサイトについて", "サイト概要", "住所生成サイト", "US Address Tool について"]
  },
  privacy: {
    zh: ["隐私政策", "地址工具隐私", "浏览器存储", "分享链接隐私"],
    en: ["privacy policy", "address tool privacy", "browser storage policy", "share link privacy"],
    ja: ["プライバシーポリシー", "住所ツールのプライバシー", "ブラウザ保存", "共有リンクのプライバシー"]
  },
  terms: {
    zh: ["使用条款", "地址生成器条款", "网站使用规则", "数据免责声明"],
    en: ["terms of use", "address generator terms", "site usage rules", "data disclaimer"],
    ja: ["利用規約", "住所生成ツール規約", "サイト利用ルール", "データ免責"]
  },
  cookies: {
    zh: ["Cookie 政策", "浏览器存储政策", "本地存储", "网站 Cookie"],
    en: ["cookie policy", "browser storage policy", "local storage", "site cookies"],
    ja: ["Cookie ポリシー", "ブラウザ保存ポリシー", "ローカルストレージ", "サイト Cookie"]
  }
};

const taxFreeKeywords: LocalizedKeywords = {
  zh: ["美国免税州地址生成器", "美国免税州地址", "免税州真实地址", "阿拉斯加 特拉华 俄勒冈", "免税州地址工具"],
  en: ["us tax free state address generator", "us tax free address", "real tax free state address", "alaska delaware oregon", "tax free state address tool"],
  ja: ["米国免税州住所生成", "米国免税州住所", "実在免税州住所", "alaska delaware oregon", "免税州住所ツール"]
};

const errorKeywords: Record<403 | 404 | 500 | 503, LocalizedKeywords> = {
  403: {
    zh: ["403 错误", "页面无法访问", "访问受限", "网站错误页"],
    en: ["403 error", "page access denied", "restricted page", "site error page"],
    ja: ["403 エラー", "ページにアクセスできません", "アクセス制限", "サイトエラーページ"]
  },
  404: {
    zh: ["404 错误", "页面不存在", "找不到页面", "网站错误页"],
    en: ["404 error", "page not found", "missing page", "site error page"],
    ja: ["404 エラー", "ページが見つかりません", "存在しないページ", "サイトエラーページ"]
  },
  500: {
    zh: ["500 错误", "服务器错误", "临时服务错误", "网站错误页"],
    en: ["500 error", "server error", "temporary server error", "site error page"],
    ja: ["500 エラー", "サーバーエラー", "一時的なサーバーエラー", "サイトエラーページ"]
  },
  503: {
    zh: ["503 错误", "服务不可用", "临时不可用", "网站错误页"],
    en: ["503 error", "service unavailable", "temporarily unavailable", "site error page"],
    ja: ["503 エラー", "サービス利用不可", "一時的に利用不可", "サイトエラーページ"]
  }
};

function normalizeKeyword(keyword: string) {
  return keyword.trim().toLowerCase().replace(/\s+/g, " ");
}

function uniqueKeywords(locale: Locale, keywords: string[]) {
  const blocked = new Set(blockedStandaloneKeywords[locale].map(normalizeKeyword));
  const seen = new Set<string>();

  return Array.from(
    keywords
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((item) => {
        const normalized = normalizeKeyword(item);

        if (blocked.has(normalized) || seen.has(normalized)) {
          return false;
        }

        seen.add(normalized);
        return true;
      })
  ).slice(0, maxKeywordCount[locale]);
}

export function getCountryKeywords(locale: Locale, country: CountryRecord) {
  return uniqueKeywords(locale, [
    country.heading[locale],
    ...countryGeneratorKeywords[country.slug][locale],
    ...brandKeywords[locale]
  ]);
}

export function getFormatKeywords(locale: Locale, country: CountryRecord) {
  const formatTitle = {
    zh: `${country.name.zh}地址格式`,
    en: `${country.name.en} address format`,
    ja: `${country.name.ja}住所形式`
  }[locale];

  return uniqueKeywords(locale, [
    formatTitle,
    ...countryFormatKeywords[country.slug][locale],
    ...brandKeywords[locale]
  ]);
}

export function getBlogKeywords(locale: Locale, post: BlogPost) {
  return uniqueKeywords(locale, [
    post.title[locale],
    ...blogKeywordsBySlug[post.slug][locale],
    ...brandKeywords[locale]
  ]);
}

export function getDirectoryKeywords(
  locale: Locale,
  kind: "countries" | "blog" | "formats"
) {
  return uniqueKeywords(locale, [
    ...directoryKeywords[kind][locale],
    ...brandKeywords[locale]
  ]);
}

export function getLegalKeywords(locale: Locale, pageKey: InfoPageKey) {
  return uniqueKeywords(locale, [
    ...legalKeywords[pageKey][locale],
    siteConfig.name,
    siteConfig.domain
  ]);
}

export function getTaxFreeKeywords(locale: Locale) {
  return uniqueKeywords(locale, [...taxFreeKeywords[locale], ...brandKeywords[locale]]);
}

export function getErrorKeywords(locale: Locale, statusCode: 403 | 404 | 500 | 503) {
  return uniqueKeywords(locale, [
    ...errorKeywords[statusCode][locale],
    siteConfig.name,
    siteConfig.domain
  ]);
}
