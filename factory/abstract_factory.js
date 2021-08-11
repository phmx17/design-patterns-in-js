const readline = require('readline')
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}) 

// abstract classes come into play when hierarchy is required
class HotDrink {
  // abstract class !!
  consume(){}
}
class Tea extends HotDrink {
  consume() {
    console.log('I am drinking tea now!');
  }  
}
class Coffee extends HotDrink {
  consume() {
    console.log('I am consuming Coffee now!');
  }
}
class HotDrinkFactory {
  prepare(amount) {}
}
class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`...boiling ${amount}ml of water and tossing tea bag into cup with lemon...`);
    return new Tea()
  }
}  
class CoffeeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`...grinding beans for ${amount}ml of coffee...`);
    return new Coffee()
  }
}
// make an enum
let AvailableDrinks = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory
})
class HotDrinkMachine {
  // constructor and interact() will replace makeDrink() switch
  constructor() {
    this.factories = {}
    for (let drink in AvailableDrinks) {  // for..in is for Objects
      this.factories[drink] = new AvailableDrinks[drink](); // create an instance from either factories as each value
    }
  }
  interact(consumer) {  // pass in a cb
    rl.question('Please specify drink and amount (e.g., tea 200):  ', input => {
      let parts = input.split(' ')
      let name = parts[0]
      let amount = parseInt(parts[1])
      let drink = this.factories[name].prepare(amount)  // calling prepare on factory instance
      rl.close() 
      consumer(drink)
    })
  }
  // this approach is ham-fisted at best
  // makeDrink(type) {
  //   switch(type) {
  //     case 'tea': 
  //       return new TeaFactory().prepare(200)
  //     case 'coffee':
  //       return new CoffeeFactory().prepare(50)
  //     default:
  //       throw new Error(`don't know how to make ${type}`)
  //   }
  // }
}
let machine = new HotDrinkMachine
// let drink = machine.makeDrink('coffee')
// drink.consume()
// rl.question('What drink would you like? ', (choice)=> {
//   let drink = machine.makeDrink(choice)
//   drink.consume()
//   rl.close()
// })
machine.interact((drink) => {
  drink.consume()
})
