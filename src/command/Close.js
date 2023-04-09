const { closeNavigator } = require("../tools/driverTools");

class Close {
    constructor (url){
    
    }

    async execute(){
        console.log(">>>> Close execution start ...");
        try {
            await closeNavigator();
            console.log(`Close : PASS !`);
        }catch (error){
            console.log(error);
            console.log(`Close : NOT PASS /!\\`);
        }
    };
}
module.exports = Close ;