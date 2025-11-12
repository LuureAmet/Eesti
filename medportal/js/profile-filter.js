// ═══════════════════════════════════════════════════════════
// PROFIILIFILTRI SÜSTEEM
// Jälgib rasedust, vanust, sugu ja meditsiinilisi riske
// Näitab reaalajas hoiatusi ja kokkuvõtet
// ═══════════════════════════════════════════════════════════

// Profiili filtri olek
const profileFilter = {
    pregnancy: null,        // 'pregnant', 'breastfeeding', 'planning', 'no'
    pregnancyWeeks: null,
    planningHorizon: null,  // '<3months', '3-6months', '6-12months', '>12months'
    ageCategory: null,      // '18-39', '65-74', '100-120', etc
    ageCategoryLabel: null, // 'Noor täiskasvanu (18-39 a)'
    exactAge: null,
    gender: null,           // 'male', 'female', 'other'
    afAnticoagulant: false,
    egfr: null,
    childPugh: null
};

// Vanuse kategooria valimine
function selectAgeCategory(button, ageRange, label) {
    // Eemalda "selected" kõikidelt nuppudelt
    document.querySelectorAll('.age-category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Lisa "selected" valitud nupule
    button.classList.add('selected');

    // Salvesta hidden fieldidesse
    document.getElementById('ageCategory').value = ageRange;
    document.getElementById('ageCategoryLabel').value = label;

    // Tühjenda täpne vanus
    document.getElementById('exactAge').value = '';

    // Uuenda profiili filtrit
    updateProfileFilter();
}

// Peamine profiili uuendamise funktsioon
function updateProfileFilter() {
    // Loe väärtused vormist
    const pregnancyStatus = document.querySelector('input[name="pregnancyStatus"]:checked')?.value || 'no';
    const pregnancyWeeksInput = document.querySelector('input[name="pregnancyWeeksCount"]');
    const exactAgeInput = document.getElementById('exactAge');
    const ageCategoryInput = document.getElementById('ageCategory');
    const ageCategoryLabelInput = document.getElementById('ageCategoryLabel');
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const afAnticoagulant = document.querySelector('input[name="afAnticoagulant"]')?.checked || false;
    const egfr = document.querySelector('select[name="egfr"]')?.value || '';
    const childPugh = document.querySelector('select[name="childPugh"]')?.value || '';

    // Uuenda profileFilter objekti
    profileFilter.pregnancy = pregnancyStatus;
    profileFilter.pregnancyWeeks = pregnancyWeeksInput?.value || null;
    profileFilter.exactAge = exactAgeInput?.value || null;
    profileFilter.ageCategory = ageCategoryInput?.value || null;
    profileFilter.ageCategoryLabel = ageCategoryLabelInput?.value || null;
    profileFilter.gender = gender;
    profileFilter.afAnticoagulant = afAnticoagulant;
    profileFilter.egfr = egfr;
    profileFilter.childPugh = childPugh;

    // Loe planningHorizon kui kasutaja valis "Soovin last"
    const planningHorizon = document.querySelector('input[name="planningHorizon"]:checked')?.value || null;
    profileFilter.planningHorizon = planningHorizon;

    // Näita/peida raseduse nädalate väli
    const pregnancyWeeksDiv = document.getElementById('pregnancyWeeks');
    const planningHorizonDiv = document.getElementById('planningHorizon');

    if (pregnancyStatus === 'pregnant') {
        pregnancyWeeksDiv.style.display = 'block';
        planningHorizonDiv.style.display = 'none';
        // Aktiveeri automaatselt "naine"
        document.getElementById('genderFemale').checked = true;
        profileFilter.gender = 'female';
    } else if (pregnancyStatus === 'planning') {
        pregnancyWeeksDiv.style.display = 'none';
        planningHorizonDiv.style.display = 'block';
        // Aktiveeri automaatselt "naine"
        document.getElementById('genderFemale').checked = true;
        profileFilter.gender = 'female';
    } else {
        pregnancyWeeksDiv.style.display = 'none';
        planningHorizonDiv.style.display = 'none';
    }

    // Kui valiti imetamine, aktiveeri ka "naine"
    if (pregnancyStatus === 'breastfeeding') {
        document.getElementById('genderFemale').checked = true;
        profileFilter.gender = 'female';
    }

    // Uuenda kokkuvõtet ja hoiatusi
    updateProfileSummary();
    updateProfileWarnings();

    console.log('Profiilifiltri olek:', profileFilter);
}

// Näita profiili kokkuvõtet
function updateProfileSummary() {
    const statusDiv = document.getElementById('profileFilterStatus');
    const summaryDiv = document.getElementById('profileFilterSummary');

    let summary = [];

    // Rasedus/imetamine/lapse soov
    if (profileFilter.pregnancy === 'pregnant') {
        summary.push(`<strong>Lapseootel</strong>${profileFilter.pregnancyWeeks ? ` (${profileFilter.pregnancyWeeks} nädalat)` : ''}`);
    } else if (profileFilter.pregnancy === 'breastfeeding') {
        summary.push('<strong>Imetan</strong>');
    } else if (profileFilter.pregnancy === 'planning') {
        const horizonText = {
            '<3months': '≤3 kuud',
            '3-6months': '3-6 kuud',
            '6-12months': '6-12 kuud',
            '>12months': '>12 kuud'
        };
        const horizonLabel = horizonText[profileFilter.planningHorizon] || '';
        summary.push(`<strong>Soovin last</strong>${horizonLabel ? ` (${horizonLabel})` : ''}`);
    }

    // Vanus
    if (profileFilter.exactAge) {
        summary.push(`<strong>${profileFilter.exactAge} aastat</strong>`);
    } else if (profileFilter.ageCategoryLabel) {
        summary.push(`<strong>${profileFilter.ageCategoryLabel}</strong>`);
    }

    // Sugu
    if (profileFilter.gender === 'male') {
        summary.push('<strong>Mees</strong>');
    } else if (profileFilter.gender === 'female') {
        summary.push('<strong>Naine</strong>');
    }

    // AF + Antikoagulant
    if (profileFilter.afAnticoagulant) {
        summary.push('[!] <strong>AF + Antikoagulant</strong>');
    }

    // eGFR
    if (profileFilter.egfr) {
        summary.push(`<strong>eGFR: ${profileFilter.egfr}</strong>`);
    }

    // Child-Pugh
    if (profileFilter.childPugh) {
        summary.push(`<strong>Child-Pugh: ${profileFilter.childPugh}</strong>`);
    }

    // Näita kokkuvõtet ainult kui midagi on valitud
    if (summary.length > 0) {
        statusDiv.style.display = 'block';
        summaryDiv.innerHTML = summary.join(' • ');
    } else {
        statusDiv.style.display = 'none';
    }
}

// Näita hoiatusi ja nõuandeid
function updateProfileWarnings() {
    const warningsDiv = document.getElementById('profileWarnings');
    let warnings = [];

    // RASEDUS/IMETAMINE - KÕIGE OLULISEM!
    if (profileFilter.pregnancy === 'pregnant') {
        warnings.push({
            type: 'error',
            icon: '[!]',
            title: 'VÄLDI RASEDUSE KORRAL:',
            items: [
                'Ginkgo biloba (kaasasünni defektid)',
                'Panax ginseng (verejooks, hormoonid)',
                'Naistepuna (emakakontraktsioonid)',
                'Lagrits (vererõhk, enneaegne sünnitus)',
                'Kelp/kõrge jood (kilpnääre häire)',
                'Kõrge doos omega-3 (>2g verejooks)',
                'Paljud eeterlikud õlid'
            ]
        });

        warnings.push({
            type: 'success',
            icon: '[OK]',
            title: 'OHUTUD VALIKUD:',
            items: [
                'Ingver (väikestes kogustes, iivelduse vastu)',
                'Magneesium (mõõdukalt)',
                'Õrn qigong, koherentshingamine',
                'Kerge jalutuskäik, jooga'
            ]
        });
    }

    if (profileFilter.pregnancy === 'breastfeeding') {
        warnings.push({
            type: 'warning',
            icon: '[HOIATUS]',
            title: 'ETTEVAATUST IMETAMISEL:',
            items: [
                'Väldi ginkgo, ginseng, naistepuna',
                'Kofeiini <300mg päevas',
                'Alkohol ja tubakas täiesti keelatud',
                'Konsulteeri arstiga enne taimravimeid'
            ]
        });
    }

    // AF + ANTIKOAGULANT
    if (profileFilter.afAnticoagulant) {
        warnings.push({
            type: 'error',
            icon: '[RISK]',
            title: 'AF + ANTIKOAGULANT - VEREJOOKSU RISK:',
            items: [
                'VÄLDI: ginkgo, viirpuu, naistepuna, lagrits',
                'Küüslauk/ingver/kurkum ainult väikestes kogustes',
                'Omega-3 maksimaalselt 2g EPA+DHA päevas',
                'Konsulteeri ALATI arstiga enne taimravimeid!'
            ]
        });
    }

    // NEERUFUNKTSIOON
    if (profileFilter.egfr && profileFilter.egfr !== '90+' && profileFilter.egfr !== '') {
        const egfrValue = profileFilter.egfr;
        let severity = 'warning';
        if (egfrValue === '<15' || egfrValue === '15-29') {
            severity = 'error';
        }

        warnings.push({
            type: severity,
            icon: '[eGFR]',
            title: 'NEERUFUNKTSIOON VÄHENENUD:',
            items: [
                'Jälgi Mg, K koguseid (hüperkaleemia risk)',
                'Annused alla, "start low, go slow"',
                'Väldi suuri koguseid valku',
                'Mõned taimravimid vajavad annuse kohandamist',
                'Konsulteeri nefroloogiga!'
            ]
        });
    }

    // MAKSAFUNKTSIOON
    if (profileFilter.childPugh && profileFilter.childPugh !== '' && profileFilter.childPugh !== 'A') {
        warnings.push({
            type: profileFilter.childPugh === 'C' ? 'error' : 'warning',
            icon: '[MAKS]',
            title: 'MAKSAFUNKTSIOON HÄIRITUD:',
            items: [
                'Vähenda ravimite ja taimede annuseid',
                'Väldi maksatoksilisi aineid (alkohol!)',
                'Mõned taimed koormavad maksa lisaks',
                'Konsulteeri hepatoloogiga!'
            ]
        });
    }

    // VANUS - EAKAD
    if (profileFilter.ageCategory && (profileFilter.ageCategory.startsWith('65') || profileFilter.ageCategory.startsWith('75') || profileFilter.ageCategory.startsWith('85'))) {
        warnings.push({
            type: 'info',
            icon: '[65+]',
            title: 'EAKAS - "START LOW, GO SLOW":',
            items: [
                'Alusta väiksematest annustest',
                'Harjutused: madala koormusega, tasakaal',
                'Hingamine: istudes, lühemad seansid',
                'Kukkumise ennetamine prioriteet',
                'Polüfarmaasia vältimine'
            ]
        });
    }

    // LAPSED
    if (profileFilter.ageCategory && (profileFilter.ageCategory.startsWith('0-') || profileFilter.ageCategory.startsWith('1-') || profileFilter.ageCategory.startsWith('3-') || profileFilter.ageCategory.startsWith('6-') || profileFilter.ageCategory.startsWith('12-'))) {
        warnings.push({
            type: 'warning',
            icon: '[LAPS]',
            title: 'LAPS - ERIREEGLID:',
            items: [
                'Väldi stimuleerivaid adaptogeene (Panax ginseng)',
                'Eeterlikke õlisid ettevaatlikult (annused!)',
                'Harjutused: mänguline, lühikesed seansid',
                'Konsulteeri lastearstiga enne taimravimeid!'
            ]
        });
    }

    // Rendereeri hoiatused
    if (warnings.length > 0) {
        warningsDiv.innerHTML = warnings.map(w => `
            <div class="profile-warning ${w.type}">
                <h4 style="margin: 0 0 8px 0; font-size: 1rem;">${w.icon} ${w.title}</h4>
                <ul style="margin: 0; padding-left: 20px;">
                    ${w.items.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    } else {
        warningsDiv.innerHTML = '';
    }
}

// Käivita lehe laadimisel
document.addEventListener('DOMContentLoaded', function() {
    // Algne profiili uuendamine
    updateProfileFilter();

    console.log('Profiilifiltri süsteem aktiveeritud!');
});

// ═══════════════════════════════════════════════════════════
// v1.7.5 LAIENDUSED - SOO JA JUMALUSE VALIKUD
// ═══════════════════════════════════════════════════════════

// Toggle soo laiendatud valikud
function toggleGenderDetails(show) {
    const detailsDiv = document.getElementById('genderDetails');
    if (detailsDiv) {
        detailsDiv.style.display = show ? 'block' : 'none';
    }
}

// Mütoloogia tüübi lisamine (belief)
let mythologyCounter = 0;
function addMythologyType() {
    mythologyCounter++;
    const container = document.getElementById('mythologyTypes');

    const itemDiv = document.createElement('div');
    itemDiv.id = `mythology_${mythologyCounter}`;
    itemDiv.style.cssText = 'background: #f9fafb; padding: 10px; border-radius: 6px; margin-top: 10px; border: 1px solid #e5e7eb;';

    itemDiv.innerHTML = `
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="text" name="mythologyType_${mythologyCounter}" placeholder="Nt: kaksikhing, two-spirit..."
                   style="flex: 1; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
            <button type="button" class="quick-add-btn" style="padding: 6px 12px; background: #ef4444; color: white;"
                    onclick="document.getElementById('mythology_${mythologyCounter}').remove()">Eemalda</button>
        </div>
    `;

    container.insertBefore(itemDiv, container.querySelector('button'));
}

// Toggle jumaluse laiendatud valikud
function toggleDeityDetails() {
    const detailsDiv = document.getElementById('deityDetails');
    if (detailsDiv) {
        detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
    }
}

// Jumala/jumaluste lisamine
let deityCounter = 0;
const addedDeitiesSet = new Set(); // Vältida duplikaate

function addDeity(key, name) {
    // Kontrolli duplikaate
    if (addedDeitiesSet.has(key)) {
        showToast(`${name} on juba lisatud!`, 'warning');
        return;
    }

    deityCounter++;
    addedDeitiesSet.add(key);

    const container = document.getElementById('addedDeities');

    const itemDiv = document.createElement('div');
    itemDiv.id = `deity_${deityCounter}`;
    itemDiv.style.cssText = 'background: #fef3c7; padding: 10px; border-radius: 6px; margin-top: 8px; border-left: 4px solid #f59e0b;';

    itemDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;">
                <strong style="color: #92400e;">${name}</strong>
                <input type="hidden" name="deity_${deityCounter}" value="${key}">
                <textarea name="deity_${deityCounter}_notes" rows="2" placeholder="Lisa täpsustusi (nt mantra, palve, pakt)..."
                          style="width: 100%; margin-top: 5px; padding: 6px; border: 1px solid #f59e0b; border-radius: 4px; font-size: 0.9rem;"></textarea>
            </div>
            <button type="button" class="quick-add-btn" style="padding: 6px 12px; background: #ef4444; color: white; margin-left: 10px;"
                    onclick="removeDeity('${key}', 'deity_${deityCounter}')">Eemalda</button>
        </div>
    `;

    container.appendChild(itemDiv);
    showToast(`${name} lisatud!`);
}

// Eemalda jumalus
function removeDeity(key, itemId) {
    addedDeitiesSet.delete(key);
    document.getElementById(itemId)?.remove();
}

// Oma jumala lisamise funktsioon
function addCustomDeity() {
    const input = document.getElementById('customDeityName');
    const customName = input.value.trim();

    if (!customName) {
        showToast('Palun sisesta jumala nimi!', 'warning');
        return;
    }

    const key = `custom_${customName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    addDeity(key, customName);

    // Tühjenda input
    input.value = '';
}

// Toast notification helper
function showToast(message, type = 'success') {
    // Kontrolli kas showToast funktsioon on juba olemas (info-system.js-s)
    if (typeof window.showToast === 'function') {
        window.showToast(message);
    } else {
        // Lihtne fallback
        console.log(`[Toast ${type}]: ${message}`);
        alert(message);
    }
}
