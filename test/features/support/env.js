const resolve = require('path').resolve
const { setDefaultTimeout, setWorldConstructor, AfterAll, BeforeAll } = require('cucumber')
const { Builder, By, Key, promise, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox')
const options = new firefox.Options().setBinary('/usr/bin/firefox')
const driver = new Builder()
.forBrowser('firefox')
.setFirefoxOptions(options)
.build()

const Browser = require('./../../../dist/prescription').Browser

setDefaultTimeout(10000)

var glance = require('glance')
var g

BeforeAll(function(cb) {
  g = glance({ dir: 'test/html'})
  g.start()
  setTimeout(function() {
    cb()
  }, 5000)
})

AfterAll(function() {
  g.stop()
  driver.quit()
})


function CustomWorld() {
	this.browser = new Browser(driver)
}

setWorldConstructor(CustomWorld)
