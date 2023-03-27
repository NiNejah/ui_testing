class Command {
    static create(...args) {
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
        case "@read":
          
        case "@compareText":
            if (args.length !== 4) {
                throw new Error(`Invalid arguments for command ${commandName}`);
            }
            args = concatenateLastElements(args,3) ; 
            return new CompareText(args[1], args[2],args[3]);
        default:
          throw new Error(`Unknown command ${commandName}`);
      }
    }
}