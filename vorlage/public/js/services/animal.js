// TODO: Step 1
//  - Place createAnimal() into a new file in 'js/services/animal.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Create class Animal; use 'new Animal(id, name)' instead of 'createAnimal(id, name)'
//  - Intention: Create a typed model object which represents the base class for Lion's and Panda's.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class Animal.
class Animal {
  id;
  isDead = false;
  isEatable = false;
  name;
  compatibleFood = [];
  get foodRequired() {
    return (
      !this.isDead && (this.nextFeedAt == null || this.nextFeedAt < +new Date())
    );
  }

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  toString() {
    return `${this.isDead ? 'RIP ' : ''}${this.name}${
      this.foodRequired ? ' [hungry]' : ''
    }`;
  }

  eaten() {
    this.isDead = true;
  }

  feedInternal(eatable, callback) {
    for (const foodForAnimal of this.compatibleFood) {
      let foodFound = eatable.food.findByName(foodForAnimal.name);

      if (foodFound && foodFound.amount >= foodForAnimal.amount) {
        this.setNextFeedAt(foodForAnimal.timeToNextFood, callback);
        foodFound.amount -= foodForAnimal.amount;
        return true;
      }
    }
    return false;
  }

  feed(eatable, callback) {
    return this.feedInternal(eatable, callback);
  }

  setNextFeedAt(timeToNextFood, callback) {
    const fulledUpTime = Convert.toMilliSeconds(timeToNextFood);
    this.nextFeedAt = +new Date() + fulledUpTime;

    delay(fulledUpTime + 100, callback);
  }
}
