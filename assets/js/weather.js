
//variables
var city = "";
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTempe = $("#temperature");
var currentHumidty = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");
var lookupCity = [];

//seach the available cities
function findACity(c) {
    for (var i = 0; i < lookupCity.length; i++) {
        if (c.toUpperCase() === lookupCity[i]) {
            return -1;
        }
    }
    return 1;
}
// api key
var APIKey = "069076e5d1f125b294df450d7c89ea92";

//current weather
function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = searchCity.val().trim();
        currentWeather(city);
    }
    saveSearch(city);
    
}

//using openWeatherMap data to access the weather directory with the given API to get the temp, wind speed, humidity and uv index
function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        //weather icon
        var weathericon = response.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        //date
        var date = new Date(response.dt * 1000).toLocaleDateString();
        $(currentCity).html(response.name + "(" + date + ")" + "<img src=" + iconurl + ">");
        //temp
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTempe).html((tempF).toFixed(2) + "&#8457");
        $(currentHumidty).html(response.main.humidity + "%");
        //wind speed
        var ws = response.wind.speed;
        var windsmph = (ws * 2.237).toFixed(1);
        $(currentWindSpeed).html(windsmph + "MPH");
        uvIndex(response.coord.lon, response.coord.lat);
        if (response.cod == 200) {
            lookupCity = JSON.parse(localStorage.getItem("cityname"));
            console.log(lookupCity);
            if (lookupCity == null) {
                lookupCity = [];
                lookupCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname", JSON.stringify(lookupCity));
                addToList(city);
            }
            else {
                if (findACity(city) > 0) {
                    lookupCity.push(city.toUpperCase());
                    localStorage.setItem("cityname", JSON.stringify(lookupCity));
                    addToList(city);
                }
            }
<<<<<<< HEAD
        })
        .catch(function (error) {
            console.log("Unable to connect to OpenWeather");
        });
};

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

=======
        }

    });
}

//uv-index response.
function uvIndex(ln, lt) {
    var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lt + "&lon=" + ln;
    $.ajax({
        url: uvqURL,
        method: "GET"
    }).then(function (response) {
        $(currentUvindex).html(response.value);
    });
}

//add searched city to a list
function addToList(c) {
    var listEl = $("<li>" + c + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".list-group").append(listEl);
}
>>>>>>> a2e6163 (fixed the local storage, changed the formatting and styling, introduce music api to work on it further)
//past searched cities
function invokePastSearch(event) {
    var liEl = event.target;
    if (event.target.matches("li")) {
        city = liEl.textContent.trim();
<<<<<<< HEAD
        searchCity(city);
=======
        currentWeather(city);
>>>>>>> a2e6163 (fixed the local storage, changed the formatting and styling, introduce music api to work on it further)
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
<<<<<<< HEAD
        searchCity(city);
    }
=======
        currentWeather(city);
    }

>>>>>>> a2e6163 (fixed the local storage, changed the formatting and styling, introduce music api to work on it further)
}
//clear history of searched cities
function clearHistory(event) {
    event.preventDefault();
<<<<<<< HEAD
    localStorage.removeItem("cityname");
    document.location.reload();
}


$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);
$("#clear-history").on("click", clearHistory);
citySearchEl.addEventListener("submit", formSubmitHandler);
    ////consider putting modal function under here....... (bulma or jquery)


=======
    lookupCity = [];
    localStorage.removeItem("cityname");
    document.location.reload();

}
//buttons
$("#search-button").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);
$("#clear-history").on("click", clearHistory);
>>>>>>> a2e6163 (fixed the local storage, changed the formatting and styling, introduce music api to work on it further)
