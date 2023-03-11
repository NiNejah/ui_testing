class Compare {

    compare () {
        let compare1 = function (str1 , str2 , end1 )  {
            console.log("thrye arges ..");
            let str1Array = str1.split(end1);
            for (let i = 0; i < str1Array.length; i++) {
                if(str1Array[i].localeCompare(str2[i]) !== 0 )
                    return false; 
            }
        }

        let compare2 = function () {
            console.log(" non arge ...");
        }
        let compare3 = function (str1){
            console.log("one arg ... ");
        }

        if(arguments.length === 3){
            return compare1 (arguments[0],arguments[1],arguments[2]) ; 
        }
    }
}
module.exports = Compare ; 