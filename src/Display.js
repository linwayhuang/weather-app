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
        
        weatherDiv.innerHTML = `
                            <h2>${data.location}</h2>
                            <p>Temp: ${data.current.temp}°${data.units === "f" ? "F" : "C"}</p>
                            <p>Condition: ${condition}</p>
                            <p>Description: ${data.description}</p>
            `;
        document.body.style.backgroundColor = condition.includes("clear") ? "skyblue" :
                                              condition.includes("rain") ? "gray" :
                                              condition.includes("cloud") ? "lightgray" : "white";
    
        
        if (gifUrl) {
            console.log(gifUrl);
            weatherDiv.innterHTML += `<img src="${gifUrl}" alt="${condition} gif" style="max-width: 200px;">`;
        } else {
            weatherDiv.innerHTML += `<p>No gif available for ${condition}</p>`;
        }
    };
    return {renderWeather};
}