import _buttonLabels from "./_buttonLabels.js";

function createButtonInput(label) {
  const div = document.createElement("div");
  div.className = "col-sm-6 col-md-4 col-lg-3 col-xl-2 button-input mb-3";
  div.innerHTML = `
        <div class="card">
            <h5 class="card-title text-center">
                <a data-toggle="collapse" href="#collapse-${label}" aria-expanded="true" aria-controls="collapse-${label}" id="heading-${label}" class="collapsed d-block">
                    ${label}
                    <i class="fa fa-chevron-down pull-right"></i>
                </a>
            </h5>
            <div id="collapse-${label}" class="collapse" aria-labelledby="heading-${label}">
              <div class="card-body">
                  <div class="form-group">
                      <label for="shape-${label}">Shape:</label>
                      <select class="form-control" id="shape-${label}" name="shape-${label}" required>
                          <option value="button">Button</option>
                          <option value="key">Key</option>
                      </select>
                  </div>
                  <div class="form-row" id="widthHeightGroup-${label}" style="display:none;">
                      <div class="form-group col-sm-6">
                          <label for="width-${label}" id="widthLabel-${label}">Width:</label>
                          <input type="number" class="form-control" id="width-${label}" name="width-${label}" placeholder="mm" required>
                      </div>
                      <div class="form-group col-sm-6">
                          <label for="height-${label}" id="heightLabel-${label}">Height:</label>
                          <input type="number" class="form-control" id="height-${label}" name="height-${label}" placeholder="mm" required>
                      </div>
                  </div>
                  <div class="form-group" id="diameterGroup-${label}">
                      <label for="diameter-${label}" id="diameterLabel-${label}">Diameter:</label>
                      <input type="number" class="form-control" id="diameter-${label}" name="diameter-${label}" placeholder="mm">
                  </div>
                  <div class="form-row">
                      <div class="form-group col-sm-6">
                          <label for="x-${label}">X:</label>
                          <input type="number" class="form-control" id="x-${label}" name="x-${label}" placeholder="mm">
                      </div>
                      <div class="form-group col-sm-6">
                          <label for="y-${label}">Y:</label>
                          <input type="number" class="form-control" id="y-${label}" name="y-${label}" placeholder="mm">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="rotation-${label}" id="rotationLabel-${label}">Rotation:</label>
                      <input type="number" class="form-control" id="rotation-${label}" name="rotation-${label}" placeholder="°">
                  </div>
                </div>
            </div>
        </div>
    `;
  return div;
}

export function toggleDiameter(label) {
  const shape = document.getElementById(`shape-${label}`).value;
  const widthHeightGroup = document.getElementById(`widthHeightGroup-${label}`);
  const diameterGroup = document.getElementById(`diameterGroup-${label}`);

  if (shape === "button") {
    widthHeightGroup.style.display = "none";
    diameterGroup.style.display = "block";
  } else {
    widthHeightGroup.style.display = "flex";
    diameterGroup.style.display = "none";
  }
}

export function initializeButtons() {
  const container = document.getElementById("buttonInputsContainer");
  _buttonLabels.forEach((label) => {
    const sanitizedLabel = label.toUpperCase(); // Sanitize the label for IDs
    container.appendChild(createButtonInput(sanitizedLabel));

    // Add event listener for the dropdown after creating the input
    const dropdown = document.getElementById(`shape-${sanitizedLabel}`);
    if (dropdown) {
      dropdown.addEventListener("change", () => toggleDiameter(sanitizedLabel));
    }
  });
}
