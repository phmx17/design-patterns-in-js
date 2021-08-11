class Person {
  constructor(name, address) {
    this.name = name
    this.address = address
  }
  toString() {
    return `${this.name} lives at: ${this.address}`
  }
  deepCopy() {
    return new Person(
      this.name,
      this.address.deepCopy()
    )
  }
}

class Address {
  constructor(street, city, country) {
    this.streetAddress = street
    this.city = city
    this.country = country
  }  
  deepCopy() {
    return new Address(
      this.streetAddress,
      this.city,
      this.country
    )
  }
  toString() {
    return `Address: ${this.streetAddress}, city: ${this.city}, country: ${this.country} `
  }
}
let anya = new Person('Anya', new Address('1996 Taylor Rd', 'London', 'UK'))
// we want Anya to be a prototype for other persons that live somewhere else
// key is how to copy objects
let josephine = anya.deepCopy()
josephine.name = 'josephine'
josephine.address.streetAddress = ('312 Angel Street')
console.log(anya.toString());
console.log(josephine.toString());