class Compare {

    compare () {
        let compare1 =  (str ,strEnd , sqlResponse , sqlRow )  => {
            let strArray = str.split(strEnd);
            console.log("body  \t\t|\t  sql ")
            for (let i = 0; i < strArray.length; i++) {
                console.log( strArray[i] ,"  \t|  " ,sqlResponse[i][sqlRow]) ; 
                if(strArray[i].localeCompare(sqlResponse[i][sqlRow]) !== 0 )
                    return false; 
            }
            return true ; 
            console.log("-----------------------------------------");
        }
        //TODO ...
        let compare2 =  () => {
            console.log("non arge ...");
        }
        //TODO ...
        let compare3 =  (str1)=> {
            console.log("one arg ... ");
        }

        if(arguments.length === 4){
            return compare1 (arguments[0],arguments[1],arguments[2],arguments[3]) ; 
        }
        
    }
}
module.exports = Compare ; 