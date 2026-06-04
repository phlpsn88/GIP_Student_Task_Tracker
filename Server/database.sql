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
    user_id INT, 
    title VARCHAR(100) NOT NULL,
    beschrijving TEXT,
    datum DATE,
    status VARCHAR(20) DEFAULT 'Niet gestart',
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
);

-- Testdata invoeren
INSERT INTO users (naam, wachtwoord, email, rol)
VALUES
('Admin', 'PLACEHOLDER', 'admin@taskmanager.be', 'admin')
