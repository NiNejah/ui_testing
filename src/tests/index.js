const { Builder, By, Key, until } = require("selenium-webdriver");
const client = require("../config/db");
// const should = require("chai").should();
const ENDPOINT = require ("../config/config");
const availabilityTests  = require("./availability");
const Compare = require("../tools/compare")
const {test,testSelector} = require("./abstract");
const driverTools = require("../tools/driverTools");
const { clickOn , sendKeysById, getTextById } = driverTools ;


const main =  async ()=>{
    console.log ("tests start ...");
    await client.connect();
    const driver = new Builder().forBrowser('firefox').build();
    await driver.get(ENDPOINT);
    const compare = new Compare();

    let res =  await testSelector (driver,async ()=>{await clickOn(driver,"display_availability");},"name_selector",client,'SELECT full_name FROM teacher;','full_name', compare.compare);
    console.log(res);
    // await availabilityTests(driver,client,compare);
    // TODO add make appointment test here ...

    // TODO add teacher list here ...

    await driver.close();
}

main() ; 