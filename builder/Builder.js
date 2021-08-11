// builder pattern
// problem and demo were to assemble html tags from an array, using .push() and .join('')

class Tag {
  static get indentSize() { return 2; }

  constructor(name='', text='') {
    this.name = name
    this.text = text
    this.children = []
  }
  toStringImpl(indent) {
    let html = []
    let i = ' '.repeat(indent * Tag.indentSize)
    html.push(`${i}<${this.name}>\n`)
    if (this.text.length > 0) {
      html.push(' '.repeat(Tag.indentSize * (indent+1)))
      html.push(this.text)
      html.push('\n')
    }
    for (let child of this.children){
      html.push(child.toStringImpl(indent+1));
      html.push(`${i}</${this.name}>\n`) 
      }
    return html.join(); 
  }

   toString()
   {
     return this.toStringImpl(0);
   }
 
   static create(name)
   {
     return new HtmlBuilder(name);
   }

}