const driverTools = require("../tools/driverTools");
const { clickOn , sendKeysById, getTextById, openNavigator, closeNavigator } = driverTools ;
const test = require("./abstract");


const testAllTeachers = async (compare ) => {
    const res = await test(async ()=>{await clickOn("display_availability");},"name_selector",'SELECT full_name FROM teacher;', compare.compare);
    // console.log("res :" , res );
    
}

const testDatesDisplay = async (compare ,teacherId=1)=> { 
    const res = await test(async ()=>{await clickOn("display_availability");},"print_dates",'SELECT date FROM available where id_teacher ='+teacherId+';',compare.compare);
    // console.log("res :" , res );
}


const availabilityTests = async (compare )=>{
    await testAllTeachers(compare);
    await testDatesDisplay(compare,1);
}

module.exports = availabilityTests ; 