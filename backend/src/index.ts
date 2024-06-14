import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'; // Import cors
import { authRouter } from "../routes/authRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

app.use('/auth/', authRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});