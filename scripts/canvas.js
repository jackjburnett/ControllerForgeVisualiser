import _buttonLabels from "./_buttonLabels.js";

let zoomFactor = 1; // Default zoom factor
let baseWidth = 215; // Default base width
let baseHeight = 120; // Default base height

export function applyBaseSizeAndZoom() {
  baseWidth =
    parseFloat(document.getElementById("baseWidth").value) || baseWidth;
  baseHeight =
    parseFloat(document.getElementById("baseHeight").value) || baseHeight;
  zoomFactor =
    parseFloat(document.getElementById("zoomFactor").value) || zoomFactor;

  // Adjust canvas size based on baseWidth and baseHeight multiplied by zoomFactor
  const canvas = document.getElementById("canvas");
  canvas.style.width = baseWidth * zoomFactor + "px";
  canvas.style.height = baseHeight * zoomFactor + "px";

  plotButtons();
}

export function plotButtons() {
  // Select the canvas
  const canvas = document.getElementById("canvas");
  if (!canvas) {
    console.error("Canvas element not found, please reload.");
    return;
  }

  // Clear the canvas by removing all child elements
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }

  _buttonLabels.forEach((label) => {
    label = label.toUpperCase();

    const shapeElement = document.getElementById(`shape-${label}`);
    const xElement = document.getElementById(`x-${label}`);
    const yElement = document.getElementById(`y-${label}`);
    const rotationElement = document.getElementById(`rotation-${label}`);

    if (!shapeElement || !xElement || !yElement) {
      console.error(`Missing elements for label: ${label}`);
      return;
    }

    const shape = shapeElement.value;
    let x = parseFloat(xElement.value);
    let y = parseFloat(yElement.value);
    let rotation = parseFloat(rotationElement.value);

    if (isNaN(x) || isNaN(y)) {
      console.error(`Invalid position values for label: ${label}`);
      return;
    }

    x *= zoomFactor;
    y *= zoomFactor;

    // Default rotation to 0 if not provided or invalid
    if (isNaN(rotation)) {
      rotation = 0;
    }

    const shapeDiv = document.createElement("div");
    shapeDiv.className = "shape " + shape;
    shapeDiv.style.position = "absolute"; // Ensure positioning is absolute

    if (shape === "button") {
      const diameterElement = document.getElementById(`diameter-${label}`);
      if (!diameterElement) {
        console.error(`Missing diameter element for label: ${label}`);
        return;
      }

      let diameter = parseFloat(diameterElement.value);
      if (isNaN(diameter)) {
        console.error(`Invalid diameter value for label: ${label}`);
        return;
      }

      diameter *= zoomFactor;
      shapeDiv.style.width = diameter + "px";
      shapeDiv.style.height = diameter + "px";
      shapeDiv.style.borderRadius = "50%";
      x -= diameter / 2; // Center x position for button
      y = baseHeight * zoomFactor - y - diameter / 2; // Center y position for button
    } else if (shape === "key") {
      const widthElement = document.getElementById(`width-${label}`);
      const heightElement = document.getElementById(`height-${label}`);

      if (!widthElement || !heightElement) {
        console.error(`Missing width or height element for label: ${label}`);
        return;
      }

      let width = parseFloat(widthElement.value);
      let height = parseFloat(heightElement.value);

      if (isNaN(width) || isNaN(height)) {
        console.error(`Invalid width or height values for label: ${label}`);
        return;
      }

      width *= zoomFactor;
      height *= zoomFactor;
      shapeDiv.style.width = width + "px";
      shapeDiv.style.height = height + "px";
      x -= width / 2; // Center x position for rectangle or other shapes
      y = baseHeight * zoomFactor - y - height / 2; // Center y position for rectangle or other shapes
    }

    shapeDiv.style.left = x + "px";
    shapeDiv.style.top = y + "px";
    shapeDiv.style.transform = `rotate(${rotation}deg)`;
    shapeDiv.innerHTML = `<span>${label}</span>`;
    shapeDiv.style.display = "flex";
    shapeDiv.style.alignItems = "center";
    shapeDiv.style.justifyContent = "center";

    canvas.appendChild(shapeDiv);
  });
}

// TODO: Plot Components
