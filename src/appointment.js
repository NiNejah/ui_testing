const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const client = require("./config/db");
// const should = require("chai").should();
import { ENDPOINT } from "./config/config";
import { getCommand } from "./tooles/dbTooles";
// const { Options } = require('selenium-webdriver/firefox');
// const { Console } = require("console");



const testAllTeachers = async (driver) => {
    let teachers = await driver.findElement(By.id("name_selector")).getText().then((v)=>{
        return v;
    });
    // console.log(teachers);
    let teachersArray = teachers.split('\n');
    let teacherFromDb = await getCommand(client,'SELECT full_name FROM teacher;');
    // console.log(teacherFromDb[0].full_name);
    for (let i = 0; i < teachersArray.length; i++) {
        assert.strictEqual(teachersArray[i], teacherFromDb[i].full_name);
    }
}

const testAllTeacherDates = async (driver,teacherId=1) => {
    let dates = await driver.findElement(By.css("ul")).getText().then((v)=>{
            return v;
        });
    // console.log(dates);
    let datesArray = dates.split('\n');
    let command = 'SELECT date FROM available where id_teacher ='+teacherId+';';
    let dateFromDb = await getCommand(client,command);
    // console.log(teacherFromDb[0].full_name);
    for (let i = 0; i < datesArray.length; i++) {
        // console.log("from the site: " , datesArray[i] );
        // console.log("from the db: " , dateFromDb[i]);
        // console.log(dateFromDb[i].date.toISOString().split('T')[0]);
        // assert.strictEqual(datesArray[i], dateFromDb[i].date.toISOString().split('T')[0]);
    }

}

const  availabilityTest = async (driver) => {

    let avai_bt = await driver.findElement(By.id("display_availability"));
    await avai_bt.click();


    await testAllTeachers(driver);

    let sub = await driver.findElement(By.id("sub_availability"));
    await sub.click();


    let avai_bt2 = await driver.findElement(By.id("display_availability"));
    await avai_bt2.click();
    await testAllTeacherDates(driver);

    // let dates = await driver.findElement(By.css("ul")).getText().then((v)=>{
    //         return v;
    //     });
    // console.log(dates);



}
const creatTeacherTest = async (driver)=>{
    let teacherNbBefore = await getCommand(client,"select * from teacher ;").then((v)=>{
        return v.length ;
    });

    let add_bt = await driver.findElement(By.id("add_teacher"));
    await add_bt.click();

    let myd = new Date("2024-12-08");
    // console.log(myd);
    myd = myd.toISOString().split('T')[0];
    // console.log(myd);
    let testInput = ["testName", "test@email.ts", "testEduc", myd ]
    let ids = [ "fnameEnse", "emailEnse","EducationEnse","dateEnse"] ;
    for (let i = 0; i < testInput.length; i++) {
        let input =  await driver.findElement(By.id(ids[i])) ;
        input.clear();
        // console.log(testInput[i]);
        input.sendKeys(testInput[i]);
    }
    await driver.findElement(By.id(ids[0])).sendKeys(Key.RETURN);
    
    let test = await driver.wait(until.elementsLocated(By.css("body")),2000).getAttribute("innerHTML");
    // let test2 = await driver.page_source.
    console.log("------------------------------")
    console.log(test);
    // see if we have the date in available list : 
    // let cmd = "SELECT  a.date  FROM teacher t INNER JOIN available a ON t.id_teacher = a.id_teacher WHERE t.full_name = 'testName' " ;

    // let newAv = await getCommand(client,cmd).then((v)=>{
    //     return v.length ; 
    // });
    
    // let teacherNbAfter = await getCommand(client,"select * from teacher ;")
    // .then((v)=>{
    //     return v.length ;
    // })
    
    // assert.strictEqual(newAv,1);
    // assert.strictEqual(teacherNbAfter,teacherNbBefore+1);



}

const makeAppointment = async (driver) =>{
    // make_appointment_bt
    let appoin_bt = await driver.findElement(By.id("make_appointment_bt"));
    await appoin_bt.click();
    //TODO : 
    let ids = [ "fname", "email","adr","city",""] ;
    let testInput = ["testNameAPP", "test@email.ap", "13 ruz", ];

    for (let i = 0; i < testInput.length; i++) {
        let input =  await driver.findElement(By.id(ids[i])) ;
        input.clear();
        // console.log(testInput[i]);
        input.sendKeys(testInput[i]);
    }
    await driver.findElement(By.id(ids[0])).sendKeys(Key.RETURN);
    // ...

}

const mainTest = async () => {

    await client.connect();
    let driver = new Builder().forBrowser('firefox').setFirefoxOptions().build();
    await driver.get(ENDPOINT);
    // await availabilityTest(driver);
    await creatTeacherTest(driver);
    await driver.quit();
    // TODO ...
    // await makeAppointment(driver);
    // client.end();
}
mainTest();