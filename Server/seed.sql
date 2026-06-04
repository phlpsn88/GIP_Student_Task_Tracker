-- Testdata invoeren
INSERT INTO users (naam, wachtwoord, email, rol)
VALUES
('Admin', 'PLACEHOLDER', 'admin@taskmanager.be', 'admin'),


INSERT INTO tasks (user_id, title, beschrijving, datum, status)
VALUES
(1, 'Databank maken', 'MySQL databank ontwerpen', '2025-12-15', 'Afgewerkt'),
(1, 'SQL oefenen', 'SELECT en INSERT oefenen', '2025-12-20', 'Bezig'),
(2, 'Documentatie schrijven', 'Uitleg maken van databank', '2025-12-18', 'Niet gestart'),
(2, 'Database optimaliseren', 'Indexen toevoegen en queries verbeteren', '2025-12-22', 'Niet gestart'),
(3, 'Frontend koppelen', 'Website verbinden met databank', '2025-12-25', 'Niet gestart'),
(1, 'Backup instellen', 'Automatische back-ups configureren', '2025-12-28', 'Bezig'),
(3, 'Testdata invoeren', 'Dummy data toevoegen voor testing', '2025-12-19', 'Afgewerkt'),
(2, 'Beveiliging controleren', 'SQL-injectie en rechten testen', '2025-12-30', 'Niet gestart');
