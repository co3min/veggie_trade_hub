import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import httpLogger from "morgan";
// import * as faker from "faker";
import cookieParser from "cookie-parser";
import { usersRouter } from "./Routes/usersRouter.js";
import { veggiePostRouter } from "./Routes/veggiePostRouter.js";

const app = express();
const port = 5001;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(httpLogger("dev"));

app.use("/veggie", usersRouter);

app.use("/veggie", veggiePostRouter);

app.listen(port, () => {
  console.log(`The server runs at http://localhost:${port}`);
});
