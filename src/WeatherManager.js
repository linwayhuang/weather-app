export function WeatherManager(apiKey) {
    const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const getWeather = async (location, units = "us") => {
        console.log("Fetching weather for: ", location, units);
        try {
            const response = await fetch(`${baseUrl}${location}?unitGroup=${units === "f" ? "us" : "metric"}&key=${apiKey}`);
            if (!response.ok) throw new Error("Invalid location");
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Weather error: ", error);
            throw error;
        }
    };
    return { getWeather };
}