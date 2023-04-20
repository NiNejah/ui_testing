const Open = require("./Open");
const Click = require("./Click");
const CompareText = require("./CompareText");
const {concatenateLastElements} = require("../tools/textTools");
const InputFormRead = require("./InputFormRead");
const InputFormWrite = require("./InputFormWrite");
const CompareInnerHTML = require("./CompareInnerHTML");

class Command {
  static cmds = [];
    static create(args) {
      if (args.length < 1) {
        throw new Error("Invalid arguments");
      }
      const commandName = args[0];
      switch (commandName) {
        case "@open":
          if (args.length !== 2) {
            throw new Error(`Invalid arguments for command ${commandName}`);
          }
          this.cmds.push(new Open(args[1]));
          break ;
        case "@click":
          if (args.length !== 2) {
            throw new Error(`Invalid arguments for command ${commandName}`);
          }
          this.cmds.push(new Click(args[1], args[2]));
          break ;
        case "@InputFormWrite":
          if (args.length !== 3) {
            throw new Error(`Invalid arguments for command ${commandName}`);
          }
          this.cmds.push(new InputFormWrite(args[1], args[2]));
          break ;
        case "@InputFormRead":
          if (args.length !== 2) {
            throw new Error(`Invalid arguments for command ${commandName}`);
          }
          this.cmds.push(new InputFormRead(args[1]));
          break ;
        case "@compareText":
            // if (args.length !== 4) {
            //     throw new Error(`Invalid arguments for command ${commandName}`);
            // }
            args = concatenateLastElements(args,3) ; 
            this.cmds.push(new CompareText(args[1], args[2],args[3]));
            break ;
        case "@compareInnerHTML":
          // if (args.length !== 3) {
          //   throw new Error(`Invalid arguments for command ${commandName}`);
          // }
          args = concatenateLastElements(args,2);
          this.cmds.push(new CompareInnerHTML(args[1],args[2])); 
          break ;
        default:
          throw new Error(`Unknown command ${commandName}`);
      }
    }
    static async execute(allRes){
      for (let e of this.cmds) {
        let res = await e.execute(); 
        allRes.push(res);
        if (!res.isPass) {
          break;
        }
      }
      this.cmds.length = 0 ; 
    }
}

module.exports = Command ;