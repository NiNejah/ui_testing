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
            return { testDescription: this.toString(), isPass: true, errorMessage: '' } ;
        }catch (error){
            return { testDescription: this.toString(), isPass: false, errorMessage: error } ;
        }
    };
    toString(){
       return `Open ${this.url}`;
    }
}
module.exports = Open ;