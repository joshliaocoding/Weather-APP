const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "59e1dc42f9f84273b6f81303253003";


// getWeatherData() => getLatLon() => displayWeatherInfo()
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city.");
    }
});

async function getWeatherData(city){
    const baseUrl = "https://api.weatherapi.com/v1"
    
    const apiUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(apiUrl);
    const data  = await response.json();
    return data;
}


function displayWeatherInfo(data){
    const { location, current } = data;
    
    // Get location info
    const city = location.name;
    //const country = location.country;
    
    // Get weather data
    const temperature = current.temp_c;  // Celsius
    const condition = current.condition.text;
    const icon = current.condition.icon;  // URL to weather icon
    
    card.innerHTML = 
    `
    <h1 class="cityDisplay">${city}</h1>
    <p class="tempDisplay">${temperature}°C</p>
    <p class="humidityDisplay">humidity: 75%</p>
    <p class="descDisplay">${condition}</p>
    <img class="weatherEmoji" src="https:${icon}" alt="Weather icon">`
}



function getWeatherEmoji(weatherId){

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}