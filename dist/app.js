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
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_1 = require("./config/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const tokenMiddleware_1 = require("./middlewares/tokenMiddleware");
const userMiddleware_1 = require("./middlewares/userMiddleware");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const raffleRoutes_1 = __importDefault(require("./routes/raffleRoutes"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const landingPageRoutes_1 = __importDefault(require("./routes/landingPageRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.set('trust proxy', 1);
const ALLOWED_ORIGINS = new Set([
    'http://localhost:4200',
    'https://docemenu.com',
    'http://localhost:3300',
    'http://localhost:3000'
]);
const corsOptions = {
    origin(origin, callback) {
        if (!origin || ALLOWED_ORIGINS.has(origin))
            return callback(null, true);
        return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
};
app.use((0, cors_1.default)(corsOptions));
app.options(/.*/, (0, cors_1.default)(corsOptions));
// Configuração do Helmet para permitir CDN
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            childSrc: ["'self'"]
        }
    }
}));
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(body_parser_1.default.json());
// Endpoint para servir o JSON do Swagger
app.get('/swagger.json', swagger_1.swaggerAuth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.specs);
});
// Página HTML customizada para o Swagger
app.get('/docs', swagger_1.swaggerAuth, (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Doce Menu - Documentação</title>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css" />
        <style>
            html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
            *, *:before, *:after { box-sizing: inherit; }
            body { margin:0; background: #fafafa; }
            .swagger-ui .topbar { display: none; }
        </style>
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js"></script>
        <script>
            window.onload = function() {
                const ui = SwaggerUIBundle({
                    url: '/swagger.json',
                    dom_id: '#swagger-ui',
                    deepLinking: true,
                    presets: [
                        SwaggerUIBundle.presets.apis,
                        SwaggerUIStandalonePreset
                    ],
                    plugins: [
                        SwaggerUIBundle.plugins.DownloadUrl
                    ],
                    layout: "StandaloneLayout",
                    docExpansion: "list",
                    filter: true,
                    showRequestHeaders: true,
                    tryItOutEnabled: true
                });
            };
        </script>
    </body>
    </html>
  `;
    res.send(html);
});
// Swagger Documentation com autenticação
app.use('/api-docs', swagger_1.swaggerAuth, swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs, swagger_1.swaggerOptions));
app.use((0, cookie_parser_1.default)());
app.use("/user", userRoutes_1.default);
app.use("/raffle", raffleRoutes_1.default);
app.use("/landing-page", landingPageRoutes_1.default);
app.use(tokenMiddleware_1.tokenMiddleware);
app.use(userMiddleware_1.verifyUser);
app.use("/menu", menuRoutes_1.default);
app.use("/restaurant", restaurantRoutes_1.default);
app.use("/upload", uploadRoutes_1.default);
app.use("/product", productRoutes_1.default);
app.use("/category", categoryRoutes_1.default);
app.use("/analytics", analyticsRoutes_1.default);
// Rota de verificação da API
app.get("/", (req, res) => {
    res.send("API is running...");
});
exports.default = app;
