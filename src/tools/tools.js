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
      }
       else if (line.startsWith("#") || line ==='') {
        continue;
      }
      currentBlock.push(line);
    }
  
    if (currentBlock.length > 0) {
      blocks.push(currentBlock);
    }
    return blocks;
}

const concatenateLastElements = (arr , startIndex)=>{
    const firstPart = arr.slice(0, startIndex);
    const secondPart = arr.slice(startIndex);
    const lastElement = secondPart.join('');
    firstPart.push(lastElement);
    return firstPart;
}
  




module.exports  = {sleep , parseText , concatenateLastElements } ;