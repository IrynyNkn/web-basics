const fields = [
  {
    id: "name",
    regexRule: /[A-Z][a-z]+\s+[A-Z][a-z]+\s?([A-Z][a-z]+)*$/,
  },
  {
    id: "birthdate",
    regexRule: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/,
  },
  {
    id: "address",
    regexRule: /^[A-Z]?[a-z]*\,\s[A-Z]+\w*\s?(\d+)?$/,
  },
  {
    id: "email",
    regexRule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  {
    id: "telegram",
    regexRule: /@\w+\d*/,
  },
];
const validClassName = "is-valid";
const invalidClassName = "is-invalid";

console.group("getting elements");
fields.forEach((field) => {
  const input = document.querySelector(`#${field.id}`);
  field.inputElement = input;
  field.outputElement = document.querySelector(`#${field.id}-value`);

  input.addEventListener("input", (e) => {
    input.classList.remove(validClassName, invalidClassName);
  });

  console.log(field);
});
console.groupEnd();

const form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  fields.forEach((field) => {
    const { inputElement, regexRule } = field;
    const value = inputElement.value;

    inputElement.classList.remove(validClassName, invalidClassName);

    if (!value.trim() || !regexRule.test(value)) {
      inputElement.classList.add(invalidClassName);
      isValid = false;
    } else {
      inputElement.classList.add(validClassName);
    }
  });

  if (isValid) {
    displayFormValues();
  }
});

function displayFormValues() {
  fields.forEach((field) => {
    field.outputElement.innerHTML = field.inputElement.value;
  });

  const responseBlock = document.querySelector("#response-block");
  responseBlock.style.visibility = "visible";
}
