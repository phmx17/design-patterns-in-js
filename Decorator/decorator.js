class Shape {
  constructor(shape) {
    this.shape = shape
  }
  toString() {
    return this.shape
  }
}

class Circle extends Shape {
  constructor(radius=0) {
    super()
    this.radius = radius
  }
  resize(factor) {
    return this.radius *= factor;
  }

  toString() {
    return `This circle has a size of ${this.radius}.`
  }

}

class ColoredShape extends Shape {
  constructor(shape, color) {
    super() // passes shape into the Shape constructor and now shape has access to Shape properties.
    this.color = color
    this.shape = shape
  }

  toString() {
    return `${this.shape.toString()} is of ` +
    `color ${this.color}`
  }
}
class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super()
    this.shape = shape
    this.transparency = transparency
  }
  toString() {
    return `${this.shape.toString()} has ` + 
    `a transparency of ${this.transparency * 100}%`
  }
}

square = new Shape('square')
console.log(square.toString())

coloredSquare = new ColoredShape('square', 'purple')
console.log(coloredSquare.toString());

transparentSquare = new TransparentShape('square', 0.45)
console.log(transparentSquare.toString());

circle = new Circle(2)
circle.resize(3)
console.log(circle.toString());

