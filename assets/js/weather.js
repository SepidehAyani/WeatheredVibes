var searchBtnEl = document.querySelector("#search-btn");
var cityInputEl = document.querySelector("#city-input");


var citySearchEl = document.querySelector("#search-input");
var searchHistory = [];


var city = [];
var apiKey = "17046fe6ac243c48ab15eff676d280e3";
var UofM = [-93.22770, 44.974 ]
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

    saveSearch(city);
    

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
    currentWeatherEl.innerHTML = "";
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

// save to local storage 
function saveSearch (city) {
    var searchTerm = city;
    searchHistory.push(searchTerm);
    localStorage.setItem("cityname", JSON.stringify(searchHistory));
    console.log(searchTerm);
    addToList(city);
}

//add searched city to a list
function addToList(city) {
    var listEl = $("<li>" + city + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", city.toUpperCase());
    $(".list-group").append(listEl);
    console.log(city);
}

//past searched cities
function invokePastSearch(event) {
    var liEl = event.target;
    if (event.target.matches("li")) {
        city = liEl.textContent.trim();
        searchCity(city);
    }
}

//loading last searched city
function loadlastCity() {
    $("ul").empty();
    var sCity = JSON.parse(localStorage.getItem("cityname"));
    if (sCity !== null) {
        sCity = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < sCity.length; i++) {
            addToList(sCity[i]);
        }
        city = sCity[i - 1];
        searchCity(city);
    }
}
//clear history of searched cities
function clearHistory(event) {
    event.preventDefault();
    localStorage.removeItem("cityname");
    document.location.reload();
}


$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);
$("#clear-history").on("click", clearHistory);
citySearchEl.addEventListener("submit", formSubmitHandler);
    
//initial map loading
var tomTomMap;
tomTomMap = tt.map({
    key:"PP8FnJ4PZDRGc7Lc4pCjGJAO6GYbtcwH",
    container: "map",
    center: UofM,
    zoom: 7.5
});
//map search
var handelResults = function(result) {
    console.log(result);
}
var search = function() {
    tt.services.fuzzySearch({key:"PP8FnJ4PZDRGc7Lc4pCjGJAO6GYbtcwH", query: cityInputEl })
        .go()
        .then(function centerAndZoom(response) {
            tomTomMap.flyTo({ center: response.results[0].position, zoom: 7 });
        })
        .catch(function(error) {
            alert("Could not find location (" + cityInputEl + "). " + error.message);

        });
};
       
// weather layers
// 2 second delay added
setTimeout(function() {
    tomTomMap.addSource("owm_source", {
    type: "raster",
    tiles: ["https://tile.openweathermap.org/map/layer/{z}/{x}/{y}.png?appid=09f252a8b9d0c9071a537e314433b7e1"],
        tileSize: 10000,
        minZoom: 0,
        maxZoom: 12,
        attribution: "openWeatherMapAttribution",
    });
    tomTomMap.addLayer({
        'id': 'owm_layer',
        'type': 'raster',
        'source': 'owm_source',
        'layout': { 'visibility': 'visible' }
    });
}, 2500);
        
currentWeatherData( {
    appid: "https://tile.openweathermap.org/map/layer/z/x/y.png?appid=09f252a8b9d0c9071a537e314433b7e1",
    lat: x,
    lon: y,
    units: 'imperial'
})
.go()
.then(function(response) {
    console.log(response.weather[0].description);
})
.catch(function(error) {
    console.log(error);
});