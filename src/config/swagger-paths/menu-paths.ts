export const menuPaths = {
  '/menu': {
    get: {
      tags: ['Menu'],
      summary: 'Buscar menu do usuário',
      description: 'Retorna o menu associado ao usuário autenticado',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Menu encontrado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'boolean',
                    example: false
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
                        example: 'Meu Menu'
                      },
                      slug: {
                        type: 'string',
                        example: 'meu-menu'
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
    },
    post: {
      tags: ['Menu'],
      summary: 'Criar novo menu',
      description: 'Cria um novo menu para o usuário autenticado',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'slug'],
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome do menu',
                  example: 'Meu Menu'
                },
                slug: {
                  type: 'string',
                  description: 'Slug único do menu (URL amigável)',
                  example: 'meu-menu'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Menu criado com sucesso',
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
                    example: 'Menu criado com sucesso!'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Dados inválidos ou slug já em uso',
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
  '/menu/{id}': {
    put: {
      tags: ['Menu'],
      summary: 'Atualizar menu',
      description: 'Atualiza um menu específico do usuário autenticado',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do menu a ser atualizado',
          schema: {
            type: 'string'
          },
          example: 'clx1234567890abcdef'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Novo nome do menu',
                  example: 'Menu Atualizado'
                },
                slug: {
                  type: 'string',
                  description: 'Novo slug do menu',
                  example: 'menu-atualizado'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Menu atualizado com sucesso',
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
                    example: 'Perfeito! Menu atualizado com sucesso!'
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
        422: {
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
                    example: 'Ops! Parece que não existe esse menu.'
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
    },
    delete: {
      tags: ['Menu'],
      summary: 'Deletar menu',
      description: 'Remove um menu específico do usuário autenticado',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do menu a ser deletado',
          schema: {
            type: 'string'
          },
          example: 'clx1234567890abcdef'
        }
      ],
      responses: {
        200: {
          description: 'Menu deletado com sucesso',
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
                    example: 'Ok! Menu deletado com sucesso!'
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
        422: {
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
                    example: 'Ops! Parece que não existe esse menu.'
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
