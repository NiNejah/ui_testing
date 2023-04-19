const driver = require("../config/driver");
const {getElementValueById, getTextById } = require("../tools/driverTools");
const InputForm = require("./InputForm");

class InputFormRead extends InputForm{
    id = -1;
    value=-1;
    constructor (id){
        super();
        this.id = id ;
    }

    async execute(){
        try {
            this.value = await getElementValueById(this.id);
            return {testDescription: this.toString(), isPass: true, errorMessage: '' } ;
        }catch (error){
            return {testDescription: this.toString(), isPass: false, errorMessage: error } ;
        }
    };

    GetReadValue(){
        if(this.value!=-1){
            return this.value;
        }
        else{
            console.log("Aucune valeur n'est lu");
            return this.value;
        }
    }
    toString(){
        return `InputFormWrite :  element id = ${this.id}, value = ${this.value}`;
    }
}
module.exports = InputFormRead ;