# Configuração no Vercel

## Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel do Vercel:

### Obrigatórias
- `BASE_URL`: URL base da sua API (ex: https://api-doce-menu-5ymu2m3q1-doce-menus-projects.vercel.app)

### Opcionais (para autenticação do Swagger)
- `SWAGGER_USERNAME`: usuário para acesso ao Swagger
- `SWAGGER_PASSWORD`: senha para acesso ao Swagger

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

Após o deploy, acesse (em ordem de preferência):

1. **Página HTML Customizada (Recomendada):**
   ```
   https://seu-dominio.vercel.app/docs
   ```

2. **Swagger UI Padrão:**
   ```
   https://seu-dominio.vercel.app/api-docs
   ```

3. **JSON da API:**
   ```
   https://seu-dominio.vercel.app/swagger.json
   ```

## Solução de Problemas

### Se o Swagger não carregar:
1. **Use a página customizada:** `/docs` (mais confiável)
2. **Use o endpoint JSON:** `/swagger.json`
3. **Visualizadores online:**
   - https://editor.swagger.io/
   - https://petstore.swagger.io/

### Se a autenticação não funcionar:
1. Verifique se as variáveis de ambiente estão configuradas
2. Configure `SWAGGER_USERNAME` e `SWAGGER_PASSWORD` no Vercel

### Erro de MIME type:
- A página `/docs` resolve esse problema usando CDN
- Use sempre `/docs` em produção no Vercel 