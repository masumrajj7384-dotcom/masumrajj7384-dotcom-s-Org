function cleanNum(val) {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  const cleaned = String(val).replace(/,/g, '').replace(/%/g, '').replace(/₹/g, '').replace(/Rs\./gi, '').trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
console.log(cleanNum("₹ 1,234.56%"));
console.log(cleanNum("Rs. -45.09"));
console.log(cleanNum(undefined));
