import { buildGeneratedCountryData, locality, street, text } from "./generated-country-utils";

const inData = buildGeneratedCountryData(
  "in",
  [
    {
      code: "MH",
      name: text("马哈拉施特拉邦", "Maharashtra", "Maharashtra"),
      localities: [
        locality("mumbai", "Mumbai", "400001", 18.9388, 72.8354, [
          street("db-marg", "12 D. N. Road"),
          street("veer-nariman", "40 Veer Nariman Road"),
          street("colaba", "22 Colaba Causeway"),
          street("marine", "18 Marine Drive"),
          street("ballard", "9 Ballard Estate")
        ], { districtEn: "South Mumbai" }),
        locality("pune", "Pune", "411001", 18.5204, 73.8567, [
          street("mg-road", "14 Mahatma Gandhi Road"),
          street("jm-road", "21 Jangli Maharaj Road"),
          street("fc-road", "37 Fergusson College Road"),
          street("bund-garden", "11 Bund Garden Road"),
          street("senapati", "25 Senapati Bapat Road")
        ], { districtEn: "Pune" }),
        locality("nagpur", "Nagpur", "440001", 21.1458, 79.0882, [
          street("sitabuldi", "19 Sitabuldi Main Road"),
          street("west-high", "33 West High Court Road"),
          street("central-avenue", "28 Central Avenue"),
          street("wardha", "52 Wardha Road"),
          street("ravi-nagar", "16 Ravi Nagar Square")
        ], { districtEn: "Nagpur" }),
        locality("nashik", "Nashik", "422002", 19.9975, 73.7898, [
          street("college", "18 College Road"),
          street("gangapur", "25 Gangapur Road"),
          street("trimbak", "12 Trimbak Road"),
          street("canada-corner", "9 Canada Corner"),
          street("sharanpur", "31 Sharanpur Road")
        ], { districtEn: "Nashik" }),
        locality("thane", "Thane", "400602", 19.2183, 72.9781, [
          street("lbs", "32 LBS Marg"),
          street("ghodbunder", "44 Ghodbunder Road"),
          street("pokharan", "19 Pokharan Road No 1"),
          street("teen-haath", "7 Teen Hath Naka"),
          street("station", "28 Station Road")
        ], { districtEn: "Thane" }),
        locality("navi-mumbai", "Navi Mumbai", "400703", 19.033, 73.0297, [
          street("palm-beach", "18 Palm Beach Road"),
          street("thane-belapur", "44 Thane Belapur Road"),
          street("vashi", "21 Sector 17 Vashi"),
          street("nerul", "14 Sector 19A Nerul"),
          street("belapur", "9 CBD Belapur Road")
        ], { districtEn: "Navi Mumbai" })
      ]
    },
    {
      code: "DL",
      name: text("德里", "Delhi", "Delhi"),
      localities: [
        locality("connaught-place", "Delhi", "110001", 28.6315, 77.2167, [
          street("cp-inner", "12 Connaught Circus"),
          street("barakhamba", "44 Barakhamba Road"),
          street("janpath", "18 Janpath"),
          street("kasturba", "25 Kasturba Gandhi Marg"),
          street("tolstoy", "9 Tolstoy Marg")
        ], { districtEn: "Central Delhi" }),
        locality("kartavya-path", "New Delhi", "110011", 28.6143, 77.1997, [
          street("kartavya", "18 Kartavya Path"),
          street("ashoka", "12 Ashoka Road"),
          street("janpath", "7 Janpath Road"),
          street("sansad", "24 Sansad Marg"),
          street("rajaji", "10 Rajaji Marg")
        ], { districtEn: "New Delhi" }),
        locality("saket", "Delhi", "110017", 28.5245, 77.2066, [
          street("press-enclave", "15 Press Enclave Road"),
          street("mb-road", "42 Mehrauli Badarpur Road"),
          street("anupam", "8 Anupam PVR Road"),
          street("select-city", "27 District Centre Saket"),
          street("j-block", "11 J Block Market")
        ], { districtEn: "South Delhi" }),
        locality("rohini", "Delhi", "110085", 28.7499, 77.0565, [
          street("sector-10", "21 Sector 10 Road"),
          street("sector-11", "35 Sector 11 Market"),
          street("m2k", "12 Bhagwan Mahavir Marg"),
          street("prashant", "8 Prashant Vihar Road"),
          street("avantika", "18 Avantika Chowk")
        ], { districtEn: "North West Delhi" }),
        locality("lajpat-nagar", "Delhi", "110024", 28.5677, 77.2431, [
          street("ring-road", "17 Ring Road"),
          street("central-market", "24 Central Market Road"),
          street("amar-colony", "11 Amar Colony Main Road"),
          street("feroze", "16 Feroze Gandhi Road"),
          street("vikram", "9 Vikram Vihar")
        ], { districtEn: "South East Delhi" }),
        locality("janakpuri", "Delhi", "110058", 28.6219, 77.0878, [
          street("district-centre", "14 District Centre"),
          street("najafgarh", "30 Najafgarh Road"),
          street("pankha", "21 Pankha Road"),
          street("c-block", "7 C Block Market"),
          street("dda", "18 DDA Complex")
        ], { districtEn: "West Delhi" })
      ]
    },
    {
      code: "KA",
      name: text("卡纳塔克邦", "Karnataka", "Karnataka"),
      localities: [
        locality("bengaluru", "Bengaluru", "560001", 12.9756, 77.6066, [
          street("mg-road", "20 Mahatma Gandhi Road"),
          street("brigade", "14 Brigade Road"),
          street("church", "11 Church Street"),
          street("residency", "35 Residency Road"),
          street("lavelle", "9 Lavelle Road")
        ], { districtEn: "Bengaluru Urban" }),
        locality("mysuru", "Mysuru", "570001", 12.2958, 76.6394, [
          street("devaraja", "18 Devaraja Urs Road"),
          street("sayyaji", "22 Sayyaji Rao Road"),
          street("krs", "11 KRS Road"),
          street("vinoba", "27 Vinoba Road"),
          street("jhansi", "12 Jhansi Lakshmibai Road")
        ], { districtEn: "Mysuru" }),
        locality("mangaluru", "Mangaluru", "575001", 12.9141, 74.856, [
          street("balmatta", "15 Balmatta Road"),
          street("mg-road", "22 M.G. Road"),
          street("ks-rao", "19 K.S. Rao Road"),
          street("falnir", "12 Falnir Road"),
          street("bejai", "31 Bejai Main Road")
        ], { districtEn: "Dakshina Kannada" }),
        locality("hubballi", "Hubballi", "580020", 15.3647, 75.124, [
          street("coen", "17 Coen Road"),
          street("lamington", "29 Lamington Road"),
          street("station", "14 Station Road"),
          street("gokul", "26 Gokul Road"),
          street("court", "8 Court Circle")
        ], { districtEn: "Dharwad" }),
        locality("belagavi", "Belagavi", "590001", 15.8497, 74.4977, [
          street("college", "18 College Road"),
          street("khade", "31 Khade Bazar"),
          street("shivaji", "12 Shivaji Road"),
          street("station", "7 Station Road"),
          street("tilakwadi", "25 Tilakwadi Main Road")
        ], { districtEn: "Belagavi" }),
        locality("shivamogga", "Shivamogga", "577201", 13.9299, 75.5681, [
          street("bh-road", "19 B.H. Road"),
          street("sagar", "32 Sagar Road"),
          street("nehru", "11 Nehru Road"),
          street("gandhi-park", "16 Gandhi Park Road"),
          street("kuvempu", "22 Kuvempu Road")
        ], { districtEn: "Shivamogga" })
      ]
    },
    {
      code: "WB",
      name: text("西孟加拉邦", "West Bengal", "West Bengal"),
      localities: [
        locality("kolkata", "Kolkata", "700071", 22.5448, 88.3426, [
          street("jawaharlal", "12 Jawaharlal Nehru Road"),
          street("park", "25 Park Street"),
          street("camac", "18 Camac Street"),
          street("chowringhee", "44 Chowringhee Road"),
          street("russell", "9 Russell Street")
        ], { districtEn: "Kolkata" }),
        locality("howrah", "Howrah", "711101", 22.5958, 88.2636, [
          street("gt-road", "14 G.T. Road"),
          street("belilious", "22 Belilious Road"),
          street("dobson", "11 Dobson Road"),
          street("foreshore", "19 Foreshore Road"),
          street("shalimar", "8 Shalimar Road")
        ], { districtEn: "Howrah" }),
        locality("siliguri", "Siliguri", "734001", 26.7271, 88.3953, [
          street("hill-cart", "21 Hill Cart Road"),
          street("sevoke", "37 Sevoke Road"),
          street("bidhan", "12 Bidhan Road"),
          street("ashrampara", "15 Ashrampara Road"),
          street("pradhan", "10 Pradhan Nagar Road")
        ], { districtEn: "Darjeeling" }),
        locality("durgapur", "Durgapur", "713216", 23.5204, 87.3119, [
          street("city-centre", "14 City Centre Road"),
          street("station", "22 Station Road"),
          street("benachity", "11 Benachity Market Road"),
          street("bidhannagar", "18 Bidhannagar Main Road"),
          street("nh2", "35 NH2 Service Road")
        ], { districtEn: "Paschim Bardhaman" }),
        locality("asansol", "Asansol", "713301", 23.6739, 86.9524, [
          street("gt-road", "19 G.T. Road"),
          street("hutton", "17 Hutton Road"),
          street("burnpur", "12 Burnpur Road"),
          street("sbh", "8 S.B. Gorai Road"),
          street("railpar", "26 Railpar Road")
        ], { districtEn: "Paschim Bardhaman" }),
        locality("bidhannagar", "Bidhannagar", "700091", 22.5769, 88.4172, [
          street("salt-lake", "11 Salt Lake Bypass"),
          street("sector-v", "22 Sector V Road"),
          street("karunamoyee", "9 Karunamoyee Avenue"),
          street("central-park", "18 Central Park Road"),
          street("ec-space", "15 Webel More")
        ], { districtEn: "North 24 Parganas" })
      ]
    },
    {
      code: "TS",
      name: text("特伦甘纳邦", "Telangana", "Telangana"),
      localities: [
        locality("hyderabad", "Hyderabad", "500081", 17.4435, 78.3772, [
          street("hitec", "11 Hitech City Road"),
          street("madhapur", "27 Madhapur Main Road"),
          street("jubilee", "18 Jubilee Hills Road No 36"),
          street("banjara", "14 Banjara Hills Road No 1"),
          street("gachibowli", "22 Gachibowli Main Road")
        ], { districtEn: "Hyderabad" }),
        locality("secunderabad", "Secunderabad", "500003", 17.4399, 78.4983, [
          street("sd-road", "12 S.D. Road"),
          street("mg-road", "28 M.G. Road"),
          street("paradise", "18 Paradise Circle"),
          street("clock-tower", "9 Clock Tower Road"),
          street("minister", "16 Minister Road")
        ], { districtEn: "Medchal-Malkajgiri" }),
        locality("warangal", "Warangal", "506002", 17.9689, 79.5941, [
          street("hanamkonda", "14 Hanamkonda Road"),
          street("mulugu", "21 Mulugu Road"),
          street("kazipet", "11 Kazipet Main Road"),
          street("hunter", "8 Hunter Road"),
          street("jpn", "19 J.P.N. Road")
        ], { districtEn: "Hanamkonda" }),
        locality("karimnagar", "Karimnagar", "505001", 18.4386, 79.1288, [
          street("tower-circle", "13 Tower Circle Road"),
          street("civil-hospital", "24 Civil Hospital Road"),
          street("mankammathota", "18 Mankammathota Road"),
          street("kaman", "7 Kaman Road"),
          street("court", "10 Court Road")
        ], { districtEn: "Karimnagar" }),
        locality("nizamabad", "Nizamabad", "503001", 18.6725, 78.0941, [
          street("tilak", "12 Tilak Gardens Road"),
          street("vinayak", "21 Vinayak Nagar Road"),
          street("station", "16 Station Road"),
          street("subhash", "9 Subhash Road"),
          street("khaleelwadi", "18 Khaleelwadi Main Road")
        ], { districtEn: "Nizamabad" }),
        locality("khammam", "Khammam", "507001", 17.2473, 80.1514, [
          street("wyra", "19 Wyra Road"),
          street("mamillagudem", "14 Mamillagudem Road"),
          street("kothagudem", "22 Kothagudem Cross Road"),
          street("station", "11 Station Road"),
          street("gandhi", "8 Gandhi Chowk Road")
        ], { districtEn: "Khammam" })
      ]
    }
  ],
  {
    countryLabel: text("印度", "India", "インド"),
    defaultPhone: "+91 22 2000 0000",
    format: "india"
  }
);

export const inGeneratedRegions = inData.regions;
export const inGeneratedAddresses = inData.addresses;
