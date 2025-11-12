// VERSION: 1.2.0 - 2025-01-09
// MITMIKVALIKUTE SISESTUS (chips/tags)
// Kasutaja sisestab komaga või Enteriga eraldatud väärtusi

function initTagsInput(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    if (!input || !list) return;

    const tags = [];

    function renderTags() {
        list.innerHTML = '';
        tags.forEach((tag, index) => {
            const chip = document.createElement('span');
            chip.className = 'tag-chip';
            chip.innerHTML = `
                ${tag}
                <button type="button" onclick="removeTag_${inputId}(${index})">&times;</button>
            `;
            list.appendChild(chip);
        });
    }

    // Globaalne funktsioon eemaldamiseks
    window[`removeTag_${inputId}`] = (index) => {
        tags.splice(index, 1);
        renderTags();
        updateHiddenInput();
    };

    function updateHiddenInput() {
        // Peidus input mis hoiab kõiki väärtusi
        let hiddenInput = document.getElementById(`${inputId}_hidden`);
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.id = `${inputId}_hidden`;
            hiddenInput.name = input.name || inputId;
            input.parentNode.appendChild(hiddenInput);
        }
        hiddenInput.value = tags.join(', ');
    }

    // Enter või koma lisab uue
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            let value = input.value.trim().replace(/,$/,'');
            if (value) {
                tags.push(value);
                renderTags();
                updateHiddenInput();
                input.value = '';
            }
        }
    });

    // Blur'il lisa ka kui midagi on kirjas
    input.addEventListener('blur', () => {
        let value = input.value.trim().replace(/,$/,'');
        if (value) {
            tags.push(value);
            renderTags();
            updateHiddenInput();
            input.value = '';
        }
    });

    // CSS kui pole
    if (!document.getElementById('tagsInputCss')) {
        const css = document.createElement('style');
        css.id = 'tagsInputCss';
        css.textContent = `
            .tag-chip {
                display: inline-block;
                background: #e0f2fe;
                color: #0c4a6e;
                padding: 6px 10px;
                margin: 4px;
                border-radius: 16px;
                font-size: 0.9rem;
                border: 1px solid #bae6fd;
            }
            .tag-chip button {
                background: none;
                border: none;
                color: #0c4a6e;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: 6px;
                padding: 0;
                line-height: 1;
            }
            .tag-chip button:hover {
                color: #ef4444;
            }
            .tags-list {
                min-height: 30px;
                margin-top: 8px;
                padding: 4px;
                border: 1px dashed #e5e7eb;
                border-radius: 8px;
            }
        `;
        document.head.appendChild(css);
    }
}

// Kasutus:
// <input type="text" id="likesFood" placeholder="Sisesta ja vajuta Enter või koma">
// <div id="likesFoodList" class="tags-list"></div>
// <script>initTagsInput('likesFood', 'likesFoodList');</script>
