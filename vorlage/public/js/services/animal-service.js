// TODO: Step 1
//  - Place animalService constant into a new file in 'js/services/animal-service.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Create class AnimalService; instantiate a const animalService = new AnimalService(); and use it in your controller.
// TODO: Step 3
//  - Use ES2015 module syntax: Export object animalService and import dependencies (e.g. Lion / Panda).

class AnimalService {
  animals = [];
  addLion(name) {
    const lion = createLion(this.animals.length, name);
    this.animals.push(lion);
    return lion;
  }

  addPanda(name) {
    const panda = createPanda(this.animals.length, name);
    this.animals.push(panda);
    return panda;
  }
}
