const userCity = document.querySelector("#city");
const btnCheckWeather = document.querySelector("button");
const placeHtml = document.querySelector('.place');
const degreeHtml = document.querySelector('.degree');
const opisHtml = document.querySelector('p');

btnCheckWeather.addEventListener("click", (e) => {
  e.preventDefault();
  if (userCity.value === "") return alert("Wpisz nazwe miejsca");
  else {
    // console.log(userCity.value);
    apiUser = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&APPID=b25fd1e90c25991bbe5d57ab854aaaab`;
    document.querySelector('.result').classList.add('active');
    fetch(apiUser)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        const place = userCity.value;
        const country = data.sys.country;
        placeHtml.innerHTML = `Pogoda dla: <span>${place.toUpperCase()}, ${country}</span>`;
        const degree = data.main.temp;
        const celsius = Math.floor(degree - 273.15);
        degreeHtml.innerHTML = `Temperatura: <span>${celsius}&degC</span>`;
        const opis = data.weather[0].description;
        opisHtml.textContent = opis;
      });
  }
})


/* window.addEventListener("load", () => {

  let dl;
  let szer;



  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      dl = position.coords.longitude;
      szer = position.coords.latitude;

      // const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${szer}&lon=${dl}&APPID=b25fd1e90c25991bbe5d57ab854aaaab`

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const place = data.name;
          const country = data.sys.country;
          placeHtml.textContent = `${place}, ${country}`;
          const degree = data.main.temp;
          const celsius = Math.floor(degree - 273.15);
          degreeHtml.innerHTML = `${celsius}&degC`;
          const opis = data.weather[0].description;
          opisHtml.textContent = opis;
        });

    });

  }

}) */