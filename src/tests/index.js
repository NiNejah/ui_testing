const { Builder, By, Key, until } = require("selenium-webdriver");
const client = require("../config/db");
// const should = require("chai").should();
const ENDPOINT = require ("../config/config");
const availabilityTests  = require("./availability");
const Compare = require("../tools/compare")
const {test,testSelector} = require("./abstract");
const driverTools = require("../tools/driverTools");
const { clickOn , sendKeysById, getTextById, openNavigator, closeNavigator} = driverTools ;


const main =  async ()=>{
    console.log ("tests start ...");
    await client.connect();
    await openNavigator();
    const compare = new Compare();
    let res =  await testSelector (async ()=>{await clickOn("display_availability");},"name_selector",'SELECT full_name FROM teacher;','full_name', compare.compare);
    console.log(res);
    await closeNavigator();
}

main() ; 