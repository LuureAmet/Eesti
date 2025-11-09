// VERSION: 1.2.0 - 2025-01-09
// TOOLTIP SÜSTEEM
// Laeb tooltipid JSON-ist ja lisab ? ikoonid

let tooltipsData = {};

// Lae tooltipid
async function loadTooltips() {
    try {
        const response = await fetch('../data/tooltips.json');
        tooltipsData = await response.json();
        addTooltipsToForm();
    } catch (error) {
        console.error('Tooltipide laadimine ebaõnnestus:', error);
    }
}

// Lisa tooltipid vormile
function addTooltipsToForm() {
    // Leia kõik input, select, textarea elemendid mis on name atribuudiga
    const fields = document.querySelectorAll('input[name], select[name], textarea[name]');

    fields.forEach(field => {
        const fieldName = field.getAttribute('name')?.replace('[]', ''); // Eemalda [] tabelitest

        if (!fieldName || !tooltipsData[fieldName]) return;

        // Leia label
        const label = findLabelForField(field);

        if (label && !label.querySelector('.tooltip-icon')) {
            // Lisa tooltip ikoon
            const tooltipIcon = createTooltipIcon(tooltipsData[fieldName]);
            label.appendChild(tooltipIcon);
        }
    });
}

// Leia label välja jaoks
function findLabelForField(field) {
    // 1. Otsi label mis viitab field.id-le
    if (field.id) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        if (label) return label;
    }

    // 2. Otsi parent label
    let parent = field.parentElement;
    while (parent) {
        if (parent.tagName === 'LABEL') return parent;
        parent = parent.parentElement;
    }

    // 3. Otsi eelmine label sama parent sees
    const container = field.closest('.form-group');
    if (container) {
        const label = container.querySelector('label');
        if (label) return label;
    }

    return null;
}

// Loo tooltip ikoon
function createTooltipIcon(tooltipText) {
    const icon = document.createElement('span');
    icon.className = 'tooltip-icon';
    icon.textContent = '?';

    const text = document.createElement('span');
    text.className = 'tooltip-text';
    text.textContent = tooltipText;

    icon.appendChild(text);

    return icon;
}

// Lae tooltipid kui leht on valmis
document.addEventListener('DOMContentLoaded', loadTooltips);
