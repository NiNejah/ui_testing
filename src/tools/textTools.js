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

module.exports  = {sleep, parseText, concatenateLastElements } ;