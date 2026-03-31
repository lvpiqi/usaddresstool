import type { LocalizedText } from "./site";
import { withBlogContent } from "./blog-content";
import { seoSeriesPosts } from "./blog-seo-series";

export interface BlogSection {
  heading: LocalizedText;
  paragraphs: Record<"zh" | "en" | "ja", string[]>;
  bullets?: Record<"zh" | "en" | "ja", string[]>;
}

export interface BlogRelatedLink {
  label: LocalizedText;
  description: LocalizedText;
  path: LocalizedText;
}

export interface BlogPost {
  slug: string;
  publishedAt: string;
  title: LocalizedText;
  description: LocalizedText;
  sections: BlogSection[];
  relatedLinks?: BlogRelatedLink[];
}

const baseBlogPosts: BlogPost[] = [
  {
    slug: "us-address-format",
    publishedAt: "2026-03-30",
    title: {
      zh: "美国地址格式怎么写：州、城市、ZIP Code 一次讲清楚",
      en: "How to Write a US Address: State, City, and ZIP Code Explained",
      ja: "アメリカ住所の書き方: 州・市・ZIP Code をまとめて解説"
    },
    description: {
      zh: "从街道顺序、州缩写到 ZIP Code，拆解美国地址页该写哪些 SEO 内容。",
      en: "A practical guide to US address order, state abbreviations, and ZIP code formatting for SEO-friendly pages.",
      ja: "通り名の順序、州略称、ZIP Code まで、アメリカ住所ページに必要な SEO コンテンツを解説します。"
    },
    sections: [
      {
        heading: { zh: "标准顺序", en: "The standard order", ja: "標準的な順序" },
        paragraphs: {
          zh: [
            "美国地址最常见的顺序是门牌号加街道名、城市、州缩写、ZIP Code，再加上国家名。用户通常会优先识别州缩写和邮编。",
            "如果你要做生成器页面，最好把这个顺序直接展示在首屏示例里，这样工具页和解释页可以互相加强。"
          ],
          en: [
            "The most common US format is house number plus street, city, state abbreviation, ZIP code, and country. Visitors usually recognize the state code and postal code first.",
            "If you run a generator page, place this order directly in the hero example so the tool and the explanatory content reinforce each other."
          ],
          ja: [
            "アメリカ住所の基本順序は番地と通り、市、州略称、ZIP Code、国名です。訪問者は州略称と郵便番号で形式を認識することが多いです。",
            "ジェネレーターを作るなら、この順序をヒーローの例に出すとツールと解説が相互補完できます。"
          ]
        },
        bullets: {
          zh: ["门牌号在最前", "州尽量用两位缩写", "ZIP Code 通常为 5 位"],
          en: ["House number first", "Use two-letter state abbreviations", "ZIP codes are usually 5 digits"],
          ja: ["番地を先頭に置く", "州は 2 文字略称で表す", "ZIP Code は通常 5 桁"]
        }
      },
      {
        heading: { zh: "为什么美国页适合做首页", en: "Why the US page works as the home page", ja: "なぜアメリカページがトップに向くのか" },
        paragraphs: {
          zh: [
            "US address generator 这类词本身搜索意图很强，用户进入后通常就是想立即生成、复制、查看格式。",
            "首页直接做美国页，可以同时承接主词、州长尾词和 ZIP Code 解释内容。"
          ],
          en: [
            "Queries like US address generator have strong action intent. Visitors usually want to generate, copy, and inspect the format right away.",
            "Using the US page as the home page lets you target the head term, state long-tail terms, and ZIP-code education in one place."
          ],
          ja: [
            "US address generator のような検索は行動意図が強く、訪問者はすぐに生成、コピー、形式確認をしたいことが多いです。",
            "トップページをアメリカ用にすると、主要語句、州のロングテール、ZIP Code の解説を一か所で扱えます。"
          ]
        }
      },
      {
        heading: { zh: "工具页正文应该写什么", en: "What to write below the tool", ja: "ツール下部に何を書くべきか" },
        paragraphs: {
          zh: [
            "不要只放一个按钮。至少要补上州说明、ZIP Code 规则、示例地址和 FAQ，才能避免页面太薄。",
            "如果你用模板批量生成国家页，更要确保每页的格式说明和地区说明是真正换过内容的。"
          ],
          en: [
            "Do not stop at a button. Add state coverage notes, ZIP code rules, sample addresses, and FAQs to avoid thin pages.",
            "If you programmatically create multiple country pages, make sure every page has genuinely different format and region content."
          ],
          ja: [
            "ボタンだけでは不十分です。州の説明、ZIP Code のルール、住所例、FAQ を加えて薄いページを避けましょう。",
            "複数の国ページをテンプレートで作る場合も、形式説明と地域説明は実際に差し替える必要があります。"
          ]
        }
      }
    ]
  },
  {
    slug: "japan-address-format",
    publishedAt: "2026-03-30",
    title: {
      zh: "日本地址格式指南：都道府县、邮编和倒序书写",
      en: "Japan Address Format Guide: Prefectures, Postal Codes, and Reverse Order",
      ja: "日本住所形式ガイド: 都道府県、郵便番号、逆順表記"
    },
    description: {
      zh: "解释日本地址和欧美地址顺序差异，适合给多语言站做本地化说明。",
      en: "Explains how Japanese address order differs from Western layouts and how to localize it on a multilingual site.",
      ja: "日本の住所順が欧米式とどう違うのか、多言語サイトでどうローカライズするかを説明します。"
    },
    sections: [
      {
        heading: { zh: "为什么日本地址需要单独页面", en: "Why Japan deserves its own page", ja: "なぜ日本は独立ページが必要か" },
        paragraphs: {
          zh: [
            "日本地址的顺序和英文地址明显不同，用户经常会搜索 how to write Japanese address 这类问题。",
            "因此日本页不能只换国家名，必须真正解释邮编、都道府县和丁目番地。"
          ],
          en: [
            "Japanese address order differs enough from English formats that users often search for direct writing guidance.",
            "That means the Japan page cannot just swap the country name; it needs genuine notes on postal codes, prefectures, and block numbers."
          ],
          ja: [
            "日本の住所順は英語圏の形式と十分に異なるため、書き方そのものを検索する人が多いです。",
            "そのため、日本ページは国名を差し替えるだけでは不十分で、郵便番号、都道府県、丁目番地を本当に解説する必要があります。"
          ]
        }
      },
      {
        heading: { zh: "双格式输出的价值", en: "The value of dual formatting", ja: "2 種類の表示形式の価値" },
        paragraphs: {
          zh: [
            "同一条地址，在日文界面里更自然的是从大到小书写，在英文界面里则常常倒过来写。",
            "你的生成器如果同时支持这两种显示方式，会比普通静态示例页更有价值。"
          ],
          en: [
            "The same address is typically displayed from large to small in Japanese UIs, but often reversed in English interfaces.",
            "A generator that supports both views becomes much more useful than a static example page."
          ],
          ja: [
            "同じ住所でも、日本語 UI では大きい地域から小さい地域へ、英語 UI では逆順になることがあります。",
            "両方の表示に対応するジェネレーターは、単なる静的サンプルより価値があります。"
          ]
        }
      },
      {
        heading: { zh: "SEO 页面怎么写才不薄", en: "How to avoid thin SEO pages", ja: "薄い SEO ページを避ける方法" },
        paragraphs: {
          zh: [
            "至少包含都道府县选择说明、邮编格式、示例地址、FAQ 和相关文章链接。",
            "如果你只有工具，没有说明文字，Google 很容易把它看成低价值模板页。"
          ],
          en: [
            "At minimum, include prefecture notes, postal-code guidance, example addresses, FAQs, and related article links.",
            "A tool without explanatory copy can easily look like a low-value template page to search engines."
          ],
          ja: [
            "少なくとも都道府県の説明、郵便番号の形式、住所例、FAQ、関連記事リンクを含めましょう。",
            "説明文のないツールだけのページは、検索エンジンから低価値テンプレートに見えやすくなります。"
          ]
        }
      }
    ]
  },
  {
    slug: "zip-vs-postal-code",
    publishedAt: "2026-03-30",
    title: {
      zh: "ZIP Code 和 Postal Code 有什么区别",
      en: "ZIP Code vs Postal Code: What Is the Difference?",
      ja: "ZIP Code と Postal Code の違い"
    },
    description: {
      zh: "这类文章非常适合给多国地址工具站补充信息型流量。",
      en: "This type of article is ideal for adding informational traffic to a multi-country address tool.",
      ja: "このタイプの記事は、多国籍の住所ツールサイトに情報系トラフィックを追加するのに最適です。"
    },
    sections: [
      {
        heading: { zh: "术语上的区别", en: "Terminology differences", ja: "用語の違い" },
        paragraphs: {
          zh: [
            "ZIP Code 通常专指美国邮编，而 postal code 是更通用的国际表述。",
            "在多国工具站里，工具名和字段名最好同时照顾这两种说法。"
          ],
          en: [
            "ZIP Code usually refers specifically to US postal codes, while postal code is the broader international term.",
            "On a multi-country site, your page titles and field labels should account for both phrases."
          ],
          ja: [
            "ZIP Code は主にアメリカの郵便番号を指し、postal code はより国際的な総称です。",
            "多国籍サイトでは、ページタイトルと入力欄ラベルの両方でこの差を意識するとよいです。"
          ]
        }
      },
      {
        heading: { zh: "SEO 上应该怎么布局", en: "How to map the terms for SEO", ja: "SEO での使い分け" },
        paragraphs: {
          zh: [
            "美国页优先写 ZIP Code，英国、加拿大、日本等页面更适合使用 postal code、postcode、邮编等本地化说法。",
            "博客文章负责解释差异，工具页负责承接具体国家搜索意图。"
          ],
          en: [
            "On US pages, prioritize ZIP Code. On UK, Canada, Japan, and other country pages, lean toward postal code, postcode, or localized equivalents.",
            "Use blog posts to explain the differences, while country pages handle the transactional search intent."
          ],
          ja: [
            "アメリカページでは ZIP Code を優先し、イギリス、カナダ、日本などでは postal code、postcode、郵便番号など現地表現を使うのが自然です。",
            "違いの説明はブログ、具体的な検索意図の受け皿は国別ページが担当します。"
          ]
        }
      }
    ]
  },
  {
    slug: "build-address-generator",
    publishedAt: "2026-03-30",
    title: {
      zh: "地址生成器网站怎么做才符合 SEO",
      en: "How to Build an Address Generator Website That Is SEO-Friendly",
      ja: "SEO に強い住所ジェネレーターサイトの作り方"
    },
    description: {
      zh: "从页面结构、程序化内容和合规表述的角度，解释地址工具站的正确做法。",
      en: "A practical walkthrough of page structure, programmatic content, and compliant messaging for address-generator sites.",
      ja: "ページ構造、プログラム的コンテンツ、コンプライアンス表現の観点から住所ツールサイトの作り方を説明します。"
    },
    sections: [
      {
        heading: { zh: "不要只做一个按钮", en: "Do not stop at a single button", ja: "ボタンだけで終わらせない" },
        paragraphs: {
          zh: [
            "真正能拿到 SEO 流量的不是“随机按钮”，而是国家页、格式说明页、博客和 FAQ 的组合。",
            "工具只是核心交互，正文内容才是让页面被理解和收录的基础。"
          ],
          en: [
            "The traffic does not come from the random button alone. It comes from the combination of country pages, format guides, blog posts, and FAQs.",
            "The tool is the interaction core, but the supporting copy is what makes the page understandable and indexable."
          ],
          ja: [
            "SEO トラフィックはランダム生成ボタンだけでは生まれません。国別ページ、形式ガイド、ブログ、FAQ の組み合わせが重要です。",
            "ツールは体験の中心ですが、検索エンジンに理解されるのは周辺の本文コンテンツです。"
          ]
        }
      },
      {
        heading: { zh: "每个国家页都要有独立价值", en: "Every country page needs unique value", ja: "国ごとに独自価値が必要" },
        paragraphs: {
          zh: [
            "共享导航、页脚和工具组件完全没问题，但正文里的格式说明、地区说明和 FAQ 必须真正换成该国家的内容。",
            "否则就很容易变成大规模模板页，影响长期收录。"
          ],
          en: [
            "Shared navigation, footer, and generator components are fine, but the body copy, format notes, region coverage, and FAQs must genuinely change by country.",
            "Otherwise the site can drift into scaled template pages and lose long-term search performance."
          ],
          ja: [
            "ナビ、フッター、ジェネレーター部品を共通化するのは問題ありませんが、本文の形式説明、地域説明、FAQ は国ごとに実際に変える必要があります。",
            "そうしないと大量テンプレートページに見えやすく、長期的な検索評価を落とします。"
          ]
        }
      },
      {
        heading: { zh: "数据层要自建库", en: "Own the data layer", ja: "データレイヤーを自前化する" },
        paragraphs: {
          zh: [
            "早期可以用公开地址数据验证需求，但上线后最好把数据清洗进自己的 JSON、KV 或数据库，不要依赖公共 API 实时生成。",
            "这样既稳定，也更容易做缓存、州筛选和分享链接恢复。"
          ],
          en: [
            "Open address sources are fine for validating the idea, but after launch you should ingest the data into your own JSON files, KV, or database instead of relying on public live APIs.",
            "That keeps the product stable and makes caching, region filters, and sharable state much easier."
          ],
          ja: [
            "公開データで需要を検証するのは構いませんが、公開後は JSON、KV、DB などに取り込み、公共 API へ常時依存しない方が安定します。",
            "その方がキャッシュ、地域フィルター、共有リンクの復元も簡単です。"
          ]
        }
      }
    ]
  }
];

export const blogPosts: BlogPost[] = [...seoSeriesPosts, ...baseBlogPosts];

export function getBlogPost(slug: string) {
  const post = blogPosts.find((entry) => entry.slug === slug);
  return post ? withBlogContent(post) : undefined;
}

export function getAllBlogPosts() {
  return blogPosts.map((post) => withBlogContent(post));
}
