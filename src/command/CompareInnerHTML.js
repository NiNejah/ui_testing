const Compare = require("./Compare");
const {getHTMLById} = require("../tools/driverTools");
const htmlCompare = require('html-compare');
class CompareInnerHTML extends Compare{
    elmId = -1 ;
    innerHTLM = "";
    body;
    constructor (elmId,innerHTLM){
        super(); // call the constructor of the parent class
        this.elmId = elmId ; 
        this.innerHTLM = innerHTLM ; 
    }
///html compare :regarder cette fonction
    async execute(){
        super.execute();
        this.body = await getHTMLById(this.elmId);
        
        var result = htmlCompare.compare(this.body, this.innerHTLM);
        if (result.different) {
           return  {testDescription: this.toString(), isPass: false, errorMessage: super.displayFailedTest(this.body,this.innerHTLM) } ;
        } else {
            return {testDescription: this.toString(), isPass: true, errorMessage: '' } ; 
        }
    }
    
    async toString(){
        return `Compare innerHTML :  element id = ${this.elmId}, html = ${this.body} , toHtml = ${this.innerHTLM}`;
    }
}

module.exports =  CompareInnerHTML;