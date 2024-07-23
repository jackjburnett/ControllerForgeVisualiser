import { initializeButtons } from "./buttons.js";
import { initializeComponents } from "./components.js";
import { plotButtons, plotComponents, applyBaseSizeAndZoom } from "./canvas.js";
import { saveConfiguration } from "./save.js";
import { loadConfiguration } from "./load.js";

// Initialize the form and set up event listeners
function initialize() {
  initializeButtons();
  applyBaseSizeAndZoom();
  // initializeComponents();
}

document.addEventListener("DOMContentLoaded", initialize);
document
  .getElementById("baseButton")
  .addEventListener("click", applyBaseSizeAndZoom);
document.getElementById("plotButton").addEventListener("click", plotButtons);
document
  .getElementById("saveButton")
  .addEventListener("click", saveConfiguration);
document
  .getElementById("fileInput")
  .addEventListener("change", loadConfiguration);
// document.getElementById("plotComponents").addEventListener("click", plotComponents);
