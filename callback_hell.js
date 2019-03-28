// send back the object to the callback after 3 secs.
const getUser = cb => {
  console.log('Getting the user (3 secs)...');
  setTimeout(
    () => cb(null, { user: 'SpongeBob', email: 'spongebob@squarepants.com' }),
    3000
  );
};

// sends back uppercase version of the string to the callback
// after 3 secs
const upperCaseAsync = (inputStr, cb) => {
  setTimeout(() => {
    console.log('Changing into uppercase (3 secs)....');
    cb(null, inputStr.toUpperCase());
  }, 3000);
};

// With multiple async calls using callbacks we get
// nested callbacks. With multiple calls, this become
// really hard to read. This is know as callback hell.

const sayHello = () => {
  getUser((err, user) => {
    if (err) {
      console.log('Error getting user', err.message);
      return;
    }
    // this call is nested inside the callback of getUser
    upperCaseAsync(user.user, (err, upStr) => {
      if (err) {
        console.log('Error with uppercase', err.message);
        return;
      }
      console.log(upStr, 'says hello!');
    });
  });
};

sayHello();
