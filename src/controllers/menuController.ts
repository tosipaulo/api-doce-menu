import { Response } from "express";
import { prisma } from '../lib/prisma'
import { CustomRequest } from "../types/CustomRequest";

export const getMenu = async (req: CustomRequest, res: Response) => {

    const userId = req.userId;

    try {
        const menu = await prisma.menu.findFirst({
            where: {
                userId: userId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                userId: false
            },
        });

        return res.status(200).json({
            error: false,
            menu,
        });

    } catch (error) {
        console.error("Erro ao buscar o menu:", error);
        return res.status(500).json({
            error: true,
            message: "Erro interno do servidor",
        });
    }
};

export const createMenu = async (req: CustomRequest, res: Response) => {
  const { name, slug } = req.body;
  const userId = req.userId;

  if (!name || !slug) {
    return res.status(400).json({
      error: true,
      message: "Todos os campos são obrigatórios.",
    });
  }

  try {
    const newMenu = await prisma.menu.create({
      data: {
        name,
        slug,
        user: {
          connect: { id: userId },
        },
        restaurantSettings: { 
            create: { name }
        },
      },
    });

    return res.status(201).json({
      error: false,
      message: "Menu criado com sucesso!",
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

export const updateMenu = async (req: CustomRequest, res: Response) => {

    const userId = req.userId;
    const { id } = req.params;

    try {

        const menu = await prisma.menu.findFirst({
            where: { 
                AND: [
                    { userId: userId },
                    { id }
                ]
            }
        });

        if(!menu) {
            return res.status(422).send({
                error: true,
                message: 'Ops! Parece que não existe esse menu.'
            });
        }

        await prisma.menu.update({
            where: {id: menu.id},
            data: req.body
        });

    return res.status(200).json({
      error: false,
      message: 'Perfeito! Menu atualizado com sucesso!'
    });

  } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Erro interno do servidor",
        }); 
  }

}

export const deleteMenu = async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const { id } = req.params;

    try {

        const menu = await prisma.menu.findFirst({
            where: { 
                AND: [
                    { userId: userId },
                    { id }
                ]
            }
        });

        if(!menu) {
            return res.status(422).send({
                error: true,
                message: 'Ops! Parece que não existe esse menu.'
            });
        }

        await prisma.menu.delete({
            where: {id: menu.id}
        });

        return res.status(200).json({
            error: false,
            message: 'Ok! Menu deletado com sucesso!'
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Erro interno do servidor",
        }); 
    }
};
