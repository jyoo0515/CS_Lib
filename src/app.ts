import express, { Request, Response } from 'express';
import DataSource from './data-source';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const dbContext = process.env.NODE_ENV === 'production' ? DataSource.prod : DataSource.dev;
dbContext
  .initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

export default app;
