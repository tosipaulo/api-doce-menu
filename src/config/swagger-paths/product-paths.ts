// Exemplo de como adicionar novas rotas quando o projeto crescer
export const productPaths = {
  '/products': {
    get: {
      tags: ['Produtos'],
      summary: 'Listar produtos',
      description: 'Retorna uma lista de todos os produtos',
      responses: {
        '200': {
          description: 'Lista de produtos retornada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'boolean',
                    example: false
                  },
                  products: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '1'
                        },
                        name: {
                          type: 'string',
                          example: 'Bolo de Chocolate'
                        },
                        price: {
                          type: 'number',
                          example: 25.90
                        },
                        description: {
                          type: 'string',
                          example: 'Delicioso bolo de chocolate'
                        }
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
    post: {
      tags: ['Produtos'],
      summary: 'Criar produto',
      description: 'Cria um novo produto no sistema',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'price'],
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome do produto',
                  example: 'Bolo de Chocolate'
                },
                price: {
                  type: 'number',
                  description: 'Preço do produto',
                  example: 25.90
                },
                description: {
                  type: 'string',
                  description: 'Descrição do produto',
                  example: 'Delicioso bolo de chocolate'
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Produto criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'boolean',
                    example: false
                  },
                  message: {
                    type: 'string',
                    example: 'Produto criado com sucesso!'
                  },
                  product: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '1'
                      },
                      name: {
                        type: 'string',
                        example: 'Bolo de Chocolate'
                      },
                      price: {
                        type: 'number',
                        example: 25.90
                      },
                      description: {
                        type: 'string',
                        example: 'Delicioso bolo de chocolate'
                      }
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
  '/products/{id}': {
    get: {
      tags: ['Produtos'],
      summary: 'Buscar produto por ID',
      description: 'Retorna um produto específico pelo ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do produto',
          schema: {
            type: 'string'
          },
          example: '1'
        }
      ],
      responses: {
        '200': {
          description: 'Produto encontrado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'boolean',
                    example: false
                  },
                  product: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '1'
                      },
                      name: {
                        type: 'string',
                        example: 'Bolo de Chocolate'
                      },
                      price: {
                        type: 'number',
                        example: 25.90
                      },
                      description: {
                        type: 'string',
                        example: 'Delicioso bolo de chocolate'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        '404': {
          description: 'Produto não encontrado',
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
                    example: 'Produto não encontrado'
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