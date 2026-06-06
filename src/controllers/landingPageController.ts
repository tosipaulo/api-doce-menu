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
        const menu = await prisma.menu.findFirst({
            where: { slug: String(slug) },
            include: {
                restaurantSettings: true,
                products: {
                    take: 6,
                    orderBy: { createdAt: 'desc' },
                },
                categories: {
                    select: { id: true, name: true },
                },
                testimonials: {
                    orderBy: { createdAt: 'desc' },
                },
                howItWorks: {
                    orderBy: { order: 'asc' },
                },
                externalLinks: true,
                badges: true,
            },
        });

        if (!menu || !menu.restaurantSettings) {
            return res.status(404).json({
                error: true,
                message: 'Restaurante não encontrado.',
            });
        }

        const { restaurantSettings, products, categories, testimonials, howItWorks, externalLinks, badges } = menu;

        return res.status(200).json({
            error: false,
            restaurant: {
                ...restaurantSettings,
                menu: { id: menu.id, name: menu.name, slug: menu.slug },
            },
            products,
            categories,
            testimonials,
            howItWorks,
            externalLinks,
            badges,
        });

    } catch (error) {
        console.error("Erro ao buscar o restaurante:", error);
        return res.status(500).json({
            error: true,
            message: "Erro interno do servidor",
        });
    }
};