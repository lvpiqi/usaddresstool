import { buildGeneratedCountryData, locality, street, text } from "./generated-country-utils";

const ukData = buildGeneratedCountryData(
  "uk",
  [
    {
      code: "ENG",
      name: text("英格兰", "England", "England"),
      localities: [
        locality("london", "London", "SE1 2AA", 51.5045, -0.0772, [
          street("queens-walk", "The Queen's Walk"),
          street("borough-high", "Borough High Street"),
          street("tooley", "Tooley Street"),
          street("southwark", "Southwark Street")
        ]),
        locality("manchester", "Manchester", "M2 5DB", 53.4808, -2.2426, [
          street("deansgate", "Deansgate"),
          street("mosley", "Mosley Street"),
          street("peter", "Peter Street"),
          street("portland", "Portland Street")
        ]),
        locality("birmingham", "Birmingham", "B1 1BB", 52.4792, -1.9027, [
          street("new", "New Street"),
          street("colmore", "Colmore Row"),
          street("broad", "Broad Street"),
          street("corporation", "Corporation Street")
        ]),
        locality("bristol", "Bristol", "BS1 5TR", 51.4548, -2.5879, [
          street("park", "Park Street"),
          street("baldwin", "Baldwin Street"),
          street("victoria", "Victoria Street"),
          street("wine", "Wine Street")
        ]),
        locality("leeds", "Leeds", "LS1 3AD", 53.798, -1.5492, [
          street("briggate", "Briggate"),
          street("boar", "Boar Lane"),
          street("park-row", "Park Row"),
          street("headrow", "The Headrow")
        ]),
        locality("liverpool", "Liverpool", "L2 3SW", 53.4072, -2.9917, [
          street("castle", "Castle Street"),
          street("water", "Water Street"),
          street("dale", "Dale Street"),
          street("chapel", "Chapel Street")
        ]),
        locality("newcastle", "Newcastle upon Tyne", "NE1 5AF", 54.9721, -1.6139, [
          street("grainger", "Grainger Street"),
          street("pilgrim", "Pilgrim Street"),
          street("market", "Market Street"),
          street("grey", "Grey Street")
        ]),
        locality("cambridge", "Cambridge", "CB2 3QJ", 52.2053, 0.1218, [
          street("trinity", "Trinity Street"),
          street("st-andrew", "St Andrew's Street"),
          street("regent", "Regent Street"),
          street("bridge", "Bridge Street")
        ])
      ]
    },
    {
      code: "SCT",
      name: text("苏格兰", "Scotland", "Scotland"),
      localities: [
        locality("edinburgh", "Edinburgh", "EH99 1SP", 55.9522, -3.1741, [
          street("horse", "Horse Wynd"),
          street("royal-mile", "High Street"),
          street("canongate", "Canongate"),
          street("leith", "Leith Street")
        ]),
        locality("glasgow", "Glasgow", "G2 1DU", 55.8609, -4.2514, [
          street("buchanan", "Buchanan Street"),
          street("argyle", "Argyle Street"),
          street("sauchiehall", "Sauchiehall Street"),
          street("hope", "Hope Street")
        ]),
        locality("aberdeen", "Aberdeen", "AB10 1AQ", 57.1497, -2.0943, [
          street("union", "Union Street"),
          street("schoolhill", "Schoolhill"),
          street("market", "Market Street"),
          street("bridge", "Bridge Street")
        ]),
        locality("dundee", "Dundee", "DD1 3BB", 56.4621, -2.9707, [
          street("nethergate", "Nethergate"),
          street("reform", "Reform Street"),
          street("murraygate", "Murraygate"),
          street("dock", "Dock Street")
        ]),
        locality("inverness", "Inverness", "IV1 1JJ", 57.4781, -4.2233, [
          street("academy", "Academy Street"),
          street("church", "Church Street"),
          street("bridge", "Bridge Street"),
          street("high", "High Street")
        ]),
        locality("stirling", "Stirling", "FK8 2EA", 56.1165, -3.9369, [
          street("port", "Port Street"),
          street("king", "King Street"),
          street("spittal", "Spittal Street"),
          street("barnton", "Barnton Street")
        ]),
        locality("perth", "Perth", "PH1 5SZ", 56.3969, -3.437, [
          street("high", "High Street"),
          street("tay", "Tay Street"),
          street("george", "George Street"),
          street("mill", "Mill Street")
        ]),
        locality("paisley", "Paisley", "PA1 1JJ", 55.8473, -4.4232, [
          street("causeyside", "Causeyside Street"),
          street("moss", "Moss Street"),
          street("high", "High Street"),
          street("gauze", "Gauze Street")
        ])
      ]
    },
    {
      code: "WLS",
      name: text("威尔士", "Wales", "Wales"),
      localities: [
        locality("cardiff", "Cardiff", "CF10 3ND", 51.4839, -3.1777, [
          street("gorsedd", "Gorsedd Gardens"),
          street("queen", "Queen Street"),
          street("st-mary", "St Mary Street"),
          street("westgate", "Westgate Street")
        ]),
        locality("swansea", "Swansea", "SA1 3SN", 51.6214, -3.9436, [
          street("oxford", "Oxford Street"),
          street("wind", "Wind Street"),
          street("the-kingsway", "The Kingsway"),
          street("high", "High Street")
        ]),
        locality("newport", "Newport", "NP20 1JU", 51.5842, -2.9977, [
          street("commercial", "Commercial Street"),
          street("bridge", "Bridge Street"),
          street("stow-hill", "Stow Hill"),
          street("upperdock", "Upper Dock Street")
        ]),
        locality("wrexham", "Wrexham", "LL11 1AT", 53.0462, -2.9925, [
          street("hope", "Hope Street"),
          street("queen", "Queen Street"),
          street("regent", "Regent Street"),
          street("chene", "Charles Street")
        ]),
        locality("bangor", "Bangor", "LL57 1NW", 53.2278, -4.1291, [
          street("high", "High Street"),
          street("garth", "Garth Road"),
          street("deiniol", "Deiniol Road"),
          street("college", "College Road")
        ]),
        locality("aberyswyth", "Aberystwyth", "SY23 1JH", 52.4153, -4.0829, [
          street("terrace", "Terrace Road"),
          street("great-darkgate", "Great Darkgate Street"),
          street("north-parade", "North Parade"),
          street("bridge", "Bridge Street")
        ]),
        locality("bridgend", "Bridgend", "CF31 1JD", 51.5059, -3.5777, [
          street("adare", "Adare Street"),
          street("market", "Market Street"),
          street("caroline", "Caroline Street"),
          street("derwen", "Derwen Road")
        ]),
        locality("carmarthen", "Carmarthen", "SA31 1QD", 51.8572, -4.3094, [
          street("king", "King Street"),
          street("lammas", "Lammas Street"),
          street("guildhall", "Guildhall Square"),
          street("priory", "Priory Street")
        ])
      ]
    },
    {
      code: "NIR",
      name: text("北爱尔兰", "Northern Ireland", "Northern Ireland"),
      localities: [
        locality("belfast", "Belfast", "BT1 5GS", 54.597, -5.93, [
          street("donegall", "Donegall Square North"),
          street("royal", "Royal Avenue"),
          street("ann", "Ann Street"),
          street("great-victoria", "Great Victoria Street")
        ]),
        locality("derry", "Derry", "BT48 6DQ", 54.9976, -7.3092, [
          street("ferryquay", "Ferryquay Street"),
          street("waterloo", "Waterloo Place"),
          street("bishop", "Bishop Street"),
          street("strand", "Strand Road")
        ]),
        locality("lisburn", "Lisburn", "BT28 1TS", 54.5138, -6.0456, [
          street("bow", "Bow Street"),
          street("market", "Market Square"),
          street("railway", "Railway Street"),
          street("castle", "Castle Street")
        ]),
        locality("newry", "Newry", "BT35 8DJ", 54.1742, -6.3391, [
          street("hill", "Hill Street"),
          street("monaghan", "Monaghan Street"),
          street("merchant", "Merchant's Quay"),
          street("sugar-island", "Sugar Island")
        ]),
        locality("bangor", "Bangor", "BT20 5AF", 54.6631, -5.669, [
          street("main", "Main Street"),
          street("abbey", "Abbey Street"),
          street("high", "High Street"),
          street("quay", "Quay Street")
        ]),
        locality("coleraine", "Coleraine", "BT52 1EY", 55.1337, -6.6682, [
          street("church", "Church Street"),
          street("railway", "Railway Road"),
          street("society", "Society Street"),
          street("newmarket", "Newmarket Street")
        ]),
        locality("ballymena", "Ballymena", "BT43 6AR", 54.8637, -6.276, [
          street("wellington", "Wellington Street"),
          street("broughshane", "Broughshane Street"),
          street("church", "Church Street"),
          street("greenvale", "Greenvale Street")
        ]),
        locality("enniskillen", "Enniskillen", "BT74 7EJ", 54.3465, -7.6426, [
          street("east-bridge", "East Bridge Street"),
          street("townhall", "Townhall Street"),
          street("darling", "Darling Street"),
          street("high", "High Street")
        ])
      ]
    }
  ],
  {
    countryLabel: text("英国", "United Kingdom", "英国"),
    defaultPhone: "+44 20 7000 0000",
    format: "uk"
  }
);

export const ukGeneratedRegions = ukData.regions;
export const ukGeneratedAddresses = ukData.addresses;
