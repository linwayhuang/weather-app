import "./styles.css"
import { WeatherManager } from "./WeatherManager";
import { Display } from "./Display";
import { InputController } from "./InputController";

const AppController = (function () {
    const apiKey = "HEDLQU8QCQRPNX6ZYEW6W3HJZ";
    const weatherManager = WeatherManager(apiKey);
    const display = Display();
    const input = InputController();
    function start() {
        input.addEventListeners(weatherManager, display);
    }
    return {start};
})();

console.log("index.js running");

AppController.start();