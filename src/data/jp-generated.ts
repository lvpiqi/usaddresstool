import type { AddressRecord, RegionRecord } from "./countries";
import type { LocalizedText } from "./site";

type JapanRegionCode =
  | "TOKYO"
  | "KANAGAWA"
  | "AICHI"
  | "OSAKA"
  | "KYOTO"
  | "HYOGO"
  | "HOKKAIDO"
  | "FUKUOKA";

interface StreetSeed {
  slug: string;
  streetEn: string;
  streetNative: string;
}

interface LocalitySeed {
  slug: string;
  cityEn: string;
  cityNative: string;
  districtEn?: string;
  districtNative?: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  streets: StreetSeed[];
}

interface RegionSeed {
  code: JapanRegionCode;
  name: LocalizedText;
  localities: LocalitySeed[];
}

const text = (zh: string, en: string, ja: string): LocalizedText => ({ zh, en, ja });

const localizedNative = (english: string, native: string): LocalizedText =>
  text(native, english, native);

const localizedMaybeNative = (
  english: string,
  native?: string
): LocalizedText | undefined => {
  if (native === undefined) {
    return undefined;
  }

  return text(native, english, native);
};

const defaultRecipient = text("测试收件人", "Test Receiver", "テスト受取人");

function locality(
  slug: string,
  cityEn: string,
  cityNative: string,
  districtEn: string | undefined,
  districtNative: string | undefined,
  postalCode: string,
  latitude: number,
  longitude: number,
  streets: Array<[string, string, string]>
): LocalitySeed {
  return {
    slug,
    cityEn,
    cityNative,
    districtEn,
    districtNative,
    postalCode,
    latitude,
    longitude,
    streets: streets.map(([streetSlug, streetEn, streetNative]) => ({
      slug: streetSlug,
      streetEn,
      streetNative
    }))
  };
}

function buildFullAddress(
  regionName: LocalizedText,
  locality: LocalitySeed,
  street: StreetSeed
): LocalizedText {
  const englishParts = [
    street.streetEn,
    locality.districtEn,
    locality.cityEn,
    `${regionName.en} ${locality.postalCode}`,
    "Japan"
  ].filter(Boolean);

  const nativeCore = `${regionName.ja}${locality.cityNative}${locality.districtNative ?? ""}${street.streetNative}`;

  return text(
    `〒${locality.postalCode} ${regionName.zh}${locality.cityNative}${locality.districtNative ?? ""}${street.streetNative}, 日本`,
    englishParts.join(", "),
    `〒${locality.postalCode} ${nativeCore}, 日本`
  );
}

function offsetCoordinate(base: number, index: number, offset: number) {
  return Number((base + index * offset).toFixed(6));
}

const regionSeeds: RegionSeed[] = [
  {
    code: "TOKYO",
    name: text("东京都", "Tokyo", "東京都"),
    localities: [
      locality("shinjuku", "Tokyo", "", "Shinjuku", "新宿区", "160-0022", 35.6938, 139.7034, [
        ["shinjuku", "3-14 Shinjuku", "新宿3-14"],
        ["kabukicho", "1-20 Kabukicho", "歌舞伎町1-20"],
        ["nishi-shinjuku", "2-8 Nishi-Shinjuku", "西新宿2-8"]
      ]),
      locality("shibuya", "Tokyo", "", "Shibuya", "渋谷区", "150-0041", 35.6618, 139.7041, [
        ["jinnan", "1-2 Jinnan", "神南1-2"],
        ["dogenzaka", "2-21 Dogenzaka", "道玄坂2-21"],
        ["jingumae", "1-19 Jingumae", "神宮前1-19"]
      ]),
      locality("minato", "Tokyo", "", "Minato", "港区", "106-0032", 35.6628, 139.731, [
        ["roppongi", "4-2 Roppongi", "六本木4-2"],
        ["shibakoen", "2-1 Shibakoen", "芝公園2-1"],
        ["azabudai", "1-6 Azabudai", "麻布台1-6"]
      ]),
      locality("chiyoda", "Tokyo", "", "Chiyoda", "千代田区", "100-0005", 35.6812, 139.7671, [
        ["marunouchi", "1-1 Marunouchi", "丸の内1-1"],
        ["yurakucho", "2-3 Yurakucho", "有楽町2-3"],
        ["kudanminami", "1-6 Kudanminami", "九段南1-6"]
      ]),
      locality("setagaya", "Tokyo", "", "Setagaya", "世田谷区", "154-0004", 35.6436, 139.6692, [
        ["sangenjaya", "4-1 Sangenjaya", "三軒茶屋4-1"],
        ["kitazawa", "2-29 Kitazawa", "北沢2-29"],
        ["futako", "1-7 Futako", "二子1-7"]
      ]),
      locality("taito", "Tokyo", "", "Taito", "台東区", "111-0032", 35.712, 139.7967, [
        ["asakusa", "1-1 Asakusa", "浅草1-1"],
        ["ueno", "4-7 Ueno", "上野4-7"],
        ["kuramae", "2-18 Kuramae", "蔵前2-18"]
      ]),
      locality("hachioji", "Hachioji", "八王子市", undefined, undefined, "192-0083", 35.6556, 139.3389, [
        ["asahicho", "1-1 Asahicho", "旭町1-1"],
        ["myojincho", "5-6 Myojincho", "明神町5-6"],
        ["minamino", "2-3 Minamino", "みなみ野2-3"]
      ]),
      locality("machida", "Machida", "町田市", undefined, undefined, "194-0013", 35.5438, 139.4455, [
        ["haramachida", "1-1 Haramachida", "原町田1-1"],
        ["tamagawagakuen", "3-8 Tamagawagakuen", "玉川学園3-8"],
        ["minamimachida", "2-12 Minamimachida", "南町田2-12"]
      ]),
      locality("mitaka", "Mitaka", "三鷹市", undefined, undefined, "181-0013", 35.6835, 139.5596, [
        ["shimorenjaku", "1-1 Shimorenjaku", "下連雀1-1"],
        ["kamirenjaku", "3-5 Kamirenjaku", "上連雀3-5"],
        ["osawa", "2-7 Osawa", "大沢2-7"]
      ]),
      locality("chofu", "Chofu", "調布市", undefined, undefined, "182-0026", 35.6519, 139.5434, [
        ["kojimacho", "1-1 Kojimacho", "小島町1-1"],
        ["fuda", "5-31 Fuda", "布田5-31"],
        ["sengawacho", "1-34 Sengawacho", "仙川町1-34"]
      ])
    ]
  },
  {
    code: "KANAGAWA",
    name: text("神奈川县", "Kanagawa", "神奈川県"),
    localities: [
      locality("yokohama-naka", "Yokohama", "横浜市", "Naka Ward", "中区", "231-0005", 35.4475, 139.6423, [
        ["bashamichi", "4-45 Bashamichi", "馬車道4-45"],
        ["yamashitacho", "10 Yamashitacho", "山下町10"],
        ["nihonodori", "11 Nihonodori", "日本大通11"]
      ]),
      locality("yokohama-nishi", "Yokohama", "横浜市", "Nishi Ward", "西区", "220-0011", 35.466, 139.6227, [
        ["takashima", "2-18 Takashima", "高島2-18"],
        ["kitasaiwai", "1-6 Kitasaiwai", "北幸1-6"],
        ["minamisaiwai", "2-12 Minamisaiwai", "南幸2-12"]
      ]),
      locality("yokohama-kohoku", "Yokohama", "横浜市", "Kohoku Ward", "港北区", "222-0033", 35.506, 139.6177, [
        ["shinyokohama", "2-5 Shinyokohama", "新横浜2-5"],
        ["kikuna", "6-14 Kikuna", "菊名6-14"],
        ["tsunashima", "1-9 Tsunashima", "綱島1-9"]
      ]),
      locality("kawasaki-kawasaki", "Kawasaki", "川崎市", "Kawasaki Ward", "川崎区", "210-0007", 35.5309, 139.703, [
        ["ekimae-honcho", "12 Ekimae-Honcho", "駅前本町12"],
        ["isago", "1-8 Isago", "砂子1-8"],
        ["miyamotocho", "3-25 Miyamotocho", "宮本町3-25"]
      ]),
      locality("fujisawa", "Fujisawa", "藤沢市", undefined, undefined, "251-0052", 35.3387, 139.491, [
        ["minamifujisawa", "2-1 Minamifujisawa", "南藤沢2-1"],
        ["katasekaigan", "2-19 Katasekaigan", "片瀬海岸2-19"],
        ["kugenumakaigan", "7-14 Kugenumakaigan", "鵠沼海岸7-14"]
      ]),
      locality("kamakura", "Kamakura", "鎌倉市", undefined, undefined, "248-0006", 35.3193, 139.5467, [
        ["komachi", "1-6 Komachi", "小町1-6"],
        ["yukinoshita", "2-10 Yukinoshita", "雪ノ下2-10"],
        ["ofuna", "1-26 Ofuna", "大船1-26"]
      ]),
      locality("yokosuka", "Yokosuka", "横須賀市", undefined, undefined, "238-0007", 35.2813, 139.6722, [
        ["wakamatsucho", "2-30 Wakamatsucho", "若松町2-30"],
        ["honcho", "1-11 Honcho", "本町1-11"],
        ["oppama", "1-2 Oppama-Higashicho", "追浜東町1-2"]
      ]),
      locality("sagamihara-minami", "Sagamihara", "相模原市", "Minami Ward", "南区", "252-0303", 35.5321, 139.4377, [
        ["sagamiono", "3-8 Sagamiono", "相模大野3-8"],
        ["minamidai", "5-12 Minamidai", "南台5-12"],
        ["kobuchi", "2-1 Kobuchi", "古淵2-1"]
      ]),
      locality("odawara", "Odawara", "小田原市", undefined, undefined, "250-0011", 35.2552, 139.159, [
        ["honcho", "1-7 Honcho", "本町1-7"],
        ["sakaecho", "2-8 Sakaecho", "栄町2-8"],
        ["hamacho", "3-3 Hamacho", "浜町3-3"]
      ]),
      locality("atsugi", "Atsugi", "厚木市", undefined, undefined, "243-0018", 35.4437, 139.3627, [
        ["nakacho", "2-12 Nakacho", "中町2-12"],
        ["izumicho", "1-1 Izumicho", "泉町1-1"],
        ["asahicho", "4-14 Asahicho", "旭町4-14"]
      ])
    ]
  },
  {
    code: "AICHI",
    name: text("爱知县", "Aichi", "愛知県"),
    localities: [
      locality("nagoya-naka", "Nagoya", "名古屋市", "Naka Ward", "中区", "460-0008", 35.1709, 136.9066, [
        ["sakae", "3-15 Sakae", "栄3-15"],
        ["nishiki", "2-17 Nishiki", "錦2-17"],
        ["osu", "2-21 Osu", "大須2-21"]
      ]),
      locality("nagoya-nakamura", "Nagoya", "名古屋市", "Nakamura Ward", "中村区", "450-0002", 35.1702, 136.8816, [
        ["meieki", "3-28 Meieki", "名駅3-28"],
        ["tsubakicho", "6-9 Tsubakicho", "椿町6-9"],
        ["noritake", "1-23 Noritake", "則武1-23"]
      ]),
      locality("nagoya-chikusa", "Nagoya", "名古屋市", "Chikusa Ward", "千種区", "464-0850", 35.1668, 136.9515, [
        ["imaike", "1-6 Imaike", "今池1-6"],
        ["hoshigaoka", "1-1 Hoshigaoka", "星が丘1-1"],
        ["uchiyama", "3-29 Uchiyama", "内山3-29"]
      ]),
      locality("toyota", "Toyota", "豊田市", undefined, undefined, "471-0025", 35.0824, 137.1562, [
        ["nishimachi", "5-5 Nishimachi", "西町5-5"],
        ["wakamiyacho", "2-70 Wakamiyacho", "若宮町2-70"],
        ["kitamachi", "3-17 Kitamachi", "喜多町3-17"]
      ]),
      locality("okazaki", "Okazaki", "岡崎市", undefined, undefined, "444-0044", 34.9548, 137.1748, [
        ["koseidoori", "3-1 Koseidori", "康生通3-1"],
        ["renjakucho", "1-14 Renjakucho", "連尺通1-14"],
        ["myodaiji", "2-9 Myodaiji-Honmachi", "明大寺本町2-9"]
      ]),
      locality("ichinomiya", "Ichinomiya", "一宮市", undefined, undefined, "491-0858", 35.3039, 136.8029, [
        ["sakae", "1-10 Sakae", "栄1-10"],
        ["honmachi", "2-4 Honmachi", "本町2-4"],
        ["shinsei", "1-7 Shinsei", "新生1-7"]
      ]),
      locality("toyohashi", "Toyohashi", "豊橋市", undefined, undefined, "440-0888", 34.7692, 137.3915, [
        ["ekimae-odori", "1-55 Ekimae-Odori", "駅前大通1-55"],
        ["hirokoji", "2-7 Hirokoji-Dori", "広小路通2-7"],
        ["matsubacho", "1-4 Matsubacho", "松葉町1-4"]
      ]),
      locality("seto", "Seto", "瀬戸市", undefined, undefined, "489-0813", 35.2237, 137.0845, [
        ["eiyocho", "3-13 Eiyocho", "栄町3-13"],
        ["miyazatocho", "30 Miyazatocho", "宮里町30"],
        ["shinmeicho", "2-7 Shinmeicho", "神明町2-7"]
      ]),
      locality("kasugai", "Kasugai", "春日井市", undefined, undefined, "486-0844", 35.2476, 136.9723, [
        ["torimatsu", "5-44 Torimatsu-cho", "鳥居松町5-44"],
        ["chuo-dai", "2-4 Chuo-Dai", "中央台2-4"],
        ["takaki", "1-16 Takaki-cho", "高木町1-16"]
      ]),
      locality("inuyama", "Inuyama", "犬山市", undefined, undefined, "484-0081", 35.3799, 136.943, [
        ["inuyama", "3 Inuyama", "犬山3"],
        ["nakayama", "1-2 Nakayama-cho", "中山町1-2"],
        ["higashikoken", "2 Higashikoken", "東古券2"]
      ])
    ]
  },
  {
    code: "OSAKA",
    name: text("大阪府", "Osaka", "大阪府"),
    localities: [
      locality("osaka-chuo", "Osaka", "大阪市", "Chuo Ward", "中央区", "541-0055", 34.6839, 135.5022, [
        ["honmachi", "4-2 Honmachi", "本町4-2"],
        ["kitahama", "2-1 Kitahama", "北浜2-1"],
        ["shimanouchi", "1-18 Shimanouchi", "島之内1-18"]
      ]),
      locality("osaka-kita", "Osaka", "大阪市", "Kita Ward", "北区", "530-0001", 34.7055, 135.4983, [
        ["umeda", "1-1 Umeda", "梅田1-1"],
        ["dojima", "2-4 Dojima", "堂島2-4"],
        ["tenjinbashi", "3-6 Tenjinbashi", "天神橋3-6"]
      ]),
      locality("osaka-naniwa", "Osaka", "大阪市", "Naniwa Ward", "浪速区", "556-0011", 34.6636, 135.4991, [
        ["nambanaka", "2-10 Nambanaka", "難波中2-10"],
        ["ebisuhigashi", "1-18 Ebisuhigashi", "恵美須東1-18"],
        ["motomachi", "1-5 Motomachi", "元町1-5"]
      ]),
      locality("osaka-tennoji", "Osaka", "大阪市", "Tennoji Ward", "天王寺区", "543-0055", 34.6581, 135.5196, [
        ["hidenincho", "10-39 Hidenincho", "悲田院町10-39"],
        ["uehommachi", "6-7 Uehommachi", "上本町6-7"],
        ["shitennoji", "1-13 Shitennoji", "四天王寺1-13"]
      ]),
      locality("sakai-sakai", "Sakai", "堺市", "Sakai Ward", "堺区", "590-0952", 34.5733, 135.4831, [
        ["ichinocho", "1-1 Ichinocho", "市之町1-1"],
        ["ebaraji", "1-3 Ebaraji-cho", "戎之町1-3"],
        ["shinmachi", "5-9 Shinmachi", "新町5-9"]
      ]),
      locality("suita", "Suita", "吹田市", undefined, undefined, "564-0082", 34.7594, 135.5163, [
        ["katayamacho", "1-3 Katayamacho", "片山町1-3"],
        ["esakacho", "1-23 Esakacho", "江坂町1-23"],
        ["senriyama", "2-2 Senriyama", "千里山2-2"]
      ]),
      locality("toyonaka", "Toyonaka", "豊中市", undefined, undefined, "560-0021", 34.7817, 135.4696, [
        ["honmachi", "1-1 Honmachi", "本町1-1"],
        ["shibahara", "4-9 Shibaharacho", "柴原町4-9"],
        ["shonai", "2-7 Shonai-Nishimachi", "庄内西町2-7"]
      ]),
      locality("higashiosaka", "Higashiosaka", "東大阪市", undefined, undefined, "577-0056", 34.6795, 135.6009, [
        ["nagayacho", "3-6 Nagayacho", "長堂3-6"],
        ["mikuriya", "2-3 Mikuriya-Minami", "御厨南2-3"],
        ["yoshita", "1-11 Yoshita", "吉田1-11"]
      ]),
      locality("hirakata", "Hirakata", "枚方市", undefined, undefined, "573-0032", 34.8141, 135.6509, [
        ["okahigashi", "14-1 Okahigashi-cho", "岡東町14-1"],
        ["kawaharacho", "9-10 Kawaharacho", "川原町9-10"],
        ["korigaoka", "1-1 Higashikorigaoka", "東香里丘1-1"]
      ]),
      locality("takatsuki", "Takatsuki", "高槻市", undefined, undefined, "569-0803", 34.851, 135.6177, [
        ["takatsuki", "6-24 Takatsuki-cho", "高槻町6-24"],
        ["johoku", "2-3 Johoku-cho", "城北町2-3"],
        ["akutagawa", "1-14 Akutagawacho", "芥川町1-14"]
      ])
    ]
  },
  {
    code: "KYOTO",
    name: text("京都府", "Kyoto", "京都府"),
    localities: [
      locality("kyoto-shimogyo", "Kyoto", "京都市", "Shimogyo Ward", "下京区", "600-8216", 34.9855, 135.7585, [
        ["higashishiokoji", "901 Higashishiokoji", "東塩小路901"],
        ["ayamakoji", "2 Ayamakoji-Dori", "綾小路通2"],
        ["takatsuji", "4 Takatsuji-Dori", "高辻通4"]
      ]),
      locality("kyoto-sakyo", "Kyoto", "京都市", "Sakyo Ward", "左京区", "606-8392", 35.0192, 135.7732, [
        ["okazaki", "26 Okazaki", "岡崎26"],
        ["shimogamo", "13 Shimogamo", "下鴨13"],
        ["ichijoji", "7 Ichijoji", "一乗寺7"]
      ]),
      locality("kyoto-nakagyo", "Kyoto", "京都市", "Nakagyo Ward", "中京区", "604-8005", 35.0107, 135.768, [
        ["kawaramachi", "537 Kawaramachi", "河原町537"],
        ["karasuma", "88 Karasuma", "烏丸88"],
        ["sanjo", "2 Sanjo-Dori", "三条通2"]
      ]),
      locality("kyoto-fushimi", "Kyoto", "京都市", "Fushimi Ward", "伏見区", "612-0881", 34.9373, 135.7613, [
        ["fukakusa", "3 Fukakusa", "深草3"],
        ["momoyama", "1 Momoyamacho", "桃山町1"],
        ["daikoku", "2 Daikoku-cho", "大黒町2"]
      ]),
      locality("uji", "Uji", "宇治市", undefined, undefined, "611-0021", 34.8896, 135.7997, [
        ["uji", "33 Uji", "宇治33"],
        ["ogura", "4-2 Ogura", "小倉4-2"],
        ["rokujizo", "6-5 Rokujizo", "六地蔵6-5"]
      ]),
      locality("kameoka", "Kameoka", "亀岡市", undefined, undefined, "621-0804", 35.0137, 135.5829, [
        ["oicho", "1-4 Oicho", "追分町1-4"],
        ["kitafuruhata", "2-3 Kitafuruhata", "北古世町2-3"],
        ["asahi", "1 Asahimachi", "旭町1"]
      ]),
      locality("fukuchiyama", "Fukuchiyama", "福知山市", undefined, undefined, "620-0045", 35.2963, 135.126, [
        ["ekimae", "140 Ekimaecho", "駅前町140"],
        ["atsunaka", "1-7 Atsunaka-cho", "厚中町1-7"],
        ["naiki", "2-8 Naiki", "内記2-8"]
      ]),
      locality("maizuru", "Maizuru", "舞鶴市", undefined, undefined, "624-0841", 35.4748, 135.385, [
        ["hikitsuchi", "23 Hikitsuchi", "引土23"],
        ["minamikata", "14 Minamikata", "南田辺14"],
        ["hamacho", "3 Hamacho", "浜町3"]
      ]),
      locality("nagaokakyo", "Nagaokakyo", "長岡京市", undefined, undefined, "617-0826", 34.9264, 135.6972, [
        ["kaide", "1 Kaide", "開田1"],
        ["tenjin", "2-15 Tenjin", "天神2-15"],
        ["kotari", "3-1 Kotari", "神足3-1"]
      ]),
      locality("joyo", "Joyo", "城陽市", undefined, undefined, "610-0121", 34.8534, 135.7797, [
        ["terada", "1-4 Terada", "寺田1-4"],
        ["hirakawa", "9 Hirakawa", "平川9"],
        ["tomino", "5 Tomino", "富野5"]
      ])
    ]
  },
  {
    code: "HYOGO",
    name: text("兵库县", "Hyogo", "兵庫県"),
    localities: [
      locality("kobe-chuo", "Kobe", "神戸市", "Chuo Ward", "中央区", "650-0021", 34.6913, 135.1955, [
        ["sannomiyacho", "1-10 Sannomiyacho", "三宮町1-10"],
        ["kaigandori", "3 Kaigandori", "海岸通3"],
        ["nakayamate", "2 Nakayamate-Dori", "中山手通2"]
      ]),
      locality("kobe-nada", "Kobe", "神戸市", "Nada Ward", "灘区", "657-0846", 34.7087, 135.2311, [
        ["iwaya", "2-2 Iwaya-Naka", "岩屋中町2-2"],
        ["rokkomichi", "4-1 Rokkomichi", "六甲道4-1"],
        ["mori", "3-5 Morigo", "森後町3-5"]
      ]),
      locality("kobe-suma", "Kobe", "神戸市", "Suma Ward", "須磨区", "654-0046", 34.6517, 135.1337, [
        ["takamatsu", "1-1 Takamatsucho", "高松町1-1"],
        ["myohoji", "2-6 Myohojicho", "妙法寺町2-6"],
        ["nakaochiai", "3-4 Nakaochiai", "中落合3-4"]
      ]),
      locality("himeji", "Himeji", "姫路市", undefined, undefined, "670-0927", 34.8327, 134.693, [
        ["ekimae", "188 Ekimaecho", "駅前町188"],
        ["honmachi", "68 Honmachi", "本町68"],
        ["minamimachi", "76 Minamimachi", "南町76"]
      ]),
      locality("nishinomiya", "Nishinomiya", "西宮市", undefined, undefined, "662-0918", 34.7378, 135.3416, [
        ["rokutanji", "10 Rokutanji", "六湛寺町10"],
        ["ikedacho", "9 Ikedacho", "池田町9"],
        ["wabicho", "4 Wabicho", "和上町4"]
      ]),
      locality("amagasaki", "Amagasaki", "尼崎市", undefined, undefined, "660-0881", 34.7215, 135.4068, [
        ["showadori", "1-1 Showadori", "昭和通1-1"],
        ["higashinaniwa", "5-3 Higashinaniwa", "東難波町5-3"],
        ["tachibana", "2-8 Tachibanacho", "立花町2-8"]
      ]),
      locality("akashi", "Akashi", "明石市", undefined, undefined, "673-0892", 34.6481, 134.997, [
        ["honmachi", "1-2 Honmachi", "本町1-2"],
        ["okubo", "2-6 Okubocho", "大久保町2-6"],
        ["kaminogo", "3-4 Kaminogo", "上ノ郷3-4"]
      ]),
      locality("takarazuka", "Takarazuka", "宝塚市", undefined, undefined, "665-0845", 34.7994, 135.3569, [
        ["sakaemachi", "2-1 Sakaemachi", "栄町2-1"],
        ["minamiguchi", "1-8 Minamiguchi", "南口1-8"],
        ["mefu", "3-3 Mefu", "売布3-3"]
      ]),
      locality("ashiya", "Ashiya", "芦屋市", undefined, undefined, "659-0093", 34.7284, 135.302, [
        ["funadocho", "1-31 Funadocho", "船戸町1-31"],
        ["ochaya", "6 Ochayacho", "茶屋之町6"],
        ["narihira", "4 Narihira-cho", "業平町4"]
      ]),
      locality("itami", "Itami", "伊丹市", undefined, undefined, "664-0858", 34.7842, 135.4012, [
        ["nishidai", "1-1 Nishidai", "西台1-1"],
        ["chuo", "4-2 Chuo", "中央4-2"],
        ["miyanomae", "2-5 Miyanomae", "宮ノ前2-5"]
      ])
    ]
  },
  {
    code: "HOKKAIDO",
    name: text("北海道", "Hokkaido", "北海道"),
    localities: [
      locality("sapporo-chuo", "Sapporo", "札幌市", "Chuo Ward", "中央区", "060-0061", 43.0586, 141.3545, [
        ["odori", "1 Odori-Nishi", "大通西1"],
        ["minami1", "1 Minami-Ichijo-Nishi", "南一条西1"],
        ["kita1", "3 Kita-Ichijo-Nishi", "北一条西3"]
      ]),
      locality("sapporo-kita", "Sapporo", "札幌市", "Kita Ward", "北区", "060-0807", 43.071, 141.3507, [
        ["kita7", "7 Kita-Nanajo-Nishi", "北七条西7"],
        ["kita24", "5 Kita-Nijuyojo-Nishi", "北二十四条西5"],
        ["asabu", "3 Asabu", "麻生3"]
      ]),
      locality("sapporo-atsubetsu", "Sapporo", "札幌市", "Atsubetsu Ward", "厚別区", "004-0052", 43.0368, 141.4711, [
        ["atsubetsu", "2 Atsubetsu-Chuo", "厚別中央2"],
        ["oyachi", "4 Oyachi", "大谷地4"],
        ["shinsapporo", "5 Shinsapporo", "新さっぽろ5"]
      ]),
      locality("hakodate", "Hakodate", "函館市", undefined, undefined, "040-0063", 41.7687, 140.7288, [
        ["wakamatsu", "12 Wakamatsucho", "若松町12"],
        ["suehiro", "7 Suehirocho", "末広町7"],
        ["goryokaku", "3 Goryokaku-cho", "五稜郭町3"]
      ]),
      locality("otaru", "Otaru", "小樽市", undefined, undefined, "047-0031", 43.1907, 141.0024, [
        ["ironai", "1 Ironai", "色内1"],
        ["sakaimachi", "4 Sakaimachi", "堺町4"],
        ["hanazono", "2 Hanazono", "花園2"]
      ]),
      locality("asahikawa", "Asahikawa", "旭川市", undefined, undefined, "070-0030", 43.7706, 142.365, [
        ["miyashita", "7 Miyashita-Dori", "宮下通7"],
        ["sanjo", "8 Sanjo-Dori", "三条通8"],
        ["asahi", "2 Asahi-cho", "旭町2"]
      ]),
      locality("obihiro", "Obihiro", "帯広市", undefined, undefined, "080-0012", 42.923, 143.1969, [
        ["nishi2", "10 Nishi-Nijo-Minami", "西二条南10"],
        ["odori", "9 Odori-Minami", "大通南9"],
        ["inada", "1 Inadacho", "稲田町1"]
      ]),
      locality("kushiro", "Kushiro", "釧路市", undefined, undefined, "085-0015", 42.9849, 144.3816, [
        ["kitaodori", "3 Kitaodori", "北大通3"],
        ["suehiro", "5 Suehirocho", "末広町5"],
        ["nishiki", "2 Nishikicho", "錦町2"]
      ]),
      locality("tomakomai", "Tomakomai", "苫小牧市", undefined, undefined, "053-0022", 42.6384, 141.6032, [
        ["omotemachi", "2 Omotemachi", "表町2"],
        ["oji", "1 Ojicho", "王子町1"],
        ["futaba", "3 Futabacho", "双葉町3"]
      ]),
      locality("kitami", "Kitami", "北見市", undefined, undefined, "090-0040", 43.8031, 143.8958, [
        ["odori", "5 Odori-Nishi", "大通西5"],
        ["kita4", "4 Kita-Yojo-Nishi", "北四条西4"],
        ["tonden", "1 Tonden-Nishimachi", "とん田西町1"]
      ])
    ]
  },
  {
    code: "FUKUOKA",
    name: text("福冈县", "Fukuoka", "福岡県"),
    localities: [
      locality("fukuoka-hakata", "Fukuoka", "福岡市", "Hakata Ward", "博多区", "812-0011", 33.5902, 130.42, [
        ["hakataekimae", "1-1 Hakataekimae", "博多駅前1-1"],
        ["reisenmachi", "2-4 Reisenmachi", "冷泉町2-4"],
        ["gionmachi", "8 Gionmachi", "祇園町8"]
      ]),
      locality("fukuoka-chuo", "Fukuoka", "福岡市", "Chuo Ward", "中央区", "810-0001", 33.5892, 130.4017, [
        ["tenjin", "2-5 Tenjin", "天神2-5"],
        ["daimyo", "1-12 Daimyo", "大名1-12"],
        ["yakuin", "3-3 Yakuin", "薬院3-3"]
      ]),
      locality("fukuoka-sawara", "Fukuoka", "福岡市", "Sawara Ward", "早良区", "814-0001", 33.5797, 130.3488, [
        ["momochihama", "2-3 Momochihama", "百道浜2-3"],
        ["nishijin", "3-10 Nishijin", "西新3-10"],
        ["fujisaki", "1-1 Fujisaki", "藤崎1-1"]
      ]),
      locality("kitakyushu-kokurakita", "Kitakyushu", "北九州市", "Kokurakita Ward", "小倉北区", "802-0001", 33.8831, 130.8752, [
        ["asano", "2-14 Asano", "浅野2-14"],
        ["uomachi", "1-4 Uomachi", "魚町1-4"],
        ["bashaku", "2-3 Bashaku", "馬借2-3"]
      ]),
      locality("kitakyushu-yahatanishi", "Kitakyushu", "北九州市", "Yahatanishi Ward", "八幡西区", "806-0021", 33.8666, 130.7662, [
        ["kurosaki", "3-1 Kurosaki", "黒崎3-1"],
        ["kumade", "2-1 Kumade", "熊手2-1"],
        ["jinnai", "1-4 Jinnai", "陣内1-4"]
      ]),
      locality("kurume", "Kurume", "久留米市", undefined, undefined, "830-0032", 33.319, 130.5086, [
        ["higashimachi", "31 Higashimachi", "東町31"],
        ["mutsumon", "9 Mutsumon", "六ツ門9"],
        ["honmachi", "14 Honmachi", "本町14"]
      ]),
      locality("omuta", "Omuta", "大牟田市", undefined, undefined, "836-0843", 33.0298, 130.4456, [
        ["fuji", "2 Fuji-cho", "不知火町2"],
        ["kawaguchi", "1 Kawaguchi", "川口1"],
        ["yotsuyama", "4 Yotsuyama", "四ツ山町4"]
      ]),
      locality("iizuka", "Iizuka", "飯塚市", undefined, undefined, "820-0040", 33.6459, 130.6914, [
        ["yoshio", "1 Yoshio", "吉尾1"],
        ["shiniizuka", "6 Shin-Iizuka", "新飯塚6"],
        ["honmachi", "11 Honmachi", "本町11"]
      ]),
      locality("kasuga", "Kasuga", "春日市", undefined, undefined, "816-0802", 33.5322, 130.4705, [
        ["kasugabaru", "3 Kasugabaru-Kita", "春日原北町3"],
        ["otogana", "2 Otogana", "大土居2"],
        ["minamikasuga", "1 Minami-Kasuga", "南春日1"]
      ]),
      locality("dazaifu", "Dazaifu", "太宰府市", undefined, undefined, "818-0117", 33.518, 130.5239, [
        ["saidaifu", "4 Saidaifu", "宰府4"],
        ["kanzeonji", "2 Kanzeonji", "観世音寺2"],
        ["gojo", "3 Gojo", "五条3"]
      ])
    ]
  }
];

export const jpGeneratedRegions: RegionRecord[] = regionSeeds.map((region) => ({
  code: region.code,
  name: region.name
}));

export const jpGeneratedAddresses: AddressRecord[] = regionSeeds.flatMap((region) =>
  region.localities.flatMap((locality) =>
    locality.streets.map((street, index) => ({
      id: `jp-${region.code.toLowerCase()}-${locality.slug}-${street.slug}`,
      regionCode: region.code,
      venue: localizedNative(street.streetEn, street.streetNative),
      recipient: defaultRecipient,
      street: street.streetEn,
      streetLocalized: localizedNative(street.streetEn, street.streetNative),
      district: locality.districtEn,
      districtLocalized: localizedMaybeNative(locality.districtEn ?? "", locality.districtNative),
      city: locality.cityEn,
      cityLocalized: text(locality.cityNative, locality.cityEn, locality.cityNative),
      postalCode: locality.postalCode,
      phone: "+81 3-3000-0000",
      email: `jp.${region.code.toLowerCase()}.${locality.slug}.${street.slug}@example.dev`,
      fullAddress: buildFullAddress(region.name, locality, street),
      latitude: offsetCoordinate(locality.latitude, index, 0.0022),
      longitude: offsetCoordinate(locality.longitude, index, 0.0027)
    }))
  )
);
