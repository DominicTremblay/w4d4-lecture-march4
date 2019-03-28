const upperCaseAsync = (inputStr, cb) => {
  setTimeout(() => cb(null, inputStr.toUpperCase()), 3000);
};

try {
  upperCaseAsync('Hello SpongeBob', (err, upStr) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(upStr);
  });
} catch (e) {
  console.log('Not able to catch errors');
} finally {
  console.log('Printing this before the string is returned');
}
