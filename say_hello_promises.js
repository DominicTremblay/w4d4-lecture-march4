// Provide the user object using promises
const getUser = () => {
  // a Promise can be resolved or rejected
  return new Promise(function(resolve, reject) {
    // Simulating some validation
    if (true) {
      console.log('Getting the user...3 secs');
      // resolve is sending back the object
      setTimeout(function() {
        resolve({ name: 'SpongeBob' });
      }, 3000);
    } else {
      // if there is an error, the promise is rejected
      reject(new Error('Cannot get user'));
    }
  });
};

// Using promise to return an uppercase version of the string
const upperCaseAsync = inputStr => {
  return new Promise((resolve, reject) => {
    if (true) {
      console.log('Putting to uppercase...3secs');
      setTimeout(resolve(inputStr.toUpperCase()), 3000);
    } else {
      reject(new Error('Cannot set to uppercase'));
    }
  });
};

const sayHello = () => {
  // we can chain multiple .then to get results from async calls
  // what's being returned by resolve in a promise gets passed
  // to .then

  getUser()
    // user objects get stored in user
    .then(user => upperCaseAsync(user.name))
    // result of upperCaseAsync is being stored in upStr
    .then(upStr => console.log('Hello', upStr))
    // With promises we can catch errors in async code
    .catch(e => console.log(e))
    .finally(() => {
      console.log('getUser request completed');
    });
};

sayHello();
