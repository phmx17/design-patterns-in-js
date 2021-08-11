// this is creational builder with facets

class Person {
  constructor(){
    // address info
    this.streetAddress = this.postcode = this.city = '';

    // employment info
    this.companyName = this.position = '';
    this.annualIncome = 0;
  }
  toString() {
    return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n`
      + `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
  }
}

// creating a fluent interface for slick consumption later
class PersonBuilder {
  constructor(person = new Person()) {
    this.person = person
  }
  get works() {
    return new PersonJobBuilder(this.person)
  }
  get lives() {
    return new PersonAddressBuilder(this.person)
  }
  get build() {
    return this.person.toString()
 }
}

class PersonJobBuilder extends PersonBuilder {
  constructor(person) {
    super(person) // establish inheritance
  }
  at(company) {
     this.person.companyName = company
     return this
  }
  asA(position) {
     this.person.position = position
     return this
  }
  earning(salary) {
    this.person.annualIncome = salary
    return this
  }
}

class PersonAddressBuilder extends PersonBuilder {
  constructor(person) {
    super(person)
  }
  street(street) {
    this.person.streetAddress = street
    return this
  }
  pc(pc) {
    this.person.postcode = pc
    return this
  }
  city(city) {
    this.person.city = city
    return this
  }

}
let pb = new PersonBuilder()
// this is what calling a fluent interface should look like for the consumer
let person = pb
  .works.at('Apple').asA('Web Developer').earning(145000) // execute works getter
  .lives.street('6958 Balboa Blvd').pc('91406').city('Lake Balboa') // switch to lives getter
console.log(pb.build)

