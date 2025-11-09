// VERSION: 1.2.0 - 2025-01-09
// ============================================
// ÜLDISED VORMIFUNKTSIOONID
// ============================================

// Progress bar uuendamine
function updateProgress() {
    const form = document.querySelector('form');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let filled = 0;

    inputs.forEach(input => {
        if (input.type === 'radio') {
            const name = input.name;
            if (form.querySelector(`input[name="${name}"]:checked`)) {
                filled++;
            }
        } else if (input.value.trim() !== '') {
            filled++;
        }
    });

    const percentage = Math.round((filled / inputs.length) * 100);

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    if (progressBar) progressBar.style.width = percentage + '%';
    if (progressText) progressText.textContent = percentage + '%';
}

// Vormide salvestamine localStorage'i
function saveForm() {
    const form = document.querySelector('form');
    if (!form) return;

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });

    const formId = form.id || 'form_draft';
    localStorage.setItem(formId, JSON.stringify(data));

    alert('✅ Vorm salvestatud! Saad hiljem jätkata.');
}

// Vormide laadimine localStorage'st
function loadForm() {
    const form = document.querySelector('form');
    if (!form) return;

    const formId = form.id || 'form_draft';
    const savedData = localStorage.getItem(formId);

    if (!savedData) return;

    const data = JSON.parse(savedData);

    Object.keys(data).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);

        if (!input) return;

        if (input.type === 'radio') {
            const radio = form.querySelector(`input[name="${key}"][value="${data[key]}"]`);
            if (radio) radio.checked = true;
        } else if (input.type === 'checkbox') {
            input.checked = Array.isArray(data[key]) ? data[key].includes(input.value) : data[key] === input.value;
        } else {
            input.value = data[key];
        }
    });

    updateProgress();
    alert('ℹ️ Eelmine draft laetud!');
}

// Vormi validatsioon
function validateForm(form) {
    const requiredInputs = form.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalid = null;

    requiredInputs.forEach(input => {
        if (input.type === 'radio') {
            const name = input.name;
            const checked = form.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                isValid = false;
                if (!firstInvalid) firstInvalid = input;
            }
        } else if (input.value.trim() === '') {
            isValid = false;
            input.style.borderColor = 'red';
            if (!firstInvalid) firstInvalid = input;
        } else {
            input.style.borderColor = '';
        }
    });

    if (!isValid && firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        alert('⚠️ Palun täida kõik nõutud väljad!');
    }

    return isValid;
}

// Vormi andmete ekstraktor
function extractFormData(form) {
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });

    return data;
}

// TXT eksport
function generateTxt(data, title = 'Terviseprofiil') {
    const now = new Date();
    let txt = `═══════════════════════════════════════════════════════════\n`;
    txt += `  ${title.toUpperCase()}\n`;
    txt += `  Genereeritud: ${now.toLocaleString('et-EE', {timeZone: 'Europe/Tallinn', hour12: false})}\n`;
    txt += `  UTC: ${now.toISOString()}\n`;
    txt += `═══════════════════════════════════════════════════════════\n\n`;

    Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
            txt += `${formatKey(key)}: ${data[key].join(', ')}\n`;
        } else {
            txt += `${formatKey(key)}: ${data[key]}\n`;
        }
    });

    txt += `\n═══════════════════════════════════════════════════════════\n`;
    txt += `Fail genereeritud Meditsiiniportaali poolt\n`;
    txt += `═══════════════════════════════════════════════════════════`;

    return txt;
}

// JSON eksport
function generateJson(data) {
    return JSON.stringify({
        metadata: {
            generated: new Date().toISOString(),
            version: '1.0',
            source: 'Meditsiiniportaal'
        },
        data: data
    }, null, 2);
}

// AI promti genereerimine
function generateAiPrompt(data) {
    let prompt = `Ma olen ${data.age || 'X'} aastat vana, `;
    prompt += `sugu: ${data.gender || 'määramata'}. `;
    prompt += `Minu põhidiagnoos on: ${data.mainDiagnosis || 'määramata'}.\n\n`;

    prompt += `PÕHIKAEBUSED:\n${data.mainComplaint || 'Kirjeldus puudub'}\n\n`;

    if (data.medications) {
        prompt += `PRAEGUSED RAVIMID:\n${data.medications}\n\n`;
    }

    prompt += `EELISTUS: ${data.approach || 'määramata'}\n`;
    prompt += `AEG RUTIINIDEKS: ${data.timeAvailable || 'määramata'}\n\n`;

    prompt += `EESMÄRGID (3-6 kuud):\n${data.goals || 'Määramata'}\n\n`;

    prompt += `Palun soovita mulle:\n`;
    prompt += `1. Holistilist päevaplaani (sh hingamine, liikumine, taimravi)\n`;
    prompt += `2. Konkreetseid annuseid ja aegu\n`;
    prompt += `3. Võimalikke koostoime riske\n`;
    prompt += `4. Prioriteedid ja jälgimise plaani`;

    return prompt;
}

// Võtme vormindamine
function formatKey(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

// Failide allalaadimine
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// PDF genereerimine (lihtne tekst-põhine)
function generatePdf(data, title = 'Terviseprofiil') {
    // Lihtsalt TXT sisu praegu - hiljem saab lisada jsPDF teegi
    const txtContent = generateTxt(data, title);
    return txtContent;
}

// Kopeeri lõikelauale
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Kopeeritud lõikelauale!');
    }).catch(err => {
        console.error('Kopeerimine ebaõnnestus:', err);
        alert('❌ Kopeerimine ebaõnnestus!');
    });
}

// BMI kalkulaator
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Progress tracking
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('input', updateProgress);
        form.addEventListener('change', updateProgress);
    }

    // Lae salvestatud draft
    const loadBtn = document.querySelector('[data-action="load"]');
    if (loadBtn) {
        loadBtn.addEventListener('click', loadForm);
    }

    // Kontrolli kas on olemas draft
    if (form && localStorage.getItem(form.id)) {
        if (confirm('📂 Leiti salvestatud draft. Kas laadida?')) {
            loadForm();
        }
    }
});
