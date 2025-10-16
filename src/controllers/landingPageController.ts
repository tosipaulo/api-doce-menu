import { Response, Request } from "express";
import { prisma } from '../lib/prisma'

export const getHomePage = async (req: Request, res: Response) => {
    
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
                }
            },
            take: 6,
            orderBy: {
                createdAt: 'desc'
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