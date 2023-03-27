const client = require("./config/db");

class CompareText extends Compare{
    _elmId = -1 ;
    _sqlRow = "";
    _sqlRequete = ""; 
    constructor (elmId,sqlRow,sqlRequete){
        _elmId = elmId ; 
        _sqlRow = sqlRow ; 
        _sqlRequete = sqlRequete ;
    }
    async execute(){
        super.execute();
        console.log(this.toString());
        let body = await getTextById(_elmId);
        let sqlResponse = await getRowsFromDb(client,_sqlRequete);
        let strArray = body.split('\n');
        for (let i = 0; i < strArray.length; i++) {
            // console.log( strArray[i] ,"  \t|  " ,sqlResponse[i][_sqlRow]) ; 
            if(strArray[i].localeCompare(sqlResponse[i][_sqlRow]) !== 0 ){
                super.displayFailedTest(sqlResponse[i][_sqlRow],strArray[i]);
            }
        }
        console.log("test pass ! ");
        
    }

    toString(){
        return `Compare Text :  element id = ${this._elmId}, sql Requete = ${this._sqlRequete} , sql Row = ${this._sqlRow}`;
    }
}