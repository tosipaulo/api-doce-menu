# TASK-3 — Endpoint: GET /user/me

## Tipo
`Feature` | `Sprint 1`

## Prioridade
🔴 Alta — o FE precisa saber quem está logado ao recarregar a página

---

## Descrição
Como usuário autenticado, quero um endpoint que retorne meus dados básicos para que o frontend possa reconstruir o estado da sessão após um reload sem precisar fazer login novamente.

---

## Contexto Técnico
Atualmente não existe nenhum endpoint que retorne o usuário atual. O FE não tem como saber quem está logado apenas a partir do cookie (que é `httpOnly`). Esse endpoint usa os middlewares `tokenMiddleware` + `verifyUser` já existentes, então `req.user` já está disponível no controller.

---

## Critérios de Aceitação

- [ ] `GET /user/me` retorna os dados do usuário autenticado
- [ ] Não expõe `password`, `resetToken`, `resetExpires`, `confirmToken`
- [ ] Retorna `401` se não autenticado
- [ ] Swagger documentado em `src/config/swagger-paths/user-paths.ts`

---

## Tarefas Técnicas

- [ ] Criar função `getMe` em `src/controllers/userController.ts`
  - Ler `req.user` (já populado pelo `verifyUser`)
  - Retornar: `id`, `name`, `email`, `phoneNumber`, `acceptedTerms`, `linkCheckout`, `createdAt`
- [ ] Registrar rota `GET /user/me` em `src/routes/userRoutes.ts` **após** os middlewares de autenticação
  - Atenção: as rotas de `/user` são públicas no `app.ts`. A rota `/me` precisa ser montada **depois** do `tokenMiddleware` e `verifyUser`, ou esses middlewares devem ser aplicados diretamente na rota
- [ ] Adicionar entrada `GET /user/me` em `src/config/swagger-paths/user-paths.ts` com:
  - Summary, description, security (bearerAuth)
  - Response 200 com schema dos campos retornados
  - Response 401
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- Com cookie válido: retorna dados do usuário sem campos sensíveis
- Sem cookie: retorna `401`
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
