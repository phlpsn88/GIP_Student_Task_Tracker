-- Database aanmaken
CREATE DATABASE taskmanager;
USE taskmanager;

-- Tabel: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naam VARCHAR(50) NOT NULL UNIQUE,
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
('Admin', 'PLACEHOLDER', 'admin@taskmanager.be', 'admin'),
('jan', 'PLACEHOLDER', 'jan@email.com', 'gebruiker'),
('piet', 'PLACEHOLDER', 'piet@email.com', 'gebruiker'),
('anna', 'PLACEHOLDER', 'anna@mail.com', 'gebruiker'),
('tom', 'PLACEHOLDER', 'tom@mail.com', 'gebruiker'),
('lisa', 'PLACEHOLDER', 'lisa@mail.com', 'gebruiker');


INSERT INTO tasks (user_id, title, beschrijving, datum, status)
VALUES
(1, 'Databank maken', 'MySQL databank ontwerpen', '2025-12-15', 'Afgewerkt'),
(1, 'SQL oefenen', 'SELECT en INSERT oefenen', '2025-12-20', 'Bezig'),
(2, 'Documentatie schrijven', 'Uitleg maken van databank', '2025-12-18', 'Niet gestart');
