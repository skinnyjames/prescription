var { Given, When, Then } = require('cucumber')
const chai = require('chai')
const expect = chai.expect

Then(/I should be able to visit webpages/, async function() {
  await this.browser.visit('http://localhost:8080')
  setTimeout(function() {
    console.log(this.browser)
  }, 6000)
})

Given(/I visit a webpage/, async function() {
  await this.browser.visit('http://localhost:8080')
})

Then(/I should be able to access a nested element/, async function() {
  let text = await this.browser.div({id: 'table-data'}).td({id: 'td'}).a({css: 'a'}).text()
  expect(text).to.eql('Ready spaghetti')
})

Then(/I can retrieve a list of prescription elements/, async function() {
  let elements = await this.browser.divs()
  let texts = await elements.map(el => el.text())
  console.log(texts)
  let text = elements[0].text()
  expect(text).to.eql('Google')
})

Then(/I can reference an element by regex/, async function() {
  let text = await this.browser.td({id: /2$/}).text()
})