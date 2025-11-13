// VERSION: 1.7.5.4 - 2025-11-13
// PORTAALI GLOBAALNE KONFIGURATSIOON
// ===========================================

const SITE_CONFIG = {
    version: "1.7.5.4",
    date: "13.11.2025",
    buildTime: "2025-11-13 10:00",

    // Versioonimärkmed
    changelog: {
        "1.7.5.4": {
            date: "13.11.2025",
            changes: [
                "KOOSTOIME RISKID: 6 elustiili ainet plus-süsteemiks (kakao, alkohol, kofeiin, kanep/CBD, kava, kratom)",
                "RESSURSID: Lisatud 'Apteek' ja 'Puudub' valikud ligipääsu sektsiooni",
                "Spetsiifilised väljad ja hoiatused igale ainele"
            ]
        },
        "1.7.5.3": {
            date: "12.11.2025",
            changes: [
                "INFO NUPUD: Lisatud 6 sektsiooni (Uni, Tööriistad, Taimravi, Praktikad, Ideoloogia, Ressursid)"
            ]
        },
        "1.7.5.2": {
            date: "12.11.2025",
            changes: [
                "TOITUMISE RÜTM: Söögiajaaknad ja paast plus-süsteemiks (9 mustrit)"
            ]
        },
        "1.7.5.1": {
            date: "12.11.2025",
            changes: [
                "VEREVEDELDAJAD: 8 ravimit plus-süsteemiks (Varfariin, Apiksabaan, jne)",
                "KODUSED MÕÕTMISED: 7 seadet plus-süsteemiks"
            ]
        },
        "1.7.5": {
            date: "12.11.2025",
            changes: [
                "PARANDUSED: Eemaldatud kõik 'Või märgi lihtsalt...' duplikaadid (9 kohta)",
                "PARANDUSED: Eemaldatud vanad radio/checkbox listid (põhiline elupaik, aktiivsus, norskamine, kõnnitempo, vann/epsom)",
                "UI: '(belief)' sildid peidetud, sünnikuupäev liigutatud BMI alla",
                "KOMPAKT: Töövõime sektsioon ~40% lühem (dropdown + 2-veeruline grid)",
                "KODUNE TUGI: Plus-süsteem (6 kategooriat)"
            ]
        },
        "1.7.0": {
            date: "11.11.2025",
            changes: [
                "SUUR UUENDUS: UNI JA PRIVAATSUS LAIENDUS!",
                "UNI SEKTSIOON (2A): Eraldi sektsioon une ja norskamise jaoks (12 plus-nuppu)",
                "  - Norskamine (4): ei häiri, häirib elukaaslast, häirib mind, sõltub joomaastmest",
                "  - Unenägemine + painajad (4): puuduvad, tavalised, painajad harv, painajad sage",
                "  - Paranormaalsed uned (4, belief): kehaväline, prohvetlik, šamaani rännak, muu",
                "PRIVAATSUS MASSIIVNE LAIENDUS (0): 27 plus-nuppu kolmes kategoorias!",
                "  - Jagamise tase (10): arst, AI-arst, AI-test, pere, anon uurija, OSINT, med test, politsei, sõjaväe, jumalale (belief)",
                "  - Nõusolek (7): kodused mõõtmised, taimravi, hingamised, kutsu koju arst, palve (belief), rituaal (belief), New Age (belief)",
                "  - Ei jagata (11): kodu olukord, vägivald, sotsiaal, finants, vaimne, psühh, puue, religioon, eluharjumused, entogeenid, sõltuvusained",
                "BELIEF-SCOPE SÜSTEEM: Spirituaalsed väljad on visuaalselt eraldatud (hall toon, '(belief)' märge)",
                "  - Belief väljad: obe, prohvetlik, šamaani rännak, muu paranormaalne, jumalale, palve, rituaal, New Age praktik",
                "  - Vaikimisi peidetavad meditsiinipersonalile (ekspordi valikud)",
                "quickAddSleep() funktsioon: dünaamiline une kirjete lisamine (sagedus, tõsidus, märkmed)",
                "quickAddPrivacy() funktsioon: kolmeastmeline routing (jagamine/nõusolek/ei jagata), auto-kategoriseerimine",
                "MED_INFO_DB: 39 uut info kirjet (12 uni + 27 privaatsus) kaheastmelise modaaliga (Tab A: meie info, Tab B: välised allikad)",
                "  - UNI: norskamine (4), painajad (2), paranormaalsed (4, sh belief)",
                "  - PRIVAATSUS: jagamise tase (10), nõusolek (7), ei jagata (11)",
                "Visuaalne eristus: Uni (sinine #eff6ff), Privaatsus jagamine (roheline), nõusolek (kollane), ei jagata (punane), belief (hall #f3f4f6)",
                "Kõik info-ikoonid sisaldavad NCBI/WHO/Eesti seaduste viiteid"
            ]
        },
        "1.6.4": {
            date: "11.11.2025",
            changes: [
                "PUHASTUS: Eemaldatud emojid koodist (JS ja config failidest)",
                "UUENDUS: README.md v1.2.0 -> v1.6.0 (täielik funktsioonide nimekiri)",
                "PARANDUS: Asendatud emojid tekstiliste märkidega ([!], [OK], [HOIATUS], [RISK])",
                "site-config.js, profile-filter.js, full-profile.js, form-handler.js puhastatud"
            ]
        },
        "1.6.0": {
            date: "11.11.2025",
            changes: [
                "MASSIIVNE PLUS-NUPPUDE LAIENDUS - 6 uut sektsiooni!",
                "ELUPAIK: Plus-nupud (kortermajas, maaelu, linn, öötöö) + quickAddResidence()",
                "LIIKUMINE: Plus-nupud (kõndimine, jalgratas, ujumine, matkamine, rulluisutamine) + quickAddMobility()",
                "KAEBUSED: Plus-nupud üldistele kaebustele (peavalu, liigesevalu, seljavalu, iiveldus, migreen)",
                "NAISTE KAEBUSED: Plus-nupud (menstruaalivalud, PMS, kuumad hood) - nüüd eraldi kategooria!",
                "VANN/SAUN: Plus-nupud (Epsom vann, saun, külm dušš, jalavannikud) + quickAddBath()",
                "MUUSIKA: Plus-nupud (klassikaline, loodushelid, meditatsioon, binauraalsed) + quickAddMusic()",
                "MED_INFO_DB laiendatud 17 uue kirjega (9 kaebust + 4 vann/saun + 4 muusika)",
                "3 uut quickAdd funktsiooni: quickAddComplaint(), quickAddBath(), quickAddMusic()",
                "Visuaalselt eristuvad värvid: kaebused (punane), vann (sinine), muusika (lilla)",
                "Kõik plus-nupud sisaldavad info-ikoone + täpsustus välju",
                "Vorm nüüd kaetud laiemalt plus-nuppude süsteemiga!"
            ]
        },
        "1.5.0": {
            date: "11.11.2025",
            changes: [
                "SUUR UUENDUS: PROFIILIFILTRI SÜSTEEM!",
                "Esimene asi vormis: Rasedus → Vanus → Sugu → Meditsiinilised riskid",
                "Meditsiiniliselt õiged vanusekategooriad (vastsündinu → oldest-old)",
                "Reaalajas hoiatused ja nõuanded vastavalt profiilile",
                "Rasedus aktiveerib automaatselt 'naine' ja näitab ohutusnõuandeid",
                "AF+antikoagulant, eGFR, Child-Pugh jälgimine",
                "Profiilifiltri kokkuvõte (sticky header)",
                "profile-filter.js + CSS stiilid",
                "AI arstile õige järjekord: rasedus → vanus → elundid → koostoimed"
            ]
        },
        "1.4.7": {
            date: "11.11.2025",
            changes: [
                "UUENDUS: Ligipääs terviseallikatele - plus-nupud 5 ressursile (loodustoodete pood, iHerb, TCM/Ayurveda, retseptiravimid, internet)",
                "quickAddAccess() funktsioon",
                "UUENDUS: Perekondlik risk - plus-nupud 4 haigusele (südamehaigused, insult, diabeet, vähk)",
                "quickAddFamilyRisk() funktsioon - kellega ja vanusega",
                "MED_INFO_DB laiendatud 9 kirjega (5 ressursi + 4 perekondliku riski)"
            ]
        },
        "1.4.6": {
            date: "11.11.2025",
            changes: [
                "UUENDUS: Tee liigid - KAHEASTMELINE SÜSTEEM - plus-nupud 7 tee liigile (roheline, must, hibiskus, oolong, valge, matcha, ravimtaimede)",
                "quickAddTeaType() funktsioon - tasside arv ja ajastuse valikuga",
                "UUENDUS: Toitumise piirangud - plus-nupud 5 piirangule (gluteenivaba, piimatoodete vältimine, liha, madal suhkur, madal sool)",
                "quickAddRestriction() funktsioon - põhjuse valikuga (meditsiiniline, allergia, talumatus, eelistus, usundiline, eetiline)",
                "MED_INFO_DB laiendatud 7 tee liigi + 5 piirangu infoga"
            ]
        },
        "1.4.5": {
            date: "11.11.2025",
            changes: [
                "UUENDUS: Eluviis ja transport - plus-nupud 6 transpordiliigile (auto, ühistransport, rattaga tööle, jalutades tööle, tööreisid, rahvusvaheline reis)",
                "MED_INFO_DB laiendatud eluviisi faktorite infoga",
                "quickAddLifestyle() funktsioon",
                "Eluviisi sektsioon struktureeritud: transport + põhiline elupaik"
            ]
        },
        "1.4.4": {
            date: "11.11.2025",
            changes: [
                "UUENDUS: Füüsiline aktiivsus - plus-nupud 8 tegevusele (jalutamine, jooksmine, ujumine, rattasõit, jõusaal, jooga, aeroobika, tants)",
                "MED_INFO_DB laiendatud aktiivsuse infoga",
                "quickAddActivity() funktsioon - sagedus ja kestus väljadega",
                "Aktiivsuse sektsioon struktureeritud: tegevused + üldine tase"
            ]
        },
        "1.4.3": {
            date: "11.11.2025",
            changes: [
                "UUENDUS: Tööriistad - kiirvaliku nupud (vererõhumõõtja, sammulugeja, kaal)",
                "'Kõik kolm' nupp - valib kõik tööriistad korraga",
                "selectTool() ja selectAllTools() funktsioonid"
            ]
        },
        "1.4.2": {
            date: "11.11.2025",
            changes: [
                "UUENDUS: Koormustaluvus - plus-nupud töötüüpidele (mesatöö, öövalvur, istutöö, ehitustöö, hooldus, transport)",
                "MED_INFO_DB laiendatud 6 töötüübi infoga",
                "Koormustaluvuse sektsioon struktureeritud: tööd + kõnnitempo"
            ]
        },
        "1.4.1": {
            date: "11.01.2025",
            changes: [
                "PARANDUS: Docs path - nüüd näitab õigeid faile (ARCHITECTURE, DEVELOPMENT, FILE-GUIDE)",
                "Versiooniinfo parandatud footerisse",
                "Plus-nuppude süsteem laiendamine (järgmistes versioonides)"
            ]
        },
        "1.4.0": {
            date: "11.01.2025",
            changes: [
                "SUUR UUENDUS: Plus-nuppude süsteem levinumatele valikutele",
                "Info ikoonid (i) - hover popup + klikk avab modal detailse infoga",
                "Inline 'Lisa info' väljad iga valiku juurde täpsustusteks",
                "Meditsiini info andmebaas (20+ elementi: taimed, sündmused, allergiad, praktikad)",
                "Refaktoritud: Taimed, Sündmused, Allergiad, Praktikad sektsioonid",
                "Profiili import/export funktsioon (JSON)",
                "Tööriistad compact view - parameetrid peidetakse kui 'Puudub'"
            ]
        },
        "1.3.0": {
            date: "10.01.2025",
            changes: [
                "Menüü liitmine: sektsioonid 7 ja 16 üheks",
                "AI prompt parandused (custom fields, kaebused)",
                "Kaebuste lisamine dünaamiliselt",
                "Koormustaluvuse kirjeldus",
                "'Lisa ravim' nupu tekst",
                "24h kellaformaat",
                "Salvestamise ajatempel"
            ]
        }
    },

    // Dokumendifailide asukohad
    docs: {
        architecture: "../docs/ARCHITECTURE.md",
        development: "../docs/DEVELOPMENT.md",
        fileGuide: "../docs/FILE-GUIDE.md"
    },

    // Lisalinkide sektsioon
    links: [
        {
            url: "https://arvutiministeerium.ee/mediportaal/profiilja/vana-v2/index.html",
            description: "Vana versioon v2 (arhiiv)"
        },
        {
            url: "https://github.com/LuureAmet/Eesti",
            description: "GitHub repositoorium"
        },
        {
            url: "https://claude.ai",
            description: "Claude AI (konsultatsioonid)"
        }
        // Lisa siia juurde uusi linke järgmises formaadis:
        // { url: "https://...", description: "Kirjeldus..." }
    ],

    // AI prompt ekspordi sektsioonid (checkboxidega)
    promptSections: [
        { id: "profile", label: "Profiiliandmed", default: true },
        { id: "symptoms", label: "Sümptomid ja kaebused", default: true },
        { id: "measurements", label: "Mõõtmised (BP, pulss, kaal)", default: true },
        { id: "history", label: "Haigusloo kokkuvõte", default: true },
        { id: "medications", label: "Ravimid", default: true },
        { id: "herbal", label: "Taimravi", default: true },
        { id: "nutrition", label: "Toitumine", default: true },
        { id: "physical", label: "Füüsiline aktiivsus", default: true },
        { id: "breathing", label: "Hingamistehnikad", default: true },
        { id: "meditation", label: "Meditatsioon", default: true },
        { id: "ideology", label: "Maailmavaade/usk", default: false },
        { id: "resources", label: "Ressursid", default: true },
        { id: "risks", label: "Riskifaktorid", default: true },
        { id: "diagnostics", label: "Diagnostika soovitused", default: true },
        { id: "decisionTree", label: "Otsustuspuu", default: false },
        { id: "plans", label: "Raviplaan", default: true },
        { id: "menu", label: "Menüüsoovitused", default: false },
        { id: "package", label: "Pakett-valikud", default: false }
    ]
};

// Export kui kasutatakse module süsteemi
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}
