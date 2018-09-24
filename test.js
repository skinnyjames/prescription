const Browser = require('./dist/prescription')
const webdriver = require('selenium-webdriver')
const driver = new webdriver.Builder().forBrowser('chrome').build()


var browser = new Browser(driver)

async function runTest() {

  await browser.visit('http://localhost:8080')

  let tag = await browser.div({id: 'table-data'}).td({id: 'td'}).a({css: 'a'}).text()

  setTimeout(() => {
    console.log(tag)
  }, 5000)
  
}

runTest()


