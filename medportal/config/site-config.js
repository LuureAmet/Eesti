// VERSION: 1.2.0 - 2025-01-09
// PORTAALI GLOBAALNE KONFIGURATSIOON
// ===========================================

const SITE_CONFIG = {
    version: "1.2.0",
    date: "09.11.2025",

    // README ja ROADMAP failide asukohad
    docs: {
        readme: "../README.md",
        roadmap: "../ROADMAP.md"
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
