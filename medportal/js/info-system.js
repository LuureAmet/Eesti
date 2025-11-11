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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
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

    container.appendChild(itemDiv);
    showToast(`${name} lisatud perekondliku riskina!`);
}
