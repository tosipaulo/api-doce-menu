# Documentação da API - Swagger

## Acesso à Documentação

A documentação da API está disponível através do Swagger UI na seguinte URL:

```
http://localhost:3000/api-docs
```

## Autenticação

Para acessar a documentação do Swagger, você precisará fornecer as seguintes credenciais:

## Rotas Documentadas

### Usuários

1. **POST /user** - Criar novo usuário
   - Cria um novo usuário no sistema
   - Requer: nome, email, senha, telefone

2. **POST /user/auth** - Autenticar usuário
   - Autentica um usuário existente
   - Requer: email, senha

3. **POST /user/forgot-password** - Solicitar redefinição de senha
   - Envia email com instruções para redefinir senha
   - Requer: email

4. **POST /user/reset-password** - Redefinir senha
   - Redefine a senha usando token
   - Requer: email, token, nova senha

## Como Usar

### Local
1. Inicie o servidor com `npm run dev`
2. Acesse `http://localhost:3000/api-docs`
3. Digite as credenciais quando solicitado
4. Explore as rotas disponíveis na interface do Swagger

### Vercel
1. Acesse a URL de produção
2. Digite as credenciais quando solicitado
3. Se a interface não carregar, use o endpoint JSON com um visualizador online

## Recursos da Documentação

- **Schemas:** Definições dos objetos de entrada e saída
- **Exemplos:** Dados de exemplo para cada rota
- **Códigos de Resposta:** Todos os possíveis códigos HTTP
- **Teste Interativo:** Execute as rotas diretamente na interface

## Segurança

A documentação está protegida por autenticação básica para evitar acesso não autorizado.

## Solução de Problemas

### Problema: Tela branca no Vercel
Se você encontrar uma tela branca ao acessar o Swagger no Vercel:

1. Use o endpoint JSON: `/swagger.json`
2. Copie o conteúdo e cole no https://editor.swagger.io/
3. Ou use o https://petstore.swagger.io/ com a URL do JSON

### Variáveis de Ambiente
Para produção, configure as seguintes variáveis de ambiente no Vercel:
- `SWAGGER_USERNAME`: usuário para acesso (padrão: admin)
- `SWAGGER_PASSWORD`: senha para acesso (padrão: senha@123)
- `BASE_URL`: URL base da API 