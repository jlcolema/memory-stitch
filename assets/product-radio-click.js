function productRadioClicks() {
  if (!multipleProjectToggle) return;

  // Select all radio inputs with the specific name attribute
  const radioInputs = document.querySelectorAll('input[type="radio"][name="option-2"]');

// Add a click event listener to each radio input
  radioInputs.forEach(input => {
    input.addEventListener('click', event => {
        const inputId = `#${event.target.closest('input').getAttribute('id')}`;
        document.querySelectorAll(inputId).forEach(input => input.checked = true);
      }
    )
  });
}

productRadioClicks();
