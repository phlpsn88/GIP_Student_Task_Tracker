// Client/js/dashboard.js

// ── Sessiecontrole bij laden ───────────────────────────────────────────────────
async function init() {
    // Vraag de server: wie is er momenteel ingelogd?
    // GET /api/mij kijkt naar de sessie-cookie die de browser meestuurt.
    const response = await fetch('/api/mij');

    if (!response.ok) {
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('linkLogin').style.display = 'block';
        document.getElementById('linkLogout').style.display = 'none';
        return;
    }

    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'flex';
    document.getElementById('linkLogin').style.display = 'none';
    document.getElementById('linkLogout').style.display = 'flex';
}

document.getElementById('logoutBtn')
    .addEventListener('click', async () => {
        sessionStorage.removeItem('herinneringGetoond');
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/index.html';
    });

document.getElementById('taskManagerLink')
    .addEventListener('click', async () => {
        checkIfUserIsLogedIn();
    });

document.getElementById('taskManagerLinkFooter')
    .addEventListener('click', async () => {
        checkIfUserIsLogedIn();
    });

const checkIfUserIsLogedIn = async () => {
    const response = await fetch('/api/mij');

    if (!response.ok) {
        const loginOverlay = document.querySelector('.overlay-login')
        loginOverlay.style.display = "flex"
        document.body.classList.add("remove-scrolling");
        return;
    }
    window.location.href = '/task_manager.html';
}

init();