const { clickOn , sendKeysById, getTextById } = driverTooles ;
const test = require("./abstract");


const testAllTeachers = async (driver,dbClient , compare ) => {
    const res = await test(driver,async ()=>{await clickOn(driver,"display_availability");},"name_selector",dbClient,'SELECT full_name FROM teacher;', compare.compare);
    // console.log("res :" , res );
}

const testDatesDisplay = async (driver,dbClient ,compare ,teacherId=1)=> { 
    const res = await test(driver,async ()=>{await clickOn(driver,"display_availability");},"print_dates",dbClient,'SELECT date FROM available where id_teacher ='+teacherId+';',compare.compare);
    // console.log("res :" , res );
}


const availabilityTests = async (driver,dbClient ,compare )=>{
    await testAllTeachers(driver,dbClient,compare);
    await testDatesDisplay(driver,dbClient,compare,1);
}

module.exports = availabilityTests ; 