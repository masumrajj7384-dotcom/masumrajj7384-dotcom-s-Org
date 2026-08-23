const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[^a-zA-Z0-9.\-\s&\'(),]/g, '').trim();
};
console.log(sanitizeInput("M&M.NS"));
console.log(sanitizeInput("L&T"));
console.log(sanitizeInput("Bajaj Auto"));
console.log(sanitizeInput("RELIANCE.NS"));
