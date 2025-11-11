# Järgmise Sessiooni Prompt

## 🎯 Kopeeri see tekst uude Claude Code prompti:

---

**KONTEKST:**

Tere! Alustan tööd **Medial** projektiga - terviseprofiili süsteemiga, mis toetab erinevaid teaduslikke ja traditsioonilisi ravimeetodeid.

**MIS ON JUBA OLEMAS:**

Repositooriumis on neli dokumenti:
1. `PROJECT_OVERVIEW.md` - Projekti eesmärk ja visioon
2. `ARCHITECTURE.md` - Tehniline arhitektuur (JSON, AI promptid, scope taksonoomia)
3. `FEATURES_ROADMAP.md` - Versioonide plaan (v1.7, v1.8, v1.9, v2.0)
4. `NEXT_SESSION_PROMPT.md` - See fail (võid kustutada)

**MIS ON JÄRGMISENA:**

Me oleme planeerimisel kokku leppinud, et alustan:

---

## ✅ VARIANT A: v1.7.0 - UNI + PRIVAATSUS (SOOVITATUD)

Alusta **v1.7.0** arendamisest:

### Ülesanded:
1. **Loo JSON skeem** (detailed vormingus):
   - `sleep` sektsioon (quality, snoring, nightmares, paranormal)
   - `privacy` sektsioon (sharingLevels, consent, doNotShare)

2. **Loo `toCanonical()` funktsioon**:
   - Muudab detailed JSON → canonical JSON (AI jaoks)

3. **Loo React/Vue komponendid** (valik sulle):
   - SleepSection.jsx (uni sektsioon + plus-menüüd)
   - PrivacySection.jsx (privaatsus + plus-menüüd)
   - InfoButton.jsx ("i"-nupp, Tab A/B modaal)

4. **Kirjuta testid**:
   - `toCanonical()` ühikutestid
   - JSON skeemi validatsioon

5. **Dokumenteeri**:
   - README.md (projekti kirjeldus)
   - API.md (JSON vormingud)

---

## 📋 VARIANT B: v1.0.0 - POC (LIHTSAM ALGUS)

Kui tahad lihtsamat algust, alusta **v1.0.0 POC-st**:

### Ülesanded:
1. **Loo baas projekt**:
   - React/Vue setup
   - Baas JSON skeem (5-10 põhilist välja: kaebused, ravimid, allergiad)

2. **Loo `toCanonical()` funktsioon**:
   - Lihtne transformatsioon detailed → canonical

3. **Integreeri AI (GPT-4)**:
   - Lihtne lühi-prompt
   - Test: anna profiil, saa soovitus

4. **Testimine**:
   - Käsitsi testimine

---

## 🚀 SOOVITUS:

**Alusta VARIANT A-st (v1.7.0)**, sest:
- UNI + PRIVAATSUS on projekti kõige innovaatiivsem osa
- "Belief scope" süsteem on ainulaadne
- Kui see on valmis, on ülejäänud versioonid lihtsamad

---

## 📝 TÄIENDAVAD JUHISED:

- **Loe kõik 4 dokumenti läbi** (PROJECT_OVERVIEW.md, ARCHITECTURE.md, FEATURES_ROADMAP.md)
- **Küsi, kui midagi pole selge!**
- **Kasuta scope taksonoomiat** (universal, demographic, organ, context, modality, belief)
- **Järgi JSON struktuuri** ARCHITECTURE.md-st

---

## 🤔 KUI ON KÜSIMUSI:

Küsi julgelt! Ma olen valmis aitama:
- Mis on "belief scope"? (VASTUS: PROJECT_OVERVIEW.md)
- Kuidas `toCanonical()` töötab? (VASTUS: ARCHITECTURE.md)
- Millised on täpsed JSON väljade nimed? (VASTUS: FEATURES_ROADMAP.md > v1.7.0 JSON struktuur)

---

## ✅ ESIMENE SAMM:

Ütle mulle:
- **"Alustan v1.7.0 - UNI + PRIVAATSUS"** (SOOVITATUD)
- või **"Alustan v1.0.0 - POC"** (lihtsam)
- või **"Mul on küsimusi"**

---

Edu! 🚀

