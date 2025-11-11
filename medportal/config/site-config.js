// VERSION: 1.4.1 - 2025-01-11
// PORTAALI GLOBAALNE KONFIGURATSIOON
// ===========================================

const SITE_CONFIG = {
    version: "1.4.1",
    date: "11.01.2025",
    buildTime: "2025-01-11 16:15",

    // Versioonimärkmed
    changelog: {
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
