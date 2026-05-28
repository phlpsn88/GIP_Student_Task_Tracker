async function init() {
    const res = await fetch('/api/mij');
    const gebruiker = await res.json();
    if (gebruiker.rol !== 'admin') { window.location.href = '/task_manager.html'; return; }
    laadTasks();
}

async function laadTasks() {
    const res           = await fetch('/api-admin/tasks');
    const tasks  = await res.json();
    const container     = document.getElementById('tasksTabel');

    if (tasks.length === 0) {
        container.innerHTML = '<p>Nog geen taken.</p>';
        return;
    }

    container.innerHTML = `
        <div id="tasksTabel" class="tasks-wrapper">
            ${tasks.map(t => `
                <article class="task-card">
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
            ` ).join('')}
        </div>`;
}

// Event delegation — voorkomt conflicten met ES-modules
// onclick in template literals is niet toegankelijk vanuit een module-scope
document.getElementById('tasksTabel').addEventListener('click', async function(e) {
    const btn = e.target.closest('[data-actie="verwijderen"]');
    if (!btn) return;
    if (!confirm('Taak verwijderen?')) return;
    await fetch('/api-admin/tasks/' + btn.dataset.id, { method: 'DELETE' });
    laadTasks();
});

init();