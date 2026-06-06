# TASK-13 — Modelo de Assinatura e Integração com Gateway de Pagamento

## Tipo
`Feature` | `Sprint 3`

## Prioridade
🔴 Alta (para monetização) — sem isso não é possível vender o SaaS

---

## Descrição
Como plataforma SaaS, preciso de um modelo de assinatura integrado a um gateway de pagamento para cobrar mensalidades dos estabelecimentos e controlar o acesso às features por plano.

---

## Contexto Técnico
Atualmente não existe nenhuma tabela de plano ou assinatura no schema. O campo `linkCheckout` existe no model `User` mas nunca é preenchido. A integração recomendada é com **Stripe** (internacional) ou **MercadoPago** (Brasil). Definir antes de implementar.

---

## Critérios de Aceitação

- [ ] Schema Prisma atualizado com models `Plan` e `Subscription`
- [ ] `Plan`: `id`, `name` (ex: `free`, `basic`, `pro`), `price`, `interval` (`monthly`|`yearly`), `features` (JSON), `externalId` (ID no gateway)
- [ ] `Subscription`: `id`, `userId`, `planId`, `status` (`active`|`canceled`|`past_due`|`trialing`), `currentPeriodEnd`, `externalId` (subscription ID no gateway)
- [ ] `POST /subscription/checkout` gera um link de checkout e salva em `user.linkCheckout`
- [ ] `POST /subscription/webhook` recebe eventos do gateway e atualiza `Subscription.status`
- [ ] `GET /subscription` retorna a assinatura atual do usuário
- [ ] Webhook validado com assinatura do gateway (não aceitar requisições não autenticadas)
- [ ] Swagger documentado em `src/config/swagger-paths/subscription-paths.ts`

---

## Tarefas Técnicas

### Schema
- [ ] Adicionar models `Plan` e `Subscription` em `prisma/schema.prisma`
- [ ] Relacionar `User` → `Subscription` (one-to-one ou one-to-many para histórico)
- [ ] Rodar `npx prisma migrate dev --name add-subscription`

### Controllers e Rotas
- [ ] Criar `src/controllers/subscriptionController.ts`:
  - `createCheckout`: cria sessão de checkout no gateway, retorna URL, salva em `user.linkCheckout`
  - `handleWebhook`: valida assinatura do webhook, processa eventos (`checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`)
  - `getSubscription`: retorna assinatura atual do usuário autenticado
- [ ] Criar `src/routes/subscriptionRoutes.ts`
- [ ] Registrar em `src/app.ts`:
  - `POST /subscription/webhook` deve ser **público** e receber o body como **raw buffer** (necessário para validar assinatura do Stripe)
  - `GET /subscription` e `POST /subscription/checkout` são autenticados
- [ ] Criar `src/config/swagger-paths/subscription-paths.ts`
- [ ] Importar `subscriptionPaths` em `src/config/swagger.ts`

### Variáveis de ambiente
- [ ] Adicionar ao `src/types/env.d.ts`: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID_BASIC`, `STRIPE_PRICE_ID_PRO`
- [ ] Documentar no CLAUDE.md e no README

---

## Dependências
- TASK-14 (middleware de plano) deve ser implementada logo após esta task

---

## Definition of Done
- Fluxo completo: usuário clica em "assinar" → redireciona para checkout → paga → webhook atualiza status → usuário tem acesso
- Cancelamento via gateway atualiza status para `canceled`
- Webhook rejeita requisições sem assinatura válida
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
