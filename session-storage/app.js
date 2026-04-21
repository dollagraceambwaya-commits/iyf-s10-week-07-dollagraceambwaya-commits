const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");

// Load saved values
inputs.forEach((input) => {
  const saved = sessionStorage.getItem(`form_${input.name}`);
  if (saved) input.value = saved;

  input.addEventListener("input", () => {
    sessionStorage.setItem(`form_${input.name}`, input.value);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputs.forEach((input) => sessionStorage.removeItem(`form_${input.name}`));
  alert("Form submitted and sessionStorage cleared!");
});
