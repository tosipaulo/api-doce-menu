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

1. Inicie o servidor com `npm run dev`
2. Acesse `http://localhost:3000/api-docs`
3. Digite as credenciais quando solicitado
4. Explore as rotas disponíveis na interface do Swagger

## Recursos da Documentação

- **Schemas:** Definições dos objetos de entrada e saída
- **Exemplos:** Dados de exemplo para cada rota
- **Códigos de Resposta:** Todos os possíveis códigos HTTP
- **Teste Interativo:** Execute as rotas diretamente na interface

## Segurança

A documentação está protegida por autenticação básica para evitar acesso não autorizado. 