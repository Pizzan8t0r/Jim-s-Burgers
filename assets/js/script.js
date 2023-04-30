require('bootstrap');
const img1 = require("../../assets/img/grilledchicken.jpg");
const img2 = require("../../assets/img/asadaplate.jpg");

$(document).ready(function() {
  // First image is hard coded in index.html
  const carouselSlides = [
    {
      title: "The Original Jim's Burgers #1",
      subtitle: "Check out our Menu!",
      img: img1,
      btnText: "Menu",
      btnUrl: "schedule.html"
    },
    {
      title: "Cocinamos con Cariño!",
      subtitle: "We Cook with Love!",
      img: img2,
      btnText: "About Us",
      btnUrl: "tickets.html"
    },
  ];
  
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