module.exports = {
  default: {
    // Feature files location
    require: ['src/hooks/Hooks.ts', 'src/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:Reports/cucumber-html/cucumber-report.html',
      'json:allure-results/cucumber.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: 10,
    timeout: 120000,
    strict: true,
    dryRun: false,
    failFast: false
  }
};
