const upperCaseAsync = inputStr => {
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(resolve(inputStr.toUpperCase()), 3000);
    } else {
      reject(new Error('Cannot set to uppercase'));
    }
  });
};

// we can execute multiple promises with Promise.all
// A single .then gets the result in an array

const multipleHellos = () => {
  return Promise.all([
    upperCaseAsync('SpongeBob'),
    upperCaseAsync('Baby Bowser'),
    upperCaseAsync('Super Mario'),
  ]).then(hellos => console.log(hellos));
};

multipleHellos();
