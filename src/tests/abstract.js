const getRowsFromDb = require("../tools/dbTools");
const { getTextById } = require("../tools/driverTools");


const compareElementWithSqlRequete= async (driver, beforeAction, elmId, dbClient ,sqlRequete, sqlRow , compareFunction ) => {
    await beforeAction();
    let body = await getTextById(driver,elmId);
    let resp = await getRowsFromDb(dbClient,sqlRequete);
    return compareFunction(body,'\n',resp,sqlRow);
}

/**
 * 
 * @param {*} driver 
 * @param {*} beforeAction 
 * @param {*} inputIdsValues dictionary array with two keys (inputId , inputText) 
 */
const testFillForm = async (driver, beforeAction, inputIdsValues) => {
    await beforeAction();
    for (let i = 0; i < testInput.length; i++) {
        sendKeysById(driver, inputIdsValues[i].inputId, inputIdsValues[i].inputText);
    }
}

const testFillFormAndSubmit= async (driver, beforeAction, inputIdsValues,submitId,dbClient,sqlRequete,compareFunction) => {
    await testFillForm(driver,beforeAction,inputIdsValues);
    await clickOn(driver,submitId);
    sleep(1000);
    let resp = await getRowsFromDb(dbClient,sqlRequete);
    return compareFunction(inputIdsValues,resp);

}

const testSelector = async ( driver , beforeAction , elmId , dbClient ,sqlRequete,sqlRow,compareFunction ) => {
    await beforeAction();
    let body = await getTextById(driver,elmId);
    let resp = await getRowsFromDb(dbClient,sqlRequete);
    return compareFunction(body,'\n',resp,sqlRow);
}

module.exports = {compareElementWithSqlRequete,testSelector} ;