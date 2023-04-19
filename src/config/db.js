// Importing the PostgreSQL client library
const { Client } = require('pg');

// Creating a new PostgreSQL client instance
const client = new Client({
    host: "localhost", // Hostname of the PostgreSQL server
    port: 5432, // Port number on which the PostgreSQL server is listening
    user: "postgres", // Username to authenticate with the PostgreSQL server
    password: "1111", // Password to authenticate with the PostgreSQL server
    database: "ui_test" // Name of the PostgreSQL database to connect to
});

// Exporting the client instance so that it can be used in other modules
module.exports = client;