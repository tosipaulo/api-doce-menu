export const landingPagePaths = {
  '/landing-page': {
    get: {
      tags: ['Landing Page'],
      summary: 'Dados completos da landing page pública',
      description: 'Retorna todos os dados necessários para montar a página pública do estabelecimento. Endpoint público, não requer autenticação.',
      parameters: [
        {
          name: 'slug',
          in: 'query',
          required: true,
          description: 'Slug do menu do estabelecimento',
          schema: { type: 'string' },
          example: 'minha-doceria'
        }
      ],
      responses: {
        200: {
          description: 'Dados da landing page retornados com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: false },
                  restaurant: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: 'clx1234567890abcdef' },
                      name: { type: 'string', example: 'Minha Doceria' },
                      badgeText: { type: 'string', example: 'Feito com amor' },
                      title: { type: 'string', example: 'O melhor jeito de' },
                      subtitle: { type: 'string', example: 'terminar o seu dia' },
                      description: { type: 'string', example: 'Doces caseiros feitos com amor.' },
                      logoUrl: { type: 'string', nullable: true, example: 'https://res.cloudinary.com/example/logo.png' },
                      imagemHighlight: { type: 'string', nullable: true, example: 'https://res.cloudinary.com/example/highlight.png' },
                      address: { type: 'string', nullable: true, example: 'Rua das Flores, 123' },
                      themeColor: { type: 'string', example: 'rose' },
                      themeColorSecondary: { type: 'string', example: 'amber' },
                      whatsapp: { type: 'string', nullable: true, example: '5511999999999' },
                      email: { type: 'string', nullable: true, example: 'contato@doceria.com' },
                      phoneNumber: { type: 'string', nullable: true, example: '5511888888888' },
                      menu: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', example: 'clx1234567890abcdef' },
                          name: { type: 'string', example: 'Menu - Minha Doceria' },
                          slug: { type: 'string', example: 'minha-doceria' }
                        }
                      }
                    }
                  },
                  products: {
                    type: 'array',
                    description: '6 produtos mais recentes',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clx9876543210fedcba' },
                        name: { type: 'string', example: 'Brigadeiro de chocolate' },
                        description: { type: 'string', nullable: true, example: 'Brigadeiro belga com granulado' },
                        price: { type: 'number', nullable: true, example: 5.90 },
                        imageUrl: { type: 'string', nullable: true, example: 'https://res.cloudinary.com/example/product.png' },
                        categoryId: { type: 'string', nullable: true, example: 'clxcat123' }
                      }
                    }
                  },
                  categories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clxcat123' },
                        name: { type: 'string', example: 'Doces' }
                      }
                    }
                  },
                  testimonials: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clxtest123' },
                        name: { type: 'string', example: 'Maria Silva' },
                        message: { type: 'string', example: 'Melhor doceria da cidade!' },
                        avatarUrl: { type: 'string', nullable: true, example: null },
                        rating: { type: 'integer', example: 5 },
                        createdAt: { type: 'string', format: 'date-time' }
                      }
                    }
                  },
                  howItWorks: {
                    type: 'array',
                    description: 'Ordenado pelo campo order ASC',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clxhow123' },
                        title: { type: 'string', example: 'Escolha seus doces' },
                        description: { type: 'string', example: 'Navegue pelo cardápio e escolha.' },
                        icon: { type: 'string', nullable: true, example: 'cake' },
                        order: { type: 'integer', example: 1 }
                      }
                    }
                  },
                  externalLinks: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clxlink123' },
                        type: { type: 'string', example: 'whatsapp' },
                        label: { type: 'string', example: 'Peça pelo WhatsApp' },
                        url: { type: 'string', example: 'https://wa.me/5511999999999' }
                      }
                    }
                  },
                  badges: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: 'clxbadge123' },
                        label: { type: 'string', example: 'Feito com amor' },
                        icon: { type: 'string', nullable: true, example: 'heart' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Slug não informado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Ops! O url do estabelecimento é obrigatório.' }
                }
              }
            }
          }
        },
        404: {
          description: 'Estabelecimento não encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Restaurante não encontrado.' }
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
