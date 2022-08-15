const app = document.querySelector(".weather-app");
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
		cityInput = e.target.innerHTML;
		// function that fetches and displays all the data from the weather API
		fetchWeatherData();
		// Fade out the app
		app.style.opacity = 0;
	});
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
	if (search.value.length === 0) {
		alert("Please type in a city name");
	} else {
		// change from default city to the one written  in the input field
		cityInput = search.value;
		fetchWeatherData();
		search.value = "";
		app.style.opacity = 0;
	}
});

// fetch data from the weather ap
async function fetchWeatherData() {
	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=564ae05f335a4e2aa91141544221408&q=${cityInput}`, {mode: "cors"}
		);
		const weatherData = await response.json();
		// add this data to the container icon in html
		temp.innerHTML = Math.floor(weatherData.current.temp_c) + "&#176;";
		conditionOutput.innerHTML = weatherData.current.condition.text;
		const date = weatherData.location.localtime;
		const y = parseInt(date.substr(0, 4));
		const m = parseInt(date.substr(5, 2));
		const d = parseInt(date.substr(8, 2));
		const time = date.substr(11);
		dateOutput.innerHTML = `${dayOfTheWeek(y, m, d)} ${d}, ${m} ${y}`;
		timeOutput.innerHTML = time
		nameOutput.innerHTML = weatherData.location.name;
		const iconId = weatherData.current.condition.icon.substr(
			"//cdn.weatherapi.com/weather/64x64".length
		);
		icon.src = "./icon/" + iconId;
		cloudOutput.innerHTML = weatherData.current.cloud + "%";
		humidityOutput.innerHTML = weatherData.current.humidity + "%";
		windOutput.innerHTML = weatherData.current.wind_kph + "km/h";
		// set default time of day
		let timeofDay = "day";
		const code = weatherData.current.condition.code;
		if (!weatherData.current.is_day) {
			timeofDay = "night";
		}
		if (code == 1000) {
			app.style.backgroundImage = `url(./images/${timeofDay}/clear.jpg)`;
			btn.style.background = "#e5ba92";
			if (timeofDay == "night") {
				btn.style.background = "#181e27";
			}
		} else if (
			code == 1003 ||
			code == 1006 ||
			code == 1009 ||
			code == 1030 ||
			code == 1069 ||
			code == 1087 ||
			code == 1135 ||
			code == 1273 ||
			code == 1276 ||
			code == 1279 ||
			code == 1282
		) {
			app.style.backgroundImage = `url(./images/${timeofDay}/cloudy.jpg)`;
			btn.style.background = "#fa6d1b";
			if (timeofDay == "night") {
				btn.style.background = "#181e27";
			}
		} else if (
			code == 1063 ||
			code == 1069 ||
			code == 1072 ||
			code == 1150 ||
			code == 1153 ||
			code == 1180 ||
			code == 1183 ||
			code == 1186 ||
			code == 1189 ||
			code == 1192 ||
			code == 1195 ||
			code == 1204 ||
			code == 1207 ||
			code == 1240 ||
			code == 1243 ||
			code == 1246 ||
			code == 1249 ||
			code == 1252
		) {
            app.style.backgroundImage = `url(./images/${timeofDay}/rainy.jpg)`;
			btn.style.background = "#647d75";
			if (timeofDay == "night") {
				btn.style.background = "#325c80";
			}
        } else {
            app.style.backgroundImage = `url(./images/${timeofDay}/snowy.jpg)`;
			btn.style.background = "#4d72aa";
			if (timeofDay == "night") {
				btn.style.background = "#1b1b1b";
			}
        }
        app.style.opacity = 1
	} catch (error) {
		alert("city not found, please try again")
		console.table(error)
        app.style.opacity = 1
	}
}
function dayOfTheWeek(day, month, year) {
	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}
fetchWeatherData();
app.style.opacity = 1