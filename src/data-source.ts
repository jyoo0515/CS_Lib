import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "dev.db",
  synchronize: true,
  logging: true,
  entities: [__dirname + "/entity/*.ts"],
  migrations: [__dirname + "/migration/*.ts"],
});
