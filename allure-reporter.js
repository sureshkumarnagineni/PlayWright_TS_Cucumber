// Pointing directly to the internal CJS logic folder
const AllureReporter = require('./node_modules/allure-cucumberjs/dist/index.js');

module.exports = AllureReporter.AllureCucumberJS || AllureReporter.default;