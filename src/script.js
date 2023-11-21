const apiKey = "dcb66753beab8eeb43ed7f4376e3244e";

// Constructor para el objeto Weather

function Weather(city, language) {
  this.city = city;
  this.language = language;

  this.getWeather = async function () {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&lang=${this.language}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const weatherData = `
        <table
        width="280"
        cellspacing="1"
        cellpadding="3"
        border="0"
        bgcolor="#1E679A"
      >
        <tr>
          <td>
            <font color="#FFFFFF" face="arial, verdana, helvetica">
                <b> Datos de la ciudad que solicitó </b>
            </font>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffcc">
            <font face="arial, verdana, helvetica">
            </font>
            <p>Ciudad  -->${data.name}</p> 
            <p>Temperatura --> ${
              Math.round((data.main.temp - 32) / 1.8) / 10
            } °C</p>
            <p>Humedad Relativa -->${data.main.humidity}</p>
          <p>Clima -->${data.weather[0].description} </p>
          </td>
        </tr>
      </table>
        `;
        document.getElementById("weatherData").innerHTML = weatherData;
      } else {
        throw new Error("Error al obtener datos del clima");
      }
    } catch (error) {
      console.error("Error al obtener datos del clima:", error);
    }
  };
}

// Objeto WeatherApp
const WeatherApp = {
  init: function () {
    document.getElementById("getWeatherBtn").addEventListener("click", () => {
      const city = document.getElementById("cityInput").value;
      const userLanguage = navigator.language || navigator.userLanguage; // Obtener el idioma del navegador
      const weather = new Weather(city, userLanguage);
      weather.getWeather();
    });
  }
};

WeatherApp.init();
