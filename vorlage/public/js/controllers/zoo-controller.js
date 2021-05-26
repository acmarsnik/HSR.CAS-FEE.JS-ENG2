// TODO: Step 1
//  - Move zoo-controller.js to another location at 'js/controllers/zoo-controller.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Analyze code: Is there any long method inside zoo-controller? How could you refactor that lines of code?
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Optional: Wrap features of zoo-controller into a class.
//  - Intention: ZooController instance controls UI logic and forwards events to corresponding business services.
// TODO: Step 3
//  - Import required dependencies by using ES2015 module syntax.

class ZooController {
  animalService;
  foodTemplateCompiled = Handlebars.compile(
    document.getElementById('food-list-template').innerHTML,
  );
  animalTemplateCompiled = Handlebars.compile(
    document.getElementById('animal-list-template').innerHTML,
  );

  newAnimalName = document.getElementById('new-animal-name');
  newAnimalForm = document.getElementById('new-animal-form');
  animalContainer = document.getElementById('animal-container');
  foodContainer = document.getElementById('food-container');

  constructor(animalsService) {
    this.animalService = animalsService;
  }

  showAnimals() {
    this.animalContainer.innerHTML = this.animalTemplateCompiled(
      { animals: this.animalService.animals },
      { allowProtoPropertiesByDefault: true },
    );
  }

  showFood() {
    this.foodContainer.innerHTML = this.foodTemplateCompiled(
      { food: foodService.food },
      { allowProtoPropertiesByDefault: true },
    );
  }

  initEventHandlers() {
    this.foodContainer.addEventListener('click', (event) => {
      const foodId = Number(event.target.dataset.foodId);

      if (!isNaN(foodId)) {
        event.target.setAttribute('disabled', true);

        foodService.orderFoodById(foodId);
        this.showFood();
        event.target.removeAttribute('disabled');
      }
    });

    this.animalContainer.addEventListener('click', (event) => {
      const animalId = Number(event.target.dataset.animalId);

      if (!isNaN(animalId)) {
        const feedingSucceeded = this.animalService.animals[animalId].feed(
          { food: foodService.food, animals: this.animalService.animals },
          () => this.renderZooView(),
        );

        if (feedingSucceeded) {
          this.renderZooView();
        } else {
          event.target.value = 'Feed (No foood!)';
        }
      }
    });

    this.newAnimalForm.addEventListener('submit', (event) => {
      const createAction = document.activeElement.dataset.action;
      if (document.activeElement && this.animalService[createAction]) {
        this.animalService[createAction](this.newAnimalName.value);
        this.showAnimals();
      }
      event.preventDefault();
    });
  }

  renderZooView() {
    this.showAnimals();
    this.showFood();
  }

  // initialize UI
  initialize() {
    this.initEventHandlers();
    foodService.loadData();
    this.renderZooView();
  }
}

new ZooController(new AnimalService()).initialize();
