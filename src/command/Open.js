const driver = require("../config/driver");
const { openNavigator } = require("../tools/driverTools");

class Open {
    url = ""; 
    constructor (url){
        this.url = url ;  
    }

    async execute(){
        console.log(">>>> Open execution start ...");
        try {
            await openNavigator(this.url);
            console.log("Open : PASS !");
        }catch (error){
            console.log(error);
            console.log("Open : NOT PASS !");
        }
    };
}
module.exports = Open ;