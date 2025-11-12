# ARCHITECTURE - Meigo Medical Medisiiniportaal

Tehniline arhitektuur ja disainiotsused.

---

## Ülevaade

Meigo Medical Medisiiniportaal on **client-side veebilahendus**, mis töötab 100% brauseris ilma serveri vajaduseta. Tulevikus laieneb server-side funktsioonidega (andmebaas, kasutajad, AI).

---

## Praegune arhitektuur (v1.2) - CLIENT-SIDE

### Tehnoloogiline stack

- **HTML5**: Semantilised vormid, accessibility
- **CSS3**: Custom properties (muutujad), grid/flexbox, responsive
- **Vanilla JavaScript**: Ei vaja framework'e (React, Vue jne)
- **localStorage**: Draft'ide salvestus (max ~5-10 MB)
- **File API**: TXT/JSON/CSV eksport kliendi poolel

### Andmevoog

```
Kasutaja täidab vormi
       ↓
JavaScript valideerib sisendi
       ↓
localStorage salvestab draft'i (automaatselt või nupuga)
       ↓
Ekspordi nupp genereerib TXT/JSON/CSV
       ↓
Browser.download() laeb faili alla kasutaja arvutisse
```

### Moodulid ja nende rollid

#### 1. **form-handler.js** (jagatud utiliidid)
Kõigi vormide jaoks ühised funktsioonid:
- `calculateBMI()` - BMI arvutus
- `updateProgress()` - progress bar
- `saveDraft()` / `loadDraft()` - localStorage haldus
- `copyToClipboard()` - lõikelaua API
- `showToast()` - smooth teated (ilma alert-ideta)

#### 2. **quick-profile.js**
Kiirprofiili vorm (5 min):
- `exportQuickProfile()` - TXT/JSON eksport
- `generateQuickPrompt()` - AI prompt genereerimine

#### 3. **full-profile.js**
Täisprofiil (18 sektsiooni):
- `exportFullProfile()` - TXT/JSON eksport
- `generateAiPrompt()` - vaikimisi AI prompt
- `generateAiPromptCustom()` - kohandatav prompt (checkboxid)
- `openPromptEditor()` - modal 18 sektsiooniga

#### 4. **daily-log.js**
Päevalogi:
- `exportDailyLog()` - CSV eksport
- `loadHistory()` - ajaloo vaade localStorage-st
- `deleteLogEntry()` - kustutamine

#### 5. **tooltips.js**
Tooltip süsteem JSON-põhine:
- Loeb `/data/tooltips.json`
- Genereerib `?` ikoonid
- Näitab abitekste hover/click peale

#### 6. **custom-fields.js**
Dünaamilised lisaväljad:
- `addCustomField()` - Number/Date/Text välja lisamine
- `customFieldCounter` - unikaalne ID generaator
- Salvestab localStorage-sse

#### 7. **tags-input.js** (uus v1.2)
Mitmikvalikud:
- Komaga/Enteriga sisestus
- Chip-based kuvamine
- Hidden input sünkroniseerimine

#### 8. **docs-and-links.js** (uus v1.2)
- VERSION badge paremal ülal
- README/ROADMAP/linkide sektsioon lehe lõpus
- Loeb `config/site-config.js`

#### 9. **config/site-config.js**
Globaalne konfiguratsioon:
```javascript
const siteConfig = {
    version: "1.2.0",
    date: "10.11.2025",
    links: [ /* ... */ ],
    promptSections: [ /* ... */ ]
};
```

---

## localStorage Struktuur

### Draft'ide salvestus

```javascript
// Kiirprofiil
localStorage.setItem('quickProfileDraft', JSON.stringify({
    basicInfo: { age, gender, weight, height },
    diagnosis: "...",
    medications: "...",
    // ...
}));

// Täisprofiil
localStorage.setItem('fullProfileDraft', JSON.stringify({
    section0: { privacy: "..." },
    section1: { profile: "..." },
    // ...
    section17: { packages: "..." }
}));

// Päevalogi ajalugu
localStorage.setItem('dailyLogHistory', JSON.stringify([
    { date: "2025-11-10", time: "08:00", weight: 75, bp: "120/80", ... },
    { date: "2025-11-09", time: "08:00", ... }
]));
```

### Piirangud
- Max ~5-10 MB (sõltub brauserist)
- Ei toeta failide üleslaadimist (v1.4 lisandub serveriga)
- Ei sünkroniseeri seadmete vahel

---

## Tulevane arhitektuur (v1.4+) - HYBRID

### Server-side lisandused

```
┌─────────────────┐
│   BROWSER       │
│  (Client-side)  │
│                 │
│  - Vormid       │
│  - Validatsioon │
│  - localStorage │
└────────┬────────┘
         │ AJAX/Fetch
         ↓
┌─────────────────┐
│   PHP Backend   │
│                 │
│  - REST API     │
│  - Autentimine  │
│  - Turve        │
└────────┬────────┘
         │ SQL
         ↓
┌─────────────────┐
│   DATABASE      │
│  SQLite/MySQL   │
│                 │
│  - profiles     │
│  - users        │
│  - drafts       │
└─────────────────┘
```

### Planeeritud API endpoints

```
POST /api/auth/register   - Kasutaja registreerimine
POST /api/auth/login      - Sisselogimine
GET  /api/profiles        - Kasutaja profiilid
POST /api/profiles        - Uue profiili salvestus
GET  /api/profiles/{id}   - Konkreetse profiili laadimine
PUT  /api/profiles/{id}   - Profiili uuendamine
DELETE /api/profiles/{id} - Profiili kustutamine
POST /api/export/pdf      - PDF genereerimine server-side
POST /api/ai/prompt       - AI API kõne (Claude/OpenAI)
```

### Andmebaasi skeem (v1.4)

```sql
-- Kasutajad
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Profiilid
CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    version TEXT NOT NULL,       -- "1.2.0"
    form_type TEXT NOT NULL,     -- "quick" | "full" | "daily"
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    data JSON NOT NULL,          -- Kogu profiili sisu
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Draft'id (ajutised salvestused)
CREATE TABLE drafts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER,
    user_id INTEGER NOT NULL,
    form_type TEXT NOT NULL,
    saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    data JSON NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- AI vastused (v1.5)
CREATE TABLE ai_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    ai_provider TEXT NOT NULL,   -- "claude" | "openai" | "llama"
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);
```

---

## Disainiprintsiibid

### 1. **Mobile-first**
Alustame väikestest ekraanidest, laiendame suurematele:
```css
/* Mobile default */
.form-card { width: 100%; }

/* Desktop */
@media (min-width: 768px) {
    .form-card { width: 30%; }
}
```

### 2. **Progressive Enhancement**
- Töötab ka JavaScript-ita (vormid saab täita)
- localStorage valikuline (kui puudub, ainult eksport)
- Offline-first (ei vaja serveri ühendust)

### 3. **Modular JS**
Iga JS fail on iseseisvalt laetav:
```html
<!-- Ainult vajalikud -->
<script src="js/form-handler.js"></script>
<script src="js/quick-profile.js"></script>
```

### 4. **Config-driven**
Kõik muutuvad osad `config/site-config.js`:
- Versiooninumber
- Lingid
- AI prompt sektsioonid
- Tulevikus: värvid, keeled

---

## Turvalisus

### Praegu (client-side)
- Kõik andmed jäävad kasutaja brauserisse
- Ei saadeta kuhugi (välja arvatud kopeerimine AI-le)
- localStorage on lokaalne

### Tulevikus (server-side, v1.4+)
- **HTTPS kohustuslik** (SSL/TLS)
- **Password hashing**: bcrypt VÕI argon2
- **SQL injection kaitse**: Prepared statements
- **XSS kaitse**: Input sanitization (DOMPurify)
- **CSRF kaitse**: Token-based
- **Rate limiting**: Liiga palju päringuid → blokeerimine
- **GDPR**: Andmete kustutamine, eksport, audit log

---

## Jõudlus

### Praegused optimeerimised
- Väikesed failid (< 50 KB)
- Vanilla JS (ei lae React jne)
- Lazy tooltips (loeb JSON ainult kui vaja)
- localStorage cache

### Tulevased optimeerimised (v2.0+)
- **Minify CSS/JS** (eemaldab tühikud, kommentaarid)
- **CDN** (kui vaja kiirendada)
- **Service Worker** (offline cache)
- **Lazy loading** (sektsioonid laetakse vajadusel)
- **Image optimization** (kui tulevad pildid)

---

## Testimine

### Praegu
- Manuaalne testimine (browser)
- Console.log debug

### Tulevikus (v1.3+)
```bash
# Unit tests (Jest)
npm test

# E2E tests (Cypress)
npm run e2e

# Accessibility (axe-core)
npm run a11y
```

---

## Skaleeritavus

### v1.x (Client-side)
- **Max kasutajaid**: Piiramatu (iga kasutaja oma brauseris)
- **Max andmeid**: localStorage ~5-10 MB per kasutaja

### v2.x (Server-side)
- **SQLite**: ~1000 kasutajat, lihtne start
- **MySQL/PostgreSQL**: 10,000+ kasutajat
- **Caching**: Redis/Memcached
- **Load balancer**: Nginx (kui vaja mitu serverit)

---

## Deployment

### Praegu (v1.2)
```bash
# Kopeeri failid static hostingule
scp -r medportal/ user@server:/var/www/html/

# VÕI GitHub Pages
git push origin main
# → https://luureamet.github.io/Eesti/medportal/
```

### Tulevikus (v1.4+)
```bash
# PHP server (Apache/Nginx)
# Database migrations
php artisan migrate

# Cron jobs (päevalogide reminder'id)
0 8 * * * php /path/to/send-reminders.php
```

---

## Laiendatavus

### Plugin süsteem (v3.0)
Võimaldab kolmandatel osapooltel lisada:
- Uusi välju
- Uusi ekspordi formaate
- AI integratsioonid

```javascript
// Näide plugin API
MediPortal.registerPlugin({
    name: "Ravimite andmebaas",
    version: "1.0.0",
    onLoad: function() {
        // Lisa autocomplete ravimite väljale
    }
});
```

---

## Tehnoloogiavalikud

### Miks Vanilla JS?
- **Lihtne**: Ei vaja npm, webpack, build
- **Kiire**: Ei lae framework'e (React ~40 KB)
- **Õpitav**: Iga arendaja saab aru
- **Stabiilne**: Ei murdu framework'i uuendusega

### Miks localStorage (mitte cookies)?
- **Suurem**: 5-10 MB vs 4 KB (cookies)
- **Privaatne**: Ei saadeta serverisse automaatselt
- **Lihtne API**: `setItem`, `getItem`

### Miks SQLite tulevikus (mitte MySQL kohe)?
- **Lihtne start**: Üks fail, ei vaja serverit
- **Piisav**: 1000 kasutajat ilma probleemita
- **Hiljem upgrade**: SQLite → MySQL lihtne

---

## Kokkuvõte

**Praegu (v1.2)**:
- 100% client-side
- localStorage draft'idele
- Vanilla JS
- Ei vaja serverit

**Tulevikus (v1.4+)**:
- Hybrid (client + server)
- PHP backend
- SQLite/MySQL
- Kasutajad, autentimine
- AI integratsioon (v1.5)

---

© 2025 Meigo Medical Medisiiniportaal | ARCHITECTURE v1.2
