# FILE GUIDE - Meigo Medical Medisiiniportaal

Detailne ülevaade kõigist failidest ja nende funktsioonist.

---

## 📁 Failide struktuur

```
medportal/
├── index.html                    # Landing page
├── README.md                     # Projekti dokumentatsioon
├── ROADMAP.md                    # Arendusplaan
├── forms/                        # Vormide lehed
│   ├── quick-profile.html
│   ├── full-profile.html
│   └── daily-log.html
├── css/                          # Stiilid
│   ├── style.css
│   └── forms.css
├── js/                           # JavaScript moodulid
│   ├── form-handler.js
│   ├── quick-profile.js
│   ├── full-profile.js
│   ├── daily-log.js
│   ├── tooltips.js
│   ├── custom-fields.js
│   ├── tags-input.js
│   └── docs-and-links.js
├── config/                       # Konfiguratsioon
│   └── site-config.js
├── data/                         # Andmefailid
│   └── tooltips.json
├── docs/                         # Tehniline dokumentatsioon
│   ├── ARCHITECTURE.md
│   ├── FILE-GUIDE.md
│   └── DEVELOPMENT.md
└── versions/                     # Vanad versioonid
    ├── README-v1.0.md
    └── ROADMAP-v1.0.md
```

---

## 🏠 Juurkaust

### `index.html`
**Otstarve**: Landing page, kus kasutaja valib vormi tüübi.

**Sektsioonid**:
- Header (pealkiri, subtitle)
- Form-options (3 kaarti: Kiir, Täis, Logi)
- Info-section (privaatsus, salvestamine, AI, holistiline)
- Footer (Meigo Medical, lingid)

**Skriptid**:
```html
<script src="config/site-config.js"></script>
<script src="js/docs-and-links.js"></script>
<script>
    // Klikitavad kaardid
    document.querySelectorAll('.form-card').forEach(card => { ... });
</script>
```

**Versioon**: 1.2.0 (kommentaaris üleval)

---

### `README.md`
**Otstarve**: Projekti dokumentatsioon (kasutajatele ja arendajatele).

**Sektsioonid**:
- Versioon ja kuupäev
- Kiirstart
- Funktsioonid (v1.2 ja plaanis)
- Failide struktuur
- Kasutamine (3 vormi kirjeldus)
- Konfiguratsioon (lingid, AI sektsioonid)
- Tehniline info (client-side, tulevikus server-side)
- Arendamine (koodi kontroll, git workflow)
- Tugi ja litsents

**Viited**: README-v1.0.md (varasem versioon)

---

### `ROADMAP.md`
**Otstarve**: Arendusplaan versioonide kaupa.

**Versioonid**:
- **v1.2** - PRAEGU (valmis funktsioonid)
- **v1.3** - JÄRGMINE (2-3 nädalat): Drag-drop, kompaktne vaade, "Ei soovi"
- **v1.4** - DATABASE (1-2 kuud): PHP backend, SQLite, kasutajad
- **v1.5** - AI INTEGRATSIOON (2-3 kuud): API calls, vastuste salvestus
- **v2.0** - PROFESSIONAALNE (3-6 kuud): Admin paneel, template'id
- **v3.0** - ÖKOSÜSTEEM (6-12 kuud): API, mobile, open source

**Milestones tabel**: Kuupäevad ja staatus

---

## 📋 forms/

### `quick-profile.html`
**Otstarve**: Kiirprofiil (5 min, 15 küsimust).

**Sektsioonid**:
1. Põhiandmed (vanus, sugu, kaal, pikkus, BMI)
2. Diagnoos ja kaebused
3. Ravimid (praegused)
4. Eelistused (looduslik vs meditsiin)
5. Elustiil (uni, toitumine, liikumine, stress)
6. Eesmärgid

**Skriptid**:
```html
<script src="../config/site-config.js"></script>
<script src="../js/form-handler.js"></script>
<script src="../js/tooltips.js"></script>
<script src="../js/quick-profile.js"></script>
<script src="../js/docs-and-links.js"></script>
```

**Export nupud**:
- TXT
- JSON
- AI prompt (kopeeri või lae alla)

**localStorage**: `quickProfileDraft`

---

### `full-profile.html`
**Otstarve**: Täisprofiil (30 min, 18 sektsiooni).

**18 sektsiooni**:
0. Privaatsus ja nõusolek
1. Profiil ja elurütm
2. Kaebused ja sümptomid (0-3 skaalad)
3. Tööriistad ja mõõtmised
4. Ajalugu (5 aastat)
5. Ravimid ja lisandid (dünaamiline tabel + Lisa väli)
6. Taimravi (viirpuu, arjuna, hibiscus jne)
7. Toitumine (menüü, piirangud, tags-input)
8. Kehalised praktikad (hingamine, liikumine)
9. Meele- ja rütmipraktikad
10. Ideoloogia ja piirjooned
11. Ressursid ja eelarve
12. Riskiliinid ("punased lipud")
13. Diagnostika
14. Otsustuspuu
15. Plaan
16. Menüü-eelistused
17. Paketi valikud

**Skriptid**:
```html
<script src="../config/site-config.js"></script>
<script src="../js/form-handler.js"></script>
<script src="../js/tooltips.js"></script>
<script src="../js/custom-fields.js"></script>
<script src="../js/tags-input.js"></script>
<script src="../js/full-profile.js"></script>
<script src="../js/docs-and-links.js"></script>
```

**Export nupud**:
- TXT
- JSON
- AI prompt (modal 18 checkboxiga)

**localStorage**: `fullProfileDraft`

**AI Prompt Modal**:
- 18 checkboxi (vali sektsioonid)
- Live preview
- "Vali kõik" / "Tühista kõik" / "Taasta vaikeväärtused"
- Kopeeri / Lae alla TXT

---

### `daily-log.html`
**Otstarve**: Päevalogi (2 min päevas).

**Väljad**:
- Kuupäev (date)
- Kellaaeg (time, 24h)
- Kaal (kg)
- Vererõhk (systolic/diastolic)
- Pulss (bpm)
- Sümptomid (0-3 skaalad): turse, hingeldus, rütmihäire, valu
- Rutiinid (checkboxid): hingamine, jalutus, ravimid
- Märkused (textarea)

**Skriptid**:
```html
<script src="../config/site-config.js"></script>
<script src="../js/form-handler.js"></script>
<script src="../js/daily-log.js"></script>
<script src="../js/docs-and-links.js"></script>
```

**Funktsioonid**:
- Salvesta (localStorage)
- Vaata ajalugu (tabel)
- Kustuta kirje
- Ekspordi CSV (arstile)

**localStorage**: `dailyLogHistory` (array)

---

## 🎨 css/

### `style.css`
**Otstarve**: Põhistiilid landing lehele (index.html).

**CSS Custom Properties (muutujad)**:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --bg-white: #ffffff;
    --bg-gray: #f9fafb;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --border-color: #e5e7eb;
    --shadow: 0 1px 3px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

**Põhiklassid**:
- `.container` - max-width 1200px, keskele
- `.form-card` - kaart (3 vormi tüübi jaoks), klikitav (cursor: pointer)
- `.btn-primary`, `.btn-secondary` - nupud
- `.ribbon` - "Soovitatud" märgis (featured card)

**Responsive**:
```css
@media (max-width: 768px) {
    .form-options { flex-direction: column; }
    .form-card { width: 100%; }
}
```

---

### `forms.css`
**Otstarve**: Vormide stiilid (quick, full, daily).

**Sektsioonid**:
- `.form-section` - iga sektsioon eraldi
- `.form-group` - label + input
- `.slider-container` - 0-3 skaalad
- `.dynamic-table` - ravimite tabel
- `.progress-bar` - edenemise riba
- `.export-buttons` - TXT/JSON/AI nupud

**Tooltip stiilid**:
```css
.tooltip-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: #3b82f6;
    color: white;
    border-radius: 50%;
    text-align: center;
    cursor: help;
}

.tooltip-content {
    display: none;
    position: absolute;
    background: #1f2937;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.875rem;
    z-index: 1000;
}
```

**Modal stiilid**:
```css
.modal {
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
}
```

---

## 🛠️ js/

### `form-handler.js`
**Otstarve**: Jagatud utiliidid kõigile vormidele.

**Funktsioonid**:

#### `calculateBMI(weight, height)`
```javascript
function calculateBMI(weight, height) {
    if (!weight || !height || height === 0) return 0;
    return (weight / ((height / 100) ** 2)).toFixed(1);
}
```
Kasutus: Täidab BMI välja automaatselt.

#### `updateProgress()`
```javascript
function updateProgress() {
    const inputs = document.querySelectorAll('input, select, textarea');
    const filled = Array.from(inputs).filter(i => i.value.trim() !== '').length;
    const percent = Math.round((filled / inputs.length) * 100);
    document.getElementById('progress-bar').style.width = percent + '%';
    document.getElementById('progress-text').textContent = percent + '%';
}
```
Kasutus: Uuendab progress bar'i iga input change'il.

#### `saveDraft(formType)`
```javascript
function saveDraft(formType) {
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData);
    localStorage.setItem(formType + 'Draft', JSON.stringify(data));
    showToast('Draft salvestatud!');
}
```
Kasutus: `saveDraft('quickProfile')` → salvestab localStorage'sse.

#### `loadDraft(formType)`
```javascript
function loadDraft(formType) {
    const saved = localStorage.getItem(formType + 'Draft');
    if (!saved) return;
    const data = JSON.parse(saved);
    Object.keys(data).forEach(key => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) input.value = data[key];
    });
    showToast('Draft laaditud!');
}
```
Kasutus: Laadib salvestatud draft'i tagasi vormi.

#### `copyToClipboard(text)`
```javascript
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Kopeeritud lõikelauale!');
    }).catch(err => {
        console.error('Kopeerimine ebaõnnestus:', err);
        showToast('Kopeerimine ebaõnnestus!', 3000);
    });
}
```
Kasutus: Kopeerib AI prompti lõikelauale.

#### `showToast(message, duration = 2000)`
```javascript
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px; right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}
```
Kasutus: Asendab alert() dialoogid smooth teadetega.

---

### `quick-profile.js`
**Otstarve**: Kiirprofiili ekspordi loogika.

**Funktsioonid**:

#### `exportQuickProfile(format)`
```javascript
function exportQuickProfile(format) {
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData);

    if (format === 'txt') {
        const txt = generateQuickProfileTXT(data);
        downloadFile(txt, 'kiirprofiil.txt', 'text/plain');
    } else if (format === 'json') {
        const json = JSON.stringify(data, null, 2);
        downloadFile(json, 'kiirprofiil.json', 'application/json');
    }
}
```

#### `generateQuickPrompt()`
```javascript
function generateQuickPrompt() {
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData);

    let prompt = `Olen ${data.age}-aastane ${data.gender}, kaal ${data.weight} kg, pikkus ${data.height} cm.\n\n`;
    prompt += `Põhidiagnoos: ${data.diagnosis}\n`;
    prompt += `Praegused ravimid: ${data.medications}\n`;
    // ...
    return prompt;
}
```

---

### `full-profile.js`
**Otstarve**: Täisprofiili ekspordi ja AI prompt redaktori loogika.

**Funktsioonid**:

#### `exportFullProfile(format)`
Sarnane quick-profile.js-le, aga 18 sektsiooniga.

#### `openPromptEditor()`
```javascript
function openPromptEditor() {
    const modal = document.getElementById('prompt-editor-modal');
    modal.style.display = 'block';
    updatePromptPreview(); // Live preview
}
```

#### `updatePromptPreview()`
```javascript
function updatePromptPreview() {
    const selectedSections = getSelectedSections();
    const prompt = generateAiPromptCustom(selectedSections);
    document.getElementById('prompt-preview').textContent = prompt;
}
```

#### `generateAiPromptCustom(sections)`
```javascript
function generateAiPromptCustom(sections) {
    let prompt = "# Terviseprofiil\n\n";

    if (sections.includes('section1')) {
        prompt += "## Profiil ja elurütm\n";
        prompt += getSection1Data();
        prompt += "\n\n";
    }
    // ...
    return prompt;
}
```

#### `selectAllSections()`, `deselectAllSections()`, `resetSections()`
Checkbox haldus modal'is.

---

### `daily-log.js`
**Otstarve**: Päevalogi salvestus ja CSV eksport.

**Funktsioonid**:

#### `saveDailyLog()`
```javascript
function saveDailyLog() {
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData);

    let history = JSON.parse(localStorage.getItem('dailyLogHistory') || '[]');
    history.push(data);
    localStorage.setItem('dailyLogHistory', JSON.stringify(history));

    showToast('Päevalogi salvestatud!');
    loadHistory(); // Uuenda tabelit
}
```

#### `loadHistory()`
```javascript
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('dailyLogHistory') || '[]');
    const tbody = document.querySelector('#history-table tbody');
    tbody.innerHTML = '';

    history.forEach((entry, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.time}</td>
            <td>${entry.weight} kg</td>
            <td>${entry.bp}</td>
            <td>${entry.pulse} bpm</td>
            <td><button onclick="deleteLogEntry(${index})">Kustuta</button></td>
        `;
        tbody.appendChild(tr);
    });
}
```

#### `exportDailyLogCSV()`
```javascript
function exportDailyLogCSV() {
    const history = JSON.parse(localStorage.getItem('dailyLogHistory') || '[]');

    let csv = 'Kuupäev,Kellaaeg,Kaal,Vererõhk,Pulss,Turse,Hingeldus,Rütmihäire,Valu,Märkused\n';
    history.forEach(entry => {
        csv += `${entry.date},${entry.time},${entry.weight},${entry.bp},${entry.pulse},`;
        csv += `${entry.swelling},${entry.breathlessness},${entry.arrhythmia},${entry.pain},"${entry.notes}"\n`;
    });

    downloadFile(csv, 'päevalogi.csv', 'text/csv');
}
```

---

### `tooltips.js`
**Otstarve**: JSON-põhine tooltip süsteem.

**Tööpõhimõte**:
1. Loeb `/data/tooltips.json`
2. Leiab kõik `[data-tooltip="key"]` elemendid
3. Genereerib `?` ikooni
4. Lisab hover/click event'id

**Funktsioonid**:

#### `initTooltips()`
```javascript
async function initTooltips() {
    const response = await fetch('../data/tooltips.json');
    const tooltips = await response.json();

    document.querySelectorAll('[data-tooltip]').forEach(el => {
        const key = el.getAttribute('data-tooltip');
        const text = tooltips[key];

        if (text) {
            const icon = document.createElement('span');
            icon.className = 'tooltip-icon';
            icon.textContent = '?';
            icon.title = text;
            el.appendChild(icon);
        }
    });
}
```

---

### `custom-fields.js`
**Otstarve**: Dünaamilised lisaväljad (Number/Date/Text).

**Funktsioonid**:

#### `addCustomField(sectionId)`
```javascript
let customFieldCounter = 0; // Unikaalne counter

function addCustomField(sectionId) {
    const label = prompt('Välja nimetus:');
    if (!label) {
        showToast('Palun sisesta välja nimetus!', 3000);
        return;
    }

    const type = prompt('Tüüp (number/date/text):');
    if (!['number', 'date', 'text'].includes(type)) {
        showToast('Kehtivad tüübid: number, date, text', 3000);
        return;
    }

    customFieldCounter++;
    const fieldName = 'custom_' + label.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + customFieldCounter;

    const container = document.getElementById(sectionId);
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
        <label>${label}:</label>
        <input type="${type}" name="${fieldName}">
    `;
    container.appendChild(div);

    showToast(`Väli "${label}" lisatud!`);
}
```

**Oluline**: Kasutab `customFieldCounter` (mitte `Date.now()`), et vältida duplikaat ID-sid.

---

### `tags-input.js`
**Otstarve**: Mitmikvalikud (komaga/Enteriga).

**Funktsioonid**:

#### `initTagsInput(inputId, listId)`
```javascript
function initTagsInput(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    if (!input || !list) return;

    const tags = [];

    function renderTags() {
        list.innerHTML = '';
        tags.forEach((tag, index) => {
            const chip = document.createElement('span');
            chip.className = 'tag-chip';
            chip.innerHTML = `
                ${tag}
                <button type="button" onclick="removeTag_${inputId}(${index})">&times;</button>
            `;
            list.appendChild(chip);
        });
    }

    // Enter või koma lisab
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            let value = input.value.trim().replace(/,$/,'');
            if (value) {
                tags.push(value);
                renderTags();
                updateHiddenInput();
                input.value = '';
            }
        }
    });

    // Hidden input synkroniseerimine (vormile)
    function updateHiddenInput() {
        let hidden = document.getElementById(inputId + '_hidden');
        if (!hidden) {
            hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.id = inputId + '_hidden';
            hidden.name = inputId;
            input.parentNode.appendChild(hidden);
        }
        hidden.value = tags.join(', ');
    }

    // Global remove funktsioon
    window['removeTag_' + inputId] = function(index) {
        tags.splice(index, 1);
        renderTags();
        updateHiddenInput();
    };
}
```

**Kasutus**:
```html
<label>Meeldivad toidud (komaga eraldatud):</label>
<input type="text" id="liked_foods" placeholder="Näiteks: õunad, kaer, kanamuna">
<div id="liked_foods_list" class="tags-list"></div>

<script>
    initTagsInput('liked_foods', 'liked_foods_list');
</script>
```

---

### `docs-and-links.js`
**Otstarve**: VERSION badge ja README/ROADMAP/linkide sektsioon.

**Funktsioonid**:

#### `renderVersionBadge()`
```javascript
function renderVersionBadge() {
    const badge = document.createElement('div');
    badge.id = 'version-badge';
    badge.innerHTML = `
        v${siteConfig.version}<br>
        <span style="font-size:0.7rem;">${siteConfig.date}</span>
    `;
    badge.style.cssText = `
        position: fixed;
        top: 10px; right: 10px;
        background: #3b82f6;
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
    `;
    document.body.appendChild(badge);
}
```

#### `renderDocsAndLinks()`
```javascript
function renderDocsAndLinks() {
    const section = document.createElement('div');
    section.id = 'docs-and-links';
    section.innerHTML = `
        <h3 onclick="toggleSection('readme')">📖 README</h3>
        <div id="readme-content" style="display:none;">Laen...</div>

        <h3 onclick="toggleSection('roadmap')">🗺️ ROADMAP</h3>
        <div id="roadmap-content" style="display:none;">Laen...</div>

        <h3 onclick="toggleSection('links')">🔗 Lingid</h3>
        <div id="links-content" style="display:none;">
            <ul>
                ${siteConfig.links.map(link => `
                    <li><a href="${link.url}" target="_blank">${link.description}</a></li>
                `).join('')}
            </ul>
        </div>
    `;
    document.body.appendChild(section);
}
```

#### `toggleSection(name)`
```javascript
async function toggleSection(name) {
    const content = document.getElementById(name + '-content');

    if (content.style.display === 'none') {
        if (!content.dataset.loaded) {
            const response = await fetch('../' + name.toUpperCase() + '.md');
            const text = await response.text();
            content.textContent = text; // Või markdown renderer
            content.dataset.loaded = 'true';
        }
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
}
```

---

## ⚙️ config/

### `site-config.js`
**Otstarve**: Globaalne konfiguratsioon.

**Struktuur**:
```javascript
const siteConfig = {
    version: "1.2.0",
    date: "10.11.2025",

    links: [
        {
            url: "https://github.com/LuureAmet/Eesti",
            description: "GitHub repo"
        },
        {
            url: "https://claude.ai",
            description: "Claude AI"
        }
    ],

    promptSections: [
        { id: "section0", label: "Privaatsus ja nõusolek", default: false },
        { id: "section1", label: "Profiil ja elurütm", default: true },
        { id: "section2", label: "Kaebused ja sümptomid", default: true },
        // ...
        { id: "section17", label: "Paketi valikud", default: true }
    ]
};
```

**Kasutus**:
- `docs-and-links.js` loeb versiooni ja linke
- `full-profile.js` loeb promptSections (checkboxid modal'is)

---

## 📊 data/

### `tooltips.json`
**Otstarve**: Abitekstid väljadele.

**Struktuur**:
```json
{
    "age": "Sinu vanus täisaastates",
    "weight": "Kaal kilogrammides (nt 75.5)",
    "bp_systolic": "Ülemine vererõhu väärtus (nt 120)",
    "arrhythmia": "0 = puudub, 1 = kerge, 2 = mõõdukas, 3 = tugev"
}
```

**Kasutus**: `tooltips.js` loeb selle ja lisab `?` ikoonid.

---

## 📚 docs/

### `ARCHITECTURE.md`
Tehniline arhitektuur (see fail, mida sa praegu loed!).

### `FILE-GUIDE.md`
See fail - detailne failide kirjeldus.

### `DEVELOPMENT.md`
Arendajale: kuidas lisada funktsioone, koodistandardid, git workflow.

---

## 🗂️ versions/

### `README-v1.0.md`, `ROADMAP-v1.0.md`
Varasemad versioonid (arhiveeritud enne ülesprojekteerimist).

---

## Kokkuvõte

| Fail | Otstarve | Sõltuvused |
|------|----------|------------|
| `index.html` | Landing page | `style.css`, `site-config.js`, `docs-and-links.js` |
| `quick-profile.html` | Kiirprofiil | `forms.css`, `form-handler.js`, `quick-profile.js`, `tooltips.js` |
| `full-profile.html` | Täisprofiil | `forms.css`, `form-handler.js`, `full-profile.js`, `tooltips.js`, `custom-fields.js`, `tags-input.js` |
| `daily-log.html` | Päevalogi | `forms.css`, `form-handler.js`, `daily-log.js` |
| `form-handler.js` | Jagatud utiliidid | - |
| `tooltips.js` | Tooltip süsteem | `tooltips.json` |
| `custom-fields.js` | Dünaamilised väljad | `form-handler.js` (showToast) |
| `tags-input.js` | Mitmikvalikud | - |
| `docs-and-links.js` | VERSION badge, README/ROADMAP | `site-config.js` |
| `site-config.js` | Konfiguratsioon | - |
| `tooltips.json` | Abitekstid | - |

---

© 2025 Meigo Medical Medisiiniportaal | FILE GUIDE v1.2
