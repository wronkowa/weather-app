window.addEventListener("load", () => {

  let dl;
  let szer;

  const placeHtml = document.querySelector('.place');
  const degreeHtml = document.querySelector('h2');
  const opisHtml = document.querySelector('p');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      dl = position.coords.longitude;
      szer = position.coords.latitude;
      // console.log(dl, szer);
      const proxy = "https://cors-anywhere.herokuapp.com/";
      // const api = `${proxy}https://api.darksky.net/forecast/12c100ebcafecc60acd8525e7f9e04a6/${szer},${dl}`;



      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${szer}&lon=${dl}&APPID=b25fd1e90c25991bbe5d57ab854aaaab`


      // console.log(api);

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const place = data.name;
          // console.log(place);
          const country = data.sys.country;
          placeHtml.textContent = `${place}, ${country}`;
          const degree = data.main.temp;
          // const celsius = Math.floor((degree - 32) * (10 / 18));
          const celsius = Math.floor(degree - 273.15);
          degreeHtml.innerHTML = `${celsius}&degC`;
          // degreeHtml.textContent = degree;
          const opis = data.weather[1].description;
          // console.log(opis);
          opisHtml.textContent = opis;

          // icon = data.currently.icon;
          // setIcons(icon, document.querySelector('.icon'));
        });

    });

  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "cadetblue" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);

  }

})