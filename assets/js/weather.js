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
        alert("Please enter a city");
    }
   
};

var searchCity = function (city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

     //make a get request to url
     fetch(apiURL)
     .then(function (response) {
         //request was successful
         if (response.ok) {
             console.log(response);
             response.json().then(function (data) {
                 console.log(data);
                 getWeather(data);

             });
             /////need to make modals instead
         } else {
             alert("Error: " + response.statusText);
             getCity();
         }
     })
     .catch(function (error) {
         alert("Unable to connect to OpenWeather");
     });
};

// var getWeather = function
    

    citySearchEl.addEventListener("submit", formSubmitHandler);

