/**
 * =====================================================
 * NBA HUB 2026 - MAIN JAVASCRIPT & FIREBASE AUTHENTICATION
 * File: script.js
 * =====================================================
 */

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

/* -----------------------------------------------------
 * 1. TRANSLATION & DATA STORE
 * ----------------------------------------------------- */
export const translations = {
  en: {
    mainTitle: "NBA Hub 2026",
    factPara: "Current NBA Fact:",
    nbaFact: "The NBA was founded in 1946 as the Basketball Association of America (BAA).",
    timeZoneLabel: "Select Time Zone:",
    languageLabel: "Select Language:",
    todayNewsTitle: "Today's NBA News (2026)",
    todayNews: [
      "Breaking: Lakers star LeBron James announces he will retire after the 2026 season, ending a historic 23-year career.",
      "Trade Alert: Boston Celtics acquire Kevin Durant in a blockbuster multi-team deal.",
      "Injury Update: Stephen Curry expected back on court by All-Star break.",
      "2026 Draft: Top prospect Cooper Flagg projected as #1 pick in upcoming draft.",
      "Record Watch: Giannis Antetokounmpo eyes another 50-point masterpiece tonight.",
      "Free Agency: Miami Heat finalize deal bolstering their perimeter defense.",
      "All-Star 2026: San Francisco Chase Center hosts spectacular NBA All-Star Weekend.",
      "International: Luka Doncic leads Slovenia into FIBA World tournament contention.",
      "Future Stars: Victor Wembanyama records back-to-back 5x5 historic games."
    ],
    playersTitle: "NBA Players & Legends Directory",
    players: [
      "Michael Jordan - Chicago Bulls (1984-1998, 2001-2003) - 6x Champion, 5x MVP",
      "LeBron James - Cleveland Cavaliers, Miami Heat, Los Angeles Lakers (2003-) - 4x Champion, 4x MVP, All-Time Scoring Leader",
      "Kobe Bryant - Los Angeles Lakers (1996-2016) - 5x Champion, 1x MVP, 2x Finals MVP",
      "Stephen Curry - Golden State Warriors (2009-) - 4x Champion, 2x MVP, All-Time 3-Point Leader",
      "Kareem Abdul-Jabbar - Milwaukee Bucks, Los Angeles Lakers (1969-1989) - 6x Champion, 6x MVP",
      "Magic Johnson - Los Angeles Lakers (1979-1991, 1996) - 5x Champion, 3x MVP",
      "Larry Bird - Boston Celtics (1979-1992) - 3x Champion, 3x MVP",
      "Shaquille O'Neal - Orlando Magic, Los Angeles Lakers, Miami Heat (1992-2011) - 4x Champion, 1x MVP",
      "Tim Duncan - San Antonio Spurs (1997-2016) - 5x Champion, 2x MVP",
      "Hakeem Olajuwon - Houston Rockets, Toronto Raptors (1984-2002) - 2x Champion, 1x MVP",
      "Kevin Durant - OKC Thunder, Golden State Warriors, Phoenix Suns (2007-) - 2x Champion, 1x MVP",
      "Giannis Antetokounmpo - Milwaukee Bucks (2013-) - 1x Champion, 2x MVP, DPOY",
      "Nikola Jokic - Denver Nuggets (2015-) - 1x Champion, 3x MVP",
      "Luka Doncic - Dallas Mavericks (2018-) - Multi-time First Team All-NBA",
      "Victor Wembanyama - San Antonio Spurs (2023-) - 2024 Rookie of the Year & Defensive Phenom",
      "Jalen Brunson - New York Knicks (2018-) - 2026 Finals MVP, All-NBA First Team",
      "Anthony Davis - Los Angeles Lakers (2012-) - 1x Champion, 9x All-Star",
      "Kawhi Leonard - San Antonio Spurs, Toronto Raptors, LA Clippers (2011-) - 2x Champion, 2x Finals MVP",
      "Damian Lillard - Portland Trail Blazers, Milwaukee Bucks (2012-) - NBA 75th Anniversary Team",
      "Jimmy Butler - Miami Heat (2011-) - 6x All-Star, Playoff Leader",
      "Kyrie Irving - Dallas Mavericks (2011-) - 1x Champion, 8x All-Star",
      "Russell Westbrook - OKC Thunder, LA Clippers, Denver Nuggets (2008-) - 1x MVP, Triple-Double Record",
      "Joel Embiid - Philadelphia 76ers (2014-) - 1x MVP, 2x Scoring Champion",
      "Devin Booker - Phoenix Suns (2015-) - 4x All-Star, 70-point scorer",
      "Donovan Mitchell - Cleveland Cavaliers (2017-) - 5x All-Star, 71-point scorer",
      "Chet Holmgren - Oklahoma City Thunder (2023-) - All-Rookie First Team, Rising Star",
      "Paolo Banchero - Orlando Magic (2022-) - 2023 Rookie of the Year, All-Star",
      "Tyrese Maxey - Philadelphia 76ers (2020-) - 2024 Most Improved Player",
      "Cade Cunningham - Detroit Pistons (2021-) - Franchise Star",
      "Alperen Sengun - Houston Rockets (2021-) - Rising Star Center",
      "Draymond Green - Golden State Warriors (2012-) - 4x Champion, 1x DPOY",
      "Klay Thompson - Dallas Mavericks (2011-) - 4x Champion, 5x All-Star",
      "Allen Iverson - Philadelphia 76ers (1996-2010) - 1x MVP, 4x Scoring Champion",
      "Dirk Nowitzki - Dallas Mavericks (1998-2019) - 1x Champion, 1x MVP",
      "Dwyane Wade - Miami Heat (2003-2019) - 3x Champion, 1x Finals MVP",
      "Charles Barkley - Philadelphia 76ers, Phoenix Suns (1984-2000) - 1x MVP",
      "Patrick Ewing - New York Knicks (1985-2002) - 11x All-Star",
      "John Stockton - Utah Jazz (1984-2003) - All-Time Assist & Steals Leader",
      "Karl Malone - Utah Jazz (1985-2004) - 2x MVP, 36,928 career points",
      "Scottie Pippen - Chicago Bulls (1987-2004) - 6x Champion, Hall of Fame"
    ],
    newsTitle: "Latest League News & Updates",
    news: [
      "NBA Season 2025-2026 is in full swing with record-breaking viewership across global platforms.",
      "The New York Knicks completed a triumphant campaign, capturing the 2026 NBA Championship.",
      "2026 New York Knicks MVP was awarded to Jalen Brunson following clutch postseason performances.",
      "Injury Report: Teams manage player workloads as the grueling 82-game regular schedule advances.",
      "Historical Milestone: NBA celebrates 80 years of basketball excellence since its 1946 inauguration.",
      "Global Expansion: NBA announces upcoming regular season international fixtures in Paris, Mexico City, and Tokyo."
    ],
    teamsTitle: "NBA Franchise Directory (30 Teams)",
    teams: [
      "Boston Celtics: Founded in 1946, TD Garden. Championships: 18.",
      "Brooklyn Nets: Founded in 1967, Barclays Center. Championships: 0.",
      "New York Knicks: Founded in 1946, Madison Square Garden. Championships: 3.",
      "Philadelphia 76ers: Founded in 1946, Wells Fargo Center. Championships: 3.",
      "Toronto Raptors: Founded in 1995, Scotiabank Arena. Championships: 1.",
      "Chicago Bulls: Founded in 1966, United Center. Championships: 6.",
      "Cleveland Cavaliers: Founded in 1970, Rocket Mortgage FieldHouse. Championships: 1.",
      "Detroit Pistons: Founded in 1941, Little Caesars Arena. Championships: 3.",
      "Indiana Pacers: Founded in 1967, Gainbridge Fieldhouse. Championships: 0.",
      "Milwaukee Bucks: Founded in 1968, Fiserv Forum. Championships: 2.",
      "Atlanta Hawks: Founded in 1946, State Farm Arena. Championships: 1.",
      "Charlotte Hornets: Founded in 1988, Spectrum Center. Championships: 0.",
      "Miami Heat: Founded in 1988, Kaseya Center. Championships: 3.",
      "Orlando Magic: Founded in 1989, Kia Center. Championships: 0.",
      "Washington Wizards: Founded in 1961, Capital One Arena. Championships: 1.",
      "Dallas Mavericks: Founded in 1980, American Airlines Center. Championships: 1.",
      "Houston Rockets: Founded in 1967, Toyota Center. Championships: 2.",
      "Memphis Grizzlies: Founded in 1995, FedExForum. Championships: 0.",
      "New Orleans Pelicans: Founded in 2002, Smoothie King Center. Championships: 0.",
      "San Antonio Spurs: Founded in 1967, Frost Bank Center. Championships: 5.",
      "Denver Nuggets: Founded in 1967, Ball Arena. Championships: 1.",
      "Minnesota Timberwolves: Founded in 1989, Target Center. Championships: 0.",
      "Oklahoma City Thunder: Founded in 1967, Paycom Center. Championships: 1.",
      "Portland Trail Blazers: Founded in 1970, Moda Center. Championships: 1.",
      "Utah Jazz: Founded in 1974, Delta Center. Championships: 0.",
      "Golden State Warriors: Founded in 1946, Chase Center. Championships: 7.",
      "LA Clippers: Founded in 1970, Intuit Dome. Championships: 0.",
      "Los Angeles Lakers: Founded in 1946, Crypto.com Arena. Championships: 17.",
      "Phoenix Suns: Founded in 1968, Footprint Center. Championships: 0.",
      "Sacramento Kings: Founded in 1923, Golden 1 Center. Championships: 1."
    ],
    arenasTitle: "NBA Arenas & Live Directions",
    arenas: [
      { text: "Boston Celtics: TD Garden, 100 Legends Way, Boston, MA 02114", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=TD+Garden+Boston" },
      { text: "Brooklyn Nets: Barclays Center, 620 Atlantic Ave, Brooklyn, NY 11217", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Barclays+Center+Brooklyn" },
      { text: "New York Knicks: Madison Square Garden, 4 Pennsylvania Plaza, New York, NY 10001", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Madison+Square+Garden+New+York" },
      { text: "Philadelphia 76ers: Wells Fargo Center, 3601 S Broad St, Philadelphia, PA 19148", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Wells+Fargo+Center+Philadelphia" },
      { text: "Toronto Raptors: Scotiabank Arena, 40 Bay St, Toronto, ON M5J 2X2, Canada", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Scotiabank+Arena+Toronto" },
      { text: "Chicago Bulls: United Center, 1901 W Madison St, Chicago, IL 60612", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=United+Center+Chicago" },
      { text: "Cleveland Cavaliers: Rocket Mortgage FieldHouse, 1 Center Ct, Cleveland, OH 44115", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Rocket+Mortgage+FieldHouse+Cleveland" },
      { text: "Detroit Pistons: Little Caesars Arena, 2645 Woodward Ave, Detroit, MI 48201", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Little+Caesars+Arena+Detroit" },
      { text: "Indiana Pacers: Gainbridge Fieldhouse, 125 S Pennsylvania St, Indianapolis, IN 46204", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Gainbridge+Fieldhouse+Indianapolis" },
      { text: "Milwaukee Bucks: Fiserv Forum, 1111 Vel R Phillips Ave, Milwaukee, WI 53203", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Fiserv+Forum+Milwaukee" },
      { text: "Atlanta Hawks: State Farm Arena, 1 State Farm Dr, Atlanta, GA 30303", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=State+Farm+Arena+Atlanta" },
      { text: "Charlotte Hornets: Spectrum Center, 330 E Trade St, Charlotte, NC 28202", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Spectrum+Center+Charlotte" },
      { text: "Miami Heat: Kaseya Center, 601 Biscayne Blvd, Miami, FL 33132", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Kaseya+Center+Miami" },
      { text: "Orlando Magic: Kia Center, 400 W Church St, Orlando, FL 32801", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Kia+Center+Orlando" },
      { text: "Washington Wizards: Capital One Arena, 601 F St NW, Washington, DC 20004", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Capital+One+Arena+Washington" },
      { text: "Dallas Mavericks: American Airlines Center, 2500 Victory Ave, Dallas, TX 75219", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=American+Airlines+Center+Dallas" },
      { text: "Houston Rockets: Toyota Center, 1510 Polk St, Houston, TX 77002", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Toyota+Center+Houston" },
      { text: "Memphis Grizzlies: FedExForum, 191 Beale St, Memphis, TN 38103", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=FedExForum+Memphis" },
      { text: "New Orleans Pelicans: Smoothie King Center, 1501 Girod St, New Orleans, LA 70113", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Smoothie+King+Center+New+Orleans" },
      { text: "San Antonio Spurs: Frost Bank Center, 1 AT&T Center Pkwy, San Antonio, TX 78219", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Frost+Bank+Center+San+Antonio" },
      { text: "Denver Nuggets: Ball Arena, 1000 Chopper Cir, Denver, CO 80204", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Ball+Arena+Denver" },
      { text: "Minnesota Timberwolves: Target Center, 600 N 1st Ave, Minneapolis, MN 55403", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Target+Center+Minneapolis" },
      { text: "Oklahoma City Thunder: Paycom Center, 100 W Reno Ave, Oklahoma City, OK 73102", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Paycom+Center+Oklahoma+City" },
      { text: "Portland Trail Blazers: Moda Center, 1 N Center Ct St, Portland, OR 97227", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Moda+Center+Portland" },
      { text: "Utah Jazz: Delta Center, 301 W South Temple, Salt Lake City, UT 84101", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Delta+Center+Salt+Lake+City" },
      { text: "Golden State Warriors: Chase Center, 1 Warriors Way, San Francisco, CA 94158", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Chase+Center+San+Francisco" },
      { text: "LA Clippers: Intuit Dome, 3930 W Century Blvd, Inglewood, CA 90303", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Intuit+Dome+Inglewood" },
      { text: "Los Angeles Lakers: Crypto.com Arena, 1111 S Figueroa St, Los Angeles, CA 90015", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Crypto+Arena+Los+Angeles" },
      { text: "Phoenix Suns: Footprint Center, 201 E Jefferson St, Phoenix, AZ 85004", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Footprint+Center+Phoenix" },
      { text: "Sacramento Kings: Golden 1 Center, 500 David J Stern Walk, Sacramento, CA 95814", link: "Get Directions", url: "https://www.google.com/maps/search/?api=1&query=Golden+1+Center+Sacramento" }
    ],
    storeTitle: "Official NBA Store: Gear & Equipment",
    store: [
      { text: "Wilson NBA Authentic Series Official Game Ball: Size 7 indoor/outdoor genuine composite leather.", link: "Shop Wilson", url: "https://www.wilson.com/en-us/basketball/balls" },
      { text: "Spalding NBA Zi/O Excel Indoor Basketball: Elite grip soft composite channel ball.", link: "Shop Spalding", url: "https://www.spalding.com/basketball" },
      { text: "Nike Air Jordan Retro Series: Engineered court performance with iconic legacy silhouette.", link: "Shop Jordans", url: "https://www.nike.com/jordan" },
      { text: "Spalding Street Graffiti Edition: Deep rubber channels designed for outdoor pavement durability.", link: "Shop Street", url: "https://www.spalding.com" },
      { text: "Nike NBA Authentic City Edition Jerseys: Dri-FIT ADV licensed jerseys from all 30 NBA teams.", link: "Shop Jerseys", url: "https://store.nba.com" }
    ],
    sponsorsTitle: "Official Partners & Corporate Sponsors",
    sponsors: [
      "Nike - Official Global On-Court Apparel Partner ('Just Do It')",
      "Wilson - Official Basketball Provider of the NBA & WNBA ('Always Wilson')",
      "Samsung - Official Display & Mobile Technology Partner ('Do What You Can't')"
    ],
    contactsTitle: "NBA Headquarters & Fan Relations Support",
    contacts: [
      "📞 NBA League Pass Live Streaming Support Hotline: 1-844-622-8550 (Daily 9:00 AM - 1:00 AM ET)",
      "🛍️ NBA Store & Merchandising Support: 1-866-746-7622 (Orders, exchanges, billing inquiry)",
      "🏢 NBA Global Headquarters (New York HQ): +1 (212) 407-8000 / Olympic Tower, 645 5th Ave, New York, NY 10022",
      "📧 Fan Relations & Inquiries: fanrelations@nba.com",
      "📧 Streaming Support: leaguepass@nba.com"
    ]
  },
  es: {
    mainTitle: "Centro NBA 2026",
    factPara: "Hecho Actual de la NBA:",
    nbaFact: "La NBA se fundó en 1946 como la Asociación de Baloncesto de América (BAA).",
    timeZoneLabel: "Seleccionar Zona Horaria:",
    languageLabel: "Seleccionar Idioma:",
    todayNewsTitle: "Noticias de Hoy de la NBA",
    newsTitle: "Últimas Noticias y Actualizaciones",
    playersTitle: "Directorio de Jugadores y Leyendas de la NBA",
    teamsTitle: "Franquicias de la NBA (30 Equipos)",
    arenasTitle: "Arenas de la NBA y Direcciones en Vivo",
    storeTitle: "Tienda Oficial de la NBA: Ropa y Balones",
    sponsorsTitle: "Patrocinadores Oficiales de la NBA",
    contactsTitle: "Sede de la NBA y Atención al Aficionado"
  },
  fr: {
    mainTitle: "Centre NBA 2026",
    factPara: "Fait Actuel de la NBA:",
    nbaFact: "La NBA a été fondée en 1946 sous le nom de Basketball Association of America.",
    timeZoneLabel: "Sélectionner Fuseau Horaire:",
    languageLabel: "Sélectionner Langue:",
    todayNewsTitle: "Nouvelles NBA du Jour",
    newsTitle: "Dernières Nouvelles de la Ligue",
    playersTitle: "Répertoire des Joueurs et Légendes NBA",
    teamsTitle: "Franchises NBA (30 Équipes)",
    arenasTitle: "Arènes NBA et Itinéraires",
    storeTitle: "Boutique Officielle NBA",
    sponsorsTitle: "Partenaires Officiels",
    contactsTitle: "Siège NBA & Service Fan"
  },
  de: {
    mainTitle: "NBA-Hub 2026",
    factPara: "Aktueller NBA-Fakt:",
    nbaFact: "Die NBA wurde 1946 als Basketball Association of America gegründet.",
    timeZoneLabel: "Zeitzone auswählen:",
    languageLabel: "Sprache auswählen:",
    todayNewsTitle: "Heutige NBA-Nachrichten",
    newsTitle: "Neueste Liga-Nachrichten",
    playersTitle: "NBA-Spieler & Legenden-Verzeichnis",
    teamsTitle: "NBA-Teams (30 Teams)",
    arenasTitle: "NBA-Arenen & Routenführung",
    storeTitle: "Offizieller NBA-Shop",
    sponsorsTitle: "Offizielle Sponsoren",
    contactsTitle: "NBA-Zentrale & Kundenservice"
  },
  pt: {
    mainTitle: "Hub da NBA 2026",
    factPara: "Fato Atual da NBA:",
    nbaFact: "A NBA foi fundada em 1946 como a Basketball Association of America.",
    timeZoneLabel: "Selecionar Fuso Horário:",
    languageLabel: "Selecionar Idioma:",
    todayNewsTitle: "Notícias da NBA de Hoje",
    newsTitle: "Últimas Notícias da Liga",
    playersTitle: "Diretório de Jogadores e Lendas da NBA",
    teamsTitle: "Franquias da NBA (30 Equipes)",
    arenasTitle: "Arenas da NBA e Rotas",
    storeTitle: "Loja Oficial da NBA",
    sponsorsTitle: "Patrocinadores Oficiais",
    contactsTitle: "Sede da NBA & Atendimento"
  },
  ja: {
    mainTitle: "NBAハブ 2026",
    factPara: "現在のNBAの事実:",
    nbaFact: "NBAは1946年にアメリカ・バスケットボール協会（BAA）として創設されました。",
    timeZoneLabel: "タイムゾーンを選択:",
    languageLabel: "言語を選択:",
    todayNewsTitle: "本日のNBA最新ニュース",
    newsTitle: "最新のリーグニュースと速報",
    playersTitle: "NBA選手およびレジェンド名鑑",
    teamsTitle: "NBA全30チーム一覧",
    arenasTitle: "NBAアリーナとマップ・ナビゲーション",
    storeTitle: "公式NBAストア：ボール＆ギア",
    sponsorsTitle: "公式オフィシャルパートナー",
    contactsTitle: "NBA本部・カスタマーサポート"
  },
  si: {
    mainTitle: "NBA හබ් 2026",
    factPara: "වර්තමාන NBA කරුණ:",
    nbaFact: "NBA ලීගය 1946 දී ඇමරිකානු පැසිපන්දු සංගමය (BAA) ලෙස ආරම්භ විය.",
    timeZoneLabel: "කාල කලාපය තෝරන්න:",
    languageLabel: "භාෂාව තෝරන්න:",
    todayNewsTitle: "අද NBA පුවත්",
    newsTitle: "නවතම NBA ලීග් පුවත්",
    playersTitle: "NBA ක්‍රීඩකයන් සහ විශිෂ්ටයන්ගේ නාමාවලිය",
    teamsTitle: "NBA කණ්ඩායම් (කණ්ඩායම් 30)",
    arenasTitle: "NBA ක්‍රීඩාංගණ සහ මාර්ග විස්තර",
    storeTitle: "නිල NBA වෙළඳසැල: ක්‍රීඩා භාණ්ඩ",
    sponsorsTitle: "නිල අනුග්‍රාහකයන්",
    contactsTitle: "NBA මූලස්ථානය සහ පාරිභෝගික සහාය"
  }
};

/* -----------------------------------------------------
 * DEVELOPER & SYSTEM ADMINISTRATOR CONSTANTS
 * ----------------------------------------------------- */
export var DEV_ADMIN_EMAIL = "madusha.cmec@gmail.com";

export function isDevAdmin(user) {
  if (!user || !user.email) return false;
  return user.email.toLowerCase().trim() === DEV_ADMIN_EMAIL.toLowerCase();
}

export async function isDevWithQuestions(user) {
  if (!user) return false;

  // First, ask the security questions
  const questionsCorrect = await checkDevQuestions();
  if (!questionsCorrect) return false;

  // If questions correct, check email
  return isDevAdmin(user);
}

async function checkDevQuestions() {
  return new Promise((resolve) => {
    const modal = document.getElementById("devQuestionsModal");
    const submitBtn = document.getElementById("submitDevQuestionsBtn");
    const cancelBtn = document.getElementById("closeDevQuestionsBtn");
    const q1Input = document.getElementById("devQ1");
    const q2Input = document.getElementById("devQ2");
    const q3Input = document.getElementById("devQ3");

    // Reset inputs
    q1Input.value = "";
    q2Input.value = "";
    q3Input.value = "";

    // Show modal
    modal.style.display = "flex";

    const closeModal = () => {
      modal.style.display = "none";
      resolve(false); // Cancel or close means false
    };

    cancelBtn.addEventListener("click", closeModal);

    submitBtn.addEventListener("click", () => {
      const a1 = q1Input.value.trim().toLowerCase();
      const a2 = q2Input.value.trim().toLowerCase();
      const a3 = q3Input.value.trim().toLowerCase();

      const correct1 = a1 === "protein";
      const correct2 = a2 === "ranaweera";
      const correct3 = a3 === "ivaan";

      const correctCount = (correct1 ? 1 : 0) + (correct2 ? 1 : 0) + (correct3 ? 1 : 0);

      modal.style.display = "none";

      if (correctCount === 3) {
        resolve(true); // All correct
      } else {
        resolve(false); // Not all correct
      }
    });
  });
}

export function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let regCaptchaSolution = 7;
let postCaptchaSolution = 9;

export function refreshRegCaptcha() {
  const n1 = Math.floor(Math.random() * 8) + 2;
  const n2 = Math.floor(Math.random() * 8) + 1;
  regCaptchaSolution = n1 + n2;
  const qEl = document.getElementById("regCaptchaQuestion");
  if (qEl) qEl.textContent = `${n1} + ${n2} = ?`;
  const ansEl = document.getElementById("regCaptchaAnswer");
  if (ansEl) ansEl.value = "";
}

export function refreshPostCaptcha() {
  const n1 = Math.floor(Math.random() * 7) + 3;
  const n2 = Math.floor(Math.random() * 6) + 2;
  postCaptchaSolution = n1 + n2;
  const qEl = document.getElementById("postCaptchaQuestion");
  if (qEl) qEl.textContent = `${n1} + ${n2} = ?`;
  const ansEl = document.getElementById("postCaptchaAnswer");
  if (ansEl) ansEl.value = "";
}

/* -----------------------------------------------------
 * 2. AUTHENTICATION ENGINE (DUAL MODE: LIVE FIREBASE OR SANDBOX)
 * ----------------------------------------------------- */

/**
 * Checks whether user has enabled Sandbox Demo mode or if the API key is a dummy
 */
export function getAuthMode() {
  const mode = localStorage.getItem("nba_auth_mode");
  if (mode === "demo") return "demo";
  if (mode === "firebase") return "firebase";

  // Auto-detect: if no real config has been saved, default to demo mode so user experiences zero errors
  const saved = localStorage.getItem("nba_firebase_config");
  if (!saved) return "demo";

  try {
    const parsed = JSON.parse(saved);
    if (!parsed.apiKey || parsed.apiKey.includes("Dummy") || parsed.apiKey.includes("YOUR_API_KEY")) {
      return "demo";
    }
  } catch (e) {
    return "demo";
  }

  return "firebase";
}

export function setAuthMode(mode) {
  localStorage.setItem("nba_auth_mode", mode);
}

// User-stored Firebase credentials
export function getStoredFirebaseConfig() {
  try {
    const saved = localStorage.getItem("nba_firebase_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not read stored Firebase config", err);
  }
  return null;
}

export function saveFirebaseConfig(config) {
  localStorage.setItem("nba_firebase_config", JSON.stringify(config));
  setAuthMode("firebase");
}

let firebaseApp = null;
let firebaseAuth = null;
let liveFirebaseAvailable = false;

export function initFirebase() {
  const config = getStoredFirebaseConfig();
  if (config && config.apiKey && !config.apiKey.includes("Dummy") && !config.apiKey.includes("YOUR_")) {
    try {
      const existingApps = getApps();
      if (existingApps.length > 0) {
        firebaseApp = existingApps[0];
      } else {
        firebaseApp = initializeApp(config);
      }
      firebaseAuth = getAuth(firebaseApp);
      setPersistence(firebaseAuth, browserLocalPersistence).catch(() => {});
      liveFirebaseAvailable = true;
    } catch (e) {
      console.warn("Firebase live init error:", e);
      liveFirebaseAvailable = false;
    }
  }
}

initFirebase();

/* -----------------------------------------------------
 * 3. SANDBOX AUTH PROVIDER (OFFLINE / ZERO-SETUP AUTH)
 * Fully compliant with Firebase User interface:
 * { uid, email, displayName, emailVerified, reload() }
 * ----------------------------------------------------- */
const SandboxAuth = {
  listeners: [],
  getCurrentUser() {
    try {
      const raw = localStorage.getItem("nba_sandbox_session");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
  getUsers() {
    try {
      const raw = localStorage.getItem("nba_sandbox_users");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  },
  saveUsers(users) {
    localStorage.setItem("nba_sandbox_users", JSON.stringify(users));
  },
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem("nba_sandbox_session", JSON.stringify(user));
    } else {
      localStorage.removeItem("nba_sandbox_session");
    }
    this.notify(user);
  },
  onAuthStateChanged(cb) {
    this.listeners.push(cb);
    // Call immediately with current state
    cb(this.getCurrentUser());
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  },
  notify(user) {
    this.listeners.forEach(cb => {
      try { cb(user); } catch (e) { console.error(e); }
    });
  },
  async signIn(email, password) {
    const users = this.getUsers();
    const user = users[email.toLowerCase()];
    if (!user || user.password !== password) {
      const err = new Error("Incorrect email or password.");
      err.code = "auth/invalid-credential";
      throw err;
    }
    const sessionUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: !!user.emailVerified
    };
    this.setCurrentUser(sessionUser);
    return { user: sessionUser };
  },
  async register(displayName, email, password) {
    const users = this.getUsers();
    const lowerEmail = email.toLowerCase();
    if (users[lowerEmail]) {
      const err = new Error("This email is already registered.");
      err.code = "auth/email-already-in-use";
      throw err;
    }
    const newUser = {
      uid: "user_" + Math.random().toString(36).substring(2, 9),
      email: email,
      displayName: displayName,
      password: password,
      emailVerified: false,
      createdAt: new Date().toISOString()
    };
    users[lowerEmail] = newUser;
    this.saveUsers(users);

    const sessionUser = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      emailVerified: false
    };
    this.setCurrentUser(sessionUser);
    return { user: sessionUser };
  },
  async signOut() {
    this.setCurrentUser(null);
  },
  async verifyEmail() {
    const current = this.getCurrentUser();
    if (!current) return;
    const users = this.getUsers();
    const lower = current.email.toLowerCase();
    if (users[lower]) {
      users[lower].emailVerified = true;
      this.saveUsers(users);
    }
    current.emailVerified = true;
    this.setCurrentUser(current);
  },
  async resetPassword(email) {
    const users = this.getUsers();
    if (!users[email.toLowerCase()]) {
      const err = new Error("No account found with this email.");
      err.code = "auth/user-not-found";
      throw err;
    }
    return true;
  },
  async updateProfile(updates) {
    const current = this.getCurrentUser();
    if (!current) throw new Error("No active user session.");
    const users = this.getUsers();
    const lower = current.email.toLowerCase();
    if (users[lower]) {
      if (updates.displayName !== undefined) users[lower].displayName = updates.displayName;
      if (updates.photoURL !== undefined) users[lower].photoURL = updates.photoURL;
      this.saveUsers(users);
    }
    if (updates.displayName !== undefined) current.displayName = updates.displayName;
    if (updates.photoURL !== undefined) current.photoURL = updates.photoURL;
    this.setCurrentUser(current);
    return current;
  }
};

/* -----------------------------------------------------
 * 3B. PROFILE METADATA STORE (CUSTOM AVATARS, TEAMS & BIO)
 * ----------------------------------------------------- */
export function getUserProfileMeta(uid) {
  if (!uid) return {};
  try {
    const raw = localStorage.getItem(`nba_profile_meta_${uid}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveUserProfileMeta(uid, meta) {
  if (!uid) return meta;
  try {
    const existing = getUserProfileMeta(uid);
    const updated = { ...existing, ...meta };
    localStorage.setItem(`nba_profile_meta_${uid}`, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Could not save profile metadata:", e);
    return meta;
  }
}

/* -----------------------------------------------------
 * 4. HUMAN-FRIENDLY ERROR MESSAGING & FORMATTING
 * ----------------------------------------------------- */
export function getFirebaseErrorMessage(error) {
  if (!error) return "An unexpected error occurred.";
  const rawMsg = (error.message || "").toLowerCase();
  const code = (error.code || "").toLowerCase();

  if (rawMsg.includes("api-key-not-valid") || rawMsg.includes("invalid-api-key") || code.includes("api-key-not-valid") || code.includes("invalid-api-key")) {
    return `⚠️ Firebase API Key is not configured yet! Click "⚙️ Firebase Setup" above to paste your key, or click the button below to switch to Instant Demo Mode.`;
  }

  if (rawMsg.includes("unauthorized-domain") || code.includes("unauthorized-domain")) {
    const domain = window.location.hostname;
    return `🔒 Domain Unauthorized: Go to Firebase Console > Authentication > Settings > Authorized Domains and add '${domain}'.`;
  }

  const errorMessages = {
    "auth/email-already-in-use": "This email address is already registered. Please sign in or reset your password.",
    "auth/invalid-email": "The email format is invalid. Please check and try again.",
    "auth/weak-password": "The password is too weak. Please use at least 6 characters.",
    "auth/invalid-credential": "Incorrect email or password. Please verify and try again.",
    "auth/user-not-found": "No account found with this email. Please register first.",
    "auth/wrong-password": "Incorrect password. If you forgot your password, click 'Forgot Password'.",
    "auth/too-many-requests": "Access temporarily blocked due to many failed attempts. Please wait a moment.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/operation-not-allowed": "Email/password authentication is not enabled in the Firebase Console."
  };

  return errorMessages[code] || error.message || "Authentication failed. Code: " + (error.code || "unknown");
}

/* -----------------------------------------------------
 * 5. FEEDBACK NOTIFICATIONS (WITH QUICK ACTIONS)
 * ----------------------------------------------------- */
export function showAuthMessage(text, isSuccess = false, showSwitchToDemo = false, extraAction = null) {
  const msgEl = document.getElementById("authMessage");
  if (!msgEl) return;

  let content = `<span>${text}</span>`;
  if (showSwitchToDemo) {
    content += ` <button id="quickSwitchToDemoBtn" type="button" style="margin-left: 8px; padding: 4px 10px; font-size: 12px; background: #00d9ff; color: #000; border-radius: 6px; font-weight: bold; cursor: pointer;">⚡ Use Instant Demo Mode</button>`;
  }
  if (extraAction && extraAction.id && extraAction.label) {
    content += ` <button id="${extraAction.id}" type="button" style="margin-left: 8px; padding: 4px 12px; font-size: 12px; background: #00d9ff; color: #050b14; border-radius: 6px; font-weight: 700; cursor: pointer; border: none;">${extraAction.label}</button>`;
  }

  msgEl.innerHTML = content;
  msgEl.className = isSuccess ? "success" : "error";
  msgEl.style.display = "block";

  document.getElementById("quickSwitchToDemoBtn")?.addEventListener("click", () => {
    setAuthMode("demo");
    window.location.reload();
  });

  if (extraAction && extraAction.id && typeof extraAction.onClick === "function") {
    document.getElementById(extraAction.id)?.addEventListener("click", extraAction.onClick);
  }
}

export function clearAuthMessage() {
  const msgEl = document.getElementById("authMessage");
  if (!msgEl) return;
  msgEl.textContent = "";
  msgEl.className = "";
  msgEl.style.display = "none";
}

/* -----------------------------------------------------
 * 6. LANGUAGE & LOCALIZATION CONTROLLER
 * ----------------------------------------------------- */
let currentLocale = "en";

export function setLanguage(lang) {
  const fallback = translations.en;
  const trans = translations[lang] || fallback;
  currentLocale = lang;

  const updateText = (id, text) => {
    const el = document.getElementById(id);
    if (el && text) el.textContent = text;
  };

  updateText("mainTitle", trans.mainTitle || fallback.mainTitle);
  updateText("timeZoneLabel", trans.timeZoneLabel || fallback.timeZoneLabel);
  updateText("languageLabel", trans.languageLabel || fallback.languageLabel);
  updateText("todayNewsTitle", trans.todayNewsTitle || fallback.todayNewsTitle);
  updateText("newsTitle", trans.newsTitle || fallback.newsTitle);
  updateText("playersTitle", trans.playersTitle || fallback.playersTitle);
  updateText("teamsTitle", trans.teamsTitle || fallback.teamsTitle);
  updateText("arenasTitle", trans.arenasTitle || fallback.arenasTitle);
  updateText("storeTitle", trans.storeTitle || fallback.storeTitle);
  updateText("sponsorsTitle", trans.sponsorsTitle || fallback.sponsorsTitle);
  updateText("contactsTitle", trans.contactsTitle || fallback.contactsTitle);

  const factPara = document.getElementById("factPara");
  if (factPara) {
    const prefix = trans.factPara || fallback.factPara;
    const fact = trans.nbaFact || fallback.nbaFact;
    factPara.innerHTML = `${prefix} <span id="nbaFact" style="color:#00d9ff; font-weight:600;">${fact}</span>`;
  }

  const todayList = document.getElementById("todayNewsList");
  if (todayList) {
    const newsItems = trans.todayNews || fallback.todayNews;
    todayList.innerHTML = newsItems.map(item => `<li>🏀 ${item}</li>`).join("");
  }

  const playersList = document.getElementById("playersList");
  if (playersList) {
    const playerItems = trans.players || fallback.players;
    playersList.innerHTML = playerItems.map(item => {
      const parts = item.split(" - ");
      const name = parts[0];
      const details = parts.slice(1).join(" - ");
      return `<li><strong style="color:#00d9ff;">${name}</strong>: ${details}</li>`;
    }).join("");
  }

  const generalNewsList = document.getElementById("generalNewsList");
  if (generalNewsList) {
    const genNews = trans.news || fallback.news;
    generalNewsList.innerHTML = genNews.map(item => `<li>📰 ${item}</li>`).join("");
  }

  const teamsList = document.getElementById("teamsList");
  if (teamsList) {
    const teamItems = trans.teams || fallback.teams;
    teamsList.innerHTML = teamItems.map(item => {
      const colonIdx = item.indexOf(":");
      const teamName = colonIdx > -1 ? item.substring(0, colonIdx) : item;
      const rest = colonIdx > -1 ? item.substring(colonIdx + 1) : "";
      return `<li><strong style="color:#00d9ff;">${teamName}:</strong>${rest}</li>`;
    }).join("");
  }

  const arenasList = document.getElementById("arenasList");
  if (arenasList) {
    const arenaItems = trans.arenas || fallback.arenas;
    arenasList.innerHTML = arenaItems.map(item => {
      const text = item.text || item;
      const linkText = item.link || "Get Directions";
      const mapUrl = item.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text)}`;
      return `<li>
        <span>${text}</span>
        <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" style="margin-left: 8px;">📍 ${linkText}</a>
      </li>`;
    }).join("");
  }

  const storeList = document.getElementById("storeList");
  if (storeList) {
    const storeItems = trans.store || fallback.store;
    storeList.innerHTML = storeItems.map(item => {
      return `<div class="store-card">
        <div>
          <h4 style="margin:0 0 6px 0; color:#fff;">🏀 NBA Equipment</h4>
          <p style="margin:0; font-size:14px; color:#cbd5e1;">${item.text}</p>
        </div>
        <a href="${item.url || 'https://store.nba.com'}" target="_blank" rel="noopener noreferrer">🛍️ ${item.link || 'Shop Now'}</a>
      </div>`;
    }).join("");
  }

  const contactsUl = document.getElementById("contactsList");
  if (contactsUl) {
    const contactItems = trans.contacts || fallback.contacts;
    contactsUl.innerHTML = contactItems.map(item => `<li>${item}</li>`).join("");
  }

  updateTimeDisplay();
}

/* -----------------------------------------------------
 * 7. TIME ZONE CLOCK
 * ----------------------------------------------------- */
export function updateTimeDisplay() {
  const select = document.getElementById("timeZoneSelect");
  const timeZone = select ? select.value : "America/New_York";
  const now = new Date();

  try {
    const options = {
      timeZone: timeZone,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };
    const formatted = new Intl.DateTimeFormat(currentLocale, options).format(now);
    const clockEl = document.getElementById("currentTime");
    if (clockEl) {
      const cleanTz = timeZone.replace(/_/g, " ");
      clockEl.innerHTML = `🕒 <strong>${formatted}</strong> <span style="color:#94a3b8; font-size:13px;">(${cleanTz})</span>`;
    }
  } catch (err) {
    console.error("Time format error:", err);
  }
}

/* -----------------------------------------------------
 * 8. GLOBAL SEARCH
 * ----------------------------------------------------- */
export function executeSearch() {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");
  if (!searchInput || !resultsContainer) return;

  const query = searchInput.value.toLowerCase().trim();
  resultsContainer.innerHTML = "";

  if (!query) {
    resultsContainer.style.display = "none";
    return;
  }

  const results = [];
  const en = translations.en;

  // Search Teams
  (en.teams || []).forEach(team => {
    if (team.toLowerCase().includes(query)) {
      results.push(`<p><strong>🛡️ Team:</strong> ${team}</p>`);
    }
  });

  // Search Players
  (en.players || []).forEach(player => {
    if (player.toLowerCase().includes(query)) {
      results.push(`<p><strong>⭐ Player:</strong> ${player}</p>`);
    }
  });

  // Search News
  [...(en.todayNews || []), ...(en.news || [])].forEach(news => {
    if (news.toLowerCase().includes(query)) {
      results.push(`<p><strong>📰 News:</strong> ${news}</p>`);
    }
  });

  // Search Arenas
  (en.arenas || []).forEach(arena => {
    const text = typeof arena === "object" ? arena.text : arena;
    if (text.toLowerCase().includes(query)) {
      results.push(`<p><strong>🏟️ Arena:</strong> ${text}</p>`);
    }
  });

  if (results.length > 0) {
    resultsContainer.innerHTML = `<h4 style="margin:0 0 10px 0; color:#00d9ff;">Found ${results.length} result(s) for "${query}":</h4>` + results.join("");
    resultsContainer.style.display = "block";
  } else {
    resultsContainer.innerHTML = `<p style="color:#f87171;">No matching records found for "${query}". Try searching for 'Lakers', 'Curry', or 'Garden'.</p>`;
    resultsContainer.style.display = "block";
  }
}

/* -----------------------------------------------------
 * 9. UNIFIED AUTH HANDLERS (SEAMLESS FOR BOTH ENGINES)
 * ----------------------------------------------------- */
export function setupAuthListeners() {
  const mode = getAuthMode();
  const useLive = mode === "firebase" && liveFirebaseAvailable;

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const profileCard = document.getElementById("profile");

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const regUsernameInput = document.getElementById("regUsername");
  const regEmailInput = document.getElementById("regEmail");
  const regPasswordInput = document.getElementById("regPassword");
  const regConfirmPasswordInput = document.getElementById("regConfirmPassword");

  // Indicator Badge in the header
  const authModeIndicator = document.getElementById("authModeIndicator");
  if (authModeIndicator) {
    if (useLive) {
      authModeIndicator.textContent = "● Live Firebase Cloud";
      authModeIndicator.className = "auth-mode-badge live";
    } else {
      authModeIndicator.textContent = "⚡ Instant Sandbox Mode";
      authModeIndicator.className = "auth-mode-badge demo";
    }
  }

  // Toggle Forms
  document.getElementById("showRegisterBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    clearAuthMessage();
    if (loginForm) loginForm.style.display = "none";
    if (registerForm) registerForm.style.display = "block";
  });

  document.getElementById("cancelRegisterBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    clearAuthMessage();
    if (registerForm) registerForm.style.display = "none";
    if (loginForm) loginForm.style.display = "block";
  });

  // Password visibility toggles
  document.getElementById("showPasswordSignIn")?.addEventListener("change", function () {
    if (passwordInput) passwordInput.type = this.checked ? "text" : "password";
  });
  document.getElementById("showPasswordReg")?.addEventListener("change", function () {
    const t = this.checked ? "text" : "password";
    if (regPasswordInput) regPasswordInput.type = t;
  });
  document.getElementById("showConfirmPasswordReg")?.addEventListener("change", function () {
    const t = this.checked ? "text" : "password";
    if (regConfirmPasswordInput) regConfirmPasswordInput.type = t;
  });

  // 1. SIGN IN ACTION
  document.getElementById("signInBtn")?.addEventListener("click", async (e) => {
    e.preventDefault();
    clearAuthMessage();

    const email = usernameInput?.value.trim();
    const password = passwordInput?.value;

    if (!email || !password) {
      showAuthMessage("Please enter your email and password.");
      return;
    }

    if (isUserBanned(email)) {
      showAuthMessage("🚫 Account Suspended: Your access has been revoked by Developer Administrator (madusha.cmec@gmail.com) for policy violations.", false);
      return;
    }

    try {
      showAuthMessage("Verifying credentials...", true);

      if (useLive && firebaseAuth) {
        const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
        showAuthMessage(`Welcome back, ${cred.user.displayName || cred.user.email}!`, true);
      } else {
        const cred = await SandboxAuth.signIn(email, password);
        showAuthMessage(`Welcome back, ${cred.user.displayName || cred.user.email}! (Demo Mode)`, true);
      }

      if (passwordInput) passwordInput.value = "";
    } catch (error) {
      const isKeyError = (error.message || "").toLowerCase().includes("api-key");
      // Display friendly message on screen without printing expected credential errors to console
      showAuthMessage(getFirebaseErrorMessage(error), false, isKeyError);
    }
  });

  // 2. REGISTER ACTION (WITH AGE, SAFETY & BOT VERIFICATION)
  document.getElementById("registerBtn")?.addEventListener("click", async (e) => {
    e.preventDefault();
    clearAuthMessage();

    const displayName = regUsernameInput?.value.trim();
    const email = regEmailInput?.value.trim();
    const password = regPasswordInput?.value;
    const confirmPassword = regConfirmPasswordInput?.value;

    if (!displayName || !email || !password || !confirmPassword) {
      showAuthMessage("All registration fields are required.");
      return;
    }

    if (isUserBanned(email)) {
      showAuthMessage("🚫 Registration Blocked: This email address is suspended from NBA Hub by Developer Administrator (madusha.cmec@gmail.com).", false);
      return;
    }

    // 1. Age Verification Check
    const ageChecked = document.getElementById("regAgeVerification")?.checked;
    if (!ageChecked) {
      showAuthMessage("Age Verification Required: You must be 13+ years old to join.");
      return;
    }

    // 2. Safety Oath Check
    const safetyChecked = document.getElementById("regSafetyOath")?.checked;
    if (!safetyChecked) {
      showAuthMessage("Safety Verification Required: Please accept the sportsmanship & anti-harassment oath.");
      return;
    }

    // 3. Anti-Bot CAPTCHA Challenge
    const captchaInput = document.getElementById("regCaptchaAnswer");
    const captchaValue = parseInt(captchaInput?.value.trim(), 10);
    if (isNaN(captchaValue) || captchaValue !== regCaptchaSolution) {
      showAuthMessage("Bot Verification Failed: Please solve the security math check correctly.");
      refreshRegCaptcha();
      return;
    }

    if (password.length < 6) {
      showAuthMessage("Password must have at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      showAuthMessage("Passwords do not match.");
      return;
    }

    try {
      showAuthMessage("Creating verified NBA Member profile...", true);

      let createdUser = null;
      if (useLive && firebaseAuth) {
        const userCred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        await updateProfile(userCred.user, { displayName });
        createdUser = userCred.user;
        try {
          await sendEmailVerification(userCred.user);
          showAuthMessage(`Account verified & created! Verification link sent to ${email}.`, true);
        } catch (ve) {
          showAuthMessage(`Account verified & created! Welcome to NBA Hub.`, true);
        }
      } else {
        const cred = await SandboxAuth.register(displayName, email, password);
        createdUser = cred.user;
        showAuthMessage(`Account created & safety verified! Welcome, ${displayName}!`, true);
      }

      if (createdUser) {
        saveUserProfileMeta(createdUser.uid, {
          ageVerified: true,
          safetyVerified: true,
          favoriteTeam: "All-NBA / League Fan"
        });
      }

      if (regPasswordInput) regPasswordInput.value = "";
      if (regConfirmPasswordInput) regConfirmPasswordInput.value = "";
      refreshRegCaptcha();
    } catch (error) {
      const errCode = error?.code || "";
      const errMsg = error?.message || "";
      const isAlreadyInUse = errCode === "auth/email-already-in-use" ||
        errMsg.toLowerCase().includes("already registered") ||
        errMsg.toLowerCase().includes("already-in-use");
      const isKeyError = errMsg.toLowerCase().includes("api-key");

      // DO NOT log "email already registered" to console - upload an on-screen message instead!
      if (isAlreadyInUse) {
        showAuthMessage(
          "⚠️ This email address is already registered to an NBA Hub member account.",
          false,
          false,
          {
            id: "quickSwitchToSignInFromRegBtn",
            label: "🔑 Sign In Instead",
            onClick: () => {
              clearAuthMessage();
              if (registerForm) registerForm.style.display = "none";
              if (loginForm) loginForm.style.display = "block";
              if (usernameInput) {
                usernameInput.value = email;
              }
              if (passwordInput) {
                passwordInput.value = "";
                passwordInput.focus();
              }
              showAuthMessage(`Please enter your password for ${email} to sign in.`, true);
            }
          }
        );
      } else {
        showAuthMessage(getFirebaseErrorMessage(error), false, isKeyError);
      }

      refreshRegCaptcha();
    }
  });

  // 3. FORGOT PASSWORD ACTION
  document.getElementById("forgotPasswordBtn")?.addEventListener("click", async (e) => {
    e.preventDefault();
    clearAuthMessage();

    const email = usernameInput?.value.trim();
    if (!email) {
      showAuthMessage("Please enter your email in the field above to receive a password reset link.");
      return;
    }

    try {
      if (useLive && firebaseAuth) {
        await sendPasswordResetEmail(firebaseAuth, email);
        showAuthMessage(`Password reset link dispatched to ${email}. Check your inbox.`, true);
      } else {
        await SandboxAuth.resetPassword(email);
        showAuthMessage(`Demo password reset sent! (Password unchanged in demo)`, true);
      }
    } catch (error) {
      showAuthMessage(getFirebaseErrorMessage(error), false);
    }
  });

  // 4. SIGN OUT ACTION
  document.getElementById("signOutBtn")?.addEventListener("click", async (e) => {
    e.preventDefault();
    clearAuthMessage();
    try {
      if (useLive && firebaseAuth) {
        await signOut(firebaseAuth);
      } else {
        await SandboxAuth.signOut();
      }
      showAuthMessage("Successfully signed out.", true);
    } catch (error) {
      showAuthMessage(getFirebaseErrorMessage(error), false);
    }
  });

  // 5. RESEND / VERIFY EMAIL ACTION
  document.getElementById("resendVerificationBtn")?.addEventListener("click", async (e) => {
    e.preventDefault();
    clearAuthMessage();

    if (useLive && firebaseAuth) {
      const user = firebaseAuth.currentUser;
      if (!user) return showAuthMessage("Please sign in first.");
      if (user.emailVerified) return showAuthMessage("Email is already verified!", true);

      try {
        await sendEmailVerification(user);
        showAuthMessage(`Verification email sent again to ${user.email}!`, true);
      } catch (err) {
        showAuthMessage(getFirebaseErrorMessage(err), false);
      }
    } else {
      // In Sandbox mode, clicking instantly verifies email for easy testing!
      await SandboxAuth.verifyEmail();
      showAuthMessage("✓ Email status verified in sandbox mode!", true);
    }
  });

  // 6. EDIT PROFILE CONTROLS
  const editProfileBtn = document.getElementById("editProfileBtn");
  const editProfileForm = document.getElementById("editProfileForm");
  const cancelEditProfileBtn = document.getElementById("cancelEditProfileBtn");
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  const editDisplayName = document.getElementById("editDisplayName");
  const editFavTeam = document.getElementById("editFavTeam");
  const editPhotoUrl = document.getElementById("editPhotoUrl");
  const editBio = document.getElementById("editBio");
  const avatarUploadInput = document.getElementById("avatarUploadInput");
  const profileUpdateMsg = document.getElementById("profileUpdateMsg");

  // Toggle Edit Profile form
  editProfileBtn?.addEventListener("click", () => {
    if (!editProfileForm) return;
    const isHidden = editProfileForm.style.display === "none";
    if (isHidden) {
      const currentUser = (useLive && firebaseAuth) ? firebaseAuth.currentUser : SandboxAuth.getCurrentUser();
      if (currentUser) {
        const meta = getUserProfileMeta(currentUser.uid);
        if (editDisplayName) editDisplayName.value = currentUser.displayName || "";
        if (editFavTeam) editFavTeam.value = meta.favoriteTeam || "All-NBA / League Fan";
        if (editPhotoUrl) editPhotoUrl.value = currentUser.photoURL || meta.photoURL || "";
        if (editBio) editBio.value = meta.bio || "";
      }
      if (profileUpdateMsg) profileUpdateMsg.style.display = "none";
      editProfileForm.style.display = "block";
    } else {
      editProfileForm.style.display = "none";
    }
  });

  cancelEditProfileBtn?.addEventListener("click", () => {
    if (editProfileForm) editProfileForm.style.display = "none";
  });

  // Avatar Image Upload (FileReader)
  avatarUploadInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file (PNG, JPG, WebP, GIF).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      if (editPhotoUrl) editPhotoUrl.value = dataUrl;
      const avatarEl = document.getElementById("profileAvatar");
      if (avatarEl) {
        avatarEl.innerHTML = `<img src="${dataUrl}" alt="Preview" />`;
      }
    };
    reader.readAsDataURL(file);
  });

  // Quick Preset Avatar Buttons
  document.querySelectorAll(".preset-avatar-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const avatarVal = btn.getAttribute("data-avatar");
      if (!avatarVal) return;
      if (editPhotoUrl) editPhotoUrl.value = avatarVal;

      document.querySelectorAll(".preset-avatar-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      const avatarEl = document.getElementById("profileAvatar");
      if (avatarEl) {
        avatarEl.textContent = avatarVal;
      }
    });
  });

  // Save Profile Changes
  saveProfileBtn?.addEventListener("click", async () => {
    const currentUser = (useLive && firebaseAuth) ? firebaseAuth.currentUser : SandboxAuth.getCurrentUser();
    if (!currentUser) return;

    const newName = editDisplayName?.value.trim() || "";
    if (!newName) {
      if (profileUpdateMsg) {
        profileUpdateMsg.style.display = "block";
        profileUpdateMsg.className = "auth-feedback error";
        profileUpdateMsg.textContent = "Display name cannot be empty.";
      }
      return;
    }

    const favTeam = editFavTeam?.value || "All-NBA / League Fan";
    const photoURL = editPhotoUrl?.value.trim() || "";
    const bio = editBio?.value.trim() || "";

    try {
      if (profileUpdateMsg) {
        profileUpdateMsg.style.display = "block";
        profileUpdateMsg.className = "auth-feedback";
        profileUpdateMsg.style.color = "#00d9ff";
        profileUpdateMsg.textContent = "Saving profile changes...";
      }

      // 1. Save metadata (Team, Bio, PhotoURL)
      saveUserProfileMeta(currentUser.uid, {
        favoriteTeam: favTeam,
        bio: bio,
        photoURL: photoURL
      });

      // 2. Update Auth Provider (Firebase Auth or Sandbox)
      if (useLive && firebaseAuth?.currentUser) {
        await updateProfile(firebaseAuth.currentUser, {
          displayName: newName,
          photoURL: photoURL || null
        });
        handleAuthChange(firebaseAuth.currentUser);
      } else {
        await SandboxAuth.updateProfile({
          displayName: newName,
          photoURL: photoURL || null
        });
        handleAuthChange(SandboxAuth.getCurrentUser());
      }

      if (profileUpdateMsg) {
        profileUpdateMsg.className = "auth-feedback success";
        profileUpdateMsg.textContent = "✓ Profile updated successfully! Changes saved.";
      }

      setTimeout(() => {
        if (editProfileForm) editProfileForm.style.display = "none";
      }, 1400);
    } catch (err) {
      console.error("Save profile error:", err);
      if (profileUpdateMsg) {
        profileUpdateMsg.className = "auth-feedback error";
        profileUpdateMsg.textContent = "Failed to update profile: " + (err.message || err);
      }
    }
  });

  // 7. OBSERVE AUTH STATE (UNIFIED)
  const handleAuthChange = async (user) => {
    const authStatusBadge = document.getElementById("authStatusBadge");

    const adminSection = document.getElementById("adminPanelSection");
    const jsonSection = document.getElementById("jsonManagerSection");
    const sidebarAdmin = document.getElementById("sidebarAdminLink");
    const sidebarJson = document.getElementById("sidebarJsonManagerLink");
    const navAdmin = document.getElementById("navAdminLink");
    const navJson = document.getElementById("navJsonLink");
    const openConfig = document.getElementById("openConfigBtn");
    const adminSessionBadge = document.getElementById("adminSessionBadge");
    const devProfileBadge = document.getElementById("devAdminProfileBadge");
    const clearChatBtn = document.getElementById("clearChatAdminBtn");
    const chatAuthPrompt = document.getElementById("chatAuthPrompt");
    const chatInput = document.getElementById("chatMessageInput");
    const sendChatBtn = document.getElementById("sendChatBtn");

    if (user) {
      if (loginForm) loginForm.style.display = "none";
      if (registerForm) registerForm.style.display = "none";
      if (profileCard) profileCard.style.display = "block";

      const userNameEl = document.getElementById("userName");
      const userEmailEl = document.getElementById("userEmail");
      const profileAvatar = document.getElementById("profileAvatar");
      const userFavTeamBadge = document.getElementById("userFavTeamBadge");
      const userBioText = document.getElementById("userBioText");
      const emailVerificationStatus = document.getElementById("emailVerificationStatus");
      const resendBtn = document.getElementById("resendVerificationBtn");

      const meta = getUserProfileMeta(user.uid);
      const nameToDisplay = user.displayName || user.email?.split("@")[0] || "NBA Member";
      const favTeam = meta.favoriteTeam || "All-NBA / League Fan";
      const bio = meta.bio || "Official NBA Fan & League Member";
      const photo = user.photoURL || meta.photoURL;

      if (userNameEl) userNameEl.textContent = nameToDisplay;
      if (userEmailEl) userEmailEl.textContent = user.email || "";
      if (userFavTeamBadge) userFavTeamBadge.textContent = "🛡️ Team: " + favTeam;
      if (userBioText) userBioText.textContent = `"${bio}"`;

      if (profileAvatar) {
        if (photo && (photo.startsWith("data:image") || photo.startsWith("http"))) {
          profileAvatar.innerHTML = `<img src="${photo}" alt="${nameToDisplay}" />`;
        } else if (photo && photo.length <= 4) {
          profileAvatar.textContent = photo;
        } else {
          profileAvatar.textContent = nameToDisplay.charAt(0).toUpperCase();
        }
      }

      if (emailVerificationStatus) {
        if (user.emailVerified) {
          emailVerificationStatus.className = "verification-tag verified";
          emailVerificationStatus.innerHTML = "✓ Email Officially Verified";
        } else {
          emailVerificationStatus.className = "verification-tag unverified";
          emailVerificationStatus.innerHTML = "⚠ Email Pending Verification";
        }
      }

      if (resendBtn) {
        resendBtn.style.display = user.emailVerified ? "none" : "inline-flex";
        resendBtn.textContent = useLive ? "✉️ Resend Verification Email" : "✓ Mark Verified (Demo)";
      }

      // DEVELOPER & ADMIN ROLE PERMISSIONS CHECK (madusha.cmec@gmail.com)
      const isDev = await isDevWithQuestions(user);
      if (isDev) {
        if (adminSection) adminSection.style.display = "block";
        if (jsonSection) jsonSection.style.display = "block";
        if (sidebarAdmin) sidebarAdmin.style.display = "list-item";
        if (sidebarJson) sidebarJson.style.display = "list-item";
        if (navAdmin) navAdmin.style.display = "list-item";
        if (navJson) navJson.style.display = "list-item";
        if (openConfig) openConfig.style.display = "inline-flex";
        if (adminSessionBadge) adminSessionBadge.style.display = "inline-flex";
        if (devProfileBadge) devProfileBadge.style.display = "inline-flex";
        if (clearChatBtn) clearChatBtn.style.display = "inline-block";
        updateAdminStats();
      } else {
        if (adminSection) adminSection.style.display = "none";
        if (jsonSection) jsonSection.style.display = "none";
        if (sidebarAdmin) sidebarAdmin.style.display = "none";
        if (sidebarJson) sidebarJson.style.display = "none";
        if (navAdmin) navAdmin.style.display = "none";
        if (navJson) navJson.style.display = "none";
        if (openConfig) openConfig.style.display = "none";
        if (adminSessionBadge) adminSessionBadge.style.display = "none";
        if (devProfileBadge) devProfileBadge.style.display = "none";
        if (clearChatBtn) clearChatBtn.style.display = "none";
      }

      if (chatAuthPrompt) chatAuthPrompt.style.display = "none";
      if (chatInput) {
        chatInput.disabled = false;
        chatInput.placeholder = "Type a live chat message (e.g. 'Curry from half-court!')...";
      }
      if (sendChatBtn) sendChatBtn.disabled = false;

      if (authStatusBadge) {
        authStatusBadge.textContent = isDev ? "👑 Dev Admin" : "● Authenticated";
        authStatusBadge.style.color = isDev ? "#ffd700" : "#4ade80";
        authStatusBadge.style.borderColor = isDev ? "#ffd700" : "#4ade80";
      }
    } else {
      if (profileCard) profileCard.style.display = "none";
      if (registerForm) registerForm.style.display = "none";
      if (loginForm) loginForm.style.display = "block";
      if (editProfileForm) editProfileForm.style.display = "none";

      if (adminSection) adminSection.style.display = "none";
      if (jsonSection) jsonSection.style.display = "none";
      if (sidebarAdmin) sidebarAdmin.style.display = "none";
      if (sidebarJson) sidebarJson.style.display = "none";
      if (navAdmin) navAdmin.style.display = "none";
      if (navJson) navJson.style.display = "none";
      if (openConfig) openConfig.style.display = "none";
      if (adminSessionBadge) adminSessionBadge.style.display = "none";
      if (devProfileBadge) devProfileBadge.style.display = "none";
      if (clearChatBtn) clearChatBtn.style.display = "none";

      if (chatAuthPrompt) chatAuthPrompt.style.display = "block";
      if (chatInput) {
        chatInput.disabled = true;
        chatInput.placeholder = "Please sign in above to join and send messages...";
      }
      if (sendChatBtn) sendChatBtn.disabled = true;

      if (authStatusBadge) {
        authStatusBadge.textContent = "○ Guest Mode";
        authStatusBadge.style.color = "#9aa3be";
        authStatusBadge.style.borderColor = "#2b2f5c";
      }
    }

    renderCommunityPosts();
    renderChatMessages();
  };

  if (useLive && firebaseAuth) {
    onAuthStateChanged(firebaseAuth, handleAuthChange);
  } else {
    SandboxAuth.onAuthStateChanged(handleAuthChange);
  }

  // Refresh user verification if user returns to window tab
  document.addEventListener("visibilitychange", async () => {
    if (!document.hidden && useLive && firebaseAuth?.currentUser) {
      try {
        await firebaseAuth.currentUser.reload();
        handleAuthChange(firebaseAuth.currentUser);
      } catch (e) {
        console.warn("Could not reload Firebase user:", e);
      }
    }
  });
}

/* -----------------------------------------------------
 * 10. FIREBASE CONFIG MODAL & ENGINE SWITCHER
 * ----------------------------------------------------- */
export function setupConfigModal() {
  const modal = document.getElementById("firebaseConfigModal");
  const openBtn = document.getElementById("openConfigBtn");
  const closeBtn = document.getElementById("closeConfigBtn");
  const saveBtn = document.getElementById("saveConfigBtn");
  const switchToDemoBtn = document.getElementById("switchToDemoBtn");
  const configTextarea = document.getElementById("configJsonInput");

  if (!modal || !openBtn) return;

  openBtn.addEventListener("click", () => {
    const current = getStoredFirebaseConfig();
    if (configTextarea) {
      configTextarea.value = current ? JSON.stringify(current, null, 2) : "";
    }
    modal.style.display = "flex";
  });

  closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  switchToDemoBtn?.addEventListener("click", () => {
    setAuthMode("demo");
    alert("Switched to Instant Sandbox Mode! Sign-in, registration, and profile sync will now work without any API keys.");
    window.location.reload();
  });

  saveBtn?.addEventListener("click", () => {
    const val = configTextarea?.value.trim() || "";
    if (!val) {
      alert("Please paste your Firebase configuration JSON.");
      return;
    }
    try {
      const parsed = JSON.parse(val);
      if (!parsed.apiKey || parsed.apiKey.includes("Dummy") || parsed.apiKey.includes("YOUR_")) {
        alert("Please provide a real Firebase API key (starts with 'AIzaSy...').");
        return;
      }
      saveFirebaseConfig(parsed);
      alert("Firebase credentials saved successfully! The app will now connect to your live Firebase Cloud Authentication.");
      window.location.reload();
    } catch (err) {
      alert("Invalid JSON format: " + err.message);
    }
  });
}

/* -----------------------------------------------------
 * 11. JSON DATA & CONFIGURATION MANAGER
 * ----------------------------------------------------- */
export function setupJsonManager() {
  const fileInput = document.getElementById("jsonFileInput");
  const textInput = document.getElementById("jsonTextInput");
  const loadBtn = document.getElementById("loadJsonBtn");
  const sampleFirebaseBtn = document.getElementById("loadSampleFirebaseBtn");
  const sampleNbaBtn = document.getElementById("loadSampleNbaBtn");
  const resultDiv = document.getElementById("result");
  const previewPre = document.getElementById("jsonPreview");

  if (!resultDiv) return;

  function showJsonStatus(message, isSuccess = true) {
    if (!resultDiv) return;
    resultDiv.style.color = isSuccess ? "#22c55e" : "#ef4444";
    resultDiv.style.padding = "10px 14px";
    resultDiv.style.borderRadius = "8px";
    resultDiv.style.backgroundColor = isSuccess ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)";
    resultDiv.style.border = `1px solid ${isSuccess ? "#22c55e" : "#ef4444"}`;
    resultDiv.innerHTML = (isSuccess ? "✓ " : "⚠ ") + message;
  }

  function setPreview(data) {
    if (!previewPre) return;
    try {
      previewPre.textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
    } catch {
      previewPre.textContent = String(data);
    }
  }

  function applyParsedJson(data) {
    setPreview(data);

    // Case 1: Firebase Configuration object
    if (data.apiKey || data.projectId) {
      if (!data.apiKey || data.apiKey.includes("YOUR_") || data.apiKey.includes("Dummy")) {
        showJsonStatus("Detected Firebase Config with placeholder apiKey. You can use this in Demo Mode, or paste your real Firebase API key (AIzaSy...) from Firebase Console.", false);
      } else {
        saveFirebaseConfig(data);
        showJsonStatus("Firebase Configuration successfully detected and saved! Refreshing to activate Live Firebase...", true);
        setTimeout(() => window.location.reload(), 1200);
        return;
      }
    }

    // Case 2: NBA Custom Dataset
    if (data.teams || data.players || data.todayNews || data.translations) {
      const customData = data.translations?.en || data;
      if (customData.teams) translations.en.teams = customData.teams;
      if (customData.players) translations.en.players = customData.players;
      if (customData.todayNews) translations.en.todayNews = customData.todayNews;
      if (customData.news) translations.en.news = customData.news;
      if (customData.arenas) translations.en.arenas = customData.arenas;
      if (customData.store) translations.en.store = customData.store;
      if (customData.contacts) translations.en.contacts = customData.contacts;

      // Re-render current language
      setLanguage(currentLocale || "en");
      showJsonStatus(`NBA Dataset loaded successfully! Updated teams (${customData.teams?.length || 0}), players (${customData.players?.length || 0}), and news headlines.`, true);
      return;
    }

    showJsonStatus("Valid JSON parsed, but could not identify known schema (Firebase Config or NBA Dataset). See preview below.", true);
  }

  // 1. File Input handler (FileReader)
  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".json")) {
      showJsonStatus("Please select a valid .json file.", false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (textInput) textInput.value = JSON.stringify(parsed, null, 2);
        applyParsedJson(parsed);
      } catch (err) {
        showJsonStatus("Failed to parse JSON file: " + err.message, false);
      }
    };
    reader.onerror = () => {
      showJsonStatus("Error reading the selected file.", false);
    };
    reader.readAsText(file);
  });

  // 2. Apply Text Input JSON
  loadBtn?.addEventListener("click", () => {
    const raw = textInput?.value.trim();
    if (!raw) {
      showJsonStatus("Please paste JSON text or select a .json file first.", false);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      applyParsedJson(parsed);
    } catch (err) {
      showJsonStatus("Invalid JSON syntax: " + err.message, false);
    }
  });

  // 3. Load Sample Firebase Config Button
  sampleFirebaseBtn?.addEventListener("click", async () => {
    try {
      const res = await fetch("/firebase-config.json");
      if (res.ok) {
        const config = await res.json();
        if (textInput) textInput.value = JSON.stringify(config, null, 2);
        setPreview(config);
        showJsonStatus("Loaded sample firebase-config.json. Replace with your actual Firebase API key to connect live.", true);
      } else {
        throw new Error("Local config not reachable");
      }
    } catch {
      const fallbackConfig = {
        apiKey: "AIzaSyYOUR_REAL_API_KEY_HERE",
        authDomain: "nba-hub-2026.firebaseapp.com",
        projectId: "nba-hub-2026",
        storageBucket: "nba-hub-2026.appspot.com",
        messagingSenderId: "123456789012",
        appId: "1:123456789012:web:abcdef123456789"
      };
      if (textInput) textInput.value = JSON.stringify(fallbackConfig, null, 2);
      setPreview(fallbackConfig);
      showJsonStatus("Loaded sample Firebase Config schema into editor.", true);
    }
  });

  // 4. Load Sample NBA Data Button
  sampleNbaBtn?.addEventListener("click", async () => {
    try {
      const res = await fetch("/nba-data.json");
      if (res.ok) {
        const nbaData = await res.json();
        if (textInput) textInput.value = JSON.stringify(nbaData, null, 2);
        applyParsedJson(nbaData);
      } else {
        throw new Error("Local NBA data not reachable");
      }
    } catch {
      showJsonStatus("Could not fetch /nba-data.json, applying default roster.", false);
    }
  });
}

/* -----------------------------------------------------
 * 11.5. DEVELOPER NICKNAMES, HONORARY TITLES & BANS STORE
 * ----------------------------------------------------- */
var NICKNAMES_STORAGE_KEY = "nba_assigned_nicknames_v2";
var BANNED_USERS_STORAGE_KEY = "nba_banned_users_v2";

var DEFAULT_NICKNAMES = {
  "curryfan@dubnation.com": {
    nickname: "The Chef",
    badge: "🎯 Splash King",
    assignedBy: DEV_ADMIN_EMAIL,
    date: "Nov 6, 2026"
  },
  "marcus@bostonfan.com": {
    nickname: "Shamrock Defender",
    badge: "☘️ Banner 18",
    assignedBy: DEV_ADMIN_EMAIL,
    date: "Nov 6, 2026"
  },
  "jordan@nbafan.com": {
    nickname: "Air Heir",
    badge: "🏆 Hall of Fame",
    assignedBy: DEV_ADMIN_EMAIL,
    date: "Nov 6, 2026"
  }
};

var DEFAULT_BANNED_USERS = {
  "troll@spambot.net": {
    email: "troll@spambot.net",
    reason: "Automated Bot / Spam Messages",
    bannedAt: "Nov 6, 2026",
    bannedBy: DEV_ADMIN_EMAIL
  }
};

export function getAssignedNicknames() {
  try {
    const raw = localStorage.getItem(NICKNAMES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NICKNAMES_STORAGE_KEY, JSON.stringify(DEFAULT_NICKNAMES));
      return { ...DEFAULT_NICKNAMES };
    }
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULT_NICKNAMES };
  }
}

export function saveAssignedNicknames(nicknames) {
  localStorage.setItem(NICKNAMES_STORAGE_KEY, JSON.stringify(nicknames));
}

export function getUserNicknameData(emailOrName) {
  if (!emailOrName) return null;
  const list = getAssignedNicknames();
  const key = String(emailOrName).toLowerCase().trim();
  return list[key] || null;
}

export function getBannedUsers() {
  try {
    const raw = localStorage.getItem(BANNED_USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BANNED_USERS_STORAGE_KEY, JSON.stringify(DEFAULT_BANNED_USERS));
      return { ...DEFAULT_BANNED_USERS };
    }
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULT_BANNED_USERS };
  }
}

export function saveBannedUsers(bannedMap) {
  localStorage.setItem(BANNED_USERS_STORAGE_KEY, JSON.stringify(bannedMap));
}

export function isUserBanned(emailOrUid) {
  if (!emailOrUid) return false;
  const clean = String(emailOrUid).toLowerCase().trim();
  if (clean === DEV_ADMIN_EMAIL.toLowerCase()) return false; // Developer cannot be banned
  const banned = getBannedUsers();
  return !!banned[clean];
}

export function banUser(targetEmail, reason = "Community guidelines violation") {
  const currentUser = (getAuthMode() === "firebase" && liveFirebaseAvailable && firebaseAuth)
    ? firebaseAuth.currentUser
    : SandboxAuth.getCurrentUser();

  if (!isDevAdmin(currentUser)) {
    alert("Permission Denied: Only the Developer Admin (madusha.cmec@gmail.com) can ban members.");
    return false;
  }

  const clean = String(targetEmail).toLowerCase().trim();
  if (!clean) {
    alert("Please specify a valid member email or user ID to ban.");
    return false;
  }

  if (clean === DEV_ADMIN_EMAIL.toLowerCase()) {
    alert("Action Prohibited: The Lead Developer Admin cannot be banned!");
    return false;
  }

  const banned = getBannedUsers();
  const now = new Date();
  banned[clean] = {
    email: clean,
    reason: reason,
    bannedAt: now.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
    bannedBy: DEV_ADMIN_EMAIL
  };
  saveBannedUsers(banned);

  renderBannedUsersList();
  renderCommunityPosts();
  renderChatMessages();

  // If the banned user is currently logged in on this browser, immediately log them out
  if (currentUser && (currentUser.email?.toLowerCase() === clean || currentUser.uid === clean)) {
    if (getAuthMode() === "firebase" && liveFirebaseAvailable && firebaseAuth) {
      signOut(firebaseAuth);
    } else {
      SandboxAuth.signOut();
    }
    alert("Your account has been suspended by the Developer Administrator for: " + reason);
  }

  return true;
}

export function unbanUser(targetEmail) {
  const currentUser = (getAuthMode() === "firebase" && liveFirebaseAvailable && firebaseAuth)
    ? firebaseAuth.currentUser
    : SandboxAuth.getCurrentUser();

  if (!isDevAdmin(currentUser)) {
    alert("Permission Denied: Only Developer Admin can unban members.");
    return false;
  }

  const clean = String(targetEmail).toLowerCase().trim();
  const banned = getBannedUsers();
  delete banned[clean];
  saveBannedUsers(banned);

  renderBannedUsersList();
  renderCommunityPosts();
  renderChatMessages();
  return true;
}

export function renderUserBadgeAndNickname(email, rawName) {
  const safeName = escapeHtml(rawName || "NBA Fan");
  const nickData = getUserNicknameData(email) || getUserNicknameData(rawName);
  const banned = isUserBanned(email) || isUserBanned(rawName);
  let html = `<strong>${safeName}</strong>`;
  if (banned) {
    html += ` <span class="banned-badge" title="Account Suspended by Developer Admin">🚫 SUSPENDED</span>`;
  }
  if (nickData) {
    if (nickData.nickname) {
      html += ` <span class="user-nickname-text" title="Honorary Nickname bestowed by Dev">"${escapeHtml(nickData.nickname)}"</span>`;
    }
    if (nickData.badge) {
      html += ` <span class="user-honorary-badge" title="Honorary Badge bestowed by Dev">${escapeHtml(nickData.badge)}</span>`;
    }
  }
  return html;
}

/* -----------------------------------------------------
 * 12. LIVE FAN ARENA CHAT SYSTEM (WITH GIFS & IMAGES)
 * ----------------------------------------------------- */
var CHAT_STORAGE_KEY = "nba_hub_live_chat_v3";

var DEFAULT_CHAT_MESSAGES = [
  {
    id: "msg_1",
    authorName: "Marcus (Celtics Fan)",
    email: "marcus@bostonfan.com",
    avatar: "☘️",
    favTeam: "Boston Celtics",
    text: "Welcome to NBA Hub 2026 Live Chat! Who has the best perimeter defense this season?",
    image: "https://media.giphy.com/media/l0HlHJGHe3yAMhdQY/giphy.gif",
    timestamp: "10:14 AM",
    isDev: false
  },
  {
    id: "msg_2",
    authorName: "Lead Developer (Madusha)",
    email: DEV_ADMIN_EMAIL,
    avatar: "👑",
    favTeam: "All-NBA / League Fan",
    text: "Official NBA Hub 2026 Courtside Chat is live! You can now send GIFs and images right into the chat. Keep discussions friendly! 🏀🔥",
    image: null,
    timestamp: "10:15 AM",
    isDev: true
  },
  {
    id: "msg_3",
    authorName: "StephCurry30",
    email: "curryfan@dubnation.com",
    avatar: "⚡",
    favTeam: "Golden State Warriors",
    text: "Chase Center is electric tonight! Check out this arena atmosphere! 🏀",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
    timestamp: "10:18 AM",
    isDev: false
  }
];

export function getChatMessages() {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(DEFAULT_CHAT_MESSAGES));
      return DEFAULT_CHAT_MESSAGES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CHAT_MESSAGES;
  }
}

export function saveChatMessages(messages) {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
}

let activeChatAttachedImage = null;

export function renderChatMessages() {
  const container = document.getElementById("liveChatMessages");
  if (!container) return;

  const messages = getChatMessages();
  const currentUser = (getAuthMode() === "firebase" && liveFirebaseAvailable && firebaseAuth)
    ? firebaseAuth.currentUser
    : SandboxAuth.getCurrentUser();
  const isDev = isDevAdmin(currentUser);

  if (messages.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: #9aa3be; font-size: 13px; margin: auto;">No messages in chat yet. Be the first to say hello! 🏀</div>`;
    return;
  }

  container.innerHTML = messages.map(msg => {
    const isOwner = currentUser && (currentUser.email === msg.email || currentUser.uid === msg.userId);
    const canDelete = isOwner || isDev;
    const devTag = msg.isDev ? `<span style="background:#ffd700; color:#040814; font-weight:800; font-size:10px; padding:1px 5px; border-radius:4px;">👑 DEV ADMIN</span>` : "";

    const authorHtml = renderUserBadgeAndNickname(msg.email, msg.authorName);
    const imageHtml = msg.image ? `<img src="${escapeHtml(msg.image)}" class="chat-msg-img" alt="Chat attachment" onerror="this.style.display='none'" />` : "";
    
    const quickNickBtn = (isDev && msg.email && msg.email.toLowerCase() !== DEV_ADMIN_EMAIL.toLowerCase())
      ? `<button class="dev-quick-chat-nick-btn" data-email="${escapeHtml(msg.email)}" data-name="${escapeHtml(msg.authorName)}" style="background:rgba(255,215,0,0.15); border:1px solid rgba(255,215,0,0.4); color:#ffd700; font-size:10px; padding:1px 5px; border-radius:4px; cursor:pointer;" title="Bestow honorary nickname to this user">🏷️</button>`
      : "";

    const quickBanBtn = (isDev && msg.email && msg.email.toLowerCase() !== DEV_ADMIN_EMAIL.toLowerCase())
      ? `<button class="dev-quick-chat-ban-btn" data-email="${escapeHtml(msg.email)}" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.4); color:#f87171; font-size:10px; padding:1px 5px; border-radius:4px; cursor:pointer;" title="Ban this member (Dev Only)">🚫</button>`
      : "";

    return `
      <div class="chat-msg-row" data-id="${msg.id}">
        <div class="chat-msg-avatar">${msg.avatar || "🏀"}</div>
        <div class="chat-msg-bubble">
          <div class="chat-msg-meta">
            ${authorHtml}
            ${devTag}
            <span style="font-size:10px; background:rgba(0,217,255,0.1); color:#00d9ff; padding:1px 5px; border-radius:3px;">${escapeHtml(msg.favTeam || "NBA Fan")}</span>
            <span style="color:#64748b; font-size:10px;">${msg.timestamp}</span>
            ${quickNickBtn}
            ${quickBanBtn}
            ${canDelete ? `<button class="delete-chat-btn" data-id="${msg.id}" style="background:none; border:none; color:#f87171; cursor:pointer; font-size:11px; padding:0 4px;" title="Delete message">✕</button>` : ""}
          </div>
          <div class="chat-msg-text">${escapeHtml(msg.text)}</div>
          ${imageHtml}
        </div>
      </div>
    `;
  }).join("");

  // Delete message handlers
  container.querySelectorAll(".delete-chat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      deleteChatMessage(id);
    });
  });

  // Quick Nickname handler from chat for Dev
  container.querySelectorAll(".dev-quick-chat-nick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetEmail = btn.getAttribute("data-email");
      const targetName = btn.getAttribute("data-name");
      openQuickNicknamePrompt(targetEmail, targetName);
    });
  });

  // Quick Ban handler from chat for Dev
  container.querySelectorAll(".dev-quick-chat-ban-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetEmail = btn.getAttribute("data-email");
      if (!targetEmail) return;
      const reason = prompt(`Developer Admin: Impose ban on "${targetEmail}"? Enter reason:`, "Zero Harassment Policy Violation");
      if (reason) {
        banUser(targetEmail, reason);
        alert(`Banned ${targetEmail}. User has been suspended from NBA Hub.`);
      }
    });
  });

  container.scrollTop = container.scrollHeight;
}

export function sendChatMessage(text, imageUrl = null) {
  const currentUser = (getAuthMode() === "firebase" && liveFirebaseAvailable && firebaseAuth)
    ? firebaseAuth.currentUser
    : SandboxAuth.getCurrentUser();

  if (!currentUser) {
    alert("Please sign in above to send a chat message!");
    return;
  }

  if (isUserBanned(currentUser.email) || isUserBanned(currentUser.uid)) {
    alert("🚫 Access Suspended: Your account is restricted from sending live chat messages by Developer Administrator (madusha.cmec@gmail.com).");
    return;
  }

  const clean = text.trim();
  if (!clean && !imageUrl) return;

  const meta = getUserProfileMeta(currentUser.uid);
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newMsg = {
    id: "msg_" + Date.now(),
    userId: currentUser.uid,
    authorName: currentUser.displayName || currentUser.email.split("@")[0],
    email: currentUser.email,
    avatar: meta.photoURL && meta.photoURL.length <= 4 ? meta.photoURL : (currentUser.displayName?.charAt(0) || "🏀"),
    favTeam: meta.favoriteTeam || "All-NBA / League Fan",
    text: clean || (imageUrl ? "Shared an image 🏀" : ""),
    image: imageUrl || null,
    timestamp: timeStr,
    isDev: isDevAdmin(currentUser)
  };

  const messages = getChatMessages();
  messages.push(newMsg);
  if (messages.length > 150) messages.shift();
  saveChatMessages(messages);
  renderChatMessages();
  updateAdminStats();
}

export function deleteChatMessage(msgId) {
  let messages = getChatMessages();
  messages = messages.filter(m => m.id !== msgId);
  saveChatMessages(messages);
  renderChatMessages();
  updateAdminStats();
}

export function setupLiveChat() {
  const sendBtn = document.getElementById("sendChatBtn");
  const input = document.getElementById("chatMessageInput");
  const clearBtn = document.getElementById("clearChatAdminBtn");

  // GIF and Image Attachment Controls
  const toggleGifBtn = document.getElementById("toggleGifPickerBtn");
  const gifDrawer = document.getElementById("chatGifDrawer");
  const closeGifDrawerBtn = document.getElementById("closeGifDrawerBtn");
  const triggerImageBtn = document.getElementById("triggerChatImageBtn");
  const imageUploadInput = document.getElementById("chatImageUpload");
  const previewBox = document.getElementById("chatSelectedImagePreviewBox");
  const previewImg = document.getElementById("chatSelectedImagePreview");
  const previewLabel = document.getElementById("chatSelectedImageLabel");
  const removePreviewBtn = document.getElementById("removeChatSelectedImageBtn");

  function setChatAttachedImage(url, label = "Image attached") {
    activeChatAttachedImage = url;
    if (previewBox && previewImg) {
      if (url) {
        previewImg.src = url;
        if (previewLabel) previewLabel.textContent = label;
        previewBox.style.display = "flex";
      } else {
        previewBox.style.display = "none";
        previewImg.src = "";
        if (imageUploadInput) imageUploadInput.value = "";
      }
    }
  }

  // Toggle GIF drawer
  toggleGifBtn?.addEventListener("click", () => {
    if (!gifDrawer) return;
    gifDrawer.style.display = gifDrawer.style.display === "none" ? "block" : "none";
  });

  closeGifDrawerBtn?.addEventListener("click", () => {
    if (gifDrawer) gifDrawer.style.display = "none";
  });

  // Pick GIF from drawer
  document.querySelectorAll("#chatGifDrawer .gif-item").forEach(item => {
    item.addEventListener("click", () => {
      const gifUrl = item.getAttribute("data-gif");
      const title = item.getAttribute("data-title") || "Basketball Reaction GIF";
      if (gifUrl) {
        setChatAttachedImage(gifUrl, `🎞️ ${title}`);
        if (gifDrawer) gifDrawer.style.display = "none";
        input?.focus();
      }
    });
  });

  // Upload custom image/GIF
  triggerImageBtn?.addEventListener("click", () => {
    imageUploadInput?.click();
  });

  imageUploadInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("Image is too large. Please select an image under 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result;
      if (dataUrl) {
        setChatAttachedImage(dataUrl, `📷 Uploaded: ${file.name}`);
        input?.focus();
      }
    };
    reader.readAsDataURL(file);
  });

  removePreviewBtn?.addEventListener("click", () => {
    setChatAttachedImage(null);
  });

  function handleSend() {
    if (input) {
      sendChatMessage(input.value, activeChatAttachedImage);
      input.value = "";
      setChatAttachedImage(null);
    }
  }

  sendBtn?.addEventListener("click", handleSend);

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });

  document.querySelectorAll(".chat-quick-emoji").forEach(btn => {
    // Only standard emoji buttons, not the toggleGif / triggerImage buttons
    if (btn.id === "toggleGifPickerBtn" || btn.id === "triggerChatImageBtn") return;
    btn.addEventListener("click", () => {
      const emoji = btn.getAttribute("data-emoji");
      if (input && emoji) {
        input.value = (input.value ? input.value + " " : "") + emoji;
        input.focus();
      }
    });
  });

  clearBtn?.addEventListener("click", () => {
    if (confirm("Developer Admin: Clear all chat messages for all users?")) {
      saveChatMessages([]);
      renderChatMessages();
      updateAdminStats();
    }
  });

  // Cross-tab broadcast sync
  window.addEventListener("storage", (e) => {
    if (e.key === CHAT_STORAGE_KEY) {
      renderChatMessages();
    }
    if (e.key === POSTS_STORAGE_KEY) {
      renderCommunityPosts();
    }
    if (e.key === NICKNAMES_STORAGE_KEY) {
      renderCommunityPosts();
      renderChatMessages();
      renderAssignedNicknamesList();
    }
    if (e.key === BANNED_USERS_STORAGE_KEY) {
      renderBannedUsersList();
      renderCommunityPosts();
      renderChatMessages();
    }
  });

  renderChatMessages();
}

/* -----------------------------------------------------
 * 13. FAN COMMUNITY: POSTS, QUESTIONS, LIKES & DISLIKES
 * ----------------------------------------------------- */
var POSTS_STORAGE_KEY = "nba_hub_community_posts_v3";

var DEFAULT_POSTS = [
  {
    id: "post_1",
    type: "question",
    title: "Who is your mid-season 2026 NBA MVP favorite?",
    content: "With Nikola Jokić averaging nearly a triple-double, Luka Dončić leading the league in clutch scoring, and Shai Gilgeous-Alexander dominating two-way play in OKC, who has the strongest case for 2026 Kia NBA MVP?",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    authorName: "Jordan Fan",
    authorEmail: "jordan@nbafan.com",
    authorTeam: "Chicago Bulls",
    authorAvatar: "🏆",
    timestamp: "Nov 6, 2026",
    likes: 34,
    dislikes: 2,
    userVotes: {
      "curryfan@dubnation.com": "like",
      "marcus@bostonfan.com": "like"
    },
    comments: [
      {
        id: "c_1",
        authorName: "DenverHoops",
        authorEmail: "denver@hoops.com",
        authorTeam: "Denver Nuggets",
        authorAvatar: "⭐",
        text: "Jokic's offensive efficiency and team net rating are historically untouchable right now.",
        timestamp: "Nov 6, 2026"
      },
      {
        id: "c_2",
        authorName: "DallasMagic",
        authorEmail: "dallas@fan.com",
        authorTeam: "Dallas Mavericks",
        authorAvatar: "🔥",
        text: "Luka's 40-point streak this month has to count for something big in the race!",
        timestamp: "Nov 6, 2026"
      }
    ]
  },
  {
    id: "post_2",
    type: "debate",
    title: "Can the Boston Celtics repeat as NBA Champions in 2026?",
    content: "Boston has retained their historic core with Jayson Tatum and Jaylen Brown, but the Western Conference is more competitive than ever. Will health or perimeter defense determine the 2026 Larry O'Brien Trophy?",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80",
    authorName: "CelticsPride",
    authorEmail: "marcus@bostonfan.com",
    authorTeam: "Boston Celtics",
    authorAvatar: "☘️",
    timestamp: "Nov 6, 2026",
    likes: 26,
    dislikes: 5,
    userVotes: {
      "marcus@bostonfan.com": "like"
    },
    comments: [
      {
        id: "c_3",
        authorName: "StephDub",
        authorEmail: "curryfan@dubnation.com",
        authorTeam: "Golden State Warriors",
        authorAvatar: "⚡",
        text: "Don't count out Golden State or Denver if they stay fully healthy in the playoffs.",
        timestamp: "Nov 6, 2026"
      }
    ]
  },
  {
    id: "post_3",
    type: "trade",
    title: "Trade Rumors: Contenders seeking elite rim protection before deadline",
    content: "Multiple playoff teams are actively inquiring for shot-blocking centers to counter dominant big men. Which contenders have the draft capital and contracts to pull off a blockbuster deal before February?",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    authorName: "Lead Developer (Madusha)",
    authorEmail: DEV_ADMIN_EMAIL,
    authorTeam: "All-NBA / League Fan",
    authorAvatar: "👑",
    timestamp: "Nov 6, 2026",
    likes: 41,
    dislikes: 1,
    userVotes: {
      [DEV_ADMIN_EMAIL]: "like"
    },
    comments: []
  }
];

export function getCommunityPosts() {
  try {
    const raw = localStorage.getItem(POSTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
      return DEFAULT_POSTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_POSTS;
  }
}

export function saveCommunityPosts(posts) {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}

let currentFilter = "all";

export function renderCommunityPosts(filter = currentFilter) {
  currentFilter = filter;
  const container = document.getElementById("communityPostsList");
  if (!container) return;

  const allPosts = getCommunityPosts();
  const posts = filter === "all" ? allPosts : allPosts.filter(p => p.type === filter);

  const currentUser = (getAuthMode() === "firebase" && liveFirebaseAvailable && firebaseAuth)
    ? firebaseAuth.currentUser
    : SandboxAuth.getCurrentUser();
  const isDev = isDevAdmin(currentUser);
  const currentUserId = currentUser ? (currentUser.uid || currentUser.email) : null;
  const currentUserEmail = currentUser ? currentUser.email : null;

  if (posts.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: #9aa3be; padding: 24px;">No posts found in this category. Be the first to start a conversation! 🏀</div>`;
    return;
  }

  container.innerHTML = posts.map(post => {
    const isAuthor = currentUser && (currentUser.email === post.authorEmail || currentUser.uid === post.userId);
    const canDelete = isAuthor || isDev;
    const commentsCount = (post.comments || []).length;
    const isDevAuthor = post.authorEmail?.toLowerCase() === DEV_ADMIN_EMAIL.toLowerCase();

    const categoryLabel = {
      question: "❓ Question",
      debate: "💬 Debate",
      highlight: "⚡ Highlight",
      trade: "🔄 Trade Rumor"
    }[post.type] || "🏀 Discussion";

    // Author with nickname & honorary title
    const authorHtml = renderUserBadgeAndNickname(post.authorEmail, post.authorName);

    // Image container if image is present
    const imageHtml = post.image ? `
      <div class="post-image-container">
        <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" onerror="this.parentElement.style.display='none'" />
      </div>
    ` : "";

    // Dev quick nickname grant button
    const quickNickBtn = (isDev && post.authorEmail && post.authorEmail.toLowerCase() !== DEV_ADMIN_EMAIL.toLowerCase())
      ? `<button type="button" class="dev-quick-nickname-btn" data-email="${escapeHtml(post.authorEmail)}" data-name="${escapeHtml(post.authorName)}" style="padding: 2px 7px; font-size: 11px; margin-left: 8px; background: rgba(255, 215, 0, 0.15); border: 1px solid rgba(255, 215, 0, 0.4); color: #ffd700; border-radius: 4px; cursor: pointer;">🏷️ Bestow Nickname</button>`
      : "";

    // Dev quick ban button
    const quickBanBtn = (isDev && post.authorEmail && post.authorEmail.toLowerCase() !== DEV_ADMIN_EMAIL.toLowerCase())
      ? `<button type="button" class="dev-quick-post-ban-btn" data-email="${escapeHtml(post.authorEmail)}" style="padding: 2px 7px; font-size: 11px; margin-left: 6px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; border-radius: 4px; cursor: pointer;" title="Ban this member (Dev Only)">🚫 Ban</button>`
      : "";

    // Vote state for current user
    const userVote = (post.userVotes && (post.userVotes[currentUserId] || post.userVotes[currentUserEmail])) || null;
    const likeActive = userVote === "like" ? "active" : "";
    const dislikeActive = userVote === "dislike" ? "active" : "";

    const commentsListHtml = (post.comments || []).map(c => {
      const commentAuthorHtml = renderUserBadgeAndNickname(c.authorEmail, c.authorName);
      return `
        <div class="comment-row">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span>${c.authorAvatar || "🏀"}</span>
              ${commentAuthorHtml}
              <span style="font-size: 10px; background: rgba(0, 217, 255, 0.1); color: #00d9ff; padding: 1px 5px; border-radius: 4px;">${escapeHtml(c.authorTeam || "NBA Fan")}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #64748b; font-size: 11px;">${c.timestamp}</span>
              ${canDelete ? `<button class="delete-comment-btn" data-postid="${post.id}" data-commentid="${c.id}" style="background: none; border: none; color: #f87171; cursor: pointer; font-size: 11px;" title="Delete comment">✕</button>` : ""}
            </div>
          </div>
          <p style="margin: 0; color: #e2e8f0; font-size: 13px;">${escapeHtml(c.text)}</p>
        </div>
      `;
    }).join("");

    return `
      <div class="community-post-card" data-id="${post.id}">
        <div class="post-badge-row">
          <span class="post-category-badge ${post.type}">${categoryLabel}</span>
          <span class="fan-badge" style="font-size: 11px;">${escapeHtml(post.authorTeam || "All-NBA")}</span>
          <span class="fan-badge" style="background: rgba(34, 197, 94, 0.12); color: #4ade80; border-color: rgba(34, 197, 94, 0.3); font-size: 11px;">✓ Verified Fan</span>
          ${isDevAuthor ? `<span style="background:#ffd700; color:#040814; font-weight:800; font-size:10px; padding:2px 6px; border-radius:4px;">👑 DEV ADMIN</span>` : ""}
          <span style="color: #64748b; font-size: 12px; margin-left: auto;">${post.timestamp}</span>
        </div>

        <h3 class="post-title-text">${escapeHtml(post.title)}</h3>
        <p class="post-body-text">${escapeHtml(post.content)}</p>

        ${imageHtml}

        <div style="font-size: 12px; color: #9aa3be; margin-bottom: 12px; display: flex; align-items: center; flex-wrap: wrap;">
          <span>Posted by ${authorHtml}</span>
          ${quickNickBtn}
          ${quickBanBtn}
        </div>

        <div class="post-footer-bar">
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <!-- Separate Likes and Dislikes Voting -->
            <div class="post-vote-group">
              <button type="button" class="post-vote-btn like ${likeActive}" data-id="${post.id}" title="Like this post">
                👍 <strong>${post.likes || 0}</strong>
              </button>
              <button type="button" class="post-vote-btn dislike ${dislikeActive}" data-id="${post.id}" title="Dislike this post">
                👎 <strong>${post.dislikes || 0}</strong>
              </button>
            </div>

            <button type="button" class="btn-secondary toggle-comments-btn" data-id="${post.id}" style="padding: 5px 12px; font-size: 13px;">
              💬 Comments (${commentsCount})
            </button>
          </div>

          ${canDelete ? `
            <button type="button" class="btn-danger delete-post-btn" data-id="${post.id}" style="padding: 4px 10px; font-size: 12px;">
              🗑️ Delete ${isDev ? "(Admin)" : ""}
            </button>
          ` : ""}
        </div>

        <!-- Collapsible Comments Area -->
        <div id="comments_${post.id}" class="post-comments-wrapper" style="display: none;">
          <div class="comments-list" style="margin-bottom: 12px;">
            ${commentsListHtml || `<div style="color: #9aa3be; font-size: 12px; font-style: italic;">No comments yet. Share the first reply!</div>`}
          </div>

          <!-- Add Comment Input -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <input type="text" id="commentInput_${post.id}" placeholder="Write a constructive fan comment or answer..." style="flex: 1; min-width: 200px; padding: 8px 12px; background: #060812; border: 1px solid var(--border-color); border-radius: 6px; color: #fff; font-size: 13px;" />
            <button type="button" class="btn-primary submit-comment-btn" data-id="${post.id}" style="padding: 8px 14px; font-size: 13px;">
              Reply
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Like voting events
  container.querySelectorAll(".post-vote-btn.like").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      voteCommunityPost(id, "like");
    });
  });

  // Dislike voting events
  container.querySelectorAll(".post-vote-btn.dislike").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      voteCommunityPost(id, "dislike");
    });
  });

  // Dev Quick Nickname buttons
  container.querySelectorAll(".dev-quick-nickname-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetEmail = btn.getAttribute("data-email");
      const targetName = btn.getAttribute("data-name");
      openQuickNicknamePrompt(targetEmail, targetName);
    });
  });

  // Dev Quick Ban buttons
  container.querySelectorAll(".dev-quick-post-ban-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetEmail = btn.getAttribute("data-email");
      if (!targetEmail) return;
      const reason = prompt(`Developer Admin: Impose ban on "${targetEmail}"? Enter reason:`, "Zero Harassment Policy Violation");
      if (reason) {
        banUser(targetEmail, reason);
        alert(`Banned ${targetEmail}. User has been suspended from NBA Hub.`);
      }
    });
  });

  // Toggle comments
  container.querySelectorAll(".toggle-comments-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const box = document.getElementById("comments_" + id);
      if (box) {
        box.style.display = box.style.display === "none" ? "block" : "none";
      }
    });
  });

  // Delete post
  container.querySelectorAll(".delete-post-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (confirm("Delete this community post?")) {
        deleteCommunityPost(id);
      }
    });
  });

  // Submit comment
  container.querySelectorAll(".submit-comment-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const input = document.getElementById("commentInput_" + id);
      if (input) {
        addCommentToPost(id, input.value);
        input.value = "";
      }
    });
  });

  // Delete comment
  container.querySelectorAll(".delete-comment-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const postId = btn.getAttribute("data-postid");
      const commentId = btn.getAttribute("data-commentid");
      deleteCommentFromPost(postId, commentId);
    });
  });
}

export function voteCommunityPost(postId, type) {
  const currentUser = (getAuthMode() === "firebase" && liveFirebaseAvailable && firebaseAuth)
    ? firebaseAuth.currentUser
    : SandboxAuth.getCurrentUser();

  if (!currentUser) {
    alert("Please sign in above to vote on community posts!");
    return;
  }

  if (isUserBanned(currentUser.email) || isUserBanned(currentUser.uid)) {
    alert("🚫 Access Suspended: Banned accounts cannot vote on community posts.");
    return;
  }

  const posts = getCommunityPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  if (typeof post.likes !== "number") post.likes = 0;
  if (typeof post.dislikes !== "number") post.dislikes = 0;
  if (!post.userVotes || typeof post.userVotes !== "object") post.userVotes = {};

  const userKey = currentUser.uid || currentUser.email;
  const previousVote = post.userVotes[userKey];

  if (previousVote === type) {
    // User clicked the same button -> revoke vote
    if (type === "like") post.likes = Math.max(0, post.likes - 1);
    if (type === "dislike") post.dislikes = Math.max(0, post.dislikes - 1);
    delete post.userVotes[userKey];
  } else if (previousVote) {
    // User switched vote
    if (previousVote === "like") post.likes = Math.max(0, post.likes - 1);
    if (previousVote === "dislike") post.dislikes = Math.max(0, post.dislikes - 1);
    if (type === "like") post.likes += 1;
    if (type === "dislike") post.dislikes += 1;
    post.userVotes[userKey] = type;
  } else {
    // First time voting
    if (type === "like") post.likes += 1;
    if (type === "dislike") post.dislikes += 1;
    post.userVotes[userKey] = type;
  }

  saveCommunityPosts(posts);
  renderCommunityPosts();
}

export function addCommentToPost(postId, commentText) {
  const currentUser = (getAuthMode() === "firebase" && liveFirebaseAvailable && firebaseAuth)
    ? firebaseAuth.currentUser
    : SandboxAuth.getCurrentUser();

  if (!currentUser) {
    alert("Please sign in above to join discussions and leave comments!");
    return;
  }

  if (isUserBanned(currentUser.email) || isUserBanned(currentUser.uid)) {
    alert("🚫 Access Suspended: Your account is restricted from posting comments by Developer Administrator.");
    return;
  }

  const clean = commentText.trim();
  if (!clean) return;

  const meta = getUserProfileMeta(currentUser.uid);
  const now = new Date();
  const dateStr = now.toLocaleDateString([], { month: "short", day: "numeric" });

  const posts = getCommunityPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    if (!post.comments) post.comments = [];
    post.comments.push({
      id: "c_" + Date.now(),
      authorName: currentUser.displayName || currentUser.email.split("@")[0],
      authorEmail: currentUser.email,
      authorTeam: meta.favoriteTeam || "All-NBA / League Fan",
      authorAvatar: meta.photoURL && meta.photoURL.length <= 4 ? meta.photoURL : (currentUser.displayName?.charAt(0) || "🏀"),
      text: clean,
      timestamp: dateStr
    });
    saveCommunityPosts(posts);
    renderCommunityPosts();
    const box = document.getElementById("comments_" + postId);
    if (box) box.style.display = "block";
    updateAdminStats();
  }
}

export function deleteCommentFromPost(postId, commentId) {
  const posts = getCommunityPosts();
  const post = posts.find(p => p.id === postId);
  if (post && post.comments) {
    post.comments = post.comments.filter(c => c.id !== commentId);
    saveCommunityPosts(posts);
    renderCommunityPosts();
    const box = document.getElementById("comments_" + postId);
    if (box) box.style.display = "block";
    updateAdminStats();
  }
}

export function deleteCommunityPost(postId) {
  let posts = getCommunityPosts();
  posts = posts.filter(p => p.id !== postId);
  saveCommunityPosts(posts);
  renderCommunityPosts();
  updateAdminStats();
}

let attachedPostImage = null;

export function setupCommunityPosts() {
  const toggleBtn = document.getElementById("toggleCreatePostBtn");
  const formCard = document.getElementById("createPostForm");
  const cancelBtn = document.getElementById("cancelCreatePostBtn");
  const publishBtn = document.getElementById("publishPostBtn");
  const msgEl = document.getElementById("createPostMsg");

  // Post Image Upload & URL input elements
  const postImageUpload = document.getElementById("postImageUpload");
  const postImageUrl = document.getElementById("postImageUrl");
  const previewContainer = document.getElementById("postImagePreviewContainer");
  const previewImg = document.getElementById("postImagePreview");
  const removeImageBtn = document.getElementById("removePostImageBtn");

  function setAttachedPostImage(url) {
    attachedPostImage = url;
    if (previewContainer && previewImg) {
      if (url) {
        previewImg.src = url;
        previewContainer.style.display = "block";
      } else {
        previewContainer.style.display = "none";
        previewImg.src = "";
        if (postImageUpload) postImageUpload.value = "";
        if (postImageUrl) postImageUrl.value = "";
      }
    }
  }

  // File upload reader
  postImageUpload?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large. Please select an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target?.result;
      if (dataUrl) {
        setAttachedPostImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  });

  // Direct image URL input
  postImageUrl?.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (val && (val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:image/"))) {
      setAttachedPostImage(val);
    }
  });

  removeImageBtn?.addEventListener("click", () => {
    setAttachedPostImage(null);
  });

  refreshPostCaptcha();

  toggleBtn?.addEventListener("click", () => {
    if (!formCard) return;
    const isHidden = formCard.style.display === "none";
    if (isHidden) {
      refreshPostCaptcha();
      if (msgEl) msgEl.style.display = "none";
      formCard.style.display = "block";
    } else {
      formCard.style.display = "none";
    }
  });

  cancelBtn?.addEventListener("click", () => {
    if (formCard) formCard.style.display = "none";
    setAttachedPostImage(null);
  });

  // Filter Buttons
  document.querySelectorAll(".filter-tag-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-tag-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter") || "all";
      renderCommunityPosts(filter);
    });
  });

  // Publish Post
  publishBtn?.addEventListener("click", () => {
    const currentUser = (getAuthMode() === "firebase" && liveFirebaseAvailable && firebaseAuth)
      ? firebaseAuth.currentUser
      : SandboxAuth.getCurrentUser();

    if (!currentUser) {
      if (msgEl) {
        msgEl.className = "auth-feedback error";
        msgEl.textContent = "Please sign in above before posting a discussion or question.";
        msgEl.style.display = "block";
      }
      return;
    }

    if (isUserBanned(currentUser.email) || isUserBanned(currentUser.uid)) {
      if (msgEl) {
        msgEl.className = "auth-feedback error";
        msgEl.textContent = "🚫 Access Revoked: Your account is suspended from publishing community posts by Developer Administrator.";
        msgEl.style.display = "block";
      }
      return;
    }

    const type = document.getElementById("postTypeSelect")?.value || "question";
    const title = document.getElementById("postTitleInput")?.value.trim();
    const content = document.getElementById("postContentInput")?.value.trim();

    if (!title || !content) {
      if (msgEl) {
        msgEl.className = "auth-feedback error";
        msgEl.textContent = "Please fill in both the title and details for your post.";
        msgEl.style.display = "block";
      }
      return;
    }

    // Bot Verification Check
    const captchaInput = document.getElementById("postCaptchaAnswer");
    const captchaVal = parseInt(captchaInput?.value.trim(), 10);
    if (isNaN(captchaVal) || captchaVal !== postCaptchaSolution) {
      if (msgEl) {
        msgEl.className = "auth-feedback error";
        msgEl.textContent = "Bot Verification Failed: Please solve the security math challenge correctly.";
        msgEl.style.display = "block";
      }
      refreshPostCaptcha();
      return;
    }

    const meta = getUserProfileMeta(currentUser.uid);
    const now = new Date();
    const dateStr = now.toLocaleDateString([], { month: "short", day: "numeric" });

    const newPost = {
      id: "post_" + Date.now(),
      userId: currentUser.uid,
      type: type,
      title: title,
      content: content,
      image: attachedPostImage || null,
      authorName: currentUser.displayName || currentUser.email.split("@")[0],
      authorEmail: currentUser.email,
      authorTeam: meta.favoriteTeam || "All-NBA / League Fan",
      authorAvatar: meta.photoURL && meta.photoURL.length <= 4 ? meta.photoURL : (currentUser.displayName?.charAt(0) || "🏀"),
      timestamp: dateStr,
      likes: 1,
      dislikes: 0,
      userVotes: {
        [currentUser.uid || currentUser.email]: "like"
      },
      comments: []
    };

    const posts = getCommunityPosts();
    posts.unshift(newPost);
    saveCommunityPosts(posts);

    if (msgEl) {
      msgEl.className = "auth-feedback success";
      msgEl.textContent = "✓ Post published successfully to the fan community!";
      msgEl.style.display = "block";
    }

    // Clear inputs and preview
    const titleEl = document.getElementById("postTitleInput");
    const contentEl = document.getElementById("postContentInput");
    if (titleEl) titleEl.value = "";
    if (contentEl) contentEl.value = "";
    setAttachedPostImage(null);

    setTimeout(() => {
      if (formCard) formCard.style.display = "none";
      renderCommunityPosts();
      updateAdminStats();
    }, 1200);
  });

  renderCommunityPosts();
}

/* -----------------------------------------------------
 * 14. DEVELOPER & SYSTEM ADMIN PANEL
 * ----------------------------------------------------- */
export function updateAdminStats() {
  const posts = getCommunityPosts();
  const chat = getChatMessages();
  let totalComments = 0;
  posts.forEach(p => {
    totalComments += (p.comments || []).length;
  });

  const totalPostsEl = document.getElementById("adminTotalPosts");
  const totalCommentsEl = document.getElementById("adminTotalComments");
  const totalChatEl = document.getElementById("adminTotalChatMsgs");
  const authModeEl = document.getElementById("adminAuthMode");

  if (totalPostsEl) totalPostsEl.textContent = String(posts.length);
  if (totalCommentsEl) totalCommentsEl.textContent = String(totalComments);
  if (totalChatEl) totalChatEl.textContent = String(chat.length);
  if (authModeEl) authModeEl.textContent = getAuthMode() === "firebase" ? "Firebase Cloud" : "Sandbox Demo";
}

export function renderAssignedNicknamesList() {
  const container = document.getElementById("assignedNicknamesList");
  if (!container) return;

  const nicknames = getAssignedNicknames();
  const entries = Object.entries(nicknames);

  if (entries.length === 0) {
    container.innerHTML = `<span style="color: #9aa3be; font-style: italic;">No custom nicknames granted yet. Use the tool above to bestow nicknames to community members.</span>`;
    return;
  }

  container.innerHTML = `
    <div style="margin-bottom: 6px; font-weight: 600; color: #ffd700;">Active Bestowed Nicknames (${entries.length}):</div>
    <div style="display: flex; flex-direction: column; gap: 6px;">
      ${entries.map(([email, data]) => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #0c0f20; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border-color); flex-wrap: wrap; gap: 6px;">
          <div>
            <strong style="color: #f1f5f9;">${escapeHtml(email)}</strong>:
            ${data.nickname ? `<span class="user-nickname-text">"${escapeHtml(data.nickname)}"</span>` : ""}
            ${data.badge ? `<span class="user-honorary-badge">${escapeHtml(data.badge)}</span>` : ""}
            <span style="color: #64748b; font-size: 11px; margin-left: 6px;">(Granted on ${data.date || "2026"})</span>
          </div>
          <button type="button" class="btn-danger revoke-nickname-btn" data-email="${escapeHtml(email)}" style="padding: 2px 8px; font-size: 11px;">
            Revoke
          </button>
        </div>
      `).join("")}
    </div>
  `;

  container.querySelectorAll(".revoke-nickname-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email");
      if (email && confirm(`Revoke nickname and badge from ${email}?`)) {
        const list = getAssignedNicknames();
        delete list[email.toLowerCase()];
        saveAssignedNicknames(list);
        renderAssignedNicknamesList();
        renderCommunityPosts();
        renderChatMessages();
      }
    });
  });
}

export function renderBannedUsersList() {
  const container = document.getElementById("bannedUsersList");
  if (!container) return;

  const bannedMap = getBannedUsers();
  const entries = Object.entries(bannedMap);

  if (entries.length === 0) {
    container.innerHTML = `<span style="color: #9aa3be; font-style: italic;">No members are currently banned. The community is clean!</span>`;
    return;
  }

  container.innerHTML = `
    <div style="margin-bottom: 6px; font-weight: 600; color: #f87171;">Currently Suspended Members (${entries.length}):</div>
    <div style="display: flex; flex-direction: column; gap: 6px;">
      ${entries.map(([email, data]) => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #130a10; padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.4); flex-wrap: wrap; gap: 6px;">
          <div>
            <strong style="color: #fca5a5;">${escapeHtml(email)}</strong>
            <span style="color: #cbd5e1; font-size: 11px; margin-left: 6px;">• Reason: <em>${escapeHtml(data.reason || "Policy violation")}</em></span>
            <span style="color: #64748b; font-size: 11px; margin-left: 6px;">(Suspended on ${data.bannedAt || "2026"})</span>
          </div>
          <button type="button" class="btn-secondary restore-unban-btn" data-email="${escapeHtml(email)}" style="padding: 2px 8px; font-size: 11px; border-color: #22c55e; color: #86efac; cursor: pointer;">
            ✓ Restore / Unban
          </button>
        </div>
      `).join("")}
    </div>
  `;

  container.querySelectorAll(".restore-unban-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email");
      if (email && confirm(`Developer Admin: Restore access for "${email}"?`)) {
        unbanUser(email);
        alert(`Access restored for ${email}. Member can now sign in and participate.`);
      }
    });
  });
}

export function openQuickNicknamePrompt(targetEmail, targetName) {
  const adminPanel = document.getElementById("adminPanelSection");
  if (adminPanel) {
    adminPanel.style.display = "block";
    adminPanel.open = true;
  }
  const emailInput = document.getElementById("adminTargetUserEmail");
  const nickInput = document.getElementById("adminCustomNickname");
  if (emailInput) {
    emailInput.value = targetEmail || targetName || "";
    emailInput.focus();
    emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (nickInput) {
    nickInput.focus();
  }
}

export function setupAdminPanel() {
  const broadcastInput = document.getElementById("adminBroadcastInput");
  const broadcastBtn = document.getElementById("adminBroadcastBtn");
  const clearBroadcastBtn = document.getElementById("adminClearBroadcastBtn");
  const announcementBanner = document.getElementById("adminAnnouncementBanner");
  const clearAllChatBtn = document.getElementById("adminClearAllChatBtn");
  const seedPostsBtn = document.getElementById("adminSeedPostsBtn");

  // Nickname Tool Controls
  const targetEmailInput = document.getElementById("adminTargetUserEmail");
  const customNicknameInput = document.getElementById("adminCustomNickname");
  const customBadgeInput = document.getElementById("adminCustomTitleBadge");
  const saveNicknameBtn = document.getElementById("adminSaveNicknameBtn");
  const nicknameFeedback = document.getElementById("adminNicknameFeedback");

  // Ban & Suspension Tool Controls (Dev Only)
  const banUserEmailInput = document.getElementById("adminBanUserEmail");
  const banReasonSelect = document.getElementById("adminBanReasonSelect");
  const executeBanBtn = document.getElementById("adminExecuteBanBtn");
  const banFeedback = document.getElementById("adminBanFeedback");

  executeBanBtn?.addEventListener("click", () => {
    const target = banUserEmailInput?.value.trim().toLowerCase();
    const reason = banReasonSelect?.value || "Community guidelines violation";

    if (!target) {
      alert("Please enter the email address or member username to ban.");
      banUserEmailInput?.focus();
      return;
    }

    if (target === DEV_ADMIN_EMAIL.toLowerCase()) {
      alert("Action Prohibited: The Lead Developer Admin cannot be banned!");
      return;
    }

    if (confirm(`Impose permanent ban on "${target}" for reason: "${reason}"?`)) {
      const ok = banUser(target, reason);
      if (ok) {
        if (banFeedback) {
          banFeedback.textContent = `✓ Imposed ban on ${target}. Access revoked.`;
          banFeedback.style.display = "inline";
          setTimeout(() => {
            banFeedback.style.display = "none";
          }, 3500);
        }
        if (banUserEmailInput) banUserEmailInput.value = "";
      }
    }
  });

  // Load existing announcement if present
  const existingAnnouncement = localStorage.getItem("nba_broadcast_announcement");
  if (existingAnnouncement && announcementBanner) {
    announcementBanner.innerHTML = `📢 <strong>DEVELOPER ANNOUNCEMENT:</strong> ${escapeHtml(existingAnnouncement)}`;
    announcementBanner.style.display = "block";
  }

  broadcastBtn?.addEventListener("click", () => {
    const text = broadcastInput?.value.trim();
    if (!text) {
      alert("Please type an announcement message.");
      return;
    }
    localStorage.setItem("nba_broadcast_announcement", text);
    if (announcementBanner) {
      announcementBanner.innerHTML = `📢 <strong>DEVELOPER ANNOUNCEMENT:</strong> ${escapeHtml(text)}`;
      announcementBanner.style.display = "block";
    }
    alert("Developer announcement broadcasted across the application!");
  });

  clearBroadcastBtn?.addEventListener("click", () => {
    localStorage.removeItem("nba_broadcast_announcement");
    if (announcementBanner) {
      announcementBanner.style.display = "none";
      announcementBanner.innerHTML = "";
    }
    if (broadcastInput) broadcastInput.value = "";
  });

  // Bestow Nickname & Badge Tool
  saveNicknameBtn?.addEventListener("click", () => {
    const target = targetEmailInput?.value.trim().toLowerCase();
    const nickname = customNicknameInput?.value.trim();
    const badge = customBadgeInput?.value.trim();

    if (!target) {
      alert("Please specify the member's email address or username.");
      targetEmailInput?.focus();
      return;
    }

    if (!nickname && !badge) {
      alert("Please enter at least a custom nickname or an honorary title badge.");
      customNicknameInput?.focus();
      return;
    }

    const nicknames = getAssignedNicknames();
    const now = new Date();
    const dateStr = now.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });

    nicknames[target] = {
      nickname: nickname || "",
      badge: badge || "",
      assignedBy: DEV_ADMIN_EMAIL,
      date: dateStr
    };

    saveAssignedNicknames(nicknames);
    renderAssignedNicknamesList();
    renderCommunityPosts();
    renderChatMessages();

    if (nicknameFeedback) {
      nicknameFeedback.textContent = `✓ Granted "${nickname || badge}" to ${target}!`;
      nicknameFeedback.style.display = "inline";
      setTimeout(() => {
        nicknameFeedback.style.display = "none";
      }, 3500);
    }

    // Clear inputs
    if (targetEmailInput) targetEmailInput.value = "";
    if (customNicknameInput) customNicknameInput.value = "";
    if (customBadgeInput) customBadgeInput.value = "";
  });

  clearAllChatBtn?.addEventListener("click", () => {
    if (confirm("Developer Admin: Purge all live chat stream messages?")) {
      saveChatMessages([]);
      renderChatMessages();
      updateAdminStats();
    }
  });

  seedPostsBtn?.addEventListener("click", () => {
    if (confirm("Reset to default official NBA community discussion posts with images and votes?")) {
      saveCommunityPosts(DEFAULT_POSTS);
      renderCommunityPosts();
      updateAdminStats();
      alert("Default discussion threads seeded successfully!");
    }
  });

  renderAssignedNicknamesList();
  updateAdminStats();
}

/* -----------------------------------------------------
 * 15. BOOTSTRAP APP
 * ----------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Language selector
  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.addEventListener("change", function () {
      setLanguage(this.value);
    });
  }

  // 2. Timezone selector & clock interval
  const tzSelect = document.getElementById("timeZoneSelect");
  if (tzSelect) {
    tzSelect.addEventListener("change", updateTimeDisplay);
  }
  updateTimeDisplay();
  setInterval(updateTimeDisplay, 1000);

  // 3. Search triggers
  document.getElementById("searchBtn")?.addEventListener("click", executeSearch);
  document.getElementById("searchInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") executeSearch();
  });

  // 4. Player search filter
  document.getElementById("playerSearch")?.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    const list = document.getElementById("playersList");
    if (!list) return;
    const items = list.querySelectorAll("li");
    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? "block" : "none";
    });
  });

  // 5. Initialize Captcha Challenges
  refreshRegCaptcha();
  refreshPostCaptcha();

  // 6. Setup Auth Listeners & Config Modal
  setupAuthListeners();
  setupConfigModal();

  // 7. Setup Live Fan Chat
  setupLiveChat();

  // 8. Setup Community Posts & Comments
  setupCommunityPosts();

  // 9. Setup Developer Admin Panel
  setupAdminPanel();

  // 10. Setup JSON Manager
  setupJsonManager();

  // 11. Render default English content
  setLanguage("en");

  console.log("🏀 NBA Hub 2026 initialized! Mode: " + getAuthMode());
});