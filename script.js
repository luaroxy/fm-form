function validateForm(e) {
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
