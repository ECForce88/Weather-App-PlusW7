
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
    console.log(response);
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
    let windSpeed = response.data.wind.speed;
    let displayWindSpeed = document.querySelector("#wind-speed");
    displayWindSpeed.innerHTML = `${windSpeed}`;

    let icon = document.querySelector("#icon")
    let backgroundImg = document.body.style.backgroundImage;
    if (`${conditions}` == "clear sky") {
      icon=url("images/01d.png");
      backgroundImg = "url('https://www.gannett-cdn.com/-mm-/0075d16b4e9af6ae2306c300e52f124f9586f1b0/c=0-26-507-312/local/-/media/2014/12/11/FortMyers/FortMyers/635539061510678812-155366999.jpg?width=1200&disable=upscale&format=pjpg&auto=webp')";
    } else if (`${conditions}` == "few clouds") {
      icon=url("images/02d.png");
      backgroundImg = "url('https://clarksvillenow.sagacom.com/files/2020/11/shutterstock_286242953.jpg')";
    } else if (`${conditions}` == "scattered clouds") {
      icon=url("images/03d.png");
      backgroundImg = "url('https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=')";
    } else if (`${conditions}` == "broken clouds") {
      icon.setAttribute = ("src", "images/04d.png");
      backgroundImg = "url('background-cloudy.JPEG')";
    } else if (`${conditions}` == "images/shower rain") {
      icon.setAttribute = ("src", "images/09d.png");
      backgroundImg = "url('background-rain.jpg')";
    } else if (`${conditions}` == "rain") {
      icon.setAttribute = ("src", "images/10d.png");
      backgroundImg = "url('https://i.pinimg.com/originals/83/85/57/83855758bba8c7fbecc43356ddfaf6e2.gif')";
    } else if (`${conditions}` == "thunderstorm") {
      icon.setAttribute = ("src", "images/11d.png");
      backgroundImg = "url('https://c.pxhere.com/photos/01/3c/clouds_sky_storm_thunderstorm_rain_dark_clouds_clouds_form_covered_sky-1411165.jpg!d')";
    } else if (`${conditions}` == "snow") {
      icon.setAttribute = ("src", "images/13d.png");
      backgroundImg = "url('https://thumbs.gfycat.com/DiscreteAnnualCopperhead.webp')";
    } else if (`${conditions}` == "mist") {
      icon.setAttribute = ("src", "images/50d.png");
      backgroundImg = "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFhYYGBgYGRgYGhgYGhgYGBgaGhgZGRgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISGjQhGCE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0ND80QP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EADYQAAEDAgQDBgUEAgIDAAAAAAEAAhEDIQQxQVESYYEFEyJxkaEUscHR8DJCUuFi8XKSI1Oi/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAdEQEBAQEBAAMBAQAAAAAAAAAAARESAiExUUFh/9oADAMBAAIRAxEAPwD6dDtUdhISx4v2lR9R4Fjfmq4jAC94neY9JSr3vEw4IdYuN7KgfbxEDaDdWBtlQj9ZE8ld9dozv5aeixKtbnI3Qhii3JaxnWpifFcJJ9N/RCb2ieS67tEq5Uth/CVXgQBK0KZBEuhvVYIxhOvorNd1SxZTmMqsk8L58pSzapGRVXUSb8KIzDOiYI5IGKWKEAQiOxbTErPfZcLlcTTzajZlphNDG81jNcrteUw1tUsV1RhiQdFisemGFTF1oHEO0AXe+OqUEqymKYfXGyF8VyCqx4lHLG5g+yALsVtZUOJKIaAVXU2jNPgVFc7q/wAS4ZFUDGH93sp3Q3T4Fjin7/JcFV5191XgBMAjXVcFIp8DlSvGY91OMJfHUzE62t5oDDbisbwIOkwPa6Idc9dbiYslXOIvBiYSjq57wAbOnll/aDRfiRMalY+PxQL+E6iMx+rjDSPQrOx3awZWAJgAk8XmMo8x6Lz+M7TL8SwcXh4i6ch+nL2FlqRzvp9BpV2gAcQCi81he1vCJeybnM6klRTGuo9bWfDbO6WkrN8ZORTY4XGbKziwDOfJYnw6FHvfrPqkcbWNgAfNavfM59Uu/GNH7Qen1Wpf8T1Pj7ZDqrohDJcVo1K5d+wDorU3n+I9FrXLnf6zWsdsU7h6R1CccZ/b7LgB0Ct9LPOLijoEyKNpS7GOKO2iTqsNxVz3NyKEcU/cpr4UalV+HGyuwyk+IqwbK0WYSUUYMBNMZfAQrtYU87CEqfCkZJphZghEY8jIIgoHZMU6W6aYWc920KN800aMq7KQCmmFSworKbijtoBFay2ymmAhh3Vu7nzVpQXVgHXMT9P9hTVUq+HQJV9VxdEgAWjXMLvaOIlpDS2QPexFliYzGO43Ft5DXiduGYO+p6KpbjWbUu6HZRl1+ycbUMTxRpovPHFw9zRclrTr/J3r+0dVsYF8tjmZKEpXtHEEMnXiDZjc2t5ryVDtzhDRcQHW5eEAkdSvT9rjhY8gyA0O3uNPT5jZeBxrzwsdGTQPFBlvCZIPkPotRz92yvcN7Y8H6RMEgTqBOf0XmMb2k8Pc7is5hNpgcLjlz4SD1QuzceO6BkuLC6ARYgAwBubt9QqdqYukAAGEEAsJzEi0xpYPE6WVnx/EvrZ9srtV73cRJFwTsYGkb5eqxDWPECTlE9ABFvJaHaGKaB4ND4XTPgh1uY8TSZKz+zuA1Wcf6PDM+m45arWueNv4hgs8DizMc7jNuxCizcdjoe4cTLRocoEeyiaZX14unX0CKxg/LKgfGi73q4vWL3Tdh0Knct0AQw9EaTsUFuDy9FdojUIcHUFdgqi7mjzXQ0IcLo8kF3ALrHBUJ5LgKBjvVYPS7QrhoRBg8IragSwVggZ7zmpxIAKtxoDghRY+MxZGpGU+v+vVcp9ojhn0nzTDW0CrSFiO7UHBORvKYw+NDhP5lKYa0zUS7sRcc0piMWALnMlo80hVxfSCT0y+amGtbE4xrBc6LHx2LlzXf8o0yHtl7LLx+Lc5oINj7eKw9lm1sYXMgnxBzovYgtJ63BWpGPXppYntL9RD4mLf4geIGdVmdlY7iLg8iQGtvqASbf5QT6LLfijLteIAQdCI+oQ6LuF7iM2jiF7GzS36reOXVtMDHFlVwmYdHnD49Ley9bRxsNaQ6/EL2g8TJERp9182rVjxkkycz5kSfr6LY7FxRcx7JnLhE6taYj29ApfJ59ZW723i3uDxxD99gdQXZTrwz6Lw9TFEtYIs2ByiBMdQVvYrGOLDxGzmuI3khxBne681WfLLAWbeM8zP0VkT1dpzs3FANe0mGjxA7XDQDykrlXGh9iLiYvrBBn/sVmMmDHmeY1Hkuh7eKRMc+ci55SiBVDHEAbabaj6oTnkEEZQIBM5THmJko+IES0GRvGcH+0qZkcvwfNNWK16ruI9NTsouRuomr8Pujbq4o80mxxRu9cMjC5Y9GmmUwM5RA9g1KzH4l5zMqMrndXk6jTfWG56qvGgU6wOZTrHs5KfShB6vxI0M0A9UF+eiSicRVg4qjSitpnZURpVg5cNM7hBc+NUQwHLvEk+MKwemBri5oNapfPSPVUFUbjZZ3aOMjwz9wiWg9r1obJOkdZGfQFZOJxQ4Q0HPPpl7ruNxRf4XG8gztmD1WY4nXc+otmtSOXr0ediTwOE5AjyhxP29E4e0C2m2/iy8o39/ZYNJ+e8OCZbWnXT3urjM9VrV8a5zBe/9kBCOIM32jPPKOspGnXsRv/v7omJqkMtFsrXEAEEeyjXX9BZiLFpyBt5XjzuEviq8tBED9Vt5Iy9Sgvq3PkPlb6Jdz+ItB0kfVVztBc+53OfncIDqh4/MEHoF2pn+boDzcK6yXxDvH6ZeSawFbgDiL2EefFIPp81n1P1fJaHZ7BDicgGk+7bbnL0KauLY+qeBoOk+hMj7dVmOqfq/y4p6kFaPaDAIvm0k+f0WWROuiaQTDVAAecjlFjHspxRIgeMN6GxQ2ADXX7rjn58voVNaVrOm+t52z2Q9c4gfgRcSTAPNKh2XVRcdnzUUe5oJsVEV9paOXzRW0z/H5pNmLaEY44brOV2ln6P3H+KocKUH4uVO+5lMpb5MDDO/ArtpuH+kr3x3KsHncq5TYeYSi94s0OO6sDzUw6OlxXDUO6Ua+8Srkq4aOaqBicRwtlCc8CSVm4rFcR5IzfTVoV5sc4lDr4kiYzE/RJU6kFpm/CCesn7KmLrtL87fcKpvwG7FO4c83T6qmPqEu4twgA5+atVdMDmUZ0pXfKWuZ6/RNVGoQaE1jAGDNcCu4KrQiYIx9l3E1Zv7IRKHUdkgCdfVALrq7n5oAfdBHJesboznZpas66aF3kcS0cA8BwabtImCNrieU/NZrxdHY72HyKBvGwXHlI876/m6zmi/qPdPV401APsVnlyAFQ39fmuNdnafsqVXZfnNUY5RvEfV8IbEQSQdeQQXOgBWxO6Xc9RZBOOVxUlcRcfYWNG6KKY3XncN2i4GXXtH9p84+Rkt5WJ6jYYwbq4ZzWKMafXX1RKONcmVrqNgM5ojWDdZLcaSDuu/EOyCmLsbIYN1Hlo1usxuIcIQxUJMlRev8amFc1xJ5BTGvDRZKYZ5BVMXUJz2UXfgtiMUTbS6ENfb2VHDRFpiy0x9iGzZ3EBKOeTJTLzaEsRmeamldpvgjzV3aIE3XeP2REeQgOKs96C9yJXSqhVJVXPspqOPegOf7KzyhO0TRR5ulxmjPQnJqKEfNAqG5RHuQXORQ3FWY/5oVR6o13z+iLhrjskaj4Ri7MJWo5FkCqOVA5ce5C4kakFrOsky5Ee9Ac5GpF+JRB4lEax9Ip00ZrEdtNFYxdNebAmsR6bERrEZrFNanlVlNMNYqshGa4brNrUjoYrNZddbUao2oFNbyIwXQ8ULhVbVzVK1WUS/QcXXQuIbnJrIryEBxXeJUe5AJxQ6jlHOQ3GURwuVS5SFUhEcLlUqAKxUC7yqlyu9Aeg49yXe9XeUB6Cr3pd71Z5S7yquOVHKocqvKqi4M56WqIhKFUKiyF3lAJRnpdxRuI4oTlcoZRY5Ki4ojWPsjaSM2inGsajtDVdcp5IcESdknUe45LcLGlcFFmymrfLAYHogY5bzaTNgrikzZNTlhtaVcNK2hRZsrd0zZGuWGQdlSDst/umbKGizZDlhmdlQ0ydFvGmzZcLG7IcsHujshvpO2XouBuyo5jdkTl53uDsoMOdlvljdlwsbshywHYYobsOdl6Hu27KpYzZE5ecNA7KjqR2XpS1myqWM2UOXk3UnTkhuonZeu7hmy4MMzb5InLxb6RjJL1GFe5fhGHT5Lh7OpxHCPaUOXz1zCguonZfR2dm0Bm0ekrg7PobD0CGV82OHOysMKdl9Ib2TQ/AF0dnUWab/AMB9UXmvmvwrtkKphXbL6Z8NSy4Bb/gl6lCl/BuWsZ9EMx8yqYV2yWfQOy+hV8PT2btkCszEYZuUNzzsqnTxponZDdSOy9acM2DMDpnylK1MO3QC/RF6eY7sqL0Hw7dlEXt9FbiUZuIXmmYrmitxXNbxznp6QV1dtZefZiuaOzE81OV6braqIKqxWYnmjMxCmNdNUVF3vFnNrq3fqYvR8VF19RICrdWq1DCq9Gu9XDUSPelcNZTE6P8AeqjqyS75CdiEOjxrrnfrOOKG647FN3CJ00DXQ3YhZxxTeSGcUExNafflQVSsv4rl810Yo/hQ6aRqFVNQ7+yQdi7aDqqnGcx6n7IdNA1jv7b9Vxrr3eB5x9TdJtxk/wAfUorcQCc9Ok9dENOioz/2N/8AlHY5sEiqIykQbm4GXJZveMEHimeYtfI2V+Nmoacwbi1tckxdOBht45vaCuhgmA+c7zF4vnaeqzHMpyCGMEXjTrGajq4EANZce86W/JTDo4XDd3qAlKovcjPU28rfJLYjFAiDG4Ak8OcwIAvCz6+KBAImDMZQYsYvpITEtdxVSDF487dOSzK9bYW81zEVubv+zfss/EVJM8RPMRGW0IhirijGXulKmL8kJ7+Z9ks96LIP8UVEnx+a6i49NRaXGOcStVmEgJZgygZZJhpdzXXHDRaeFNkwzC3kuCWaSitlMXTraDd1dlIbpRriisemLp5lNsXKrXYBcFAa9W4gVnGukpPHEEXHut1SXHD5/wAo6Qm8QeIQphvwyqmKvmqsxZMlArYZ0H1ShcWmD+ZK4zra78kTP5CVfiTOeiWo14B24gPVCrGDPmFLDTDsSd1HYgrPc9EfUhts4H9qYGH4goRxKVqVLIDnypitE4tT45Zbnqnepg1vjYmPI+WyG7HgLLc9Vc9MVqnH/NVdjm5GfUrINRCqPuquNh2KYd+pd8pUOJpaZf8AJ3VYxchlyLj0Ix1NvPqbcxf5qru1W6Wz1PzK84XWUpvuoY9A7tnaZvcEbJOp2lJ26hIaeUX01+yXe5CeTz8bJz16Jd1edfmk3vzQ+Io3PJx1WxS9SsSSSZO5zVOJBLkankXvCogSomtY+pNcBt0T9Lg/ksZtUcvVHbVOwWrHllxrBlP+QC4adP8An7FZL8U4aAdEJ2ILknm/q31Pxt/+Iak+3zUFSny9R9lkUWErXwvZ3Fr8lbk+6Tb9QVhYcgPdMNog7I1Hs9oGvsr1WBosD6rHX46Tz+k6tFuo9Ao4E5BE40VtSFdTIzKtF2tpnRZ2P7OJBeCJ1HkvSmuf4t9FR7iZkDpZJ6qXzHiqZIa6cpE8o/opnGUSKbScx9pWw3sscbiQC114ufzIImNwYeAIty/4kD6LWufNeQqu8QHIKUySCTsfktLGdjvD2EAw7ztAS57Pe2i9xDpDoAjPUlDGXUfKCai68RKXfMxle/uVGoNUePZCNRLveuFyi4OaiJRuD5j3Sl7ItGchmTCCr3qj3XVKkx0lCe9FkHL1RzkLiVS9GsXc5RjtUEuXWuRcNzbzJnpZLPcmCR+k6COun0SjiiRHFCVnFDJUbkXchSrF11QqNyOKKKIr6IzDwtGhgyRc+maii1bXk8w4Oz6MX4ifP+kNvZeoFtJKiizLW8grKXDo33+yN3rht0UUVSOiq7dElxGaiiK7BC6HldUVEDyjNBKiilItC6WjdRRGlo5oGMw4c2Jv981FESvOYnsxos0cUGXE2BOYgeQ9l5DFN8ZIy4jB1ubSoorGCzWSQPP2EotSmAYH8R6mYUUVFMyB+bqzh4oH5ouKIA4id/tv9kJzYIHr53UURqBEaKqiijcVdkqAqKKNQ4102ysJ8o/0lnmDCiiVmfapK4SuKI24qlRRRqO2UUUVH//Z')";
    }  
  }
    
    //mainIcon.setAttribute = ("alt", response.data.weather[0].description);
  //let visibility = response.data.visibility;
  //let displayVisibility = document.querySelector("#visibility");
  //let dewpoint = response.data.dewpoint;
  //let displayDewpoint = document.querySelector("#dewpoint");
  //let visibility = response.data.visibility;
  //let displayVisibility = document.querySelector("#visibility");
  
  
  function getWeather(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let city = `${cityInput.value}`;
    let unit = "metric";
    let apiKey = "5d95fd50506eedab42e7a378d353b99a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    
  axios.get(apiUrl).then(updateDisplay);
    
  }
  
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", getWeather);
  
  function getLocalWeather(position) {
    navigator.geolocation.getCurrentPosition(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "5d95fd50506eedab42e7a378d353b99a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
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
  