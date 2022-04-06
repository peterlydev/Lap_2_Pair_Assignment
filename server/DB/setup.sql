DROP TABLE IF EXISTS posts; 

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL, 
    author VARCHAR NOT NULL, 
    body VARCHAR NOT NULL
);

INSERT INTO posts (title, author, body)
VALUES 
('Hello World', 'Jax', 'This is a first test message'),
('Hello World', 'Sami', 'This is a Second test message'),
('Hello World', 'Peter', 'This is a Third test message'),
('Hello World', 'Nowshad', 'This is a fourth test message');