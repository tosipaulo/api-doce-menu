# TASK-16 — Definição de Planos e Controle de Uso de IA

## Tipo
`Feature` | `Sprint 3`

## Prioridade
🔴 Alta (para monetização) — define as regras de negócio de todos os tiers

---

## Descrição
Como plataforma SaaS, preciso formalizar os 3 planos de assinatura com seus limites e controlar o consumo mensal de funcionalidades de IA por usuário, para garantir que cada plano entregue o valor prometido sem ultrapassar os custos operacionais.

---

## Planos e Limites

| Feature | Grátis | Profissional | Premium |
|---|---|---|---|
| Produtos por menu | 5 | Ilimitado | Ilimitado |
| Análise de imagem IA | — | 10/mês | Ilimitado |
| Melhoria de imagem IA | — | 5/mês | Ilimitado |
| Domínio personalizado | — | — | ✓ |

> Os valores de limite (`10` e `5`) são configuráveis via variável de ambiente para facilitar ajustes sem redeploy.

---

## Contexto Técnico

Esta task depende de:
- **TASK-13** — model `Plan` e `Subscription` no schema
- **TASK-14** — middleware de plano (`requirePlan`)
- **TASK-15** — endpoints de análise e melhoria de imagem

O controle de uso mensal de IA exige um novo model `AIUsageRecord` que registra cada consumo com mês/ano de referência. A verificação sempre filtra pelo mês corrente para resetar automaticamente todo início de mês, sem necessidade de cron job.

---

## Critérios de Aceitação

### Planos
- [ ] Os 3 planos estão registrados na tabela `Plan` com `name`: `free`, `profissional`, `premium`
- [ ] Cada plano tem um campo `limits` (JSON) com as regras: `maxProducts`, `aiAnalysisPerMonth`, `aiEnhancementPerMonth`
- [ ] `null` em qualquer limite significa ilimitado

### Controle de produtos (plano Grátis)
- [ ] `POST /product` bloqueia criação com `403` quando o usuário no plano `free` já tem 5 produtos no menu
- [ ] Mensagem clara: `"Você atingiu o limite de 5 produtos do plano Grátis. Faça upgrade para continuar."`

### Controle de uso de IA
- [ ] `POST /upload` (análise) verifica cota antes de chamar Claude Vision
- [ ] `POST /upload/enhance` (melhoria) verifica cota antes de chamar Stability AI
- [ ] Plano `free`: bloqueia com `403` informando que análise/melhoria não está disponível no plano atual
- [ ] Plano `profissional`: bloqueia com `403` quando cota do mês foi atingida, informando quantas utilizações restam
- [ ] Plano `premium`: sem verificação de cota
- [ ] Após cada uso bem-sucedido, registra em `AIUsageRecord`
- [ ] `GET /user/me` (TASK-3) passa a retornar `aiUsage: { analysisUsed, analysisLimit, enhancementUsed, enhancementLimit }` para o FE exibir no painel
- [ ] Arquivo `src/config/swagger-paths/upload-paths.ts` atualizado com response `403` de cota atingida

### Variáveis de ambiente para os limites
- [ ] `PLAN_PRO_AI_ANALYSIS_LIMIT=10`
- [ ] `PLAN_PRO_AI_ENHANCEMENT_LIMIT=5`

---

## Tarefas Técnicas

### Schema (`prisma/schema.prisma`)
- [ ] Adicionar model `AIUsageRecord`:
  ```
  id         String   @id @default(uuid())
  userId     String
  user       User     @relation(...)
  type       String   // 'analysis' | 'enhancement'
  month      Int      // 1-12
  year       Int
  count      Int      @default(0)
  @@unique([userId, type, month, year])
  ```
- [ ] Rodar `npx prisma migrate dev --name add-ai-usage-record`

### Seed dos planos (`prisma/seed.ts` ou migration)
- [ ] Inserir os 3 planos na tabela `Plan` com seus limites em JSON:
  ```json
  { "maxProducts": 5, "aiAnalysisPerMonth": 0, "aiEnhancementPerMonth": 0 }
  { "maxProducts": null, "aiAnalysisPerMonth": 10, "aiEnhancementPerMonth": 5 }
  { "maxProducts": null, "aiAnalysisPerMonth": null, "aiEnhancementPerMonth": null }
  ```

### Serviço de controle de uso — `src/services/aiUsageService.ts`
- [ ] Criar função `checkAndIncrementAIUsage(userId, type, plan)`:
  - Busca o `AIUsageRecord` do usuário para o `type`, mês e ano correntes
  - Se não existir, cria com `count: 0`
  - Compara `count` com o limite do plano (`PLAN_PRO_AI_ANALYSIS_LIMIT` ou `PLAN_PRO_AI_ENHANCEMENT_LIMIT`)
  - Se dentro do limite: incrementa `count` e retorna `{ allowed: true, remaining }`
  - Se limite atingido: retorna `{ allowed: false, remaining: 0 }`
  - Se plano `premium` ou limite `null`: retorna `{ allowed: true, remaining: null }` sem tocar no banco

### Atualização dos controllers
- [ ] `productController.createProduct`: antes de criar, contar produtos do menu e bloquear se plano `free` e `count >= 5`
- [ ] `uploadController.uploadImage` (análise): chamar `checkAndIncrementAIUsage(userId, 'analysis', plan)` antes de invocar Claude Vision
- [ ] `uploadController.enhanceImage` (melhoria): chamar `checkAndIncrementAIUsage(userId, 'enhancement', plan)` antes de invocar Stability AI
- [ ] `userController.getMe`: incluir `aiUsage` na resposta consultando `AIUsageRecord` do mês corrente

### Atualização do Swagger
- [ ] Adicionar response `403` com mensagem de cota em `src/config/swagger-paths/upload-paths.ts` para ambos os endpoints de IA

---

## Dependências
- TASK-13 — `Plan` e `Subscription` no banco (necessário para ler o plano do usuário)
- TASK-14 — middleware `requirePlan` (reutilizado para bloquear `free` nas rotas de IA)
- TASK-15 — endpoints de análise e melhoria (onde o controle de uso é aplicado)

---

## Definition of Done
- Usuário `free` não consegue criar o 6º produto
- Usuário `profissional` consegue analisar até 10 imagens/mês e melhorar até 5/mês; na 11ª análise recebe `403` com mensagem de cota
- Usuário `premium` não tem bloqueio em nenhuma funcionalidade de IA
- Contador reseta automaticamente no mês seguinte (por ser filtrado por mês/ano corrente)
- `GET /user/me` retorna o uso atual de IA para o FE exibir no painel
- Arquivo `src/config/swagger-paths/upload-paths.ts` atualizado com response `403` de cota
