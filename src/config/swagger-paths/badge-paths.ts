export const badgePaths = {
  '/badge': {
    get: {
      tags: ['Selos'],
      summary: 'Listar selos do menu',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'menuId', in: 'query', required: true, schema: { type: 'string' }, example: 'clx1234567890abcdef' }
      ],
      responses: {
        200: {
          description: 'Selos retornados com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  badges: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clxbadge123' },
                        label: { type: 'string', example: 'Feito com amor' },
                        icon: { type: 'string', nullable: true, example: 'heart' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        404: { description: 'Menu não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Menu não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    },
    post: {
      tags: ['Selos'],
      summary: 'Criar selo',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['menuId', 'label'],
              properties: {
                menuId: { type: 'string', example: 'clx1234567890abcdef' },
                label: { type: 'string', example: 'Feito com amor' },
                icon: { type: 'string', nullable: true, example: 'heart' }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'Selo criado com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Selo criado com sucesso!' } } } } } },
        400: { description: 'Dados inválidos', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! menuId e label são obrigatórios.' } } } } } },
        404: { description: 'Menu não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Menu não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  },
  '/badge/{id}': {
    put: {
      tags: ['Selos'],
      summary: 'Atualizar selo',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'clxbadge123' }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['menuId'],
              properties: {
                menuId: { type: 'string', example: 'clx1234567890abcdef' },
                label: { type: 'string', example: 'Entrega rápida' },
                icon: { type: 'string', nullable: true, example: 'rocket' }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Selo atualizado com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Selo atualizado com sucesso!' } } } } } },
        400: { description: 'Dados inválidos', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! menuId é obrigatório.' } } } } } },
        404: { description: 'Selo não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Selo não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  },
  '/badge/{id}/{menuId}': {
    delete: {
      tags: ['Selos'],
      summary: 'Deletar selo',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'clxbadge123' },
        { name: 'menuId', in: 'path', required: true, schema: { type: 'string' }, example: 'clx1234567890abcdef' }
      ],
      responses: {
        200: { description: 'Selo deletado com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Selo deletado com sucesso!' } } } } } },
        404: { description: 'Selo não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Selo não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  }
};
