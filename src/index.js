const express = require('express');
const multer = require('multer');
const app = express();
const port = 8081;

const fs = require('fs');

const upload = multer({ dest: 'uploads/' });


const client = require("./config/db");
// const should = require("chai").should();
const ENDPOINT = require ("./config/config");
const Command = require("./command/Command");
const tools = require("./tools/textTools");
const { node } = require('html-compare/lib/util/cheerio-utils');


let clientConnected = false ; 

app.post('/runTest', upload.single('myFile'), async (req, res) => {
    let cmds = [] ; 
    let allRes = [];
    // console.log(res); // contains information about the uploaded file
    const file = req.file;
    let filePath = '' ; 
    let errMess = `<div style='margin-top: 40vh;margin-left: 35vw;'> `; 
    // res.send("file loaded !");
    try {
        try{
            filePath = file.path ; 
        }catch (err){
            errMess = errMess + 
            `<h2> 
                ${err}
            </h2>`;
        }
        await runTest(filePath,cmds,allRes);
        res.render('runTests',{cmds, allRes});
    }catch (err){
        errMess = errMess + `
        <h2> 
            ${err}
        </h2>`;
    }finally {
        if(file != null){
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        if(errMess !== ''){
            errMess = errMess + `</div>`
            res.send(errMess);
        }
    }
});

// set EJS as templating engine
app.set('view engine', 'ejs');

// give access to 'public' folder from '/static' url's pathname
app.use('/static', express.static('../public'));

app.listen(port, () => {
    console.log(`Le serveur écoute sur http://localhost:${port}`)
})

// route to display the home page
app.get('/', (req, res) => {
    res.redirect('/static/index.html');
});

app.get('/documentation', (req, res) => {
    res.redirect('/static/documentation.html');
});


const runTest = async (filePath,cmds,allRes) => {

    if (!clientConnected){
        await client.connect();
        clientConnected = true ; 
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let commandBlocks = tools.parseText(fileContent);
    for (const cmdBlock of commandBlocks){
        try {
            let cmdObj = Command.create(cmdBlock) ; 
            if(cmdObj !== null){
                await cmds.push(cmdObj); 
            }
        }catch (err){
            throw new Error(err);
        }
    }   
    for (let e of cmds){
        let res = await e.execute(); 
        allRes.push(res);
        // console.log(res.testDescription);
        if (!res.isPass){
            break ;
        }
    }
    // await driver.close();
    console.log ("tests end ...");
}

