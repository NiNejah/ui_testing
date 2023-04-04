const hljs = require('highlight.js');

const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

const meta = require('markdown-it-meta');
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


const makeHtmlFromMd = (mdFile) => {

  const markdownText = fs.readFileSync(mdFile, 'utf8');
  md.use(meta);
  md.meta['stylesheet'] = 'node_modules/highlight.js/styles/default.css';
  const html = md.render(markdownText);
  const linkTag = `<link rel="stylesheet" href="${md.meta['stylesheet']}" />`;

  const finalHtml = html.replace(/<head>/, `<head>${linkTag}`);
  console.log(finalHtml); 
  return finalHtml ;

}

module.exports  = {sleep, parseText, concatenateLastElements, makeHtmlFromMd } ;