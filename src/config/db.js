const { Client } = require('pg');

const client = new Client ({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"1111",
    database:"postgres"
});

module.exports = client ; 