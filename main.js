const app = document.querySelector("weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

// Default city when the page loads
let cityInput = "London";
// Add click event to each city in the panel
cities.forEach((city) => {
	city.addEventListener("click", (e) => {
		// Change the default city to the clicked one
		cityInput = e.target.innerHtml;
		// function that fetches and displays all the data from the weather API
		fetchWeatherData();
		// Fade out the app
		app.style.opacity = 0;
	});
});
form.addEventListener("submit", (e) => {
	if (search.value.length === 0) {
		alert("Please type in a city name");
	} else {
		// change from default city to the one written  in the input field
		cityInput = search.value;
		fetchWeatherData();
        search.value = ""
        app.style.opacity = 0
	}
    e.preventDefault()
});
