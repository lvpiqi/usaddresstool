import type { Locale, LocalizedList, LocalizedText } from "./site";
import { usGeneratedRegions } from "./us-generated";

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

const text = (zh: string, en: string, ja: string): LocalizedText => ({ zh, en, ja });

const list = (zh: string[], en: string[], ja: string[]): LocalizedList => ({
  zh,
  en,
  ja
});

const faq = (
  zhQuestion: string,
  zhAnswer: string,
  enQuestion: string,
  enAnswer: string,
  jaQuestion: string,
  jaAnswer: string
): FaqRecord => ({
  question: text(zhQuestion, enQuestion, jaQuestion),
  answer: text(zhAnswer, enAnswer, jaAnswer)
});

const stats = (
  zhLabel: string,
  enLabel: string,
  jaLabel: string,
  value: string,
  zhDescription: string,
  enDescription: string,
  jaDescription: string
) => ({
  label: text(zhLabel, enLabel, jaLabel),
  value,
  description: text(zhDescription, enDescription, jaDescription)
});

const address = (
  id: string,
  regionCode: string,
  venue: LocalizedText,
  street: string,
  city: string,
  postalCode: string,
  latitude: number,
  longitude: number,
  options?: {
    district?: string;
    phone?: string;
    email?: string;
    fullAddress?: LocalizedText;
  }
): AddressRecord => ({
  id,
  regionCode,
  venue,
  recipient: text("测试收件人", "Test Receiver", "テスト受取人"),
  street,
  district: options?.district,
  city,
  postalCode,
  phone: options?.phone ?? "+1 212-555-0100",
  email: options?.email ?? `${id}@example.dev`,
  fullAddress:
    options?.fullAddress ??
    text(
      `${street}, ${city}, ${postalCode}`,
      `${street}, ${city}, ${postalCode}`,
      `${street}, ${city}, ${postalCode}`
    ),
  latitude,
  longitude
});

const buildFaq = (country: LocalizedText, regionLabel: LocalizedText): FaqRecord[] => [
  faq(
    `${country.zh}页面的结果适合做什么？`,
    `更适合测试、表单验证、演示和地址格式研究。正式业务请接入你自己的地址校验与合规流程。`,
    `What is the ${country.en} page best for?`,
    `It is best for testing, form validation, demos, and address-format research. Production flows should use your own validated data layer.`,
    `${country.ja}ページはどんな用途に向いていますか？`,
    `テスト、フォーム検証、デモ、住所形式の確認に向いています。本番用途では独自の検証とコンプライアンス確認を追加してください。`
  ),
  faq(
    `可以按${regionLabel.zh}筛选吗？`,
    `可以。先选定具体${regionLabel.zh}，再生成结果，工具会优先从对应地区的数据池中抽取。`,
    `Can I filter by ${regionLabel.en.toLowerCase()}?`,
    `Yes. Choose a specific ${regionLabel.en.toLowerCase()} first and the generator will prefer results from that filtered pool.`,
    `${regionLabel.ja}で絞り込めますか？`,
    `はい。先に特定の${regionLabel.ja}を選ぶと、その地域の結果を優先して生成します。`
  ),
  faq(
    "分享和保存是怎么工作的？",
    "保存结果使用浏览器本地存储。分享链接会保留国家、地区和 seed，这样同一个结果可以再次恢复。",
    "How do save and share work?",
    "Saved items use browser storage. Share links keep the country, region, and seed so the same result can be restored.",
    "保存と共有はどう動きますか？",
    "保存した結果はブラウザ内に保持されます。共有リンクには国、地域、seed が入り、同じ結果を再表示できます。"
  )
];

const usRegions: RegionRecord[] = usGeneratedRegions.map((region) => ({
  code: region.code,
  name: text(region.name.en, region.name.en, region.name.en)
}));

const countries: CountryRecord[] = [
  {
    code: "US",
    slug: "us",
    name: text("美国", "United States", "米国"),
    directoryExcerpt: text(
      "首页主国家页，围绕州筛选、ZIP Code 和字段复制展开。",
      "Primary home-page country targeting state filters, ZIP codes, and reusable field output.",
      "トップページの主力国ページで、州フィルター、ZIP Code、項目コピーに焦点を当てています。"
    ),
    heading: text("美国地址生成器", "US Address Generator", "米国住所ジェネレーター"),
    metaDescription: text(
      "按州筛选生成美国地址，支持 ZIP Code、复制、保存和分享，适合测试、表单验证和演示。",
      "Generate US addresses by state with ZIP code, copy, save, and share support for testing, demos, and form validation.",
      "州で絞り込んで US 住所を生成し、ZIP Code、コピー、保存、共有に対応します。"
    ),
    heroIntro: text(
      "首页直接承接美国地址生成需求，支持按州筛选后生成结构化结果。",
      "The home page targets the core US address generator intent and supports state-based filtering before generation.",
      "トップページは US 住所生成ニーズを直接受け、州を選んで結果を生成できます。"
    ),
    toolSummary: text(
      "美国页最适合作为首页，因为搜索意图明确，且州、ZIP Code、地址字段都能自然展开成 SEO 内容。",
      "The US page works well as the home page because the intent is clear and the state-plus-ZIP structure naturally supports SEO content.",
      "US ページは検索意図が明確で、州と ZIP Code を軸に説明を広げやすいため、トップに向いています。"
    ),
    regionLabel: text("州", "State", "州"),
    formatRules: list(
      [
        "常见顺序是门牌号 + 街道、城市、州缩写、ZIP Code。",
        "州字段在多数表单里会使用两位大写缩写，例如 CA、NY、TX。",
        "ZIP Code 通常为 5 位，也可能扩展为 ZIP+4。"
      ],
      [
        "The usual order is house number plus street, city, state abbreviation, and ZIP code.",
        "Most forms expect the state as a two-letter uppercase abbreviation such as CA, NY, or TX.",
        "ZIP codes are usually 5 digits, with ZIP+4 as an optional extension."
      ],
      [
        "一般的な順序は番地と通り名、都市、州略称、ZIP Code です。",
        "多くのフォームでは州は CA、NY、TX のような 2 文字略称で入力されます。",
        "ZIP Code は通常 5 桁で、場合によっては ZIP+4 も使われます。"
      ]
    ),
    regionNotes: list(
      [
        "运行时地址池覆盖 50 个州，适合首页直接做州筛选。",
        "州名称后附简称，便于对照表单下拉框和结账页。",
        "地址池增长时应继续按州分片，便于缓存与增量更新。"
      ],
      [
        "The runtime pool covers all 50 states so the home page can support direct state filtering.",
        "State labels are paired with abbreviations, which matches common checkout and sign-up flows.",
        "As the pool grows, keeping data split by state helps caching and incremental updates."
      ],
      [
        "実行時の住所プールは 50 州をカバーしており、トップページで直接州選択ができます。",
        "州ラベルに略称を添えることで、チェックアウトや登録フォームに合わせやすくなります。",
        "データが増えても州単位で分割しておくと、キャッシュや更新が管理しやすくなります。"
      ]
    ),
    useCases: list(
      [
        "结账页与注册页表单验证",
        "数据库样例填充与演示账号",
        "地址字段排版和复制交互测试"
      ],
      [
        "Checkout and sign-up form validation",
        "Sample records for demos and databases",
        "Field-layout and copy-interaction testing"
      ],
      [
        "チェックアウトや登録フォームの検証",
        "デモ用サンプルレコードやデータ投入",
        "項目レイアウトとコピー操作の確認"
      ]
    ),
    sampleAddress: list(
      [
        "Apple Park Visitor Center",
        "10600 N Tantau Ave",
        "Cupertino, CA 95014",
        "United States"
      ],
      [
        "Apple Park Visitor Center",
        "10600 N Tantau Ave",
        "Cupertino, CA 95014",
        "United States"
      ],
      [
        "Apple Park Visitor Center",
        "10600 N Tantau Ave",
        "Cupertino, CA 95014",
        "United States"
      ]
    ),
    faq: buildFaq(text("美国", "US", "米国"), text("州", "State", "州")),
    stats: [
      stats("覆盖州数", "Regions covered", "対象州数", "50", "首页覆盖美国 50 州。", "The US page covers all 50 states.", "US ページは 50 州をカバーします。"),
      stats("字段输出", "Output mode", "出力形式", "Structured", "结果按字段拆分，复制更顺手。", "Results are split into reusable fields.", "結果は項目ごとに分かれていて再利用しやすいです。"),
      stats("关键词方向", "Keyword angle", "キーワード軸", "US / ZIP", "适合承接 US address generator 与 ZIP Code 相关搜索。", "Good for US address generator and ZIP-related searches.", "US address generator と ZIP Code 系の検索意図に向いています。")
    ],
    regions: usRegions,
    addresses: [
      address(
        "us-ca-apple-park",
        "CA",
        text("Apple Park Visitor Center", "Apple Park Visitor Center", "Apple Park Visitor Center"),
        "10600 N Tantau Ave",
        "Cupertino",
        "95014",
        37.3349,
        -122.009
      ),
      address(
        "us-wa-pike-place",
        "WA",
        text("Pike Place Market", "Pike Place Market", "Pike Place Market"),
        "85 Pike St",
        "Seattle",
        "98101",
        47.6095,
        -122.3425
      ),
      address(
        "us-tx-austin-city-hall",
        "TX",
        text("Austin City Hall", "Austin City Hall", "Austin City Hall"),
        "301 W 2nd St",
        "Austin",
        "78701",
        30.264,
        -97.7474
      ),
      address(
        "us-dc-smithsonian-castle",
        "DC",
        text("Smithsonian Castle", "Smithsonian Castle", "Smithsonian Castle"),
        "1000 Jefferson Dr SW",
        "Washington",
        "20560",
        38.8887,
        -77.026
      )
    ],
    relatedPosts: ["us-address-format", "why-real-address-data", "us-tax-free-states-intro"]
  },
  {
    code: "HK",
    slug: "hk",
    name: text("香港", "Hong Kong", "香港"),
    directoryExcerpt: text(
      "适合展示香港地址里楼宇、街道和区域并存的结构。",
      "Useful for Hong Kong address structure with building names, streets, and area-level filtering.",
      "ビル名、通り名、区域が混在する香港住所の構造確認に向いています。"
    ),
    heading: text("香港地址生成器", "Hong Kong Address Generator", "香港住所ジェネレーター"),
    metaDescription: text(
      "生成香港地址结果，支持区域筛选、复制、保存和分享，适合测试与地址格式研究。",
      "Generate Hong Kong address results with region filtering, copy, save, and share support.",
      "地域フィルター、コピー、保存、共有に対応した香港住所ジェネレーターです。"
    ),
    heroIntro: text(
      "香港地址更强调楼宇名称、街道和区域层级，适合单独做国家页解释。",
      "Hong Kong addresses lean heavily on building names, streets, and region layers, so they deserve a dedicated page.",
      "香港住所はビル名、通り、区域の比重が高く、専用ページで説明する価値があります。"
    ),
    toolSummary: text(
      "香港页适合承接与楼宇地址、街道写法、区域筛选相关的搜索意图。",
      "The Hong Kong page supports queries around building-based addresses, street order, and regional filters.",
      "香港ページはビル住所、通り表記、地域フィルターに関する検索意図を受けやすい構成です。"
    ),
    regionLabel: text("区域", "Region", "地域"),
    formatRules: list(
      [
        "香港地址常会同时出现楼宇名、街道名和区域。",
        "很多英文表单会使用英文街道与区域名称，中文界面则保留中文楼宇语义。",
        "邮编字段通常不是香港地址的重点。"
      ],
      [
        "Hong Kong addresses often combine building names, street names, and regions in one result.",
        "English forms usually prefer English street and district naming, while Chinese pages may preserve building semantics.",
        "Postal code is not usually the primary field in Hong Kong address workflows."
      ],
      [
        "香港住所では、ビル名、通り名、地域名が同時に現れることが多いです。",
        "英語フォームでは英語の通り名や地区名が使われやすく、中国語 UI ではビル名の意味も残ります。",
        "郵便番号は香港住所では中心項目にならないことが多いです。"
      ]
    ),
    regionNotes: list(
      [
        "页面按港岛、九龙、新界做筛选，更符合用户直觉。",
        "楼宇型地址结果更适合字段复制，而不是只显示一整段文本。",
        "如果地址池扩展，建议继续按区域维护来源。"
      ],
      [
        "The page filters by Hong Kong Island, Kowloon, and the New Territories, which matches how users usually browse Hong Kong addresses.",
        "Building-heavy results are easier to use when field-level copy is available.",
        "As the dataset grows, keep entries grouped by region for easier maintenance."
      ],
      [
        "香港島、九龍、新界で絞り込める構造は、香港住所の探し方に自然です。",
        "ビル名を含む結果は、全文より項目単位でコピーできる方が使いやすくなります。",
        "データが増える場合も、地域ごとの管理を続けると運用しやすくなります。"
      ]
    ),
    useCases: list(
      ["跨境站点香港地址字段测试", "楼宇型地址展示演示", "中英双语地址版式验证"],
      ["Hong Kong form-field testing", "Building-oriented address demos", "Bilingual address layout checks"],
      ["香港向けフォーム項目テスト", "ビル中心の住所デモ", "中英併記レイアウト確認"]
    ),
    sampleAddress: list(
      ["International Finance Centre", "8 Finance St", "Central, Hong Kong"],
      ["International Finance Centre", "8 Finance St", "Central, Hong Kong"],
      ["International Finance Centre", "8 Finance St", "Central, Hong Kong"]
    ),
    faq: buildFaq(text("香港", "Hong Kong", "香港"), text("区域", "region", "地域")),
    stats: [
      stats("覆盖区域", "Regions covered", "対象地域", "3", "覆盖港岛、九龙、新界。", "Covers Hong Kong Island, Kowloon, and the New Territories.", "香港島、九龍、新界をカバーします。"),
      stats("结构重点", "Format focus", "形式の焦点", "Building", "楼宇名称与区域层级是主要差异点。", "Building and district structure is the main differentiator.", "ビル名と地域構造が主な違いです。"),
      stats("表单适配", "Form fit", "フォーム適合", "Bilingual", "适合中英双语地址表单测试。", "Useful for bilingual address-form testing.", "中英併記フォームの確認に向いています。")
    ],
    regions: [
      { code: "HKI", name: text("港岛", "Hong Kong Island", "香港島") },
      { code: "KOW", name: text("九龙", "Kowloon", "九龍") },
      { code: "NT", name: text("新界", "New Territories", "新界") }
    ],
    addresses: [
      address(
        "hk-cw-ifc",
        "HKI",
        text("International Finance Centre", "International Finance Centre", "International Finance Centre"),
        "8 Finance St",
        "Hong Kong",
        "000000",
        22.2855,
        114.1581,
        {
          district: "Central",
          phone: "+852 2000 0000"
        }
      ),
      address(
        "hk-tsim-clock",
        "KOW",
        text("Clock Tower", "Clock Tower", "Clock Tower"),
        "10 Salisbury Rd",
        "Hong Kong",
        "000000",
        22.2939,
        114.1694,
        {
          district: "Tsim Sha Tsui",
          phone: "+852 2000 1000"
        }
      ),
      address(
        "hk-tungchung-citygate",
        "NT",
        text("Citygate Outlets", "Citygate Outlets", "Citygate Outlets"),
        "20 Tat Tung Rd",
        "Hong Kong",
        "000000",
        22.2901,
        113.9429,
        {
          district: "Tung Chung",
          phone: "+852 2000 2000"
        }
      )
    ],
    relatedPosts: ["zip-vs-postal-code", "why-real-address-data"]
  },
  {
    code: "UK",
    slug: "uk",
    name: text("英国", "United Kingdom", "英国"),
    directoryExcerpt: text(
      "围绕 postcode、post town 与地区过滤展开的英国地址页。",
      "UK generator page centered on postcode, post town, and regional address differences.",
      "postcode、post town、地域差に焦点を当てた英国住所ページです。"
    ),
    heading: text("英国地址生成器", "UK Address Generator", "英国住所ジェネレーター"),
    metaDescription: text(
      "生成英国地址结果，支持地区筛选、postcode 结构展示、复制与分享。",
      "Generate UK addresses with regional filters, postcode structure, copy, and share support.",
      "地域フィルター、postcode 表示、コピー、共有に対応した英国住所ジェネレーターです。"
    ),
    heroIntro: text(
      "英国地址最核心的识别点通常是 postcode，而不是美国式的州加 ZIP Code。",
      "UK address workflows usually revolve around postcode first, rather than a US-style state plus ZIP structure.",
      "英国住所では、US の州 + ZIP よりも postcode が中心的な識別要素になります。"
    ),
    toolSummary: text(
      "英国页适合承接 postcode、post town、国家地区差异等搜索意图。",
      "The UK page is a good match for postcode, post-town, and regional format queries.",
      "英国ページは postcode、post town、地域差に関する検索意図を受けやすい構成です。"
    ),
    regionLabel: text("地区", "Region", "地域"),
    formatRules: list(
      [
        "英国地址常见元素包括门牌号或楼名、街道、post town 和 postcode。",
        "postcode 在很多表单和物流场景里是最醒目的识别字段。",
        "同一国家内部还会出现 England、Scotland、Wales、Northern Ireland 等地区差异。"
      ],
      [
        "UK addresses often include a house number or building name, street, post town, and postcode.",
        "Postcode is one of the strongest signals in UK forms and delivery-related flows.",
        "Regional differences also appear across England, Scotland, Wales, and Northern Ireland."
      ],
      [
        "英国住所には番地または建物名、通り、post town、postcode がよく含まれます。",
        "postcode は英国のフォームや配送フローで特に重要な識別要素です。",
        "England、Scotland、Wales、Northern Ireland の違いも考慮する必要があります。"
      ]
    ),
    regionNotes: list(
      [
        "页面按英国四大区域分组，方便做地区对比。",
        "postcode 字段应与 street、town 一起展示，便于用户理解结果。",
        "如果后续扩展城市池，建议继续按区域维护。"
      ],
      [
        "The page groups results across the four UK regions for easier comparison.",
        "Postcode should be shown together with street and town to keep the output understandable.",
        "If the city pool grows, keeping it grouped by region will help maintenance."
      ],
      [
        "英国 4 地域で分けることで、地域差を比較しやすくなります。",
        "postcode は street や town と一緒に見せた方が結果を理解しやすくなります。",
        "都市データを増やす場合も、地域単位で管理すると保守しやすくなります。"
      ]
    ),
    useCases: list(
      ["英国注册与配送表单测试", "Postcode 字段演示", "多国家地址页对比"],
      ["UK registration and shipping-form testing", "Postcode field demos", "Cross-country address comparison"],
      ["英国向け登録・配送フォーム検証", "postcode 項目のデモ", "複数国住所ページの比較"]
    ),
    sampleAddress: list(
      ["City Hall", "The Queen's Walk", "London SE1 2AA", "United Kingdom"],
      ["City Hall", "The Queen's Walk", "London SE1 2AA", "United Kingdom"],
      ["City Hall", "The Queen's Walk", "London SE1 2AA", "United Kingdom"]
    ),
    faq: buildFaq(text("英国", "UK", "英国"), text("地区", "region", "地域")),
    stats: [
      stats("覆盖区域", "Regions covered", "対象地域", "4", "覆盖 England、Scotland、Wales、Northern Ireland。", "Covers England, Scotland, Wales, and Northern Ireland.", "England、Scotland、Wales、Northern Ireland をカバーします。"),
      stats("关键词角度", "Keyword angle", "キーワード軸", "Postcode", "更适合 postcode 与 UK address 相关搜索。", "Well aligned with postcode and UK address queries.", "postcode と UK address 系の検索意図に合います。"),
      stats("输出重点", "Output focus", "出力の焦点", "Town + code", "强调 post town 与 postcode 的组合。", "Emphasizes post-town and postcode pairings.", "post town と postcode の組み合わせを重視しています。")
    ],
    regions: [
      { code: "ENG", name: text("英格兰", "England", "England") },
      { code: "SCT", name: text("苏格兰", "Scotland", "Scotland") },
      { code: "WLS", name: text("威尔士", "Wales", "Wales") },
      { code: "NIR", name: text("北爱尔兰", "Northern Ireland", "Northern Ireland") }
    ],
    addresses: [
      address(
        "uk-eng-city-hall",
        "ENG",
        text("City Hall", "City Hall", "City Hall"),
        "The Queen's Walk",
        "London",
        "SE1 2AA",
        51.5045,
        -0.0772,
        { phone: "+44 20 7000 0000" }
      ),
      address(
        "uk-sct-parliament",
        "SCT",
        text("Scottish Parliament", "Scottish Parliament", "Scottish Parliament"),
        "Horse Wynd",
        "Edinburgh",
        "EH99 1SP",
        55.9522,
        -3.1741,
        { phone: "+44 131 300 0000" }
      ),
      address(
        "uk-wls-city-hall",
        "WLS",
        text("Cardiff City Hall", "Cardiff City Hall", "Cardiff City Hall"),
        "Gorsedd Gardens",
        "Cardiff",
        "CF10 3ND",
        51.4839,
        -3.1777,
        { phone: "+44 29 2000 0000" }
      ),
      address(
        "uk-nir-belfast",
        "NIR",
        text("Belfast City Hall", "Belfast City Hall", "Belfast City Hall"),
        "Donegall Square N",
        "Belfast",
        "BT1 5GS",
        54.597,
        -5.93,
        { phone: "+44 28 9000 0000" }
      )
    ],
    relatedPosts: ["uk-address-format-guide", "zip-vs-postal-code"]
  },
  {
    code: "JP",
    slug: "jp",
    name: text("日本", "Japan", "日本"),
    directoryExcerpt: text(
      "强调都道府县、邮编和日文/英文地址顺序差异的日本地址页。",
      "Japan generator page focused on prefectures, postal codes, and order differences between Japanese and English layouts.",
      "都道府県、郵便番号、日本語と英語の住所順序差に焦点を当てた日本ページです。"
    ),
    heading: text("日本地址生成器", "Japan Address Generator", "日本住所ジェネレーター"),
    metaDescription: text(
      "生成日本地址结果，支持都道府县筛选、邮编展示、复制、保存和分享。",
      "Generate Japanese address results with prefecture filtering, postal-code display, copy, save, and share support.",
      "都道府県フィルター、郵便番号表示、コピー、保存、共有に対応した日本住所ジェネレーターです。"
    ),
    heroIntro: text(
      "日本地址和欧美地址顺序差异明显，因此需要独立页面解释写法与字段结构。",
      "Japanese address order differs enough from Western layouts that it deserves its own explanation page.",
      "日本住所は欧米の住所順序と差が大きいため、独立した説明ページが必要です。"
    ),
    toolSummary: text(
      "日本页适合承接都道府县、邮编和日文地址顺序相关搜索。",
      "The Japan page is a good match for prefecture, postal-code, and Japanese-order address queries.",
      "都道府県、郵便番号、日本語順序の住所検索意図に向いています。"
    ),
    regionLabel: text("都道府县", "Prefecture", "都道府県"),
    formatRules: list(
      [
        "日本地址常会从都道府县开始，再到市区町村、街区和建筑。",
        "邮编在日文界面里通常会单独展示。",
        "英文界面往往会把顺序改得更接近国际表单。"
      ],
      [
        "Japanese addresses commonly start with prefecture, then move toward city, ward, block, and building.",
        "Postal code is usually displayed as its own field in Japanese interfaces.",
        "English layouts often reverse the order to fit international forms."
      ],
      [
        "日本住所は都道府県から始まり、市区町村、街区、建物へと続く形が一般的です。",
        "郵便番号は日本語 UI では独立した項目として表示されることが多いです。",
        "英語レイアウトでは国際フォームに合わせて順序が変わることがあります。"
      ]
    ),
    regionNotes: list(
      [
        "页面按都道府县筛选，更符合日本地址理解方式。",
        "相同地址在英文和日文界面里的展示顺序可能不同。",
        "如果后续加入更多城市，应继续保留都道府县层级。"
      ],
      [
        "The page filters by prefecture, which matches how Japanese addresses are usually understood.",
        "The same address may appear in a different order between Japanese and English interfaces.",
        "If more cities are added later, keep the prefecture layer in place."
      ],
      [
        "都道府県で絞り込む構造は、日本住所の理解と相性が良いです。",
        "同じ住所でも、日本語 UI と英語 UI で表示順が変わることがあります。",
        "都市を増やす場合も、都道府県レイヤーを維持すると分かりやすくなります。"
      ]
    ),
    useCases: list(
      ["日本表单和地址输入测试", "多语言地址顺序演示", "邮编字段与地区字段校验"],
      ["Japanese form and address-input testing", "Multilingual address-order demos", "Postal-code and region-field validation"],
      ["日本向けフォームと住所入力テスト", "多言語の住所順序デモ", "郵便番号と地域項目の確認"]
    ),
    sampleAddress: list(
      ["〒131-0045", "東京都墨田区押上1-1-2", "Japan"],
      ["1-1-2 Oshiage, Sumida, Tokyo 131-0045", "Japan"],
      ["〒131-0045", "東京都墨田区押上1-1-2", "Japan"]
    ),
    faq: buildFaq(text("日本", "Japan", "日本"), text("都道府県", "prefecture", "都道府県")),
    stats: [
      stats("覆盖地区", "Regions covered", "対象地域", "4", "覆盖 4 个常用都道府县示例。", "Covers four common prefecture examples.", "4 つの代表的な都道府県をカバーします。"),
      stats("顺序差异", "Order angle", "順序の違い", "JP / EN", "同一地址可在不同语言里用不同顺序展示。", "The same address can be shown in different orders by language.", "同じ住所でも言語によって表示順が変わります。"),
      stats("字段重点", "Field focus", "項目の焦点", "Postal code", "邮编与都道府县是核心识别字段。", "Postal code and prefecture are core fields.", "郵便番号と都道府県が主要な識別項目です。")
    ],
    regions: [
      { code: "TOKYO", name: text("东京都", "Tokyo", "東京都") },
      { code: "OSAKA", name: text("大阪府", "Osaka", "大阪府") },
      { code: "KYOTO", name: text("京都府", "Kyoto", "京都府") },
      { code: "HOKKAIDO", name: text("北海道", "Hokkaido", "北海道") }
    ],
    addresses: [
      address(
        "jp-tokyo-skytree",
        "TOKYO",
        text("东京晴空塔", "Tokyo Skytree", "東京スカイツリー"),
        "1-1-2 Oshiage",
        "Tokyo",
        "131-0045",
        35.7101,
        139.8107,
        {
          district: "Sumida"
        }
      ),
      address(
        "jp-osaka-castle",
        "OSAKA",
        text("大阪城", "Osaka Castle", "大阪城"),
        "1-1 Osakajo",
        "Osaka",
        "540-0002",
        34.6873,
        135.5259,
        {
          district: "Chuo Ward"
        }
      ),
      address(
        "jp-kyoto-station",
        "KYOTO",
        text("京都站", "Kyoto Station", "京都駅"),
        "901 Higashishiokoji Kamadonocho",
        "Kyoto",
        "600-8216",
        34.9855,
        135.7585,
        {
          district: "Shimogyo Ward"
        }
      ),
      address(
        "jp-sapporo-tv-tower",
        "HOKKAIDO",
        text("札幌电视塔", "Sapporo TV Tower", "さっぽろテレビ塔"),
        "1 Odorinishi",
        "Sapporo",
        "060-0042",
        43.0611,
        141.3564,
        {
          district: "Chuo Ward"
        }
      )
    ],
    relatedPosts: ["japan-address-format", "zip-vs-postal-code"]
  },
  {
    code: "CA",
    slug: "ca",
    name: text("加拿大", "Canada", "カナダ"),
    directoryExcerpt: text(
      "围绕 province、postal code 和单位号顺序的加拿大地址页。",
      "Canada page focused on province, postal code, and unit-order conventions.",
      "province、postal code、unit 順序に焦点を当てたカナダ住所ページです。"
    ),
    heading: text("加拿大地址生成器", "Canada Address Generator", "カナダ住所ジェネレーター"),
    metaDescription: text(
      "生成加拿大地址结果，支持省份筛选、postal code 展示、复制、保存和分享。",
      "Generate Canadian address results with province filtering, postal code display, copy, save, and share support.",
      "州フィルター、postal code 表示、コピー、保存、共有に対応したカナダ住所ジェネレーターです。"
    ),
    heroIntro: text(
      "加拿大地址看起来接近美国，但 province 与 postal code 的规则和命名值得单独解释。",
      "Canadian addresses may look US-like at first glance, but province and postal-code behavior deserves its own page.",
      "カナダ住所は US と似て見えても、province と postal code の扱いに独自性があります。"
    ),
    toolSummary: text(
      "加拿大页适合承接 province、postal code、unit number 等搜索词。",
      "The Canada page matches searches around province abbreviations, postal code format, and unit numbers.",
      "province 略称、postal code 形式、unit number に関する検索意図を受けやすいページです。"
    ),
    regionLabel: text("省份", "Province", "州"),
    formatRules: list(
      [
        "加拿大地址常见结构包括 unit、street、city、province 和 postal code。",
        "province 通常使用缩写，例如 ON、BC、QC、AB。",
        "postal code 的读法和美国 ZIP Code 不同。"
      ],
      [
        "Canadian addresses often include unit, street, city, province, and postal code.",
        "Province is usually shown as an abbreviation such as ON, BC, QC, or AB.",
        "Canadian postal codes follow a different format from US ZIP codes."
      ],
      [
        "カナダ住所には unit、street、city、province、postal code が含まれることが多いです。",
        "province は ON、BC、QC、AB のような略称で表示されるのが一般的です。",
        "カナダの postal code は US の ZIP Code と形式が異なります。"
      ]
    ),
    regionNotes: list(
      [
        "省份筛选可以直连加拿大地址的主要填写习惯。",
        "postal code 与 province 一起展示会更易读。",
        "如果后续增加更多城市，建议仍按省维护地址池。"
      ],
      [
        "Province filtering maps well to how Canadian forms are usually filled.",
        "Postal code is easiest to read when shown next to the province context.",
        "If more cities are added, keep the pool organized by province."
      ],
      [
        "province フィルターは、カナダのフォーム入力習慣と相性が良いです。",
        "postal code は province と一緒に見せると理解しやすくなります。",
        "都市を増やす場合も、province 単位で管理すると保守しやすくなります。"
      ]
    ),
    useCases: list(
      ["加拿大地址表单演示", "多国家 postal code 对比", "省份字段和完整地址的复制测试"],
      ["Canadian form demos", "Multi-country postal-code comparison", "Province-field and full-address copy testing"],
      ["カナダ向けフォームデモ", "複数国の postal code 比較", "province 項目と完全住所のコピー確認"]
    ),
    sampleAddress: list(
      ["Toronto City Hall", "100 Queen St W", "Toronto, ON M5H 2N2", "Canada"],
      ["Toronto City Hall", "100 Queen St W", "Toronto, ON M5H 2N2", "Canada"],
      ["Toronto City Hall", "100 Queen St W", "Toronto, ON M5H 2N2", "Canada"]
    ),
    faq: buildFaq(text("加拿大", "Canada", "カナダ"), text("省份", "province", "州")),
    stats: [
      stats("覆盖省份", "Regions covered", "対象州", "4", "覆盖 4 个常用省份示例。", "Covers four common province examples.", "代表的な 4 州をカバーします。"),
      stats("字段重点", "Field focus", "項目の焦点", "Province", "province 与 postal code 是页面核心。", "Province plus postal code is the core pairing here.", "province と postal code の組み合わせが中心です。"),
      stats("搜索方向", "Search angle", "検索軸", "CA / code", "适合加拿大地址与 postal code 相关搜索。", "Good for Canada address and postal-code intent.", "Canada address と postal code 系の検索意図に向いています。")
    ],
    regions: [
      { code: "ON", name: text("安大略省", "Ontario", "Ontario") },
      { code: "BC", name: text("不列颠哥伦比亚省", "British Columbia", "British Columbia") },
      { code: "QC", name: text("魁北克省", "Quebec", "Quebec") },
      { code: "AB", name: text("阿尔伯塔省", "Alberta", "Alberta") }
    ],
    addresses: [
      address(
        "ca-on-city-hall",
        "ON",
        text("多伦多市政厅", "Toronto City Hall", "Toronto City Hall"),
        "100 Queen St W",
        "Toronto",
        "M5H 2N2",
        43.6535,
        -79.3841,
        { phone: "+1 416-200-0000" }
      ),
      address(
        "ca-bc-convention",
        "BC",
        text("温哥华会议中心", "Vancouver Convention Centre", "Vancouver Convention Centre"),
        "1055 Canada Pl",
        "Vancouver",
        "V6C 0C3",
        49.2887,
        -123.1112,
        { phone: "+1 604-200-0000" }
      ),
      address(
        "ca-qc-city-hall",
        "QC",
        text("蒙特利尔市政厅", "Montreal City Hall", "Montreal City Hall"),
        "275 Notre-Dame St E",
        "Montreal",
        "H2Y 1C6",
        45.5086,
        -73.5548,
        { phone: "+1 514-200-0000" }
      ),
      address(
        "ca-ab-library",
        "AB",
        text("卡尔加里中央图书馆", "Calgary Central Library", "Calgary Central Library"),
        "800 3 St SE",
        "Calgary",
        "T2G 2E7",
        51.0459,
        -114.0571,
        { phone: "+1 403-200-0000" }
      )
    ],
    relatedPosts: ["canada-address-format-guide", "zip-vs-postal-code"]
  },
  {
    code: "IN",
    slug: "in",
    name: text("印度", "India", "インド"),
    directoryExcerpt: text(
      "适合解释 PIN Code、state、district 和 locality 关系的印度地址页。",
      "India page focused on PIN code, state, district, and locality structure.",
      "PIN Code、state、district、locality の関係を説明するインド住所ページです。"
    ),
    heading: text("印度地址生成器", "India Address Generator", "インド住所ジェネレーター"),
    metaDescription: text(
      "生成印度地址结果，支持州筛选、PIN Code 展示、复制、保存和分享。",
      "Generate Indian address results with state filtering, PIN code output, copy, save, and share support.",
      "州フィルター、PIN Code 表示、コピー、保存、共有に対応したインド住所ジェネレーターです。"
    ),
    heroIntro: text(
      "印度地址经常同时涉及 state、district、locality 和 PIN Code，需要独立国家页解释结构。",
      "Indian addresses often depend on state, district, locality, and PIN code together, which makes a dedicated page useful.",
      "インド住所では state、district、locality、PIN Code が一緒に意味を持つため、専用ページが役立ちます。"
    ),
    toolSummary: text(
      "印度页适合承接 PIN Code、district、locality 和地址字段结构相关搜索。",
      "The India page is a good fit for PIN code, district, locality, and structure-focused queries.",
      "PIN Code、district、locality、住所構造に関する検索意図に合うページです。"
    ),
    regionLabel: text("州", "State", "州"),
    formatRules: list(
      [
        "印度地址常包含 house/flat number、road、locality、city、district、state 和 PIN Code。",
        "PIN Code 比 postcode 或 ZIP Code 更符合印度本地表达。",
        "locality 与 landmark 在很多表单里都很重要。"
      ],
      [
        "Indian addresses often include house or flat number, road, locality, city, district, state, and PIN code.",
        "PIN code is the more natural local term for India.",
        "Locality and landmark context can matter more than many users expect."
      ],
      [
        "インド住所には house / flat number、road、locality、city、district、state、PIN Code がよく含まれます。",
        "PIN Code は postcode や ZIP Code より自然なローカル表現です。",
        "locality や landmark の情報が重要になる場面も多くあります。"
      ]
    ),
    regionNotes: list(
      [
        "州筛选是印度地址页最直接的入口。",
        "如果页面要更贴近真实表单，应同时展示 locality 或 district 字段。",
        "后续扩展时建议继续按州维护地址池。"
      ],
      [
        "State filtering is the clearest entry point for India-focused pages.",
        "If the page should feel closer to real forms, locality or district should stay visible beside the state.",
        "As the dataset grows, keeping the pool organized by state remains the cleanest approach."
      ],
      [
        "インド向けページでは、州フィルターがもっとも分かりやすい入口です。",
        "実際のフォームに近づけるなら、state と一緒に locality や district も見せる方が自然です。",
        "データが増えても、州単位で管理する形を維持するのが分かりやすいです。"
      ]
    ),
    useCases: list(
      ["印度地址输入表单测试", "PIN Code 与 state 关联验证", "多国家地址格式对比"],
      ["Indian form-field testing", "PIN-code and state association checks", "Cross-country address-format comparison"],
      ["インド向けフォーム項目テスト", "PIN Code と state の対応確認", "複数国の住所形式比較"]
    ),
    sampleAddress: list(
      ["Kartavya Path", "New Delhi, Delhi 110011", "India"],
      ["Kartavya Path", "New Delhi, Delhi 110011", "India"],
      ["Kartavya Path", "New Delhi, Delhi 110011", "India"]
    ),
    faq: buildFaq(text("印度", "India", "インド"), text("州", "state", "州")),
    stats: [
      stats("覆盖州数", "Regions covered", "対象州数", "5", "覆盖 5 个常用州示例。", "Covers five common state examples.", "代表的な 5 州をカバーします。"),
      stats("字段重点", "Field focus", "項目の焦点", "PIN", "PIN Code 与州字段是核心。", "PIN code and state fields are the core signals.", "PIN Code と州項目が中心です。"),
      stats("页面定位", "Page intent", "ページ意図", "Structure", "更适合承接印度地址结构与字段理解需求。", "Best suited for India address-structure and field-understanding intent.", "インド住所の構造理解に向いたページです。")
    ],
    regions: [
      { code: "MH", name: text("马哈拉施特拉邦", "Maharashtra", "Maharashtra") },
      { code: "DL", name: text("德里", "Delhi", "Delhi") },
      { code: "KA", name: text("卡纳塔克邦", "Karnataka", "Karnataka") },
      { code: "WB", name: text("西孟加拉邦", "West Bengal", "West Bengal") },
      { code: "TS", name: text("特伦甘纳邦", "Telangana", "Telangana") }
    ],
    addresses: [
      address(
        "in-mh-pune-university",
        "MH",
        text("浦那大学", "Savitribai Phule Pune University", "Savitribai Phule Pune University"),
        "Ganeshkhind Rd",
        "Pune",
        "411007",
        18.5522,
        73.8243,
        {
          district: "Pune",
          phone: "+91 22 2000 0000"
        }
      ),
      address(
        "in-dl-kartavya-path",
        "DL",
        text("Kartavya Path", "Kartavya Path", "Kartavya Path"),
        "Kartavya Path",
        "New Delhi",
        "110011",
        28.6143,
        77.1997,
        {
          district: "Central Delhi",
          phone: "+91 11 2000 0000"
        }
      ),
      address(
        "in-ka-mg-road",
        "KA",
        text("圣马克路商业区", "MG Road", "MG Road"),
        "Mahatma Gandhi Rd",
        "Bengaluru",
        "560001",
        12.9756,
        77.6066,
        {
          district: "Bengaluru Urban",
          phone: "+91 80 2000 0000"
        }
      ),
      address(
        "in-wb-victoria",
        "WB",
        text("维多利亚纪念堂", "Victoria Memorial", "Victoria Memorial"),
        "Jawaharlal Nehru Rd",
        "Kolkata",
        "700071",
        22.5448,
        88.3426,
        {
          district: "Kolkata",
          phone: "+91 33 2000 0000"
        }
      ),
      address(
        "in-ts-tank-bund",
        "TS",
        text("Tank Bund", "Tank Bund Rd", "Tank Bund Rd"),
        "Tank Bund Rd",
        "Hyderabad",
        "500080",
        17.4239,
        78.4738,
        {
          district: "Hyderabad",
          phone: "+91 40 2000 0000"
        }
      )
    ],
    relatedPosts: ["india-address-format-guide", "why-real-address-data"]
  }
];

export { countries };

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}

export function getRegionName(country: CountryRecord, regionCode: string, locale: Locale) {
  return country.regions.find((region) => region.code === regionCode)?.name[locale] ?? regionCode;
}
