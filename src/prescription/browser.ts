import { Container } from './container'

export class Browser {

  driver: any
  currentElement: any

  constructor(driver: any) {
    this.driver = driver
    Object.assign(this, Container)
  }

  visit(url: string) {
    return this.driver.get(url)
  }
}