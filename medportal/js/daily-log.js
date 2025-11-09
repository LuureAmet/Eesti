// ============================================
// PÄEVALOGI FUNKTSIOONID
// ============================================

// Seadista kuupäev ja kellaaeg vaikimisi
document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const dateInput = document.getElementById('logDate');
    const timeInput = document.getElementById('logTime');

    // Seadista täna
    dateInput.value = now.toISOString().split('T')[0];
    timeInput.value = now.toTimeString().slice(0,5);

    // Vorm submit
    const form = document.getElementById('dailyLogForm');
    if (form) {
        form.addEventListener('submit', handleLogSubmit);
    }
});

// Vormi esitamine
function handleLogSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = extractFormData(form);

    // Lisa timestamp
    formData.timestamp = new Date().toISOString();

    // Salvesta localStorage'i
    saveDailyLog(formData);

    alert('✓ Päevalogi salvestatud!');

    // Puhasta vorm
    form.reset();

    // Seadista uuesti kuupäev
    const now = new Date();
    document.getElementById('logDate').value = now.toISOString().split('T')[0];
    document.getElementById('logTime').value = now.toTimeString().slice(0,5);
}

// Salvestamine
function saveDailyLog(data) {
    // Lae olemasolevad logid
    let logs = JSON.parse(localStorage.getItem('dailyLogs') || '[]');

    // Lisa uus
    logs.push(data);

    // Salvesta
    localStorage.setItem('dailyLogs', JSON.stringify(logs));
}

// Logide vaatamine
function viewLogs() {
    const logs = JSON.parse(localStorage.getItem('dailyLogs') || '[]');

    if (logs.length === 0) {
        alert('ℹ Ühtegi logi pole veel salvestatud!');
        return;
    }

    const historyDiv = document.getElementById('logsHistory');
    const tableDiv = document.getElementById('logsTable');

    // Loo tabel
    let html = `<table class="medication-table">
        <thead>
            <tr>
                <th>Kuupäev</th>
                <th>Kell</th>
                <th>Kaal</th>
                <th>BP (h)</th>
                <th>BP (õ)</th>
                <th>Pulss</th>
                <th>Õhupuudus</th>
                <th>Väsimus</th>
                <th>Turse</th>
                <th>Märkused</th>
                <th></th>
            </tr>
        </thead>
        <tbody>`;

    logs.forEach((log, index) => {
        html += `<tr>
            <td>${log.logDate || 'N/A'}</td>
            <td>${log.logTime || 'N/A'}</td>
            <td>${log.weight || '-'} kg</td>
            <td>${log.bpMorning || '-'}</td>
            <td>${log.bpEvening || '-'}</td>
            <td>${log.heartRate || '-'}</td>
            <td>${log.breathlessness || 0}/3</td>
            <td>${log.fatigue || 0}/3</td>
            <td>${log.swelling || 0}/3</td>
            <td>${(log.notes || '').substring(0, 30)}...</td>
            <td><button type="button" onclick="deleteLog(${index})">×</button></td>
        </tr>`;
    });

    html += `</tbody></table>`;

    tableDiv.innerHTML = html;
    historyDiv.classList.remove('hidden');
    historyDiv.scrollIntoView({ behavior: 'smooth' });
}

// Logi kustutamine
function deleteLog(index) {
    if (!confirm('Kas soovid selle logi kustutada?')) {
        return;
    }

    let logs = JSON.parse(localStorage.getItem('dailyLogs') || '[]');
    logs.splice(index, 1);
    localStorage.setItem('dailyLogs', JSON.stringify(logs));

    alert('✓ Logi kustutatud!');
    viewLogs(); // Uuenda vaadet
}

// CSV eksport
function exportAllLogs() {
    const logs = JSON.parse(localStorage.getItem('dailyLogs') || '[]');

    if (logs.length === 0) {
        alert('ℹ Ühtegi logi pole veel salvestatud!');
        return;
    }

    // CSV päis
    let csv = 'Kuupäev,Kellaaeg,Kaal(kg),BP_hommik,BP_õhtu,Pulss,Õhupuudus(0-3),Väsimus(0-3),Turse(0-3),Rindkerevalu(0-3),Hingamine,Jalutus,Ravimid,Meditatsioon,Märkused\n';

    // Andmed
    logs.forEach(log => {
        const row = [
            log.logDate || '',
            log.logTime || '',
            log.weight || '',
            log.bpMorning || '',
            log.bpEvening || '',
            log.heartRate || '',
            log.breathlessness || '0',
            log.fatigue || '0',
            log.swelling || '0',
            log.chestPain || '0',
            log.routineBreathing || 'ei',
            log.routineWalking || 'ei',
            log.routineMeds || 'ei',
            log.routineMeditation || 'ei',
            `"${(log.notes || '').replace(/"/g, '""')}"` // Escape quotes
        ];

        csv += row.join(',') + '\n';
    });

    // Lae alla
    const filename = `paevalogiد_${formatDate()}.csv`;
    downloadFile(csv, filename, 'text/csv;charset=utf-8');
}

// Kuupäeva vormindamine
function formatDate() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
