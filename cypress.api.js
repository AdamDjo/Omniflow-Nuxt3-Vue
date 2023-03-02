const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  $schema: 'https://raw.githubusercontent.com/cypress-io/cypress/develop/cli/schema/cypress.schema.json',
  integrationFolder: '.',
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  env: {
    API: process.env.API,
    API_MOCK: process.env.API_MOCK,
  },
});
