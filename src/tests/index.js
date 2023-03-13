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
    //let compare = new Compare();
    //let t = await test(driver,async ()=>{await clickOn(driver,"display_availability");},"name_selector",client,'SELECT full_name FROM teacher;', compare.compare);
    
   // const listId = ["fnameEnse", "emailEnse", "EducationEnse", "dateEnse"];
   // let t2 = await test.testFormIscompleted(driver, async ()=>{await clickOn(driver, "add_teacher");}, listId);
    // console.log("res :" , t2 );

    //verification date teacher 
   // await clickOn(driver, "add_teacher");
  
    let t3 = await test.TestDatevalide (driver, async ()=>{await clickOn(driver, "add_teacher");}, "dateEnse");
    console.log("res :" , t3);

    //await clickOn(driver, "add_teacher");
   // await sendKeysById(driver, "fnameEnse","12/12/12");
    // let testnayar = await driverTooles.fieldIsCompleted(driver, "fnameEnse");
    // console.log("resnayar :" , testnayar );
    
    
    //console.log("res :" , t );
    //await driver.close();
}

main() ; 