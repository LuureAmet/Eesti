# ALUSTA UUT SESSIOONI - Kiire Juhend

**Kuupäev:** 13.11.2025
**Versioon:** v1.7.5.4 → v1.7.6 (järgmine)
**Branch:** `claude/medical-portal-v1.7-implementation-011CV2rzuWMTMXiRnuywRdE2`

---

## 🎯 KOPEERI SEE PROMPT UUDE SESSIOONI:

```
Jätka Medical Portali v1.7.6 implementatsiooni.

OLULINE: Loe ESMALT see fail läbi täielikult:
/home/user/Eesti/medportal/docs/CONTINUATION-v1.7.6-PROMPT.md

Selles failis on:
1. 10 KRITILIST PROBLEEMI (korduvalt mainitud, 4-5 korda!)
2. Sessiooni ajalugu
3. Failide asukohad
4. Faaside plaan (5 faasi)

PRIORITEEDID:
1. Profiilifilter plus-nuppudega (+Lapseootel, +Vanus, +Naine, +Mees, +Sootuks sootu)
2. Plus-süsteemi käitumine (uued valikud ESIMESENA, teine vajutus = deselect)
3. UI puhastus (lühemad väljad, "kg" suffix)
4. Puuduvad plus-süsteemid (vana koostoime riskid, alternatiivne tööriistad, ressursid)
5. Automaatne kokkuvõte (tabidega)

BRANCH: `claude/medical-portal-v1.7-implementation-011CV2rzuWMTMXiRnuywRdE2`
VERSIOON: v1.7.6

Küsi kasutajalt, millisest faasist alustada.
```

---

## 📂 OLULISED DOKUMENDID:

### 1. **PEAMINE JUHEND (LOE ESIMESENA!):**
```
/home/user/Eesti/medportal/docs/CONTINUATION-v1.7.6-PROMPT.md
```
**Sisaldab:**
- 10 kriitlist probleemi (detailselt)
- Sessiooni ajalugu
- Failide asukohad ja read
- 5 faasi plaan
- Hinnangulised ajad
- Commit'imise soovitused

### 2. **Praegune seis:**
```
/home/user/Eesti/medportal/docs/CURRENT-STATUS.md
```
**Sisaldab:**
- Mis on tehtud (v1.5.0 → v1.7.5.4)
- Failide struktuur
- 18 sektsiooni nimekiri

### 3. **Strateegia plaan:**
```
/home/user/Eesti/medportal/docs/STRATEGY-v1.7-PLAN.md
```
**Sisaldab:**
- Pikaajaline plaan
- Tuleviku versioonid

### 4. **Eelmise sessiooni jätk:**
```
/home/user/Eesti/medportal/docs/SESSION-CONTINUATION.md
```
**Sisaldab:**
- v1.7.5 sessiooni info
- Tehniline info

---

## 🗂️ KOODIFAILID:

### Vorm:
```
/home/user/Eesti/medportal/forms/full-profile.html
```
- 18 sektsiooni
- ~2100 rida
- Peamine töö toimub siin

### JavaScript:
```
/home/user/Eesti/medportal/js/info-system.js
```
- Kõik quickAdd* funktsioonid
- ~2900 rida

```
/home/user/Eesti/medportal/js/profile-filter.js
```
- Profiilifiltri loogika
- Vajab refactoringut (FAAS 1)

### Config:
```
/home/user/Eesti/medportal/config/site-config.js
```
- Praegu: v1.7.5.4
- Muuta: v1.7.6

---

## 🚨 10 KRITILIST PROBLEEMI (lühidalt):

1. **Profiilifilter** - ei ole plus-nuppudega, peaks olema +Lapseootel, +Vanus, +Naine, +Mees, +Sootuks sootu
2. **Plus-nupud lõppu** - uued valikud lähevad lõppu, peaksid algusesse
3. **Teine vajutus** - peaks deselecting, aga ei tee
4. **Kehaandmed pikad** - väljad liiga pikad 3 numbri jaoks, ei näita "kg"
5. **Uneaeg jne pikad** - Uneaeg/Kvaliteet/Stress väljad liiga pikad
6. **"Naiste kaebused"** - näitab ka meestele, peaks ainult naisele/sootuks sootu
7. **Vana koostoime riskid** - greip/naistepuna/ginkgo ei ole plusside all
8. **Alternatiivne tööriistad** - bioenergia/tšakra jne kadunud (võib olla tsensor?)
9. **Ressursid** - aeg päevas ja eelarve kuus ei ole plusside all
10. **Kokkuvõte** - ei teki automaatselt, peaks olema tabidega

**DETAILID:** Vaata `/home/user/Eesti/medportal/docs/CONTINUATION-v1.7.6-PROMPT.md`

---

## 📊 FAASIDE PLAAN:

| Faas | Ülesanne | Aeg | Prioriteet |
|------|----------|-----|------------|
| FAAS 1 | Profiilifilter plus-süsteemiks | 2-3h | 🔴 KÕRGEIM |
| FAAS 2 | Plus-süsteemi käitumine | 30min | 🟡 KESKMINE |
| FAAS 3 | UI puhastus | 30min | 🟡 KESKMINE |
| FAAS 4 | Puuduvad plus-süsteemid | 1h | 🟠 KESKMINE |
| FAAS 5 | Automaatne kokkuvõte | 2h | 🟢 MADAL |

**SOOVITUS:** Alusta FAAS 1-st (kõige keerulisem) VÕI küsi kasutajalt.

---

## 📝 VIIMANE SEIS:

**Commit:**
```
8c94e19 - Dokumentatsiooni uuendus v1.7.5.4
ea55fc2 - v1.7.5.4: Koostoime riskid ja ressursid plus-süsteemiks
```

**Branch:**
```bash
git branch
# * claude/medical-portal-v1.7-implementation-011CV2rzuWMTMXiRnuywRdE2
```

**Versioon:**
```
v1.7.5.4 (site-config.js)
```

---

## ✅ KIIRE KONTROLL UUES SESSIONIS:

1. ✅ `git pull origin claude/medical-portal-v1.7-implementation-011CV2rzuWMTMXiRnuywRdE2`
2. ✅ Loe `/home/user/Eesti/medportal/docs/CONTINUATION-v1.7.6-PROMPT.md`
3. ✅ Loo TodoWrite nimekiri (10 ülesannet)
4. ✅ Alusta FAAS 1-st VÕI küsi kasutajalt

---

## 💡 NÄPUNÄITED:

- **Ära alusta kodeerimist kohe!** Küsi kasutajalt täpsustusi.
- **Profiilifilter on SUUR töö** - see puudutab 2 faili ja 300+ rida koodi.
- **Commit iga faasi eraldi** - hõlpsam rollback'ida kui midagi läheb valesti.
- **Hard refresh browser** - Ctrl+Shift+R (vastasel korral näed vana versiooni).

---

**Edu uues sessionis!** 🚀

Kui midagi ebaselge, vaata CONTINUATION-v1.7.6-PROMPT.md faili.
