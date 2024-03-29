import { DataSource } from "typeorm";
import { configDotenv } from "dotenv";
import { Senior } from "./models/entity/senior.entity";
import { Worker } from "./models/entity/worker.entity";
import { Post } from "./models/entity/post.entity";
import { SeniorWorker } from "./models/entity/seniorWorker.entity";
import { Location } from "./models/entity/location.entity";
import { Apply } from "./models/entity/apply.entity";

configDotenv();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username,
    password,
    database,
    entities: [Senior, Worker, Post, SeniorWorker, Location, Apply],
    synchronize: true,
    logging: ["info", "error"],
});

const DatabaseStart = () => {
    AppDataSource.initialize().then((r) => console.log("Database Start"));
};

export { DatabaseStart, AppDataSource };
