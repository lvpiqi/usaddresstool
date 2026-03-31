import type { CountryRecord, FaqRecord } from "./countries";
import type { LocalizedList, LocalizedText } from "./site";

type CountryPageContent = Pick<
  CountryRecord,
  | "directoryExcerpt"
  | "heading"
  | "metaDescription"
  | "heroIntro"
  | "toolSummary"
  | "regionLabel"
  | "formatRules"
  | "regionNotes"
  | "useCases"
  | "sampleAddress"
  | "faq"
  | "stats"
  | "relatedPosts"
>;

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

const stat = (
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

const contentBySlug: Record<string, CountryPageContent> = {
  us: {
    directoryExcerpt: text(
      "按州筛选并生成美国真实格式地址，适合 QA、表单测试和本地化演示。",
      "Generate US addresses with state filtering for QA, form testing, and localization demos.",
      "州で絞り込みながら、アメリカ住所を QA、フォーム検証、ローカライズ確認に使えます。"
    ),
    heading: text("美国地址生成器", "US Address Generator", "アメリカ住所ジェネレーター"),
    metaDescription: text(
      "按州生成可复制、可分享、可保存的美国真实格式地址，适合 QA、表单测试和本地化演示。",
      "Generate copyable and shareable US addresses with state filters for QA, form testing, and localization demos.",
      "州フィルター付きでアメリカ住所を生成し、QA、フォーム検証、ローカライズ確認に使えます。"
    ),
    heroIntro: text(
      "选择州后生成包含姓名、电话、街道、城市、州和 ZIP Code 的美国地址。",
      "Choose a state to generate a US address with name, phone, street, city, state, and ZIP code fields.",
      "州を選ぶと、氏名、電話番号、通り、都市、州、ZIP Code を含むアメリカ住所を生成できます。"
    ),
    toolSummary: text(
      "美国地址的核心是州筛选、ZIP Code 和完整地址输出。页面要让用户一眼看懂地址顺序和州级差异，而不是堆砌关键词。",
      "The core of a US page is state filtering, ZIP codes, and clear full-address output. Visitors should understand the format and state-level differences immediately.",
      "アメリカページで重要なのは州フィルター、ZIP Code、完全な住所出力です。キーワードを並べるより、住所順序と州ごとの差がすぐ伝わることが大切です。"
    ),
    regionLabel: text("州", "State", "州"),
    formatRules: list(
      [
        "常见顺序是门牌号 + 街道名 + 城市 + 州缩写 + ZIP Code。",
        "州字段通常使用两位大写缩写，例如 CA、NY、TX。",
        "ZIP Code 一般是 5 位数字，也可能扩展为 ZIP+4。"
      ],
      [
        "The common order is house number, street, city, state abbreviation, and ZIP code.",
        "State fields usually use two-letter uppercase abbreviations such as CA, NY, or TX.",
        "ZIP codes are normally 5 digits, with an optional ZIP+4 extension."
      ],
      [
        "一般的な順序は番地、通り、都市、州略称、ZIP Code です。",
        "州は CA、NY、TX のような 2 文字の大文字略称で入力されることが多いです。",
        "ZIP Code は通常 5 桁で、ZIP+4 が付く場合もあります。"
      ]
    ),
    regionNotes: list(
      [
        "首页默认承接美国地址需求，重点是州筛选和结果可复制。",
        "同州内也应该有足够多的地址轮换，避免用户连续点击时重复太快。",
        "如果后续继续扩充数据，建议按州维护地址池和电话区号池。"
      ],
      [
        "The home page targets US address intent, so state filtering and copyable output matter most.",
        "Each state should still have enough variety so repeated clicks do not feel repetitive too quickly.",
        "If you expand later, keep both address pools and phone rules organized by state."
      ],
      [
        "ホームではアメリカ住所の意図を受けるため、州フィルターとコピーしやすい結果が特に重要です。",
        "同じ州でも連続クリック時にすぐ重複しないよう、十分な住所バリエーションが必要です。",
        "今後拡張する場合も、住所プールと電話番号ルールを州単位で管理すると扱いやすくなります。"
      ]
    ),
    useCases: list(
      ["结账页和地址表单联调", "CRM、ERP、客服系统演示数据", "多语言地址字段布局测试"],
      ["Checkout and address-form testing", "Demo data for CRM, ERP, and support tools", "Multilingual address-field layout testing"],
      ["チェックアウトや住所フォームの検証", "CRM、ERP、サポート画面のデモデータ", "多言語住所項目レイアウトの確認"]
    ),
    sampleAddress: list(
      ["Apple Park Visitor Center", "10600 N Tantau Ave", "Cupertino, CA 95014", "United States"],
      ["Apple Park Visitor Center", "10600 N Tantau Ave", "Cupertino, CA 95014", "United States"],
      ["Apple Park Visitor Center", "10600 N Tantau Ave", "Cupertino, CA 95014", "United States"]
    ),
    faq: [
      faq(
        "可以固定某个州来生成吗？",
        "可以。先选择州，再点击生成，工具就会只从该州的地址池返回结果。",
        "Can I lock the generator to one state?",
        "Yes. Pick a state first and the tool will only return results from that state pool.",
        "州を固定して生成できますか？",
        "はい。先に州を選ぶと、その州の住所プールからのみ結果を返します。"
      ),
      faq(
        "为什么美国页一定要显示 ZIP Code？",
        "因为 ZIP Code 是用户识别美国地址结构最直观的字段之一，也是很多表单校验的关键项。",
        "Why should a US page always show ZIP codes?",
        "ZIP codes are one of the clearest recognition cues in US addresses and are often required by form validation.",
        "なぜアメリカページでは ZIP Code を見せるべきですか？",
        "ZIP Code はアメリカ住所らしさを最も伝えやすい項目のひとつで、フォーム検証でも重要だからです。"
      ),
      faq(
        "这些结果适合做什么？",
        "更适合 QA、演示、格式测试和本地化，不建议把结果当成投递保证地址库。",
        "What is this generator best suited for?",
        "It works best for QA, demos, format testing, and localization rather than as a guaranteed delivery dataset.",
        "この結果はどんな用途に向いていますか？",
        "QA、デモ、形式テスト、ローカライズ確認に向いており、配送保証用データの代わりにはなりません。"
      )
    ],
    stats: [
      stat("州筛选", "State filter", "州フィルター", "50", "支持 50 个州筛选。", "All 50 states are available in the filter.", "50 州をそのまま絞り込めます。"),
      stat("关键字段", "Key field", "重要項目", "ZIP Code", "ZIP Code 是美国地址最核心的识别项之一。", "ZIP codes are one of the most important recognition fields on US pages.", "ZIP Code はアメリカ住所で特に重要な識別項目です。"),
      stat("输出方式", "Output style", "出力形式", "Structured", "同时输出拆分字段和完整地址。", "The tool returns both structured fields and a full address.", "分割された項目と完全な住所を同時に返します。")
    ],
    relatedPosts: ["us-address-format", "zip-vs-postal-code"]
  },
  hk: {
    directoryExcerpt: text(
      "支持地区筛选和中英双语展示的香港地址生成器，适合测试 district 字段和无邮编表单。",
      "A Hong Kong address generator with district filters and bilingual output for testing district fields and no-postcode forms.",
      "地区フィルターと中英バイリンガル表示に対応した香港住所ジェネレーターです。district 項目や郵便番号なしフォームの検証に向いています。"
    ),
    heading: text("香港地址生成器", "Hong Kong Address Generator", "香港住所ジェネレーター"),
    metaDescription: text(
      "按地区生成香港真实格式地址，支持中英显示、复制和分享，适合 QA、表单测试和地址组件设计。",
      "Generate Hong Kong addresses with district filters, bilingual output, copy, and share support for QA, form testing, and address-component design.",
      "地区フィルター付きで香港住所を生成し、中英表示、コピー、共有に対応します。QA、フォーム検証、住所 UI 設計に向いています。"
    ),
    heroIntro: text(
      "先选地区，再生成包含街道、地区、电话和完整地址的香港结果，适合测试双语地址展示。",
      "Pick a district to generate a Hong Kong result with street, district, phone, and a formatted full address.",
      "地区を選ぶと、通り、地区、電話番号、完全な住所を含む香港の結果を生成できます。"
    ),
    toolSummary: text(
      "香港地址的重点是楼宇名、街道、地区和中英切换。很多国际表单不会要求正式邮编，因此 N/A 处理很常见。",
      "Hong Kong addresses are mostly about building names, streets, districts, and bilingual display. Many international forms do not require a formal postal code, so N/A handling is common.",
      "香港住所ではビル名、通り、地区、中英の表示切り替えが重要です。正式な郵便番号を求めない国際フォームも多く、N/A の扱いがよく使われます。"
    ),
    regionLabel: text("地区", "District", "地区"),
    formatRules: list(
      [
        "香港地址通常包含楼宇名、街道、地区，以及 Hong Kong。",
        "中文和英文界面里，同一地址的显示顺序可能不同。",
        "香港通常不使用正式邮编，很多表单会留空或使用 N/A。"
      ],
      [
        "Hong Kong addresses often include the building name, street, district, and Hong Kong.",
        "The same address may be displayed in a different order in Chinese and English interfaces.",
        "Hong Kong generally does not use a formal postal code, so many forms leave it blank or use N/A."
      ],
      [
        "香港住所にはビル名、通り、地区、Hong Kong が含まれることが多いです。",
        "同じ住所でも中国語 UI と英語 UI で表示順が変わることがあります。",
        "香港では正式な郵便番号を使わないことが多く、フォームでは空欄や N/A が一般的です。"
      ]
    ),
    regionNotes: list(
      [
        "当前提供中西区、湾仔、油尖旺和沙田四个地区筛选。",
        "双语地址输出比静态示例更适合测试地址组件。",
        "如果后续扩展更多地区，也要保证每个地区页有独立说明内容。"
      ],
      [
        "The current release covers Central and Western, Wan Chai, Yau Tsim Mong, and Sha Tin.",
        "Bilingual output is much more useful than a static sample when testing address components.",
        "If more districts are added later, each page should still carry its own explanatory content."
      ],
      [
        "現在は中西区、湾仔区、油尖旺区、沙田区を選べます。",
        "バイリンガル出力があることで、静的な住所例より住所コンポーネント検証に向いています。",
        "将来さらに地区ページを増やす場合も、各ページに固有の説明を入れるべきです。"
      ]
    ),
    useCases: list(
      ["中英双语地址表单测试", "需要 district 字段的国际化地址组件", "香港站与国际站的地址展示对照"],
      ["Bilingual address-form testing", "International address components that require a district field", "Comparing Hong Kong and global address display patterns"],
      ["中国語・英語の住所フォーム検証", "district 項目を持つ国際住所コンポーネント", "香港向け表示とグローバル表示の比較"]
    ),
    sampleAddress: list(
      ["Two International Finance Centre", "8 Finance Street", "Central, Hong Kong"],
      ["Two International Finance Centre", "8 Finance Street", "Central, Hong Kong"],
      ["Two International Finance Centre", "8 Finance Street", "Central, Hong Kong"]
    ),
    faq: [
      faq(
        "香港地址一定有邮编吗？",
        "不一定。很多香港地址不会使用正式邮编，国际表单里经常留空或填 N/A。",
        "Do Hong Kong addresses always need a postal code?",
        "No. Many Hong Kong addresses do not use a formal postal code, so forms often leave it blank or use N/A.",
        "香港住所には必ず郵便番号がありますか？",
        "いいえ。香港では正式な郵便番号を使わないことが多く、フォームでは空欄や N/A が一般的です。"
      ),
      faq(
        "为什么香港页要做中英两种显示？",
        "因为香港地址在中文和英文环境中的书写顺序和展示习惯不同，双语输出更适合测试表单和 UI。",
        "Why should the Hong Kong page support both Chinese and English display?",
        "Because address order and reading habits differ between Chinese and English contexts, bilingual output is better for UI and form testing.",
        "なぜ香港ページでは中国語表示と英語表示の両方が必要ですか？",
        "中国語環境と英語環境では住所の並び方や読み方が異なるため、UI とフォーム検証では両方の表示が役立ちます。"
      ),
      faq(
        "地区筛选在香港页重要吗？",
        "重要。很多香港地址输入流程会把 district 作为单独字段，地区筛选能更接近真实表单结构。",
        "Is district filtering important on a Hong Kong page?",
        "Yes. Many Hong Kong address flows use district as a separate field, so the filter makes the tool closer to real forms.",
        "香港ページでは地区フィルターが重要ですか？",
        "はい。香港の住所入力では district を独立項目として扱うことが多く、フィルターが実際のフォームに近い体験を作ります。"
      )
    ],
    stats: [
      stat("地区数量", "Districts", "地区数", "4", "支持 4 个常用地区筛选。", "Four practical districts are available in the filter.", "4 つの主要地区を選べます。"),
      stat("地址特点", "Address trait", "住所の特長", "Bilingual", "适合测试中英双语地址展示。", "Good for bilingual Chinese-English address display.", "中国語と英語の住所表示確認に向いています。"),
      stat("邮编", "Postal code", "郵便番号", "N/A", "香港表单通常不依赖正式邮编。", "Hong Kong forms often do not rely on a formal postal code.", "香港のフォームでは正式な郵便番号を使わないことがよくあります。")
    ],
    relatedPosts: ["zip-vs-postal-code"]
  },
  uk: {
    directoryExcerpt: text(
      "按地区生成英国真实格式地址，重点覆盖 postcode、城市和 England / Scotland 等区域差异。",
      "Generate UK addresses with region filters, postcode structure, and differences between England, Scotland, Wales, and Northern Ireland.",
      "postcode の形式と England / Scotland などの地域差を確認できるイギリス住所ジェネレーターです。"
    ),
    heading: text("英国地址生成器", "UK Address Generator", "イギリス住所ジェネレーター"),
    metaDescription: text(
      "按地区生成英国真实格式地址，支持 postcode 展示、复制和分享，适合 QA、表单测试和地址格式演示。",
      "Generate UK addresses with region filters, postcode output, copy, and share support for QA, form testing, and address-format demos.",
      "地域フィルター付きでイギリス住所を生成し、postcode 表示、コピー、共有に対応します。QA、フォーム検証、住所形式の確認に向いています。"
    ),
    heroIntro: text(
      "选择英格兰、苏格兰、威尔士或北爱尔兰后，生成带 postcode 的英国地址结果。",
      "Choose England, Scotland, Wales, or Northern Ireland to generate a UK address with postcode formatting.",
      "イングランド、スコットランド、ウェールズ、北アイルランドを選ぶと、postcode を含むイギリス住所を生成できます。"
    ),
    toolSummary: text(
      "英国地址页面的核心是 postcode、城市和地区层级。county 往往是可选项，但 postcode 几乎总是关键字段。",
      "On UK address pages, the key elements are postcode, city, and region level. County is often optional, but postcode is almost always essential.",
      "イギリス住所ページでは postcode、都市、地域階層が重要です。county は任意でも、postcode はほぼ必須項目です。"
    ),
    regionLabel: text("地区", "Region", "地域"),
    formatRules: list(
      ["英国地址通常由门牌号 / 地点名、街道、城市、postcode 和国家组成。", "Postcode 由字母和数字组合而成，空格位置很重要。", "很多英国表单会把 county 设为可选字段。"],
      ["UK addresses usually contain a house number or place name, street, city, postcode, and country.", "A postcode mixes letters and digits, and the spacing matters.", "Many UK forms keep county optional instead of required."],
      ["イギリス住所は番地または建物名、通り、都市、postcode、国名で構成されることが多いです。", "postcode は英字と数字の組み合わせで、スペース位置も重要です。", "多くのイギリス向けフォームでは county は任意項目です。"]
    ),
    regionNotes: list(
      ["页面按英格兰、苏格兰、威尔士、北爱尔兰做一级筛选。", "同样是英国地址，不同地区的电话区号和城市示例应有差异。", "如果继续扩展城市页，可优先补 London、Manchester、Edinburgh 等高频需求。"],
      ["The first-level filter uses England, Scotland, Wales, and Northern Ireland.", "Even within the UK, phone area codes and city examples should look different by region.", "If you expand into city pages later, London, Manchester, and Edinburgh are strong next targets."],
      ["地域フィルターはイングランド、スコットランド、ウェールズ、北アイルランドの 4 区分です。", "同じイギリス住所でも、地域ごとに電話番号や都市例が違って見えるべきです。", "将来都市ページを増やすなら、London、Manchester、Edinburgh から始めるのが自然です。"]
    ),
    useCases: list(
      ["postcode 字段和格式校验测试", "英国结账页和地址表单演示", "多地区地址格式差异对比"],
      ["Postcode field and validation testing", "UK checkout and address-form demos", "Comparing format differences across UK regions"],
      ["postcode 項目と検証ロジックの確認", "イギリス向けチェックアウトや住所フォームのデモ", "地域ごとの住所形式差分の比較"]
    ),
    sampleAddress: list(
      ["10 Downing Street", "London SW1A 2AA", "United Kingdom"],
      ["10 Downing Street", "London SW1A 2AA", "United Kingdom"],
      ["10 Downing Street", "London SW1A 2AA", "United Kingdom"]
    ),
    faq: [
      faq(
        "英国地址里 postcode 为什么这么重要？",
        "因为 postcode 不只是邮编，它还直接影响表单校验、地址搜索和结果可信度。",
        "Why is postcode so important on UK pages?",
        "Postcode is not just a mailing field. It affects validation, address search, and how credible the result looks.",
        "イギリス住所ではなぜ postcode が重要ですか？",
        "postcode は配送用の項目だけでなく、フォーム検証、住所検索、表示の信頼感にも関わるからです。"
      ),
      faq(
        "英国页应该按城市筛选还是按地区筛选？",
        "第一层更适合按 England、Scotland、Wales、Northern Ireland 做地区筛选，城市可以作为后续扩展层级。",
        "Should a UK page filter by city or by region?",
        "A first-layer filter works better at the England / Scotland / Wales / Northern Ireland level. Cities can be added later.",
        "イギリスページは都市で絞るべきですか、それとも地域ですか？",
        "最初のレイヤーは England / Scotland / Wales / Northern Ireland の地域軸が向いています。都市は後から追加できます。"
      ),
      faq(
        "county 一定要在结果里显示吗？",
        "不一定。很多英国表单更看重城市和 postcode，county 往往不是必填项。",
        "Does every result need to display county?",
        "Not always. Many UK forms care more about city and postcode, and county is often optional.",
        "すべての結果に county を表示する必要がありますか？",
        "必ずしも必要ではありません。多くのフォームでは city と postcode の方が重要で、county は任意です。"
      )
    ],
    stats: [
      stat("地区数量", "Regions", "地域数", "4", "英格兰、苏格兰、威尔士、北爱尔兰可直接筛选。", "England, Scotland, Wales, and Northern Ireland are available as filters.", "イングランド、スコットランド、ウェールズ、北アイルランドを選べます。"),
      stat("关键字段", "Key field", "重要項目", "Postcode", "Postcode 是英国页最核心的展示字段。", "Postcode is the most important field on UK pages.", "postcode はイギリスページで最重要の項目です。"),
      stat("输出特点", "Output trait", "出力の特長", "Region-aware", "不同地区会影响电话和地址展示。", "Region selection changes both phone and address presentation.", "地域選択によって電話番号と住所表示が変わります。")
    ],
    relatedPosts: ["zip-vs-postal-code"]
  },
  jp: {
    directoryExcerpt: text(
      "支持都道府县筛选和日英不同地址顺序的日本地址生成器，适合本地化和表单测试。",
      "A Japan address generator with prefecture filtering and separate Japanese / English address layouts for localization and form testing.",
      "都道府県フィルターと日英で異なる住所順序に対応した、日本向けローカライズ確認に使いやすい住所ジェネレーターです。"
    ),
    heading: text("日本地址生成器", "Japan Address Generator", "日本住所ジェネレーター"),
    metaDescription: text(
      "按都道府县生成日本真实格式地址，支持邮编、地区和完整地址输出，适合 QA、表单测试和本地化演示。",
      "Generate Japan addresses with prefecture filters, postal code output, and formatted full addresses for QA, form testing, and localization demos.",
      "都道府県フィルター付きで日本住所を生成し、郵便番号、地域、完全な住所を出力できます。QA、フォーム検証、ローカライズ確認に向いています。"
    ),
    heroIntro: text(
      "先选都道府县，再生成包含邮编、区、市和街道的日本地址，适合测试日文和英文两种展示顺序。",
      "Pick a prefecture to generate a Japan address with postal code, district, city, and street fields in a Japanese-friendly format.",
      "都道府県を選ぶと、郵便番号、区、市、通りを含む日本住所を生成できます。日本語表示と英語表示の順序差も確認しやすい構成です。"
    ),
    toolSummary: text(
      "日本地址和欧美地址最大的不同在于顺序、都道府县层级，以及丁目番地写法。工具页需要把这些差异直接体现在结果里。",
      "The biggest differences on a Japan page are address order, prefecture hierarchy, and block-number formatting. The result should show those differences clearly.",
      "日本住所ページで特に重要なのは、住所順序、都道府県の階層、丁目・番地の書き方です。生成結果にもその違いをきちんと出す必要があります。"
    ),
    regionLabel: text("都道府县", "Prefecture", "都道府県"),
    formatRules: list(
      ["日本地址常见顺序是邮编、都道府县、市区町村、丁目番地、建筑名。", "日文和英文界面里，同一地址的显示顺序可能不同。", "邮编通常写成 3 位 + 连字符 + 4 位。"],
      ["A common Japanese order is postal code, prefecture, city or ward, block numbers, and building name.", "The same address may appear in a different order in Japanese and English interfaces.", "Postal codes are usually written in a 3-digit + hyphen + 4-digit format."],
      ["日本住所の一般的な順序は、郵便番号、都道府県、市区町村、丁目番地、建物名です。", "同じ住所でも日本語 UI と英語 UI では表示順が変わることがあります。", "郵便番号は通常 3 桁 + ハイフン + 4 桁で表示されます。"]
    ),
    regionNotes: list(
      ["当前覆盖东京、大阪、京都、北海道，足够演示都道府县筛选。", "日本地址结果里不能只剩一行英文，最好同时保留本地写法特征。", "如果继续扩展页面，应优先补充常见都道府县和城市层的格式差异。"],
      ["The current release covers Tokyo, Osaka, Kyoto, and Hokkaido, which is enough for prefecture filtering demos.", "A Japan result should not collapse into a single English line. It should keep recognizable local formatting traits.", "If you expand later, prioritize common prefectures and meaningful city-level differences."],
      ["現在は東京、大阪、京都、北海道をカバーしており、都道府県フィルターの確認には十分です。", "日本住所の結果は英語 1 行だけにせず、日本らしい表記要素を残すべきです。", "将来拡張するなら、主要な都道府県と都市レベルの形式差を優先するとよいです。"]
    ),
    useCases: list(
      ["日文地址顺序与英文地址顺序对照测试", "邮编、都道府县和区字段验证", "面向日本市场的表单和收货页演示"],
      ["Comparing Japanese and English address order", "Validation for postal code, prefecture, and ward fields", "Demo flows for Japan-facing forms and checkout pages"],
      ["日本語順と英語順の住所比較", "郵便番号、都道府県、区項目の検証", "日本向けフォームやチェックアウトのデモ"]
    ),
    sampleAddress: list(
      ["〒131-0045", "东京都墨田区押上1-1-2", "日本"],
      ["1-1-2 Oshiage, Sumida-ku, Tokyo 131-0045, Japan"],
      ["〒131-0045", "東京都墨田区押上1-1-2", "日本"]
    ),
    faq: [
      faq(
        "为什么日本页不能只换一个国家名？",
        "因为日本地址和英文地址在顺序、都道府县层级、丁目番地写法上都有明显差异，需要单独说明。",
        "Why can't the Japan page just swap the country name?",
        "Because Japanese addresses differ from English layouts in ordering, prefecture hierarchy, and block-number notation, so they need their own explanation.",
        "なぜ日本ページは国名を差し替えるだけでは足りませんか？",
        "日本住所は並び順、都道府県の階層、丁目・番地表記が英語圏と大きく異なるため、独自の説明が必要だからです。"
      ),
      faq(
        "日本地址页一定要显示邮编吗？",
        "建议显示。邮编是用户识别日本地址结构最直观的字段之一。",
        "Should a Japan page always show the postal code?",
        "It should if possible. The postal code is one of the clearest cues for recognizing Japanese address structure.",
        "日本住所ページでは郵便番号を表示すべきですか？",
        "できるだけ表示した方がよいです。郵便番号は日本住所らしさを最も伝えやすい項目です。"
      ),
      faq(
        "都道府县筛选有什么价值？",
        "它能让东京、大阪、京都等结果在地址和电话层面都呈现出真实差异，比静态示例更有用。",
        "What is the value of prefecture filtering?",
        "It makes Tokyo, Osaka, Kyoto, and other results feel different in both address structure and phone output.",
        "都道府県フィルターにはどんな価値がありますか？",
        "東京、大阪、京都などの結果に住所構造と電話番号の違いを出せるため、静的な例より実用的です。"
      )
    ],
    stats: [
      stat("覆盖地区", "Prefectures", "対象地域", "4", "支持东京、大阪、京都、北海道。", "Tokyo, Osaka, Kyoto, and Hokkaido are available.", "東京、大阪、京都、北海道を選べます。"),
      stat("关键字段", "Key field", "重要項目", "〒123-4567", "邮编格式是日本页的重要识别点。", "Postal-code formatting is a major recognition cue on Japan pages.", "郵便番号形式は日本ページの重要な識別要素です。"),
      stat("输出特点", "Output trait", "出力の特長", "Order-aware", "结果会保留日本地址的层级和顺序特征。", "The output keeps the hierarchy and order typical of Japanese addresses.", "日本住所らしい階層と順序を保った結果を返します。")
    ],
    relatedPosts: ["japan-address-format", "zip-vs-postal-code"]
  },
  ca: {
    directoryExcerpt: text(
      "支持省份筛选和加拿大邮编格式的地址生成器，适合 QA、表单测试和北美本地化演示。",
      "A Canada address generator with province filters and Canadian postal-code formatting for QA, form testing, and North America localization demos.",
      "州フィルターとカナダの郵便番号形式に対応した住所ジェネレーターで、QA、フォーム検証、北米向けローカライズ確認に向いています。"
    ),
    heading: text("加拿大地址生成器", "Canada Address Generator", "カナダ住所ジェネレーター"),
    metaDescription: text(
      "按省份生成加拿大真实格式地址，支持邮编、复制和分享，适合 QA、表单测试和北美地址展示。",
      "Generate Canada addresses with province filters, postal codes, copy, and share support for QA, form testing, and North America address demos.",
      "州フィルター付きでカナダ住所を生成し、郵便番号、コピー、共有に対応します。QA、フォーム検証、北米住所表示の確認に向いています。"
    ),
    heroIntro: text(
      "选择省份后生成包含街道、城市、省份和邮编的加拿大地址，适合测试北美地址表单。",
      "Choose a province to generate a Canada address with street, city, province, and postal code fields.",
      "州を選ぶと、通り、都市、州、郵便番号を含むカナダ住所を生成できます。北米向けフォーム検証に使いやすい構成です。"
    ),
    toolSummary: text(
      "加拿大地址和美国相近，但邮编格式、省份名称和电话区号规则不同。页面应该把这些差异清楚展示出来。",
      "Canadian addresses look similar to US addresses, but postal-code format, province naming, and phone rules are different. The page should make those differences obvious.",
      "カナダ住所はアメリカ住所に近い一方で、郵便番号形式、州名、電話番号ルールが異なります。ページではその違いを明確に見せる必要があります。"
    ),
    regionLabel: text("省份", "Province", "州"),
    formatRules: list(
      ["加拿大地址通常由门牌号、街道、城市、省份和邮编组成。", "加拿大邮编常见格式是字母数字交替，例如 A1A 1A1。", "省份名称通常使用全称，而不是两位缩写。"],
      ["Canadian addresses typically use house number, street, city, province, and postal code.", "Canadian postal codes usually alternate letters and digits, such as A1A 1A1.", "Province names are commonly written in full rather than as short abbreviations."],
      ["カナダ住所は番地、通り、都市、州、郵便番号で構成されることが多いです。", "カナダの郵便番号は A1A 1A1 のように英字と数字が交互に並ぶ形式が一般的です。", "州名は 2 文字略称より正式名称で表示されることがよくあります。"]
    ),
    regionNotes: list(
      ["当前提供安大略、不列颠哥伦比亚、魁北克、阿尔伯塔四个省份。", "加拿大页最容易被忽略的是邮编格式和省份全称展示。", "如果后续补更多页面，可以优先扩充 Toronto、Vancouver、Montreal 相关数据。"],
      ["The current page covers Ontario, British Columbia, Quebec, and Alberta.", "The details most often missed on Canada pages are postal-code formatting and full province names.", "If you expand later, Toronto, Vancouver, and Montreal are strong next cities to support."],
      ["現在は Ontario、British Columbia、Quebec、Alberta をカバーしています。", "カナダページで見落とされやすいのは、郵便番号形式と州名フル表示です。", "今後拡張するなら、Toronto、Vancouver、Montreal 周辺のデータを優先するとよいです。"]
    ),
    useCases: list(
      ["北美地址表单联调", "邮编格式和省份字段测试", "加拿大地区化演示页面"],
      ["North America form testing", "Postal-code and province-field validation", "Canada-specific address demos"],
      ["北米住所フォームの確認", "郵便番号と州項目の検証", "カナダ向け住所デモ"]
    ),
    sampleAddress: list(
      ["301 Front St W", "Toronto, Ontario M5V 2T6", "Canada"],
      ["301 Front St W", "Toronto, Ontario M5V 2T6", "Canada"],
      ["301 Front St W", "Toronto, Ontario M5V 2T6", "Canada"]
    ),
    faq: [
      faq(
        "加拿大地址页和美国页最大的区别是什么？",
        "最明显的是邮编格式、省份名称展示方式，以及部分电话区号规则。",
        "What is the biggest difference between Canada and US address pages?",
        "The clearest differences are postal-code format, province naming, and some phone-number rules.",
        "カナダ住所ページとアメリカ住所ページの最大の違いは何ですか？",
        "郵便番号形式、州名の見せ方、電話番号ルールの一部が大きく異なります。"
      ),
      faq(
        "加拿大页应该展示省份全称吗？",
        "建议展示全称。对很多用户来说，Ontario、Quebec 这类完整名称比缩写更直观。",
        "Should the Canada page show full province names?",
        "Yes. Full names such as Ontario and Quebec are easier for many users to understand than abbreviations.",
        "カナダページでは州名を正式名称で表示すべきですか？",
        "はい。Ontario や Quebec のような正式名称の方が、多くの利用者にはわかりやすいです。"
      ),
      faq(
        "加拿大邮编格式必须保留空格吗？",
        "建议保留。字母数字之间的分组能帮助用户快速判断是不是加拿大格式。",
        "Should Canadian postal codes keep the internal space?",
        "Yes. The grouped format helps users recognize the code as Canadian at a glance.",
        "カナダの郵便番号では中央のスペースを残すべきですか？",
        "はい。区切りがある方がカナダ形式だとすぐに判断しやすくなります。"
      )
    ],
    stats: [
      stat("省份数量", "Provinces", "州数", "4", "支持 4 个常用省份筛选。", "Four practical provinces are available.", "4 つの主要州を選べます。"),
      stat("关键字段", "Key field", "重要項目", "A1A 1A1", "加拿大邮编格式非常有辨识度。", "Canadian postal-code formatting is highly distinctive.", "カナダの郵便番号形式は識別しやすい特徴です。"),
      stat("输出特点", "Output trait", "出力の特長", "Province-aware", "结果会区分省份和电话区号。", "Results vary by province and phone area code.", "州ごとに住所と電話番号の見え方が変わります。")
    ],
    relatedPosts: ["zip-vs-postal-code"]
  },
  in: {
    directoryExcerpt: text(
      "支持邦级筛选和 PIN Code 展示的印度地址生成器，适合 QA、本地化和复杂地址表单测试。",
      "An India address generator with state filters and PIN code output for QA, localization, and complex address-form testing.",
      "州フィルターと PIN Code 表示に対応したインド住所ジェネレーターで、QA、ローカライズ、複雑な住所フォームの検証に向いています。"
    ),
    heading: text("印度地址生成器", "India Address Generator", "インド住所ジェネレーター"),
    metaDescription: text(
      "按邦级地区生成印度真实格式地址，支持 PIN Code、电话和完整地址输出，适合 QA、表单测试和本地化演示。",
      "Generate India addresses with state filters, PIN code output, phone, and full-address formatting for QA, form testing, and localization demos.",
      "州フィルター付きでインド住所を生成し、PIN Code、電話番号、完全な住所を出力できます。QA、フォーム検証、ローカライズ確認に向いています。"
    ),
    heroIntro: text(
      "选择邦或地区后生成包含 locality、城市、邦和 PIN Code 的印度地址结果。",
      "Pick a state or region to generate an India address with locality, city, state, and PIN code fields.",
      "州や地域を選ぶと、locality、都市、州、PIN Code を含むインド住所を生成できます。"
    ),
    toolSummary: text(
      "印度地址常见的难点是 locality、city、state 和 PIN Code 的层级关系。工具页应该把这些字段拆清楚，而不是只输出一行完整地址。",
      "The most common challenge on India pages is the relationship between locality, city, state, and PIN code. The page should make those fields explicit instead of showing only one long line.",
      "インド住所で難しいのは locality、city、state、PIN Code の階層関係です。長い 1 行だけでなく、項目を分けて見せることが重要です。"
    ),
    regionLabel: text("邦 / 地区", "State / region", "州 / 地域"),
    formatRules: list(
      ["印度地址通常包含街道或 locality、城市、邦和 6 位 PIN Code。", "不同城市会更依赖 locality 或 landmark 来帮助识别地址。", "PIN Code 是印度地址里最重要的标准化字段之一。"],
      ["Indian addresses often include street or locality, city, state, and a 6-digit PIN code.", "Many cities rely heavily on locality or landmark details to make an address recognizable.", "The PIN code is one of the most important standardized fields in Indian addresses."],
      ["インド住所には通りまたは locality、都市、州、6 桁の PIN Code が含まれることが多いです。", "都市によっては locality や landmark が住所認識に大きく関わります。", "PIN Code はインド住所で最も重要な標準化項目のひとつです。"]
    ),
    regionNotes: list(
      ["页面当前覆盖马哈拉施特拉、德里、卡纳塔克、西孟加拉、特伦甘纳。", "印度页不要只保留 city 字段，locality 和 PIN Code 同样重要。", "如果继续扩展，可优先补 Mumbai、Delhi、Bengaluru 等高频城市。"],
      ["The page currently covers Maharashtra, Delhi, Karnataka, West Bengal, and Telangana.", "An India page should not reduce everything to just city. Locality and PIN code matter too.", "If you expand later, Mumbai, Delhi, and Bengaluru are good next cities to deepen."],
      ["現在は Maharashtra、Delhi、Karnataka、West Bengal、Telangana をカバーしています。", "インドページでは city だけでなく locality と PIN Code も重要です。", "将来拡張するなら、Mumbai、Delhi、Bengaluru などの主要都市から深掘りするとよいです。"]
    ),
    useCases: list(
      ["复杂地址表单字段验证", "PIN Code 和 locality 展示测试", "面向印度市场的演示数据"],
      ["Validation for complex address-form fields", "PIN code and locality display testing", "Demo data for India-facing products"],
      ["複雑な住所フォーム項目の検証", "PIN Code と locality 表示の確認", "インド市場向け製品のデモデータ"]
    ),
    sampleAddress: list(
      ["Apollo Bandar, Colaba", "Mumbai, Maharashtra 400001", "India"],
      ["Apollo Bandar, Colaba", "Mumbai, Maharashtra 400001", "India"],
      ["Apollo Bandar, Colaba", "Mumbai, Maharashtra 400001", "India"]
    ),
    faq: [
      faq(
        "为什么印度页要单独强调 PIN Code？",
        "因为 6 位 PIN Code 是印度地址里最稳定、最标准化的识别字段之一。",
        "Why should an India page emphasize PIN codes?",
        "The 6-digit PIN code is one of the most stable and standardized address fields in India.",
        "なぜインドページでは PIN Code を強調すべきですか？",
        "6 桁の PIN Code はインド住所で最も安定した標準化項目のひとつだからです。"
      ),
      faq(
        "印度地址页只展示城市够吗？",
        "不够。很多印度地址还依赖 locality、区域名或 landmark 来提高可读性。",
        "Is city alone enough on an India address page?",
        "No. Many Indian addresses also depend on locality, area names, or landmarks to stay readable.",
        "インド住所ページでは city だけで十分ですか？",
        "いいえ。多くのインド住所では locality、エリア名、landmark が読みやすさに重要です。"
      ),
      faq(
        "印度页更适合按州还是按城市筛选？",
        "第一层建议按州或地区筛选，后续再按需求补热门城市页。",
        "Should India pages filter by state or by city first?",
        "Start with state or region filtering, then add city pages later where demand is clear.",
        "インドページは最初に州で絞るべきですか、それとも都市ですか？",
        "まずは州や地域フィルターから始め、需要が見えた都市を後で追加するのが現実的です。"
      )
    ],
    stats: [
      stat("覆盖地区", "States", "対象地域", "5", "支持 5 个常用邦级地区。", "Five practical state-level regions are available.", "5 つの主要州レベル地域を選べます。"),
      stat("关键字段", "Key field", "重要項目", "PIN Code", "6 位 PIN Code 是印度地址的核心字段。", "The 6-digit PIN code is a core field on India pages.", "6 桁の PIN Code はインド住所の中心項目です。"),
      stat("输出特点", "Output trait", "出力の特長", "Locality-aware", "结果会保留 locality 和州级信息。", "Results preserve locality and state-level details.", "結果には locality と州レベル情報を残します。")
    ],
    relatedPosts: ["zip-vs-postal-code"]
  }
};

export function withCountryContent(country: CountryRecord): CountryRecord {
  const override = contentBySlug[country.slug];
  return override ? { ...country, ...override } : country;
}
