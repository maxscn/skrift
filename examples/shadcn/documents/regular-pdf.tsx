import {
  Body,
  Document,
  Head,
  Page,
  PAGE_SIZES,
  Tailwind,
  Unbreakable,
  usePageSize
} from '@skrift/components';
interface RegularPDFProps {
  // pageSize is automatically provided by the server-side rendering
  // when a page size is selected in the preview UI
  pageSize?: typeof PAGE_SIZES[number]["name"];
}

const columns = ["name"]

const tableWithATonOfRows = [
  {
    "contractor_name": "PV Solenergi/BrightRock AB"
  },
  {
    "contractor_name": "Kalmar Energi"
  },
  {
    "contractor_name": "Intercept Solar"
  },
  {
    "contractor_name": "Nova Solar"
  },
  {
    "contractor_name": "Solgiganten AB"
  },
  {
    "contractor_name": "OTM Eko Energi "
  },
  {
    "contractor_name": "Solvision"
  },
  {
    "contractor_name": "Västkustsol"
  },
  {
    "contractor_name": "Evify"
  },
  {
    "contractor_name": "4TEC Sol"
  },
  {
    "contractor_name": "Sol & UV kraft"
  },
  {
    "contractor_name": "SOLPOWER SVERIGE AB"
  },
  {
    "contractor_name": "Dalhem Sol"
  },
  {
    "contractor_name": "Penthon"
  },
  {
    "contractor_name": "Klövsta Energi"
  },
  {
    "contractor_name": "Stadsbyggarna Syd AB"
  },
  {
    "contractor_name": "Sol i Lysekil AB"
  },
  {
    "contractor_name": "Implementa Sol"
  },
  {
    "contractor_name": "AO Solar Systems AB"
  },
  {
    "contractor_name": "Solcellsentreprenaden i Sthlm"
  },
  {
    "contractor_name": "Energieffekten i Sverige AB"
  },
  {
    "contractor_name": "Nya Energihem Norden AB"
  },
  {
    "contractor_name": "Mariebergs Brasvärme & Solenergi"
  },
  {
    "contractor_name": "SolcellsTibbe AB"
  },
  {
    "contractor_name": "Antrenau AB"
  },
  {
    "contractor_name": "Solistic"
  },
  {
    "contractor_name": "Eslövs Montage & Bygg"
  },
  {
    "contractor_name": "Skånesol AB"
  },
  {
    "contractor_name": "Solarsurf Sverige AB"
  },
  {
    "contractor_name": "HD Norrsken"
  },
  {
    "contractor_name": "Nordisk Solteknik"
  },
  {
    "contractor_name": "Nordpolen Energi"
  },
  {
    "contractor_name": "Teknikpartner"
  },
  {
    "contractor_name": "Niutech Sol och Energi AB"
  },
  {
    "contractor_name": "Takel Energy AB"
  },
  {
    "contractor_name": "24Solar/DENOLI Konsult Aktiebolag"
  },
  {
    "contractor_name": "AllSol Norden AB"
  },
  {
    "contractor_name": "Arka Energy"
  },
  {
    "contractor_name": "Skånska Energilösningar"
  },
  {
    "contractor_name": "Effecta Energy Solutions AB"
  },
  {
    "contractor_name": "Jörgen Andreassons EL"
  },
  {
    "contractor_name": "Lundgrens El-installationer Vikbolandet-Norrköping"
  },
  {
    "contractor_name": "Solxperten Stockholm"
  },
  {
    "contractor_name": "Suntex"
  },
  {
    "contractor_name": "AC EL AB"
  },
  {
    "contractor_name": "VOLTEA"
  },
  {
    "contractor_name": "Sunpower Group Sweden 1 AB"
  },
  {
    "contractor_name": "Vega Solar"
  },
  {
    "contractor_name": "Takexperten Bålsta AB"
  },
  {
    "contractor_name": "Elektra i Hälsingland"
  },
  {
    "contractor_name": "PLW Energihus"
  },
  {
    "contractor_name": "Utellus"
  },
  {
    "contractor_name": "Tammp Energy"
  },
  {
    "contractor_name": "Soliera Energy AB "
  },
  {
    "contractor_name": "Sollie Elkonstruktion AB"
  },
  {
    "contractor_name": "Maskin Companiet i Halmstad AB"
  },
  {
    "contractor_name": "Volt Solar & Energi AB"
  },
  {
    "contractor_name": "Recaremed"
  },
  {
    "contractor_name": "Solebra AB"
  },
  {
    "contractor_name": "SolMontage Halland"
  },
  {
    "contractor_name": "Ladda Grönt i Sverige"
  },
  {
    "contractor_name": "Belo Elektriska AB"
  },
  {
    "contractor_name": "Stockholm Solenergi"
  },
  {
    "contractor_name": "Ljus - El & Ljusteknik i Skåne"
  },
  {
    "contractor_name": "Bredsands El & Solteknik"
  },
  {
    "contractor_name": "Soltech"
  },
  {
    "contractor_name": "Helios El & Solkraft"
  },
  {
    "contractor_name": "Elcommunication Sweden AB"
  },
  {
    "contractor_name": "Solar Invest"
  },
  {
    "contractor_name": "Kraftringen"
  },
  {
    "contractor_name": "Hällsinge Solceller"
  },
  {
    "contractor_name": "E.ON"
  },
  {
    "contractor_name": "Solpanelen.nu"
  },
  {
    "contractor_name": "Stella Solar AB"
  },
  {
    "contractor_name": "Backströms Tak AB"
  },
  {
    "contractor_name": "Öresundskraft"
  },
  {
    "contractor_name": "Sunflow AB"
  },
  {
    "contractor_name": "Kvarnerup Konsult AB"
  },
  {
    "contractor_name": "ETC Elproduktion i Katrineholm AB"
  },
  {
    "contractor_name": "Decasol"
  },
  {
    "contractor_name": "2Electrify"
  },
  {
    "contractor_name": "Solkjelle"
  },
  {
    "contractor_name": "Kungälv Närenergi AB"
  },
  {
    "contractor_name": "Green Hero AB"
  },
  {
    "contractor_name": "Swedala Tak"
  },
  {
    "contractor_name": "Solar Choice"
  },
  {
    "contractor_name": "GuldSolByggen"
  },
  {
    "contractor_name": "Assemblin Solar AB"
  },
  {
    "contractor_name": "Solivo"
  },
  {
    "contractor_name": "Flexergi AB"
  },
  {
    "contractor_name": "Solkraftdirekt Montage Sverige AB"
  },
  {
    "contractor_name": "Elisas Syd"
  },
  {
    "contractor_name": "AH Energy AB"
  },
  {
    "contractor_name": "Solviq Sverige AB"
  },
  {
    "contractor_name": "Malmö Energi"
  },
  {
    "contractor_name": "Täta tak Energi"
  },
  {
    "contractor_name": "Sydsvenska Hus AB"
  },
  {
    "contractor_name": "Vesivek Sverige AB"
  },
  {
    "contractor_name": "Solortus"
  },
  {
    "contractor_name": "Yellow Home AB"
  },
  {
    "contractor_name": "Solaris Energi"
  },
  {
    "contractor_name": "KP Sverige AB"
  },
  {
    "contractor_name": "Energizon i Sverige AB"
  },
  {
    "contractor_name": "AH Energy AB"
  },
  {
    "contractor_name": "Ragnaros Energy AB"
  },
  {
    "contractor_name": "NordhEnergy"
  },
  {
    "contractor_name": "Kumerius El i Villa KB"
  },
  {
    "contractor_name": "Vattenfall"
  },
  {
    "contractor_name": "Insel & Solenergi AB"
  },
  {
    "contractor_name": "Takkraft"
  },
  {
    "contractor_name": "My Energy Partner AB"
  },
  {
    "contractor_name": "Cellera AB "
  },
  {
    "contractor_name": "Soltjänst Sverige AB"
  },
  {
    "contractor_name": "Smålands Solenergi"
  },
  {
    "contractor_name": "Smart Solkraft"
  },
  {
    "contractor_name": "Uddevalla Energi AB"
  },
  {
    "contractor_name": "ViSol"
  },
  {
    "contractor_name": "Ideal El AB"
  },
  {
    "contractor_name": "Nordic Systems AB"
  },
  {
    "contractor_name": "Revolt Powercharge AB"
  },
  {
    "contractor_name": "Mariapark Sol"
  },
  {
    "contractor_name": "DT Energi/Dalaträhus Energi AB"
  },
  {
    "contractor_name": "Solarflex"
  },
  {
    "contractor_name": "BFA Bygg AB"
  },
  {
    "contractor_name": "Energy Effective Solutions"
  },
  {
    "contractor_name": "Extended Energi AB"
  },
  {
    "contractor_name": "HERO Solkraft"
  },
  {
    "contractor_name": "Aktiv Sol i Nöbbele AB"
  },
  {
    "contractor_name": "Solverket Alfa"
  },
  {
    "contractor_name": "BLST Elektriska AB"
  },
  {
    "contractor_name": "Volt i Mälardalen AB"
  },
  {
    "contractor_name": "Enermont"
  },
  {
    "contractor_name": "Haga Tak AB"
  },
  {
    "contractor_name": "VillaVind"
  },
  {
    "contractor_name": "Bravida Sverige AB"
  },
  {
    "contractor_name": "Solkraft EMK"
  },
  {
    "contractor_name": "SolarAdvantage AB"
  },
  {
    "contractor_name": "A-hus"
  },
  {
    "contractor_name": "Zoneco"
  },
  {
    "contractor_name": "Upplands ELTEKNIK AB"
  },
  {
    "contractor_name": "BraEl"
  },
  {
    "contractor_name": "Sun4Energy"
  },
  {
    "contractor_name": "Freebo"
  },
  {
    "contractor_name": "Kartho Trading AB"
  },
  {
    "contractor_name": "Solkomplett Sverige AB"
  },
  {
    "contractor_name": "Voltify"
  },
  {
    "contractor_name": "El-Montage i Oskarshamn"
  },
  {
    "contractor_name": "Otovo"
  },
  {
    "contractor_name": "SOL EN Älmhult AB"
  },
  {
    "contractor_name": "Solpanelen Syd AB"
  },
  {
    "contractor_name": "Sallén Elektriska AB"
  },
  {
    "contractor_name": "Susanna - Sustainable and Natural AB"
  },
  {
    "contractor_name": "Solcellsbolaget Sweden AB"
  },
  {
    "contractor_name": "Veosol Energi AB"
  },
  {
    "contractor_name": "IndSol Group"
  },
  {
    "contractor_name": "Energy Guards"
  },
  {
    "contractor_name": "Enwell"
  },
  {
    "contractor_name": "RoofSolar East AB"
  },
  {
    "contractor_name": "Jönköpings Energi"
  },
  {
    "contractor_name": "EcoKraft"
  },
  {
    "contractor_name": "GoSol Energi"
  },
  {
    "contractor_name": "Falu Solenergi AB"
  },
  {
    "contractor_name": "Klimatprojekt"
  },
  {
    "contractor_name": "Energikraft i Gävle AB"
  },
  {
    "contractor_name": "TE GE EL Installationer AB"
  },
  {
    "contractor_name": "PPAM Solkraft"
  },
  {
    "contractor_name": "Svea Solar"
  },
  {
    "contractor_name": "VB Energi"
  },
  {
    "contractor_name": "Alingsås energi"
  },
  {
    "contractor_name": "Gisle Innovations AB"
  },
  {
    "contractor_name": "Solvio AB"
  },
  {
    "contractor_name": "Kopernicus"
  },
  {
    "contractor_name": "Fyrstads Entreprenad"
  },
  {
    "contractor_name": "Solfamiljen"
  },
  {
    "contractor_name": "Solcellskompaniet Väst"
  },
  {
    "contractor_name": "EMJ Elteknik"
  },
  {
    "contractor_name": "Solsystem Sverige AB"
  },
  {
    "contractor_name": "Sol i Väst"
  },
  {
    "contractor_name": "Solarkraft"
  },
  {
    "contractor_name": "Sunshine Solceller AB"
  },
  {
    "contractor_name": "Energy Balance Scandinavia AB"
  },
  {
    "contractor_name": "Institutet för Solenergikvalitet"
  },
  {
    "contractor_name": "Vestelteknik"
  },
  {
    "contractor_name": "Delidel"
  },
  {
    "contractor_name": "Ekermanns El"
  },
  {
    "contractor_name": "Hallabro Elekriska"
  },
  {
    "contractor_name": "Idola Solkraft"
  },
  {
    "contractor_name": "Östgöta Solel"
  },
  {
    "contractor_name": "Solceller & Elektriker AB"
  },
  {
    "contractor_name": "MR solmontage AB"
  },
  {
    "contractor_name": "Parkys Install"
  },
  {
    "contractor_name": "Elspecialisterna i Eslöv AB "
  },
  {
    "contractor_name": "Trio Solar"
  },
  {
    "contractor_name": "Dudus Allservice AB"
  },
  {
    "contractor_name": "Soliga AB"
  },
  {
    "contractor_name": "Brage Elteknik"
  },
  {
    "contractor_name": "Överlida El"
  },
  {
    "contractor_name": "Photonic Power Systems Sweden AB"
  },
  {
    "contractor_name": "Hagmans Solenergi"
  },
  {
    "contractor_name": "Telge Energi"
  },
  {
    "contractor_name": "Energiengagemang Sverige"
  },
  {
    "contractor_name": "Auterra Solar"
  },
  {
    "contractor_name": "Mersol (MS Energi AB)"
  },
  {
    "contractor_name": "kWhsson"
  },
  {
    "contractor_name": "Limhamn Solar"
  },
  {
    "contractor_name": "Takproffsen i södra Sverige AB"
  },
  {
    "contractor_name": "Rudholms Tak AB"
  },
  {
    "contractor_name": "EQ Konsult och Trading AB"
  },
  {
    "contractor_name": "KNG EL KONSULT & INSTALLATION AB"
  },
  {
    "contractor_name": "Clean Sun Sverige AB"
  },
  {
    "contractor_name": "Elit Teknik AB"
  },
  {
    "contractor_name": "Rigora"
  },
  {
    "contractor_name": "EviSol AB"
  },
  {
    "contractor_name": "Grönborgs Sol AB"
  },
  {
    "contractor_name": "Ingen leverantör"
  },
  {
    "contractor_name": "Mesab-Mörbylånga Elservice"
  },
  {
    "contractor_name": "1KOMMA5°"
  },
  {
    "contractor_name": "Energiteknik"
  },
  {
    "contractor_name": "Elstart"
  },
  {
    "contractor_name": "Elians"
  },
  {
    "contractor_name": "Alfa Solvind i Skåne"
  },
  {
    "contractor_name": "Elinstallatörerna Ålem"
  },
  {
    "contractor_name": "Energiverkstan 2030"
  },
  {
    "contractor_name": "Solmarknad"
  },
  {
    "contractor_name": "SolenergiProjekt"
  },
  {
    "contractor_name": "Solkraft i Viby"
  },
  {
    "contractor_name": "Bjäre Kraft"
  },
  {
    "contractor_name": "Sandhult-Sandareds Elektriska ek. för."
  },
  {
    "contractor_name": "Oppunda El AB"
  },
  {
    "contractor_name": "HFA Solenergi"
  },
  {
    "contractor_name": "Krafton"
  },
  {
    "contractor_name": "Kungstak"
  },
  {
    "contractor_name": "SB Montage AB"
  },
  {
    "contractor_name": "Solcellskapet"
  },
  {
    "contractor_name": "Nacka Sol"
  },
  {
    "contractor_name": "Solel Åhus AB"
  },
  {
    "contractor_name": "Affärsverken Karlskrona"
  },
  {
    "contractor_name": "Svenskt ByggMontage AB"
  },
  {
    "contractor_name": "Järfälla Energi"
  },
  {
    "contractor_name": "Photonic Power Systems Sweden"
  },
  {
    "contractor_name": "Wettersol AB"
  },
  {
    "contractor_name": "Solkedjan AB"
  },
  {
    "contractor_name": "Gallno Montering AB"
  },
  {
    "contractor_name": "Solcella Värmdö"
  },
  {
    "contractor_name": "Roslagens Styrinstallation"
  },
  {
    "contractor_name": "Alstra"
  },
  {
    "contractor_name": "Brilliant Solar Sverige AB"
  },
  {
    "contractor_name": "Energimontering & Entrepenad AB"
  },
  {
    "contractor_name": "K-Sylwan El AB"
  },
  {
    "contractor_name": "Raymond"
  },
  {
    "contractor_name": "Smart Solar Norden"
  },
  {
    "contractor_name": "SEKNAB"
  },
  {
    "contractor_name": "Elektrotjänst i Skåne AB"
  },
  {
    "contractor_name": "CMF Entreprenad AB"
  },
  {
    "contractor_name": "Elteknik i Lund"
  },
  {
    "contractor_name": "Solar Polar"
  },
  {
    "contractor_name": "Nordic Solceller AB"
  },
  {
    "contractor_name": "Nordens Solvärme"
  },
  {
    "contractor_name": "Svenska solpanelmontage AB"
  },
  {
    "contractor_name": "Söderens"
  },
  {
    "contractor_name": "Fixer Göteborg AB"
  },
  {
    "contractor_name": "Solaritet"
  },
  {
    "contractor_name": "Dalarnas Solcellsmontage AB"
  },
  {
    "contractor_name": "Soolar"
  },
  {
    "contractor_name": "Skandica Solar"
  },
  {
    "contractor_name": "SunBro"
  },
  {
    "contractor_name": "Klimatprojekt i Mälardalen"
  },
  {
    "contractor_name": "Solkl.art"
  },
  {
    "contractor_name": "MIKRAB Miljö Kraft"
  },
  {
    "contractor_name": "Solid Solar"
  },
  {
    "contractor_name": "Assemblin VS"
  },
  {
    "contractor_name": "Thingvall Produktionspartner AB"
  },
  {
    "contractor_name": "KomByggSol"
  },
  {
    "contractor_name": "Kalmar VVS & EL Montage AB"
  },
  {
    "contractor_name": "Ekologisk Energi"
  },
  {
    "contractor_name": "Solkraft Norden"
  },
  {
    "contractor_name": "Dynamo Elteknik"
  },
  {
    "contractor_name": "7H-Elpartner"
  },
  {
    "contractor_name": "Sunvio AB"
  },
  {
    "contractor_name": "Measol"
  },
  {
    "contractor_name": "BYHMGARD"
  },
  {
    "contractor_name": "Energihem"
  },
  {
    "contractor_name": "Hyllinge Solkraft AB"
  },
  {
    "contractor_name": "Mölndal Energi Aktiebolag"
  },
  {
    "contractor_name": "Fortum"
  },
  {
    "contractor_name": "Krafttag"
  },
  {
    "contractor_name": "HS Solteknik"
  },
  {
    "contractor_name": "Skånska Energi"
  },
  {
    "contractor_name": "SunCity Montage AB"
  },
  {
    "contractor_name": "C4 Energi"
  },
  {
    "contractor_name": "Takab"
  },
  {
    "contractor_name": "Plåt och takspecialisten"
  },
  {
    "contractor_name": "Feels Like Sun"
  },
  {
    "contractor_name": "JS Elservice"
  },
  {
    "contractor_name": "Solcellen.nu"
  },
  {
    "contractor_name": "PFA Solteknik"
  },
  {
    "contractor_name": "Nordic Solar"
  },
  {
    "contractor_name": "Solar Cellect AB"
  },
  {
    "contractor_name": "Helgossons EL-teknik"
  },
  {
    "contractor_name": "SunScandinavia"
  },
  {
    "contractor_name": "Hammarö Solenergi"
  },
  {
    "contractor_name": "Sol & Tak Dalarna AB"
  },
  {
    "contractor_name": "Solar Entreprenad Nordic"
  },
  {
    "contractor_name": "Södra Hallands Kraft Ek förening"
  },
  {
    "contractor_name": "Climat 80 Aktiebolag"
  },
  {
    "contractor_name": "Mjäryds elmontage"
  },
  {
    "contractor_name": "Energimontering & Entreprenad Sverige"
  },
  {
    "contractor_name": "Kinda Solenergi"
  },
  {
    "contractor_name": "Dalasolenergi"
  },
  {
    "contractor_name": "Kumlins Elektriska AB"
  },
  {
    "contractor_name": "Prio Solar"
  },
  {
    "contractor_name": "INVOTECH AB"
  },
  {
    "contractor_name": "Swede Sol Cell"
  },
  {
    "contractor_name": "Elektrikerna i Östergötland AB"
  },
  {
    "contractor_name": "Energisolvind"
  },
  {
    "contractor_name": "ZolarTech i Skandinavien AB"
  },
  {
    "contractor_name": "Solarfuture i Sverige"
  },
  {
    "contractor_name": "IC Solcell & Batteri i Skåne AB"
  },
  {
    "contractor_name": "Fire Mountain AB"
  },
  {
    "contractor_name": "Agronola Energi AB"
  },
  {
    "contractor_name": "Solceller 365 AB"
  },
  {
    "contractor_name": "Energiteknik i Kungälv AB"
  },
  {
    "contractor_name": "Matavfallssystem"
  },
  {
    "contractor_name": "Sesol"
  },
  {
    "contractor_name": "Villatakexperten"
  },
  {
    "contractor_name": "Solel Åhus AB"
  },
  {
    "contractor_name": "El & Byggcenter i Skåne AB"
  },
  {
    "contractor_name": "Göteborg Energi Aktiebolag"
  },
  {
    "contractor_name": "bemt"
  },
  {
    "contractor_name": "GrönTeknik"
  },
  {
    "contractor_name": "Din Elkontakt i Kungälv"
  },
  {
    "contractor_name": "Sylwans El"
  },
  {
    "contractor_name": "Landskrona ELIT Teknik"
  },
  {
    "contractor_name": "Takrekond Syd AB"
  },
  {
    "contractor_name": "Inovèla"
  },
  {
    "contractor_name": "Chargehome Technology Scandinavia AB"
  },
  {
    "contractor_name": "EDE Energi Data & Elektronikservice AB"
  },
  {
    "contractor_name": "Tröingebergs El & Sol"
  },
  {
    "contractor_name": "Solstyrkan AB"
  },
  {
    "contractor_name": "RSA Sol"
  },
  {
    "contractor_name": "El & Energi i Skåne"
  },
  {
    "contractor_name": "Widings El"
  },
  {
    "contractor_name": "Neolar"
  },
  {
    "contractor_name": "Karlshamn Energi"
  },
  {
    "contractor_name": "Bålsta Småstadsutveckling"
  },
  {
    "contractor_name": "OBOS Bostadsutveckling"
  },
  {
    "contractor_name": "Anderssons Elektriska i Mjölby Aktiebolag"
  },
  {
    "contractor_name": "Lunds Takproffs AB"
  },
  {
    "contractor_name": "SOLENERGI o ANDRA KRAFTTAG I MAGLEHEM"
  },
  {
    "contractor_name": "Sol och Tak Specialisten i Sverige AB"
  },
  {
    "contractor_name": "Solifokus Sverige"
  },
  {
    "contractor_name": "BBK Group"
  },
  {
    "contractor_name": "Everöds Elbyrå"
  },
  {
    "contractor_name": "Elwa Solar AB"
  },
  {
    "contractor_name": "Cell Solar Nordic"
  },
  {
    "contractor_name": "SunRoof Sverige AB"
  },
  {
    "contractor_name": "Skåne Fastighestrenovering AB"
  },
  {
    "contractor_name": "Paneltaket"
  },
  {
    "contractor_name": "Hybrida"
  },
  {
    "contractor_name": "Soldags"
  },
  {
    "contractor_name": "Solkontakt Stockholm AB"
  },
  {
    "contractor_name": "Solarfarm"
  },
  {
    "contractor_name": "1KOMMA5° Syd (fd SolensEnergi)"
  },
  {
    "contractor_name": "Nordic Energy Partner AB"
  },
  {
    "contractor_name": "SO Solkraft AB"
  },
  {
    "contractor_name": "Lundströms Elektro & Teleservice"
  },
  {
    "contractor_name": "WattNord AB"
  },
  {
    "contractor_name": "EGEN ENERGI AB"
  },
  {
    "contractor_name": "Boxcell AB"
  },
  {
    "contractor_name": "Svensk takenergi"
  },
  {
    "contractor_name": "Svesol"
  },
  {
    "contractor_name": "Skalunda Gruvans Elektriska AB"
  },
  {
    "contractor_name": "Vancos"
  },
  {
    "contractor_name": "Bunkeflo Takentreprenad AB"
  },
  {
    "contractor_name": "Solspecialisten"
  },
  {
    "contractor_name": "Solcellsbyggarna"
  },
  {
    "contractor_name": "Solcellsproffsen"
  },
  {
    "contractor_name": "Miljö VVS & Energicenter"
  },
  {
    "contractor_name": "Solkungen"
  },
  {
    "contractor_name": "Solinnovation"
  },
  {
    "contractor_name": "Sol1 AB"
  },
  {
    "contractor_name": "Ecotech solutions"
  },
  {
    "contractor_name": "SolarOn Energy AB"
  },
  {
    "contractor_name": "Sideshow AB"
  },
  {
    "contractor_name": "Örebro Solentreprenad AB"
  },
  {
    "contractor_name": "Solar Energy Group AB"
  },
  {
    "contractor_name": "Electrotec Energy"
  },
  {
    "contractor_name": "Sydpumpen AB"
  },
  {
    "contractor_name": "TEEAB"
  },
  {
    "contractor_name": "Arba Solar"
  },
  {
    "contractor_name": "Elektrokyl Energiteknik AB "
  },
  {
    "contractor_name": "MW EL & Montage"
  },
  {
    "contractor_name": "Skånes elinstallation AB"
  },
  {
    "contractor_name": "Öveshult El & Bygg "
  },
  {
    "contractor_name": "Stockholm Solkraft"
  },
  {
    "contractor_name": "Moveco"
  },
  {
    "contractor_name": "SolNord AB"
  },
  {
    "contractor_name": "Vallacom AB"
  },
  {
    "contractor_name": "Sense Electric Sweden AB"
  },
  {
    "contractor_name": "FuturaEnergi"
  },
  {
    "contractor_name": "Reload Solar Sweden AB"
  }
]

const PageSizeDemo = () => {
  const pageSize = usePageSize();

  return (
    <div className="bg-blue-500 text-white p-4 rounded">
      <p className="text-sm font-bold">Current Page Size: {pageSize?.name || 'Default'}</p>
      <p className="text-xs">
        Dimensions: {pageSize?.dimensions.width || 'unknown'}px × {pageSize?.dimensions.height || 'unknown'}px
      </p>
    </div>
  );
};


export const RegularPDF = ({
  pageSize
}: RegularPDFProps) => (
  <Document pageSize={pageSize}>
    <Tailwind>
      <Head />
      <Body>
        <Page>
          <PageSizeDemo />
          <p className="text-black mt-4">This content is now inside a Page component that responds to the selected page size.</p>
        </Page>

        <div className="bg-red-500 w-full h-96">
          <p className="text-white p-4 mt-0">This is page 2 with the red background, now using responsive Page components.</p>
        </div>

        <Page>
          <Unbreakable>
            <div className="bg-green-500 w-full h-64">
              <p className="text-white p-4 mt-0">This is page 3 inside an Unbreakable component.</p>
            </div>
          </Unbreakable>
        </Page>
        <table>
          <thead>
            <tr>

              <th>
                Namn
              </th>
            </tr>
          </thead>
          <tbody>
            {tableWithATonOfRows.map(t => <tr key={t.contractor_name}><td style={{ border: "1px solid black", borderCollapse: "collapse" }}>{t.contractor_name}</td></tr>)}
          </tbody>
        </table>
      </Body>
    </Tailwind>
  </Document>
);



RegularPDF.PreviewProps = {} as RegularPDFProps;

export default RegularPDF;
