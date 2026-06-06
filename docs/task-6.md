# TASK-6 — Landing Page Completa

## Tipo
`Feature` | `Sprint 2`

## Prioridade
🟡 Média — a landing page pública está incompleta; faltam dados que já existem no schema

---

## Descrição
Como visitante de um cardápio digital, quero ver a página completa do estabelecimento com depoimentos, seção "como funciona", links externos e selos de qualidade, para ter uma experiência completa antes de fazer um pedido.

---

## Contexto Técnico
O endpoint `GET /landing-page?slug=` já existe mas retorna apenas `restaurantSettings` e 6 produtos. Os modelos `Testimonial`, `HowItWorksStep`, `ExternalLink` e `Badge` já existem no schema Prisma e estão relacionados ao `Menu`, mas não são retornados.

---

## Critérios de Aceitação

- [ ] `GET /landing-page?slug=` retorna todos os dados necessários para montar a página pública:
  - `restaurant` (RestaurantSettings)
  - `products[]` (6 mais recentes)
  - `categories[]`
  - `testimonials[]`
  - `howItWorks[]` (ordenado por `order`)
  - `externalLinks[]`
  - `badges[]`
- [ ] Retorna `404` se o slug não existir
- [ ] Não exige autenticação
- [ ] Swagger atualizado em `src/config/swagger-paths/landingPage-paths.ts`

---

## Tarefas Técnicas

- [ ] Atualizar `getHomePage` em `src/controllers/landingPageController.ts`
  - Incluir na query do `restaurantSettings` os relacionamentos via `menu.include`: `testimonials`, `howItWorks` (ordenado por `order`), `externalLinks`, `badges`
  - Incluir query de `categories` vinculadas ao menu
  - Retornar todos os dados no response
- [ ] Atualizar entrada `GET /landing-page` em `src/config/swagger-paths/landingPage-paths.ts` com schema de resposta completo incluindo todos os novos campos
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- Response inclui todos os blocos de dados listados nos critérios
- Slug inexistente retorna `404`
- Swagger atualizado com o novo schema de resposta
- Dependência: TASK-7, TASK-8, TASK-9, TASK-10 devem existir para popular os dados via painel
