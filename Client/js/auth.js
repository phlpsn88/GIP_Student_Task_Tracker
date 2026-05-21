// Client/js/auth.js
// Dit bestand wordt geladen op zowel register.html als login.html.
// Elke sectie controleert eerst of het formulier op de huidige pagina bestaat.

// ── Registratie ───────────────────────────────────────────────────────────────
const registerForm = document.getElementById('register-form');

// Alleen uitvoeren als we op register.html zijn (anders is registerForm null)
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        // e.preventDefault() voorkomt dat het formulier de pagina herlaadt
        e.preventDefault();

        const naam = document.getElementById('gebruikersnaam').value;
        const email = document.getElementById('emailRegister').value;
        const wachtwoord = document.getElementById('wachtwoordRegister').value;

        // fetch() stuurt een POST-request naar de server
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // vertel de server dat we JSON sturen
            body: JSON.stringify({ naam, email, wachtwoord }) // zet JS-object om naar JSON-tekst
        });
        const data = await response.json();

        if (response.ok) {
            // response.ok = true als de statuscode 200-299 is (hier: 201)
            // Registratie gelukt → doorsturen naar loginpagina
            window.location.href = 'index.html';
        } else {
            // Fout (bv. e-mail al in gebruik) → toon de foutmelding
            const fout = document.getElementById('foutmeldingRegister');
            fout.textContent = data.fout;  // tekst van de server instellen
            fout.style.color = 'black';
            fout.style.textAlign = 'center';
            fout.style.paddingBottom = '1em';
            fout.hidden = false;           // element zichtbaar maken
        }
    });
}

// ── Login ─────────────────────────────────────────────────────────────────────
const loginForm = document.getElementById('login-form');

// Alleen uitvoeren als we op login.html zijn
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email      = document.getElementById('emailLogin').value;
        const wachtwoord = document.getElementById('wachtwoordLogin').value;

        const response = await fetch('/api/login', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ email, wachtwoord })
        });
        const data = await response.json();

        if (response.ok) {
            // Login gelukt — stuur door op basis van de rol die de server terugstuurde:
            //   admin     → admin.html (adminpanel)
            //   gebruiker → dashboard.html (eigen activiteiten)
            window.location.href = data.rol === 'admin' ? '/admin.html' : '/task_manager.html';
        } else {
            const fout = document.getElementById('foutmeldingLogin');
            fout.textContent = data.fout;
            fout.hidden = false;
        }
    });
}