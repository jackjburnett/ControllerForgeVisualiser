import _componentLabels from "./_componentLabels.js";

function createComponentInput(label) {
  const div = document.createElement("div");
  div.className = "col-sm-6 component-input";
  div.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-center">${label}</h5>
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
            </div>
        </div>
    `;
  return div;
}

export function initializeComponents() {
  const container = document.getElementById("componentsContainer");
  _componentLabels.forEach((label) => {
    const sanitizedLabel = label.toUpperCase(); // Sanitize the label for IDs
    container.appendChild(createComponentInput(sanitizedLabel));
  });
}
