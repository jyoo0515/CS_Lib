import { DataSource } from 'typeorm';
import request from 'supertest';
import app from '../src/app';
import User from '../src/entity/user.entity';

beforeAll(async () => {
  const TestDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: false,
  });
  return new Promise<void>((resolve) =>
    TestDataSource.initialize().then(() => {
      console.log('Database initialized');
      resolve();
    })
  );
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

interface userCreateDTO {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

interface userLoginDTO {
  username: string;
  password: string;
}

describe('[GET] /api/users/unique/:username', () => {
  test('should return boolean', async () => {
    const res = await request(app).get('/api/users/unique/test');
    expect(res.status).toBe(200);
    expect(res.body.unique).toBe(true || false);
  });
});

describe('[POST] /api/users/register', () => {
  test('should add a user to db', async () => {
    const userData: userCreateDTO = {
      username: 'test',
      password: 'test',
      firstname: 'John',
      lastname: 'Doe',
    };
    const res = await request(app).post('/api/users/register').send(userData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, username: 'test' });
  });
});

describe('[POST] /api/users/login', () => {
  test('should create a cookie with access token', async () => {
    const userData: userLoginDTO = {
      username: 'test',
      password: 'test',
    };
    const res = await request(app).post('/api/users/login').send(userData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ loginSuccess: true, message: 'Logged in' });
  });
});

describe('[GET] /api/users', () => {
  test('status to be 401 when not logged in', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(401);
  });
});

describe('[GET] /api/users/logout', () => {
  test('status to be 401 when not logged in', async () => {
    const res = await request(app).get('/api/users/logout').withCredentials();
    expect(res.status).toBe(401);
  });
});

describe('Endpoints after login', () => {
  const agent = request.agent(app);
  const userData: userLoginDTO = {
    username: 'test',
    password: 'test',
  };
  beforeEach(async () => {
    return new Promise<void>(async (resolve) => {
      await agent.post('/api/users/login').send(userData);
      resolve();
    });
  });

  describe('[GET] /api/users/logout', () => {
    test('should delete jwt when logged in', async () => {
      const res = await agent.get('/api/users/logout').withCredentials();
      expect(res.body).toEqual({ logoutSuccess: true, message: 'Logged out' });
    });
  });

  describe('[GET] /api/users', () => {
    test('return list of users', async () => {
      const res = await agent.get('/api/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
    });
  });
});
