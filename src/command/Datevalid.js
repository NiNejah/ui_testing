const driver = require("../config/driver");
const { Datevalide } = require("../tools/driverTools");

class Datevalid{
    date = -1; 
    constructor (date){
        this.date = date ;  
    }

    async execute(){
        console.log(">>>> Datevalid execution start ...");
        try {
           let res = await Datevalide(this.date);
           if(res==true){
               console.log("cette date est valide");
           }
           else{
            console.log("cette date ne pass pas");
           }
            console.log(` ${this.date} : PASS !`);
        }catch (error){
            console.log(error);
            console.log(`Date on ${this.date} : NOT PASS !`);
        }
    };
}
module.exports = Datevalid ;