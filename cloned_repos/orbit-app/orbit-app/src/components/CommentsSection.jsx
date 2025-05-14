(cmt, index) => (
  <div key={index}>{sanitizeHTML(cmt.comment)}</div>
)

// Ensure to implement a 'sanitizeHTML' function that properly sanitizes the input to prevent XSS attacks.
function sanitizeHTML(html) {
  // Use a library like DOMPurify to sanitize the HTML
  return DOMPurify.sanitize(html);
}