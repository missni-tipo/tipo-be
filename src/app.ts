import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import apiV1Routes from "./api/v1/index.route";
import { errorHandler } from "./shared/middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiV1Routes);

app.use(errorHandler as any);

export default app;
