import Animal from "./animal.js";

const parentObject = {
    name: 'Peter',
    greet: function Greet() {
        console.log(`Hello from the ${this.name}!`);
    }
};
//create a new object with a specified prototype
const childObject = Object.create(parentObject);  
childObject.greet(); // Outputs: "Hello from the parent object!"

const animal1 = new Animal('cat');
const animal2 = new Animal('pig');
//Animal.prototype.constructor = Object; only for reference purpose
animal1.sound(); //call Animal.prototype.speak, which is shared among all Animal objects
animal2.sound();

// Define a constructor function for Dog that inherits from Animal
function Dog(name, breed) {
    Animal.call(this, name); // Animal's 'this' is Dog's 'this';
    this.breed = breed;
}

// Dog inherit animal prototype.
Dog.prototype = Object.create(Animal.prototype);//input parm needs to be an object
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
/*The constructor data property of an Object instance returns a reference to the constructor function 
that created the instance object. Note that the value of this property is a reference to the function itself, 
not a string containing the function's name.
*/
//Without this line, Dog.prototype.constructor would point to Animal
//Setting Dog.prototype.constructor = Dog is important for maintaining the correct reference to the constructor function.
Dog.prototype.constructor = Dog; //only for reference purpose

// Add a method to the Dog prototype
Dog.prototype.bark = function () {
    console.log(`${this.name} barks.`);
};

// Create an instance of Dog
const myDog = new Dog('Rex', 'German Shepherd');

// Access methods from both levels of the prototype chain
myDog.sound(); // Output: Rex makes a noise.
myDog.bark();  // Output: Rex barks.
