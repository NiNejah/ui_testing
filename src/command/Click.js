const driver = require("../config/driver");
const { clickOn } = require("../tools/driverTools");

class Click {
    id = -1; 
    constructor (id){
        this.id = id ;  
    }

    async execute(){
        console.log(">>>> Click execution start ...");
        try {
            await clickOn(this.id);
            console.log(`Click on ${this.id} : PASS !`);
        }catch (error){
            // console.log(error);
            console.log(`Click on ${this.id} : NOT PASS !`);
        }
    };
}
module.exports = Click ;
