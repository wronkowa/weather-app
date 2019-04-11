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
      const api = `${proxy}https://api.darksky.net/forecast/12c100ebcafecc60acd8525e7f9e04a6/${szer},${dl}`;


      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          const place = data.timezone;
          // console.log(place);
          placeHtml.textContent = place;
          const degree = data.currently.temperature;
          const celsius = Math.floor((degree - 32) * (10 / 18));
          degreeHtml.innerHTML = `${celsius}&degC`;
          const opis = data.currently.summary;
          opisHtml.textContent = opis;

          icon = data.currently.icon;
          setIcons(icon, document.querySelector('.icon'));
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