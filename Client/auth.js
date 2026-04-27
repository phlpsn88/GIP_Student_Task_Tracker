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
        const email = document.getElementById('email').value;
        const wachtwoord = document.getElementById('password').value;

        // fetch() stuurt een POST-request naar de server
        const response = await fetch('http://localhost:3000/api/register', {
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
            const fout = document.getElementById('foutmelding');
            fout.textContent = data.fout;  // tekst van de server instellen
            fout.hidden = false;           // element zichtbaar maken
        }
    });
}