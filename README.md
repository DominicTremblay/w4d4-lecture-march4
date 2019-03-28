# W4D4 Lecture - Error Exceptions and Promises

## Content

- Exceptions
- Promises
- Async/Await

## Exceptions

- Any thrown or unhandled error will cause the app to crash!

```javascript
const someFct = () => {
  console.log('Executing someFct');
  // This will throw a reference error
  undeclared;
};
someFct();
console.log('After executing someFct...');
```

- `console.log('After executing someFct...')` never gets executed
- Just because there is an error doesn't mean the app should crashed

### Try Catch

- A _try catch_ will gracefully handle the error

```javascript
const someFct = () => {
  console.log('Executing someFct');
  // This will throw a reference error
  undeclared;
};

try {
  someFct();
} catch (error) {
  console.log(error);
} finally {
  console.log('finally done');
}

console.log('after executing someFtc...');
```

- The benefit is that it doesn't stop the flow of excution
- When an error occurs, JavaScript generates an object containing the details about it. The object is then passed as an argument to catch
- `finally` always get executed whether there is an exception or not. Good for closing connections or files for example.

- For all built-in errors, the error object inside catch block has a few properties:

  - name -> Name of the error
  - message -> Textual message about error details.
  - stack -> Error stack trace

```javascript
try {
  someFct();
} catch (error) {
  console.log(`Catched Error: ${error.name} ${error.message}`);
} finally {
  console.log('finally done');
}
```

#### Custom Errors

- It's possible to throw custom errors with the `throw` operator

- JavaScript has many built-in constructors for standard errors: Error, SyntaxError, ReferenceError, TypeError.

```javascript
const error = new SyntaxError(message);
const error = new ReferenceError(message);
const error = new TypeError(message);
```

- Or we can simple create an error object

```javascript
const error = new Error(message);
```

```javascript
const jsonData = `{wrong}`;
try {
  let user = JSON.parse(jsonData);
} catch (error) {
  console.log(`${error.name} ${error.message}`);
}
```

- Creating our own error

```javascript
const jsonData = `{
  "id": "1",
  "email": "email@mail.com"
}`;

try {
  let user = JSON.parse(jsonData);

  if (!user.password) {
    throw new Error('Missing password in user object');
  }
} catch (error) {
  console.log(`${error.name} ${error.message}`);
}
```

- We can further create our own custom errors by extending the Error class

```javascript
const jsonData = `{
  "id": "1",
  "email": "email@mail.com"
}`;

class IncompleteDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncompleteDataError';
    this.message = message;
  }
}

try {
  let user = JSON.parse(jsonData);

  if (!user.password) {
    throw new IncompleteDataError('Missing password in user object');
  }
} catch (error) {
  console.log(`${error.name} ${error.message}`);
}
```

### One Small Problem With Try Catch

- There is caveat with `try catch` clause. It works for synchronous code but not async code!

- Catch block is not there when asynchronous code is executed

```js
const someAsyncFct = () => {
  console.log('async, taking 3 seconds...');
  setTimeout(() => {
    throw new Error();
  }, 3000);
};

try {
  someAsyncFct();
} catch (e) {
  // not catching the error
  console.log('trying to catch the error: ', e.message);
} finally {
  console.log('This is executed way before the error is thrown');
}
```

- Using promises is resolving the issue.

## Promises

- Promises suggest a better syntax to handle callbacks
- Callbacks cannot catch errors with try catch
- Multiple callbacks call lead to callback hell

### Using a tradional callback

```javascript
const upperCaseAsync = (inputStr, cb) => {
  console.log('async, taking 3 seconds...');
  setTimeout(() => {
    cb(null, inputStr.toUpperCase());
  }, 3000);
};

upperCaseAsync('Hello Bob!', (err, str) => {
  if (err) {
    console.log('Error');
    return;
  }
  console.log(str);
});
```

- Using multiple callbacks, we get into `callback hell!`

```javascript
const getUser = cb => {
  console.log('Getting the user, 2 seconds...');
  setTimeout(() => {
    cb(null, {
      name: 'Bob Squarepants',
      email: 'bob@squarepants.com',
    });
  }, 2000);
};

const upperCaseAsync = (inputStr, cb) => {
  console.log('async, taking 2 seconds...');
  setTimeout(() => {
    cb(null, inputStr.toUpperCase());
  }, 3000);
};

const sayHello = () => {
  getUser((err, user) => {
    console.log(user);
    if (err) {
      console.log('Error getting the user!');
      return;
    }
    upperCaseAsync(`Hello ${user.name}`, (err, str) => {
      if (err) {
        console.log('Error, cannot print hello message!');
        return;
      }
      console.log(str);
    });
  });
};

sayHello();
```

- Code is much harder to read
- More callback nesting means more trouble

### Using Promises

```javascript
const getUser = () => {
  console.log('Getting the user, 2 seconds...');

  return new Promise((resolve, reject) => {
    // if everything turned out fine
    if (true) {
      setTimeout(
        resolve({
          name: 'Bob Squarepants',
          email: 'bob@squarepants.com',
        }),
        2000
      );
    } else {
      reject(Error('Cannot get the user object!'));
    }
  });
};

const upperCaseAsync = inputStr => {
  console.log('async, taking 2 seconds...');

  // if everything turned out fine
  return new Promise((resolve, reject) => {
    if (true) {
      setTimeout(resolve(inputStr.toUpperCase()), 5000);
    } else {
      reject(Error('Cannot say Hello!'));
    }
  });
};

const sayHello = () => {
  getUser()
    .then(user => {
      console.log(user);
      return upperCaseAsync(user.name);
    })
    .then(helloStr => console.log(helloStr))
    .catch(err => console.log('error', err.message));
};

sayHello();
```

- Multiple promises with Promise.all

```javascript
const multipleSayHello = () => {
  const hellos = Promise.all([
    upperCaseAsync('Bob'),
    upperCaseAsync('Alice'),
  ]).then(helloStrs => console.log(helloStrs));
};

multipleSayHello();
```

### Async Await

- Syntaxic sugar wrapping promises to make our async code more like sync code

```js
const sayHello = async () => {
  let user = null;
  let upUser = null;
  try {
    user = await getUser();
  } catch (e) {
    console.log(e.message);
    return;
  }

  try {
    upUser = await upperCaseAsync(user.name);
  } catch (e) {
    console.log(e.message);
    return;
  }

  console.log('Hello,', upUser);
};

sayHello();
```
