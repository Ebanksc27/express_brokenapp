const app = require('./app');

// Server is started with this script, separate from the app's export
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
