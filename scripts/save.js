import _buttonLabels from "./_buttonLabels";

function saveConfigurationToJson() {
  // Gather all variables
  let configuration = {
    buttons: {},
    keys: {},
  };

  configuration.base = {
    height: 50,
    width: baseWidth,
    length: baseHeight,
    thickness: 4,
    bevel: true,
    screw_diameter: 0,
  };

  // Iterate over shape inputs
  for (let i = 0; i < _buttonLabels.length; i++) {
    if (document.getElementById(`shape-${i}`).value === "button") {
      configuration.buttons[_buttonLabels[i]] = {
        x: document.getElementById(`x-${i}`).value,
        y: document.getElementById(`y-${i}`).value,
        diameter: document.getElementById(`diameter-${i}`).value,
        thickness: 2,
        bevel: true,
        mount: {
          type: "MX",
          height: 4.0,
          diameter: 6.0,
          X_point_width: 4.2,
          X_point_length: 1.4,
        },
        wall: {
          thickness: 1.0,
          height: 1.0,
        },
      };
    } else {
      configuration.keys[_buttonLabels[i]] = {
        x: document.getElementById(`x-${i}`).value,
        y: document.getElementById(`y-${i}`).value,
        bevel: true,
        mount: {
          type: "MX",
          height: 7.0,
          diameter: 6.0,
          X_point_width: 4.2,
          X_point_length: 1.4,
        },
        units: {
          top: 12,
          base: 18,
        },
        dimensions: {
          width: document.getElementById(`width-${i}`).value / 12,
          length: document.getElementById(`height-${i}`).value / 18,
          wall_height: 8,
          thickness: 1,
        },
      };
    }
  }

  // LCD configuration
  if (currentLCD) {
    configuration.base["lcd_screen"] = {};
    configuration.base.lcd_screen = {
      x: currentLCD.x,
      y: currentLCD.y,
      rounded: true,
    };
  }
  // USB configuration
  if (arrowElement) {
    configuration.base["usb_c"] = {};
    configuration.base["usb_c"]["location"] = {
      x: arrowElement.x,
      y: arrowElement.y,
      z: 25,
    };
  }

  // Convert to JSON string
  let jsonString = JSON.stringify(configuration);

  // Optionally log or use the jsonString
  console.log(jsonString);

  // Return the JSON object (optional)
  return configuration;
}

function saveConfiguration() {
  const configuration = saveConfigurationToJson();
  const jsonString = JSON.stringify(configuration, null, 2); // Formatting JSON for readability

  // Create a Blob object from the JSON string
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element to trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = "configuration.json"; // Filename to be downloaded
  document.body.appendChild(a); // Append link to body
  a.click(); // Programmatically click the link to trigger download

  // Clean up: remove the temporary URL
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 0);
}
