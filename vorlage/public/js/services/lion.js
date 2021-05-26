// TODO: Step 1
//  - Place createLion() into a new file in 'js/services/lion.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Extract class Lion, derive from Animal (class Lion extends Animal)
//  - Intention: Provide animal specialization with Lion behaviour
// TODO: Step 3
//  - Use ES2015 module syntax: Export class Lion and import dependencies.
function createLion(id, name) {
  const animal = createAnimal(id, `Lion: '${name}'`); // TODO: Step 2 - call base constructor: super(id, name)

  // override behaviour of generic animal (place as members inside Lion class)
  animal.compatibleFood = [
    { name: 'beef', amount: 5, timeToNextFood: 5 },
    { name: 'chicken', amount: 10, timeToNextFood: 1 },
  ];

  animal.feed = function (eatable, callback) {
    if (!this.feedInternal(eatable, callback)) {
      const panda = eatable.animals.filter((p) => {
        return p.isEatable && !p.isDead;
      });
      if (panda[0]) {
        this.setNextFeedAt(24, callback);
        panda[0].eaten();
        return true;
      }
      return false;
    }
    return true;
  };

  return animal;
}
