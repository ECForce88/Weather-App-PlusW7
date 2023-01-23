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
    console.log(response.data);
    let city = response.data.name;
    let displayCity = document.querySelector("#city-name");
    displayCity.innerHTML = `${city}`;
    let tempCelsius = Math.round(response.data.main.temp);
    let displayTemp = document.querySelector("h2");
    displayTemp.innerHTML = `${tempCelsius}`;
    let conditions = response.data.weather[0].main;
    let displayConditions = document.querySelector("li.condition");
    displayConditions.innerHTML = `${conditions}`;
    let precip = response.data.main.precipitation;
    let displayPrecip = document.querySelector("#precip");
    displayPrecip.innerHTML = `${precip}`;
    let humidity = response.data.main.humidity;
    let displayHumidity = document.querySelector("#humidity");
    displayHumidity.innerHTML = `${humidity}`;
    let windSpeed = response.data.wind.speed;
    let displayWindSpeed = document.querySelector("#wind-speed");
    displayWindSpeed.innerHTML = `${windSpeed}`;
    let icon = document.querySelector("#icon")
    let backgroundImg = document.body.style.backgroundImage;
//Displays weather icon and background image to match current conditions  
    if (`${conditions}` == "clear sky") {
      icon=url("../images/01d.png");
      backgroundImg = url('https://www.gannett-cdn.com/-mm-/0075d16b4e9af6ae2306c300e52f124f9586f1b0/c=0-26-507-312/local/-/media/2014/12/11/FortMyers/FortMyers/635539061510678812-155366999.jpg?width=1200&disable=upscale&format=pjpg&auto=webp');
    } else if (`${conditions}` == "few clouds") {
      icon=url("images/02d.png");
      backgroundImg = url('https://clarksvillenow.sagacom.com/files/2020/11/shutterstock_286242953.jpg');
    } else if (`${conditions}` == "scattered clouds") {
      icon=url("images/03d.png");
      backgroundImg = url('https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=');
    } else if (`${conditions}` == "broken clouds") {
      icon.setAttribute = ("src", "../images/04d.png");
      backgroundImg = url('../images/background-cloudy.JPEG');
    } else if (`${conditions}` == "images/shower rain") {
      icon.setAttribute = ("src", "../images/09d.png");
      backgroundImg = url('../background-rain.jpg');
    } else if (`${conditions}` == "rain") {
      icon.setAttribute = ("src", "../images/10d.png");
      backgroundImg = url('https://i.pinimg.com/originals/83/85/57/83855758bba8c7fbecc43356ddfaf6e2.gif');
    } else if (`${conditions}` == "thunderstorm") {
      icon.setAttribute = ("src", "../images/11d.png");
      backgroundImg = url('https://c.pxhere.com/photos/01/3c/clouds_sky_storm_thunderstorm_rain_dark_clouds_clouds_form_covered_sky-1411165.jpg!d');
    } else if (`${conditions}` == "snow") {
      icon.setAttribute = ("src", "../images/13d.png");
      backgroundImg = url('https://thumbs.gfycat.com/DiscreteAnnualCopperhead.webp');
    } else if (`${conditions}` == "mist") {
      icon.setAttribute = ("src", "../images/50d.png");
//backgroundImg = "url('
  }
}
    
  //mainIcon.setAttribute = ("alt", response.data.weather[0].description);
  //let visibility = response.data.visibility;
  //let displayVisibility = document.querySelector("#visibility");
  //let dewpoint = response.data.dewpoint;
  //let displayDewpoint = document.querySelector("#dewpoint");
  //let visibility = response.data.visibility;
  //let displayVisibility = document.querySelector("#visibility");
  
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
    currentTemp.innerHTML = `${tempCelsius}` * 1.8 + 32;
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
let tempCelsius = Math.round(response.data.main.temp);

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