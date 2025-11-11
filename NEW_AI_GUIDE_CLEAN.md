# JUHIS UUELE AI-LE (PUHAS - ILMA SÜMBOLITA)

Kuupäev: 11.11.2025, 23:30
Projekt: Meigo Medical Medisiiniportaal
Praegune versioon: v1.6.0
Branch: claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy

---

## 1. ÕIGE BRANCH

KRIITILISELT TÄHTIS!

git checkout claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy

Sessiooni ID peab klappima: 011CV2fuMh1DnJY8Zugym2oy

Muidu push ebaõnnestub 403 erroriga!

---

## 2. MIS ON VALMIS? (v1.6.0)

PÕHIFUNKTSIOONID:
- 3 vormi tüüpi (Kiir, Täis, Päevalogi)
- 18-sektsiooniline täisprofiil
- TXT/JSON/CSV/AI prompt eksport
- localStorage salvestus
- Responsive disain

PLUS-NUPPUDE SÜSTEEM (v1.4.0 kuni v1.6.0):
- Taimed (viirpuu, arjuna, hibiskus, ...)
- Sündmused (COVID, trauma, operatsioon, ...)
- Allergiad (õietolm, kodutolm, ...)
- Kehalised praktikad (jooga, Tai Chi, hingamine, ...)
- Füüsiline aktiivsus (jalutamine, ujumine, rattasõit, ...)
- Koormustaluvus (metsatöö, öövalvur, istutöö, ...)
- Eluviis/transport (auto, ühistransport, tööreisid, ...)
- Tee liigid (roheline, must, hibiskus, ...)
- Toitumise piirangud (gluteenivaba, piimatoodete vältim, ...)
- Ligipääs ressursidele (loodustoodete pood, iHerb, ...)
- Perekondlik risk (südamehaigused, diabeet, vähk, ...)
- Elupaik (v1.6.0 - kortermajas, maaelu, öötöö, ...)
- Liikumine (v1.6.0 - kõndimine, jalgratas, ujumine, ...)
- Kaebused (v1.6.0 - peavalu, seljavalu, iiveldus, ...)
- Naiste kaebused (v1.6.0 - menstruaalivalud, PMS, ...)
- Vann/Saun (v1.6.0 - Epsom vann, saun, külm dušš, ...)
- Muusika (v1.6.0 - klassikaline, meditatsioon, binauraalsed, ...)

KOKKU PLUS-NUPPE: umbes 50+
MED_INFO_DB kirjeid: 50+
quickAdd funktsioonid: 9

INFO SÜSTEEM (v1.4.0+):
- MED_INFO_DB - 50+ elementi meditsiinilist infot
- Info ikoonid (i) - hover popup + klikk avab modali
- Inline 'Lisa info' väljad - täpsustusteks

PROFIILIFILTRI SÜSTEEM (v1.5.0):
- Rasedus -> aktiveerib 'naine' ja näitab ohutusnõuandeid
- Vanus -> meditsiiniliselt õiged kategooriad (vastsündinu -> oldest-old)
- Sugu -> mees / naine / muu
- Meditsiinilised riskid -> AF+antikoagulant, eGFR, Child-Pugh
- Reaalajas hoiatused vastavalt profiilile
- Sticky header profiilikokkuvõttega

---

## 3. MIS ON PLAANIS? (v1.7 kuni v2.0)

v1.7 - JÄRGMINE (2-3 nädalat):
- Drag-drop prioriteedid
- Kompaktne vs laiendatud vaade
- "Ei soovi" kiirkast (röntgen, vaktsiinid, opioidid)
- AI prompt 2-osaline (kokkuvõte + täisprofiil)

v1.8 - DATABASE (1-2 kuud):
- PHP backend (SQLite / MySQL)
- Kasutajakontod
- Server-side PDF genereerimine

v2.0 - AI INTEGRATSIOON (2-3 kuud):
- Claude API / OpenAI API
- Vastuste salvestus
- Koostoime kontroll

---

## 4. FAILIDE STRUKTUUR

/home/user/Eesti/                                    ROOT (GitHub: LuureAmet/Eesti)

medportal/                                          MEIE TÖÖ! (v1.6.0)
├── index.html                                      Landing page
├── forms/
│   ├── quick-profile.html                          Kiirprofiil (5 min)
│   ├── full-profile.html                           Täisprofiil (30 min, 18 sektsiooni)
│   └── daily-log.html                              Päevalogi (2 min)
├── css/
│   ├── style.css                                   Põhistiilid
│   └── forms.css                                   Vormide stiilid
├── js/
│   ├── form-handler.js                             Üldised funktsioonid
│   ├── full-profile.js                             Täisprofiili loogika + quickAdd funktsioonid
│   ├── info-system.js                              (1863 RIDA! MED_INFO_DB 50+ kirjet)
│   ├── profile-filter.js                           (294 RIDA! Profiilifiltri süsteem)
│   ├── quick-profile.js                            Kiirprofiili eksport
│   ├── daily-log.js                                Päevalogi CSV
│   ├── tooltips.js                                 Tooltip süsteem
│   ├── custom-fields.js                            Dünaamilised lisaväljad
│   ├── tags-input.js                               Mitmikvalikud (komaga/Enteriga)
│   └── docs-and-links.js                           VERSION badge + README/ROADMAP
├── config/
│   └── site-config.js                              VERSIOON, CHANGELOG, LINGID
├── docs/
│   ├── ARCHITECTURE.md                             (420 RIDA! Tehniline arhitektuur)
│   ├── DEVELOPMENT.md                              (696 RIDA! Arendajale juhised)
│   └── FILE-GUIDE.md                               (858 RIDA! Failide selgitused)
├── data/
│   └── tooltips.json                               Abitekstid väljadele
├── archive/                                        ARHIIV (vana ajalugu)
│   ├── v1.0.0/
│   │   ├── README_v1.0.0.md
│   │   └── ROADMAP_v1.0.0.md
│   ├── v1.2.0/
│   │   ├── README_v1.2.0.md
│   │   └── ROADMAP_v1.2.0.md
│   └── ...
├── README.md                                        LOE ESMALT! (praegune v1.6.0)
├── ROADMAP.md                                       ARENDUSPLAAN (v1.6 -> v2.0)
├── README-v1.0.md                                   Vana README (arhiiv)
└── ROADMAP-v1.0.md                                  Vana ROADMAP (arhiiv)

Eesti/                                              TEINE PROJEKT (Codex jms) - ÄRA PUUTU!
└── Medical/                                        Vanad teksti failid (arhiiv)

Medical/                                             TÜHI (.gitkeep) - ÄRA PUUTU!

NEW_AI_GUIDE_CLEAN.md                                SEE FAIL! (LOE!)
START_HERE_UPDATED.md                                LÜHIKE JUHIS
AI_AGENT_COMPREHENSIVE_GUIDE.md                      AEGUNUD (sisaldas emojisid - ÄRA KASUTA!)
NEW_AI_START_HERE.md                                 AEGUNUD (vale branch - ÄRA KASUTA!)
README.md                                            VANA (ainult "# Eesti" - ÄRA PUUTU!)

---

## 5. GIT WORKFLOW

1. Kontrolli branch:
git branch --show-current
(Peab olema: claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy)

2. Pull viimane versioon:
git pull origin claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy

3. Tee muudatused medportal/ kaustas

4. Commit:
git add medportal/
git commit -m "Kirjeldus: mida muutsid"

5. Push:
git push -u origin claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy

TÄHTIS: Sessiooni ID PEAB klappima, muidu push ebaõnnestub 403 erroriga!

---

## 6. ARHIVEERIMISE JUHISED

OLULINE: ÄRA KUNAGI KUSTUTA!

ALATI arhiveeri, EI KUNAGI kustuta!

Kuidas arhiveerida dokumente (README, ROADMAP):

mkdir -p medportal/archive/v1.X.X/
cp medportal/README.md medportal/archive/v1.X.X/README_v1.X.X.md
cp medportal/ROADMAP.md medportal/archive/v1.X.X/ROADMAP_v1.X.X.md

SEEJÄREL uuenda põhifaile
Ära kunagi kustuta vanu versioone!

Kuidas arhiveerida koodi (HTML/CSS/JS):

Kui teed SUURE muudatuse koodis:
cp medportal/js/full-profile.js medportal/archive/v1.X.X/full-profile_v1.X.X.js

Tee muudatused põhifailis
Vana versioon jääb arhiivi!

Git commit'id on AUTOMAATNE arhiiv:
git log --oneline
git show <commit-hash>
git checkout <commit-hash> -- <file>

---

## 7. AJALUGU TAGASI TOOMINE

Kuidas vaadata vana versiooni:

VARIANT A: Arhiivist
cat medportal/archive/v1.2.0/README_v1.2.0.md

VARIANT B: Git ajalugu
git log --oneline medportal/README.md
git show <commit-hash>:medportal/README.md

Kuidas taastada vana versioon:

ARHIIVIST:
cp medportal/archive/v1.2.0/README_v1.2.0.md medportal/README.md

GIT-IST:
git checkout <commit-hash> -- medportal/README.md

Seejärel commit uus muudatus:
git add medportal/README.md
git commit -m "Taasta README v1.2.0 versioon (parem kui v1.6.0)"

---

## 8. ÄRA KUNAGI KUSTUTA

Mida EI TOHI kustutada:

[X] Arhiivi kaust (medportal/archive/)
[X] Vanad versioonid (README_v1.X.X.md, ROADMAP_v1.X.X.md)
[X] Git commit'id (ära tee git reset --hard ilma kindlaks olemata!)
[X] Vana kood (enne kustutamist, arhiveeri!)

Mis juhtub, kui kogemata kustutad:

Git PÄÄSAB SIND!

git checkout HEAD -- <file>
git revert <commit-hash>
git reflog
git checkout <reflog-hash>

Mis on OK kustutada:

[OK] Temp failid (test.html, debug.log)
[OK] node_modules/ (kui installiksid npm pakette)
[OK] .DS_Store (Mac failid)
[OK] Thumbs.db (Windows failid)

ENNE KUSTUTAMIST, KÜSI KASUTAJALT!

---

## 9. VERSIOONIDE HALDAMINE

Kasutame Semantic Versioning (SemVer):

MAJOR.MINOR.PATCH
  1  .  6  .  0

MAJOR (1.x.x): Suured muudatused, breaking changes
MINOR (x.6.x): Uued funktsioonid, plus-nupud, sektsioonid
PATCH (x.x.0): Bugfixid, väikesed parandused

Kus versiooni uuendada:

ESMALT: medportal/config/site-config.js

const SITE_CONFIG = {
    version: "1.6.0",
    date: "11.11.2025",
    buildTime: "2025-11-11 22:30",
    changelog: {
        "1.6.0": {
            date: "11.11.2025",
            changes: [
                "Kirjeldus 1",
                "Kirjeldus 2"
            ]
        }
    }
}

SEEJÄREL: Uuenda README.md ja ROADMAP.md

---

## 10. KIIRKONTROLL

Kui sa ei ole kindel, KUS sa oled:

1. Kontrolli branch:
git branch --show-current
(Peab olema: claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy)

2. Kontrolli versioon:
cat medportal/config/site-config.js | grep "version:"
(Peab olema: version: "1.6.0")

3. Kontrolli, et oled õiges kaustas:
ls medportal/
(Peab näitama: index.html, forms/, css/, js/, config/, docs/, archive/)

4. Loe README:
cat medportal/README.md | head -10
(Peab algama: "# Meigo Medical Medisiiniportaal")

Kui miski ei klapi -> KÜSI KASUTAJALT!

---

## 11. TÄHTIS MEELDETULETUS

1. ÄRA KUNAGI KUSTUTA - alati arhiveeri!
2. ÄRA TÖÖ VALES BRANCHIS - kontrolli sessiooni ID-d!
3. ÄRA PUUTU TEISI PROJEKTE (Eesti/, Medical/)
4. LOE ESMALT - README.md, ROADMAP.md, ARCHITECTURE.md
5. KÜSI, KUI POLE KINDEL - parem küsida kui midagi katki teha!

---

HEAD TÖÖD!

P.S. Kui sa oled uus AI ja alustad sessiooni:
1. Loe see fail TÄIELIKULT
2. Kontrolli branch (git branch --show-current)
3. Loe medportal/README.md
4. Loe medportal/ROADMAP.md
5. Küsi kasutajalt, mida teha

ÄRA MINE JUHUSLIKULT FAILE MUUTMA - ASK FIRST!

---

Meigo Medical Medisiiniportaal | Juhis uuele AI-le v1.0 (PUHAS)
