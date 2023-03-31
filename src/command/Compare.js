class Compare {
    execute(){
        console.log(">>>> Compare exectution start ...");
    };
    toString(){};
    displayFailedTest(expacted,actual){
        console.log(`FAILED : expact = ${expacted}   /  actual = ${actual}`)
    }
}
module.exports = Compare ;
