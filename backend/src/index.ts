import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import { authRouter } from "../routes/authRouter";
import { productsRouter } from "../routes/productRouter";
import { cartRouter } from "../routes/cartRouter";
import connectMongo from "../database/connectMongo";
import { isAuthenticated } from "../middlewares/isAuthorized";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

connectMongo();

app.get("/", isAuthenticated)

app.use(authRouter);
app.use(productsRouter);
app.use(cartRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
