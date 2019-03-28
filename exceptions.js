const someFct = () => {
  console.log('Executing someFct()...');
  undeclared;
};

// someFct();
// This never gets executed because our app crashes
// console.log('After Executing someFct()');

// try catch allows us to gracefully handle the error
try {
  someFct();
} catch (e) {
  console.log(`Error:${e.name} ${e.message}`);
} finally {
  console.log('App can continue');
}
