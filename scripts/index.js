import { initializeForm, toggleDiameter } from "./buttons.js";
import { plotButtons, applyBaseSizeAndZoom } from "./canvas.js";

// Initialize the form and set up event listeners
function initialize() {
  initializeForm();
  applyBaseSizeAndZoom();
}

// Run the initialize function once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initialize);

// Example in scripts/index.js
document
  .getElementById("baseSizeForm")
  .addEventListener("click", applyBaseSizeAndZoom);
document.getElementById("plotButton").addEventListener("click", plotButtons);
document.getElementById("lcdForm").addEventListener("submit", addLCD);
document.getElementById("usbForm").addEventListener("submit", addUSB);

document
  .querySelector(".btn-success")
  .addEventListener("click", saveConfiguration);
