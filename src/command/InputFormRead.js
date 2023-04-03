const driver = require("../config/driver");
const {ReadValueById } = require("../tools/driverTools");
const InputForm = require("./InputForm");

class InputFormRead extends InputForm{
    id = -1;
    value=-1;
    constructor (id){
        super();
        this.id = id ;
    }

    async execute(){
        console.log(">>>> Write execution start ...");
        try {
            value = ReadValueById(this.id);
            console.log(`Read ${this.id} : PASS !`);
        }catch (error){
            console.log(error);
            console.log(`Read ${this.id} : NOT PASS !`);
        }
    };

    GetReadValue(){
        if(value!=-1){
            return this.value;
        }
        else{
            console.log("Aucune valeur n'est lu");
            return this.value;
        }
    }
}
module.exports = {InputFormRead} ;