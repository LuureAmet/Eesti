// ============================================
// INFO SÜSTEEM - Info ikoonid, modal, plus-nupud
// ============================================

// Meditsiini info andmebaas
const MED_INFO_DB = {
    // TAIMED
    'viirpuu': {
        title: 'Viirpuu (Crataegus)',
        shortInfo: 'Südamele toetav taim, parandab vereringet ja südame funktsiooni.',
        ourInfo: `
            <h4>Viirpuu (Crataegus)</h4>
            <p><strong>Toime:</strong> Parandab südame kontraktiilsust, laiendab koronaarartereid, vähendab südame hapnikuvajadust.</p>
            <p><strong>Kasutamine:</strong> Tee (2-3 tassi päevas) või ekstrakt (standardiseeritud 160-900 mg päevas).</p>
            <p><strong>Ohutus:</strong> Üldiselt ohutu. Võib tugevdada südameravimite toimet.</p>
            <p><strong>Toimimise aeg:</strong> Esimesed efektid 6-8 nädala pärast.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Crataegus" target="_blank">Wikipedia: Crataegus</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4804096/" target="_blank">NCBI: Hawthorn for heart health</a></li>
            </ul>
        `
    },
    'arjuna': {
        title: 'Arjuna (Terminalia arjuna)',
        shortInfo: 'Ayurveda taim südame toetuseks ja südamepuudulikkuse leevendamiseks.',
        ourInfo: `
            <h4>Arjuna (Terminalia arjuna)</h4>
            <p><strong>Toime:</strong> Kardioprotektiivne, tugevdab südamelihast, vähendab vererõhku.</p>
            <p><strong>Kasutamine:</strong> 500 mg kuni 3× päevas koos toiduga.</p>
            <p><strong>Ohutus:</strong> Hästi talutav. Võib mõjutada vererõhku.</p>
            <p><strong>Uuringud:</strong> Kliinilised uuringud näitavad positiivset mõju südamepuudulikkusele.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Terminalia_arjuna" target="_blank">Wikipedia: Terminalia arjuna</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4220499/" target="_blank">NCBI: Arjuna cardioprotective effects</a></li>
            </ul>
        `
    },
    'hibiscus': {
        title: 'Hibiskus (Hibiscus sabdariffa)',
        shortInfo: 'Vererõhku langetav tee, rikas antioksüdantides.',
        ourInfo: `
            <h4>Hibiskus (Hibiscus sabdariffa)</h4>
            <p><strong>Toime:</strong> Langetab vererõhku, diureetne toime, antioksüdantne.</p>
            <p><strong>Kasutamine:</strong> Tee 2-3 tassi päevas (1-2 g kuivatatud õisi tassile).</p>
            <p><strong>Ohutus:</strong> Hästi talutav. Võib langetada vererõhku, ettevaatust hüpotensiooniga.</p>
            <p><strong>Uuringud:</strong> Näitavad 7-13 mmHg süstoolse rõhu langust.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Hibiscus_tea" target="_blank">Wikipedia: Hibiscus tea</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5192435/" target="_blank">NCBI: Hibiscus and blood pressure</a></li>
            </ul>
        `
    },
    'ginseng': {
        title: 'Ginseng (Panax ginseng)',
        shortInfo: 'Adaptogeen, parandab energia ja stressitaluvust.',
        ourInfo: `
            <h4>Ginseng (Panax ginseng)</h4>
            <p><strong>Toime:</strong> Adaptogeen, parandab energia, vähendab väsimust, toetab immuunsüsteemi.</p>
            <p><strong>Kasutamine:</strong> 200-400 mg standardiseeritud ekstrakti päevas.</p>
            <p><strong>Ohutus:</strong> Võib mõjutada vererõhku ja veresuhkru taset. ETTEVAATUST antikoagulantidega.</p>
            <p><strong>Märkus:</strong> Pikaajaline kasutus (>3 kuud) vajab pause.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Panax_ginseng" target="_blank">Wikipedia: Panax ginseng</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3861174/" target="_blank">NCBI: Ginseng pharmacology</a></li>
            </ul>
        `
    },
    'astragalus': {
        title: 'Astragalus (Astragalus membranaceus)',
        shortInfo: 'Immuunsüsteemi tugevdav ja südamele toetav taim.',
        ourInfo: `
            <h4>Astragalus</h4>
            <p><strong>Toime:</strong> Immuunsüsteemi toetus, südame kaitse, energia suurendamine.</p>
            <p><strong>Kasutamine:</strong> 250-500 mg ekstrakti 2× päevas või tee.</p>
            <p><strong>Ohutus:</strong> Väga ohutu, hästi talutav pikaajalises kasutuses.</p>
            <p><strong>Südamele:</strong> Aitab südamepuudulikkuse korral, vähendab põletikku.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Astragalus_propinquus" target="_blank">Wikipedia: Astragalus</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4207935/" target="_blank">NCBI: Astragalus cardiovascular benefits</a></li>
            </ul>
        `
    },
    'reishi': {
        title: 'Reishi seen (Ganoderma lucidum)',
        shortInfo: 'Immuunsüsteemi ja südame toetav ravimseen.',
        ourInfo: `
            <h4>Reishi seen</h4>
            <p><strong>Toime:</strong> Immuunmoduleerija, vähendab kolesterooli, südamekaitsev.</p>
            <p><strong>Kasutamine:</strong> 1-3 g pulbrit või 500-1500 mg ekstrakti päevas.</p>
            <p><strong>Ohutus:</strong> Hästi talutav. Võib mõjutada verehüübimist.</p>
            <p><strong>Märkus:</strong> Parim toime pikaajalises kasutuses (3+ kuud).</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Ganoderma_lucidum" target="_blank">Wikipedia: Reishi</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3339609/" target="_blank">NCBI: Reishi health benefits</a></li>
            </ul>
        `
    },
    'merevetikas': {
        title: 'Merevetikas/Kelp',
        shortInfo: 'Joodirikas merevetikas, toetab kilpnääret.',
        ourInfo: `
            <h4>Merevetikas/Kelp</h4>
            <p><strong>Toime:</strong> Joodiallikas kilpnäärme toetuseks, mineraalid ja vitamiinid.</p>
            <p><strong>Kasutamine:</strong> 150-300 mcg joodi päevas (tavaliselt 1-2 g kuivatatud vetikaid).</p>
            <p><strong>Ohutus:</strong> ETTEVAATUST - liiga suur joodi kogus võib häirida kilpnääret!</p>
            <p><strong>Märkus:</strong> Võib sisaldada raskmetalle. Kvaliteetne allikas oluline.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Kelp" target="_blank">Wikipedia: Kelp</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3093619/" target="_blank">NCBI: Seaweed and thyroid</a></li>
            </ul>
        `
    },

    // SÜNDMUSED
    'haiglaravi': {
        title: 'Haiglaravi',
        shortInfo: 'Statsionaarne ravi haiglas.',
        ourInfo: `
            <h4>Haiglaravi</h4>
            <p><strong>Miks oluline:</strong> Näitab haiguse raskust ja edasist prognoosi.</p>
            <p><strong>Mis märkida:</strong> Kuupäev, põhjus, kestus, osakond, põhiline ravi.</p>
        `,
        externalInfo: `
            <p>Haiglaravi põhjused südame kontekstis:</p>
            <ul>
                <li>Äge südamepuudulikkus</li>
                <li>Rütmihäired</li>
                <li>Müokardiinfarkt</li>
            </ul>
        `
    },
    'emo': {
        title: 'EMO külastus',
        shortInfo: 'Erakorralise meditsiini osakond.',
        ourInfo: `
            <h4>EMO külastus</h4>
            <p><strong>Miks oluline:</strong> Ägedate haigusseisundite jälgimine.</p>
            <p><strong>Mis märkida:</strong> Kuupäev, kaebused, diagnoosid, tehtud protseduurid.</p>
        `,
        externalInfo: `
            <p>Levinumad EMO külastuse põhjused:</p>
            <ul>
                <li>Südamepekslemine</li>
                <li>Rindkerevalu</li>
                <li>Õhupuudus</li>
            </ul>
        `
    },
    'kardioversioon': {
        title: 'Kardioversioon',
        shortInfo: 'Elektriline või medikamentoosne südamerütmi taastamine.',
        ourInfo: `
            <h4>Kardioversioon</h4>
            <p><strong>Mis see on:</strong> Protseduur, mis taastab normaalse südamerütmi.</p>
            <p><strong>Tüübid:</strong> Elektriline (DC) või medikamentoosne.</p>
            <p><strong>Märgi:</strong> Kuupäev, edukas/ebaõnnestunud, pärast-rütm.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Cardioversion" target="_blank">Wikipedia: Cardioversion</a></li>
            </ul>
        `
    },
    'ablatsioon': {
        title: 'Ablatsioon',
        shortInfo: 'Kateeter-ablatsioon südamerütmihäirete raviks.',
        ourInfo: `
            <h4>Kateeter-ablatsioon</h4>
            <p><strong>Mis see on:</strong> Protseduur, kus häirivad südamekoed "põletatakse" ära.</p>
            <p><strong>Näidustused:</strong> AF, kodade laperdus, kambrite tahhükardia.</p>
            <p><strong>Märgi:</strong> Kuupäev, tüüp (PV isolatsioon, jne), tulemus.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Catheter_ablation" target="_blank">Wikipedia: Catheter ablation</a></li>
            </ul>
        `
    },

    // ALLERGIAD
    'penitsilliin': {
        title: 'Penitsilliini allergia',
        shortInfo: 'Allergia penitsilliini antibiootikumile.',
        ourInfo: `
            <h4>Penitsilliini allergia</h4>
            <p><strong>Sümptomid:</strong> Lööve, urtikaaria, anafülaksia (harv).</p>
            <p><strong>Oluline:</strong> Teavita alati arste! Kasuta alternatiive.</p>
        `,
        externalInfo: `
            <p><strong>Alternatiivid:</strong> Makroliidid, fluorokinoloonid, teiste rühmade antibiootikumid.</p>
        `
    },
    'aspirin': {
        title: 'Aspiriini ülitundlikkus',
        shortInfo: 'Ülitundlikkus atsetüülsalitsüülhappele.',
        ourInfo: `
            <h4>Aspiriini ülitundlikkus</h4>
            <p><strong>Sümptomid:</strong> Hingamisteede sümptomid, lööve, anafülaksia.</p>
            <p><strong>Oluline:</strong> Vältida MSPVA-sid (mittesteroidsed põletikuvastased).</p>
        `,
        externalInfo: `
            <p><strong>Alternatiivid:</strong> Klopidogreel, prasugrel (südameravimid).</p>
        `
    },
    'kontrast': {
        title: 'Kontrastaine allergia',
        shortInfo: 'Reaktsioon joodipõhistele kontrastainetele.',
        ourInfo: `
            <h4>Kontrastaine allergia</h4>
            <p><strong>Sümptomid:</strong> Sügelus, lööve, hingamisraskused.</p>
            <p><strong>Oluline:</strong> Eelravi kortikosteroididega enne CT/angio protseduure.</p>
        `,
        externalInfo: `
            <p><strong>Premedikatsion:</strong> Prednisoloon + antihistamiinikum.</p>
        `
    },
    'tolv': {
        title: 'Tolmuallergia',
        shortInfo: 'Allergia tolmulestad sisaldavale tolmule.',
        ourInfo: `
            <h4>Tolmuallergia</h4>
            <p><strong>Sümptomid:</strong> Nohu, aevastamine, silmade sügelus, astma.</p>
            <p><strong>Ravi:</strong> Allergeeni vältimine, antihistamiinikumid, desensibiliseerimine.</p>
        `,
        externalInfo: `
            <p><strong>Ennetamine:</strong> HEPA filtrid, regulaarne koristamine.</p>
        `
    },
    'toiduallergia': {
        title: 'Toiduallergia',
        shortInfo: 'Immuunsüsteemi reaktsioon toidule.',
        ourInfo: `
            <h4>Toiduallergia</h4>
            <p><strong>Levinumad:</strong> Pähklid, mereannid, munad, piim, nisu.</p>
            <p><strong>Sümptomid:</strong> Lööve, seedehäired, anafülaksia.</p>
        `,
        externalInfo: `
            <p><strong>Ravi:</strong> Rangelt vältida allergeeni. EpiPen kui anafülaksia risk.</p>
        `
    },

    // EI SOOVI / KEELUD
    'rontgen': {
        title: 'Röntgen',
        shortInfo: 'Röntgenikiiritus diagnostikaks.',
        ourInfo: `<h4>Röntgen</h4><p>Kiirguspõhine pildistamine luude ja organite nägemiseks.</p>`,
        externalInfo: `<p>Madal kiirgusannuses diagnostika meetod.</p>`
    },
    'ct': {
        title: 'CT / MRI',
        shortInfo: 'Kompuutertomograafia või magnetresonantstomograafia.',
        ourInfo: `<h4>CT / MRI</h4><p>Detailsed kehaskaneeringud.</p>`,
        externalInfo: `<p>CT kasutab kiir</p>`
    },

    // KOORMUSTALUVUS / TÖÖD
    'mesatöö': {
        title: 'Mesatöö',
        shortInfo: 'Raske füüsiline töö lihatöötlemises - kõrge südame koormus.',
        ourInfo: `<h4>Mesatöö</h4><p>Raske füüsiline töö, mis nõuab head südame koormustaluvust ja lihasjõudu.</p>`,
        externalInfo: `<p>Tavaliselt 8-12h vahetused, külm keskkond, raske tõstmine.</p>`
    },
    'öövalvur': {
        title: 'Öövalvur',
        shortInfo: 'Öine töögraafik - mõjutab und ja ainevahetust.',
        ourInfo: `<h4>Öövalvur</h4><p>Öötöö mõjutab tsirkaadset rütmi, und, ainevahetust ja kardiovaskulaarset tervist.</p>`,
        externalInfo: `<p>Risk: metaboolne sündroom, diabeet, südame-veresoonkonna haigused.</p>`
    },
    'istutöö': {
        title: 'Istutöö',
        shortInfo: 'Istuv kontorit00 - madal füüsiline aktiivsus.',
        ourInfo: `<h4>Istutöö</h4><p>Pikaajaline istumine suurendab kardiovaskulaarset riski ja ainevahetushäireid.</p>`,
        externalInfo: `<p>Soovitus: iga tunni tagant 5-10 min liikumist.</p>`
    },
    'ehitustöö': {
        title: 'Ehitustöö',
        shortInfo: 'Füüsiliselt nõudlik töö - kõrge trauma risk.',
        ourInfo: `<h4>Ehitustöö</h4><p>Raske füüsiline töö, mis nõuab head koormustaluvust ja lihasjõudu.</p>`,
        externalInfo: `<p>Risk: luu-lihaskonna vigastused, krooniline valu.</p>`
    },
    'hooldus': {
        title: 'Hooldus',
        shortInfo: 'Hooldus/õendus - mõõdukas füüsiline ja emotsionaalne koormus.',
        ourInfo: `<h4>Hooldustöö</h4><p>Nõuab head füüsilist vormi (patsientide liigutamine) ja emotsionaalset vastupidavust.</p>`,
        externalInfo: `<p>Sage läbipõlemine, krooniline stress.</p>`
    },
    'transport': {
        title: 'Transport/juht',
        shortInfo: 'Pikaajaline istumine roolis - madal aktiivsus.',
        ourInfo: `<h4>Juhitöö</h4><p>Pikk istumine, stress, ebaregulaarne toitumine - kardiovaskulaarne risk.</p>`,
        externalInfo: `<p>Soovitus: regulaarsed pausid, venitused, liikumine.</p>`
    },

    // AKTIIVSUS / FÜÜSILINE TEGEVUS
    'jalutamine': {
        title: 'Jalutamine',
        shortInfo: 'Kõige lihtsam ja ohutum liikumisviis - sobib kõigile.',
        ourInfo: `<h4>Jalutamine</h4><p>Madala intensiivsusega aeroobne tegevus. Parandab südame tervist, vähendab stressi.</p>`,
        externalInfo: `<p>Soovitus: 30 min päevas, 5× nädalas. Algajatele: alusta 10 minutiga.</p>`
    },
    'jooksmine': {
        title: 'Jooksmine',
        shortInfo: 'Kõrge intensiivsusega kardiotrenn - parandab vastupidavust.',
        ourInfo: `<h4>Jooksmine</h4><p>Suurendab südame võimsust, põletab kaloreid efektiivselt.</p>`,
        externalInfo: `<p>Ettevaatust: liigese- ja põlveprobleemide korral konsulteeri arstiga.</p>`
    },
    'ujumine': {
        title: 'Ujumine',
        shortInfo: 'Terviklik kehatreening ilma liigeskoormata - suurepärane kardio.',
        ourInfo: `<h4>Ujumine</h4><p>Kaasab kõiki lihasgruppe, ei koorma liigeseid. Sobib artriidi, ülekaalulisuse korral.</p>`,
        externalInfo: `<p>Soovitus: 20-30 min, 2-3× nädalas.</p>`
    },
    'rattasõit': {
        title: 'Rattasõit',
        shortInfo: 'Madalama koormaga kardiotrenn - sobib põlveprobleemide korral.',
        ourInfo: `<h4>Rattasõit</h4><p>Parandab vastupidavust ja jalamuskulatuuri tugevust, madal koormuse risk.</p>`,
        externalInfo: `<p>Soovitus: 30-60 min, 3-5× nädalas.</p>`
    },
    'jõusaal': {
        title: 'Jõusaal',
        shortInfo: 'Jõutreening - suurendab lihasmassi ja luutihedust.',
        ourInfo: `<h4>Jõusaal</h4><p>Treenib lihaseid ja luustikku. Parandab ainevahetust ja insuliinitundlikkust.</p>`,
        externalInfo: `<p>Soovitus: 2-3× nädalas, koos treeneriga kui algaja.</p>`
    },
    'jooga': {
        title: 'Jooga',
        shortInfo: 'Painduvus, tasakaal ja rahustus - vähendab stressi.',
        ourInfo: `<h4>Jooga</h4><p>Parandab painduvust, tasakaalu, rahustab närvisüsteemi.</p>`,
        externalInfo: `<p>Sobib kõigile, eriti stressis olijatele ja vanematele.</p>`
    },
    'aeroobika': {
        title: 'Aeroobika',
        shortInfo: 'Rühmatreening muusikaga - kardio ja koordinatsioon.',
        ourInfo: `<h4>Aeroobika</h4><p>Energiline rühmatreening, parandab südame tervist ja meeleolu.</p>`,
        externalInfo: `<p>Soovitus: 30-45 min, 2-3× nädalas.</p>`
    },
    'tants': {
        title: 'Tants',
        shortInfo: 'Lõbus liikumisviis - parandab koordinatsiooni ja meeleolu.',
        ourInfo: `<h4>Tants</h4><p>Ühendab kardio, tasakaalu ja sotsiaalse aspekti. Suurepärane vanematele.</p>`,
        externalInfo: `<p>Parandab mälu, vähendab dementsuse riski.</p>`
    },

    // ELUVIIS / TRANSPORT
    'auto_kasutamine': {
        title: 'Auto kasutamine',
        shortInfo: 'Regulaarne autoga sõitmine - pikad istumised, stress.',
        ourInfo: `<h4>Auto kasutamine</h4><p>Pikad istumised roolis suurendavad kardiovaskulaarset riski, lülisamba probleeme.</p>`,
        externalInfo: `<p>Soovitus: pausid iga 2 tunni järel, venitused, ergonoomika.</p>`
    },
    'ühistransport': {
        title: 'Ühistransport',
        shortInfo: 'Bussid, rongid - nakkusrisk, stress, ebaregulaarsus.',
        ourInfo: `<h4>Ühistransport</h4><p>Võib suurendada nakkusriski, stressi. Positiivne: rohkem liikumist kui autoga.</p>`,
        externalInfo: `<p>Võib olla parem alternatiiv kui auto sõitmine (rohkem jalutamist).</p>`
    },
    'tööreisid': {
        title: 'Tööreisid',
        shortInfo: 'Regulaarsed reisid tööks - unehäired, stress, toitumisprobleemid.',
        ourInfo: `<h4>Tööreisid</h4><p>Ajavahesid vahetus, ebaregulaarne uni ja toitumine - kardiovaskulaarne risk.</p>`,
        externalInfo: `<p>Sage lendamine: veenilaiendite risk, jetlag, stress.</p>`
    },
    'rahvusvaheline_reis': {
        title: 'Rahvusvaheline reis',
        shortInfo: 'Sagedased reisid välismaale - ajavahede mõju, stress.',
        ourInfo: `<h4>Rahvusvaheline reisimine</h4><p>Ajavahede muutus, unehäired, stress, toitumismuutused.</p>`,
        externalInfo: `<p>Jetlag mõjutab südame rütmi, ainevahetust, immuunsust.</p>`
    },
    'rattaga_tööle': {
        title: 'Rattaga tööle',
        shortInfo: 'Igapäevane jalgrattaga sõit - suurepärane kardio, keskkonnasõbralik.',
        ourInfo: `<h4>Rattaga tööle</h4><p>Igapäevane liikumine, parandab südame tervist, vähendab stressi.</p>`,
        externalInfo: `<p>Uuringud näitavad: rattaga tööle sõitjatel parem südame tervis.</p>`
    },
    'jalutades_tööle': {
        title: 'Jalutades tööle',
        shortInfo: 'Jalgsi tööle - parim madala intensiivsusega liikumine.',
        ourInfo: `<h4>Jalutades tööle</h4><p>Igapäevane jalutuskäik parandab südame tervist, meeleolu, vähendab stressi.</p>`,
        externalInfo: `<p>10 000 sammu päevas vähendab kardiovaskulaarset riski 40%.</p>`
    },

    // JOOGID / TEE LIIGID
    'roheline_tee': {
        title: 'Roheline tee',
        shortInfo: 'Antioksüdantide ja katehiinide allikas - parandab ainevahetust.',
        ourInfo: `<h4>Roheline tee</h4><p>Sisaldab EGCG-d - võimas antioksüdant. Parandab ainevahetust, toetab südant.</p>`,
        externalInfo: `<p>Soovitus: 2-3 tassi päevas. Sisaldab kofeiini (vähem kui kohv).</p>`
    },
    'must_tee': {
        title: 'Must tee',
        shortInfo: 'Fermenteeritud tee - rohkem kofeiini, parandab tähelepanu.',
        ourInfo: `<h4>Must tee</h4><p>Kõrgem kofeiinisisaldus kui rohelisel. Parandab vereringe, sisaldab teanniini.</p>`,
        externalInfo: `<p>Sisaldab ca 40-70 mg kofeiini tassi kohta.</p>`
    },
    'hibiskus_tee': {
        title: 'Hibiskus tee',
        shortInfo: 'Vererõhku langetav, C-vitamiinirikas, kofeiinivaba.',
        ourInfo: `<h4>Hibiskus tee</h4><p>Tõendatud vererõhku langetav toime. C-vitamiinirikas, antioksüdantide allikas.</p>`,
        externalInfo: `<p>Uuringud: langetas süstoolset RR 7-8 mmHg. Täiesti kofeiinivaba.</p>`
    },
    'oolong_tee': {
        title: 'Oolong tee',
        shortInfo: 'Poolfermendeeritud - rohelise ja musta vahepeal.',
        ourInfo: `<h4>Oolong tee</h4><p>Tasakaalustatud kofeiinisisaldus, parandab ainevahetust ja rasva põletamist.</p>`,
        externalInfo: `<p>Traditsiooniline Hiina tee, sobib seedimise parandamiseks.</p>`
    },
    'valge_tee': {
        title: 'Valge tee',
        shortInfo: 'Kõige vähem töödeldud - õrn, antioksüdante rohkelt.',
        ourInfo: `<h4>Valge tee</h4><p>Minimaalselt töödeldud, kõrgeim antioksüdantide tase, madal kofeiin.</p>`,
        externalInfo: `<p>Hinnalisim tee liik, õrn maitse.</p>`
    },
    'ravimtaimede_tee': {
        title: 'Ravimtaimede tee',
        shortInfo: 'Kofeiinivabad taimeteeded - rahustav, seedimist toetav.',
        ourInfo: `<h4>Ravimtaimede teed</h4><p>Näiteks kummeli, piparmündi, lavendli teed. Kofeiinivabad, rahustav toime.</p>`,
        externalInfo: `<p>Sobib õhtul, parandab und, vähendab ärevust.</p>`
    },
    'matcha': {
        title: 'Matcha',
        shortInfo: 'Jahvatatud roheline tee - maksimum antioksüdante ja L-teanniini.',
        ourInfo: `<h4>Matcha</h4><p>Kogu teeleht jahvatatud - maksimaalsed toitained. L-teanniin + kofeiin = rahulik tähelepanu.</p>`,
        externalInfo: `<p>Sisaldab 10× rohkem antioksüdante kui tavaline roheline tee.</p>`
    },

    // TOITUMISE PIIRANGUD
    'gluteenivaba': {
        title: 'Gluteenivaba',
        shortInfo: 'Gluteeni vältimine - vajalik tsöliaakia või gluteenitalumatuse korral.',
        ourInfo: `<h4>Gluteenivaba dieet</h4><p>Väldi nisu, rukki, otraid. Vajalik tsöliaakia, gluteenitalumatuse korral.</p>`,
        externalInfo: `<p>Asenda: kvinoaga, riisiga, kartuli, maisi, tatrajahuga.</p>`
    },
    'piimatooted_vaba': {
        title: 'Piimatoodete vältimine',
        shortInfo: 'Laktoositalumatus või piima valguallergia.',
        ourInfo: `<h4>Piimatoodete vältimine</h4><p>Laktoositalumatus või kasiini allergia. Väldi piima, juustu, jogurtit.</p>`,
        externalInfo: `<p>Asenda: kookos-, mandli-, kaerapiimaga. Veendu kaltsiumisisalduses.</p>`
    },
    'lihatoidud_vaba': {
        title: 'Lihatoidud',
        shortInfo: 'Taimetoiduline või liha vältimine tervislikel põhjustel.',
        ourInfo: `<h4>Liha vältimine</h4><p>Vegetaarlus, veganlik eluviis või tervislik põhjus (südamehaigused).</p>`,
        externalInfo: `<p>Veendu piisavas B12, raua, valgu saamisses. Võib vajada toidulisandeid.</p>`
    },
    'madal_suhkur': {
        title: 'Madal suhkur',
        shortInfo: 'Suhkru piiramine - diabeet, kaalulangetamine.',
        ourInfo: `<h4>Madal suhkur</h4><p>Väldi lihtsa suhkru ja kiireid süsivesikuid. Sobib diabeedile, kaalutõstule.</p>`,
        externalInfo: `<p>Jälgi glükeemilist indeksit. Eelista täisteravilju, kaunvilju.</p>`
    },
    'madal_sool': {
        title: 'Madal sool',
        shortInfo: 'Soola piiramine - hüpertensioon, südamepuudulikkus.',
        ourInfo: `<h4>Madal sool (< 2 g Na)</h4><p>Vajalik hüpertensiooni, südamepuudulikkuse, neeruhaiguste korral.</p>`,
        externalInfo: `<p>Eesmärk: alla 2 g naatriumit (5 g soola) päevas. Väldi töödeldud toitu.</p>`
    },

    // LIGIPÄÄS / RESSURSID
    'loodustoodete_pood': {
        title: 'Loodustoodete pood',
        shortInfo: 'Kohalik pood toidulisandite, taimravimite ja mahetoodete jaoks.',
        ourInfo: `<h4>Loodustoodete pood</h4><p>Kohalik toodete allikas - toidulisandid, vitamiinid, taimtehed, mahetooted.</p>`,
        externalInfo: `<p>Tavaliselt kvaliteet edasimüüjatest parem, saad nõu.</p>`
    },
    'iherb': {
        title: 'iHerb',
        shortInfo: 'Rahvusvaheline platvorm toidulisandite ja mahetoodete tellimiseks.',
        ourInfo: `<h4>iHerb</h4><p>USA platvorm laia valikuga toidulisandeid, vitamiine. Saab Eestisse tellida.</p>`,
        externalInfo: `<p>Suur valik, hea hinna-kvaliteedi suhe. Tarneaeg 1-2 nädalat.</p>`
    },
    'tcm_praktik': {
        title: 'TCM/Ayurveda praktik',
        shortInfo: 'Juurdepääs traditsioonilistele looduslikele raviviiside praktikutele.',
        ourInfo: `<h4>TCM/Ayurveda praktik</h4><p>Traditsiooniline Hiina meditsiin (TCM) või Ayurveda praktik. Isikupärane lähenemine.</p>`,
        externalInfo: `<p>Võib pakkuda akupunktuuri, taimravimeid, eluviisi nõustamist.</p>`
    },
    'retseptiravimid': {
        title: 'Retseptiravimid aptees',
        shortInfo: 'Tavaapteek retseptiravimite väljastamiseks.',
        ourInfo: `<h4>Retseptiravimid</h4><p>Apteek, kust saad arsti ettekirjutusega ravimeid.</p>`,
        externalInfo: `<p>Osa ravimeid hüvitatakse tervisekassa poolt.</p>`
    },
    'internet_tellimus': {
        title: 'Internetist tellimised',
        shortInfo: 'Võimalus tellida tooteid ja lisandeid internetist.',
        ourInfo: `<h4>Internetist tellimised</h4><p>Juurdepääs rahvusvahelistele platvormidele (iHerb, Amazon, jne).</p>`,
        externalInfo: `<p>Laiem valik, paremad hinnad. Oluline kontrollida kvaliteeti ja päritolu.</p>`
    },

    // PEREKONDLIK RISK
    'süda_perekond': {
        title: 'Südamehaigused perekonnas',
        shortInfo: 'Pereliikmete südamehaigused alla 65 aasta vanuselt - suurendab riski.',
        ourInfo: `<h4>Perekondlik südameriski</h4><p>Kui vanemad, õed-vennad haigestusid alla 65a - sinu risk on kõrgem.</p>`,
        externalInfo: `<p>Geneetiline risk. Oluline ennetav seireaeg ja eluviis.</p>`
    },
    'insult_perekond': {
        title: 'Insult perekonnas',
        shortInfo: 'Pereliikmete insult alla 65 aasta vanuselt.',
        ourInfo: `<h4>Perekondlik insuldi risk</h4><p>Geneetiline risk suurem, kui perekonnaliikmed läbisid insuldi alla 65a.</p>`,
        externalInfo: `<p>Kontrolli vererõhku, kolesterooli regulaarselt.</p>`
    },
    'diabeet_perekond': {
        title: 'Diabeet perekonnas',
        shortInfo: 'Pereliikmete diabeet - tüüp 2 risk suurem.',
        ourInfo: `<h4>Perekondlik diabeet</h4><p>2. tüübi diabeet on pärilik. Kui vanemad või õed-vennad, risk 2-6× kõrgem.</p>`,
        externalInfo: `<p>Kontrolli vere glükoosi, veendu tervislikki toitumisus ja liikumises.</p>`
    },
    'vähk_perekond': {
        title: 'Vähk perekonnas',
        shortInfo: 'Vähk perekonnaliikmete seas - geneetiline risk.',
        ourInfo: `<h4>Perekondlik vähirisk</h4><p>Teatud vähiliigid on pärilikud (rinna-, munasarja-, käärsoole vähk).</p>`,
        externalInfo: `<p>Geneetiline nõustamine võib olla vajalik. Varajane skriining oluline.</p>`
    },

    // ELUPAIK / ELUKESKKOND
    'kortermajas': {
        title: 'Kortermajas elamine',
        shortInfo: 'Kortermaja - korruseid, lift, rahulus, naabrid.',
        ourInfo: `<h4>Kortermajas</h4><p>Elamine kortermajas mõjutab liikumist (trepid, lift), mürataset, õhukvaliteeti.</p>`,
        externalInfo: `<p>Kõrgemad korused ilma liftita = täiendav füüsiline koormus. Müra võib mõjutada und.</p>`
    },
    'maaelu': {
        title: 'Maaelu',
        shortInfo: 'Maapiirkond - rohkem liikumist, vähem stressi, värske õhk.',
        ourInfo: `<h4>Maaelu</h4><p>Parem õhukvaliteet, väiksem müratase, rohkem füüsilist tööd (aia-, maatööd).</p>`,
        externalInfo: `<p>Võib olla kaugemal tervishoiust. Rohkem liikumist igapäevaselt.</p>`
    },
    'linn': {
        title: 'Linn',
        shortInfo: 'Linnas elamine - kiire tempo, stress, müra, saastatus.',
        ourInfo: `<h4>Linnas elamine</h4><p>Kõrgem stressitase, õhusaaste, müra. Parem ligipääs tervishoiule.</p>`,
        externalInfo: `<p>Õhusaaste mõjutab südant ja kopse. Stressihaldus oluline.</p>`
    },
    'öötöö': {
        title: 'Öötöö',
        shortInfo: 'Öine töögraafik - tsirkaadne rütm häiritud.',
        ourInfo: `<h4>Öötöö</h4><p>Häirib tsirkaadset rütmi, suurendab metaboolse sündroomi, diabeedi, südamehaiguste riski.</p>`,
        externalInfo: `<p>Pikaajaline öötöö: kõrgem vähirisk, hormonaalse tasakaalu häired.</p>`
    },

    // LIIKUMISE VIISID / KÕNNITEMPO
    'jalgratas': {
        title: 'Jalgrattasõit',
        shortInfo: 'Sõit jalgrattaga - madala koormaga kardio, sobib liigestele.',
        ourInfo: `<h4>Jalgrattasõit</h4><p>Liigeste sõbralik, parandab südame tervist, tugevdab jalgu.</p>`,
        externalInfo: `<p>30-60 min, 3-5× nädalas. Sobib ülekaalulisusele ja artriidile.</p>`
    },
    'rulluisutamine': {
        title: 'Rulluisutamine',
        shortInfo: 'Rulluiskudega - tasakaal, kardio, koordinatsioon.',
        ourInfo: `<h4>Rulluisutamine</h4><p>Parandab tasakaalu, kardio vastupidavust, tugevdab jalgu.</p>`,
        externalInfo: `<p>Kaitsevahendid vajalikud! Sobib noorematele ja heal tasakaalul olijatele.</p>`
    },
    'ujumine': {
        title: 'Ujumine',
        shortInfo: 'Terviklik treening - ei koorma liigeseid.',
        ourInfo: `<h4>Ujumine</h4><p>Kaasab kõiki lihasgruppe, ei koorma liigeseid. Suurepärane eakatele ja artriidile.</p>`,
        externalInfo: `<p>20-30 min, 2-3× nädalas. Parandab kopsumahtuvust.</p>`
    },
    'mägimatk': {
        title: 'Mägimatk/Matkarada',
        shortInfo: 'Matkamine - kõrgem koormus, vastupidavus, looduses.',
        ourInfo: `<h4>Matkamine</h4><p>Parandab vastupidavust, tugevdab jalgu, vaimne taastumine looduses.</p>`,
        externalInfo: `<p>Sobib keskmise koormustaluvusega inimestele. Algajatele: alusta tasaselt.</p>`
    },
    'kõndimine': {
        title: 'Tavaline kõndimine',
        shortInfo: 'Kõige lihtsam liikumisviis - sobib kõigile.',
        ourInfo: `<h4>Kõndimine</h4><p>Madala intensiivsusega, ohutum, parandab südame tervist ja meeleolu.</p>`,
        externalInfo: `<p>10 000 sammu päevas = 40% vähem kardiovaskulaarset riski.</p>`
    },

    // KAEBUSED / SÜMPTOMID
    'peavalu': {
        title: 'Peavalu',
        shortInfo: 'Sage või kroonilinevalu pea piirkonnas.',
        ourInfo: `<h4>Peavalu</h4><p>Võib olla põhjustatud stressist, hüpertensioonist, madalast veresuhkrustliikumispuudusest.</p>`,
        externalInfo: `<p>Sage hüpertensiooni ja stressi marker. Võib vajada uuringuid.</p>`
    },
    'iiveldus': {
        title: 'Iiveldus',
        shortInfo: 'Oksendamis tunne, seedetrakti häire.',
        ourInfo: `<h4>Iiveldus</h4><p>Võib olla põhjustatud seedehäiretest, ravimitest, stress.</p>`,
        externalInfo: `<p>Kui püsiv, võib viidata mao/seedetrakti probleemidele.</p>`
    },
    'liigesevalu': {
        title: 'Liigesevalu (artralgia)',
        shortInfo: 'Valu liigestes - põletik, kulumine.',
        ourInfo: `<h4>Liigesevalu</h4><p>Võib olla artriit, artroosuurehape.</p>`,
        externalInfo: `<p>Põletikuline valu vajab antiinflam. ravi. Konsulteer reumaloloogiga.</p>`
    },
    'seljavalu': {
        title: 'Seljavalu',
        shortInfo: 'Valu selgroo piirkonnas.',
        ourInfo: `<h4>Seljavalu</h4><p>Sag põhjus: lihas või ligamendi venimine, kettahaigus.</p>`,
        externalInfo: `<p>Kroonilisel juhul võib vajada füsioterpaati vkonservatiivset ravi.</p>`
    },
    'kurguvalu': {
        title: 'Kurguvalu',
        shortInfo: 'Valu neelamisel, äge infektsioon.',
        ourInfo: `<h4>Kurguvalu</h4><p>Tavaliselt viirusnakkus. Bakteriaalse põhjusevajab antibiootikume.</p>`,
        externalInfo: `<p>Kui püsiv >1 nädal, konsulteeri arstiga.</p>`
    },
    'menstruaalivalud': {
        title: 'Menstruaalivalud (düsmenorröa)',
        shortInfo: 'Valulik menstruatsioon, krambid.',
        ourInfo: `<h4>Menstruaalivalud</h4><p>Emaka kontraktsioonid. Sagedane noortel naistel.</p>`,
        externalInfo: `<p>Ravi: MSPVA-d (ibuprofen), soojendus, magneesium.</p>`
    },
    'pms': {
        title: 'PMS (premenstruaalne sündroom)',
        shortInfo: 'Emotsionaalsed ja füüsilised sümptomid enne menstruatsiooni.',
        ourInfo: `<h4>PMS</h4><p>Hormonaalsed kõikumised. Sümptomid: tuju muutused, turse, rinnavalu.</p>`,
        externalInfo: `<p>Ravi: B6, magneesium, regulaarne liikumine, toitumine.</p>`
    },
    'kuumad_hood': {
        title: 'Kuumadhood (menopaus)',
        shortInfo: 'Äkiline kuumatunne, higistamine - menopaus.',
        ourInfo: `<h4>Kuumad hood</h4><p>Östrogeenikõikumised. Sage menopausi sümptom.</p>`,
        externalInfo: `<p>Ravi: HRT, taimtoidulisandid (viirpuu, must ürt), eluviis.</p>`
    },
    'migreen': {
        title: 'Migreen',
        shortInfo: 'Tugev pulseeriv peavalu, sageli ühepoolne.',
        ourInfo: `<h4>Migreen</h4><p>Neuroologne häire. Võib kaasneda auraga (visuaalsed häired).</p>`,
        externalInfo: `<p>Ravi: triptaanid, profülaktika (magneesium, B2, CoQ10).</p>`
    },

    // VANN / SAUN / VEETERAAPIA
    'epsom_vann': {
        title: 'Epsom soola vann',
        shortInfo: 'Magnees soola vannid - lihaste lõõgastus.',
        ourInfo: `<h4>Epsom soolavann</h4><p>MgSO4 imendub nahka, lõõgastab lihaseid, vähendab põletikku.</p>`,
        externalInfo: `<p>Soovitus: 1-2 tassi soola, 20 min, 2-3× nädalas.</p>`
    },
    'külm_dušš': {
        title: 'Külm dušš',
        shortInfo: 'Lühike külm vann/duš - toon, immuunsus.',
        ourInfo: `<h4>Külm dušš</h4><p>Stimuleerib vereringet, parandab immuunvastust tugevdab vaimset vastupidavust.</p>`,
        externalInfo: `<p>Alusta soojast, lõpeta 30-60 sek külmaga. Järk-järgult pikenda.</p>`
    },
    'saun': {
        title: 'Saun',
        shortInfo: 'Aurusaun - detoks, lõõgastus, kardioteraapia.',
        ourInfo: `<h4>Saun</h4><p>Parandab vereringet, vähendab vererõkku, aitab taastumsel.</p>`,
        externalInfo: `<p>Ettevaatust: südamepuudulikkus, madal RR. 15-20 min, 2-3× nädalas.</p>`
    },
    'jalavannikud': {
        title: 'Jalavannikud',
        shortInfo: 'Soojad jalavannikud - vereringe, lõõgastus.',
        ourInfo: `<h4>Jalavannikud</h4><p>Parandab perifeerset vereringet, lõõgastab enne und.</p>`,
        externalInfo: `<p>Lisa Epsom soola või eeterlikke õlisid (lavendel).</p>`
    },

    // MUUSIKA / HELITERAAPIA
    'klassikaline_muusika': {
        title: 'Klassikaline muusika',
        shortInfo: 'Bach, Mozart, Beethoven - rahustav, parandab fookust.',
        ourInfo: `<h4>Klassikaline muusika</h4><p>Vähendab stressi, parandab südame rütmivariatiivsust (HRV).</p>`,
        externalInfo: `<p>Mozart efekt: parandab ruumilist mõtlemist ja mälu.</p>`
    },
    'binauraalsed_lööid': {
        title: 'Binauraalsed lööid',
        shortInfo: 'Spetsiaalsed helid aju lainete mõjutamiseks.',
        ourInfo: `<h4>Binauraalsed lööid</h4><p>Erineva sagedusega helid mõlemassse kõrva - sünkroniseerimisvad aju laineid.</p>`,
        externalInfo: `<p>Delta (une), theta (meditatsioon), alfa (rahustus), beta (fookus).</p>`
    },
    'loodus_helid': {
        title: 'Loodushelid',
        shortInfo: 'Laine kohina, vihmaheli linnulaul - stressi vähendamine.',
        ourInfo: `<h4>Loodushelid</h4><p>Rahustav toime, vähendab kortisooli.</p>`,
        externalInfo: `<p>Suurepärane une parandamiseks ja meditatsiooni taustaks.</p>`
    },
    'meditatsioon_muusika': {
        title: 'Meditatsioonimuusika',
        shortInfo: 'Aeglane, harmoonilne - meditatsioonileks.',
        ourInfo: `<h4>Meditatsioonimusika</h4><p>Aeglane tempo (<60 bpm), aitab saavutada sisemist rahu.</p>`,
        externalInfo: `<p>Sobib joogale, hingamispraktikatele, õhtuseks lõõgastuseks.</p>`
    },

    // PRAKTIKAD
    'koherentshingamine': {
        title: 'Koherentshingamine (5-5)',
        shortInfo: 'Hingamistehnika 5 sek sisse, 5 sek välja - rahustab närvisüsteemi.',
        ourInfo: `
            <h4>Koherentshingamine</h4>
            <p><strong>Tehnika:</strong> 5 sekundit sisse, 5 sekundit välja (6 hingetõmmet minutis).</p>
            <p><strong>Toime:</strong> Optimeerib südame rütmivariatiivsust (HRV), vähendab stressi.</p>
            <p><strong>Kui palju:</strong> 10-20 minutit päevas, eelistatavalt hommikul ja õhtul.</p>
            <p><strong>Kasu:</strong> Vähendab vererõhku, parandab ANS tasakaalu.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Coherent_breathing" target="_blank">Wikipedia: Coherent breathing</a></li>
            </ul>
        `
    },
    'vahelduvninahingamine': {
        title: 'Vahelduvninahingamine',
        shortInfo: 'Joogahingamine, mis tasakaalustab närvisüsteemi.',
        ourInfo: `
            <h4>Vahelduvninahingamine (Nadi Shodhana)</h4>
            <p><strong>Tehnika:</strong> Sule üks ninasõõre, hingake teisest sisse, vaheta ja välja teisest.</p>
            <p><strong>Toime:</strong> Rahustav, tasakaalustab sümpatiline/parasümpatiline süsteeme.</p>
            <p><strong>Kui palju:</strong> 5-10 minutit päevas.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Nadi_Shodhana" target="_blank">Wikipedia: Alternate nostril breathing</a></li>
            </ul>
        `
    },
    'jalutamine': {
        title: 'Jalutamine',
        shortInfo: 'Kerge aeroobne liikumine südame tervise jaoks.',
        ourInfo: `
            <h4>Jalutamine</h4>
            <p><strong>Kasu:</strong> Parandab kardiovaskulaarset seisundit, vähendab vererõhku.</p>
            <p><strong>Kui palju:</strong> Vähemalt 30 min päevas, 5-7 päeva nädalas.</p>
            <p><strong>Tempo:</strong> Mõõdukas (saate rääkida, kuid mitte laulda).</p>
        `,
        externalInfo: `
            <p><strong>Soovitused:</strong></p>
            <ul>
                <li>Alustage 10-15 minutiga, suurendage järk-järgult</li>
                <li>Kasutage sammulugejat motivatsiooni jaoks</li>
            </ul>
        `
    },
    'zazen': {
        title: 'Zazen (Zen meditatsioon)',
        shortInfo: 'Istumismeditatsion, mille eesmärk on vaimne selgus.',
        ourInfo: `
            <h4>Zazen</h4>
            <p><strong>Tehnika:</strong> Istu püsti, fookus hingamisele või kooanile.</p>
            <p><strong>Toime:</strong> Vähendab stressi, parandab fookust, rahustab meelt.</p>
            <p><strong>Kui palju:</strong> 10-30 minutit päevas.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Zazen" target="_blank">Wikipedia: Zazen</a></li>
            </ul>
        `
    },
    '8brokaati': {
        title: '8 Brokaati (Ba Duan Jin)',
        shortInfo: 'Hiina Qigong harjutuste seeria tervise jaoks.',
        ourInfo: `
            <h4>8 Brokaati</h4>
            <p><strong>Mis see on:</strong> 8 lihtsat liikumist, mis stimuleerivad energiat (Qi).</p>
            <p><strong>Toime:</strong> Parandab paindlikkust, tugevdab lihaseid, vähendab stressi.</p>
            <p><strong>Kui palju:</strong> 10-20 minutit päevas, soojendusena või õhtul.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Baduanjin_qigong" target="_blank">Wikipedia: Eight Pieces of Brocade</a></li>
            </ul>
        `
    },

    // ================================================================
    // UNI JA NORSKAMINE
    // ================================================================

    'norskamine_ei_hairi': {
        title: 'Norskamine (ei häiri)',
        shortInfo: 'Kerge norskamine, mis ei häiri und ega teisi.',
        ourInfo: `
            <h4>Norskamine - kerge vorm</h4>
            <p><strong>Mis see on:</strong> Norskamine on ülemiste hingamisteede osaline ahenemine une ajal.</p>
            <p><strong>Kerge vorm:</strong> Ei häiri und ega teisi isikuid. Tavaliselt ohutust.</p>
            <p><strong>Mõjutavad tegurid:</strong> Kehaaasend (selili), alkohol, ninakinnisus.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Snoring" target="_blank">Wikipedia: Snoring</a></li>
            </ul>
        `
    },

    'norskamine_elukaaslast': {
        title: 'Norskamine (häirib elukaaslast)',
        shortInfo: 'Valjunev norskamine, mis häirib partneri und.',
        ourInfo: `
            <h4>Norskamine - mõõdukas vorm</h4>
            <p><strong>Partneri une häirimine:</strong> Võib viidata uneapnoe riskile.</p>
            <p><strong>Soovitused:</strong></p>
            <ul>
                <li>Magamine külili (mitte selili)</li>
                <li>Kaalu langetamine (kui ülekaal)</li>
                <li>Alkoholist loobumine õhtuti</li>
                <li>Konsulteeri arstiga (uneuuringu vajadus)</li>
            </ul>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.sleepfoundation.org/snoring" target="_blank">Sleep Foundation: Snoring</a></li>
            </ul>
        `
    },

    'norskamine_mind': {
        title: 'Norskamine (häirib mind)',
        shortInfo: 'Norskamine häirib enda und - võib viidata uneapnoele.',
        ourInfo: `
            <h4>Norskamine - raske vorm</h4>
            <p><strong>HOIATUS:</strong> Kui norskamine äratab sind või tunned lämmatust, võib olla tegemist uneapnoega.</p>
            <p><strong>Uneapnoe riskifaktorid:</strong> Ülekaal, vanusk >40, meessoost, ninakinnisus.</p>
            <p><strong>Sümptomid:</strong> Väsimus päeval, peavalu hommikul, kontsentratsioonihäired.</p>
            <p><strong>VAJALIK:</strong> Arsti konsultatsioon + uneuurring (polüsomnograafia).</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Sleep_apnea" target="_blank">Wikipedia: Sleep Apnea</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4549693/" target="_blank">NCBI: Obstructive Sleep Apnea</a></li>
            </ul>
        `
    },

    'norskamine_joomaastmest': {
        title: 'Norskamine (sõltub joomaastmest)',
        shortInfo: 'Norskamine süveneb alkoholi tarbimise korral.',
        ourInfo: `
            <h4>Norskamine ja alkohol</h4>
            <p><strong>Mehhanism:</strong> Alkohol lõdvestab kurgu lihaseid, suurendades norskamist ja uneapnoe riski.</p>
            <p><strong>Soovitus:</strong> Väldi alkoholi 3-4 tundi enne magamaminekut.</p>
            <p><strong>Alternatiivid:</strong> Melatoniin (0.5-3mg), magneesium (200-400mg), hibiskustee (rahustav).</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2845906/" target="_blank">NCBI: Alcohol and Sleep Apnea</a></li>
            </ul>
        `
    },

    'unenaod_puuduvad': {
        title: 'Unenäod puuduvad',
        shortInfo: 'Unenägusid ei mäleta või neid ei esine.',
        ourInfo: `
            <h4>Unenägude puudumine</h4>
            <p><strong>Põhjused:</strong> REM-une häired, stress, ravimid (beta-blokaatorid, SSRI'd), alkohol.</p>
            <p><strong>Normaalne:</strong> Paljud inimesed ei mäleta unenägusid (ei tähenda halba und).</p>
            <p><strong>Kui muret tekitab:</strong> Konsulteeri arstiga, eriti kui kaasneb väsimus või meeleoluhäired.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Dream" target="_blank">Wikipedia: Dream</a></li>
            </ul>
        `
    },

    'unenaod_tavalised': {
        title: 'Tavalised unenäod',
        shortInfo: 'Normaalsed, neutraalsed unenäod.',
        ourInfo: `
            <h4>Tavalised unenäod</h4>
            <p><strong>Mis see on:</strong> Normaalne REM-une osa, ajutegevus une ajal.</p>
            <p><strong>Funktsioon:</strong> Mälestuste töötlemine, emotsioonide reguleerimine, õppimine.</p>
            <p><strong>Tervis:</strong> Korrapärased unenäod on tervise märk.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3491655/" target="_blank">NCBI: Function of Dreams</a></li>
            </ul>
        `
    },

    'painajad_harv': {
        title: 'Painajad (harv)',
        shortInfo: 'Harvad painajad - tavaliselt põhjustatud stressist või toitumisest.',
        ourInfo: `
            <h4>Painajad - harv</h4>
            <p><strong>Levinud põhjused:</strong> Stress, ärevus, raske toit enne und, alkohol.</p>
            <p><strong>Soovitused:</strong></p>
            <ul>
                <li>Väldi rasket toitu 2-3h enne und</li>
                <li>Vähenda ekraaniaega õhtuti</li>
                <li>Rahustav rutiin (tee, lugemine, hingamine)</li>
                <li>Magneesium (200-400mg õhtul)</li>
            </ul>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Nightmare" target="_blank">Wikipedia: Nightmare</a></li>
            </ul>
        `
    },

    'painajad_sage': {
        title: 'Painajad (sage)',
        shortInfo: 'Sagedased painajad - võib viidata PTSD-le, ärevusele või ravimite kõrvalmõjule.',
        ourInfo: `
            <h4>Painajad - sage (OLULINE)</h4>
            <p><strong>HOIATUS:</strong> Sagedased painajad (>1x nädalas) võivad viidata:</p>
            <ul>
                <li>PTSD (post-traumaatiline stressihäire)</li>
                <li>Ärevushäire, depressioon</li>
                <li>Ravimite kõrvalmõjud (SSRI'd, beta-blokaatorid)</li>
                <li>Uneapnoe (hapnikupuudus)</li>
            </ul>
            <p><strong>VAJALIK:</strong> Psühholoogi/psühhiaatri konsultatsioon.</p>
            <p><strong>Ravi:</strong> Imagery Rehearsal Therapy (IRT), CBT, ravimid (prazosin PTSD korral).</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5078511/" target="_blank">NCBI: Nightmare Disorder</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4400203/" target="_blank">NCBI: Treatment of Nightmares</a></li>
            </ul>
        `
    },

    'obe': {
        title: 'Kehaväline kogemus (OBE)',
        shortInfo: 'Out-of-body experience - kogemus kehast väljumisest. (belief)',
        ourInfo: `
            <h4>Kehaväline kogemus (OBE) - BELIEF</h4>
            <p><strong>Mis see on:</strong> Subjektiivne kogemus, kus inimene tunneb, et vaatleb oma keha väljastpoolt.</p>
            <p><strong>Teaduslik seletatus:</strong> Ajutegevuse muutus (ajukoore stimulatsioon, vähi ajuosa), unehalvatus, meditatsio on.</p>
            <p><strong>Spirituaalne vaade:</strong> Mõned usundid peavad seda hinge rändamiseks astraalplaanile.</p>
            <p><strong>MEIE SEISUKOHT:</strong> See on belief-väli. Kaasame infot, kuid meditsiinipersonalile ei kajastata vaikimisi.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Out-of-body_experience" target="_blank">Wikipedia: Out-of-body experience</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4217543/" target="_blank">NCBI: Neuroscience of OBEs</a></li>
            </ul>
        `
    },

    'prohvetlik': {
        title: 'Prohvetlikud unenäod',
        shortInfo: 'Unenäod, mis ennustavad tulevikku. (belief)',
        ourInfo: `
            <h4>Prohvetlikud unenäod - BELIEF</h4>
            <p><strong>Mis see on:</strong> Unenäod, mida inimene tõlgendab tuleviku ennustamisena.</p>
            <p><strong>Teaduslik seletatus:</strong> Psühholoogiline nähtus (confirmation bias, selektiivne mälu), mitte tegelik tuleviku nägemine.</p>
            <p><strong>Spirituaalne vaade:</strong> Paljud kultuurid usuvad, et unenäod võivad näidata tulevikku või hoiatada ohtude eest.</p>
            <p><strong>MEIE SEISUKOHT:</strong> Belief-väli. Info on olemas, kuid meditsiinipersonalile ei kajastata.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Precognition" target="_blank">Wikipedia: Precognition</a></li>
            </ul>
        `
    },

    'samani_rannak': {
        title: 'Šamaani rännak',
        shortInfo: 'Šamanistlik praktika, mis hõlmab vaimset reisi teispoolsusesse. (belief)',
        ourInfo: `
            <h4>Šamaani rännak - BELIEF</h4>
            <p><strong>Mis see on:</strong> Šamanistlik praktika, kus šamaan siseneb transsiseisundisse ja "rändab" vaimsesse maailma.</p>
            <p><strong>Meetodid:</strong> Trummi rütm, laul, meditatsioon, mõnikord entogeenid (ayahuasca, peyote).</p>
            <p><strong>Teaduslik seletatus:</strong> Muutunud teadvuseseisund, ajutegevuse muutus (theta-lained).</p>
            <p><strong>MEIE SEISUKOHT:</strong> Belief-väli. Šamanism on kultuuriline/spirituaalne praktika. Ei kajastata meditsiinipersonalile vaikimisi.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Shamanism" target="_blank">Wikipedia: Shamanism</a></li>
                <li><a href="https://en.wikipedia.org/wiki/Shamanic_journeying" target="_blank">Wikipedia: Shamanic Journeying</a></li>
            </ul>
        `
    },

    'muu_paranormaalne': {
        title: 'Muu spirituaalne kogemus',
        shortInfo: 'Muud spirituaalsed või paranormaalsed kogemused une ajal. (belief)',
        ourInfo: `
            <h4>Muud spirituaalsed kogemused - BELIEF</h4>
            <p><strong>Näited:</strong> Kohtumised lahkunud hingedega, inglitega, vaimsed sõnumid, telepaafia unes.</p>
            <p><strong>Teaduslik seletatus:</strong> REM-une omapära, ajutegevuse muutused, psühholoogilised mehhanismid.</p>
            <p><strong>MEIE SEISUKOHT:</strong> Belief-väli. Kaasame infot, kuid meditsiinipersonalile ei kajastata vaikimisi.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Paranormal" target="_blank">Wikipedia: Paranormal</a></li>
            </ul>
        `
    },

    // ============================================
    // PRIVAATSUS JA NÕUSOLEK (27 KIRJET)
    // ============================================

    // JAGAMISE TASE (10 kirjet)
    'arst': {
        title: 'Jagamine arstiga',
        shortInfo: 'Meditsiiniline konsultatsioon koos täisprofiili jagamisega.',
        ourInfo: `
            <h4>Jagamine arstiga</h4>
            <p><strong>Mis see on:</strong> Perearstile või spetsialistile esitatav täisprofiil.</p>
            <p><strong>Hõlmab:</strong> Kaebused, ajalugu, ravimid, allergiad, riskitegurid, elustiil.</p>
            <p><strong>OLULINE:</strong> Belief-väljad jäetakse vaikimisi välja (eraldi valik vajalik).</p>
            <p><strong>Privaatsus:</strong> Arst on ametisaladuse kandja. Teie andmed on kaitstud.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.riigiteataja.ee/akt/128122010011" target="_blank">Ravimiseadus (Eesti)</a></li>
                <li><a href="https://en.wikipedia.org/wiki/Medical_confidentiality" target="_blank">Wikipedia: Medical confidentiality</a></li>
            </ul>
        `
    },

    'ai_arst': {
        title: 'Jagamine AI-arstiga',
        shortInfo: 'Tehisintellekti põhine konsultatsioon (ChatGPT, Claude, Gemini jne).',
        ourInfo: `
            <h4>AI-arst konsultatsioon</h4>
            <p><strong>Mis see on:</strong> Large Language Model (LLM) põhine meditsiiniline nõustamine.</p>
            <p><strong>Populaarsed AI-d:</strong> ChatGPT-4, Claude Sonnet, Google Gemini, Perplexity.</p>
            <p><strong>OLULINE:</strong> AI ei asenda arsti! Kasuta alati koos arsti järelevalvega.</p>
            <p><strong>Privaatsus:</strong> Kontrolli AI teenuse privaatsuspoliitikat. Mõned LLM-id salvestavad andmeid.</p>
            <p><strong>Soovitus:</strong> Kasuta lokaalseid AI-mudeleid (Llama, Mistral) tundlike andmete puhul.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.nature.com/articles/s41591-023-02448-8" target="_blank">Nature Medicine: AI in clinical practice (2023)</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10261409/" target="_blank">NCBI: Large language models in medicine</a></li>
            </ul>
        `
    },

    'ai_test': {
        title: 'AI testimiseks',
        shortInfo: 'Jagamine AI süsteemide testimiseks ja arendamiseks.',
        ourInfo: `
            <h4>AI testimine ja arendus</h4>
            <p><strong>Mis see on:</strong> Andmete jagamine AI mudelite treenimiseks või testimiseks.</p>
            <p><strong>HOIATUS:</strong> Ära jaga tundlikke andmeid avalikesse testidesse!</p>
            <p><strong>Soovitus:</strong> Kasuta anonümiseeritud või pseudonümiseeritud andmeid.</p>
            <p><strong>GDPR:</strong> Kontrolli, et andmeid kasutatakse kooskõlas GDPR-ga.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://gdpr.eu/" target="_blank">GDPR info (English)</a></li>
                <li><a href="https://www.ema.europa.eu/en/about-us/how-we-work/big-data" target="_blank">EMA: Big data and AI</a></li>
            </ul>
        `
    },

    'pere_liige': {
        title: 'Jagamine pereliikmetega',
        shortInfo: 'Profiili jagamine abikaasa, laste või vanemate jaoks.',
        ourInfo: `
            <h4>Jagamine pereliikmetega</h4>
            <p><strong>Mis see on:</strong> Oma terviseinfo jagamine lähedastega.</p>
            <p><strong>Kasulik:</strong> Eakate hooldamine, laste tervis, partneri tugi kroonilise haiguse korral.</p>
            <p><strong>OLULINE:</strong> Sinu otsus, mida jagad. Ära tunneta survet!</p>
            <p><strong>Soovitus:</strong> Jaga ainult olulist infot (ravimid, allergiad, riskid).</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6371135/" target="_blank">NCBI: Family health information sharing</a></li>
            </ul>
        `
    },

    'anon_uurija': {
        title: 'Anonüümne uurija',
        shortInfo: 'Teaduslik uurimistöö - andmed anonümiseeritakse.',
        ourInfo: `
            <h4>Anonüümne uurimistöö</h4>
            <p><strong>Mis see on:</strong> Teadusuuringutes osalemine ilma isikuandmeteta.</p>
            <p><strong>Anonümiseerimine:</strong> Kõik identifitseerivad andmed eemaldatakse (nimi, isikukood, aadress).</p>
            <p><strong>OLULINE:</strong> Küsi uuringu eetikakomitee kinnitust!</p>
            <p><strong>Soovitus:</strong> Loe informeeritud nõusolekut tähelepanelikult.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3168648/" target="_blank">NCBI: Data anonymization methods</a></li>
                <li><a href="https://ec.europa.eu/info/law/law-topic/data-protection_en" target="_blank">EU Data Protection</a></li>
            </ul>
        `
    },

    'avalik_osint': {
        title: 'Avalik OSINT',
        shortInfo: 'Open-source intelligence - avalikult kättesaadavad andmed.',
        ourInfo: `
            <h4>Avalik OSINT (Open-Source Intelligence)</h4>
            <p><strong>Mis see on:</strong> Andmete avaldamine avalikult (nt blogid, foorumid, sotsiaalmeedia).</p>
            <p><strong>HOIATUS:</strong> Kord avaldatud andmeid ei saa tagasi võtta!</p>
            <p><strong>RISK:</strong> Identifitseerimine, stigma, diskrimineerimine töökohal või kindlustuses.</p>
            <p><strong>SOOVITUS:</strong> ÄRA jaga tundlikke meditsiinilisi andmeid avalikult!</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Open-source_intelligence" target="_blank">Wikipedia: OSINT</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5977668/" target="_blank">NCBI: Social media and health privacy</a></li>
            </ul>
        `
    },

    'med_test': {
        title: 'Meditsiinilised testid',
        shortInfo: 'Andmete jagamine meditsiiniliste testide/uuringute jaoks.',
        ourInfo: `
            <h4>Meditsiinilised testid ja uuringud</h4>
            <p><strong>Mis see on:</strong> Kliinilised uuringud, diagnostilised testid, farmakoloogilised uuringud.</p>
            <p><strong>OLULINE:</strong> Kontrolli uuringu protokolli ja eetikakomitee kinnitust.</p>
            <p><strong>Nõusolek:</strong> Pead allkirjastama informeeritud nõusoleku.</p>
            <p><strong>Õigused:</strong> Saad igal ajal uuringust loobuda.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ema.europa.eu/en/human-regulatory/research-development/clinical-trials" target="_blank">EMA: Clinical trials</a></li>
                <li><a href="https://clinicaltrials.gov/" target="_blank">ClinicalTrials.gov (USA)</a></li>
            </ul>
        `
    },

    'politsei': {
        title: 'Politsei',
        shortInfo: 'Andmete jagamine õiguskaitseorganitele (erandlik!).',
        ourInfo: `
            <h4>Politsei ja õiguskaitse</h4>
            <p><strong>HOIATUS:</strong> Ära jaga meditsiinilisi andmeid politseile ilma õigusliku aluseta!</p>
            <p><strong>Seaduslik alus:</strong> Kohtuotsus, prokuratuuri nõue, erakorraline olukord (elu päästmine).</p>
            <p><strong>Ametisaladus:</strong> Arst ei tohi jagada andmeid ilma sinu nõusolekuta, välja arvatud seaduses sätestatud juhtudel.</p>
            <p><strong>Soovitus:</strong> Konsulteeri juristiga enne andmete jagamist.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.riigiteataja.ee/akt/128122010011" target="_blank">Ravimiseadus § 30 (Eesti)</a></li>
            </ul>
        `
    },

    'sojatootaja': {
        title: 'Sõjaväe tööandja',
        shortInfo: 'Meditsiinilise profiili jagamine sõjaväe/kaitseväe töötervise teenistusega.',
        ourInfo: `
            <h4>Sõjaväe tööandja ja töötervishoid</h4>
            <p><strong>Mis see on:</strong> Terviseinfo jagamine Kaitseväe või NATO töötervise teenistusega.</p>
            <p><strong>Kohustuslik:</strong> Teatud ametikohtadel (lennundus, allveeteenistus, eriüksused).</p>
            <p><strong>Hõlmab:</strong> Füüsiline võimekus, vaimne tervis, vaktsineerimised, riskitegurid.</p>
            <p><strong>OLULINE:</strong> Teatud diagnoosid võivad välistada teenistuse (epilepsia, raskemad psühhiaatrilised häired).</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.kaitsevagi.ee/" target="_blank">Kaitsevägi (Eesti)</a></li>
                <li><a href="https://www.nato.int/cps/en/natohq/topics_49168.htm" target="_blank">NATO: Medical support</a></li>
            </ul>
        `
    },

    'jumalale': {
        title: 'Jumalale / Kõrgemale jõule (belief)',
        shortInfo: 'Spirituaalne jagamine - palve, rituaal, usund. (belief)',
        ourInfo: `
            <h4>Jumalale / Kõrgemale jõule - BELIEF</h4>
            <p><strong>Mis see on:</strong> Spirituaalne või usuline praktika, kus tervisemure jagatakse palves või rituaalis.</p>
            <p><strong>Multireligioosne:</strong> Kristlus, islam, judaism, budism, hinduism, maausulised traditsioonid.</p>
            <p><strong>MEIE SEISUKOHT:</strong> See on belief-väli. Austame erinevaid usundeid ja spirituaalseid praktikaid.</p>
            <p><strong>OLULINE:</strong> Palve ja rituaalid EI ASENDA meditsiinilist ravi! Kasuta alati koos arsti nõuannetega.</p>
            <p><strong>Info:</strong> Vajuta "+" nupule "Palve" või "Rituaal" jaoks, et lisada konkreetne praktika.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2802370/" target="_blank">NCBI: Prayer and health outcomes</a></li>
                <li><a href="https://en.wikipedia.org/wiki/Faith_healing" target="_blank">Wikipedia: Faith healing</a></li>
            </ul>
        `
    },

    // NÕUSOLEK (7 kirjet)
    'consent_measurements': {
        title: 'Nõusolek: Kodused mõõtmised',
        shortInfo: 'Nõustumine koduste mõõtmiste jagamisega (vererõhk, kaal, pulsisagedus jne).',
        ourInfo: `
            <h4>Nõusolek koduste mõõtmiste jagamiseks</h4>
            <p><strong>Mis see on:</strong> Nõustumine, et jagad oma koduseid mõõtmisi (vererõhk, glükoos, kaal, saturatsioon jne).</p>
            <p><strong>Kasulik:</strong> Krooniliste haiguste jälgimine (hüpertensioon, diabeet, südamepuudulikkus).</p>
            <p><strong>Privaatsus:</strong> Andmed võivad olla salvestatud nutiseadmetes (Apple Health, Google Fit jne).</p>
            <p><strong>Soovitus:</strong> Jaga ainult usaldusväärsetele allikatele (arst, perekond).</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6352086/" target="_blank">NCBI: Home monitoring and chronic disease</a></li>
            </ul>
        `
    },

    'consent_herbs': {
        title: 'Nõusolek: Taimravi',
        shortInfo: 'Nõustumine taimravimite ja looduslike meetodite jagamisega.',
        ourInfo: `
            <h4>Nõusolek taimravi jagamiseks</h4>
            <p><strong>Mis see on:</strong> Nõustumine, et jagad oma taimravimite ja looduslike meetodite kasutust.</p>
            <p><strong>OLULINE:</strong> Taimravimitel on koostoimed! Arst peab teadma, mida kasutad.</p>
            <p><strong>Näited:</strong> Naistepuna (koostoime antikoagulantidega), ginkgo (veritsusrisk), johanneserohi (vähendab paljude ravimite toimet).</p>
            <p><strong>Soovitus:</strong> Jaga alati arstile, eriti enne operatsioone või uute ravimite alustamist.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3875280/" target="_blank">NCBI: Herb-drug interactions</a></li>
                <li><a href="https://nccih.nih.gov/health/herbsataglance.htm" target="_blank">NCCIH: Herbs at a glance</a></li>
            </ul>
        `
    },

    'consent_breathing': {
        title: 'Nõusolek: Hingamisharjutused',
        shortInfo: 'Nõustumine hingamisharjutuste ja praktikate jagamisega.',
        ourInfo: `
            <h4>Nõusolek hingamisharjutuste jagamiseks</h4>
            <p><strong>Mis see on:</strong> Nõustumine, et jagad oma hingamisharjutuste praktikat (Wim Hof, pranayama, buteyko jne).</p>
            <p><strong>Kasulik:</strong> Ärevuse vähendamine, une parandamine, stressijuhtimine.</p>
            <p><strong>HOIATUS:</strong> Mõned hingamisharjutused (nt Wim Hof hyperventilation) võivad põhjustada pearinglust või minestamist.</p>
            <p><strong>Soovitus:</strong> Ära tee intensiivseid hingamisharjutusi ilma juhendajata.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/" target="_blank">NCBI: Breathing exercises and stress</a></li>
                <li><a href="https://www.wimhofmethod.com/" target="_blank">Wim Hof Method</a></li>
            </ul>
        `
    },

    'kutsu_koju_arsti': {
        title: 'Kutsu koju arsti',
        shortInfo: 'Nõustumine koduvisiidi tegemiseks (perearst või eriarst).',
        ourInfo: `
            <h4>Koduvisiit - arsti kutsumine koju</h4>
            <p><strong>Mis see on:</strong> Arsti koduvisiit patsiendi juurde (eakad, liikumispuudega, raskelt haiged).</p>
            <p><strong>Teenus:</strong> Paljud perearstid pakuvad koduvisiiti (eriti COVID-19 pandeemia järel).</p>
            <p><strong>Kasulik:</strong> Eakad, liikumispuudega, palavik + nõrkus, palavik vastsündinutel.</p>
            <p><strong>Soovitus:</strong> Helista enne perearsti registratuuri ja küsi koduvisiidi võimalust.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.haigekassa.ee/inimesele/tervishoiuteenused" target="_blank">Haigekassa: Tervishoiuteenused</a></li>
            </ul>
        `
    },

    'palve': {
        title: 'Palve (belief)',
        shortInfo: 'Usuline või spirituaalne palve tervenemise või abi saamiseks. (belief)',
        ourInfo: `
            <h4>Palve - BELIEF</h4>
            <p><strong>Mis see on:</strong> Usuline või spirituaalne praktika, kus palutakse Jumalat / kõrgemat jõudu / universumit abi või tervenemise eest.</p>
            <p><strong>Multireligioosne:</strong></p>
            <ul>
                <li><strong>Kristlus:</strong> Palve Jumalale, pühakutele (Maarja, Peetrus jne)</li>
                <li><strong>Islam:</strong> Dua (palve Allahile)</li>
                <li><strong>Judaism:</strong> Tefillah</li>
                <li><strong>Hinduism:</strong> Puja, mantra</li>
                <li><strong>Budism:</strong> Meditatsioon, mantra</li>
                <li><strong>Maausulised:</strong> Palve loodusele, eellastele, vaimudele</li>
            </ul>
            <p><strong>MEIE SEISUKOHT:</strong> Austame kõiki usundeid ja spirituaalseid praktikaid.</p>
            <p><strong>OLULINE:</strong> Palve EI ASENDA meditsiinilist ravi!</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2802370/" target="_blank">NCBI: Prayer and health outcomes</a></li>
                <li><a href="https://en.wikipedia.org/wiki/Intercessory_prayer" target="_blank">Wikipedia: Intercessory prayer</a></li>
            </ul>
        `
    },

    'rituaal': {
        title: 'Rituaal (belief)',
        shortInfo: 'Usuline või spirituaalne rituaal tervenemise või kaitse eesmärgil. (belief)',
        ourInfo: `
            <h4>Rituaal - BELIEF</h4>
            <p><strong>Mis see on:</strong> Usuline või spirituaalne tseremoonia, mis on suunatud tervenemisele, kaitsele või puhastusele.</p>
            <p><strong>Näited:</strong></p>
            <ul>
                <li><strong>Kristlus:</strong> Haigete salvamine, ristimärgid, palverännakud</li>
                <li><strong>Maausulised:</strong> Suitsurituaalid (salvei, sandalipuu), rauaritualid</li>
                <li><strong>Slaavi:</strong> Vannitusrituaalid, hõõrumine kasevihtadega</li>
                <li><strong>Šamanism:</strong> Šamaani rännak, trumming, entogeenide kasutus (ayahuasca jne)</li>
                <li><strong>New Age:</strong> Kristallide kasutamine, Reiki, energeetiline puhastus</li>
            </ul>
            <p><strong>MEIE SEISUKOHT:</strong> See on belief-väli. Austame erinevaid traditsioone.</p>
            <p><strong>HOIATUS:</strong> Rituaalid EI ASENDA meditsiinilist ravi!</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://en.wikipedia.org/wiki/Healing_ritual" target="_blank">Wikipedia: Healing ritual</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4249681/" target="_blank">NCBI: Traditional healing practices</a></li>
            </ul>
        `
    },

    'kutsun_koju_new_age': {
        title: 'Kutsu koju New Age praktik (belief)',
        shortInfo: 'Alternatiivse tervishoiu praktiku kutsumine koju (Reiki, kristallid, bioenergia jne). (belief)',
        ourInfo: `
            <h4>New Age praktik koduvisiit - BELIEF</h4>
            <p><strong>Mis see on:</strong> Alternatiivse tervishoiu praktiku kutsumine koju (energeetiline ravi, Reiki, kristallravi, aura puhastus jne).</p>
            <p><strong>HOIATUS:</strong> Need praktikad EI OLE teaduslikult tõestatud!</p>
            <p><strong>RISK:</strong> Võib viivitada meditsiinilise ravi alustamist. Osad praktikud on ebakompetentsed või petavad kliente.</p>
            <p><strong>MEIE SEISUKOHT:</strong> See on belief-väli. Kui valid seda teed, tee seda koos meditsiinilise raviga (mitte asendusena!).</p>
            <p><strong>Soovitus:</strong> Kontrolli praktiku kvalifikatsiooni ja arvustusi.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3068720/" target="_blank">NCBI: Complementary and alternative medicine</a></li>
                <li><a href="https://en.wikipedia.org/wiki/New_Age" target="_blank">Wikipedia: New Age</a></li>
            </ul>
        `
    },

    // EI JAGATA (11 kirjet)
    'no_kodu_olukord': {
        title: 'Ei jagata: Kodu olukord',
        shortInfo: 'Ei soovi jagada koduolukorra infot (elamistingimused, ruumikitsikus, ebahügieeniline jne).',
        ourInfo: `
            <h4>Ei jagata: Kodu olukord</h4>
            <p><strong>Mis see on:</strong> Info koduse olukorra kohta (elamistingimused, ruumikitsikus, niiskus, hallitus, ebahügieeniline keskkond).</p>
            <p><strong>Miks oluline:</strong> Koduolukord mõjutab tervist (astma, allergia, nakkushaigused, vaimne tervis).</p>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA, kui tunned, et see on liiga isiklik või piinlik.</p>
            <p><strong>OLULINE:</strong> Arst ei mõista sind, kui sa ei jaga. Arst ei kohtuõigusta, tema ülesanne on aidata!</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4025465/" target="_blank">NCBI: Housing and health</a></li>
            </ul>
        `
    },

    'no_kodu_vagivald': {
        title: 'Ei jagata: Koduvägivald',
        shortInfo: 'Ei soovi jagada infot koduvägivalla, ahistamise või ahistava keskkonna kohta.',
        ourInfo: `
            <h4>Ei jagata: Koduvägivald - OLULINE!</h4>
            <p><strong>HOIATUS:</strong> Koduvägivald on tõsine probleem. Arst saab sind aidata!</p>
            <p><strong>Privaatsus:</strong> Arst on ametisaladuse kandja. Ta EI räägi seda kellelegi (välja arvatud eluohtliku olukorra puhul).</p>
            <p><strong>ABI:</strong></p>
            <ul>
                <li><strong>Naiste tugitelefonid:</strong> 1492 (Eesti), 112 (hädaabi)</li>
                <li><strong>Politsei:</strong> 112</li>
                <li><strong>Sotsiaaltöötaja:</strong> Kohalik omavalitsus</li>
            </ul>
            <p><strong>OLULINE:</strong> Sa ei ole üksi! Abi on olemas!</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.sm.ee/koduvagivallaohvrite-aitamine" target="_blank">Sotsiaalministeerium: Koduvägivalla ohvrite aitamine</a></li>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2573966/" target="_blank">NCBI: Domestic violence and health</a></li>
            </ul>
        `
    },

    'no_sotsiaal': {
        title: 'Ei jagata: Sotsiaalne olukord',
        shortInfo: 'Ei soovi jagada infot sotsiaalse isolatsiooni, üksindustunde, suhete probleemide kohta.',
        ourInfo: `
            <h4>Ei jagata: Sotsiaalne olukord</h4>
            <p><strong>Mis see on:</strong> Info sotsiaalse isolatsiooni, üksindustunde, suhete probleemide, perekonna konfliktide kohta.</p>
            <p><strong>Miks oluline:</strong> Sotsiaalne isolatsioon suurendab depressiooni, ärevuse, südamehaiguste riski.</p>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA, kui tunned, et see on liiga isiklik.</p>
            <p><strong>OLULINE:</strong> Arst ei kohtuõigusta! Tema eesmärk on aidata, mitte hinnata.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3874845/" target="_blank">NCBI: Social isolation and health</a></li>
            </ul>
        `
    },

    'no_finants': {
        title: 'Ei jagata: Finantsolukord',
        shortInfo: 'Ei soovi jagada infot finantsolukorra, sissetulekute, vaesuse kohta.',
        ourInfo: `
            <h4>Ei jagata: Finantsolukord</h4>
            <p><strong>Mis see on:</strong> Info sissetulekute, vaesuse, võlgade, finantsstress'i kohta.</p>
            <p><strong>Miks oluline:</strong> Finantsstress mõjutab vaimset tervist ja ravimite ostuvõimet.</p>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA.</p>
            <p><strong>OLULINE:</strong> Arst ei küsi seda, et kohtuõigustada! Ta peab teadma, kas sul on raha ravimite ostmiseks. Odavamaid alternatiive on saadaval!</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5798257/" target="_blank">NCBI: Financial stress and health</a></li>
            </ul>
        `
    },

    'no_vaimne': {
        title: 'Ei jagata: Vaimne olukord',
        shortInfo: 'Ei soovi jagada infot vaimse tervise, ärevuse, depressiooni, emotsionaalsete probleemide kohta.',
        ourInfo: `
            <h4>Ei jagata: Vaimne olukord</h4>
            <p><strong>Mis see on:</strong> Info vaimse tervise, ärevuse, depressiooni, emotsionaalsete probleemide kohta.</p>
            <p><strong>HOIATUS:</strong> Vaimne tervis on sama oluline kui füüsiline tervis!</p>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA, kuid see võib piirata arsti võimet sind aidata.</p>
            <p><strong>OLULINE:</strong> Arst on ametisaladuse kandja. Ta ei räägi seda kellelegi!</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response" target="_blank">WHO: Mental health</a></li>
            </ul>
        `
    },

    'no_psyhh': {
        title: 'Ei jagata: Psühhiaatriline olukord',
        shortInfo: 'Ei soovi jagada infot psühhiaatriliste diagnoosid, ravimite, hospitaliseerimine kohta.',
        ourInfo: `
            <h4>Ei jagata: Psühhiaatriline olukord</h4>
            <p><strong>Mis see on:</strong> Info psühhiaatriliste diagnoosid (bipolaarne häire, skisofreen, PTSD jne), ravimite, hospitaliseerimine kohta.</p>
            <p><strong>HOIATUS:</strong> Psühhiaatrilised ravimid võivad olla elu päästev! Ära peida seda infot arstilt!</p>
            <p><strong>KOOSTOIMED:</strong> Psühhiaatrilised ravimid (SSRI, antipsühhootikumid) on koostoimetes paljude teiste ravimitega.</p>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA, kuid see suurendab riskide võimalust.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3736944/" target="_blank">NCBI: Psychiatric medication interactions</a></li>
            </ul>
        `
    },

    'no_puue': {
        title: 'Ei jagata: Puue',
        shortInfo: 'Ei soovi jagada infot puude, liikumispuude, nägemis- või kuulmispuude kohta.',
        ourInfo: `
            <h4>Ei jagata: Puue</h4>
            <p><strong>Mis see on:</strong> Info puude, liikumispuude, nägemis- või kuulmispuude kohta.</p>
            <p><strong>Miks oluline:</strong> Puue mõjutab ravimite manustamist (nt suukaudsed ravimid vs plastrid), füüsilist aktiivsust, rehabilitatsiooni.</p>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA.</p>
            <p><strong>OLULINE:</strong> Arst peab teadma, et kohandada ravi ja juhiseid.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.who.int/news-room/fact-sheets/detail/disability-and-health" target="_blank">WHO: Disability and health</a></li>
            </ul>
        `
    },

    'no_religioon': {
        title: 'Ei jagata: Religioon',
        shortInfo: 'Ei soovi jagada infot religioon, usund, spirituaalsed veendumused kohta.',
        ourInfo: `
            <h4>Ei jagata: Religioon ja usund</h4>
            <p><strong>Mis see on:</strong> Info religioon, usund, spirituaalsed veendumused kohta.</p>
            <p><strong>Miks oluline:</strong> Usundid võivad piirata ravimeetodeid (nt Jehoova tunnistajad ei akcepteeri veretransfusiooni).</p>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA.</p>
            <p><strong>OLULINE:</strong> Arst peab teadma, kas on usulisi piiranguid, et vältida konflikte.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4263906/" target="_blank">NCBI: Religion and healthcare</a></li>
            </ul>
        `
    },

    'no_eluharjumused': {
        title: 'Ei jagata: Eluharjumused',
        shortInfo: 'Ei soovi jagada infot eluharjumuste kohta (dieet, uni, füüsiline aktiivsus, stress jne).',
        ourInfo: `
            <h4>Ei jagata: Eluharjumused</h4>
            <p><strong>Mis see on:</strong> Info eluharjumuste kohta (dieet, uni, füüsiline aktiivsus, stress, töörütm jne).</p>
            <p><strong>Miks oluline:</strong> Eluharjumused mõjutavad tervise oluliselt (südamehaigused, diabeet, vaimne tervis).</p>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA.</p>
            <p><strong>OLULINE:</strong> Ilma selleta arst ei saa anda elustiilinõuandeid.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet" target="_blank">WHO: Healthy diet</a></li>
            </ul>
        `
    },

    'no_entogeenid': {
        title: 'Ei jagata: Entogeenide kasutus',
        shortInfo: 'Ei soovi jagada infot entogeenide (ayahuasca, psilotsübiin, mescaline jne) kasutuse kohta.',
        ourInfo: `
            <h4>Ei jagata: Entogeenide kasutus</h4>
            <p><strong>Mis see on:</strong> Entogeenid on psühhoaktiivsed ained, mida kasutatakse spirituaalsetes või terapeutilistes eesmärkides (ayahuasca, psilotsübiin, mescaline, ibogain jne).</p>
            <p><strong>HOIATUS:</strong> Entogeenid on enamasti illegaalsed! Eestis on need keelatud (välja arvatud teadusuuringud).</p>
            <p><strong>MEDITSIINILINE RISK:</strong> Koostoimed ravimitega (SSRI + DMT = serotoniini sündroom!), psühhoos, flashback'id.</p>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA, kuid see suurendab riskide võimalust.</p>
            <p><strong>OLULINE:</strong> Arst ei räägi politseile! Tema ülesanne on sind aidata, mitte karistada.</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6007659/" target="_blank">NCBI: Psychedelic therapy</a></li>
                <li><a href="https://en.wikipedia.org/wiki/Entheogen" target="_blank">Wikipedia: Entheogen</a></li>
            </ul>
        `
    },

    'no_soltuvusained': {
        title: 'Ei jagata: Sõltuvusained',
        shortInfo: 'Ei soovi jagada infot sõltuvusainete (alkohol, tubakas, kanep, CBD, kava, kratom, opioidid jne) kasutuse kohta.',
        ourInfo: `
            <h4>Ei jagata: Sõltuvusained</h4>
            <p><strong>Mis see on:</strong> Info sõltuvusainete kasutuse kohta (alkohol, tubakas, kanep, CBD, kava, kratom, opioidid, stimulandid jne).</p>
            <p><strong>HOIATUS:</strong> Sõltuvusained on koostoimetes paljude ravimitega!</p>
            <ul>
                <li><strong>Alkohol:</strong> Maksakoormus, koostoimed (metronidazool, varfariin jne)</li>
                <li><strong>Kanep/CBD:</strong> Koostoimed antikoagulantidega, sedatiivsed ravimid</li>
                <li><strong>Kava:</strong> Hepatotoksiline (maksahaigus!)</li>
                <li><strong>Kratom:</strong> Opioidne toime, sõltuvuse risk</li>
                <li><strong>Opioidid:</strong> Sõltuvuse risk, hingamise pärssiv toime</li>
            </ul>
            <p><strong>PRIVAATSUS:</strong> Võid valida selle info EI JAGATA, kuid see suurendab riskide võimalust.</p>
            <p><strong>OLULINE:</strong> Arst EI räägi politseile! Tema ülesanne on sind aidata!</p>
        `,
        externalInfo: `
            <p><strong>Lisalugemist:</strong></p>
            <ul>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4827335/" target="_blank">NCBI: Substance use and drug interactions</a></li>
                <li><a href="https://nida.nih.gov/" target="_blank">NIDA: National Institute on Drug Abuse (USA)</a></li>
            </ul>
        `
    }
};

// Ava info modal
function openInfoModal(itemKey) {
    const info = MED_INFO_DB[itemKey];
    if (!info) {
        console.error('Info not found for:', itemKey);
        return;
    }

    document.getElementById('infoModalTitle').textContent = info.title;
    document.getElementById('infoContent0').innerHTML = info.ourInfo;
    document.getElementById('infoContent1').innerHTML = info.externalInfo;

    const modal = document.getElementById('infoModal');
    modal.classList.add('active');

    // Reset tabs
    switchInfoTab(0);
}

// Sulge info modal
function closeInfoModal() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('active');
}

// Vaheta info modal tabs
function switchInfoTab(tabIndex) {
    // Remove active from all tabs and contents
    document.querySelectorAll('.info-modal-tab').forEach((tab, i) => {
        if (i === tabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    document.querySelectorAll('.info-tab-content').forEach((content, i) => {
        if (i === tabIndex) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Sulge modal kui klikatakse väljaspool
document.addEventListener('click', function(e) {
    const modal = document.getElementById('infoModal');
    if (e.target === modal) {
        closeInfoModal();
    }
});

// ESC key suleb modali
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeInfoModal();
    }
});

// Toggle inline info field
function toggleInlineInfo(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.toggle('active');
    }
}

// Quick add item counter
let quickAddCounters = {
    herb: 0,
    event: 0,
    allergy: 0,
    practice: 0
};

// Quick add herb
function quickAddHerb(herbKey, herbName) {
    quickAddCounters.herb++;
    const containerId = 'quickAddedHerbs';
    let container = document.getElementById(containerId);

    if (!container) {
        // Loo container kui ei eksisteeri
        const section = document.querySelector('#herbSection');
        if (!section) return;

        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        section.appendChild(container);
    }

    const itemId = `herb_quick_${quickAddCounters.herb}`;
    const fieldName = `herb_${herbKey}_${quickAddCounters.herb}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #f0fdf4; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #10b981;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #065f46; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${herbName}
                <span class="info-icon" onclick="openInfoModal('${herbKey}')">
                    i
                    <div class="info-popup">${MED_INFO_DB[herbKey]?.shortInfo || 'Info puudub'}</div>
                </span>
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #dc2626; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa info</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustused (annus, sagedus, mõju, jne)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: 500mg 2× päevas, parandab energiat..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${herbName} lisatud!`);
}

// Quick add event
function quickAddEvent(eventKey, eventName) {
    quickAddCounters.event++;
    const containerId = 'quickAddedEvents';
    let container = document.getElementById(containerId);

    if (!container) {
        const section = document.querySelector('#eventSection');
        if (!section) return;

        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        section.appendChild(container);
    }

    const itemId = `event_quick_${quickAddCounters.event}`;
    const fieldName = `event_${eventKey}_${quickAddCounters.event}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef2f2; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ef4444;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #991b1b; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${eventName}
                <span class="info-icon" onclick="openInfoModal('${eventKey}')">
                    i
                    <div class="info-popup">${MED_INFO_DB[eventKey]?.shortInfo || 'Info puudub'}</div>
                </span>
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #dc2626; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa info</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustused (kuupäev, põhjus, tulemus, jne)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: 15.01.2024, südamepuudulikkuse äge episood..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${eventName} lisatud!`);
}

// Quick add allergy
function quickAddAllergy(allergyKey, allergyName) {
    quickAddCounters.allergy++;
    const containerId = 'quickAddedAllergies';
    let container = document.getElementById(containerId);

    if (!container) {
        const section = document.querySelector('#allergySection');
        if (!section) return;

        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        section.appendChild(container);
    }

    const itemId = `allergy_quick_${quickAddCounters.allergy}`;
    const fieldName = `allergy_${allergyKey}_${quickAddCounters.allergy}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef3c7; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #f59e0b;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #92400e; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${allergyName}
                <span class="info-icon" onclick="openInfoModal('${allergyKey}')">
                    i
                    <div class="info-popup">${MED_INFO_DB[allergyKey]?.shortInfo || 'Info puudub'}</div>
                </span>
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #dc2626; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa info</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustused (reaktsioon, raskus, jne)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: Lööve, kerge sügelus..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${allergyName} lisatud!`);
}

// Quick add practice
function quickAddPractice(practiceKey, practiceName) {
    quickAddCounters.practice++;
    const containerId = 'quickAddedPractices';
    let container = document.getElementById(containerId);

    if (!container) {
        const section = document.querySelector('#practiceSection');
        if (!section) return;

        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        section.appendChild(container);
    }

    const itemId = `practice_quick_${quickAddCounters.practice}`;
    const fieldName = `practice_${practiceKey}_${quickAddCounters.practice}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #f0fdf4; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #22c55e;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #166534; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${practiceName}
                <span class="info-icon" onclick="openInfoModal('${practiceKey}')">
                    i
                    <div class="info-popup">${MED_INFO_DB[practiceKey]?.shortInfo || 'Info puudub'}</div>
                </span>
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #dc2626; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa info</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustused (sagedus, kestus, mõju, jne)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: 15 min iga hommik, aitab rahustuda..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${practiceName} lisatud!`);
}

// Quick add no-consent item
function quickAddNoConsent(key, name) {
    if (!quickAddCounters.noconsent) quickAddCounters.noconsent = 0;
    quickAddCounters.noconsent++;

    const containerId = 'quickAddedNoConsents';
    let container = document.getElementById(containerId);

    if (!container) {
        const section = document.querySelector('#no-consent-section');
        if (!section) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        section.appendChild(container);
    }

    const itemId = `noconsent_quick_${quickAddCounters.noconsent}`;
    const fieldName = `noConsent_${key}_${quickAddCounters.noconsent}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fee2e2; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #dc2626;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #991b1b; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #dc2626; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa põhjendus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Põhjendus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Miks keeldud..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} keeld lisatud!`);
}

// Quick add job type for exercise tolerance
function quickAddJobType(key, name) {
    if (!quickAddCounters.jobtype) quickAddCounters.jobtype = 0;
    quickAddCounters.jobtype++;

    const containerId = 'quickAddedJobTypes';
    let container = document.getElementById(containerId);

    if (!container) {
        const section = document.querySelector('.form-group:has([name="exerciseTolerance"])');
        if (!section) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        section.parentNode.insertBefore(container, section);
    }

    const itemId = `jobtype_quick_${quickAddCounters.jobtype}`;
    const fieldName = `jobType_${key}_${quickAddCounters.jobtype}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #dbeafe; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #3b82f6;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #1e40af; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: tööstaaž, vahetuste graafik..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud koormustaluvuse juurde!`);
}

// Quick select tool - for Tööriistad section
function selectTool(fieldName, paramsId) {
    // Find the "yes" radio button for this tool
    const yesRadio = document.querySelector(`input[name="${fieldName}"][value="yes"]`);
    if (yesRadio) {
        yesRadio.checked = true;
        // Trigger the onchange event to show params
        const event = new Event('change');
        yesRadio.dispatchEvent(event);
        showToast('Tööriist valitud!');
    }
}

// Select all three tools at once
function selectAllTools() {
    selectTool('bpMonitor', 'bpParams');
    selectTool('stepCounter', 'stepParams');
    selectTool('dailyWeight', 'weightParams');
    showToast('Kõik 3 tööriista valitud!');
}

// Quick add physical activity
function quickAddActivity(key, name) {
    if (!quickAddCounters.activity) quickAddCounters.activity = 0;
    quickAddCounters.activity++;

    const containerId = 'quickAddedActivities';
    let container = document.getElementById(containerId);

    if (!container) {
        const activityGroup = document.querySelector('.form-group:has([name="activity"])');
        if (!activityGroup) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        activityGroup.parentNode.insertBefore(container, activityGroup.nextSibling);
    }

    const itemId = `activity_quick_${quickAddCounters.activity}`;
    const fieldName = `activity_${key}_${quickAddCounters.activity}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #f0f9ff; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #0ea5e9;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #075985; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #0ea5e9; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Sagedus (x/nädal)</label>
                <input type="number" name="${fieldName}_frequency" min="1" max="7" placeholder="Nt: 3"
                       style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Kestus (min)</label>
                <input type="number" name="${fieldName}_duration" min="5" max="180" placeholder="Nt: 30"
                       style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>
        </div>
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: hommikul, grupitreening..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud!`);
}

// Quick add lifestyle factor
function quickAddLifestyle(key, name) {
    if (!quickAddCounters.lifestyle) quickAddCounters.lifestyle = 0;
    quickAddCounters.lifestyle++;

    const containerId = 'quickAddedLifestyle';
    let container = document.getElementById(containerId);

    if (!container) {
        const lifestyleGroup = document.querySelector('.form-group:has([name="rural"])');
        if (!lifestyleGroup) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        lifestyleGroup.parentNode.insertBefore(container, lifestyleGroup.nextSibling);
    }

    const itemId = `lifestyle_quick_${quickAddCounters.lifestyle}`;
    const fieldName = `lifestyle_${key}_${quickAddCounters.lifestyle}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef3c7; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #f59e0b;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #92400e; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #f59e0b; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: kui sageli, kui kaua..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud eluviisile!`);
}

// Quick add tea type (second level)
function quickAddTeaType(key, name) {
    if (!quickAddCounters.teatype) quickAddCounters.teatype = 0;
    quickAddCounters.teatype++;

    const containerId = 'quickAddedTeaTypes';
    let container = document.getElementById(containerId);

    if (!container) {
        // Find the tea section checkbox group
        const teaSection = document.querySelector('.form-group:has([name="teaGreen"])');
        if (!teaSection) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        teaSection.parentNode.insertBefore(container, teaSection.nextSibling);
    }

    const itemId = `teatype_quick_${quickAddCounters.teatype}`;
    const fieldName = `teaType_${key}_${quickAddCounters.teatype}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #ecfdf5; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #10b981;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #065f46; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #10b981; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Tassi päevas</label>
                <input type="number" name="${fieldName}_cups" min="1" max="10" placeholder="Nt: 2"
                       style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Aeg (hommik/õhtu)</label>
                <select name="${fieldName}_timing" style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
                    <option value="">Vali...</option>
                    <option value="morning">Hommik</option>
                    <option value="afternoon">Päev</option>
                    <option value="evening">Õhtu</option>
                    <option value="anytime">Kogu päev</option>
                </select>
            </div>
        </div>
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: brändi eelistused, valmistusviis..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud!`);
}

// Quick add dietary restriction
function quickAddRestriction(key, name) {
    if (!quickAddCounters.restriction) quickAddCounters.restriction = 0;
    quickAddCounters.restriction++;

    const containerId = 'quickAddedRestrictions';
    let container = document.getElementById(containerId);

    if (!container) {
        const restrictionGroup = document.querySelector('.form-group:has([name="restrictGluten"])');
        if (!restrictionGroup) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        restrictionGroup.parentNode.insertBefore(container, restrictionGroup.nextSibling);
    }

    const itemId = `restriction_quick_${quickAddCounters.restriction}`;
    const fieldName = `restriction_${key}_${quickAddCounters.restriction}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef2f2; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ef4444;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #991b1b; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Põhjus</label>
            <select name="${fieldName}_reason" style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
                <option value="">Vali põhjus...</option>
                <option value="medical">Meditsiiniline</option>
                <option value="allergy">Allergia</option>
                <option value="intolerance">Talumatus</option>
                <option value="preference">Eelistus</option>
                <option value="religious">Usundiline</option>
                <option value="ethical">Eetiline</option>
            </select>
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: raskusaste, alternatiivsed toidud..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud piirangutesse!`);
}

// Quick add access resource
function quickAddAccess(key, name) {
    if (!quickAddCounters.access) quickAddCounters.access = 0;
    quickAddCounters.access++;

    const containerId = 'quickAddedAccess';
    let container = document.getElementById(containerId);

    if (!container) {
        const accessGroup = document.querySelector('.form-group:has([name="accessHealthStore"])');
        if (!accessGroup) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        accessGroup.parentNode.insertBefore(container, accessGroup.nextSibling);
    }

    const itemId = `access_quick_${quickAddCounters.access}`;
    const fieldName = `access_${key}_${quickAddCounters.access}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #f0fdf4; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #22c55e;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #15803d; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #22c55e; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: asukoht, kaugus, kasutussagedus..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud ligipääsule!`);
}

// Quick add family risk
function quickAddFamilyRisk(key, name) {
    if (!quickAddCounters.familyrisk) quickAddCounters.familyrisk = 0;
    quickAddCounters.familyrisk++;

    const containerId = 'quickAddedFamilyRisks';
    let container = document.getElementById(containerId);

    if (!container) {
        const riskGroup = document.querySelector('.form-group:has([name="familyRisk"])');
        if (!riskGroup) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        riskGroup.parentNode.insertBefore(container, riskGroup.nextSibling);
    }

    const itemId = `familyrisk_quick_${quickAddCounters.familyrisk}`;
    const fieldName = `familyRisk_${key}_${quickAddCounters.familyrisk}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef3c7; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #f59e0b;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #92400e; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #f59e0b; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Kes</label>
                <select name="${fieldName}_who" style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
                    <option value="">Vali...</option>
                    <option value="mother">Ema</option>
                    <option value="father">Isa</option>
                    <option value="sibling">Õde/vend</option>
                    <option value="grandparent">Vanaisa/vanaema</option>
                </select>
            </div>
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Vanus</label>
                <input type="number" name="${fieldName}_age" min="1" max="100" placeholder="Nt: 58"
                       style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>
        </div>
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: täpsem diagnoos, tüsistused..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud perekondliku riskina!`);
}

// Quick add residence type
function quickAddResidence(key, name) {
    if (!quickAddCounters.residence) quickAddCounters.residence = 0;
    quickAddCounters.residence++;

    const containerId = 'quickAddedResidence';
    let container = document.getElementById(containerId);

    if (!container) {
        // Find the residence section
        const residenceGroup = document.querySelector('.form-group:has([name="residence"])');
        if (!residenceGroup) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        residenceGroup.parentNode.insertBefore(container, residenceGroup.nextSibling);
    }

    const itemId = `residence_quick_${quickAddCounters.residence}`;
    const fieldName = `residence_${key}_${quickAddCounters.residence}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef9c3; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #eab308;';
    itemDiv.id = itemId;

    // PAKETT 5: Kortermaja-spetsiifilised väljad
    let apartmentDetailsHTML = '';
    if (key === 'kortermajas') {
        apartmentDetailsHTML = `
        <div style="margin-left: 24px; margin-top: 10px; background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb;">
            <div style="margin-bottom: 12px;">
                <label style="display: block; font-weight: 600; color: #475569; margin-bottom: 6px;">Lift</label>
                <div style="display: flex; gap: 15px;">
                    <label style="font-weight: normal;">
                        <input type="radio" name="${fieldName}_lift" value="yes"> Jah, lift olemas
                    </label>
                    <label style="font-weight: normal;">
                        <input type="radio" name="${fieldName}_lift" value="no"> Ei, lifti pole
                    </label>
                </div>
            </div>

            <div style="margin-bottom: 12px;">
                <label style="display: block; font-weight: 600; color: #475569; margin-bottom: 6px;">
                    Korrus <span style="font-weight: normal; font-size: 0.85rem; color: #64748b;">(nt: "5" või "5/9")</span>
                </label>
                <input type="text" name="${fieldName}_floor" placeholder="Nt: 5 või 5/9 või 12/15"
                       style="width: 150px; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>

            <div style="margin-bottom: 12px;">
                <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" name="${fieldName}_topFloor" value="yes">
                    Olen ülemise korrusel (katus otse peal)
                </label>
            </div>

            <div style="margin-bottom: 12px;">
                <label style="font-weight: normal; display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" name="${fieldName}_preferStairs" value="yes">
                    Eelistan treppu (ka kui lift olemas)
                </label>
            </div>

            <div>
                <label style="display: block; font-weight: 600; color: #475569; margin-bottom: 6px;">
                    Täpsustus <span style="font-weight: normal; font-size: 0.85rem;">(rahulikkus, naabrid, muu)</span>
                </label>
                <textarea name="${fieldName}_notes" rows="2"
                          placeholder="Nt: rahulik piirkond, müratsevad naabrid, hea isolatsioon..."
                          style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; font-family: inherit;"></textarea>
            </div>
        </div>
        `;
    } else {
        apartmentDetailsHTML = `
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Lisa täpsustusi..."></textarea>
            </div>
        </div>
        `;
    }

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #713f12; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #eab308; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        ${apartmentDetailsHTML}
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud elupaika!`);
}

// Quick add mobility type (walking/transport)
function quickAddMobility(key, name) {
    if (!quickAddCounters.mobility) quickAddCounters.mobility = 0;
    quickAddCounters.mobility++;

    const containerId = 'quickAddedMobility';
    let container = document.getElementById(containerId);

    if (!container) {
        // Find the walking/mobility section
        const mobilityGroup = document.querySelector('.form-group:has([name="walkingDistance"])');
        if (!mobilityGroup) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        mobilityGroup.parentNode.insertBefore(container, mobilityGroup.nextSibling);
    }

    const itemId = `mobility_quick_${quickAddCounters.mobility}`;
    const fieldName = `mobility_${key}_${quickAddCounters.mobility}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #dbeafe; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #3b82f6;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #1e3a8a; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Distants (km)</label>
                <input type="number" name="${fieldName}_distance" min="0.1" max="100" step="0.1" placeholder="Nt: 2.5"
                       style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Sagedus (x/nädal)</label>
                <input type="number" name="${fieldName}_frequency" min="1" max="7" placeholder="Nt: 5"
                       style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>
        </div>
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: hommikul tööle, õhtul koju..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud liikumisviisi!`);
}

// Quick add complaint
function quickAddComplaint(key, name) {
    if (!quickAddCounters.complaint) quickAddCounters.complaint = 0;
    quickAddCounters.complaint++;

    const containerId = 'quickAddedComplaints';
    let container = document.getElementById(containerId);

    if (!container) {
        // Find the complaints section
        const complaintsSection = document.querySelector('.symptom-grid');
        if (!complaintsSection) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        complaintsSection.parentNode.insertBefore(container, complaintsSection.nextSibling);
    }

    const itemId = `complaint_quick_${quickAddCounters.complaint}`;
    const fieldName = `complaint_${key}_${quickAddCounters.complaint}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef2f2; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ef4444;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #991b1b; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Raskusaste (0-3)</label>
            <input type="number" name="${fieldName}_severity" min="0" max="3" value="0" placeholder="0=puudub, 1=kerge, 2=mõõdukas, 3=raske"
                   style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: sagedus, ajastus, mis aitab..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud kaebustesse!`);
}

// Quick add bath/sauna therapy
function quickAddBath(key, name) {
    if (!quickAddCounters.bath) quickAddCounters.bath = 0;
    quickAddCounters.bath++;

    const containerId = 'quickAddedBaths';
    let container = document.getElementById(containerId);

    if (!container) {
        // Find the bath section
        const bathGroup = document.querySelector('.form-group:has([name="bathFrequency"])');
        if (!bathGroup) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        bathGroup.parentNode.insertBefore(container, bathGroup.nextSibling);
    }

    const itemId = `bath_quick_${quickAddCounters.bath}`;
    const fieldName = `bath_${key}_${quickAddCounters.bath}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #e0f2fe; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #0284c7;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #075985; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #0284c7; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Sagedus (x/nädal)</label>
            <input type="number" name="${fieldName}_frequency" min="1" max="7" placeholder="Nt: 3"
                   style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
        </div>
        <div style="margin-left: 24px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: kestus, temperatuur, lisandid..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud!`);
}

// Quick add music therapy
function quickAddMusic(key, name) {
    if (!quickAddCounters.music) quickAddCounters.music = 0;
    quickAddCounters.music++;

    const containerId = 'quickAddedMusic';
    let container = document.getElementById(containerId);

    if (!container) {
        // Find the music section
        const musicGroup = document.querySelector('.form-group:has([name="calmingMusic"])');
        if (!musicGroup) return;
        container = document.createElement('div');
        container.id = containerId;
        container.style.marginTop = '15px';
        container.style.marginBottom = '15px';
        musicGroup.parentNode.insertBefore(container, musicGroup.nextSibling);
    }

    const itemId = `music_quick_${quickAddCounters.music}`;
    const fieldName = `music_${key}_${quickAddCounters.music}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #f3e8ff; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #9333ea;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #581c87; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #9333ea; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Sagedus</label>
                <select name="${fieldName}_frequency" style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
                    <option value="">Vali...</option>
                    <option value="daily">Igapäev</option>
                    <option value="often">Sageli</option>
                    <option value="sometimes">Mõnikord</option>
                </select>
            </div>
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Millal</label>
                <select name="${fieldName}_timing" style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
                    <option value="">Vali...</option>
                    <option value="morning">Hommik</option>
                    <option value="work">Töö ajal</option>
                    <option value="evening">Õhtu</option>
                    <option value="sleep">Enne und</option>
                </select>
            </div>
        </div>
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: lemmikunäitlejad, platvormid..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud muusikasse!`);
}

// ================================================================
// QUICK ADD: UNI JA NORSKAMINE
// ================================================================

function quickAddSleep(key, name) {
    if (!quickAddCounters.sleep) quickAddCounters.sleep = 0;
    quickAddCounters.sleep++;

    const containerId = 'quickAddedSleep';
    let container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const itemId = `sleep_quick_${quickAddCounters.sleep}`;
    const fieldName = `sleep_${key}_${quickAddCounters.sleep}`;

    // Määra värv belief vs. tavaline
    const isbelief = ['obe', 'prohvetlik', 'samani_rannak', 'muu_paranormaalne'].includes(key);
    const bgColor = isbelief ? '#f3f4f6' : '#eff6ff';
    const borderColor = isbelief ? '#9ca3af' : '#3b82f6';
    const textColor = isbelief ? '#4b5563' : '#1e3a8a';

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = `background: ${bgColor}; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid ${borderColor};`;
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: ${textColor}; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}${isbelief ? ' <span style="font-size: 0.75rem; color: #6b7280;">(belief)</span>' : ''}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: ${borderColor}; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Sagedus</label>
                <select name="${fieldName}_frequency" style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
                    <option value="">Vali...</option>
                    <option value="every_night">Iga öö</option>
                    <option value="often">Sageli (3-5x nädalas)</option>
                    <option value="sometimes">Mõnikord (1-2x nädalas)</option>
                    <option value="rare">Harva</option>
                </select>
            </div>
            <div>
                <label style="font-size: 0.9rem; color: #64748b;">Raskusaste (0-10)</label>
                <input type="number" name="${fieldName}_severity" min="0" max="10"
                       style="width: 100%; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>
        </div>
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: vallandajad, mustrind..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud!`);
}

// ================================================================
// QUICK ADD: PRIVAATSUS JA NÕUSOLEK
// ================================================================

function quickAddPrivacy(key, name) {
    if (!quickAddCounters.privacy) quickAddCounters.privacy = 0;
    quickAddCounters.privacy++;

    // Määra container vastavalt kategooriale
    let containerId;
    let categoryLabel;
    let bgColor, borderColor, textColor;

    if (key.startsWith('no_')) {
        // EI JAGATA
        containerId = 'quickAddedPrivacyNoShare';
        categoryLabel = 'Ei jagata';
        bgColor = '#fee2e2';
        borderColor = '#ef4444';
        textColor = '#991b1b';
    } else if (key.startsWith('consent_') || ['palve', 'rituaal', 'kutsun_koju_arsti', 'kutsun_koju_new_age'].includes(key)) {
        // NÕUSOLEK
        containerId = 'quickAddedPrivacyConsent';
        categoryLabel = 'Nõusolek';
        bgColor = '#fef3c7';
        borderColor = '#f59e0b';
        textColor = '#d97706';
    } else {
        // JAGAMISE TASE
        containerId = 'quickAddedPrivacyShare';
        categoryLabel = 'Jagamise tase';
        const isbelief = ['jumalale'].includes(key);
        bgColor = isbelief ? '#f3f4f6' : '#f0fdf4';
        borderColor = isbelief ? '#9ca3af' : '#10b981';
        textColor = isbelief ? '#4b5563' : '#047857';
    }

    let container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const itemId = `privacy_quick_${quickAddCounters.privacy}`;
    const fieldName = `privacy_${key}_${quickAddCounters.privacy}`;

    const isbelief = ['jumalale', 'palve', 'rituaal', 'kutsun_koju_new_age'].includes(key);

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = `background: ${bgColor}; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid ${borderColor};`;
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: ${textColor}; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}${isbelief ? ' <span style="font-size: 0.75rem; color: #6b7280;">(belief)</span>' : ''}
                ${MED_INFO_DB[key] ? `<span class="info-icon" onclick="openInfoModal('${key}')">i<div class="info-popup">${MED_INFO_DB[key].shortInfo}</div></span>` : ''}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: ${borderColor}; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: tingimused, piirangud..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud (${categoryLabel})!`);
}

// Quick add home support
function quickAddHomeSupport(key, name) {
    if (!quickAddCounters.homeSupport) quickAddCounters.homeSupport = 0;
    quickAddCounters.homeSupport++;

    const containerId = 'quickAddedHomeSupport';
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const itemId = `homeSupport_quick_${quickAddCounters.homeSupport}`;
    const fieldName = `homeSupport_${key}_${quickAddCounters.homeSupport}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef3c7; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #f59e0b;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #92400e; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #f59e0b; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        ${key !== 'üksi' ? `
        <div style="margin-left: 24px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Kes (nimi või suhe)?</label>
            <input type="text" name="${fieldName}_who" placeholder="Nt: abikaasa, täiskasvanu tütar, naaber..."
                   style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
        </div>
        <div style="margin-left: 24px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Millega aitab?</label>
            <textarea name="${fieldName}_help" rows="2" placeholder="Nt: ravimite meenutamine, arsti juurde sõit, toidu valmistamine..."
                      style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;"></textarea>
        </div>
        ` : `
        <div style="margin-left: 24px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Täpsustus</label>
            <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: elab üksi, haldab ise kõiki ülesandeid..."
                      style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;"></textarea>
        </div>
        `}
        ${key === 'muu_tugi' ? `
        <div style="margin-left: 24px; margin-top: 8px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Täpsusta tugi tüüp</label>
            <input type="text" name="${fieldName}_custom" placeholder="Nt: koduabi teenus, vabatahtlik, jne..."
                   style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
        </div>
        ` : ''}
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud!`);
}


// Quick add anticoagulants (blood thinners)
function quickAddAnticoagulant(key, name) {
    if (!quickAddCounters.anticoagulant) quickAddCounters.anticoagulant = 0;
    quickAddCounters.anticoagulant++;

    const containerId = 'quickAddedAnticoagulants';
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const itemId = `anticoagulant_quick_${quickAddCounters.anticoagulant}`;
    const fieldName = `anticoagulant_${key}_${quickAddCounters.anticoagulant}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef2f2; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ef4444;';
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #991b1b; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <div style="margin-left: 24px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Annus</label>
            <input type="text" name="${fieldName}_dose" placeholder="Nt: 5 mg"
                   style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
        </div>
        <div style="margin-left: 24px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Sagedus</label>
            <select name="${fieldName}_frequency" style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
                <option value="">Vali...</option>
                <option value="1x_day">1× päevas</option>
                <option value="2x_day">2× päevas</option>
                <option value="vajadusel">Vajadusel</option>
                <option value="muu">Muu</option>
            </select>
        </div>
        ${key === 'muu' ? `
        <div style="margin-left: 24px; margin-bottom: 8px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Täpsusta ravimi nimi</label>
            <input type="text" name="${fieldName}_custom_name" placeholder="Ravimi nimi..."
                   style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
        </div>
        ` : ''}
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: alates 2023, neerud kontrollitud, INR eesmärk 2-3..."></textarea>
            </div>
        </div>
        <div style="margin-left: 24px; margin-top: 10px; padding: 10px; background: #fef9c3; border-left: 3px solid #f59e0b; border-radius: 4px;">
            <p style="margin: 0; font-size: 0.85rem; color: #92400e;">
                <strong>⚠ HOIATUS:</strong> Vältida taimi: ginkgo, naistepuna, küüslauk, ingver, kurkum (suurendavad verejooksu riski).
                Soovitatavad: hibiskus, viirpuu, arjuna.
            </p>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud!`);
}


// Quick add home measurements
function quickAddHomeMeasurement(key, name) {
    if (!quickAddCounters.homeMeasurement) quickAddCounters.homeMeasurement = 0;
    quickAddCounters.homeMeasurement++;

    const containerId = 'quickAddedHomeMeasurements';
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const itemId = `homeMeasurement_quick_${quickAddCounters.homeMeasurement}`;
    const fieldName = `homeMeasurement_${key}_${quickAddCounters.homeMeasurement}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #dbeafe; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #3b82f6;';
    itemDiv.id = itemId;

    let specificFields = '';
    
    if (key === 'vererohk') {
        specificFields = `
            <div style="margin-left: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
                <div>
                    <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">BP hommikul (mmHg)</label>
                    <input type="text" name="${fieldName}_morning" placeholder="120/80"
                           style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                </div>
                <div>
                    <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">BP õhtul (mmHg)</label>
                    <input type="text" name="${fieldName}_evening" placeholder="120/80"
                           style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                </div>
            </div>
            <div style="margin-left: 24px;">
                <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Pulss rahus (lpm)</label>
                <input type="number" name="${fieldName}_pulse" min="30" max="200" placeholder="Nt: 70"
                       style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
            </div>
        `;
    } else if (key === 'sammulugeja') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Päevane sammude keskmine</label>
                <input type="number" name="${fieldName}_daily_steps" min="0" placeholder="Nt: 8000"
                       style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
            </div>
        `;
    } else if (key === 'kaal') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Viimase 7 päeva trend</label>
                <select name="${fieldName}_trend" style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
                    <option value="">Vali...</option>
                    <option value="up">Tõuseb</option>
                    <option value="stable">Stabiilne</option>
                    <option value="down">Langeb</option>
                </select>
            </div>
        `;
    } else if (key === 'suhkur') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Tühja kõhuga keskmine (mmol/L)</label>
                <input type="number" name="${fieldName}_fasting" step="0.1" min="0" max="30" placeholder="Nt: 5.5"
                       style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
            </div>
        `;
    } else if (key === 'oksumeter') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Tavaline SpO2 (%)</label>
                <input type="number" name="${fieldName}_spo2" min="0" max="100" placeholder="Nt: 96"
                       style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
            </div>
        `;
    } else if (key === 'muu') {
        specificFields = `
            <div style="margin-left: 24px; margin-bottom: 8px;">
                <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Seadme nimetus</label>
                <input type="text" name="${fieldName}_device_name" placeholder="Nt: EKG seade, glükomeeter..."
                       style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>
        `;
    }

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #1e3a8a; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        ${specificFields}
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: seadme mark, mõõtmise aeg, regulaarsus..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud!`);
}


// Quick add meal patterns
function quickAddMealPattern(key, name) {
    if (!quickAddCounters.mealPattern) quickAddCounters.mealPattern = 0;
    quickAddCounters.mealPattern++;

    const containerId = 'quickAddedMealPatterns';
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const itemId = `mealPattern_quick_${quickAddCounters.mealPattern}`;
    const fieldName = `mealPattern_${key}_${quickAddCounters.mealPattern}`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef3c7; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #f59e0b;';
    itemDiv.id = itemId;

    let specificFields = '';
    
    if (key.includes('paast') || key.includes('16_8') || key.includes('12_12') || key.includes('18_6')) {
        specificFields = `
            <div style="margin-left: 24px;">
                <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Söögiajaaken (nt 12:00-20:00)</label>
                <input type="text" name="${fieldName}_window" placeholder="Nt: 12:00-20:00"
                       style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-bottom: 8px;">
            </div>
        `;
    } else if (key === 'hobo') {
        specificFields = `
            <div style="margin-left: 24px; padding: 10px; background: #fef9c3; border-radius: 4px; margin-bottom: 8px;">
                <p style="margin: 0; font-size: 0.85rem; color: #92400e;">
                    "Hobo-stiil": söön kui võimalus juhtub, ebaregulaarne, kohati vahele jäetud toidukorrad
                </p>
            </div>
        `;
    } else if (key === 'linnakiirtoit') {
        specificFields = `
            <div style="margin-left: 24px; padding: 10px; background: #fef9c3; border-radius: 4px; margin-bottom: 8px;">
                <p style="margin: 0; font-size: 0.85rem; color: #92400e;">
                    Linnakiirtoit: kiire söök töö vahel, take-away, kohvikutes
                </p>
            </div>
        `;
    } else if (key === 'muu') {
        specificFields = `
            <div style="margin-left: 24px; margin-bottom: 8px;">
                <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 4px;">Kirjelda oma söögimustrit</label>
                <input type="text" name="${fieldName}_custom" placeholder="Nt: 5× väikseid portsjoneid, grazing..."
                       style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            </div>
        `;
    }

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <label style="margin: 0; font-weight: 600; color: #92400e; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #f59e0b; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        ${specificFields}
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_info')">+ Lisa täpsustus</span>
            <div id="${itemId}_info" class="inline-info-field">
                <label>Täpsustus (valikuline)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: nädalavahetustel erinev, sõltub töögraafikust..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud!`);
}


// =============================================================================
// ELUSTIILI AINETE KOOSTOIMERISKID (v1.7.5.4)
// =============================================================================

function quickAddInteraction(key, name) {
    if (!quickAddCounters.interaction) quickAddCounters.interaction = 0;
    quickAddCounters.interaction++;
    
    const containerId = 'quickAddedInteractions';
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const itemId = `interaction_quick_${quickAddCounters.interaction}`;
    const fieldName = `interaction_${key}_${quickAddCounters.interaction}`;
    
    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #fef2f2; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ef4444;';
    itemDiv.id = itemId;
    
    // Spetsiifilised väljad iga aine kohta
    let specificFields = '';
    let warningText = '';
    
    if (key === 'kakao') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label>Tarbimise sagedus</label>
                <select name="${fieldName}_frequency" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
                    <option value="">Vali...</option>
                    <option value="daily">Igapäevaselt</option>
                    <option value="weekly">Mitu korda nädalas</option>
                    <option value="occasional">Aeg-ajalt</option>
                </select>
            </div>
            <div style="margin-left: 24px; margin-top: 8px;">
                <label>Kogus päevas (ligikaudu)</label>
                <input type="text" name="${fieldName}_amount" placeholder="Nt: 50g tumedat šokolaadi, 2 tassi kakaod..." style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
            </div>
        `;
        warningText = 'Kakao sisaldab teobromiin + kofeiin. Koostoime: MAOI inhibiitorid, stimulandid, migreenivastased ravimid.';
    } else if (key === 'alkohol') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label>Tarbimise sagedus</label>
                <select name="${fieldName}_frequency" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
                    <option value="">Vali...</option>
                    <option value="daily">Igapäevaselt</option>
                    <option value="weekly">Mitu korda nädalas</option>
                    <option value="weekend">Nädalavahetustel</option>
                    <option value="occasional">Harva</option>
                </select>
            </div>
            <div style="margin-left: 24px; margin-top: 8px;">
                <label>Kogus (ühikut nädalas)</label>
                <input type="text" name="${fieldName}_amount" placeholder="Nt: 7-14 ühikut/nädal (1 ühik = 10g puhast alkoholi)" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
            </div>
        `;
        warningText = 'KÕRGE RISK: koostoime maksaravimitega, verevedeldajatega, sedatiivsete ravimitega, valuvaigistite, diabeediravimitega. VÄLTIDA koos ravimkuuriga!';
    } else if (key === 'kofeiin') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label>Allikas</label>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 4px;">
                    <label style="font-weight: normal;"><input type="checkbox" name="${fieldName}_coffee" value="yes"> Kohv</label>
                    <label style="font-weight: normal;"><input type="checkbox" name="${fieldName}_tea" value="yes"> Tee</label>
                    <label style="font-weight: normal;"><input type="checkbox" name="${fieldName}_energy" value="yes"> Energiajook</label>
                    <label style="font-weight: normal;"><input type="checkbox" name="${fieldName}_cola" value="yes"> Cola</label>
                </div>
            </div>
            <div style="margin-left: 24px; margin-top: 8px;">
                <label>Kogus päevas (ligikaudu)</label>
                <input type="text" name="${fieldName}_amount" placeholder="Nt: 3 tassi kohvi (~300mg kofeiin)" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
            </div>
        `;
        warningText = 'Koostoime: südameravimid (eriti beeta-blokaatorid), bronhilaiendurid, antidepressandid. Võib suurendada südame löögisagedust.';
    } else if (key === 'kanep_cbd') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label>Vorm</label>
                <select name="${fieldName}_form" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
                    <option value="">Vali...</option>
                    <option value="cbd_oil">CBD õli (ilma THC-ta)</option>
                    <option value="cbd_full">CBD full spectrum</option>
                    <option value="thc_low">Kanep (madal THC)</option>
                    <option value="thc_high">Kanep (kõrge THC)</option>
                    <option value="medical">Meditsiiniline kanep</option>
                </select>
            </div>
            <div style="margin-left: 24px; margin-top: 8px;">
                <label>Sagedus</label>
                <select name="${fieldName}_frequency" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
                    <option value="">Vali...</option>
                    <option value="daily">Igapäevaselt</option>
                    <option value="weekly">Mitu korda nädalas</option>
                    <option value="occasional">Aeg-ajalt</option>
                </select>
            </div>
        `;
        warningText = 'OLULINE: koostoime verevedeldajatega (suurendab verejooksu riski), sedatiivsete ravimitega. CBD metaboliseerub maksas (CYP450) - koostoime paljude ravimitega!';
    } else if (key === 'kava') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label>Tarbimise sagedus</label>
                <select name="${fieldName}_frequency" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
                    <option value="">Vali...</option>
                    <option value="daily">Igapäevaselt</option>
                    <option value="weekly">Mitu korda nädalas</option>
                    <option value="occasional">Aeg-ajalt</option>
                </select>
            </div>
            <div style="margin-left: 24px; margin-top: 8px;">
                <label>Vorm</label>
                <select name="${fieldName}_form" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
                    <option value="">Vali...</option>
                    <option value="traditional">Traditsiooniline jook</option>
                    <option value="extract">Ekstrakt/kapslid</option>
                    <option value="powder">Pulber</option>
                </select>
            </div>
        `;
        warningText = 'MAKSATOKSILINE RISK! Koostoime maksaravimitega, alkoholi, sedatiivsete ravimitega. VÄLTIDA pikaajalisel kasutamisel või maksahaiguse korral!';
    } else if (key === 'kratom') {
        specificFields = `
            <div style="margin-left: 24px;">
                <label>Tarbimise sagedus</label>
                <select name="${fieldName}_frequency" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
                    <option value="">Vali...</option>
                    <option value="daily">Igapäevaselt</option>
                    <option value="weekly">Mitu korda nädalas</option>
                    <option value="occasional">Aeg-ajalt</option>
                </select>
            </div>
            <div style="margin-left: 24px; margin-top: 8px;">
                <label>Kogus päevas (ligikaudu)</label>
                <input type="text" name="${fieldName}_amount" placeholder="Nt: 2-5 grammi" style="width: 100%; padding: 6px; border-radius: 4px; border: 1px solid #d1d5db;">
            </div>
        `;
        warningText = 'KÕRGE RISK: koostoime opioidide, sedatiivsete ravimite, MAO inhibiitoritega. Sõltuvuse risk! Maksatoksilisus võimalik. Paljudes riikides keelatud.';
    }
    
    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="margin: 0; font-weight: 600; color: #991b1b;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        ${specificFields}
        ${warningText ? `
        <div style="margin-left: 24px; margin-top: 10px; padding: 10px; background: #fef9c3; border-radius: 4px; border-left: 3px solid #f59e0b;">
            <p style="margin: 0; font-size: 0.85rem; color: #92400e;">
                <strong>⚠ HOIATUS:</strong> ${warningText}
            </p>
        </div>
        ` : ''}
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_notes')">+ Lisa täiendav info</span>
            <div id="${itemId}_notes" class="inline-info-field">
                <label>Täiendav info (vabatahtlik)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: kasutamise põhjus, kui kaua kasutatud, kõrvaltoimed..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud!`);
}

// ================================================================
// QUICK ADD: PROFIILIFILTRI (Rasedus, Vanus, Sugu)
// Erilised funktsioonid - lubavad ainult ÜHE valiku korraga
// ================================================================

function quickAddPregnancy(status, label) {
    // Container
    const containerId = 'quickAddedPregnancy';
    let container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    // Eemalda varasem valik (ainult üks valiku lubatud)
    container.innerHTML = '';

    const itemId = 'pregnancy_selected';
    const fieldName = 'pregnancyStatus';

    // Värv vastavalt staatusele
    const bgColor = '#fef3c7';
    const borderColor = '#f59e0b';
    const textColor = '#92400e';

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = `background: ${bgColor}; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid ${borderColor};`;
    itemDiv.id = itemId;

    // Nädalate väli ainult lapseootel korral
    const weeksField = status === 'pregnant' ? `
        <div style="margin-left: 24px; margin-top: 8px;">
            <label style="font-size: 0.9rem; color: #64748b;">Kui kaua lapseootel (nädalat)?</label>
            <input type="number" name="pregnancyWeeksCount" min="1" max="42" placeholder="Nt: 12"
                   style="width: 100px; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
        </div>
    ` : '';

    // Planeerimise horisont ainult "soovin last" korral
    const planningField = status === 'planning' ? `
        <div style="margin-left: 24px; margin-top: 8px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 6px;">Kui pika aja pärast plaanid rasestuda?</label>
            <select name="planningHorizon" style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                <option value="">Vali...</option>
                <option value="<3months">≤3 kuud</option>
                <option value="3-6months">3-6 kuud</option>
                <option value="6-12months">6-12 kuud</option>
                <option value=">12months">>12 kuud</option>
            </select>
            <p style="font-size: 0.85rem; color: #92400e; margin-top: 6px; background: #fef3c7; padding: 6px; border-radius: 4px;">
                💡 Mõned ained tuleb lõpetada x kuud enne rasestumist.
            </p>
        </div>
    ` : '';

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="margin: 0; font-weight: 600; color: ${textColor}; display: flex; align-items: center; gap: 8px;">
                <input type="radio" name="${fieldName}" value="${status}" checked onchange="updateProfileFilter()">
                ${label}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove(); updateProfileFilter()" class="btn-danger-sm"
                    style="background: ${borderColor}; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        ${weeksField}
        ${planningField}
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${label} lisatud!`);

    // Auto-select "naine" kui lapseootel/imetamine
    if (status === 'pregnant' || status === 'breastfeeding' || status === 'planning') {
        // Oota 100ms et DOM uueneks, siis vali "naine"
        setTimeout(() => {
            quickAddGender('female', 'Naine');
        }, 100);
    }

    // Uuenda profiilifiltrit
    updateProfileFilter();
}

function quickAddAgeCategory(range, label) {
    // Container
    const containerId = 'quickAddedAge';
    let container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    // Eemalda varasem valik (ainult üks valiku lubatud)
    container.innerHTML = '';

    const itemId = 'age_selected';

    const bgColor = '#e0f2fe';
    const borderColor = '#0284c7';
    const textColor = '#075985';

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = `background: ${bgColor}; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid ${borderColor};`;
    itemDiv.id = itemId;

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="margin: 0; font-weight: 600; color: ${textColor};">
                ${label}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove(); updateProfileFilter()" class="btn-danger-sm"
                    style="background: ${borderColor}; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        <input type="hidden" id="ageCategory" name="ageCategory" value="${range}">
        <input type="hidden" id="ageCategoryLabel" name="ageCategoryLabel" value="${label}">
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${label} lisatud!`);

    // Uuenda profiilifiltrit
    updateProfileFilter();
}

function quickAddGender(gender, label) {
    // Container
    const containerId = 'quickAddedGender';
    let container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    // Eemalda varasem valik (ainult üks valiku lubatud)
    container.innerHTML = '';

    const itemId = 'gender_selected';
    const fieldName = 'gender';

    const bgColor = '#fce7f3';
    const borderColor = '#ec4899';
    const textColor = '#9f1239';

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = `background: ${bgColor}; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid ${borderColor};`;
    itemDiv.id = itemId;

    // Laiendatud väljad "sootuks" korral
    const expandedFields = gender === 'other' ? `
        <div style="margin-left: 24px; margin-top: 10px; padding: 10px; background: white; border-radius: 6px;">
            <label style="font-size: 0.9rem; color: #64748b; display: block; margin-bottom: 6px;">Enesemääratlus (vabatahtlik):</label>
            <input type="text" name="selfIdent" placeholder="Nt: mittebinaar, genderfluid, trans..."
                   style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
        </div>
    ` : '';

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="margin: 0; font-weight: 600; color: ${textColor}; display: flex; align-items: center; gap: 8px;">
                <input type="radio" name="${fieldName}" value="${gender}" checked onchange="updateProfileFilter()">
                ${label}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove(); updateProfileFilter()" class="btn-danger-sm"
                    style="background: ${borderColor}; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        ${expandedFields}
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${label} lisatud!`);

    // Uuenda profiilifiltrit
    updateProfileFilter();
}

// ================================================================
// QUICK ADD: HERB INTERACTION RISKS
// 7 taimi mis võivad koostoimet avaldada ravimitega
// ================================================================

function quickAddHerbInteraction(key, name) {
    if (!quickAddCounters.herbInteraction) quickAddCounters.herbInteraction = 0;
    quickAddCounters.herbInteraction++;

    const containerId = 'quickAddedHerbInteractions';
    let container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    const itemId = `herbInteraction_quick_${quickAddCounters.herbInteraction}`;
    const fieldName = `herbInteraction_${key}_${quickAddCounters.herbInteraction}`;

    const bgColor = '#fef2f2';
    const borderColor = '#ef4444';
    const textColor = '#991b1b';

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = `background: ${bgColor}; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid ${borderColor};`;
    itemDiv.id = itemId;

    // Spetsiifilised väljad vastavalt ainele
    let specificInfo = '';
    if (key === 'kyyslauk') {
        specificInfo = '<p style="margin-left: 24px; margin-top: 6px; font-size: 0.85rem; color: #7f1d1d;">⚠️ Koostoime: antikoagulandid, antiplaatikud. Tarvitusannused: >1 küüs/päev</p>';
    } else if (key === 'ingver') {
        specificInfo = '<p style="margin-left: 24px; margin-top: 6px; font-size: 0.85rem; color: #7f1d1d;">⚠️ Koostoime: antikoagulandid, antiplaatikud. Tarvitusannused: >2 g/päev</p>';
    } else if (key === 'kurkum') {
        specificInfo = '<p style="margin-left: 24px; margin-top: 6px; font-size: 0.85rem; color: #7f1d1d;">⚠️ Koostoime: antikoagulandid, antiplaatikud. Tarvitusannused: >1 g/päev</p>';
    } else if (key === 'greip') {
        specificInfo = '<p style="margin-left: 24px; margin-top: 6px; font-size: 0.85rem; color: #7f1d1d;">⚠️ SUUR koostoime: paljud ravimid (statinid, kaltsiumkanali blokaatorid, bensodiasepiinid jne). Suurendab ravimi taset veres!</p>';
    } else if (key === 'naistepuna') {
        specificInfo = '<p style="margin-left: 24px; margin-top: 6px; font-size: 0.85rem; color: #7f1d1d;">⚠️ SUUR koostoime: SSRI-d, kontratseptiivid, antikoagulandid. Vähendab ravimi efektiivsust!</p>';
    } else if (key === 'ginkgo') {
        specificInfo = '<p style="margin-left: 24px; margin-top: 6px; font-size: 0.85rem; color: #7f1d1d;">⚠️ Koostoime: antikoagulandid. Suurendab verejooksu riski.</p>';
    } else if (key === 'lagrits') {
        specificInfo = '<p style="margin-left: 24px; margin-top: 6px; font-size: 0.85rem; color: #7f1d1d;">⚠️ Koostoime: diureetikumid, kortikosteroidid. Vähendab kaaliumi taset.</p>';
    }

    itemDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <label style="margin: 0; font-weight: 600; color: ${textColor}; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" name="${fieldName}" value="yes" checked>
                ${name}
            </label>
            <button type="button" onclick="document.getElementById('${itemId}').remove()" class="btn-danger-sm"
                    style="background: ${borderColor}; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                Eemalda
            </button>
        </div>
        ${specificInfo}
        <div style="margin-left: 24px; margin-top: 8px;">
            <label style="font-size: 0.9rem; color: #64748b;">Tarvitamise sagedus</label>
            <select name="${fieldName}_frequency" style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; margin-top: 4px;">
                <option value="">Vali...</option>
                <option value="daily">Igapäevaselt</option>
                <option value="weekly">Mitu korda nädalas</option>
                <option value="occasionally">Aeg-ajalt</option>
            </select>
        </div>
        <div style="margin-left: 24px; margin-top: 8px;">
            <span class="inline-info-toggle" onclick="toggleInlineInfo('${itemId}_notes')">+ Lisa täiendav info</span>
            <div id="${itemId}_notes" class="inline-info-field">
                <label>Täiendav info (vabatahtlik)</label>
                <textarea name="${fieldName}_notes" rows="2" placeholder="Nt: kogus, vorm (tooraine/ekstrakt/kapsel)..."></textarea>
            </div>
        </div>
    `;

    container.insertBefore(itemDiv, container.firstChild);
    showToast(`${name} lisatud koostoimeriskide alla!`);
}
