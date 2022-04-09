import 'reflect-metadata';
import { DataSource } from 'typeorm';

const dev = new DataSource({
  type: 'sqlite',
  database: 'dev.db',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/entity/*.{ts,js}'],
  migrations: [__dirname + '/migration/*.{ts,js}'],
});

const prod = new DataSource({
  type: 'sqlite',
  database: 'dev.db',
  synchronize: false,
  logging: true,
  entities: [__dirname + '/entity/*.{ts,js}'],
  migrations: [__dirname + '/migration/*.{ts,js}'],
});

export default { dev, prod };
