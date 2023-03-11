const getCommand = require("../tooles/dbTooles");
const { getTextById } = require("../tooles/driverTooles");


const test = async (driver, beforeAction, elmId, dbClient ,sqlRequete, compareFunction ) => {
    await beforeAction();
    let body = await getTextById(driver,elmId);
    let resp = await getCommand(dbClient,sqlRequete);
    return compareFunction(body,resp,'\n');
}

module.exports = test ;