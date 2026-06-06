# TASK-7 — CRUD: Testimonials (Depoimentos)

## Tipo
`Feature` | `Sprint 2`

## Prioridade
🟡 Média — necessário para o painel do estabelecimento e para a landing page completa (TASK-6)

---

## Descrição
Como dono de um estabelecimento, quero gerenciar os depoimentos exibidos na minha landing page para mostrar a satisfação dos meus clientes e gerar credibilidade.

---

## Contexto Técnico
O model `Testimonial` já existe no schema Prisma com os campos: `id`, `name`, `message`, `avatarUrl` (opcional), `rating` (int), `menuId`, `createdAt`. Não há controller nem rota.

---

## Critérios de Aceitação

- [ ] `POST /testimonial` cria um depoimento vinculado ao menu do usuário
- [ ] `GET /testimonial?menuId=` lista depoimentos do menu autenticado
- [ ] `PUT /testimonial/:id` atualiza um depoimento
- [ ] `DELETE /testimonial/:id` remove um depoimento
- [ ] Todas as operações validam que o `menuId` pertence ao usuário autenticado
- [ ] `rating` aceita apenas valores entre 1 e 5
- [ ] Swagger documentado em `src/config/swagger-paths/testimonial-paths.ts`

---

## Tarefas Técnicas

- [ ] Criar `src/controllers/testimonialController.ts` com funções:
  - `getTestimonials`: busca por `menuId` via `req.query`, valida ownership
  - `createTestimonial`: valida `name`, `message`, `rating`, `menuId`; valida `rating` entre 1-5
  - `updateTestimonial`: valida ownership antes de atualizar
  - `deleteTestimonial`: valida ownership antes de deletar
- [ ] Criar `src/routes/testimonialRoutes.ts` com as 4 rotas
- [ ] Registrar em `src/app.ts`: `app.use("/testimonial", testimonialRoutes)` após os middlewares de auth
- [ ] Criar `src/config/swagger-paths/testimonial-paths.ts` com documentação completa de todas as rotas
- [ ] Importar `testimonialPaths` em `src/config/swagger.ts`
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- CRUD completo funcionando com validação de ownership
- `rating` fora de 1-5 retorna `400`
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
