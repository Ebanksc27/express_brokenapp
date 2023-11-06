# Broken App Issues

## Identified Issues

- The `app.post` route handler does not wait for the asynchronous calls made by axios to resolve, which results in trying to map over unresolved promises.

- The error handling `catch` block is missing the `err` parameter, which causes a reference error when trying to pass the error to the next function.

- The application does not have a middleware to parse JSON request bodies, which is needed to handle JSON data sent in POST requests.

## Changes Made

1. **JSON Body Parsing Middleware Added**

   To allow Express to read JSON bodies, added the `express.json()` middleware.

   ```javascript
   app.use(express.json());

2. Asynchronous Handling of API Requests

Updated the route handler to be async and added a Promise.all to wait for all the API requests to resolve before proceeding.

app.post('/', async function(req, res, next) { ... });

3. Proper Error Handling in Catch Block

Added the err argument to the catch block to properly handle errors.

} catch (err) { ... }

## Testing Updates

- Revised tests to handle potential null responses gracefully and to confirm that all endpoints behave as expected.
- Confirmed that all tests now pass with the implemented changes.
