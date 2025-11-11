# Funktsioonide Roadmap

## ✅ v1.0.0 - POC (Proof of Concept)

**Status:** PLANEERIMISEL

- [ ] Baas React/Vue frontend
- [ ] JSON andmemudel (detailed + canonical)
- [ ] `toCanonical()` transformatsioon
- [ ] Lihtne lühi-prompt (GPT-4)
- [ ] Põhilised väljad:
  - Kaebused (5-10 levinumat)
  - Ravimid
  - Allergiad
  - Põhiline elupaik

---

## 🎯 v1.7.0 - UNI + PRIVAATSUS LAIENDUS

**Prioriteet:** KÕRGE
**Kestus:** 2-3 nädalat

### UNI - Eraldi Sektsioon

#### 1. Uni Kvaliteet
- [ ] Dropdown: `excellent | good | moderate | poor | very-poor`
- [ ] Info nupp: "Miks see oluline"

#### 2. Norskamine (plus-menüü)
- [ ] Checkbox: `Norskamine`
- [ ] Alamvalikud:
  - [ ] `Ei häiri kedagi`
  - [ ] `Häirib elukaaslast`
  - [ ] `Häirib ennast`
  - [ ] `Oleneb joomisastmest` (checkbox)
- [ ] Scope: `universal`

#### 3. Unenegamine (plus-menüü)
- [ ] Checkbox: `Unenegamine`
- [ ] Dropdown: `raskesti | mõnikord | harva`
- [ ] Info nupp: hügieeni nõuanded
- [ ] Scope: `universal`

#### 4. Painajad (plus-menüü)
- [ ] Checkbox: `Painajad`
- [ ] Dropdown: `iga öö | iganädalane | harva`
- [ ] Info nupp: levinumad liigid, vallandajad
- [ ] Scope: `universal`

#### 5. Paranormaalsed Uned (plus-menüü)
- [ ] Checkbox: `Paranormaalsed uned`
- [ ] Alamvalikud (multiple):
  - [ ] Kehaväline kogemus (OBE)
  - [ ] Prohvetlikud uned
  - [ ] Šamaani rännak
  - [ ] Astral projection
  - [ ] Lucid dreaming
  - [ ] Teised vaimsed uned
- [ ] Scope: `belief` ⚠️
- [ ] Info nupp: "Uskumus-põhine, mitte meditsiiniline"

#### JSON Struktuur (detailed)

```json
{
  "sleep": {
    "quality": {
      "value": "moderate",
      "scope": "universal",
      "meta": {
        "infoUrl": "/wiki/sleep-quality"
      }
    },
    "snoring": {
      "enabled": true,
      "disturbs": ["partner"],
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
      "types": ["out-of-body", "prophetic", "shamanic-journey"],
      "scope": "belief",
      "meta": {
        "disclaimer": "Belief-based, not diagnostic"
      }
    }
  }
}
```

---

### PRIVAATSUS JA NÕUSOLEK - Massiivne Laiendus

#### 1. Jagamise Tasemed

##### "Jumalale" (plus-menüü)
- [ ] Checkbox: `Jagamine jumalaga`
- [ ] Dropdown: valik usundit:
  - [ ] Kristlus
  - [ ] Islam
  - [ ] Hinduism
  - [ ] Budism
  - [ ] Maausuline (pagan)
  - [ ] Animism
  - [ ] Šamanism
  - [ ] New Age / Universaalne
  - [ ] Ateist (pole)
- [ ] Info nupp: multireligioosne info
- [ ] Scope: `belief`

##### "AI Arst" (plus-menüü)
- [ ] Checkbox: `AI konsultatsioon`
- [ ] Dropdown: teaduslik AI valik:
  - [ ] GPT-4 Medical
  - [ ] Med-PaLM 2
  - [ ] Claude Medical
  - [ ] Custom Ayurveda AI
  - [ ] Custom TCM AI
  - [ ] Custom Naturopathy AI
- [ ] Scope: `modality`

##### "AI Testimiseks" (plus-menüü)
- [ ] Checkbox: `AI testimine`
- [ ] Dropdown: 10 levinumat AI-d:
  - [ ] OpenAI (GPT-4, GPT-3.5)
  - [ ] Anthropic (Claude)
  - [ ] Google (Bard, Med-PaLM)
  - [ ] Meta (LLaMA)
  - [ ] Mistral
  - [ ] Cohere
  - [ ] AI21 Labs
  - [ ] HuggingFace (avalik)
  - [ ] Eesti lokal AI
  - [ ] Uurimis AI
- [ ] Hoiatus: "Andmed võivad sattuda treeningandmestikku"

##### Teised Tasemed
- [ ] `Politsei` (checkbox)
- [ ] `Sotsiaaltöötaja` (checkbox)
- [ ] `Arst` (checkbox)
- [ ] `Pereliikmele` (dropdown: vanem, õde-vend, partner)
- [ ] `Anonüümne uurija` (checkbox)
- [ ] `Avalikult (OSINT)` (checkbox + hoiatus)
- [ ] `Meditsiini testimiseks` (checkbox)

#### 2. Nõusolekud

##### "Palve" (plus-menüü)
- [ ] Checkbox: `Soovin palvet`
- [ ] Dropdown: regioonide palvetüübid:
  - **Kristlik:**
    - [ ] Katoliku palve
    - [ ] Õigeusu palve
    - [ ] Protestant palve
  - **Islam:**
    - [ ] Sunni dua
    - [ ] Shia dua
  - **Hindu:**
    - [ ] Mantra (üldine)
    - [ ] Gayatri mantra
  - **Budistlik:**
    - [ ] Metta (Loving-kindness)
  - **Maausuline:**
    - [ ] Eesti maausu palve
    - [ ] Slaavi maausu palve
    - [ ] Keltide palve
  - **Šamanistlik:**
    - [ ] Põhjamaade šamaani palve
    - [ ] Siber šamaani palve
  - **New Age:**
    - [ ] Universaalne palve
    - [ ] Valguse kutsumine
- [ ] Info nupp: mitmetasandiline menüü
- [ ] Scope: `belief`

##### "Rituaal" (plus-menüü)
- [ ] Checkbox: `Soovin rituaali`
- [ ] Dropdown: eri usundite rituaalid:
  - **Kristlik:**
    - [ ] Haigete salvamine
    - [ ] Õnnistamine
  - **Maausuline:**
    - [ ] Suitsu puhastus (sage)
    - [ ] Kristalli tervendus
  - **Rulerituaal:**
    - [ ] Eesti rulerituaal (põhjala traditsiooniline)
    - [ ] Vene rulerituaal
  - **Šamanistlik:**
    - [ ] Šamaani tervendamine
  - **Ayurveda:**
    - [ ] Panchakarma
  - **TCM:**
    - [ ] Akupunktuur
    - [ ] Moxibustion
- [ ] Scope: `belief | modality`

##### Teised Nõusolekud
- [ ] `Luban koju arsti kutsuda` (checkbox)
- [ ] `Luban koju new-age ravitsejat` (checkbox + hoiatus)

#### 3. Mida EI Jagatata

##### Sotsiaalne Olukord
- [ ] `Kodu olukord` (checkbox)
- [ ] `Kodu vägivald` (checkbox + hoiatus)
- [ ] `Sotsiaalne olukord` (checkbox)
- [ ] `Finants olukord` (checkbox)

##### Vaimne ja Psühholoogiline
- [ ] `Vaimne olukord` (checkbox)
- [ ] `Psühholoogiline olukord` (checkbox)
- [ ] `Puue` (checkbox)
- [ ] `Religioosne olukord` (checkbox)

##### Eluharjumused
- [ ] `Eluharjumused` (üldine, checkbox)

##### Entheogenid (plus-menüü)
- [ ] Checkbox: `Entheogenide kasutus`
- [ ] Alamvalikud (multiple):
  - [ ] Ayahuasca
  - [ ] Peyote
  - [ ] Psilotsübiin (seened)
  - [ ] Ibogaine
  - [ ] San Pedro
  - [ ] DMT
  - [ ] Salvia divinorum
  - [ ] Muud taime-põhised entheogenid
- [ ] Hoiatus: "Eesti seaduste kohaselt ebaseaduslik"
- [ ] Scope: `belief | context`

##### Sõltuvusained (plus-menüü)
- [ ] Checkbox: `Sõltuvusained`
- [ ] Alamvalikud (multiple + doosi info):
  - [ ] Alkohol (päevas/nädalas, doosi kogus)
  - [ ] Tubakas (sigaretid päevas, aastad)
  - [ ] Kanep (harrastus/meditsiiniline, sagedus)
  - [ ] CBD (mg päevas, põhjus)
  - [ ] Kava (sagedus, doosi)
  - [ ] Kratom (sagedus, doosi, punane/roheline/valge)
  - [ ] Opioidid (retseptiga/tänav, liik)
  - [ ] Stimulandid (amfetamiin, kokaiini, meditsiiniline ADHD)
  - [ ] Bensodiasepiinid (retseptiga/tänav, liik)
  - [ ] Nuusktohv (nikotiini mg, sagedus)
  - [ ] Vape (nikotiini mg)
  - [ ] Muud ained
- [ ] Hoiatus: "Jagage ainult usaldusväärse arstiga"

#### JSON Struktuur (detailed)

```json
{
  "privacy": {
    "sharingLevels": {
      "withGod": {
        "enabled": true,
        "religion": "Christianity",
        "scope": "belief"
      },
      "withAI_medical": {
        "enabled": true,
        "models": ["GPT-4-Medical", "Claude-Medical"],
        "scope": "modality"
      },
      "withAI_testing": {
        "enabled": false,
        "models": [],
        "warning": "Data may enter training set"
      },
      "withPolice": { "enabled": false },
      "withSocialWorker": { "enabled": true }
    },
    "consent": {
      "prayer": {
        "enabled": true,
        "types": ["Christian-Catholic", "Pagan-Estonian"],
        "scope": "belief"
      },
      "ritual": {
        "enabled": true,
        "types": ["Sage-cleansing", "Estonian-rune-ritual"],
        "scope": "belief"
      },
      "homeVisit_doctor": { "enabled": true },
      "homeVisit_healer": { "enabled": false }
    },
    "doNotShare": {
      "homeViolence": true,
      "financialSituation": true,
      "mentalSituation": false,
      "disability": true,
      "religiousSituation": true,
      "entheogenUse": {
        "enabled": true,
        "types": ["Psilocybin", "Ayahuasca"],
        "scope": "belief"
      },
      "substanceUse": {
        "alcohol": { "enabled": true, "amount": "moderate" },
        "cannabis": { "enabled": false },
        "kratom": { "enabled": true, "frequency": "weekly", "type": "green" },
        "scope": "context"
      }
    }
  }
}
```

---

## 🛠️ v1.8.0 - TÖÖRIISTAD + LIIKUMINE

**Prioriteet:** KESKMINE
**Kestus:** 2 nädalat

### TÖÖRIISTAD - Bioenergia ja Vaimsed Mõõtjad

#### Kiirvalik Nupp
- [ ] `< Lisa kõik 3` (lisab kolm järgnevat seadet korraga)

#### Konventsionaalsed Tööriistad
- [ ] Vererõhk mõõtja
- [ ] Pulsi mõõtja
- [ ] Veresuhkru mõõtja
- [ ] Termomeeter
- [ ] Oksümeetri

#### Bioenergia Mõõtjad (plus-menüü, Belief Scope)
- [ ] Checkbox: `Bioenergia mõõtjad`
- [ ] Alamvalikud:
  - [ ] Bioenergia mõõtjad (üldine)
  - [ ] Eluenergia mõõtjad
  - [ ] Aura mõõtjad (Vene ja Ida teadlased)
  - [ ] GDV (Gas Discharge Visualization)
  - [ ] Kirliani fotograafia
  - [ ] Pendel
  - [ ] Raadiestesia (biolokaator)
  - [ ] Hiina meditsiini pulsi hindamine
  - [ ] Nõiad kes mõõdavad
  - [ ] Uro-dev tugi (tundmatu seade)
  - [ ] Teorilised mõõtevahendid
- [ ] Scope: `belief`
- [ ] Info nupp: "Informatiivne, mitte diagnostiline. Teaduslik tunnustus puudub."

#### JSON Struktuur

```json
{
  "tools": {
    "conventional": {
      "bloodPressure": true,
      "pulseOximeter": true,
      "glucometer": false
    },
    "bioenergetic": {
      "enabled": true,
      "types": ["Aura-meter-Russian", "Pendulum", "TCM-pulse"],
      "scope": "belief",
      "meta": {
        "disclaimer": "Informative, not diagnostic"
      }
    }
  }
}
```

---

### LIIKUMISE VIISID - Vaimsed ja Mittefüüsilised

#### Füüsilised Liikumised (juba olemas)
- Kõndimine
- Jooksmine
- Rattasõit
- Ujumine

#### LISA: Vaimsed ja Mittefüüsilised (plus-menüü)
- [ ] Checkbox: `Vaimsed liikumised`
- [ ] Alamvalikud (multiple):
  - [ ] Laev (füüsiline, aga harvem)
  - [ ] Paat (füüsiline)
  - [ ] Lennuk (füüsiline)
  - [ ] Lonkimine (füüsiline, aga meditsiiniliselt oluline)
  - [ ] Remote viewing
  - [ ] Levitatsioon
  - [ ] Ajarändamine
  - [ ] Šamaani rännak
  - [ ] Tähtevälised rännud
  - [ ] Astraal-projektsiooni
  - [ ] Teised vaimsed liikumised
- [ ] Scope: vaimsed = `belief`, füüsilised = `universal`
- [ ] Info nupp: "Uskumus-põhine, mitte füüsiline"
- [ ] Järjesta: kõige vähem tõenäolised lõppu

#### JSON Struktuur

```json
{
  "movement": {
    "physical": {
      "walking": { "frequency": "daily", "scope": "universal" },
      "limping": { "enabled": true, "scope": "universal" }
    },
    "spiritual": {
      "enabled": true,
      "types": ["remote-viewing", "shamanic-journey", "astral-projection"],
      "scope": "belief",
      "meta": {
        "disclaimer": "Belief-based, not physical"
      }
    }
  }
}
```

---

### KAEBUSED - Täiendused

LISA:
- [ ] Tinnitus
- [ ] Peapööritus
- [ ] Kõhukeeramine
- [ ] Kõhukinnisus
- [ ] Kõhulahtisus
- [ ] Valguse talumatus

---

## 🍽️ v1.9.0 - TÖÖ + TOITUMINE

**Prioriteet:** KESKMINE
**Kestus:** 2 nädalat

### KOORMUSTALUVUS JA TÖÖ

Olemas:
- Istuv töö
- Kerge füüsiline töö
- Raske füüsiline töö
- Treening

LISA:
- [ ] Metsatöö
- [ ] Poe lett (seismine)
- [ ] Transpordi juht (buss, takso, veoauto)
- [ ] Söekaevandus
- [ ] Advokaat
- [ ] Poliitik
- [ ] Sõjaväelane
- [ ] Tehases töö
- [ ] Rutiine töö (linttöö)
- [ ] Pakendamine
- [ ] Pakkide tõstmine
- [ ] Jalgrataga kuller (Bolt, Post)

---

### TOITUMISPROFIIL

#### Söögirütm
- [ ] Liiguta `Söögirütm akendes` pluside alla
- [ ] Lisa täpsustused:
  - [ ] Paast (millised päevad)
  - [ ] "Söödan millal juhtub" (hobo eluviis)
  - [ ] Linnakiirtoit (sagedus)
  - [ ] Magusaltuvus (sagedus, liik)

#### 22 Rikka Toitu (plus-menüü)
- [ ] Checkbox: `Rikka toitu`
- [ ] Alamvalikud (multiple):
  - [ ] Rasvased lihad (seapekk, ribs)
  - [ ] Maks
  - [ ] Neerud
  - [ ] Juustud (eriti kõva juust)
  - [ ] Koor
  - [ ] Või
  - [ ] Šokolaad (tume/piima)
  - [ ] Pähklid (cashew, mandel, metsapähkel)
  - [ ] Seemneid (päevalill, kõrvits)
  - [ ] Avokaado
  - [ ] Olives
  - [ ] Suitsuliha
  - [ ] Rasvane kala (lõhe, heeringas)
  - [ ] Munad (palju)
  - [ ] Kreeka jogurt (täis rasva)
  - [ ] Rasvane piim
  - [ ] Bacooni
  - [ ] Vorst
  - [ ] Pizza (sagedus)
  - [ ] Burger (sagedus)
  - [ ] Praetud toit (sagedus)
  - [ ] Maiustused (küpsised, kook)
- [ ] Info nupp: "Miks see oluline - kardiovaskulaarne risk, maksafunktsioon"

#### Tava-toidud Lusikaga (plus-menüü)
- [ ] Checkbox: `Lusikaga toidud`
- [ ] Alamvalikud (multiple):
  - [ ] Putrud (õhtune, hommikune)
  - [ ] Supid (millised)
  - [ ] Hautised
  - [ ] Kiirtoit linnas (McDonald's, Hesburger jne)
- [ ] Info nupp: "Miks see oluline - söögi konsistents, toitumise kvaliteet"

---

### KOOSTOIME RISKID

Olemas:
- Greip
- Naistepuna
- Ginkgo
- Lagrits
- Küüslauk (>1 küüs)
- Ingver (>2g)
- Kurkum (>1g)

LISA:
- [ ] Šokolaad/kakao (kofeiin + teobromiin)
  - Antikoagulandi risk: väike
  - HTN (hüpertensioon) + kofeiin risk
- [ ] Alkohol
  - Hepatotoksilisus
  - Koostoimed (antikoagulant, benso, opioid)
- [ ] Kofeiin kogus
  - Kohv (tassid päevas)
  - Tee (tassid päevas)
  - Energiajoogid (liik, sagedus)
- [ ] Kanep/CBD
  - Antikoagulant koostoime (CYP450)
  - Sedatiivide koostoime
- [ ] Kava
  - Maksarisk (hepatotoksiline)
- [ ] Kratom
  - CYP450 koostoime
  - Opioid-like efekt
  - Hoiatus: sõltuvus, segatoit

---

### ANTIKOAGULANT - "Maakeli" Selgitus

Hetkel: `Antikoagulant?` (checkbox)

UUENDA:
- [ ] Lisa selgitus:
  **"Mis see on?"**
  "Verevedeldaja. Aitab ära hoida trombe (verehüübeid), kuid suurendab veritsuse riski."

- [ ] Lisa valikud (plus-menüü):
  - [ ] Varfariin (Marevan, Warfarin)
  - [ ] Apiksabaan (Eliquis)
  - [ ] Rivaroksabaan (Xarelto)
  - [ ] Dabigatraan (Pradaxa)
  - [ ] Edoksabaan (Lixiana)
  - [ ] Antitrombotsütaarsed (eraldi):
    - [ ] Aspiriin (Aspirin)
    - [ ] Klopidogreel (Plavix)

- [ ] Info nupp:
  - **Milliseid taimi vältida:**
    - Greip, naistepuna, ginkgo, küüslauk (>1 küüs), ingver (>2g)
  - **Mis asendada:**
    - Teised vitamiinid C allikad (apelsin, maasikas)
    - Teised vereringet parandavad (kurkum <1g, tee)

---

## 🏥 v2.0.0 - RESSURSID + DIAGNOSTIKA

**Prioriteet:** MADAL
**Kestus:** 3 nädalat

### MINIMAALNE DIAGNOSTIKA

- [ ] Plus-nuppude süsteem (kõik diagnostikad)
- [ ] Info asjad külge (Tab A: Wiki, Tab B: Avalikud allikad)

Näited:
- Vererõhk
- Pulss
- Veresuhkur
- Labor: CBC, lipidid, maksafunktsioon, neerufunktsioon, TSH

---

### RESSURSID JA EELARVE

#### Apteek (plus-menüü)
- [ ] Dropdown: `Apteek`
- [ ] Alamvalikud:
  - [ ] Eesti keti valik:
    - Apotheka
    - Benu
    - PõhjaApteek
    - Südameapteek
  - [ ] Piirkond: Tallinn, Tartu, Pärnu, Narva, maapiirkond
- [ ] Teine valik: `Loodustoodete pood`
- [ ] Kolmas valik: `Puudub`

#### Piirkond/Kihelkond Valik
- [ ] Dropdown: Eesti piirkonnad (maakond + kihelkond)
- [ ] Süsteem soovitab:
  - Kohalikke poode
  - Kohalikke ravitsejaid
  - Kohalikke apteegid
- [ ] Hoiatus meta-infos:
  - Kui piirkonnas on kahtlaseid teenusepakkujaid

---

### TAIMRAVI - Kultuurideülene

- [ ] Ayurveda taimed (ashwagandha, tulsi, triphala)
- [ ] TCM taimed (ginseng, astragalus, reishi)
- [ ] Põhjala taimed (kadakas, kanarbik, sõnajala)
- [ ] Slaavi taimed (kask, naat, kuldnupp)
- [ ] Maailma rahvamed (rooibos, mate, kava)
- [ ] Imetamine
  - Info: kus saab, kuidas
  - Scope: `modality | belief`

---

## 🔮 v3.0.0 - TÄIELIK PROMPT + SPECIALTY MODE

**Prioriteet:** MADAL
**Kestus:** 4 nädalat

- [ ] LISP otsustuspuu
- [ ] Specialty režiimid:
  - family-medicine
  - cardiology, hepatology, nephrology
  - Ayurveda, TCM, naturopathy
  - sports-medicine, rural-traditions
- [ ] Koostoime kontroll
- [ ] Piirkonna spetsiifika (Eesti apteegid, kohalikud ressursid)
- [ ] Kultuuri kontekst

---

## 📦 v4.0.0 - KASUTAJALIIDES LÕPLIK

**Prioriteet:** MADAL
**Kestus:** 4 nädalat

- [ ] "i"-nupu kaheastmeline modaal (Tab A/B)
- [ ] Plus-nuppude süsteem täielik
- [ ] Scope põhine filtreerimine (belief filter)
- [ ] Progressiivne avastamine
- [ ] Mobiili versioon

---

## 🎨 Graafiline Roadmap

```
v1.0.0 (POC) ────────────> v1.7.0 (UNI + PRIVAATSUS)
                            |
                            ├─> UNI (norskamine, painajad, paranormaalsed)
                            └─> PRIVAATSUS (jagamine jumalaga, AI, politsei)
                                    |
                                    v
                           v1.8.0 (TÖÖRIISTAD + LIIKUMINE)
                            |
                            ├─> TÖÖRIISTAD (bioenergia mõõtjad)
                            └─> LIIKUMINE (remote viewing, šamaani rännak)
                                    |
                                    v
                           v1.9.0 (TÖÖ + TOITUMINE)
                            |
                            ├─> TÖÖ (metsatöö, advokaat, linttöö)
                            └─> TOITUMINE (rikka toit, koostoimed)
                                    |
                                    v
                           v2.0.0 (RESSURSID + DIAGNOSTIKA)
                            |
                            ├─> RESSURSID (piirkond, apteegid)
                            └─> DIAGNOSTIKA (minimaalne)
                                    |
                                    v
                           v3.0.0 (TÄIELIK PROMPT)
                            |
                            └─> SPECIALTY MODE (LISP otsustuspuu)
                                    |
                                    v
                           v4.0.0 (UI LÕPLIK)
```

---

## ✅ Millal Valmis?

| Versioon | Kestus | Kumul. | Staatus |
|----------|--------|--------|---------|
| v1.0.0 | 2 nädalat | 2 nädalat | PLANEERIMISEL |
| v1.7.0 | 3 nädalat | 5 nädalat | PLANEERIMISEL |
| v1.8.0 | 2 nädalat | 7 nädalat | PLANEERIMISEL |
| v1.9.0 | 2 nädalat | 9 nädalat | PLANEERIMISEL |
| v2.0.0 | 3 nädalat | 12 nädalat | PLANEERIMISEL |
| v3.0.0 | 4 nädalat | 16 nädalat | TULEVIKUS |
| v4.0.0 | 4 nädalat | 20 nädalat | TULEVIKUS |

**Esimene kasutatav versioon:** v1.7.0 (5 nädalat)
**Täielik versioon:** v4.0.0 (20 nädalat ≈ 5 kuud)
