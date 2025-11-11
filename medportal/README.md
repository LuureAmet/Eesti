# Meigo Medical Medisiiniportaal v1.6

**Holistiline tervisevormide süsteem** - patsiendid saavad koostada põhjalikke terviseprofiili vorme ja eksportida neid arstile, AI-le või endale.

## Versioon

**v1.6.0** - 11.11.2025

Vaata varasemaid versioone: `README-v1.0.md`, `archive/v1.2.0/`

---

## Kiirstart

1. **Ava brauser**: `firefox medportal/index.html`
2. **Vali vorm**: Kiire (5 min) | Täis (30 min) | Päevalogi (2 min)
3. **Täida ja ekspordi**: TXT, JSON, AI prompt

---

## Funktsioonid

### v1.6.0 (HETKEL) - 11.11.2025

**MASSIIVNE PLUS-NUPPUDE LAIENDUS:**
- [x] **50+ plus-nuppud**: Kiirvalikud 6 sektsioonis
- [x] **Elupaik**: 4 valikut (kortermajas, maaelu, linn, öötöö)
- [x] **Liikumine**: 5 valikut (kõndimine, jalgratas, ujumine, matkamine)
- [x] **Kaebused**: 9 valikut (peavalu, liigesevalu, naiste kaebused)
- [x] **Vann/Saun**: 4 valikut (Epsom vann, saun, külm dušš)
- [x] **Muusika**: 4 valikut (klassikaline, meditatsioon, binauraalsed)
- [x] **MED_INFO_DB**: 50+ info kirjet, kaheastmeline modaal

**v1.5.0 - PROFIILIFILTRI SÜSTEEM:**
- [x] **Profiilifiltrid**: Rasedus → Vanus → Sugu → Meditsiinilised riskid
- [x] **11 vanusekategooriat**: Vastsündinu kuni oldest-old
- [x] **Reaalajas hoiatused**: Rasedus, antikoagulant, eGFR, Child-Pugh
- [x] **Sticky header**: Profiili kokkuvõte

**v1.3-v1.4 - UX JA KIIRVALIKUD:**
- [x] **3 vormi tüüpi**: Kiirprofiil, Täisprofiil (18 sektsiooni), Päevalogi
- [x] **Eksport**: TXT, JSON, AI prompt (kohandatav)
- [x] **AI prompt redaktor**: 18 sektsiooni vali/tühista
- [x] **Tooltipid**: Info ikoonid kaheastmelise sisuga
- [x] **localStorage**: Draft'ide salvestus
- [x] **Toast teated**: Smooth UI feedback

### Plaanis (v1.7+)

- [ ] **UNI sektsioon**: Norskamine, painajad, paranormaalsed uned
- [ ] **PRIVAATSUS laiendus**: Jagamise tase, nõusolek, belief-scope
- [ ] **Tööriistad**: Bioenergia/vaimsed mõõtjad
- [ ] **Toitumine**: Rikkad toidud, piirangud laiendus

---

## Failide struktuur

```
medportal/
├── index.html                    # Landing page (vali vorm)
├── forms/
│   ├── quick-profile.html       # Kiirprofiil (5 min, 15 küsimust)
│   ├── full-profile.html        # Täisprofiil (30 min, 18 sektsiooni)
│   └── daily-log.html           # Päevalogi (2 min tracking)
├── css/
│   ├── style.css                # Põhistiilid (landing, kaardid)
│   └── forms.css                # Vormide stiilid (kompaktne)
├── js/
│   ├── form-handler.js          # Üldised funktsioonid (progress, BMI, salvestus)
│   ├── quick-profile.js         # Kiirprofiili eksport
│   ├── full-profile.js          # Täisprofiili eksport + AI prompt redaktor
│   ├── daily-log.js             # Päevalogi CSV eksport
│   ├── tooltips.js              # Tooltip süsteem (JSON-põhine)
│   ├── custom-fields.js         # Dünaamilised lisaväljad
│   ├── tags-input.js            # Mitmikvalikud (komaga/Enteriga)
│   └── docs-and-links.js        # VERSION badge + README/ROADMAP/linkide sektsioon
├── config/
│   └── site-config.js           # Globaalne konfiguratsioon (versioon, lingid, AI prompt sektsioonid)
├── data/
│   └── tooltips.json            # Abitekstid väljadele
├── docs/                        # TEHNILINE DOKUMENTATSIOON
│   ├── ARCHITECTURE.md          # Arhitektuur (client vs server)
│   ├── FILE-GUIDE.md            # Failide selgitused
│   └── DEVELOPMENT.md           # Arendajale juhised
└── versions/                    # Vanad versioonid
    ├── README-v1.0.md
    └── ROADMAP-v1.0.md
```

---

## Kasutamine

### 1. Kiirprofiil (5 min)

Lihtne vorm põhiandmete kogumiseks AI konsultatsioonideks.

```bash
firefox medportal/forms/quick-profile.html
```

**Sisaldab:**
- Põhiandmed (vanus, sugu, kaal, pikkus)
- Põhidiagnoos ja kaebused
- Ravimid
- Eelistused (looduslik vs meditsiin)
- Elustiil
- Eesmärgid

**Eksport:**
- TXT fail
- JSON fail
- AI prompt (kopeeritav Claude/ChatGPT-le)

### 2. Täisprofiil (30 min)

Põhjalik 18-sektsiooniline vorm kõigi aspektidega.

```bash
firefox medportal/forms/full-profile.html
```

**18 sektsiooni:**
1. Privaatsus ja nõusolek
2. Profiil ja elurütm
3. Kaebused ja sümptomid (0-3 skaalal)
4. Tööriistad ja mõõtmised
5. Ajalugu (viimased 5 aastat)
6. Ravimid ja lisandid
7. Taimravi
8. Toitumine
9. Kehalised praktikad (hingamine, liikumine)
10. Meele- ja rütmipraktikad
11. Ideoloogia ja piirjooned
12. Ressursid ja eelarve
13. Riskiliinid ("punased lipud")
14. Diagnostika
15. Otsustuspuu
16. Plaan
17. Menüü-eelistused
18. Paketi valikud

**AI Prompt Redaktor:**
- Ava modal checkboxidega (18 sektsiooni)
- Vali kaasatavad osad
- Live preview
- Kopeeri või lae alla TXT

### 3. Päevalogi (2 min)

Päevane tracking mõõtmiste ja sümptomite jaoks.

```bash
firefox medportal/forms/daily-log.html
```

**Sisaldab:**
- Kuupäev ja kellaaeg
- Mõõtmised (kaal, BP, pulss)
- Sümptomid (0-3)
- Rutiin (tehtud/tegemata)
- Märkused

**Eksport:**
- CSV fail (arstile)
- localStorage salvestus

---

## Konfiguratsioon

### Linkide lisamine

Ava `/medportal/config/site-config.js`:

```javascript
links: [
    {
        url: "https://uus-link.ee",
        description: "Kirjeldus"
    }
]
```

Salvesta → ilmub KÕIGIL lehtedel automaatselt.

### AI prompt sektsioonide muutmine

Sama fail:

```javascript
promptSections: [
    { id: "custom", label: "Uus sektsioon", default: true }
]
```

### Versiooni uuendamine

```javascript
version: "1.3.0",
date: "15.11.2025"
```

---

## Tehniline info

### Client-side (hetkel)

- **100% brauseris** - ei vaja serverit
- **localStorage** - draft'ide salvestus
- **Vanilla JavaScript** - ei vaja framework'e
- **Töötab offline** - `file://` protokoll OK

### Tulevikus (v1.3+)

- **Server-side (PHP)**: SQLite/MySQL salvestus, kasutajad
- **Cloud AI**: API calls, vastuste salvestus
- **PDF server-side**: jsPDF integratsioon

---

## Arendamine

### Koodi kontroll

```bash
# JavaScript süntaks
node --check medportal/js/*.js

# Versioon kõigis failides
grep -r "VERSION: 1.2.0" medportal/
```

### Git workflow

```bash
# Checkout branch
git checkout claude/medical-portal-setup-011CUxmtZU5NRXCwtdEnHnBS

# Tee muudatused...

# Commit
git add -A
git commit -m "Kirjeldus"

# Push
git push -u origin claude/medical-portal-setup-011CUxmtZU5NRXCwtdEnHnBS
```

---

## Tugi

- **Dokumentatsioon**: Vaata `docs/` kausta
- **Probleemid**: Ava GitHub Issue
- **E-post**: meigo@medical.ee

---

## Litsents

MIT License - vaba kasutamiseks, muutmiseks, jagamiseks.

---

**Meigo Medical Medisiiniportaal** | v1.2.0 | © 2025
