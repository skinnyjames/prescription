const resolve = require('path').resolve
const { setDefaultTimeout, setWorldConstructor, AfterAll, BeforeAll } = require('cucumber')
const webdriver = require('selenium-webdriver')


const chromeCapabilities = webdriver.Capabilities.chrome()
const chromeOptions = {
  'args': ['--no-sandbox']
}
chromeCapabilities.set('chromeOptions', chromeOptions)

const driver = new webdriver.Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build()
const Browser = require('./../../../dist/prescription')

setDefaultTimeout(10000)

var glance = require('glance')
var glancePromise

BeforeAll(function(cb) {
  glancePromise = glance({ dir: 'test/html'})
  glancePromise.start()
  setTimeout(function() {
    cb()
  }, 5000)
})

AfterAll(function() {
  glancePromise.stop()
  driver.quit()
})


function CustomWorld() {
	this.browser = new Browser(driver)
}

setWorldConstructor(CustomWorld)
