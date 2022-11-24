const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dzr1gu',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
