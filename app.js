const placeName = document.querySelector('.place-name');
let dl = 0;
let szer = 0;

function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      dl = position.coords.longitude;
      szer = position.coords.latitude;
    });
  }
  else alert('geolokalizaja nie jest wspierana na Twoim urządzeniu')
}

function getWeather(dl, szer) {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${szer}&lon=${dl}&APPID=b25fd1e90c25991bbe5d57ab854aaaab`;

  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      const degreeKelvin = data.main.temp;
      const degreeCelsius = degreeKelvin - (273.15);
      // console.log(degreeCelsius);
      document.querySelector('.degree-symbol').innerHTML = "&deg C";
      document.querySelector('.degree').textContent = Math.floor(degreeCelsius);
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


getPosition();
getWeather(dl, szer);