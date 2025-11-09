// ============================================
// TÄISPROFIILI SPETSIIFILISED FUNKTSIOONID
// ============================================

let formDataGlobal = {};

// Dünaamilised show/hide funktsioonid
document.addEventListener('DOMContentLoaded', () => {
    // Allergiate detailid
    const allergiesRadios = document.querySelectorAll('input[name="allergies"]');
    allergiesRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const detail = document.getElementById('allergiesDetail');
            if (e.target.value === 'yes') {
                detail.classList.remove('hidden');
            } else {
                detail.classList.add('hidden');
            }
        });
    });

    // Antikoagulandi detailid
    const anticoagRadios = document.querySelectorAll('input[name="anticoagulant"]');
    anticoagRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const detail = document.getElementById('anticoagulantDetails');
            if (e.target.value === 'yes') {
                detail.classList.remove('hidden');
            } else {
                detail.classList.add('hidden');
            }
        });
    });

    // Taimravi detailid (kui lisatakse)
    setupHerbDetails();

    // Progress tracking
    updateProgress();
});

// Ravimite tabeli rea lisamine
function addMedicationRow() {
    const tbody = document.getElementById('medicationTableBody');
    const newRow = tbody.insertRow();

    newRow.innerHTML = `
        <td><input type="text" name="medName[]" placeholder="Nimi"></td>
        <td><input type="text" name="medDose[]" placeholder="mg"></td>
        <td><input type="text" name="medTiming[]" placeholder="Hommikul"></td>
        <td><input type="text" name="medStart[]" placeholder="2023"></td>
        <td><input type="number" name="medEffect[]" min="0" max="3"></td>
        <td><input type="text" name="medSideEffect[]"></td>
        <td>
            <select name="medContinue[]">
                <option value="yes">Jah</option>
                <option value="no">Ei</option>
            </select>
        </td>
        <td><button type="button" class="remove-row" onclick="removeRow(this)">×</button></td>
    `;

    newRow.classList.add('dynamic-field');
}

// Rea eemaldamine
function removeRow(btn) {
    const row = btn.closest('tr');
    row.remove();
}

// Taimravi detailide seadistamine
function setupHerbDetails() {
    // Seda täiendatakse kui lisame taimravi sektsiooni
}

// Vormi salvestamine ja hiljem jätkamine
function saveAndContinue() {
    saveForm();
    alert('✓ Vorm salvestatud! Saad hiljem jätkata.');
    window.location.href = '../index.html';
}

// Vormi validatsioon (täiustatud versioon)
function validateFullProfile() {
    const form = document.getElementById('fullProfileForm');

    // Põhiline validatsioon
    const requiredInputs = form.querySelectorAll('[required]');
    let isValid = true;
    let errors = [];

    requiredInputs.forEach(input => {
        if (!input.value || input.value.trim() === '') {
            isValid = false;
            input.style.borderColor = 'red';
            errors.push(input.name || input.id);
        } else {
            input.style.borderColor = '';
        }
    });

    // Spetsiifilised validatsioonid
    // 1. Vererõhu formaat kontroll
    const bpFields = ['bpMorning', 'bpEvening'];
    bpFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.value) {
            const bpPattern = /^\d{2,3}\/\d{2,3}$/;
            if (!bpPattern.test(field.value)) {
                isValid = false;
                field.style.borderColor = 'red';
                errors.push(fieldId + ' (Formaat: 120/80)');
            }
        }
    });

    // 2. BMI arvutamine ja hoiatus
    const weight = parseFloat(document.getElementById('weight1')?.value);
    const height = parseFloat(document.getElementById('height1')?.value);
    if (weight && height) {
        const bmi = calculateBMI(weight, height);
        if (bmi < 16 || bmi > 40) {
            if (!confirm(`Hoiatus: BMI on ${bmi}. Kas jätkad?`)) {
                return false;
            }
        }
    }

    if (!isValid) {
        alert('Palun kontrolli järgmised väljad:\n' + errors.join('\n'));
        return false;
    }

    return true;
}

// Ekspordi funktsioonid täisprofiilile
function exportFullProfile(format) {
    const form = document.getElementById('fullProfileForm');

    if (!validateFullProfile()) {
        return;
    }

    formDataGlobal = extractFormData(form);

    // Lisa arvutatud väljad
    if (formDataGlobal.weight && formDataGlobal.height) {
        formDataGlobal.bmi = calculateBMI(
            parseFloat(formDataGlobal.weight),
            parseFloat(formDataGlobal.height)
        );
    }

    // Lisa ravimite kokkuvõte
    formDataGlobal.medicationSummary = generateMedicationSummary();

    switch(format) {
        case 'txt':
            downloadTxtFull();
            break;
        case 'pdf':
            downloadPdfFull();
            break;
        case 'json':
            downloadJsonFull();
            break;
        case 'ai':
            copyAiPromptFull();
            break;
    }
}

// Ravimite kokkuvõte
function generateMedicationSummary() {
    const names = document.querySelectorAll('input[name="medName[]"]');
    const doses = document.querySelectorAll('input[name="medDose[]"]');
    const timings = document.querySelectorAll('input[name="medTiming[]"]');

    let summary = [];

    names.forEach((nameInput, index) => {
        if (nameInput.value.trim() !== '') {
            summary.push({
                name: nameInput.value,
                dose: doses[index]?.value || '',
                timing: timings[index]?.value || ''
            });
        }
    });

    return summary;
}

// TXT eksport täisprofiilile
function downloadTxtFull() {
    let txt = `═══════════════════════════════════════════════════════════\n`;
    txt += `  HOLISTILINE TERVISEPROFIIL - TÄISVERSIOON\n`;
    txt += `  Genereeritud: ${new Date().toLocaleString('et-EE')}\n`;
    txt += `═══════════════════════════════════════════════════════════\n\n`;

    // SEKTSIOON 0: Privaatsus
    txt += `[SEKTSIOON 0: PRIVAATSUS JA NÕUSOLEK]\n`;
    txt += `Jagamise tase: `;
    if (formDataGlobal.shareDoctor) txt += `Arst `;
    if (formDataGlobal.shareFamily) txt += `Perekond `;
    if (formDataGlobal.shareAnonymous) txt += `Anonüümne `;
    txt += `\n`;
    if (formDataGlobal.noShare) txt += `Ei jagata: ${formDataGlobal.noShare}\n`;
    if (formDataGlobal.emergencyContact) {
        txt += `Hädakontakt: ${formDataGlobal.emergencyContact} (${formDataGlobal.emergencyPhone || 'N/A'})\n`;
    }
    txt += `\n`;

    // SEKTSIOON 1: Profiil
    txt += `[SEKTSIOON 1: PROFIIL JA ELURÜTM]\n`;
    txt += `Vanus: ${formDataGlobal.age || 'N/A'} a\n`;
    txt += `Sugu: ${formDataGlobal.gender || 'N/A'}\n`;
    txt += `Pikkus: ${formDataGlobal.height || 'N/A'} cm\n`;
    txt += `Kaal: ${formDataGlobal.weight || 'N/A'} kg\n`;
    if (formDataGlobal.targetWeight) txt += `Soovkaal: ${formDataGlobal.targetWeight} kg\n`;
    if (formDataGlobal.bmi) txt += `BMI: ${formDataGlobal.bmi}\n`;
    txt += `Aktiivsus: ${formDataGlobal.activity || 'N/A'}\n`;
    txt += `Uneaeg: ${formDataGlobal.sleepHours || 'N/A'} h, kvaliteet: ${formDataGlobal.sleepQuality || 'N/A'}/3\n`;
    txt += `Stress: ${formDataGlobal.stressLevel || 'N/A'}/3`;
    if (formDataGlobal.stressors) txt += ` (${formDataGlobal.stressors})`;
    txt += `\n\n`;

    // SEKTSIOON 2: Sümptomid
    txt += `[SEKTSIOON 2: SÜMPTOMID (skoor 0-3)]\n`;
    txt += `Õhupuudus: ${formDataGlobal.breathlessness || 0}/3\n`;
    txt += `Turse: ${formDataGlobal.swelling || 0}/3\n`;
    txt += `Väsimus: ${formDataGlobal.fatigue || 0}/3\n`;
    txt += `Südamepekslemine: ${formDataGlobal.palpitations || 0}/3\n`;
    txt += `Rindkerevalu: ${formDataGlobal.chestPain || 0}/3\n`;
    txt += `Pearinglus: ${formDataGlobal.dizziness || 0}/3\n`;
    if (formDataGlobal.nightWaking) txt += `Öine ärkamine: ${formDataGlobal.nightWaking}×/öö\n`;
    txt += `Koormustaluvus: ${formDataGlobal.exerciseTolerance || 'N/A'}\n\n`;

    // SEKTSIOON 3: Mõõtmised
    txt += `[SEKTSIOON 3: MÕÕTMISED]\n`;
    if (formDataGlobal.bpMorning) txt += `BP hommikul: ${formDataGlobal.bpMorning} mmHg\n`;
    if (formDataGlobal.bpEvening) txt += `BP õhtul: ${formDataGlobal.bpEvening} mmHg\n`;
    if (formDataGlobal.restingHR) txt += `Pulss rahus: ${formDataGlobal.restingHR} lpm\n`;
    if (formDataGlobal.dailySteps) txt += `Päevased sammud: ${formDataGlobal.dailySteps}\n`;
    txt += `\n`;

    // SEKTSIOON 4: Ajalugu
    txt += `[SEKTSIOON 4: AJALUGU]\n`;
    if (formDataGlobal.diagnoses) txt += `Diagnoosid: ${formDataGlobal.diagnoses}\n`;
    txt += `Perekondlik risk: ${formDataGlobal.familyRisk || 'N/A'}\n`;
    txt += `Allergiad: ${formDataGlobal.allergies || 'N/A'}`;
    if (formDataGlobal.allergiesText) txt += ` - ${formDataGlobal.allergiesText}`;
    txt += `\n\n`;

    // SEKTSIOON 5: Ravimid
    txt += `[SEKTSIOON 5: RAVIMID]\n`;
    if (formDataGlobal.medicationSummary && formDataGlobal.medicationSummary.length > 0) {
        formDataGlobal.medicationSummary.forEach((med, i) => {
            txt += `${i+1}. ${med.name} - ${med.dose} - ${med.timing}\n`;
        });
    } else {
        txt += `Ravimeid ei kasuta\n`;
    }
    if (formDataGlobal.anticoagulant === 'yes') {
        txt += `⚠ ANTIKOAGULANT: ${formDataGlobal.anticoagulantName || 'N/A'} ${formDataGlobal.anticoagulantDose || ''}\n`;
    }
    txt += `\n`;

    txt += `═══════════════════════════════════════════════════════════\n`;
    txt += `Loodud Meditsiiniportaali poolt | v1.0\n`;
    txt += `═══════════════════════════════════════════════════════════`;

    const filename = `taisprofiil_${formatDate()}.txt`;
    downloadFile(txt, filename, 'text/plain');
}

// JSON eksport
function downloadJsonFull() {
    const content = generateJson(formDataGlobal);
    const filename = `taisprofiil_${formatDate()}.json`;
    downloadFile(content, filename, 'application/json');
}

// PDF eksport
function downloadPdfFull() {
    // Praegu lihtsalt TXT - hiljem lisame jsPDF
    const txt = generateTxt(formDataGlobal, 'Täisprofiil');
    const filename = `taisprofiil_${formatDate()}.pdf`;
    downloadFile(txt, filename, 'application/pdf');
    alert('ℹ PDF genereeritud tekstiformaadis. Täiustatud PDF tugi tulekul!');
}

// AI prompt (täiustatud)
function copyAiPromptFull() {
    let prompt = generateAiPromptAdvanced();
    copyToClipboard(prompt);
}

// Täiustatud AI prompt
function generateAiPromptAdvanced() {
    let prompt = `═══════════════════════════════════════════════════════════\n`;
    prompt += `HOLISTILINE MEDITSIINILINE KONSULTATSIOON\n`;
    prompt += `Täisprofiil | ${new Date().toLocaleDateString('et-EE')}\n`;
    prompt += `═══════════════════════════════════════════════════════════\n\n`;

    prompt += `PATSIENT:\n`;
    prompt += `${formDataGlobal.age || 'X'}a ${formDataGlobal.gender || 'N/A'}, `;
    prompt += `${formDataGlobal.height || 'X'}cm, ${formDataGlobal.weight || 'X'}kg`;
    if (formDataGlobal.bmi) prompt += ` (BMI ${formDataGlobal.bmi})`;
    prompt += `\n\n`;

    if (formDataGlobal.diagnoses) {
        prompt += `DIAGNOOSID:\n${formDataGlobal.diagnoses}\n\n`;
    }

    prompt += `SÜMPTOMID (0-3):\n`;
    prompt += `Õhupuudus: ${formDataGlobal.breathlessness || 0}, `;
    prompt += `Turse: ${formDataGlobal.swelling || 0}, `;
    prompt += `Väsimus: ${formDataGlobal.fatigue || 0}, `;
    prompt += `Rindkerevalu: ${formDataGlobal.chestPain || 0}\n\n`;

    if (formDataGlobal.medicationSummary && formDataGlobal.medicationSummary.length > 0) {
        prompt += `RAVIMID:\n`;
        formDataGlobal.medicationSummary.forEach(med => {
            prompt += `- ${med.name} ${med.dose} (${med.timing})\n`;
        });
        prompt += `\n`;
    }

    if (formDataGlobal.anticoagulant === 'yes') {
        prompt += `⚠ VÕTAB ANTIKOAGULANTI: ${formDataGlobal.anticoagulantName || 'ei täpsustatud'}\n`;
        prompt += `OLULINE: Väldi koostoimeid!\n\n`;
    }

    prompt += `───────────────────────────────────────────────────────────\n`;
    prompt += `PALUN SOOVITA:\n\n`;
    prompt += `1. Holistilist päevaplaani (hingamine, liikumine, toitumine)\n`;
    prompt += `2. Taimravi võimalused (arvestades koostoimeid)\n`;
    prompt += `3. Jälgimise plaani (BP, kaal, sümptomid)\n`;
    prompt += `4. Riskide maandamist ja ohumärke\n`;
    prompt += `5. Prioriteedid ja reaalsed eesmärgid\n`;

    return prompt;
}

// Abiline funktsioon kuupäeva jaoks
function formatDate() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
