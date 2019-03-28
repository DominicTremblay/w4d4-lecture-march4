// Async Await is sugar coating the use of promises
// to make the code look more like sync code

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

// We need to specify that this function is having async calls
// putting the async keyword in front
const sayHello = async () => {
  let user = null;
  let upUser = null;
  // With Async Await, we can now use try catch
  try {
    // await gets the results from the promise of getUser
    user = await getUser();
  } catch (e) {
    console.log(e.message);
    return;
  }

  // With Async Await, we can now use try catch
  try {
    // await gets the result from the promise of upperCaseAsync
    upUser = await upperCaseAsync(user.name);
  } catch (e) {
    console.log(e.message);
    return;
  }

  console.log('Hello,', upUser);
};

sayHello();
