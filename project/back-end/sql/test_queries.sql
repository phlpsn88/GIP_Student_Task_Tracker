-- SELECT
SELECT users.username, tasks.title, tasks.status
FROM users
JOIN tasks ON users.id = tasks.user_id;

-- UPDATE
UPDATE tasks
SET title = 'nieuwe title'
WHERE id = 1;

UPDATE tasks
SET description = 'beschrijving van taak'
WHERE id = 1;

UPDATE tasks
SET due_date = '2026-01-24'
WHERE id = 1;

UPDATE tasks
SET status = 'done'
WHERE id = 1;

--login
SELECT id, username
FROM users
WHERE email = 'jan@email.com'
AND password = 'hashedpassword1';

--aanmelding
INSERT INTO users (username, password, email)
VALUES ('nieuwenaam', 'gehasht_wachtwoord', 'nieuw@email.com');

-- DELETE
DELETE FROM tasks
WHERE id = 3;
