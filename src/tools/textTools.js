const sleep = ms => new Promise(r => setTimeout(r, ms));


const parseText = (text) => {
  const blocks = [];
  let currentBlock = [];

  for (const line of text.split("\n")) {
      if (line.startsWith("@")) {
          if (currentBlock.length > 0) {
              blocks.push(currentBlock);
              currentBlock = [];
          }
          currentBlock.push(line.trim()); // Remove whitespace at the end of the command
      } else if (line.startsWith("#") || line === '') {
          continue;
      } else {
          currentBlock.push(line.trim()); // Remove whitespace at the beginning and end of the SQL query/HTML tag
      }
  }

  if (currentBlock.length > 0) {
      blocks.push(currentBlock);
  }

  return blocks;
}

const concatenateLastElements = (arr , startIndex)=>{
    const firstPart = arr.slice(0, startIndex);
    const secondPart = arr.slice(startIndex);
    const lastElement = secondPart.join(' ');
    firstPart.push(lastElement);
    return firstPart;
}
  
module.exports  = {sleep , parseText , concatenateLastElements } ;




const parseText3 = (text) => {
  const regex = /@([^\s]*)\s*([\s\S]*?)(?=\n@|\n$)/gm;
  // const regex = /@(\w+)\s+([\s\S]*?)(?=\n@|\n$)/g;
  // const regex = /@(\w+)\s+([^@\n]*)(?=\n@|\n$)/g;
  // const regex = /@(\w+)\s+([\w-]+)?\s+((?:.|\n)*?)(?=\s*@|$|#)/gs;

  const blocks = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    // console.log ("match : ",match)
    const [one, command, content] = match;
    console.log("one : ", one , "command :",command, "content :",content);
    const lines = content.trim().split('\n').map(line => line.trim());
    console.log("line :",lines);
    blocks.push([`@${command}`, ...lines]);
  }
  // return blocks ;
}


const parseText2 = (text) => {
  const blocks = [];
  // const regex = /@(\w+)\s*([\w-]+)?\s*(.*?)\s*(?=@|$|#)/gs;
  // const regex = /@(\w+)\s+([\w-]+)?\s+((?:.|\n)*?)(?=\s*@|$|#)/gs;
  let match;
  while (match = regex.exec(text)) {
    const [, cmd, arg, value] = match;
    blocks.push([`@${cmd}`, arg, value.trim()]);
  }
  return blocks ; 
}

const parseText1  =(text) => {
  const blocks = [];
  const regex = /@(\w+)\s+([\w-]+)?\s+((?:.|\n)*?)(?=\s*@|$|#)/gs;

  let match;
  console.log()
  while (match = regex.exec(text)) {
    const [, ocmd,] = match;
    console.log("ocmd : ",ocmd);
    if(ocmd == "open"){
      console.log("in open");
      const [, cmd,url] = match;
      console.log("cmd",cmd,"url",url);
    }
    // console.log("cmd : ", cmd , "arg :",arg, "value :",value , "value.trim() : ",value.trim());
    // blocks.push([`@${cmd}`, arg, value.trim()]);
  }
  return blocks;
}