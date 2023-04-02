const Compare = require("./Compare");
const getRowsFromDb = require("../tools/dbTools")
const {getTextById} = require("../tools/driverTools")
class CompareText extends Compare{
    elmId = -1 ;
    sqlRow = "";
    sqlRequete = ""; 
    constructor (elmId,sqlRow,sqlRequete){
        super(); // call the constructor of the parent class
        this.elmId = elmId ; 
        this.sqlRow = sqlRow ; 
        this.sqlRequete = sqlRequete ;
    }

    async execute(){
        super.execute();
        console.log(this.toString());
        let body = await getTextById(this.elmId);
        let sqlResponse = await getRowsFromDb(this.sqlRequete);
        let strArray = body.split('\n');
        for (let i = 0; i < strArray.length; i++) {
            // console.log( strArray[i] ,"  \t|  " ,sqlResponse[i][this.sqlRow]) ; 
            if(strArray[i].localeCompare(sqlResponse[i][this.sqlRow]) !== 0 ){
                super.displayFailedTest(sqlResponse[i][this.sqlRow],strArray[i]);
            }
        }
        console.log("test pass ! ");
        
    }

    toString(){
        return `Compare Text :  element id = ${this.elmId}, sql Requete = ${this.sqlRequete} , sql Row = ${this.sqlRow}`;
    }
}

module.exports =  CompareText;