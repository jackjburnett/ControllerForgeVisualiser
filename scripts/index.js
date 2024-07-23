import { initializeForm, toggleDiameter } from "./buttons.js";
import { plotShapes } from "./canvas.js";

// Initialize the form and set up event listeners
function initialize() {
  initializeForm();

  // Set up event listener for button
  const plotButton = document.getElementById("plotButton");
  if (plotButton) {
    plotButton.addEventListener("click", plotShapes);
  }
}

// Run the initialize function once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initialize);

// Example in scripts/index.js
document.getElementById("plotButton").addEventListener("click", plotButtons);
document.getElementById("lcdForm").addEventListener("submit", addLCD);
document.getElementById("usbForm").addEventListener("submit", addUSB);
document
  .getElementById("baseSizeForm")
  .addEventListener("submit", applyBaseSizeAndZoom);
document
  .querySelector(".btn-success")
  .addEventListener("click", saveConfiguration);
