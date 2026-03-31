import type { CountryRecord } from "../data/countries";
import type { Locale, LocalizedText } from "../data/site";

interface CountryFaqEntry {
  question: LocalizedText;
  answer: LocalizedText;
}

interface CountrySeoProfile {
  generatorTitle: LocalizedText;
  generatorDescription: LocalizedText;
  formatDescription: LocalizedText;
  faq: CountryFaqEntry[];
}

const text = (zh: string, en: string, ja: string): LocalizedText => ({ zh, en, ja });

const faq = (
  zhQuestion: string,
  zhAnswer: string,
  enQuestion: string,
  enAnswer: string,
  jaQuestion: string,
  jaAnswer: string
): CountryFaqEntry => ({
  question: text(zhQuestion, enQuestion, jaQuestion),
  answer: text(zhAnswer, enAnswer, jaAnswer)
});

const countrySeoProfiles: Record<string, CountrySeoProfile> = {
  us: {
    generatorTitle: text(
      "美国地址生成器",
      "US Address Generator",
      "米国住所ジェネレーター"
    ),
    generatorDescription: text(
      "真实有效美国地址生成器，秒级生成含 ZIP 邮编的美国地址。支持州筛选、复制、保存和分享，适合软件测试、数据库填充与表单验证。",
      "Generate US addresses with state filters and ZIP codes for QA, database seeding, form validation, and demo flows. Copy-ready, shareable, and free to use.",
      "州で絞り込みながら ZIP Code 付きの米国住所を生成できます。QA、フォーム検証、データ投入、デモ向けに使いやすく、コピーと共有にも対応しています。"
    ),
    formatDescription: text(
      "查看美国地址格式、州缩写与 ZIP Code 规则，了解街道、城市、州和邮编的填写顺序，适合表单验证与地址格式研究。",
      "Learn the US address format, including street-city-state order, state abbreviations, and ZIP code rules for validation and address research.",
      "米国住所の形式、州略称、ZIP Code の扱いを確認できます。住所順序の確認やフォーム検証に向いたガイドです。"
    ),
    faq: [
      faq(
        "美国地址结果里最关键的字段是什么？",
        "美国地址最重要的组合通常是街道、城市、州缩写和 ZIP 邮编。做注册页、结账页或数据库填充时，这四个字段通常决定地址是否看起来真实可用。",
        "Which fields matter most in a US address?",
        "Street, city, state abbreviation, and ZIP code are the core US address fields. Those four fields usually decide whether the result looks usable in sign-up, checkout, or seeded test data.",
        "米国住所で特に重要な項目は何ですか？",
        "米国住所では street、city、state 略称、ZIP Code の組み合わせが中心です。登録フォームやチェックアウト画面では、この4項目が自然さを左右します。"
      ),
      faq(
        "为什么美国页要支持按州筛选？",
        "因为美国地址在表单里通常以州为主维度组织，很多测试流程也会指定某个州来验证税费、物流、地区限制或州缩写写法。",
        "Why does the US page need state filtering?",
        "US forms are commonly organized around the state field, and many QA flows need a specific state to test taxes, logistics, regional restrictions, or abbreviation handling.",
        "なぜ米国ページでは州フィルターが重要ですか？",
        "米国の住所入力は州を中心に扱うことが多く、税計算、配送、地域制限、略称表示の確認でも州指定が必要になるためです。"
      ),
      faq(
        "这个美国地址页适合哪些场景？",
        "它更适合软件测试、表单验证、演示账号、数据库样例和地址格式研究。正式业务上线前，仍应接入你自己的地址校验与风控流程。",
        "What is this US address page best suited for?",
        "It is best for software testing, form validation, demo records, seeded datasets, and address-format research. Production use should still rely on your own validation and compliance layer.",
        "この米国住所ページはどんな用途に向いていますか？",
        "ソフトウェアテスト、フォーム検証、デモ用データ、シード投入、住所形式の確認に向いています。本番運用では独自の検証とコンプライアンス対応が必要です。"
      )
    ]
  },
  hk: {
    generatorTitle: text(
      "香港地址生成器，支持地区筛选与街道格式",
      "Hong Kong Address Generator by Region",
      "香港住所ジェネレーター（地域絞り込み）"
    ),
    generatorDescription: text(
      "生成包含地区、街道与楼宇信息的香港地址，适合跨境表单测试、地址字段验证与演示场景，支持复制、保存和分享。",
      "Generate Hong Kong addresses with district, street, and building-style structure for QA, demos, and form validation. Supports region filtering, copy, save, and share.",
      "地区・通り・建物名の構成を含む香港住所を生成できます。フォーム検証、QA、デモ用に使いやすく、地域フィルターとコピー共有に対応しています。"
    ),
    formatDescription: text(
      "查看香港地址格式，重点了解楼宇名、街道顺序与区域写法，适合跨境表单验证与地址格式研究。",
      "Learn the Hong Kong address format with building names, street order, and regional naming for form validation and address research.",
      "香港住所の形式を確認し、建物名、通り順、地域表記を把握できます。フォーム検証や住所研究向けのページです。"
    ),
    faq: [
      faq(
        "香港地址为什么经常带楼宇名称？",
        "因为香港很多地址场景会同时使用楼宇名、街道名和区域名。对跨境表单来说，只显示街道往往还不够，楼宇信息也会影响地址可读性。",
        "Why do Hong Kong addresses often include building names?",
        "Many Hong Kong addresses combine building names, street names, and region names together. For cross-border forms, street-only output often feels incomplete without the building layer.",
        "香港住所に建物名が入ることが多いのはなぜですか？",
        "香港の住所は建物名、通り名、地域名を組み合わせることが多く、通りだけでは不十分に見えるケースが多いからです。"
      ),
      faq(
        "香港页的地区筛选有什么作用？",
        "地区筛选会优先在香港岛、九龙或新界等区域内切换结果，让地址更符合本地分区习惯，也更适合测试区域字段。",
        "What does region filtering do on the Hong Kong page?",
        "The filter rotates results within Hong Kong Island, Kowloon, or the New Territories so the output stays closer to local address organization and region-field testing.",
        "香港ページの地域フィルターにはどんな意味がありますか？",
        "香港島、九龍、新界などの範囲で結果を切り替えることで、現地の住所整理に近い形で地域項目を検証しやすくなります。"
      ),
      faq(
        "香港地址页更适合什么类型的测试？",
        "更适合跨境站点、账单地址表单、区域字段展示和中英文地址结构演示。尤其适合验证楼宇名与街道并存的布局。",
        "What kinds of workflows fit the Hong Kong address page best?",
        "It is a strong fit for cross-border forms, billing-address testing, region display checks, and bilingual address demos, especially when building names and street lines appear together.",
        "香港住所ページはどんな検証に向いていますか？",
        "越境サイトのフォーム、請求先住所、地域表示、日英併記の住所デモに向いています。建物名と通りを同時に扱う確認にも適しています。"
      )
    ]
  },
  uk: {
    generatorTitle: text(
      "英国地址生成器，支持 Postcode 与地区筛选",
      "UK Address Generator with Postcode",
      "英国住所ジェネレーター（postcode対応）"
    ),
    generatorDescription: text(
      "生成带 postcode、地区与街道字段的英国地址，适合注册测试、表单验证、数据库填充与演示，支持复制、保存和分享。",
      "Generate UK addresses with postcode, regional filters, and copy-ready fields for QA, sign-up testing, database seeding, and demos.",
      "postcode と地域フィルターに対応した英国住所を生成できます。登録フォーム検証、QA、データ投入、デモ用途に向いています。"
    ),
    formatDescription: text(
      "查看英国地址格式、postcode 与 post town 规则，了解英国表单常见的地址顺序与字段写法。",
      "Learn the UK address format, including postcode, post town, and field order rules for realistic form validation.",
      "英国住所の形式を確認し、postcode、post town、項目順序のルールを把握できます。実務に近いフォーム検証向けです。"
    ),
    faq: [
      faq(
        "英国地址最重要的识别字段是什么？",
        "英国地址通常更强调 postcode 和 post town。很多表单是否像真实英国地址，往往取决于 postcode 是否自然、区域是否匹配。",
        "What is the key identifying field in a UK address?",
        "UK addresses usually depend heavily on postcode and post town. Whether a result feels realistic often comes down to how natural that postcode-region pairing looks.",
        "英国住所で特に重要な識別項目は何ですか？",
        "英国住所では postcode と post town の重要度が高く、地域との組み合わせが自然かどうかで実在感が大きく変わります。"
      ),
      faq(
        "为什么英国页不能直接照抄美国页逻辑？",
        "因为英国地址并不是以州加 ZIP 的结构为核心，而是更依赖 postcode、区域和本地地址顺序，所以需要独立页面来解释和生成。",
        "Why can't the UK page simply reuse the US address logic?",
        "Because UK addresses are not centered on a state-plus-ZIP model. They lean more on postcode, regional naming, and local address order, so the page needs its own structure.",
        "なぜ英国ページは米国ページのロジックをそのまま使えないのですか？",
        "英国住所は州と ZIP を中心にした形ではなく、postcode、地域名、独自の住所順序に依存するため、専用ページとして分ける必要があります。"
      ),
      faq(
        "英国地址页适合做哪些验证？",
        "更适合注册页、账单地址页、postcode 字段校验、区域筛选测试和英国本地地址格式演示。",
        "What workflows is the UK address page good for?",
        "It is useful for sign-up forms, billing-address flows, postcode validation, regional filter testing, and UK-specific address demos.",
        "英国住所ページはどんな検証に向いていますか？",
        "登録フォーム、請求先住所、postcode 検証、地域フィルターの確認、英国向け住所デモに向いています。"
      )
    ]
  },
  jp: {
    generatorTitle: text(
      "日本地址生成器，支持都道府县与邮编",
      "Japan Address Generator by Prefecture",
      "日本住所ジェネレーター（都道府県対応）"
    ),
    generatorDescription: text(
      "生成带都道府县、城市区划与邮编字段的日本地址，适合表单测试、地址顺序验证、数据库填充与演示。",
      "Generate Japanese addresses by prefecture with postal codes and local address order for QA, demos, data seeding, and form validation.",
      "都道府県で絞り込みながら郵便番号付きの日本住所を生成できます。住所順序の確認、QA、フォーム検証、デモに適しています。"
    ),
    formatDescription: text(
      "查看日本地址格式，重点了解都道府县、邮编和日文/英文地址顺序差异，适合表单验证与地址结构研究。",
      "Learn the Japan address format with prefectures, postal codes, and the order differences between Japanese and English layouts.",
      "日本住所の形式を確認し、都道府県、郵便番号、日英で異なる住所順序を把握できます。フォーム検証や構造確認に向いています。"
    ),
    faq: [
      faq(
        "日本地址为什么需要单独讲地址顺序？",
        "因为日本地址经常从都道府县开始，再到市区町村、街区和建筑，和欧美地址顺序差异很大。做多语言表单时，这一点尤其重要。",
        "Why does Japanese address order need its own explanation?",
        "Japanese addresses often begin with prefecture and then move toward city, ward, block, and building. That order differs a lot from Western forms, especially in multilingual flows.",
        "なぜ日本住所は順序を分けて説明する必要がありますか？",
        "日本住所は都道府県から始まり、市区町村、街区、建物へ進むため、西洋式フォームと順序が大きく異なるからです。"
      ),
      faq(
        "日本页的都道府县筛选适合什么场景？",
        "适合验证都道府县字段、邮编展示、城市区划结构，以及日文地址和英文地址在同一条数据上的展示差异。",
        "What is prefecture filtering useful for on the Japan page?",
        "It helps test prefecture fields, postal-code display, city-or-ward structure, and the different ways the same address may appear in Japanese and English interfaces.",
        "日本ページの都道府県フィルターは何に役立ちますか？",
        "都道府県項目、郵便番号表示、市区町村構造、そして同じ住所の日本語・英語表示差を確認するのに役立ちます。"
      ),
      faq(
        "日本地址页主要适合哪些操作？",
        "更适合本地化表单验证、地址顺序演示、数据库填充和多语言地址格式研究。",
        "What workflows fit the Japan address page best?",
        "It is best for localized form validation, address-order demos, seeded datasets, and multilingual address-format research.",
        "日本住所ページは主にどんな用途に向いていますか？",
        "ローカライズされたフォーム検証、住所順序のデモ、データ投入、多言語の住所形式確認に向いています。"
      )
    ]
  },
  ca: {
    generatorTitle: text(
      "加拿大地址生成器，支持省份与邮编",
      "Canada Address Generator by Province",
      "カナダ住所ジェネレーター（州対応）"
    ),
    generatorDescription: text(
      "生成带省份缩写与 postal code 的加拿大地址，适合地址字段测试、数据库填充、注册流程演示与表单验证。",
      "Generate Canadian addresses by province with postal code output for QA, database seeding, demos, and form validation workflows.",
      "州で絞り込みながら postal code 付きのカナダ住所を生成できます。QA、フォーム検証、デモ、データ投入に使いやすい構成です。"
    ),
    formatDescription: text(
      "查看加拿大地址格式，重点了解省份缩写、postal code 与 unit 顺序，适合表单验证和多国家地址对照。",
      "Learn the Canada address format, including province abbreviations, postal code structure, and unit-order rules.",
      "カナダ住所の形式を確認し、州略称、postal code、unit 順序を把握できます。フォーム検証や国別比較向けです。"
    ),
    faq: [
      faq(
        "加拿大地址和美国地址最容易混淆的地方是什么？",
        "最常见的混淆点是加拿大使用 province 和 postal code，而不是美国式的 state 和 ZIP Code。表单字段名和编码格式都不一样。",
        "What gets confused most often between Canadian and US addresses?",
        "The most common confusion is that Canada uses provinces and postal codes rather than the US state-plus-ZIP pattern. Both the field naming and code format differ.",
        "カナダ住所と米国住所で混同されやすい点は何ですか？",
        "カナダでは state と ZIP ではなく province と postal code を使う点です。項目名もコード形式も異なります。"
      ),
      faq(
        "加拿大页为什么强调省份筛选？",
        "因为加拿大地址在很多业务表单里会先区分 province，再填写城市和 postal code。按省份筛选更接近真实填写路径。",
        "Why is province filtering important on the Canada page?",
        "Many Canadian forms distinguish province first and then expect city and postal code. Province-based filtering is closer to how real entry flows behave.",
        "なぜカナダページでは州フィルターが重要ですか？",
        "多くのカナダ向けフォームでは province を先に扱い、その後に city や postal code を入力するため、実際の入力動線に近いからです。"
      ),
      faq(
        "加拿大地址页适合哪些测试任务？",
        "更适合省份字段验证、postal code 规则检查、注册页演示和数据库样例填充。",
        "What kinds of tests fit the Canada address page?",
        "It is useful for province-field validation, postal-code checks, registration-flow demos, and seeded sample data.",
        "カナダ住所ページはどんな検証に向いていますか？",
        "province 項目の検証、postal code ルールの確認、登録フローのデモ、サンプルデータ投入に向いています。"
      )
    ]
  },
  in: {
    generatorTitle: text(
      "印度地址生成器，支持 PIN Code 与州筛选",
      "India Address Generator with PIN Code",
      "インド住所ジェネレーター（PIN Code対応）"
    ),
    generatorDescription: text(
      "生成带州、district、locality 与 PIN Code 的印度地址，适合本地化表单测试、数据库填充与地址结构演示。",
      "Generate Indian addresses with state filters, district or locality context, and PIN codes for QA, form validation, demos, and seeded test data.",
      "州で絞り込みながら district・locality・PIN Code を含むインド住所を生成できます。ローカル向けフォーム検証や QA に適しています。"
    ),
    formatDescription: text(
      "查看印度地址格式，重点了解州、district、locality 与 PIN Code 的关系，适合本地化表单验证与地址结构研究。",
      "Learn the India address format with state, district, locality, and PIN code relationships for realistic validation and address research.",
      "インド住所の形式を確認し、state、district、locality、PIN Code の関係を把握できます。ローカライズ検証向けです。"
    ),
    faq: [
      faq(
        "印度地址里为什么要同时关注 state、district 和 locality？",
        "因为很多印度地址并不只靠城市和邮编识别，district、locality 或 landmark 往往会决定地址是否符合本地使用习惯。",
        "Why do Indian addresses need state, district, and locality together?",
        "Many Indian addresses are not understood through city and PIN code alone. District, locality, or landmark context often makes the result feel locally realistic.",
        "なぜインド住所では state、district、locality を一緒に見る必要がありますか？",
        "インド住所は city と PIN Code だけでは不十分なことが多く、district や locality の文脈が自然さを大きく左右するためです。"
      ),
      faq(
        "印度页的州筛选适合怎么用？",
        "适合先锁定目标州，再验证 district、locality 和 PIN Code 在该州里的组合方式，这比只随机一条地址更接近真实测试流程。",
        "How should state filtering be used on the India page?",
        "Start with the target state and then validate how district, locality, and PIN code combine within that state. That is usually closer to a real test flow than a fully random result.",
        "インドページの州フィルターはどう使うのが良いですか？",
        "まず対象の州を固定し、その州の中で district、locality、PIN Code の組み合わせを確認する使い方が、実際の QA に近い方法です。"
      ),
      faq(
        "印度地址页主要适合哪些场景？",
        "更适合印度本地化表单、PIN Code 字段校验、注册地址演示和数据库样例填充。",
        "What is the India address page most useful for?",
        "It works well for localized Indian forms, PIN-code validation, registration demos, and sample dataset generation.",
        "インド住所ページはどんな場面で使いやすいですか？",
        "インド向けローカライズフォーム、PIN Code 検証、登録住所のデモ、サンプルデータ作成で使いやすいページです。"
      )
    ]
  }
};

function getFallbackFormatTitle(locale: Locale, country: CountryRecord) {
  return {
    zh: `${country.name.zh}地址格式`,
    en: `${country.name.en} Address Format`,
    ja: `${country.name.ja}の住所形式`
  }[locale];
}

export function getCountryGeneratorSeo(locale: Locale, country: CountryRecord) {
  const profile = countrySeoProfiles[country.slug];

  return {
    title: profile?.generatorTitle[locale] ?? country.heading[locale],
    description: profile?.generatorDescription[locale] ?? country.metaDescription[locale]
  };
}

export function getCountryFormatSeo(locale: Locale, country: CountryRecord) {
  const profile = countrySeoProfiles[country.slug];

  return {
    title: getFallbackFormatTitle(locale, country),
    description:
      profile?.formatDescription[locale] ??
      ({
        zh: `查看${country.name.zh}地址格式、${country.regionLabel.zh}字段写法与邮编规则。`,
        en: `Learn the ${country.name.en} address format, ${country.regionLabel.en.toLowerCase()} naming, and postal rules.`,
        ja: `${country.name.ja}の住所形式、${country.regionLabel.ja}表記、郵便番号ルールを確認できます。`
      }[locale])
  };
}

export function getCountryVisibleFaq(locale: Locale, country: CountryRecord) {
  const profile = countrySeoProfiles[country.slug];

  if (profile) {
    return profile.faq.map((item) => ({
      question: item.question[locale],
      answer: item.answer[locale]
    }));
  }

  return country.faq.map((item) => ({
    question: item.question[locale],
    answer: item.answer[locale]
  }));
}
