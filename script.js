// https://openweathermap.org/api/one-call-3#current
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "b8aa2cd45b551bc7cb77891e3feb27fe";

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
    locationInfo = getLatLon(city);
    console.log(locationInfo);
    const lang = "zh-cn";
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=${lang}`;
}

function displayWeatherInfo(data){
}

async function getLatLon(city){
    const cityApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    const response = await fetch(cityApiUrl);
    
    if (!response.ok){
        throw new Error("Could not fetch weather data.");
    }

    return await response.json();
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