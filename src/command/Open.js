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
            return true ;
        }catch (error){
            return false ; 
            console.log(error);
            console.log(this.toString(),": NOT PASS /!\\");
        }
    };
    toString(){
       return `Open ${this.url}`;
    }
}
module.exports = Open ;