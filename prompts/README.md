# LLM-kataloogi promptid — kasutusjuhend

Kaks prompti sama toote jaoks, eri "võimsusklassides". Mõeldud eri AI-mudelite võrdlustestiks:
anna sama prompt eri mudelitele ja võrdle, kes jõuab parima töötava tulemuseni.

## Failid
- `PROMPT_V1_STRICT.md` — kivisse raiutud versioon. Null vabadust, 100% kontrollitav
  (kaasas verify.py nõue, mis mõõdab, kas mudel sai andmetega eksimatult hakkama).
  Sobib KÕIGILE mudelitele, ka tasuta/nõrgematele.
- `PROMPT_V2_AMBITIOUS.md` — V1 on selle sees kohustusliku baasina (kopeeri V1 tekst
  V2 sees olevasse `<insert PROMPT V1 here>` kohta), pluss järjestatud backlog F1–F8
  ja vabadusklausel oma ideede jaoks. Sobib tugevatele mudelitele.

## Enne prompti saatmist
1. `curl https://openrouter.ai/api/v1/models -o openrouter_models.json`
2. ÄRA kleebi mudelite JSON-i prompti sisse (see on ~500KB / ~250k tokenit).
   Prompt ütleb mudelile, et fail on kettal ja kood loeb seda runtime'is.

## Faasideks jagamine (kui mudel ei jaksa ühe korraga)
V1 loomulikud katkestuspiirid on failipiirid: 1) ingest.py + verify.py, 2) app.py,
3) index.html + README. Saada järgmine sõnum lihtsalt: "Continue from where you stopped."

## Reasoning-taseme valik
- V1 (spetsifikatsiooni järgimine): medium ja max annavad enamasti sama tulemuse —
  spec on nii kinni naelutatud, et mõtlemisruumi on vähe. Medium piisab.
- V2 (arhitektuur + loovus + pikk väljund): high/max reasoning annab märgatavalt
  parema tulemuse, eriti F2 (overlap-normaliseerimine) ja vabadusklausli osas.
- Nõrgad/tasuta mudelid: anna ainult V1, vajadusel faaside kaupa. V2
  "capability-adaptive" klausel laseb ka nõrgemal mudelil ausalt vähem, aga valmis teha.

## Hindamine (kes võitis)
1. Kas `python verify.py` annab kõik PASS? (objektiivne, automaatne)
2. Kas UI filtrid töötavad ilma page-reload'ita?
3. Kas export-JSON valideerub V1-s antud skeemi vastu?
4. V2 puhul: mitu backlog-feature'it päriselt töötab (mitte ainult koodina olemas)?
