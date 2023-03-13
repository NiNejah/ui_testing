const { By } = require("selenium-webdriver");

/**
 * 
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


/**
 * 
 * @param {ThenableWebDriver } driver A valide selenium-webdriver instance.
 * @param {string} elmId The ID to search for.
 * @return {boolean} false if element's empty else true.
 */
const fieldIsCompleted = async (driver, elmId)=>{ 
    let res = await driver.findElement(By.id(elmId)).getText().then((v)=>{
        console.log(v);
        if(v == ''){
            return false;
        }
        return true;
        // return v == '' ?! ; 
    });
    return res;
}

const  Dateiscorrect = async (driver,elmId) => {
     let res = await driver.findElement(By.id(elmId)).getText().then((v)=>{
        const now = new Date();
        const date = now.toLocaleDateString();
        console.log(date);
        console.log(v);

        if (v>=date){
              return true;
        }
        else {
            return false;
        }
        // return v >= date ?! 
    });
    return res ;
}

module.exports = { clickOn , sendKeysById, getTextById, fieldIsCompleted,Dateiscorrect } ; 