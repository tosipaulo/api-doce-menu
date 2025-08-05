import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Doce Menu - Documentação',
      version: '1.0.0',
      description: 'Documentação da API do projeto Doce Menu',
      contact: {
        name: 'Suporte API',
        email: 'suporte@docemenu.com'
      }
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const specs = swaggerJsdoc(options);

// Middleware de autenticação simples para o Swagger
const swaggerAuth = (req: any, res: any, next: any) => {
  // Verificar se as variáveis de ambiente estão definidas
  const username = process.env.SWAGGER_USERNAME;
  const password = process.env.SWAGGER_PASSWORD;
  
  const auth = req.headers.authorization;
  
  if (!auth) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Documentation"');
    return res.status(401).json({ error: 'Acesso negado' });
  }

  try {
    const credentials = Buffer.from(auth.split(' ')[1], 'base64').toString();
    const [user, pass] = credentials.split(':');

    if (user === username && pass === password) {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Documentation"');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Documentation"');
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
};

// Configuração específica para Vercel
const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Doce Menu - Documentação',
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    tryItOutEnabled: true
  }
};

export { specs, swaggerUi, swaggerAuth, swaggerOptions }; 