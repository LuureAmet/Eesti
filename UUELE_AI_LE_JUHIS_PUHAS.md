# JUHIS UUELE AI-LE - ALUSTA SIIT (PUHAS TEKST)

Kuupaev: 11.11.2025, 23:50
Projekt: Meigo Medical Medisiiniportaal
Praegune versioon: v1.6.0
Branch: claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy

---

## ESMALT: KONTROLLI BRANCH

KRIITILISELT TAHTIS!

```
git branch --show-current
```

Peab olema: claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy

Kui ei ole:
```
git checkout claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
```

Sessiooni ID peab klappima: 011CV2fuMh1DnJY8Zugym2oy

Muidu push ebaonnestub 403 erroriga!

---

## MIS ON VALMIS? (v1.6.0 - 11.11.2025, 22:30)

### POHIFUNKTSIOONID:
- 3 vormi tuupi: Kiirprofiil (5 min), Taisprofiil (30 min, 18 sektsiooni), Paevalogi (2 min)
- TXT/JSON/CSV/AI prompt eksport
- localStorage salvestus (draft'ide salvestus)
- Responsive disain (mobile + desktop)
- Validatsioon
- Progress tracking

### PLUS-NUPPUDE SUSTEEM (v1.4.0 kuni v1.6.0):

KOKKU UMBES 50+ PLUS-NUPPU:

1. Taimed (viirpuu, arjuna, hibiskus, lounamaa kuldvits, boswellia, ginkgo biloba, hawthorn, celery seed, dandelion, turmeric)
2. Sundmused (COVID, suda operatsioon, trauma, elukoha vahetus, too vahetus)
3. Allergiad (oietolm, kodutolm, korrelised, hallitus, lemmikloomad)
4. Kehalised praktikad (jooga, Tai Chi, hingamine 4-7-8, Wim Hof, Qi Gong)
5. Fuusiline aktiivsus (jalutamine, jooksmine, ujumine, rattasoit, jousaal, jooga, aeroobika, tants)
6. Koormustaluvus (metsatoo, oovalevur, istutoo, ehitustoo, hooldus, transport)
7. Eluviis/transport (auto, uhistransport, rattaga toole, jalutades toole, tooreisid, rahvusvaheline reis)
8. Tee liigid (roheline, must, hibiskus, oolong, valge, matcha, ravimtaimede) - KAHEASTMELINE SUSTEEM
9. Toitumise piirangud (gluteenivaba, piimatoodete valtimine, liha, madal suhkur, madal sool)
10. Ligipaas ressursidele (loodustoodete pood, iHerb, TCM/Ayurveda praktik, retseptiravimid, internet)
11. Perekondlik risk (sudamehaigused, insult, diabeet, vahk)
12. Elupaik (v1.6.0 - kortermajas, maaelu, linn, ootoo)
13. Liikumine (v1.6.0 - kondimine, jalgratas, ujumine, matkamine, rulluisutamine)
14. Kaebused (v1.6.0 - peavalu, liigesevalu, seljavalu, iiveldus, migreen)
15. Naiste kaebused (v1.6.0 - menstruaalivalud, PMS, kuumad hood)
16. Vann/Saun (v1.6.0 - Epsom vann, saun, kulm duss, jalavannikud)
17. Muusika (v1.6.0 - klassikaline, loodushelid, meditatsioon, binauraalsed)

### INFO SUSTEEM (v1.4.0+):
- MED_INFO_DB - 50+ elementi meditsiinilist infot
- Info ikoonid (i) - hover popup + klikk avab modali
- Inline 'Lisa info' valjad - tapsustusteks

### PROFIILIFILTRI SUSTEEM (v1.5.0):
- Rasedus -> aktiveerib 'naine' ja naitab ohutusnouandeid
- Vanus -> meditsiiniliselt oiged kategooriad (vastsumdinu -> oldest-old)
- Sugu -> mees / naine / muu
- Meditsiinilised riskid -> AF+antikoagulant, eGFR, Child-Pugh
- Reaalajas hoiatused vastavalt profiilile
- Sticky header profiilikokkuvottega

---

## MIS ON PLAANIS? (v1.7.0 kuni v2.0.0)

### v1.7.0 - JARJMINE (UNI + PRIVAATSUS) - SOOVITATUD

PRIORITEET: KORGE

1. UNI ERALDI SEKTSIOON + PLUSID:

   a) Norskamine (plus-nupud):
      - Valikud: ei hairi / hairib elukaaslast / hairib ennast
      - Lisakiruks: "oleneb joomaastmest"

   b) Unenegamine (plus-nupud):
      - Dropdown: raskesti / monikord / harva

   c) Painajad (plus-nupud):
      - Dropdown: iga oo / iganadalane / harva
      - Lisa info: levinumad liigid, vallandajad

   d) Paranormaalsed uned (plus-nupud):
      - Multiple valikud: OBE (kehaveline), prohvetlikud, samaani rannak, astral projection, lucid dreaming
      - Scope: belief (oluline markida!)

2. PRIVAATSUS JA NOUSOLEK - MASSIIVNE LAIENDUS:

   JAGAMISE TASE (plus-nupud):

   a) "Jumalale" (plus-nupp):
      - Lisa info nupu alla: selgitus usu-kontekstis
      - Multireligioosne info (10 usundit: kristlus, islam, hinduism, budism, maausuline, animism, samanism, new age, ateist)

   b) "AI arst" (plus-nupp):
      - Dropdown: 6 AI-d (GPT-4 Medical, Med-PaLM, Claude Medical, Ayurveda AI, TCM AI, Naturopathy AI)

   c) "AI testimiseks" (plus-nupp):
      - Dropdown: 10 AI-d (OpenAI, Anthropic, Google, Meta, Mistral, Cohere, AI21, HuggingFace, Eesti AI, Uurimis AI)
      - Hoiatus: "Andmed voivad sattuda treeningandmestikku"

   d) Teised valikud:
      - Arst
      - Pere liige
      - Anon uurija
      - Avalikult (OSINT)
      - Politsei
      - Sotsiaaltoootaja
      - Med-testmiseks

   NOUSOLEK (plus-nupud):

   a) "Palve" (plus-nupp):
      - Avaneb kataloog: 11 palvetuubi (katoliku, oigeusu, protestant, sunni dua, shia dua, mantra, gayatri, metta, eesti maausu, slaavi maausu, keltide, pohjamaade samaani, siber samaani, new age)

   b) "Rituaal" (plus-nupp):
      - Avaneb kataloog: 9 rituaali (haigete salvamine, onnistamine, sage puhastus, kristalli tervendus, eesti rulerituaal, vene rulerituaal, samaani tervendamine, panchakarma, akupunktuur, moxibustion)

   c) "Luban koju arsti kutsuda" (plus-nupp)

   d) "Luban koju new-age ravitsejat kutsuda" (plus-nupp)

   MILLIST ANDMESTIKKU EI JAGATA (plus-nupud):

   - Kodu olukord
   - Kodu vagivald
   - Sotsiaal olukord
   - Finants olukord
   - Vaimne olukord
   - Psuhhioloogiline olukord
   - Puue
   - Religioosne olukord
   - Elu harjumused
   - Entheogenide kasutus (Ayahuasca, Peyote, Psilotsibiin, Ibogaine, San Pedro, DMT, Salvia, muud)
      - Hoiatus: "Eesti seaduste kohaselt ebaseaduslik"
   - Soltuvusained (alkohol, tubakas, nikotiin, kanep, CBD, kava, kratom, opioidid, stimulandid, bensodiasepiinid, nuusktohv, vape)
      - Hoiatus: "Jagage ainult usaldusvaarse arstiga"
      - Iga aine juurde: doosi info

### v1.8.0 - TOORIISTAD + LIIKUMINE (plaanis 1-2 kuud)

PRIORITEET: KESKMINE

1. TOORIISTAD (bioenergia/vaimsed):

   PLUS-NUPUD:
   - Bioenergia mootjad
   - Eluenergia mootjad
   - Aura mootjad (Vene ja Ida teadlased)
   - GDV (Gas Discharge Visualization)
   - Kirliani kaamera
   - Pendel
   - Raadiestesia
   - TCM pulsi hindamine
   - Noiad kes moodavad
   - Uro-dev tugi
   - Teorilised mootevahendid

   Scope: belief

   Info nupu alla: "Informatiivne, mitte diagnostiline"

2. LIIKUMISE VIISID (vaimsed/mittefyysilised):

   PLUS-NUPUD:
   - Laev
   - Paat
   - Lennuk
   - Remote viewing
   - Levitatsioon
   - Ajarandamine
   - Lonkimine
   - Samaani rannak
   - Tahtevalisised rannakud
   - Astraal-projektsiooni
   - Teised vaimsed/mittefyysilised liikumised

   Scope: belief

   Pane koige vahem toenaolisemad lopu

3. KAEBUSED (liasvalikud):

   PLUS-NUPUD:
   - Tinnitus
   - Peapooritus
   - Kohukeeramine
   - Kohukinnisus
   - Kohulahtisus
   - Valguse talumatus

### v1.9.0 - TOO + TOITUMINE (plaanis 2-3 kuud)

PRIORITEET: KESKMINE

1. KOORMUSTALUVUS JA TOO (lisavalikud):

   PLUS-NUPUD:
   - Metsatoo
   - Poe lett
   - Transpordi juht
   - Soekaevandus
   - Advokaat
   - Poliitik
   - Sojavae lane
   - Tehases too
   - Rutiine too (linttoo)
   - Pakendamine
   - Pakkide tostmine
   - Jalgrattaga kuller (Bolt, Post jne)

2. TOITUMISPROFIIL (lisavalikud):

   "Soogirytm akendes" -> liiguta plusside alla

   PLUS-NUPUD:
   - Paast
   - "Soodan millal juhtub" (hobo eluviis)
   - Linnakiirtoit
   - Magusaltuvus

3. TOITUMINE (22 rikka toitu):

   PLUS-NUPUD:
   - Rasvased lihad
   - Maks
   - Juustud
   - Koor
   - Sokolaad
   - Pahklid
   - jne (kokku 22)

   TAVA-TOIDUD LUSIKAGA:
   - Putrud
   - Supid
   - Hautised
   - Kiirtoit linnas

   Info nupp: miks see oluline

4. TAIMRAVI (kultuurideulised):

   PLUS-NUPUD:
   - Ayurveda taimed
   - TCM taimed
   - Pohjala taimed
   - Slaavi taimed
   - Maailma rahvaste taimed

   PLUS: Imetamine
   - Info nupp: kus saab, kuidas
   - Scope: modality | belief

5. KOOSTOIME RISKID (lisavalikud):

   PLUS-NUPUD (olemas juba: greip, naistepuna, ginkgo, lagrits, kuuslauk>1, ingver>2g, kurkum>1g):

   LISA:
   - Sokolaad/kakao (kofeiin + teobromiin; antikoagulandi/HTN puhul)
   - Alkohol (hepato/koostoimed)
   - Kofeiin kogus (kohv/tee/energiajoogid)
   - Kanep/CBD (antikoagulandi + sedatiivid)
   - Kava (maksarisk)
   - Kratom (mitu koostoimeriski + hoiatus)

6. ANTIKOAGULANT - "MAAKELI" SELGITUS:

   Hetkel: "Antikoagulant?" checkbox

   UUENDA:
   - Lisa selgitus: "Mis see on? Verevedeldaja. Aitab ara hoida trombe, kuid suurendab veritsuse riski."
   - Lisa valikud (plus-menu):
     - Varfariin
     - DOAC-id: apiksabaan, rivaroksabaan, dabigatraan, edoksabaan
     - Antitrombotsutaarsed (eraldi): aspiriin, klopidogreel
   - Info nupp: milliseid taimi valtida, mis asendada

7. TOITUMISE PIIRANGUD (uued pohjused):

   Olemas: meditsiiniline, talumatus, eelistus, usuline, eetiline

   LISA:
   - "Naine ei luba"
   - "Elukaaslane ei luba"
   - "Tunnetus"
   - "Paranoia" (voi neutraalsemalt: "hirm tundmatu ees")

### v2.0.0 - RESSURSID + DIAGNOSTIKA (plaanis 3-6 kuud)

PRIORITEET: MADAL

1. RESSURSID JA EELARVE:

   Koik plusside alla:

   - "Puudub" valik
   - Apteek (+ alammenuu: Eesti keti valik, piirkond)
     - Esimene valik: Apteek (eri apteegid, piirkonnad)
     - Teine valik: Loodustoodete pood
     - Kolmas valik: Puudub
   - Piirkond/kihelkond valik
     - Susteem soovitab kohalikke poode ja ravitsejaid
     - Hoiatus meta-infos kui piirkonnas on kahtlaseid teenusepakkujaid

2. MINIMAALNE DIAGNOSTIKA:

   Plus-nuppude susteem:
   - Info asjad kulge (Tab A/B)

3. IDEOLOOGIA JA PIIRJOONED:

   "Mida kindlasti EI soovi" -> eraldi kast (plusside nimekiri + luhiselgitus)

4. VANN/SAUN:

   - Liiguta Kehaliste praktikate esimeseks
   - Lisa Ravidussid plusidesse

---

## TEHNILINE TEAVE

### JSON NORMALISEERIMINE:

Kaks JSON-i -> uks "canonical" versioon:

```
function toCanonical(input) {
  const root = input.profileData ?? input.data ?? {};
  const meta = input.metadata ?? {generated: null, version: input.version ?? null, source: "unknown"};
  return {
    meta,
    profile: {
      ...root
    },
    medicationSummary: root.medicationSummary ?? input.medicationSummary ?? []
  };
}
```

### SCOPE TAKSONOOMIA:

Iga vali peab olema markeeritud scope atribuudiga:

- universal: privaatsus, punased lipud, kodumootmised (BP/HR/kaal/steps), uni, stress 0-3
- demographic: rasedus/imetamine, vanus, sugu-spetsiifiline
- organ: AF+antikoagulant, neer (eGFR), maks (Child-Pugh), kardiometaboolsed lipud
- context: elupaik, tooajakava, transport, aktiivsuse tase
- modality: taimed, praktikad (hingamine/qigong/zazen), vann/saun/hudro, muusika/heli
- belief: usulised/vaimsed/paranormaalsed aspektid (paranormaalsed uned, vaimsed liikumised, bioenergia mootjad, rituaalid, jumalale jagamine)

### AI PROMPTID - 2 TUUPI:

1. LIHTNE LUHI-PROMPT:
   - Kiire konsult
   - Ainult riski- ja profiilifiltri tuum
   - 3 prioriteetset ohutussoovitust
   - 3 sobivat taimset/eluviisi sekkumist
   - Mida moota kodus jargmise 7 paeva jooksul

2. TAIELIK PROMPT:
   - Pohjalik konsultatsioon
   - Specialty-mode (family-medicine, cardiology, hepatology, nephrology, Ayurveda, TCM, naturopathy, sports, rural-traditions)
   - LISP-stiilis otsustuspuu
   - I-nupu loogika (Tab A: Sise-Wiki, Tab B: Avalikud allikad)
   - Cross-check boxes (2 teist specialityd)

### SPECIALTY REZIIMID:

Vorm saab end "re-struktureerida" specialtyMode jargi:

- family-medicine: rouasetus punastel lippudel, kodumootmistel, ravim- ja taimekoostoimetel
- cardiology: sool, vedelik, pulss/BP trendid; antikoagulant x taimed detailsem filter
- hepatology: Child-Pugh kohandused, valtida hepatotoksilisi urte; annuste "start low"
- nephrology: eGFR pohised elektroluudi ja mineraalide piirid; vee/salt balanss
- Ayurveda | TCM | naturopathy | rural-traditions: lubatud, kuid automaatne ristsoel organ- ja antikoagulandi varavatest

UHISREEGEL: kui specialty soovitab midagi, mis on gate'iga konfliktis, siis kasuta "ALT:" alternatiivi

### "I"-NUPU KAHEASTMELINE MODAAL:

Tab A: "Sise-Wiki"
- Luhikirjeldus (<=120 soma)
- Kliiniline kasutus: millal kasuta / valdi
- Dosaator/aknad (kui rakendub)
- Interaktsioonid/ohud
- Kohandused (rasedus, eakas, neer/maks)
- Link "taisartiklile" sisewikis

Tab B: "Allikad"
- 3-5 avalikku juhist voi ulevaadet (DOI-ga, keelesildid: EST/ENG/RUS/POL/HEB/CHI)
- Riskiklassi luhikoond (nt GRADE vms)
- Ajaline mark (aasta)
- Markus "tovendite kvaliteedi" kohta

Vali-skeem "i-infole":
```
{
  id,
  term,
  short_desc,
  clinical_use,
  dosing,
  interactions,
  adjustments: {pregnancy, elderly, renal, hepatic},
  sources: [{title, org, year, url, lang}],
  grade
}
```

---

## FAILIDE STRUKTUUR

```
/home/user/Eesti/                                    ROOT (GitHub: LuureAmet/Eesti)

medportal/                                          MEIE TOO! (v1.6.0)
├── index.html                                      Landing page
├── forms/
│   ├── quick-profile.html                          Kiirprofiil (5 min)
│   ├── full-profile.html                           Taisprofiil (30 min, 18 sektsiooni)
│   └── daily-log.html                              Paevalogi (2 min)
├── css/
│   ├── style.css                                   Pohistiilid
│   └── forms.css                                   Vormide stiilid
├── js/
│   ├── form-handler.js                             Uldised funktsioonid
│   ├── full-profile.js                             Taisprofiili loogika + quickAdd funktsioonid
│   ├── info-system.js                              (1863 RIDA! MED_INFO_DB 50+ kirjet)
│   ├── profile-filter.js                           (294 RIDA! Profiilifiltri susteem)
│   ├── quick-profile.js                            Kiirprofiili eksport
│   ├── daily-log.js                                Paevalogi CSV
│   ├── tooltips.js                                 Tooltip susteem
│   ├── custom-fields.js                            Dunaamilised lisavaljad
│   ├── tags-input.js                               Mitmikvalikud (komaga/Enteriga)
│   └── docs-and-links.js                           VERSION badge + README/ROADMAP
├── config/
│   └── site-config.js                              VERSIOON, CHANGELOG, LINGID
├── docs/
│   ├── ARCHITECTURE.md                             (420 RIDA! Tehniline arhitektuur)
│   ├── DEVELOPMENT.md                              (696 RIDA! Arendajale juhised)
│   └── FILE-GUIDE.md                               (858 RIDA! Failide selgitused)
├── data/
│   └── tooltips.json                               Abitekstid valjadele
├── archive/                                        ARHIIV (vana ajalugu)
│   ├── v1.0.0/
│   │   ├── README_v1.0.0.md
│   │   └── ROADMAP_v1.0.0.md
│   ├── v1.2.0/
│   │   ├── README_v1.2.0.md
│   │   └── ROADMAP_v1.2.0.md
│   └── ...
├── README.md                                        LOE ESMALT! (praegune v1.6.0)
├── ROADMAP.md                                       ARENDUSPLAAN (v1.6 -> v2.0)
├── README-v1.0.md                                   Vana README (arhiiv)
└── ROADMAP-v1.0.md                                  Vana ROADMAP (arhiiv)

Eesti/                                              TEINE PROJEKT (Codex jms) - ARA PUUTU!
└── Medical/                                        Vanad teksti failid (arhiiv)

Medical/                                             TUHI (.gitkeep) - ARA PUUTU!

juhiseid-teiselt-ailt-1.6.edasiseks.txt              GPT-4 ANALUUS (1218 rida! v1.7-v2.0 plaanid)
UUELE_AI_LE_JUHIS_PUHAS.md                           SEE FAIL! (LOE!)
NEW_AI_GUIDE_CLEAN.md                                LUHIKE JUHIS
START_HERE_UPDATED.md                                LUHIKE JUHIS (AEGUNUD)
NEW_AI_START_HERE.md                                 AEGUNUD (vale branch - ARA KASUTA!)
README.md                                            VANA (ainult "# Eesti" - ARA PUUTU!)
```

---

## GIT WORKFLOW

1. Kontrolli branch:
```
git branch --show-current
```
(Peab olema: claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy)

2. Pull viimane versioon:
```
git pull origin claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
```

3. Tee muudatused medportal/ kaustas

4. Commit:
```
git add medportal/
git commit -m "Kirjeldus: mida muutsid"
```

5. Push:
```
git push -u origin claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy
```

TAHTIS: Sessiooni ID PEAB klappima, muidu push ebaonnestub 403 erroriga!

---

## ARHIVEERIMISE JUHISED

OLULINE: ARA KUNAGI KUSTUTA!

ALATI arhiveeri, EI KUNAGI kustuta!

Kuidas arhiveerida dokumente:

```
mkdir -p medportal/archive/v1.X.X/
cp medportal/README.md medportal/archive/v1.X.X/README_v1.X.X.md
cp medportal/ROADMAP.md medportal/archive/v1.X.X/ROADMAP_v1.X.X.md
```

SEEJAREL uuenda pohifaile
Ara kunagi kustuta vanu versioone!

Git commit'id on AUTOMAATNE arhiiv:
```
git log --oneline
git show <commit-hash>
git checkout <commit-hash> -- <file>
```

---

## VERSIOONIDE HALDAMINE

Kasutame Semantic Versioning (SemVer):

MAJOR.MINOR.PATCH
  1  .  6  .  0

MAJOR (1.x.x): Suured muudatused, breaking changes
MINOR (x.6.x): Uued funktsioonid, plus-nupud, sektsioonid
PATCH (x.x.0): Bugfixid, vaikesed parandused

Kus versiooni uuendada:

ESMALT: medportal/config/site-config.js

```
const SITE_CONFIG = {
    version: "1.7.0",
    date: "15.11.2025",
    buildTime: "2025-11-15 10:00",
    changelog: {
        "1.7.0": {
            date: "15.11.2025",
            changes: [
                "Kirjeldus 1",
                "Kirjeldus 2"
            ]
        }
    }
}
```

SEEJAREL: Uuenda README.md ja ROADMAP.md

---

## KIIRKONTROLL

Kui sa ei ole kindel, KUS sa oled:

1. Kontrolli branch:
```
git branch --show-current
```
(Peab olema: claude/medial-project-setup-011CV2fuMh1DnJY8Zugym2oy)

2. Kontrolli versioon:
```
cat medportal/config/site-config.js | grep "version:"
```
(Peab olema: version: "1.6.0")

3. Kontrolli, et oled oiges kaustas:
```
ls medportal/
```
(Peab naitama: index.html, forms/, css/, js/, config/, docs/, archive/)

4. Loe README:
```
cat medportal/README.md | head -10
```
(Peab algama: "# Meigo Medical Medisiiniportaal")

Kui miski ei klapi -> KUSI KASUTAJALT!

---

## TAHTIS MEELDETULETUS

1. ARA KUNAGI KUSTUTA - alati arhiveeri!
2. ARA TOO VALES BRANCHIS - kontrolli sessiooni ID-d!
3. ARA PUUTU TEISI PROJEKTE (Eesti/, Medical/)
4. LOE ESMALT - README.md, ROADMAP.md, ARCHITECTURE.md
5. KUSI, KUI POLE KINDEL - parem kusida kui midagi katki teha!
6. ARA KASUTA EMOJISID - need on keelatud! (pentram/visnurgad/tahed)

---

HEAD TOOD!

P.S. Kui sa oled uus AI ja alustad sessiooni:
1. Loe see fail TAIELIKULT
2. Loe juhiseid-teiselt-ailt-1.6.edasiseks.txt (1218 rida! MASSIIVNE!)
3. Kontrolli branch (git branch --show-current)
4. Loe medportal/README.md
5. Loe medportal/ROADMAP.md
6. Kusi kasutajalt, mida teha

ARA MINE JUHUSLIKULT FAILE MUUTMA - ASK FIRST!

---

Meigo Medical Medisiiniportaal | Juhis uuele AI-le v2.0 (PUHAS - ILMA EMOJIDETA)
Kuupaev: 11.11.2025, 23:50
