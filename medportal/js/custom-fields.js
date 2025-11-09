// VERSION: 1.2.0 - 2025-01-09
// DÜNAAMILISTE VÄLJADE LISAMINE
// Kasutaja saab ise välju lisada

// Lisa "Lisa väli" nupud igale sektsioonile
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.form-section');

    sections.forEach((section, index) => {
        // Ära lisa export ja punased lipud sektsioonidele
        if (section.classList.contains('export-options') ||
            section.classList.contains('alert-danger') ||
            section.classList.contains('alert-info') ||
            section.classList.contains('alert-success')) {
            return;
        }

        // Lisa nupp
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'add-row-btn';
        addButton.textContent = '+ Lisa kohandatud väli';
        addButton.style.marginTop = '15px';
        addButton.onclick = () => showAddFieldModal(section);

        section.appendChild(addButton);
    });
});

// Modal kohandatud välja lisamiseks
function showAddFieldModal(section) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
    `;

    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 12px; max-width: 500px; width: 90%;">
            <h2>Lisa kohandatud väli</h2>

            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Välja nimetus</label>
                <input type="text" id="customFieldLabel" placeholder="Nt: Lisainfo, Märkused..." style="width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px;">
            </div>

            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Välja tüüp</label>
                <select id="customFieldType" style="width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px;">
                    <option value="text">Tekst (lühike)</option>
                    <option value="textarea">Tekst (pikk)</option>
                    <option value="number">Number</option>
                    <option value="date">Kuupäev</option>
                    <option value="checkbox">Märkeruut (jah/ei)</option>
                    <option value="radio">Valikud (ainult üks)</option>
                </select>
            </div>

            <div id="optionsContainer" style="margin: 20px 0; display: none;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Valikud (komaga eraldatud)</label>
                <input type="text" id="customFieldOptions" placeholder="Nt: Jah, Ei, Ei tea" style="width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px;">
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 25px;">
                <button class="btn btn-secondary" onclick="this.closest('div').parentElement.parentElement.remove()">Tühista</button>
                <button class="btn btn-primary" onclick="addCustomField(this)">Lisa väli</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Näita/peida valikute väli
    const typeSelect = modal.querySelector('#customFieldType');
    const optionsContainer = modal.querySelector('#optionsContainer');

    typeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'radio') {
            optionsContainer.style.display = 'block';
        } else {
            optionsContainer.style.display = 'none';
        }
    });

    // Salvesta section referents
    modal.dataset.sectionIndex = Array.from(document.querySelectorAll('.form-section')).indexOf(section);
}

// Lisa kohandatud väli
function addCustomField(button) {
    const modal = button.closest('div').parentElement.parentElement;
    const sectionIndex = parseInt(modal.dataset.sectionIndex);
    const section = document.querySelectorAll('.form-section')[sectionIndex];

    const label = document.getElementById('customFieldLabel').value.trim();
    const type = document.getElementById('customFieldType').value;
    const options = document.getElementById('customFieldOptions')?.value || '';

    if (!label) {
        alert('Palun sisesta välja nimetus!');
        return;
    }

    // Genereeri unikaalne nimi
    const fieldName = 'custom_' + label.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now();

    // Loo väli
    const fieldGroup = document.createElement('div');
    fieldGroup.className = 'form-group dynamic-field';
    fieldGroup.style.background = '#fef3c7';
    fieldGroup.style.padding = '15px';
    fieldGroup.style.borderRadius = '8px';
    fieldGroup.style.position = 'relative';

    let fieldHtml = `<label>${label} <span style="color: #92400e; font-size: 0.85rem;">(kohandatud)</span></label>`;

    switch(type) {
        case 'text':
            fieldHtml += `<input type="text" name="${fieldName}" placeholder="${label}">`;
            break;

        case 'textarea':
            fieldHtml += `<textarea name="${fieldName}" rows="3" placeholder="${label}"></textarea>`;
            break;

        case 'number':
            fieldHtml += `<input type="number" name="${fieldName}" placeholder="${label}">`;
            break;

        case 'date':
            fieldHtml += `<input type="date" name="${fieldName}">`;
            break;

        case 'checkbox':
            fieldHtml += `
                <div class="checkbox-group">
                    <label><input type="checkbox" name="${fieldName}" value="yes"> Jah</label>
                </div>
            `;
            break;

        case 'radio':
            const opts = options.split(',').map(o => o.trim()).filter(o => o);
            if (opts.length === 0) {
                alert('Palun lisa valikud!');
                return;
            }
            fieldHtml += `<div class="radio-group">`;
            opts.forEach(opt => {
                fieldHtml += `<label><input type="radio" name="${fieldName}" value="${opt}"> ${opt}</label>`;
            });
            fieldHtml += `</div>`;
            break;
    }

    // Lisa "Eemalda" nupp
    fieldHtml += `
        <button type="button" onclick="this.parentElement.remove()"
                style="position: absolute; top: 10px; right: 10px;
                       background: #ef4444; color: white; border: none;
                       border-radius: 4px; padding: 5px 10px; cursor: pointer;">
            Eemalda
        </button>
    `;

    fieldGroup.innerHTML = fieldHtml;

    // Lisa väli enne "Lisa väli" nuppu
    const addButton = section.querySelector('.add-row-btn');
    section.insertBefore(fieldGroup, addButton);

    // Sulge modal
    modal.remove();

    alert('Väli lisatud!');
}
