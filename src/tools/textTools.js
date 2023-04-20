/**
 * A function that takes in a string of text and returns an array of arrays of strings, where each inner array contains a group of related lines.
 * @param {string} text The text to parse.
 * @returns {!Array<!Array<string>>} An array of arrays of strings, where each inner array contains a group of related lines.
 */
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

/**
 * A function that takes in an array and a starting index, concatenates all elements from the starting index to the end of the array into a single string, and returns a new array with the concatenated string in place of the original elements.
 * @param {!Array<string>} arr The array to modify.
 * @param {number} startIndex The index to start concatenation from.
 * @return {!Array<string>} A new array with the concatenated string in place of the original elements.
 */

const concatenateLastElements = (arr , startIndex)=>{
  const firstPart = arr.slice(0, startIndex);
  const secondPart = arr.slice(startIndex);
  const lastElement = secondPart.join(' ');
  firstPart.push(lastElement);
  return firstPart;
}



// *************** aux function *************** 

/**
 * A function that returns a Promise that resolves after a specified amount of time has passed.
 * @param {number} ms The amount of time to wait in milliseconds.
 * @return {!Promise<void>} A Promise that resolves after the specified amount of time has passed.
 */

const sleep = ms => new Promise(r => setTimeout(r, ms));

module.exports  = {sleep, parseText, concatenateLastElements } ;