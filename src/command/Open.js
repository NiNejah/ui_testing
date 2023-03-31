const driver = require("../config/driver");
const { openNavigator } = require("../tools/driverTools");

class Open {
    url = ""; 
    constructor (url){
        this.url = url ;  
    }

    async execute(){
        try {
            await openNavigator(this.url);
        }catch (error){
            console.log(error);
        }
    };
}
module.exports = Open ;