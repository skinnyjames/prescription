import { Container } from '../container'

export class Element {

  browser:any
  locator:any
  element:any
    
  constructor(context:any, locator?:any) {

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