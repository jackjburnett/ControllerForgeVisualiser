import _buttonLabels from "./_buttonLabels.js";

// TODO: Convert to dictionary
let currentLCD = null; // Variable to store the current LCD element
let currentUSB = null; // Variable to store the current USB element

let zoomFactor = 1; // Default zoom factor
let baseWidth = 215; // Default base width
let baseHeight = 120; // Default base height

function applyBaseSizeAndZoom() {
  baseWidth = document.getElementById("baseWidth").value || baseWidth;
  baseHeight = document.getElementById("baseHeight").value || baseHeight;
  zoomFactor = document.getElementById("zoomFactor").value || zoomFactor;

  // Adjust canvas size based on baseWidth and baseHeight multiplied by zoomFactor
  const canvas = document.getElementById("canvas");
  canvas.style.width = baseWidth * zoomFactor + "px";
  canvas.style.height = baseHeight * zoomFactor + "px";

  plotShapes(); // Re-plot shapes after applying base size and zoom
}

export function plotShapes() {
  const canvas = document.getElementById("canvas");
  const baseHeight = canvas.offsetHeight; // Assuming baseHeight is defined somewhere
  const zoomFactor =
    parseFloat(document.getElementById("zoomFactor").value) || 1;
  canvas.innerHTML = ""; // Clear the canvas

  _buttonLabels.forEach((label, i) => {
    const shape = document.getElementById(`shape${i}`).value;
    let x = document.getElementById(`x${i}`).value;
    let y = document.getElementById(`y${i}`).value;

    if (x === "" || y === "") return;

    // Convert values to integers and multiply by zoom factor
    x = parseInt(x) * zoomFactor;
    y = parseInt(y) * zoomFactor;

    let shapeElement = document.createElement("div");
    shapeElement.className = "shape " + shape;

    if (shape === "button") {
      let diameter = document.getElementById(`diameter${i}`).value;
      diameter = parseInt(diameter) * zoomFactor;
      shapeElement.style.width = diameter + "px";
      shapeElement.style.height = diameter + "px";
      x -= diameter / 2; // Center x position for button
      y = baseHeight * zoomFactor - y - diameter / 2; // Center y position for button
    } else {
      let width = document.getElementById(`width${i}`).value;
      let height = document.getElementById(`height${i}`).value;
      width = parseInt(width) * zoomFactor;
      height = parseInt(height) * zoomFactor;
      shapeElement.style.width = width + "px";
      shapeElement.style.height = height + "px";
      x -= width / 2; // Center x position for rectangle or other shapes
      y = baseHeight * zoomFactor - y - height / 2; // Center y position for rectangle or other shapes
    }

    shapeElement.style.left = x + "px";
    shapeElement.style.top = y + "px";
    shapeElement.innerHTML = `<span>${label}</span>`;
    shapeElement.style.display = "flex";
    shapeElement.style.alignItems = "center";
    shapeElement.style.justifyContent = "center";

    canvas.appendChild(shapeElement);
  });
}

function addLCD() {
  const lcdXInput = document.getElementById("lcdX");
  const lcdYInput = document.getElementById("lcdY");
  const zoomFactorInput = document.getElementById("zoomFactor");

  // Validate inputs
  const lcdX = parseFloat(lcdXInput.value);
  const lcdY = parseFloat(lcdYInput.value);
  if (isNaN(lcdX) || isNaN(lcdY)) {
    alert("Please enter valid numeric values for X and Y positions.");
    return;
  }

  // Get zoom factor
  const zoomFactor = parseFloat(zoomFactorInput.value) || 1;

  // Calculate scaled positions
  const lcdWidth = 25 * zoomFactor; // LCD element width
  const lcdHeight = 20 * zoomFactor; // LCD element height

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
