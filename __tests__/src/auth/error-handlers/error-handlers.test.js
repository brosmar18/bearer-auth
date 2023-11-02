const { app } = require('../../../../src/server');
const supertest = require('supertest');
const mockRequest = supertest(app);

describe('Error Handlers', () => {

  // Test for 404 - Not Found
  it('should respond with 404 for non-existent routes', async () => {
    const response = await mockRequest.get('/does-not-exist');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Resource Not Found');
  });

  // Test for 500 - Server Error
  it('should respond with 500 for server errors', async () => {

    const response = await mockRequest.get('/throw-error');
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });


});
