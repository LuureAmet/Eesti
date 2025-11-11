# TEHNILINE SPETSIFIKATSIOON: v1.7.0 kuni v2.0.0

Kuupäev: 11.11.2025
Projekt: Meigo Medical Medisiiniportaal
Lähtedokument: juhiseid-teiselt-ailt-1.6.edasiseks.txt (GPT-4 analüüs)
Status: PLANEERIMISJUHIS

---

## SISUKORD

1. JSON NORMALISEERIMINE JA SKOOP-TAKSONOOMIA
2. AI PROMPTIDE SÜSTEEM (2-osaline)
3. "i"-NUPU KAHEASTMELINE MODAAL
4. VERSIOONILINE ARENDUSPLAAN (v1.7 -> v2.0)
5. TEHNILISED MÄRKMED JA HOIATUSED

---

## 1. JSON NORMALISEERIMINE JA SKOOP-TAKSONOOMIA

### Probleem
Praegu on kaks erinevat JSON ekspordi formaati:
- profiil_2025-11-11.json: { version, exportedAt, profileData:{...} }
- taisprofiil_2025-11-11.json: { metadata:{...}, data:{...}, medicationSummary:[] }

### Lahendus: toCanonical() funktsioon

```javascript
function toCanonical(input) {
  const root = input.profileData ?? input.data ?? {};
  const meta = input.metadata ?? {
    generated: null,
    version: input.version ?? null,
    source: "unknown"
  };

  return {
    meta,
    profile: { ...root },
    medicationSummary: root.medicationSummary ?? input.medicationSummary ?? []
  };
}
```

### Skoop-taksonoomia (6 kategooriat)

Igale väljale lisada scope atribuut:

1. **universal** - kõigile profiilidele
   - Privaatsus/nõusolek
   - Punased lipud
   - Kodused mõõdikud (BP/HR/kaal/steps)
   - Elurütmi aknad
   - Stress 0-3
   - Toitumise põhiparameetrid

2. **demographic** - demograafia-spetsiifiline
   - Rasedus/imetamine
   - Vanuseklassid
   - Sugu-spetsiifiline (naiste kaebused)

3. **organ** - haigus/elundi-spetsiifiline
   - AF + antikoagulant
   - Neer eGFR
   - Maks Child-Pugh
   - Perekondlik risk

4. **context** - keskkond/kontekst
   - Elupaik (maa/linn/kortermaja)
   - Transport
   - Töölõiked (öövalvur, ehitus)

5. **modality** - ravimeetod
   - Taimravi
   - Praktikad (jooga, qigong, zazen)
   - Vann/saun
   - Muusika

6. **belief** - usulised/paranormaalsed/alternatiivsed
   - Paranormaalsed uned
   - Vaimsed liikumised (šamaani rännak, remote view)
   - Bioenergia mõõtjad
   - Pendel, aura kaamera
   - Palved ja rituaalid

---

## 2. AI PROMPTIDE SÜSTEEM

### 2.1 LIHTNE LÜHIPROMPT (kiire konsult)

Kasutus: Kiire AI-nõustaja päring, mis vajab ainult riski- ja profiilifiltri tuuma.

```
HOLISTIC-QUICK | v1 | 11.11.2025

INPUT:
- Pregnancy/Lactation: {{pregnancyStatus}}
- AgeCategory: {{ageCategory}} (ExactAge: {{exactAge?}})
- Sex: {{gender}}
- Renal eGFR: {{egfr}}
- Hepatic Child-Pugh: {{childPugh}}
- Anticoagulant (AF/DOAC/Warfarin): {{anticoagulantFlag}}
- Key allergies/intolerances: {{allergies|csv}}
- Absolute red-flags acknowledged: {{redFlags_ack}}

TASK:
1) Anna 3 prioriteetset ohutussoovitust (doosivahemikud kui asjakohane).
2) Paku 3 sobivat taimset/eluviisi sekkumist, mis EI KONFLIKTEERU ülaltoodud riskidega.
3) Üks lause: mida mõõta kodus järgmise 7 päeva jooksul.

FORMAT:
- SAFETY: [...]
- INTERVENTIONS: [1) ... 2) ... 3) ...]
- HOME-METRICS: [...]
```

### 2.2 TÄIELIK PROMPT (specialty-mode + LISP otsustuspuu)

Kasutus: Põhjalik konsultatsioon, eriala-kihistus, "i"-nupu loogika.

```
HOLISTIC-COMPREHENSIVE CONSULT | v1.6
DATE: 11.11.2025

SYSTEM-GUARDRAILS:
- Valideeri esmalt: Pregnancy/Lactation, Age, Sex, eGFR, Child-Pugh, Anticoagulant
- Kui vastunäidustus -> väljasta SAFETY-ONLY plaan + alternatiivid
- Alati arvesta koostoimed: antikoagulant x (ginkgo, naistepuna, küüslauk)
- Ei diagnoosi. Soovita monitooringut ja suunamist.

TAXONOMY-SCOPE:
- universal: consent, red-flags, home-metrics, sleep, stress
- demographic: pregnancy, age-category, sex-specific
- organ: AF+anticoagulant, eGFR, Child-Pugh
- context: residence, work-schedule, transport
- modality: herbs, practices, baths/sauna, music
- belief: paranormal dreams, spiritual movement, bioenergia

SPECIALTY-MODE:
- Input: {family-medicine, cardiology, hepatology, nephrology,
          Ayurveda, TCM, naturopathy, sports, rural-traditions}
- Kuvada esmalt selle specialty lähenemist
- Lisada "cross-check" kaks teist erialat

INPUT-CANONICAL:
{{canonical.profile as JSON}}
{{medicationSummary as LIST}}

OUTPUT FORMAT:
A) PROFILE-SUMMARY (1-3 rida)
B) TRIAGE - Red-flag check [OK/STOP + reason]
C) INTERVENTION-PLAN
   1. Lifestyle rhythms
   2. Herbs/Teas + koostoime screen
   3. Practices (hingamine/qigong)
   4. Hydro/Baths/Saun
   5. Nutrition highlights
D) SPECIALTY VIEW: {{specialtyMode}}
E) CROSS-CHECK BOXES (2 teist erialat)
F) HOME-MONITORING (7 päeva)
G) SOURCES (i-tabs ühilduv)
H) ONE-LINE SUMMARY
```

### 2.3 LISP-stiilis otsustuspuu

```lisp
(defun plan (profile)
  (if (contra? profile)
    (return (safety-only profile)))
  (let* ((rx (interactions-screen profile))
         (lifestyle (build-lifestyle profile))
         (herbs (safe-herbs profile rx))
         (practice (safe-practices profile))
         (hydro (safe-hydro profile))
         (nutrition (nutrition-core profile))
         (special (specialty-lens profile)))
    (compose-output profile lifestyle herbs practice hydro nutrition special)))
```

---

## 3. "i"-NUPU KAHEASTMELINE MODAAL

### Ülesehitus

Igal väljal võib olla "i" ikoon, mis avab modali kahe tabiga:

#### Tab A: "Sisemine Wiki" (MED_INFO_DB)
- Lühikirjeldus (max 120 sõna)
- Kliiniline kasutus: millal kasuta / väldi
- Dosaator/aknad (kui rakendub)
- Interaktsioonid/ohud
- Kohandused:
  - Rasedus
  - Eakas
  - Neer (eGFR piirangud)
  - Maks (Child-Pugh piirangud)
- Link täisartiklile sisewikis

#### Tab B: "Avalikud allikad"
- 3-5 avalikku juhist või ülevaadet
- DOI-d, keelesildid (EST/ENG/RUS/POL/HEB/CHI)
- GRADE või tõendite kvaliteet
- Aasta
- Märkus tõendite kohta

### Andmeskeem

```javascript
{
  "id": "ginkgo_biloba",
  "term": "Ginkgo biloba",
  "short_desc": "Kognitiivne tugi; antikoagulandiga koostoimerisk.",
  "clinical_use": "Kerge mäluhäire. Mitte AF+antikoagulant.",
  "dosing": "120-240 mg/ööpäev jaotatult",
  "interactions": ["antikoagulant riskide verejooksu risk", "NSAID"],
  "adjustments": {
    "pregnancy": "väldi",
    "elderly": "alusta madalalt",
    "renal": "OK",
    "hepatic": "ettevaatlik"
  },
  "sources": [
    {
      "title": "Herbal interactions consensus",
      "org": "...",
      "year": 2023,
      "url": "...",
      "lang": "ENG"
    }
  ],
  "grade": "low-moderate"
}
```

---

## 4. VERSIOONILINE ARENDUSPLAAN

### v1.7.0 - UNI + PRIVAATSUS MASSIIVNE LAIENDUS

#### 4.1 UNI ERALDI SEKTSIOON (plusside süsteem)

**Norskamine** (snoring)
- Alamvalikud:
  - ei_hairi
  - hairib_elukaaslast
  - hairib_mind
  - soltub_joomaastmest
- Info nupp: STOP-BANG riskihinnang

**Unenagemine**
- Boolean + täpsustusväli

**Painajad**
- Valikud: puudub | harv | sage
- Info nupp: levinumad liigid, vallandajad

**Paranormaalsed uned** (scope: belief)
- Alamvalikud:
  - kehavaline
  - prohvetlik
  - samaani_rannak
  - tahtevaeline_rannak
  - muu
- Info nupp: kirjeldused, kultuuriline kontekst

```javascript
"sleep": {
  "snoring": {
    "present": false,
    "details": ["ei_hairi", "hairib_elukaaslast"]
  },
  "unenagemine": true,
  "painajad": "harv",
  "paranormaalsed_uned": ["kehavaline", "prohvetlik"]
}
```

#### 4.2 PRIVAATSUS JA NÕUSOLEK - MASSIIVNE LAIENDUS

**"Jagamise tase"** (privacy.share_level: enum)
- jumalale (+ info nupp: multireligioosne selgitus)
- ai_arst (+ alamvalik: erinevad teaduslikud AI-d)
- arst
- pere_liige
- anon_uurija
- avalik_osint
- ai_test (+ alamvalik: 10 levinumat üldist AI-d)
- med_test
- politsei
- sotsiaal_tootaja

MÄRKUS: "jumalale" scope: belief, eksportis eraldi plokis

**"Nõusolek"** (privacy.consent_flags: list)
- palve (+ alammenüü: regioonide ja usundite palvetüübid)
- rituaal (+ alamvalikud: kristlus, maausulised, rulerituaalid)
- kutsun_koju_arsti
- kutsun_koju_new_age_praktiku

**"Millist andmestikku EI jagata"** (privacy.exclude_datasets: list)
- kodu_olukord
- kodu_vagivald
- sotsiaal_olukord
- finants_olukord
- vaimne_olukord
- psuhh_olukord
- puue
- religioon
- elu_harjumused
- entogeenid_kasutus
- soltuvusained:
  - alkohol
  - tubakas
  - nikotiin
  - kanep
  - CBD
  - kava
  - kratom
  - stimulant
  - opioid
  - muu

```javascript
"privacy": {
  "share_level": "ai_arst",
  "share_level_details": {
    "ai_doctors": ["Claude", "GPT-4", "MedPaLM"]
  },
  "consent_flags": ["palve", "kutsun_koju_arsti"],
  "consent_details": {
    "palve": {
      "type": "kristlik",
      "region": "Eesti"
    }
  },
  "exclude_datasets": ["finants_olukord", "soltuvusained"]
}
```

---

### v1.8.0 - TÖÖRIISTAD + LIIKUMINE

#### 4.3 TÖÖRIISTAD JA KODUSED MÕÕTMISED (scope: belief lisamine)

**Standardsed** (scope: universal)
- BP monitor
- Step counter
- Daily weight
- Kiirvalik nupp: "< Lisa kõik 3"

**Belief-põhised** (scope: belief)
- bioenergia_mootja
- eluenergia_mootja
- aura_kaamera (Vene ja Ida teadlased)
- pendel
- hiina_pulsi_hindamine
- noia_mootmised
- uro_dev_tugi
- teorilised_mootevahendid

Info nupp: "Need on informatiivsed, mitte diagnostilised."

```javascript
"home_tools": {
  "std": ["bp_monitor", "step_counter"],
  "belief": ["bioenergia_mootja", "pendel"]
}
```

#### 4.4 LIIKUMISE VIISID (scope: context | belief)

**Tavalised füüsilised** (scope: context)
- jalgsi, ratas, auto, rong, buss, laev, paat, lennuk, lonkimine

**Vaimsed/mittefüüsilised** (scope: belief)
- remote_view
- levitatsioon
- ajarannak
- samaani_rannak
- tahtevaeline_rannak
- muud_vaimsed_fyysilised

MÄRKUS: Kõige vähem tõenäolised lõppu. Hallikas toon UI-s.

```javascript
"mobility": {
  "modes": ["jalgsi", "auto", "samaani_rannak"]
}
```

#### 4.5 KAEBUSED - TÄIENDUSED

Lisada olemasolevasse sektsiooni:
- tinnitus
- peapooritus
- kohu_keeramine (lisaks iiveldusele)
- kohukinnisus
- kohulahtisus
- valguse_talumatus

---

### v1.9.0 - TÖÖ + TOITUMINE

#### 4.6 KOORMUSTALUVUS JA TÖÖ

Lisada olemasolevasse work.role sektsiooni:
- metsatoo
- poe_lett
- transport_juht
- soekaevandus
- advokaat
- poliitik
- sojavaelane
- tehase_tootmine
- rutiinne_linttoot
- pakendamine
- pakkide_tostmine
- jalgrattaga_kuller (Bolt, Post jne)

#### 4.7 TOITUMISE PIIRANGUD - UUED PÕHJUSED

Olemas: meditsiiniline, talumatus, eelistus, usuline, eetiline

Lisada:
- partner_ei_luba
- elukaaslane_ei_luba
- tunnetus
- hirm_tundmatu_ees (neutraalsem kui "paranoia")

#### 4.8 TOITUMISPROFIIL

**"Söögirütm akendes"** - liiguta plusside alla

Täpsustused:
- paast
- hobo_syya_millal_juhtub (hobo eluviis)
- linnakiirtoit
- magusaltuvus

**Rikkad toidud ja "tava-toidud lusikaga"**
- nutrition.rikkad_toidud: [rasvased lihad, maks, juustud, koor, sokolaad, pahklid]
- nutrition.tava_toidud_lusikaga: [putrud, supid, hautised, kiirtoit_linnas]
- Info nupp: miks see oluline

#### 4.9 KOOSTOIME RISKID - TÄIENDUSED

Olemas: greip, naistepuna, ginkgo, lagrits, kuuslauk>1, ingver>2g, kurkum>1g

Lisada:
- kakao/sokolaad (kofeiin + teobromiin; antikoagulandi/HTN)
- alkohol (hepato/koostoimed)
- kofeiin_kogus (kohv/tee/energiajoogid)
- kanep_CBD (antikoagulandi + sedatiividega ettevaatlik)
- kava (maksarisk)
- kratom (mitu koostoimeriski + hoiatus)

#### 4.10 ANTIKOAGULANT - "MAAKELI" SELGITUS

Praegu: Checkbox "Antikoagulant?"

Uuenda:
- Label: "Antikoagulant (verevedeldaja)?"
- Selgitus: "Mis see on? Verevedeldaja. Aitab ära hoida trombe, kuid suurendab veritsuse riski."
- Alamvalik (plus-menüü):
  - varfariin
  - DOAC: apiksabaan, rivaroksabaan, dabigatraan, edoksabaan
  - Antitrombotsütaarsed (eraldi): aspiriin, klopidogreel
- Info nupp: milliseid taimi vältida, mis asendada

```javascript
"risks": {
  "anticoagulant": {
    "flag": true,
    "type": ["varfariin"],
    "antiplatelet": ["aspiriin"]
  }
}
```

---

### v2.0.0 - RESSURSID + DIAGNOSTIKA

#### 4.11 MINIMAALNE DIAGNOSTIKA

- Plusside süsteem
- Info asjad külge (Tab A/B)
- baseline_diagnostics: [...]

#### 4.12 RESSURSID JA EELARVE

Kõik plusside alla:
- ligipaas:
  - apteek (+ alammenüü: Eesti keti valik, piirkond)
  - loodusravi_pood
  - puudub
- Piirkond/kihelkond valik:
  - Süsteem soovitab kohalikke poode ja ravitsejaid
  - Hoiatus meta-infos kui piirkonnas kahtlaseid teenusepakkujaid

```javascript
"resources": {
  "ligipaas": ["apteek"],
  "apteek_piirkond": "Tartu",
  "hoiatus_meta": "Tartu piirkonnas on teatatud..."
}
```

#### 4.13 TAIMRAVI - KULTUURIDEÜLENE

Lisada olemasolevasse sektsiooni:
- Ayurveda taimed
- TCM (Traditional Chinese Medicine) taimed
- Põhjala/Skandinaavia
- Slaavi rahvameditsiin
- Maailma rahvaste taimravi

Imetamine:
- Lisa imetamise (cupping) kui valik
- Info nupp: kus saab, kuidas, ohud

#### 4.14 VANN/SAUN JA PRAKTIKAD

- Liiguta "Vann" kehaliste praktikate esimeseks
- Lisa ravidussvannid plusidesse

#### 4.15 IDEOLOOGIA JA PIIRJOONED

Eraldi kast: "Mida kindlasti EI soovi"
- Plusside nimekiri + lühiselgitus
- ideology.mida_ei_soovi: [...]

---

## 5. TEHNILISED MÄRKMED JA HOIATUSED

### 5.1 UI/UX Reeglid

1. **Sticky Header** näitab:
   - Profiilifiltri kokkuvõte
   - 6 viimast badge'i: elupaik, liikumine, tee, vann/saun, muusika, koostoimerisk

2. **Scope Filtering**:
   - Belief-väljad hallikas tooniga
   - Nähtavus profiilifiltri järgi (nt rasedus -> kuva ainult sobivad taimed)

3. **Koostoime-mootor**:
   - Kui anticoagulant=true ja ginkgo lisatud -> PUNANE hoiatus + alternatiivid

4. **Kliiniline Checkpoint**:
   - Enne eksporti: punaste lippude kinnitamine kohustuslik

### 5.2 Andmemudel - Mini-skeem

```javascript
{
  "privacy": {
    "share_level": "jumalale|ai_arst|arst|pere_liige|anon_uurija|avalik_osint|ai_test|med_test|politsei|sotsiaal_tootaja",
    "consent_flags": ["palve","rituaal","kutsun_koju_arsti","kutsun_koju_new_age_praktiku"],
    "exclude_datasets": ["kodu_olukord","kodu_vagivald",...]
  },
  "activity": {
    "overall_level": "madal|moodukas|korge"
  },
  "sleep": {
    "snoring": ["ei_hairi","hairib_elukaaslast","hairib_mind","soltub_joomaastmest"],
    "unenagemine": true,
    "painajad": "puudub|harv|sage",
    "paranormaalsed_uned": ["kehavaline","prohvetlik","muu"]
  },
  "complaints_extra": ["tinnitus","peapooritus","kohu_keeramine",...],
  "work": {
    "role": ["metsatoo","poe_lett","transport_juht",...]
  },
  "mobility": {
    "modes": ["jalgsi","auto","samaani_rannak",...]
  },
  "home_tools": {
    "std": ["bp_monitor","step_counter","daily_weight"],
    "belief": ["bioenergia_mootja","pendel",...]
  },
  "nutrition": {
    "rikkad_toidud": [...],
    "tava_toidud_lusikaga": [...],
    "restrictions_reason_extra": ["partner_ei_luba","tunnetus",...],
    "meal_windows_plus": ["paast","hobo_syya_millal_juhtub",...]
  },
  "risks": {
    "anticoagulant": {
      "flag": true,
      "type": ["varfariin","apiksabaan",...],
      "antiplatelet": ["aspiriin","klopidogreel"]
    },
    "interaction_risks_extra": ["kakao","alkohol","kofeiin","kanep_CBD","kava","kratom"]
  },
  "resources": {
    "ligipaas": ["apteek","loodusravi_pood","puudub"],
    "apteek_piirkond": "...",
    "hoiatus_meta": "..."
  },
  "_scope": {
    "belief": ["paranormaalsed_uned","samaani_rannak","bioenergia_mootja",...]
  }
}
```

### 5.3 Parandused ja Duplikaadid

ENNE UUTE FUNKTSIOONIDE LISAMIST:

1. **Duplikaadid välja**:
   - Child-Pugh kuvatakse kahel real
   - "8 Brokaati" loetletud kaks korda
   - NetworkError ARCHITECTURE.md blokk dubleeritud

2. **Ortograafia**:
   - "Mesatöö" -> "Metsatöö"
   - "Istutöö i / kontorit00" -> "Istuv kontoritöö"
   - "Aspiriinи" -> "Aspiriin" (võõrtäht)

3. **Semantiline täpsus**:
   - "Antibiootikumid" kategooria vajab alamvälju (klass + alternatiivid)

### 5.4 Specialty-režiimi Reeglid

1. **family-medicine**: rõhuasetus punased lipud, kodumõõtmised, koostoimed
2. **cardiology**: sool, vedelik, pulss/BP trendid; antikoagulant x taimed
3. **hepatology**: Child-Pugh kohandused, hepatotoksilised ürdid väldi
4. **nephrology**: eGFR põhised elektrolüütide piirid, vesi/sool balanss
5. **Ayurveda | TCM | naturopathy**: lubatud, kuid automaatne ristsõel organ-väravatest

Ühisreegel: Kui specialty soovitab midagi gate-konfliktiga -> kasuta "ALT:" alternatiivi

### 5.5 Pipeline Spec

```javascript
// 1. Normaliseeri sisend
const canonical = toCanonical(rawJSON);

// 2. Lisa scope ja units
const enhanced = addScopeAndUnits(canonical);

// 3. Genereeri kokkuvõte
const summary = deriveProfileSummary(enhanced);

// 4. Ehita prompt
const prompt = specialtyMode
  ? buildPromptFull(enhanced, specialtyMode)
  : buildPromptQuick(enhanced);

// 5. Valideeri
const guards = validateClinicalGuards(enhanced);
if (guards.blocked) return safetyOnlyPlan(enhanced);

// 6. Kontrolli koostoimed
const interactions = interactionsEngine(enhanced);

// 7. Eksport
return exportProfile(enhanced, prompt, interactions);
```

---

## 6. MIS VAJAB VEEL TÄPSUSTAMIST?

### OLULINE - KÜSI KASUTAJALT:

1. **Palvete ja rituaalide kataloog**:
   - Kas on olemas nimekiri regioonide ja konfessioonide kohta?
   - Kes kogub ja haldab seda infot?

2. **AI-arstide nimekiri**:
   - Millised AI-d lisada "ai_arst" alamvalikusse?
   - Kas kõik: Claude, GPT-4, MedPaLM, Gemini, ...?

3. **Apteegikettide ja piirkondade andmebaas**:
   - Kas on olemas Eesti apteekide andmestik?
   - Kes uuendab "hoiatus_meta" infot?

4. **Bioenergia/vaimsete mõõtjate nimekiri**:
   - Millised konkreetsed seadmed lisada?
   - Kas need vajab sertifikatsiooni märkusi?

5. **Taimravi kultuurideülene andmebaas**:
   - Kas on olemas TCM/Ayurveda taimede nimekiri?
   - Kes kontrollib koostoime infot?

6. **"i"-nupu sisu täitmine**:
   - Kes kirjutab Tab A ja Tab B sisu?
   - Millises formaadis hoitakse (JSON, MD, database)?

---

## 7. KATTUMINE TEISTE PLAANIDEGA

### ROADMAP.md vs see dokument:

ROADMAP.md näitab:
- v1.7: Drag-drop prioriteedid, kompaktne vaade, "Ei soovi" kast
- v1.8: Database (PHP + SQLite)
- v2.0: AI integratsioon

See dokument näitab:
- v1.7: UNI + PRIVAATSUS laiendus
- v1.8: TÖÖRIISTAD + LIIKUMINE
- v1.9: TÖÖ + TOITUMINE
- v2.0: RESSURSID + DIAGNOSTIKA

SOOVITUS: Ühenda kaks plaani:
- v1.7.0: UNI + PRIVAATSUS + Drag-drop + Kompaktne vaade
- v1.8.0: TÖÖRIISTAD + LIIKUMINE + Database
- v1.9.0: TÖÖ + TOITUMINE
- v2.0.0: RESSURSID + AI integratsioon

---

## 8. JÄRGMISED SAMMUD

1. **ESMALT**: Paranda duplikaadid ja ortograafia vead (punkt 5.3)

2. **SEEJÄREL**: Implementeeri v1.7.0:
   - UNI sektsioon (4.1)
   - PRIVAATSUS laiendus (4.2)
   - JSON skoop-süsteem (1)

3. **PARALLEELSELT**: Alusta MED_INFO_DB täitmist:
   - "i"-nupu sisu Tab A/B (3)
   - Vähemalt 20 uut kirjet v1.7.0 jaoks

4. **TESTIMINE**: Specialty-mode prototypimine:
   - Vähemalt 2 erialat (family-medicine + cardiology)
   - AI promptide testimine (2)

5. **DOKUMENTATSIOON**: Uuenda:
   - README.md -> v1.6.0 (praegu näitab v1.2.0)
   - ROADMAP.md -> ühenda kaks plaani
   - ARCHITECTURE.md -> lisa scope-taksonoomia

---

## LÕPP

See dokument on TEHNILINE SPETSIFIKATSIOON v1.7.0 kuni v2.0.0 arenduseks.

Enne implementeerimist:
1. KÜSI KASUTAJALT punktis 6 toodud küsimused
2. KONTROLLI kattumine ROADMAP.md-ga
3. PARANDA olemasolevad vead (punkt 5.3)

Allikas: juhiseid-teiselt-ailt-1.6.edasiseks.txt (GPT-4 analüüs)
Koostaja: Claude (Anthropic)
Kuupäev: 11.11.2025

---

Meigo Medical Medisiiniportaal | Tehniline Spetsifikatsioon v1.7-v2.0
