# PRAEGUNE SEIS - Meigo Medical Medisiiniportaal

**Kuupäev:** 12.11.2025
**Versioon:** v1.7.5
**Branch:** `claude/medical-portal-v1.7-implementation-011CV2rzuWMTMXiRnuywRdE2`
**Viimane commit:** c41dd38

---

## ✅ **MIS ON TEHTUD:**

### **v1.5.0 - PROFIILIFILTRI SÜSTEEM (11.11.2025)**

**Failid:**
- `medportal/js/profile-filter.js` (UUS)
- `medportal/css/forms.css` (LISA)
- `medportal/forms/full-profile.html` (UUENDATUD)

**Funktsioonid:**
- `selectAgeCategory()` - 11 vanusekategooriat
- `updateProfileFilter()` - peamine uuendamise funktsioon
- `updateProfileSummary()` - sticky header kokkuvõte
- `updateProfileWarnings()` - reaalajas hoiatused

**Profiilifiltri järjekord:**
1. Rasedus/Imetamine
2. Vanus (11 kategooriat: vastsündinu → oldest-old)
3. Sugu (auto-aktiveeritakse naine kui rasedus)
4. Meditsiinilised riskid:
   - AF + Antikoagulant
   - eGFR (neerud)
   - Child-Pugh (maks)

**Hoiatuste süsteem:**
- Rasedus → väldi: ginkgo, ginseng, naistepuna, lagrits, kelp
- Imetamine → ettevaatust
- AF+antikoagulant → verejooksu risk
- eGFR madal → neerukoormuse piirangud
- Child-Pugh → maksakoormus
- Eakad → "start low, go slow"
- Lapsed → väldi stimulandid

---

### **v1.6.0 - PLUS-NUPPUDE LAIENDUS (11.11.2025)**

**Failid:**
- `medportal/js/info-system.js` (UUENDATUD)
- `medportal/forms/full-profile.html` (UUENDATUD)
- `medportal/config/site-config.js` (v1.6.0)

**MED_INFO_DB laiendused (17 uut kirjet):**

**1. Elupaik (4):**
- kortermajas
- maaelu
- linn
- öötöö

**2. Liikumine (5):**
- jalgratas
- rulluisutamine
- ujumine
- mägimatk
- kõndimine

**3. Kaebused (9):**
- peavalu
- iiveldus
- liigesevalu
- seljavalu
- kurguvalu
- menstruaalivalud (naiste)
- PMS (naiste)
- kuumad hood (naiste)
- migreen

**4. Vann/Saun (4):**
- epsom_vann
- külm_dušš
- saun
- jalavannikud

**5. Muusika (4):**
- klassikaline_muusika
- binauraalsed_lööid
- loodus_helid
- meditatsioon_muusika

**Uued funktsioonid (5):**
1. `quickAddResidence()` - medportal/js/info-system.js:1454
2. `quickAddMobility()` - medportal/js/info-system.js:1506
3. `quickAddComplaint()` - medportal/js/info-system.js:1678
4. `quickAddBath()` - medportal/js/info-system.js:1735
5. `quickAddMusic()` - medportal/js/info-system.js:1792

**HTML plus-nuppude sektsioonid:**
- Elupaik - full-profile.html:321-340
- Liikumine - full-profile.html:549-570
- Kaebused - full-profile.html:494-524 (sh naiste kaebused eraldi!)
- Vann/Saun - full-profile.html:1058-1077
- Muusika - full-profile.html:1089-1108

**Värvikoodid:**
- Elupaik: Kollane/amber (#fef9c3)
- Liikumine: Sinine (#dbeafe)
- Kaebused: Punane (#fef2f2)
- Vann/Saun: Helesinine (#e0f2fe)
- Muusika: Lilla (#f3e8ff)

---

### **v1.7.5 - MASSIIVNE UUENDUS (13 PAKETTI!) (12.11.2025)**

**Failid:**
- `medportal/forms/full-profile.html` (MASSIIVNE UUENDUS)
- `medportal/js/info-system.js` (MASSIIVNE UUENDUS)
- `medportal/config/site-config.js` (v1.7.5)

#### **PAKETT 1: Profiilifiltri täiendused**
- ✅ "Lapseootel" label muudetud "Rasedus" → **"Lapseootel"**
- ✅ Centaur vanus (100-120 aastat) kullasel taustal
- ✅ Hõlmab Suur-Tõu (elf) vanused: 0.08-20 (väikelaps), 20-100 (täiskasvanu), 100-175 (eakas), 175+ (kõrgealine)
- ✅ Reaalajas hoiatused täiustatud

#### **PAKETT 2: Bio-markerid (4 plus-nuppu)**
- ✅ `quickAddBioMarker()` funktsioon
- ✅ 4 bio-markerit: Kromosoomid, Gonaddid, Hormoonid, Muu bio-marker
- ✅ Iga marker küsib: tüüp, väärtus, kuupäev, märkused

#### **PAKETT 3: Profiilifilter täiendused**
- ✅ 7 uut filtrit: toidupiirangud, allergiad, kultuurilised, usulis-moraalsed, elustiil, füüsiline pool, perekondlik
- ✅ Kombineeritud filtrid (nt rasedus+toidupiirangud)
- ✅ Reaalajas filtreerimise preview

#### **PAKETT 4: Mütoloogia/Identiteet**
- ✅ Mütoloogilised liigid: inimene, elf (suur-tõu), päkapikk (väike-tõu), kääbus, centaur, poolinimene, väetee, muu
- ✅ Vanusekategooriate automaatne kohandamine liigi järgi

#### **PAKETT 5: Spordid ja harjutused (12+ plus-nuppu)**
- ✅ `quickAddSport()` funktsioon
- ✅ 12 sporti: jõusaal, jooga, taiji, kergejõustik, võitluskunstid, Tsigong, raskusjooksud, Crossfit, sulgpall, korvpall, võrkpall, veloergomeeter
- ✅ Iga sport: sagedus, kestus, intensiivsus, märkused

#### **PAKETT 6: Töö tüübid (12+ plus-nuppu)**
- ✅ `quickAddJobType()` funktsioon
- ✅ 12 töötüüpi: istuv arvutitöö, füüsiline töö, öötöö, vahetustega töö, transport, müük, õpetaja, meditsiin, turvateenistus, jaotaja (Bolt), metsatööline, muu
- ✅ Töövõime hinnang: kompaktne 2-veeruline layout (dropdown + checkboxed)

#### **PAKETT 7: Töövõime hinnang**
- ✅ Töövõime % dropdown (100%, 75%, 50%, 25%, 0%)
- ✅ Piirangud töö jaoks (6 tüüpi): raske tõstmine, püstijäämine, pikem istumine, arvutitöö, öötööd, stressitaluvus
- ✅ Kompaktne UI: 2-veeruline grid, vähendatud vertikaalne pikkus ~40%

#### **PAKETT 8: Alternatiivsed tööriistad (10+ plus-nuppu)**
- ✅ `quickAddAltTool()` funktsioon
- ✅ 10 tööriista: bioenergia mõõtja, eluenergia mõõtja, aura kaamera, pendel, Hiina pulsi hindamine, nõia mõõtmised, UroDevTugi, tšakrate skanner, kristallravi, muu
- ✅ Märgitud "(belief)" scope metadata
- ✅ Kasutamise sagedus + tulemused

#### **PAKETT 9: Meditsiiniportaalid (Euroopa/Maailma)**
- ✅ `quickAddPortal()` funktsioon
- ✅ Eesti portaalid (4): Digilugu, Tervisekassa, TIS, Haigla portaal
- ✅ Euroopa portaalid (7): EHIC, e-Tervis (Soome), 1177 (Rootsi), Patientenakte (Saksamaa), Dossier Médical (Prantsusmaa), My Health Online (UK), EU portaal
- ✅ Maailma portaalid (6): MyChart/EPIC (USA), NHS App (UK), Gezondheid.be (Belgia), Santé.fr (Prantsusmaa), MyHealth (Kanada), Muu portaal
- ✅ Värvikoodi: Eesti (sinine), Euroopa (kollane), Maailm (roheline)
- ✅ Väljad: kasutajakonto (jah/ei), viimati kasutatud, märkused

#### **PAKETT 10: Antikoagulant → Verevedeldajad**
- ✅ Label muudetud "Antikoagulant?" → **"Verevedeldajad?"**
- ✅ Tooltip: "Varfariin, apiksabaan, rivaroksabaan, või aspirin/klopidogreel"
- ✅ Koostoime hoiatused (ginkgo, küüslauk, naistepuna)

#### **PAKETT 11: Vann/Saun laiendus (6 uut saunatüüpi)**
- ✅ Uued saunatüübid: Soome saun, Vene banja, Türgi hammam, Infrapuna saun, Aurukamber, Muu saunatüüp
- ✅ Iga tüüp: sagedus, temperatuur, kestus, märkused

#### **PAKETT 12: Try-If-Needed (Vajadusel) + lohistamine**
- ✅ `addTryIfNeeded()`, `moveTryIfNeededUp()`, `moveTryIfNeededDown()` funktsioonid
- ✅ 10 abinõu: kiirtablettid (paracetamol, ibuprofen), tee (ingver, mäta), hingamine, rahu, jalutus, vesi juurde, magustoit, soe kott, muu
- ✅ Järjekorra muutmine: ↑/↓ nupud
- ✅ Iga abinõu: millal kasutad, annus/kogus, täpsustus

#### **PAKETT 13: Privaatsus filter (14 kategooriat, 3 presetti)**
- ✅ 14 privaatsuse kategooriat:
  1. Kõik "belief" väljad (paranormaalsed uned, aura kaamera, alternatiivsed tööriistad)
  2. Jumala/usundi detailid
  3. Mütoloogia/identiteet
  4. Astroloogia andmed (sünnikuupäev, -asukoht)
  5. Bio-markerid (kromosoomid, gonaddid, hormonid)
  6. Meditsiiniportaalide ligipääsud
  7. Rahaline info
  8. Vaimne tervis (ärevus, depressioon, painajad)
  9. Puuded ja erivajadused
  10. Sõltuvusained (alkohol, suitsetamine)
  11. Seksuaaltervis detailid
  12. Elupaiga detailid (korrus, lift, naabrite info)
  13. Töö piirangud ja võimekus
  14. Perekondliku riski detailid
- ✅ 3 presetti:
  - **Kõik nähtav** (arstile) - kõik väljad eksporditakse
  - **Ainult meditsiiniline** (AI-le) - filtreerib spirituaalsed, astro, portaalid, rahaline
  - **Anonüümne** (teadlastele) - peidab enamik isikuandmeid, näitab ainult vaimne tervis, puuded, sõltuvusained
  - **Kohandatud** - kasutaja valib käsitsi
- ✅ Reaalajas preview filtreeritavatest väljadest
- ✅ Ekspordi kinnitusdialoogi hoiatus filtrite kohta

#### **UI PARANDUSED:**
- ✅ BMI kalkulaator: jäi kehaandmete sektsiooni (pikkuse ja kaalu juurde)
- ✅ Sünnikuupäev ja -asukoht: liigutatud kehaandmete sektsiooni sisse (BMI alla)
- ✅ Eemaldatud KÕIK vanad "Või märgi lihtsalt..." topelt-listid
- ✅ Eemaldatud "(belief)" UI sildid (jäi ainult metadata)
- ✅ Töövõime sektsioon: kompaktne 2-veeruline layout (dropdown + 3-veeruline checkbox grid)
- ✅ "Piirangud tööl" → "Piirangud töö jaoks"
- ✅ Eemaldatud vanad radio/checkbox listid: põhiline elupaik, aktiivsuse tase, norskamine/pausid, kõnnitempo ja distants
- ✅ "Kodune tugi" konverteeritud plus-nuppude süsteemiks (6 kategooriat)

#### **UUED FUNKTSIOONID (10):**
1. `quickAddBioMarker()` - bio-markerid (kromosoomid, gonaddid, hormonid)
2. `quickAddMythology()` - mütoloogilised liigid (elf, kääbus, centaur...)
3. `quickAddSport()` - spordid ja harjutused (12+ tüüpi)
4. `quickAddJobType()` - töö tüübid (12+ tüüpi)
5. `quickAddAltTool()` - alternatiivsed/vaimsed tööriistad (10+ tüüpi) **belief**
6. `quickAddPortal()` - meditsiiniportaalid (Eesti, Euroopa, Maailm)
7. `addTryIfNeeded()` - vajadusel abinõud (10+ tüüpi)
8. `moveTryIfNeededUp()` / `moveTryIfNeededDown()` - järjekorra muutmine
9. `quickAddHomeSupport()` - kodune tugi (6 kategooriat)
10. Vann/Saun laiendus (6 uut saunatüüpi)

#### **PRIVAATSUSE FILTER FUNKTSIOONID (3):**
1. `updatePrivacyFilters()` - näitab preview filtreeritavatest väljadest
2. `setPrivacyPreset()` - seadistab 3 eelseadistust (arst, AI, teadlane)
3. `exportWithPrivacyFilters()` - eksportimine koos filtrite kinnitusega

#### **STATISTIKA:**
- ~1800+ rida koodi lisatud/muudetud
- 75+ uut plus-nuppu
- 15+ uut JavaScript funktsiooni
- 14 privaatsuse kategooriat
- 3 privaatsuse presetti
- 6 uut saunatüüpi
- 17 meditsiiniportaali (Eesti + Euroopa + Maailm)
- 10+ alternatiivseid tööriistad (belief scope)

---

## 📊 **PRAEGUNE STRUKTUUR:**

### **Failid:**
```
medportal/
├── forms/
│   └── full-profile.html          (18 sektsiooni)
├── js/
│   ├── info-system.js             (MED_INFO_DB + quickAdd funktsioonid)
│   ├── profile-filter.js          (profiilifiltri loogika)
│   └── ...
├── css/
│   └── forms.css                  (plus-nuppude stiilid)
├── config/
│   └── site-config.js             (v1.6.0)
└── docs/
    ├── STRATEGY-v1.7-PLAN.md      (tuleviku plaan)
    ├── CURRENT-STATUS.md          (see fail)
    ├── ROADMAP.md                 (VANA - vajab uuendust!)
    └── ...
```

### **18 Sektsiooni (full-profile.html):**
1. **Profiilifiltri** - rasedus/vanus/sugu/riskid (UUENDATUD v1.5.0)
2. Privaatsus ja nõusolek
3. **Kaebused ja sümptomid** (UUENDATUD v1.6.0 - plus-nupud)
4. Elurütm ja eluviis
   - **Elupaik** (UUENDATUD v1.6.0 - plus-nupud)
   - Transport (v1.4.5)
5. Koormustaluvus ja töö
   - **Liikumine** (UUENDATUD v1.6.0 - plus-nupud)
6. Tööriistad ja kodused mõõtmised
7. Ajalugu ja sündmused
8. Allergiad
9. Ravimid ja lisandid
10. Taimravi ja looduslikud meetodid
11. **Praktikad ja rütmid** (UUENDATUD v1.6.0 - vann/saun plus-nupud)
12. **Rütmipraktikad** (UUENDATUD v1.6.0 - muusika plus-nupud)
13. Ideoloogia ja piirjooned
14. Ressursid ja eelarve (v1.4.7)
15. Perekondlik risk (v1.4.7)
16. Toitumisprofiil (v1.4.6 - tee-liigid)
17. Minimaalne diagnostika
18. Eksport ja AI prompt

---

## 🔧 **TEHNILISED DETAILID:**

### **quickAdd Funktsioonide Muster:**
```javascript
function quickAddX(key, name) {
    if (!quickAddCounters.x) quickAddCounters.x = 0;
    quickAddCounters.x++;

    const containerId = 'quickAddedX';
    let container = document.getElementById(containerId);

    if (!container) {
        // Loo container
    }

    const itemId = `x_quick_${quickAddCounters.x}`;
    const fieldName = `x_${key}_${quickAddCounters.x}`;

    // Create itemDiv with:
    // - Checkbox
    // - Info icon
    // - Remove button
    // - Inline notes toggle

    container.appendChild(itemDiv);
    showToast(`${name} lisatud!`);
}
```

### **MED_INFO_DB Struktuur:**
```javascript
MED_INFO_DB = {
    'key': {
        title: 'Pealkiri',
        shortInfo: 'Lühikirjeldus (hover popup)',
        ourInfo: `<h4>...</h4><p>...</p>`,    // Tab A
        externalInfo: `<p>...</p>`            // Tab B
    }
}
```

### **Profile Filter Struktuur:**
```javascript
profileFilter = {
    pregnancy: null,              // 'pregnant'|'breastfeeding'|'no'
    pregnancyWeeks: null,
    ageCategory: null,            // '0-0.08'|'0.08-1'|...
    ageCategoryLabel: null,
    exactAge: null,
    gender: null,                 // 'male'|'female'
    afAnticoagulant: false,
    egfr: null,
    childPugh: null
}
```

---

## ⚠️ **TEADAOLEVAD PROBLEEMID:**

### **1. Duplikaadid:**
- "Child-Pugh" kuvatakse kahel real (HTML)
- "8 Brokaati" loetletud kaks korda

### **2. ROADMAP.md on VANA:**
- Praegune ROADMAP.md on v1.2 põhine (10.11.2025)
- Ei vasta tegelikele versioonidele (v1.5.0, v1.6.0)
- Vajab täielikku ümbertöötamist

### **3. "file://" linkide probleem:**
- ARCHITECTURE.md/DEVELOPMENT.md ei avane
- Soovitus: käivita local HTTP server

---

## 📋 **JÄRGMISED SAMMUD:**

### **v1.8.0+ (JÄRGMINE):**
1. **UNI** - täiendused:
   - Unenäod detailid (sagedus, tüübid, unepäevik)
   - Und soodustavad praktikad (lisaplusid: melatoniini kasutus, valguseräm, öömask, kõrvatropid)
   - Uneprobleemide põhjused (stress, valulik, vahetatööd, lapsed)

2. **KAEBUSED** - täiendused:
   - Tinnitus, pearinglus, kõhukeeramine, valguse talumatus
   - Krooniline valu (tüübid, intensiivsus, sagedus)

3. **LIIKUMISE VIISID** - mittefüüsilised/vaimsed (belief):
   - Remote viewing, levitatsioon, ajarännak, šamaani rännak, tahteväleline rännak

4. **TOITUMISPROFIIL** - laiendused:
   - 22 rikka toitu (rasvased lihad, maks, juustud, šokolaad, pähklid...)
   - Tava toidud lusikaga (putrud, supid, hautised, kiirtoit linnas)
   - Piirangute põhjused lisa: partner ei luba, tunnetus, hirm tundmatu ees
   - Söögiajaaknad: paast, hobo (söö millal juhtub), linnakiirtoit, magusaltuvus

5. **KOOSTOIME RISKID** - lisa:
   - Kakao (kofeiin + teobromiin)
   - Kanep/CBD (antikoagulandid + sedatiivid)
   - Kava (maksarisk)
   - Kratom (koostoimed)

### **v1.9.0+:**
6. **RESSURSID JA EELARVE** - piirkond, ligipääs:
   - Apteek (Eesti ketid: Apotheka, Benu, Südameapteek...)
   - Loodustoodete pood (iHerb, kohalikud)
   - Puudub
   - Hoiatus kahtlastest teenusepakkujatest piirkonnas

7. **MINIMAALNE DIAGNOSTIKA** - plusid:
   - Vererõhk, puls, temp, vere suhkur, kaal, BMI, vöökohtu ümbermõõt
   - Lab testid: täisveri, eGFR, ALAT, lipidid, glükoos, D-vitamiin, B12, raud, TSH

8. **TAIMRAVI - KULTUURIDEÜLENE:**
   - Ayurveda, TCM, Põhjala, Slaavi, Maailma rahvamed
   - Info iga kultuuri kohta + imetamine (kuidas, kus saab)

9. **IDEOLOOGIA JA PIIRJOONED:**
   - Mida EI soovi (eraldi kast + lühiselgitus)
   - Usulised/filosoofilised piirid

### **v2.0.0+:**
10. **AI PROMPTID** - 2 tüüpi:
    - Lihtne lühi-prompt (kiire konsult, safety + 3 sekkumist)
    - Täielik prompt (põhjalik, specialty-mode, LISP otsustuspuu)
11. **JSON EKSPORT** - normaliseerimine:
    - `toCanonical()` funktsioon
    - Standardne objekti formaat AI jaoks
12. **BACKEND** - andmete salvestamine ja turvalisus

---

## 🗂️ **DOKUMENTATSIOON:**

### **Olemas:**
- ✅ `STRATEGY-v1.7-PLAN.md` - tuleviku plaan
- ✅ `CURRENT-STATUS.md` - see fail
- ✅ `ARCHITECTURE.md`
- ✅ `DEVELOPMENT.md`
- ✅ `FILE-GUIDE.md`
- ⚠️ `ROADMAP.md` - VAJAB UUENDUST!

### **Puudub:**
- ❌ `BELIEF-SCOPE-GUIDE.md` - juhend belief väljade jaoks
- ❌ `AI-PROMPT-GUIDE.md` - AI promptide juhend
- ❌ `I-TAB-CONTENT-GUIDE.md` - "i"-nupu sisu juhend

---

## 🔑 **VÕTMESÕNAD:**

- **Profiilifiltri** - rasedus/vanus/sugu/riskid
- **Plus-nupud** - kiirvaliku süsteem
- **quickAdd** - dünaamiline lisamine
- **MED_INFO_DB** - info andmebaas
- **"i"-nupp** - kaheastmeline info modaal
- **Scope** - universal/demographic/organ/context/modality/belief
- **Sticky header** - profiilifiltri kokkuvõte
- **Toast** - kasutaja tagasiside

---

**Viimati uuendatud:** 12.11.2025
**Versioon:** 1.7.5
**Järgmine uuendus:** v1.8.0+ implementeerimisel
