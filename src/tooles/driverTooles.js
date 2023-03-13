const { By } = require("selenium-webdriver");

/**
 * click on elment on the Browser
 * @param {ThenableWebDriver } driver A valide selenium-webdriver instance 
 * @param {string} elmId The ID to search for
 * @return {!Promise} A promise that will be resolved when the click command has completed.
 */
const clickOn = async ( driver , elmId )=>{
    return await driver.findElement(By.id(elmId)).click();
}

/**
 * 
 * @param {ThenableWebDriver } driver A valide selenium-webdriver instance 
 * @param {string} elmId The ID to search for
 * @param {string | Date } text The text to set. 
 */
const sendKeysById = async ( driver , elmId , text )=>{ 
    let input =  await driver.findElement(By.id(elmId)) ;
    // input.clear();
    // console.log(key);
    input.sendKeys(text);
}

/**
 * 
 * @param {ThenableWebDriver } driver A valide selenium-webdriver instance.
 * @param {string} elmId The ID to search for.
 * @return {string} element's visible text.
 */
const getTextById = async ( driver , elmId  )=>{ 
    let res = await driver.findElement(By.id(elmId)).getText().then((v)=>{
        return v;
    });
    return res ; 
}

module.exports = { clickOn , sendKeysById, getTextById } ; 