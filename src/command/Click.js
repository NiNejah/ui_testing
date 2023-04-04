const driver = require("../config/driver");
const { clickOn } = require("../tools/driverTools");

class Click {
    id = -1; 
    constructor (id){
        this.id = id ;  
    }

    async execute(){
        try {
            await clickOn(this.id);
            return { testDescription: this.toString(), isPass: true, errorMessage: '' } ;
        }catch (error){
            return { testDescription: this.toString(), isPass: false, errorMessage: error } ;
        }
    };

    toString(){
        return `Click on ${this.id}`;
    }
}
module.exports = Click ;
