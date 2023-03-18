const driverTools = require("../tools/driverTools");
const { clickOn , sendKeysById, getTextById, openNavigator, closeNavigator } = driverTools ;
const test = require("./abstract");


const testAllTeachers = async (dbClient , compare ) => {
    const res = await test(async ()=>{await clickOn("display_availability");},"name_selector",dbClient,'SELECT full_name FROM teacher;', compare.compare);
    // console.log("res :" , res );
    
}

const testDatesDisplay = async (dbClient ,compare ,teacherId=1)=> { 
    const res = await test(async ()=>{await clickOn("display_availability");},"print_dates",dbClient,'SELECT date FROM available where id_teacher ='+teacherId+';',compare.compare);
    // console.log("res :" , res );
}


const availabilityTests = async (dbClient ,compare )=>{
    await testAllTeachers(dbClient,compare);
    await testDatesDisplay(dbClient,compare,1);
}

module.exports = availabilityTests ; 