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
        // console.log(">>>> Write execution start ...");
        try {
            await sendKeysById(this.id, this.text);
            return {testDescription: this.toString(), isPass: true, errorMessage: '' } ;
        }catch (error){
            return {testDescription: this.toString(), isPass: true, errorMessage: error} ;
        }
    };
    
    toString(){
        return `Write ${this.text} in ${this.id}` ;
    }
}
module.exports = Write ;