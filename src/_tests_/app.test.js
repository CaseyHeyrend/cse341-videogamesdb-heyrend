const request = require('supertest');
const app = require('../../app'); // Adjust the path as needed

describe('App Routes', () => {
    it('should return 404 for unknown routes', async () => {
        const res = await request(app).get('/unknown-route');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: 'Route not found' });
    });

    it('should return "Logged out ❌" for /loggedIn when not authenticated', async () => {
        const res = await request(app).get('/loggedIn');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Logged out ❌');
    });

    it('should protect /api-docs with authentication', async () => {
        const res = await request(app).get('/api-docs');
        expect(res.statusCode).toBe(302); // Redirect to login
    });

    it('should allow access to the root route', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200); // Assuming the root route is accessible
    });

    it('should return 500 for global error handler', async () => {
        app.get('/error', (req, res) => {
            throw new Error('Test error');
        });

        const res = await request(app).get('/error');
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({
            message: 'An unexpected error occurred.',
            error: 'Test error',
        });
    });
});