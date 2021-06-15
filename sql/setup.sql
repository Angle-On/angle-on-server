DROP TABLE IF EXISTS films CASCADE;
DROP TABLE IF EXISTS investors CASCADE;
DROP TABLE IF EXISTS directors CASCADE;
DROP TABLE IF EXISTS donations CASCADE;

CREATE TABLE directors (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
username TEXT,
director_img TEXT, 
email TEXT NOT NULL
);

CREATE TABLE films (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
director_id BIGINT REFERENCES directors(id),
film_name TEXT NOT NULL,
film_image TEXT NOT NULL,
film_description TEXT NOT NULL,
film_budget TEXT NOT NULL,
film_url TEXT,
film_genre JSON NOT NULL
);

CREATE TABLE investors (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
username TEXT,
investor_img TEXT, 
email TEXT NOT NULL
);

CREATE TABLE donations (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
investor_id BIGINT REFERENCES investors(id),
film_id BIGINT REFERENCES films(id),
donation_amount BIGINT NOT NULL
);
