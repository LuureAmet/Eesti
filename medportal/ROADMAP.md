# ROADMAP - Meigo Medical Medisiiniportaal

Arendusplaan versioonide kaupa.

---

## v1.2 - PRAEGU (10.11.2025)

### ✅ VALMIS

**Põhifunktsioonid:**
- [x] 3 vormi tüüpi (Kiir, Täis, Päevalogi)
- [x] 18-sektsiooniline täisprofiil
- [x] TXT/JSON/CSV eksport
- [x] AI prompt genereerimine (kohandatav)
- [x] localStorage salvestus
- [x] Progress tracking
- [x] Responsive disain
- [x] Dünaamilised tabelid

**UX täiustused (v1.2):**
- [x] Toast teated (ilma alert-ideta)
- [x] Number/Date lisaväljad (töötavad)
- [x] Klikitavad kaardid (kogu kaart, mitte ainult nupp)
- [x] Tags input (komaga/Enteriga sisestus)
- [x] VERSION badge paremal ülal
- [x] README/ROADMAP/Lingid (expandable lehe lõpus)

**AI täiustused:**
- [x] Prompt redaktor 18 checkboxiga
- [x] Live preview promptist
- [x] Vali kõik / Tühista kõik / Taasta vaikeväärtused
- [x] Kopeeri või lae alla TXT

**Konfigureeritav:**
- [x] Kõik lingid `config/site-config.js`
- [x] Prompt sektsioonid config-is
- [x] README/ROADMAP teed

---

## v1.3 - JÄRGMINE (plaanis 2-3 nädalat)

### Kasutajakogemus

- [ ] **Drag-and-drop prioriteedid**
  - Ideoloogia/piirjooned järjestamine
  - "Tugevalt eelistatud" / "Hoiduda" märkeruudud

- [ ] **Kompaktne vs laiendatud vaade**
  - Toggle nupp: Compact | Expanded
  - Kompaktne peidab abitekstid, vähendab padding'uid
  - Laiendatud näitab seletusi

- [ ] **"Ei soovi" kiirkast üleval**
  - Checkboxid: Röntgen, Süsteemsed vaktsiinid, Opioidid jne
  - + plussiga lisamine

- [ ] **Mitmikvalikud rohkematele väljadele**
  - "Meeldib/Ei meeldi" toitude jaoks
  - Aktiivsus (mitu tüüpi korraga)

- [ ] **Salvestuse kellaaeg**
  - Timestamp koos kuupäevaga
  - Näita viimati salvestatud: "Uuendatud 10.11.2025 15:30"

### AI Prompt täiustused

- [ ] **2-osaline eksport**
  - Osa 1: AI kokkuvõte (lühike, 200-300 sõna)
  - Osa 2: Täisprofiil (JSON + renderatud tekst)
  - Checkbox: "Lisa AI kokkuvõte algusesse"

- [ ] **Prompt template valik**
  - Kardiooloogia fookus
  - Ennetusprofiil
  - Postoperatiivne
  - Üldine holistiline

---

## v1.4 - DATABASE (plaanis 1-2 kuud)

### Server-side funktsioonid

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

### Database skeem

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

## v1.5 - AI INTEGRATSIOON (plaanis 2-3 kuud)

### Cloud AI

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

### AI-põhine analüüs

- [ ] **Koostoime kontroll**
  - Ravimite vs taimravi
  - Automaatsed hoiatused (punased lipud)

- [ ] **Personaliseeritud päevaplaan**
  - Variant A: Miinimum Busy (12-15 min)
  - Variant B: Tavatase (30-45 min)
  - Variant C: Põhjalik (60+ min)

---

## v2.0 - PROFESSIONAALNE (plaanis 3-6 kuud)

### Arstidele

- [ ] **Admin paneel**
  - Pakettide haldamine
  - Soovituste tuunimine
  - Patsientide nimekiri

- [ ] **Template süsteem**
  - Südamehaigused 50+ a
  - Südamehaigused 65+ a
  - Ennetusprofiil 30-50 a
  - Postoperatiivne recovery

### Laiendused

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

### Multi-keel

- [ ] EST (praegu)
- [ ] ENG
- [ ] RUS

---

## v3.0 - ÖKOSÜSTEEM (plaanis 6-12 kuud)

### Avalik API

- [ ] **API dokumentatsioon**
- [ ] **Webhook'id** (uus profiil salvestatud → teavitus)
- [ ] **OAuth** integratsioon

### Teised platvormid

- [ ] **Mobile app** (React Native / Flutter)
- [ ] **Desktop app** (Electron)
- [ ] **CLI tool** (Node.js)

### Open Source

- [ ] **GitHub public release**
- [ ] **Kogukonnapanus** (Issues, PR'id)
- [ ] **Pluginate süsteem** (custom fields, custom AI integratsioonid)

---

## Milestones

| Versioon | Staatus | Kuupäev | Põhifookus |
|----------|---------|---------|------------|
| v1.0 | ✅ Valmis | 09.11.2025 | Põhivormid, eksport, tooltipid |
| v1.1 | ✅ Valmis | 09.11.2025 | Kohandatud väljad, VERSION badge |
| v1.2 | ✅ Valmis | 10.11.2025 | Toast UX, tags input, README/ROADMAP |
| v1.3 | ⏳ Plaanis | 01.12.2025 | Drag-drop, kompaktne vaade, "Ei soovi" |
| v1.4 | 📋 Plaanis | 01.01.2026 | Database (SQLite), kasutajad |
| v1.5 | 📋 Plaanis | 01.02.2026 | AI integratsioon (API) |
| v2.0 | 💡 Idee | 01.04.2026 | Template süsteem, admin paneel |
| v3.0 | 💡 Idee | 01.10.2026 | API, mobile, open source |

---

## Prioriteedid (järgmine nädal)

1. **Drag-and-drop** ideoloogia/piirjooned (SortableJS või vanilla)
2. **Kompaktne/laiendatud vaade** toggle nupp
3. **"Ei soovi" kast** ülesse (checkboxid + plussiga lisamine)
4. **AI prompt 2-osaline** (kokkuvõte + täisprofiil)
5. **Salvestuse kellaaeg** lisamine

---

## Tehnilised võlad

- [ ] PDF eksport ei tööta (placeholder, kasuta `window.print()` esmalt)
- [ ] Kellaajad on 24h, aga mitte kõik (kontrollida `input[type="time"]`)
- [ ] Mõned lisaväljad ei salvesta (Number/Date - nüüd parandatud v1.2)

---

## Tagasiside kasutajatelt

> "Toast teated on palju paremad kui alert'id!" - AK, 10.11.2025

> "Klikitavad kaardid on intuitiivsed!" - AK, 10.11.2025

> "Soovin näha kokkuvõtet enne AI-le saatmist." - Plaanis v1.3

---

**Meigo Medical Medisiiniportaal** | ROADMAP v1.2 | © 2025

Vaata varasemaid versioone: `ROADMAP-v1.0.md`, `ROADMAP-v1.1.md`
