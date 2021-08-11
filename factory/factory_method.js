// using static as factory methods

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  static get factory() {
    return new PointFactory
  }
} 

class PointFactory {
  /* static */newCartesianPoint(x, y) { // static makes these methods act like constructors; without static they are called from the getter in Point
    return new Point(x, y)
  }
  /* static */newPolarPoint(rho, theta) {
    return new Point (
      rho * Math.cos(theta),
      rho * Math.sin(theta)
    )  
  }
} 

// 2 options; p3 makes clear user should use the factory
let p = PointFactory.newCartesianPoint(5, 10) // these two require the static methods
let p2 = PointFactory.newPolarPoint(5, Math.PI/2)
let p3 = Point.factory.newPolarPoint(5, Math.PI/2) // this when calling the getter (.factory), however static must be removed 

console.log(p, p2);
