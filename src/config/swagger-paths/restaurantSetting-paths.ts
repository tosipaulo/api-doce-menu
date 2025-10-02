export const restaurantSettingPaths = {
  '/restaurant': {
    get: {
      tags: ['Restaurante'],
      summary: 'Buscar configurações do restaurante',
      description: 'Retorna as configurações do restaurante baseado no slug do menu',
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
    },
    post: {
      tags: ['Restaurante'],
      summary: 'Criar configurações do restaurante',
      description: 'Cria um novo restaurante com suas configurações e um menu associado',
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
                  description: 'Nome do restaurante',
                  example: 'Meu Restaurante'
                },
                slug: {
                  type: 'string',
                  description: 'Slug único do menu (URL amigável)',
                  example: 'meu-restaurante'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Restaurante criado com sucesso',
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
                    example: 'Legal! Menu criado com sucesso!'
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
  '/restaurant/{id}': {
    put: {
      tags: ['Restaurante'],
      summary: 'Atualizar configurações do restaurante',
      description: 'Atualiza as configurações de um restaurante específico',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do restaurante a ser atualizado',
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
                  description: 'Nome do restaurante',
                  example: 'Restaurante Atualizado'
                },
                slug: {
                  type: 'string',
                  description: 'Slug do menu',
                  example: 'restaurante-atualizado'
                },
                title: {
                  type: 'string',
                  description: 'Título do restaurante',
                  example: 'Novo Título'
                },
                description: {
                  type: 'string',
                  description: 'Descrição do restaurante',
                  example: 'Nova descrição do restaurante'
                },
                logoUrl: {
                  type: 'string',
                  description: 'URL do logo do restaurante',
                  example: 'https://example.com/novo-logo.png'
                },
                address: {
                  type: 'string',
                  description: 'Endereço do restaurante',
                  example: 'Nova Rua, 456'
                },
                themeColor: {
                  type: 'string',
                  description: 'Cor principal do tema',
                  example: '#FF6B6B'
                },
                themeColorSecondary: {
                  type: 'string',
                  description: 'Cor secundária do tema',
                  example: '#4ECDC4'
                },
                whatsapp: {
                  type: 'string',
                  description: 'Número do WhatsApp',
                  example: '+5511999999999'
                },
                email: {
                  type: 'string',
                  description: 'Email de contato',
                  example: 'contato@restaurante.com'
                },
                phoneNumber: {
                  type: 'string',
                  description: 'Número de telefone',
                  example: '+5511888888888'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Restaurante atualizado com sucesso',
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
                    example: 'Perfeito! Restaurante atualizado com sucesso!'
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
                    example: 'Ops! Parece que não existe esse restaurante.'
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
      tags: ['Restaurante'],
      summary: 'Deletar configurações do restaurante',
      description: 'Remove um restaurante específico e suas configurações',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID do restaurante a ser deletado',
          schema: {
            type: 'string'
          },
          example: 'clx1234567890abcdef'
        }
      ],
      responses: {
        200: {
          description: 'Restaurante deletado com sucesso',
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
                    example: 'Ok! Restaurant deletado com sucesso!'
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
                    example: 'Ops! Parece que não existe esse restaurante.'
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
