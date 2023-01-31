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
    displayHumidity.innerHTML = `Humidity: ${humidity}%`;
    let wind = Math.round(response.data.wind.speed);
    let displayWindSpeed = document.querySelector("#windSpeed");
    displayWindSpeed.innerHTML = `Wind: ${wind} mph`;
    let visibility = Math.round(response.data.visibility *0.000621371);
    let displayVisibility = document.querySelector("#visibility");
    displayVisibility.innerHTML = `Visibility: ${visibility} Mi`;
    let icon = document.querySelector("#icon");
    let backgroundImage = document.body.style.backgroundImage;
    //Displays weather icon and background image to match current conditions
    icon.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
    if (icon == "01d.png" || icon == "01n.png"){
        backgroundImage.src = "https://www.gannett-cdn.com/-mm-/0075d16b4e9af6ae2306c300e52f124f9586f1b0/c=0-26-507-312/local/-/media/2014/12/11/FortMyers/FortMyers/635539061510678812-155366999.jpg?width=1200&disable=upscale&format=pjpg&auto=webp";
    }
    getForecast(response.data.coord);
  }
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }
  
  //mainIcon.setAttribute = ("alt", response.data.weather[0].description);
  
  //let dewpoint = response.data.dewpoint;
  //let displayDewpoint = document.querySelector("#dewpoint");
  
  //Calls the API url to get weather data based on city name searched
  function getWeather(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let city = `${cityInput.value}`;
    let unit = "imperial";
    let apiKey = "5d95fd50506eedab42e7a378d353b99a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  
    cityInput.value = "";
    axios.get(apiUrl).then(updateDisplay);
  }
  
  //Calls the API URL to get weather data based on the user's current location
  function getLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "5d95fd50506eedab42e7a378d353b99a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  
    axios.get(apiUrl).then(updateDisplay);
  }
  
  function handleLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getLocation);
  }

  function displayForecast(response) {
    console.log(response);
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row w-100 form-group">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `<div class="col-sm-2">
          <div class="card text-center mt-1 pb-0 pt-2 h=100 border border-1 border-secondary-subtle shadow" >
              <h5 class="card-title bold">${formatDay(forecastDay.dt)}</h5>
                  <div class="card-body">
                  <img src="images/${
                    forecastDay.weather[0].icon
                  }.png" class="img-fluid pt-0 pb-0 mt-0" />
                  <p class="card-text  pt-2">
                      <strong>${Math.round(
                        forecastDay.temp.max
                      )}° </strong>${Math.round(forecastDay.temp.min)}° 
                  </p>
                  </div>
              </div>
          </div>
        `;
      }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  
  function getForecast(coordinates) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  //Creates an array for days of the week
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "December",
  ];
  
  //Adds "click" function to the search feature
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", getWeather);
  
  //Global variable for Celsius temperature value
  let tempCelsius = null;
  
  //Adds a "click" function to the "My Location" button to get the weather data based on the user's current location
  let localButton = document.querySelector("#localButton");
  localButton.addEventListener("click", handleLocation);
  
  //Calls the function to display current date and time
  displayDate();
  handleLocation({preventDefault: function(){}})