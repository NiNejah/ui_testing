class Compare {

    compare () {
        let compare1 =  (str1 , str2 , end1 )  => {
            console.log("thrye arges ..");
            let str1Array = str1.split(end1);
            for (let i = 0; i < str1Array.length; i++) {
                if(str1Array[i].localeCompare(str2[i]) !== 0 )
                    return false; 
            }
        }
        //TODO ...
        let compare2 =  () => {
            console.log("non arge ...");
        }
        //TODO ...
        let compare3 =  (str1)=> {
            console.log("one arg ... ");
        }

        if(arguments.length === 3){
            return compare1 (arguments[0],arguments[1],arguments[2]) ; 
        }
        
    }
}
module.exports = Compare ; 