// https://openweathermap.org/img/w/' + weather[0].icon + '.png

// for example
//https://openweathermap.org/img/w/04n.png

//TODO: when user search for a city in the input, call weather API  and show results in th html
        // 1. add event listener to form submit
        //2. get the user input value
        // 3.build a API query URL based on the user input value
        // 4. call the API and render the result in the HTML (CREATE A FUNCTION THAT YOU CAN CALL HERE AND LATER AS WELL)
//when user search for a city, store it in local storage

//on initial page load the search history and show it as a list in the html
          // ...... 
// 3.build a API query URL based on the user input value
//var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=55090d86c04441f690301775fb9e877e";
var now = dayjs();
var currentDate = now.format('DD/MM/YYYY');

$("#search-form").on("submit",function(event){
    event.preventDefault()
 //    console.log(event.target)
  var cityName = $("#search-input").val()
 getDataFromApi(cityName);
 saveToLocalStorage(cityName);
 });
 
 var cardDiv = $("<div>")
 cardDiv.attr('class', 'card-body')
 cardDiv.text('Hello there')
 $('#forecast').append(cardDiv)
 
 
 
 function getDataFromApi(cityName){
     fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName +'&appid=55090d86c04441f690301775fb9e877e&units=metric')
     .then(function(response) {
         return response.json();
     })
     .then(function(data) {
         console.log(data);
     })
 }
 /* <div class="card-body">
           <h5 class="card-title">Card title</h5>
           <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         </div> */


        // 4. call the API and render the result in the HTML
            //get the city name and show it in the main weather forecast card
            //get the first weather forecast item and get the following values: date, temperature (&units=metrics if you want it in C), wind speed, humidity, icon)
            //render these values to the main card
            //loop through all weathers array and get the following values: date, temperature, wind speed, humidity, icon
//when user click on the search history, call weather API and show the result in the HTML

//css
