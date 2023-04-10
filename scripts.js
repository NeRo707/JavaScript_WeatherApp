const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const apiKey = "83e47e754e88b000824609855039a4ba";
const searchedCities = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value;

  const validInputRegex = /^[a-zA-Z\s]+$/;
  if (!validInputRegex.test(city)) {
    input.value = "";
    msg.innerHTML = "Please enter a valid / city name 😩";
    return;
  }

  const req = () => {
    console.log("called");

    if (city.length > 0 && !searchedCities.includes(city)) {
      searchedCities.push(city);
    } else if (searchedCities.includes(city)) {
      input.value = "";
      msg.innerHTML = "You Already Searched For That City 😩";
      return;
    }

    console.log(searchedCities);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod == 404) {
            msg.innerHTML = "City not found 😩";
            input.value = "";
            return;
          }

          const {
            name: city,
            main: { temp },
            weather: [{ description, icon }],
          } = data;
          const img = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          const New = new Date();
          const date = {
            hour: New.getHours(),
            min: New.getMinutes(),
            sec: New.getSeconds(),
          };
          //console.table(date);
          const dateTime = `${date.hour}:${date.min}:${date.sec}`;
          const weather = { city, temp, description, icon, img, dateTime };
          //console.log(weather);
          list.innerHTML += `<li class="city"><img src="${img}" alt=""><h3>${city}</h3><p>${temp}°C</p><p>${description}</p><p>${dateTime}</p></li>`;
          msg.innerHTML = "😇 City Found 😇";
        });
    } catch (err) {
      //console.log(err.message);
      msg.innerHTML = "City not found 😩";
    }
  };
  req();
});
