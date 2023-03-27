const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require('fs');
const client = require("./config/db");
// const should = require("chai").should();
const ENDPOINT = require ("./config/config");
const availabilityTests  = require("./tests/availability");
const Compare = require("./tools/compare")
const {compareElementWithSqlRequete,testSelector} = require("./tests/abstract");
const driverTools = require("./tools/driverTools");
const tools = require("./tools/tools");
const { clickOn , sendKeysById, getTextById } = driverTools ;




const executeCommand = async (driver, command) => {
    // Vérifier si la commande correspond au format attendu
    const regex = /^@(\w+)\s(.+);$/;
    const match = command.match(regex);
    let res = '' ; 
    if (match) {
        const annotation = match[1];
        const params = match[2].split(' ');
        switch (annotation){
            case 'open':
                checkNbParam(params.length , 0 , "open");
                await driver.get(ENDPOINT);
                break ;
            case 'click':
                checkNbParam(params.length , 1 , "click");
                await clickOn(driver,params);
                break ;
            case 'write':
                checkNbParam(params.length , 2 , "write");
                await sendKeysById(driver,...params);
                break ;
            case 'read':
                // one for the moment 
                checkNbParam(params.length , 1, "read");
                res = await getTextById(driver,params);
                console.log("get text by id (read) : ");
                console.log(res);
                break ;
            case 'compareText':
                const compare = new Compare();
                checkNbParam(params.length , 3, "compareText");
                res =  await compareElementWithSqlRequete (driver , async ()=>{}, params[0],client, params[1], params[2],  compare.compare )
                console.log ("compareText res : ", res);
                break ; 
            default : 
                console.error(`there is no annotation called  ${annotation}, see howToUse.md for more information `);
        }
    }
    else {
        console.log(`Malformed command: ${command}`);
    }
} 

const main =  async ()=>{
    console.log ("tests start ...");
    // await client.connect();

    // await client.connect();
    // const driver = new Builder().forBrowser('firefox').build();
    // readCommandsFile(driver,'com1.txt');

    // await driver.get(ENDPOINT);
    const fileContent = fs.readFileSync('./tests/com1.txt', 'utf8');
    let res = tools.parseText(fileContent);

    // let comds = [] ; 
    for (const c of res){
        console.log(c);
        // comds.push(Command.create(c)); 
    }
    console.log(tools.concatenateLastElements(res[(res.length-1)],3));

    // comds.forEach(e=>{e.execute()});
    // await driver.close();
}

main() ; 