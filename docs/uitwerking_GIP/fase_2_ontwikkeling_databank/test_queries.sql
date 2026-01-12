-- SELECT
SELECT users.username, tasks.title, tasks.status
FROM users
JOIN tasks ON users.id = tasks.user_id;

-- UPDATE
UPDATE tasks
SET status = 'done'
WHERE id = 1;

--login



-- DELETE
DELETE FROM tasks
WHERE id = 3;
