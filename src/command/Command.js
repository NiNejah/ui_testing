const Open = require("./Open");
const Click = require("./Click");
const CompareText = require("./CompareText");
const {concatenateLastElements} = require("../tools/textTools");
const InputFormRead = require("./InputFormRead");
const InputFormWrite = require("./InputFormWrite");
const CompareInnerHTML = require("./CompareInnerHTML");
const Close = require("./Close");

class Command {
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
          return new Open(args[1]);
        case "@click":
          if (args.length !== 2) {
            throw new Error(`Invalid arguments for command ${commandName}`);
          }
          return new Click(args[1], args[2]);
        case "@InputFormWrite":
          if (args.length !== 3) {
            throw new Error(`Invalid arguments for command ${commandName}`);
          }
          return new InputFormWrite(args[1], args[2]);
        case "@InputFormRead":
          if (args.length !== 2) {
            throw new Error(`Invalid arguments for command ${commandName}`);
          }
          return new InputFormRead(args[1]);
        case "@compareText":
            // if (args.length !== 4) {
            //     throw new Error(`Invalid arguments for command ${commandName}`);
            // }
            args = concatenateLastElements(args,3) ; 
            return new CompareText(args[1], args[2],args[3]);
        case "@compareInnerHTML":
          // if (args.length !== 3) {
          //   throw new Error(`Invalid arguments for command ${commandName}`);
          // }
          args = concatenateLastElements(args,2);
          return new CompareInnerHTML(args[1],args[2]); 
        case "@close":
          if (args.length !== 1) {
            throw new Error(`Invalid arguments for command ${commandName}`);
          }
          return new Close(args[1]);
        default:
          throw new Error(`Unknown command ${commandName}`);
      }
    }
}

module.exports = Command ;