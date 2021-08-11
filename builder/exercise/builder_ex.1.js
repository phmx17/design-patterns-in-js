// exercise code builder
// approach used extends
// not tested, not complete !

class classBuilder {
  constructor(){
    this.className.name = ''
    this.fields = [{
      fieldName: '',
      fieldChunk: ''
    }
    ]
  }
}


class CodeBuilder {
  constructor(cl = new ClassBuilder(), name) {
    this.className = cl
    this.className.name = name
  }
  get addField() {
    this.fieldChunk = new CodeFieldBuilder(this.className)
    return this.fieldChunk

  }
  toString() {
    codeChunk = `class ${this.className.name} {\n  constructor{${this.className.fields.fieldName}}`


    return 
  }
}

class CodeFieldBuilder extends CodeBuilder {
  constructor(className) {
    super(className)
  }
  field(field) {
    let chunk =  `this.${field} = ${this.field}`
    this.className.fields.push({fieldName: field, fieldChunk: chunk})
  }
}