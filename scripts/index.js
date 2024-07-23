import { initializeForm } from "./buttons.js";
import { plotButtons, applyBaseSizeAndZoom } from "./canvas.js";

// Initialize the form and set up event listeners
function initialize() {
  initializeForm();
  applyBaseSizeAndZoom();
}

document.addEventListener("DOMContentLoaded", initialize);
document
  .getElementById("baseButton")
  .addEventListener("click", applyBaseSizeAndZoom);
document.getElementById("plotButton").addEventListener("click", plotButtons);
document.getElementById("lcdForm").addEventListener("submit", addLCD);
document.getElementById("usbForm").addEventListener("submit", addUSB);

document
  .querySelector(".btn-success")
  .addEventListener("click", saveConfiguration);
