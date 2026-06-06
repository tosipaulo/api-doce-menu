# TASK-15 — Análise e Melhoria de Imagem com IA

## Tipo
`Feature` | `Sprint 3`

## Prioridade
🟡 Média — diferencial competitivo do produto, não bloqueia o lançamento inicial

---

## Descrição
Como dono de um estabelecimento, quero que ao fazer upload de uma foto de produto o sistema avalie automaticamente se ela é adequada para um cardápio digital e, se eu quiser, solicite uma versão melhorada da imagem gerada por IA — tudo sem sair do painel.

---

## Contexto Técnico

O `uploadController` já recebe o buffer da imagem antes de enviá-la ao Cloudinary. O fluxo atual é:

```
FE → buffer → Cloudinary → salva URL no banco
```

O novo fluxo será:

```
FE → buffer → Claude Vision (análise) → Cloudinary → salva URL + análise no banco
                                                    → retorna { imageUrl, analysis }

FE solicita melhoria → POST /upload/enhance → Stability AI (img2img) → Cloudinary → atualiza URL no banco
                                                                      → retorna { imageUrl }
```

### Serviços utilizados
- **Análise:** Claude API (claude-sonnet-4-6) com vision — avalia qualidade, iluminação, composição e apelo visual para cardápio
- **Melhoria:** Stability AI (`stable-diffusion-img2img` ou `instruct-pix2pix`) — recebe a imagem original + instruções da análise e gera uma versão melhorada

---

## Critérios de Aceitação

### Análise (integrada ao upload existente)
- [ ] `POST /upload` passa a retornar, além de `imageUrl`, um objeto `analysis` com:
  - `score`: número de 0 a 10 indicando qualidade geral para cardápio
  - `approved`: boolean — `true` se `score >= 6`
  - `feedback`: string com avaliação em português (ex: "A iluminação está escura e o fundo está poluído")
  - `suggestions`: array de strings com melhorias específicas (ex: ["Melhore a iluminação", "Use fundo neutro"])
- [ ] A análise roda **apenas para `type === 'product'`** — fotos de logo e restaurante não são avaliadas
- [ ] A imagem é salva no Cloudinary e banco **independente do score** — a decisão de usar ou melhorar fica com o usuário
- [ ] Se a análise da IA falhar, o upload continua normalmente (análise é opcional, não bloqueia)

### Melhoria (novo endpoint)
- [ ] `POST /upload/enhance` recebe `productId` e executa a melhoria da imagem atual do produto
- [ ] Busca a imagem atual do produto no banco via `productId`
- [ ] Baixa o buffer da imagem do Cloudinary
- [ ] Envia para Stability AI com prompt de melhoria baseado nas `suggestions` da análise anterior ou um prompt padrão de cardápio
- [ ] Faz upload da imagem melhorada no Cloudinary (pasta `product_images_enhanced`)
- [ ] Atualiza `product.imageUrl` no banco com a nova URL
- [ ] Retorna `{ error: false, imageUrl, message: "Imagem melhorada com sucesso!" }`
- [ ] Endpoint autenticado e valida ownership do produto
- [ ] Arquivo `src/config/swagger-paths/upload-paths.ts` atualizado com o novo endpoint

---

## Tarefas Técnicas

### Schema
- [ ] Adicionar campo `imageAnalysis` (JSON, opcional) ao model `Product` em `prisma/schema.prisma` para persistir o resultado da análise
- [ ] Rodar `npx prisma migrate dev --name add-image-analysis`

### Serviço de análise — `src/utils/imageAnalysis.ts`
- [ ] Criar função `analyzeProductImage(buffer: Buffer): Promise<ImageAnalysis>`
  - Converte buffer para base64
  - Chama `claude-sonnet-4-6` com vision passando a imagem e o prompt abaixo
  - Faz parse do JSON retornado e valida os campos
  - Retorna `{ score, approved, feedback, suggestions }`

**Prompt para Claude:**
```
Você é um especialista em fotografia gastronômica para cardápios digitais.
Analise esta imagem de produto e retorne um JSON com exatamente este formato:
{
  "score": <número de 0 a 10>,
  "approved": <true se score >= 6>,
  "feedback": "<avaliação geral em português, máximo 2 frases>",
  "suggestions": ["<melhoria 1>", "<melhoria 2>", ...]
}
Critérios de avaliação: iluminação, foco/nitidez, composição, fundo, apelo visual e desejo de consumo.
Retorne apenas o JSON, sem texto adicional.
```

### Serviço de melhoria — `src/utils/imageEnhancement.ts`
- [ ] Criar função `enhanceProductImage(imageUrl: string, suggestions: string[]): Promise<Buffer>`
  - Baixa o buffer da imagem atual via `fetch(imageUrl)`
  - Monta o prompt de melhoria com base nas `suggestions` (ou usa prompt padrão se não houver)
  - Chama Stability AI `stable-diffusion-img2img` com o buffer e o prompt
  - Retorna o buffer da imagem melhorada

**Prompt padrão para Stability AI:**
```
Professional food photography for a digital menu. 
Improve lighting, use neutral background, make the product look appetizing and desirable.
High quality, sharp focus, studio lighting.
```

### Atualização do `uploadController`
- [ ] Em `uploadImage`, após o upload pro Cloudinary, se `type === 'product'`:
  - Chamar `analyzeProductImage(buffer)` dentro de um `try/catch` isolado
  - Se análise retornar, salvar resultado em `product.imageAnalysis` via `prisma.product.update`
  - Incluir `analysis` na resposta

### Novo endpoint de melhoria
- [ ] Criar função `enhanceImage` em `src/controllers/uploadController.ts`:
  - Extrair `productId` do body
  - Validar ownership do produto
  - Buscar `product.imageUrl` no banco
  - Chamar `enhanceProductImage`
  - Upload do resultado pro Cloudinary
  - Atualizar `product.imageUrl` e `product.imageAnalysis` (rodar nova análise da imagem melhorada)
  - Retornar nova URL
- [ ] Registrar `POST /upload/enhance` em `src/routes/uploadRoutes.ts` com `upload.none()` (sem arquivo, usa URL do banco)
- [ ] Atualizar `src/config/swagger-paths/upload-paths.ts` com o novo endpoint `/upload/enhance`

### Variáveis de ambiente
- [ ] Adicionar ao `src/types/env.d.ts`: `ANTHROPIC_API_KEY`, `STABILITY_API_KEY`
- [ ] Documentar no CLAUDE.md

---

## Dependências
- `@anthropic-ai/sdk` — já deve estar instalado ou adicionar via `npm install @anthropic-ai/sdk`
- `stability-sdk` ou chamada direta via `fetch` para a API da Stability AI

---

## Definition of Done
- Upload de produto retorna `analysis` com `score`, `approved`, `feedback` e `suggestions`
- Se análise falhar, upload ainda funciona normalmente sem `analysis`
- `POST /upload/enhance` gera imagem melhorada, salva no Cloudinary e atualiza o banco
- Ownership validado em ambos os endpoints
- Arquivo `src/config/swagger-paths/upload-paths.ts` atualizado com os dois fluxos
