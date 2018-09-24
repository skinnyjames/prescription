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

  locateElement(locator:any) {
    if (this.currentElement) {
      this.currentElement = this.currentElement.findElement(locator)
    }else {
      this.currentElement = this.driver.findElement(locator)
    }
  }
  
}

class Element {

  queryScope:any
  locator:any
  element:any
    
  constructor(scope:any, locator:any) {

    this.locator = locator
    this.element = scope.locateElement(locator)

    Object.assign(this, Container)
  }

  text() {
    return this.element.getText()
  }

}


class HTMLElement extends Element {
}


class Anchor extends HTMLElement {
}


var Container = {

  div(args:any) { 
    console.log('div tag', this)
    return new HTMLElement(this, args)
  },

  a(args:any) {
    console.log('a tag', this)
    return new Anchor(this, args)
  }

}

module.exports = Browser
