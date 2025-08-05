export const userPaths = {
  '/user': {
    post: {
      tags: ['Usuários'],
      summary: 'Criar novo usuário',
      description: 'Cria um novo usuário no sistema',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'email', 'password', 'phoneNumber'],
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome completo do usuário',
                  example: 'João Silva'
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email do usuário',
                  example: 'joao@example.com'
                },
                password: {
                  type: 'string',
                  description: 'Senha do usuário',
                  example: 'senha123'
                },
                phoneNumber: {
                  type: 'string',
                  description: 'Número de telefone do usuário',
                  example: '(11) 99999-9999'
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Usuário criado com sucesso',
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
                    example: 'Olá! João Silva, seu usuário foi criado com sucesso!'
                  },
                  user: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        example: 'João Silva'
                      },
                      email: {
                        type: 'string',
                        example: 'joao@example.com'
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-01-01T00:00:00.000Z'
                      }
                    }
                  },
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                  }
                }
              }
            }
          }
        },
        '400': {
          description: 'Dados obrigatórios não fornecidos',
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
                    example: 'Ops! Nome, e-mail, senha e telefone são obrigatórios.'
                  }
                }
              }
            }
          }
        },
        '409': {
          description: 'Email já existe',
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
                    example: 'Ops! Esse e-mail já existe.'
                  }
                }
              }
            }
          }
        },
        '500': {
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
                    example: 'Ops! Erro interno ao criar usuário'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/user/auth': {
    post: {
      tags: ['Usuários'],
      summary: 'Autenticar usuário',
      description: 'Autentica um usuário existente no sistema',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email do usuário',
                  example: 'joao@example.com'
                },
                password: {
                  type: 'string',
                  description: 'Senha do usuário',
                  example: 'senha123'
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Usuário autenticado com sucesso',
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
                    example: 'Olá! João Silva, você está autenticado com sucesso!'
                  },
                  user: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        example: 'João Silva'
                      },
                      email: {
                        type: 'string',
                        example: 'joao@example.com'
                      },
                      phoneNumber: {
                        type: 'string',
                        example: '(11) 99999-9999'
                      }
                    }
                  },
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                  }
                }
              }
            }
          }
        },
        '400': {
          description: 'Email ou senha não fornecidos',
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
                    example: 'Ops! E-mail e senha são obrigatórios.'
                  }
                }
              }
            }
          }
        },
        '401': {
          description: 'Credenciais inválidas',
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
                    example: 'Ops! E-mail ou senha incorreto.'
                  }
                }
              }
            }
          }
        },
        '404': {
          description: 'Usuário não encontrado',
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
                    example: 'Ops! Usuário não encontrado.'
                  }
                }
              }
            }
          }
        },
        '500': {
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
                    example: 'Ops! Erro interno ao autenticar usuário'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/user/forgot-password': {
    post: {
      tags: ['Usuários'],
      summary: 'Solicitar redefinição de senha',
      description: 'Envia um email com instruções para redefinir a senha',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email do usuário',
                  example: 'joao@example.com'
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Email de redefinição enviado com sucesso',
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
                    example: 'Instruções para redefinir sua senha foram enviadas para o seu e-mail.'
                  }
                }
              }
            }
          }
        },
        '400': {
          description: 'Email não fornecido ou erro no envio',
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
                    example: 'Ops! E-mail é obrigatório.'
                  }
                }
              }
            }
          }
        },
        '404': {
          description: 'Usuário não encontrado',
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
                    example: 'Ops! algo de errado! Tente novamente, por favor!'
                  }
                }
              }
            }
          }
        },
        '500': {
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
                    example: 'Ops! Erro interno ao solicitar redefinição de senha'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/user/reset-password': {
    post: {
      tags: ['Usuários'],
      summary: 'Redefinir senha',
      description: 'Redefine a senha do usuário usando token de redefinição',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'token', 'password'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email do usuário',
                  example: 'joao@example.com'
                },
                token: {
                  type: 'string',
                  description: 'Token de redefinição de senha',
                  example: 'abc123def456'
                },
                password: {
                  type: 'string',
                  description: 'Nova senha',
                  example: 'novaSenha123'
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Senha redefinida com sucesso',
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
                    example: 'Legal, nova senha alterada com sucesso!'
                  }
                }
              }
            }
          }
        },
        '400': {
          description: 'Dados obrigatórios não fornecidos ou token inválido',
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
                    example: 'Ops! E-mail, token e nova senha são obrigatórios.'
                  }
                }
              }
            }
          }
        },
        '500': {
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
                    example: 'Ops! Erro interno ao redefinir senha'
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