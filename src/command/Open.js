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
            console.log(`Open ${this.url}: PASS !`);
        }catch (error){
            console.log(error);
            console.log(`Open ${this.url}: NOT PASS /!\\`);
        }
    };
}
module.exports = Open ;