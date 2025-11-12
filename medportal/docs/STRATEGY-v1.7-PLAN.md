# STRATEEGIA JA PLAAN - Versioonid 1.8.0+

**Kuupäev:** 12.11.2025
**Praegune versioon:** v1.7.5 ✅ (13 PAKETTI VALMIS!)
**Järgmised versioonid:** v1.8.0 → v1.9.0 → v2.0.0

---

## ✅ **MIS ON TEHTUD (v1.5.0 - v1.7.5):**

### v1.5.0 - PROFIILIFILTRI SÜSTEEM
- ✅ Rasedus → Vanus → Sugu → Meditsiinilised riskid
- ✅ 11 vanusekategooriat (vastsündinu → oldest-old)
- ✅ Reaalajas hoiatused (rasedus, AF+antikoagulant, eGFR, Child-Pugh)
- ✅ Sticky header
- ✅ profile-filter.js

### v1.6.0 - PLUS-NUPPUDE LAIENDUS (6 sektsiooni)
- ✅ Elupaik (kortermajas, maaelu, linn, öötöö)
- ✅ Liikumine (kõndimine, jalgratas, ujumine, matkamine, rulluisutamine)
- ✅ Kaebused + NAISTE KAEBUSED (peavalu, liigesevalu, menstruaalivalud, PMS, kuumad hood)
- ✅ Vann/Saun (Epsom vann, saun, külm dušš, jalavannikud)
- ✅ Muusika (klassikaline, loodushelid, meditatsioon, binauraalsed)
- ✅ 3 uut funktsiooni: quickAddComplaint(), quickAddBath(), quickAddMusic()
- ✅ MED_INFO_DB laiendatud 17 kirjega

### v1.7.5 - MASSIIVNE UUENDUS (13 PAKETTI!) ✅
- ✅ **PAKETT 1:** Profiilifiltri täiendused (Centaur vanus, Suur-Tõu/Elf vanused, "Lapseootel" label)
- ✅ **PAKETT 2:** Bio-markerid (4 plus-nuppu: kromosoomid, gonaddid, hormoonid, muu)
- ✅ **PAKETT 3:** Profiilifilter täiendused (7 uut filtrit: toidupiirangud, allergiad, kultuurilised...)
- ✅ **PAKETT 4:** Mütoloogia/Identiteet (8 liiki: inimene, elf, päkapikk, kääbus, centaur, poolinimene, väetee, muu)
- ✅ **PAKETT 5:** Spordid ja harjutused (12+ plus-nuppu: jõusaal, jooga, taiji, võitluskunstid, Tsigong...)
- ✅ **PAKETT 6:** Töö tüübid (12+ plus-nuppu: istuv arvutitöö, füüsiline töö, öötöö, transport, meditsiin...)
- ✅ **PAKETT 7:** Töövõime hinnang (kompaktne UI, dropdown, "Piirangud töö jaoks")
- ✅ **PAKETT 8:** Alternatiivsed tööriistad (10+ plus-nuppu: bioenergia, aura kaamera, pendel...) **belief**
- ✅ **PAKETT 9:** Meditsiiniportaalid (17 portaali: Eesti 4, Euroopa 7, Maailm 6) värvikoodi
- ✅ **PAKETT 10:** Antikoagulant → **Verevedeldajad** (tooltip, koostoime hoiatused)
- ✅ **PAKETT 11:** Vann/Saun laiendus (6 uut saunatüüpi: Soome, Vene banja, Türgi hammam, infrapuna, aurukamber, muu)
- ✅ **PAKETT 12:** Try-If-Needed (10 abinõu + ↑/↓ järjekorra muutmine)
- ✅ **PAKETT 13:** Privaatsus filter (14 kategooriat, 3 presetti: arst, AI, teadlane)
- ✅ **UI PARANDUSED:** BMI/sünnikuupäev ümberpaigutamine, vanade listide eemaldamine, "(belief)" siltide peitmine, töövõime kompaktne layout, "Kodune tugi" plus-süsteem
- ✅ **STATISTIKA:** ~1800+ rida koodi, 75+ uut plus-nuppu, 15+ uut JS funktsiooni

---

## 📋 **JÄRGMISED VERSIOONID - ÜKSIKASJALIK PLAAN:**

---

## **v1.7.0 - UNI + PRIVAATSUS LAIENDUS** ✅ (VALMIS kui v1.7.5)

### **A. PRIVAATSUS JA NÕUSOLEK - MASSIIVNE LAIENDUS**

#### **"Jagamise tase" plusid:**
```javascript
privacy.share_level: enum {
  jumalale,           // + multireligioosne info nupp
  ai_arst,            // + alamvalik: eri AI-d
  ai_test,            // + 10 levinumat AI-d
  arst,
  pere_liige,
  anon_uurija,
  avalik_osint,
  med_test,
  politsei,
  sojatootaja
}
```

#### **"Nõusolek" plusid:**
```javascript
privacy.consent_flags: list [
  "palve",            // + eri regioonide/usundite palved (mitmetasandiline menüü)
  "rituaal",          // + eri usundite rituaalid (kristlus, maausulised, rulerituaalid)
  "kutsun_koju_arsti",
  "kutsun_koju_new_age_praktiku"
]
```

#### **"Millist andmestikku EI jagata" plusid:**
```javascript
privacy.exclude_datasets: list [
  "kodu_olukord",
  "kodu_vagivald",
  "sotsiaal_olukord",
  "finants_olukord",
  "vaimne_olukord",
  "psuhh_olukord",
  "puue",
  "religioon",
  "elu_harjumused",
  "entogeenid_kasutus",
  "soltuvusained"      // + alamvalik: alkohol, tubakas, kanep, CBD, kava, kratom, opioidid
]
```

**Scope:** `belief` (usulised/spirituaalsed valikud)

---

### **B. UNI - ERALDI SEKTSIOON + PLUSID**

```javascript
sleep: {
  snoring: ["ei_hairi", "hairib_elukaaslast", "hairib_mind", "soltub_joomaastmest"],
  unenagemine: true/false,
  painajad: "puudub|harv|sage",  // + vallandajad
  paranormaalsed_uned: ["kehavailine", "prohvetlik", "samani_rannak", "muu"]
}
```

**Scope:** `universal | belief`

---

### **C. PUHASTUS:**
- ❌ EEMALDA: "Põhiline elupaik" topelt linnukeste menüü (plusid juba olemas)
- ❌ EEMALDA: "Füüsiline aktiivsus" linnukeste menüüd
- ✅ LISA: "Üldine aktiivsuse tase" (madal/mõõdukas/kõrge)

---

## **v1.8.0 - TÖÖRIISTAD + LIIKUMINE + KAEBUSED**

### **A. TÖÖRIISTAD - BIOENERGIA/VAIMSED MÕÕTJAD**

```javascript
home_tools: {
  std: ["bp_monitor", "step_counter", "daily_weight"],
  belief: [
    "bioenergia_mootja",
    "eluenergia_mootja",
    "aura_kaamera",
    "pendel",
    "hiina_pulsi_hindamine",
    "noia_mootmised",
    "uro_dev_tugi"
  ]
}
```

**UI:**
- Kiirvaliku ees nupp: **"< Lisa kõik 3"**
- Info nupp: "informatiivne, mitte diagnostiline"

**Scope:** `belief`

---

### **B. LIIKUMISE VIISID - VAIMSED/MITTEFÜÜSILISED**

```javascript
mobility: {
  modes: [
    "jalgsi", "ratas", "auto", "rong", "buss", "laev", "paat", "lennuk",
    // BELIEF:
    "remote_view",
    "levitatsioon",
    "ajarannak",
    "samani_rannak",
    "tahtevaeline_rannak",
    "muud_vaimsed_fyysilised"
  ]
}
```

**Scope:** `context | belief`
📌 Pane kõige vähem tõenäolised lõppu

---

### **C. KAEBUSED - TÄIENDUSED**

```javascript
complaints_extra: [
  "tinnitus",
  "pearinglus",
  "koohu_keeramine",
  "iiveldus",
  "kohukinnisus",
  "kohulahtisus",
  "valguse_talumatus"
]
```

---

## **v1.9.0 - TÖÖ + TOITUMINE + KOOSTOIMED**

### **A. KOORMUSTALUVUS JA TÖÖ - TÄIENDUSED**

```javascript
work.role: [
  "metsatoo",
  "poe_lett",
  "transport_juht",
  "suvakaevandus",
  "advokaat",
  "poliitik",
  "sojavaelane",
  "tehase_tootmine",
  "rutiinne_linttoot",
  "pakendamine",
  "pakkide_tostmine",
  "jaotaja_kuller"     // Bolt, Post jne
]
```

---

### **B. TOITUMISPROFIIL - LAIENDUSED**

```javascript
nutrition: {
  rikkad_toidud: [      // 22 rikka toitu
    "rasvased_lihad", "maks", "juustud", "koor", "sokolaad", "pahklid", ...
  ],
  tava_toidud_lusikaga: [
    "putrud", "supid", "hautised", "kiirtoit_linnas"
  ],
  restrictions_reason_extra: [
    "partner_ei_luba",
    "elukaaslane_ei_luba",
    "tunnetus",
    "hirm_tundmatu_ees"
  ],
  meal_windows_plus: [
    "paast",
    "hobo_syya_millal_juhtub",
    "linnakiirtoit",
    "magusaltuvus"
  ]
}
```

---

### **C. KOOSTOIME RISKID - LISA**

```javascript
risks.interaction_risks_extra: [
  "kakao",              // kofeiin + teobromiin
  "alkohol",            // hepato/koostoimed
  "kofeiin",            // kohv/tee/energiajoogid
  "kanep_CBD",          // antikoagulandi + sedatiivid
  "kava",               // maksarisk
  "kratom"              // mitu koostoimeriski
]
```

---

### **D. ANTIKOAGULANT - "MAAKELI" SELGITUS**

**Praegu:** Checkbox "Antikoagulant?"

**UUENDA:**
```javascript
risks.anticoagulant: {
  flag: true/false,
  type: ["varfariin", "apiksabaan", "rivaroksabaan", "dabigatraan", "edoksabaan"],
  antiplatelet: ["aspiriin", "klopidogreel"]
}
```

**Info nupp:**
- **Mis see on?** Verevedeldaja. Aitab ära hoida trombe, kuid suurendab veritsuse riski.
- **Milliseid taimi vältida:** ginkgo, naistepuna, küüslauk, ingver, kurkum
- **Mis asendada:** hibiskus, viirpuu jne

---

## **v2.0.0 - RESSURSID + DIAGNOSTIKA + TAIMRAVI**

### **A. RESSURSID JA EELARVE**

```javascript
resources: {
  ligipaas: ["apteek", "loodusravi_pood", "puudub"],
  apteek_piirkond: "...",     // Eesti keti valik
  hoiatus_meta: "..."         // Kahtlased teenused piirkonnas
}
```

**UI:**
- Kolm valikut: **Apteek** (eri apteegid) | **Loodustoodete pood** | **Puudub**
- **Piirkond/kihelkond** valik → soovitab kohalikke poode ja ravitsejaid
- **Hoiatus meta-infos** kui piirkonnas kahtlaseid teenusepakkujaid

---

### **B. MINIMAALNE DIAGNOSTIKA**

```javascript
baseline_diagnostics: [
  // Plus-nuppude süsteem
  // Info Tab A/B iga testi kohta
]
```

---

### **C. TAIMRAVI - KULTUURIDEÜLENE**

```javascript
herbal: {
  cultures: ["Ayurveda", "TCM", "Põhjala", "Slaavi", "Maailma_rahvamed"],
  items: [
    // + "Imetamine" (kuidas, kus saab)
  ]
}
```

**Scope:** `modality | belief`

---

### **D. IDEOLOOGIA JA PIIRJOONED**

```javascript
ideology: {
  piirjooned: [...],
  mida_ei_soovi: [...]    // Eraldi kast + lühiselgitus
}
```

---

### **E. VANN/SAUN - REORGANISEERIMINE**

- ✅ Liiguta **Kehaliste praktikate esimeseks**
- ✅ Lisa **Ravidussid** plusidesse

---

## 🏷️ **SCOPE TAKSONOOMIA:**

```javascript
scope: {
  universal,      // privaatsus, punased lipud, kodumõõtmised
  demographic,    // rasedus, vanus, sugu
  organ,          // AF+antikoagulant, eGFR, Child-Pugh
  context,        // elupaik, töö, transport
  modality,       // taimed, praktikad, vann/saun, muusika
  belief          // usulised, vaimsed, paranormaalsed
}
```

---

## 🤖 **AI PROMPTID - 2 TÜÜPI:**

### **1. LIHTNE LÜHI-PROMPT**
- Kiire konsult
- Safety + 3 sekkumist + kodumõõtmine

### **2. TÄIELIK PROMPT**
- Põhjalik konsult
- Specialty-mode
- LISP otsustuspuu
- Cross-check (2 eriala)

### **Specialty režiimid:**
- family-medicine
- cardiology
- hepatology
- nephrology
- Ayurveda
- TCM
- naturopathy
- sports
- rural-traditions

---

## 📁 **"i"-NUPU KAHEASTMELINE MODAAL:**

### **Tab A: Sise-Wiki**
- Lühikirjeldus
- Kliiniline kasutus
- Doosid
- Koostoimed
- Kohandused (rasedus, eakas, neer, maks)

### **Tab B: Avalikud Allikad**
- 3-5 viitega
- Eri keeled (EST/ENG/RUS/POL/HEB/CHI)
- DOI-d
- Evidence grade

---

## 🗺️ **ROADMAP UUENDAMINE:**

ROADMAP.md on praegu vana (v1.2 põhine). Uuenda:
- ✅ v1.5.0 - Profiilifiltri süsteem
- ✅ v1.6.0 - Plus-nuppude laiendus
- 📋 v1.7.0 - UNI + Privaatsus
- 📋 v1.8.0 - Tööriistad + Liikumine
- 📋 v1.9.0 - Töö + Toitumine
- 📋 v2.0.0 - Ressursid + Diagnostika

---

## ⚠️ **OLULINE:**

**Belief scope:**
- Märgista UI-s hallika tooniga
- Ekspordi "belief" väljad eraldi plokis
- Vaikimisi peidetavad med-personalile

**Riskiväravad:**
- Rasedus/imetamine → esimene kontroll
- eGFR, Child-Pugh, antikoagulant → enne soovitusi

**JSON normaliseerimine:**
- `toCanonical()` funktsioon
- Üks standardne objekti AI jaoks

---

**Versioon:** 1.8.0-PLAN
**Viimati uuendatud:** 12.11.2025
**Eelmine versioon:** v1.7.5 ✅ VALMIS (13 paketti)
**Järgmine uuendus:** v1.8.0+ implementeerimisel
