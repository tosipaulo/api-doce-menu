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
    ],
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic'
        }
      }
    },
    security: [
      {
        basicAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const specs = swaggerJsdoc(options);

// Middleware de autenticação para o Swagger
const swaggerAuth = (req: any, res: any, next: any) => {
  const auth = req.headers.authorization;
  
  if (!auth) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Documentation"');
    return res.status(401).json({ error: 'Acesso negado' });
  }

  const credentials = Buffer.from(auth.split(' ')[1], 'base64').toString();
  const [username, password] = credentials.split(':');

  if (username === process.env.SWAGGER_USERNAME && password === process.env.SWAGGER_PASSWORD) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Documentation"');
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
};

export { specs, swaggerUi, swaggerAuth }; 