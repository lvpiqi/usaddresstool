import type { Locale, LocalizedList, LocalizedText } from "./site";

export interface TaxFreeFaqItem {
  question: LocalizedText;
  answer: LocalizedText;
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
): TaxFreeFaqItem => ({
  question: text(zhQuestion, enQuestion, jaQuestion),
  answer: text(zhAnswer, enAnswer, jaAnswer)
});

export const taxFreePage = {
  title: text(
    "美国免税州地址生成器",
    "US Tax-Free State Address Generator",
    "アメリカ免税州住所ジェネレーター"
  ),
  description: text(
    "生成来自美国 5 个免税州的真实格式地址，适合电商、税务说明、表单测试和演示。",
    "Generate real-format addresses from the 5 US tax-free states for ecommerce, tax explanation pages, form testing, and demos.",
    "アメリカの免税州 5 州から実在形式の住所を生成できます。EC、税務説明、フォーム検証、デモに向いています。"
  ),
  intro: text(
    "这个页面只覆盖美国没有州级销售税的 5 个州：Alaska、Delaware、Montana、New Hampshire、Oregon。",
    "This page focuses only on the 5 US states without statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon.",
    "このページは州レベルの売上税がないアメリカ 5 州、Alaska、Delaware、Montana、New Hampshire、Oregon のみを対象にしています。"
  ),
  badges: list(
    ["5 个免税州", "真实格式地址", "支持复制和分享"],
    ["5 tax-free states", "Real-format addresses", "Copy and share ready"],
    ["免税州 5 州", "実在形式の住所", "コピーと共有に対応"]
  ),
  generatorTitle: text("免税州地址生成器", "Tax-Free State Generator", "免税州住所ジェネレーター"),
  generatorDescription: text(
    "生成来自免税州的真实格式地址，支持州筛选、复制、分享和保存。",
    "Generate real-format addresses from tax-free states with state filters, copy, share, and save support.",
    "免税州の実在形式住所を生成し、州フィルター、コピー、共有、保存に対応します。"
  ),
  generatorRegionLabel: text("免税州筛选", "Tax-free state filter", "免税州フィルター"),
  generatorRegionAll: text("随机全部免税州", "Random all tax-free states", "すべての免税州からランダム"),
  generatorButton: text("生成免税州地址", "Generate tax-free address", "免税州住所を生成"),
  generatorResultTitle: text("当前免税州结果", "Current tax-free result", "現在の免税州結果"),
  generatorEmptyHint: text(
    "选择上方免税州后点击生成，结果会显示在这里。",
    "Choose a tax-free state above and click generate. The result will appear here.",
    "上の免税州を選んで生成すると、ここに結果が表示されます。"
  ),
  stats: [
    {
      label: text("州数量", "States covered", "対象州数"),
      value: "5",
      description: text(
        "只覆盖没有州级销售税的 5 个州。",
        "Focused on the 5 states without statewide sales tax.",
        "州レベルの売上税がない 5 州に絞っています。"
      )
    },
    {
      label: text("输出结构", "Output model", "出力モデル"),
      value: "State pool",
      description: text(
        "每个州都有单独的地址池和电话规则。",
        "Each state has its own address pool and phone rules.",
        "各州ごとに住所プールと電話番号ルールを分けています。"
      )
    },
    {
      label: text("适用重点", "Best fit", "向いている用途"),
      value: "Ecommerce",
      description: text(
        "适合跨境电商、税务说明和表单演示。",
        "Useful for ecommerce, tax explanation pages, and form demos.",
        "EC、税務説明ページ、フォームデモに向いています。"
      )
    }
  ],
  sectionTitleStates: text("包含的免税州", "Included tax-free states", "対象の免税州"),
  stateNotes: list(
    ["Alaska", "Delaware", "Montana", "New Hampshire", "Oregon"],
    ["Alaska", "Delaware", "Montana", "New Hampshire", "Oregon"],
    ["Alaska", "Delaware", "Montana", "New Hampshire", "Oregon"]
  ),
  usageTitle: text("适用场景", "Best-fit use cases", "向いている使い方"),
  useCases: list(
    ["跨境电商和税务说明页演示", "结账页和地址表单的免税州测试", "对比普通美国地址与免税州地址场景"],
    ["Address examples for ecommerce and tax explanation pages", "Checkout and address-form testing for tax-free states", "Comparing regular US and tax-free-state address scenarios"],
    ["EC と税務説明ページ向けの住所例", "免税州向けチェックアウトと住所フォームの検証", "通常のアメリカ住所と免税州住所の比較"]
  ),
  faqTitle: text("免税州页面 FAQ", "Tax-Free Page FAQ", "免税州ページ FAQ"),
  faq: [
    faq(
      "这个页面包含全部美国免税州吗？",
      "是的，这里只聚焦 5 个没有州级销售税的州：Alaska、Delaware、Montana、New Hampshire、Oregon。",
      "Does this page include every US state with no statewide sales tax?",
      "Yes. It focuses on the 5 states with no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon.",
      "このページは州レベルの売上税がない州をすべて含みますか？",
      "はい。州レベルの売上税がない 5 州、Alaska、Delaware、Montana、New Hampshire、Oregon に絞っています。"
    ),
    faq(
      "免税州页和普通美国页有什么区别？",
      "普通美国页覆盖 50 州，免税州页只聚焦没有州级销售税的 5 个州，因此更适合税务或电商相关场景。",
      "What is the difference between this page and the regular US page?",
      "The regular US page covers all 50 states, while this page focuses only on the 5 states without statewide sales tax.",
      "通常のアメリカページとこのページの違いは何ですか？",
      "通常のアメリカページは 50 州を扱いますが、このページは州レベルの売上税がない 5 州だけに絞っています。"
    ),
    faq(
      "这些结果更适合什么用途？",
      "更适合电商演示、税务说明、表单测试和多州地址对比，而不是作为真实投递保证数据。",
      "What are these results best suited for?",
      "They are best for ecommerce demos, tax explanation pages, form testing, and multi-state address comparison rather than guaranteed delivery use.",
      "この結果はどんな用途に向いていますか？",
      "EC デモ、税務説明、フォーム検証、州比較に向いており、配送保証用データの代わりにはなりません。"
    )
  ] as TaxFreeFaqItem[]
};

export function getTaxFreeGeneratorLabels(locale: Locale) {
  return {
    title: taxFreePage.generatorTitle[locale],
    description: taxFreePage.generatorDescription[locale],
    regionLabel: taxFreePage.generatorRegionLabel[locale],
    regionAll: taxFreePage.generatorRegionAll[locale],
    generate: taxFreePage.generatorButton[locale],
    resultTitle: taxFreePage.generatorResultTitle[locale],
    emptyHint: taxFreePage.generatorEmptyHint[locale]
  };
}
