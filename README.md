# Overlay Playground

Katseprojekt, mis demonstreerib, kuidas ehitada iframe-keskne "klaaskihi" töölaud koos filtrite,
maskide ja kohalike märkmetega. Selle abil saab testida erinevaid veebilehti, lisades nendele
oma kihi ilma, et peaks sihtlehe DOM-ile otsest juurdepääsu omama.

## Kiirstart

```bash
npm install
npm run dev
```

Server käivitub vaikimisi aadressil [http://localhost:3000](http://localhost:3000). Avanenud
vaates saad valida vasakust menüüst eelkonfigureeritud sihtlehe, mida kuvatakse läbi lokaalse
proxy. Proxy eemaldab `X-Frame-Options` ja `Content-Security-Policy` päised, et iframe saaks
lehe kuvada. Kõik päised/skriptid ei pruugi siiski toimida (nt sisselogimisnõuded, cookie
poliitikad), kuid katsetamiseks on sellest piisavalt.

## Olemasolevad tööriistad

- **Filtrid** – halltoon, invert, kontrast, sepia ja hägustus koos heleduse liuguriga.
- **Maskikiht** – "uBlock style" piirkonnad: aktiveeri peitmisrežiim ja lohista maske, mis
  katavad iframe'i osi. Maskid on eemaldatavad ja nendega saab visuaalselt segavaid elemente
  varjata isegi juhul, kui tegelikku DOM-i muuta ei saa.
- **Märkmed** – kopeeri tekst iframe'ist, kleebi märkmetesse ja salvesta lokaalselt
  `localStorage` abil. Üksikuid märkmeid saab eemaldada või kogu loendi tühjendada.
- **Kiirtingimused** – nupp lehe värskendamiseks ning link sihtlehe avamiseks eraldi aknas.

## Konfigureeritud sihtlehed

Failis `src/server.js` on loetelu lehtedest, mida saab testimiseks kasutada (Delfi, Neti,
Facebook EE, konkreetne ChatGPT vaade, Paremklik ja kriminaalpolitsei demo). Vajadusel saad
sinna lisada uusi ridu või eemaldada olemasolevaid.

## Ideepark tulevikuks

- Püsivad kasutajaprofiilid koos filtrikomplektidega ja sisselogimisega.
- Teksti automaatne struktureerimine, tsiteerimine ja märgendamine.
- Pildivaba/mobiilivaade CSS-i süstimise kaudu (vajab tihti täiendavat proxy loogikat).
- Ekraanipiltide tegemine (nt Puppeteer/Playwright serveripoolselt) ja automaatne arhiveerimine.
- Tõlke- ning AI-abistatud "text only" või "AI format" vaated.
- Offline pakk (Electron/taustal Node) individuaalseks kasutuseks.
- Moodulipõhine skriptide süsteem, kuhu saab lisada ka finants- või analüütikapluginaid.

## Märkused

- Mõned saidid võivad siiski iframe'i blokeerida või nõuda sisselogimist. Sellisel juhul kuvatakse
  iframe'is viga või tühjus.
- Projekt on mõeldud katsetamiseks. Enne avalikku kasutust kontrolli sihtlehtede kasutustingimusi
  ja privaatsusreegleid.
