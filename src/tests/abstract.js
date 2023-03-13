const getCommand = require("../tooles/dbTooles");
const { getTextById, fieldIsCompleted, sendKeysById,Dateiscorrect,fieldIsEmpty } = require("../tooles/driverTooles");


const test = async (driver, beforeAction, elmId, dbClient ,sqlRequete, compareFunction ) => {
    await beforeAction();
    let body = await getTextById(driver,elmId);
    let resp = await getCommand(dbClient,sqlRequete);
    return compareFunction(body,resp,'\n');
}

// en parametre la liste des id a verifier si ils sont remplis
const testFormIscompleted= async(driver, beforeAction, ListIdForm) => {
    await beforeAction();
    let val = true;
    await ListIdForm.forEach(item => {
        console.log(item);
        if(fieldIsCompleted(driver, item) == false){
            val = false;
        }
    })

    // for(var id in ListIdForm){
    //      console.log(id)
    //      if(fieldIsCompleted(driver, id) == false){
    //          return false;
    //      }
    // }
    return val;
}


const TestDatevalide = async (driver,beforeAction,elmId)  => {
 
    await beforeAction();
    let val= true;
    await sendKeysById(driver, "dateEnse","12/12/2024");
    if(  Dateiscorrect(driver,elmId)==true){
        return val;
    }
    else{
        val=false;
    }
     return val;
}

module.exports = {test, testFormIscompleted ,TestDatevalide } ;