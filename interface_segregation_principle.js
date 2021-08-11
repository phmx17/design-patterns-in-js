// this principle is somewhat irrelevant in JS; certainly better use in other languages

class Machine {
  print() {}  // best: split these functionalitites into separate abstract classes
  fax() {}
  scan() {}
}
// split up responsibilities and separation of concerns
class Printer{
  constructor() {
    if (this.constructor.name === 'Printer')
      throw new Error('Printer is abstract!')
  }
  print() {}
}
class Scanner{}
class Fax{}
// however making a copier by extending the Print and Scan classes won't work; there is no multiple 'extends'
// must define from scratch or use aggregation with mixins
class ClassicPrinter extends Machine {
  print() {}  
  fax(){}
  scan() {
    throw new NotImplementedError('ClassicPrinter.scan')  // this is not good
  }
}

class NotImplementedError extends Error { // this isn't a good solution
  constructor(name) {
    let msg = (`${name} can't be implemented !`)
    super(msg)
    if(Error.captureStackTrace)
      Error.captureStackTrace(this, NotImplementedError)
  }
}

cp = new ClassicPrinter()
cp.scan()