# DEVELOPMENT - Meigo Medical Medisiiniportaal

Arendajale: kuidas lisada funktsioone, koodistandardid, testimine, git workflow.

---

## 🚀 Kiirstart arendajale

### 1. Klooni repo

```bash
git clone https://github.com/LuureAmet/Eesti.git
cd Eesti/medportal
```

### 2. Ava brauseris

```bash
# Otse brauserist (kõige lihtsam)
firefox index.html

# VÕI lokaalne server (kui vaja CORS)
python3 -m http.server 8000
# Ava: http://localhost:8000
```

### 3. Tee muudatused

- Muuda HTML/CSS/JS faile
- Testi brauseris
- Vaata console.log (F12)

### 4. Commit ja push

```bash
git add -A
git commit -m "Kirjeldus muudatusest"
git push origin claude/medical-portal-setup-011CUxmtZU5NRXCwtdEnHnBS
```

---

## 📁 Arenduskeskkond

### Vajalikud tööriistad

- **Brauseris testimiseks**: Firefox / Chrome (uusim versioon)
- **Koodi redaktoriks**: VS Code, Sublime, Vim (suvaline)
- **Git**: Versioonihaldus
- **Python3** (valikuline): Lokaalne server

### Soovitatavad VS Code laiendused

- **Live Server** - automaatne reload
- **ESLint** - JavaScript linter
- **Prettier** - koodi vormindamine
- **HTML CSS Support** - autocomplete

---

## 🧩 Kuidas lisada uus funktsioon?

### Näide 1: Lisa uus vorm

1. **Kopeeri template**:
```bash
cp forms/quick-profile.html forms/my-new-form.html
```

2. **Muuda HTML**:
```html
<title>Minu Uus Vorm</title>
<h1>Minu Uus Vorm</h1>
<!-- Lisa oma väljad -->
```

3. **Loo JS fail**:
```bash
touch js/my-new-form.js
```

```javascript
// js/my-new-form.js
function exportMyNewForm(format) {
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData);

    if (format === 'txt') {
        const txt = generateMyFormTXT(data);
        downloadFile(txt, 'minu-vorm.txt', 'text/plain');
    }
}

function generateMyFormTXT(data) {
    let txt = "MINU VORM\n\n";
    txt += `Nimi: ${data.name}\n`;
    // ...
    return txt;
}
```

4. **Lisa index.html-i**:
```html
<div class="form-card">
    <h3>Minu Uus Vorm</h3>
    <p class="description">Kirjeldus...</p>
    <a href="forms/my-new-form.html" class="btn btn-primary">Alusta</a>
</div>
```

5. **Testi**:
```bash
firefox index.html
```

---

### Näide 2: Lisa uus sektsioon täisprofiili

1. **Ava `full-profile.html`**:
```html
<!-- SEKTSIOON 18: Uus sektsioon -->
<div class="form-section">
    <h2>18. Uus Sektsioon</h2>
    <div class="form-group">
        <label for="new_field">Uus väli:</label>
        <input type="text" id="new_field" name="new_field">
    </div>
</div>
```

2. **Lisa `config/site-config.js`**:
```javascript
promptSections: [
    // ...
    { id: "section18", label: "Uus Sektsioon", default: true }
]
```

3. **Lisa `full-profile.js`**:
```javascript
function generateAiPromptCustom(sections) {
    // ...
    if (sections.includes('section18')) {
        prompt += "## Uus Sektsioon\n";
        prompt += getSection18Data();
        prompt += "\n\n";
    }
    return prompt;
}

function getSection18Data() {
    const newField = document.getElementById('new_field').value;
    return `Uus väli: ${newField}`;
}
```

---

### Näide 3: Lisa uus tooltip

1. **Ava `data/tooltips.json`**:
```json
{
    "my_new_field": "See on abitekst uuele väljale"
}
```

2. **Lisa HTML-i**:
```html
<label for="my_new_field" data-tooltip="my_new_field">Minu uus väli:</label>
<input type="text" id="my_new_field" name="my_new_field">
```

3. **Automaatne**: `tooltips.js` lisab `?` ikooni automaatselt!

---

## 🎨 Koodistandardid

### HTML

- **Indentsioon**: 4 tühikut (mitte tab)
- **Semantika**: Kasuta `<section>`, `<article>`, `<header>`, `<footer>`
- **Accessibility**: Lisa `aria-label`, `role`, `alt`

```html
<!-- HEA -->
<label for="age">Vanus:</label>
<input type="number" id="age" name="age" aria-label="Vanus aastates">

<!-- HALB -->
<div>Vanus: <input name="age"></div>
```

### CSS

- **Custom properties**: Kasuta muutujaid (`:root`)
- **BEM metodoloogia** (valikuline):
  - Block: `.form-card`
  - Element: `.form-card__title`
  - Modifier: `.form-card--featured`

```css
/* HEA */
.form-card {
    background: var(--bg-white);
    border-radius: 8px;
}

.form-card--featured {
    border: 2px solid var(--primary-color);
}

/* HALB */
.card {
    background: #ffffff; /* Kasuta muutujat! */
}
```

### JavaScript

- **ES6+**: Kasuta `const`, `let`, arrow functions
- **Funktsioonide nimed**: `camelCase`
- **Konstandid**: `UPPER_CASE`

```javascript
// HEA
const MAX_AGE = 120;

function calculateBMI(weight, height) {
    if (!weight || !height) return 0;
    return (weight / ((height / 100) ** 2)).toFixed(1);
}

// Arrow function
const showToast = (message) => {
    console.log(message);
};

// HALB
var max_age = 120; // Kasuta const!

function calculate_bmi(weight, height) { // camelCase!
    return weight / (height / 100) ** 2; // Ei kontrolli null!
}
```

### Kommentaarid

```javascript
// HEA
/**
 * Arvutab BMI (Body Mass Index)
 * @param {number} weight - Kaal kilogrammides
 * @param {number} height - Pikkus sentimeetrites
 * @returns {number} BMI väärtus (1 komakoht)
 */
function calculateBMI(weight, height) {
    // ...
}

// HALB
// see funktsioon teeb midagi
function doSomething() { ... }
```

---

## 🧪 Testimine

### Manuaalne testimine

1. **Ava vorm brauseris**
2. **Täida väljad** (kasuta erinevaid väärtusi)
3. **Salvesta draft** → Refresh lehte → Kontrolli, kas laeb tagasi
4. **Ekspordi TXT/JSON** → Kontrolli sisu
5. **Vaata console.log** (F12) → Kas on vigu?

### Kontrollnimekiri

- [ ] Kõik väljad salvestatakse
- [ ] Progress bar uuendub
- [ ] BMI arvutus töötab
- [ ] Export nupud töötavad
- [ ] Tooltip'id kuvatakse
- [ ] Responsive (testi mobile vaates: F12 → Device toolbar)
- [ ] Ei ole console.log vigu

### Testimine erinevates brauserites

- **Chrome** (esmane)
- **Firefox** (vajalik)
- **Safari** (kui Mac)
- **Edge** (valikuline)

---

## 🐛 Debugimine

### Console.log

```javascript
function saveDraft(formType) {
    console.log('saveDraft kutsuti:', formType);

    const formData = new FormData(document.querySelector('form'));
    console.log('FormData:', Object.fromEntries(formData));

    const data = Object.fromEntries(formData);
    console.log('Data objekt:', data);

    localStorage.setItem(formType + 'Draft', JSON.stringify(data));
    console.log('Salvestatud localStorage-sse');
}
```

### Breakpointid

F12 → Sources → Vali fail → Kliki rea numbrile (punane punkt)

### localStorage vaatamine

F12 → Application → Local Storage → file://

```javascript
// Console-is:
localStorage.getItem('quickProfileDraft')
localStorage.clear() // Kustuta kõik
```

---

## 📝 Versioonihaldus (Git)

### Branch'id

- **`main`** - stabiilne versioon (ainult tööks kood)
- **`claude/medical-portal-setup-*`** - development branch (praegu)
- Tulevikus: `feature/uus-funktsioon`, `bugfix/viga-parandus`

### Commit sõnumid

```bash
# HEA
git commit -m "Lisa tags-input.js komaga/Enteriga sisestuseks"
git commit -m "Paranda custom-fields.js Number/Date väljad"
git commit -m "Eemalda emojid, lisa VERSION badge"

# HALB
git commit -m "fix" # Liiga lühike!
git commit -m "Muuda faile" # Ebaselge!
git commit -m "ASJASD KÕIK KATKI AITAB" # 😅
```

### Git workflow

```bash
# 1. Kontrolli state
git status

# 2. Lisa failid
git add medportal/js/my-file.js
# VÕI kõik:
git add -A

# 3. Commit
git commit -m "Kirjeldus"

# 4. Push
git push -u origin claude/medical-portal-setup-011CUxmtZU5NRXCwtdEnHnBS

# 5. Vaata ajalugu
git log --oneline

# 6. Diff (mis muutus?)
git diff
```

### .gitignore (kui vaja)

```
# Ei lae üles
node_modules/
*.log
.env
.DS_Store
```

---

## 🔧 Levinud probleemid

### Probleem 1: localStorage ei salvesta

**Põhjus**: Brauseris "Private Browsing" režiim.

**Lahendus**: Ava tavaline aken (mitte private).

---

### Probleem 2: CORS viga fetch()-iga

```
Access to fetch at 'file:///...' from origin 'null' has been blocked by CORS policy
```

**Põhjus**: `file://` protokoll ei luba fetch()-i.

**Lahendus**: Käivita lokaalne server:
```bash
python3 -m http.server 8000
# Ava: http://localhost:8000
```

---

### Probleem 3: JSON.parse viga

```
Uncaught SyntaxError: Unexpected token in JSON at position 0
```

**Põhjus**: localStorage on tühi või vale formaat.

**Lahendus**:
```javascript
// HEA
const saved = localStorage.getItem('draft');
const data = saved ? JSON.parse(saved) : {};

// HALB
const data = JSON.parse(localStorage.getItem('draft')); // Kui null → viga!
```

---

### Probleem 4: querySelector tagastab null

```
Uncaught TypeError: Cannot read property 'value' of null
```

**Põhjus**: Element ID puudub HTML-is.

**Lahendus**: Kontrolli ID-d:
```javascript
const input = document.getElementById('my_field');
if (!input) {
    console.error('Element "my_field" ei leitud!');
    return;
}
const value = input.value;
```

---

## 🚀 Optimeerimised

### 1. Minify CSS/JS (tulevikus)

```bash
# CSS minify
npm install -g clean-css-cli
cleancss -o style.min.css style.css

# JS minify
npm install -g terser
terser form-handler.js -o form-handler.min.js
```

### 2. Lazy load (vajadusel)

```javascript
// Lae tooltips ainult kui vaja
async function loadTooltipsIfNeeded() {
    if (document.querySelectorAll('[data-tooltip]').length > 0) {
        await initTooltips();
    }
}
```

### 3. Debounce (päevalogi automaatne salvestus)

```javascript
let saveTimeout;
function autoSaveDraft() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveDraft('fullProfile');
    }, 2000); // Salvesta 2 sek pärast viimast muudatust
}

// Iga input change'il
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', autoSaveDraft);
});
```

---

## 📚 Kasulikud ressursid

### Dokumentatsioon

- [MDN Web Docs](https://developer.mozilla.org/) - HTML/CSS/JS
- [Can I Use](https://caniuse.com/) - Brauserite tugi
- [JSON.org](https://www.json.org/) - JSON formaat

### Tööriistad

- [JSONLint](https://jsonlint.com/) - JSON validaator
- [Regex101](https://regex101.com/) - Regex testimine
- [CSS Grid Generator](https://cssgrid-generator.netlify.app/)

### Inspiratsioon

- [CodePen](https://codepen.io/) - HTML/CSS/JS näited
- [CSS-Tricks](https://css-tricks.com/) - CSS juhendid

---

## 🤝 Kaasa löömine

### 1. Leia probleem

Vaata [ROADMAP.md](../ROADMAP.md) järgmisi prioriteete:
- Drag-and-drop prioriteedid
- Kompaktne/laiendatud vaade
- "Ei soovi" kast
- AI prompt 2-osaline

### 2. Loo issue (tulevikus GitHub Issues)

```
Pealkiri: Lisa drag-and-drop ideoloogia/piirjooned

Kirjeldus:
- Kasutaja saab järjestada ideoloogia väärtusi
- Näiteks: Looduslik > Rütm > Energia
- Kasuta SortableJS teeki
```

### 3. Tee pull request (tulevikus)

```bash
git checkout -b feature/drag-drop-ideology
# Tee muudatused...
git commit -m "Lisa drag-and-drop ideoloogia sektsioonile"
git push origin feature/drag-drop-ideology
# GitHub: Create Pull Request
```

### 4. Code review

- Teised arendajad vaatavad üle
- Parandad tagasiside põhjal
- Merge main branchi

---

## 📅 Arendusprotsess

### Sprint (2 nädalat)

```
Nädal 1:
- Planeerimine (ROADMAP vaatamine)
- Design/mockup (kui vaja)
- Kood (50%)

Nädal 2:
- Kood (50%)
- Testimine
- Dokumentatsioon (README, FILE-GUIDE uuendus)
- Commit ja push
```

### Release cycle

- **v1.x** - Minor updates (2-3 nädalat)
- **v2.x** - Major updates (2-3 kuud)

---

## 🔐 Turvalisus (tulevikus, server-side)

### Input validatsioon

```javascript
// Client-side
function validateAge(age) {
    if (age < 0 || age > 120) {
        showToast('Vanus peab olema 0-120 vahel!', 3000);
        return false;
    }
    return true;
}

// Server-side (PHP)
if (!is_numeric($age) || $age < 0 || $age > 120) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid age']);
    exit;
}
```

### XSS kaitse

```javascript
// HEA (kasuta textContent)
element.textContent = userInput;

// HALB (XSS oht!)
element.innerHTML = userInput; // Kui sisaldab <script>...
```

### SQL injection kaitse (tulevikus)

```php
// HEA (prepared statements)
$stmt = $pdo->prepare("SELECT * FROM profiles WHERE user_id = ?");
$stmt->execute([$userId]);

// HALB
$query = "SELECT * FROM profiles WHERE user_id = " . $_GET['id']; // SQL injection!
```

---

## 📊 Jõudluse mõõtmine

### Lighthouse (Chrome)

F12 → Lighthouse → Generate report

- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+ (kui vaja)

### Failide suurused

```bash
# Kontrolli failide suurusi
ls -lh medportal/js/
ls -lh medportal/css/

# Eesmärk:
# - HTML failid: < 100 KB
# - CSS failid: < 50 KB
# - JS failid: < 50 KB
```

---

## 🎯 Järgmised sammud

### v1.3 (2-3 nädalat)

1. **Drag-and-drop** (SortableJS?)
2. **Kompaktne vaade** (toggle nupp)
3. **"Ei soovi" kast** (checkboxid + plussiga lisamine)
4. **AI prompt 2-osaline** (kokkuvõte + täisprofiil)

### v1.4 (1-2 kuud)

1. **PHP backend** (REST API)
2. **SQLite andmebaas**
3. **Kasutajad** (login/register)

### v1.5 (2-3 kuud)

1. **AI integratsioon** (Claude API)
2. **Vastuste salvestus**

---

## 📝 Kokkuvõte

**Arendajale oluline**:
- Kood on Vanilla JS (ei vaja framework'e)
- Testimine brauseris (F12 console)
- Git workflow (add → commit → push)
- Koodistandardid (camelCase, const, custom properties)
- Dokumenteeri (kommentaarid, README uuendus)

**Järgmine samm**:
- Vaata [ROADMAP.md](../ROADMAP.md) prioriteete
- Vali funktsioon, mida lisada
- Tee muudatused
- Commit ja push

---

© 2025 Meigo Medical Medisiiniportaal | DEVELOPMENT v1.2
