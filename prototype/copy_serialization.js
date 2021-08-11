class Person {
  constructor(name, address) {
    this.name = name
    this.address = address
  }
  toString() {
    return `${this.name} lives at: ${this.address}`
  }
  greet() {
    console.log(`Hi, my name is ${this.name} and I live at: ${this.address}`);
  }

}
class Address {
  constructor(street, city, country) {
    this.streetAddress = street
    this.city = city
    this.country = country
  }  
  toString() {
    return `street: ${this.streetAddress}, city: ${this.city}, country: ${this.country}`
  }
}
class Serializer {
  constructor(type) {
    this.types = types
  }
  // mark all objects
  markRecursive(object) { // finding index of constructor in types
    let idx = this.types.findIndex(t => {
      return t.name === object.constructor.name
    })
    if (idx !== -1) { // if found...
      object['typeIndex'] = idx // create a kvp 
      for (let key in object) {
        if (object.hasOwnProperty(key))
        this.markRecursive(object[key])
        return this.reconstructRecursive(copy)
      }
    }
  }
  clone(object) {
    this.markRecursive(object)
    let copy = JSON.parse(JSON.stringify(object))
  }
}



let anya = new Person('Anya', new Address('1996 Taylor Rd', 'London', 'UK'))
// we want Anya to be a prototype for other persons that live somewhere else
// key is how to copy objects
// let josephine = anya
// josephine.name = 'josephine'
// josephine.address.streetAddress = ('312 Angel Street')
// console.log(anya.toString());
// console.log(josephine.toString());
anya.greet()