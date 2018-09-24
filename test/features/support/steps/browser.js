var { Given, When, Then } = require('cucumber')
const chai = require('chai')
const expect = chai.expect

Then(/I should be able to visit webpages/, async function() {
  await this.browser.visit('http://localhost:8080')
  setTimeout(function() {
    console.log(this.browser)
  }, 6000)
})
