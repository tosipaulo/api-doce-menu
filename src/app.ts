import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";
import { specs, swaggerUi, swaggerAuth, swaggerOptions } from "./config/swagger";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(bodyParser.json());

// Endpoint para servir o JSON do Swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Swagger Documentation com autenticação
app.use('/api-docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;