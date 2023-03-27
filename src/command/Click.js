const driver = require("../config/driver");
const { clickOn } = require("../tools/driverTools");

class Click {
    id = -1; 
    constructor (id){
        this.id = id ;  
    }

    async execute(){
        try {
            await clickOn(id);
        }catch (error){
            console.log(error);
        }
    };
}