export function Display() {
    const weatherDiv = document.getElementById("weather");
    const renderWeather = (data) => {
        weatherDiv.innerHTML = `<h2>${data.address}</h2><p>Temp: ${data.currentConditions.temp}°</p><p>Description: ${data.description}</p>`;
        document.body.style.backgroundColor = data.currentConditions.conditions === "clear" ? "skyblue" : "gray";
    };
    return {renderWeather};
}