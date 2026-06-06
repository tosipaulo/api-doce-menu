# TASK-8 — CRUD: HowItWorksStep (Como Funciona)

## Tipo
`Feature` | `Sprint 2`

## Prioridade
🟡 Média — necessário para o painel e para a landing page completa (TASK-6)

---

## Descrição
Como dono de um estabelecimento, quero gerenciar as etapas da seção "Como Funciona" da minha landing page para explicar aos visitantes como fazer um pedido.

---

## Contexto Técnico
O model `HowItWorksStep` já existe no schema com os campos: `id`, `title`, `description`, `icon` (opcional), `order` (int), `menuId`. A ordenação pelo campo `order` deve ser respeitada tanto na listagem quanto na landing page.

---

## Critérios de Aceitação

- [ ] `POST /how-it-works` cria uma etapa vinculada ao menu do usuário
- [ ] `GET /how-it-works?menuId=` lista as etapas ordenadas por `order` (ASC)
- [ ] `PUT /how-it-works/:id` atualiza uma etapa (incluindo reordenação)
- [ ] `DELETE /how-it-works/:id` remove uma etapa
- [ ] Todas as operações validam ownership do `menuId`
- [ ] Swagger documentado em `src/config/swagger-paths/howItWorks-paths.ts`

---

## Tarefas Técnicas

- [ ] Criar `src/controllers/howItWorksController.ts` com funções:
  - `getHowItWorks`: busca por `menuId` via `req.query`, ordena por `order ASC`, valida ownership
  - `createHowItWorks`: valida `title`, `description`, `order`, `menuId`
  - `updateHowItWorks`: valida ownership antes de atualizar
  - `deleteHowItWorks`: valida ownership antes de deletar
- [ ] Criar `src/routes/howItWorksRoutes.ts` com as 4 rotas
- [ ] Registrar em `src/app.ts`: `app.use("/how-it-works", howItWorksRoutes)` após os middlewares de auth
- [ ] Criar `src/config/swagger-paths/howItWorks-paths.ts` com documentação completa
- [ ] Importar `howItWorksPaths` em `src/config/swagger.ts`
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- CRUD completo com validação de ownership
- Listagem sempre retorna ordenada por `order` ASC
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
