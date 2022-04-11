import request from 'supertest';
import app from '../src/app';

beforeAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('Get /api/users', () => {
  test('response to be a list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
