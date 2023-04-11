const os = require('os');

class Compare {
    execute(){
        console.log(">>>> Compare execution start ...");
    };
    toString(){};
    displayFailedTest(expacted,actual){
        return `Compare FAILED :\n 
        expact = ${expacted} \n
        actual = ${actual}` ; 
    }
}
module.exports = Compare ;
