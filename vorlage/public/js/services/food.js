// TODO: Step 1
//  - Place createFood() into a new file in 'js/services/food.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Create class Food; use 'new Food(id, name ...)' instead of 'createFood(id, name ...)'
//  - Intention: Create a typed model object (which may contain logic) instead of a generic JSON structure.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class Food.

function createFood(id, name, amount, amountPerDelivery, isMeet) {
  return {
    id,
    name: name || 'unknown',
    amount: amount || 0,
    amountPerDelivery: amountPerDelivery || 1,
    isMeet: Boolean(isMeet),
    isOrderPending: false,

    toJSON() {
      return {
        id: this.id,
        name: this.name,
        amount: this.amount,
        amountPerDelivery: this.amountPerDelivery,
        isMeet: this.isMeet,
      };
    },
  };
}
