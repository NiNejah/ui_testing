const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const client = require("../config/db");
// const should = require("chai").should();
const sleep = require("../tooles/tooles");
const ENDPOINT = require ("../config/config");
const getCommand = require ("../tooles/dbTooles");
const driverTooles = require ("../tooles/driverTooles");
const test = require("./abstract");
const { clickOn , sendKeysById, getTextById } = driverTooles ;
const Compare = require("../tooles/compare");


let main =  async ()=>{
    console.log ("bonjour...");
    await client.connect();
    let driver = new Builder().forBrowser('firefox').build();
    await driver.get(ENDPOINT);
    let compare = new Compare();
    let t = await test(driver,async ()=>{await clickOn(driver,"display_availability");},"name_selector",client,'SELECT full_name FROM teacher;', compare.compare);
    console.log("res :" , t );
    await driver.close();
}

main() ; 