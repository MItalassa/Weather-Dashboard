// variables
var searchBtn = $("#search-form");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWSpeed = $("#wind-speed");

var BtnCities = $("#history");
var sCity =JSON.parse(localStorage.getItem("sCity")) || [];
var forecast = $("#forecast");
var forecastCard = "";

var now = dayjs();
var currentDate = now.format("DD/MM/YYYY");

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q='";
var apiKey = "55090d86c04441f690301775fb9e877e";


//event handler when user start city search
$("#search-form").on("submit", function (event) {
    event.preventDefault();
    const cityName = $("#search-input").val().trim();
    searchWeatherApi(cityName); // call getDataFromApi function
  });

// API call
