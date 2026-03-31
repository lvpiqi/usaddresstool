export const locales = ["zh", "en", "ja"] as const;

export type Locale = (typeof locales)[number];
export type InfoPageKey = "about" | "privacy" | "terms" | "cookies";
export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export const primaryCountrySlug = "us";

export const localeMeta: Record<
  Locale,
  { label: string; htmlLang: string; basePath: string }
> = {
  zh: { label: "中文", htmlLang: "zh-CN", basePath: "" },
  en: { label: "English", htmlLang: "en", basePath: "/en" },
  ja: { label: "日本語", htmlLang: "ja", basePath: "/ja" }
};

export const siteConfig = {
  name: "US Address Tool",
  shortName: "US Address Tool",
  domain: "usaddresstool.com",
  description:
    "US Address Tool is a multilingual address generator for testing, QA, form validation, demos, and address-format research."
};

export const ui = {
  zh: {
    metaTitleSuffix: "US Address Tool",
    nav: {
      home: "首页",
      countries: "国家地址",
      blog: "博客",
      formats: "地址格式",
      about: "关于",
      privacy: "隐私政策",
      terms: "使用条款"
    },
    common: {
      homeLabel: "首页",
      readMore: "查看详情",
      relatedPosts: "相关文章",
      countryFormats: "国家地址格式",
      breadcrumbsHome: "首页",
      updatedAt: "更新时间",
      openMap: "打开地图"
    },
    heroBadges: ["真实格式", "地区筛选", "复制、分享、保存"],
    generator: {
      title: "地址生成工具",
      description:
        "按国家和地区生成结构化地址结果，适合 QA、表单验证、演示和地址格式研究。",
      regionLabel: "地区筛选",
      regionAll: "随机全部地区",
      generate: "生成地址",
      load: "恢复结果",
      copy: "复制",
      copyAll: "复制完整地址",
      save: "保存",
      remove: "删除",
      share: "分享",
      shared: "分享链接已复制",
      savedTitle: "已保存的地址",
      savedAt: "保存时间",
      resultTitle: "生成结果",
      map: "地图链接",
      statusCopied: "已复制到剪贴板",
      statusSaved: "地址已保存",
      statusRemoved: "地址已删除",
      statusGenerated: "已生成新的地址",
      statusShared: "分享操作已完成",
      statusLoaded: "已恢复分享结果",
      statusLoading: "正在生成地址...",
      statusFailed: "暂时无法生成地址，请稍后再试。",
      genderLabels: {
        male: "男",
        female: "女"
      },
      fieldLabels: {
        lastName: "姓",
        firstName: "名",
        gender: "性别",
        phone: "电话",
        email: "邮箱",
        street: "街道",
        city: "城市",
        stateFullName: "州 / 地区",
        postalCode: "邮编",
        fullAddress: "完整地址"
      }
    },
    sections: {
      toolHighlights: "工具亮点",
      formatGuide: "地址格式说明",
      regionGuide: "地区说明",
      useCases: "适用场景",
      faq: "常见问题",
      sampleAddress: "地址示例",
      countriesDirectory: "国家目录",
      latestPosts: "最新文章"
    },
    cards: {
      copy: {
        title: "字段级复制",
        body: "姓名、电话、邮编和完整地址都可以单独复制。"
      },
      share: {
        title: "可分享结果",
        body: "分享链接会保留当前国家、地区和 seed，方便恢复同一条结果。"
      },
      save: {
        title: "本地保存",
        body: "保存结果写入浏览器本地存储，不需要登录。"
      }
    },
    footer: {
      compliance:
        "本站内容仅用于测试、QA、演示和地址格式研究，不用于冒充、欺诈或绕过平台规则。",
      attribution:
        "正式业务请接入你自己的地址校验、风控和合规流程。"
    },
    directory: {
      countriesDescription:
        "浏览各国家地址生成页面，对比不同国家的地区筛选、邮编写法和地址顺序。",
      blogDescription:
        "阅读与地址生成、邮编字段、地址格式和多国家表单相关的实践文章。",
      formatDescription:
        "查看每个国家常见的地址顺序、邮编格式和填写提示。"
    }
  },
  en: {
    metaTitleSuffix: "US Address Tool",
    nav: {
      home: "Home",
      countries: "Countries",
      blog: "Blog",
      formats: "Formats",
      about: "About",
      privacy: "Privacy",
      terms: "Terms"
    },
    common: {
      homeLabel: "Home",
      readMore: "Read more",
      relatedPosts: "Related posts",
      countryFormats: "Country format guides",
      breadcrumbsHome: "Home",
      updatedAt: "Updated",
      openMap: "Open map"
    },
    heroBadges: ["Real-format output", "Region filtering", "Copy, share, save"],
    generator: {
      title: "Address Generator",
      description:
        "Generate structured address results by country and region for QA, form testing, demos, and address-format research.",
      regionLabel: "Region filter",
      regionAll: "Random all regions",
      generate: "Generate address",
      load: "Load result",
      copy: "Copy",
      copyAll: "Copy full address",
      save: "Save",
      remove: "Remove",
      share: "Share",
      shared: "Share link copied",
      savedTitle: "Saved addresses",
      savedAt: "Saved",
      resultTitle: "Generated result",
      map: "Map link",
      statusCopied: "Copied to clipboard",
      statusSaved: "Address saved",
      statusRemoved: "Address removed",
      statusGenerated: "Generated a new address",
      statusShared: "Share action completed",
      statusLoaded: "Restored a shared result",
      statusLoading: "Generating address...",
      statusFailed: "Unable to generate an address right now.",
      genderLabels: {
        male: "Male",
        female: "Female"
      },
      fieldLabels: {
        lastName: "Last name",
        firstName: "First name",
        gender: "Gender",
        phone: "Phone",
        email: "Email",
        street: "Street",
        city: "City",
        stateFullName: "State / region",
        postalCode: "Postal code",
        fullAddress: "Full address"
      }
    },
    sections: {
      toolHighlights: "Tool highlights",
      formatGuide: "Address format notes",
      regionGuide: "Region coverage",
      useCases: "Best-fit use cases",
      faq: "Frequently asked questions",
      sampleAddress: "Example address",
      countriesDirectory: "Country directory",
      latestPosts: "Latest posts"
    },
    cards: {
      copy: {
        title: "Field-level copy",
        body: "Name, phone, postal code, and the full address can be copied separately."
      },
      share: {
        title: "Shareable result",
        body: "Share links keep the current country, region, and seed so the same result can be restored."
      },
      save: {
        title: "Local save",
        body: "Saved addresses stay in browser storage, which keeps the tool fast and account-free."
      }
    },
    footer: {
      compliance:
        "This project is for testing, QA, demos, and address-format education, not impersonation, fraud, or platform circumvention.",
      attribution:
        "For production use, maintain your own validation, risk, and compliance layer."
    },
    directory: {
      countriesDescription:
        "Browse country generator pages and compare regional filters, postal-code formats, and address order.",
      blogDescription:
        "Read practical articles about address generation, postal fields, formatting rules, and multi-country form flows.",
      formatDescription:
        "Review the common address order, postal-code format, and input tips for each country."
    }
  },
  ja: {
    metaTitleSuffix: "US Address Tool",
    nav: {
      home: "ホーム",
      countries: "国別住所",
      blog: "ブログ",
      formats: "住所形式",
      about: "概要",
      privacy: "プライバシー",
      terms: "利用規約"
    },
    common: {
      homeLabel: "ホーム",
      readMore: "詳しく見る",
      relatedPosts: "関連記事",
      countryFormats: "国別住所形式",
      breadcrumbsHome: "ホーム",
      updatedAt: "更新日",
      openMap: "地図を開く"
    },
    heroBadges: ["実用的な形式", "地域フィルター", "コピー・共有・保存"],
    generator: {
      title: "住所ジェネレーター",
      description:
        "国と地域を選んで、QA、フォーム検証、デモ、住所形式の確認に使える住所結果を生成できます。",
      regionLabel: "地域フィルター",
      regionAll: "すべての地域からランダム",
      generate: "住所を生成",
      load: "結果を読み込む",
      copy: "コピー",
      copyAll: "完全な住所をコピー",
      save: "保存",
      remove: "削除",
      share: "共有",
      shared: "共有リンクをコピーしました",
      savedTitle: "保存した住所",
      savedAt: "保存日時",
      resultTitle: "生成結果",
      map: "地図リンク",
      statusCopied: "クリップボードにコピーしました",
      statusSaved: "住所を保存しました",
      statusRemoved: "住所を削除しました",
      statusGenerated: "新しい住所を生成しました",
      statusShared: "共有が完了しました",
      statusLoaded: "共有結果を復元しました",
      statusLoading: "住所を生成しています...",
      statusFailed: "現在は住所を生成できません。",
      genderLabels: {
        male: "男性",
        female: "女性"
      },
      fieldLabels: {
        lastName: "姓",
        firstName: "名",
        gender: "性別",
        phone: "電話",
        email: "メール",
        street: "通り・番地",
        city: "市区町村",
        stateFullName: "州 / 地域",
        postalCode: "郵便番号",
        fullAddress: "完全な住所"
      }
    },
    sections: {
      toolHighlights: "ツールの特徴",
      formatGuide: "住所形式メモ",
      regionGuide: "地域カバレッジ",
      useCases: "向いている使い方",
      faq: "よくある質問",
      sampleAddress: "住所例",
      countriesDirectory: "国別ディレクトリ",
      latestPosts: "最新記事"
    },
    cards: {
      copy: {
        title: "項目ごとにコピー",
        body: "氏名、電話、郵便番号、完全な住所を個別にコピーできます。"
      },
      share: {
        title: "共有しやすい結果",
        body: "共有リンクには国、地域、seed が入り、同じ結果を再表示できます。"
      },
      save: {
        title: "ローカル保存",
        body: "保存した住所はブラウザに残るので、アカウントなしでも使えます。"
      }
    },
    footer: {
      compliance:
        "このサイトはテスト、QA、デモ、住所形式の確認向けであり、なりすまし、不正利用、規約回避を目的とするものではありません。",
      attribution:
        "本番利用では独自の検証、リスク管理、コンプライアンス手順を追加してください。"
    },
    directory: {
      countriesDescription:
        "国別ページを見比べながら、地域フィルター、郵便番号形式、住所順序の違いを確認できます。",
      blogDescription:
        "住所生成、郵便番号項目、住所形式、複数国フォームに関する実践記事をまとめています。",
      formatDescription:
        "各国で一般的な住所順序、郵便番号形式、入力時の注意点を確認できます。"
    }
  }
} as const;

export function withTrailingSlash(path: string) {
  if (!path.startsWith("/")) {
    return withTrailingSlash(`/${path}`);
  }

  return path.endsWith("/") ? path : `${path}/`;
}

export function localizePath(locale: Locale, path: string) {
  const normalized = withTrailingSlash(path);

  if (locale === "zh") {
    return normalized;
  }

  if (normalized === "/") {
    return `${localeMeta[locale].basePath}/`;
  }

  return `${localeMeta[locale].basePath}${normalized}`;
}

export function getHomePath(locale: Locale) {
  return localizePath(locale, "/");
}

export function getCountriesPath(locale: Locale) {
  return localizePath(locale, "/countries/");
}

export function getBlogIndexPath(locale: Locale) {
  return localizePath(locale, "/blog/");
}

export function getBlogPath(locale: Locale, slug: string) {
  return localizePath(locale, `/blog/${slug}/`);
}

export function getFormatIndexPath(locale: Locale) {
  return localizePath(locale, "/address-format/");
}

export function getFormatPath(locale: Locale, countrySlug: string) {
  return localizePath(locale, `/address-format/${countrySlug}/`);
}

export function getInfoPath(locale: Locale, page: InfoPageKey) {
  return localizePath(locale, `/${page}/`);
}

export function getCountryPath(locale: Locale, countrySlug: string) {
  if (countrySlug === primaryCountrySlug) {
    return getHomePath(locale);
  }

  return localizePath(locale, `/${countrySlug}-address-generator/`);
}

export function getTaxFreePath(locale: Locale) {
  return localizePath(locale, "/tax-free-address/");
}

export function alternateLocaleLinks(pathByLocale: Record<Locale, string>) {
  return [
    ...locales.map((locale) => ({
      hreflang: localeMeta[locale].htmlLang,
      href: pathByLocale[locale]
    })),
    {
      hreflang: "x-default",
      href: pathByLocale.zh
    }
  ];
}
