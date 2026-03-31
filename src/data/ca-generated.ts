import { buildGeneratedCountryData, locality, street, text } from "./generated-country-utils";

const caData = buildGeneratedCountryData(
  "ca",
  [
    {
      code: "ON",
      name: text("安大略省", "Ontario", "Ontario"),
      localities: [
        locality("toronto", "Toronto", "M5H 2N2", 43.6535, -79.3841, [
          street("queen-west", "100 Queen St W"),
          street("bay", "330 Bay St"),
          street("yonge", "401 Yonge St"),
          street("front", "200 Front St W")
        ]),
        locality("ottawa", "Ottawa", "K1P 1J1", 45.4215, -75.6972, [
          street("elgin", "110 Elgin St"),
          street("sparks", "90 Sparks St"),
          street("bank", "240 Bank St"),
          street("wellington", "111 Wellington St")
        ]),
        locality("mississauga", "Mississauga", "L5B 3C1", 43.589, -79.6441, [
          street("burnhamthorpe", "300 City Centre Dr"),
          street("duke", "201 City Centre Dr"),
          street("hurontario", "4290 Hurontario St"),
          street("eglinton", "455 Eglinton Ave W")
        ]),
        locality("hamilton", "Hamilton", "L8P 4Y5", 43.2557, -79.8711, [
          street("main", "71 Main St W"),
          street("king", "80 King St W"),
          street("james", "123 James St N"),
          street("york", "55 York Blvd")
        ]),
        locality("london", "London", "N6A 5B6", 42.9849, -81.2453, [
          street("dundas", "300 Dundas St"),
          street("richmond", "385 Richmond St"),
          street("wellington", "202 Wellington St"),
          street("queens", "80 Queen Ave")
        ]),
        locality("kitchener", "Kitchener", "N2G 4G7", 43.4516, -80.4925, [
          street("king", "200 King St W"),
          street("ontario", "44 Gaukel St"),
          street("duke", "20 Duke St W"),
          street("charles", "150 Charles St W")
        ]),
        locality("windsor", "Windsor", "N9A 6W5", 42.3149, -83.0364, [
          street("ouellette", "350 Ouellette Ave"),
          street("riverside", "2640 Riverside Dr E"),
          street("wyandotte", "2450 Wyandotte St W"),
          street("university", "401 University Ave W")
        ]),
        locality("kingston", "Kingston", "K7L 2Z1", 44.2312, -76.486, [
          street("brock", "216 Brock St"),
          street("princess", "248 Princess St"),
          street("ontario", "192 Ontario St"),
          street("bagot", "90 Bagot St")
        ])
      ]
    },
    {
      code: "BC",
      name: text("不列颠哥伦比亚省", "British Columbia", "British Columbia"),
      localities: [
        locality("vancouver", "Vancouver", "V6C 0C3", 49.2887, -123.1112, [
          street("canada-place", "1055 Canada Pl"),
          street("georgia", "800 W Georgia St"),
          street("granville", "650 W Georgia St"),
          street("howe", "999 Canada Pl")
        ]),
        locality("burnaby", "Burnaby", "V5H 4N2", 49.2268, -123.0027, [
          street("kingsway", "4700 Kingsway"),
          street("willingdon", "4450 Willingdon Ave"),
          street("mckay", "6200 McKay Ave"),
          street("dawson", "4189 Dawson St")
        ]),
        locality("richmond", "Richmond", "V6X 3L5", 49.1704, -123.1364, [
          street("no3", "6551 No 3 Rd"),
          street("lansdowne", "8311 Lansdowne Rd"),
          street("westminster", "6060 Minoru Blvd"),
          street("sea-island", "3211 Grant McConachie Way")
        ]),
        locality("surrey", "Surrey", "V3T 5X3", 49.189, -122.849, [
          street("city-parkway", "13450 104 Ave"),
          street("king-george", "10350 University Dr"),
          street("whalley", "13750 88 Ave"),
          street("fraser", "15951 Fraser Hwy")
        ]),
        locality("victoria", "Victoria", "V8W 1P6", 48.4284, -123.3656, [
          street("douglas", "1 Centennial Sq"),
          street("government", "706 Government St"),
          street("fort", "1000 Fort St"),
          street("blanshard", "700 Blanshard St")
        ]),
        locality("kelowna", "Kelowna", "V1Y 1J4", 49.887, -119.496, [
          street("water", "1435 Water St"),
          street("pandosy", "565 Bernard Ave"),
          street("bernard", "270 Bernard Ave"),
          street("lawrence", "1560 Lawrence Ave")
        ]),
        locality("nanaimo", "Nanaimo", "V9R 5J8", 49.1659, -123.9401, [
          street("commercial", "100 Gordon St"),
          street("wallace", "80 Commercial St"),
          street("front", "51 Front St"),
          street("terminal", "475 Terminal Ave")
        ]),
        locality("abbotsford", "Abbotsford", "V2T 1W7", 49.0504, -122.3045, [
          street("south-fraser", "32315 South Fraser Way"),
          street("montrose", "33765 Essendene Ave"),
          street("mccallum", "3122 McCallum Rd"),
          street("bourquin", "32500 South Fraser Way")
        ])
      ]
    },
    {
      code: "QC",
      name: text("魁北克省", "Quebec", "Quebec"),
      localities: [
        locality("montreal", "Montreal", "H2Y 1C6", 45.5086, -73.5548, [
          street("notre-dame", "275 Notre-Dame St E"),
          street("sainte-catherine", "1500 Rue Sainte-Catherine O"),
          street("sherbrooke", "1200 Rue Sherbrooke O"),
          street("saint-paul", "350 Rue Saint-Paul E")
        ]),
        locality("quebec-city", "Quebec City", "G1R 5M1", 46.8139, -71.2082, [
          street("honore", "2 Rue des Jardins"),
          street("saint-jean", "650 Rue Saint-Jean"),
          street("saint-joseph", "400 Rue Saint-Joseph E"),
          street("rene-levesque", "875 Grande Allée E")
        ]),
        locality("laval", "Laval", "H7V 3Z4", 45.5581, -73.7388, [
          street("saint-martin", "3131 Blvd Saint-Martin O"),
          street("le-carrefour", "3003 Blvd Le Carrefour"),
          street("curé-labelle", "1555 Blvd Curé-Labelle"),
          street("souvenir", "1455 Blvd du Souvenir")
        ]),
        locality("gatineau", "Gatineau", "J8X 3Y9", 45.4765, -75.7013, [
          street("laurier", "25 Rue Laurier"),
          street("maisonneuve", "50 Blvd Maisonneuve"),
          street("montcalm", "177 Prom du Portage"),
          street("alexandre-tache", "283 Blvd Alexandre-Taché")
        ]),
        locality("longueuil", "Longueuil", "J4H 4A9", 45.5312, -73.5181, [
          street("saint-charles", "4250 Ch de Chambly"),
          street("roland-therrien", "825 Rue Saint-Laurent O"),
          street("chemin", "1401 Rue Victoria"),
          street("curé-poirier", "355 Rue Saint-Charles O")
        ]),
        locality("sherbrooke", "Sherbrooke", "J1H 5N8", 45.4042, -71.8929, [
          street("wellington", "191 Rue du Palais"),
          street("king", "150 Rue Wellington N"),
          street("belvedere", "95 Rue Belvédère N"),
          street("dufferin", "145 Rue Dufferin")
        ]),
        locality("trois-rivieres", "Trois-Rivieres", "G9A 5H3", 46.343, -72.5435, [
          street("bonaventure", "1325 Place de l'Hôtel-de-Ville"),
          street("des-forges", "100 Rue des Forges"),
          street("hart", "350 Rue Hart"),
          street("royale", "770 Rue Royale")
        ]),
        locality("levis", "Levis", "G6V 6M8", 46.8033, -71.1779, [
          street("saint-joseph", "217 Rue Saint-Joseph"),
          street("bégin", "795 Rue du Maréchal-Joffre"),
          street("wilfrid", "10 Rue Charles-A.-Cadieux"),
          street("alphonse", "996 Rue de la Concorde")
        ])
      ]
    },
    {
      code: "AB",
      name: text("阿尔伯塔省", "Alberta", "Alberta"),
      localities: [
        locality("calgary", "Calgary", "T2G 2E7", 51.0459, -114.0571, [
          street("3-st", "800 3 St SE"),
          street("stephen", "317 7 Ave SW"),
          street("centre", "433 4 Ave SW"),
          street("9-ave", "225 9 Ave SE")
        ]),
        locality("edmonton", "Edmonton", "T5J 1N9", 53.5444, -113.4909, [
          street("sir-winston", "1 Sir Winston Churchill Sq"),
          street("jasper", "10111 104 Ave NW"),
          street("104-st", "10205 101 St NW"),
          street("109-st", "10025 102A Ave NW")
        ]),
        locality("red-deer", "Red Deer", "T4N 3T4", 52.2681, -113.8112, [
          street("ross", "4914 48 Ave"),
          street("gaetz", "5001 50 Ave"),
          street("59-st", "4818 49 St"),
          street("67-st", "5230 67 St")
        ]),
        locality("lethbridge", "Lethbridge", "T1J 3Z7", 49.6956, -112.8451, [
          street("4-ave", "910 4 Ave S"),
          street("3-ave", "200 3 Ave S"),
          street("13-st", "240 13 St N"),
          street("mayor-magrath", "320 Mayor Magrath Dr S")
        ]),
        locality("medicine-hat", "Medicine Hat", "T1A 8E6", 50.0405, -110.6761, [
          street("1-st", "580 1 St SE"),
          street("6-ave", "770 1 St SE"),
          street("dunmore", "3292 Dunmore Rd SE"),
          street("carry", "30 Carry Dr SE")
        ]),
        locality("st-albert", "St. Albert", "T8N 3Z9", 53.6316, -113.6257, [
          street("st-anne", "5 St Anne St"),
          street("sir-winston", "3 St Vital Ave"),
          street("hebert", "37 St Thomas St"),
          street("mcleod", "24 Perron St")
        ]),
        locality("airdrie", "Airdrie", "T4B 3C3", 51.2927, -114.0144, [
          street("centre", "400 Main St SE"),
          street("yankee", "800 Yankee Valley Blvd SE"),
          street("edmonton", "2967 Main St SE"),
          street("1-ave", "108 1 Ave NW")
        ]),
        locality("grande-prairie", "Grande Prairie", "T8V 7V9", 55.1707, -118.7947, [
          street("100-ave", "10205 98 St"),
          street("99-st", "9905 100 Ave"),
          street("resources", "10330 104 St"),
          street("westgate", "11601 99 St")
        ])
      ]
    }
  ],
  {
    countryLabel: text("加拿大", "Canada", "カナダ"),
    defaultPhone: "+1 416-200-0000"
  }
);

export const caGeneratedRegions = caData.regions;
export const caGeneratedAddresses = caData.addresses;
