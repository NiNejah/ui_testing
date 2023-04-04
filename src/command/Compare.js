class Compare {
    execute(){
        console.log(">>>> Compare execution start ...");
    };
    toString(){};
    displayFailedTest(expacted,actual){
        return `FAILED : expact = ${expacted}   /  actual = ${actual}` ; 
    }
}
module.exports = Compare ;
