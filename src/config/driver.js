const { Builder} = require("selenium-webdriver");

// change name navigator if you want
const driver = new Builder().forBrowser('firefox').build();

module.exports = driver;