import express, { Request, Response } from 'express';
import AppDataSource from './data-source';
import path from 'path';
import dotenv from 'dotenv';

import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized');
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
      });
    }
  })
  .catch((error) => console.log(error));

export default app;
