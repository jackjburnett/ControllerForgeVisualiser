import _componentLabels from "./_componentLabels";

// TODO: Complete rework
document.addEventListener("DOMContentLoaded", () => {
  function createForm(component) {
    const formId = `${component}Form`;
    const title = `${component} Screen`;
    const fields = [
      {
        id: `${component.toLowerCase()}X`,
        name: `${component.toLowerCase()}X`,
        label: "X Position:",
        placeholder: "mm",
      },
      {
        id: `${component.toLowerCase()}Y`,
        name: `${component.toLowerCase()}Y`,
        label: "Y Position:",
        placeholder: "mm",
      },
    ];

    // Create form container
    const formContainer = document.createElement("div");
    formContainer.className = "border rounded p-3 col-md-6";

    // Create form
    const form = document.createElement("form");
    form.id = formId;

    // Create form title
    const formTitle = document.createElement("h2");
    formTitle.className = "text-center my-4";
    formTitle.textContent = title;
    form.appendChild(formTitle);

    // Create form fields
    fields.forEach((field) => {
      const formGroup = document.createElement("div");
      formGroup.className = "form-group";

      const label = document.createElement("label");
      label.htmlFor = field.id;
      label.textContent = field.label;
      formGroup.appendChild(label);

      const input = document.createElement("input");
      input.className = "form-control";
      input.id = field.id;
      input.name = field.name;
      input.placeholder = field.placeholder;
      input.required = true;
      input.type = "number";
      formGroup.appendChild(input);

      form.appendChild(formGroup);
    });

    // Create submit button
    const button = document.createElement("button");
    button.className = "btn btn-primary mb-2";
    button.textContent = `Add ${component}`;
    button.type = "button";
    button.addEventListener("click", () => {
      // Define handlers for each component
      if (component === "LCD") {
        addLCD();
      } else if (component === "USB") {
        addUSB();
      }
    });
    form.appendChild(button);

    formContainer.appendChild(form);

    return formContainer;
  }

  // Container for forms
  const formContainer = document.getElementById("formContainer");

  // Create and inject forms
  _componentLabels.forEach((component) => {
    const form = createForm(component);
    formContainer.appendChild(form);
  });
});
