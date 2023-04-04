const express = require('express');
const app = express();
const port = 8080;

const fs = require('fs');
const client = require("./config/db");
// const should = require("chai").should();
const ENDPOINT = require ("./config/config");
const Command = require("./command/Command");
const tools = require("./tools/textTools");
const driver = require('./config/driver');

// set EJS as templating engine
app.set('view engine', 'ejs');


// give access to 'public' folder from '/static' url's pathname
app.use('/static', express.static('../public'));

app.listen(port, () => {
    console.log(`Le serveur écoute sur http://localhost:8080`)
})

// route to display the home page
app.get('/', (req, res) => {
    res.redirect('/static/index.html');
});

let cmds = [] ; 
let allRes = [];


app.get('/runTests', async (req, res) => {
    await runTest();
    res.render('runTests',{cmds, allRes});
});


 const runTest = async () => {

    // readCommandsFile(driver,'com1.txt');
    client.connect();
    // await driver.get(ENDPOINT);
    const fileContent = fs.readFileSync('./tests/com1.txt', 'utf8');
    let commandBlocks = tools.parseText(fileContent);
    
 
    for (const cmdBlock of commandBlocks){
        let cmdObj = Command.create(cmdBlock) ; 
        if(cmdObj !== null){
            await cmds.push(cmdObj); 
        }
    }
    // this loop will execute all test command 
    // that's well display the comand with it's toString and : PASS if the test pass or : NOT PASS     
    for (let e of cmds){
        let res = await e.execute(); 
        allRes.push(res);
        console.log(res.testDescription);
        // maketestDescription(e.toString,res.isPass);
        if (!res.isPass){
            break ;
        }
    }
    client.end();
    driver.close();
    console.log ("tests end ...");
}
