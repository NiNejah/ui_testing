const Compare = require("./Compare");
const {getHTMLById} = require("../tools/driverTools")
class CompareInnerHTML extends Compare{
    elmId = -1 ;
    innerHTLM = "";
    constructor (elmId,innerHTLM){
        super(); // call the constructor of the parent class
        this.elmId = elmId ; 
        this.innerHTLM = innerHTLM ; 
    }
///html compare :regarder cette fonction
    async execute(){
        super.execute();
        console.log(this.toString());
        let body = await getHTMLById(this.elmId);

        if(body !== this.innerHTLM.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")){
            //super.displayFailedTest(body,this.innerHTLM);
            console.log(this.innerHTLM.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""));
        }else{
            console.log("test pass ! ");
        }
        
        
    }

    async toString(){
        let body = await getHTMLById(this.elmId);
        return `Compare innerHTML :  element id = ${this.elmId}, html = ${body} , toHtml = ${this.innerHTLM}`;
    }
}

module.exports =  CompareInnerHTML;