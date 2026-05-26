// Client/js/dashboard.js

// ── Sessiecontrole bij laden ───────────────────────────────────────────────────
async function init() {
    // Vraag de server: wie is er momenteel ingelogd?
    // GET /api/mij kijkt naar de sessie-cookie die de browser meestuurt.
    const response = await fetch('/api/mij');

    const gebruiker = await response.json();
    document.getElementById('gebruiker-naam').textContent = `Hallo, ${gebruiker.naam}`;

    if (gebruiker.rol === 'admin') {
        window.location.href = '/admin.html';
        return;
    }

    laadTasks();

    document.getElementById('tasksForm')
        .addEventListener('submit', slaTaskOp);

}

let tasksCache = [];

async function laadTasks() {
    // GET /api/mijn-activiteiten geeft enkel de activiteiten van de ingelogde gebruiker
    const response = await fetch('/api/mijn-tasks');
    const tasks = await response.json();
    tasksCache = tasks; // bewaar voor event delegation
    const container = document.getElementById('tasksTabel');

    if (tasks.length === 0) {
        container.innerHTML = '<p>Je hebt nog geen taken toegevoegd.</p>';
        return;
    }

    container.innerHTML = `
        <div id="tasksTabel" class="tasks-wrapper">
            ${tasks.map(T => `
                <article class="task-card">
                    <h3>${T.title}</h3>
                    <p class="description">${T.beschrijving}</p>
                    <p class="deadline">${new Date(T.datum).toLocaleDateString('nl-BE')}</p>
                    <span class="status">${T.status}</span>
                    <div class="actions">
                        <button class="btn-edit-task" title="Bewerken">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="btn-delete" title="Verwijderen">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </article>
            ` ).join('')}
        </div>`;
}

async function slaTaskOp(e) {
    e.preventDefault();

    const editId = document.getElementById('edit-id').value;
    const body = {
        title: document.getElementById('title').value,
        beschrijving: document.getElementById('beschrijving').value,
        datum: document.getElementById('datum').value,
        status: document.getElementById('status').value,
    };
    console.log(body)
    const url = editId ? `/api/tasks/${editId}` : '/api/tasks';
    const method = editId ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
        // resetFormulier(); // formulier leegmaken
        laadTasks(); // tabel herladen
    } else {
        const fout = document.getElementById('foutmelding');
        fout.textContent = data.fout;
        fout.hidden = false;
    }
}

init();