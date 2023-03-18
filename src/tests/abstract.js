const getRowsFromDb = require("../tools/dbTools");
const { getTextById } = require("../tools/driverTools");


const test = async (beforeAction, elmId, dbClient ,sqlRequete, compareFunction ) => {
    await beforeAction();
    let body = await getTextById(elmId);
    let resp = await getRowsFromDb(dbClient,sqlRequete);
    return compareFunction(body,resp,'\n');
}


/**
 * 
 * @param {*} driver 
 * @param {*} beforeAction 
 * @param {*} inputIdsValues dictionary array with two keys (inputId , inputText) 
 */
const testFillForm = async (beforeAction, inputIdsValues) => {
    await beforeAction();
    for (let i = 0; i < testInput.length; i++) {
        sendKeysById(inputIdsValues[i].inputId, inputIdsValues[i].inputText);
    }
}

const testFillFormAndSubmit= async (beforeAction, inputIdsValues,submitId,dbClient,sqlRequete,compareFunction) => {
    await testFillForm(beforeAction,inputIdsValues);
    await clickOn(submitId);
    sleep(1000);
    let resp = await getRowsFromDb(dbClient,sqlRequete);
    return compareFunction(inputIdsValues,resp);

}

const testSelector = async (beforeAction , elmId , dbClient ,sqlRequete,sqlRow,compareFunction ) => {
    await beforeAction();
    let body = await getTextById(elmId);
    let resp = await getRowsFromDb(dbClient,sqlRequete);
    return compareFunction(body,'\n',resp,sqlRow);
}
const testInputText =  async (beforeAction, elmId, arg4 , arg5 , ) => {return true ;} 
const testInputRedio =  async (beforeAction, elmIds, arg4 , arg5 , ) => {return true ;} 
const testInputTextarea = async (beforeAction, elmId, expectedText ,compareFunction) => {return true ;} 

const testInnerHTML = async (beforeAction, elmId, expectedHTML ,compareFunction) => {return true ;} 
const testInnerText = async (beforeAction, elmId, expectedText ,compareFunction) => {return true ;} 

module.exports = {test,testSelector} ;