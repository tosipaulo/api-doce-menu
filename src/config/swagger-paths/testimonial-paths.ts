export const testimonialPaths = {
  '/testimonial': {
    get: {
      tags: ['Depoimentos'],
      summary: 'Listar depoimentos do menu',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'menuId', in: 'query', required: true, schema: { type: 'string' }, example: 'clx1234567890abcdef' }
      ],
      responses: {
        200: {
          description: 'Depoimentos retornados com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  testimonials: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clxtest123' },
                        name: { type: 'string', example: 'Maria Silva' },
                        message: { type: 'string', example: 'Melhor doceria da cidade!' },
                        avatarUrl: { type: 'string', nullable: true, example: null },
                        rating: { type: 'integer', example: 5 },
                        createdAt: { type: 'string', format: 'date-time' }
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
      tags: ['Depoimentos'],
      summary: 'Criar depoimento',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['menuId', 'name', 'message', 'rating'],
              properties: {
                menuId: { type: 'string', example: 'clx1234567890abcdef' },
                name: { type: 'string', example: 'Maria Silva' },
                message: { type: 'string', example: 'Melhor doceria da cidade!' },
                avatarUrl: { type: 'string', nullable: true, example: null },
                rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'Depoimento criado com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Depoimento criado com sucesso!' } } } } } },
        400: { description: 'Dados inválidos ou rating fora do intervalo', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! rating deve ser entre 1 e 5.' } } } } } },
        404: { description: 'Menu não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Menu não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  },
  '/testimonial/{id}': {
    put: {
      tags: ['Depoimentos'],
      summary: 'Atualizar depoimento',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'clxtest123' }
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
                name: { type: 'string', example: 'Maria Silva' },
                message: { type: 'string', example: 'Melhor doceria da cidade!' },
                avatarUrl: { type: 'string', nullable: true, example: null },
                rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Depoimento atualizado com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Depoimento atualizado com sucesso!' } } } } } },
        400: { description: 'Dados inválidos', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! menuId é obrigatório.' } } } } } },
        404: { description: 'Depoimento não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Depoimento não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  },
  '/testimonial/{id}/{menuId}': {
    delete: {
      tags: ['Depoimentos'],
      summary: 'Deletar depoimento',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'clxtest123' },
        { name: 'menuId', in: 'path', required: true, schema: { type: 'string' }, example: 'clx1234567890abcdef' }
      ],
      responses: {
        200: { description: 'Depoimento deletado com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Depoimento deletado com sucesso!' } } } } } },
        404: { description: 'Depoimento não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Depoimento não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  }
};
