import _buttonLabels from "./_buttonLabels.js";

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
