import { Container } from '../container'
import { Element } from './element'
//@ts-ignore
import swear from 'swear'

export class ElementCollection {

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
    return this.locateElements()
  }

  locateElements() {
    return swear(this.browser.driver.findElements(this.locator))
    .map((el: any) => new Element(el))
  }

}