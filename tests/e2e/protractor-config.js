const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

const vCapabilities = [
  {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--no-sandbox', '--window-size=1920,1080', '--disable-gpu'],
    },
  }];

exports.config = {

  directConnect: true,
  multiCapabilities: vCapabilities,
  maxSessions: 1,
  suites: {
    bvt: '../../lib/tests/e2e/bvt.bundle.js',
  },

  baseUrl: 'http://localhost:3000',

  framework: 'jasmine2',

  onPrepare() {
    browser.driver.manage().timeouts().pageLoadTimeout(60000);
    browser.driver.manage().timeouts().implicitlyWait(40000);
    browser.driver.manage().window().maximize();
    browser.ignoreSynchronization = true;

    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'tests/out/e2e/',
        screenshotsFolder: '/images',
        consolidate: true,
        consolidateAll: true,
      }));
  },

};
