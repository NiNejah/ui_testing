const fs = require('fs');
const {radu,minimum,maximum} = require("./functions");

// Charger le contenu du fichier JavaScript
const jsCode = fs.readFileSync('functions.js', 'utf8');

// Définir les fonctions équivalentes
const functions = {
  'Maxi': 'maximum',
  'Mini': 'minimum',
  'Ali': 'radu'
};

// Lire le fichier texte et exécuter les fonctions appropriées
const fileContent = fs.readFileSync('commands.txt', 'utf8');
const lines = fileContent.split('\n');
let currentCommand = '';
for (const line of lines) {
  // Vérifier si la ligne correspond au début d'une commande
  if (line.startsWith('@')) {
    // Si une commande est déjà en cours, l'exécuter avant de continuer
    if (currentCommand !== '') {
      executeCommand(currentCommand);
    }
    // Commencer une nouvelle commande
    currentCommand = line.trim();
  } else if (line.endsWith(';')) {
    // Ajouter la ligne à la commande en cours
    currentCommand += ' ' + line.trim();
    // Exécuter la commande
    executeCommand(currentCommand);
    // Réinitialiser la commande en cours
    currentCommand = '';
  } else {
    // Ajouter la ligne à la commande en cours
    currentCommand += ' ' + line.trim();
  }
}

// Fonction d'exécution d'une commande
function executeCommand(command) {
  // Vérifier si la commande correspond au format attendu
  const regex = /^@(\w+)\s(.+);$/;
  const match = command.match(regex);
  if (match) {
    const functionName = match[1];
    const params = match[2].split(' ');
    const jsFunctionName = functions[functionName];
    // Vérifier si la fonction existe dans le fichier JavaScript
    if (jsCode.includes(`function ${jsFunctionName}`)) {
      // Exécuter la fonction avec les paramètres 
      if(jsFunctionName == "radu"){
        const result = radu(...params);
        console.log(`Résultat de ${functionName}: ${result}`);
      }else if(jsFunctionName == "maximum"){
        const result = maximum(...params);
        console.log(`Résultat de ${functionName}: ${result}`);
      }else if(jsFunctionName == "minimum"){
        const result = minimum(...params);
        console.log(`Résultat de ${functionName}: ${result}`);
      }  
    } else {
      console.error(`Fonction inexistante dans le fichier JavaScript pour : ${functionName}`);
    }
  } else {
    console.error(`Commande mal formée : ${command}`);
  }
}
