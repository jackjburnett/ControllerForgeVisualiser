import _buttonLabels from "./_buttonLabels.js";

export function loadConfiguration(event) {
  const fileInput = event.target;

  // Check if a file has been selected
  if (fileInput.files.length === 0) {
    alert("No file selected.");
    return;
  }

  // Get the selected file
  const file = fileInput.files[0];

  // Create a new FileReader instance
  const reader = new FileReader();

  // Define the onload function for the reader
  reader.onload = function (event) {
    // Get the file content
    const fileContent = event.target.result;

    // Implement your file processing logic here
    try {
      // Parse the JSON content
      const jsonData = JSON.parse(fileContent);
      console.log("Parsed JSON data:", jsonData);

      // Process the JSON data (e.g., update UI, save to application state)
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  // Read the file as text
  reader.readAsText(file);
}
