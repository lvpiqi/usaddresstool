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
    "米国免税州住所ジェネレーター"
  ),
  description: text(
    "聚焦 Alaska、Delaware、Montana、New Hampshire、Oregon 这 5 个免税州，适合结账流程、价格展示和州别对比演示。",
    "Focused on Alaska, Delaware, Montana, New Hampshire, and Oregon for checkout, pricing, and state-comparison demos.",
    "Alaska、Delaware、Montana、New Hampshire、Oregon の 5 州に絞った、チェックアウトや価格比較向けの住所ツールです。"
  ),
  intro: text(
    "这个页面只保留美国 5 个没有州级销售税的州，适合做免税州场景的地址演示和表单测试。",
    "This page only keeps the 5 US states without statewide sales tax, which makes tax-free scenarios faster to test.",
    "このページは州レベルの売上税がない 5 州だけを扱うため、免税州シナリオの確認がしやすくなります。"
  ),
  badges: list(
    ["5 个免税州", "免费使用", "真实地址"],
    ["5 tax-free states", "Free to use", "Real addresses"],
    ["5 つの免税州", "無料利用", "実在住所"]
  ),
  generatorTitle: text("免税州地址生成器", "Tax-Free State Generator", "免税州住所ジェネレーター"),
  generatorDescription: text(
    "按免税州筛选并生成地址结果，适合电商演示、价格页和州别对比测试。",
    "Generate address results filtered to tax-free states for ecommerce demos, pricing pages, and comparison flows.",
    "免税州に絞って住所を生成し、EC デモ、価格ページ、州比較フローに使えます。"
  ),
  generatorRegionLabel: text("免税州筛选", "Tax-free state filter", "免税州フィルター"),
  generatorRegionAll: text(
    "随机全部免税州",
    "Random all tax-free states",
    "すべての免税州からランダム"
  ),
  generatorButton: text("生成免税州地址", "Generate tax-free address", "免税州住所を生成"),
  generatorResultTitle: text("当前免税州结果", "Current tax-free result", "現在の免税州結果"),
  generatorEmptyHint: text(
    "先选择免税州，再生成地址。结果会显示在这里。",
    "Choose a tax-free state first, then generate. The result will appear here.",
    "先に免税州を選び、その後に生成すると結果がここに表示されます。"
  ),
  stats: [
    {
      label: text("覆盖州数", "States covered", "対象州数"),
      value: "5",
      description: text(
        "只覆盖 Alaska、Delaware、Montana、New Hampshire、Oregon。",
        "Only the five states without statewide sales tax are included.",
        "州レベルの売上税がない 5 州だけを対象にしています。"
      )
    },
    {
      label: text("筛选意图", "Search intent", "検索意図"),
      value: "Tax-free",
      description: text(
        "比在 50 州里反复切换更直接，更适合免税州对比场景。",
        "Much faster than switching through all 50 states when you only need tax-free samples.",
        "50 州から探し続けるより、免税州比較にすぐ入れます。"
      )
    },
    {
      label: text("适用场景", "Best fit", "向いている用途"),
      value: "Checkout",
      description: text(
        "适合结账页、税费提示、价格展示和演示环境。",
        "Best for checkout, tax-note, pricing, and demo flows.",
        "チェックアウト、税表示、価格比較、デモに向いています。"
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
    [
      "结账页税费对比演示",
      "免税州价格文案和标签测试",
      "电商或 SaaS 表单中的州别分流验证"
    ],
    [
      "Checkout tax comparison demos",
      "Pricing and tax-note UI checks",
      "State-based form and ecommerce flow testing"
    ],
    [
      "チェックアウト時の税比較デモ",
      "価格表示や税注記の UI 確認",
      "州ごとのフォーム分岐テスト"
    ]
  ),
  faqTitle: text("免税州页面 FAQ", "Tax-Free State FAQ", "免税州ページ FAQ"),
  faq: [
    faq(
      "这个页面包含全部免税州吗？",
      "是的，这里聚焦美国 5 个没有州级销售税的州：Alaska、Delaware、Montana、New Hampshire、Oregon。",
      "Does this page cover every state with no statewide sales tax?",
      "Yes. It focuses on Alaska, Delaware, Montana, New Hampshire, and Oregon.",
      "このページは州レベルの売上税がない州をすべて含みますか？",
      "はい。Alaska、Delaware、Montana、New Hampshire、Oregon の 5 州を対象にしています。"
    ),
    faq(
      "它和普通美国页面有什么区别？",
      "普通美国页覆盖全部 50 州，而这个页面只保留免税州，筛选路径更短。",
      "How is it different from the regular US page?",
      "The regular US page covers all 50 states, while this page only keeps the tax-free ones.",
      "通常の US ページとの違いは何ですか？",
      "通常の US ページは 50 州すべてを扱いますが、このページは免税州だけに絞っています。"
    ),
    faq(
      "这些地址更适合什么用途？",
      "更适合结账流程、价格展示、内部演示和州别对比，不适合作为投递保证数据。",
      "What is this page best for?",
      "It is best for checkout flows, pricing demos, and state-based comparisons rather than delivery guarantees.",
      "このページはどんな用途に向いていますか？",
      "チェックアウト、価格デモ、州比較向けであり、配送保証データの代替ではありません。"
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
