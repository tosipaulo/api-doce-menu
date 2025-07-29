"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*", credentials: true }));
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 100 }));
// Rotas
// import authRoutes from "./routes/auth.routes";
// app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("API is running...");
});
exports.default = app;
