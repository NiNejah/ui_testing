const { Builder, By, Key, until } = require("selenium-webdriver");
const client = require("../config/db");
// const should = require("chai").should();
const ENDPOINT = require ("../config/config");
const availabilityTests = require("./availability");



let main =  async ()=>{
    console.log ("tests start ...");
    await client.connect();
    const driver = new Builder().forBrowser('firefox').build();
    await driver.get(ENDPOINT);
    const compare = new Compare();
    
    await availabilityTests(driver,client,compare);
    // TODO add make appointment test here ...

    // TODO add teacher list here ...

    await driver.close();
}

main() ; 