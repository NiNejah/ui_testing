const driver = require("../config/driver");

class Open {
    url = ""; 
    constructor (url){
        this.url = url ;  
    }

    execute(){
        try {
            open(url);
        }catch (error){
            console.log(error);
        }
    };
}