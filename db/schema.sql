\c asoiaf_categories;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  counter INTEGER
);

DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  name VARCHAR(255),
  categories TEXT
);