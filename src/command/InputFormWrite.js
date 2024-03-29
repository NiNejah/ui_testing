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
        try {
            await sendKeysById(this.id, this.value);
            return {testDescription: this.toString(), isPass: true, errorMessage: '' } ;
        }catch (error){
            return {testDescription: this.toString(), isPass: false, errorMessage: error } ;
        }
    };
    toString(){
        return `InputFormWrite :  element id = ${this.id}, value = ${this.value}`;
    }
}
module.exports = InputFormWrite ;