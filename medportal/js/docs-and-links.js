// VERSION: 1.2.0 - 2025-01-09
// DOKUMENTATSIOONI JA LINKIDE SEKTSIOON
// ===========================================

// Minimaalne Markdown → HTML konverter
function miniMd(md) {
    // Escape HTML
    md = md.replace(/[&<>]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[s]));

    // Code blocks
    md = md.replace(/```([\s\S]*?)```/g, (_, c) => `<pre><code>${c}</code></pre>`);

    // Headers
    md = md.replace(/^### (.*)$/gm, '<h3>$1</h3>')
         .replace(/^## (.*)$/gm, '<h2>$1</h2>')
         .replace(/^# (.*)$/gm, '<h1>$1</h1>');

    // Bold/Italic
    md = md.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
         .replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links
    md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Lists
    md = md.replace(/^(?:-|\*) (.*)$/gm, '<li>$1</li>')
         .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');

    // Paragraphs
    md = md.split('\n').map(l => {
        if (/^\s*<(h\d|pre|ul|li|\/ul|\/pre|\/li)/.test(l) || l.trim() === '') return l;
        return `<p>${l}</p>`;
    }).join('\n');

    return md;
}

// Fetch MD faili
async function fetchMd(path) {
    const r = await fetch(path, { cache: 'no-store' });
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.text();
}

// Lisa VERSION badge ülemisse paremasse nurka
function addVersionBadge() {
    if (document.getElementById('versionBadge')) return; // Juba olemas

    const badge = document.createElement('div');
    badge.id = 'versionBadge';
    badge.innerHTML = `
        <div class="version-number">v${SITE_CONFIG.version}</div>
        <div class="version-date">${SITE_CONFIG.date}</div>
    `;
    document.body.appendChild(badge);

    // Lisa CSS kui pole
    if (!document.getElementById('versionBadgeCss')) {
        const css = document.createElement('style');
        css.id = 'versionBadgeCss';
        css.textContent = `
            #versionBadge {
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(37, 99, 235, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 0.85rem;
                font-weight: 600;
                z-index: 9999;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                text-align: center;
                min-width: 80px;
            }
            #versionBadge .version-number {
                font-size: 1rem;
                margin-bottom: 2px;
            }
            #versionBadge .version-date {
                font-size: 0.7rem;
                opacity: 0.9;
            }
            @media (max-width: 768px) {
                #versionBadge {
                    top: 5px;
                    right: 5px;
                    padding: 6px 8px;
                }
            }
        `;
        document.head.appendChild(css);
    }
}

// Lisa linkide sektsioon (Excel-stiilis)
function addLinksSection(containerSelector = 'body') {
    const container = document.querySelector(containerSelector) || document.body;

    const section = document.createElement('section');
    section.className = 'links-section';
    section.innerHTML = `<h3>Lisalingid</h3>`;

    const table = document.createElement('div');
    table.className = 'links-table';

    SITE_CONFIG.links.forEach(link => {
        const row = document.createElement('div');
        row.className = 'link-row';
        row.innerHTML = `
            <div class="link-url"><a href="${link.url}" target="_blank" rel="noopener">${link.url}</a></div>
            <div class="link-desc">${link.description}</div>
        `;
        table.appendChild(row);
    });

    section.appendChild(table);
    container.appendChild(section);

    // Lisa CSS kui pole
    if (!document.getElementById('linksSectionCss')) {
        const css = document.createElement('style');
        css.id = 'linksSectionCss';
        css.textContent = `
            .links-section {
                margin-top: 2rem;
                padding: 1.5rem;
                background: #f9fafb;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
            }
            .links-section h3 {
                margin-bottom: 1rem;
                color: var(--primary-color);
                font-size: 1.2rem;
            }
            .links-table {
                display: grid;
                gap: 0.5rem;
            }
            .link-row {
                display: grid;
                grid-template-columns: 1fr 1.5fr;
                gap: 1rem;
                padding: 0.75rem;
                background: white;
                border-radius: 6px;
                border: 1px solid #e5e7eb;
                align-items: start;
            }
            .link-url a {
                color: var(--primary-color);
                text-decoration: none;
                word-break: break-all;
                font-size: 0.9rem;
            }
            .link-url a:hover {
                text-decoration: underline;
            }
            .link-desc {
                color: var(--text-gray);
                font-size: 0.95rem;
                line-height: 1.4;
            }
            @media (max-width: 768px) {
                .link-row {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(css);
    }
}

// Lisa README/ROADMAP kokkuklapitav sektsioon
function addDocsSection(containerSelector = 'body') {
    const container = document.querySelector(containerSelector) || document.body;

    const section = document.createElement('section');
    section.className = 'docs-section';
    section.innerHTML = `
        <h3>Projekti dokumendid</h3>
        <details id="readmeBox">
            <summary>README.md</summary>
            <article id="readmeContent" class="md-content">Laadimine...</article>
        </details>
        <details id="roadmapBox">
            <summary>ROADMAP.md</summary>
            <article id="roadmapContent" class="md-content">Laadimine...</article>
        </details>
        <div class="footer-note">Inspired by Meigo Medical</div>
    `;

    container.appendChild(section);

    // Lisa CSS kui pole
    if (!document.getElementById('docsSectionCss')) {
        const css = document.createElement('style');
        css.id = 'docsSectionCss';
        css.textContent = `
            .docs-section {
                margin-top: 2rem;
                padding: 1.5rem;
                background: #f9fafb;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
            }
            .docs-section h3 {
                margin-bottom: 1rem;
                color: var(--primary-color);
                font-size: 1.2rem;
            }
            .docs-section details {
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 0.75rem 1rem;
                margin: 0.75rem 0;
                background: white;
            }
            .docs-section details[open] {
                background: #fff;
            }
            .docs-section summary {
                cursor: pointer;
                font-weight: 600;
                color: var(--primary-color);
                user-select: none;
            }
            .docs-section summary:hover {
                opacity: 0.8;
            }
            .md-content {
                padding-top: 0.75rem;
                line-height: 1.55;
                color: var(--text-dark);
            }
            .md-content pre {
                overflow: auto;
                background: #f6f8fa;
                padding: 0.75rem;
                border-radius: 6px;
                font-size: 0.9rem;
            }
            .md-content h1, .md-content h2, .md-content h3 {
                margin-top: 1rem;
                margin-bottom: 0.5rem;
            }
            .md-content ul {
                padding-left: 1.5rem;
            }
            .md-content a {
                color: var(--primary-color);
            }
            .footer-note {
                font-size: 0.9rem;
                color: #6b7280;
                margin-top: 1rem;
                text-align: center;
                font-style: italic;
            }
        `;
        document.head.appendChild(css);
    }

    // Lazy load README
    document.getElementById('readmeBox').addEventListener('toggle', async function(e) {
        if (e.target.open && !e.target.dataset.loaded) {
            try {
                const text = await fetchMd(SITE_CONFIG.docs.readme);
                document.getElementById('readmeContent').innerHTML = miniMd(text);
            } catch (err) {
                document.getElementById('readmeContent').innerHTML = `<p style="color:red;">Ei saanud laadida: ${SITE_CONFIG.docs.readme} (${err.message})</p>`;
            }
            e.target.dataset.loaded = '1';
        }
    });

    // Lazy load ROADMAP
    document.getElementById('roadmapBox').addEventListener('toggle', async function(e) {
        if (e.target.open && !e.target.dataset.loaded) {
            try {
                const text = await fetchMd(SITE_CONFIG.docs.roadmap);
                document.getElementById('roadmapContent').innerHTML = miniMd(text);
            } catch (err) {
                document.getElementById('roadmapContent').innerHTML = `<p style="color:red;">Ei saanud laadida: ${SITE_CONFIG.docs.roadmap} (${err.message})</p>`;
            }
            e.target.dataset.loaded = '1';
        }
    });
}

// Peafunktsioon - lisa kõik elemendid
function initDocsAndLinks(options = {}) {
    const opts = Object.assign({
        containerSelector: 'body',
        showVersionBadge: true,
        showLinks: true,
        showDocs: true
    }, options);

    // Lisa VERSION badge
    if (opts.showVersionBadge) {
        addVersionBadge();
    }

    const container = document.querySelector(opts.containerSelector) || document.body;

    // Lisa linkide sektsioon
    if (opts.showLinks) {
        addLinksSection(opts.containerSelector);
    }

    // Lisa dokumentatsiooni sektsioon
    if (opts.showDocs) {
        addDocsSection(opts.containerSelector);
    }
}

// Auto-init kui DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof SITE_CONFIG !== 'undefined') {
            initDocsAndLinks();
        }
    });
} else {
    if (typeof SITE_CONFIG !== 'undefined') {
        initDocsAndLinks();
    }
}
