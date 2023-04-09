const { By } = require("selenium-webdriver");
const driver = require ("../config/driver");
const ENDPOINT = require ("../config/config");



/**
 * Open navigar
*/
const openNavigator = async (endPoint)=>{
    return await driver.get(endPoint);
}


/**
 * Close navigator
*/
const closeNavigator = async ()=>{
    return await driver.close();
}

/**
 * click on elment on the Browser
 * @param {string} elmId The ID to search for
 * @return {!Promise} A promise that will be resolved when the click command has completed.
 */
const clickOn = async (elmId )=>{
    return await driver.findElement(By.id(elmId)).click();
}

/**
 * 
 * @param {string} elmId The ID to search for
 * @param {string | Date } text The text to set. 
 */
const sendKeysById = async (elmId , text )=>{ 
    let input =  await driver.findElement(By.id(elmId)) ;
    // input.clear();
    // console.lvisibleog(key);
    input.sendKeys(text);
}

/**
 * 
 * @param {string} elmId The ID to search for
 */
async function getElementValueById(elmId) {
    const element = await driver.findElement(By.id(elmId));
    const value = await element.getAttribute('value');
    return value;
}

/**
 * 
 * @param {string} elmId The ID to search for.
 * @return {string} element's visible text.
 */

const getTextById = async (elmId )=>{ 
    let res = await driver.findElement(By.id(elmId)).getText().then((v)=>{
        return v;
    });
    return res ; 
}

const getHTMLById = async (elmId) => {
    let res = await driver.findElement(By.id(elmId)).getAttribute('innerHTML').then((v) => {
      return v;
    });
    return res;
};


const Datevalide= async (dateD) => {
        const now = new Date();
        const dateFormatee = now.toLocaleDateString();
        console.log("la date actuelle est : "+dateFormatee);
        console.log("la date entree est : "+dateD);
        
    if(dateD>=dateFormatee){
        return true;
    }
    else{
        return false;
    }
   
};


module.exports = { clickOn , sendKeysById, getElementValueById, getTextById, openNavigator, closeNavigator, getHTMLById,Datevalide} ; 