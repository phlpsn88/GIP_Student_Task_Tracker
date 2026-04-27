// Server/server.js

// ── Imports ──────────────────────────────────────────────────────────────────
// express: het web-framework waarmee je HTTP-routes definieert
import express  from 'express';
// mysql2/promise: MySQL-driver met async/await-ondersteuning
import mysql    from 'mysql2/promise';
// bcrypt: wachtwoorden hashen (versleutelen) en vergelijken
import bcrypt   from 'bcrypt';
// express-session: sessies bijhouden (onthoud wie er ingelogd is)
import session  from 'express-session';

// ── App aanmaken ──────────────────────────────────────────────────────────────
// express() maakt een nieuw Express-applicatie-object aan
const app  = express();
const port = 3000;  // poort waarop de server luistert

// ── Middleware: statische bestanden ──────────────────────────────────────────
// express.static serveert automatisch alle bestanden uit de Client-map.
// Als de browser vraagt om '/', krijgt hij 'Client/index.html'.
// Als de browser vraagt om '/style.css', krijgt hij 'Client/style.css'.
app.use(express.static('../Client'));

// ── Middleware: JSON body parsing ─────────────────────────────────────────────
// Zonder express.json() is req.body altijd undefined bij POST/PUT-requests.
// Met express.json() zet Express de inkomende JSON automatisch om naar een JS-object.
app.use(express.json());

// ── Middleware: sessies ───────────────────────────────────────────────────────
app.use(session({
    // secret: een geheime sleutel waarmee de sessie-cookie ondertekend wordt.
    //         Kies een lange, willekeurige string. Nooit publiceren!
    secret: 'GIP_2026_Juni',

    // resave: false = sessie alleen opslaan als er iets veranderd is
    resave: false,

    // saveUninitialized: false = geen lege sessie aanmaken voor niet-ingelogde bezoekers
    saveUninitialized: false,

    cookie: {
        // maxAge: hoe lang de sessie geldig blijft (in milliseconden)
        // 1000ms × 60s × 60min × 4 = 4 uur
        maxAge: 1000 * 60 * 60 * 4
    }
}));

// ── Database-verbindingspool ──────────────────────────────────────────────────
// createPool maakt een pool van herbruikbare verbindingen aan.
// Een pool is efficiënter dan elke keer een nieuwe verbinding openen.
const pool = mysql.createPool({
    host:     'localhost',           // MySQL draait op dezelfde machine
    port:     3306,                  // standaard MySQL-poort
    user:     'root',                // MySQL-gebruiker
    password: 'toor', // ← vervang door jouw wachtwoord
    database: 'taskmanager',            // ← vervang door jouw databasenaam
});

// ── Test-route ────────────────────────────────────────────────────────────────
// Een eenvoudige route om te controleren of de server actief is.
// Bezoek http://localhost:3000/api/test in de browser.
app.get('/api/test', (req, res) => {
    res.json({ bericht: 'Server werkt!' });
});

app.get('/api/test-db', async (req, res) => {
    // pool.execute() voert de SQL-query uit en geeft een array terug.
    // Destructuring: [rijen] pakt het eerste element (de resultaatrijen).
    // Het tweede element (kolominfo) negeren we.
    const [rijen] = await pool.execute('SELECT * FROM tasks');

    // res.json() zet het JS-array om naar JSON en stuurt het naar de browser
    res.json(rijen);
});

// ── Server starten ────────────────────────────────────────────────────────────
// app.listen() start de server op de opgegeven poort.
// De callback wordt éénmalig uitgevoerd zodra de server klaar is.
app.listen(port, () => {
    console.log('Server gestart → http://localhost:' + port);
});