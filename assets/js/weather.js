
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
//past searched cities
function invokePastSearch(event) {
    var liEl = event.target;
    if (event.target.matches("li")) {
        city = liEl.textContent.trim();
        currentWeather(city);
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
        currentWeather(city);
    }

}
//clear history of searched cities
function clearHistory(event) {
    event.preventDefault();
    lookupCity = [];
    localStorage.removeItem("cityname");
    document.location.reload();

}
//buttons
$("#search-button").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);
$("#clear-history").on("click", clearHistory);
