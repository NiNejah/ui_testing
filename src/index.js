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
    let res = tools.parseText(fileContent);
    let comds = [] ; 
    for (const c of res){
        // console.log(c);
        await comds.push(Command.create(c)); 
    }
    // console.log(tools.concatenateLastElements(res[(res.length-1)],3));
    for (let e of comds){
        await e.execute()    
    }
    // await driver.close();
}

main() ; 