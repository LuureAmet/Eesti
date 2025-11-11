# 🤖 AI AGENT COMPREHENSIVE GUIDE

**Kuupäev:** 11.11.2025, 23:00
**Projekt:** Meigo Medical Medisiiniportaal
**Praegune versioon:** v1.6.0
**Branch:** `claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy`

---

## 📚 SISUKORD

1. [KIIR-ÜLEVAADE](#kiir-ülevaade)
2. [TÄIELIK AJALUGU (v1.0 → v1.6.0)](#täielik-ajalugu)
3. [TULEVIKU PLAANID (v1.7 → v2.0)](#tuleviku-plaanid)
4. [BRANCH'IDE SÜSTEEM](#branchide-süsteem)
5. [VERSIOONIDE HALDAMINE](#versioonide-haldamine)
6. [ARHIVEERIMISE JUHISED](#arhiveerimise-juhised)
7. [AJALUGU TAGASI TOOMINE](#ajalugu-tagasi-toomine)
8. [ÄRA KUNAGI KUSTUTA](#ära-kunagi-kustuta)
9. [GIT WORKFLOW](#git-workflow)
10. [FAILIDE STRUKTUUR](#failide-struktuur)

---

## 🚀 KIIR-ÜLEVAADE

### Mis on see projekt?

**Meigo Medical Medisiiniportaal** - holistiline terviseprofiili koostamise süsteem.

Patsiendid saavad:
- Täita 3 tüüpi vorme (Kiir, Täis, Päevalogi)
- Koguda põhjalikku meditsiinilist infot (18 sektsiooni)
- Eksportida TXT/JSON/CSV/AI prompt formaadis
- Salvestada draft'e localStorage'is
- Genereerida AI-le valmis prompte (kohandatav)

### Praegune seis (v1.6.0)

✅ **VALMIS:**
- 3 vormi tüüpi
- 18-sektsiooniline täisprofiil
- **PLUS-NUPPUDE SÜSTEEM** - 50+ pluss-nuppu levinumatele valikutele
- **INFO SÜSTEEM** - MED_INFO_DB (50+ kirjet meditsiinilist infot)
- **PROFIILIFILTRI SÜSTEEM** - rasedus/vanus/sugu/riskid
- localStorage salvestus
- Responsive disain
- TXT/JSON/CSV/AI prompt eksport

🔄 **PLAANIS (v1.7+):**
- Drag-drop prioriteedid
- Kompaktne/laiendatud vaade
- Database (SQLite/MySQL)
- AI integratsioon (Claude/OpenAI API)

---

## 📜 TÄIELIK AJALUGU (v1.0 → v1.6.0)

### v1.0.0 (09.11.2025) - ALGUS

**Põhifunktsioonid:**
- [x] 3 vormi tüüpi (Kiir, Täis, Päevalogi)
- [x] 18-sektsiooniline täisprofiil
- [x] TXT/JSON eksport
- [x] AI prompt genereerimine
- [x] localStorage salvestus (draft'id)
- [x] Progress tracking
- [x] Responsive disain
- [x] Dünaamilised tabelid (ravimid)
- [x] Validatsioon
- [x] Päevalogi CSV eksport

**Tehniline stack:**
- HTML5 vormid
- CSS3 (responsive)
- Vanilla JavaScript (ei vaja framework'e)
- localStorage API
- 100% client-side (ei vaja serverit)

---

### v1.1.0 (09.11.2025) - KOHANDATUD VÄLJAD

**Uuendused:**
- [x] Kohandatud väljad (lisa Number/Date/Text välju ise)
- [x] VERSION badge paremal ülal nurgas
- [x] README/ROADMAP lehe lõpus (expandable)

---

### v1.2.0 (10.11.2025) - UX TÄIUSTUSED

**UX parendused:**
- [x] Toast teated (ilma alert-ideta) - smooth UI
- [x] Number/Date lisaväljad (parandatud, nüüd töötavad)
- [x] Klikitavad kaardid (kogu kaart, mitte ainult nupp)
- [x] Tags input (komaga/Enteriga mitmikvalikud)
- [x] VERSION badge täiustatud

**AI täiustused:**
- [x] Prompt redaktor 18 checkboxiga (vali sektsioone)
- [x] Live preview promptist
- [x] Vali kõik / Tühista kõik / Taasta vaikeväärtused
- [x] Kopeeri või lae alla TXT

**Konfigureeritav:**
- [x] Kõik lingid `config/site-config.js` failis
- [x] Prompt sektsioonid config-is
- [x] README/ROADMAP teed konfigureeritavad

---

### v1.3.0 (10.01.2025) - VÄIKESED PARANDUSED

**Parandused:**
- [x] Menüü liitmine (sektsioonid 7 ja 16 → üks)
- [x] AI prompt parandused (custom fields, kaebused)
- [x] Kaebuste lisamine dünaamiliselt
- [x] Koormustaluvuse kirjeldus
- [x] 'Lisa ravim' nupu tekst
- [x] 24h kellaformaat
- [x] Salvestamise ajatempel

---

### v1.4.0 (11.01.2025) - SUUR UUENDUS: PLUS-NUPUD!

**MASSIIVNE LAIENDUS: Plus-nuppude süsteem**

**Uued funktsioonid:**
- [x] **Plus-nupud levinumatele valikutele** (kiirvaliku süsteem)
- [x] **Info ikoonid (ℹ️)** - hover popup + klikk avab modal detailse infoga
- [x] **Inline 'Lisa info' väljad** iga valiku juurde täpsustusteks
- [x] **Meditsiini info andmebaas (MED_INFO_DB)** - 20+ elementi esialgu

**Refaktoritud sektsioonid:**
- [x] **Taimed** - viirpuu, arjuna, hibiskus, lõunamaa kuldvits, boswellia, ginkgo biloba, hawthorn, celery seed, dandelion, turmeric
- [x] **Sündmused** - COVID, süda operatsioon, trauma, elukoha vahetus, töö vahetus
- [x] **Allergiad** - õietolm, kodutolm, kõrrelised, hallitus, lemmikloomad
- [x] **Kehalised praktikad** - jooga, Tai Chi, hingamine (4-7-8, Wim Hof), Qi Gong

**Muud:**
- [x] Profiili import/export JSON-ina
- [x] Tööriistad compact view (parameetrid peidetakse kui 'Puudub')

**Failid:**
- `js/info-system.js` - MED_INFO_DB + modal süsteem
- `css/forms.css` - info-icon, modal, plus-button stiilid

---

### v1.4.1 (11.01.2025) - DOCS PATH PARANDUS

**Parandused:**
- [x] Docs path parandatud (näitab õigeid faile: ARCHITECTURE, DEVELOPMENT, FILE-GUIDE)
- [x] Versiooniinfo footerisse
- [x] Plus-nuppude süsteem edasi laiendatakse

---

### v1.4.2 (11.11.2025) - KOORMUSTALUVUS

**Uuendus:**
- [x] **Koormustaluvus** - plus-nupud 6 töötüübile:
  - Metsatöö, Öövalvur, Istutöö, Ehitustöö, Hooldus, Transport
- [x] MED_INFO_DB laiendatud 6 töötüübi infoga
- [x] Koormustaluvuse sektsioon struktureeritud: tööd + kõnnitempo

**Failid uuendatud:**
- `js/info-system.js` - +6 kirjet
- `forms/full-profile.html` - Koormustaluvus sektsiooni uus struktuur

---

### v1.4.3 (11.11.2025) - TÖÖRIISTAD KIIRVALIK

**Uuendus:**
- [x] **Tööriistad** - kiirvaliku nupud:
  - Vererõhumõõtja, Sammulugeja, Kaal
  - **'Kõik kolm' nupp** - valib kõik tööriistad korraga
- [x] `selectTool()` ja `selectAllTools()` funktsioonid

**Failid uuendatud:**
- `js/full-profile.js` - tööriistad kiirvalikud

---

### v1.4.4 (11.11.2025) - FÜÜSILINE AKTIIVSUS

**Uuendus:**
- [x] **Füüsiline aktiivsus** - plus-nupud 8 tegevusele:
  - Jalutamine, Jooksmine, Ujumine, Rattasõit, Jõusaal, Jooga, Aeroobika, Tants
- [x] MED_INFO_DB laiendatud aktiivsuse infoga
- [x] `quickAddActivity()` funktsioon - sagedus ja kestus väljadega
- [x] Aktiivsuse sektsioon struktureeritud: tegevused + üldine tase

**Failid uuendatud:**
- `js/info-system.js` - +8 kirjet
- `js/full-profile.js` - quickAddActivity()
- `forms/full-profile.html` - Füüsilise aktiivsuse sektsioon

---

### v1.4.5 (11.11.2025) - ELUVIIS JA TRANSPORT

**Uuendus:**
- [x] **Eluviis ja transport** - plus-nupud 6 transpordiliigile:
  - Auto, Ühistransport, Rattaga tööle, Jalutades tööle, Tööreisid, Rahvusvaheline reis
- [x] MED_INFO_DB laiendatud eluviisi faktorite infoga
- [x] `quickAddLifestyle()` funktsioon
- [x] Eluviisi sektsioon struktureeritud: transport + põhiline elupaik

**Failid uuendatud:**
- `js/info-system.js` - +6 kirjet
- `js/full-profile.js` - quickAddLifestyle()
- `forms/full-profile.html` - Eluviis sektsioon

---

### v1.4.6 (11.11.2025) - TEE LIIGID + TOITUMISE PIIRANGUD

**Uuendus:**
- [x] **Tee liigid** - KAHEASTMELINE SÜSTEEM - plus-nupud 7 tee liigile:
  - Roheline, Must, Hibiskus, Oolong, Valge, Matcha, Ravimtaimede
- [x] `quickAddTeaType()` funktsioon - tasside arv ja ajastuse valikuga
- [x] **Toitumise piirangud** - plus-nupud 5 piirangule:
  - Gluteenivaba, Piimatoodete vältimine, Liha, Madal suhkur, Madal sool
- [x] `quickAddRestriction()` funktsioon - põhjuse valikuga:
  - Meditsiiniline, Allergia, Talumatus, Eelistus, Usundiline, Eetiline
- [x] MED_INFO_DB laiendatud 7 tee liigi + 5 piirangu infoga

**Failid uuendatud:**
- `js/info-system.js` - +12 kirjet
- `js/full-profile.js` - quickAddTeaType(), quickAddRestriction()
- `forms/full-profile.html` - Tee + Toitumise sektsioonid

---

### v1.4.7 (11.11.2025) - LIGIPÄÄS + PEREKONDLIK RISK

**Uuendus:**
- [x] **Ligipääs terviseallikatele** - plus-nupud 5 ressursile:
  - Loodustoodete pood, iHerb, TCM/Ayurveda praktik, Retseptiravimid (apteek), Internet
- [x] `quickAddAccess()` funktsioon
- [x] **Perekondlik risk** - plus-nupud 4 haigusele:
  - Südamehaigused, Insult, Diabeet, Vähk
- [x] `quickAddFamilyRisk()` funktsioon - kellega (isa/ema/õde/vend) ja vanusega
- [x] MED_INFO_DB laiendatud 9 kirjega (5 ressursi + 4 perekondliku riski)

**Failid uuendatud:**
- `js/info-system.js` - +9 kirjet
- `js/full-profile.js` - quickAddAccess(), quickAddFamilyRisk()
- `forms/full-profile.html` - Ressursid + Riskid sektsioonid

---

### v1.5.0 (11.11.2025) - 🎯 SUUR UUENDUS: PROFIILIFILTRI SÜSTEEM!

**MASSIIVNE UUENDUS:**

Vorm alustab nüüd profiilifiltriga:
1. **Rasedus** → aktiveerib automaatselt 'naine' ja näitab ohutusnõuandeid
2. **Vanus** → meditsiiniliselt õiged kategooriad:
   - Vastsündinu (0-28 päeva)
   - Imik (29 päeva - 1 aasta)
   - Väikelaps (1-5 aastat)
   - Laps (6-12 aastat)
   - Nooruk (13-18 aastat)
   - Noor täiskasvanu (19-39 aastat)
   - Keskiga (40-64 aastat)
   - Eakas (65-74 aastat)
   - Vanem eakas (75-84 aastat)
   - Oldest-old (85+ aastat)
3. **Sugu** → mees | naine | muu
4. **Meditsiinilised riskid:**
   - AF + antikoagulant (hoiatus: veritsusrisk!)
   - eGFR <30 (hoiatus: neerufunktsiooni langus!)
   - Child-Pugh B/C (hoiatus: maksafunktsiooni langus!)

**Funktsioonid:**
- [x] Reaalajas hoiatused ja nõuanded vastavalt profiilile
- [x] Profiilifiltri kokkuvõte (sticky header) vormi peal
- [x] AI arstile õige järjekord: rasedus → vanus → elundid → koostoimed

**Failid:**
- `js/profile-filter.js` - 294 rida! Kogu filtri loogika
- `css/forms.css` - sticky header + hoiatuste stiilid
- `forms/full-profile.html` - Profiilifiltri sektsiooni integratsioon

---

### v1.6.0 (11.11.2025, 22:30) - ✨ MASSIIVNE PLUS-NUPPUDE LAIENDUS!

**6 UUT SEKTSIOONI:**

1. **📍 ELUPAIK:**
   - Plus-nupud: Kortermajas, Maaelu, Linn, Öötöö
   - `quickAddResidence()` funktsioon

2. **🚶 LIIKUMINE:**
   - Plus-nupud: Kõndimine, Jalgratas, Ujumine, Matkamine, Rulluisutamine
   - `quickAddMobility()` funktsioon

3. **🤕 KAEBUSED (üldised):**
   - Plus-nupud: Peavalu, Liigesevalu, Seljavalu, Iiveldus, Migreen
   - Iga kaebuse juurde: 0-3 skaalal (puudub | kerge | mõõdukas | raske)

4. **👩 NAISTE KAEBUSED:**
   - Plus-nupud: Menstruaalivalud, PMS, Kuumad hood
   - Eraldi kategooria (varem oli üldiste all)

5. **🛁 VANN/SAUN:**
   - Plus-nupud: Epsom vann, Saun, Külm dušš, Jalavannikud
   - `quickAddBath()` funktsioon

6. **🎵 MUUSIKA:**
   - Plus-nupud: Klassikaline, Loodushelid, Meditatsioon, Binauraalsed
   - `quickAddMusic()` funktsioon

**MED_INFO_DB laiendatud 17 uue kirjega:**
- 9 kaebust (peavalu, liigesevalu, seljavalu, iiveldus, migreen, menstruaalivalud, PMS, kuumad hood, väsimus)
- 4 vann/saun (Epsom vann, saun, külm dušš, jalavannikud)
- 4 muusika (klassikaline, loodushelid, meditatsioon, binauraalsed)

**Visuaalselt eristuvad värvid:**
- Kaebused: punane (#dc3545)
- Vann: sinine (#0dcaf0)
- Muusika: lilla (#d63384)

**Kõik plus-nupud sisaldavad:**
- Info-ikoone (ℹ️) - hover popup + klikk modal
- Täpsustus välju (textarea "Lisa info")

**Statistika:**
- **KOKKU PLUS-NUPPE:** ~50+ (kõigis sektsioonides!)
- **MED_INFO_DB kirjeid:** 50+
- **quickAdd funktsioonid:** 9

**Failid uuendatud:**
- `js/info-system.js` - +17 kirjet (KOKKU 1863 rida!)
- `js/full-profile.js` - +3 uut quickAdd funktsiooni
- `forms/full-profile.html` - 6 uut sektsiooni
- `config/site-config.js` - changelog uuendatud

---

## 🚀 TULEVIKU PLAANID (v1.7 → v2.0)

### v1.7 (JÄRGMINE - plaanis 2-3 nädalat)

**Kasutajakogemus:**
- [ ] **Drag-and-drop prioriteedid**
  - Ideoloogia/piirjooned järjestamine
  - "Tugevalt eelistatud" / "Hoiduda" märkeruudud

- [ ] **Kompaktne vs laiendatud vaade**
  - Toggle nupp: Compact | Expanded
  - Kompaktne peidab abitekstid, vähendab padding'uid
  - Laiendatud näitab seletusi

- [ ] **"Ei soovi" kiirkast üleval**
  - Checkboxid: Röntgen, Süsteemsed vaktsiinid, Opioidid jne
  - Plussiga lisamine

- [ ] **Mitmikvalikud rohkematele väljadele**
  - "Meeldib/Ei meeldi" toitude jaoks
  - Aktiivsus (mitu tüüpi korraga)

- [ ] **Salvestuse kellaaeg**
  - Timestamp koos kuupäevaga
  - Näita viimati salvestatud: "Uuendatud 11.11.2025 15:30"

**AI Prompt täiustused:**
- [ ] **2-osaline eksport**
  - Osa 1: AI kokkuvõte (lühike, 200-300 sõna)
  - Osa 2: Täisprofiil (JSON + renderitud tekst)
  - Checkbox: "Lisa AI kokkuvõte algusesse"

- [ ] **Prompt template valik**
  - Kardiooloogia fookus
  - Ennetusprofiil
  - Postoperatiivne
  - Üldine holistiline

---

### v1.8 (DATABASE - plaanis 1-2 kuud)

**Server-side funktsioonid:**
- [ ] **PHP backend**
  - SQLite (lihtne start) VÕI MySQL (kui vaja)
  - API endpoints: `/api/save`, `/api/load`, `/api/export`

- [ ] **Kasutajakontod (optional)**
  - Login/Register (lihtne, ilma OAuth-ita esmalt)
  - Salvesta mitu profiili
  - Jagamise lingid (unique URL)

- [ ] **Eksport server-side**
  - PDF genereerimine jsPDF-ga
  - Email saatmine (PDF attach)

**Database skeem:**
```sql
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    version TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    data JSON
);

CREATE TABLE drafts (
    id INTEGER PRIMARY KEY,
    profile_id INTEGER,
    form_type TEXT,
    data JSON,
    saved_at DATETIME
);
```

---

### v1.9 (AI INTEGRATSIOON - plaanis 2-3 kuud)

**Cloud AI:**
- [ ] **API calls**
  - Claude API
  - OpenAI API
  - Kohalik LLaMA (optional)

- [ ] **Vastuste salvestus**
  - AI vastus koos promptiga
  - Versiooni tracking (milline AI, millal)
  - Võrdlus: erinevate AI-de vastused samale profillile

- [ ] **Soovituste filter**
  - Checkbox: "Näita ainult looduslikke"
  - Checkbox: "Peida ideoloogia"
  - Priority: Rütm | Energia | Turse/hingamine

**AI-põhine analüüs:**
- [ ] **Koostoime kontroll**
  - Ravimite vs taimravi
  - Automaatsed hoiatused (punased lipud)

- [ ] **Personaliseeritud päevaplaan**
  - Variant A: Miinimum Busy (12-15 min)
  - Variant B: Tavatase (30-45 min)
  - Variant C: Põhjalik (60+ min)

---

### v2.0 (PROFESSIONAALNE - plaanis 3-6 kuud)

**Arstidele:**
- [ ] **Admin paneel**
  - Pakettide haldamine
  - Soovituste tuunimine
  - Patsientide nimekiri

- [ ] **Template süsteem**
  - Südamehaigused 50+ a
  - Südamehaigused 65+ a
  - Ennetusprofiil 30-50 a
  - Postoperatiivne recovery

**Laiendused:**
- [ ] **Ravimite andmebaas**
  - Autotäitmine
  - Koostoimete kontroll
  - Hinna võrdlus (Eesti apteegid)

- [ ] **Taimede andmebaas**
  - Ladina nimed
  - Annused
  - Koostoimete reeglid
  - Kust osta (EE)

- [ ] **Digilogi integratsioon**
  - Päevane tracking
  - Graafikud (kaal, BP, pulss)
  - CSV/JSON eksport arstile

**Multi-keel:**
- [ ] EST (praegu)
- [ ] ENG
- [ ] RUS

---

## 🌳 BRANCH'IDE SÜSTEEM

### ÕIGE BRANCH (KASUTA SEDA!)

**Branch:** `claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy`

**Sessiooni ID:** `011CV2fuMh1DnJY8Zugym2oy` ← PEAB KLAPPIMA!

**Miks see on ÕIGE?**
- Sessiooni ID klappib praeguse sessiooniga
- Push töötab ✅
- Kogu medportal/ töö on siin

### VALED BRANCH'ID (EI KASUTA!)

❌ **`claude/medical-portal-setup-011CUxmtZU5NRXCwtdEnHnBS`**
- Vale sessiooni ID: `011CUxmtZU5NRXCwtdEnHnBS`
- Push EI TÖÖTA (403 error)
- Oli ajutine töö-branch

❌ **`claude/tundub-m-011CV2eC8r5R7js3i3aRmWxv`**
- MEDIAL projekt (UNI+PRIVAATSUS planeerimise failid)
- EI OLE medportal!
- Planeerimine, MITTE kood

### Branch'ide reeglid

**KRIITILISELT OLULINE:**

```bash
# Branch formaat PEAB olema:
claude/<project>-<session-id>

# Sessiooni ID PEAB klappima praeguse sessiooniga!
# Muidu push ebaõnnestub 403 erroriga!
```

**Näide:**
- ✅ `claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy` ← ÕIGE
- ❌ `claude/medical-portal-setup-011CUxmtZU5NRXCwtdEnHnBS` ← VALE (vana sessiooni ID)

---

## 📦 VERSIOONIDE HALDAMINE

### Versioonide numbrid

Kasutame **Semantic Versioning** (SemVer):

```
MAJOR.MINOR.PATCH
  1  .  6  .  0
```

- **MAJOR** (1.x.x): Suured muudatused, breaking changes
- **MINOR** (x.6.x): Uued funktsioonid, plus-nupud, sektsioonid
- **PATCH** (x.x.0): Bugfixid, väikesed parandused

### Kus versiooni uuendada?

**ESMALT:** `/medportal/config/site-config.js`

```javascript
const SITE_CONFIG = {
    version: "1.6.0",          // ← UU ENDA SEDA!
    date: "11.11.2025",        // ← UU ENDA KUUPÄEVA!
    buildTime: "2025-11-11 22:30",

    changelog: {
        "1.6.0": {             // ← LISA UUS SEKTSIOON!
            date: "11.11.2025",
            changes: [
                "Kirjeldus 1",
                "Kirjeldus 2",
                ...
            ]
        },
        ...
    }
}
```

**SEEJÄREL:** Uuenda README.md ja ROADMAP.md

```bash
# 1. Arhiveeri vanad failid
mkdir -p medportal/archive/v1.6.0/
cp medportal/README.md medportal/archive/v1.6.0/README_v1.6.0.md
cp medportal/ROADMAP.md medportal/archive/v1.6.0/ROADMAP_v1.6.0.md

# 2. Uuenda README.md (esimene rida)
# Meigo Medical Medisiiniportaal v1.7  ← UUENDA!

# 3. Uuenda ROADMAP.md (praegune versioon)
# ## v1.7 - PRAEGU (15.11.2025)  ← UUENDA!
```

---

## 📂 ARHIVEERIMISE JUHISED

### OLULINE: ÄRA KUNAGI KUSTUTA!

**ALATI arhiveeri, EI KUNAGI kustuta!**

### Kuidas arhiveerida?

#### 1. Dokumendid (README, ROADMAP)

```bash
# Loo arhiivi kaust versiooni jaoks
mkdir -p medportal/archive/v1.X.X/

# Kopeeri vanad failid arhiivi
cp medportal/README.md medportal/archive/v1.X.X/README_v1.X.X.md
cp medportal/ROADMAP.md medportal/archive/v1.X.X/ROADMAP_v1.X.X.md

# SEEJÄREL uuenda põhifaile
# Ära kunagi kustuta vanu versioone!
```

#### 2. Kood (HTML/CSS/JS)

```bash
# Kui teed SUURE muudatuse koodis (nt refaktoreerimine):

# Loo koopia ENNE muutmist
cp medportal/js/full-profile.js medportal/archive/v1.X.X/full-profile_v1.X.X.js

# Tee muudatused põhifailis
# Vana versioon jääb arhiivi!
```

#### 3. Git commit'id

```bash
# Git commit'id on AUTOMAATNE arhiiv!
# Sa saad ALATI tagasi minna vana versiooni juurde:

git log --oneline  # Vaata ajalugu
git show <commit-hash>  # Vaata vana koodi
git checkout <commit-hash> -- <file>  # Taasta vana fail
```

### Arhiivi struktuur

```
medportal/
├── archive/
│   ├── v1.0.0/
│   │   ├── README_v1.0.0.md
│   │   └── ROADMAP_v1.0.0.md
│   ├── v1.2.0/
│   │   ├── README_v1.2.0.md
│   │   └── ROADMAP_v1.2.0.md
│   ├── v1.6.0/
│   │   ├── README_v1.6.0.md
│   │   ├── ROADMAP_v1.6.0.md
│   │   └── full-profile_v1.6.0.js (kui vaja)
│   └── ...
├── README.md  ← PRAEGUNE
├── ROADMAP.md  ← PRAEGUNE
└── ...
```

---

## 🔙 AJALUGU TAGASI TOOMINE

### Kuidas vaadata vana versiooni?

#### Variant 1: Arhiivist

```bash
# Vaata arhiveeritud faili
cat medportal/archive/v1.2.0/README_v1.2.0.md

# Võrdle praegusega
diff medportal/README.md medportal/archive/v1.2.0/README_v1.2.0.md
```

#### Variant 2: Git ajalugu

```bash
# Vaata commit'ide ajalugu
git log --oneline medportal/README.md

# Vaata konkreetset vana versiooni
git show <commit-hash>:medportal/README.md

# Võrdle kahe versiooni vahel
git diff <commit-hash-1> <commit-hash-2> medportal/README.md
```

### Kuidas taastada vana versioon?

#### Kui leiad, et vana versioon oli parem:

```bash
# VARIANT A: Arhiivist
cp medportal/archive/v1.2.0/README_v1.2.0.md medportal/README.md

# VARIANT B: Git-ist
git checkout <commit-hash> -- medportal/README.md

# Seejärel commit uus muudatus
git add medportal/README.md
git commit -m "Taasta README v1.2.0 versioon (parem kui v1.6.0)"
```

#### Kui tahad ainult osa vana tekstist:

```bash
# 1. Ava vana fail
cat medportal/archive/v1.2.0/README_v1.2.0.md

# 2. Kopeeri soovitud osa

# 3. Kleebi praegusesse README.md

# 4. Commit
git add medportal/README.md
git commit -m "Lisa tagasi v1.2.0 selgitus XYZ kohta"
```

---

## ⚠️ ÄRA KUNAGI KUSTUTA

### Mida EI TOHI kustutada?

❌ **Arhiivi kaust** (`medportal/archive/`)
❌ **Vanad versioonid** (README_v1.X.X.md, ROADMAP_v1.X.X.md)
❌ **Git commit'id** (ära tee `git reset --hard` ilma kindlaks olemata!)
❌ **Vana kood** (enne kustutamist, arhiveeri!)

### Mis juhtub, kui kogemata kustutad?

**Git PÄÄSAB SIND!**

```bash
# Kui kustutasid faili:
git checkout HEAD -- <file>  # Taasta viimasest commit'ist

# Kui commit'isid kustutamise:
git revert <commit-hash>  # Tühista kustutamine

# Kui teed hard reset:
git reflog  # Vaata ajalugu
git checkout <reflog-hash>  # Mine tagasi
```

### Mis on OK kustutada?

✅ **Temp failid** (ajutised, nt `test.html`, `debug.log`)
✅ **node_modules/** (kui installiksid npm pakette)
✅ **.DS_Store** (Mac failid)
✅ **Thumbs.db** (Windows failid)

**ENNE KUSTUTAMIST, KÜSI KASUTAJALT!**

---

## 🔄 GIT WORKFLOW

### 1. Kontrolli branch

```bash
git branch --show-current
# Peaksid nägema: claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
```

Kui ei ole õigel branchil:
```bash
git checkout claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
```

### 2. Pull viimane versioon

```bash
git pull origin claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
```

### 3. Tee muudatused

```bash
# Kõik muudatused ainult medportal/ kaustas!
cd /home/user/Eesti/medportal/

# ... muuda faile ...
```

### 4. Vaata, mis muutus

```bash
git status
git diff
```

### 5. Commit

```bash
git add medportal/

git commit -m "$(cat <<'EOF'
feat: Lisa uus funktsioon X

UUED FUNKTSIOONID:
- Funktsioon 1
- Funktsioon 2

FAILID UUENDATUD:
- medportal/js/full-profile.js
- medportal/forms/full-profile.html

Versioon: v1.7.0
EOF
)"
```

**Commit message formaat:**

```
<type>: <lühike kirjeldus>

<pikk kirjeldus>

UUED FUNKTSIOONID / PARANDUSED / MUUDATUSED:
- Punkt 1
- Punkt 2

FAILID UUENDATUD:
- fail1
- fail2

Versioon: vX.X.X
```

**Type valikud:**
- `feat:` - Uus funktsioon
- `fix:` - Bugfix
- `refactor:` - Koodi refaktoreerimine
- `docs:` - Dokumentatsiooni uuendus
- `style:` - CSS/disain muudatus
- `chore:` - Arhiveerimine, konfiguratsioon

### 6. Push

```bash
git push -u origin claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
```

**Kui push ebaõnnestub (403 error):**

```bash
# Kontrolli sessiooni ID-d
git branch --show-current
# Peab olema: claude/...-<session-id>

# Sessiooni ID peab klappima!
# Kui ei klapi, siis KÜSI KASUTAJALT!
```

### 7. Retry push (kui network error)

```bash
# Kui network error, retry kuni 4 korda exponential backoff-iga:
git push -u origin <branch>  # 1. katse
sleep 2
git push -u origin <branch>  # 2. katse (2s hiljem)
sleep 4
git push -u origin <branch>  # 3. katse (4s hiljem)
sleep 8
git push -u origin <branch>  # 4. katse (8s hiljem)
```

---

## 📁 FAILIDE STRUKTUUR

```
/home/user/Eesti/                                    ← ROOT (GitHub: LuureAmet/Eesti)
│
├── medportal/                                       ← ✅ MEIE TÖÖ! (v1.6.0)
│   ├── index.html                                   # Landing page
│   ├── forms/
│   │   ├── quick-profile.html                       # Kiirprofiil (5 min)
│   │   ├── full-profile.html                        # Täisprofiil (30 min, 18 sektsiooni)
│   │   └── daily-log.html                           # Päevalogi (2 min)
│   ├── css/
│   │   ├── style.css                                # Põhistiilid (landing, kaardid)
│   │   └── forms.css                                # Vormide stiilid
│   ├── js/
│   │   ├── form-handler.js                          # Üldised funktsioonid
│   │   ├── full-profile.js                          # Täisprofiili loogika + quickAdd funktsioonid
│   │   ├── info-system.js                           # ⭐ 1863 RIDA! MED_INFO_DB (50+ kirjet)
│   │   ├── profile-filter.js                        # ⭐ 294 RIDA! Profiilifiltri süsteem
│   │   ├── quick-profile.js                         # Kiirprofiili eksport
│   │   ├── daily-log.js                             # Päevalogi CSV
│   │   ├── tooltips.js                              # Tooltip süsteem
│   │   ├── custom-fields.js                         # Dünaamilised lisaväljad
│   │   ├── tags-input.js                            # Mitmikvalikud (komaga/Enteriga)
│   │   └── docs-and-links.js                        # VERSION badge + README/ROADMAP
│   ├── config/
│   │   └── site-config.js                           # ⭐ VERSIOON, CHANGELOG, LINGID
│   ├── docs/
│   │   ├── ARCHITECTURE.md                          # ⭐ 420 RIDA! Tehniline arhitektuur
│   │   ├── DEVELOPMENT.md                           # ⭐ 696 RIDA! Arendajale juhised
│   │   └── FILE-GUIDE.md                            # ⭐ 858 RIDA! Failide selgitused
│   ├── data/
│   │   └── tooltips.json                            # Abitekstid väljadele
│   ├── archive/                                     # ⭐ ARHIIV (vana ajalugu)
│   │   ├── v1.0.0/
│   │   │   ├── README_v1.0.0.md
│   │   │   └── ROADMAP_v1.0.0.md
│   │   ├── v1.2.0/
│   │   │   ├── README_v1.2.0.md
│   │   │   └── ROADMAP_v1.2.0.md
│   │   └── ...
│   ├── README.md                                    # ⭐ LOE ESMALT! (praegune v1.6.0)
│   ├── ROADMAP.md                                   # ⭐ ARENDUSPLAAN (v1.6 → v2.0)
│   ├── README-v1.0.md                               # Vana README (arhiiv)
│   └── ROADMAP-v1.0.md                              # Vana ROADMAP (arhiiv)
│
├── Eesti/                                           ← ❌ TEINE PROJEKT (Codex jms)
│   └── Medical/                                     # Vanad teksti failid (arhiiv)
│
├── Medical/                                         ← ❌ TÜHI (.gitkeep)
│
├── AI_AGENT_COMPREHENSIVE_GUIDE.md                  ← ✅ SEE FAIL! (LOE!)
├── START_HERE_UPDATED.md                            ← ✅ LÜHIKE JUHIS
├── NEW_AI_START_HERE.md                             ← ❌ AEGUNUD (ignoreeri)
└── README.md                                        ← ❌ VANA (ainult "# Eesti")
```

### Mida IGNOREERIDA:

❌ `/home/user/Eesti/Eesti/` - Teine projekt (Codex)
❌ `/home/user/Eesti/Medical/` - Tühi kaust
❌ `/home/user/Eesti/NEW_AI_START_HERE.md` - AEGUNUD juhis (vale branch!)
❌ `/home/user/Eesti/README.md` - Vana fail

### TÖÖ AINULT SIIN:

✅ `/home/user/Eesti/medportal/` - KOGU TÖÖ!

---

## 🎯 PRIORITEEDID (järgmine arendus)

Vaata **medportal/ROADMAP.md** - seal on täpne nimekiri.

**LÄHIMAD (v1.7):**
1. Drag-drop prioriteedid (ideoloogia)
2. Kompaktne/laiendatud vaade toggle
3. "Ei soovi" kiirkast (röntgen, vaktsiinid, opioidid)
4. AI prompt 2-osaline (kokkuvõte + täisprofiil)
5. Salvestuse kellaaeg

---

## 📞 KONTAKT

- **Kasutaja:** AK
- **Projekt:** Meigo Medical Medisiiniportaal
- **GitHub:** LuureAmet/Eesti
- **Branch:** claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
- **Versioon:** v1.6.0 (11.11.2025, 22:30)

---

## ✅ KIIRKONTROLL (uuele AI-le)

Kui sa ei ole kindel, KUS sa oled:

```bash
# 1. Kontrolli branch
git branch --show-current
# Peab olema: claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy

# 2. Kontrolli versioon
cat /home/user/Eesti/medportal/config/site-config.js | grep "version:"
# Peab olema: version: "1.6.0"

# 3. Kontrolli, et oled õiges kaustas
ls /home/user/Eesti/medportal/
# Peab näitama: index.html, forms/, css/, js/, config/, docs/, archive/

# 4. Loe README
cat /home/user/Eesti/medportal/README.md | head -10
# Peab algama: "# Meigo Medical Medisiiniportaal v1.6"
```

Kui miski ei klapi → **KÜSI KASUTAJALT!**

---

## 🚨 TÄHTIS MEELDETULETUS

1. **ÄRA KUNAGI KUSTUTA** - alati arhiveeri!
2. **ÄRA TÖÖ VALES BRANCHIS** - kontrolli sessiooni ID-d!
3. **ÄRA PUUTU TEISI PROJEKTE** (Eesti/, Medical/)
4. **LOE ESMALT** - README.md, ROADMAP.md, ARCHITECTURE.md
5. **KÜSI, KUI POLE KINDEL** - parem küsida kui midagi katki teha!

---

**HEAD TÖÖD! 🚀**

**P.S.** Kui sa oled uus AI ja alustad sessiooni:
1. Loe see fail TÄIELIKULT (jah, KOGU fail!)
2. Kontrolli branch (git branch --show-current)
3. Loe medportal/README.md
4. Loe medportal/ROADMAP.md
5. Loe medportal/docs/ARCHITECTURE.md
6. Küsi kasutajalt, mida teha

**ÄRA MINE JUHUSLIKULT FAILE MUUTMA - ASK FIRST!** 🙏

---

© 2025 Meigo Medical Medisiiniportaal | AI Agent Comprehensive Guide v1.0
