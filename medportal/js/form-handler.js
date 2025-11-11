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

    // Lisa timestamp (24h formaat)
    const timestamp = new Date().toLocaleString('et-EE', {
        timeZone: 'Europe/Tallinn',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const formId = form.id || 'form_draft';
    const saveData = {
        formData: data,
        savedAt: timestamp,
        savedAtISO: new Date().toISOString()
    };

    localStorage.setItem(formId, JSON.stringify(saveData));

    // Uuenda timestamp kuva
    updateSaveTimestamp(timestamp);

    showToast('Vorm salvestatud!');
}

// Vormide laadimine localStorage'st
function loadForm() {
    const form = document.querySelector('form');
    if (!form) return;

    const formId = form.id || 'form_draft';
    const savedDataStr = localStorage.getItem(formId);

    if (!savedDataStr) return;

    const savedData = JSON.parse(savedDataStr);

    // Toeta vana formaati (ilma timestamp-ita)
    const data = savedData.formData || savedData;
    const timestamp = savedData.savedAt;

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

    // Kuva timestamp kui on olemas
    if (timestamp) {
        updateSaveTimestamp(timestamp);
    }

    showToast('Draft laetud!');
}

// Uuenda salvestuse timestamp kuva
function updateSaveTimestamp(timestamp) {
    const timestampEl = document.getElementById('saveTimestamp');
    if (timestampEl) {
        timestampEl.textContent = `Viimati salvestatud: ${timestamp}`;
        timestampEl.style.display = 'block';
    }
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
        alert('[!] Palun täida kõik nõutud väljad!');
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

// Toast teade (ilma alert-ita)
function showToast(message, duration = 2000) {
    // Eemalda vana toast kui on
    const oldToast = document.getElementById('toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;

    // Lisa animation
    if (!document.getElementById('toastCss')) {
        const css = document.createElement('style');
        css.id = 'toastCss';
        css.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(css);
    }

    document.body.appendChild(toast);

    // Eemalda pärast duration
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Kopeeri lõikelauale (ilma alert-ita)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Kopeeritud lõikelauale!');
    }).catch(err => {
        console.error('Kopeerimine ebaõnnestus:', err);
        showToast('Kopeerimine ebaõnnestus!', 3000);
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
