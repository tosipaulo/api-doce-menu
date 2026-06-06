# TASK-9 — CRUD: ExternalLink (Links Externos)

## Tipo
`Feature` | `Sprint 2`

## Prioridade
🟡 Média — necessário para o painel e para a landing page completa (TASK-6)

---

## Descrição
Como dono de um estabelecimento, quero gerenciar os links externos (WhatsApp, iFood, Uber Eats, etc.) exibidos na minha landing page para facilitar que o cliente faça um pedido pelo canal de sua preferência.

---

## Contexto Técnico
O model `ExternalLink` já existe no schema com os campos: `id`, `type` (string: ex. `whatsapp`, `ifood`, `ubereats`), `label`, `url`, `menuId`. Não há controller nem rota.

---

## Critérios de Aceitação

- [ ] `POST /external-link` cria um link externo vinculado ao menu do usuário
- [ ] `GET /external-link?menuId=` lista os links do menu autenticado
- [ ] `PUT /external-link/:id` atualiza um link
- [ ] `DELETE /external-link/:id` remove um link
- [ ] `type` aceita apenas valores predefinidos: `whatsapp`, `ifood`, `ubereats`, `rappi`, `instagram`, `facebook`, `site`
- [ ] `url` deve ser uma URL válida
- [ ] Todas as operações validam ownership do `menuId`
- [ ] Swagger documentado em `src/config/swagger-paths/externalLink-paths.ts`

---

## Tarefas Técnicas

- [ ] Criar `src/controllers/externalLinkController.ts` com funções:
  - `getExternalLinks`: busca por `menuId` via `req.query`, valida ownership
  - `createExternalLink`: valida `type` (enum), `label`, `url`, `menuId`
  - `updateExternalLink`: valida ownership antes de atualizar
  - `deleteExternalLink`: valida ownership antes de deletar
- [ ] Criar `src/routes/externalLinkRoutes.ts` com as 4 rotas
- [ ] Registrar em `src/app.ts`: `app.use("/external-link", externalLinkRoutes)` após os middlewares de auth
- [ ] Criar `src/config/swagger-paths/externalLink-paths.ts` com documentação completa, incluindo o enum de `type`
- [ ] Importar `externalLinkPaths` em `src/config/swagger.ts`
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- CRUD completo com validação de `type` (enum) e ownership
- `type` inválido retorna `400` com lista dos valores aceitos
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
