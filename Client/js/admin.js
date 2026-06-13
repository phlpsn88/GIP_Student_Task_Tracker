const newTaskOverlay = document.querySelector('.overlay-new-task');
const deletePopup = document.getElementById("popup-delete");

let taskToDelete = null;

async function init() {
    const res = await fetch('/api/mij');
    const gebruiker = await res.json();

    if (gebruiker.rol !== 'admin') { window.location.href = '/task_manager.html'; return; }
    document.getElementById('gebruiker-naam').textContent = `Hallo, ${gebruiker.naam}`;

    laadTasks();

    document.getElementById('tasksForm')
        .addEventListener('submit', slaTaskOp);
    document.getElementById('closeNewTask')
        .addEventListener('click', resetFormulier);
}

async function laadTasks() {
    const res = await fetch('/api-admin/tasks');
    const tasks = await res.json();
    const container = document.getElementById('tasksTabel');
    tasksCache = tasks;

    if (tasks.length === 0) {
        container.innerHTML = '<p>Nog geen taken.</p>';
        return;
    }

    container.innerHTML = `
        <div id="tasksTabel" class="tasks-wrapper">
            ${tasks.map(t => `
                <article class="task-card ${t.status === 'Afgewerkt' ? 'task-card-afgewerkt' : ''}">
                    <h3>${t.title}</h3>
                    <p class="description">${t.beschrijving}</p>
                    <p class="deadline">${new Date(t.datum).toLocaleDateString('nl-BE')}</p>
                    <span class="status">${t.status}</span>
                    <div class="actions">
                        <button class="btn-edit-task" data-actie="bewerken" data-id="${t.id}">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="btn-delete" data-actie="verwijderen" data-id="${t.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </article>
            `).join('')}
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
    const url = editId ? `/api-admin/tasks/${editId}` : '/api-admin/tasks';
    const method = editId ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
        resetFormulier(); // formulier leegmaken
        newTaskOverlay.style.display = "none";
        document.body.classList.remove("remove-scrolling");
        laadTasks(); // tabel herladen
    } else {
        const fout = document.getElementById('foutmelding');
        fout.textContent = data.fout;
        fout.hidden = false;
    }
}

let tasksCache = [];

document.getElementById('tasksTabel').addEventListener('click', async function (e) {
    const btn = e.target.closest('[data-actie]');
    if (!btn) return;

    const id = parseInt(btn.dataset.id);

    if (btn.dataset.actie === 'verwijderen') {
        taskToDelete = id;
        deletePopup.style.display = "flex";
    }

    if (btn.dataset.actie === 'bewerken') {
        // Zoek de activiteit op in de cache — geen extra API-call nodig
        const t = tasksCache.find(x => x.id === id);
        if (t) startBewerken(
            t.id, t.title, t.beschrijving || '',
            t.datum.slice(0, 10),
            t.status
        );
    }
});

document.getElementById('confirm-delete')
    .addEventListener('click', async () => {

    if (!taskToDelete) return;

    const response = await fetch(
        `/api-admin/tasks/${taskToDelete}`,
        { method: 'DELETE' }
    );

    if (response.ok) {
        laadTasks();
    }

    taskToDelete = null;
    deletePopup.style.display = "none";
});

document.getElementById('cancel-delete')
    .addEventListener('click', closePopup);

function closePopup() {
    taskToDelete = null;
    deletePopup.style.display = "none";
}


// ── Bewerken: formulier invullen met bestaande gegevens ───────────────────────
function startBewerken(id, title, beschrijving, datum, status) {
    // Sla het id op in het verborgen veld — slaActiviteitOp() leest dit uit
    document.getElementById('edit-id').value = id;
    document.getElementById('title').value = title;
    document.getElementById('beschrijving').value = beschrijving;
    document.getElementById('datum').value = datum;
    document.getElementById('status').value = status;
    document.getElementById('form-title').textContent = 'Taak bewerken';
    document.getElementById('save-btn').textContent = 'Wijzigingen opslaan';
    newTaskOverlay.style.display = "flex";
    document.body.classList.add("remove-scrolling");
}

function resetFormulier() {
    document.getElementById('tasksForm').reset(); // alle velden leegmaken
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').textContent = 'Nieuwe taak';
    document.getElementById('save-btn').textContent = 'Toevoegen';
    document.getElementById('foutmelding').hidden = true;
}

// Event delegation — voorkomt conflicten met ES-modules
// onclick in template literals is niet toegankelijk vanuit een module-scope

init();