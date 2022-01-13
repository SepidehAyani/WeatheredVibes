var searchBtnEl = document.querySelector("#search-btn");
var cityInputEl = document.querySelector("#city-input");
var citySearchEl = document.querySelector("#search-input");
var searchHistory = [];
var city = [];
var apiKey = "17046fe6ac243c48ab15eff676d280e3";
var UofM = [-93.22770, 44.974]

var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();
    //get value from input element
    var city = cityInputEl.value.trim();
    if (city) {
        searchCity(city);
        displayNews();
        //clear old content
        cityInputEl.value = "";
    } else {
        console.log("Please enter a city");
    }
    saveSearch(city);
}

// search a city
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
                    weatherMap(data);
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

// display news data
function displayNews() {
    var newsUrl = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=89c056c784084770b1d730594d6a1e6c';
    var newsRequest = new Request(newsUrl);
    const newsResponsePromise = fetch(newsRequest);

    newsResponsePromise.then(function (response) {
        const newsDataPromise = response.json();

        newsDataPromise.then(function (newsDataJson) {
            const articleIndex = Math.floor(Math.random() * newsDataJson.articles.length);
            const firstNewsItem = newsDataJson.articles[articleIndex];
            console.log(firstNewsItem);

            var currentNewsEl = document.querySelector("#news-box");
            currentNewsEl.innerHTML = "";

            var newsTitleEl = document.createElement("div");
            newsTitleEl.textContent = "Title: " + firstNewsItem.title;

            var newsContentEl = document.createElement("div");
            newsContentEl.textContent = "Content: " + firstNewsItem.content;

            var newsAuthorEl = document.createElement("div");
            newsAuthorEl.textContent = "Author: " + firstNewsItem.author;

            var newsPublishedAtEl = document.createElement("div");
            newsPublishedAtEl.textContent = "Published At: " + firstNewsItem.publishedAt;

            var newsUrl = document.createElement("a");
            newsUrl.textContent = 'Read More Here';
            newsUrl.href = firstNewsItem.url;
            newsUrl.target = "_blank";

            currentNewsEl.appendChild(newsTitleEl);
            currentNewsEl.appendChild(newsContentEl);
            currentNewsEl.appendChild(newsAuthorEl);
            currentNewsEl.appendChild(newsPublishedAtEl);
            currentNewsEl.appendChild(newsUrl);
        })
    })
}

// this will go into a different feature
var displayWeather = function (data) {
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

//save to local storage 
function saveSearch(city) {
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
var weatherMap = function (data) {
    var apiKey = '976604eaf8a4b2248a8f6d76062658a9';
    var apiUrl = 'http://maps.openweathermap.org/maps/2.0/weather/PR0/8/' + longitude + '/' + latitude + '?appid=' + apiKey;
    var longitude = data.coord.lon;
    var latitude = data.coord.lat;

    fetch(apiUrl)
        .then(function(response) {

        })
        .catch(function(error) {
            console.log("Unable to connect to Open Weather Map");
        });

    console.log(longitude);
    console.log(latitude);

    var map = L.map('map',{minZoom: 3}).setView([0,0], 3);

    L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=4pATqKTD2AGLk1KXutiy', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);
    $("map").appendTo("#map");
};

weatherMap();