console.log("---------------Echo Vehicle");
//understand extends

//~create parent Class
class Vehicle {
    //~create instances
    engine;
    brand;

    //~constructor
    constructor(engine, brand) {
        this.engine = engine;
        this.brand = brand;
    }
}

class Car extends Vehicle {
    //~create instances
    wheels;

    constructor(engine, brand, wheels) { //if we don't put
        super(engine, brand);
        this.wheels = wheels;
    }

}

const vehicle = new Vehicle();
const car = new Car("110cv", "Mustang", 4);

console.log(vehicle);
console.log(car);

