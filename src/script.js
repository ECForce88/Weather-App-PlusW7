
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
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
  
  
  
  displayDate();
  //display local city, date/time, and weather on page loading

  //Display city and temperature celsius
  function updateDisplay(response) {
    let city = response.data.name;
    let displayCity = document.querySelector("#city-name");
    displayCity.innerHTML = `${city}`;
    let temp = Math.round(response.data.main.temp);
    let displayTemp = document.querySelector("h2");
    displayTemp.innerHTML = `${temp}`;
    let conditions = response.data.weather[0].main;
    let displayConditions = document.querySelector("li.condition");
    displayConditions.innerHTML = `${conditions}`;
    let precip = response.data.main.precipitation;
    let displayPrecip = document.querySelector("#precip");
    displayPrecip.innerHTML = `${precip}`;
    let humidity = response.data.main.humidity;
    let displayHumidity = document.querySelector("#humidity");
    displayHumidity.innerHTML = `${humidity}`;
    let windSpeed = response.data.main.wind.speed;
    let displayWindSpeed = document.querySelector("#wind-speed");
    displayWindSpeed.innerHTML = `${windSpeed}`;
  }
  
  function getWeather(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let city = `${cityInput.value}`;
    let unit = "metric";
    let apiKey = "dt32be6cd3d5of11a004f35abf796ccf";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&${apiKey}=dt32be6cd3d5of11a004f35abf796ccf&${unit}=metric`;
  
    axios.get(apiUrl).then(updateDisplay);
    console.log(apiUrl);
  }
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", getWeather);
  
  function getLocalWeather(position) {
    navigator.geolocation.getCurrentPosition(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "dt32be6cd3d5of11a004f35abf796ccf";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  
    axios.get(apiUrl).then(updateDisplay);
  }
  
  let localButton = document.querySelector("#localButton");
  localButton.addEventListener("click", getLocalWeather);
  
  function displayFahrenheit(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#tempValue");
    let temp = currentTemp.innerHTML;
    temp = Number(temp);
    currentTemp.innerHTML = temp * 1.8 + 32;
  }
  
  function displayCelsius(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#tempValue");
    let temp = currentTemp.innerHTML;
    temp = Number(temp);
    currentTemp.innerHTML = temp / 1.8 - 32;
  }
  
  let toFahrenheit = document.querySelector("#f-link");
  toFahrenheit.addEventListener("click", displayFahrenheit);
  
  let toCelsius = document.querySelector("#c-link");
  toCelsius.addEventListener("click", displayCelsius);
  