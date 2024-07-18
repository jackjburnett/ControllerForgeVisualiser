let shapeLabels = [
    "Up", "Down", "Left", "Right",
    "A", "B", "X", "Y",
    "LB", "LT", "RB", "RT"
];

let zoomFactor = 1;
let baseWidth = 215; // Default base width
let baseHeight = 120; // Default base height

function createShapeInput(index) {
    const label = shapeLabels[index];
    const div = document.createElement('div');
    div.className = 'col-md-3 shape-input';
    div.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-center">${label}</h5>
                <div class="form-group">
                    <label for="shape${index}">Shape:</label>
                    <select class="form-control" id="shape${index}" name="shape${index}" onchange="toggleDiameter(${index})" required>
                        <option value="square">Key</option>
                        <option value="circle">Button</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="width${index}" id="widthLabel${index}">Width:</label>
                        <input type="number" class="form-control" id="width${index}" name="width${index}" placeholder="mm" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="height${index}" id="heightLabel${index}">Height:</label>
                        <input type="number" class="form-control" id="height${index}" name="height${index}" placeholder="mm" required>
                    </div>
                </div>
                <div class="form-group" id="diameterGroup${index}" style="display:none;">
                    <label for="diameter${index}" id="diameterLabel${index}">Diameter:</label>
                    <input type="number" class="form-control" id="diameter${index}" name="diameter${index}" placeholder="mm">
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="x${index}">X Position:</label>
                        <input type="number" class="form-control" id="x${index}" name="x${index}" placeholder="mm">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="y${index}">Y Position:</label>
                        <input type="number" class="form-control" id="y${index}" name="y${index}" placeholder="mm">
                    </div>
                </div>
            </div>
        </div>
    `;
    return div;
}


function toggleDiameter(index) {
    const shape = document.getElementById(`shape${index}`).value;
    const widthHeightGroup = document.getElementById(`widthLabel${index}`).parentNode.parentNode;
    const diameterGroup = document.getElementById(`diameterGroup${index}`);

    if (shape === 'circle') {
        widthHeightGroup.style.display = 'none';
        diameterGroup.style.display = 'block';
    } else {
        widthHeightGroup.style.display = 'block';
        diameterGroup.style.display = 'none';
    }
}

function initializeForm() {
    const formContainer = document.getElementById('formContainer');
    for (let i = 0; i < shapeLabels.length; i++) {
        formContainer.appendChild(createShapeInput(i));
    }
}

function applyBaseSizeAndZoom() {
    baseWidth = document.getElementById('baseWidth').value || baseWidth;
    baseHeight = document.getElementById('baseHeight').value || baseHeight;
    zoomFactor = document.getElementById('zoomFactor').value || zoomFactor;

    // Adjust canvas size based on baseWidth and baseHeight multiplied by zoomFactor
    const canvas = document.getElementById('canvas');
    canvas.style.width = baseWidth * zoomFactor + 'px';
    canvas.style.height = baseHeight * zoomFactor + 'px';

    plotShapes(); // Re-plot shapes after applying base size and zoom
}

function plotShapes() {
    const canvas = document.getElementById('canvas');
    const baseHeight = canvas.offsetHeight; // Assuming baseHeight is defined somewhere
    const zoomFactor = parseFloat(document.getElementById('zoomFactor').value) || 1;
    canvas.innerHTML = '';  // Clear the canvas

    for (let i = 0; i < shapeLabels.length; i++) {
        const shape = document.getElementById(`shape${i}`).value;
        let x = document.getElementById(`x${i}`).value;
        let y = document.getElementById(`y${i}`).value;

        if (x === "" || y === "") continue;

        // Convert values to integers and multiply by zoom factor
        x = parseInt(x) * zoomFactor;
        y = parseInt(y) * zoomFactor;

        let shapeElement = document.createElement('div');
        shapeElement.className = 'shape ' + shape;

        if (shape === 'circle') {
            let diameter = document.getElementById(`diameter${i}`).value;
            diameter = parseInt(diameter) * zoomFactor;
            shapeElement.style.width = diameter + 'px';
            shapeElement.style.height = diameter + 'px';
            x -= diameter / 2; // Center x position for circle
            y = baseHeight * zoomFactor - y - diameter / 2; // Center y position for circle
        } else {
            let width = document.getElementById(`width${i}`).value;
            let height = document.getElementById(`height${i}`).value;
            width = parseInt(width) * zoomFactor;
            height = parseInt(height) * zoomFactor;
            shapeElement.style.width = width + 'px';
            shapeElement.style.height = height + 'px';
            x -= width / 2; // Center x position for rectangle or other shapes
            y = baseHeight * zoomFactor - y - height / 2; // Center y position for rectangle or other shapes
        }

        shapeElement.style.left = x + 'px';
        shapeElement.style.top = y + 'px';
        shapeElement.innerHTML = `<span>${shapeLabels[i]}</span>`;
        shapeElement.style.display = 'flex';
        shapeElement.style.alignItems = 'center';
        shapeElement.style.justifyContent = 'center';

        canvas.appendChild(shapeElement);
    }
}

let currentLCD = null; // Variable to store the current LCD element

function addLCD() {
    const lcdXInput = document.getElementById('lcdX');
    const lcdYInput = document.getElementById('lcdY');
    const zoomFactorInput = document.getElementById('zoomFactor');

    // Validate inputs
    const lcdX = parseFloat(lcdXInput.value);
    const lcdY = parseFloat(lcdYInput.value);
    if (isNaN(lcdX) || isNaN(lcdY)) {
        alert('Please enter valid numeric values for X and Y positions.');
        return;
    }

    // Get zoom factor
    const zoomFactor = parseFloat(zoomFactorInput.value) || 1;

    // Calculate scaled positions
    const lcdWidth = 25 * zoomFactor; // LCD element width
    const lcdHeight = 20 * zoomFactor; // LCD element height

    // Calculate position relative to LCD middle
    const scaledX = Math.round(lcdX * zoomFactor - lcdWidth / 2);
    const canvasHeight = document.getElementById('canvas').clientHeight;
    const scaledY = Math.round(canvasHeight - (lcdY * zoomFactor + lcdHeight / 2)); // Calculate Y from bottom-middle

    // Create LCD element
    const LCD = document.createElement('div');
    LCD.className = 'shape LCD';
    LCD.style.width = lcdWidth + 'px';
    LCD.style.height = lcdHeight + 'px';
    LCD.style.position = 'absolute';
    LCD.style.left = scaledX + 'px';
    LCD.style.top = scaledY + 'px';
    LCD.innerHTML = '<span>LCD</span>';

    // Replace current LCD if it exists
    if (currentLCD) {
        currentLCD.remove();
    }

    // Set new LCD as the current LCD
    currentLCD = LCD;

    // Add LCD to canvas
    const canvas = document.getElementById('canvas');
    canvas.appendChild(LCD);
}

// Define a variable to store the arrow element
let arrowElement = null;

function addUSB() {
    // Get X and Y positions from form
    const usbX = parseFloat(document.getElementById('usbX').value);
    const usbY = parseFloat(document.getElementById('usbY').value);
    const zoomFactor = parseFloat(document.getElementById('zoomFactor').value) || 1;

    // Remove the existing arrow if it exists
    if (arrowElement) {
        arrowElement.remove();
    }

    // Create a new arrow element pointing to the specified position
    arrowElement = document.createElement('div');
    arrowElement.classList.add('usb-arrow');

    // Calculate left position to center the arrow
    const arrowWidth = 20; // Adjust this value based on your arrow's width
    const leftPosition = (usbX * zoomFactor) - (arrowWidth / 2); // Center the arrow considering zoom

    arrowElement.style.left = leftPosition + 'px'; // Set left position

    // Calculate top position considering zoom
    const arrowHeight = 20; // Adjust this value based on your arrow's height
    const topPosition = (usbY * zoomFactor); // Place arrow at top edge

    arrowElement.style.top = topPosition + 'px';

    // Create and append label text
    const labelText = document.createElement('span');
    labelText.textContent = 'USB';
    arrowElement.appendChild(labelText);

    // Append the arrow to the canvas or container where you want to display it
    const canvas = document.getElementById('canvas');
    canvas.appendChild(arrowElement);
}

function saveConfigurationToJson() {
    // Gather all variables
    let configuration = {
        baseWidth: baseWidth,
        baseHeight: baseHeight,
        zoomFactor: zoomFactor,
        shapeInputs: []
    };

    // Iterate over shape inputs
    for (let i = 0; i < shapeLabels.length; i++) {
        let shapeInput = {
            label: shapeLabels[i],
            shape: document.getElementById(`shape${i}`).value,
            width: document.getElementById(`width${i}`).value,
            height: document.getElementById(`height${i}`).value,
            diameter: document.getElementById(`diameter${i}`).value,
            x: document.getElementById(`x${i}`).value,
            y: document.getElementById(`y${i}`).value
        };
        configuration.shapeInputs.push(shapeInput);
    }

    // LCD configuration
    if (currentLCD) {
        let lcdConfig = {
            x: currentLCD.style.left.replace('px', ''),
            y: currentLCD.style.top.replace('px', '')
        };
        configuration.lcd = lcdConfig;
    }

    // USB configuration
    if (arrowElement) {
        let usbConfig = {
            x: arrowElement.style.left.replace('px', ''),
            y: arrowElement.style.top.replace('px', '')
        };
        configuration.usb = usbConfig;
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
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'configuration.json'; // Filename to be downloaded
    document.body.appendChild(a); // Append link to body
    a.click(); // Programmatically click the link to trigger download

    // Clean up: remove the temporary URL
    setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }, 0);
}

window.onload = initializeForm;