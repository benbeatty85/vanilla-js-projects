(function() {
var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
var DARKSKY_API_KEY = '990d09b1cfd3ab9d6820c3c4218e5396';
var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

var GOOGLE_MAPS_API_KEY = 'AIzaSyAeDzNw1fhHS2JpHCurBBiScWZ6cIrR4jI';
var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

// This function returns a promise that will resolve with an object of lat/lng coordinates
function getCoordinatesForCity(cityName) {
  // This is an ES6 template string, much better than verbose string concatenation...
  var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

  return (
    fetch(url) // Returns a promise for a Response
    .then(response => response.json()) // Returns a promise for the parsed JSON
    .then(data => data.results[0].geometry.location) // Transform the response to only take what we need
  );
}

function getCurrentWeather(coords) {
  // Template string again! I hope you can see how nicer this is :)
  var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;

  return (
    fetch(url)
    .then(response => response.json())
    .then(data => data.currently)
  );
}


var app = document.querySelector('#app');
var cityForm = app.querySelector('.city-form');
var cityInput = cityForm.querySelector('.city-input');
var cityWeather = app.querySelector('.city-weather');

cityForm.addEventListener('submit', function(event) { // this line changes
  event.preventDefault(); // prevent the form from submitting

  // This code doesn't change!
  var city = cityInput.value;

  getCoordinatesForCity(city)
  .then(getCurrentWeather)
  .then(function(weather) {
    cityWeather.innerText = 'Current temperature: ' + weather.temperature;
  });
});

var button = document.getElementById('btn');

button.onclick = function () {
    var red = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    
    this.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
};

var overlay = document.getElementById("overlay");

window.addEventListener('load', function () {
  overlay.style.display = 'none';
});



})();