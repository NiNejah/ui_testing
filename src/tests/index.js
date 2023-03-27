const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require('fs');
const client = require("../config/db");
// const should = require("chai").should();
const ENDPOINT = require ("../config/config");
const availabilityTests  = require("./availability");
const Compare = require("../tools/compare")
const {test,testSelector,compareElementWithSqlRequete} = require("./abstract");
const driverTools = require("../tools/driverTools");
const { clickOn , sendKeysById, getTextById, openNavigator, closeNavigator} = driverTools ;
const { exit } = require("process");
const driver = require ("../config/driver");



const checkNbParam = (paramsLength , expexted , annotation )=>{
    if(paramsLength != expexted ){
        console.error(`${annotation} annotation take ${expexted} param/s see howToUse.md for more information`);
        exit(1);
    }
}
const readCommandsFile = (fileName) => {
    const fileContent = fs.readFileSync(fileName, 'utf8');
    const lines = fileContent.split('\n');
    let currentCommand = '';
    for (const line of lines) {
        // Vérifier si la ligne correspond au début d'une commande
        if (line.startsWith('@')) {
          // Si une commande est déjà en cours, l'exécuter avant de continuer
          if (currentCommand !== '') {
            executeCommand(currentCommand);
          }
          // Commencer une nouvelle commande
          currentCommand = line.trim();
        } else if (line.endsWith(';')) {
          // Ajouter la ligne à la commande en cours
          currentCommand += ' ' + line.trim();
          // Exécuter la commande
          executeCommand(currentCommand);
          // Réinitialiser la commande en cours
          currentCommand = '';
        } else {
          // Ajouter la ligne à la commande en cours
          currentCommand += ' ' + line.trim();
        }
      }
}

const executeCommand = async (command) => {
    // Vérifier si la commande correspond au format attendu
    const regex = /^@(\w+)\s(.+);$/;
    const match = command.match(regex);
    let res = '' ; 
    if (match) {
        const annotation = match[1];
        console.log(annotation);
        const params = match[2].split(' ');
        //const jsFunctionName = functions[annotation];
        switch (annotation){
            case 'open':
                //checkNbParam(params.length , 1 , "open");
                await driver.get(...params);
                break ;
            case 'click':
                //checkNbParam(params.length , 1 , "click");
                await clickOn(...params);
                break ;
            case 'write':
                //checkNbParam(params.length , 2 , "write");
                await sendKeysById(...params);
                break ;
            case 'read':
                // one for the moment 
                //checkNbParam(params.length , 1, "read");
                res = await getTextById(...params);
                console.log("get text by id (read) : ");
                console.log(res);
                break ;
            case 'compareText':
                const compare = new Compare();
                //checkNbParam(params.length , 3, "compareText");
                res =  await compareElementWithSqlRequete (async ()=>{}, params[0],client, params[1], params[2],  compare.compare )
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

    await client.connect();
    openNavigator();
    readCommandsFile('com1.txt');

    // await driver.get(ENDPOINT);
    // const compare = new Compare();

    // let res =  await testSelector (async ()=>{await clickOn("display_availability");},"name_selector",client,'SELECT full_name FROM teacher;','full_name', compare.compare);
    // console.log(res);
    // await availabilityTests(client,compare);
    // TODO add make appointment test here ...

    // TODO add teacher list here ...

    closeNavigator();
}

main() ; 