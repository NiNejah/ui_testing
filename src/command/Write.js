const driver = require("../config/driver");
const {sendKeysById } = require("../tools/driverTools");

class Write {
    id = -1; 
    text = '';
    constructor (id, text){
        this.id = id ;
        this.text = text ;
    }

    async execute(){
        console.log(">>>> Write execution start ...");
        try {
            await sendKeysById(this.id, this.text);
            console.log("Write : PASS !");
        }catch (error){
            console.log(error);
            console.log("Write : NOT PASS !");
        }
    };
}
module.exports = Write ;