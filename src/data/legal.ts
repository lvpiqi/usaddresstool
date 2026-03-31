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

export const legalPages: Record<"about" | "privacy" | "terms" | "cookies", LegalPage> = {
  about: {
    title: text("关于本站", "About", "このサイトについて"),
    description: text(
      "介绍站点定位、地址生成方式与内容治理原则。",
      "Learn how the site is positioned, how address results are generated, and how the content is governed.",
      "サイトの位置付け、住所生成の仕組み、コンテンツ運用方針を説明します。"
    ),
    updatedAt: text("2026年3月31日", "March 31, 2026", "2026年3月31日"),
    sections: [
      section(
        text("站点定位", "Site purpose", "サイトの目的"),
        [
          "US Address Tool 是一个面向测试、QA、表单验证、演示和地址格式研究的多语言工具站。",
          "本站重点是输出结构完整、字段可复制、便于分享的地址示例，而不是创建身份资料或提供身份认证服务。"
        ],
        [
          "US Address Tool is a multilingual tool site for testing, QA, form validation, demos, and address-format research.",
          "The product focus is structured, copyable, shareable address examples, not identity creation or identity verification."
        ],
        [
          "US Address Tool は、テスト、QA、フォーム検証、デモ、住所形式の調査向けに作られた多言語ツールサイトです。",
          "本サイトの目的は、構造化され、コピーや共有がしやすい住所例を提供することであり、本人確認や身元作成サービスではありません。"
        ]
      ),
      section(
        text("生成方式", "How generation works", "生成の仕組み"),
        [
          "生成器优先使用自有地址数据层、地区规则、姓名模板和国家格式规则来组合结果，并支持按国家、州、省或地区筛选。",
          "部分页面可能展示真实街道、城市、邮编格式或公开可查的地理信息，但具体可投递性、商用可用性和身份验证可接受性并不保证。"
        ],
        [
          "The generator primarily uses a first-party address data layer, regional rules, name templates, and country-specific formatting rules, with filters by country, state, province, or region.",
          "Some pages may reflect real streets, cities, postal formats, or publicly searchable geographic references, but deliverability, commercial suitability, and identity-verification acceptance are not guaranteed."
        ],
        [
          "ジェネレーターは、自社の住所データ層、地域ルール、氏名テンプレート、国別の住所形式ルールをもとに結果を構成し、国・州・省・地域で絞り込みできます。",
          "一部のページでは実在する道路名、都市名、郵便番号形式、公開地理情報を参照する場合がありますが、配達可能性、商用利用適格性、本人確認用途での受理は保証されません。"
        ]
      ),
      section(
        text("内容治理", "Editorial and compliance principles", "運用とコンプライアンス"),
        [
          "我们将国家工具页、地址格式页、博客页和法律页分别维护，减少主题混杂，帮助搜索引擎准确理解页面职责。",
          "如果未来接入新的分析工具、广告技术、账户系统或外部 API，本页以及相关政策页面会在上线前同步更新。"
        ],
        [
          "Country generator pages, address-format guides, blog posts, and legal pages are maintained as separate content types so search engines can understand their roles clearly.",
          "If analytics tools, advertising technology, account features, or third-party APIs are introduced later, this page and related policy pages will be updated before those changes go live."
        ],
        [
          "国別ツールページ、住所形式ガイド、ブログ記事、法務ページを分けて管理し、検索エンジンが各ページの役割を理解しやすい構成にしています。",
          "今後、分析ツール、広告技術、アカウント機能、外部 API を追加する場合は、本ページと関連ポリシーを公開前に更新します。"
        ]
      )
    ]
  },
  privacy: {
    title: text("隐私政策", "Privacy Policy", "プライバシーポリシー"),
    description: text(
      "说明站点会处理哪些信息、这些信息如何使用，以及浏览器本地保存和分享链接的工作方式。",
      "Explains what information the site may handle, how it is used, and how local saves and share links work.",
      "サイトが扱う可能性のある情報、その利用目的、ローカル保存と共有リンクの仕組みを説明します。"
    ),
    updatedAt: text("2026年3月31日", "March 31, 2026", "2026年3月31日"),
    sections: [
      section(
        text("我们可能处理的信息", "Information we may process", "取り扱う可能性のある情報"),
        [
          "当你访问页面、切换语言、选择国家或地区、生成地址或使用分享功能时，站点可能处理相应的页面参数和交互状态。",
          "出于安全、缓存、性能和故障排查目的，浏览器、Cloudflare 或其他基础设施服务还可能处理 IP 地址、设备类型、访问时间、来源页面和错误日志等技术信息。"
        ],
        [
          "When you browse pages, switch languages, choose a country or region, generate an address, or use sharing features, the site may process the related page parameters and interaction state.",
          "For security, caching, performance, and troubleshooting, browsers, Cloudflare, or other infrastructure providers may also process technical data such as IP address, device type, access time, referrer, and error logs."
        ],
        [
          "ページ閲覧、言語切替、国や地域の選択、住所生成、共有機能の利用時に、関連するページパラメーターや操作状態を処理することがあります。",
          "また、セキュリティ、キャッシュ、性能監視、障害対応のために、ブラウザー、Cloudflare、その他の基盤サービスが IP アドレス、端末種別、アクセス時刻、参照元、エラーログなどの技術情報を処理する場合があります。"
        ]
      ),
      section(
        text("这些信息的用途", "How the information is used", "利用目的"),
        [
          "这些信息主要用于渲染页面、生成地址结果、维持站点安全、分析性能、排查故障以及防止滥用。",
          "浏览公开页面不会自动为你创建账户画像；本站当前版本也不要求注册账号才能使用核心生成功能。"
        ],
        [
          "This information is mainly used to render pages, generate address results, keep the site secure, analyze performance, diagnose issues, and prevent abuse.",
          "Browsing public pages does not automatically create an account profile for you, and the current release does not require registration for core generator functions."
        ],
        [
          "これらの情報は、ページ表示、住所結果の生成、サイト保護、性能分析、障害調査、不正利用防止のために利用されます。",
          "公開ページを閲覧しただけで自動的にアカウントプロファイルが作成されることはなく、現行版では主要な生成機能に会員登録も必要ありません。"
        ]
      ),
      section(
        text("本地保存与分享链接", "Local saves and shared links", "ローカル保存と共有リンク"),
        [
          "你保存的地址默认写入自己的浏览器本地存储，用于在无登录状态下保留收藏结果。",
          "分享链接可能包含当前国家、地区筛选和 seed 参数，以便恢复同一条结果；请不要把敏感个人信息拼接进 URL。"
        ],
        [
          "Saved addresses are stored in your own browser by default so favorites can persist without a login.",
          "Share links may contain the current country, region filter, and seed so the same result can be restored; do not append sensitive personal information to those URLs."
        ],
        [
          "保存した住所は、ログインなしでも再利用できるよう、通常は利用者自身のブラウザーに保存されます。",
          "共有リンクには、同じ結果を再現するために現在の国、地域フィルター、seed が含まれる場合があります。機微な個人情報を URL に追加しないでください。"
        ]
      ),
      section(
        text("第三方服务与托管", "Hosting and third-party services", "ホスティングと第三者サービス"),
        [
          "站点当前依赖 Cloudflare 等托管与安全基础设施提供缓存、请求转发和基础防护，这些服务可能在其正常职责范围内处理有限技术数据。",
          "如果未来新增分析、广告、客服或其他第三方集成功能，我们会先更新本隐私政策和 Cookie 政策，再启用相关服务。"
        ],
        [
          "The site currently relies on hosting and security infrastructure such as Cloudflare for caching, request routing, and baseline protection, and those services may process limited technical data within their normal duties.",
          "If analytics, advertising, support widgets, or other third-party integrations are added later, we will update this Privacy Policy and the Cookie Policy before enabling them."
        ],
        [
          "本サイトは現在、Cloudflare などのホスティング・セキュリティ基盤を利用しており、キャッシュ、リクエスト中継、基本保護のために、通常業務の範囲で限定的な技術情報が処理される場合があります。",
          "今後、分析、広告、サポートウィジェット、その他の外部連携を追加する場合は、有効化前に本ポリシーと Cookie ポリシーを更新します。"
        ]
      ),
      section(
        text("保存期限与安全", "Retention and security", "保存期間と安全管理"),
        [
          "保存在浏览器本地的数据由你自己的设备、浏览器设置和清理策略控制。",
          "服务器侧日志通常只会在安全、性能和故障排查所需的合理期限内保留，我们也会尽量减少不必要的数据暴露。"
        ],
        [
          "Data stored locally in the browser remains under the control of your device, browser settings, and deletion choices.",
          "Server-side logs are generally kept only for a reasonable period needed for security, performance, and troubleshooting, and unnecessary exposure is minimized where possible."
        ],
        [
          "ブラウザーに保存されたデータは、利用者自身の端末、ブラウザー設定、削除操作によって管理されます。",
          "サーバー側ログは通常、セキュリティ、性能確認、障害対応に必要な合理的期間のみ保持し、不要なデータ露出は可能な限り減らします。"
        ]
      ),
      section(
        text("你的选择", "Your choices", "利用者の選択"),
        [
          "你可以随时清除浏览器本地存储、删除分享链接参数、关闭 Cookie 或使用无痕模式访问本站。",
          "本站不以 13 岁以下儿童为目标受众；如未来引入需要更高隐私要求的功能，我们会单独更新相应说明。"
        ],
        [
          "You can clear browser storage, remove share-link parameters, block cookies, or use private browsing mode at any time.",
          "This website is not directed to children under 13, and if higher-risk features are introduced later, the related privacy disclosures will be updated separately."
        ],
        [
          "ブラウザー保存データの削除、共有リンクのパラメーター削除、Cookie の無効化、プライベートブラウズの利用はいつでも行えます。",
          "本サイトは 13 歳未満の児童を対象としておらず、将来より厳格なプライバシー配慮が必要な機能を追加する場合は、別途説明を更新します。"
        ]
      )
    ]
  },
  terms: {
    title: text("使用条款", "Terms of Use", "利用規約"),
    description: text(
      "说明允许的使用方式、数据免责声明、服务可用性与责任限制。",
      "Explains permitted use, data disclaimers, service availability, and limitations of liability.",
      "許可される利用方法、データに関する免責、サービス提供条件、責任制限を説明します。"
    ),
    updatedAt: text("2026年3月31日", "March 31, 2026", "2026年3月31日"),
    sections: [
      section(
        text("接受条款", "Acceptance of these terms", "本規約への同意"),
        [
          "当你访问、浏览或使用 US Address Tool，即表示你同意遵守本使用条款以及站点中公开发布的相关政策页面。",
          "如果你不同意这些条款，请停止继续使用本站。"
        ],
        [
          "By accessing, browsing, or using US Address Tool, you agree to comply with these Terms of Use and the related policy pages published on the site.",
          "If you do not agree with these terms, you should stop using the website."
        ],
        [
          "US Address Tool にアクセス、閲覧、利用することにより、本利用規約およびサイト上で公開されている関連ポリシーに従うことに同意したものとみなされます。",
          "これらの条件に同意できない場合は、本サイトの利用を中止してください。"
        ]
      ),
      section(
        text("允许的用途", "Permitted use", "許可される利用"),
        [
          "本站面向测试、QA、教学、演示、地址格式研究、国际化验证和表单体验设计等场景。",
          "你可以在合规前提下使用生成结果做界面演示、流程测试、样例展示和开发调试。"
        ],
        [
          "The website is intended for testing, QA, education, demos, address-format research, localization checks, and form-experience design.",
          "You may use generated results for compliant UI demos, workflow testing, sample content, and development debugging."
        ],
        [
          "本サイトは、テスト、QA、教育、デモ、住所形式の調査、国際化確認、フォーム体験設計などを目的としています。",
          "法令やポリシーを守ることを前提に、生成結果を UI デモ、フローテスト、サンプル表示、開発デバッグに利用できます。"
        ]
      ),
      section(
        text("禁止行为", "Prohibited conduct", "禁止事項"),
        [
          "你不得利用本站结果从事冒充、欺诈、垃圾注册、规避平台规则、绕过风控、伪造身份、违法营销或其他违法违规行为。",
          "你也不得尝试破坏站点可用性、批量滥用接口、抓取超出合理范围的数据，或以其他方式干扰服务正常运行。"
        ],
        [
          "You may not use site output for impersonation, fraud, spam signups, platform circumvention, anti-abuse evasion, identity falsification, unlawful marketing, or other illegal or abusive conduct.",
          "You also may not attack availability, abuse automated access, scrape data beyond reasonable limits, or otherwise interfere with normal operation."
        ],
        [
          "本サイトの出力を、なりすまし、詐欺、スパム登録、プラットフォーム回避、不正対策の回避、身元偽装、違法マーケティング、その他の違法・不正行為に利用してはいけません。",
          "また、可用性への攻撃、自動アクセスの乱用、合理的範囲を超えるスクレイピング、その他サービス運営を妨げる行為も禁止します。"
        ]
      ),
      section(
        text("数据免责声明", "Data disclaimer", "データに関する免責"),
        [
          "生成结果可能来源于自有样本库、公开格式规则、地理参考信息或算法组合。即使页面包含真实街道、城市或邮编元素，也不表示该结果一定可投递、唯一、最新或可用于身份验证。",
          "你应当自行评估任何输出是否适合业务、财务、税务、法律、KYC、物流或其他高风险场景。"
        ],
        [
          "Generated results may come from curated first-party samples, public formatting rules, geographic references, or algorithmic combinations. Even when a page includes real street, city, or postal elements, that does not mean the result is deliverable, unique, current, or suitable for identity verification.",
          "You are responsible for deciding whether any output is appropriate for business, financial, tax, legal, KYC, logistics, or other high-risk workflows."
        ],
        [
          "生成結果は、自社サンプル、公開住所形式ルール、地理参照情報、またはアルゴリズムによる組み合わせに基づく場合があります。実在する道路名、都市名、郵便要素が含まれていても、配達可能性、一意性、最新性、本人確認用途への適合を意味するものではありません。",
          "事業、金融、税務、法務、KYC、物流など高リスクな用途に適しているかどうかは、利用者自身で判断してください。"
        ]
      ),
      section(
        text("知识产权与服务变更", "Intellectual property and service changes", "知的財産とサービス変更"),
        [
          "站点的页面结构、文案、样式、脚本、数据整理方式和品牌元素，除另有说明外，均由站点运营方或其许可方保留相应权利。",
          "我们可以在不另行通知的情况下调整页面、内容、地址池、功能、可用国家或服务策略，也可以在必要时暂停或终止部分服务。"
        ],
        [
          "Unless stated otherwise, the site layout, copy, styling, scripts, dataset organization, and brand elements remain the property of the operator or its licensors.",
          "We may update pages, content, address pools, features, available countries, or service rules without notice, and may suspend or discontinue parts of the service when necessary."
        ],
        [
          "別途明記がない限り、サイトの構成、文言、スタイル、スクリプト、データ整理方法、ブランド要素に関する権利は運営者またはその許諾元に帰属します。",
          "ページ、コンテンツ、住所プール、機能、対応国、サービス方針は予告なく変更される場合があり、必要に応じて一部サービスを停止または終了することがあります。"
        ]
      ),
      section(
        text("责任限制", "Limitation of liability", "責任の制限"),
        [
          "在适用法律允许的最大范围内，本站按“现状”提供，不对准确性、持续可用性、适销性或特定用途适用性作明示或默示保证。",
          "因使用或无法使用本站、依赖生成结果、第三方基础设施故障或政策变更而产生的直接或间接损失，站点运营方在法律允许范围内不承担责任。"
        ],
        [
          "To the maximum extent permitted by law, the website is provided on an \"as is\" basis without express or implied warranties about accuracy, availability, merchantability, or fitness for a particular purpose.",
          "The operator is not liable, to the extent allowed by law, for direct or indirect losses arising from use of the site, inability to use it, reliance on generated output, third-party infrastructure failures, or policy changes."
        ],
        [
          "法令で認められる最大限の範囲で、本サイトは「現状有姿」で提供され、正確性、継続利用性、商品性、特定目的適合性について明示・黙示を問わず保証しません。",
          "本サイトの利用または利用不能、生成結果への依存、第三者基盤の障害、ポリシー変更に起因する直接・間接損害について、法令で許される範囲で運営者は責任を負いません。"
        ]
      )
    ]
  },
  cookies: {
    title: text("Cookie 政策", "Cookie Policy", "Cookie ポリシー"),
    description: text(
      "说明本站如何使用 Cookie、浏览器本地存储和类似技术来维持功能、安全与性能。",
      "Explains how the site uses cookies, browser storage, and similar technologies for functionality, security, and performance.",
      "本サイトが機能維持、セキュリティ、性能のために Cookie やブラウザー保存領域などをどのように利用するかを説明します。"
    ),
    updatedAt: text("2026年3月31日", "March 31, 2026", "2026年3月31日"),
    sections: [
      section(
        text("什么是 Cookie 和类似技术", "What cookies and similar technologies are", "Cookie と類似技術について"),
        [
          "Cookie 是浏览器保存的小型数据文件，常用于记住设置、维持会话、统计访问或提升站点性能。",
          "除了传统 Cookie，本站也可能使用浏览器本地存储、会话存储或 URL 参数来实现保存结果、恢复分享链接和基础交互。"
        ],
        [
          "Cookies are small browser data files commonly used to remember settings, maintain sessions, measure visits, or improve performance.",
          "In addition to traditional cookies, the site may use browser local storage, session storage, or URL parameters to save results, restore shared links, and support basic interactions."
        ],
        [
          "Cookie は、設定の記憶、セッション維持、アクセス計測、性能向上などに使われる小さなブラウザーデータです。",
          "従来の Cookie に加えて、本サイトでは保存結果、共有リンク復元、基本操作のためにローカルストレージ、セッションストレージ、URL パラメーターを利用する場合があります。"
        ]
      ),
      section(
        text("当前版本使用的功能性存储", "Functional storage used in the current release", "現行版で使われる機能保存"),
        [
          "当前版本的核心生成流程主要依赖浏览器本地存储来保存你手动收藏的地址结果。",
          "如果启用分享或恢复功能，页面还会读取当前 URL 中的参数，以便重新展示相同的国家、地区筛选和结果种子。"
        ],
        [
          "The current release mainly uses browser local storage to keep address results that you explicitly choose to save.",
          "When share or restore features are used, the page may also read URL parameters so the same country, region filter, and result seed can be restored."
        ],
        [
          "現行版では、利用者が明示的に保存した住所結果を保持するために、主にブラウザーのローカルストレージを使用しています。",
          "共有または復元機能を使う場合は、同じ国、地域フィルター、結果 seed を再現するために URL パラメーターも参照されます。"
        ]
      ),
      section(
        text("必要性 Cookie 与第三方技术", "Necessary cookies and third-party technologies", "必要 Cookie と第三者技術"),
        [
          "托管、安全或流量完整性服务可能在必要时设置严格必需的 Cookie 或使用类似技术，以帮助缓存、安全检测和防滥用。",
          "截至 2026 年 3 月 31 日，核心地址生成流程不依赖第三方广告 Cookie；如果未来接入分析或广告标签，我们会先更新本页和隐私政策。"
        ],
        [
          "Hosting, security, or traffic-integrity services may set strictly necessary cookies or use similar technologies when needed for caching, security checks, and abuse prevention.",
          "As of March 31, 2026, the core generator flow does not rely on third-party advertising cookies. If analytics or ad tags are added later, this page and the Privacy Policy will be updated first."
        ],
        [
          "ホスティング、セキュリティ、トラフィック保全サービスは、キャッシュ、安全確認、不正防止のために、必要最小限の Cookie や類似技術を用いる場合があります。",
          "2026 年 3 月 31 日時点で、主要な住所生成フローは第三者広告 Cookie に依存していません。今後、分析タグや広告タグを追加する場合は、本ページとプライバシーポリシーを先に更新します。"
        ]
      ),
      section(
        text("如何管理 Cookie 与存储", "How to manage cookies and storage", "Cookie と保存データの管理方法"),
        [
          "你可以通过浏览器设置删除 Cookie、清除本地存储、限制第三方 Cookie、关闭脚本或使用无痕模式访问本站。",
          "清除这些数据后，已保存的地址、部分偏好或可恢复状态可能会失效，这不会影响你再次生成新的示例结果。"
        ],
        [
          "You can delete cookies, clear local storage, restrict third-party cookies, disable scripts, or use private browsing mode through your browser settings.",
          "After clearing that data, saved addresses, some preferences, or recoverable states may stop working, but you can still generate new example results."
        ],
        [
          "ブラウザー設定から、Cookie 削除、ローカルストレージ消去、第三者 Cookie 制限、スクリプト無効化、プライベートブラウズの利用ができます。",
          "これらのデータを削除すると、保存済み住所や一部の復元状態が失われる場合がありますが、新しいサンプル結果の生成自体は引き続き利用できます。"
        ]
      ),
      section(
        text("政策更新", "Policy updates", "ポリシー更新"),
        [
          "如果站点的功能、托管方式、分析方案或广告方案发生变化，我们会相应调整本 Cookie 政策。",
          "继续使用在政策更新后提供的服务，通常意味着你接受更新后的说明。"
        ],
        [
          "If the site’s functionality, hosting model, analytics setup, or advertising stack changes, this Cookie Policy may be updated accordingly.",
          "Continued use of services after an update generally means you accept the revised explanation."
        ],
        [
          "サイト機能、ホスティング方式、分析構成、広告構成が変更された場合、本 Cookie ポリシーもそれに合わせて更新されることがあります。",
          "更新後にサービスを継続利用した場合、通常は改訂内容に同意したものとみなされます。"
        ]
      )
    ]
  }
};
