// Define a constructor function for Animal
function Animal(name) {
    this.name = name;
}
//function Animal is an object, prototype is its property
// Add a method to the Animal prototype, default prototype is object
Animal.prototype.sound = function () {
    console.log(`${this.name} makes a noise.`);
};

export default Animal;