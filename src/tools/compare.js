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
        let compareHTML =  (innerhtlm1,innerhtlm2) => {
            console.log("compareHTML  ...");
            return innerhtlm1.innerHTML == innerhtlm2.innerHTML;
        }
        //TODO ...
        let compareInnerHTML1= (innerhtlm1, innerhtlm2) => {
            const innerHTML1 = innerhtlm1.innerHTML.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
            const innerHTML2 = innerhtlm2.innerHTML.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
            
            return innerHTML1 === innerHTML2;
        }

        if(arguments.length === 4){
            return compare1 (arguments[0],arguments[1],arguments[2],arguments[3]) ; 
        }
        
    }
}
module.exports = Compare ; 