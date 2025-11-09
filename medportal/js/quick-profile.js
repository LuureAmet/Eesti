// ============================================
// KIIRPROFIILI SPETSIIFILISED FUNKTSIOONID
// ============================================

// Globaalne vormiandmed
let formDataGlobal = {};

// Ravimite sektsiooni näitamine/peitmine
document.addEventListener('DOMContentLoaded', () => {
    const takingMedsRadios = document.querySelectorAll('input[name="takingMeds"]');
    const medicationSection = document.getElementById('medicationSection');

    takingMedsRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'yes') {
                medicationSection.classList.remove('hidden');
            } else {
                medicationSection.classList.add('hidden');
            }
        });
    });

    // Vormi submit
    const form = document.getElementById('quickProfileForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

// Vormi esitamise käsitlemine
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;

    // Validatsioon
    if (!validateForm(form)) {
        return;
    }

    // Ekstrakti andmed
    formDataGlobal = extractFormData(form);

    // Lisa arvutatud väljad
    if (formDataGlobal.weight && formDataGlobal.height) {
        formDataGlobal.bmi = calculateBMI(
            parseFloat(formDataGlobal.weight),
            parseFloat(formDataGlobal.height)
        );
    }

    // Näita väljundit
    showOutput();
}

// Väljundi näitamine
function showOutput() {
    const outputSection = document.getElementById('output');
    const previewDiv = document.getElementById('preview');

    // Genereeri eelvaade
    const txtContent = generateTxt(formDataGlobal, 'Kiirprofiil');
    previewDiv.textContent = txtContent;

    // Näita sektsiooni
    outputSection.classList.remove('hidden');
    outputSection.scrollIntoView({ behavior: 'smooth' });
}

// TXT allalaadimine
function downloadTxt() {
    const content = generateTxt(formDataGlobal, 'Kiirprofiil');
    const filename = `kiirprofiil_${formatDate()}.txt`;
    downloadFile(content, filename, 'text/plain');
}

// PDF allalaadimine
function downloadPdf() {
    // Hetkel lihtsalt TXT - hiljem saab kasutada jsPDF
    const content = generatePdf(formDataGlobal, 'Kiirprofiil');
    const filename = `kiirprofiil_${formatDate()}.pdf`;
    downloadFile(content, filename, 'application/pdf');
    alert('ℹ️ PDF genereeritud tekstiformaadis. Täiustatud PDF tugi tulekul!');
}

// JSON allalaadimine
function downloadJson() {
    const content = generateJson(formDataGlobal);
    const filename = `kiirprofiil_${formatDate()}.json`;
    downloadFile(content, filename, 'application/json');
}

// AI promti kopeerimine
function copyAiPrompt() {
    const prompt = generateAiPrompt(formDataGlobal);
    copyToClipboard(prompt);
}

// Kuupäeva vormindamine
function formatDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// AI promti rikastatud versioon kiirprofiilile
function generateAiPrompt(data) {
    let prompt = `═══════════════════════════════════════════════════════════\n`;
    prompt += `MEDITSIINILINE KONSULTATSIOON - KIIRPROFIIL\n`;
    prompt += `═══════════════════════════════════════════════════════════\n\n`;

    // PÕHIANDMED
    prompt += `📋 PÕHIANDMED:\n`;
    prompt += `- Vanus: ${data.age || 'X'} aastat\n`;
    prompt += `- Sugu: ${data.gender || 'määramata'}\n`;
    prompt += `- Pikkus: ${data.height || 'X'} cm\n`;
    prompt += `- Kaal: ${data.weight || 'X'} kg\n`;
    if (data.bmi) {
        prompt += `- BMI: ${data.bmi}\n`;
    }
    prompt += `\n`;

    // DIAGNOOS JA KAEBUSED
    prompt += `🩺 DIAGNOOS JA KAEBUSED:\n`;
    prompt += `- Põhidiagnoos: ${data.mainDiagnosis || 'määramata'}\n`;
    prompt += `- Peamine kaebus:\n  ${data.mainComplaint || 'Kirjeldus puudub'}\n`;
    prompt += `\n`;

    // SÜMPTOMID
    prompt += `📊 SÜMPTOMITE SKOOR (0-3):\n`;
    prompt += `- Õhupuudus: ${data.breathlessness || '0'}/3\n`;
    prompt += `- Väsimus: ${data.fatigue || '0'}/3\n`;
    prompt += `- Turse: ${data.swelling || '0'}/3\n`;
    prompt += `- Rindkerevalu: ${data.chestPain || '0'}/3\n`;
    prompt += `\n`;

    // RAVIMID
    if (data.takingMeds === 'yes') {
        prompt += `💊 PRAEGUSED RAVIMID:\n`;
        prompt += `${data.medications || 'Nimekiri puudub'}\n`;
        if (data.anticoagulant) {
            prompt += `⚠️ VÕTAB ANTIKOAGULANTI (verevedeldajat)\n`;
        }
        prompt += `\n`;
    } else {
        prompt += `💊 RAVIMID: Ei võta praegu ravimeid\n\n`;
    }

    // EELISTUSED
    prompt += `🌿 RAVI EELISTUSED:\n`;
    prompt += `- Lähenemine: ${data.approach || 'määramata'}\n`;
    prompt += `- Aeg rutiinideks päevas: ${data.timeAvailable || 'määramata'}\n`;
    prompt += `\n`;

    // ELUSTIIL
    prompt += `🏃 ELUSTIIL:\n`;
    prompt += `- Aktiivsustase: ${data.activityLevel || 'määramata'}\n`;
    prompt += `- Uneaeg: ${data.sleepHours || 'X'} tundi ööpäevas\n`;
    if (data.smoking || data.alcohol || data.rural) {
        prompt += `- Eluviis: `;
        const lifestyle = [];
        if (data.smoking === 'no') lifestyle.push('ei suitseta');
        if (data.alcohol === 'no') lifestyle.push('ei joo');
        if (data.rural) lifestyle.push('maaelu');
        prompt += lifestyle.join(', ') + '\n';
    }
    prompt += `\n`;

    // EESMÄRGID
    prompt += `🎯 EESMÄRGID (3-6 kuud):\n`;
    prompt += `${data.goals || 'Määramata'}\n`;
    prompt += `\n`;

    // LISAINFO
    if (data.additionalInfo) {
        prompt += `📝 LISAINFO:\n`;
        prompt += `${data.additionalInfo}\n`;
        prompt += `\n`;
    }

    // PÄRING AI-LE
    prompt += `═══════════════════════════════════════════════════════════\n`;
    prompt += `PALUN AI KONSULTATSIOON:\n`;
    prompt += `═══════════════════════════════════════════════════════════\n\n`;

    prompt += `Palun soovita mulle holistilist ja praktilisi lahendusi:\n\n`;

    prompt += `1. 📅 PÄEVAPLAAN:\n`;
    prompt += `   - Konkreetsed ajad ja kestused\n`;
    prompt += `   - Hingamisharjutused (tehnika ja kestus)\n`;
    prompt += `   - Liikumispraktikad (qigong, taiji, jalutused)\n`;
    prompt += `   - Toidukava (konkreetsed näited)\n\n`;

    prompt += `2. 🌿 TAIMRAVI:\n`;
    prompt += `   - Sobivad taimed ja annused\n`;
    prompt += `   - Koostoime riskide analüüs\n`;
    prompt += `   - Ajastus ja kasutusviis\n\n`;

    prompt += `3. 💊 LISANDID:\n`;
    prompt += `   - Vajalikud mineraalid/vitamiinid\n`;
    prompt += `   - Annused ja ajastus\n\n`;

    prompt += `4. ⚠️ OHUTUSMEETMED:\n`;
    prompt += `   - Punased lipud (millal pöörduda arsti poole)\n`;
    prompt += `   - Koostoimed (eriti kui võtan antikoagulanti)\n`;
    prompt += `   - Vastunäidustused\n\n`;

    prompt += `5. 📊 JÄLGIMINE:\n`;
    prompt += `   - Mida mõõta (kaal, BP, pulss)\n`;
    prompt += `   - Kui sageli kontrollida\n`;
    prompt += `   - Milliseid märke jälgida\n\n`;

    prompt += `6. 🎯 PRIORITEEDID:\n`;
    prompt += `   - TOP 3 asja, millega alustada\n`;
    prompt += `   - Millal oodata tulemusi\n`;
    prompt += `   - Kuidas hinnata progressi\n\n`;

    prompt += `TÄHTIS: Võta arvesse minu eelistust "${data.approach}" ja aega "${data.timeAvailable}".\n`;

    if (data.anticoagulant) {
        prompt += `\n⚠️ OLULINE: Võtan antikoagulanti - palun väldi soovitusi, mis võivad koostoimesse minna!\n`;
    }

    return prompt;
}
