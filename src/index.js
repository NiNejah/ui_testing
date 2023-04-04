const express = require('express');
const multer = require('multer');
const app = express();
const port = 8080;

const fs = require('fs');
const client = require("./config/db");
// const should = require("chai").should();
const ENDPOINT = require ("./config/config");
const Command = require("./command/Command");
const tools = require("./tools/textTools");
const driver = require('./config/driver');

const upload = multer({ dest: 'uploads/' });

let cmds = [] ; 
let allRes = [];
let filePath =''


app.post('/runTest', upload.single('myFile'), async (req, res) => {
    // console.log(res); // contains information about the uploaded file
    const file = req.file;
    filePath = file.path ; 
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // res.send("file loaded !");
    await runTest(filePath);
    res.render('runTests',{cmds, allRes});
    // // // Pipe the read stream to the response stream to send the file to the client
    // readStream.pipe(res);

    // // // Delete the uploaded file from the server after it has been sent to the client
    // fs.unlink(filePath, (err) => {
    //     if (err) {
    //     console.error(err);
    //     }
    // });
});

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


// app.get('/runTests', async (req, res) => {
//     await runTest(filePath);
//     res.render('runTests',{cmds, allRes});
// });

// app.post('/upload', upload.single('myFile'), (req, res) => {
//     console.log(req.file); // contains information about the uploaded file
//     res.send('File uploaded successfully!');
//   });

const runTest = async (filePath) => {
    try {
        await client.connect();
    }catch(er){

    }finally {
        const fileContent = fs.readFileSync(filePath, 'utf8');
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
        await client.end();
        await driver.close();
        console.log ("tests end ...");
    }
}
