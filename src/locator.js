enum Adjacent {
  Ancestor,
  Preceding,
  Following,
  Child
}

class Locator {

  id: String | RegExp
  css: String
  xpath: String
  visibleText: String | RegExp
  class: String | RegExp | Array
  href: String
  index: number
  adjacent: Adjacent

  convertableRegexp: RegExp


  // goal: 
  // accept standard locators, turn regexp's into xpath locators
  constructor(locator) {
    //process index
    if (locator.index) {
      this.index = locator.index
      delete(locator.index)
    } else {
      this.index = 0
    }
  
    for (var key in locator) {
      if (locator[key] instanceof RegExp) {
        // process regexp
        let xpath = processRegExp(key, locator[key])
      }
    }
  }
}

example = {

  id:  // string
  css: // string css selector
  xpath: // string xpath selector
  visibleText: // string or regex
  href: // takes string or regex
  class: //takes array [] or string or regex
  

}

NameSpace.method()

var namespace = require('locator.js')
import { NameSpace } from 'locator'
