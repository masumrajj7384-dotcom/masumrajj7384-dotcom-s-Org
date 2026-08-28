try {
  require('./app/static/app.js');
} catch (e) {
  if (e instanceof SyntaxError) {
    console.error(e);
    process.exit(1);
  }
}
console.log("Syntax is valid");
