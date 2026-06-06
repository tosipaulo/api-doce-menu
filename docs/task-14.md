# TASK-14 — Middleware de Plano (Feature Gating)

## Tipo
`Feature` | `Sprint 3`

## Prioridade
🔴 Alta (para monetização) — sem isso qualquer usuário tem acesso total independente do plano

---

## Descrição
Como plataforma SaaS, preciso de um middleware que verifique o plano ativo do usuário e bloqueie o acesso a features exclusivas de planos pagos, para garantir que apenas assinantes ativos usem recursos premium.

---

## Contexto Técnico
Após a TASK-13, o banco terá a tabela `Subscription` com o status da assinatura. Este middleware deve ser aplicado seletivamente nas rotas que exigem plano pago. O plano `free` pode ter limitações de quantidade (ex: máx. 10 produtos, 1 menu) que também precisam ser verificadas no nível do controller.

---

## Critérios de Aceitação

- [ ] Middleware `requirePlan('basic' | 'pro')` verifica se o usuário tem assinatura ativa no plano exigido ou superior
- [ ] Retorna `403` com mensagem clara indicando qual plano é necessário se a assinatura estiver ausente, cancelada ou em `past_due`
- [ ] Aplicado nas rotas: `POST /custom-domain` e demais features premium definidas na TASK-13
- [ ] Limites do plano `free` validados nos controllers:
  - Máximo de produtos por menu (ex: 10 no free)
  - Máximo de menus por usuário (ex: 1 no free)
- [ ] Swagger das rotas premium atualizado com response `403`

---

## Tarefas Técnicas

- [ ] Criar `src/middlewares/planMiddleware.ts`:
  - Função `requirePlan(minPlan: 'basic' | 'pro')` que retorna um middleware Express
  - Busca `Subscription` do `req.userId` no banco
  - Verifica `status === 'active' || status === 'trialing'`
  - Verifica hierarquia de plano: `free < basic < pro`
  - Retorna `403` com `{ error: true, message: 'Essa feature requer o plano Basic ou superior.' }` se não autorizado
- [ ] Aplicar `requirePlan('basic')` na rota `POST /custom-domain` (e demais rotas premium)
- [ ] Adicionar validação de limites do plano `free` nos controllers:
  - `createProduct`: contar produtos existentes antes de criar
  - `createMenu`: contar menus existentes antes de criar
- [ ] Atualizar Swagger das rotas afetadas com response `403` e descrição do plano necessário
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Dependências
- TASK-13 deve estar concluída (model `Subscription` e `Plan` no banco)

---

## Definition of Done
- Usuário `free` recebe `403` ao tentar acessar feature premium
- Usuário com assinatura `active` acessa normalmente
- Usuário com assinatura `canceled` recebe `403`
- Limites de quantidade do plano `free` funcionando nos controllers
- Swagger atualizado com o response `403` nas rotas premium
