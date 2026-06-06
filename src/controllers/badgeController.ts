import { Response } from "express";
import { prisma } from '../lib/prisma';
import { CustomRequest } from "../types/CustomRequest";

export const getBadges = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId } = req.query as { menuId?: string };

  try {
    const menu = await prisma.menu.findFirst({ where: { id: menuId, userId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: 'Ops! Menu não encontrado.' });
    }

    const badges = await prisma.badge.findMany({ where: { menuId: menu.id } });

    return res.status(200).json({ error: false, badges });
  } catch (error) {
    console.error('Erro ao buscar selos:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const createBadge = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId, label, icon } = req.body;

  if (!menuId || !label) {
    return res.status(400).json({ error: true, message: 'Ops! menuId e label são obrigatórios.' });
  }

  try {
    const menu = await prisma.menu.findFirst({ where: { id: menuId, userId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: 'Ops! Menu não encontrado.' });
    }

    const badge = await prisma.badge.create({
      data: { menuId, label, icon: icon || null },
    });

    return res.status(201).json({ error: false, message: 'Selo criado com sucesso!', badge });
  } catch (error) {
    console.error('Erro ao criar selo:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const updateBadge = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { menuId, ...rest } = req.body;

  if (!menuId) {
    return res.status(400).json({ error: true, message: 'Ops! menuId é obrigatório.' });
  }

  try {
    const badge = await prisma.badge.findFirst({
      where: { id, menu: { id: menuId, userId } },
    });

    if (!badge) {
      return res.status(404).json({ error: true, message: 'Ops! Selo não encontrado.' });
    }

    await prisma.badge.update({ where: { id: badge.id }, data: rest });

    return res.status(200).json({ error: false, message: 'Selo atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar selo:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const deleteBadge = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id, menuId } = req.params;

  try {
    const badge = await prisma.badge.findFirst({
      where: { id, menu: { id: menuId, userId } },
    });

    if (!badge) {
      return res.status(404).json({ error: true, message: 'Ops! Selo não encontrado.' });
    }

    await prisma.badge.delete({ where: { id: badge.id } });

    return res.status(200).json({ error: false, message: 'Selo deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar selo:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};
