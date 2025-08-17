export function InputController() {
    const addEventListeners = (weatherManager, display) => {
        console.log("weatherManager in InputController: ", weatherManager);
        const form = document.getElementById("searchForm");
        const toggle = document.getElementById("unitToggle");
        let units = "f";
        let lastLocation = "";
        console.log("Adding event listeners");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            lastLocation = form.location.value;
            try {
                const data = await weatherManager.getWeather(lastLocation, units);
                display.renderWeather(data);
            } catch (error) {
                console.error("Submit error:", error);
                document.getElementById("weather").textContent = "Error: " + error.message;
            }
        });
        toggle.addEventListener("click", async () => {
            units = units === "f" ? "c" : "f";
            console.log("Toggled to: ", units);
            if (lastLocation) {
                try {
                    const data = await weatherManager.getWeather(location, units);
                    display.renderWeather(data);
                } catch (error) {
                    console.error("Toggle error: ", error);
                    document.getElementById("weather").textContent = "Error: " + error.message;
                }
            }
        });
    };
    return {addEventListeners};
}