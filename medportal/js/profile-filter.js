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

    // Conditional display: Naiste kaebused (näita ainult kui 'naine' või 'other')
    const womenSection = document.getElementById('womenComplaintsSection');
    if (womenSection) {
        if (profileFilter.gender === 'female' || profileFilter.gender === 'other') {
            womenSection.style.display = 'block';
        } else {
            womenSection.style.display = 'none';
        }
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

// ═══════════════════════════════════════════════════════════
// PAKETT 4: BMI KALKULAATOR + AKNAD + PUUDED
// ═══════════════════════════════════════════════════════════

// BMI kalkulaator
function calculateBMI() {
    const height = parseFloat(document.getElementById('height1')?.value);
    const weight = parseFloat(document.getElementById('weight1')?.value);
    const bmiValueSpan = document.getElementById('bmiValue');

    if (height && weight && height > 0) {
        const heightM = height / 100; // cm → m
        const bmi = weight / (heightM * heightM);
        const bmiRounded = bmi.toFixed(1);

        // Värv vastavalt BMI-le
        let color = '#334155'; // default
        let category = '';

        if (bmi < 18.5) {
            color = '#0284c7'; // sinine - alakaal
            category = '(alakaal)';
        } else if (bmi >= 18.5 && bmi < 25) {
            color = '#10b981'; // roheline - normaalne
            category = '(normaalne)';
        } else if (bmi >= 25 && bmi < 30) {
            color = '#f59e0b'; // kollane - ülekaal
            category = '(ülekaal)';
        } else {
            color = '#ef4444'; // punane - rasvumine
            category = '(rasvumine)';
        }

        bmiValueSpan.innerHTML = `<span style="color: ${color}; font-weight: 700;">${bmiRounded}</span> <span style="color: #6b7280; font-size: 0.85rem;">${category}</span>`;
    } else {
        bmiValueSpan.textContent = '—';
    }
}

// Siht-BMI kalkulaator
function calculateTargetBMI() {
    const height = parseFloat(document.getElementById('height1')?.value);
    const targetWeight = parseFloat(document.getElementById('targetWeight')?.value);
    const targetBMIValueSpan = document.getElementById('targetBMIValue');

    if (height && targetWeight && height > 0) {
        const heightM = height / 100;
        const targetBMI = targetWeight / (heightM * heightM);
        const targetBMIRounded = targetBMI.toFixed(1);

        targetBMIValueSpan.innerHTML = `BMI siht: <strong>${targetBMIRounded}</strong>`;
    } else {
        targetBMIValueSpan.textContent = '—';
    }
}

// Akende (optimaalsed ajad) lisamine
let windowCounter = 0;

function quickAddWindow(key, name) {
    windowCounter++;
    const container = document.getElementById('addedWindows');

    const itemDiv = document.createElement('div');
    itemDiv.id = `window_${windowCounter}`;
    itemDiv.style.cssText = 'background: #f0fdf4; padding: 12px; border-radius: 6px; margin-top: 10px; border-left: 4px solid #10b981;';

    itemDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px;">
            <div style="flex: 1;">
                <strong style="color: #047857;">${name}</strong>
                <input type="hidden" name="window_${windowCounter}_activity" value="${key}">
                <div style="display: flex; gap: 10px; margin-top: 8px; align-items: center;">
                    <label style="font-size: 0.9rem; color: #6b7280;">Algus:</label>
                    <input type="time" name="window_${windowCounter}_start" required
                           style="padding: 6px; border: 1px solid #10b981; border-radius: 4px;">
                    <label style="font-size: 0.9rem; color: #6b7280;">Lõpp:</label>
                    <input type="time" name="window_${windowCounter}_end" required
                           style="padding: 6px; border: 1px solid #10b981; border-radius: 4px;">
                </div>
                ${key === 'muu' ? `
                    <input type="text" name="window_${windowCounter}_custom_name" placeholder="Täpsusta tegevus..."
                           style="width: 100%; margin-top: 8px; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.9rem;">
                ` : ''}
            </div>
            <button type="button" class="quick-add-btn" style="padding: 6px 12px; background: #ef4444; color: white;"
                    onclick="document.getElementById('window_${windowCounter}').remove()">Eemalda</button>
        </div>
    `;

    container.appendChild(itemDiv);
    showToast(`${name} aken lisatud!`);
}

// Puuete/erivajaduste lisamine
let abilityCounter = 0;

function quickAddAbility(key, name) {
    abilityCounter++;
    const container = document.getElementById('addedAbilities');

    const itemDiv = document.createElement('div');
    itemDiv.id = `ability_${abilityCounter}`;
    itemDiv.style.cssText = 'background: #fef2f2; padding: 12px; border-radius: 6px; margin-top: 10px; border-left: 4px solid #ef4444;';

    itemDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px;">
            <div style="flex: 1;">
                <strong style="color: #991b1b;">${name}</strong>
                <input type="hidden" name="ability_${abilityCounter}" value="${key}">
                <textarea name="ability_${abilityCounter}_notes" rows="2" placeholder="Lisa täpsustusi (nt raskusaste, abivahendid)..."
                          style="width: 100%; margin-top: 8px; padding: 6px; border: 1px solid #ef4444; border-radius: 4px; font-size: 0.9rem;"></textarea>
                ${key === 'muu' ? `
                    <input type="text" name="ability_${abilityCounter}_custom_name" placeholder="Täpsusta erivajadus..."
                           style="width: 100%; margin-top: 8px; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.9rem;">
                ` : ''}
            </div>
            <button type="button" class="quick-add-btn" style="padding: 6px 12px; background: #ef4444; color: white;"
                    onclick="document.getElementById('ability_${abilityCounter}').remove()">Eemalda</button>
        </div>
    `;

    container.appendChild(itemDiv);
    showToast(`${name} lisatud!`);
}

// PAKETT 8: Alternative/Spiritual Tools
let altToolCounter = 0;

function quickAddAltTool(key, name) {
    altToolCounter++;
    const container = document.getElementById('quickAddedAltTools');

    const itemDiv = document.createElement('div');
    itemDiv.id = `altTool_${altToolCounter}`;
    itemDiv.style.cssText = 'background: #f3f4f6; padding: 12px; border-radius: 6px; border-left: 4px solid #9ca3af; margin-bottom: 10px;';

    itemDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; gap: 15px;">
            <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <strong style="color: #4b5563;">${name}</strong>
                    <span style="background: #e5e7eb; color: #6b7280; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">belief</span>
                </div>
                <input type="hidden" name="altTool_${altToolCounter}" value="${key}">

                <div style="margin-bottom: 8px;">
                    <label style="display: block; font-size: 0.9rem; color: #64748b; margin-bottom: 4px;">Kasutamise sagedus</label>
                    <select name="altTool_${altToolCounter}_frequency"
                            style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                        <option value="">Vali...</option>
                        <option value="daily">Igapäevaselt</option>
                        <option value="weekly">Iganädalaselt</option>
                        <option value="monthly">Igakuiselt</option>
                        <option value="rarely">Harva</option>
                    </select>
                </div>

                <div>
                    <label style="display: block; font-size: 0.9rem; color: #64748b; margin-bottom: 4px;">Tulemused/tähelepanekud</label>
                    <textarea name="altTool_${altToolCounter}_results" rows="2"
                              placeholder="Nt: aura värv, tšakra blokaadid, pendli vastused..."
                              style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; font-family: inherit;"></textarea>
                </div>

                ${key === 'muu_alt' ? `
                    <div style="margin-top: 8px;">
                        <input type="text" name="altTool_${altToolCounter}_custom_name"
                               placeholder="Täpsusta tööriista nimi..."
                               style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                    </div>
                ` : ''}
            </div>
            <button type="button" class="quick-add-btn" style="padding: 6px 12px; background: #9ca3af; color: white;"
                    onclick="document.getElementById('altTool_${altToolCounter}').remove()">Eemalda</button>
        </div>
    `;

    container.appendChild(itemDiv);
    showToast(`${name} lisatud!`);
}

// PAKETT 9: Medical Portals (Europe/World)
let portalCounter = 0;

function quickAddPortal(key, name) {
    portalCounter++;
    const container = document.getElementById('quickAddedPortals');

    const itemDiv = document.createElement('div');
    itemDiv.id = `portal_${portalCounter}`;

    // Color coding by region
    let bgColor = '#dbeafe'; // Estonia - blue
    let borderColor = '#3b82f6';
    if (key.includes('ehic') || key.includes('eu_') || key.includes('soome') || key.includes('rootsi') || key.includes('saksamaa')) {
        bgColor = '#fef3c7'; // EU - yellow
        borderColor = '#f59e0b';
    } else if (key.includes('who') || key.includes('usa') || key.includes('uk') || key.includes('kanada') || key === 'muu_portaal') {
        bgColor = '#f0fdf4'; // World - green
        borderColor = '#10b981';
    }

    itemDiv.style.cssText = `background: ${bgColor}; padding: 12px; border-radius: 6px; border-left: 4px solid ${borderColor}; margin-bottom: 10px;`;

    itemDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; gap: 15px;">
            <div style="flex: 1;">
                <strong style="color: #1f2937;">${name}</strong>
                <input type="hidden" name="portal_${portalCounter}" value="${key}">

                <div style="margin-top: 8px;">
                    <label style="display: block; font-size: 0.9rem; color: #64748b; margin-bottom: 4px;">Kasutajakonto olemas?</label>
                    <div style="display: flex; gap: 10px;">
                        <label style="font-weight: normal;">
                            <input type="radio" name="portal_${portalCounter}_account" value="yes"> Jah
                        </label>
                        <label style="font-weight: normal;">
                            <input type="radio" name="portal_${portalCounter}_account" value="no"> Ei
                        </label>
                    </div>
                </div>

                <div style="margin-top: 8px;">
                    <label style="display: block; font-size: 0.9rem; color: #64748b; margin-bottom: 4px;">Viimati kasutatud</label>
                    <input type="date" name="portal_${portalCounter}_lastUsed"
                           style="padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                </div>

                <div style="margin-top: 8px;">
                    <label style="display: block; font-size: 0.9rem; color: #64748b; margin-bottom: 4px;">Täpsustus (vabatahtlik)</label>
                    <textarea name="portal_${portalCounter}_notes" rows="2"
                              placeholder="Nt: kasutajanimi, ligipääsu piirangud, andmete uuendamise sagedus..."
                              style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; font-family: inherit;"></textarea>
                </div>

                ${key === 'muu_portaal' ? `
                    <div style="margin-top: 8px;">
                        <input type="text" name="portal_${portalCounter}_custom_name"
                               placeholder="Portaali nimi (nt riik ja süsteem)..."
                               style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                    </div>
                ` : ''}
            </div>
            <button type="button" class="quick-add-btn" style="padding: 6px 12px; background: #64748b; color: white;"
                    onclick="document.getElementById('portal_${portalCounter}').remove()">Eemalda</button>
        </div>
    `;

    container.appendChild(itemDiv);
    showToast(`${name} lisatud!`);
}

// PAKETT 12: Try-If-Needed with Ordering (↑/↓)
let tryIfNeededCounter = 0;
let tryIfNeededItems = []; // Array to maintain order

function addTryIfNeeded(defaultName = '') {
    tryIfNeededCounter++;
    const itemId = `tryIfNeeded_${tryIfNeededCounter}`;

    const item = {
        id: itemId,
        counter: tryIfNeededCounter,
        name: defaultName
    };

    tryIfNeededItems.push(item);
    renderTryIfNeededList();
    showToast(`${defaultName || 'Abinõu'} lisatud!`);
}

function renderTryIfNeededList() {
    const container = document.getElementById('tryIfNeededList');
    if (!container) return;

    container.innerHTML = '';

    if (tryIfNeededItems.length === 0) {
        container.innerHTML = '<p style="color: #6b7280; font-style: italic;">Abinõud puuduvad. Lisa neid ülal olevate nuppude abil.</p>';
        return;
    }

    tryIfNeededItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.id = item.id;
        itemDiv.style.cssText = 'background: white; padding: 12px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #f59e0b; display: flex; align-items: start; gap: 10px;';

        itemDiv.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
                <button type="button" onclick="moveTryIfNeededUp(${index})"
                        ${index === 0 ? 'disabled' : ''}
                        style="padding: 2px 8px; border: 1px solid #cbd5e1; background: white; border-radius: 4px; cursor: pointer; font-size: 0.9rem;"
                        ${index === 0 ? 'style="opacity: 0.3; cursor: not-allowed;"' : ''}>
                    ↑
                </button>
                <button type="button" onclick="moveTryIfNeededDown(${index})"
                        ${index === tryIfNeededItems.length - 1 ? 'disabled' : ''}
                        style="padding: 2px 8px; border: 1px solid #cbd5e1; background: white; border-radius: 4px; cursor: pointer; font-size: 0.9rem;"
                        ${index === tryIfNeededItems.length - 1 ? 'style="opacity: 0.3; cursor: not-allowed;"' : ''}>
                    ↓
                </button>
            </div>

            <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="display: inline-block; min-width: 24px; height: 24px; background: #f59e0b; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-weight: 600; font-size: 0.85rem;">
                        ${index + 1}
                    </span>
                    <strong style="color: #92400e;">${item.name}</strong>
                </div>

                <input type="hidden" name="tryIfNeeded_${item.counter}_order" value="${index + 1}">
                <input type="hidden" name="tryIfNeeded_${item.counter}_name" value="${item.name}">

                <div style="margin-bottom: 8px;">
                    <label style="display: block; font-size: 0.9rem; color: #64748b; margin-bottom: 4px;">Millal kasutad?</label>
                    <input type="text" name="tryIfNeeded_${item.counter}_when"
                           placeholder="Nt: kui peavalu, kui iiveldus, kui ärevus..."
                           style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                </div>

                <div style="margin-bottom: 8px;">
                    <label style="display: block; font-size: 0.9rem; color: #64748b; margin-bottom: 4px;">Annus/kogus</label>
                    <input type="text" name="tryIfNeeded_${item.counter}_dose"
                           placeholder="Nt: 500mg, 1 tassike, 5 min..."
                           style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                </div>

                <div>
                    <label style="display: block; font-size: 0.9rem; color: #64748b; margin-bottom: 4px;">Täpsustus</label>
                    <textarea name="tryIfNeeded_${item.counter}_notes" rows="2"
                              placeholder="Lisa märkusi..."
                              style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; font-family: inherit;"></textarea>
                </div>

                ${item.name === 'Muu' ? `
                    <div style="margin-top: 8px;">
                        <input type="text" name="tryIfNeeded_${item.counter}_custom_name"
                               placeholder="Täpsusta abinõu nimi..."
                               style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px;">
                    </div>
                ` : ''}
            </div>

            <button type="button" onclick="removeTryIfNeeded(${index})"
                    style="padding: 6px 12px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; white-space: nowrap;">
                Eemalda
            </button>
        `;

        container.appendChild(itemDiv);
    });
}

function moveTryIfNeededUp(index) {
    if (index === 0) return;

    // Swap with previous item
    [tryIfNeededItems[index - 1], tryIfNeededItems[index]] =
    [tryIfNeededItems[index], tryIfNeededItems[index - 1]];

    renderTryIfNeededList();
    showToast('Üles liigutatud');
}

function moveTryIfNeededDown(index) {
    if (index === tryIfNeededItems.length - 1) return;

    // Swap with next item
    [tryIfNeededItems[index], tryIfNeededItems[index + 1]] =
    [tryIfNeededItems[index + 1], tryIfNeededItems[index]];

    renderTryIfNeededList();
    showToast('Alla liigutatud');
}

function removeTryIfNeeded(index) {
    const itemName = tryIfNeededItems[index].name;
    tryIfNeededItems.splice(index, 1);
    renderTryIfNeededList();
    showToast(`${itemName} eemaldatud`);
}

// PAKETT 13: Privacy Filter System for Export

function updatePrivacyFilters() {
    // Show preview of what will be filtered
    const filters = getActiveFilters();
    const preview = document.getElementById('exportPreview');
    const list = document.getElementById('filteredFieldsList');

    if (filters.length > 0) {
        preview.style.display = 'block';
        list.innerHTML = filters.map(f => `<li>${f}</li>`).join('');
    } else {
        preview.style.display = 'none';
    }
}

function getActiveFilters() {
    const filters = [];
    const filterMap = {
        'privacyFilterBelief': 'Kõik "belief" väljad (paranormaalsed uned, aura kaamera, alternatiivsed tööriistad jne)',
        'privacyFilterDeity': 'Jumala/usundi detailid (säilib ainult märge "Jumalale jagamine")',
        'privacyFilterMythology': 'Mütoloogia/identiteet info',
        'privacyFilterAstro': 'Astroloogia andmed (sünnikuupäev, -asukoht)',
        'privacyFilterBioMarkers': 'Bio-markerid (kromosoomid, gonaddid, hormonid)',
        'privacyFilterPortals': 'Meditsiiniportaalide ligipääsud ja kasutajakontod',
        'privacyFilterFinancial': 'Rahaline info (eelarve, ligipääsu kulud)',
        'privacyFilterMentalHealth': 'Vaimne tervis (ärevus, depressioon, painajad, öine ärevus)',
        'privacyFilterDisabilities': 'Puuded ja erivajadused',
        'privacyFilterSubstances': 'Sõltuvusained (alkohol, suitsetamine)',
        'privacyFilterSexualHealth': 'Seksuaaltervis detailid',
        'privacyFilterResidence': 'Elupaiga detailid (korrus, lift, naabrite info)',
        'privacyFilterWork': 'Töö piirangud ja võimekus',
        'privacyFilterFamily': 'Perekondliku riski detailid (kes, vanus)'
    };

    Object.keys(filterMap).forEach(key => {
        const checkbox = document.querySelector(`input[name="${key}"]`);
        if (checkbox && checkbox.checked) {
            filters.push(filterMap[key]);
        }
    });

    return filters;
}

function setPrivacyPreset(preset) {
    const allFilters = [
        'privacyFilterBelief',
        'privacyFilterDeity',
        'privacyFilterMythology',
        'privacyFilterAstro',
        'privacyFilterBioMarkers',
        'privacyFilterPortals',
        'privacyFilterFinancial',
        'privacyFilterMentalHealth',
        'privacyFilterDisabilities',
        'privacyFilterSubstances',
        'privacyFilterSexualHealth',
        'privacyFilterResidence',
        'privacyFilterWork',
        'privacyFilterFamily'
    ];

    if (preset === 'none') {
        // Kõik nähtav (arstile) - uncheck all filters
        allFilters.forEach(filterId => {
            const checkbox = document.querySelector(`input[name="${filterId}"]`);
            if (checkbox) checkbox.checked = false;
        });
        showToast('Kõik andmed nähtavad (sobib arstile)', 'success');

    } else if (preset === 'medical') {
        // Ainult meditsiiniline (AI-le) - filter out belief, astrology, portals, financial
        allFilters.forEach(filterId => {
            const checkbox = document.querySelector(`input[name="${filterId}"]`);
            if (checkbox) {
                checkbox.checked = [
                    'privacyFilterBelief',
                    'privacyFilterDeity',
                    'privacyFilterMythology',
                    'privacyFilterAstro',
                    'privacyFilterPortals',
                    'privacyFilterFinancial'
                ].includes(filterId);
            }
        });
        showToast('Filtreeritud: spirituaalsed, astro, portaalid, rahaline', 'info');

    } else if (preset === 'anonymous') {
        // Anonüümne (teadlastele) - filter out most personal/identifying info
        allFilters.forEach(filterId => {
            const checkbox = document.querySelector(`input[name="${filterId}"]`);
            if (checkbox) {
                checkbox.checked = ![
                    'privacyFilterMentalHealth',
                    'privacyFilterDisabilities',
                    'privacyFilterSubstances'
                ].includes(filterId); // Keep only mental health, disabilities, substances visible
            }
        });
        showToast('Anonüümne režiim: enamik isikuandmeid peidetud', 'warning');

    } else if (preset === 'custom') {
        // Clear all selections
        allFilters.forEach(filterId => {
            const checkbox = document.querySelector(`input[name="${filterId}"]`);
            if (checkbox) checkbox.checked = false;
        });
        showToast('Filtrid tühistatud - vali käsitsi', 'info');
    }

    updatePrivacyFilters();
}

// Export function that respects privacy filters
function exportWithPrivacyFilters(format) {
    const filters = getActiveFilters();

    if (filters.length > 0) {
        const filterCount = filters.length;
        const confirmed = confirm(
            `⚠️ HOIATUS: ${filterCount} kategooriat filtreeritud.\n\n` +
            `Järgmised väljad EI kajastu ekspordis:\n\n` +
            filters.map(f => `• ${f}`).join('\n') +
            `\n\nKas soovid jätkata eksportimist?`
        );

        if (!confirmed) {
            showToast('Eksport katkestatud', 'info');
            return false;
        }
    }

    showToast(`Eksportimine algas (${format.toUpperCase()})...`, 'success');
    // TODO: Actual export logic would filter out data based on active filters
    return true;
}
