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
      displayWeather(data);
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

//function to display result API call
function displayWeather(data) {
    const weatherIcon = $(".weather-icon");
    const list = data.list;
  
    const iconCode = list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    $(".weather-icon").attr("src", iconUrl);
  
    todayWeather();
    forecastCards();

    function todayWeather() {
      var cityValue = data.city.name;
      var temp = data.list[0].main.temp;
      var humidity = data.list[0].main.humidity;
      var wind = data.list[0].wind.speed;
      var weathericon = data.list[0].weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weathericon}@2x.png`;
      var date = data.list[0].dt_txt;
  
      $(currentCity).text(cityValue + "(" + date + ")"); // create html image element and append URL Tto render icon
      $(currentTemperature).text(temp);
      $(currentWSpeed).text(wind + " MPH");
      $(currentHumidty).text(humidity + "%");
    }

    function forecastCards() {
        for (let i = 0; i < 5; i++) {
          var date = data.list[(i + 1) * 8 - 1].dt_txt;
          var icon = data.list[(i + 1) * 8 - 1].weather[0].icon;
          var fTemp = data.list[(i + 1) * 8 - 1].main.temp;
          var fHumidity = data.list[(i + 1) * 8 - 1].main.humidity;
          var iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          var forecastCard = createDiv(date, fTemp, fHumidity, iconUrl);
          forecast.append(forecastCard);
          function createDiv(date, fTemp, fHumidity, iconUrl) {
            return `<div class="col-sm-2 bg-primary forecast text-white ml-2 mb-3 p-2 mt-2 rounded">
                    <p>${date}</p>
                    <img src="${iconUrl}" class="card-img-top" alt="image">
                    <p>Temp:<span>${fTemp}</span></p>
                                <p>Humidity:<span>${fHumidity}</span></p>
                            </div>`;
          }
        }
      }
  }
  
  for (let i = 0; i < sCity.length; i++) {
    const cityName = sCity[i];
    createCityBtn(cityName);
}


