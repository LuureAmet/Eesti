# PRAEGUNE SEIS - Meigo Medical Medisiiniportaal

**Kuupäev:** 13.11.2025
**Versioon:** v1.7.5.4
**Branch:** `claude/medical-portal-v1.7-implementation-011CV2rzuWMTMXiRnuywRdE2`
**Viimane commit:** ea55fc2

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

### **v1.7.5 - PARANDUSED JA PUHASTUS (12.11.2025)**

**Failid:**
- `medportal/forms/full-profile.html` (PARANDUSED)
- `medportal/js/info-system.js` (lisa quickAddHomeSupport)
- `medportal/config/site-config.js` (v1.7.5)

#### **TEHTUD PARANDUSED:**

**1. Versiooni uuendus:**
- Versioon 1.7.0 → 1.7.5 (site-config.js)
- Changelog uuendatud

**2. Duplikaadide eemaldamine:**
- Eemaldatud "Või märgi lihtsalt perekondlik risk" (radio grupp)
- Eemaldatud "Või märgi lihtsalt piirangud" (5 checkboxi: gluteen, piim, liha, suhkur, sool)
- Eemaldatud "Või märgi lihtsalt tee kasutamine" (4 checkboxi: roheline, hibiskus, must, ravimtaimed)
- Eemaldatud "Või märgi lihtsalt ligipääs" (4 checkboxi: loodustoodete pood, iHerb, TCM/Ayurveda, puudub)
- Eemaldatud "Põhiline elupaik" vanad checkboxid (maaelu, linn, öötöö - on juba plusid)
- Eemaldatud "Üldine aktiivsuse tase" vanad radio nupud (kõnd, füüsiline, istuv, segarežiim)
- Eemaldatud "Norskamine/pausid" kogu vana sektsioon (26 rida)
- Eemaldatud "Kõnnitempo ja distants" vana radio grupp (8 rida)
- Eemaldatud "Vann/leotus (Epsom)" vana radio grupp (7 rida)

**3. UI parandused:**
- "(belief)" sildid peidetud UI-st (3 kohast) - jäi ainult metadata
- Sünnikuupäev ja -asukoht liigutatud kehaandmete sektsiooni sisse (BMI alla)
- Töövõime sektsioon kompaktne: dropdown + 2-veeruline grid layout (vähendatud ~40% vertikaali)
- "Piirangud tööl" → "Piirangud töö jaoks"
- BMI kalkulaator jäi kehaandmete juurde (pikkuse ja kaalu juures)

**4. Kodune tugi plus-süsteem:**
- Konverteeritud vanad radio nupud plus-nuppude süsteemiks
- 6 kategooriat: Perekonnaliige, Partner, Hooldaja, Sõber/Naaber, Üksi, Muu
- Lisatud `quickAddHomeSupport()` funktsioon (info-system.js:2862)

#### **STATISTIKA:**
- 4 commit'i
- ~200 rida koodi eemaldatud (duplikaadid)
- ~100 rida koodi lisatud/muudetud (parandused)
- 1 uus funktsioon (quickAddHomeSupport)

---

### **v1.7.5.1 - VEREVEDELDAJAD + KODUSED MÕÕTMISED (12.11.2025)**

**1. Verevedeldajad (Antikoagulant → plus-süsteem):**
- 8 ravimit: Varfariin, Apiksabaan, Rivaroksabaan, Dabigatraan, Edoksabaan, Aspiriin, Klopidogreel, Muu
- Väljad: annus, sagedus (1×/2× päevas, vajadusel, muu), täpsustus
- Automaatne HOIATUS: vältida taimi (ginkgo, naistepuna, küüslauk, ingver, kurkum)
- Soovitatavad: hibiskus, viirpuu, arjuna
- Lisatud `quickAddAnticoagulant()` funktsioon

**2. Kodused mõõtmised (plus-süsteem):**
- 7 seadet: Vererõhumõõtja, Sammulugeja, Kaal, Veresuhkur, Termomeeter, Oksümeeter, Muu
- Spetsiifilised väljad iga seadme jaoks:
  * Vererõhk: BP hommikul/õhtul, pulss rahus
  * Sammulugeja: päevane keskmine
  * Kaal: 7-päeva trend (tõuseb/stabiilne/langeb)
  * Veresuhkur: tühja kõhuga keskmine
  * Oksümeeter: tavaline SpO2
- Eemaldatud 3 vana radio-group'i
- Lisatud `quickAddHomeMeasurement()` funktsioon

---

### **v1.7.5.2 - TOITUMISE RÜTM PLUS-SÜSTEEMIKS (12.11.2025)**

**Söögiajaaknad ja paast (plus-süsteem):**
- 9 mustrit:
  * 2×/3× päevas (regulaarne)
  * Paindlik (söön kui jõuan)
  * Paast 16:8 (8h aken), 12:12, 18:6
  * Hobo-stiil (söön kui juhtub)
  * Linnakiirtoit
  * Muu muster
- Paastude jaoks: söögiajaakna sisestamine (nt 12:00-20:00)
- Hobo ja linnakiirtoit: selgitavad tekstid
- Eemaldatud 2 vana radio-group'i (mealFrequency, fasting)
- Lisatud `quickAddMealPattern()` funktsioon

---

### **v1.7.5.3 - INFO NUPUD LISATUD (12.11.2025)**

**Info nupud lisatud järgmistele sektsioonidele:**
- 2A. Uni ja norskamine (une olulisus, 7-9h/öö soovitus)
- 3. Tööriistad ja kodused mõõtmised (enesejuhtimise võimekus)
- 6. Taimravi ja looduslikud meetodid (HOIATUS koostoimetest)
- 8. Kehalised ja meele praktikad (regulaarsus oluline)
- 10. Ideoloogia ja piirjooned (väärtused ja piirid)
- 11. Ressursid ja eelarve (kättesaadavus mõjutab valikuid)

**Info nupu struktuur:**
- Lühike popup tekst (title attribute)
- Viide: "Vajuta siia et näha rohkem infot" (tulevikus avab modaali)
- Järjepidev stiil kõikides sektsioonides

---

### **v1.7.5.4 - KOOSTOIME RISKID JA RESSURSID (13.11.2025)**

**1. ELUSTIILI AINETE KOOSTOIMERISKID (uus plus-süsteem):**
- 6 nuppu: Kakao/šokolaad, Alkohol, Kofeiin, Kanep/CBD, Kava, Kratom
- Igaühel spetsiifilised väljad:
  - Kakao: sagedus, kogus päevas
  - Alkohol: sagedus, ühikut nädalas (KÕRGE RISK hoiatus)
  - Kofeiin: allikas (kohv/tee/energiajook/cola), kogus
  - Kanep/CBD: vorm (CBD õli/full spectrum/THC), sagedus
  - Kava: sagedus, vorm (MAKSATOKSILINE hoiatus)
  - Kratom: sagedus, kogus (KÕRGE RISK hoiatus)
- Hoiatused:
  - Alkohol: koostoime maksaravimid, verevedeldajad, sedatiivid
  - Kofeiin: koostoime südameravimid, beeta-blokaatorid
  - Kanep/CBD: CYP450 metaboliseerub (paljude ravimitega)
  - Kava: maksatoksilisus
  - Kratom: sõltuvuse risk, opioidid
- Uus funktsioon: `quickAddInteraction()`

**2. RESSURSID LIGIPÄÄS (täiendatud):**
- Lisatud "Apteek" nupp (Benu, Südameapteek, Euroapteek vms)
- Lisatud "Puudub" nupp (piiratud ligipääs)
- Kogu ligipääsu sektsioon nüüd 7 valikuga

**Failid:**
- `medportal/forms/full-profile.html` (rida 1390-1418: elustiili ained)
- `medportal/forms/full-profile.html` (rida 1756-1769: ressursid)
- `medportal/js/info-system.js` (quickAddInteraction funktsioon)

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
