# TASK-4 — Endpoint: PATCH /user/password

## Tipo
`Feature` | `Sprint 1`

## Prioridade
🟡 Média — necessário para o painel do usuário, mas não bloqueia a integração inicial

---

## Descrição
Como usuário autenticado, quero poder alterar minha senha dentro do painel sem precisar passar pelo fluxo de recuperação por email, para ter mais autonomia sobre minha conta.

---

## Contexto Técnico
Já existe um fluxo de `forgotPassword` + `resetPassword` para usuários não autenticados. Esta task cobre o caso de uso de troca de senha dentro do painel, onde o usuário já está logado. Deve exigir a senha atual para confirmar identidade antes de aplicar a nova.

---

## Critérios de Aceitação

- [ ] `PATCH /user/password` aceita `currentPassword` e `newPassword` no body
- [ ] Valida que `currentPassword` corresponde ao hash armazenado
- [ ] Retorna `400` se `currentPassword` estiver errada
- [ ] Retorna `400` se `newPassword` for igual à senha atual
- [ ] Atualiza o hash no banco e retorna `200`
- [ ] Swagger documentado em `src/config/swagger-paths/user-paths.ts`

---

## Tarefas Técnicas

- [ ] Criar função `changePassword` em `src/controllers/userController.ts`
  - Extrair `currentPassword` e `newPassword` do body
  - Validar campos obrigatórios
  - Usar `comparePassword` para verificar senha atual
  - Usar `hashPassword` para gerar novo hash
  - Atualizar via `prisma.user.update`
- [ ] Registrar rota `PATCH /user/password` em `src/routes/userRoutes.ts` com middlewares de auth aplicados diretamente na rota (igual à estratégia definida na TASK-3)
- [ ] Adicionar entrada `PATCH /user/password` em `src/config/swagger-paths/user-paths.ts` com:
  - Summary, description, security (bearerAuth)
  - Request body: `currentPassword`, `newPassword`
  - Responses: 200, 400, 401, 500
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- Senha alterada com sucesso quando `currentPassword` está correta
- Retorna `400` com mensagem clara quando senha atual está errada
- Arquivo correspondente em `src/config/swagger-paths/` atualizado refletindo o novo endpoint
