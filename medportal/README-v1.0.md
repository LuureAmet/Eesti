# Meditsiiniportaal

Holistiline terviseprofiili koostamise portaal. Võimaldab patsientidel koguda põhjalikku terviseinfot ja genereerida väljundeid (TXT, PDF, JSON) arstidele ja AI konsultatsioonideks.

## 📋 Ülevaade

Meditsiiniportaal on veebipõhine lahendus, mis võimaldab:

- **Koguda** põhjalikku terviseinfot (meditsiiniline ajalugu, sümptomid, ravimid, taimravi, toitumine, elustiil)
- **Genereerida** struktureeritud väljundeid (TXT, PDF, JSON)
- **Eksportida** AI prompte (Claude, ChatGPT jne)
- **Jälgida** päevaseid mõõtmisi ja sümptomeid

## 🚀 Funktsioonid

### 3 Vormi Tüüpi

#### 1. **Kiirprofiil** (5 min | 15 küsimust)
- Põhiandmed (vanus, sugu, kaal, pikkus)
- Diagnoos ja kaebused
- Praegused ravimid
- Ravi eelistused
- Eesmärgid

**Kasuta:** Kiire AI konsultatsiooniks või esmainfo kogumiseks

#### 2. **Täisprofiil** (30 min | 18 sektsiooni)
Põhjalik vorm kõigi aspektidega:
- 0. Privaatsus ja nõusolek
- 1. Profiil ja elurütm
- 2. Kaebused ja sümptomid (skaaladega 0-3)
- 3. Tööriistad ja kodused mõõtmised
- 4. Ajalugu (viimased 5 aastat)
- 5. Ravimid ja lisandid (dünaamiline tabel)
- 6. Taimravi (viirpuu, arjuna, hibiscus jne)
- 7. Toitumine (menüü, piirangud)
- 8. Kehalised praktikad (hingamine, liikumine)
- 9. Meele- ja rütmipraktikad (meditatsioon)
- 10. Ideoloogia ja piirjooned
- 11. Ressursid ja eelarve
- 12. Riskiliinid ("punased lipud")
- 13. Minimaalne diagnostika
- 14. Otsustuspuu
- 15. Nädala/kuu plaan
- 16. Menüü-eelistused
- 17. Paketivalikud
- 18. Kokkuvõte

**Kasuta:** Põhjalikuks terviseprofiiliks, mis katab kõik aspektid

#### 3. **Päevalogi** (2 min päevas)
- Kuupäev ja kellaaeg
- Mõõtmised (kaal, BP, pulss)
- Sümptomid (0-3 skaalal)
- Rutiinid tehtud (hingamine, jalutus, ravimid)
- Märkused

**Kasuta:** Pikaajaliseks jälgimiseks. Ekspordi CSV-na arstile

## 🛠️ Tehnoloogia

- **HTML5** - Vormid
- **CSS3** - Responsive disain
- **JavaScript** (Vanilla) - Dünaamilised väljad, validatsioon, export
- **localStorage** - Andmete salvestus (draft'id, päevalogid)
- Ei vaja serverit - töötab otse brauseris!

## 📥 Paigaldamine

### Variant 1: Otse brauserist
```bash
# Lae failid alla
git clone https://github.com/LuureAmet/Eesti.git
cd Eesti/medportal

# Ava brauseris
firefox index.html
# VÕI
google-chrome index.html
```

### Variant 2: Lokaalne server (valikuline)
```bash
# Python serveriga
python3 -m http.server 8000

# Ava: http://localhost:8000
```

### Variant 3: Veebiserveris (Apache/Nginx)
```bash
# Kopeeri failid
cp -r medportal/ /var/www/html/medportal/

# Ava: http://sinu-domeen.ee/medportal/
```

## 📖 Kasutamine

### 1. Kiirprofiil
1. Ava `index.html`
2. Vali "Kiirprofiil"
3. Täida 15 küsimust
4. Genereeri väljund:
   - TXT - Lihtne tekstifail
   - PDF - Printitav (tuleb täiendus)
   - JSON - Andmebaasile
   - AI prompt - Kopeeri ja kleebi ChatGPT/Claude'i

### 2. Täisprofiil
1. Ava "Täisprofiil"
2. Täida 18 sektsiooni (võid salvestada draft'e ja jätkata hiljem!)
3. Progress bar näitab edenemist
4. Genereeri väljundid

### 3. Päevalogi
1. Ava "Päevalogi"
2. Täida iga päev (2 min)
3. Andmed salvestatakse automaatselt
4. Vaata ajalugu
5. Ekspordi CSV (arstile)

## 💾 Andmete salvestus

### localStorage
- **Draft'id** - Vormid salvestatakse automaatselt
- **Päevalogid** - Jäävad alles brauseris
- **Pole vaja serverit** - Kõik töötab offline'is

### Andmete eksport
- **TXT** - Struktureeritud tekstifail
- **JSON** - Andmebaasile või edasiseks töötluseks
- **CSV** - Päevalogid (Excelis avatav)
- **AI prompt** - Valmis tekst konsultatsiooniks

## 🔒 Privaatsus

- Andmeid EI saadeta kuhugi (kõik töötab brauseris)
- localStorage on lokaalne (ainult sinu arvutis)
- Vormis saad valida jagamise taseme
- Eksportitud failid jäävad SINU kontrolli alla

## 🎨 Disain

- **Responsive** - Töötab arvutis, tahvelarvutis, telefonis
- **Professionaalne** - Puhas, lihtne, intuitiivne
- **Ligipääsetav** - Suur tekst, selged labelid
- **Kiire** - Ei lae väliseid teeke (v.a tulevikus jsPDF)

## 📁 Failide struktuur

```
medportal/
├── index.html                  # Pealehekülg
├── forms/
│   ├── quick-profile.html      # Kiirprofiil
│   ├── full-profile.html       # Täisprofiil (18 sektsiooni)
│   └── daily-log.html          # Päevalogi
├── css/
│   ├── style.css               # Põhistiilid
│   └── forms.css               # Vormide stiilid
├── js/
│   ├── form-handler.js         # Üldised funktsioonid
│   ├── quick-profile.js        # Kiirprofiili loogika
│   ├── full-profile.js         # Täisprofiili loogika
│   └── daily-log.js            # Päevalogi loogika
├── exports/                    # Genereeritud failid (sinu masinas)
├── data/                       # Tulevikus: ravimite andmebaas jne
└── README.md                   # See fail
```

## 🚧 Arenduses

Vaata [ROADMAP.md](ROADMAP.md) tuleviku plaanide kohta.

**Hetkel töös:**
- jsPDF integratsioon (päris PDF'id)
- Ravimite koostoime andmebaas
- Kasutajate autentimine (valikuline)
- AI integratsioon (automaatsed soovitused)

## 🤝 Kaasa löömine

Kui leiad vigu või sul on ideid:
1. Loo issue GitHubis
2. Tee pull request
3. Kirjuta e-mail

## 📜 Litsents

MIT License - Vaba kasutamiseks ja muutmiseks

## 📞 Kontakt

- **GitHub:** https://github.com/LuureAmet/Eesti
- **Projekt:** Meditsiiniportaal v1.0
- **Versioon:** 1.0.0 (November 2025)

## ⚠️ Meditsiiniline vastutus

**TÄHTIS:** See portaal on info kogumise tööriist.

- EI asenda arsti konsultatsiooni
- EI anna meditsiinilist nõu
- EI diagnoseeri haigusi
- Kasuta alati oma arstiga konsulteerides

Kui sul on tõsised sümptomid (vt "punased lipud"), pöördu KOHE arsti poole!

---

© 2025 Meditsiiniportaal | Holistiline tervisehaldus
