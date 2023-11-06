const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/', async (req, res, next) => {
  // Ensure the request has the 'developers' key
  if (!req.body.developers) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  try {
    let results = await Promise.all(req.body.developers.map(d => axios.get(`https://api.github.com/users/${d}`).catch(err => err.response)));
    
    // Filter out non-successful responses
    let successfulResults = results.filter(r => r && r.status === 200);

    // If there are no successful results, and there were some original results, it means they all failed
    if (successfulResults.length === 0 && results.length > 0) {
      return res.status(404).json({ error: 'Not Found' });
    }

    let out = successfulResults.map(r => ({ name: r.data.name, bio: r.data.bio }));
    res.json(out);
  } catch (err) {
    // Catch any other errors here and return a server error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;


