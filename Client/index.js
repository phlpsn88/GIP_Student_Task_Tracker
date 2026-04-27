// Client/js/index.js

// async function: een functie die await mag gebruiken
async function laadTasks() {
    // fetch() stuurt een HTTP GET-request naar de server.
    // Zonder tweede argument is de methode altijd GET.
    // await wacht tot de server antwoordt voordat de code verder gaat.
    const response = await fetch('/api/tasks');

    // response.json() leest de JSON-tekst en zet die om naar een JS-array.
    // Ook dit is asynchroon, vandaar de tweede await.
    const tasks = await response.json();

    const lijst = document.getElementById('activiteiten-lijst');

    // Geen activiteiten? Toon een melding en stop de functie.
    if (tasks.length === 0) {
        lijst.innerHTML = '<p>Geen activiteiten gepland.</p>';
        return;
    }

    // .map() doorloopt elk activiteit-object en geeft een HTML-string terug.
    // .join('') plakt alle strings aan elkaar zonder scheidingsteken.
    lijst.innerHTML = tasks.map(act => `
        <article class="activiteit-kaart">
            <h3>${act.naam}</h3>
            <p>${act.beschrijving || ''}</p>
            <!-- act.beschrijving || '' : toon lege string als beschrijving null is -->
            <p>📅 ${act.datum.slice(0,10)}   🕐 ${act.starttijd.slice(0,5)}</p>
            <p>📍 ${act.locatie || '—'}</p>
            <p>Plaatsen: ${act.max_deelnemers}</p>
        </article>
    `).join('');
}

// De functie aanroepen zodra de pagina geladen is
laadTasks();