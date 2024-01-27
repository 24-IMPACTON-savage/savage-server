import { configDotenv } from "dotenv";
import express from "express"
import cors from "cors";
import { DatabaseStart } from "./entity/datasource";
import router from "./router";

configDotenv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use('/', router);

DatabaseStart();

app.listen(8088);