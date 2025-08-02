import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;