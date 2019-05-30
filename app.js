const placeName = document.querySelector('.place-name');
let dl = 0;
let szer = 0;
let nameDay = "";

function setNameDay(dayNumber) {
  switch (dayNumber) {
    case 0: nameDay = "Sunday"; break;
    case 1: nameDay = "Monday"; break;
    case 2: nameDay = "Tuesday"; break;
    case 3: nameDay = "Wednesday"; break;
    case 4: nameDay = "Thursday"; break;
    case 5: nameDay = "Friday"; break;
    case 5: nameDay = "Saturday"; break;
  }
}

function getCityName() {
  document.querySelector('.app-place i').addEventListener("click", () => {
    if (!placeName.value) alert('Wpisz nazw? miejscowosci');
    else {
      document.querySelector('.name-city').textContent = `You check weather for: ${placeName.value}`;

      const api = `https://api.openweathermap.org/data/2.5/weather?q=${placeName.value}&APPID=b25fd1e90c25991bbe5d57ab854aaaab`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          const cityName = data.name;
          // console.log(cityName);
          // document.querySelector('.place-name').value = cityName;
          const degreeKelvin = data.main.temp;
          const degreeCelsius = Math.floor(degreeKelvin - (273.15));
          // console.log(degreeCelsius);
          document.querySelector('.degree-symbol').innerHTML = "&deg C";
          // document.querySelector('.name-city').textContent = `You check weather for: ${cityName}`;
          document.querySelector('.degree').textContent = `${degreeCelsius}`;
          const description = data.weather[0].description;
          document.querySelector('.description').textContent = description;
          const pressure = data.main.pressure;
          document.querySelector('.pressure').textContent = pressure + ' hPa';
          const wind = data.wind.speed;
          document.querySelector('.wind').textContent = wind + ' m/s';

        });
    }
  })
}

function getDate() {
  const currentDate = new Date();
  let dayNumber = currentDate.getDay();
  setNameDay(dayNumber);
  // console.log(nameDay);
  document.querySelector('.day').textContent = nameDay;
  const day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
    // console.log(month);
  }
  const year = currentDate.getFullYear();

  document.querySelector('.date').textContent = `${day}.${month}.${year}`;
}


function getWeather(dl, szer) {
  // console.log(dl, szer);
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${szer}&lon=${dl}&APPID=b25fd1e90c25991bbe5d57ab854aaaab`;

  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // console.log(data);
      const cityName = data.name;
      // console.log(cityName);
      // document.querySelector('.place-name').value = cityName;
      const degreeKelvin = data.main.temp;
      const degreeCelsius = Math.floor(degreeKelvin - (273.15));
      // console.log(degreeCelsius);
      document.querySelector('.degree-symbol').innerHTML = "&deg C";
      document.querySelector('.name-city').textContent = `You check weather for: ${cityName}`;
      document.querySelector('.degree').textContent = `${degreeCelsius}`;
      const description = data.weather[0].description;
      document.querySelector('.description').textContent = description;
      const pressure = data.main.pressure;
      document.querySelector('.pressure').textContent = pressure + ' hPa';
      const wind = data.wind.speed;
      document.querySelector('.wind').textContent = wind + ' m/s';
      // console.log(description);
      // console.log(degree);
    });

}

function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      dl = position.coords.longitude;
      szer = position.coords.latitude;
      getWeather(dl, szer);
    });
  }
  else {
    alert('geolokalizaja nie jest wspierana na Twoim urządzeniu');
    dl = 21.0117800;
    szer = 52.2297700;
    getWeather(dl, szer)
  }

}

//klik search city


getDate();
getCityName();
getPosition();


// getWeather(21.0117800, 52.2297700);
// getWeather(dl, szer);