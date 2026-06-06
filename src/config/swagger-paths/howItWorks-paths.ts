export const howItWorksPaths = {
  '/how-it-works': {
    get: {
      tags: ['Como Funciona'],
      summary: 'Listar etapas do menu',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'menuId', in: 'query', required: true, schema: { type: 'string' }, example: 'clx1234567890abcdef' }
      ],
      responses: {
        200: {
          description: 'Etapas retornadas com sucesso (ordenadas por order ASC)',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  steps: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clxhow123' },
                        title: { type: 'string', example: 'Escolha seus doces' },
                        description: { type: 'string', example: 'Navegue pelo cardápio e escolha.' },
                        icon: { type: 'string', nullable: true, example: 'cake' },
                        order: { type: 'integer', example: 1 }
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
      tags: ['Como Funciona'],
      summary: 'Criar etapa',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['menuId', 'title', 'description', 'order'],
              properties: {
                menuId: { type: 'string', example: 'clx1234567890abcdef' },
                title: { type: 'string', example: 'Escolha seus doces' },
                description: { type: 'string', example: 'Navegue pelo cardápio e escolha.' },
                icon: { type: 'string', nullable: true, example: 'cake' },
                order: { type: 'integer', example: 1 }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'Etapa criada com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Etapa criada com sucesso!' } } } } } },
        400: { description: 'Dados inválidos', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! menuId, title, description e order são obrigatórios.' } } } } } },
        404: { description: 'Menu não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Menu não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  },
  '/how-it-works/{id}': {
    put: {
      tags: ['Como Funciona'],
      summary: 'Atualizar etapa',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'clxhow123' }
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
                title: { type: 'string', example: 'Escolha seus doces' },
                description: { type: 'string', example: 'Navegue pelo cardápio e escolha.' },
                icon: { type: 'string', nullable: true, example: 'cake' },
                order: { type: 'integer', example: 1 }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Etapa atualizada com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Etapa atualizada com sucesso!' } } } } } },
        400: { description: 'Dados inválidos', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! menuId é obrigatório.' } } } } } },
        404: { description: 'Etapa não encontrada', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Etapa não encontrada.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  },
  '/how-it-works/{id}/{menuId}': {
    delete: {
      tags: ['Como Funciona'],
      summary: 'Deletar etapa',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'clxhow123' },
        { name: 'menuId', in: 'path', required: true, schema: { type: 'string' }, example: 'clx1234567890abcdef' }
      ],
      responses: {
        200: { description: 'Etapa deletada com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Etapa deletada com sucesso!' } } } } } },
        404: { description: 'Etapa não encontrada', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Etapa não encontrada.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  }
};
