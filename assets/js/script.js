require("bootstrap");
$(document).ready(function() {
  function createEl(htmlString, attrs, ...children) {
    if (typeof htmlString !== "string") {
      throw Error("Argument 'htmlString' is required and must be a string");
    }
  
    const el = document.createElement(htmlString);
  
    if (typeof attrs === "object") {
      for (let key in attrs) {
        if (key.substring(0, 2) === "on") {
          el.addEventListener(key.substring(2).toLowerCase(), attrs[key]);
        } else {
          el.setAttribute(key, attrs[key]);
        }
      }
    }
  
    children.forEach(function(child) {
      let node;
  
      if (child.constructor.name.includes("Element")) {
        node = child;
      } else {
        node = document.createTextNode(child);
      }
  
      el.appendChild(node);
    });
  
    return el;
  };

  function createLoremIpsum(numWords = 50) {
    const loremIpsum = "You can check out our other page for more information like directions and a digital photo gallery. 'Barriga llena.' 'Corazon Contento' 'Full Stomach.' 'Happy Heart' -Since 1958 "
    const result = loremIpsum.split(/\s+/).slice(0,numWords).join(" ");
    return result;
  };

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
        createEl("h5", {class: "card-header"}, ""),
        ...createCards(events.slice(0,3))
    )
    )

    const containerEl2 = createEl("div", {class: "container"}, 
    createEl("div", {class: "card mb-5"}, 
        createEl("h5", {class: "card-header"}, ""),
        ...createCards(events.slice(3,6))
    )
    )

    const containerEl3 = createEl("div", {class: "container"}, 
    createEl("div", {class: "card mb-5"}, 
        createEl("h5", {class: "card-header"}, ""),
        ...createCards(events.slice(6,9))
    )
    )

    pageEl.appendChild(containerEl1);
    pageEl.appendChild(containerEl2);
    pageEl.appendChild(containerEl3);
  }

  if (window.location.href.indexOf("event") > -1) {
    const currentEvent = JSON.parse(localStorage.getItem("currentEvent")) || {
        title: "We Cook With Love!",
        subtitle: "",
        description: ""
    };

    const pageEl = document.querySelector("#page");
    
    const containerEl = createEl("div", {class: "container"},
      createEl("div", {class: "card mb-3"}, 
        createEl("img", {class: "card-img-top", style: "width: 5px", src: currentEvent.image || "https://via.placeholder.com/350x150"}),
        createEl("div", {class: "card-body"}, 
          createEl("h1", {class: "card-title"}, currentEvent.title || ""),
          createEl("h2", {class: "text-muted"}, currentEvent.subtitle || ""),
          createEl("p", {class: "card-text mt-3"}, currentEvent.description || createLoremIpsum(100)),
          createEl("a", {class: "btn btn-danger", href: "https://jimsburgers.com"}, "Jim's Burgers")
        )
      ),
      
    )
    pageEl.appendChild(containerEl)
  }

  dateConverter = function(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const result =  month + ' ' + date + ', ' + year 
    return result;
  };

  if (window.location.href.indexOf("tickets") > -1) {

    const purchaseBtn = document.getElementById("purchaseBtn");
    const purchaseEmail = document.getElementById("purchaseEmail");
    const modalEl = document.querySelector(".modal-content");
    const modalBodyEl = document.querySelector(".modal-body");
    const modalFooterEl = document.querySelector(".modal-footer");


    function purchaseTicket () {

      modalEl.removeChild(modalBodyEl)
      modalEl.removeChild(modalFooterEl)

      modalEl.append(createEl("div", {class: "modal-body"},
        createEl("h5", {class: "modal-title"}, 
        `Thanks for the inquiry! We will send an email to ${purchaseEmail.value}!`
        ),
      ))
      
    }
    purchaseBtn.addEventListener("click", purchaseTicket);
  }
  // First image is hard coded in index.html
  const carouselSlides = [
    {
      title: "The Original Jim's Burgers #1",
      subtitle: "Check out our Menu!",
      img: "./assets/img/grilledchicken.jpg",
      btnText: "Menu",
      btnUrl: "schedule.html"
    },
    {
      title: "Cocinamos con Cariño!",
      subtitle: "We Cook with Love!",
      img: "./assets/img/asadaplate.jpg",
      btnText: "About Us",
      btnUrl: "tickets.html"
    },
  ]

  carouselSlides.forEach((slide, i) => {
    $('.carousel-inner').append(`
  <div class="carousel-item fullscreen-carousel" style="background-image: url('${slide.img}')">
    <div class="d-flex h-100 align-items-center justify-content-center carousel-caption">
        <div class="container">
          <div class="row align-items-center justify-content-center">
              <h2 class="display-4 mb-2">${slide.title}</h2>
          </div>
          <div class="row align-items-center justify-content-center"> 
            <h3>${slide.subtitle}</h3>
          </div>
          <div class=" mt-4 row align-items-center justify-content-center"> 
            <a class="btn btn-primary" href="${slide.btnUrl}">
                ${slide.btnText}
            </a>
          </div>
        </div>
    </div>
  </div>`)
  })
});