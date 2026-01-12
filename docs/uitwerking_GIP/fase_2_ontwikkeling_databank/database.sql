-- Database aanmaken
CREATE DATABASE taskmanager;
USE taskmanager;

-- Tabel: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Tabel: tasks
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, 
    title VARCHAR(100) NOT NULL,
    description TEXT,
    due_date DATE,
    status VARCHAR(20) DEFAULT 'open',
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- Testdata invoeren
INSERT INTO users (username, password, email)
VALUES
('jan', 'hashedpassword1', 'jan@email.com'),
('piet', 'hashedpassword2', 'piet@email.com'),
('anna', 'hash1', 'anna@mail.com'),
('tom', 'hash2', 'tom@mail.com'),
('lisa', 'hash3', 'lisa@mail.com');


INSERT INTO tasks (user_id, title, description, due_date, status)
VALUES
(1, 'Databank maken', 'MySQL databank ontwerpen', '2025-12-15', 'open'),
(1, 'SQL oefenen', 'SELECT en INSERT oefenen', '2025-12-20', 'in progress'),
(2, 'Documentatie schrijven', 'Uitleg maken van databank', '2025-12-18', 'open');

-- Voorbeeld queries

