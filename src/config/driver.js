const { Builder} = require("selenium-webdriver");

// Creating a new WebDriver instance using the Firefox browser
const driver = new Builder().forBrowser('firefox').build();

module.exports = driver;