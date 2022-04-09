import express, { Request, Response } from 'express';
import DataSource from './data-source';
import { User } from './entity/User';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, 'index.html'));
// });

const dbContext = process.env.NODE_ENV === 'production' ? DataSource.prod : DataSource.dev;
dbContext
  .initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await dbContext.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    console.log('Loading users from the database...');
    const users = await dbContext.manager.find(User);
    console.log('Loaded users: ', users);

    console.log('Here you can setup and run express / fastify / any other framework.');
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'));

      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
      });
    }
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
