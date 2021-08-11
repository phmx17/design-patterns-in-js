// dependency inversion principle; the last of SOLID
// has nothing to do with dependency injection
// again all this does not apply to JS since IT DOESN'T HAVE ABSTRACT CLASSES !!!!


let Relationship = Object.freeze({ // create an enum
  parent: 0,
  child: 1,
  sibling: 2
})

class Person {
  constructor(name) {
    this.name = name
  }
}

// low level modules

// this interface will mediate Relationships class data filter (findAllChildrenOf()) for Research class
class relationshipBrowser {
  // this class is abstract
    constructor() {
      if (this.constructor.name === 'relationshipBrowser')
      throw new Error('relationshipBrowser is abstract!')
    }
    findAllChildrenOf(name) { // this gets overriden by implementaion later
      return [{name: 'Nelly'}, {name: 'Grey'}]
    }
}
class Relationships extends relationshipBrowser { // solution make this extend;
  constructor() {
    super()  // required after extends
    this.data = []
  }
  addParentAndChild(parent, child) {  // deleting this block will not create error, but launch same function in interface since there still is the contract
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child
    })
    this.data.push({  // create the opposite direction in order to search for a child's parent
      from: child,
      type: Relationship.child,
      to: parent
    })
  }  
  findAllChildrenOf(name) {
    return this.data
    .filter(r => 
      r.from.name === name && 
      r.type === Relationship.parent)
    .map(r => r.to) // send only the .to value (child)
  }
  findParentOf(name) {
    return this.data
    .filter(r => 
      r.from.name === name && r.type === Relationship.child)
    .map(r => r.to)  // return the from: value from each relationship found
  }
} 
// create high level module
class Research {
  // constructor(relationships) { // old constructor before dependency inversion
  //   let relations = relationships.data  // store array data[]
  //   // this is directly accessing a data structure from the low  level module which is not a good thing
  //   for (let rel of relations.filter(r => r.from.name === 'Barack' && r.type === Relationship.parent)) {
  //     console.log(`Barack has a child named: ${rel.to.name}`);  // child object has attribute of name
  //   }    
  // } 
  constructor(browser) {  // newer and better
    for (let p of browser.findAllChildrenOf('Barack'))
    console.log(`Barack has a kid by tha name of: ${p.name}`);
    for (let p of browser.findParentOf('Sasha'))
    console.log(`Sasha's dad is: ${p.name}`);
    for (let p of browser.findParentOf('Malia'))
    console.log(`Malia's dad is: ${p.name}`);
  }
  
}
let parent = new Person('Barack')
let child1 = new Person('Sasha')
let child2 = new Person('Malia')
let rels = new Relationships()
rels.addParentAndChild(parent, child1) // building an array of objects containing relationships; 
rels.addParentAndChild(parent, child2)
// console.log(rels.data); // print relationships array

new Research(rels)
