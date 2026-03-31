import type { LocalizedText } from "./site";

export interface LegalSection {
  heading: LocalizedText;
  paragraphs: Record<"zh" | "en" | "ja", string[]>;
}

export interface LegalPage {
  title: LocalizedText;
  description: LocalizedText;
  updatedAt: LocalizedText;
  sections: LegalSection[];
}

const text = (zh: string, en: string, ja: string): LocalizedText => ({ zh, en, ja });

const section = (
  heading: LocalizedText,
  zh: string[],
  en: string[],
  ja: string[]
): LegalSection => ({
  heading,
  paragraphs: { zh, en, ja }
});

const updatedAt = text("2026年3月31日", "March 31, 2026", "2026年3月31日");

export const legalPages: Record<"about" | "privacy" | "terms" | "cookies", LegalPage> = {
  about: {
    title: text("关于本站", "About", "このサイトについて"),
    description: text(
      "介绍本站的定位、地址数据展示方式，以及工具页、格式页和博客页的内容范围。",
      "Explains the purpose of the site and how tool pages, format guides, and blog pages are structured.",
      "サイトの目的と、ツールページ、形式ガイド、ブログ記事の役割を説明します。"
    ),
    updatedAt,
    sections: [
      section(
        text("站点定位", "Site purpose", "サイトの目的"),
        [
          "US Address Tool 是一个多语言地址工具站，面向测试、QA、表单验证、演示和地址格式研究。",
          "首页和各国家页的重点是地址生成体验，地址格式页负责解释写法差异，博客页负责补充与工具直接相关的实践内容。"
        ],
        [
          "US Address Tool is a multilingual address tool site for testing, QA, form validation, demos, and address-format research.",
          "Country generator pages focus on practical output, format guides explain structure differences, and blog posts add closely related educational context."
        ],
        [
          "US Address Tool は、テスト、QA、フォーム検証、デモ、住所形式の確認向けの多言語ツールサイトです。",
          "国別ツールページは生成体験を、形式ページは住所構造の違いを、ブログはそれに近い実務知識を補います。"
        ]
      ),
      section(
        text("数据与结果边界", "How results are framed", "結果の位置づけ"),
        [
          "本站展示的结果重点在于字段结构、地区筛选和地址格式，而不是提供投递保证、身份认证或合规审查服务。",
          "如果你要把这些结果接入正式业务，需要自行补充地址校验、风控和业务合规流程。"
        ],
        [
          "The site focuses on address structure, region filtering, and format presentation rather than delivery guarantees, identity verification, or compliance review.",
          "If you want to use similar data in production, you should add your own validation, risk, and compliance workflow."
        ],
        [
          "このサイトの結果は、配送保証や本人確認よりも、項目構造、地域フィルター、住所形式の確認を目的としています。",
          "本番利用では、独自の住所検証、リスク管理、コンプライアンス手順を追加してください。"
        ]
      )
    ]
  },
  privacy: {
    title: text("隐私政策", "Privacy Policy", "プライバシーポリシー"),
    description: text(
      "说明本站可能处理的技术信息、本地保存机制，以及分享链接的工作方式。",
      "Explains what technical information may be processed, how local saves work, and how share links behave.",
      "処理される可能性のある技術情報、ローカル保存、共有リンクの仕組みを説明します。"
    ),
    updatedAt,
    sections: [
      section(
        text("我们可能处理的信息", "Information we may process", "処理される可能性のある情報"),
        [
          "当你访问页面、切换语言、筛选地区、生成结果或使用分享功能时，站点会处理相应的 URL 参数和交互状态。",
          "为了安全、缓存、性能和故障排查，浏览器、Cloudflare 或相关基础设施可能处理 IP、设备类型、访问时间和错误日志等技术信息。"
        ],
        [
          "When you browse pages, switch languages, filter regions, generate results, or use sharing, the site may process related URL parameters and interaction state.",
          "For security, caching, performance, and troubleshooting, browsers, Cloudflare, or supporting infrastructure may also process technical information such as IP address, device type, access time, and error logs."
        ],
        [
          "ページ閲覧、言語切替、地域選択、生成、共有機能の利用時に、関連する URL パラメータや状態が処理されることがあります。",
          "セキュリティ、キャッシュ、性能、障害対応のために、ブラウザ、Cloudflare、関連基盤が IP、端末種別、アクセス時刻、エラーログなどを処理する場合があります。"
        ]
      ),
      section(
        text("本地保存与分享链接", "Local saves and share links", "ローカル保存と共有リンク"),
        [
          "你手动保存的地址默认写入浏览器本地存储，用来在无账号场景下保留收藏结果。",
          "分享链接会携带国家、地区、profile 和 seed，以便恢复同一条结果。请不要把敏感个人信息拼接进 URL。"
        ],
        [
          "Saved addresses are stored in your browser so favorites can persist without accounts.",
          "Share links carry country, region, profile, and seed so the same result can be restored. Do not append sensitive personal information to those URLs."
        ],
        [
          "保存した住所はブラウザ内に保存され、アカウントなしでも再利用できます。",
          "共有リンクには国、地域、profile、seed が含まれ、同じ結果を復元できます。機微な個人情報を URL に追加しないでください。"
        ]
      ),
      section(
        text("第三方服务", "Third-party services", "第三者サービス"),
        [
          "截至 2026 年 3 月 31 日，核心地址生成流程不依赖第三方广告 Cookie。",
          "如果未来接入统计、广告、客服组件或其他第三方服务，我们会先更新隐私政策和 Cookie 政策。"
        ],
        [
          "As of March 31, 2026, the core address generator does not rely on third-party advertising cookies.",
          "If analytics, advertising, support widgets, or other third-party services are added later, the policy pages will be updated first."
        ],
        [
          "2026 年 3 月 31 日時点で、主要な住所生成フローは第三者広告 Cookie に依存していません。",
          "将来、分析、広告、サポートウィジェット、その他の外部サービスを追加する場合は、先にポリシーを更新します。"
        ]
      )
    ]
  },
  terms: {
    title: text("使用条款", "Terms of Use", "利用規約"),
    description: text(
      "说明允许的使用方式、禁止行为、数据免责声明和服务调整范围。",
      "Explains permitted use, prohibited conduct, data disclaimers, and service-change scope.",
      "許可される利用、禁止行為、データ免責、サービス変更範囲を説明します。"
    ),
    updatedAt,
    sections: [
      section(
        text("允许用途", "Permitted use", "許可される利用"),
        [
          "本站面向测试、QA、教学、演示、地址格式研究、多语言表单验证等场景。",
          "你可以把生成结果用于 UI 演示、流程测试、样例数据和内部说明，但应遵守适用法律与平台规则。"
        ],
        [
          "The site is intended for testing, QA, education, demos, address-format research, and multilingual form validation.",
          "You may use generated results for UI demos, workflow testing, sample data, and internal education, subject to applicable law and platform rules."
        ],
        [
          "このサイトは、テスト、QA、教育、デモ、住所形式の確認、多言語フォーム検証向けです。",
          "生成結果は UI デモ、フローテスト、サンプルデータ、内部説明に利用できますが、法令や各種ルールを守る必要があります。"
        ]
      ),
      section(
        text("禁止行为", "Prohibited conduct", "禁止行為"),
        [
          "你不得利用本站内容进行冒充、欺诈、垃圾注册、风控绕过、身份伪造或其他违法违规行为。",
          "你也不得攻击可用性、滥用自动化访问、超范围抓取数据，或干扰服务的正常运行。"
        ],
        [
          "You may not use site output for impersonation, fraud, spam signups, anti-abuse evasion, identity falsification, or other unlawful conduct.",
          "You may not attack availability, abuse automated access, scrape beyond reasonable limits, or interfere with normal service operation."
        ],
        [
          "このサイトの出力を、なりすまし、詐欺、スパム登録、不正回避、身元偽装などの違法行為に使ってはいけません。",
          "可用性への攻撃、自動アクセスの乱用、過剰なスクレイピング、通常運用の妨害も禁止されます。"
        ]
      ),
      section(
        text("数据免责声明", "Data disclaimer", "データに関する免責"),
        [
          "即使某些页面参考了真实街道、城市或邮编元素，也不表示结果一定可投递、唯一、最新或适合身份认证。",
          "你应自行判断这些结果是否适合财务、税务、法务、KYC、物流等高风险流程。"
        ],
        [
          "Even if a page reflects real street, city, or postal elements, that does not mean the result is deliverable, unique, current, or suitable for identity verification.",
          "You are responsible for deciding whether any output is appropriate for financial, tax, legal, KYC, logistics, or other high-risk workflows."
        ],
        [
          "一部のページが実在の通り名、都市名、郵便番号要素を参照していても、配送可能性、唯一性、最新性、本人確認適合性を保証するものではありません。",
          "財務、税務、法務、KYC、物流などの高リスク用途に適するかどうかは利用者自身が判断してください。"
        ]
      ),
      section(
        text("服务调整", "Service changes", "サービス変更"),
        [
          "我们可以在不另行通知的情况下调整页面、内容、国家覆盖、地址池或功能。",
          "如有必要，我们也可能暂停、限制或终止部分服务。"
        ],
        [
          "We may update pages, content, country coverage, address pools, or features without notice.",
          "When necessary, parts of the service may also be suspended, limited, or discontinued."
        ],
        [
          "ページ、内容、対象国、住所プール、機能は予告なく変更されることがあります。",
          "必要に応じて、一部サービスを停止、制限、終了する場合があります。"
        ]
      )
    ]
  },
  cookies: {
    title: text("Cookie 政策", "Cookie Policy", "Cookie ポリシー"),
    description: text(
      "说明本站如何使用 Cookie、浏览器本地存储和相关技术来维持功能与性能。",
      "Explains how cookies, browser storage, and similar technologies are used for functionality and performance.",
      "機能と性能のために Cookie、ブラウザ保存領域、類似技術をどう使うかを説明します。"
    ),
    updatedAt,
    sections: [
      section(
        text("什么是 Cookie 和类似技术", "What cookies and similar technologies are", "Cookie と類似技術とは"),
        [
          "Cookie 是浏览器保存的小型数据文件，常用于记住设置、维持会话、统计访问或提升性能。",
          "除了传统 Cookie，本站也会用本地存储、会话存储和 URL 参数来完成保存、恢复和分享功能。"
        ],
        [
          "Cookies are small browser data files commonly used to remember settings, maintain sessions, measure visits, or improve performance.",
          "In addition to classic cookies, the site also uses local storage, session storage, and URL parameters for save, restore, and share flows."
        ],
        [
          "Cookie は設定記憶、セッション維持、訪問計測、性能改善に使われる小さなデータです。",
          "従来の Cookie に加え、このサイトではローカル保存、セッション保存、URL パラメータも保存・復元・共有のために使います。"
        ]
      ),
      section(
        text("当前版本使用的功能性存储", "Functional storage in the current release", "現在のリリースで使う機能保存"),
        [
          "当前版本主要使用浏览器本地存储来保存你主动收藏的地址结果。",
          "当你打开分享链接时，页面也会读取 URL 参数来恢复国家、地区和 seed。"
        ],
        [
          "The current release mainly uses browser local storage to keep address results that you explicitly save.",
          "When you open a share link, the page also reads URL parameters to restore country, region, and seed."
        ],
        [
          "現在のリリースでは、利用者が明示的に保存した住所結果をブラウザのローカル保存に保持します。",
          "共有リンクを開くと、国、地域、seed を復元するために URL パラメータも読み込みます。"
        ]
      ),
      section(
        text("如何管理 Cookie 和存储", "How to manage cookies and storage", "Cookie と保存の管理方法"),
        [
          "你可以通过浏览器设置删除 Cookie、清理本地存储、限制第三方 Cookie 或使用无痕模式访问本站。",
          "清理这些数据后，已保存地址和部分可恢复状态会失效，但不影响你重新生成新的结果。"
        ],
        [
          "You can delete cookies, clear local storage, restrict third-party cookies, or use private browsing mode through your browser settings.",
          "After clearing that data, saved addresses and some restore state may stop working, but you can still generate new results."
        ],
        [
          "ブラウザ設定から Cookie の削除、ローカル保存の消去、第三者 Cookie の制限、プライベートブラウズの利用ができます。",
          "これらのデータを消去すると保存済み住所や復元状態は失われますが、新しい結果の生成は引き続き利用できます。"
        ]
      )
    ]
  }
};
