import shapeLabels from "./shapelabels.js";

function createShapeInput(label) {
  const div = document.createElement("div");
  div.className = "col-sm-6 col-md-3 col-lg-2 shape-input";
  div.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-center">${label}</h5>
                <div class="form-group">
                    <label for="shape-${label}">Shape:</label>
                    <select class="form-control" id="shape-${label}" name="shape-${label}" onchange="toggleDiameter(${label})" required>
                        <option value="key">Key</option>
                        <option value="button">Button</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="width-${label}" id="widthLabel-${label}">Width:</label>
                        <input type="number" class="form-control" id="width-${label}" name="width-${label}" placeholder="mm" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="height-${label}" id="heightLabel-${label}">Height:</label>
                        <input type="number" class="form-control" id="height-${label}" name="height-${label}" placeholder="mm" required>
                    </div>
                </div>
                <div class="form-group" id="diameterGroup-${label}" style="display:none;">
                    <label for="diameter-${label}" id="diameterLabel-${label}">Diameter:</label>
                    <input type="number" class="form-control" id="diameter-${label}" name="diameter-${label}" placeholder="mm">
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="x-${label}">X Position:</label>
                        <input type="number" class="form-control" id="x${label}" name="x-${label}" placeholder="mm">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="y-${label}">Y Position:</label>
                        <input type="number" class="form-control" id="y-${label}" name="y-${label}" placeholder="mm">
                    </div>
                </div>
            </div>
        </div>
    `;
  return div;
}

function toggleDiameter(label) {
  const shape = document.getElementById(`shape-${label}`).value;
  const widthHeightGroup = document.getElementById(`widthLabel-${label}`)
    .parentNode.parentNode;
  const diameterGroup = document.getElementById(`diameterGroup-${label}`);

  if (shape === "button") {
    widthHeightGroup.style.display = "none";
    diameterGroup.style.display = "block";
  } else {
    widthHeightGroup.style.display = "block";
    diameterGroup.style.display = "none";
  }
}

export function initializeForm() {
  const container = document.getElementById("shapeInputsContainer");
  shapeLabels.forEach((label) => {
    const sanitizedLabel = label.toUpperCase(); // Sanitize the label for IDs
    container.appendChild(createShapeInput(sanitizedLabel));
  });
}
