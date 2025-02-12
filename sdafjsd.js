const apikey = "b73021eea66a0896c98b7fcd6760b506";
const baseApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchInput = document.getElementById("city");
const submitButton = document.getElementById("submit");
const cityName = document.querySelector(".CityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const dayElement = document.getElementById("day");
const dateElement = document.getElementById("date");

function logOnlineStatus() {
  if (navigator.onLine) {
    console.log("Online");
  } else {
    console.log("Offline");
  }
}

logOnlineStatus(); 
async function checkweather(city) {
  try {
    let data;
    if (navigator.onLine) {
        const response = await fetch(`http://sharronweatherapp.fwh.is/sharronbhandari_2462336_connection.php?q=${city}`);
        data = await response.json();
        // Save data to localStorage
        localStorage.setItem(city, JSON.stringify([data]));
        //localStorage.setItem(city, JSON.stringify(data));
    }else {
        // Offline: Retrieve data from localStorage
        data = JSON.parse(localStorage.getItem(city));
        if (!data) throw new Error("City not found in cached data");
    }
    console.log("Received data:", data)
    cityName.innerHTML = data.city || "Data not available";
    temperature.innerHTML = `${data.temperature}°C` || "N/A";
    description.innerHTML = data.description || "N/A";
    humidity.innerHTML = `Humidity: ${data.humidity}%` || "N/A";
    wind.innerHTML = `Wind: ${data.wind} km/h` || "N/A";
    const iconCode = data.weather_icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;
  } catch (error) {
   //console.error
    cityName.innerHTML = "Data not available";
    temperature.innerHTML = "N/A";
    description.innerHTML = "N/A";
    humidity.innerHTML = "N/A";
    wind.innerHTML = "N/A";
  }

  updateDayAndDate();
}

function updateDayAndDate() {
  const currentData = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = days[currentData.getDay()];

  const option = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedData = currentData.toLocaleDateString(undefined, option);

  dayElement.textContent = currentDay;
  dateElement.textContent = formattedData;
}

updateDayAndDate();
checkweather("Blackburn");

submitButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  getAndDisplayWeather(city);
  checkweather(city);
});