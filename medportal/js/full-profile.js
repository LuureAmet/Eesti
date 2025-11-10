// VERSION: 1.2.0 - 2025-01-09
// ============================================
// TÄISPROFIILI TÄIUSTATUD VERSIOON
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

// Vormi salvestamine ja hiljem jätkamine
function saveAndContinue() {
    saveForm();
    alert('✓ Vorm salvestatud! Saad hiljem jätkata.');
    window.location.href = '../index.html';
}

// Ekspordi funktsioon (peamine)
function exportFullProfile(format) {
    const form = document.getElementById('fullProfileForm');

    // Ekstrakti andmed (ilma validatsioonita - kõik vabatahtlik!)
    formDataGlobal = extractFormData(form);

    // Lisa arvutatud väljad
    if (formDataGlobal.weight && formDataGlobal.height) {
        const weight = parseFloat(formDataGlobal.weight);
        const height = parseFloat(formDataGlobal.height);
        formDataGlobal.bmi = calculateBMI(weight, height);

        // Lisa siht-BMI
        if (formDataGlobal.targetWeight) {
            const targetWeight = parseFloat(formDataGlobal.targetWeight);
            formDataGlobal.targetBmi = calculateBMI(targetWeight, height);
        }
    }

    // Lisa ravimite kokkuvõte
    formDataGlobal.medicationSummary = generateMedicationSummary();

    // Näita eelvaade või ekspordi
    if (format === 'txt' || format === 'ai') {
        showPreview(format);
    } else {
        performExport(format);
    }
}

// Eelvaate modal
function showPreview(format) {
    let content = '';

    if (format === 'txt') {
        content = generateFullTxt();
    } else if (format === 'ai') {
        content = generateAiPromptAdvanced();
    }

    // Loo modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
    `;

    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 12px; max-width: 800px; max-height: 80vh; overflow: auto;">
            <h2>Eelvaade</h2>
            <pre style="background: #f5f5f5; padding: 20px; border-radius: 8px; overflow: auto; max-height: 400px; white-space: pre-wrap;">${escapeHtml(content)}</pre>
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                <button class="btn btn-primary" onclick="copyToClipboard(\`${content.replace(/`/g, '\\`')}\`); alert('✓ Kopeeritud!');">Kopeeri</button>
                <button class="btn btn-primary" onclick="performExportDirect('${format}')">Lae alla</button>
                <button class="btn btn-secondary" onclick="this.closest('div').parentElement.parentElement.remove()">Sulge</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// HTML escape
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Otsene eksport
function performExportDirect(format) {
    document.querySelector('div[style*="position: fixed"]')?.remove();
    performExport(format);
}

// Ekspordi teostamine
function performExport(format) {
    switch(format) {
        case 'txt':
            downloadTxtFull();
            break;
        case 'json':
            downloadJsonFull();
            break;
        case 'pdf':
            downloadPdfFull();
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

// TÄIELIK TXT GENEREERIMINE - KÕIK 18 SEKTSIOONI
function generateFullTxt() {
    const d = formDataGlobal;
    const now = new Date();

    let txt = `═══════════════════════════════════════════════════════════\n`;
    txt += `  HOLISTILINE TERVISEPROFIIL - TÄISVERSIOON\n`;
    txt += `  Genereeritud: ${now.toLocaleString('et-EE', {timeZone: 'Europe/Tallinn', hour12: false})}\n`;
    txt += `  UTC: ${now.toISOString()}\n`;
    txt += `═══════════════════════════════════════════════════════════\n\n`;

    // PRIVAATSUSFILTRID
    let filters = [];
    if (d.noShare) filters.push(d.noShare);
    if (filters.length > 0) {
        txt += `Andmefiltrid: [${filters.join(', ')}] peidetud\n\n`;
    }

    // SEKTSIOON 0
    txt += `[SEKTSIOON 0: PRIVAATSUS JA NÕUSOLEK]\n`;
    txt += `Jagamise tase: `;
    if (d.shareDoctor) txt += `Arst `;
    if (d.shareFamily) txt += `Perekond `;
    if (d.shareAnonymous) txt += `Anonüümne `;
    txt += `\n`;
    if (d.noShare) txt += `Ei jagata: ${d.noShare}\n`;
    if (d.emergencyContact) txt += `Hädakontakt: ${d.emergencyContact} (${d.emergencyPhone || 'N/A'})\n`;
    txt += `\n`;

    // SEKTSIOON 1
    txt += `[SEKTSIOON 1: PROFIIL JA ELURÜTM]\n`;
    txt += `Vanus: ${d.age || 'N/A'} a\n`;
    txt += `Sugu: ${d.gender || 'N/A'}\n`;
    txt += `Pikkus: ${d.height || 'N/A'} cm\n`;
    txt += `Kaal: ${d.weight || 'N/A'} kg\n`;
    if (d.targetWeight) {
        txt += `Soovkaal: ${d.targetWeight} kg`;
        if (d.targetBmi) txt += ` (Siht-BMI: ${d.targetBmi})`;
        txt += `\n`;
    }
    if (d.bmi) txt += `Praegune BMI: ${d.bmi}\n`;

    // Eluviis
    txt += `Eluviis: `;
    if (d.rural) txt += `maaelu `;
    if (d.urban) txt += `linn `;
    if (d.nightShift) txt += `öötöö `;
    txt += `\n`;
    if (d.travelDays) txt += `Pikad sõidud: ${d.travelDays} päeva/nädalas\n`;

    // Aknad
    if (d.morningWindow || d.noonWindow || d.eveningWindow || d.sleepTime) {
        txt += `Optimaalsed aknad: `;
        if (d.morningWindow) txt += `Hommik ${d.morningWindow}, `;
        if (d.noonWindow) txt += `Keskpäev ${d.noonWindow}, `;
        if (d.eveningWindow) txt += `Õhtu ${d.eveningWindow}, `;
        if (d.sleepTime) txt += `Une ${d.sleepTime}`;
        txt += `\n`;
    }

    txt += `Aktiivsus: ${d.activity || 'N/A'}\n`;
    txt += `Uneaeg: ${d.sleepHours || 'N/A'} h, kvaliteet: ${d.sleepQuality || 'N/A'}/3\n`;
    txt += `Norskamine/pausid: ${d.snoring || 'N/A'}\n`;
    txt += `Stress: ${d.stressLevel || 'N/A'}/3`;
    if (d.stressors) txt += ` (${d.stressors})`;
    txt += `\n\n`;

    // SEKTSIOON 2
    txt += `[SEKTSIOON 2: SÜMPTOMID (skoor 0-3)]\n`;
    txt += `Õhupuudus: ${d.breathlessness || 0}/3\n`;
    txt += `Turse: ${d.swelling || 0}/3\n`;
    txt += `Väsimus: ${d.fatigue || 0}/3\n`;
    txt += `Südamepekslemine: ${d.palpitations || 0}/3\n`;
    txt += `Rindkerevalu: ${d.chestPain || 0}/3\n`;
    txt += `Pearinglus: ${d.dizziness || 0}/3\n`;
    if (d.nightWaking) txt += `Öine ärkamine: ${d.nightWaking}×/öö\n`;
    txt += `Koormustaluvus: ${d.exerciseTolerance || 'N/A'}\n\n`;

    // SEKTSIOON 3
    txt += `[SEKTSIOON 3: MÕÕTMISED]\n`;
    txt += `Vererõhumõõtja: ${d.bpMonitor || 'N/A'}\n`;
    if (d.bpMorning) txt += `BP hommikul: ${d.bpMorning} mmHg\n`;
    if (d.bpEvening) txt += `BP õhtul: ${d.bpEvening} mmHg\n`;
    if (d.restingHR) txt += `Pulss rahus: ${d.restingHR} lpm\n`;
    txt += `Sammulugeja: ${d.stepCounter || 'N/A'}\n`;
    if (d.dailySteps) txt += `Päevased sammud: ${d.dailySteps}\n`;
    txt += `Kaalumine igal hommikul: ${d.dailyWeight || 'N/A'}\n`;
    txt += `Kaalutrend (7p): ${d.weightTrend || 'N/A'}\n`;
    txt += `\n`;

    // SEKTSIOON 4
    txt += `[SEKTSIOON 4: AJALUGU]\n`;
    if (d.diagnoses) txt += `Diagnoosid: ${d.diagnoses}\n`;
    txt += `Perekondlik risk: ${d.familyRisk || 'N/A'}\n`;
    txt += `Allergiad: ${d.allergies || 'N/A'}`;
    if (d.allergiesText) txt += ` - ${d.allergiesText}`;
    txt += `\n\n`;

    // SEKTSIOON 5
    txt += `[SEKTSIOON 5: RAVIMID]\n`;
    if (d.medicationSummary && d.medicationSummary.length > 0) {
        d.medicationSummary.forEach((med, i) => {
            txt += `${i+1}. ${med.name} - ${med.dose} - ${med.timing}\n`;
        });
    } else {
        txt += `Ravimeid ei kasuta\n`;
    }
    if (d.anticoagulant === 'yes') {
        txt += `\n⚠ ANTIKOAGULANT (verevedeldaja): ${d.anticoagulantName || 'N/A'} ${d.anticoagulantDose || ''}\n`;
        txt += `Neerufunktsioon teada: ${d.kidneyFunction || 'N/A'}\n`;
    }
    txt += `\n`;

    // SEKTSIOON 6
    txt += `[SEKTSIOON 6: TAIMRAVI]\n`;
    if (d.hawthornTea || d.hawthornExtract) {
        txt += `Viirpuu: `;
        if (d.hawthornTea) txt += `tee `;
        if (d.hawthornExtract) txt += `ekstrakt `;
        if (d.hawthornEffect) txt += `(mõju: ${d.hawthornEffect})`;
        txt += `\n`;
    }
    txt += `Arjuna: ${d.arjuna || 'N/A'}\n`;
    txt += `Hibiscus: ${d.hibiscus || 'N/A'}\n`;
    if (d.herbDanShen || d.herbGinseng || d.herbAstragalus || d.herbReishi || d.herbSeaweed) {
        txt += `Muud taimed: `;
        if (d.herbDanShen) txt += `Dan Shen, `;
        if (d.herbGinseng) txt += `Ginseng, `;
        if (d.herbAstragalus) txt += `Astragalus, `;
        if (d.herbReishi) txt += `Reishi, `;
        if (d.herbSeaweed) txt += `Merevetikas`;
        txt += `\n`;
    }
    if (d.herbsOther) txt += `Lisainfo: ${d.herbsOther}\n`;
    txt += `\n`;

    // SEKTSIOON 7
    txt += `[SEKTSIOON 7: TOITUMINE]\n`;
    txt += `Söögirütm: ${d.mealFrequency || 'N/A'}\n`;
    txt += `Paast: ${d.fasting || 'N/A'}\n`;
    if (d.favoriteFood) txt += `Meeldib: ${d.favoriteFood}\n`;
    if (d.restrictGluten || d.restrictDairy || d.restrictMeat || d.restrictSugar || d.restrictSalt) {
        txt += `Piirangud: `;
        if (d.restrictGluten) txt += `gluteen, `;
        if (d.restrictDairy) txt += `piim, `;
        if (d.restrictMeat) txt += `liha, `;
        if (d.restrictSugar) txt += `suhkur, `;
        if (d.restrictSalt) txt += `sool`;
        txt += `\n`;
    }
    if (d.waterIntake) txt += `Vedelik: ${d.waterIntake} l/päev\n`;
    if (d.coffeeCups) txt += `Kohv: ${d.coffeeCups} tassi/päev\n`;
    txt += `Sool: ${d.saltIntake || 'N/A'}\n`;
    txt += `\n`;

    // SEKTSIOON 8
    txt += `[SEKTSIOON 8: KEHALISED PRAKTIKAD]\n`;
    if (d.breathCoherent || d.breathAlternate || d.breathOther) {
        txt += `Hingamine: `;
        if (d.breathCoherent) txt += `Koherents 5-5, `;
        if (d.breathAlternate) txt += `Vahelduvnina, `;
        if (d.breathOther) txt += `Muu`;
        if (d.breathMinutes) txt += ` (${d.breathMinutes} min/päev)`;
        txt += `\n`;
    }
    if (d.moveWalk || d.move8Brocades || d.moveTaiji || d.moveYoga) {
        txt += `Liikumine: `;
        if (d.moveWalk) txt += `Jalutus, `;
        if (d.move8Brocades) txt += `8 Brokaati, `;
        if (d.moveTaiji) txt += `Taiji, `;
        if (d.moveYoga) txt += `Jooga`;
        if (d.moveMinutes) txt += ` (${d.moveMinutes} min/päev)`;
        txt += `\n`;
    }
    txt += `Vann/leotus: ${d.bathFrequency || 'N/A'}\n`;
    txt += `\n`;

    // SEKTSIOON 9
    txt += `[SEKTSIOON 9: MEELE PRAKTIKAD]\n`;
    if (d.meditZazen || d.meditMetta || d.meditMantra) {
        txt += `Meditatsioon: `;
        if (d.meditZazen) txt += `Zazen, `;
        if (d.meditMetta) txt += `Metta, `;
        if (d.meditMantra) txt += `Mantra`;
        if (d.meditMinutes) txt += ` (${d.meditMinutes} min/päev)`;
        txt += `\n`;
    }
    if (d.calmingMusic) txt += `Rahustav muusika: ${d.calmingMusic}\n`;
    txt += `\n`;

    // SEKTSIOON 10
    txt += `[SEKTSIOON 10: IDEOLOOGIA]\n`;
    txt += `Looduslik enne ravimeid: ${d.naturalFirst || 'N/A'}\n`;
    txt += `Otsustusõigus: ${d.decisionMaker || 'N/A'}\n`;
    if (d.notWilling) txt += `Ei soovi: ${d.notWilling}\n`;
    if (d.willing1 || d.willing2 || d.willing3) {
        txt += `Nõus proovima: `;
        if (d.willing1) txt += `1) ${d.willing1} `;
        if (d.willing2) txt += `2) ${d.willing2} `;
        if (d.willing3) txt += `3) ${d.willing3}`;
        txt += `\n`;
    }
    txt += `\n`;

    // SEKTSIOON 11
    txt += `[SEKTSIOON 11: RESSURSID]\n`;
    txt += `Aeg päevas: ${d.timeDaily || 'N/A'}\n`;
    txt += `Eelarve kuus: ${d.budgetMonthly || 'N/A'}\n`;
    txt += `Kodune tugi: ${d.homeSupport || 'N/A'}\n`;
    txt += `\n`;

    // SEKTSIOON 12
    txt += `[SEKTSIOON 12: RISKILIINID]\n`;
    txt += `Punased lipud tutvutud: ${d.redFlagsUnderstood ? 'JAH' : 'EI'}\n`;
    txt += `\n`;

    // SEKTSIOON 13
    txt += `[SEKTSIOON 13: DIAGNOSTIKA]\n`;
    if (d.diagEcho) txt += `✓ Ehhokardiograafia\n`;
    if (d.diagHolter) txt += `✓ Holter\n`;
    if (d.diagBlood) txt += `✓ Verepaneel\n`;
    if (d.diagMassage) txt += `✓ Massaaži hinnang\n`;
    txt += `\n`;

    // SEKTSIOON 14-18 (info)
    txt += `[SEKTSIOON 14-18: INFO]\n`;
    txt += `Otsustuspuu, plaan, menüü eelistused, paketivalikud - vt vorm\n`;
    txt += `\n`;

    // PUUDUVAD VÄLJAD
    let missingFields = [];
    if (!d.age) missingFields.push('vanus');
    if (!d.weight) missingFields.push('kaal');
    if (!d.height) missingFields.push('pikkus');
    if (!d.bpMorning && !d.bpEvening) missingFields.push('vererõhk');

    if (missingFields.length > 0) {
        txt += `⚠ VÄLJA JÄETUD VÄLJAD: ${missingFields.join(', ')}\n\n`;
    }

    txt += `═══════════════════════════════════════════════════════════\n`;
    txt += `Loodud Meditsiiniportaali poolt | v1.0\n`;
    txt += `═══════════════════════════════════════════════════════════`;

    return txt;
}

// TXT allalaadimine
function downloadTxtFull() {
    const content = generateFullTxt();
    const filename = `taisprofiil_${formatDate()}.txt`;
    downloadFile(content, filename, 'text/plain;charset=utf-8');
}

// JSON allalaadimine
function downloadJsonFull() {
    const content = generateJson(formDataGlobal);
    const filename = `taisprofiil_${formatDate()}.json`;
    downloadFile(content, filename, 'application/json');
}

// PDF allalaadimine
function downloadPdfFull() {
    const txt = generateFullTxt();
    const filename = `taisprofiil_${formatDate()}.pdf`;
    downloadFile(txt, filename, 'application/pdf');
    alert('ℹ PDF genereeritud tekstiformaadis. Täiustatud PDF (jsPDF) tulekul v1.1!');
}

// AI prompt kopeerimine - ava redaktor
function copyAiPromptFull() {
    showPromptEditor();
}

// AI PROMPT REDAKTOR - vali sektsioonid checkboxidega
function showPromptEditor() {
    // Eemalda vana modal kui on
    const oldModal = document.getElementById('promptEditorModal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'promptEditorModal';
    modal.className = 'preview-modal';

    let checkboxesHtml = '<div class="prompt-sections">';

    if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.promptSections) {
        SITE_CONFIG.promptSections.forEach(section => {
            const checked = section.default ? 'checked' : '';
            checkboxesHtml += `
                <label class="section-checkbox">
                    <input type="checkbox" value="${section.id}" ${checked} onchange="updatePromptPreview()">
                    ${section.label}
                </label>
            `;
        });
    } else {
        // Fallback kui config pole laetud
        checkboxesHtml += '<p style="color:orange;">Config pole laetud. Kasutatakse vaikimisi kõiki sektsioone.</p>';
    }

    checkboxesHtml += '</div>';

    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>AI Prompt - Kohanda väljundit</h3>
                <button class="close-btn" onclick="this.closest('.preview-modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="prompt-controls">
                    <div style="background: #e0f7fa; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 600;">
                            <input type="checkbox" id="includeSummary" onchange="updatePromptPreview()" checked>
                            📝 Lisa kokkuvõte (200-300 sõna)
                        </label>
                        <p style="font-size: 0.8rem; color: #546e7a; margin: 5px 0 0 28px;">
                            Genereerib lühikese kokkuvõtte enne täisprofiili
                        </p>
                    </div>
                    <h4>Vali kaasatavad sektsioonid:</h4>
                    ${checkboxesHtml}
                    <div class="prompt-actions">
                        <button onclick="selectAllSections(true)" class="btn btn-secondary btn-sm">Vali kõik</button>
                        <button onclick="selectAllSections(false)" class="btn btn-secondary btn-sm">Tühista kõik</button>
                        <button onclick="resetToDefaults()" class="btn btn-secondary btn-sm">Taasta vaikeväärtused</button>
                    </div>
                </div>
                <div class="prompt-preview">
                    <h4>Eelvaade:</h4>
                    <pre id="promptPreviewContent"></pre>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="copyPromptFromEditor()" class="btn btn-primary">Kopeeri lõikelauale</button>
                <button onclick="downloadPromptTxt()" class="btn btn-primary">Lae alla TXT</button>
                <button onclick="this.closest('.preview-modal').remove()" class="btn btn-secondary">Sulge</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Lisa CSS kui pole
    if (!document.getElementById('promptEditorCss')) {
        const css = document.createElement('style');
        css.id = 'promptEditorCss';
        css.textContent = `
            .modal-content.large {
                max-width: 900px;
                max-height: 90vh;
            }
            .modal-body {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 1.5rem;
                max-height: 600px;
            }
            .prompt-controls {
                border-right: 1px solid #e5e7eb;
                padding-right: 1rem;
                overflow-y: auto;
            }
            .prompt-controls h4 {
                margin-bottom: 0.75rem;
                font-size: 0.95rem;
                color: var(--primary-color);
            }
            .prompt-sections {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            .section-checkbox {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.4rem;
                cursor: pointer;
                border-radius: 4px;
                font-size: 0.9rem;
            }
            .section-checkbox:hover {
                background: #f3f4f6;
            }
            .section-checkbox input[type="checkbox"] {
                cursor: pointer;
            }
            .prompt-actions {
                display: flex;
                flex-direction: column;
                gap: 0.4rem;
            }
            .btn-sm {
                padding: 6px 12px;
                font-size: 0.85rem;
            }
            .prompt-preview {
                overflow-y: auto;
            }
            .prompt-preview h4 {
                margin-bottom: 0.75rem;
                font-size: 0.95rem;
                color: var(--primary-color);
            }
            .prompt-preview pre {
                background: #f9fafb;
                padding: 1rem;
                border-radius: 6px;
                font-size: 0.85rem;
                line-height: 1.5;
                white-space: pre-wrap;
                word-wrap: break-word;
                max-height: 500px;
                overflow-y: auto;
            }
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                }
                .prompt-controls {
                    border-right: none;
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 1rem;
                }
            }
        `;
        document.head.appendChild(css);
    }

    // Genereeri algne preview
    updatePromptPreview();
}

// Uuenda prompt preview
function updatePromptPreview() {
    const selectedSections = getSelectedSections();
    const includeSummary = document.getElementById('includeSummary')?.checked || false;
    const prompt = generateAiPromptCustom(selectedSections, includeSummary);
    const previewEl = document.getElementById('promptPreviewContent');
    if (previewEl) {
        previewEl.textContent = prompt;
    }
}

// Hangi valitud sektsioonid
function getSelectedSections() {
    const checkboxes = document.querySelectorAll('.section-checkbox input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Vali kõik / tühista kõik
function selectAllSections(select) {
    const checkboxes = document.querySelectorAll('.section-checkbox input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = select);
    updatePromptPreview();
}

// Taasta vaikeväärtused
function resetToDefaults() {
    if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.promptSections) {
        const checkboxes = document.querySelectorAll('.section-checkbox input[type="checkbox"]');
        checkboxes.forEach(cb => {
            const section = SITE_CONFIG.promptSections.find(s => s.id === cb.value);
            cb.checked = section ? section.default : true;
        });
        updatePromptPreview();
    }
}

// Kopeeri prompt editorist
function copyPromptFromEditor() {
    const selectedSections = getSelectedSections();
    const includeSummary = document.getElementById('includeSummary')?.checked || false;
    const prompt = generateAiPromptCustom(selectedSections, includeSummary);
    copyToClipboard(prompt); // Toast on juba copyToClipboard sees
}

// Lae alla prompt TXT-na
function downloadPromptTxt() {
    const selectedSections = getSelectedSections();
    const includeSummary = document.getElementById('includeSummary')?.checked || false;
    const prompt = generateAiPromptCustom(selectedSections, includeSummary);
    const filename = `ai-prompt_${formatDate()}.txt`;
    downloadFile(prompt, filename, 'text/plain');
}

// Genereeri lühike kokkuvõte (200-300 sõna)
function generateSummary(d) {
    let summary = '';

    // Põhiandmed
    const ageText = d.age ? `${d.age}-aastane` : 'Täpsustamata vanusega';
    const genderText = d.gender || 'täpsustamata soost';
    const heightText = d.height ? `${d.height}cm` : 'X';
    const weightText = d.weight ? `${d.weight}kg` : 'X';
    const bmiText = d.bmi ? ` (BMI ${d.bmi})` : '';

    summary += `${ageText} ${genderText} patsient, pikkus ${heightText}, kaal ${weightText}${bmiText}. `;

    // Põhidiagnoos
    if (d.diagnoses) {
        summary += `Põhidiagnoos: ${d.diagnoses}. `;
    }

    // Peamised sümptomid (kui on märgitud 2-3)
    const symptoms = [];
    if (d.breathlessness >= 2) symptoms.push(`õhupuudus (${d.breathlessness}/3)`);
    if (d.swelling >= 2) symptoms.push(`turse (${d.swelling}/3)`);
    if (d.fatigue >= 2) symptoms.push(`väsimus (${d.fatigue}/3)`);
    if (d.chestPain >= 2) symptoms.push(`rindkerevalu (${d.chestPain}/3)`);
    if (d.arrhythmia >= 2) symptoms.push(`rütmihäired (${d.arrhythmia}/3)`);

    if (symptoms.length > 0) {
        summary += `Peamised sümptomid: ${symptoms.join(', ')}. `;
    }

    // Ravimid
    if (d.medicationSummary && d.medicationSummary.length > 0) {
        const medNames = d.medicationSummary.slice(0, 3).map(m => m.name).join(', ');
        summary += `Võtab ravimeid: ${medNames}`;
        if (d.medicationSummary.length > 3) {
            summary += ` (+${d.medicationSummary.length - 3} lisaks)`;
        }
        summary += '. ';
    }

    // Antikoagulandid (OLULINE!)
    if (d.anticoagulant === 'yes') {
        summary += `⚠️ OLULINE: Võtab antikoagulanti (${d.anticoagulantName || 'täpsustamata'}), koostoimed taimedega tuleb hoolikalt kontrollida! `;
    }

    // Ei soovi (kui on valitud)
    const noConsentItems = [];
    if (d.noConsent_xray === 'yes') noConsentItems.push('Röntgen');
    if (d.noConsent_vaccines === 'yes') noConsentItems.push('vaktsiinid');
    if (d.noConsent_opioids === 'yes') noConsentItems.push('opioidid');
    if (d.noConsent_surgery === 'yes') noConsentItems.push('operatsioonid');

    if (noConsentItems.length > 0) {
        summary += `EI SOOVI: ${noConsentItems.join(', ')}. `;
    }

    // Taimravi ja toitumine
    if (d.herbalRemedies) {
        const herbsShort = d.herbalRemedies.substring(0, 100);
        summary += `Taimravi: ${herbsShort}${d.herbalRemedies.length > 100 ? '...' : ''}. `;
    }

    if (d.dietType) {
        summary += `Dieedi tüüp: ${d.dietType}. `;
    }

    // Liikumine ja praktikad
    if (d.walkDaily) {
        summary += `Jalutuskäik: ${d.walkDaily}. `;
    }

    if (d.breathingPractice) {
        summary += `Hingamistehnikad: Jah. `;
    }

    // Ressursid
    if (d.budgetMonthly) {
        summary += `Eelarve: ${d.budgetMonthly} €/kuu. `;
    }

    if (d.timeDaily) {
        summary += `Aeg päevas: ${d.timeDaily}. `;
    }

    // Eesmärgid
    if (d.treatmentGoals) {
        const goalsShort = d.treatmentGoals.substring(0, 80);
        summary += `Eesmärgid: ${goalsShort}${d.treatmentGoals.length > 80 ? '...' : ''}. `;
    }

    // Lõpetav soovitus
    summary += `\n\nSOOVITUS: Vajalik holistilik lähenemine, mis arvestab patsiendi keeldudega ja eelistab naturaalset/toetavat ravi. Täpsem info detailses profiilis allpool.`;

    return summary;
}

// Genereeri kohandatud AI prompt valitud sektsioonidega
function generateAiPromptCustom(selectedSections = [], includeSummary = false) {
    const d = formDataGlobal;

    let prompt = `═══════════════════════════════════════════════════════════\n`;
    prompt += `HOLISTILINE MEDITSIINILINE KONSULTATSIOON\n`;
    prompt += `Täisprofiil | ${new Date().toLocaleDateString('et-EE', {timeZone: 'Europe/Tallinn'})}\n`;
    prompt += `═══════════════════════════════════════════════════════════\n\n`;

    // Lisa kokkuvõte kui valitud
    if (includeSummary) {
        prompt += `📝 KIIRKOKKUVÕTE (200-300 sõna)\n`;
        prompt += `───────────────────────────────────────────────────────────\n`;
        prompt += generateSummary(d);
        prompt += `\n═══════════════════════════════════════════════════════════\n\n`;
        prompt += `📋 DETAILNE PROFIIL\n`;
        prompt += `───────────────────────────────────────────────────────────\n\n`;
    }

    // Kui ei ole valitud ühtegi, kasuta kõiki
    if (selectedSections.length === 0) {
        return generateAiPromptAdvanced();
    }

    // Helper funktsioon - kas sektsioon on valitud
    const has = (id) => selectedSections.includes(id);

    // PROFILE
    if (has('profile')) {
        prompt += `PATSIENT:\n`;
        prompt += `${d.age || 'X'}a ${d.gender || 'N/A'}, `;
        prompt += `${d.height || 'X'}cm, ${d.weight || 'X'}kg`;
        if (d.bmi) prompt += ` (BMI ${d.bmi})`;
        if (d.targetWeight) prompt += ` → Siht: ${d.targetWeight}kg`;
        prompt += `\n`;
        if (d.diagnoses) prompt += `Diagnoosid: ${d.diagnoses}\n`;
        prompt += `\n`;
    }

    // SYMPTOMS
    if (has('symptoms')) {
        prompt += `SÜMPTOMID (0-3):\n`;
        prompt += `Õhupuudus: ${d.breathlessness || 0}, `;
        prompt += `Turse: ${d.swelling || 0}, `;
        prompt += `Väsimus: ${d.fatigue || 0}, `;
        prompt += `Rindkerevalu: ${d.chestPain || 0}\n\n`;
    }

    // MEASUREMENTS
    if (has('measurements')) {
        prompt += `MÕÕTMISED:\n`;
        if (d.bp) prompt += `Vererõhk: ${d.bp}\n`;
        if (d.pulse) prompt += `Pulss: ${d.pulse}\n`;
        if (d.weight) prompt += `Kaal: ${d.weight}kg\n`;
        prompt += `\n`;
    }

    // HISTORY
    if (has('history')) {
        if (d.historyNote) {
            prompt += `HAIGUSLUGU:\n${d.historyNote}\n\n`;
        }
    }

    // MEDICATIONS
    if (has('medications')) {
        if (d.medicationSummary && d.medicationSummary.length > 0) {
            prompt += `RAVIMID:\n`;
            d.medicationSummary.forEach(med => {
                prompt += `- ${med.name} ${med.dose} (${med.timing})\n`;
            });
            if (d.anticoagulant === 'yes') {
                prompt += `\n⚠ VÕTAB ANTIKOAGULANTI: ${d.anticoagulantName || 'ei täpsustatud'}\n`;
                prompt += `OLULINE: Väldi koostoimeid (Dan Shen, ginkgo, naistepuna jne)!\n`;
            }
            prompt += `\n`;
        }
    }

    // HERBAL
    if (has('herbal')) {
        if (d.herbalRemedies) {
            prompt += `TAIMRAVI:\n${d.herbalRemedies}\n\n`;
        }
    }

    // NUTRITION
    if (has('nutrition')) {
        if (d.dietType || d.mealCount || d.waterIntake) {
            prompt += `TOITUMINE:\n`;
            if (d.dietType) prompt += `Dieedi tüüp: ${d.dietType}\n`;
            if (d.mealCount) prompt += `Söökkordi päevas: ${d.mealCount}\n`;
            if (d.waterIntake) prompt += `Vedeliku tarbimine: ${d.waterIntake}\n`;
            prompt += `\n`;
        }
    }

    // PHYSICAL
    if (has('physical')) {
        if (d.walkDaily || d.exerciseType) {
            prompt += `FÜÜSILINE AKTIIVSUS:\n`;
            if (d.walkDaily) prompt += `Jalutuskäik: ${d.walkDaily}\n`;
            if (d.exerciseType) prompt += `Harjutused: ${d.exerciseType}\n`;
            prompt += `\n`;
        }
    }

    // BREATHING
    if (has('breathing')) {
        if (d.breathingPractice) {
            prompt += `HINGAMISTEHNIKAD:\n${d.breathingPractice}\n\n`;
        }
    }

    // MEDITATION
    if (has('meditation')) {
        if (d.meditationPractice) {
            prompt += `MEDITATSIOON:\n${d.meditationPractice}\n\n`;
        }
    }

    // IDEOLOGY
    if (has('ideology')) {
        if (d.ideology) {
            prompt += `MAAILMAVAADE/USK:\n${d.ideology}\n\n`;
        }
    }

    // RESOURCES
    if (has('resources')) {
        prompt += `RESSURSID:\n`;
        if (d.budgetMonthly) prompt += `Eelarve: ${d.budgetMonthly} €/kuu\n`;
        if (d.timeDaily) prompt += `Aeg päevas: ${d.timeDaily}\n`;
        prompt += `\n`;
    }

    // RISKS
    if (has('risks')) {
        if (d.riskFlags) {
            prompt += `RISKIFAKTORID:\n${d.riskFlags}\n\n`;
        }
    }

    // DIAGNOSTICS
    if (has('diagnostics')) {
        if (d.diagnosticsNeeded) {
            prompt += `DIAGNOSTIKA SOOVITUSED:\n${d.diagnosticsNeeded}\n\n`;
        }
    }

    // DECISION TREE
    if (has('decisionTree')) {
        if (d.decisionTree) {
            prompt += `OTSUSTUSPUU:\n${d.decisionTree}\n\n`;
        }
    }

    // PLANS
    if (has('plans')) {
        if (d.treatmentPlan) {
            prompt += `RAVIPLAAN:\n${d.treatmentPlan}\n\n`;
        }
    }

    // MENU
    if (has('menu')) {
        if (d.menuPreferences) {
            prompt += `MENÜÜ SOOVITUSED:\n${d.menuPreferences}\n\n`;
        }
    }

    // PACKAGE
    if (has('package')) {
        if (d.packageChoice) {
            prompt += `PAKETT VALIK:\n${d.packageChoice}\n\n`;
        }
    }

    prompt += `───────────────────────────────────────────────────────────\n`;
    prompt += `PALUN SOOVITA:\n\n`;
    prompt += `1. Holistilist päevaplaani (hingamine, liikumine, toitumine)\n`;
    prompt += `2. Taimravi võimalused (arvestades koostoimeid!)\n`;
    prompt += `3. Jälgimise plaani (BP, kaal, sümptomid)\n`;
    prompt += `4. Riskide maandamist ja ohumärke\n`;
    prompt += `5. Prioriteedid ja reaalsed eesmärgid 3-6 kuuks\n`;

    return prompt;
}

// Vana funktsioon jääb alles tagasiühilduvuse jaoks
function generateAiPromptAdvanced() {
    return generateAiPromptCustom(['profile', 'symptoms', 'medications', 'herbal', 'nutrition', 'physical', 'resources', 'plans']);
}

// Abiline funktsioon kuupäeva jaoks
function formatDate() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}

// Kompaktne vs laiendatud vaade
let isCompactView = localStorage.getItem('compactView') === 'true';

function toggleCompactView() {
    isCompactView = !isCompactView;
    localStorage.setItem('compactView', isCompactView);

    const sections = document.querySelectorAll('.form-section');
    const btn = document.getElementById('viewToggleBtn');

    sections.forEach(section => {
        if (isCompactView) {
            section.classList.add('compact');
            section.classList.remove('expanded');

            // Lisa click handler sektsioonile
            const h2 = section.querySelector('h2');
            if (h2 && !h2.hasAttribute('data-click-handler')) {
                h2.setAttribute('data-click-handler', 'true');
                h2.addEventListener('click', (e) => {
                    e.stopPropagation();
                    section.classList.toggle('expanded');
                });
            }
        } else {
            section.classList.remove('compact', 'expanded');
        }
    });

    // Uuenda nupu tekst
    if (isCompactView) {
        btn.innerHTML = '📄 Laiendatud vaade';
        showToast('Kompaktne vaade aktiveeritud - Kliki sektsiooni avamiseks');
    } else {
        btn.innerHTML = '📋 Kompaktne vaade';
        showToast('Laiendatud vaade aktiveeritud');
    }
}

// Taasta vaade pärast lehel laadimist
document.addEventListener('DOMContentLoaded', () => {
    if (isCompactView) {
        toggleCompactView();
    }
});

// "Ei soovi" kasti kohandatud keeldude lisamine
let noConsentCounter = 0;
function addNoConsentItem() {
    const itemText = prompt('Lisa oma keeld (nt. "Gamma kiiritamine", "MRT kontrastaine", jne):');

    if (!itemText || itemText.trim() === '') {
        showToast('Palun sisesta keelduva protseduuri/ravimi nimetus!', 3000);
        return;
    }

    noConsentCounter++;
    const fieldName = `noConsent_custom_${noConsentCounter}`;

    const container = document.getElementById('custom-no-consent-items');

    const itemDiv = document.createElement('div');
    itemDiv.className = 'form-group';
    itemDiv.style.cssText = 'background: #ffe0e0; padding: 8px 12px; border-radius: 6px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;';

    itemDiv.innerHTML = `
        <label style="margin: 0; display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" name="${fieldName}" value="yes" checked>
            <span style="font-weight: 600; color: #d63031;">${itemText}</span>
        </label>
        <button type="button" onclick="this.closest('.form-group').remove()" class="btn-danger-sm"
                style="background: #d63031; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
            Eemalda
        </button>
    `;

    container.appendChild(itemDiv);

    showToast(`Keeld "${itemText}" lisatud!`);
}
