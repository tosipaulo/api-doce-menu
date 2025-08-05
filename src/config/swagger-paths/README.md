# Estrutura Modular do Swagger

Esta pasta contém a documentação modular do Swagger, organizada por funcionalidade.

## Estrutura de Arquivos

```
src/config/swagger-paths/
├── README.md              # Este arquivo
├── user-paths.ts          # Rotas de usuário
├── product-paths.ts       # Rotas de produtos (exemplo)
└── [outros]-paths.ts     # Outras funcionalidades
```

## Como Adicionar Novas Rotas

### 1. Criar novo arquivo de paths

Exemplo: `order-paths.ts`

```typescript
export const orderPaths = {
  '/orders': {
    get: {
      tags: ['Pedidos'],
      summary: 'Listar pedidos',
      description: 'Retorna uma lista de todos os pedidos',
      // ... resto da documentação
    },
    post: {
      tags: ['Pedidos'],
      summary: 'Criar pedido',
      description: 'Cria um novo pedido',
      // ... resto da documentação
    }
  }
};
```

### 2. Importar no arquivo principal

Em `src/config/swagger.ts`:

```typescript
import { userPaths } from './swagger-paths/user-paths';
import { orderPaths } from './swagger-paths/order-paths'; // Nova importação

const specs = {
  // ... configuração
  paths: {
    ...userPaths,
    ...orderPaths, // Adicionar aqui
  }
};
```

## Vantagens da Estrutura Modular

✅ **Organização**: Cada funcionalidade em seu próprio arquivo
✅ **Manutenibilidade**: Fácil de encontrar e editar rotas específicas
✅ **Escalabilidade**: Projeto pode crescer sem ficar confuso
✅ **Reutilização**: Paths podem ser reutilizados em diferentes contextos
✅ **Versionamento**: Cada arquivo pode ter sua própria versão

## Padrões de Nomenclatura

- **Arquivos**: `[funcionalidade]-paths.ts`
- **Exports**: `[funcionalidade]Paths`
- **Tags**: Nome da funcionalidade em português
- **Paths**: Seguir padrão RESTful

## Exemplo de Estrutura Completa

```typescript
// user-paths.ts
export const userPaths = {
  '/user': { /* rotas de usuário */ },
  '/user/auth': { /* autenticação */ },
  '/user/forgot-password': { /* recuperação de senha */ }
};

// product-paths.ts
export const productPaths = {
  '/products': { /* CRUD de produtos */ },
  '/products/{id}': { /* produto específico */ }
};

// order-paths.ts
export const orderPaths = {
  '/orders': { /* CRUD de pedidos */ },
  '/orders/{id}/items': { /* itens do pedido */ }
};
```

## Dicas

1. **Mantenha consistência**: Use o mesmo padrão em todos os arquivos
2. **Documente bem**: Inclua exemplos e descrições claras
3. **Teste sempre**: Verifique se as rotas aparecem no Swagger
4. **Comente**: Use comentários para explicar lógicas complexas
5. **Organize**: Agrupe rotas relacionadas no mesmo arquivo 