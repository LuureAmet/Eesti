const siteListEl = document.getElementById('siteList');
const frameEl = document.getElementById('contentFrame');
const activeSiteLabelEl = document.getElementById('activeSiteLabel');
const statusBarEl = document.getElementById('statusBar');
const filterToggleContainer = document.getElementById('filterToggleContainer');
const blurSlider = document.getElementById('blurSlider');
const brightnessSlider = document.getElementById('brightnessSlider');
const reloadBtn = document.getElementById('reloadBtn');
const openExternalBtn = document.getElementById('openExternalBtn');
const hideModeBtn = document.getElementById('hideModeBtn');
const clearBlocksBtn = document.getElementById('clearBlocksBtn');
const maskLayer = document.getElementById('maskLayer');
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const clearNotesBtn = document.getElementById('clearNotesBtn');
const notesList = document.getElementById('notesList');
const noteTemplate = document.getElementById('noteItemTemplate');

const LOCAL_STORAGE_KEY = 'overlay-playground-notes';

let sites = [];
let activeSite = null;
let hideModeActive = false;
let drawingBlock = null;
let drawingStartPoint = null;

const filterState = {
  activeFilters: new Set(),
  blurAmount: Number(blurSlider.value),
  brightness: Number(brightnessSlider.value)
};

const notesState = loadNotes();
renderNotes();

async function init() {
  try {
    const response = await fetch('/config/sites.json');
    if (!response.ok) throw new Error(`Konfiguratsiooni laadimine ebaõnnestus (${response.status})`);
    sites = await response.json();
    renderSiteButtons();
  } catch (error) {
    console.error(error);
    statusBarEl.textContent = 'Konfiguratsiooni ei saanud laadida. Vaata konsooli.';
  }
}

function renderSiteButtons() {
  siteListEl.innerHTML = '';
  sites.forEach((site) => {
    const button = document.createElement('button');
    button.className = 'site-button';
    button.dataset.siteId = site.id;
    button.type = 'button';
    button.innerHTML = `
      <strong>${site.label}</strong>
      <small>${site.url}</small>
    `;
    button.addEventListener('click', () => selectSite(site.id));
    siteListEl.appendChild(button);
  });
}

function selectSite(siteId) {
  const site = sites.find((item) => item.id === siteId);
  if (!site) return;
  activeSite = site;
  updateActiveSiteButton();
  activeSiteLabelEl.textContent = site.label;
  frameEl.src = `/proxy/${site.id}/`;
  openExternalBtn.disabled = false;
  statusBarEl.textContent = 'Laen lehte…';
}

function updateActiveSiteButton() {
  const buttons = siteListEl.querySelectorAll('.site-button');
  buttons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.siteId === (activeSite?.id ?? ''));
  });
}

function updateFrameFilters() {
  const filters = [];
  if (filterState.activeFilters.has('grayscale')) {
    filters.push('grayscale(1)');
  }
  if (filterState.activeFilters.has('invert')) {
    filters.push('invert(1) hue-rotate(180deg)');
  }
  if (filterState.activeFilters.has('contrast')) {
    filters.push('contrast(1.35)');
  }
  if (filterState.activeFilters.has('sepia')) {
    filters.push('sepia(0.65)');
  }
  const blurValue = filterState.blurAmount;
  if (blurValue > 0 || filterState.activeFilters.has('blur')) {
    filters.push(`blur(${blurValue}px)`);
  }
  const brightnessValue = Math.max(50, Math.min(150, filterState.brightness));
  filters.push(`brightness(${brightnessValue / 100})`);

  frameEl.style.filter = filters.join(' ');
}

filterToggleContainer.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  const filterKey = button.dataset.filter;
  if (filterState.activeFilters.has(filterKey)) {
    filterState.activeFilters.delete(filterKey);
    button.classList.remove('active');
  } else {
    filterState.activeFilters.add(filterKey);
    button.classList.add('active');
  }
  updateFrameFilters();
});

blurSlider.addEventListener('input', () => {
  filterState.blurAmount = Number(blurSlider.value);
  updateFrameFilters();
});

brightnessSlider.addEventListener('input', () => {
  filterState.brightness = Number(brightnessSlider.value);
  updateFrameFilters();
});

reloadBtn.addEventListener('click', () => {
  if (!frameEl.src) return;
  const currentSrc = frameEl.src;
  frameEl.src = currentSrc;
  statusBarEl.textContent = 'Iframe värskendatud.';
});

openExternalBtn.addEventListener('click', () => {
  if (!activeSite) return;
  window.open(activeSite.url, '_blank');
});

frameEl.addEventListener('load', () => {
  if (!activeSite) return;
  statusBarEl.textContent = `Kuva: ${activeSite.url}`;
});

frameEl.addEventListener('error', () => {
  statusBarEl.textContent = "Iframe laadimine ebaõnnestus. Mõni sait võib iframe'i blokeerida.";
});

hideModeBtn.addEventListener('click', () => {
  hideModeActive = !hideModeActive;
  maskLayer.classList.toggle('active', hideModeActive);
  hideModeBtn.textContent = hideModeActive ? 'Lõpeta peitmine' : 'Alusta peitmist';
  statusBarEl.textContent = hideModeActive
    ? 'Peitmisrežiim: lohista raame, et ala katta. ESC lõpetab.'
    : 'Peitmisrežiim lõpetatud.';
});

clearBlocksBtn.addEventListener('click', () => {
  maskLayer.innerHTML = '';
  statusBarEl.textContent = 'Kõik maskid eemaldatud.';
});

maskLayer.addEventListener('mousedown', (event) => {
  if (!hideModeActive || event.button !== 0) return;
  event.preventDefault();
  const rect = maskLayer.getBoundingClientRect();
  drawingStartPoint = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
  drawingBlock = createMaskBlock();
  maskLayer.appendChild(drawingBlock);
  updateMaskBlock(drawingBlock, drawingStartPoint, drawingStartPoint);
});

maskLayer.addEventListener('mousemove', (event) => {
  if (!hideModeActive || !drawingBlock) return;
  const rect = maskLayer.getBoundingClientRect();
  const currentPoint = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
  updateMaskBlock(drawingBlock, drawingStartPoint, currentPoint);
});

maskLayer.addEventListener('mouseup', (event) => {
  if (!hideModeActive || !drawingBlock) return;
  const rect = maskLayer.getBoundingClientRect();
  const endPoint = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
  finalizeMaskBlock(drawingBlock, drawingStartPoint, endPoint);
  drawingBlock = null;
  drawingStartPoint = null;
});

maskLayer.addEventListener('mouseleave', () => {
  if (!hideModeActive || !drawingBlock) return;
  drawingBlock.remove();
  drawingBlock = null;
  drawingStartPoint = null;
});

maskLayer.addEventListener('click', (event) => {
  const removeButton = event.target.closest('.remove-block');
  if (removeButton) {
    removeButton.parentElement.remove();
    statusBarEl.textContent = 'Mask eemaldatud.';
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && hideModeActive) {
    hideModeActive = false;
    maskLayer.classList.remove('active');
    hideModeBtn.textContent = 'Alusta peitmist';
    statusBarEl.textContent = 'Peitmisrežiim katkestatud.';
  }
});

function createMaskBlock() {
  const block = document.createElement('div');
  block.className = 'mask-block';
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-block';
  removeButton.setAttribute('aria-label', 'Eemalda mask');
  removeButton.textContent = '×';
  block.appendChild(removeButton);
  return block;
}

function updateMaskBlock(block, startPoint, currentPoint) {
  const minX = Math.min(startPoint.x, currentPoint.x);
  const minY = Math.min(startPoint.y, currentPoint.y);
  const width = Math.abs(startPoint.x - currentPoint.x);
  const height = Math.abs(startPoint.y - currentPoint.y);

  block.style.left = `${minX}px`;
  block.style.top = `${minY}px`;
  block.style.width = `${width}px`;
  block.style.height = `${height}px`;
}

function finalizeMaskBlock(block, startPoint, endPoint) {
  updateMaskBlock(block, startPoint, endPoint);
  const { width, height } = block.getBoundingClientRect();
  if (width < 16 || height < 16) {
    block.remove();
  }
}

saveNoteBtn.addEventListener('click', () => {
  const content = noteInput.value.trim();
  if (!content) {
    statusBarEl.textContent = 'Märkme salvestamiseks kleebi või kirjuta tekst.';
    return;
  }
  const note = {
    id: crypto.randomUUID(),
    content,
    createdAt: new Date().toISOString()
  };
  notesState.unshift(note);
  persistNotes();
  renderNotes();
  noteInput.value = '';
  statusBarEl.textContent = 'Märge salvestatud lokaalselt.';
});

clearNotesBtn.addEventListener('click', () => {
  notesState.length = 0;
  persistNotes();
  renderNotes();
  statusBarEl.textContent = 'Kõik märkmed kustutatud.';
});

notesList.addEventListener('click', (event) => {
  const removeBtn = event.target.closest('.remove-note');
  if (!removeBtn) return;
  const noteId = removeBtn.dataset.noteId;
  const noteIndex = notesState.findIndex((item) => item.id === noteId);
  if (noteIndex >= 0) {
    notesState.splice(noteIndex, 1);
    persistNotes();
    renderNotes();
    statusBarEl.textContent = 'Märge eemaldatud.';
  }
});

function renderNotes() {
  notesList.innerHTML = '';
  if (notesState.length === 0) {
    const placeholder = document.createElement('li');
    placeholder.className = 'notes-placeholder';
    placeholder.textContent = 'Salvestatud märkmeid pole.';
    notesList.appendChild(placeholder);
    return;
  }

  notesState.forEach((note) => {
    const noteNode = noteTemplate.content.firstElementChild.cloneNode(true);
    const timeEl = noteNode.querySelector('time');
    const preEl = noteNode.querySelector('pre');
    const removeBtn = noteNode.querySelector('.remove-note');

    const formattedDate = new Date(note.createdAt).toLocaleString();
    timeEl.textContent = formattedDate;
    preEl.textContent = note.content;
    removeBtn.dataset.noteId = note.id;

    notesList.appendChild(noteNode);
  });
}

function loadNotes() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn('Märkmete laadimine ebaõnnestus', error);
  }
  return [];
}

function persistNotes() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notesState));
  } catch (error) {
    console.warn('Märkmete salvestamine ebaõnnestus', error);
  }
}

init();
updateFrameFilters();
