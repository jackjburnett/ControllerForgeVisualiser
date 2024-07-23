import _buttonLabels from "./_buttonLabels.js";
import { toggleDiameter } from "./buttons.js";

export function loadConfiguration(event) {
  const fileInput = event.target;

  // Check if a file has been selected
  if (fileInput.files.length === 0) {
    alert("No file selected.");
    return;
  }

  // Get the selected file
  const file = fileInput.files[0];

  // Create a new FileReader instance
  const reader = new FileReader();

  // Define the onload function for the reader
  reader.onload = function (event) {
    // Get the file content
    const fileContent = event.target.result;

    // Implement your file processing logic here
    try {
      // Parse the JSON content
      const jsonData = JSON.parse(fileContent);
      console.log("Parsed JSON data:", jsonData);
      if (!jsonData) {
        console.log("No data selected.");
        return;
      }
      if (jsonData.base.width) {
        document.getElementById("baseWidth").value = jsonData.base.width;
      }
      if (jsonData.base.length) {
        document.getElementById("baseHeight").value = jsonData.base.length;
      }
      _buttonLabels.forEach((label) => {
        label = label.toUpperCase();
        let type = "";
        if (jsonData.keys[label]) {
          type = "keys";
          document.getElementById(`shape-${label}`).value = "key";
        } else if (jsonData.buttons[label]) {
          type = "buttons";
          document.getElementById(`shape-${label}`).value = "button";
        } else {
          console.log(`No key or button with label: ${label}`);
          return;
        }
        toggleDiameter(label);
        if (jsonData[type][label].x && jsonData[type][label].y) {
          document.getElementById(`x-${label}`).value = jsonData[type][label].x;
          document.getElementById(`y-${label}`).value = jsonData[type][label].y;
        }
        if (jsonData[type][label].diameter) {
          document.getElementById(`diameter-${label}`).value =
            jsonData[type][label].diameter;
        }
        if (jsonData[type][label].rotation) {
          document.getElementById(`rotation-${label}`).value =
            jsonData[type][label].rotation;
        }
        if (jsonData[type][label].units) {
          if (jsonData[type][label].dimensions) {
            if (
              jsonData[type][label].units.base &&
              jsonData[type][label].dimensions.width &&
              jsonData[type][label].dimensions.length
            ) {
              document.getElementById(`height-${label}`).value =
                jsonData[type][label].dimensions.length *
                jsonData[type][label].units.base;
              document.getElementById(`width-${label}`).value =
                jsonData[type][label].dimensions.width *
                jsonData[type][label].units.base;
            }
          }
        }
      });
      // Process the JSON data (e.g., update UI, save to application state)
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  // Read the file as text
  reader.readAsText(file);
}
