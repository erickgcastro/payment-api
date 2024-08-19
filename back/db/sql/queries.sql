-- name: GetAllUsers :many
SELECT * FROM users;

-- name: GetUserByName :one
SELECT * from users WHERE name = $1;

-- name: GetUserById :one
SELECT * from users WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * from users WHERE email = $1;

-- name: CreateUser :exec
INSERT INTO users (id, email, name, password) VALUES ($1, $2, $3, $4);

-- name: GetTransactionsByUserId :many
SELECT 
	transactions.id,
  amount,
  created_at,
  updated_at,
	sender.id AS sender_id,
	sender.name AS sender_name,
	sender.email AS sender_email,
	recipient.id AS recipient_id,
  recipient.name AS recipient_name,
  recipient.email AS recipient_email 
FROM transactions 
JOIN users sender ON sender_id = sender.id 
JOIN  users recipient ON recipient_id = recipient.id
WHERE sender_id = $1 OR recipient_id = $1 ORDER BY created_at DESC;

-- name: CreateTransaction :exec
INSERT INTO transactions (
  id, 
  sender_id, 
  recipient_id,
  amount
) VALUES ($1, $2, $3, $4);


