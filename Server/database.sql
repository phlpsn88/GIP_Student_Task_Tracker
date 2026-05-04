-- Database aanmaken
CREATE DATABASE taskmanager;
USE taskmanager;

-- Tabel: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naam VARCHAR(50) NOT NULL,
    wachtwoord VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(20)  NOT NULL DEFAULT 'gebruiker'
);

-- Tabel: tasks
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, 
    title VARCHAR(100) NOT NULL,
    beschrijving TEXT,
    datum DATE,
    status VARCHAR(20) DEFAULT 'Niet gestart',
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- Testdata invoeren
INSERT INTO users (naam, wachtwoord, email, rol)
VALUES
('Admin', '$2b$10$nmetK20wC9tY/edoj9R.JuIgopSV5U09Utmdddnikz3l50Ad.N6w6', 'admin@taskmanager.be', 'admin'),
('Amine', '$2b$10$KFzbDVyL8A8Wnt/7fN6dVutZawVxwsUjeYoFJEJTK82kob3Whgi4.', 'amine@gmail.com', 'gebruiker'),
('Raf', '$2b$10$WpHT92K8dHzpzhjGjN.TtuQWB/DPPkmiJx4G.mmLDjbRqGifUj3xW', 'rafangeli@gmail.com', 'gebruiker');


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