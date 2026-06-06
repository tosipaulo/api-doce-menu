# TASK-11 — CRUD: CustomDomain (Domínio Personalizado)

## Tipo
`Feature` | `Sprint 3`

## Prioridade
🟠 Baixa — feature avançada, disponível apenas em plano pago (ver TASK-13)

---

## Descrição
Como dono de um estabelecimento com plano pago, quero vincular um domínio próprio ao meu cardápio digital para que meus clientes acessem por um endereço personalizado (ex: `cardapio.minhadoroceria.com.br`).

---

## Contexto Técnico
O model `CustomDomain` já existe no schema com: `id`, `domain` (unique), `slug`, `verified` (boolean), `menuId`, `createdAt`. O campo `slug` indica qual menu será servido naquele domínio. A verificação de domínio requer que o usuário configure um registro DNS (TXT ou CNAME) apontando para a plataforma.

---

## Critérios de Aceitação

- [ ] `POST /custom-domain` registra um domínio para o menu do usuário
- [ ] `GET /custom-domain?menuId=` lista os domínios do menu autenticado
- [ ] `DELETE /custom-domain/:id` remove um domínio
- [ ] `POST /custom-domain/:id/verify` tenta verificar o domínio via DNS lookup e atualiza `verified`
- [ ] `domain` deve ser único no banco (erro `409` se duplicado)
- [ ] Bloqueado por middleware de plano: apenas usuários com assinatura ativa podem usar (ver TASK-13 e TASK-14)
- [ ] Swagger documentado em `src/config/swagger-paths/customDomain-paths.ts`

---

## Tarefas Técnicas

- [ ] Criar `src/controllers/customDomainController.ts` com funções:
  - `getCustomDomains`: busca por `menuId`, valida ownership
  - `createCustomDomain`: valida `domain`, `menuId`; trata erro `P2002` (unique)
  - `deleteCustomDomain`: valida ownership
  - `verifyCustomDomain`: realiza DNS lookup no domínio; se encontrar o registro esperado, atualiza `verified: true`
- [ ] Criar `src/routes/customDomainRoutes.ts`
- [ ] Registrar em `src/app.ts` após os middlewares de auth
- [ ] Criar `src/config/swagger-paths/customDomain-paths.ts` com documentação completa
- [ ] Importar `customDomainPaths` em `src/config/swagger.ts`
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Dependências
- TASK-13 (modelo de assinatura) — para o gate de plano
- TASK-14 (middleware de plano) — para proteger a rota

---

## Definition of Done
- CRUD completo com validação de ownership
- Endpoint de verificação DNS funcional
- Domínio duplicado retorna `409`
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
