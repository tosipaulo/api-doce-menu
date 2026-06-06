# TASK-2 — Endpoint: POST /user/logout

## Tipo
`Feature` | `Sprint 1`

## Prioridade
🔴 Alta — o FE não consegue deslogar o usuário de forma segura sem esse endpoint

---

## Descrição
Como usuário autenticado, quero poder fazer logout para que minha sessão seja encerrada com segurança e o cookie de autenticação seja removido pelo servidor.

---

## Contexto Técnico
A autenticação usa cookie `httpOnly`, o que significa que o FE não consegue remover o cookie via JavaScript. O servidor precisa setar o cookie com valor vazio e `maxAge: 0` para que o browser o descarte.

---

## Critérios de Aceitação

- [ ] `POST /user/logout` remove o cookie `token` da resposta
- [ ] Endpoint é público (não passa pelos middlewares de auth)
- [ ] Retorna `{ error: false, message: "Até logo!" }` com status `200`
- [ ] Swagger documentado em `src/config/swagger-paths/user-paths.ts`

---

## Tarefas Técnicas

- [ ] Criar função `logoutUser` em `src/controllers/userController.ts`
  - Chamar `res.clearCookie('token', { path: '/' })` respeitando as opções originais (`httpOnly`, `secure`, `sameSite`)
  - Retornar `200` com mensagem de sucesso
- [ ] Registrar rota `POST /auth/logout` ou `POST /user/logout` em `src/routes/userRoutes.ts`
- [ ] Adicionar entrada `POST /user/logout` em `src/config/swagger-paths/user-paths.ts` com:
  - Summary, description
  - Response 200
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- Chamada ao endpoint limpa o cookie no browser
- Chamadas subsequentes a rotas protegidas retornam `401`
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
