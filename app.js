const API_KEY = "df5c6553925d29ccf14abf65c90f7402";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      // Hide default card and show actual weather card
      document.getElementById("defaultWeatherCard").style.display = "none";
      document.getElementById("weatherCard").style.display = "block";

      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("humidity").textContent = `${data.main.humidity}%`;
      document.getElementById("windSpeed").textContent = `${data.wind.speed} m/s`;
      document.getElementById("error").style.display = "none";
    })
    .catch(() => {
      document.getElementById("error").textContent = "City not found. Please try again.";
      document.getElementById("error").style.display = "block";
      document.getElementById("weatherCard").style.display = "none";
      // Show default card again if search fails
      document.getElementById("defaultWeatherCard").style.display = "block";
    });
}

document.getElementById("cityInput").addEventListener("keypress", (e) => e.key === "Enter" && getWeather());
