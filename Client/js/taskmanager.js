// Client/js/dashboard.js

// ── Sessiecontrole bij laden ───────────────────────────────────────────────────
async function init() {
    // Vraag de server: wie is er momenteel ingelogd?
    // GET /api/mij kijkt naar de sessie-cookie die de browser meestuurt.
    const response = await fetch('/api/mij');

    if (!response.ok) {
        // 401 = niet ingelogd → doorsturen naar loginpagina
        // Dit voorkomt dat niet-ingelogde bezoekers het dashboard zien
        window.location.href = '/login.html';
        return; // stop de functie — de rest mag niet uitgevoerd worden
    }

    const gebruiker = await response.json();
    document.getElementById('gebruiker-naam').textContent = gebruiker.naam;

    // Admins horen niet op het gebruikersdashboard — stuur door naar admin.html
    if (gebruiker.rol === 'admin') {
        window.location.href = '/admin.html';
        return;
    }

    laadActiviteiten();

    // Event listeners pas registreren nadat de sessiecontrole gelukt is
    document.getElementById('activiteit-form')
        .addEventListener('submit', slaActiviteitOp);
    document.getElementById('annuleer-btn')
        .addEventListener('click', resetFormulier);
    document.getElementById('logout-btn')
        .addEventListener('click', async () => {
            await fetch('/api/logout', { method: 'POST' });
            window.location.href = '/login.html';
        });
}

// Module-level cache — beschikbaar voor event delegation zonder inline onclick
let activiteitenCache = [];

// ── Eigen activiteiten laden ───────────────────────────────────────────────────
async function laadActiviteiten() {
    // GET /api/mijn-activiteiten geeft enkel de activiteiten van de ingelogde gebruiker
    const response     = await fetch('/api/mijn-activiteiten');
    const activiteiten = await response.json();
    activiteitenCache  = activiteiten; // bewaar voor event delegation
    const container    = document.getElementById('activiteiten-tabel');

    if (activiteiten.length === 0) {
        container.innerHTML = '<p>Je hebt nog geen activiteiten toegevoegd.</p>';
        return;
    }

    // Template literal met .map() en .join('') om de tabel op te bouwen
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Naam</th><th>Datum</th><th>Aanvang</th>
                    <th>Locatie</th><th>Max.</th><th>Acties</th>
                </tr>
            </thead>
            <tbody>
                ${activiteiten.map(a => `
                    <tr>
                        <td>${a.naam}</td>
                        <td>${new Date(a.datum).toLocaleDateString('nl-BE')}</td>
                        <td>${a.starttijd.slice(0,5)}</td>
                        <td>${a.locatie || '—'}</td>
                        <td>${a.max_deelnemers}</td>
                        <td>
                            <!-- Geef de activiteitsgegevens als argumenten mee zodat
                                 startBewerken het formulier kan invullen zonder extra API-call -->
                            <button data-actie="bewerken" data-id="${a.id}">
                                Bewerken
                            </button>
                            <button data-actie="verwijderen" data-id="${a.id}">
                                Verwijderen
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`;
}

// ── Formulier verzenden: aanmaken of bewerken ─────────────────────────────────
async function slaActiviteitOp(e) {
    e.preventDefault();

    // edit-id is leeg → nieuwe activiteit (POST)
    // edit-id is gevuld → bestaande bewerken (PUT)
    const editId = document.getElementById('edit-id').value;
    const body = {
        naam:           document.getElementById('naam').value,
        beschrijving:   document.getElementById('beschrijving').value,
        datum:          document.getElementById('datum').value,
        starttijd:      document.getElementById('starttijd').value,
        locatie:        document.getElementById('locatie').value,
        max_deelnemers: document.getElementById('max_deelnemers').value,
    };

    // Bepaal URL en methode op basis van of we aanmaken of bewerken
    const url    = editId ? `/api/activiteiten/${editId}` : '/api/activiteiten';
    const method = editId ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
        resetFormulier(); // formulier leegmaken
        laadActiviteiten(); // tabel herladen
    } else {
        const fout = document.getElementById('foutmelding');
        fout.textContent = data.fout;
        fout.hidden = false;
    }
}

// ── Bewerken: formulier invullen met bestaande gegevens ───────────────────────
function startBewerken(id, naam, beschrijving, datum, starttijd, locatie, maxDeel) {
    // Sla het id op in het verborgen veld — slaActiviteitOp() leest dit uit
    document.getElementById('edit-id').value           = id;
    document.getElementById('naam').value              = naam;
    document.getElementById('beschrijving').value      = beschrijving;
    document.getElementById('datum').value             = datum;
    document.getElementById('starttijd').value         = starttijd;
    document.getElementById('locatie').value           = locatie;
    document.getElementById('max_deelnemers').value    = maxDeel;
    document.getElementById('form-titel').textContent  = 'Activiteit bewerken';
    document.getElementById('opslaan-btn').textContent = 'Wijzigingen opslaan';
    document.getElementById('annuleer-btn').hidden     = false;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll naar formulier
}

// ── Event delegation — vervangt inline onclick in template literals ───────────
// Inline onclick("functie()") is niet bereikbaar vanuit ES-module scope.
// In plaats daarvan luisteren we op de container en lezen we data-actie + data-id.
document.getElementById('activiteiten-tabel').addEventListener('click', async function(e) {
    const btn = e.target.closest('[data-actie]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);

    if (btn.dataset.actie === 'verwijderen') {
        if (!confirm('Activiteit verwijderen?')) return;
        await fetch(`/api/activiteiten/${id}`, { method: 'DELETE' });
        laadActiviteiten();
    }

    if (btn.dataset.actie === 'bewerken') {
        // Zoek de activiteit op in de cache — geen extra API-call nodig
        const a = activiteitenCache.find(x => x.id === id);
        if (a) startBewerken(
            a.id, a.naam, a.beschrijving || '',
            a.datum.slice(0,10), a.starttijd.slice(0,5),
            a.locatie || '', a.max_deelnemers
        );
    }
});

// ── Formulier resetten naar "nieuw aanmaken"-modus ────────────────────────────
function resetFormulier() {
    document.getElementById('activiteit-form').reset(); // alle velden leegmaken
    document.getElementById('edit-id').value           = '';
    document.getElementById('form-titel').textContent  = 'Nieuwe activiteit';
    document.getElementById('opslaan-btn').textContent = 'Toevoegen';
    document.getElementById('annuleer-btn').hidden     = true;
    document.getElementById('foutmelding').hidden      = true;
}

// Startpunt: sessie controleren en activiteiten laden
init();