import _buttonLabels from "./_buttonLabels.js";

function saveConfigurationToJson() {
  // Gather all variables
  let configuration = {
    buttons: {},
    keys: {},
  };

  configuration.base = {
    height: 50,
    width: parseFloat(document.getElementById("baseWidth").value) || 0,
    length: parseFloat(document.getElementById("baseHeight").value) || 0,
    thickness: 4,
    bevel: true,
    screw_diameter: 0,
  };

  // Iterate over shape inputs
  _buttonLabels.forEach((label) => {
    let shape = document.getElementById(`shape-${label}`);
    let x = document.getElementById(`x-${label}`);
    let y = document.getElementById(`y-${label}`);

    if (!shape || !x || !y) {
      console.error(`Missing elements for label: ${label}`);
      return;
    }

    shape = shape.value;
    x = parseFloat(x.value);
    y = parseFloat(y.value);
    if (isNaN(x) || isNaN(y)) {
      return;
    }

    let rotation = parseFloat(
      document.getElementById(`rotation-${label}`).value,
    );
    if (isNaN(rotation)) {
      rotation = 0;
    }

    if (shape === "button") {
      let diameter = parseFloat(
        document.getElementById(`diameter-${label}`).value,
      );
      if (isNaN(diameter)) {
        return;
      }
      configuration.buttons[label] = {
        x: x,
        y: y,
        diameter: diameter,
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
      let width = parseFloat(document.getElementById(`width-${label}`).value);
      let height = parseFloat(document.getElementById(`height-${label}`).value);

      if (isNaN(width) || isNaN(height)) {
        return;
      }

      configuration.keys[label] = {
        x: x,
        y: y,
        rotation: rotation,
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
          width: width / 12,
          length: height / 18,
          wall_height: 8,
          thickness: 1,
        },
      };
    }
  });

  // Convert to JSON string
  let jsonString = JSON.stringify(configuration);

  // Optionally log or use the jsonString
  console.log(jsonString);

  // Return the JSON object (optional)
  return configuration;
}

export function saveConfiguration() {
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
