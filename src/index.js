const fs = require('fs');
const client = require("./config/db");
// const should = require("chai").should();
const ENDPOINT = require ("./config/config");

const tools = require("./tools/tools");




const main =  async ()=>{
    console.log ("tests start ...");
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