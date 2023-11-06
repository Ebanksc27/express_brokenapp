const request = require('supertest');
const app = require('./app');

describe('POST /', () => {
  it('responds with json containing a list of developers', async () => {
    const developerNames = ['octocat', 'mojombo'];
    const response = await request(app)
      .post('/')
      .send({ developers: developerNames })
      .expect('Content-Type', /json/)
      .expect(200);

    // Check if the response body is an array
    expect(Array.isArray(response.body)).toBeTruthy();

    // Check if the first item in the array has a name and a bio
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('bio');
  });

  it('responds with the correct developer details', async () => {
    const developerNames = ['octocat'];
    const response = await request(app)
      .post('/')
      .send({ developers: developerNames })
      .expect('Content-Type', /json/)
      .expect(200);

    // Check if the details match the expected values
    expect(response.body[0].name).toEqual('The Octocat'); // Replace with actual expected name
    // If bio can be null, check if it is not undefined instead.
    expect(response.body[0].bio).not.toBeUndefined(); 
    // If bio is not null, expect it to contain a specific word.
    if (response.body[0].bio) {
      expect(response.body[0].bio).toContain('github'); 
    }
  });

  it('handles non-existent users gracefully', async () => {
    const developerNames = ['nonexistentuser1234'];
    const response = await request(app)
      .post('/')
      .send({ developers: developerNames })
      .expect('Content-Type', /json/)
      .expect(404); 

    // Optionally check the structure of the response for a non-existent user
    expect(response.body).toHaveProperty('error');
  });

  it('responds with a bad request when the body is not correct', async () => {
    const response = await request(app)
      .post('/')
      .send({ wrongKey: ['octocat'] }) // Intentionally using the wrong body structure
      .expect('Content-Type', /json/)
      .expect(400); // Bad request status code

    // Check if an error message is provided
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Bad Request'); 
  });
});
