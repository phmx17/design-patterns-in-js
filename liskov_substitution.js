// this is a principle
// having class square extend from rectangle will lead to unexpected behaviour and is bad
// 

class Rectangle {
  constructor(width, height) {
    this.width = width
    this.height = height
  }
  get area() {
    return this.width * this.height
  }
  toString() {
    return `Width: ${this.width} x Height: ${this.height}`
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size)
  }
}
let rec = new Rectangle(10, 5)
// console.log(rec.area())
console.log(rec.toString())
let sq = new Square(6)
console.log(sq.toString());
sq.width = 10 // this is now messing with the integrity of the params in the square class
console.log(sq.toString());


