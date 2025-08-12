import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { specs, swaggerUi, swaggerAuth, swaggerOptions } from "./config/swagger";

import { tokenMiddleware } from "./middlewares/tokenMiddleware";
import { verifyUser } from "./middlewares/userMiddleware";

import userRoutes from "./routes/userRoutes";
import raffleRoutes from "./routes/raffleRoutes";
import menuRoute from "./routes/menuRoutes";
import restaurantSettings from  "./routes/restaurantRoutes";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// Configuração do Helmet para permitir CDN
app.use(helmet({
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

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(bodyParser.json());

// Endpoint para servir o JSON do Swagger
app.get('/swagger.json', swaggerAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Página HTML customizada para o Swagger
app.get('/docs', swaggerAuth, (req, res) => {
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
app.use('/api-docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

app.use("/user", userRoutes);
app.use("/raffle", raffleRoutes);

app.use(tokenMiddleware);
app.use(verifyUser);
app.use("/menu", menuRoute);
app.use("/restaurant", restaurantSettings);

// Rota de verificação da API
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;