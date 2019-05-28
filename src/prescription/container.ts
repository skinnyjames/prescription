import { HTMLElement } from './elements/html'
import { HTMLElementCollection } from './elements/html-collection'
import { Anchor } from './elements/anchor'

export var Container = {

  div(args: any) { 
    return new HTMLElement(this, args)
  },

  divs(args: any) {
    return new HTMLElementCollection(this, args)
  },

  span(args: any) { 
    return new HTMLElement(this, args)
  },

  a(args: any) {
    return new Anchor(this, args)
  },

  td(args: any) {
    return new HTMLElement(this, args)
  }
}