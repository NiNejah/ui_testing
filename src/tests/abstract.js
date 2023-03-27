const getRowsFromDb = require("../tools/dbTools");
const { getTextById } = require("../tools/driverTools");


const compareElementWithSqlRequete= async (beforeAction, elmId, dbClient ,sqlRequete, sqlRow , compareFunction ) => {
    await beforeAction();
    let body = await getTextById(elmId);
    let resp = await getRowsFromDb(dbClient,sqlRequete);
    return compareFunction(body,'\n',resp,sqlRow);
}

/**
 * 
 * @param {*} beforeAction 
 * @param {*} inputIdsValues dictionary array with two keys (inputId , inputText) 
 */
const testFillForm = async (beforeAction, inputIdsValues) => {
    await beforeAction();
    for (let i = 0; i < testInput.length; i++) {
        sendKeysById(inputIdsValues[i].inputId, inputIdsValues[i].inputText);
    }
}

const testFillFormAndSubmit= async (beforeAction, inputIdsValues,submitId,sqlRequete,compareFunction) => {
    await testFillForm(beforeAction,inputIdsValues);
    await clickOn(submitId);
    sleep(1000);
    let resp = await getRowsFromDb(sqlRequete);
    return compareFunction(inputIdsValues,resp);

}

const testSelector = async (beforeAction , elmId , sqlRequete,sqlRow,compareFunction ) => {
    await beforeAction();
    let body = await getTextById(elmId);
    let resp = await getRowsFromDb(sqlRequete);
    return compareFunction(body,'\n',resp,sqlRow);
}

module.exports = {compareElementWithSqlRequete,testSelector} ;
