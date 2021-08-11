// open closed principle = Objects are open for extension but closed for modification
// filtering products by criteria; adding more criteria like 'size' by adding another method is equal to modification which is bad.
// imagine 3 criteria with all combinations like && and || -> state space explosion
// extension means inheritance

// examples of a specifications
// this allows extension without modifying existing class
// later an instance of a specification will be fed as a criteria into the filter method, which will execute isSatisfied(), which returns a boolean
class ColorSpecification {
  constructor(color) {
    this.color = color
  }
  isSatisfied(item) { // this is the crucial method
    return item.color === this.color
  }
} 
class SizeSpecification {
  constructor(size) {
    this.size = size
  }
  isSatisfied(item) {
    return item.size === this.size
  }
} 

let Color = Object.freeze({ // since js does not have enums we will use freeze
  red: 'red',
  green: 'green',
  blue: 'blue '
})
let Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large '
})

class Product {
  constructor(name, color, size){
    this.name = name
    this.color = color
    this.size = size
  }

}
class ProductFilter { // bad  
  filterByColor(products, color) {
    products.filter(p => p.color === color)
  }
  // imagine 3 criteria with all combinations like && and || -> state space explosion
  // -> too many new methods; instead use specifications as in BetterFilter
}
class BetterFilter {  // good
  filter(items, spec) {
    return items.filter(item => spec.isSatisfied(item))
  }
}

class AndSpecification {
  constructor(...specs) {
    this.specs = specs
  }
  isSatisfied(item) {
    let passedSpecs = this.specs.every(spec => spec.isSatisfied(item))  // crucial method here is .every()
    console.log(`passed specs: ${passedSpecs}`);
    return passedSpecs
  }
}

class OrSpecification {
  constructor(...specs) {
    this.specs = specs
  }
  isSatisfied(item) {
    return this.specs.some(spec => spec.isSatisfied(item))  // .some() is the hero here
  }
}

let apple = new Product('Apple', Color.red, Size.small)
let guitar = new Product('Guitar', Color.red, Size.medium)
let hamper = new Product('Hamper', Color.blue, Size.large)
let couch = new Product('Couch', Color.blue, Size.large)
let products = [apple, guitar, hamper, couch]

// using && for specs
let spec = new AndSpecification(
  new ColorSpecification(Color.blue),
  new SizeSpecification(Size.large)
)
// using || for specs
let spec2 = new OrSpecification(
  // new ColorSpecification(Color.red),
  new SizeSpecification(Size.small),
  new SizeSpecification(Size.medium)
)
let bf = new BetterFilter()
for (let p of bf.filter(products, spec2)) {
  console.log(`Product: ${p.name}`)
}

