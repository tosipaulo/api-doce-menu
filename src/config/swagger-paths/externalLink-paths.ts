const ALLOWED_TYPES = ['whatsapp', 'ifood', 'ubereats', 'rappi', 'instagram', 'facebook', 'site'];

export const externalLinkPaths = {
  '/external-link': {
    get: {
      tags: ['Links Externos'],
      summary: 'Listar links externos do menu',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'menuId', in: 'query', required: true, schema: { type: 'string' }, example: 'clx1234567890abcdef' }
      ],
      responses: {
        200: {
          description: 'Links retornados com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  externalLinks: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clxlink123' },
                        type: { type: 'string', enum: ALLOWED_TYPES, example: 'whatsapp' },
                        label: { type: 'string', example: 'Peça pelo WhatsApp' },
                        url: { type: 'string', example: 'https://wa.me/5511999999999' }
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
      tags: ['Links Externos'],
      summary: 'Criar link externo',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['menuId', 'type', 'label', 'url'],
              properties: {
                menuId: { type: 'string', example: 'clx1234567890abcdef' },
                type: { type: 'string', enum: ALLOWED_TYPES, example: 'whatsapp' },
                label: { type: 'string', example: 'Peça pelo WhatsApp' },
                url: { type: 'string', example: 'https://wa.me/5511999999999' }
              }
            }
          }
        }
      },
      responses: {
        201: { description: 'Link criado com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Link criado com sucesso!' } } } } } },
        400: { description: 'Dados inválidos, type não permitido ou URL inválida', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: `Ops! type inválido. Valores aceitos: ${ALLOWED_TYPES.join(', ')}.` } } } } } },
        404: { description: 'Menu não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Menu não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  },
  '/external-link/{id}': {
    put: {
      tags: ['Links Externos'],
      summary: 'Atualizar link externo',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'clxlink123' }
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
                type: { type: 'string', enum: ALLOWED_TYPES, example: 'ifood' },
                label: { type: 'string', example: 'Peça pelo iFood' },
                url: { type: 'string', example: 'https://ifood.com.br/minha-doceria' }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Link atualizado com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Link atualizado com sucesso!' } } } } } },
        400: { description: 'Dados inválidos', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! menuId é obrigatório.' } } } } } },
        404: { description: 'Link não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Link não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  },
  '/external-link/{id}/{menuId}': {
    delete: {
      tags: ['Links Externos'],
      summary: 'Deletar link externo',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'clxlink123' },
        { name: 'menuId', in: 'path', required: true, schema: { type: 'string' }, example: 'clx1234567890abcdef' }
      ],
      responses: {
        200: { description: 'Link deletado com sucesso', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: false }, message: { type: 'string', example: 'Link deletado com sucesso!' } } } } } },
        404: { description: 'Link não encontrado', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Ops! Link não encontrado.' } } } } } },
        500: { description: 'Erro interno do servidor', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'boolean', example: true }, message: { type: 'string', example: 'Erro interno do servidor.' } } } } } }
      }
    }
  }
};
