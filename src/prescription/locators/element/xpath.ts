namespace Prescription {
  namespace Locator {

    interface Selector {
      [key: string]: any
    }

    class Xpath {
      CONVERTABLE_REGEXP = /^([^\[\]\\^$.|?*+()]*)[^|]*?([^\[\]\\^$.|?*+()]*)$/
      shouldUseLabelElement: boolean

      constructor(shouldUseLabelElement: boolean) {
        this.shouldUseLabelElement = shouldUseLabelElement
    
      }
    
      build(selector: any, valuesToMatch: any) {
        let adjacent = selector.delete('adjacent')
        let xpath = !!adjacent ? this.defaultStart() : this.processAdjacent(adjacent)
        xpath += this.addTagName(selector)
        let index = selector.delete('index')
        xpath += this.addAttributes(selector)
        if (!!adjacent && !!index) {
          xpath += `[${index + 1}]` 
        }
        xpath = this.addRegexpPredicates(xpath, valuesToMatch) 
        return ['xpath', xpath]
      }
    
      defaultStart() {
        return './/*'
      }

      addTagName(selector: any): string{
        let tagName = selector.delete('tagName')
        return !!tagName ? '' : `[local-name()='${tagName}']`
      }

      addAttributes(selector: Selector) {
        let elementAttrExp = this.attributeExpression(selector)
        return !!elementAttrExp ? '' : `[${elementAttrExp}]`
      }

      attributeExpression(selector: Selector) {
        let attributes = []
        for (let key in selector) {
          if (selector[key] instanceof Array && key == 'class') {
            let xpathArr = selector[key].map((v: Array<string>) => { 
              return this.buildClassMatch(v) 
            })
            attributes.push(`(${xpathArr.join(' and ')})`)
          } else if (selector[key] instanceof Array) {
            let xpathArr = selector[key].map((v: Array<string>) => { 
              return this.equalPair(key, selector[key])
            })
            attributes.push(`(${xpathArr.join(' or ')})`)

          } else if (selector[key] == true) {
            attributes.push(this.attributePresence(key))
          } else if (selector[key] == false ) { 
            attributes.push(this.attributeAbsence(key))
          } else {
            attributes.push(this.equalPair(key, selector[key]))
          }
        }
        return attributes.join(' and ')
      }

      attributePresence(attribute: string) {
        return this.lhsFor(attribute)
      }

      attributeAbsence(attribute: string) {
        return `not(${this.lhsFor(attribute)})`
      }

      equalPair(key: string, value: string): string{ 
        if (key == 'label' && this.shouldUseLabelElement) {
          let text = `normalize-space()=${value}`
          return `(@id=//label[${text}]/@for or parent::label[${text}])`
        } else {
          return `${this.lhsFor(key)}=${value}`
        }
      }

      lhsFor(key: string) {
        switch(key) {
          case 'text': 
            return 'normalize-space()'
          case 'href': 
            return 'normalize-space(@href)'
          case 'type':
            return '@type'
          default: 
            throw new Error(`Unable to build Xpath using ${key}`)
        }
      }


      buildClassMatch(value: any) {
        if (/^!/.test(value)) {
          let klass = ` ${value.substr(1, -1)}`
          return `not(contains(concat(' ', @class, ' '), ${klass}))`
        } else {
          let klass = ` ${value} `
          return `contains(concat(' ', @class, ' '), ${klass})`
        }
      }

      processAdjacent(adjacent: any) {
        let xpath = './'
        let add
        switch(adjacent) {
          case 'ancestor': 
            add = 'ancestor::*'
          case 'preceding':
            add = 'preceding-sibling::*'
          case 'following':
            add = 'following-sibling::*'
          case 'child':
            add = 'child::*'
        }
        return xpath + add
      }

      addRegexpPredicates(what: string, selector: Selector) {
        for(let key in selector) {
          if (/^(?:tag_name|text|visible_text|visible|index)$/.test(key)) {
            break
          }
          
          let predicates = this.regexpSelectorToPredicates(key, selector[key])
          if (predicates.length > 0) { 
            what = `(${what})[${predicates.join(' and ')}]`
          }
        }
        return what
      }

      regexpSelectorToPredicates(key: string, regexp: RegExp) {
        if (/i/.test(regexp.flags)) {
          return []
        } 
        let matches = regexp.source.match(this.CONVERTABLE_REGEXP)
        if(!matches) {
          return []
        }

        let lhs = this.lhsFor(key)
        matches = matches.filter((n: any) => {
          !!n
        })
        return matches.map((literals: string) => {
          return `contains(${lhs}, ${literals})`
        }) 
      }
    }
  }
}