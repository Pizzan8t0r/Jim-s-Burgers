require('bootstrap');
const createEl = require("./domMethods");
const { createLoremIpsum, dateConverter } = require("./helpers");

$(document).ready(function() {
  if (window.location.href.indexOf("schedule") > -1) {

      const date = new Date();
      const d = date.getDate();
      const m = date.getMonth();
      const y = date.getFullYear();

      function onEventClick(calEvent) {
        const start = dateConverter(calEvent.start);
        localStorage.setItem("currentEvent", JSON.stringify({
            title: calEvent.title,
            subtitle: start,
            description: calEvent.description,
            image: calEvent.image
        }))
        
        window.location.href = "events.html"
      }

      const events = [
        {
            title: 'Burgers & Sandwiches',
            start: new Date(y, m+1, 20),
            description: `1/4 Lb. Hamburger, 1/4 Cheeseburger, Super Burger, Super Cheeseburger, Bacon Burger, Chili Burger, Junior Burger, Avocado Burger, Chicken Breast (Sandwich), Pastrami (Jim's Famous), Steak Sandwich, Turkey Sandwich, Grilled Cheese, Patty Melt, Bacon, Letuce & Tomato, Fish Sandwhich, Tuna Sandwich, Hot Dog, Chili Hot Dog, Corn Dog`,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        },
        {
            title: 'New Items',
            start: new Date(y, m+1, 20),
            description: `Club Sandwich Special, Chicken Breast Special, Chicken Strips Special, Cheese Quesadilla, Chicken Quesadilla, Carne Asada Quesadilla, Chicken Wings, DUI Fries`,
            image: "https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        },
        {
            title: 'Dinners (Served w/ Salad, French Fries, Onion, Dinner Roll & A Drink)',
            start: new Date(y, m+1, 20),
            description: `Chicken Dinner, Steak Dinner, Fish Dinner, Pastrami Dinner`,
            image: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
        
        },
        {
            title: 'Comida Mexicana',
            description: `Carne Asada Taco, Chicken Tacos, Al Pastor Tacos, Carne Asada Burrito, Al Pastor Burrito, Chicken Burrito, Wet Burrito, Bean Burrito, Taquitos`,
            start: new Date(y, m+1, 21),
            image: "https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80",
        },
        {
            title: 'Tortas',
            description: `Al Pastor, Carne Asada, Ham & Cheese, Chicken`,
            start: new Date(y, m+1, 22),
            image: "https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80",
        },
        {
            title: 'Desayunos Mexicanos (Served w/ Rice, Beans & Tortillas)',
            description: `Huevos a la Mexicana, Huevos Rancheros, Chorizo & Eggs, Chilaquiles, Nopales con Huevos`,
            start: new Date(y, m+1, 22),
            image: "https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80",
        },
        {
            title: 'Breakfast (Monday - Sunday: 7:00 AM-1:00 PM)',
            description: `Bacon & Eggs (Served w/ Hashbrowns, Toast & Jelly), Ham & Eggs (Served w/ Hashbrowns, Toast & Jelly), Sausage & Eggs (Served w/ Hashbrowns, Toast & Jelly), Steak & Eggs (Served w/ Hashbrowns, Toast & Jelly), Breakfast Burrito, (2) Pancakes, (3) Pancakes, French Toast`,
            start: new Date(y, m+1, 22),
            image: "https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80",
        },
        {
            title: 'Omelettes (Served w/ Hashbrowns, Toast & Jelly)',
            description: `Cheese Omelette, Veggie Omelette, Ham & Cheese, Denver Omelette, Chili Cheese Omelette, Meat Lover & Cheese Omelette, California Omelette`,
            start: new Date(y, m+1, 23),
            image: "https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80",
        },
        {
            title: 'Healthy & Delicious/ Salads & Extras',
            description: `Chicken Breast Plate, Turkey Plate, Steak Plate, Green Salad, Chef Salad, Tuna Salad, Chicken Salad, Carne Asada & Fries, French Fries, Chili Cheese Fries, D.U.I Fries, Onion Rings (Homemade daily)`,
            start: new Date(y, m+1, 23),
            image: "https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80",
        },
        ]

      const pageEl = document.querySelector("#page");

      function createCards(events) {
        const cards = events.map((event) => (
            createEl("div", {class: "card-body clickable", onClick: () => onEventClick(event)}, 
            createEl("h5", {class: "card-title"}, event.title || ""),
            createEl("p", {class: "card-text"}, event.description || createLoremIpsum()),
            createEl("hr")
            )
        ))
        return cards
      }
      
      const containerEl1 = createEl("div", {class: "container mt-5"}, 
      createEl("div", {class: "card mb-5"}, 
          createEl("h5", {class: "card-header"}, "Day 1"),
          ...createCards(events.slice(0,3))
      )
      )

      const containerEl2 = createEl("div", {class: "container"}, 
      createEl("div", {class: "card mb-5"}, 
          createEl("h5", {class: "card-header"}, "Day 2"),
          ...createCards(events.slice(3,6))
      )
      )

      const containerEl3 = createEl("div", {class: "container"}, 
      createEl("div", {class: "card mb-5"}, 
          createEl("h5", {class: "card-header"}, "Day 3"),
          ...createCards(events.slice(6,9))
      )
      )

      pageEl.appendChild(containerEl1);
      pageEl.appendChild(containerEl2);
      pageEl.appendChild(containerEl3);
  }
});