import * as Bluebird from 'bluebird'

class Browser {

  driver:any
  currentElement:any

  constructor(driver:any) {
    this.driver = driver
    Object.assign(this, Container)
  }

  visit(url:string) {
    return this.driver.get(url)
  }
}


class Element {

  browser:any
  locator:any
  element:any
    
  constructor(context:any, locator:any) {

    if (context.browser) {
      this.browser = context.browser
    } else {
      this.browser = context
    }

    this.locator = locator
    this.element = this.locateElement()
    this.browser.currentElement = this.element
    Object.assign(this, Container)
  }

  text() {
    return this.element.getText()
  }

  click() {
    return this.element.click()
  }

  locateElement() {
    if (this.browser.currentElement) {
      return this.browser.currentElement.findElement(this.locator)
    } else {
      return this.browser.driver.findElement(this.locator)
    }
  }

}


class HTMLElement extends Element {
}


class Anchor extends HTMLElement {
}


var Container = {

  div(args:any) { 
    return new HTMLElement(this, args)
  },

  span(args:any) { 
    return new HTMLElement(this, args)
  },

  a(args:any) {
    return new Anchor(this, args)
  },

  td(args:any) {
    return new HTMLElement(this, args)
  }

}

module.exports = Browser
