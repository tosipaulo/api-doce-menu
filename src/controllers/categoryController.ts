import { Response } from "express";
import { prisma } from '../lib/prisma'
import { CustomRequest } from "../types/CustomRequest";

export const getCategory = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId, slug } = req.body;

  try {
    const categories = await prisma.category.findMany({
      where: {
        menu: {
          id: menuId,
          userId,
          slug,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!categories.length) {
      return res.status(404).json({
        error: true,
        message: 'Ops! Categoria não encontrada.',
      });
    }

    return res.status(200).json({
      error: false,
      categories,
    });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return res.status(500).json({
      error: true,
      message: "Erro interno do servidor",
    });
  }
};

export const createCategory = async (req: CustomRequest, res: Response) => {
  const { name, menuId } = req.body;
  const userId = req.userId;

  if (!name || !menuId) {
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

    const category = await prisma.category.create({
      data: {
        name,
        menuId,
      },
    });

    return res.status(201).json({
      error: false,
      message: "Legal! Categoria criada com sucesso!",
      category,
    });
  } catch (error) {
    console.error("Erro ao criar a categoria:", error);
    return res.status(500).json({
      error: true,
      message: "Erro interno do servidor",
    });
  }
};

export const updateCategory = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { menuId, ...rest } = req.body;

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

    const category = await prisma.category.findFirst({
      where: {
        id,
        menu: {
          id: menuId,
          userId,
        },
      },
    });

    if (!category) {
      return res.status(422).send({
        error: true,
        message: 'Ops! Parece que não existe essa categoria.'
      });
    }

    await prisma.category.update({
      where: { id: category.id },
      data: {
        ...rest,
      },
    });

    return res.status(200).json({
      error: false,
      message: 'Perfeito! Sua categoria foi atualizada com sucesso!'
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Erro interno do servidor",
    });
  }
}

export const deleteCategory = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id, menuId } = req.params;

  try {
    const category = await prisma.category.findFirst({
      where: {
        AND: [
          { menu: { userId, id: menuId } },
          { id },
        ],
      },
    });

    if (!category) {
      return res.status(422).send({
        error: true,
        message: 'Ops! Parece que não existe essa categoria.'
      });
    }

    await prisma.category.delete({
      where: { id: category.id },
    });

    return res.status(200).json({
      error: false,
      message: 'Ok! Categoria deletada com sucesso!'
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Erro interno do servidor",
    });
  }
};

