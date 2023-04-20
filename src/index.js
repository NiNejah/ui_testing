const express = require('express');
const multer = require('multer');
const app = express();
// change it as you wich 
const port = 8081;

const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

const client = require("./config/db");
const Command = require("./command/Command");
const tools = require("./tools/textTools");

let clientConnected = false;

// Route to handle file upload and run tests
app.post('/runTest', upload.single('myFile'), async (req, res) => {
    let allRes = [];
    const file = req.file;
    let filePath = '';
    let errMess = `<div style='margin-top: 40vh;margin-left: 35vw;'> `; 
    let hasErr = false;
    try {
        try {
            filePath = file.path;
        } catch (err) {
            errMess = errMess + 
            `<h2> 
                ${err}
            </h2>`;
            hasErr = true;
        }
        await runTest(filePath, allRes);
        res.render('runTests', {allRes });
    } catch (err) {
        errMess = errMess + `
        <h2> 
        ${err}
        </h2>`;
        hasErr = true;
    } finally {
        if (file != null) {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        if (hasErr) {
            errMess = errMess + `</div>`
            res.send(errMess);
        }
    }
});

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Give access to 'public' folder from '/static' url's pathname
app.use('/static', express.static('../public'));

// Start listening on the specified port
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})

// Route to display the home page
app.get('/', (req, res) => {
    res.redirect('/static/index.html');
});

// Route to display the documentation page
app.get('/documentation', (req, res) => {
    res.redirect('/static/documentation.html');
});

// Function to run the tests
const runTest = async (filePath, allRes) => {
    if (!clientConnected) {
        await client.connect();
        clientConnected = true;
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let commandBlocks = tools.parseText(fileContent);
    for (const cmdBlock of commandBlocks) {
        try {
            Command.create(cmdBlock);
        } catch (err) {
            throw new Error(err);
        }
    }
    await Command.execute(allRes); 
}