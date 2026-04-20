import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import Users from "./user/users";
import Urls from "./urls/urls";

const app = express();
app.use(express.json());
app.use("/users", Users);
app.use("/url", Urls);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
   .then(() => {
      console.log("Data Source has been initialized!");
      app.listen(PORT, () => {
         console.log(`Server is running on port http://localhost:${PORT}`);
      });
   })
   .catch((err) => {
      console.error("Error during Data Source initialization:", err);
   });