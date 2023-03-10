const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const client = require("./config/db");
// const should = require("chai").should();
const sleep = require("./tooles/tooles");
const ENDPOINT = require ("./config/config");
const getCommand = require ("./tooles/dbTooles");
const driverTooles = require ("./tooles/driverTooles");
const { clickOn , sendKeysById, getTextById } = driverTooles ;


const testAllTeachers = async (driver) => {
    let teachers = await getTextById(driver ,"name_selector");
    // await driver.findElement(By.id("name_selector")).getText().then((v)=>{
    //     return v;
    // });
    console.log(teachers);
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

const availabilityTest = async (driver) => {

    await clickOn(driver,"display_availability");

    await testAllTeachers(driver);

    await clickOn(driver,"sub_availability");
    await clickOn(driver,"display_availability");

    // await testAllTeacherDates(driver);

    // let dates = await driver.findElement(By.css("ul")).getText().then((v)=>{
    //         return v;
    //     });
    // console.log(dates);
}

const creatTeacherTest = async (driver)=>{
    let teacherNbBefore = await getCommand(client,"select * from teacher ;").then((v)=>{
        return v.length ;
    });

    await clickOn(driver,"add_teacher");

    // let add_bt = await driver.findElement(By.id("add_teacher"));
    // await add_bt.click();

    let myd = new Date("2024-12-08");
    // console.log(myd);
    myd = myd.toISOString().split('T')[0];
    // console.log(myd);
    let testInput = ["testName", "test@email.ts", "testEduc", myd ]; 
    let ids = [ "fnameEnse", "emailEnse","EducationEnse","dateEnse"];
    for (let i = 0; i < testInput.length; i++) {
        sendKeysById(driver, ids[i], testInput[i]);
    }
    sendKeysById(driver, ids[0], Key.RETURN);
    // await driver.findElement(By.id(ids[0])).sendKeys(Key.RETURN);
  

    // see if we have the date in available list : 
    let cmd = "SELECT  a.date  FROM teacher t INNER JOIN available a ON t.id_teacher = a.id_teacher WHERE t.full_name = 'testName' " ;

    let newAv = await getCommand(client,cmd).then((v)=>{
        return v.length ; 
    });
    await sleep(200);

    let body = await driver.findElement(By.css("body")).getText().then ((v)=>{
        return v ; 
    })

    console.log(body);
    
    let teacherNbAfter = await getCommand(client,"select * from teacher ;")
    .then((v)=>{
        return v.length ;
    });
    
    // assert.strictEqual(newAv,1);
    assert.strictEqual(teacherNbAfter,teacherNbBefore+1);
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
    let driver = new Builder().forBrowser('firefox').build();
    await driver.get(ENDPOINT);
    // await availabilityTest(driver);
    await creatTeacherTest(driver);
    await driver.quit();
    // TODO ...
    // await makeAppointment(driver);
    client.end();
}
mainTest();