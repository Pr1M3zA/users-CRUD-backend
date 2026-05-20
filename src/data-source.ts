import { join } from "node:path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "127.0.0.1",
   port: 3306,
   username: "uabcs",
   password: "ids",
   database: "short_url",
   synchronize: true,
   logging: true,
   entities: [join(__dirname, "db/entity/*.{ts,js}")],
   subscribers: [],
   migrations: [],
});