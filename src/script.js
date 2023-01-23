//Displays the current date and time when app is run
  function displayDate() {
    let now = new Date();
    let currentDay = days[now.getDay()];
    let currentMonth = months[now.getMonth()];
    let currentDate = now.getDate();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
  
    if (currentMinute < 10) {
      currentMinute = `0${currentMinute}`;
    }
  
    document.querySelector(
      ".dateTime"
    ).innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinute}`;
  }

//Display searched city and all related weather data
  function updateDisplay(response) {
    console.log(response.data.weather[0].description);
    let city = response.data.name;
    let displayCity = document.querySelector("#city-name");
    displayCity.innerHTML = `${city}`;
    tempCelsius = Math.round(response.data.main.temp);
    let displayTemp = document.querySelector("h2");
    displayTemp.innerHTML = `${tempCelsius}`;
    let conditions = response.data.weather[0].description;
    let displayConditions = document.querySelector("li.condition");
    displayConditions.innerHTML = `${conditions}`;
    let humidity = response.data.main.humidity;
    let displayHumidity = document.querySelector("#humidity");
    displayHumidity.innerHTML = `Humidity: ${humidity}`;
    let wind = Math.round(response.data.wind.speed);
    let displayWindSpeed = document.querySelector("#windSpeed");
    displayWindSpeed.innerHTML = `Wind Speed: ${wind}`;
    let visibility = response.data.visibility;
    let displayVisibility = document.querySelector("#visibility");
    displayVisibility.innerHTML = `Visibility: ${visibility}`;
    let icon = document.querySelector("#icon")
//backgroundImg = document.body.style.backgroundImage;
//Displays weather icon and background image to match current conditions  
    icon.setAttribute("src",`images/${response.data.weather[0].icon}.png`);
  }
    
  //mainIcon.setAttribute = ("alt", response.data.weather[0].description);
  
  //let dewpoint = response.data.dewpoint;
  //let displayDewpoint = document.querySelector("#dewpoint");
  
//Calls the API url to get weather data based on city name searched
  function getWeather(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let city = `${cityInput.value}`;
    let unit = "metric";
    let apiKey = "5d95fd50506eedab42e7a378d353b99a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    
  axios.get(apiUrl).then(updateDisplay); 
  }
  
//Calls the API URL to get weather data based on the user's current location
  function getLocalWeather(position) {
    navigator.geolocation.getCurrentPosition(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "5d95fd50506eedab42e7a378d353b99a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(updateDisplay);
  }

//Converts temp to Fahrenheit when "F" is clicked
  function displayFahrenheit(event) {
    event.preventDefault();
    toCelsius.classList.remove("active");
    toFahrenheit.classList.add("active");
    let currentTemp = document.querySelector("#tempValue");
    currentTemp.innerHTML = Math.round(`${tempCelsius}` * 1.8 + 32);
  }
  
//Converts temp to Celsius when "F" is clicked  
  function displayCelsius(event) {
    event.preventDefault();
    toFahrenheit.classList.add("active");
    toCelsius.classList.remove("active");
    let currentTemp = document.querySelector("#tempValue");
    currentTemp.innerHTML =  `${tempCelsius}`;
  }

//Creates an array for days of the week
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

//Creates an array for the months of the year
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

//Adds "click" function to the search feature
let form = document.querySelector("#search-form");
form.addEventListener("submit", getWeather);

//Global variable for Celsius temperature value
let tempCelsius = null;

//Converts temp to Fahrenheit when "F" is clicked
let toFahrenheit = document.querySelector("#f-link");
toFahrenheit.addEventListener("click", displayFahrenheit);
  
//Converts temp to Celsius when "C" is clicked
let toCelsius = document.querySelector("#c-link");
toCelsius.addEventListener("click", displayCelsius);

//Adds a "click" function to the "My Location" button to get the weather data based on the user's current location
let localButton = document.querySelector("#localButton");
localButton.addEventListener("click", getLocalWeather);

//Calls the function to display current date and time
displayDate();