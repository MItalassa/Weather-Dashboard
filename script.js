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
function searchWeatherApi(cityName) {
    //Clear previous data
  forecast.empty();

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=55090d86c04441f690301775fb9e877e&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      mainCardRender(data);
      if (!sCity.includes(cityName)){
      historySearch(cityName);
      createCityBtn(cityName);
    } 

    })
    .catch(function (error) {
      console.error("Error data:", error);
    });
}

//save search input in localStorage
function historySearch(cityName) {
    sCity.push(cityName);
    localStorage.setItem("sCity", JSON.stringify(sCity));
  }

//create searched city button
function createCityBtn(cityName) {
    let searchedCity= $("<button>").text(cityName);
    BtnCities.append(searchedCity);
    searchedCity.on('click', function(event){
        getDataFromApi(cityName)
    })
}


