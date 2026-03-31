import type { Locale, LocalizedList, LocalizedText } from "./site";

export interface RegionRecord {
  code: string;
  name: LocalizedText;
}

export interface AddressRecord {
  id: string;
  regionCode: string;
  venue: LocalizedText;
  recipient: LocalizedText;
  street: string;
  district?: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  fullAddress: LocalizedText;
  latitude: number;
  longitude: number;
}

export interface FaqRecord {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface CountryRecord {
  code: string;
  slug: string;
  name: LocalizedText;
  directoryExcerpt: LocalizedText;
  heading: LocalizedText;
  metaDescription: LocalizedText;
  heroIntro: LocalizedText;
  toolSummary: LocalizedText;
  regionLabel: LocalizedText;
  formatRules: LocalizedList;
  regionNotes: LocalizedList;
  useCases: LocalizedList;
  sampleAddress: LocalizedList;
  faq: FaqRecord[];
  stats: {
    label: LocalizedText;
    value: string;
    description: LocalizedText;
  }[];
  regions: RegionRecord[];
  addresses: AddressRecord[];
  relatedPosts: string[];
}

const genericFaq = (country: LocalizedText, regionLabel: LocalizedText): FaqRecord[] => [
  {
    question: {
      zh: `${country.zh}页面生成的地址能保证可投递吗？`,
      en: `Are the ${country.en} addresses guaranteed to be deliverable?`,
      ja: `${country.ja}ページの住所は必ず配達可能ですか。`
    },
    answer: {
      zh: "不能。这个项目更适合测试、演示、表单验证和地址格式学习。生产环境应使用你自己的已校验地址库。",
      en: "No. This project is best for testing, demos, form validation, and learning address formats. Use your own validated dataset for production workflows.",
      ja: "いいえ。テスト、デモ、フォーム検証、住所形式の学習向けです。本番用途では検証済みの自前データセットを使ってください。"
    }
  },
  {
    question: {
      zh: `可以固定${regionLabel.zh}来生成吗？`,
      en: `Can I lock the generator to a specific ${regionLabel.en.toLowerCase()}?`,
      ja: `${regionLabel.ja}を固定して生成できますか。`
    },
    answer: {
      zh: "可以。先在工具顶部选择州/省/地区，然后点击生成，系统只会从对应地区的数据池中随机抽取。",
      en: "Yes. Pick a state, province, or region first, then generate. The tool will only choose from the filtered dataset.",
      ja: "できます。先に州・省・地域を選んでから生成すると、その地域のデータだけが使われます。"
    }
  },
  {
    question: {
      zh: "保存和分享是怎么实现的？",
      en: "How do save and share work?",
      ja: "保存と共有はどう動きますか。"
    },
    answer: {
      zh: "保存使用浏览器本地存储，分享则把当前国家、筛选条件和 seed 参数写进链接，方便恢复同一条结果，适合无账号工具站的第一版上线。",
      en: "Saved items use browser storage. Share links keep the current country, filter, and seed parameter in the URL so the same result can be restored without accounts.",
      ja: "保存はブラウザのローカルストレージを使い、共有リンクには国・フィルター・seed パラメータを保持します。同じ結果を復元しやすく、アカウント不要の初期版に向いています。"
    }
  }
];

export const countries: CountryRecord[] = [
  {
    code: "US",
    slug: "us",
    name: { zh: "美国", en: "United States", ja: "アメリカ" },
    directoryExcerpt: {
      zh: "默认首页国家，适合做主词页，重点覆盖州筛选、ZIP Code 和示例格式。",
      en: "Primary home-page country targeting the main keyword cluster around states, ZIP codes, and example formats.",
      ja: "トップページ向けの主要国ページ。州フィルター、ZIP Code、記入例を中心に狙えます。"
    },
    heading: { zh: "美国地址生成器", en: "US Address Generator", ja: "アメリカ住所ジェネレーター" },
    metaDescription: {
      zh: "生成支持州筛选、复制、分享、保存的美国真实格式地址，适合测试、表单验证和演示。",
      en: "Generate US addresses with state filtering, copy, share, and save support for testing, demos, and form validation.",
      ja: "州フィルター、コピー、共有、保存に対応したアメリカ住所を生成。テストやフォーム検証に最適です。"
    },
    heroIntro: {
      zh: "首页直接承接 US address generator 主词，工具区支持按州筛选并生成真实格式的美国地址。",
      en: "The home page targets the core US address generator keyword and lets visitors filter by state before generating a real-world formatted address.",
      ja: "ホームページで US address generator の主キーワードを狙い、州を選んで実在形式の住所を生成できます。"
    },
    toolSummary: {
      zh: "美国页最适合作为首页，因为搜索意图明确，而且“州筛选 + ZIP Code + 地址格式说明”天然适合做 SEO。",
      en: "The US page works especially well as the home page because the intent is clear and the mix of state filters, ZIP codes, and format notes is naturally SEO-friendly.",
      ja: "アメリカページは検索意図が明確で、州フィルターと ZIP Code、住所形式ガイドを組み合わせやすいため、トップページに向いています。"
    },
    regionLabel: { zh: "州", en: "State", ja: "州" },
    formatRules: {
      zh: [
        "标准顺序通常是门牌号 + 街道名 + 城市 + 州缩写 + ZIP Code。",
        "电商和表单场景中，州缩写通常使用两位大写代码，例如 CA、NY、TX。",
        "邮编多数为 5 位数字，也可能扩展成 ZIP+4。"
      ],
      en: [
        "The common order is house number plus street, city, state abbreviation, and ZIP code.",
        "In most ecommerce and form flows, the state is entered as a two-letter uppercase code such as CA, NY, or TX.",
        "Postal codes are typically 5-digit ZIP codes, with an optional ZIP+4 extension."
      ],
      ja: [
        "一般的な順序は番地・通り、市区、州略称、ZIP Code です。",
        "EC やフォームでは州は CA、NY、TX のような 2 文字略称で入力されることが多いです。",
        "郵便番号は通常 5 桁の ZIP Code で、ZIP+4 が付く場合もあります。"
      ]
    },
    regionNotes: {
      zh: [
        "首页现在使用 50 州本地地址池，用户可以直接按州筛选真实格式地址。",
        "每个州都应该准备多条可轮换的公共地点地址，避免连续生成时总是重复同一条。",
        "如果你继续扩容数据，建议仍然按州拆分索引，方便缓存、过滤和后续增量更新。"
      ],
      en: [
        "The home page now uses a local 50-state address pool so visitors can filter directly by state.",
        "Each state should include multiple rotating public-place seeds so repeated generation does not return the same result.",
        "As the dataset grows, keep the index split by state to preserve fast filtering, caching, and incremental updates."
      ],
      ja: [
        "トップページは現在、50 州のローカル住所プールを使い、州ごとの絞り込みに対応しています。",
        "同じ州を続けて生成しても結果が固定されにくいよう、各州に複数の公共地点シードを持たせるのが重要です。",
        "今後さらに拡張する場合も、州単位でインデックスを分けると高速で管理しやすくなります。"
      ]
    },
    useCases: {
      zh: ["结账页和地址表单验证", "CRM、ERP、工单系统的演示数据", "跨语言界面中的地址字段排版测试"],
      en: ["Checkout forms and address validation UI", "Demo records inside CRM, ERP, and support tools", "Multilingual layout testing for address fields"],
      ja: ["チェックアウトや住所フォームの検証", "CRM、ERP、サポート画面のデモデータ", "多言語 UI における住所フィールドのレイアウト確認"]
    },
    sampleAddress: {
      zh: ["Apple Park Visitor Center", "10600 N Tantau Ave", "Cupertino, CA 95014", "United States"],
      en: ["Apple Park Visitor Center", "10600 N Tantau Ave", "Cupertino, CA 95014", "United States"],
      ja: ["Apple Park Visitor Center", "10600 N Tantau Ave", "Cupertino, CA 95014", "United States"]
    },
    faq: genericFaq({ zh: "美国", en: "US", ja: "アメリカ" }, { zh: "州", en: "State", ja: "州" }),
    stats: [
      {
        label: { zh: "覆盖州数", en: "Regions covered", ja: "収録地域数" },
        value: "50",
        description: {
          zh: "当前首页已接入美国 50 州本地地址池，并内置 220 条可轮换的真实公共地点地址种子。",
          en: "The US home page now ships with a local 50-state pool and 220 rotating real public-place address seeds.",
          ja: "現在の米国トップページは 50 州のローカル住所プールと、220 件の実在公共地点シードを収録しています。"
        }
      },
      {
        label: { zh: "输出模式", en: "Output mode", ja: "出力方式" },
        value: "Structured",
        description: {
          zh: "工具输出结构化字段和完整地址，便于复制和导出。",
          en: "The generator returns both structured fields and a fully formatted address.",
          ja: "構造化フィールドと完全な住所文字列を同時に返します。"
        }
      },
      {
        label: { zh: "适合关键词", en: "Keyword angle", ja: "狙えるキーワード" },
        value: "US / ZIP",
        description: {
          zh: "首页适合承接 us address generator、zip code example 等主词和长尾词。",
          en: "The home page can target core terms like US address generator and long-tail ZIP code queries.",
          ja: "US address generator や ZIP Code 系の主語句とロングテールを拾いやすいです。"
        }
      }
    ],
    regions: [
      { code: "CA", name: { zh: "加利福尼亚州", en: "California", ja: "カリフォルニア州" } },
      { code: "NY", name: { zh: "纽约州", en: "New York", ja: "ニューヨーク州" } },
      { code: "TX", name: { zh: "得克萨斯州", en: "Texas", ja: "テキサス州" } },
      { code: "WA", name: { zh: "华盛顿州", en: "Washington", ja: "ワシントン州" } },
      { code: "FL", name: { zh: "佛罗里达州", en: "Florida", ja: "フロリダ州" } }
    ],
    addresses: [
      {
        id: "us-ca-apple-park",
        regionCode: "CA",
        venue: { zh: "Apple Park Visitor Center", en: "Apple Park Visitor Center", ja: "Apple Park Visitor Center" },
        recipient: { zh: "测试收件人", en: "Test Receiver", ja: "テスト受取人" },
        street: "10600 N Tantau Ave",
        city: "Cupertino",
        postalCode: "95014",
        phone: "+1 408-961-1560",
        email: "qa.us.ca@example.dev",
        fullAddress: {
          zh: "Apple Park Visitor Center, 10600 N Tantau Ave, Cupertino, CA 95014, USA",
          en: "Apple Park Visitor Center, 10600 N Tantau Ave, Cupertino, CA 95014, USA",
          ja: "Apple Park Visitor Center, 10600 N Tantau Ave, Cupertino, CA 95014, USA"
        },
        latitude: 37.3349,
        longitude: -122.009
      },
      {
        id: "us-ca-ferry",
        regionCode: "CA",
        venue: { zh: "Ferry Building", en: "Ferry Building", ja: "Ferry Building" },
        recipient: { zh: "产品演示", en: "Product Demo", ja: "製品デモ" },
        street: "1 Ferry Building",
        city: "San Francisco",
        postalCode: "94111",
        phone: "+1 415-983-8000",
        email: "qa.us.sf@example.dev",
        fullAddress: {
          zh: "Ferry Building, 1 Ferry Building, San Francisco, CA 94111, USA",
          en: "Ferry Building, 1 Ferry Building, San Francisco, CA 94111, USA",
          ja: "Ferry Building, 1 Ferry Building, San Francisco, CA 94111, USA"
        },
        latitude: 37.7955,
        longitude: -122.3937
      },
      {
        id: "us-ca-getty",
        regionCode: "CA",
        venue: { zh: "Getty Center", en: "Getty Center", ja: "Getty Center" },
        recipient: { zh: "Product Demo", en: "Product Demo", ja: "Product Demo" },
        street: "1200 Getty Center Dr",
        city: "Los Angeles",
        postalCode: "90049",
        phone: "+1 310-555-0148",
        email: "demo.us.ca.getty@example.dev",
        fullAddress: {
          zh: "Getty Center, 1200 Getty Center Dr, Los Angeles, CA 90049, USA",
          en: "Getty Center, 1200 Getty Center Dr, Los Angeles, CA 90049, USA",
          ja: "Getty Center, 1200 Getty Center Dr, Los Angeles, CA 90049, USA"
        },
        latitude: 34.078,
        longitude: -118.4741
      },
      {
        id: "us-ca-griffith",
        regionCode: "CA",
        venue: { zh: "Griffith Observatory", en: "Griffith Observatory", ja: "Griffith Observatory" },
        recipient: { zh: "Test Receiver", en: "Test Receiver", ja: "Test Receiver" },
        street: "2800 E Observatory Rd",
        city: "Los Angeles",
        postalCode: "90027",
        phone: "+1 213-555-0116",
        email: "test.us.ca.griffith@example.dev",
        fullAddress: {
          zh: "Griffith Observatory, 2800 E Observatory Rd, Los Angeles, CA 90027, USA",
          en: "Griffith Observatory, 2800 E Observatory Rd, Los Angeles, CA 90027, USA",
          ja: "Griffith Observatory, 2800 E Observatory Rd, Los Angeles, CA 90027, USA"
        },
        latitude: 34.1184,
        longitude: -118.3004
      },
      {
        id: "us-ny-empire",
        regionCode: "NY",
        venue: { zh: "Empire State Building", en: "Empire State Building", ja: "Empire State Building" },
        recipient: { zh: "测试收件人", en: "Test Receiver", ja: "テスト受取人" },
        street: "350 5th Ave",
        city: "New York",
        postalCode: "10118",
        phone: "+1 212-736-3100",
        email: "qa.us.ny@example.dev",
        fullAddress: {
          zh: "Empire State Building, 350 5th Ave, New York, NY 10118, USA",
          en: "Empire State Building, 350 5th Ave, New York, NY 10118, USA",
          ja: "Empire State Building, 350 5th Ave, New York, NY 10118, USA"
        },
        latitude: 40.7484,
        longitude: -73.9857
      },
      {
        id: "us-ny-grand-central",
        regionCode: "NY",
        venue: { zh: "Grand Central Terminal", en: "Grand Central Terminal", ja: "Grand Central Terminal" },
        recipient: { zh: "Business Test", en: "Business Test", ja: "Business Test" },
        street: "89 E 42nd St",
        city: "New York",
        postalCode: "10017",
        phone: "+1 212-555-0160",
        email: "ops.us.ny.gct@example.dev",
        fullAddress: {
          zh: "Grand Central Terminal, 89 E 42nd St, New York, NY 10017, USA",
          en: "Grand Central Terminal, 89 E 42nd St, New York, NY 10017, USA",
          ja: "Grand Central Terminal, 89 E 42nd St, New York, NY 10017, USA"
        },
        latitude: 40.7527,
        longitude: -73.9772
      },
      {
        id: "us-ny-moma",
        regionCode: "NY",
        venue: { zh: "Museum of Modern Art", en: "Museum of Modern Art", ja: "Museum of Modern Art" },
        recipient: { zh: "Product Demo", en: "Product Demo", ja: "Product Demo" },
        street: "11 W 53rd St",
        city: "New York",
        postalCode: "10019",
        phone: "+1 212-555-0171",
        email: "demo.us.ny.moma@example.dev",
        fullAddress: {
          zh: "Museum of Modern Art, 11 W 53rd St, New York, NY 10019, USA",
          en: "Museum of Modern Art, 11 W 53rd St, New York, NY 10019, USA",
          ja: "Museum of Modern Art, 11 W 53rd St, New York, NY 10019, USA"
        },
        latitude: 40.7614,
        longitude: -73.9776
      },
      {
        id: "us-tx-alamo",
        regionCode: "TX",
        venue: { zh: "The Alamo", en: "The Alamo", ja: "The Alamo" },
        recipient: { zh: "订单演示", en: "Order Demo", ja: "注文デモ" },
        street: "300 Alamo Plaza",
        city: "San Antonio",
        postalCode: "78205",
        phone: "+1 210-225-1391",
        email: "orders.us.tx@example.dev",
        fullAddress: {
          zh: "The Alamo, 300 Alamo Plaza, San Antonio, TX 78205, USA",
          en: "The Alamo, 300 Alamo Plaza, San Antonio, TX 78205, USA",
          ja: "The Alamo, 300 Alamo Plaza, San Antonio, TX 78205, USA"
        },
        latitude: 29.4258,
        longitude: -98.4861
      },
      {
        id: "us-tx-capitol",
        regionCode: "TX",
        venue: { zh: "Texas State Capitol", en: "Texas State Capitol", ja: "Texas State Capitol" },
        recipient: { zh: "Business Test", en: "Business Test", ja: "Business Test" },
        street: "1100 Congress Ave",
        city: "Austin",
        postalCode: "78701",
        phone: "+1 512-555-0144",
        email: "ops.us.tx.capitol@example.dev",
        fullAddress: {
          zh: "Texas State Capitol, 1100 Congress Ave, Austin, TX 78701, USA",
          en: "Texas State Capitol, 1100 Congress Ave, Austin, TX 78701, USA",
          ja: "Texas State Capitol, 1100 Congress Ave, Austin, TX 78701, USA"
        },
        latitude: 30.2747,
        longitude: -97.7404
      },
      {
        id: "us-tx-perot",
        regionCode: "TX",
        venue: { zh: "Perot Museum of Nature and Science", en: "Perot Museum of Nature and Science", ja: "Perot Museum of Nature and Science" },
        recipient: { zh: "Product Demo", en: "Product Demo", ja: "Product Demo" },
        street: "2201 N Field St",
        city: "Dallas",
        postalCode: "75201",
        phone: "+1 214-555-0168",
        email: "demo.us.tx.perot@example.dev",
        fullAddress: {
          zh: "Perot Museum of Nature and Science, 2201 N Field St, Dallas, TX 75201, USA",
          en: "Perot Museum of Nature and Science, 2201 N Field St, Dallas, TX 75201, USA",
          ja: "Perot Museum of Nature and Science, 2201 N Field St, Dallas, TX 75201, USA"
        },
        latitude: 32.7869,
        longitude: -96.8065
      },
      {
        id: "us-wa-space-needle",
        regionCode: "WA",
        venue: { zh: "Space Needle", en: "Space Needle", ja: "Space Needle" },
        recipient: { zh: "本地化测试", en: "Localization Test", ja: "ローカライズテスト" },
        street: "400 Broad St",
        city: "Seattle",
        postalCode: "98109",
        phone: "+1 206-905-2100",
        email: "locale.us.wa@example.dev",
        fullAddress: {
          zh: "Space Needle, 400 Broad St, Seattle, WA 98109, USA",
          en: "Space Needle, 400 Broad St, Seattle, WA 98109, USA",
          ja: "Space Needle, 400 Broad St, Seattle, WA 98109, USA"
        },
        latitude: 47.6205,
        longitude: -122.3493
      },
      {
        id: "us-wa-pike-place",
        regionCode: "WA",
        venue: { zh: "Pike Place Market", en: "Pike Place Market", ja: "Pike Place Market" },
        recipient: { zh: "Order Demo", en: "Order Demo", ja: "Order Demo" },
        street: "85 Pike St",
        city: "Seattle",
        postalCode: "98101",
        phone: "+1 206-555-0142",
        email: "orders.us.wa.pike@example.dev",
        fullAddress: {
          zh: "Pike Place Market, 85 Pike St, Seattle, WA 98101, USA",
          en: "Pike Place Market, 85 Pike St, Seattle, WA 98101, USA",
          ja: "Pike Place Market, 85 Pike St, Seattle, WA 98101, USA"
        },
        latitude: 47.6097,
        longitude: -122.3425
      },
      {
        id: "us-wa-mopop",
        regionCode: "WA",
        venue: { zh: "Museum of Pop Culture", en: "Museum of Pop Culture", ja: "Museum of Pop Culture" },
        recipient: { zh: "Localization Test", en: "Localization Test", ja: "Localization Test" },
        street: "325 5th Ave N",
        city: "Seattle",
        postalCode: "98109",
        phone: "+1 206-555-0188",
        email: "locale.us.wa.mopop@example.dev",
        fullAddress: {
          zh: "Museum of Pop Culture, 325 5th Ave N, Seattle, WA 98109, USA",
          en: "Museum of Pop Culture, 325 5th Ave N, Seattle, WA 98109, USA",
          ja: "Museum of Pop Culture, 325 5th Ave N, Seattle, WA 98109, USA"
        },
        latitude: 47.6215,
        longitude: -122.3481
      },
      {
        id: "us-fl-frost",
        regionCode: "FL",
        venue: { zh: "Frost Museum of Science", en: "Frost Museum of Science", ja: "Frost Museum of Science" },
        recipient: { zh: "营销演示", en: "Marketing Demo", ja: "マーケデモ" },
        street: "1101 Biscayne Blvd",
        city: "Miami",
        postalCode: "33132",
        phone: "+1 305-434-9600",
        email: "demo.us.fl@example.dev",
        fullAddress: {
          zh: "Frost Museum of Science, 1101 Biscayne Blvd, Miami, FL 33132, USA",
          en: "Frost Museum of Science, 1101 Biscayne Blvd, Miami, FL 33132, USA",
          ja: "Frost Museum of Science, 1101 Biscayne Blvd, Miami, FL 33132, USA"
        },
        latitude: 25.7855,
        longitude: -80.187
      },
      {
        id: "us-fl-dali",
        regionCode: "FL",
        venue: { zh: "The Dali Museum", en: "The Dali Museum", ja: "The Dali Museum" },
        recipient: { zh: "Marketing Demo", en: "Marketing Demo", ja: "Marketing Demo" },
        street: "1 Dali Blvd",
        city: "St. Petersburg",
        postalCode: "33701",
        phone: "+1 727-555-0156",
        email: "demo.us.fl.dali@example.dev",
        fullAddress: {
          zh: "The Dali Museum, 1 Dali Blvd, St. Petersburg, FL 33701, USA",
          en: "The Dali Museum, 1 Dali Blvd, St. Petersburg, FL 33701, USA",
          ja: "The Dali Museum, 1 Dali Blvd, St. Petersburg, FL 33701, USA"
        },
        latitude: 27.7653,
        longitude: -82.6316
      },
      {
        id: "us-fl-vizcaya",
        regionCode: "FL",
        venue: { zh: "Vizcaya Museum and Gardens", en: "Vizcaya Museum and Gardens", ja: "Vizcaya Museum and Gardens" },
        recipient: { zh: "Test Receiver", en: "Test Receiver", ja: "Test Receiver" },
        street: "3251 S Miami Ave",
        city: "Miami",
        postalCode: "33129",
        phone: "+1 305-555-0184",
        email: "test.us.fl.vizcaya@example.dev",
        fullAddress: {
          zh: "Vizcaya Museum and Gardens, 3251 S Miami Ave, Miami, FL 33129, USA",
          en: "Vizcaya Museum and Gardens, 3251 S Miami Ave, Miami, FL 33129, USA",
          ja: "Vizcaya Museum and Gardens, 3251 S Miami Ave, Miami, FL 33129, USA"
        },
        latitude: 25.7445,
        longitude: -80.2109
      }
    ],
    relatedPosts: ["us-address-format", "zip-vs-postal-code", "build-address-generator"]
  },
  {
    code: "UK",
    slug: "uk",
    name: { zh: "英国", en: "United Kingdom", ja: "イギリス" },
    directoryExcerpt: {
      zh: "适合覆盖 postcode、London address 和 UK format 等关键词。",
      en: "Best for UK postcode, London address example, and format-related keyword clusters.",
      ja: "postcode、London address example、UK format 系のキーワードに向いています。"
    },
    heading: { zh: "英国地址生成器", en: "UK Address Generator", ja: "イギリス住所ジェネレーター" },
    metaDescription: {
      zh: "支持英国地区筛选、复制、分享和保存的 UK 地址生成器，适合测试和表单设计。",
      en: "Generate UK addresses with region filtering, copy, share, and save support for testing and form design.",
      ja: "地域フィルター、コピー、共有、保存に対応した UK 住所ジェネレーター。テストやフォーム設計に使えます。"
    },
    heroIntro: {
      zh: "英国页适合聚焦 postcode、London address example 和 county/region 的填写顺序。",
      en: "The UK page is a strong landing page for postcode-driven searches, London address examples, and county-or-region ordering questions.",
      ja: "postcode、London address example、county と region の並びに関する検索意図を拾いやすいページです。"
    },
    toolSummary: {
      zh: "英国地址格式和美国不同，postcode 位置和多行地址写法都值得单独讲清楚。",
      en: "UK address formatting differs meaningfully from the US, especially around postcode placement and multi-line formatting.",
      ja: "UK の住所形式は米国とかなり異なり、postcode の位置や複数行の書き方を個別に説明しやすいです。"
    },
    regionLabel: { zh: "地区", en: "Region", ja: "地域" },
    formatRules: {
      zh: [
        "英国地址通常是地点名/门牌号 + 街道 + 城市/镇 + Postcode + United Kingdom。",
        "Postcode 由字母和数字组合构成，空格位置很重要。",
        "很多页面会把 county 作为可选字段，而不是强制字段。"
      ],
      en: [
        "UK addresses usually follow venue or building, street, town or city, postcode, and United Kingdom.",
        "Postcodes mix letters and numbers, and the internal spacing matters.",
        "County is often optional in modern forms rather than a required field."
      ],
      ja: [
        "UK の住所は施設名または建物、通り、町または市、postcode、United Kingdom の順が一般的です。",
        "postcode は英字と数字の組み合わせで、途中のスペースが重要です。",
        "近年のフォームでは county は必須ではなく任意項目のことが多いです。"
      ]
    },
    regionNotes: {
      zh: [
        "London 的示例通常最容易被用户理解，适合作为首屏示例。",
        "England、Scotland、Wales、Northern Ireland 可作为一级筛选。",
        "如果后续扩展城市页，优先做 London、Manchester、Edinburgh。"
      ],
      en: [
        "London examples are the easiest for visitors to recognize and work well above the fold.",
        "England, Scotland, Wales, and Northern Ireland make good first-level filters.",
        "If you later expand into city pages, start with London, Manchester, and Edinburgh."
      ],
      ja: [
        "London の例は訪問者にとって最も分かりやすく、ファーストビューにも向いています。",
        "England、Scotland、Wales、Northern Ireland は一次フィルターとして使いやすいです。",
        "都市別ページを増やすなら London、Manchester、Edinburgh から始めるとよいです。"
      ]
    },
    useCases: {
      zh: ["需要 postcode 格式校验的表单", "英国结账页和订阅页的演示数据", "国际站地址输入组件的多国测试"],
      en: ["Forms that validate postcode structure", "Checkout and subscription demos for UK-focused flows", "Cross-country testing for international address components"],
      ja: ["postcode 構造を検証するフォーム", "UK 向けチェックアウトやサブスク画面のデモ", "国際対応の住所入力コンポーネントの比較テスト"]
    },
    sampleAddress: {
      zh: ["Buckingham Palace", "London SW1A 1AA", "United Kingdom"],
      en: ["Buckingham Palace", "London SW1A 1AA", "United Kingdom"],
      ja: ["Buckingham Palace", "London SW1A 1AA", "United Kingdom"]
    },
    faq: genericFaq({ zh: "英国", en: "UK", ja: "イギリス" }, { zh: "地区", en: "Region", ja: "地域" }),
    stats: [
      {
        label: { zh: "首屏重点", en: "Above-the-fold focus", ja: "ファーストビュー重点" },
        value: "Postcode",
        description: {
          zh: "首屏文案可以重点强调 postcode、copy 和 save。",
          en: "The hero copy can lean on postcode examples plus copy and save actions.",
          ja: "ヒーローでは postcode、コピー、保存を前面に出すと伝わりやすいです。"
        }
      },
      {
        label: { zh: "地区级别", en: "Filter level", ja: "フィルター粒度" },
        value: "4",
        description: {
          zh: "使用英格兰、苏格兰、威尔士、北爱尔兰做一级入口即可。",
          en: "A four-region top-level filter is usually enough for a clean first release.",
          ja: "初期版では 4 地域のトップレベルフィルターで十分です。"
        }
      },
      {
        label: { zh: "SEO 角度", en: "SEO angle", ja: "SEO の切り口" },
        value: "Format + example",
        description: {
          zh: "更适合吃格式、postcode 示例和地址填写教程类词。",
          en: "The strongest traffic angle is format guidance, postcode examples, and writing tutorials.",
          ja: "形式ガイド、postcode の例、書き方チュートリアルの相性が良いです。"
        }
      }
    ],
    regions: [
      { code: "ENG", name: { zh: "英格兰", en: "England", ja: "イングランド" } },
      { code: "SCT", name: { zh: "苏格兰", en: "Scotland", ja: "スコットランド" } },
      { code: "WLS", name: { zh: "威尔士", en: "Wales", ja: "ウェールズ" } },
      { code: "NIR", name: { zh: "北爱尔兰", en: "Northern Ireland", ja: "北アイルランド" } }
    ],
    addresses: [
      {
        id: "uk-eng-buckingham",
        regionCode: "ENG",
        venue: { zh: "Buckingham Palace", en: "Buckingham Palace", ja: "Buckingham Palace" },
        recipient: { zh: "测试收件人", en: "Test Receiver", ja: "テスト受取人" },
        street: "Buckingham Palace Rd",
        city: "London",
        postalCode: "SW1A 1AA",
        phone: "+44 20 7930 4832",
        email: "qa.uk.london@example.dev",
        fullAddress: {
          zh: "Buckingham Palace, London SW1A 1AA, United Kingdom",
          en: "Buckingham Palace, London SW1A 1AA, United Kingdom",
          ja: "Buckingham Palace, London SW1A 1AA, United Kingdom"
        },
        latitude: 51.5014,
        longitude: -0.1419
      },
      {
        id: "uk-eng-downing",
        regionCode: "ENG",
        venue: { zh: "10 Downing Street", en: "10 Downing Street", ja: "10 Downing Street" },
        recipient: { zh: "业务测试", en: "Business Test", ja: "業務テスト" },
        street: "10 Downing Street",
        city: "London",
        postalCode: "SW1A 2AA",
        phone: "+44 20 7925 0918",
        email: "ops.uk.london@example.dev",
        fullAddress: {
          zh: "10 Downing Street, London SW1A 2AA, United Kingdom",
          en: "10 Downing Street, London SW1A 2AA, United Kingdom",
          ja: "10 Downing Street, London SW1A 2AA, United Kingdom"
        },
        latitude: 51.5034,
        longitude: -0.1276
      },
      {
        id: "uk-sct-edinburgh",
        regionCode: "SCT",
        venue: { zh: "Edinburgh Castle", en: "Edinburgh Castle", ja: "Edinburgh Castle" },
        recipient: { zh: "旅游演示", en: "Travel Demo", ja: "旅行デモ" },
        street: "Castlehill",
        city: "Edinburgh",
        postalCode: "EH1 2NG",
        phone: "+44 131 225 9846",
        email: "travel.uk.scotland@example.dev",
        fullAddress: {
          zh: "Edinburgh Castle, Castlehill, Edinburgh EH1 2NG, United Kingdom",
          en: "Edinburgh Castle, Castlehill, Edinburgh EH1 2NG, United Kingdom",
          ja: "Edinburgh Castle, Castlehill, Edinburgh EH1 2NG, United Kingdom"
        },
        latitude: 55.9486,
        longitude: -3.1999
      },
      {
        id: "uk-wls-cardiff",
        regionCode: "WLS",
        venue: { zh: "Cardiff Castle", en: "Cardiff Castle", ja: "Cardiff Castle" },
        recipient: { zh: "测试收件人", en: "Test Receiver", ja: "テスト受取人" },
        street: "Castle St",
        city: "Cardiff",
        postalCode: "CF10 3RB",
        phone: "+44 29 2087 8100",
        email: "qa.uk.wales@example.dev",
        fullAddress: {
          zh: "Cardiff Castle, Castle St, Cardiff CF10 3RB, United Kingdom",
          en: "Cardiff Castle, Castle St, Cardiff CF10 3RB, United Kingdom",
          ja: "Cardiff Castle, Castle St, Cardiff CF10 3RB, United Kingdom"
        },
        latitude: 51.4811,
        longitude: -3.1817
      },
      {
        id: "uk-nir-belfast",
        regionCode: "NIR",
        venue: { zh: "Belfast City Hall", en: "Belfast City Hall", ja: "Belfast City Hall" },
        recipient: { zh: "本地化测试", en: "Localization Test", ja: "ローカライズテスト" },
        street: "Donegall Square N",
        city: "Belfast",
        postalCode: "BT1 5GS",
        phone: "+44 28 9032 0202",
        email: "locale.uk.ni@example.dev",
        fullAddress: {
          zh: "Belfast City Hall, Donegall Square N, Belfast BT1 5GS, United Kingdom",
          en: "Belfast City Hall, Donegall Square N, Belfast BT1 5GS, United Kingdom",
          ja: "Belfast City Hall, Donegall Square N, Belfast BT1 5GS, United Kingdom"
        },
        latitude: 54.5964,
        longitude: -5.93
      }
    ],
    relatedPosts: ["zip-vs-postal-code", "build-address-generator"]
  },
  {
    code: "JP",
    slug: "jp",
    name: { zh: "日本", en: "Japan", ja: "日本" },
    directoryExcerpt: {
      zh: "适合做日本地址格式、都道府县筛选和邮编写法说明。",
      en: "A strong page for Japanese address format queries, prefecture filters, and postal-code examples.",
      ja: "日本の住所形式、都道府県フィルター、郵便番号の書き方に向いています。"
    },
    heading: { zh: "日本地址生成器", en: "Japan Address Generator", ja: "日本住所ジェネレーター" },
    metaDescription: {
      zh: "生成支持都道府县筛选、复制、保存和分享的日本真实格式地址，用于测试和本地化。",
      en: "Generate Japanese addresses with prefecture filtering, copy, save, and share support for testing and localization.",
      ja: "都道府県フィルター、コピー、保存、共有に対応した日本住所ジェネレーター。テストやローカライズ向けです。"
    },
    heroIntro: {
      zh: "日本地址的书写顺序和西方国家不同，非常适合单独做一页讲清楚格式、都道府县和邮编。",
      en: "Japanese address order differs from Western conventions, making it ideal for a dedicated page on format, prefectures, and postal codes.",
      ja: "日本の住所順は欧米と異なるため、形式、都道府県、郵便番号をまとめて解説する独立ページに向いています。"
    },
    toolSummary: {
      zh: "如果你的网站支持日文界面，日本页通常会有更强的本地化价值，也更容易做出真正有用的 FAQ。",
      en: "If your site supports Japanese UI, this page gains extra localization value and opens up more useful FAQs.",
      ja: "サイトが日本語 UI に対応しているなら、このページはローカライズ価値が高く、FAQ も具体的に作れます。"
    },
    regionLabel: { zh: "都道府县", en: "Prefecture", ja: "都道府県" },
    formatRules: {
      zh: [
        "日本地址常见顺序是邮编、都道府县、市区町村、丁目番地、建筑名。",
        "日文和英文界面中，同一地址的显示顺序可能不同，最好分别准备格式化模板。",
        "邮编通常以 3 位 + 连字符 + 4 位的形式出现。"
      ],
      en: [
        "Japanese addresses often start with the postal code, then prefecture, municipality, block numbers, and building name.",
        "The display order can differ between Japanese and English UIs, so separate formatting templates are helpful.",
        "Postal codes typically use the 3-digit plus hyphen plus 4-digit pattern."
      ],
      ja: [
        "日本の住所は郵便番号、都道府県、市区町村、丁目番地、建物名の順で書かれることが多いです。",
        "日本語 UI と英語 UI では同じ住所でも並び順が変わるため、表示テンプレートを分けると便利です。",
        "郵便番号は 3 桁、ハイフン、4 桁の形式が一般的です。"
      ]
    },
    regionNotes: {
      zh: [
        "第一版先覆盖东京、大阪、京都、北海道即可，已经足够演示都道府县筛选。",
        "日本地址的重点不只是邮编，还包括丁目、番地和建筑名的组合。",
        "如果后续做文章，建议重点写“日文地址怎么倒序填写”。"
      ],
      en: [
        "Tokyo, Osaka, Kyoto, and Hokkaido are enough for a strong first-release prefecture filter.",
        "The core complexity is not only the postal code but also the block-and-building structure.",
        "A strong blog angle is explaining reverse order and localization between Japanese and English layouts."
      ],
      ja: [
        "初期版では東京、大阪、京都、北海道があれば都道府県フィルターとして十分です。",
        "日本住所の難しさは郵便番号だけでなく、丁目、番地、建物名の組み合わせにもあります。",
        "記事では日本語表記と英語表記の順序差を解説すると強いです。"
      ]
    },
    useCases: {
      zh: ["日本电商结账页的地址输入演示", "多语言 SaaS 的日本本地化测试", "邮编和都道府县联动组件验证"],
      en: ["Japanese checkout-form demos", "Localization testing for multilingual SaaS products", "Postal-code and prefecture-dependent UI validation"],
      ja: ["日本向けチェックアウトフォームのデモ", "多言語 SaaS の日本ローカライズ検証", "郵便番号と都道府県が連動する UI の確認"]
    },
    sampleAddress: {
      zh: ["〒100-8111", "東京都千代田区千代田1-1", "日本"],
      en: ["1-1 Chiyoda, Chiyoda City, Tokyo 100-8111, Japan"],
      ja: ["〒100-8111", "東京都千代田区千代田1-1", "日本"]
    },
    faq: genericFaq({ zh: "日本", en: "Japan", ja: "日本" }, { zh: "都道府县", en: "Prefecture", ja: "都道府県" }),
    stats: [
      {
        label: { zh: "首屏要点", en: "Hero emphasis", ja: "ヒーロー重点" },
        value: "Postal + Prefecture",
        description: {
          zh: "首屏同时强调邮编和都道府县筛选，更容易解释这个国家页的价值。",
          en: "Lead with both postal code structure and prefecture filtering to make the value clear.",
          ja: "郵便番号と都道府県フィルターを同時に見せると価値が伝わりやすいです。"
        }
      },
      {
        label: { zh: "输出形式", en: "Display style", ja: "表示スタイル" },
        value: "JP + EN",
        description: {
          zh: "同一数据可同时支持日文格式和英文格式的展示。",
          en: "The same address can support both native Japanese and English-friendly formatting.",
          ja: "同じ住所データから日本語形式と英語形式の両方を作れます。"
        }
      },
      {
        label: { zh: "长尾方向", en: "Long-tail angle", ja: "ロングテール" },
        value: "Address order",
        description: {
          zh: "很适合延展 how to write a Japanese address 这类教学型文章。",
          en: "It is a strong base for educational content such as how to write a Japanese address.",
          ja: "how to write a Japanese address のような教育系記事へ広げやすいです。"
        }
      }
    ],
    regions: [
      { code: "TOKYO", name: { zh: "东京都", en: "Tokyo", ja: "東京都" } },
      { code: "OSAKA", name: { zh: "大阪府", en: "Osaka", ja: "大阪府" } },
      { code: "KYOTO", name: { zh: "京都府", en: "Kyoto", ja: "京都府" } },
      { code: "HOKKAIDO", name: { zh: "北海道", en: "Hokkaido", ja: "北海道" } }
    ],
    addresses: [
      {
        id: "jp-tokyo-imperial",
        regionCode: "TOKYO",
        venue: { zh: "皇居", en: "Imperial Palace", ja: "皇居" },
        recipient: { zh: "测试收件人", en: "Test Receiver", ja: "テスト受取人" },
        street: "千代田1-1",
        district: "千代田区",
        city: "東京都",
        postalCode: "100-8111",
        phone: "+81 3-3213-1111",
        email: "qa.jp.tokyo@example.dev",
        fullAddress: {
          zh: "〒100-8111 东京都千代田区千代田1-1 日本",
          en: "1-1 Chiyoda, Chiyoda City, Tokyo 100-8111, Japan",
          ja: "〒100-8111 東京都千代田区千代田1-1 日本"
        },
        latitude: 35.6852,
        longitude: 139.7528
      },
      {
        id: "jp-tokyo-skytree",
        regionCode: "TOKYO",
        venue: { zh: "东京晴空塔", en: "Tokyo Skytree", ja: "東京スカイツリー" },
        recipient: { zh: "演示账户", en: "Demo Account", ja: "デモアカウント" },
        street: "押上1-1-2",
        district: "墨田区",
        city: "東京都",
        postalCode: "131-0045",
        phone: "+81 570-550-634",
        email: "demo.jp.tokyo@example.dev",
        fullAddress: {
          zh: "〒131-0045 东京都墨田区押上1-1-2 日本",
          en: "1-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan",
          ja: "〒131-0045 東京都墨田区押上1-1-2 日本"
        },
        latitude: 35.71,
        longitude: 139.8107
      },
      {
        id: "jp-osaka-castle",
        regionCode: "OSAKA",
        venue: { zh: "大阪城", en: "Osaka Castle", ja: "大阪城" },
        recipient: { zh: "订单演示", en: "Order Demo", ja: "注文デモ" },
        street: "大阪城1-1",
        district: "中央区",
        city: "大阪市",
        postalCode: "540-0002",
        phone: "+81 6-6941-3044",
        email: "orders.jp.osaka@example.dev",
        fullAddress: {
          zh: "〒540-0002 大阪府大阪市中央区大阪城1-1 日本",
          en: "1-1 Osakajo, Chuo-ku, Osaka 540-0002, Japan",
          ja: "〒540-0002 大阪府大阪市中央区大阪城1-1 日本"
        },
        latitude: 34.6873,
        longitude: 135.5262
      },
      {
        id: "jp-kyoto-station",
        regionCode: "KYOTO",
        venue: { zh: "京都站", en: "Kyoto Station", ja: "京都駅" },
        recipient: { zh: "旅游演示", en: "Travel Demo", ja: "旅行デモ" },
        street: "东盐小路町901",
        district: "下京区",
        city: "京都市",
        postalCode: "600-8216",
        phone: "+81 75-361-4401",
        email: "travel.jp.kyoto@example.dev",
        fullAddress: {
          zh: "〒600-8216 京都府京都市下京区东盐小路町901 日本",
          en: "901 Higashishiokoji-cho, Shimogyo-ku, Kyoto 600-8216, Japan",
          ja: "〒600-8216 京都府京都市下京区東塩小路町901 日本"
        },
        latitude: 34.9858,
        longitude: 135.7588
      },
      {
        id: "jp-hokkaido-clock",
        regionCode: "HOKKAIDO",
        venue: { zh: "札幌钟楼", en: "Sapporo Clock Tower", ja: "札幌市時計台" },
        recipient: { zh: "本地化测试", en: "Localization Test", ja: "ローカライズテスト" },
        street: "北1条西2丁目",
        district: "中央区",
        city: "札幌市",
        postalCode: "060-0001",
        phone: "+81 11-231-0838",
        email: "locale.jp.hokkaido@example.dev",
        fullAddress: {
          zh: "〒060-0001 北海道札幌市中央区北1条西2丁目 日本",
          en: "Kita 1-jo Nishi 2-chome, Chuo-ku, Sapporo, Hokkaido 060-0001, Japan",
          ja: "〒060-0001 北海道札幌市中央区北1条西2丁目 日本"
        },
        latitude: 43.0621,
        longitude: 141.3544
      }
    ],
    relatedPosts: ["japan-address-format", "build-address-generator"]
  },
  {
    code: "CA",
    slug: "ca",
    name: { zh: "加拿大", en: "Canada", ja: "カナダ" },
    directoryExcerpt: {
      zh: "适合做省份筛选、字母数字邮编和英语/法语场景的说明。",
      en: "Good for province filters, alphanumeric postal codes, and bilingual UI examples.",
      ja: "州フィルター、英数字の郵便番号、英仏バイリンガル UI の例に向いています。"
    },
    heading: { zh: "加拿大地址生成器", en: "Canada Address Generator", ja: "カナダ住所ジェネレーター" },
    metaDescription: {
      zh: "生成支持省份筛选、复制、分享和保存的加拿大真实格式地址，用于测试和演示。",
      en: "Generate Canadian addresses with province filtering, copy, share, and save support for testing and demos.",
      ja: "州フィルター、コピー、共有、保存に対応したカナダ住所ジェネレーター。テストやデモ向けです。"
    },
    heroIntro: {
      zh: "加拿大地址页适合讲清楚省份、城市和字母数字混合邮编的写法。",
      en: "A Canadian address page works well for explaining provinces, cities, and the alphanumeric postal code format.",
      ja: "カナダの住所ページは州、都市、英数字の郵便番号形式を説明するのに向いています。"
    },
    toolSummary: {
      zh: "如果你会做英文站，加拿大页是扩展北美关键词的很自然一步。",
      en: "If you already cover the US in English, Canada is a natural next step for broader North American coverage.",
      ja: "英語圏向けに米国ページを作るなら、カナダは北米展開として自然な追加先です。"
    },
    regionLabel: { zh: "省份", en: "Province", ja: "州" },
    formatRules: {
      zh: [
        "加拿大地址一般是街道、城市、省份缩写、邮编、Canada。",
        "邮编由 6 个字母数字字符组成，中间通常有空格。",
        "安大略、魁北克、卑诗等省份经常用缩写 ON、QC、BC。"
      ],
      en: [
        "Canadian addresses commonly follow street, city, province abbreviation, postal code, and Canada.",
        "Postal codes use six alphanumeric characters, usually with a space in the middle.",
        "Provinces such as Ontario, Quebec, and British Columbia often appear as ON, QC, and BC."
      ],
      ja: [
        "カナダの住所は通り、都市、州略称、郵便番号、Canada の順が一般的です。",
        "郵便番号は 6 文字の英数字で、中央にスペースが入るのが通常です。",
        "Ontario、Quebec、British Columbia は ON、QC、BC と略されます。"
      ]
    },
    regionNotes: {
      zh: [
        "第一版优先做 Ontario、British Columbia、Quebec、Alberta 即可。",
        "如果后续做双语站，魁北克页很适合延展法语内容。",
        "加拿大页和美国页可以互相内链，提升北美主题相关性。"
      ],
      en: [
        "Ontario, British Columbia, Quebec, and Alberta are enough for a solid first release.",
        "If you expand toward bilingual content, Quebec is the strongest place to add French-specific copy.",
        "Link Canada and US pages together to strengthen North America topical relevance."
      ],
      ja: [
        "初期版では Ontario、British Columbia、Quebec、Alberta の 4 州で十分です。",
        "バイリンガル展開を考えるなら Quebec でフランス語向けの内容を増やせます。",
        "カナダとアメリカのページを相互リンクすると北米テーマの関連性が高まります。"
      ]
    },
    useCases: {
      zh: ["北美多国结账页测试", "英法双语产品中的地址组件演示", "加拿大邮编输入规则验证"],
      en: ["North America checkout testing", "Address component demos for bilingual products", "Canadian postal-code validation flows"],
      ja: ["北米向けチェックアウトの検証", "バイリンガル製品の住所入力デモ", "カナダ郵便番号ルールの確認"]
    },
    sampleAddress: {
      zh: ["CN Tower", "301 Front St W", "Toronto, ON M5V 2T6", "Canada"],
      en: ["CN Tower", "301 Front St W", "Toronto, ON M5V 2T6", "Canada"],
      ja: ["CN Tower", "301 Front St W", "Toronto, ON M5V 2T6", "Canada"]
    },
    faq: genericFaq({ zh: "加拿大", en: "Canada", ja: "カナダ" }, { zh: "省份", en: "Province", ja: "州" }),
    stats: [
      {
        label: { zh: "邮编特征", en: "Postal code trait", ja: "郵便番号の特徴" },
        value: "A1A 1A1",
        description: {
          zh: "字母数字混合邮编适合做单独的格式解释和占位符示例。",
          en: "The alphanumeric pattern is perfect for separate format guidance and placeholder examples.",
          ja: "英数字混合なので形式ガイドやプレースホルダー例に向いています。"
        }
      },
      {
        label: { zh: "扩展方向", en: "Expansion path", ja: "拡張方向" },
        value: "Bilingual",
        description: {
          zh: "后续可以把魁北克文章扩展成英语 + 法语的双语内容。",
          en: "Quebec can later become the base for English plus French content expansion.",
          ja: "将来的に Quebec を英語 + フランス語の基点にできます。"
        }
      },
      {
        label: { zh: "SEO 组合", en: "SEO combo", ja: "SEO の組み合わせ" },
        value: "Province + postal",
        description: {
          zh: "省份词和 postal code 词组合后很容易形成稳定长尾。",
          en: "Province filters plus postal-code terms often create durable long-tail traffic.",
          ja: "州フィルターと postal code 系の語句を組み合わせると安定したロングテールになります。"
        }
      }
    ],
    regions: [
      { code: "ON", name: { zh: "安大略省", en: "Ontario", ja: "オンタリオ州" } },
      { code: "BC", name: { zh: "不列颠哥伦比亚省", en: "British Columbia", ja: "ブリティッシュコロンビア州" } },
      { code: "QC", name: { zh: "魁北克省", en: "Quebec", ja: "ケベック州" } },
      { code: "AB", name: { zh: "艾伯塔省", en: "Alberta", ja: "アルバータ州" } }
    ],
    addresses: [
      {
        id: "ca-on-cn-tower",
        regionCode: "ON",
        venue: { zh: "CN Tower", en: "CN Tower", ja: "CN Tower" },
        recipient: { zh: "测试收件人", en: "Test Receiver", ja: "テスト受取人" },
        street: "301 Front St W",
        city: "Toronto",
        postalCode: "M5V 2T6",
        phone: "+1 416-868-6937",
        email: "qa.ca.on@example.dev",
        fullAddress: {
          zh: "CN Tower, 301 Front St W, Toronto, ON M5V 2T6, Canada",
          en: "CN Tower, 301 Front St W, Toronto, ON M5V 2T6, Canada",
          ja: "CN Tower, 301 Front St W, Toronto, ON M5V 2T6, Canada"
        },
        latitude: 43.6426,
        longitude: -79.3871
      },
      {
        id: "ca-on-parliament",
        regionCode: "ON",
        venue: { zh: "Parliament of Canada", en: "Parliament of Canada", ja: "Parliament of Canada" },
        recipient: { zh: "业务测试", en: "Business Test", ja: "業務テスト" },
        street: "111 Wellington St",
        city: "Ottawa",
        postalCode: "K1A 0A9",
        phone: "+1 613-992-4793",
        email: "ops.ca.ottawa@example.dev",
        fullAddress: {
          zh: "Parliament of Canada, 111 Wellington St, Ottawa, ON K1A 0A9, Canada",
          en: "Parliament of Canada, 111 Wellington St, Ottawa, ON K1A 0A9, Canada",
          ja: "Parliament of Canada, 111 Wellington St, Ottawa, ON K1A 0A9, Canada"
        },
        latitude: 45.4236,
        longitude: -75.7009
      },
      {
        id: "ca-bc-marine",
        regionCode: "BC",
        venue: { zh: "Canada Place", en: "Canada Place", ja: "Canada Place" },
        recipient: { zh: "演示账户", en: "Demo Account", ja: "デモアカウント" },
        street: "999 Canada Pl",
        city: "Vancouver",
        postalCode: "V6C 3T4",
        phone: "+1 604-775-2115",
        email: "demo.ca.bc@example.dev",
        fullAddress: {
          zh: "Canada Place, 999 Canada Pl, Vancouver, BC V6C 3T4, Canada",
          en: "Canada Place, 999 Canada Pl, Vancouver, BC V6C 3T4, Canada",
          ja: "Canada Place, 999 Canada Pl, Vancouver, BC V6C 3T4, Canada"
        },
        latitude: 49.2886,
        longitude: -123.1117
      },
      {
        id: "ca-qc-montreal",
        regionCode: "QC",
        venue: { zh: "Place Ville Marie", en: "Place Ville Marie", ja: "Place Ville Marie" },
        recipient: { zh: "本地化测试", en: "Localization Test", ja: "ローカライズテスト" },
        street: "1 Place Ville Marie",
        city: "Montreal",
        postalCode: "H3B 2B6",
        phone: "+1 514-861-9393",
        email: "locale.ca.qc@example.dev",
        fullAddress: {
          zh: "Place Ville Marie, 1 Place Ville Marie, Montreal, QC H3B 2B6, Canada",
          en: "Place Ville Marie, 1 Place Ville Marie, Montreal, QC H3B 2B6, Canada",
          ja: "Place Ville Marie, 1 Place Ville Marie, Montreal, QC H3B 2B6, Canada"
        },
        latitude: 45.5017,
        longitude: -73.5674
      },
      {
        id: "ca-ab-calgary",
        regionCode: "AB",
        venue: { zh: "Calgary Tower", en: "Calgary Tower", ja: "Calgary Tower" },
        recipient: { zh: "营销演示", en: "Marketing Demo", ja: "マーケデモ" },
        street: "101 9 Ave SW",
        city: "Calgary",
        postalCode: "T2P 1J9",
        phone: "+1 403-266-7171",
        email: "marketing.ca.ab@example.dev",
        fullAddress: {
          zh: "Calgary Tower, 101 9 Ave SW, Calgary, AB T2P 1J9, Canada",
          en: "Calgary Tower, 101 9 Ave SW, Calgary, AB T2P 1J9, Canada",
          ja: "Calgary Tower, 101 9 Ave SW, Calgary, AB T2P 1J9, Canada"
        },
        latitude: 51.0447,
        longitude: -114.063
      }
    ],
    relatedPosts: ["zip-vs-postal-code", "build-address-generator"]
  },
  {
    code: "IN",
    slug: "in",
    name: { zh: "印度", en: "India", ja: "インド" },
    directoryExcerpt: {
      zh: "适合做州筛选、PIN Code 和城市/地区结构说明。",
      en: "A strong page for state filters, PIN code examples, and city plus district structure.",
      ja: "州フィルター、PIN Code、都市と地区の構造説明に向いています。"
    },
    heading: { zh: "印度地址生成器", en: "India Address Generator", ja: "インド住所ジェネレーター" },
    metaDescription: {
      zh: "生成支持州筛选、复制、分享和保存的印度真实格式地址，适合测试和地址组件设计。",
      en: "Generate Indian addresses with state filtering, copy, share, and save support for testing and address-component design.",
      ja: "州フィルター、コピー、共有、保存に対応したインド住所ジェネレーター。テストや住所 UI 設計に使えます。"
    },
    heroIntro: {
      zh: "印度页非常适合解释州、城市、地区和 6 位 PIN Code 的组合关系。",
      en: "India is a great landing page for explaining the relationship between state, city, locality, and 6-digit PIN codes.",
      ja: "州、都市、地区、6 桁の PIN Code の関係を説明するランディングページとして優秀です。"
    },
    toolSummary: {
      zh: "如果你想把这个站做成全球地址工具，印度是很值得优先补上的国家页。",
      en: "If you want the site to feel truly global, India is one of the best next countries to add.",
      ja: "グローバルな住所ツールにしたいなら、インドは優先度の高い追加国です。"
    },
    regionLabel: { zh: "州", en: "State", ja: "州" },
    formatRules: {
      zh: [
        "印度地址通常包含门牌号/楼名、街道、地区、城市、州和 6 位 PIN Code。",
        "很多表单会把 locality 或 area 作为单独字段，不能只保留 city。",
        "PIN Code 是用户最容易识别的地址校验点之一。"
      ],
      en: [
        "Indian addresses often include house or building, street, locality, city, state, and a 6-digit PIN code.",
        "Many forms keep locality or area as a separate field, so city alone is not enough.",
        "The PIN code is one of the easiest validation cues for users."
      ],
      ja: [
        "インドの住所は建物名または番地、通り、地域、都市、州、6 桁の PIN Code を含むことが多いです。",
        "多くのフォームでは locality や area を個別項目にするため、city だけでは足りません。",
        "PIN Code はユーザーが確認しやすい重要な検証ポイントです。"
      ]
    },
    regionNotes: {
      zh: [
        "Maharashtra、Delhi、Karnataka、West Bengal、Telangana 足够组成第一版州筛选。",
        "印度页面的长尾流量经常来自 state name + pin code 或 city + address format。",
        "如果要继续扩展，建议优先做 Mumbai、Delhi、Bengaluru 独立文章。"
      ],
      en: [
        "Maharashtra, Delhi, Karnataka, West Bengal, and Telangana are enough for a strong starter filter set.",
        "Long-tail traffic often comes from state plus PIN code or city plus address format searches.",
        "If you expand further, start with city articles for Mumbai, Delhi, and Bengaluru."
      ],
      ja: [
        "初期フィルターは Maharashtra、Delhi、Karnataka、West Bengal、Telangana で十分です。",
        "ロングテールは state + PIN code や city + address format の組み合わせが取りやすいです。",
        "拡張するなら Mumbai、Delhi、Bengaluru の記事から始めるのがおすすめです。"
      ]
    },
    useCases: {
      zh: ["需要 locality 字段的复杂地址表单验证", "全球 SaaS 产品的印度市场演示", "移动端地址输入体验优化"],
      en: ["Validation for complex address forms that include locality", "India-market demos for global SaaS products", "Mobile address-entry UX testing"],
      ja: ["locality 項目を含む複雑な住所フォームの検証", "グローバル SaaS のインド向けデモ", "モバイルでの住所入力 UX テスト"]
    },
    sampleAddress: {
      zh: ["Gateway of India", "Apollo Bandar, Colaba", "Mumbai, Maharashtra 400001", "India"],
      en: ["Gateway of India", "Apollo Bandar, Colaba", "Mumbai, Maharashtra 400001", "India"],
      ja: ["Gateway of India", "Apollo Bandar, Colaba", "Mumbai, Maharashtra 400001", "India"]
    },
    faq: genericFaq({ zh: "印度", en: "India", ja: "インド" }, { zh: "州", en: "State", ja: "州" }),
    stats: [
      {
        label: { zh: "关键字段", en: "Key field", ja: "重要フィールド" },
        value: "PIN Code",
        description: {
          zh: "6 位 PIN Code 是地址组件里最值得强调的校验项。",
          en: "The 6-digit PIN code is the clearest validation cue in most Indian address forms.",
          ja: "6 桁の PIN Code は住所フォームで最も分かりやすい検証項目です。"
        }
      },
      {
        label: { zh: "页面价值", en: "Page value", ja: "ページ価値" },
        value: "Localization",
        description: {
          zh: "这类页面能帮助国际化产品解释 locality、state 和 city 的字段关系。",
          en: "The page helps international products explain locality, state, and city relationships.",
          ja: "locality、state、city の関係を説明できるので、国際化製品に役立ちます。"
        }
      },
      {
        label: { zh: "扩展路线", en: "Expansion route", ja: "拡張ルート" },
        value: "State -> city",
        description: {
          zh: "先做州页，再逐步扩展到大城市地址格式文章，会更稳。",
          en: "Start with the state-level page, then expand into city-specific format articles.",
          ja: "まず州レベルのページを作り、次に主要都市の記事へ広げるのが安定です。"
        }
      }
    ],
    regions: [
      { code: "MH", name: { zh: "马哈拉施特拉邦", en: "Maharashtra", ja: "マハーラーシュトラ州" } },
      { code: "DL", name: { zh: "德里", en: "Delhi", ja: "デリー" } },
      { code: "KA", name: { zh: "卡纳塔克邦", en: "Karnataka", ja: "カルナータカ州" } },
      { code: "WB", name: { zh: "西孟加拉邦", en: "West Bengal", ja: "西ベンガル州" } },
      { code: "TS", name: { zh: "特伦甘纳邦", en: "Telangana", ja: "テランガーナ州" } }
    ],
    addresses: [
      {
        id: "in-mh-gateway",
        regionCode: "MH",
        venue: { zh: "Gateway of India", en: "Gateway of India", ja: "Gateway of India" },
        recipient: { zh: "测试收件人", en: "Test Receiver", ja: "テスト受取人" },
        street: "Apollo Bandar, Colaba",
        city: "Mumbai",
        postalCode: "400001",
        phone: "+91 22 2202 4404",
        email: "qa.in.mh@example.dev",
        fullAddress: {
          zh: "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India",
          en: "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India",
          ja: "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India"
        },
        latitude: 18.922,
        longitude: 72.8347
      },
      {
        id: "in-dl-india-gate",
        regionCode: "DL",
        venue: { zh: "India Gate", en: "India Gate", ja: "India Gate" },
        recipient: { zh: "业务测试", en: "Business Test", ja: "業務テスト" },
        street: "Kartavya Path",
        city: "New Delhi",
        postalCode: "110001",
        phone: "+91 11 2336 5358",
        email: "ops.in.delhi@example.dev",
        fullAddress: {
          zh: "India Gate, Kartavya Path, New Delhi, Delhi 110001, India",
          en: "India Gate, Kartavya Path, New Delhi, Delhi 110001, India",
          ja: "India Gate, Kartavya Path, New Delhi, Delhi 110001, India"
        },
        latitude: 28.6129,
        longitude: 77.2295
      },
      {
        id: "in-ka-vidhana",
        regionCode: "KA",
        venue: { zh: "Vidhana Soudha", en: "Vidhana Soudha", ja: "Vidhana Soudha" },
        recipient: { zh: "本地化测试", en: "Localization Test", ja: "ローカライズテスト" },
        street: "Ambedkar Veedhi",
        city: "Bengaluru",
        postalCode: "560001",
        phone: "+91 80 2203 4000",
        email: "locale.in.ka@example.dev",
        fullAddress: {
          zh: "Vidhana Soudha, Ambedkar Veedhi, Bengaluru, Karnataka 560001, India",
          en: "Vidhana Soudha, Ambedkar Veedhi, Bengaluru, Karnataka 560001, India",
          ja: "Vidhana Soudha, Ambedkar Veedhi, Bengaluru, Karnataka 560001, India"
        },
        latitude: 12.9797,
        longitude: 77.5907
      },
      {
        id: "in-wb-howrah",
        regionCode: "WB",
        venue: { zh: "Howrah Junction", en: "Howrah Junction", ja: "Howrah Junction" },
        recipient: { zh: "订单演示", en: "Order Demo", ja: "注文デモ" },
        street: "Station Rd",
        city: "Howrah",
        postalCode: "711101",
        phone: "+91 33 2641 6808",
        email: "orders.in.wb@example.dev",
        fullAddress: {
          zh: "Howrah Junction, Station Rd, Howrah, West Bengal 711101, India",
          en: "Howrah Junction, Station Rd, Howrah, West Bengal 711101, India",
          ja: "Howrah Junction, Station Rd, Howrah, West Bengal 711101, India"
        },
        latitude: 22.585,
        longitude: 88.3426
      },
      {
        id: "in-ts-charminar",
        regionCode: "TS",
        venue: { zh: "Charminar", en: "Charminar", ja: "Charminar" },
        recipient: { zh: "营销演示", en: "Marketing Demo", ja: "マーケデモ" },
        street: "Char Kaman, Ghansi Bazaar",
        city: "Hyderabad",
        postalCode: "500002",
        phone: "+91 40 2456 6442",
        email: "marketing.in.ts@example.dev",
        fullAddress: {
          zh: "Charminar, Char Kaman, Ghansi Bazaar, Hyderabad, Telangana 500002, India",
          en: "Charminar, Char Kaman, Ghansi Bazaar, Hyderabad, Telangana 500002, India",
          ja: "Charminar, Char Kaman, Ghansi Bazaar, Hyderabad, Telangana 500002, India"
        },
        latitude: 17.3616,
        longitude: 78.4747
      }
    ],
    relatedPosts: ["build-address-generator"]
  },
  {
    code: "HK",
    slug: "hk",
    name: { zh: "香港", en: "Hong Kong", ja: "香港" },
    directoryExcerpt: {
      zh: "适合覆盖香港地址格式、District 筛选和中英双语地址写法。",
      en: "A strong page for Hong Kong address format, district filters, and bilingual address examples.",
      ja: "香港の住所形式、District フィルター、中英併記の住所例に向いています。"
    },
    heading: { zh: "香港地址生成器", en: "Hong Kong Address Generator", ja: "香港住所ジェネレーター" },
    metaDescription: {
      zh: "生成支持地区筛选、复制、分享和保存的香港真实格式地址，适合测试、演示和地址组件设计。",
      en: "Generate Hong Kong addresses with district filtering, copy, share, and save support for testing, demos, and address-component design.",
      ja: "地区フィルター、コピー、共有、保存に対応した香港住所ジェネレーター。テストや住所 UI 設計に使えます。"
    },
    heroIntro: {
      zh: "香港页很适合讲清楚英文地址、中文地址、地区和楼宇名称的组合关系。",
      en: "Hong Kong is a useful landing page for explaining English and Chinese address layouts, district filters, and building names.",
      ja: "香港ページは英語表記と中国語表記、地区、ビル名の組み合わせを説明するのに向いています。"
    },
    toolSummary: {
      zh: "如果你后续会补很多亚洲国家，香港页是非常好的中转页，因为它天然带有双语和国际化场景。",
      en: "If you plan to expand across Asia, Hong Kong is a strong bridge page because bilingual and international address patterns are built in.",
      ja: "今後アジア圏へ広げるなら、香港はバイリンガルと国際化の文脈を持つ強い中継ページになります。"
    },
    regionLabel: { zh: "地区", en: "District", ja: "地区" },
    formatRules: {
      zh: [
        "香港地址通常包含楼宇名、街道门牌、地区，以及 Hong Kong。",
        "英文地址和中文地址的书写顺序可能不同，工具页最好准备两种展示方式。",
        "香港通常不使用正式邮编，很多国际表单会留空，或者使用 N/A 作为占位。"
      ],
      en: [
        "Hong Kong addresses often include the building name, street and number, district, and Hong Kong.",
        "English and Chinese layouts may use different ordering, so it helps to support both display styles.",
        "Hong Kong generally does not use a formal postal code, so many international forms leave it blank or use N/A as a placeholder."
      ],
      ja: [
        "香港の住所はビル名、通りと番地、地区、Hong Kong を含むことが多いです。",
        "英語表記と中国語表記で順序が変わることがあるため、両方の表示に対応すると便利です。",
        "香港では正式な郵便番号を使わないため、国際フォームでは空欄または N/A が使われることがあります。"
      ]
    },
    regionNotes: {
      zh: [
        "第一版先做 Central and Western、Wan Chai、Yau Tsim Mong、Sha Tin 就够了。",
        "香港页适合覆盖 building name、district 和 bilingual address 这类长尾词。",
        "如果后续扩展更多地区页，不要一次性开太多，只发布有独立说明内容的页面。"
      ],
      en: [
        "Central and Western, Wan Chai, Yau Tsim Mong, and Sha Tin are enough for a focused first release.",
        "This page is well suited to long-tail terms around building names, districts, and bilingual addresses.",
        "If you later expand to more districts, publish only the ones with genuinely unique explanatory content."
      ],
      ja: [
        "初期版は Central and Western、Wan Chai、Yau Tsim Mong、Sha Tin の 4 地区で十分です。",
        "building name、district、bilingual address 系のロングテールと相性が良いです。",
        "将来さらに地区ページを増やす場合も、独自説明があるものだけ公開するのが安全です。"
      ]
    },
    useCases: {
      zh: [
        "香港和国际站双语地址组件演示",
        "需要 district 字段的表单验证",
        "亚洲市场地址格式对比测试"
      ],
      en: [
        "Bilingual address-component demos for Hong Kong and international products",
        "Form validation flows that require a district field",
        "Comparative testing for Asia-focused address formats"
      ],
      ja: [
        "香港向けと国際向けのバイリンガル住所 UI デモ",
        "district 項目を含むフォーム検証",
        "アジア圏住所形式の比較テスト"
      ]
    },
    sampleAddress: {
      zh: ["Two International Finance Centre", "8 Finance Street", "Central, Hong Kong"],
      en: ["Two International Finance Centre", "8 Finance Street", "Central, Hong Kong"],
      ja: ["Two International Finance Centre", "8 Finance Street", "Central, Hong Kong"]
    },
    faq: genericFaq({ zh: "香港", en: "Hong Kong", ja: "香港" }, { zh: "地区", en: "District", ja: "地区" }),
    stats: [
      {
        label: { zh: "首屏重点", en: "Hero emphasis", ja: "ヒーロー重点" },
        value: "Bilingual",
        description: {
          zh: "香港页适合突出中英双语地址展示和 District 筛选。",
          en: "The Hong Kong page should emphasize bilingual address output and district filters.",
          ja: "香港ページではバイリンガル表示と District フィルターを前面に出すと伝わりやすいです。"
        }
      },
      {
        label: { zh: "SEO 方向", en: "SEO angle", ja: "SEO の方向" },
        value: "District + format",
        description: {
          zh: "District、building name 和 address format 组合更容易形成稳定长尾。",
          en: "District, building name, and address-format terms combine well for long-tail traffic.",
          ja: "District、building name、address format の組み合わせで安定したロングテールを作れます。"
        }
      },
      {
        label: { zh: "扩展路线", en: "Expansion route", ja: "拡張ルート" },
        value: "Country -> district",
        description: {
          zh: "先做一个强国家页，再决定是否扩展到地区级别页面。",
          en: "Start with a strong country page, then decide which districts deserve their own pages.",
          ja: "まず強い国ページを作り、その後に独立価値のある地区だけをページ化するのが安全です。"
        }
      }
    ],
    regions: [
      { code: "CW", name: { zh: "中西区", en: "Central and Western", ja: "中西区" } },
      { code: "WC", name: { zh: "湾仔区", en: "Wan Chai", ja: "湾仔区" } },
      { code: "YTM", name: { zh: "油尖旺区", en: "Yau Tsim Mong", ja: "油尖旺区" } },
      { code: "ST", name: { zh: "沙田区", en: "Sha Tin", ja: "沙田区" } }
    ],
    addresses: [
      {
        id: "hk-cw-ifc",
        regionCode: "CW",
        venue: { zh: "国际金融中心二期", en: "Two International Finance Centre", ja: "Two International Finance Centre" },
        recipient: { zh: "测试收件人", en: "Test Receiver", ja: "テスト受取人" },
        street: "8 Finance Street",
        district: "Central",
        city: "Hong Kong",
        postalCode: "N/A",
        phone: "+852 2295 3308",
        email: "qa.hk.central@example.dev",
        fullAddress: {
          zh: "国际金融中心二期, 8 Finance Street, Central, Hong Kong",
          en: "Two International Finance Centre, 8 Finance Street, Central, Hong Kong",
          ja: "Two International Finance Centre, 8 Finance Street, Central, Hong Kong"
        },
        latitude: 22.2854,
        longitude: 114.1589
      },
      {
        id: "hk-wc-hkcec",
        regionCode: "WC",
        venue: { zh: "香港会议展览中心", en: "Hong Kong Convention and Exhibition Centre", ja: "Hong Kong Convention and Exhibition Centre" },
        recipient: { zh: "业务测试", en: "Business Test", ja: "業務テスト" },
        street: "1 Expo Drive",
        district: "Wan Chai",
        city: "Hong Kong",
        postalCode: "N/A",
        phone: "+852 2582 8888",
        email: "ops.hk.wanchai@example.dev",
        fullAddress: {
          zh: "香港会议展览中心, 1 Expo Drive, Wan Chai, Hong Kong",
          en: "Hong Kong Convention and Exhibition Centre, 1 Expo Drive, Wan Chai, Hong Kong",
          ja: "Hong Kong Convention and Exhibition Centre, 1 Expo Drive, Wan Chai, Hong Kong"
        },
        latitude: 22.2827,
        longitude: 114.1747
      },
      {
        id: "hk-ytm-westk",
        regionCode: "YTM",
        venue: { zh: "西九文化区", en: "West Kowloon Cultural District", ja: "West Kowloon Cultural District" },
        recipient: { zh: "演示账户", en: "Demo Account", ja: "デモアカウント" },
        street: "Museum Drive",
        district: "West Kowloon",
        city: "Hong Kong",
        postalCode: "N/A",
        phone: "+852 2200 0022",
        email: "demo.hk.ytm@example.dev",
        fullAddress: {
          zh: "西九文化区, Museum Drive, West Kowloon, Hong Kong",
          en: "West Kowloon Cultural District, Museum Drive, West Kowloon, Hong Kong",
          ja: "West Kowloon Cultural District, Museum Drive, West Kowloon, Hong Kong"
        },
        latitude: 22.3037,
        longitude: 114.1593
      },
      {
        id: "hk-st-shatin",
        regionCode: "ST",
        venue: { zh: "香港文化博物馆", en: "Hong Kong Heritage Museum", ja: "Hong Kong Heritage Museum" },
        recipient: { zh: "本地化测试", en: "Localization Test", ja: "ローカライズテスト" },
        street: "1 Man Lam Road",
        district: "Sha Tin",
        city: "Hong Kong",
        postalCode: "N/A",
        phone: "+852 2180 8188",
        email: "locale.hk.shatin@example.dev",
        fullAddress: {
          zh: "香港文化博物馆, 1 Man Lam Road, Sha Tin, Hong Kong",
          en: "Hong Kong Heritage Museum, 1 Man Lam Road, Sha Tin, Hong Kong",
          ja: "Hong Kong Heritage Museum, 1 Man Lam Road, Sha Tin, Hong Kong"
        },
        latitude: 22.381,
        longitude: 114.1887
      }
    ],
    relatedPosts: ["build-address-generator"]
  }
];

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}

export function getRegionName(country: CountryRecord, regionCode: string, locale: Locale) {
  return country.regions.find((region) => region.code === regionCode)?.name[locale] ?? regionCode;
}
