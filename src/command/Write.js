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
        try {
            await sendKeysById(this.id, this.text);
        }catch (error){
            console.log(error);
        }
    };
}
module.exports = Write ;