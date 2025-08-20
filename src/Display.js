export function Display() {
    const weatherDiv = document.getElementById("weather");
    const giphyKey = "OqCqiqVq3kbzZfs1Y43g2nYaK2MuYmhn";

    const getGif = async (condition) => {
        console.log("Fetching gif for: ", condition);
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${condition}&limit=1`);
            if (!response.ok) throw new Error("Giphy API error");
            const data = await response.json();
            console.log(data);
            console.log(data.data.length);
            if (data.data.length === 0) throw new Error(`No gifs found for ${condition}`);
            return data.data[0].images.original.url;
        } catch (error) {
            console.error("Giphy error", error);
            return null;
        }
    };

    const renderWeather = async (data) => {
        const condition = data.current.condition.toLowerCase();
        const gifUrl = await getGif(condition);

        let html = `
                    <h2>${data.location}</h2>
                    <p>Temp: ${data.current.temp}°${data.units === "f" ? "F" : "C"}</p>
                    <p>Condition: ${condition}</p>
                    <p>Description: ${data.description}</p>
            `;
            
            if (gifUrl) {
                html += `<img src="${gifUrl}" alt="${condition} gif" style="max-width: 200px;">`;
            } else {
                html += `<p>No gif available for ${condition}</p>`;
            }

            weatherDiv.innerHTML = html;

            document.body.style.backgroundColor = condition.includes("clear") ? "skyblue" :
                                                  condition.includes("rain") ? "gray" :
                                                  condition.includes("cloud") ? "lightgray" : "white";
    };
    return {renderWeather};
}