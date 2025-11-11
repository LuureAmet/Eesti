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
