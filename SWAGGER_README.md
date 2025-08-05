# Documentação da API - Swagger

## Acesso à Documentação

A documentação da API está disponível através de múltiplas opções:

### Opção 1: Documentação Simples (Recomendada para Vercel)
```
http://localhost:3000/docs-simple
```

### Opção 2: Swagger UI com CDN
```
http://localhost:3000/docs
```

### Opção 3: Swagger UI Padrão
```
http://localhost:3000/api-docs
```

### Opção 4: JSON da API
```
http://localhost:3000/swagger.json
```

## Autenticação

Para acessar a documentação do Swagger, você precisará fornecer as seguintes credenciais:

- **Usuário:** Configure a variável `SWAGGER_USERNAME` no Vercel
- **Senha:** Configure a variável `SWAGGER_PASSWORD` no Vercel

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
2. Acesse `http://localhost:3000/docs-simple` (recomendado)
3. Ou acesse `http://localhost:3000/docs`
4. Ou acesse `http://localhost:3000/api-docs`
5. Digite as credenciais quando solicitado
6. Explore as rotas disponíveis na interface do Swagger

### Vercel
1. Acesse `https://seu-dominio.vercel.app/docs-simple` (recomendado)
2. Ou acesse `https://seu-dominio.vercel.app/docs`
3. Ou acesse `https://seu-dominio.vercel.app/api-docs`
4. Se a interface não carregar, use `/swagger.json` com um visualizador online

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

1. **Use a documentação simples:** `/docs-simple` (mais confiável)
2. **Use a página customizada:** `/docs`
3. **Use o endpoint JSON:** `/swagger.json`
4. **Visualizadores online:**
   - https://editor.swagger.io/
   - https://petstore.swagger.io/

### Variáveis de Ambiente
Para produção, configure as seguintes variáveis de ambiente no Vercel:
- `SWAGGER_USERNAME`: usuário para acesso
- `SWAGGER_PASSWORD`: senha para acesso
- `BASE_URL`: URL base da API

### Erro de Content Security Policy:
- A página `/docs-simple` não usa scripts externos
- Use sempre `/docs-simple` em produção no Vercel 