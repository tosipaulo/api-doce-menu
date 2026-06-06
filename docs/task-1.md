# TASK-1 — Bug Fix: JWT Expiry e Typo no Upload

## Tipo
`Bug` | `Sprint 1`

## Prioridade
🔴 Alta — bloqueia qualquer integração com o FE

---

## Descrição
Como desenvolvedor da API, preciso corrigir dois bugs que já existem em produção antes de iniciar a integração com o frontend, para que o usuário não seja derrubado após 5 minutos de sessão e a resposta do upload retorne o campo correto.

---

## Problemas Identificados

### Bug 1 — JWT expira em 5 minutos, cookie dura 7 dias
**Arquivo:** `src/utils/token.ts`

O parâmetro default de `generateTokenJWT` é `"5m"`. A função de autenticação chama sem passar o parâmetro, fazendo o token expirar em 5 minutos enquanto o cookie persiste por 7 dias. O usuário é derrubado logo após o login.

### Bug 2 — Typo no campo de resposta do upload
**Arquivo:** `src/controllers/uploadController.ts`

A resposta de sucesso retorna `{ erro: false }` em vez de `{ error: false }`, quebrando o padrão de resposta da API.

---

## Critérios de Aceitação

- [ ] `generateTokenJWT` chamado na autenticação com `expiresIn: "7d"` alinhado ao `maxAge` do cookie
- [ ] Resposta do upload retorna `{ error: false, message, imageUrl }`
- [ ] Build TypeScript sem erros (`npm run build`)
- [ ] Swagger atualizado se necessário

---

## Tarefas Técnicas

- [ ] Em `src/controllers/userController.ts`, passar `"7d"` na chamada de `generateTokenJWT` no `autenticateUser`
- [ ] Em `src/controllers/uploadController.ts`, corrigir `erro` → `error` na resposta final
- [ ] Verificar se o Swagger do `/upload` já reflete o campo correto (`error`)
- [ ] Rodar `npm run build` e confirmar sem erros

---

## Definition of Done
- Código corrigido e buildando
- Testado manualmente: login → aguardar >5min → chamada autenticada ainda funciona
- Swagger consistente com a resposta real
