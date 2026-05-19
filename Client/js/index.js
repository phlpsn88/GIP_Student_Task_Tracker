// Client/js/dashboard.js

// ── Sessiecontrole bij laden ───────────────────────────────────────────────────
async function init() {
    // Vraag de server: wie is er momenteel ingelogd?
    // GET /api/mij kijkt naar de sessie-cookie die de browser meestuurt.
    const response = await fetch('/api/mij');

    if (!response.ok) {
        alert('niet ingelogd')
        return;
    }

    alert('ingelogd')
}

init();