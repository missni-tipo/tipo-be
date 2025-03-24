import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import apiV1Routes from "./api/v1";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiV1Routes);

export default app;
