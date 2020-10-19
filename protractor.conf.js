var HtmlReporter = require('/usr/lib/node_modules/protractor-beautiful-reporter');
var current = new Date()
var timestamp = current.getFullYear() + '.' + current.getMonth() + '.' + current.getDate() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/test.spec.js'],
  framework: 'jasmine2',

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['no-sandbox']
    }    
  },
   
  jasmineNodeOpts: {
    defaultTimeoutInterval: '300000'
},

  onPrepare: function () {
    browser.driver.manage().window().maximize();
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'results/' + timestamp
    }).getJasmine2Reporter());
  }
};
