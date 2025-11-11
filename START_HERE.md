# START HERE - JUHIS UUELE AI-LE

Kuupäev: 11.11.2025
Projekt: Meigo Medical Medisiiniportaal
Praegune versioon: v1.6.0

---

## SAMM 1: KONTROLLI BRANCH

```bash
git branch --show-current
```

PEAB OLEMA: `claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy`

Kui ei ole, siis:
```bash
git checkout claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
git pull origin claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
```

---

## SAMM 2: LOE FAILID SELLES JARJEKORRAS

### 2.1 ESIMESENA (kohustuslik):
**UUELE_AI_LE_JUHIS_PUHAS.md** (638 rida)
- Üldine ülevaade projektist
- Praegune v1.6.0 seisu
- Git workflow
- Arhiveerimise süsteem
- Emoji keeld (OLULINE!)
- Failide struktuur

### 2.2 TEISENA (kohustuslik):
**TEHNILINE_SPETSIFIKATSIOON_v1.7-v2.0.md** (472 rida)
- JSON normaliseerimine
- Scope-taksonoomia (6 kategooriat)
- AI promptide süsteem
- "i"-nupu modaal
- Täielik v1.7.0 - v2.0.0 plaan
- Koodid ja skeemid

### 2.3 KOLMANDANA (vajadusel):
**KOKKUVOTE_PUHASTUSTOO.md**
- Selgitus mida puhastati
- Mis eemaldati vs mis jäeti

### 2.4 NELJANDAKS (kontrollimiseks):
**medportal/config/site-config.js**
- Kontrolli versiooninumber: PEAB OLEMA 1.6.0
- Vaata changelog

---

## SAMM 3: VALI TEGEVUS

### VALIK A: ALUSTA v1.7.0 ARENDUST

Kui kasutaja ütleb: "alusta v1.7", siis:

1. **LOE**: TEHNILINE_SPETSIFIKATSIOON_v1.7-v2.0.md punkt 4.1 ja 4.2
2. **PLANEERI**: UNI sektsioon + PRIVAATSUS laiendus
3. **LOE**: medportal/forms/full-profile.html (vaata struktuuri)
4. **LOE**: medportal/js/form-handler.js (vaata kuidas plusid töötavad)
5. **ALUSTA**: Lisa UNI sektsioon (norskamine, painajad, paranormaalsed uned)

### VALIK B: PARANDA v1.6.0 BUGI VÕI TÄIENDA

Kui kasutaja ütleb: "paranda see" või "lisa see v1.6-sse", siis:

1. **KONTROLLI**: medportal/ kaust
2. **LEIA**: vastav fail (html/js/css)
3. **PARANDA**: tee muudatus
4. **TESTI**: ava medportal/index.html brauseris
5. **COMMIT**: git commit + push

### VALIK C: UUENDA DOKUMENTATSIOONI

Kui kasutaja ütleb: "uuenda README", siis:

1. **LOE**: medportal/README.md (praegu näitab v1.2.0 - VALE!)
2. **UUENDA**: versioon v1.6.0
3. **LISA**: 50+ plus-nuppude info
4. **LISA**: profile filter süsteemi info
5. **COMMIT**: git commit + push

---

## SAMM 4: KONTROLLI ENNE COMMIT'I

### 4.1 EMOJI KONTROLL (KRIITILINE!)
```bash
grep -r "⭐\|✨\|🔥\|➡\|⬆\|📝" medportal/
```

Kui leiab, siis EEMALDA KÕIK! Kasutaja KEELAS emoji'd.

### 4.2 UTF-8 KONTROLL
Kontrolli, et eesti tähed (õ, ä, ö, ü) on korras.

### 4.3 VERSIOON
Kontrolli, et site-config.js versioon on õige.

---

## SAMM 5: COMMIT JA PUSH

```bash
git add .
git commit -m "kirjeldus"
git push -u origin claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
```

OLULINE: Branch nimi PEAB lõppema `011CV2fuMh1DnJY8Zugym2oy` (session ID), muidu 403 error!

---

## KIIRE ÜLEVAADE PROJEKTIST

### Mis see on?
Holistilik meditsiiiniportaal, mis kogub patsiendi täisprofiili 18 sektsioonis.

### Praegune versioon v1.6.0:
- 50+ plus-nuppud (kiirvalikud)
- Profile filter (rasedus/vanus/sugu/riskid)
- MED_INFO_DB (50+ info kirjet)
- Täisprofiili vorm (18 sektsiooni)
- JSON eksport
- localStorage draft salvestamine

### Järgmine versioon v1.7.0:
- UNI sektsioon (norskamine, painajad, paranormaalsed uned)
- PRIVAATSUS massiivne laiendus (jagamise tase, rituaalid, belief-scope)
- JSON skoop-süsteem (6 kategooriat)

### Oluline info:
- Keel: eesti (+ inglise tehniline terminoloogia)
- Emoji'd: KEELATUD (pentagram sümbolid)
- Arhiveerimine: alati arhiveeri, MITTE KUSTUTA
- Git: Session ID peab matchima

---

## FAILIDE STRUKTUUR

```
/home/user/Eesti/
├── START_HERE.md                           (SEE FAIL - alusta siit!)
├── UUELE_AI_LE_JUHIS_PUHAS.md              (üldine ülevaade)
├── TEHNILINE_SPETSIFIKATSIOON_v1.7-v2.0.md (tehniline plaan)
├── KOKKUVOTE_PUHASTUSTOO.md                (puhastuse selgitus)
├── juhiseid-teiselt-ailt-1.6.edasiseks.txt (originaal - ära loe!)
├── medportal/
│   ├── index.html                          (pealeht)
│   ├── forms/full-profile.html             (täisprofiili vorm)
│   ├── js/
│   │   ├── form-handler.js                 (põhiloogika)
│   │   ├── info-system.js                  (MED_INFO_DB)
│   │   ├── profile-filter.js               (filtrid)
│   │   └── specialty-mode.js               (eriala režiimid)
│   ├── css/
│   │   └── forms.css                       (stiilid)
│   ├── config/
│   │   └── site-config.js                  (versioon, changelog)
│   ├── README.md                           (OUTDATED - näitab v1.2.0)
│   └── ROADMAP.md                          (OUTDATED - näitab v1.2)
└── archive/
    └── v1.2.0/                             (vanad versioonid)
```

---

## 6 KÜSIMUST KASUTAJALE (v1.7.0 jaoks)

Enne v1.7.0 implementeerimist, küsi kasutajalt:

1. Kas on olemas palvete ja rituaalide kataloog (regioonid/konfessioonid)?
2. Millised AI-arstid lisada "ai_arst" alamvalikusse?
3. Kas on Eesti apteegikettide andmebaas?
4. Millised bioenergia/vaimsed mõõtjad lisada nimekirja?
5. Kas on TCM/Ayurveda taimede andmebaas?
6. Kes kirjutab "i"-nupu Tab A ja Tab B sisu?

---

## HOIATUSED

1. **MITTE LUUA** uusi .md faile ilma kasutaja loata
2. **MITTE KASUTADA** emoji'd kusagil
3. **MITTE KUSTUTADA** vanu versioone (ainult arhiveeri)
4. **MITTE PUSH'ida** valesse branch'i (session ID peab matchima)
5. **MITTE KASUTADA** sed UTF-8 failidega (rikub eesti tähed)

---

## KOKKUVÕTE: MIS TEHA?

1. KONTROLLI branch
2. LOE UUELE_AI_LE_JUHIS_PUHAS.md
3. LOE TEHNILINE_SPETSIFIKATSIOON_v1.7-v2.0.md
4. KÜSI kasutajalt: "Kas alustan v1.7.0 või teen midagi muud?"
5. JÄRGI juhiseid vastavalt valikule

---

Meigo Medical Medisiiniportaal | START HERE
