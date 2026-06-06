# TASK-12 — Rota GET /raffle (Listagem de Leads)

## Tipo
`Feature` | `Sprint 1`

## Prioridade
🟡 Média — a função `getAllMailings` já existe mas está órfã (sem rota)

---

## Descrição
Como administrador da plataforma, quero listar todos os leads cadastrados no formulário de pré-registro para acompanhar o interesse no produto e fazer ações de marketing.

---

## Contexto Técnico
O controller `mailingController.ts` já possui a função `getAllMailings` implementada, mas ela não está registrada em nenhuma rota. A rota `/raffle` usa o mesmo controller e é pública. A listagem de leads deve ser protegida por uma chave de admin ou ao menos por uma variável de ambiente, para não expor dados públicos.

---

## Critérios de Aceitação

- [ ] `GET /raffle` retorna a lista de todos os leads ordenados por `createdAt DESC`
- [ ] Rota protegida por chave de admin via header `x-admin-key` comparado a variável de ambiente `ADMIN_SECRET`
- [ ] Retorna `{ error: false, mailings: [...] }` com status `200`
- [ ] Retorna `401` se a chave estiver ausente ou incorreta
- [ ] Swagger documentado (novo arquivo ou adicionado ao existente de raffle)

---

## Tarefas Técnicas

- [ ] Corrigir a mensagem de sucesso em `getAllMailings` (`src/controllers/mailingController.ts`): de `"Legal! Seu cadastro foi salvo com sucesso!"` para `"Leads encontrados com sucesso."`
- [ ] Criar middleware simples de admin key em `src/middlewares/adminMiddleware.ts`:
  - Lê `req.headers['x-admin-key']`
  - Compara com `process.env.ADMIN_SECRET`
  - Retorna `401` se inválido
- [ ] Registrar rota `GET /raffle` em `src/routes/raffleRoutes.ts` com `adminMiddleware`
- [ ] Adicionar `ADMIN_SECRET` em `src/types/env.d.ts`
- [ ] Documentar a nova rota no Swagger com o header `x-admin-key`
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- `GET /raffle` retorna leads com chave correta
- Sem chave ou chave errada retorna `401`
- Mensagem de sucesso correta
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
