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
    const fileContent = fs.readFileSync('./tests/com1.txt', 'utf8');
    let commandBlocks = tools.parseText(fileContent);
    
    let comds = [] ; 
    for (const cmdBlock of commandBlocks){
        let cmdObj = Command.create(cmdBlock) ; 
        if(cmdObj !== null){
            await comds.push(cmdObj); 
        }
    }
    // // console.log(tools.concatenateLastElements(commandBlocks[(commandBlocks.length-1)],3));
    for (let e of comds){
        await e.execute()    
    }
    console.log ("tests end ...");
}

main() ; 