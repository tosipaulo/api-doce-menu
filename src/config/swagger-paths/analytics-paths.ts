export const analyticsPaths = {
  '/analytics': {
    get: {
      tags: ['Analytics'],
      summary: 'Dados do dashboard de analytics',
      description: 'Retorna totais, produtos mais clicados e evolução diária de views para um menu no período informado',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'menuId',
          in: 'query',
          required: true,
          description: 'ID do menu',
          schema: { type: 'string' },
          example: 'clx1234567890abcdef'
        },
        {
          name: 'period',
          in: 'query',
          required: false,
          description: 'Período de análise (default: 30d)',
          schema: { type: 'string', enum: ['7d', '30d', '90d'], default: '30d' }
        }
      ],
      responses: {
        200: {
          description: 'Dados de analytics retornados com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  period: { type: 'string', example: '30d' },
                  totals: {
                    type: 'object',
                    properties: {
                      views: { type: 'integer', example: 320 },
                      clicks: { type: 'integer', example: 87 }
                    }
                  },
                  topProducts: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        productId: { type: 'string', example: 'clx9876543210fedcba' },
                        name: { type: 'string', example: 'Brigadeiro de chocolate' },
                        clicks: { type: 'integer', example: 34 }
                      }
                    }
                  },
                  dailyViews: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        date: { type: 'string', example: '2024-05-01' },
                        count: { type: 'integer', example: 12 }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Parâmetros inválidos',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: "Ops! 'menuId' é obrigatório." }
                }
              }
            }
          }
        },
        404: {
          description: 'Menu não encontrado ou não pertence ao usuário autenticado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Ops! Menu não encontrado.' }
                }
              }
            }
          }
        },
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Erro interno do servidor' }
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Analytics'],
      summary: 'Registrar evento de analytics',
      description: "Cria um evento de 'view' ou 'click' associado a um menu e, opcionalmente, a um produto.",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['menuId', 'action'],
              properties: {
                menuId: {
                  type: 'string',
                  description: 'ID do menu relacionado ao evento',
                  example: 'clx1234567890abcdef'
                },
                productId: {
                  type: 'string',
                  nullable: true,
                  description: 'ID do produto (opcional) relacionado ao evento',
                  example: 'clx9876543210fedcba'
                },
                action: {
                  type: 'string',
                  enum: ['view', 'click'],
                  description: "Tipo de ação capturada",
                  example: 'view'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Evento registrado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Legal! Evento de analytics registrado com sucesso!' },
                  analytics: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: 'clxabc123' },
                      menuId: { type: 'string', example: 'clx1234567890abcdef' },
                      productId: { type: 'string', nullable: true, example: 'clx9876543210fedcba' },
                      action: { type: 'string', example: 'view' },
                      createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Dados inválidos (campos obrigatórios ou produto inválido)',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: "Ops! 'menuId' e 'action' são obrigatórios." }
                }
              }
            }
          }
        },
        404: {
          description: 'Menu não encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Ops! Menu não encontrado.' }
                }
              }
            }
          }
        },
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Erro interno do servidor' }
                }
              }
            }
          }
        }
      }
    }
  }
};
