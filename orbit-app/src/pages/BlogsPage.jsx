(e) => {
  const sanitizedValue = sanitizeInput(e.target.value); // Sanitize the input
  setContent(sanitizedValue);
}

function sanitizeInput(input) {
  // Implement a sanitization function to escape potentially dangerous characters
  const element = document.createElement('div');
  element.innerText = input;
  return element.innerHTML;
}