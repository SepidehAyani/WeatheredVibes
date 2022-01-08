var searchBtnEl = document.querySelector("#search-btn");
var cityInputEl = document.querySelector("#city-input");
var citySearchEl= document.querySelector("#search-input");

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
             console.log("Error: " + response.statusText);
         }
     })
     .catch(function (error) {
         console.log("Unable to connect to OpenWeather");
     });
};


//// this will go into a different feature
var displayWeather = function (data, city) {
console.log(data.main); 
console.log(data.dt); //date
console.log(data.main.temp); ///temp
console.log(data.weather);
console.log(data.wind.speed);//wind speed
console.log(data.main.humidity); //humidity
console.log(data.weather[0].main);//current condtions

console.log(data.name);///city name

var dt = new Date(data.dt * 1000);
console.log(dt.toDateString());



var currentWeatherEl = document.querySelector("#weather");
currentWeatherEl.innerHTML= "";
var cityDateEl = document.createElement("ul");
cityDateEl.textContent = data.name + " " + dt;

var tempEl = document.createElement("ul");
tempEl.textContent = "Current Temp: " + data.main.temp + " \u00B0F";

var currentConditionsEl = document.createElement("ul");
currentConditionsEl.textContent = data.weather[0].main;

var windEl = document.createElement("ul");
windEl.textContent = "Wind Speed: " + data.wind.speed + " m/s";

var humidityEl = document.createElement("ul");
humidityEl.textContent = "Humidity: " + data.main.humidity;



currentWeatherEl.appendChild(cityDateEl);
currentWeatherEl.appendChild(tempEl);
currentWeatherEl.appendChild(currentConditionsEl);
currentWeatherEl.appendChild(windEl);
currentWeatherEl.appendChild(humidityEl);


    
};
 




    citySearchEl.addEventListener("submit", formSubmitHandler);
    ////consider putting modal function under here....... (bulma or jquery)

