# TASK-10 — CRUD: Badge (Selos)

## Tipo
`Feature` | `Sprint 2`

## Prioridade
🟡 Média — necessário para o painel e para a landing page completa (TASK-6)

---

## Descrição
Como dono de um estabelecimento, quero gerenciar os selos de qualidade exibidos na minha landing page (ex: "Feito com amor", "Entrega rápida") para destacar os diferenciais do meu negócio.

---

## Contexto Técnico
O model `Badge` já existe no schema com os campos: `id`, `label`, `icon` (opcional), `menuId`. Não há controller nem rota.

---

## Critérios de Aceitação

- [ ] `POST /badge` cria um selo vinculado ao menu do usuário
- [ ] `GET /badge?menuId=` lista os selos do menu autenticado
- [ ] `PUT /badge/:id` atualiza um selo
- [ ] `DELETE /badge/:id` remove um selo
- [ ] Todas as operações validam ownership do `menuId`
- [ ] Swagger documentado em `src/config/swagger-paths/badge-paths.ts`

---

## Tarefas Técnicas

- [ ] Criar `src/controllers/badgeController.ts` com funções:
  - `getBadges`: busca por `menuId` via `req.query`, valida ownership
  - `createBadge`: valida `label`, `menuId`
  - `updateBadge`: valida ownership antes de atualizar
  - `deleteBadge`: valida ownership antes de deletar
- [ ] Criar `src/routes/badgeRoutes.ts` com as 4 rotas
- [ ] Registrar em `src/app.ts`: `app.use("/badge", badgeRoutes)` após os middlewares de auth
- [ ] Criar `src/config/swagger-paths/badge-paths.ts` com documentação completa
- [ ] Importar `badgePaths` em `src/config/swagger.ts`
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- CRUD completo com validação de ownership
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
