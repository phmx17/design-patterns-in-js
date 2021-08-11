// single responsibility class
// adding file operations (persistence) will cloud the class with too much responsibulity
// add a separate clsss to handle persistence -> class PersistenceManager {}
const fs = require('fs')

class Journal {
  constructor() {
    this.entries = {}
  }
  addEntry(text) {
    let c = ++Journal.count // increase first, before assign
    text = `${c}: ${text}`
    this.entries[c] = text
    return c
  }
  removeEntry(index) {  // starts at index 1 not zero
    delete this.entries[index]
  }
  toString() {
    return Object.values(this.entries).join('\n') // return all vals in a string separated by \n
  }
  save(filename) {
    fs.writeFileSync(filename, this.toString())
  }
}

Journal.count = 0
let j = new Journal()
j.addEntry('I cried today')
j.addEntry('I fell in love today')
j.removeEntry(1)
console.log(j.toString())