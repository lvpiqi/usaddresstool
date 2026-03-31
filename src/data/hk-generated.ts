import { buildGeneratedCountryData, locality, street, text } from "./generated-country-utils";

const hkData = buildGeneratedCountryData(
  "hk",
  [
    {
      code: "HKI",
      name: text("港岛", "Hong Kong Island", "香港島"),
      localities: [
        locality("central", "Hong Kong", "000000", 22.2819, 114.1586, [
          street("queens", "33 Queen's Road Central"),
          street("desvoeux", "12 Des Voeux Road Central"),
          street("icehouse", "18 Ice House Street"),
          street("wellington", "88 Wellington Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Central",
          districtZh: "中环",
          districtJa: "セントラル"
        }),
        locality("admiralty", "Hong Kong", "000000", 22.2797, 114.1652, [
          street("harcourt", "18 Harcourt Road"),
          street("cotton", "3 Cotton Tree Drive"),
          street("queens-east", "46 Queen's Road East"),
          street("garden", "1 Garden Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Admiralty",
          districtZh: "金钟",
          districtJa: "アドミラルティ"
        }),
        locality("wanchai", "Hong Kong", "000000", 22.2775, 114.1756, [
          street("hennessy", "188 Hennessy Road"),
          street("johnston", "60 Johnston Road"),
          street("lockhart", "208 Lockhart Road"),
          street("fenwick", "15 Fenwick Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Wan Chai",
          districtZh: "湾仔",
          districtJa: "灣仔"
        }),
        locality("causeway-bay", "Hong Kong", "000000", 22.2809, 114.185, [
          street("yee-woo", "28 Yee Wo Street"),
          street("great-george", "12 Great George Street"),
          street("lee-garden", "33 Lee Garden Road"),
          street("paterson", "5 Paterson Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Causeway Bay",
          districtZh: "铜锣湾",
          districtJa: "コーズウェイベイ"
        }),
        locality("north-point", "Hong Kong", "000000", 22.2909, 114.2004, [
          street("kings", "438 King's Road"),
          street("java", "98 Java Road"),
          street("electric", "180 Electric Road"),
          street("marble", "25 Marble Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "North Point",
          districtZh: "北角",
          districtJa: "ノースポイント"
        }),
        locality("quarry-bay", "Hong Kong", "000000", 22.2871, 114.2122, [
          street("taikoo", "12 Taikoo Shing Road"),
          street("hoysuen", "3 Hoi Shuen Road"),
          street("tongchong", "1067 King's Road"),
          street("shipyard", "8 Shipyard Lane")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Quarry Bay",
          districtZh: "鲗鱼涌",
          districtJa: "クオリーベイ"
        }),
        locality("sheungwan", "Hong Kong", "000000", 22.2867, 114.1508, [
          street("bonham", "75 Bonham Strand"),
          street("wing-lok", "162 Wing Lok Street"),
          street("man-wa", "1 Man Wa Lane"),
          street("jervois", "52 Jervois Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Sheung Wan",
          districtZh: "上环",
          districtJa: "上環"
        }),
        locality("kennedy-town", "Hong Kong", "000000", 22.2828, 114.1286, [
          street("davis", "28 Davis Street"),
          street("belchers", "1 Belcher's Street"),
          street("cadogan", "9 Cadogan Street"),
          street("catchick", "88 Catchick Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Kennedy Town",
          districtZh: "坚尼地城",
          districtJa: "ケネディタウン"
        })
      ]
    },
    {
      code: "KOW",
      name: text("九龙", "Kowloon", "九龍"),
      localities: [
        locality("tsim-sha-tsui", "Hong Kong", "000000", 22.2965, 114.1722, [
          street("salisbury", "10 Salisbury Road"),
          street("canton", "30 Canton Road"),
          street("nathan", "63 Nathan Road"),
          street("austin", "5 Austin Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Tsim Sha Tsui",
          districtZh: "尖沙咀",
          districtJa: "尖沙咀"
        }),
        locality("mong-kok", "Hong Kong", "000000", 22.3193, 114.1694, [
          street("argyle", "77 Argyle Street"),
          street("sai-yeung", "59 Sai Yeung Choi Street South"),
          street("nathan", "701 Nathan Road"),
          street("dundas", "56 Dundas Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Mong Kok",
          districtZh: "旺角",
          districtJa: "旺角"
        }),
        locality("yau-ma-tei", "Hong Kong", "000000", 22.3135, 114.1704, [
          street("portland", "555 Portland Street"),
          street("woosung", "120 Woosung Street"),
          street("reclamation", "180 Reclamation Street"),
          street("man-ming", "8 Man Ming Lane")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Yau Ma Tei",
          districtZh: "油麻地",
          districtJa: "油麻地"
        }),
        locality("jordan", "Hong Kong", "000000", 22.3057, 114.1717, [
          street("jordan", "18 Jordan Road"),
          street("austin", "23 Austin Road"),
          street("temple", "105 Temple Street"),
          street("chi-wo", "7 Chi Wo Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Jordan",
          districtZh: "佐敦",
          districtJa: "ジョーダン"
        }),
        locality("kowloon-tong", "Hong Kong", "000000", 22.3368, 114.176, [
          street("waterloo", "170 Waterloo Road"),
          street("suffolk", "8 Suffolk Road"),
          street("kent", "3 Kent Road"),
          street("essex", "14 Essex Crescent")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Kowloon Tong",
          districtZh: "九龙塘",
          districtJa: "九龍塘"
        }),
        locality("kwun-tong", "Hong Kong", "000000", 22.31, 114.2252, [
          street("hoi-yuen", "58 Hoi Yuen Road"),
          street("how-ming", "72 How Ming Street"),
          street("wai-yip", "88 Wai Yip Street"),
          street("kung-ngam", "15 Kung Ngam Village Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Kwun Tong",
          districtZh: "观塘",
          districtJa: "観塘"
        }),
        locality("sham-shui-po", "Hong Kong", "000000", 22.3301, 114.1595, [
          street("lai-chi-kok", "333 Lai Chi Kok Road"),
          street("fuk-wa", "88 Fuk Wa Street"),
          street("pei-ho", "34 Pei Ho Street"),
          street("ki-lung", "202 Ki Lung Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Sham Shui Po",
          districtZh: "深水埗",
          districtJa: "深水埗"
        }),
        locality("hung-hom", "Hong Kong", "000000", 22.3032, 114.1829, [
          street("man-tai", "12 Man Tai Street"),
          street("tak-man", "68 Tak Man Street"),
          street("hung-luen", "9 Hung Luen Road"),
          street("whampoa", "6 Whampoa Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Hung Hom",
          districtZh: "红磡",
          districtJa: "紅磡"
        })
      ]
    },
    {
      code: "NT",
      name: text("新界", "New Territories", "新界"),
      localities: [
        locality("sha-tin", "Hong Kong", "000000", 22.383, 114.1889, [
          street("tai-chung", "18 Tai Chung Kiu Road"),
          street("lek-yuen", "2 Lek Yuen Street"),
          street("sha-tin-centre", "21 Sha Tin Centre Street"),
          street("fo-tan", "6 Fo Tan Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Sha Tin",
          districtZh: "沙田",
          districtJa: "沙田"
        }),
        locality("tsuen-wan", "Hong Kong", "000000", 22.3735, 114.1183, [
          street("sha-tsui", "28 Sha Tsui Road"),
          street("castle-peak", "388 Castle Peak Road"),
          street("tai-ho", "15 Tai Ho Road"),
          street("yeung-uk", "12 Yeung Uk Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Tsuen Wan",
          districtZh: "荃湾",
          districtJa: "荃灣"
        }),
        locality("tuen-mun", "Hong Kong", "000000", 22.3914, 113.9777, [
          street("heung-sze", "1 Heung Sze Wui Road"),
          street("tuen-mun-heung", "98 Tuen Mun Heung Sze Wui Road"),
          street("hoi-wing", "3 Hoi Wing Road"),
          street("wu-chui", "9 Wu Chui Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Tuen Mun",
          districtZh: "屯门",
          districtJa: "屯門"
        }),
        locality("yuen-long", "Hong Kong", "000000", 22.4455, 114.0336, [
          street("kau-yuk", "20 Kau Yuk Road"),
          street("castle-peak", "150 Castle Peak Road Yuen Long"),
          street("fung-yau", "18 Fung Yau Street North"),
          street("on-ning", "7 On Ning Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Yuen Long",
          districtZh: "元朗",
          districtJa: "元朗"
        }),
        locality("tai-po", "Hong Kong", "000000", 22.4508, 114.168, [
          street("kwong-fuk", "22 Kwong Fuk Road"),
          street("on-chee", "8 On Chee Road"),
          street("tai-po-tai", "3 Tai Po Tai Wo Road"),
          street("po-heung", "12 Po Heung Street")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Tai Po",
          districtZh: "大埔",
          districtJa: "大埔"
        }),
        locality("tseung-kwan-o", "Hong Kong", "000000", 22.3077, 114.2596, [
          street("tong-chun", "9 Tong Chun Street"),
          street("tong-yin", "3 Tong Yin Street"),
          street("wan-po", "6 Wan Po Road"),
          street("po-yap", "12 Po Yap Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Tseung Kwan O",
          districtZh: "将军澳",
          districtJa: "将軍澳"
        }),
        locality("tung-chung", "Hong Kong", "000000", 22.2897, 113.9419, [
          street("tat-tung", "20 Tat Tung Road"),
          street("tat-tung-west", "8 Tat Tung Road"),
          street("tat-tung-east", "5 Ying Hei Road"),
          street("shun-tung", "7 Shun Tung Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Tung Chung",
          districtZh: "东涌",
          districtJa: "東涌"
        }),
        locality("fanling", "Hong Kong", "000000", 22.4918, 114.141, [
          street("wo-fung", "11 Wo Fung Street"),
          street("lian-foo", "7 Luen Wo Road"),
          street("jockey-club", "88 Jockey Club Road"),
          street("san-wan", "3 San Wan Road")
        ], {
          cityZh: "香港",
          cityJa: "香港",
          districtEn: "Fanling",
          districtZh: "粉岭",
          districtJa: "粉嶺"
        })
      ]
    }
  ],
  {
    countryLabel: text("香港", "Hong Kong", "香港"),
    defaultPhone: "+852 2000 0000",
    format: "hk"
  }
);

export const hkGeneratedRegions = hkData.regions;
export const hkGeneratedAddresses = hkData.addresses;
