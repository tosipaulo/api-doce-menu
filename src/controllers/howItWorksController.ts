import { Response } from "express";
import { prisma } from '../lib/prisma';
import { CustomRequest } from "../types/CustomRequest";

export const getHowItWorks = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId } = req.query as { menuId?: string };

  try {
    const menu = await prisma.menu.findFirst({ where: { id: menuId, userId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: 'Ops! Menu não encontrado.' });
    }

    const steps = await prisma.howItWorksStep.findMany({
      where: { menuId: menu.id },
      orderBy: { order: 'asc' },
    });

    return res.status(200).json({ error: false, steps });
  } catch (error) {
    console.error('Erro ao buscar etapas:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const createHowItWorks = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId, title, description, icon, order } = req.body;

  if (!menuId || !title || !description || order === undefined) {
    return res.status(400).json({ error: true, message: 'Ops! menuId, title, description e order são obrigatórios.' });
  }

  try {
    const menu = await prisma.menu.findFirst({ where: { id: menuId, userId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: 'Ops! Menu não encontrado.' });
    }

    const step = await prisma.howItWorksStep.create({
      data: { menuId, title, description, icon: icon || null, order: Number(order) },
    });

    return res.status(201).json({ error: false, message: 'Etapa criada com sucesso!', step });
  } catch (error) {
    console.error('Erro ao criar etapa:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const updateHowItWorks = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { menuId, order, ...rest } = req.body;

  if (!menuId) {
    return res.status(400).json({ error: true, message: 'Ops! menuId é obrigatório.' });
  }

  try {
    const step = await prisma.howItWorksStep.findFirst({
      where: { id, menu: { id: menuId, userId } },
    });

    if (!step) {
      return res.status(404).json({ error: true, message: 'Ops! Etapa não encontrada.' });
    }

    await prisma.howItWorksStep.update({
      where: { id: step.id },
      data: { ...rest, ...(order !== undefined && { order: Number(order) }) },
    });

    return res.status(200).json({ error: false, message: 'Etapa atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar etapa:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const deleteHowItWorks = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id, menuId } = req.params;

  try {
    const step = await prisma.howItWorksStep.findFirst({
      where: { id, menu: { id: menuId, userId } },
    });

    if (!step) {
      return res.status(404).json({ error: true, message: 'Ops! Etapa não encontrada.' });
    }

    await prisma.howItWorksStep.delete({ where: { id: step.id } });

    return res.status(200).json({ error: false, message: 'Etapa deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar etapa:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};
