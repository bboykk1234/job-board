import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("countries").delete();

  await knex.table("countries")
    .insert([
      { iso_code: "AC", iso3_code: "ACS", phone_code: "247", name: "Ascension Island" },
      { iso_code: "AD", iso3_code: "AND", phone_code: "376", name: "Andorra" },
      { iso_code: "AE", iso3_code: "ARE", phone_code: "971", name: "United Arab Emirates" },
      { iso_code: "AF", iso3_code: "AFG", phone_code: "93", name: "Afghanistan" },
      { iso_code: "AG", iso3_code: "ATG", phone_code: "1", name: "Antigua and Barbuda" },
      { iso_code: "AI", iso3_code: "AIA", phone_code: "1", name: "Anguilla" },
      { iso_code: "AL", iso3_code: "ALB", phone_code: "355", name: "Albania" },
      { iso_code: "AM", iso3_code: "ARM", phone_code: "374", name: "Armenia" },
      { iso_code: "AO", iso3_code: "AGO", phone_code: "244", name: "Angola" },
      { iso_code: "AR", iso3_code: "ARG", phone_code: "54", name: "Argentina" },
      { iso_code: "AS", iso3_code: "ASM", phone_code: "1", name: "American Samoa" },
      { iso_code: "AT", iso3_code: "AUT", phone_code: "43", name: "Austria" },
      { iso_code: "AU", iso3_code: "AUS", phone_code: "61", name: "Australia" },
      { iso_code: "AW", iso3_code: "ABW", phone_code: "297", name: "Aruba" },
      { iso_code: "AX", iso3_code: "ALA", phone_code: "358", name: "Åland Islands" },
      { iso_code: "AZ", iso3_code: "AZE", phone_code: "994", name: "Azerbaijan" },
      { iso_code: "BA", iso3_code: "BIH", phone_code: "387", name: "Bosnia and Herzegovina" },
      { iso_code: "BB", iso3_code: "BRB", phone_code: "1", name: "Barbados" },
      { iso_code: "BD", iso3_code: "BGD", phone_code: "880", name: "Bangladesh" },
      { iso_code: "BE", iso3_code: "BEL", phone_code: "32", name: "Belgium" },
      { iso_code: "BF", iso3_code: "BFA", phone_code: "226", name: "Burkina Faso" },
      { iso_code: "BG", iso3_code: "BGR", phone_code: "359", name: "Bulgaria" },
      { iso_code: "BH", iso3_code: "BHR", phone_code: "973", name: "Bahrain" },
      { iso_code: "BI", iso3_code: "BDI", phone_code: "257", name: "Burundi" },
      { iso_code: "BJ", iso3_code: "BEN", phone_code: "229", name: "Benin" },
      { iso_code: "BL", iso3_code: "BLM", phone_code: "590", name: "Saint Barthélemy" },
      { iso_code: "BM", iso3_code: "BMU", phone_code: "1", name: "Bermuda" },
      { iso_code: "BN", iso3_code: "BRN", phone_code: "673", name: "Brunei" },
      { iso_code: "BO", iso3_code: "BOL", phone_code: "591", name: "Bolivia" },
      { iso_code: "BQ", iso3_code: "BES", phone_code: "599", name: "Bonaire, Sint Eustatius and Saba" },
      { iso_code: "BR", iso3_code: "BRA", phone_code: "55", name: "Brazil" },
      { iso_code: "BS", iso3_code: "BHS", phone_code: "1", name: "Bahamas" },
      { iso_code: "BT", iso3_code: "BTN", phone_code: "975", name: "Bhutan" },
      { iso_code: "BW", iso3_code: "BWA", phone_code: "267", name: "Botswana" },
      { iso_code: "BY", iso3_code: "BLR", phone_code: "375", name: "Belarus" },
      { iso_code: "BZ", iso3_code: "BLZ", phone_code: "501", name: "Belize" },
      { iso_code: "CA", iso3_code: "CAN", phone_code: "1", name: "Canada" },
      { iso_code: "CC", iso3_code: "CCK", phone_code: "61", name: "Cocos Islands" },
      { iso_code: "CD", iso3_code: "COD", phone_code: "243", name: "The Democratic Republic Of Congo" },
      { iso_code: "CF", iso3_code: "CAF", phone_code: "236", name: "Central African Republic" },
      { iso_code: "CG", iso3_code: "COG", phone_code: "242", name: "Congo" },
      { iso_code: "CH", iso3_code: "CHE", phone_code: "41", name: "Switzerland" },
      { iso_code: "CI", iso3_code: "CIV", phone_code: "225", name: "Côte d'Ivoire" },
      { iso_code: "CK", iso3_code: "COK", phone_code: "682", name: "Cook Islands" },
      { iso_code: "CL", iso3_code: "CHL", phone_code: "56", name: "Chile" },
      { iso_code: "CM", iso3_code: "CMR", phone_code: "237", name: "Cameroon" },
      { iso_code: "CN", iso3_code: "CHN", phone_code: "86", name: "China" },
      { iso_code: "CO", iso3_code: "COL", phone_code: "57", name: "Colombia" },
      { iso_code: "CR", iso3_code: "CRI", phone_code: "506", name: "Costa Rica" },
      { iso_code: "CU", iso3_code: "CUB", phone_code: "53", name: "Cuba" },
      { iso_code: "CV", iso3_code: "CPV", phone_code: "238", name: "Cape Verde" },
      { iso_code: "CW", iso3_code: "CUW", phone_code: "599", name: "Curaçao" },
      { iso_code: "CX", iso3_code: "CXR", phone_code: "61", name: "Christmas Island" },
      { iso_code: "CY", iso3_code: "CYP", phone_code: "357", name: "Cyprus" },
      { iso_code: "CZ", iso3_code: "CZE", phone_code: "420", name: "Czech Republic" },
      { iso_code: "DE", iso3_code: "DEU", phone_code: "49", name: "Germany" },
      { iso_code: "DJ", iso3_code: "DJI", phone_code: "253", name: "Djibouti" },
      { iso_code: "DK", iso3_code: "DNK", phone_code: "45", name: "Denmark" },
      { iso_code: "DM", iso3_code: "DMA", phone_code: "1", name: "Dominica" },
      { iso_code: "DO", iso3_code: "DOM", phone_code: "1", name: "Dominican Republic" },
      { iso_code: "DZ", iso3_code: "DZA", phone_code: "213", name: "Algeria" },
      { iso_code: "EC", iso3_code: "ECU", phone_code: "593", name: "Ecuador" },
      { iso_code: "EE", iso3_code: "EST", phone_code: "372", name: "Estonia" },
      { iso_code: "EG", iso3_code: "EGY", phone_code: "20", name: "Egypt" },
      { iso_code: "EH", iso3_code: "ESH", phone_code: "212", name: "Western Sahara" },
      { iso_code: "ER", iso3_code: "ERI", phone_code: "291", name: "Eritrea" },
      { iso_code: "ES", iso3_code: "ESP", phone_code: "34", name: "Spain" },
      { iso_code: "ET", iso3_code: "ETH", phone_code: "251", name: "Ethiopia" },
      { iso_code: "FI", iso3_code: "FIN", phone_code: "358", name: "Finland" },
      { iso_code: "FJ", iso3_code: "FJI", phone_code: "679", name: "Fiji" },
      { iso_code: "FK", iso3_code: "FLK", phone_code: "500", name: "Falkland Islands" },
      { iso_code: "FM", iso3_code: "FSM", phone_code: "691", name: "Micronesia" },
      { iso_code: "FO", iso3_code: "FRO", phone_code: "298", name: "Faroe Islands" },
      { iso_code: "FR", iso3_code: "FRA", phone_code: "33", name: "France" },
      { iso_code: "GA", iso3_code: "GAB", phone_code: "241", name: "Gabon" },
      { iso_code: "GB", iso3_code: "GBR", phone_code: "44", name: "United Kingdom" },
      { iso_code: "GD", iso3_code: "GRD", phone_code: "1", name: "Grenada" },
      { iso_code: "GE", iso3_code: "GEO", phone_code: "995", name: "Georgia" },
      { iso_code: "GF", iso3_code: "GUF", phone_code: "594", name: "French Guiana" },
      { iso_code: "GG", iso3_code: "GGY", phone_code: "44", name: "Guernsey" },
      { iso_code: "GH", iso3_code: "GHA", phone_code: "233", name: "Ghana" },
      { iso_code: "GI", iso3_code: "GIB", phone_code: "350", name: "Gibraltar" },
      { iso_code: "GL", iso3_code: "GRL", phone_code: "299", name: "Greenland" },
      { iso_code: "GM", iso3_code: "GMB", phone_code: "220", name: "Gambia" },
      { iso_code: "GN", iso3_code: "GIN", phone_code: "224", name: "Guinea" },
      { iso_code: "GP", iso3_code: "GLP", phone_code: "590", name: "Guadeloupe" },
      { iso_code: "GQ", iso3_code: "GNQ", phone_code: "240", name: "Equatorial Guinea" },
      { iso_code: "GR", iso3_code: "GRC", phone_code: "30", name: "Greece" },
      { iso_code: "GT", iso3_code: "GTM", phone_code: "502", name: "Guatemala" },
      { iso_code: "GU", iso3_code: "GUM", phone_code: "1", name: "Guam" },
      { iso_code: "GW", iso3_code: "GNB", phone_code: "245", name: "Guinea-Bissau" },
      { iso_code: "GY", iso3_code: "GUY", phone_code: "592", name: "Guyana" },
      { iso_code: "HK", iso3_code: "HKG", phone_code: "852", name: "Hong Kong" },
      { iso_code: "HN", iso3_code: "HND", phone_code: "504", name: "Honduras" },
      { iso_code: "HR", iso3_code: "HRV", phone_code: "385", name: "Croatia" },
      { iso_code: "HT", iso3_code: "HTI", phone_code: "509", name: "Haiti" },
      { iso_code: "HU", iso3_code: "HUN", phone_code: "36", name: "Hungary" },
      { iso_code: "ID", iso3_code: "IDN", phone_code: "62", name: "Indonesia" },
      { iso_code: "IE", iso3_code: "IRL", phone_code: "353", name: "Ireland" },
      { iso_code: "IL", iso3_code: "ISR", phone_code: "972", name: "Israel" },
      { iso_code: "IM", iso3_code: "IMN", phone_code: "44", name: "Isle Of Man" },
      { iso_code: "IN", iso3_code: "IND", phone_code: "91", name: "India" },
      { iso_code: "IO", iso3_code: "IOT", phone_code: "246", name: "British Indian Ocean Territory" },
      { iso_code: "IQ", iso3_code: "IRQ", phone_code: "964", name: "Iraq" },
      { iso_code: "IR", iso3_code: "IRN", phone_code: "98", name: "Iran" },
      { iso_code: "IS", iso3_code: "ISL", phone_code: "354", name: "Iceland" },
      { iso_code: "IT", iso3_code: "ITA", phone_code: "39", name: "Italy" },
      { iso_code: "JE", iso3_code: "JEY", phone_code: "44", name: "Jersey" },
      { iso_code: "JM", iso3_code: "JAM", phone_code: "1", name: "Jamaica" },
      { iso_code: "JO", iso3_code: "JOR", phone_code: "962", name: "Jordan" },
      { iso_code: "JP", iso3_code: "JPN", phone_code: "81", name: "Japan" },
      { iso_code: "KE", iso3_code: "KEN", phone_code: "254", name: "Kenya" },
      { iso_code: "KG", iso3_code: "KGZ", phone_code: "996", name: "Kyrgyzstan" },
      { iso_code: "KH", iso3_code: "KHM", phone_code: "855", name: "Cambodia" },
      { iso_code: "KI", iso3_code: "KIR", phone_code: "686", name: "Kiribati" },
      { iso_code: "KM", iso3_code: "COM", phone_code: "269", name: "Comoros" },
      { iso_code: "KN", iso3_code: "KNA", phone_code: "1", name: "Saint Kitts And Nevis" },
      { iso_code: "KP", iso3_code: "PRK", phone_code: "850", name: "North Korea" },
      { iso_code: "KR", iso3_code: "KOR", phone_code: "82", name: "South Korea" },
      { iso_code: "KW", iso3_code: "KWT", phone_code: "965", name: "Kuwait" },
      { iso_code: "KY", iso3_code: "CYM", phone_code: "1", name: "Cayman Islands" },
      { iso_code: "KZ", iso3_code: "KAZ", phone_code: "7", name: "Kazakhstan" },
      { iso_code: "LA", iso3_code: "LAO", phone_code: "856", name: "Laos" },
      { iso_code: "LB", iso3_code: "LBN", phone_code: "961", name: "Lebanon" },
      { iso_code: "LC", iso3_code: "LCA", phone_code: "1", name: "Saint Lucia" },
      { iso_code: "LI", iso3_code: "LIE", phone_code: "423", name: "Liechtenstein" },
      { iso_code: "LK", iso3_code: "LKA", phone_code: "94", name: "Sri Lanka" },
      { iso_code: "LR", iso3_code: "LBR", phone_code: "231", name: "Liberia" },
      { iso_code: "LS", iso3_code: "LSO", phone_code: "266", name: "Lesotho" },
      { iso_code: "LT", iso3_code: "LTU", phone_code: "370", name: "Lithuania" },
      { iso_code: "LU", iso3_code: "LUX", phone_code: "352", name: "Luxembourg" },
      { iso_code: "LV", iso3_code: "LVA", phone_code: "371", name: "Latvia" },
      { iso_code: "LY", iso3_code: "LBY", phone_code: "218", name: "Libya" },
      { iso_code: "MA", iso3_code: "MAR", phone_code: "212", name: "Morocco" },
      { iso_code: "MC", iso3_code: "MCO", phone_code: "377", name: "Monaco" },
      { iso_code: "MD", iso3_code: "MDA", phone_code: "373", name: "Moldova" },
      { iso_code: "ME", iso3_code: "MNE", phone_code: "382", name: "Montenegro" },
      { iso_code: "MF", iso3_code: "MAF", phone_code: "590", name: "Saint Martin" },
      { iso_code: "MG", iso3_code: "MDG", phone_code: "261", name: "Madagascar" },
      { iso_code: "MH", iso3_code: "MHL", phone_code: "692", name: "Marshall Islands" },
      { iso_code: "MK", iso3_code: "MKD", phone_code: "389", name: "Macedonia" },
      { iso_code: "ML", iso3_code: "MLI", phone_code: "223", name: "Mali" },
      { iso_code: "MM", iso3_code: "MMR", phone_code: "95", name: "Myanmar" },
      { iso_code: "MN", iso3_code: "MNG", phone_code: "976", name: "Mongolia" },
      { iso_code: "MO", iso3_code: "MAC", phone_code: "853", name: "Macao" },
      { iso_code: "MP", iso3_code: "MNP", phone_code: "1", name: "Northern Mariana Islands" },
      { iso_code: "MQ", iso3_code: "MTQ", phone_code: "596", name: "Martinique" },
      { iso_code: "MR", iso3_code: "MRT", phone_code: "222", name: "Mauritania" },
      { iso_code: "MS", iso3_code: "MSR", phone_code: "1", name: "Montserrat" },
      { iso_code: "MT", iso3_code: "MLT", phone_code: "356", name: "Malta" },
      { iso_code: "MU", iso3_code: "MUS", phone_code: "230", name: "Mauritius" },
      { iso_code: "MV", iso3_code: "MDV", phone_code: "960", name: "Maldives" },
      { iso_code: "MW", iso3_code: "MWI", phone_code: "265", name: "Malawi" },
      { iso_code: "MX", iso3_code: "MEX", phone_code: "52", name: "Mexico" },
      { iso_code: "MY", iso3_code: "MYS", phone_code: "60", name: "Malaysia" },
      { iso_code: "MZ", iso3_code: "MOZ", phone_code: "258", name: "Mozambique" },
      { iso_code: "NA", iso3_code: "NAM", phone_code: "264", name: "Namibia" },
      { iso_code: "NC", iso3_code: "NCL", phone_code: "687", name: "New Caledonia" },
      { iso_code: "NE", iso3_code: "NER", phone_code: "227", name: "Niger" },
      { iso_code: "NF", iso3_code: "NFK", phone_code: "672", name: "Norfolk Island" },
      { iso_code: "NG", iso3_code: "NGA", phone_code: "234", name: "Nigeria" },
      { iso_code: "NI", iso3_code: "NIC", phone_code: "505", name: "Nicaragua" },
      { iso_code: "NL", iso3_code: "NLD", phone_code: "31", name: "Netherlands" },
      { iso_code: "NO", iso3_code: "NOR", phone_code: "47", name: "Norway" },
      { iso_code: "NP", iso3_code: "NPL", phone_code: "977", name: "Nepal" },
      { iso_code: "NR", iso3_code: "NRU", phone_code: "674", name: "Nauru" },
      { iso_code: "NU", iso3_code: "NIU", phone_code: "683", name: "Niue" },
      { iso_code: "NZ", iso3_code: "NZL", phone_code: "64", name: "New Zealand" },
      { iso_code: "OM", iso3_code: "OMN", phone_code: "968", name: "Oman" },
      { iso_code: "PA", iso3_code: "PAN", phone_code: "507", name: "Panama" },
      { iso_code: "PE", iso3_code: "PER", phone_code: "51", name: "Peru" },
      { iso_code: "PF", iso3_code: "PYF", phone_code: "689", name: "French Polynesia" },
      { iso_code: "PG", iso3_code: "PNG", phone_code: "675", name: "Papua New Guinea" },
      { iso_code: "PH", iso3_code: "PHL", phone_code: "63", name: "Philippines" },
      { iso_code: "PK", iso3_code: "PAK", phone_code: "92", name: "Pakistan" },
      { iso_code: "PL", iso3_code: "POL", phone_code: "48", name: "Poland" },
      { iso_code: "PM", iso3_code: "SPM", phone_code: "508", name: "Saint Pierre And Miquelon" },
      { iso_code: "PR", iso3_code: "PRI", phone_code: "1", name: "Puerto Rico" },
      { iso_code: "PS", iso3_code: "PSE", phone_code: "970", name: "Palestine" },
      { iso_code: "PT", iso3_code: "PRT", phone_code: "351", name: "Portugal" },
      { iso_code: "PW", iso3_code: "PLW", phone_code: "680", name: "Palau" },
      { iso_code: "PY", iso3_code: "PRY", phone_code: "595", name: "Paraguay" },
      { iso_code: "QA", iso3_code: "QAT", phone_code: "974", name: "Qatar" },
      { iso_code: "RE", iso3_code: "REU", phone_code: "262", name: "Reunion" },
      { iso_code: "RO", iso3_code: "ROU", phone_code: "40", name: "Romania" },
      { iso_code: "RS", iso3_code: "SRB", phone_code: "381", name: "Serbia" },
      { iso_code: "RU", iso3_code: "RUS", phone_code: "7", name: "Russia" },
      { iso_code: "RW", iso3_code: "RWA", phone_code: "250", name: "Rwanda" },
      { iso_code: "SA", iso3_code: "SAU", phone_code: "966", name: "Saudi Arabia" },
      { iso_code: "SB", iso3_code: "SLB", phone_code: "677", name: "Solomon Islands" },
      { iso_code: "SC", iso3_code: "SYC", phone_code: "248", name: "Seychelles" },
      { iso_code: "SD", iso3_code: "SDN", phone_code: "249", name: "Sudan" },
      { iso_code: "SE", iso3_code: "SWE", phone_code: "46", name: "Sweden" },
      { iso_code: "SG", iso3_code: "SGP", phone_code: "65", name: "Singapore" },
      { iso_code: "SH", iso3_code: "SHN", phone_code: "290", name: "Saint Helena" },
      { iso_code: "SI", iso3_code: "SVN", phone_code: "386", name: "Slovenia" },
      { iso_code: "SJ", iso3_code: "SJM", phone_code: "47", name: "Svalbard And Jan Mayen" },
      { iso_code: "SK", iso3_code: "SVK", phone_code: "421", name: "Slovakia" },
      { iso_code: "SL", iso3_code: "SLE", phone_code: "232", name: "Sierra Leone" },
      { iso_code: "SM", iso3_code: "SMR", phone_code: "378", name: "San Marino" },
      { iso_code: "SN", iso3_code: "SEN", phone_code: "221", name: "Senegal" },
      { iso_code: "SO", iso3_code: "SOM", phone_code: "252", name: "Somalia" },
      { iso_code: "SR", iso3_code: "SUR", phone_code: "597", name: "Suriname" },
      { iso_code: "SS", iso3_code: "SSD", phone_code: "211", name: "South Sudan" },
      { iso_code: "ST", iso3_code: "STP", phone_code: "239", name: "Sao Tome And Principe" },
      { iso_code: "SV", iso3_code: "SLV", phone_code: "503", name: "El Salvador" },
      { iso_code: "SX", iso3_code: "SXM", phone_code: "1", name: "Sint Maarten (Dutch part)" },
      { iso_code: "SY", iso3_code: "SYR", phone_code: "963", name: "Syria" },
      { iso_code: "SZ", iso3_code: "SWZ", phone_code: "268", name: "Swaziland" },
      { iso_code: "TA", iso3_code: "", phone_code: "290", name: "Tristan da Cunha" },
      { iso_code: "TC", iso3_code: "TCA", phone_code: "1", name: "Turks And Caicos Islands" },
      { iso_code: "TD", iso3_code: "TCD", phone_code: "235", name: "Chad" },
      { iso_code: "TG", iso3_code: "TGO", phone_code: "228", name: "Togo" },
      { iso_code: "TH", iso3_code: "THA", phone_code: "66", name: "Thailand" },
      { iso_code: "TJ", iso3_code: "TJK", phone_code: "992", name: "Tajikistan" },
      { iso_code: "TK", iso3_code: "TKL", phone_code: "690", name: "Tokelau" },
      { iso_code: "TL", iso3_code: "TLS", phone_code: "670", name: "Timor-Leste" },
      { iso_code: "TM", iso3_code: "TKM", phone_code: "993", name: "Turkmenistan" },
      { iso_code: "TN", iso3_code: "TUN", phone_code: "216", name: "Tunisia" },
      { iso_code: "TO", iso3_code: "TON", phone_code: "676", name: "Tonga" },
      { iso_code: "TR", iso3_code: "TUR", phone_code: "90", name: "Turkey" },
      { iso_code: "TT", iso3_code: "TTO", phone_code: "1", name: "Trinidad and Tobago" },
      { iso_code: "TV", iso3_code: "TUV", phone_code: "688", name: "Tuvalu" },
      { iso_code: "TW", iso3_code: "TWN", phone_code: "886", name: "Taiwan" },
      { iso_code: "TZ", iso3_code: "TZA", phone_code: "255", name: "Tanzania" },
      { iso_code: "UA", iso3_code: "UKR", phone_code: "380", name: "Ukraine" },
      { iso_code: "UG", iso3_code: "UGA", phone_code: "256", name: "Uganda" },
      { iso_code: "US", iso3_code: "USA", phone_code: "1", name: "United States" },
      { iso_code: "UY", iso3_code: "URY", phone_code: "598", name: "Uruguay" },
      { iso_code: "UZ", iso3_code: "UZB", phone_code: "998", name: "Uzbekistan" },
      { iso_code: "VA", iso3_code: "VAT", phone_code: "39", name: "Vatican" },
      { iso_code: "VC", iso3_code: "VCT", phone_code: "1", name: "Saint Vincent And The Grenadines" },
      { iso_code: "VE", iso3_code: "VEN", phone_code: "58", name: "Venezuela" },
      { iso_code: "VG", iso3_code: "VGB", phone_code: "1", name: "British Virgin Islands" },
      { iso_code: "VI", iso3_code: "VIR", phone_code: "1", name: "U.S. Virgin Islands" },
      { iso_code: "VN", iso3_code: "VNM", phone_code: "84", name: "Vietnam" },
      { iso_code: "VU", iso3_code: "VUT", phone_code: "678", name: "Vanuatu" },
      { iso_code: "WF", iso3_code: "WLF", phone_code: "681", name: "Wallis And Futuna" },
      { iso_code: "WS", iso3_code: "WSM", phone_code: "685", name: "Samoa" },
      { iso_code: "XK", iso3_code: "KOS", phone_code: "383", name: "Kosovo" },
      { iso_code: "YE", iso3_code: "YEM", phone_code: "967", name: "Yemen" },
      { iso_code: "YT", iso3_code: "MYT", phone_code: "262", name: "Mayotte" },
      { iso_code: "ZA", iso3_code: "ZAF", phone_code: "27", name: "South Africa" },
      { iso_code: "ZM", iso3_code: "ZMB", phone_code: "260", name: "Zambia" },
      { iso_code: "ZW", iso3_code: "ZWE", phone_code: "263", name: "Zimbabwe" },
    ])
}
