export const landingPagePaths = {
  '/landing-page': {
    get: {
      tags: ['Landing Page'],
      summary: 'Buscar configurações da landing page',
      description: 'Retorna as configurações da landing page baseado no slug do menu',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'slug',
          in: 'query',
          required: true,
          description: 'Slug do menu do restaurante',
          schema: {
            type: 'string'
          },
          example: 'meu-restaurante'
        }
      ],
      responses: {
        200: {
          description: 'Configurações do restaurante encontradas com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'boolean',
                    example: false
                  },
                  restaurant: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: 'clx1234567890abcdef'
                      },
                      name: {
                        type: 'string',
                        example: 'Meu Restaurante'
                      },
                      title: {
                        type: 'string',
                        example: 'Título do Restaurante'
                      },
                      subtitle: {
                        type: 'string',
                        example: 'Subtitle do Restaurante'
                      },
                      description: {
                        type: 'string',
                        example: 'Descrição do restaurante'
                      },
                      logoUrl: {
                        type: 'string',
                        example: 'https://example.com/logo.png'
                      },
                      imagemHighlight: {
                        type: 'string',
                        example: 'https://example.com/logo.png'
                      },
                      address: {
                        type: 'string',
                        example: 'Rua das Flores, 123'
                      },
                      themeColor: {
                        type: 'string',
                        example: '#FF6B6B'
                      },
                      themeColorSecondary: {
                        type: 'string',
                        example: '#4ECDC4'
                      },
                      whatsapp: {
                        type: 'string',
                        example: '+5511999999999'
                      },
                      email: {
                        type: 'string',
                        example: 'contato@restaurante.com'
                      },
                      phoneNumber: {
                        type: 'string',
                        example: '+5511888888888'
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-01-01T00:00:00.000Z'
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-01-01T00:00:00.000Z'
                      },
                      menu: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: 'clx1234567890abcdef'
                          },
                          name: {
                            type: 'string',
                            example: 'Menu - Meu Restaurante'
                          },
                          slug: {
                            type: 'string',
                            example: 'meu-restaurante'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'Não autorizado - Token inválido ou ausente',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Token inválido'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Restaurante não encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Restaurante não encontrado.'
                  }
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
                  error: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Erro interno do servidor'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
