const fs = require('fs');
const client = require("./config/db");
// const should = require("chai").should();
const ENDPOINT = require ("./config/config");
const Command = require("./command/Command");
const tools = require("./tools/textTools");



const main =  async ()=>{
    console.log ("tests start ...");
    // readCommandsFile(driver,'com1.txt');
    client.connect();
    // await driver.get(ENDPOINT);
    const fileContent = fs.readFileSync('./tests/com2.txt', 'utf8');
    let commandBlocks = tools.parseText(fileContent);
    
    let comds = [] ; 
    for (const cmdBlock of commandBlocks){
        let cmdObj = Command.create(cmdBlock) ; 
        if(cmdObj !== null){
            await comds.push(cmdObj); 
        }
    }
    // this loop will execute all test command 
    // that's well display the comand with it's toString and : PASS if the test pass or : NOT PASS     
    for (let e of comds){
        await e.execute()    
    }
    console.log ("tests end ...");
}

main() ; 