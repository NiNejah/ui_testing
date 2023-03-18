const { Client } = require('pg');

const client = new Client ({
    host:"localhost",
    port:5432,
    user:"user1",
    password:"mdp2023",
    database:"postgres"
});

module.exports = client ; 
