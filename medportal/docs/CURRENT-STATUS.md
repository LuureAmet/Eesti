# PRAEGUNE SEIS - Meigo Medical Medisiiniportaal

**Kuupäev:** 11.11.2025
**Versioon:** v1.6.0
**Branch:** `claude/medical-portal-setup-011CUxmtZU5NRXCwtdEnHnBS`
**Viimane commit:** e7b29c9

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

### **v1.7.0 (JÄRGMINE):**
1. UNI eraldi sektsioon + plusid
2. Privaatsus ja nõusolek MASSIIVNE laiendus
3. "Belief" scope süsteem
4. Puhastus (eemalda topelt menüüd)

### **v1.8.0:**
5. Tööriistad (bioenergia, vaimsed mõõtjad)
6. Liikumise viisid (vaimsed/mittefüüsilised)
7. Kaebused täiendused

### **v1.9.0:**
8. Koormustaluvus ja töö täiendused
9. Toitumisprofiil laiendused
10. Koostoime riskid + antikoagulant selgitus

### **v2.0.0:**
11. Ressursid ja eelarve (piirkond, apteegid)
12. Minimaalne diagnostika plusid
13. Taimravi kultuurideülene

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

**Viimati uuendatud:** 11.11.2025
**Versioon:** 1.6.0
**Järgmine uuendus:** v1.7.0 implementeerimisel
