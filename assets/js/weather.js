var searchBtnEl = document.querySelector("#search-btn");
var cityInputEl = document.querySelector("#city-input");



var formSubmitHandler = function (event) {
// prevent page from refreshing
event.preventDefault();


};

searchBtnEl.addEventListener("submit", formSubmitHandler);

