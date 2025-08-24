export const productPaths = {
  '/product/all': {
    post: {
      tags: ['Produto'],
      summary: 'Buscar produtos do menu',
      description: 'Retorna todos os produtos de um menu específico do usuário autenticado',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['menuId', 'slug'],
              properties: {
                menuId: {
                  type: 'string',
                  description: 'ID do menu',
                  example: 'clx1234567890abcdef'
                },
                slug: {
                  type: 'string',
                  description: 'Slug do menu',
                  example: 'meu-menu'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Produtos encontrados com sucesso',
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
                          example: 'clx1234567890abcdef'
                        },
                        name: {
                          type: 'string',
                          example: 'Hambúrguer'
                        },
                        description: {
                          type: 'string',
                          example: 'Hambúrguer artesanal com queijo'
                        },
                        price: {
                          type: 'number',
                          example: 25.90
                        },
                        imageUrl: {
                          type: 'string',
                          example: 'https://example.com/image.jpg'
                        },
                        category: {
                          type: 'string',
                          example: 'Lanches'
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
          description: 'Produtos não encontrados',
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
                    example: 'Ops! Produto não encontrado.'
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
  '/product': {
    post: {
      tags: ['Produto'],
      summary: 'Criar novo produto',
      description: 'Cria um novo produto em um menu específico do usuário autenticado',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'menuId', 'price'],
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome do produto',
                  example: 'Hambúrguer'
                },
                description: {
                  type: 'string',
                  description: 'Descrição do produto',
                  example: 'Hambúrguer artesanal com queijo'
                },
                price: {
                  type: 'number',
                  description: 'Preço do produto',
                  example: 25.90
                },
                menuId: {
                  type: 'string',
                  description: 'ID do menu onde o produto será criado',
                  example: 'clx1234567890abcdef'
                },
                categoryId: {
                  type: 'string',
                  description: 'ID da categoria (opcional)',
                  example: 'clx1234567890abcdef'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
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
                    example: 'Legal! Produto criado com sucesso!'
                  },
                  product: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: 'clx1234567890abcdef'
                      },
                      name: {
                        type: 'string',
                        example: 'Hambúrguer'
                      },
                      description: {
                        type: 'string',
                        example: 'Hambúrguer artesanal com queijo'
                      },
                      price: {
                        type: 'number',
                        example: 25.90
                      },
                      menuId: {
                        type: 'string',
                        example: 'clx1234567890abcdef'
                      },
                      categoryId: {
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
          description: 'Dados inválidos ou categoria inválida',
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
  '/product/{id}': {
    put: {
      tags: ['Produto'],
      summary: 'Atualizar produto',
      description: 'Atualiza um produto específico do usuário autenticado',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do produto a ser atualizado',
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
              required: ['menuId'],
              properties: {
                menuId: {
                  type: 'string',
                  description: 'ID do menu do produto',
                  example: 'clx1234567890abcdef'
                },
                name: {
                  type: 'string',
                  description: 'Novo nome do produto',
                  example: 'Hambúrguer Atualizado'
                },
                description: {
                  type: 'string',
                  description: 'Nova descrição do produto',
                  example: 'Hambúrguer artesanal com queijo e bacon'
                },
                price: {
                  type: 'number',
                  description: 'Novo preço do produto',
                  example: 29.90
                },
                categoryId: {
                  type: 'string',
                  description: 'ID da nova categoria (opcional)',
                  example: 'clx1234567890abcdef'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Produto atualizado com sucesso',
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
                    example: 'Perfeito! Seu produto atualizado com sucesso!'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Dados inválidos ou categoria inválida',
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
                    example: 'Ops! É necessário informar o menu.'
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
        422: {
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
                    example: 'Ops! Parece que não existe esse produto.'
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
  '/product/{id}/{menuId}': {
    delete: {
      tags: ['Produto'],
      summary: 'Deletar produto',
      description: 'Remove um produto específico do usuário autenticado',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do produto a ser deletado',
          schema: {
            type: 'string'
          },
          example: 'clx1234567890abcdef'
        },
        {
          name: 'menuId',
          in: 'path',
          required: true,
          description: 'ID do menu do produto',
          schema: {
            type: 'string'
          },
          example: 'clx1234567890abcdef'
        }
      ],
      responses: {
        200: {
          description: 'Produto deletado com sucesso',
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
                    example: 'Ok! Produto deletado com sucesso!'
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
                    example: 'Ops! Parece que não existe esse produto.'
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
