const { By } = require("selenium-webdriver");
const driver = require ("../config/driver");
const ENDPOINT = require ("../config/config");


/**
 * Opens the browser and navigates to the specified endpoint.
 * @param {string} endPoint The endpoint to navigate to.
 * @return {!Promise} A promise that will be resolved when the navigation is complete.
 */
const openNavigator = async (endPoint)=>{
    return await driver.get(endPoint);
}

/**
 * Closes the browser.
 * @return {!Promise} A promise that will be resolved when the browser is closed.
 */
const closeNavigator = async ()=>{
    return await driver.close();
}

/**
 * Clicks on an element with the specified ID on the browser.
 * @param {string} elmId The ID of the element to click on.
 * @return {!Promise} A promise that will be resolved when the click command has completed.
 */
const clickOn = async (elmId )=>{
    return await driver.findElement(By.id(elmId)).click();
}

/**
 * Sets the text of an element with the specified ID on the browser.
 * @param {string} elmId The ID of the element to set the text for.
 * @param {(string|number|!Promise<string|number>)} valueToSend The value to send to the element. All arguments will be joined into a single sequence.
 */
const sendKeysById = async (elmId , valueToSend )=>{ 
    let input =  await driver.findElement(By.id(elmId)) ;
    input.sendKeys(valueToSend);
}

/**
 * Gets the value of an element with the specified ID on the browser.
 * @param {string} elmId The ID of the element to get the value for.
 * @return {!Promise} A promise that will be resolved with the element's value.
 */
const getElementValueById = async (elmId) =>{
    const element = await driver.findElement(By.id(elmId));
    const value = await element.getAttribute('value');
    return value;
}

/**
 * Gets the visible text of an element with the specified ID on the browser.
 * @param {string} elmId The ID of the element to get the text for.
 * @return {!Promise} A promise that will be resolved with the element's visible text.
 */
const getTextById = async (elmId )=>{ 
    let res = await driver.findElement(By.id(elmId)).getText().then((v)=>{
        return v;
    });
    return res ; 
}

/**
 * Gets the inner HTML of an element with the specified ID on the browser.
 * @param {string} elmId The ID of the element to get the HTML for.
 * @return {!Promise} A promise that will be resolved with the element's inner HTML.
 */
const getHTMLById = async (elmId) => {
    let res = await driver.findElement(By.id(elmId)).getAttribute('innerHTML').then((v) => {
      return v;
    });
    return res;
};

module.exports = { clickOn , sendKeysById, getElementValueById, getTextById, openNavigator, closeNavigator, getHTMLById} ; 