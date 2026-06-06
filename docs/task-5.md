# TASK-5 — Endpoint: GET /analytics (Dashboard)

## Tipo
`Feature` | `Sprint 2`

## Prioridade
🟡 Média — necessário para o dashboard do painel do estabelecimento

---

## Descrição
Como dono de um estabelecimento, quero visualizar os dados de acesso ao meu menu (visualizações, cliques) agrupados por período para entender o desempenho do meu cardápio digital.

---

## Contexto Técnico
Atualmente só existe `POST /analytics` para registrar eventos. Não há nenhum endpoint de leitura. O model `Analytics` armazena `menuId`, `productId` (opcional), `action` (`view` | `click`) e `createdAt`. O dashboard precisa de totais e evolução temporal.

---

## Critérios de Aceitação

- [ ] `GET /analytics?menuId=&period=` retorna dados agregados do menu autenticado
- [ ] Parâmetro `period` aceita: `7d`, `30d`, `90d` (default: `30d`)
- [ ] Resposta inclui:
  - Total de `views` e `clicks` no período
  - Lista dos produtos mais clicados (top 5)
  - Evolução diária de views (array com data + contagem)
- [ ] Retorna `403` se o `menuId` não pertencer ao usuário autenticado
- [ ] Swagger documentado em `src/config/swagger-paths/analytics-paths.ts`

---

## Tarefas Técnicas

- [ ] Criar função `getAnalytics` em `src/controllers/analyticsController.ts`
  - Receber `menuId` e `period` via `req.query`
  - Calcular data de início com base no `period`
  - Verificar ownership do menu (`menu.userId === req.userId`)
  - Usar `prisma.analytics.groupBy` ou `findMany` + agregação manual para montar os dados
  - Retornar objeto com `totals`, `topProducts` e `dailyViews`
- [ ] Registrar rota `GET /analytics` em `src/routes/analyticsRoutes.ts`
- [ ] Adicionar entrada `GET /analytics` em `src/config/swagger-paths/analytics-paths.ts` com:
  - Summary, description, security (bearerAuth)
  - Query params: `menuId`, `period`
  - Response 200 com schema completo
  - Responses: 400, 403, 500
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- Dados retornados são consistentes com os eventos registrados via `POST /analytics`
- Filtro por período funciona corretamente
- Usuário não consegue ver analytics de menu que não é seu
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
