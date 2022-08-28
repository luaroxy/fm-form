/*function validateForm(e) {
  const form = e.target;
  const field = Array.from(form.elements);

  // reset fields
  field.forEach((i) => {
    i.setCustomValidity("");
    i.parentElement.classList.remove("invalid");
  });

  if (!form.checkValidity()) {
    // form is invalid - cancel submit
    e.preventDefault();
    e.stopImmediatePropagation();

    // apply invalid class
    field.forEach((i) => {
      if (!i.checkValidity()) {
        // field is invalid - add class
        i.parentElement.classList.add("invalid");
      }
    });
  }
}

const form = document.getElementById("ctaForm");
form.noValidate = true;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm(e);
});
*/

const validators = {
  required: (element) => element.value.length > 0,
  noNumbers: (element) => !element.value.match(/[0-9]/g),
  validEmail: (element) => element.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  isCountry: (element) => countriesList.includes(element.value),
  isZipCode: (element) => element.value.match(/(^\d{5}$)|(NA)/),
  minLength: (element) => element.value.length >= 8,
  mustMatch: (element) =>
    element.value == document.getElementById("password").value,
};

function validateElement(element) {
  resetValidation(element);
  const rules = element.dataset.validate.split(" ");
  rules.forEach((rule) => {
    if (validators[rule](element)) {
      return;
    } else {
      resetValidation(element);
      markElementInvalid(element, rule);
    }
  });
}

function markElementInvalid(element, validatorName) {
  element.classList.add("invalid");
  const feedbackMessage = element.parentNode.querySelector(
    `[data-validation-message=${validatorName}]`
  );
  feedbackMessage.classList.add("message-visible");
}

const form = document.getElementById("ctaForm");
form.noValidate = true;
const formElements = Array.from(form.elements);

formElements.forEach((formElement) => {
  formElement.addEventListener("blur", () => {
    validateElement(formElement);
  });
});

function resetValidation(element) {
  element.classList.remove("invalid");
  element.parentNode
    .querySelectorAll("[data-validation-message]")
    .forEach((e) => {
      e.classList.remove("message-visible");
    });
}

form.addEventListener("submit", (event) => {
  let formIsValid = true;
  form.classList.remove("invalid");

  formElements.forEach((formElement) => {
    if (!formElement.dataset) return;
    if (!formElement.dataset.validate) return;
    validateElement(formElement);
  });

  formIsValid = form.querySelectorAll(".invalid").length === 0;

  if (formIsValid === false) {
    form.classList.add("invalid");
    event.preventDefault();
  }
});

const countries = Countries.countries;
countriesList = [];
Object.values(countries).forEach((element) => countriesList.push(element.name));
