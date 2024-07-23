import _buttonLabels from "./_buttonLabels.js";

// TODO: Convert to dictionary
let currentLCD = null; // Variable to store the current LCD element
let currentUSB = null; // Variable to store the current USB element

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

function addLCD() {
  // Calculate position relative to LCD middle
  const scaledX = Math.round(lcdX * zoomFactor - lcdWidth / 2);
  const canvasHeight = document.getElementById("canvas").clientHeight;
  const scaledY = Math.round(
    canvasHeight - (lcdY * zoomFactor + lcdHeight / 2),
  ); // Calculate Y from bottom-middle

  // Create LCD element
  const LCD = document.createElement("div");
  LCD.className = "shape LCD";
  LCD.style.width = lcdWidth + "px";
  LCD.style.height = lcdHeight + "px";
  LCD.style.position = "absolute";
  LCD.style.left = scaledX + "px";
  LCD.style.top = scaledY + "px";
  LCD.innerHTML = "<span>LCD</span>";

  // Replace current LCD if it exists
  if (currentLCD) {
    currentLCD.remove();
  }

  // Set new LCD as the current LCD
  currentLCD = LCD;
  currentLCD.x = lcdX;
  currentLCD.y = lcdY;

  // Add LCD to canvas
  const canvas = document.getElementById("canvas");
  canvas.appendChild(LCD);
}

function addUSB() {
  // Get X and Y positions from form
  const usbX = parseFloat(document.getElementById("usbX").value);
  const usbY = parseFloat(document.getElementById("usbY").value);
  const zoomFactor =
    parseFloat(document.getElementById("zoomFactor").value) || 1;

  // Remove the existing arrow if it exists
  if (currentUSB) {
    currentUSB.remove();
  }

  // Create a new arrow element pointing to the specified position
  currentUSB = document.createElement("div");
  currentUSB.classList.add("usb-arrow");

  // Calculate left position to center the arrow
  const arrowWidth = 20; // Adjust this value based on your arrow's width
  const leftPosition = usbX * zoomFactor - arrowWidth / 2; // Center the arrow considering zoom

  currentUSB.style.left = leftPosition + "px"; // Set left position

  // Calculate top position considering zoom
  const topPosition = usbY * zoomFactor; // Place arrow at top edge

  currentUSB.style.top = topPosition + "px";

  // Create and append label text
  const labelText = document.createElement("span");
  labelText.textContent = "USB";
  currentUSB.appendChild(labelText);
  currentUSB.x = usbX;
  currentUSB.y = usbY;

  // Append the arrow to the canvas or container where you want to display it
  const canvas = document.getElementById("canvas");
  canvas.appendChild(currentUSB);
}
