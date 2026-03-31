import type { BlogPost, BlogRelatedLink } from "./blog";
import type { LocalizedText, Locale } from "./site";
import {
  getBlogIndexPath,
  getCountriesPath,
  getCountryPath,
  getFormatIndexPath,
  getFormatPath,
  getTaxFreePath
} from "./site";

interface BlogSectionOverride {
  heading: LocalizedText;
  paragraphs: Record<"zh" | "en" | "ja", string[]>;
  bullets?: Record<"zh" | "en" | "ja", string[]>;
}

const text = (zh: string, en: string, ja: string): LocalizedText => ({ zh, en, ja });

const localizedPath = (builder: (locale: Locale) => string): LocalizedText => ({
  zh: builder("zh"),
  en: builder("en"),
  ja: builder("ja")
});

const relatedLink = (
  label: LocalizedText,
  description: LocalizedText,
  builder: (locale: Locale) => string
): BlogRelatedLink => ({
  label,
  description,
  path: localizedPath(builder)
});

const overrides: Record<
  string,
  Pick<BlogPost, "title" | "description" | "sections" | "relatedLinks">
> = {
  "us-address-format": {
    title: text(
      "美国地址格式怎么写：州、城市、街道与 ZIP Code 完整指南",
      "How to Write a US Address: Street, City, State, and ZIP Code",
      "アメリカ住所の書き方: 通り名、都市、州、ZIP Code 完全ガイド"
    ),
    description: text(
      "讲清美国地址的街道、城市、州缩写、ZIP Code 与表单填写方式，适合测试、注册、数据库填充和地址研究。",
      "A practical guide to US address order, state abbreviations, ZIP codes, and form fields for testing and data-entry use cases.",
      "アメリカ住所の通り名、都市、州略称、ZIP Code、フォーム入力の考え方を整理した実用ガイドです。"
    ),
    sections: [
      {
        heading: text("美国地址通常包含哪些字段", "What fields are usually included in a US address", "アメリカ住所によく含まれる項目"),
        paragraphs: {
          zh: [
            "一条标准美国地址，核心部分通常包括门牌号、街道名、城市、州和 ZIP Code。很多网站在生成结果时，还会把姓名、性别、电话、完整地址拆开显示，方便用户直接复制到不同表单字段里，而不是自己再手动拆分。",
            "对普通用户来说，最容易看懂的一行通常是“城市 + 州缩写 + ZIP Code”。这一行决定了地址看起来是否像美国本地常见写法，也决定了用户把结果拿去做注册测试、演示填表或数据库样例时是否顺手。"
          ],
          en: [
            "A standard US address usually includes a house number, street name, city, state, and ZIP code. Many generator tools also show name, gender, phone, and a full-address line so users can copy each field separately.",
            "For most visitors, the city + state + ZIP line is the fastest way to judge whether the result looks natural in a US-style form or profile page."
          ],
          ja: [
            "標準的なアメリカ住所には、番地、通り名、都市、州、ZIP Code が含まれます。多くのジェネレーターでは、氏名、性別、電話、完全住所も分けて表示し、フォームへ項目ごとに貼り付けやすくしています。",
            "利用者が最も見慣れているのは、city + state + ZIP Code の行です。この部分が自然だと、結果全体もアメリカ向けフォームに合っているように見えます。"
          ]
        }
      },
      {
        heading: text("美国地址的标准顺序", "The standard order of a US address", "アメリカ住所の標準的な順序"),
        paragraphs: {
          zh: [
            "美国地址常见顺序是“门牌号 + 街道名”，下一行或同一行再接“城市，州缩写 ZIP Code”。如果是国际邮寄，最后还会再补上 United States。和一些按区域从大到小书写的国家不同，美国地址更强调街道这一层，因此街道写法是否自然非常重要。",
            "例如 `350 5th Ave, New York, NY 10118` 这类结构，就是用户和表单系统都很容易识别的格式。地址生成器如果能同时展示完整地址和拆分字段，用户既能一键复制整条，也能逐项填充，不容易出错。"
          ],
          en: [
            "A common US format is house number + street name, followed by city, state abbreviation, and ZIP code. For international use, a final United States line may be added.",
            "An example like `350 5th Ave, New York, NY 10118` is easy for both people and forms to recognize. Showing both the full address and separate fields makes the result much easier to use."
          ],
          ja: [
            "アメリカ住所では、番地 + 通り名の後に、city, state, ZIP Code を続ける形が一般的です。国際配送では最後に United States を加えることもあります。",
            "たとえば `350 5th Ave, New York, NY 10118` のような形式は、人にもフォームにも理解しやすい形です。完全住所と分割項目を両方見せると、使い勝手が大きく上がります。"
          ]
        },
        bullets: {
          zh: ["门牌号通常写在街道名前面", "州字段常见为两位大写缩写", "ZIP Code 常见为 5 位，也可能看到 ZIP+4"],
          en: ["The house number usually comes before the street name", "States are commonly shown as two-letter uppercase abbreviations", "ZIP codes are usually 5 digits, sometimes ZIP+4"],
          ja: ["番地は通り名の前に置くのが一般的", "州は 2 文字の大文字略称で表示されることが多い", "ZIP Code は通常 5 桁で、ZIP+4 もあります"]
        }
      },
      {
        heading: text("州缩写和 ZIP Code 该怎么理解", "How to understand state abbreviations and ZIP codes", "州略称と ZIP Code の見方"),
        paragraphs: {
          zh: [
            "美国页面里最常见的州写法是缩写，例如 California 会写成 CA，Texas 会写成 TX，Florida 会写成 FL。很多注册页、支付页和配送页下拉菜单也都使用缩写，所以生成结果里带缩写往往更方便直接使用。",
            "ZIP Code 则是美国邮编体系里最有辨识度的字段。常见的是 5 位数字，有些场景还会出现 ZIP+4。即便你平时只需要基本测试，先确认 ZIP Code 和州、城市之间的组合是否自然，通常就能快速判断这条地址是否适合你的表单或样例数据。"
          ],
          en: [
            "US pages usually show states as abbreviations such as CA, TX, or FL. That matches the way many shipping, payment, and sign-up forms expect state data.",
            "ZIP code is one of the strongest signals in a US address. Most results use a 5-digit code, while some systems may also support ZIP+4 for more detailed routing."
          ],
          ja: [
            "アメリカ向けページでは、州は CA、TX、FL のような略称で表示されることが一般的です。多くの登録フォームや配送フォームもこの形式を前提にしています。",
            "ZIP Code はアメリカ住所で特に分かりやすい識別要素です。通常は 5 桁で、場面によっては ZIP+4 も使われます。"
          ]
        }
      },
      {
        heading: text("在注册表单里应该怎么填写", "How to fill a US address into forms", "フォームにどう入力するか"),
        paragraphs: {
          zh: [
            "如果表单把地址拆成多个字段，常见做法是把门牌号和街道名填在 Address Line 1，把公寓号、套间号填在 Address Line 2，把城市填到 City，把州缩写填到 State，把 ZIP Code 填到 Zip 或 Postal Code。只要字段顺序清楚，复制起来会非常快。",
            "如果表单只给一个完整地址输入框，你可以直接复制工具里的 Full Address 字段；如果表单是分字段结构，就用工具显示的 street、city、state、ZIP Code 分开填。一个好用的地址生成器，应该同时照顾这两种输入方式。"
          ],
          en: [
            "When a form splits the address into fields, Address Line 1 usually holds the street, Address Line 2 can hold apartment or suite details, and the rest goes into City, State, and ZIP or Postal Code.",
            "If the form offers a single full-address field, you can paste the complete address directly. If it uses separate fields, copy each value from the generator output instead."
          ],
          ja: [
            "フォームが住所を複数項目に分けている場合、Address Line 1 に通り、Address Line 2 に部屋番号や suite 情報、残りを City、State、ZIP または Postal Code に入れる形が一般的です。",
            "完全住所を 1 つの欄へ入れるフォームなら Full Address をそのまま使い、分割フォームなら各項目を個別にコピーするとスムーズです。"
          ]
        }
      },
      {
        heading: text("常见错误和适合使用生成器的场景", "Common mistakes and useful generator scenarios", "よくあるミスとジェネレーターが役立つ場面"),
        paragraphs: {
          zh: [
            "常见错误包括把州全称和缩写混用、把 ZIP Code 填到城市字段、只复制完整地址却忘了单独填写州或邮编，以及看到 Postal Code 字段时不知道其实在美国页面里往往就是填 ZIP Code。只要提前理解字段关系，使用时就会顺畅很多。",
            "美国地址生成器最适合用于 QA 测试、表单验证、演示截图、数据库样例、教学示范和地址格式研究。它的价值不只是随机出一条结果，而是把用户最需要的字段拆清楚，让复制、核对和复用都更高效。"
          ],
          en: [
            "Common mistakes include mixing state abbreviations with full names, placing ZIP code into the wrong field, or copying only the full address when a form still needs separate state and ZIP values.",
            "A US address generator is especially useful for QA testing, form validation, demos, sample datasets, and address-format research because it turns one address into reusable field-level data."
          ],
          ja: [
            "よくあるミスは、州略称と正式名称を混在させること、ZIP Code を別欄に入れること、完全住所だけを貼って州や郵便番号を個別に入れ忘れることです。",
            "アメリカ住所ジェネレーターは、QA テスト、フォーム検証、デモ、サンプルデータ、住所形式の確認に特に向いています。"
          ]
        }
      }
    ] as BlogSectionOverride[],
    relatedLinks: [
      relatedLink(
        text("美国地址生成器", "US Address Generator", "アメリカ住所ジェネレーター"),
        text("按州生成美国地址，并直接复制 ZIP Code、城市和州字段。", "Generate US addresses by state and copy the ZIP, city, and state fields.", "州別にアメリカ住所を生成し、ZIP Code、都市、州を個別にコピーできます。"),
        (locale) => getCountryPath(locale, "us")
      ),
      relatedLink(
        text("美国地址格式页", "US Address Format Page", "アメリカ住所形式ページ"),
        text("查看美国地址的格式说明、示例和字段解释。", "Review the format rules, examples, and field notes for US addresses.", "アメリカ住所の形式説明、住所例、項目メモを確認できます。"),
        (locale) => getFormatPath(locale, "us")
      ),
      relatedLink(
        text("美国免税州地址生成器", "US Tax-Free Address Generator", "アメリカ免税州住所ジェネレーター"),
        text("按免税州筛选并生成美国地址结果。", "Filter by tax-free states and generate US address results.", "免税州で絞り込み、アメリカ住所を生成できます。"),
        (locale) => getTaxFreePath(locale)
      )
    ]
  },
  "japan-address-format": {
    title: text(
      "日本地址格式指南：都道府县、邮编、丁目番地怎么写",
      "Japan Address Format Guide: Prefectures, Postal Codes, and Block Numbers",
      "日本住所形式ガイド: 都道府県、郵便番号、丁目番地の書き方"
    ),
    description: text(
      "说明日本地址的顺序、邮编、都道府县和丁目番地写法，适合表单填写、多语言展示、测试和地址格式研究。",
      "A practical guide to Japanese address order, prefectures, postal codes, and block numbers for forms, testing, and multilingual display.",
      "日本住所の順序、都道府県、郵便番号、丁目番地を整理した、フォーム入力と多言語表示向けの実用ガイドです。"
    ),
    sections: [
      {
        heading: text("为什么日本地址和欧美地址看起来不一样", "Why Japanese addresses look different from Western ones", "なぜ日本住所は欧米住所と見え方が違うのか"),
        paragraphs: {
          zh: [
            "很多人第一次看日本地址，会觉得顺序和美国、英国完全反过来。这是因为日本地址更强调区域层级，通常从都道府县、市区町村开始，再落到丁目、番地、号和建筑物名称。它不是简单把街道名字放在前面，而是让地址沿着行政区域逐步细化。",
            "正因为书写逻辑不同，用户在日文页面、英文页面和跨境表单里看到的显示方式也可能不同。理解这一点之后，就不容易把日本地址误填成欧美那种“街道在最前”的样子。"
          ],
          en: [
            "Japanese addresses often feel reversed compared with US or UK layouts because they emphasize administrative hierarchy first. The structure commonly moves from prefecture and municipality down to block and building details.",
            "Once you understand that logic, it becomes much easier to recognize why a Japanese address may be displayed differently from a Western street-first pattern."
          ],
          ja: [
            "日本住所がアメリカやイギリスの住所と違って見えるのは、通り名より先に地域階層を重視するためです。都道府県、市区町村、丁目番地、建物名へと順に細かくなっていきます。",
            "この考え方を理解すると、日本住所を欧米式の street-first で誤って扱うことが少なくなります。"
          ]
        }
      },
      {
        heading: text("日本地址的常见层级和字段", "Common layers and fields in a Japanese address", "日本住所でよく使われる階層と項目"),
        paragraphs: {
          zh: [
            "一条常见的日本地址，往往包含邮编、都道府县、市区町村、丁目番地以及建筑名或房间号。对于很多用户来说，日本地址最难的不是看懂单个词，而是判断这些层级应该以什么顺序出现，哪些字段可以拆开，哪些字段最好保留在同一行。",
            "如果地址生成器把邮编、都道府县和完整地址分开显示，使用体验会明显更好。你可以一边看完整地址，一边按表单需要复制具体字段，这比只给一整行拼接文本实用得多。"
          ],
          en: [
            "A typical Japanese address may include a postal code, prefecture, city or ward, block numbers, and sometimes a building or room number. The challenge is often the hierarchy rather than one specific field.",
            "That is why generator tools work better when they show postal code, prefecture, and full address separately instead of outputting only one merged line."
          ],
          ja: [
            "一般的な日本住所には、郵便番号、都道府県、市区町村、丁目番地、建物名や部屋番号が含まれます。難しいのは単語そのものより、階層をどの順序で理解するかです。",
            "そのため、ジェネレーターが郵便番号、都道府県、完全住所を別々に見せてくれると、フォーム入力がかなり楽になります。"
          ]
        },
        bullets: {
          zh: ["邮编常见格式是 3 位 + 连字符 + 4 位", "都道府县通常不可省略", "丁目番地和建筑名最好保留本地表达方式"],
          en: ["Postal codes commonly use a 3-digit + hyphen + 4-digit pattern", "Prefecture is usually an essential field", "Block and building details should stay close to local conventions"],
          ja: ["郵便番号は 3 桁 + ハイフン + 4 桁が一般的", "都道府県は省略しない方が自然", "丁目番地や建物名はローカルの表現を保つ方がよい"]
        }
      },
      {
        heading: text("日文界面和英文界面为什么会显示不同", "Why Japanese and English interfaces may display the address differently", "日本語 UI と英語 UI で表示順が変わる理由"),
        paragraphs: {
          zh: [
            "同一条日本地址，在日文界面中从大到小展示通常更自然，而在英文界面中，很多产品会调整为更接近国际用户习惯的顺序。也就是说，地址数据本身可以一致，但输出方式会因为阅读习惯不同而变化，这并不代表地址有问题。",
            "如果你的网站支持中文、英文和日文，这一点尤其重要。用户切换语言后，看到的顺序略有变化是正常现象，只要都道府县、城市、邮编和完整地址之间的对应关系没有丢失，就依然是可用的。"
          ],
          en: [
            "The same Japanese address may look more natural in one order on a Japanese interface and in a more international order on an English interface. The underlying data can stay the same while the display changes.",
            "For multilingual tools, that difference is normal. What matters is that the prefecture, city, postal code, and full-address mapping remain clear."
          ],
          ja: [
            "同じ日本住所でも、日本語 UI では大きい地域から小さい地域へ並べた方が自然で、英語 UI では国際利用者に合わせた順序の方が読みやすいことがあります。",
            "多言語ツールではこの違いは自然なもので、都道府県、都市、郵便番号、完全住所の対応関係が保たれていれば問題ありません。"
          ]
        }
      },
      {
        heading: text("填写日本地址表单时最容易错的地方", "Common mistakes when filling Japanese address forms", "日本住所フォームで起きやすいミス"),
        paragraphs: {
          zh: [
            "最常见的问题，是把都道府县、省、市、区这些概念混在一起，或者看到一个 Postal Code 字段却不知道应该填 7 位日本邮编。还有一些用户会把建筑名、房间号和丁目番地拆得过碎，导致复制后还要手动重组，反而更麻烦。",
            "实际使用时，先看清表单是要完整地址还是分字段地址。如果是分字段，就优先把邮编、都道府县、市区町村和其余地址明细分开；如果是完整地址输入框，则直接复制 Full Address 更省事。"
          ],
          en: [
            "A common mistake is mixing prefecture, city, ward, and building details without understanding which field expects which part. Another is seeing a Postal Code field but not realizing it should hold a 7-digit Japanese code.",
            "The easiest workflow is to check whether the form wants separate fields or one full address, then copy either the individual parts or the full-address output from the generator."
          ],
          ja: [
            "よくあるミスは、都道府県、市区町村、建物情報を混ぜてしまうことや、Postal Code 欄に何を入れるべきか分からず日本の 7 桁郵便番号を入れ損ねることです。",
            "実際には、フォームが分割型か完全住所型かを先に見て、それに合わせて項目ごと、または完全住所をコピーするのが最も簡単です。"
          ]
        }
      },
      {
        heading: text("日本地址生成器适合哪些使用场景", "When a Japan address generator is especially useful", "日本住所ジェネレーターが役立つ場面"),
        paragraphs: {
          zh: [
            "日本地址生成器特别适合做跨境电商表单测试、账号注册演示、数据库样例填充、教学说明和地址格式研究。相比手动查地址，它能更快给出都道府县、邮编和完整地址之间的对应关系，尤其适合需要反复生成不同地区结果的场景。",
            "如果工具还支持按都道府县筛选、字段复制、保存和分享，那就不仅仅是“随机生成”这么简单了。用户可以更精准地控制结果范围，也更容易把同一条结果复用到截图、测试流程和内部演示里。"
          ],
          en: [
            "A Japan address generator is especially useful for cross-border form testing, account sign-up demos, sample datasets, training material, and address-format research.",
            "When the tool also supports prefecture filters, field-level copy, save, and share features, it becomes much more practical than a simple random-output page."
          ],
          ja: [
            "日本住所ジェネレーターは、越境フォームのテスト、登録デモ、サンプルデータ、教育資料、住所形式の確認に特に役立ちます。",
            "都道府県フィルター、項目コピー、保存、共有まで対応していると、単なるランダム出力よりずっと実用的になります。"
          ]
        }
      }
    ] as BlogSectionOverride[],
    relatedLinks: [
      relatedLink(
        text("日本地址生成器", "Japan Address Generator", "日本住所ジェネレーター"),
        text("按都道府县生成日本地址，并复制邮编和地区字段。", "Generate Japanese addresses by prefecture and copy postal-code and region fields.", "都道府県別に日本住所を生成し、郵便番号や地域項目をコピーできます。"),
        (locale) => getCountryPath(locale, "jp")
      ),
      relatedLink(
        text("日本地址格式页", "Japan Address Format Page", "日本住所形式ページ"),
        text("查看日本地址顺序、字段说明和示例。", "Review Japanese address order, field notes, and examples.", "日本住所の順序、項目説明、住所例を確認できます。"),
        (locale) => getFormatPath(locale, "jp")
      ),
      relatedLink(
        text("国家地址目录", "Country Directory", "国別住所ディレクトリ"),
        text("浏览更多国家和地区的地址生成器页面。", "Browse address generator pages for more countries and regions.", "他の国や地域の住所ジェネレーターページも確認できます。"),
        (locale) => getCountriesPath(locale)
      )
    ]
  },
  "zip-vs-postal-code": {
    title: text(
      "ZIP Code、Postal Code 和 Postcode 有什么区别？",
      "ZIP Code vs Postal Code vs Postcode: What Is the Difference?",
      "ZIP Code、Postal Code、Postcode の違いとは"
    ),
    description: text(
      "讲清 ZIP Code、postal code、postcode 在不同国家和表单里的含义，帮助你更准确地使用地址生成器和填写地址字段。",
      "Explains what ZIP code, postal code, and postcode mean across different countries and forms so you can use address generators and forms more accurately.",
      "ZIP Code、postal code、postcode の意味と使い分けを整理し、住所ジェネレーターやフォームで迷わないようにするガイドです。"
    ),
    sections: [
      {
        heading: text("这三个词分别是什么意思", "What each of these three terms means", "この 3 つの用語は何を意味するのか"),
        paragraphs: {
          zh: [
            "ZIP Code 通常特指美国邮编，是美国地址里最常见的说法。postal code 是更广义的国际通用词，很多国家都能使用。postcode 在英国语境里尤其常见，所以在英国地址页面、英国表单或英国用户熟悉的场景里，这个词会更自然。",
            "这三个词看起来像同义词，但它们并不是在所有国家都能互换。理解它们的语境差异，可以帮助你在使用地址生成器时更快找到正确字段，也能减少复制到表单时的犹豫。"
          ],
          en: [
            "ZIP code usually refers specifically to US postal codes. Postal code is the broader international term. Postcode is especially common in UK usage.",
            "They are similar, but not perfectly interchangeable everywhere. Knowing the context helps you read fields and results more confidently."
          ],
          ja: [
            "ZIP Code は主にアメリカの郵便番号を指します。postal code はより広い国際用語で、postcode は特にイギリスでよく使われます。",
            "似た意味ですが、すべての国で完全に置き換えられるわけではありません。文脈を理解しておくと、フォームや結果表示が読みやすくなります。"
          ]
        }
      },
      {
        heading: text("不同国家为什么会用不同叫法", "Why different countries use different labels", "国によって呼び方が違う理由"),
        paragraphs: {
          zh: [
            "美国页面强调 ZIP Code 很自然，英国页面更适合写 postcode，而加拿大、日本、印度、香港等页面则更常见 postal code、邮编或本地语言里的对应表达。用户通常会直接用自己熟悉的词去搜索，也会根据这些词判断页面是不是符合本地习惯。",
            "所以当你在多国家地址工具里看到不同页面用了不同字段名，不一定是设计不统一，反而可能说明这个页面更贴近当地使用方式。对用户来说，这种本地化表达通常比一套名字全站通用更容易理解。"
          ],
          en: [
            "US pages naturally lean on ZIP code, UK pages often prefer postcode, and other countries may use postal code or a local-language label.",
            "So if a multi-country generator uses different field names on different pages, that is often a sign of localization rather than inconsistency."
          ],
          ja: [
            "アメリカでは ZIP Code、イギリスでは postcode、その他の国では postal code やローカル表現が使われることが多いです。",
            "そのため、多国籍ツールでページごとにラベルが違っていても、設計ミスではなくローカライズの一部であることがよくあります。"
          ]
        }
      },
      {
        heading: text("在地址表单里怎么判断该填哪一栏", "How to tell which field to fill in a form", "フォームでどの欄に入れるか判断する方法"),
        paragraphs: {
          zh: [
            "看到 ZIP Code 时，通常可以理解成美国邮编字段；看到 postcode，多半是英国或英式表单；看到 postal code，则要结合国家或页面标题判断。很多国际表单为了兼容多个国家，会统一写 Postal Code，但如果当前是美国地址，实际填的依然是 ZIP Code。",
            "最稳妥的方式，是先确认当前地址属于哪个国家，再看表单标题或国家选择器。只要国家和字段名能对上，填写就不会乱。地址生成器在这里很有帮助，因为它通常会把国家、州/地区和邮编字段一起展示，方便你快速核对。"
          ],
          en: [
            "If you see ZIP Code, it usually means a US postal field. Postcode often points to a UK-style form. Postal Code is broader and should be interpreted together with the selected country.",
            "The safest approach is to confirm the country first, then match the field label to that country. Generator tools help because they usually show the country, region, and postal field together."
          ],
          ja: [
            "ZIP Code は通常アメリカ向け、postcode はイギリス寄り、postal code はより広い国際表現として使われます。",
            "最も安全なのは、先に国を確認し、その国に合わせて欄名を読むことです。ジェネレーターは国、地域、郵便番号項目をまとめて見せてくれるため確認がしやすくなります。"
          ]
        }
      },
      {
        heading: text("为什么地址生成器里会看到不同名称", "Why address generators may show different naming", "住所ジェネレーターで名称が変わる理由"),
        paragraphs: {
          zh: [
            "一个做多国家地址的工具，通常不会把所有结果字段都写成同一个名字。美国页写 ZIP Code，英国页写 Postcode，日本页可能写 Postal Code 或邮编，这样用户一进入页面就更容易理解当前结果属于哪种地址体系。",
            "对实际使用来说，这种区别也很有价值。你在复制字段时，不必自己猜哪一项对应邮编，而是可以直接按页面里的命名拿去填表、做测试或导出演示数据。"
          ],
          en: [
            "A multi-country address tool will often rename the postal field by market. US pages may use ZIP Code, UK pages may use Postcode, and other pages may use Postal Code or a local term.",
            "That saves users from guessing which field maps to the postal value when copying results for forms, testing, or demos."
          ],
          ja: [
            "多国籍住所ツールでは、市場ごとに郵便番号のラベルを変えることがよくあります。アメリカなら ZIP Code、イギリスなら Postcode、他国では Postal Code や現地語表現になることがあります。",
            "これにより、利用者はどの項目をフォームへ貼ればよいかを直感的に判断しやすくなります。"
          ]
        }
      },
      {
        heading: text("常见误区和使用建议", "Common misunderstandings and practical tips", "よくある誤解と実用的なヒント"),
        paragraphs: {
          zh: [
            "最常见的误区，是把 ZIP Code 当成所有国家都通用的词，或者反过来在美国地址结果里完全不用 ZIP Code 这个更贴切的名称。还有一些用户看到 Postal Code 字段时，以为不能填美国邮编，其实很多国际表单就是这样命名的。",
            "实用建议很简单：先认国家，再认字段名，最后再复制结果。只要你理解 ZIP Code、Postal Code 和 Postcode 的对应关系，就能更顺畅地使用美国、英国、日本、加拿大等不同国家页面里的地址生成工具。"
          ],
          en: [
            "A common misunderstanding is treating ZIP code as a universal term, or doing the opposite and avoiding ZIP code even on clearly US-focused results.",
            "The practical rule is simple: identify the country first, match the field label second, and then copy the result. That makes multi-country tools much easier to use."
          ],
          ja: [
            "よくある誤解は、ZIP Code をすべての国で使える言葉だと思うこと、またはアメリカ結果でも ZIP Code を避けてしまうことです。",
            "実用的なコツは、先に国を確認し、その後で欄名を読み、最後に結果をコピーすることです。"
          ]
        }
      }
    ] as BlogSectionOverride[],
    relatedLinks: [
      relatedLink(
        text("美国地址生成器", "US Address Generator", "アメリカ住所ジェネレーター"),
        text("查看 ZIP Code 字段在美国页面里的实际展示方式。", "See how ZIP code is shown on the US page.", "アメリカページで ZIP Code がどう表示されるか確認できます。"),
        (locale) => getCountryPath(locale, "us")
      ),
      relatedLink(
        text("英国地址生成器", "UK Address Generator", "イギリス住所ジェネレーター"),
        text("查看英国页面如何使用 Postcode 字段。", "See how the UK page uses the Postcode field.", "イギリスページで Postcode がどう使われるか確認できます。"),
        (locale) => getCountryPath(locale, "uk")
      ),
      relatedLink(
        text("地址格式目录", "Address Format Directory", "住所形式ディレクトリ"),
        text("浏览不同国家的地址格式说明页面。", "Browse format guides for different countries.", "各国の住所形式ページをまとめて確認できます。"),
        (locale) => getFormatIndexPath(locale)
      )
    ]
  },
  "build-address-generator": {
    title: text(
      "地址生成器怎么用：地区筛选、复制、保存与分享指南",
      "How to Use an Address Generator: Region Filters, Copy, Save, and Share",
      "住所ジェネレーターの使い方: 地域フィルター、コピー、保存、共有ガイド"
    ),
    description: text(
      "从国家和地区筛选，到复制、保存、分享结果，讲清地址生成器在测试、演示、表单验证和数据填充场景中的实际用法。",
      "A practical guide to using an address generator with country filters, copy, save, and share features for testing, demos, and form validation.",
      "国や地域の絞り込みからコピー、保存、共有まで、住所ジェネレーターをテストやデモで使う流れを整理したガイドです。"
    ),
    sections: [
      {
        heading: text("先选国家和地区，再生成结果", "Choose the country and region before generating", "まず国と地域を選んでから生成する"),
        paragraphs: {
          zh: [
            "地址生成器最基础的用法，不是上来就点生成，而是先确认你需要哪个国家、哪个州、哪个地区。比如美国页面通常可以直接选州，日本页面更适合选都道府县，英国、加拿大、香港、印度等页面也会有各自更自然的地区筛选方式。",
            "先筛选再生成的好处很明显。你不需要在一堆随机结果里反复重试，而是能更快得到符合场景的地址，例如某个州的测试数据、某个地区的演示样例，或者某个国家本地化表单需要的结果。"
          ],
          en: [
            "The most useful way to start is not by clicking generate immediately, but by choosing the country and region you actually need. US pages often filter by state, Japan pages by prefecture, and other countries by their own familiar regional structure.",
            "Filtering first saves time. Instead of refreshing random results again and again, you can get data that already fits the state, region, or country you need for a test or demo."
          ],
          ja: [
            "住所ジェネレーターは、最初に国と地域を選ぶ使い方が最も実用的です。アメリカは州、日本は都道府県、その他の国もローカルに合う地域フィルターを使うことが多いです。",
            "先に絞り込むと、ランダム結果を何度も引き直す必要がなくなり、目的に合った住所をすばやく得られます。"
          ]
        }
      },
      {
        heading: text("生成结果里的字段该怎么看", "How to read the generated fields", "生成結果の項目をどう見るか"),
        paragraphs: {
          zh: [
            "一个完整的地址生成结果，通常不只是完整地址一行，还会包含姓名、性别、电话、街道、城市、州/地区、邮编和国家等字段。这样设计的目的，是让你可以按不同表单结构分别复制，而不是每次都从一整行文本里手动拆分信息。",
            "当你需要做注册测试、支付流程演示或数据库填充时，这种字段拆分非常重要。你可以只复制街道和城市，也可以一次性复制完整地址，还可以核对电话和邮编是否已经跟当前地区对应。"
          ],
          en: [
            "A good result usually includes more than one full-address line. It may also show name, gender, phone, street, city, region, postal code, and country so you can copy values field by field.",
            "That becomes especially useful in sign-up tests, checkout demos, and sample-data work where the form structure matters as much as the address itself."
          ],
          ja: [
            "使いやすい生成結果は、完全住所だけでなく、氏名、性別、電話、通り、都市、地域、郵便番号、国などを分けて表示します。",
            "登録テストや決済デモ、サンプルデータ作成では、この分割表示が非常に役立ちます。"
          ]
        }
      },
      {
        heading: text("复制、保存和分享分别适合什么场景", "When to use copy, save, and share", "コピー、保存、共有を使い分ける場面"),
        paragraphs: {
          zh: [
            "复制最适合快速填表。无论是点击完整地址，还是点击某个字段单独复制，核心目的都是减少重复输入。保存功能更适合把几条常用地址留作后续测试、截图或内部培训素材，而不必每次重新生成。",
            "分享功能则适合把某条结果发给同事、客户或团队成员做确认。相比长篇文字描述，一条带预览的分享结果更直观，也更方便在演示流程中复现同一个地址样本。"
          ],
          en: [
            "Copy is best for quick form filling. Save is useful when you want to keep a few good results for later testing, screenshots, or training material.",
            "Share is useful when a teammate or client needs to review the same generated example. A preview link is often easier to reuse than re-explaining the address in plain text."
          ],
          ja: [
            "コピーは素早いフォーム入力に最適です。保存は、あとで使いたい住所を手元に残したいときに便利です。",
            "共有は、同じ結果をチームや顧客と確認したいときに役立ちます。プレビュー付きの共有結果は説明より伝わりやすいです。"
          ]
        }
      },
      {
        heading: text("地址生成器适合哪些实际任务", "Which practical tasks benefit from an address generator", "住所ジェネレーターが向いている実務シーン"),
        paragraphs: {
          zh: [
            "地址生成器最常见的用途包括 QA 测试、注册和下单表单验证、数据库样例填充、产品演示、教学说明以及地址格式研究。你不一定需要每次都追求完全相同的结果，很多时候只要国家、地区、邮编和整体格式对得上，就足够支持大多数测试任务。",
            "如果工具还能按地区过滤，并在结果里显示电话、姓名和完整地址，它对演示价值会更高。因为你不仅得到一条地址，还得到一套更接近真实表单输入过程的数据组合。"
          ],
          en: [
            "Common use cases include QA testing, sign-up and checkout validation, sample-dataset creation, product demos, teaching materials, and address-format research.",
            "When the tool also exposes region filters, names, phones, and full addresses, it becomes more useful because it mirrors real form-entry flows more closely."
          ],
          ja: [
            "よくある用途は、QA テスト、登録や注文フォームの検証、サンプルデータ作成、製品デモ、教育資料、住所形式の確認です。",
            "地域フィルターや氏名、電話、完全住所まで表示されると、実際の入力フローに近い形で使えるようになります。"
          ]
        }
      },
      {
        heading: text("怎么判断生成结果是否更适合你的任务", "How to judge whether a result fits your task", "自分の用途に合う結果か判断する方法"),
        paragraphs: {
          zh: [
            "最简单的判断方法，是看这条结果是否满足你的输入结构。需要按州测试，就先看州是否正确；需要邮编校验，就先看邮编字段；需要演示表单，就看姓名、电话、街道和完整地址是否都已经准备好。地址生成器的价值，本质上是让你更快拿到“可直接使用”的结果。",
            "如果某个任务需要多条不同地区的数据，就把保存和地区筛选配合起来使用；如果只是临时填一个表单，就直接复制当前结果即可。学会按任务选择操作路径，地址工具会比单纯的随机地址列表好用得多。"
          ],
          en: [
            "The simplest check is whether the result matches the structure your task expects. If you need a state-specific test, confirm the state first. If you need postal validation, verify the postal field first.",
            "For multiple-region work, combine filters with save. For one-off form filling, direct copy is usually enough. Matching the workflow to the task is what makes a generator genuinely useful."
          ],
          ja: [
            "最も簡単な判断基準は、その結果が自分の入力構造に合っているかどうかです。州指定テストなら州、郵便番号確認なら郵便番号を先に見ます。",
            "複数地域の結果が必要ならフィルターと保存を組み合わせ、単発入力ならそのままコピーするのが効率的です。"
          ]
        }
      }
    ] as BlogSectionOverride[],
    relatedLinks: [
      relatedLink(
        text("美国地址生成器", "US Address Generator", "アメリカ住所ジェネレーター"),
        text("体验州筛选、复制、保存和分享功能在美国页面里的使用方式。", "Try region filters, copy, save, and share features on the US page.", "アメリカページで地域フィルター、コピー、保存、共有の流れを試せます。"),
        (locale) => getCountryPath(locale, "us")
      ),
      relatedLink(
        text("国家地址目录", "Country Directory", "国別住所ディレクトリ"),
        text("切换到不同国家页面，比较各国的地区筛选方式。", "Switch across country pages and compare region-filter patterns.", "各国ページを切り替えて、地域フィルターの違いを確認できます。"),
        (locale) => getCountriesPath(locale)
      ),
      relatedLink(
        text("博客首页", "Blog Index", "ブログ一覧"),
        text("继续阅读更多地址格式和工具使用相关文章。", "Read more articles about address formats and generator usage.", "住所形式やツール活用に関する他の記事も確認できます。"),
        (locale) => getBlogIndexPath(locale)
      )
    ]
  }
};

export function withBlogContent(post: BlogPost): BlogPost {
  return overrides[post.slug] ? { ...post, ...overrides[post.slug] } : post;
}
