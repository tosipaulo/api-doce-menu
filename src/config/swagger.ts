import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userPaths } from './swagger-paths/user-paths';
import { productPaths } from './swagger-paths/product-paths'; // Descomente quando adicionar produtos
import { menuPaths } from './swagger-paths/menu-paths';
import { restaurantSettingPaths } from './swagger-paths/restaurantSetting-paths';
import { uploadPaths } from './swagger-paths/upload-paths';
// Definição modular do Swagger que funciona no Vercel
const specs = {
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
  paths: {
    // Rotas de usuário
    ...userPaths,
    ...restaurantSettingPaths,
    ...uploadPaths,
    // Rotas de produtos (descomente quando adicionar)
    // ...productPaths,
    
    // Adicione mais rotas aqui conforme o projeto cresce
    // ...orderPaths,
    // ...categoryPaths,
    // etc.
  }
};

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

// Configuração específica para Vercel com CDN
const swaggerOptions = {
  explorer: true,
  customSiteTitle: 'API Doce Menu - Documentação',
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    tryItOutEnabled: true
  },
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #333; }
    .swagger-ui .scheme-container { background: #f8f9fa; }
  `,
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js'
  ],
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css'
};

export { specs, swaggerUi, swaggerAuth, swaggerOptions }; 