CREATE DATABASE click;
BEGIN;

CREATE TABLE tasks (
    id  BIGSERIAL PRIMARY KEY,
    task  TEXT,
    created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE sessions (
    id  BIGSERIAL PRIMARY KEY,
    task_id INT,
    task  TEXT,
    start_time TIMESTAMP DEFAULT current_timestamp,
    run_time INT,
    tempo INT
);

COMMIT;
