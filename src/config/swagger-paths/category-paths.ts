export const categoryPaths = {
  '/category': {
    get: {
      tags: ['Categoria'],
      summary: 'Buscar categorias do menu',
      description: 'Retorna todas as categorias de um menu específico do usuário autenticado',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'menuId',
          in: 'query',
          required: false,
          description: 'ID do menu',
          schema: { type: 'string' },
          example: 'clx1234567890abcdef'
        },
        {
          name: 'slug',
          in: 'query',
          required: false,
          description: 'Slug do menu',
          schema: { type: 'string' },
          example: 'meu-menu'
        }
      ],
      responses: {
        200: {
          description: 'Categorias encontradas com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  categories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clx1234567890abcdef' },
                        name: { type: 'string', example: 'Doces' }
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
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Token inválido' }
                }
              }
            }
          }
        },
        404: {
          description: 'Categorias não encontradas',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Ops! Categoria não encontrada.' }
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
      tags: ['Categoria'],
      summary: 'Criar nova categoria',
      description: 'Cria uma nova categoria em um menu específico do usuário autenticado',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'menuId'],
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome da categoria',
                  example: 'Lanches'
                },
                menuId: {
                  type: 'string',
                  description: 'ID do menu onde a categoria será criada',
                  example: 'clx1234567890abcdef'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Categoria criada com sucesso',
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
                    example: 'Legal! Categoria criada com sucesso!'
                  },
                  category: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: 'clx1234567890abcdef'
                      },
                      name: {
                        type: 'string',
                        example: 'Lanches'
                      },
                      menuId: {
                        type: 'string',
                        example: 'clx1234567890abcdef'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Dados inválidos',
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
                    example: 'Todos os campos são obrigatórios.'
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
          description: 'Menu não encontrado',
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
                    example: 'Ops! Menu não encontrado.'
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
  },
  '/category/{id}': {
    put: {
      tags: ['Categoria'],
      summary: 'Atualizar categoria',
      description: 'Atualiza uma categoria específica do usuário autenticado',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID da categoria a ser atualizada',
          schema: { type: 'string' },
          example: 'clx1234567890abcdef'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['menuId'],
              properties: {
                menuId: {
                  type: 'string',
                  description: 'ID do menu da categoria',
                  example: 'clx1234567890abcdef'
                },
                name: {
                  type: 'string',
                  description: 'Novo nome da categoria',
                  example: 'Bebidas'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Categoria atualizada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Perfeito! Sua categoria foi atualizada com sucesso!' }
                }
              }
            }
          }
        },
        400: {
          description: 'Dados inválidos',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Ops! É necessário informar o menu.' }
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
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Token inválido' }
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
        422: {
          description: 'Categoria não encontrada',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Ops! Parece que não existe essa categoria.' }
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
  },
  '/category/{id}/{menuId}': {
    delete: {
      tags: ['Categoria'],
      summary: 'Deletar categoria',
      description: 'Remove uma categoria específica do usuário autenticado',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID da categoria a ser deletada',
          schema: { type: 'string' },
          example: 'clx1234567890abcdef'
        },
        {
          name: 'menuId',
          in: 'path',
          required: true,
          description: 'ID do menu da categoria',
          schema: { type: 'string' },
          example: 'clx1234567890abcdef'
        }
      ],
      responses: {
        200: {
          description: 'Categoria deletada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Ok! Categoria deletada com sucesso!' }
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
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Token inválido' }
                }
              }
            }
          }
        },
        422: {
          description: 'Categoria não encontrada',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Ops! Parece que não existe essa categoria.' }
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
