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
    const canvasHeight = canvas.offsetHeight;
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
            y = baseHeight * zoomFactor - y - diameter;
        } else {
            let width = document.getElementById(`width${i}`).value;
            let height = document.getElementById(`height${i}`).value;
            width = parseInt(width) * zoomFactor;
            height = parseInt(height) * zoomFactor;
            shapeElement.style.width = width + 'px';
            shapeElement.style.height = height + 'px';
            y = baseHeight * zoomFactor - y - height;
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
    const lcdX = document.getElementById('lcdX').value;
    const lcdY = document.getElementById('lcdY').value;

    // Validation: Ensure X and Y positions are filled
    if (!lcdX || !lcdY) {
        alert('Please fill out X and Y positions.');
        return;
    }

    // Convert X and Y positions to integers and multiply by zoom factor
    const zoomFactor = parseFloat(document.getElementById('zoomFactor').value) || 1;
    const scaledX = Math.round(lcdX * zoomFactor);
    const scaledY = Math.round(lcdY * zoomFactor);

    // Create LCD element
    const LCD = document.createElement('div');
    LCD.className = 'shape LCD';
    LCD.style.width = (25 * zoomFactor) + 'px'; // Fixed width of 25px scaled by zoom
    LCD.style.height = (20 * zoomFactor) + 'px'; // Fixed height of 20px scaled by zoom
    LCD.style.left = scaledX + 'px';
    LCD.style.top = scaledY + 'px';
    LCD.innerHTML = '<span>LCD</span>';

    // Replace current LCD if it exists
    if (currentLCD) {
        currentLCD.remove(); // Remove current LCD from canvas
    }

    // Set new LCD as the current LCD
    currentLCD = LCD;

    // Add LCD to canvas
    const canvas = document.getElementById('canvas');
    canvas.appendChild(LCD);
}


window.onload = initializeForm;