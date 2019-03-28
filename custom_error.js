const jsonData = `{
  "id": "1",
  "email": "email@mail.com"
}`;

// We can extends the Error class to create our own
// custom error type

class IncompleteDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncompleteDataError';
    this.message = message;
  }
}

try {
  let user = JSON.parse(jsonData);
  // if the object does not have a password
  // the custom error is triggered
  if (!user.password) {
    throw new IncompleteDataError('Missing password in user object');
  }
} catch (error) {
  console.log(`${error.name} ${error.message}`);
}
