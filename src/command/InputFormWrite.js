const driver = require("../config/driver");
const {sendKeysById } = require("../tools/driverTools");
const InputForm = require("./InputForm");

class InputFormWrite extends InputForm{
    id = -1; 
    value = -1;
    constructor (id, value){
        super();
        this.id = id ;
        this.value = value ;
    }

    async execute(){
        console.log(">>>> InputFormWrite execution start ...");
        try {
            await sendKeysById(this.id, this.value);
            console.log(`Write ${this.value} in ${this.id} : PASS !`);
        }catch (error){
            console.log(error);
            console.log(`Write ${this.value} in ${this.id} : NOT PASS !`);
        }
    };
}
module.exports = InputFormWrite ;