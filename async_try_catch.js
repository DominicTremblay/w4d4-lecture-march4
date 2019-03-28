// Problem with try catch with async
// Catch does not work
// Catch has disappeared by the time async is done

// Throws an error after 3 secs
const someAsyncFct = () => {
  console.log('async, taking 3 seconds...');
  setTimeout(() => {
    throw new Error();
  }, 3000);
};

// This try catch cannot catch the error
try {
  someAsyncFct();
} catch (e) {
  // not catching the error
  console.log('trying to catch the error: ', e.message);
} finally {
  console.log('This is executed way before the error is thrown');
}
