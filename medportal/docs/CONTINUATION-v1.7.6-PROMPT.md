# JÄTKAMISE DOKUMENT - Medical Portal v1.7.6

**Kuupäev:** 13.11.2025
**Branch:** `claude/medical-portal-v1.7-implementation-011CV2rzuWMTMXiRnuywRdE2`
**Viimane versioon:** v1.7.5.4
**Viimane commit:** 8c94e19

---

## 📋 SESSIOONI AJALUGU

### Eelmine sessioon (13.11.2025):
**Tehtud:**
- ✅ v1.7.5.4: Lisatud 6 elustiili ainet plus-süsteemiks (kakao, alkohol, kofeiin, kanep/CBD, kava, kratom)
- ✅ Lisatud "Apteek" ja "Puudub" nupud ressursside sektsiooni
- ✅ Dokumentatsioon uuendatud

**Eelnevad sessioonid:**
- v1.7.5.3: Info nupud lisatud 6 sektsiooni
- v1.7.5.2: Toitumise rütm plus-süsteemiks (9 mustrit)
- v1.7.5.1: Verevedeldajad (8 ravimit) + Kodused mõõtmised (7 seadet)
- v1.7.5: PARANDUSED - eemaldatud duplikaadid, UI puhastus

---

## 🚨 KRIITILISED PROBLEEMID (korduvalt mainitud, 4-5 korda!)

### PRIORITEET 1: Profiilifiltri algus plus-nuppudega

**Probleem:**
Praegu profiilifiltri sektsioon "⚕️ Profiili Filter - Alusta siit!" on checkboxid ja radio-nupud.

**Nõue:**
Peab algama PLUS-NUPPUDEGA järjestuses:
1. **+Lapseootel** (esimesena!)
2. **+Vanus** (11 kategooriat)
3. **+Naine**
4. **+Mees**
5. **+Sootuks sootu**

Neid valides avanevad nendele kohased muud asjad (nagu juba tehtud plus-süsteemides).

**Faili asukoht:**
`medportal/forms/full-profile.html` - rida ~240-350 (profiilifiltri sektsioon)

**Funktsiooni asukoht:**
`medportal/js/profile-filter.js` - kogu fail vajab refactoringut

---

### PRIORITEET 2: Plus-süsteemi käitumine

**Probleem 1: Uued valikud lähevad lõppu**
Praegu kui vajutan plus-nuppu, lisandub uus väli LÕPPU. Kui palju asju valida, ei näe uusi asju.

**Nõue:**
Uued valikud peavad tulema ESIMESENA (rea algusesse, mitte lõppu).

**Koodis muuta:**
KÕIK `quickAdd*()` funktsioonid `info-system.js` failis:
```javascript
// PRAEGU:
container.appendChild(itemDiv);  // VALE - lisab lõppu

// PEAKS OLEMA:
container.insertBefore(itemDiv, container.firstChild);  // ÕIGE - lisab algusesse
```

**Probleem 2: Teist korda vajutades peaks deselecting**
Kui sama nuppu kaks korda vajutada, peaks selle deselecting (eemaldama), VA kui on midagi mida mitu korda lisada saab.

**Nõue:**
- Enamikul nuppudel: teine vajutus = eemalda see valik
- Välistused: asjad kus saab mitu korda lisada (nt ravimid, sport, jne)

**Koodis muuta:**
Lisa kontroll `quickAdd*()` funktsioonidesse:
```javascript
// Kontrolli kas juba olemas
const existing = document.querySelector(`[name^="${fieldName}"]`);
if (existing && !allowMultiple) {
    existing.closest('.form-group').remove();
    showToast(`${name} eemaldatud!`);
    return;
}
```

---

### PRIORITEET 3: Kehaandmed - liiga pikad kastid

**Probleem:**
Kehaandmete väljad on liiga pikad (width) 3 numbri jaoks.

**Nõue:**
- Kõrgus, kaal, vanus, vererõhk jne väljad peavad olema lühikesed (nt `style="width: 80px;"`)
- BMI peaks kohe näitama "kg" (nii soovkaalu kui muidu)

**Faili asukoht:**
`medportal/forms/full-profile.html` - rida ~370-450 (kehaandmed sektsioon)

**Muuta:**
```html
<!-- PRAEGU: -->
<input type="number" name="weight" placeholder="kg">

<!-- PEAKS OLEMA: -->
<input type="number" name="weight" placeholder="kg" style="width: 80px;"> kg
```

---

### PRIORITEET 4: Muud liiga pikad väljad

**Probleem:**
Need väljad on liiga pikad:
- Uneaeg ööpäevas (h)
- Kvaliteet (0-3)
- Stressi tase (0-3)
- Peamised stressorid

**Nõue:**
Number input väljad peavad olema lühikesed (`style="width: 60px;"` või `width: 80px;"`).

**Faili asukoht:**
`medportal/forms/full-profile.html` - otsida "Uneaeg ööpäevas", "Kvaliteet", "Stressi tase"

---

### PRIORITEET 5: "Naiste kaebused" nähtavus

**Probleem:**
Isegi kui "Mees" valitud, näitab "Naiste kaebused" sektsiooni.

**Nõue:**
"Naiste kaebused" peab näitama AINULT kui:
- "Naine" valitud VÕI
- "Sootuks sootu" valitud

**Koodis muuta:**
Lisa conditional display logic `profile-filter.js` faili:
```javascript
function updateGenderSpecificSections() {
    const gender = getSelectedGender(); // naine, mees, sootuks
    const womenSection = document.getElementById('womenComplaintsSection');

    if (gender === 'naine' || gender === 'sootuks') {
        womenSection.style.display = 'block';
    } else {
        womenSection.style.display = 'none';
    }
}
```

---

### PRIORITEET 6: Vana "Koostoime riskid" list ei ole plusside all

**Probleem:**
Vana checkbox list on ikka olemas:
```html
<label>Koostoime riskid (märgi kui tarvitad)</label>
<div class="checkbox-group">
    <label><input type="checkbox" name="interactionGrapefruit" value="yes"> Greip/greibimahl</label>
    <label><input type="checkbox" name="interactionJohnsWort" value="yes"> Naistepuna</label>
    <label><input type="checkbox" name="interactionGinkgo" value="yes"> Ginkgo</label>
    <label><input type="checkbox" name="interactionLicorice" value="yes"> Lagrits</label>
    <label><input type="checkbox" name="interactionGarlic" value="yes"> Küüslauk >1 küüs/päev</label>
    <label><input type="checkbox" name="interactionGinger" value="yes"> Ingver >2 g/päev</label>
    <label><input type="checkbox" name="interactionTurmeric" value="yes"> Kurkum >1 g/päev</label>
</div>
```

**Nõue:**
Muuta see SAMUTI plus-süsteemiks (7 nuppu: greip, naistepuna, ginkgo, lagrits, küüslauk, ingver, kurkum).

**Faili asukoht:**
`medportal/forms/full-profile.html` - rida 1377-1388

**Lisa funktsioon:**
`quickAddHerbInteraction(key, name)` info-system.js faili

---

### PRIORITEET 7: "Sool" on endiselt olemas

**Probleem:**
"Sool" on endiselt menüüs/listis.

**Nõue:**
Kas see peaks olema eemaldatud? Või plusside alla? (Palun täpsusta!)

**Otsida:**
`medportal/forms/full-profile.html` - grep "Sool" või "sool"

---

### PRIORITEET 8: Tööriistad - alternatiivne lisatööriistad kadunud

**Probleem:**
"3. Tööriistad ja kodused mõõtmised" - alternatiivset tööriistu ei ole (bioenergia, tšakra mõõtur, kristallid, pendel, jne).

**Kasutaja küsimus:**
"Kas mingi tsensor likvideerib need sul?"

**Võimalik põhjus:**
v1.7.5 "paranduste" käigus eemaldati vana "lisad", mis sisaldas neid. Need peavad TAASTAMA ja lisama plus-nuppudena.

**Nõue:**
Lisa tagasi alternatiivne tööriistad plus-nuppudena:
- Bioenergia mõõtur
- Tšakra mõõtur
- Kristallid/kivid
- Pendel
- Astroloogia kaart
- Numeroloogia
- Kinesiologia
- Iiris-diagnostika
(kõik belief-märgistusega)

**Lisa funktsioon:**
`quickAddAltTool(key, name)` (võib juba olemas olla, kontrolli!)

---

### PRIORITEET 9: Ressursid ei ole plusside all

**Probleem:**
"11. Ressursid ja eelarve" - aeg päevas ja eelarve kuus ei ole plusside all, on ikka radio buttons.

**Nõue:**
Muuta plus-süsteemiks:

**Aeg päevas:**
- +12 min
- +30 min
- +60 min
- +90 min
- +120+ min

**Eelarve kuus:**
- +0-25€
- +25-75€
- +75-150€
- +150-300€
- +300+€

**Faili asukoht:**
`medportal/forms/full-profile.html` - rida 1729-1747

---

### PRIORITEET 10: Kokkuvõte automaatne genereerimine

**Probleem:**
"17. Kokkuvõte ühel real (kasutus arstil/AI-l)" ei teki automaatselt.

**Nõue:**
Peaks olema TABIDEGA, erinevad vaated:
- Tab 1: Üldinfo (vanus, sugu, BMI, riskid)
- Tab 2: Ravimid (verevedeldajad, muud)
- Tab 3: Taimravi (kõik taimed)
- Tab 4: Elustiil (uni, sport, stressid)
- Tab 5: Ressursid (ligipääs, eelarve)

**Peaks genereeruma:**
JavaScript funktsioon `generateSummary()` mis loeb kõik vormi väljad ja tekitab dünaamilise kokkuvõtte.

**Uus sektsioon:**
Lisa `<section id="summary">` full-profile.html lõppu (enne submit nuppu).

**Uus JS fail:**
`medportal/js/summary-generator.js` - kõik summary loogika

---

## 📂 OLULISED FAILID JA URLid

### Kood:
- **Vorm:** `/home/user/Eesti/medportal/forms/full-profile.html` (18 sektsiooni)
- **Plus-süsteem:** `/home/user/Eesti/medportal/js/info-system.js` (kõik quickAdd* funktsioonid)
- **Profiilifiltri:** `/home/user/Eesti/medportal/js/profile-filter.js` (vajab refactoringut)
- **Config:** `/home/user/Eesti/medportal/config/site-config.js` (v1.7.5.4)

### Dokumentatsioon:
- **Praegune seis:** `/home/user/Eesti/medportal/docs/CURRENT-STATUS.md`
- **Strateegia plaan:** `/home/user/Eesti/medportal/docs/STRATEGY-v1.7-PLAN.md`
- **Eelmise sessiooni jätk:** `/home/user/Eesti/medportal/docs/SESSION-CONTINUATION.md`
- **SEE FAIL (uus prompt):** `/home/user/Eesti/medportal/docs/CONTINUATION-v1.7.6-PROMPT.md`

### Git:
- **Branch:** `claude/medical-portal-v1.7-implementation-011CV2rzuWMTMXiRnuywRdE2`
- **Viimane commit:** `8c94e19` (Dokumentatsiooni uuendus v1.7.5.4)
- **Remote:** origin (push/pull töötab)

---

## 🎯 SOOVITATUD TEE EDASI (v1.7.6)

### Faaside plaan:

#### **FAAS 1: Profiilifilter plus-süsteemiks (KÕIGE KEERULISEM)**
1. Looda uued funktsioonid:
   - `quickAddPregnancy()` - Lapseootel
   - `quickAddAge()` - Vanus (11 kategooriat)
   - `quickAddGender()` - Naine/Mees/Sootuks sootu
2. Refactorida `profile-filter.js`:
   - Muuta logic töötama plus-nuppudega
   - Hoida sticky header funktsionaalsus
   - Hoida hoiatuste süsteem
3. Asendada HTML checkboxid plus-nuppudega

**Hinnanguline aeg:** 2-3 tundi (see on SUUR töö!)

#### **FAAS 2: Plus-süsteemi käitumise parandused (KIIRE)**
1. Muuta KÕIK `quickAdd*()` funktsioonid:
   - `container.appendChild()` → `container.insertBefore(itemDiv, container.firstChild)`
2. Lisa deselect logic (teine vajutus eemaldab)

**Hinnanguline aeg:** 30 min

#### **FAAS 3: UI puhastus (KIIRE)**
1. Kehaandmed: lühemad väljad + "kg" suffix
2. Uneaeg/kvaliteet/stress: lühemad väljad
3. "Naiste kaebused" conditional display

**Hinnanguline aeg:** 30 min

#### **FAAS 4: Puuduvad plus-süsteemid (KESKMINE)**
1. Vana "Koostoime riskid" (greip/naistepuna/ginkgo) → plus-süsteem
2. Alternatiivne tööriistad tagasi (8 nuppu, belief)
3. Ressursid (aeg päevas + eelarve kuus) → plus-süsteem
4. "Sool" - kas eemaldada või muuta?

**Hinnanguline aeg:** 1 tund

#### **FAAS 5: Automaatne kokkuvõte (UUS FEATURE)**
1. Looda `summary-generator.js`
2. Loora `<section id="summary">` HTML-is
3. Loora 5 tabi
4. Genereerida dünaamiline kokkuvõte kõigist väljadest

**Hinnanguline aeg:** 2 tundi

---

## 🚀 PROMPT UUEKS SESSIOONIKS

```
Jätka Medical Portali v1.7.6 implementatsiooni.

OLULINE: Loe ESMALT see fail läbi täielikult:
/home/user/Eesti/medportal/docs/CONTINUATION-v1.7.6-PROMPT.md

Selles failis on:
1. 10 KRITILIST PROBLEEMI (korduvalt mainitud, 4-5 korda!)
2. Sessiooni ajalugu
3. Failide asukohad
4. Faaside plaan

PRIORITEEDID:
1. **KÕIGEPEALT:** Profiilifilter plus-nuppudega (+Lapseootel, +Vanus, +Naine, +Mees, +Sootuks sootu)
2. Plus-süsteemi käitumine (uued valikud ESIMESENA, teine vajutus = deselect)
3. UI puhastus (lühemad väljad, "kg" suffix, conditional display)
4. Puuduvad plus-süsteemid (vana koostoime riskid, alternatiivne tööriistad, ressursid)
5. Automaatne kokkuvõte (tabidega, dünaamiline)

BRANCH: `claude/medical-portal-v1.7-implementation-011CV2rzuWMTMXiRnuywRdE2`
VERSIOON: v1.7.6 (järgmine)

Alusta FAAS 1-st (profiilifilter) VÕI küsi kasutajalt, millisest faasist alustada.
```

---

## 📝 LISAMÄRKUSED

### Teadaolevad probleemid:
- Browser võib näidata vana versiooni (vajab hard refresh: Ctrl+Shift+R)
- Mõned asjad võivad olla kadunud v1.7.5 "paranduste" käigus
- Profiilifiltri refactoring on SUUR töö (puudutab 2 faili ja 300+ rida koodi)

### Võimalikud tsensoreerimise probleemid:
Kasutaja küsis: "Kas mingi tsensor likvideerib need sul?"
- Alternatiivset tööriistad (bioenergia, tšakra) on "belief-scope"
- Need võisid kaduda v1.7.5 puhastuse käigus (mitte tsensori tõttu)
- Kontrolli history: `git log --grep="alternatiiv" --grep="bioenergia"`

### Commit'imise soovitused:
- Iga faas eraldi commit
- Selged commit messages (nt "v1.7.6.1: Profiilifilter plus-süsteemiks")
- Push peale iga faasi

### Testimine:
- Pärast FAAS 1 (profiilifilter): KOHUSTUSLIK testimine, kas filter logic töötab
- Pärast FAAS 2: Kontrolli, kas uued valikud tulevad esimesena
- Pärast FAAS 5: Kontrolli, kas kokkuvõte genereerub õigesti

---

## ✅ KIIRE KONTROLLNIMEKIRI UUEKS SESSIOONIKS

Enne alustamist:
- [ ] Loe see fail läbi TÄIELIKULT
- [ ] Git pull branchist
- [ ] Kontrolli, et oled õigel branchil
- [ ] Loo TodoWrite nimekiri (10 ülesannet vastavalt prioriteetidele)

Peale tööd:
- [ ] Kõik muudatused committed
- [ ] Kõik muudatused pushed
- [ ] Dokumentatsioon uuendatud (CURRENT-STATUS.md)
- [ ] Versioon uuendatud (site-config.js)

---

**Edu uues sessionis!** 🚀

Kui midagi ebaselge, küsi kasutajalt täpsustust ENNE kui alustada kodeerimist.
