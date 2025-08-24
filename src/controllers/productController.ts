import { Response } from "express";
import { prisma } from '../lib/prisma'
import { CustomRequest } from "../types/CustomRequest";

export const getProduct = async (req: CustomRequest, res: Response) => {

    const userId = req.userId;
    const { menuId, slug } = req.body;

    try {

        const products = await prisma.product.findMany({
            where: {
                menu: {
                    id: menuId,
                    userId,
                    slug
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                imageUrl: true,
                category: true
            },
        });

        if (!products.length) {
            return res.status(404).json({
                error: true,
                message: 'Ops! Produto não encontrado.',
            });
        }

        // let grouped;

        // if (products.some(p => p.category)) {
        //     grouped = products.reduce((acc, product) => {
        //         const key = product.category?.name || "Sem categoria";
        //         if (!acc[key]) acc[key] = [];
        //         acc[key].push(product);
        //         return acc;
        //     }, {} as Record<string, typeof products>);
        // } else {
        //     grouped = products;
        // }

        return res.status(200).json({
            error: false,
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

export const createProduct = async (req: CustomRequest, res: Response) => {
  const { name, description, price, menuId, categoryId } = req.body;
  const userId = req.userId;

  if (!name || !menuId || !price) {
    return res.status(400).json({
      error: true,
      message: "Todos os campos são obrigatórios.",
    });
  }

  try {

    const menu = await prisma.menu.findFirst({
      where: { id: menuId, userId },
    });

    if (!menu) {
      return res.status(404).json({
        error: true,
        message: "Ops! Menu não encontrado.",
      });
    }

    if (categoryId) {
      const category = await prisma.category.findFirst({
        where: { id: categoryId, menuId },
      });

      if (!category) {
        return res.status(400).json({ error: true, message: "Categoria inválida para este menu" });
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        menuId,
        categoryId: categoryId || null,
      },
    });

    return res.status(201).json({
      error: false,
      message: "Legal! Produto criado com sucesso!",
      product
    });

  } catch (error: any) {
    console.error("Erro ao criar o produto:", error);
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
      return res.status(400).json({ error: true, message: 'Ops! Esse slug já está em uso.' });
    }

    return res.status(500).json({
      error: true,
      message: "Erro interno do servidor",
    });
  }
};

export const updateProduct = async (req: CustomRequest, res: Response) => {

    const userId = req.userId;
    const { id } = req.params;
    const { menuId, categoryId, ...rest } = req.body;

    if (!menuId) {
        return res.status(400).json({
            error: true,
            message: "Ops! É necessário informar o menu.",
        });
    }

    try {

        const menu = await prisma.menu.findFirst({
            where: { id: menuId, userId },
        });

        if (!menu) {
            return res.status(404).json({
                error: true,
                message: "Ops! Menu não encontrado.",
            });
        }

        if (categoryId) {
            const category = await prisma.category.findFirst({
                where: { id: categoryId, menuId },
            });

            if (!category) {
                return res.status(400).json({ error: true, message: "Categoria inválida para este menu" });
            }
        }

        const product = await prisma.product.findFirst({
            where: {
                id,
                menu: {
                    id: menuId,
                    userId,
                },
            },
            include: {
                category: true,
            },
        });


        if(!product) {
            return res.status(422).send({
                error: true,
                message: 'Ops! Parece que não existe esse produto.'
            });
        }

        await prisma.product.update({
            where: { id: product.id },
            data: {
                ...rest,
                ...(categoryId && { categoryId }),
            },
        });

    return res.status(200).json({
      error: false,
      message: 'Perfeito! Seu produto atualizado com sucesso!'
    });

  } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Erro interno do servidor",
        }); 
  }

}

export const deleteProduct = async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const { id, menuId } = req.params;

    try {

        const product = await prisma.product.findFirst({
            where: {
                AND: [
                    { menu: { userId, id: menuId } },
                    { id }
                ]
            }
        });

        if(!product) {
            return res.status(422).send({
                error: true,
                message: 'Ops! Parece que não existe esse produto.'
            });
        }

        await prisma.product.delete({
            where: { id: product.id }
        });

        return res.status(200).json({
            error: false,
            message: 'Ok! Produto deletado com sucesso!'
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Erro interno do servidor",
        }); 
    }
};
