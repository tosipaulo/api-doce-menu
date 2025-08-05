# Configuração no Vercel

## Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel do Vercel:

### Obrigatórias
- `BASE_URL`: URL base da sua API (ex: https://api-doce-menu-5ymu2m3q1-doce-menus-projects.vercel.app)

### Opcionais (com valores padrão)
- `SWAGGER_USERNAME`: usuário para acesso ao Swagger (padrão: admin)
- `SWAGGER_PASSWORD`: senha para acesso ao Swagger (padrão: senha@123)

## Como Configurar

1. Acesse o painel do Vercel
2. Vá para o seu projeto
3. Clique em "Settings"
4. Vá para "Environment Variables"
5. Adicione cada variável com seu respectivo valor

## Deploy

Após configurar as variáveis de ambiente:

1. Faça commit das alterações
2. Push para o repositório
3. O Vercel fará o deploy automaticamente

## Acesso à Documentação

Após o deploy, acesse:
- Swagger UI: `https://seu-dominio.vercel.app/api-docs`
- JSON da API: `https://seu-dominio.vercel.app/swagger.json`

## Solução de Problemas

### Se o Swagger não carregar:
1. Use o endpoint `/swagger.json`
2. Cole o conteúdo no https://editor.swagger.io/
3. Ou use https://petstore.swagger.io/ com a URL do JSON

### Se a autenticação não funcionar:
1. Verifique se as variáveis de ambiente estão configuradas
2. Use as credenciais padrão: admin/senha@123 