export const uploadPaths = {
  '/upload': {
    post: {
      tags: ['Upload'],
      summary: 'Fazer upload de imagem',
      description: 'Faz upload de uma imagem para o Cloudinary e atualiza o registro correspondente (restaurante ou produto)',
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: ['file', 'type', 'id'],
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  description: 'Arquivo de imagem para upload (JPG, PNG, etc.)'
                },
                type: {
                  type: 'string',
                  enum: ['restaurant', 'product', 'logo'],
                  description: 'Tipo de registro para atualizar',
                  example: 'restaurant'
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Upload realizado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  erro: {
                    type: 'boolean',
                    example: false
                  },
                  message: {
                    type: 'string',
                    example: 'Perfeito! Sua imagem foi enviada com sucesso.'
                  },
                  imageUrl: {
                    type: 'string',
                    description: 'URL da imagem no Cloudinary',
                    example: 'https://res.cloudinary.com/example/image/upload/v1234567890/restaurant_images/abc123.jpg'
                  }
                }
              }
            }
          }
        },
        '400': {
          description: 'Dados inválidos ou arquivo não enviado',
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
                    example: 'Ops! Parece que nenhum arquivo foi enviado.'
                  }
                }
              }
            }
          }
        },
        '403': {
          description: 'Acesso negado - registro não encontrado ou não pertence ao usuário',
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
                    example: 'Ops! Restaurante não encontrado.'
                  }
                }
              }
            }
          }
        },
        '401': {
          description: 'Não autorizado - token de autenticação inválido ou ausente',
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
                    example: 'Token de autenticação inválido'
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
                    type: 'string',
                    example: 'Internal server error'
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
