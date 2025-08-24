import { Response } from "express";
import { prisma } from '../lib/prisma'
import { CustomRequest } from "../types/CustomRequest";

export const getRestaurantSettings = async (req: CustomRequest, res: Response) => {
    
    const userId = req.userId;
    const { slug } = req.query;

    if (!slug) {
        return res.status(400).json({
            error: true,
            message: "Ops! O url do estabelecimento é obrigatório.",
        });
    }

    try {
        const restaurant = await prisma.restaurantSettings.findFirst({
            where: {
                menu: {
                    userId,
                    slug: String(slug)
                }
            },
            include: {
                menu: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        userId: false
                    }
                }
            }
        });

        const products = await prisma.product.findMany({
            where: {
                menu: {
                    id: restaurant?.menu.id,
                    userId
                }
            },
            take: 6,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: false,
                name: true,
                description: true,
                price: true,
            }
        });


        if (!restaurant) {
            return res.status(404).json({
                error: true,
                message: 'Restaurante não encontrado.',
            });
        }

        return res.status(200).json({
            error: false,
            restaurant,
            products
        });

    } catch (error) {
        console.error("Erro ao buscar o restaurante:", error);
        return res.status(500).json({
            error: true,
            message: "Erro interno do servidor",
        });
    }
};

export const createRestaurantSettings = async (req: CustomRequest, res: Response) => {
  const { name, slug } = req.body;
  const userId = req.userId;

  if (!name || !slug) {
    return res.status(400).json({
      error: true,
      message: "Todos os campos são obrigatórios.",
    });
  }

  try {
    const newRestaurant = await prisma.restaurantSettings.create({
        data: {
            name,
            menu: {
                create: {
                    name: `Menu - ${name}`,
                    slug,
                    user: { connect: { id: userId } },
                },
            },
        },
    });

    return res.status(201).json({
      error: false,
      message: "Legal! Menu criado com sucesso!",
    });

  } catch (error: any) {
    console.error("Erro ao criar o menu:", error);
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
      return res.status(400).json({ error: true, message: 'Ops! Esse slug já está em uso.' });
    }

    return res.status(500).json({
      error: true,
      message: "Erro interno do servidor",
    });
  }
};

export const updateRestaurantSettings = async (req: CustomRequest, res: Response) => {

    const userId = req.userId;
    const { id } = req.params;
    const { slug, name, ...rest } = req.body;

    try {

        const restaurant = await prisma.restaurantSettings.findFirst({
            where: {
                id,
                menu: { userId },
            },
            include: { menu: true },
        });

        if(!restaurant) {
            return res.status(422).send({
                error: true,
                message: 'Ops! Parece que não existe esse restaurante.'
            });
        }

        await prisma.restaurantSettings.update({
            where: { id: restaurant.id },
            data: {
                ...rest,
                ...(slug || name ? {
                    ...(name && { name } ),
                    menu: {
                        update: {
                            ...(slug && { slug }),
                            ...(name && { name: `Menu - ${name}` })
                        }
                    },
                } : {}),
            },
        });

    return res.status(200).json({
      error: false,
      message: 'Perfeito! Restaurante atualizado com sucesso!'
    });

  } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Erro interno do servidor",
        }); 
  }

}

export const deleteRestaurantSettings = async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const { id } = req.params;

    try {

        const restaurant = await prisma.restaurantSettings.findFirst({
            where: {
                AND: [
                    { menu: { userId } },
                    { id }
                ]
            }
        });

        if(!restaurant) {
            return res.status(422).send({
                error: true,
                message: 'Ops! Parece que não existe esse restaurante.'
            });
        }

        await prisma.restaurantSettings.delete({
            where: {id: restaurant.id}
        });

        return res.status(200).json({
            error: false,
            message: 'Ok! Restaurant deletado com sucesso!'
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Erro interno do servidor",
        }); 
    }
};
