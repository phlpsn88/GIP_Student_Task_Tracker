// Server/server.js

// ── Imports ──────────────────────────────────────────────────────────────────
// express: het web-framework waarmee je HTTP-routes definieert
import express from 'express';
// mysql2/promise: MySQL-driver met async/await-ondersteuning
import mysql from 'mysql2/promise';
// bcrypt: wachtwoorden hashen (versleutelen) en vergelijken
import bcrypt from 'bcrypt';
// express-session: sessies bijhouden (onthoud wie er ingelogd is)
import session from 'express-session';

// ── App aanmaken ──────────────────────────────────────────────────────────────
// express() maakt een nieuw Express-applicatie-object aan
const app = express();
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
    host: 'localhost',           // MySQL draait op dezelfde machine
    port: 3306,                  // standaard MySQL-poort
    user: 'root',                // MySQL-gebruiker
    password: 'toor', // ← vervang door jouw wachtwoord
    database: 'taskmanager',            // ← vervang door jouw databasenaam
});

// ── Test-route ────────────────────────────────────────────────────────────────
// Een eenvoudige route om te controleren of de server actief is.
// Bezoek http://localhost:3000/api/test in de browser.
app.get('/api/test', (req, res) => {
    res.json({ bericht: 'Server werkt!' });
});

// ── Middleware: vereisLogin ───────────────────────────────────
// Middleware is een functie met drie parameters: req, res, next.
//   - Als de controle slaagt → next() aanroepen zodat de route verder gaat
//   - Als de controle mislukt → zelf een response sturen (route wordt NIET uitgevoerd)
function vereisLogin(req, res, next) {
    // req.session.gebruikerId werd ingesteld bij inloggen (H04)
    // Als het undefined is, is niemand ingelogd
    if (!req.session.gebruikerId) {
        return res.status(401).json({ fout: 'Inloggen vereist' });
    }
    next(); // alles OK — laat de route verder gaan
}

// ── GET /api/mijn-activiteiten — alleen eigen activiteiten ───
// vereisLogin als tweede argument: Express roept vereisLogin aan VÓÓR de route-functie
app.get('/api/mijn-tasks', vereisLogin, async (req, res) => {
    const [rijen] = await pool.execute(
        // WHERE user_id = ? filtert enkel de activiteiten van de ingelogde gebruiker
        // req.session.gebruikerId werd ingesteld bij het inloggen in H04
        `SELECT * 
        FROM tasks 
        WHERE user_id = ? 
        ORDER BY 
            CASE status
                 WHEN 'Niet gestart' THEN 1
                 WHEN 'Bezig' THEN 2
                 WHEN 'Afgerond' THEN 3
                 ELSE 4
            END`,
        [req.session.gebruikerId]
    );
    res.json(rijen);
});

// ── POST /api/activiteiten — nieuwe activiteit aanmaken ──────
// (vervangt de versie uit H03: user_id wordt nu automatisch ingesteld)
app.post('/api/tasks', vereisLogin, async (req, res) => {
    const { beschrijving, datum, title, status } = req.body;
    if (!title || !datum) {
        return res.status(400).json({ fout: 'Titel en datum zijn verplicht' });
    }
    const [r] = await pool.execute(
        `INSERT INTO tasks
         (title, beschrijving, datum, status, user_id)
         VALUES (?, ?, ?, ?, ?)`,
        // user_id = req.session.gebruikerId: de activiteit wordt gekoppeld aan de ingelogde gebruiker
        [title, beschrijving || null, datum, status || 'Niet gestart', req.session.gebruikerId]
    );
    res.status(201).json({ id: r.insertId, bericht: 'Taak aangemaakt' });
});

// ── PUT /api/tasks/:id — eigen activiteit bewerken ────
app.put('/api/tasks/:id', vereisLogin, async (req, res) => {
    const { title, beschrijving, datum, status } = req.body;
    const parsedDate = new Date(datum);
    const [r] = await pool.execute(
        `UPDATE tasks
         SET title=?, beschrijving=?, datum=?, status=?
         WHERE id=? AND user_id=?`,
        [title, beschrijving || null, parsedDate, status || 'Niet gestart',
            req.params.id, req.session.gebruikerId]
    );
    // affectedRows === 0: twee mogelijke oorzaken:
    //   1. De activiteit bestaat niet (id ongeldig)
    //   2. De activiteit bestaat wel, maar de gebruiker is niet de eigenaar
    // In beide gevallen: 403 Forbidden
    if (r.affectedRows === 0) {
        return res.status(403).json({ fout: 'Taak niet gevonden of geen toegang' });
    }
    res.json({ bericht: 'Taak bijgewerkt' });
});

// ── DELETE /api/activiteiten/:id — eigen activiteit verwijderen
app.delete('/api/tasks/:id', vereisLogin, async (req, res) => {
    const [r] = await pool.execute(
        // Zelfde eigendomscontrole via AND user_id = ?
        // Een gebruiker kan nooit de activiteiten van iemand anders verwijderen
        'DELETE FROM tasks WHERE id=? AND user_id=?',
        [req.params.id, req.session.gebruikerId]
    );
    if (r.affectedRows === 0) {
        return res.status(403).json({ fout: 'Taak niet gevonden of geen toegang' });
    }
    res.status(204).end();
});

app.get('/api/test-db', async (req, res) => {
    // pool.execute() voert de SQL-query uit en geeft een array terug.
    // Destructuring: [rijen] pakt het eerste element (de resultaatrijen).
    // Het tweede element (kolominfo) negeren we.
    const [rijen] = await pool.execute('SELECT * FROM tasks');

    // res.json() zet het JS-array om naar JSON en stuurt het naar de browser
    res.json(rijen);
});

app.get('/api/mijn-tasks', vereisLogin, async (req, res) => {
    const [rijen] = await pool.execute(
        `SELECT *
         FROM tasks
         WHERE user_id = ?
         ORDER BY
             CASE status
                 WHEN 'Niet gestart' THEN 1
                 WHEN 'Bezig' THEN 2
                 WHEN 'Afgerond' THEN 3
                 ELSE 4
             END`,
        [req.session.gebruikerId]
    );

    res.json(rijen);
});

// ── isAdmin-middleware ────────────────────────────────────────────────────────
// Combineert twee controles:
//   1. Is de gebruiker ingelogd?         → anders 401 Unauthorized
//   2. Heeft de gebruiker de admin-rol?  → anders 403 Forbidden
function isAdmin(req, res, next) {
    if (!req.session.gebruikerId) {
        return res.status(401).json({ fout: 'Inloggen vereist' });
    }
    if (req.session.rol !== 'admin') {
        return res.status(403).json({ fout: 'Geen toegang' });
    }
    next();
}

// ── GET /api-admin/activiteiten — alle activiteiten met aanmakernaam ────────────────
// Geen middleware: iedereen mag de lijst ophalen (ook gewone gebruikers).
// Vervang de GET-route uit H03 door deze versie met LEFT JOIN.
app.get('/api-admin/tasks', async (req, res) => {
    const [rijen] = await pool.execute(`
        SELECT
            t.*,
            u.naam AS aangemaakt_door
        FROM tasks t
        LEFT JOIN users u ON u.id = t.user_id
        ORDER BY 
            CASE t.status
                 WHEN 'Niet gestart' THEN 1
                 WHEN 'Bezig' THEN 2
                 WHEN 'Afgerond' THEN 3
                 ELSE 4
            END
    `);
    res.json(rijen);
});

// ── GET /api-admin/activiteiten/:id — één activiteit ophalen ────────────────────────
// Nieuw in H06: edit.html vraagt deze route op om het formulier in te vullen.
// De browser stuurt: GET /api-admin/activiteiten/5
// De server zoekt activiteit met id=5 en stuurt het terug als JSON.
app.get('/api-admin/tasks/:id', isAdmin, async (req, res) => {
    const [rijen] = await pool.execute(
        'SELECT * FROM tasks WHERE id = ?',
        [req.params.id]
    );
    if (rijen.length === 0) {
        return res.status(404).json({ fout: 'Niet gevonden' });
    }
    res.json(rijen[0]);
});

// ── POST /api-admin/activiteiten — enkel admin ──────────────────────────────────────
app.post('/api-admin/tasks', isAdmin, async (req, res) => {
    const { title, beschrijving, datum, status } = req.body;
    if (!title || !datum) {
        return res.status(400).json({ fout: 'titel en datum zijn verplicht' });
    }
    const [r] = await pool.execute(
        `INSERT INTO tasks
         (title, beschrijving, datum, status, user_id)
         VALUES (?, ?, ?, ?, ?)`,
        [title, beschrijving || null, datum,
            status || null, req.session.gebruikerId]
    );
    res.status(201).json({ id: r.insertId, bericht: 'Tasks aangemaakt' });
});

// ── PUT /api-admin/activiteiten/:id — enkel admin, GEEN eigendomscontrole ───────────
app.put('/api-admin/tasks/:id', isAdmin, async (req, res) => {
    const { title, beschrijving, datum, status } = req.body;
    await pool.execute(
        `UPDATE tasks
         SET title=?, beschrijving=?, datum=?, status=?
         WHERE id=?`,
        [title, beschrijving || null, datum,
            status || null, req.params.id]
    );
    res.json({ bericht: 'Taak bijgewerkt' });
});

// ── DELETE /api-admin/activiteiten/:id — enkel admin, GEEN eigendomscontrole ────────
app.delete('/api-admin/Tasks/:id', isAdmin, async (req, res) => {
    await pool.execute('DELETE FROM tasks WHERE id=?', [req.params.id]);
    res.status(204).end();
});

// ── POST /api/register — nieuw account aanmaken ────────────────────────────────
app.post('/api/register', async (req, res) => {
    // req.body bevat de JSON die het registratieformulier meestuurde
    const { naam, email, wachtwoord } = req.body;

    // Validatie: zijn alle verplichte velden ingevuld?
    if (!naam || !email || !wachtwoord) {
        return res.status(400).json({ fout: 'Alle velden zijn verplicht' });
    }
    if (wachtwoord.length < 8) {
        return res.status(400).json({ fout: 'Wachtwoord moet minstens 8 tekens zijn' });
    }

    // Controleer of dit e-mailadres al in gebruik is
    const [bestaande] = await pool.execute(
        'SELECT id FROM users WHERE email = ?', [email]
    );
    if (bestaande.length > 0) {
        // 409 Conflict: het e-mailadres is al bezet
        return res.status(409).json({ fout: 'E-mailadres is al in gebruik' });
    }

    // bcrypt.hash(wachtwoord, 10):
    //   - wachtwoord: de leesbare tekst die de gebruiker intypte
    //   - 10: het aantal "salt rounds" — hoe meer rounds, hoe veiliger maar trager.
    //         10 is de industriestandaard: veilig én snel genoeg voor login.
    // De hash ziet er zo uit: '$2b$10$...' (altijd 60 tekens lang)
    const hash = await bcrypt.hash(wachtwoord, 10);

    // Sla de gebruiker op — nooit het originele wachtwoord, altijd de hash!
    // rol hoeven we niet mee te geven: de database gebruikt DEFAULT 'gebruiker'
    const [r] = await pool.execute(
        'INSERT INTO users (naam, email, wachtwoord) VALUES (?, ?, ?)',
        [naam, email, hash]
    );

    // 201 Created: account succesvol aangemaakt
    // r.insertId = het AUTO_INCREMENT-id van de nieuwe gebruiker
    res.status(201).json({ id: r.insertId, bericht: 'Account aangemaakt' });
});


// ── POST /api/login — inloggen ─────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
    const { email, wachtwoord } = req.body;

    if (!email || !wachtwoord) {
        return res.status(400).json({ fout: 'Email en wachtwoord zijn verplicht' });
    }

    // Zoek de gebruiker op via e-mail
    const [rijen] = await pool.execute(
        'SELECT * FROM users WHERE email = ?', [email]
    );

    // Geen gebruiker gevonden? Geef DEZELFDE fout als bij een verkeerd wachtwoord.
    // Zo weet een aanvaller niet of het e-mailadres bestaat of niet.
    if (rijen.length === 0) {
        return res.status(401).json({ fout: 'Ongeldig e-mailadres of wachtwoord' });
    }

    const gebruiker = rijen[0];

    // bcrypt.compare(ingevoerd, opgeslagenHash):
    //   - berekent de hash van 'ingevoerd' en vergelijkt die met de opgeslagen hash
    //   - geeft true terug als ze overeenkomen, false als niet
    const klopt = await bcrypt.compare(wachtwoord, gebruiker.wachtwoord);
    if (!klopt) {
        return res.status(401).json({ fout: 'Ongeldig e-mailadres of wachtwoord' });
    }

    // Sessie aanmaken: sla gebruikersgegevens op voor volgende requests.
    // req.session is een object dat express-session bijhoudt tussen requests.
    req.session.gebruikerId = gebruiker.id;    // nodig om te weten wie er ingelogd is
    req.session.naam = gebruiker.naam;  // voor weergave in de UI
    req.session.rol = gebruiker.rol;   // 'gebruiker' of 'admin'

    // Stuur naam en rol terug — de front-end gebruikt dit om door te sturen
    res.json({ bericht: 'Ingelogd', naam: gebruiker.naam, rol: gebruiker.rol });
});


// ── POST /api/logout — uitloggen ───────────────────────────────────────────────
app.post('/api/logout', (req, res) => {
    // req.session.destroy() verwijdert de sessie volledig van de server
    req.session.destroy(() => {
        res.json({ bericht: 'Uitgelogd' });
    });
});


// ── GET /api/mij — wie is er ingelogd? ────────────────────────────────────────
app.get('/api/mij', (req, res) => {
    // req.session.gebruikerId is undefined als niemand ingelogd is
    if (!req.session.gebruikerId) {
        return res.status(401).json({ fout: 'Niet ingelogd' });
    }
    // Stuur de sessiegegevens terug — de front-end roept dit op bij het laden van elke beveiligde pagina
    res.json({ id: req.session.gebruikerId, naam: req.session.naam, rol: req.session.rol });
});



// ── Server starten ────────────────────────────────────────────────────────────
// app.listen() start de server op de opgegeven poort.
// De callback wordt éénmalig uitgevoerd zodra de server klaar is.
app.listen(port, () => {
    console.log('Server gestart → http://localhost:' + port);
});