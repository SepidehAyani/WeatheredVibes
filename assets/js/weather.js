var searchBtnEl = document.querySelector("#search-btn");
var cityInputEl = document.querySelector("#city-input");
var citySearchEl= document.querySelector("#city-search");
var city = [];

var apiKey = "17046fe6ac243c48ab15eff676d280e3";


var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var city = cityInputEl.value.trim();


    if (city) {
        searchCity(city);

        //clear old content
        cityInputEl.value = "";

    } else {
        console.log("Please enter a city");  
       
}
}

var searchCity = function (city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

     //make a get request to url
     fetch(apiURL)
     .then(function (response) {
         //request was successful
         if (response.ok) {
             console.log(response);
             response.json().then(function (data) {
                 console.log(data);
                 displayWeather(data);

             });
             /////need to make modals instead
         } else {
             alert("Error: " + response.statusText);
         }
     })
     .catch(function (error) {
         alert("Unable to connect to OpenWeather");
     });
};


//// this will go into a different feature
var displayWeather = function (data) {
    
var  weather = data.weather
console.log(weather);

console.log(data.main.temp);


    
};
 



// document.addEventListener('DOMContentLoaded', () => {
//     // Functions to open and close a modal
//     function openModal($el) {
//       $el.classList.add('is-active');
//     }
  
//     function closeModal($el) {
//       $el.classList.remove('is-active');
//     }
  
//     function closeAllModals() {
//       (document.querySelectorAll('.modal') || []).forEach(($modal) => {
//         closeModal($modal);
//       });
//     }
  
//     // Add a click event on buttons to open a specific modal
//     (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
//       const modal = $trigger.dataset.target;
//       const $target = document.getElementById(modal);
//       console.log($target);
  
//       $trigger.addEventListener('click', () => {
//         openModal($target);
//       });
//     });
  
//     // Add a click event on various child elements to close the parent modal
//     (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
//       const $target = $close.closest('.modal');
  
//       $close.addEventListener('click', () => {
//         closeModal($target);
//       });
//     });
  
//     // Add a keyboard event to close all modals
//     document.addEventListener('keydown', (event) => {
//       const e = event || window.event;
  
//       if (e.keyCode === 27) { // Escape key
//         closeAllModals();
//       }
//     });
//   });



  

    citySearchEl.addEventListener("submit", formSubmitHandler);
    ////consider putting modal function under here....... (bulma or jquery)

