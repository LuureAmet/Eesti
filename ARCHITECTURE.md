# Arhitektuur

## 🏛️ Üldine Struktuur

```
┌─────────────────────────────────────────────────────┐
│                   KASUTAJA                          │
│          (täidab terviseprofiili vormi)             │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│              FRONTEND (React/Vue)                    │
│  - Progressiivne avastamine (plus-nupud)            │
│  - "i"-nupu modaalid (Tab A: Wiki, Tab B: Allikad)  │
│  - Scope põhine filtreerimine                       │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│           JSON ANDMEMUDEL (2 vormingut)             │
│                                                      │
│  1. DETAILED JSON (frontend)                        │
│     - Hierarhiline struktuur                        │
│     - Metadata (scope, infoUrl)                     │
│                                                      │
│  2. CANONICAL JSON (AI)                             │
│     - Lame struktuur                                │
│     - Ainult väärtused                              │
│                                                      │
│  toCanonical() transformatsioon                     │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│              AI KONSULTATSIOON                       │
│                                                      │
│  A. LIHTNE LÜHI-PROMPT                              │
│     - Kiire konsult (perearst, õde)                 │
│     - 1-2 lausega soovitus                          │
│                                                      │
│  B. TÄIELIK PROMPT (specialty-mode)                 │
│     - LISP otsustuspuu                              │
│     - Specialty valik:                              │
│       * family-medicine                             │
│       * cardiology, hepatology, nephrology          │
│       * Ayurveda, TCM, naturopathy                  │
│       * sports-medicine, rural-traditions           │
│                                                      │
│     - Koostoime kontroll                            │
│     - Piirkonna spetsiifika (Eesti apteegid)       │
│     - Kultuuri kontekst                             │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                 SOOVITUSED                          │
│  - Ravimid / Taimravi                               │
│  - Elustiili muudatused                             │
│  - Diagnostika soovitus                             │
│  - Kohalikud ressursid (Eesti apteed, poed)        │
└─────────────────────────────────────────────────────┘
```

## 📊 JSON Andmemudel

### 1. DETAILED JSON (Frontend)

```json
{
  "profile": {
    "sleep": {
      "quality": {
        "value": "moderate",
        "scope": "universal",
        "meta": {
          "infoUrl": "/wiki/sleep-quality",
          "publicSources": [...]
        }
      },
      "snoring": {
        "enabled": true,
        "disturbs": ["partner", "self"],
        "relatedToDrinking": true,
        "scope": "universal"
      },
      "nightmares": {
        "enabled": true,
        "frequency": "weekly",
        "scope": "universal"
      },
      "paranormal": {
        "enabled": true,
        "types": ["out-of-body", "prophetic"],
        "scope": "belief",
        "meta": {
          "infoUrl": "/wiki/paranormal-sleep",
          "disclaimer": "Belief-based, not medical"
        }
      }
    },
    "movement": {
      "physicalActivityLevel": "moderate",
      "types": [
        {
          "type": "walking",
          "frequency": "daily",
          "scope": "universal"
        },
        {
          "type": "remote-viewing",
          "frequency": "weekly",
          "scope": "belief"
        }
      ]
    }
  }
}
```

### 2. CANONICAL JSON (AI)

```json
{
  "sleep_quality": "moderate",
  "snoring": true,
  "snoring_disturbs_partner": true,
  "snoring_disturbs_self": false,
  "snoring_drinking_related": true,
  "nightmares": true,
  "nightmares_frequency": "weekly",
  "paranormal_sleep": true,
  "paranormal_sleep_types": ["out-of-body", "prophetic"],
  "physical_activity_level": "moderate",
  "movement_walking": true,
  "movement_walking_frequency": "daily",
  "movement_remote_viewing": true,
  "movement_remote_viewing_frequency": "weekly"
}
```

### toCanonical() Funktsioon

```javascript
function toCanonical(detailedJSON) {
  const canonical = {};

  function flatten(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value.scope) {
        // Detailed vormingust
        canonical[`${prefix}${key}`] = value.value;
        if (value.enabled !== undefined) {
          canonical[`${prefix}${key}_enabled`] = value.enabled;
        }
        // Lisame kõik meta-väljad
        for (const [metaKey, metaValue] of Object.entries(value)) {
          if (metaKey !== 'value' && metaKey !== 'scope' && metaKey !== 'meta') {
            canonical[`${prefix}${key}_${metaKey}`] = metaValue;
          }
        }
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        flatten(value, `${prefix}${key}_`);
      } else {
        canonical[`${prefix}${key}`] = value;
      }
    }
  }

  flatten(detailedJSON);
  return canonical;
}
```

## 🧬 Scope Taksonoomia

### Definitsioon

```typescript
type Scope =
  | 'universal'       // Kõikidele kasutajatele
  | 'demographic'     // Spetsiifiline rahvastikule
  | 'organ'           // Spetsiifiline elundile
  | 'context'         // Spetsiifiline kontekstile (rasemus, sport)
  | 'modality'        // Spetsiifiline ravimeetodile
  | 'belief';         // Uskumus-põhine (paranormaalne)
```

### Filtreerimine

```javascript
function filterByScope(detailedJSON, allowedScopes) {
  // Näide: Filtreeri välja 'belief' kui kasutaja ei soovi
  const filtered = JSON.parse(JSON.stringify(detailedJSON));

  function recursiveFilter(obj) {
    for (const [key, value] of Object.entries(obj)) {
      if (value.scope && !allowedScopes.includes(value.scope)) {
        delete obj[key];
      } else if (typeof value === 'object') {
        recursiveFilter(value);
      }
    }
  }

  recursiveFilter(filtered);
  return filtered;
}
```

### Scope Kasutusjuhtumid

| Scope | Kasutab | Ei kasuta |
|-------|---------|-----------|
| `universal` | Kõik | - |
| `demographic` | Epidemioloog | GPT-4 (üldine konsult) |
| `organ` | Kardioloog | Perearst (üldine) |
| `context` | Spordimeditsiin | Tavakonsult |
| `modality` | Ayurveda AI | Lääne meditsiini AI |
| `belief` | Vaimse tervisega töötaja | Teaduspõhine AI |

## 🤖 AI Promptid

### A. LIHTNE LÜHI-PROMPT

**Kasutus:** Kiire konsult (perearst, õde)

```
Kasutaja profiil:
{canonical JSON}

Kasutaja kaebused:
- Väsimus
- Tinnitus
- Kõhukeeramine

Anna 1-2 lauset:
1. Tõenäoline põhjus
2. Lihtne soovitus
```

### B. TÄIELIK PROMPT (Specialty-Mode)

**Kasutus:** Põhjalik konsult

```lisp
;; MEDIAL AI KONSULTATSIOONI SÜSTEEM
;; Versioon: 1.0

;; === KASUTAJA PROFIIL ===
(define profile {canonical JSON})

;; === SPECIALTY VALIK ===
(define specialty 'family-medicine) ; või 'cardiology, 'Ayurveda jne

;; === OTSUSTUSPUU ===
(define (consult profile)
  (cond
    ;; 1. KIIRELOOMULINE KONTROLL
    [(emergency? profile)
     (immediate-medical-attention profile)]

    ;; 2. KOOSTOIME RISKID
    [(interaction-risk? profile)
     (check-interactions profile)]

    ;; 3. SPECIALTY PÕHINE ANALÜÜS
    [(eq? specialty 'cardiology)
     (cardiology-consult profile)]
    [(eq? specialty 'Ayurveda)
     (ayurveda-consult profile)]
    ; ... teised specialty-d

    ;; 4. RESSURSSIDE KONTROLL
    [(resource-limited? profile)
     (budget-friendly-options profile)]

    ;; 5. PIIRKONNA SPETSIIFIKA
    [else
     (local-resources profile)]))

;; === KOOSTOIME KONTROLL ===
(define (check-interactions profile)
  (let ([meds (get-medications profile)]
        [herbs (get-herbs profile)]
        [substances (get-substances profile)])
    (for-each (lambda (combo)
                (when (risky? combo)
                  (warn combo)))
              (all-combinations meds herbs substances))))

;; === AYURVEDA NÄIDE ===
(define (ayurveda-consult profile)
  (let ([dosha (determine-dosha profile)]
        [imbalance (find-imbalance profile)])
    (recommend-herbs dosha imbalance)
    (recommend-lifestyle dosha)
    (recommend-diet dosha)))

;; === PIIRKONNA RESSURSID ===
(define (local-resources profile)
  (let ([region (get-region profile)]
        [budget (get-budget profile)])
    (if (eq? region 'Estonia)
        (list-estonian-pharmacies region budget)
        (list-local-shops region))))

;; === KÄIVITA KONSULTATSIOON ===
(consult profile)
```

## 🔒 Privaatsuse Arhitektuur

### Jagamise Tasemed

```javascript
const sharingLevels = {
  withGod: {
    enabled: true,
    religions: ['Christianity', 'Islam', 'Hinduism', 'Indigenous']
  },
  withAI_medical: {
    enabled: true,
    models: ['GPT-4-Medical', 'Med-PaLM', 'Claude-Medical']
  },
  withAI_testing: {
    enabled: false,
    models: []
  },
  withPolice: { enabled: false },
  withSocialWorker: { enabled: true },
  withDoctor: { enabled: true },
  withFamily: { enabled: false },
  withAnonymousResearcher: { enabled: false },
  public_OSINT: { enabled: false },
  medicalTesting: { enabled: false }
};
```

### Ei Jagatavad Andmed

```javascript
const doNotShare = {
  homeViolence: true,
  financialSituation: true,
  mentalSituation: true,
  disability: true,
  entheogenUse: true,
  substanceUse: {
    alcohol: true,
    cannabis: false,
    psychedelics: true,
    opioids: true
  }
};
```

### Filtreerimise Loogika

```javascript
function filterForRecipient(profile, recipient) {
  const filtered = JSON.parse(JSON.stringify(profile));

  if (recipient === 'police' && doNotShare.entheogenUse) {
    delete filtered.substances.entheogens;
    delete filtered.substances.psychedelics;
  }

  if (recipient === 'doctor' && doNotShare.homeViolence) {
    delete filtered.socialSituation.homeViolence;
  }

  // Belief scope filtreerimine teaduspõhistele AI-dele
  if (recipient === 'AI_medical_scientific') {
    filtered = filterByScope(filtered, ['universal', 'organ', 'modality']);
  }

  return filtered;
}
```

## 📱 Kasutajaliides

### "i"-nupu Modaal

```javascript
const InfoModal = ({ field }) => {
  const [activeTab, setActiveTab] = useState('wiki');

  return (
    <Modal>
      <Tabs>
        <Tab name="wiki" active={activeTab === 'wiki'}>
          {/* Tab A: Sise-Wiki */}
          <WikiContent field={field} />
        </Tab>

        <Tab name="sources" active={activeTab === 'sources'}>
          {/* Tab B: Avalikud Allikad */}
          <PublicSources field={field} />
        </Tab>
      </Tabs>
    </Modal>
  );
};
```

### Plus-nuppude Süsteem

```javascript
const ExpandableSection = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? '−' : '+'} {title}
      </button>
      {expanded && <div>{children}</div>}
    </div>
  );
};

// Kasutus
<ExpandableSection title="Norskamine">
  <select name="disturbs">
    <option>Ei häiri</option>
    <option>Häirib elukaaslast</option>
    <option>Häirib ennast</option>
  </select>
  <checkbox name="drinkingRelated">Oleneb joomisastmest</checkbox>
</ExpandableSection>
```

## 🧪 Testimine

### Ühikutestid

```javascript
describe('toCanonical', () => {
  it('peaks muutma detailed vormingu canonical vorminguks', () => {
    const detailed = {
      sleep: {
        quality: { value: 'moderate', scope: 'universal' }
      }
    };

    const canonical = toCanonical(detailed);
    expect(canonical.sleep_quality).toBe('moderate');
  });
});
```

### Integratsioonitestid

```javascript
describe('AI Konsultatsioon', () => {
  it('peaks andma hoiatuse koostoimete kohta', async () => {
    const profile = {
      medications: ['Warfarin'],
      herbs: ['Ginkgo']
    };

    const result = await consult(profile);
    expect(result.warnings).toContain('Warfarin + Ginkgo');
  });
});
```

## 🚀 Deployment

### Keskkonna Muutujad

```bash
# AI Mudelid
AI_MODEL_MEDICAL=gpt-4-medical
AI_MODEL_AYURVEDA=custom-ayurveda-model

# Andmebaas
DB_CONNECTION=postgresql://...

# API Võtmed
ESTONIAN_PHARMACY_API_KEY=...
```

### Docker

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
