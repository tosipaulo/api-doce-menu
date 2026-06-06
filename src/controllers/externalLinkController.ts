import { Response } from "express";
import { prisma } from '../lib/prisma';
import { CustomRequest } from "../types/CustomRequest";

const ALLOWED_TYPES = new Set(['whatsapp', 'ifood', 'ubereats', 'rappi', 'instagram', 'facebook', 'site']);

export const getExternalLinks = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId } = req.query as { menuId?: string };

  try {
    const menu = await prisma.menu.findFirst({ where: { id: menuId, userId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: 'Ops! Menu não encontrado.' });
    }

    const externalLinks = await prisma.externalLink.findMany({
      where: { menuId: menu.id },
    });

    return res.status(200).json({ error: false, externalLinks });
  } catch (error) {
    console.error('Erro ao buscar links externos:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const createExternalLink = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId, type, label, url } = req.body;

  if (!menuId || !type || !label || !url) {
    return res.status(400).json({ error: true, message: 'Ops! menuId, type, label e url são obrigatórios.' });
  }

  if (!ALLOWED_TYPES.has(type)) {
    return res.status(400).json({
      error: true,
      message: `Ops! type inválido. Valores aceitos: ${[...ALLOWED_TYPES].join(', ')}.`,
    });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: true, message: 'Ops! url inválida.' });
  }

  try {
    const menu = await prisma.menu.findFirst({ where: { id: menuId, userId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: 'Ops! Menu não encontrado.' });
    }

    const externalLink = await prisma.externalLink.create({
      data: { menuId, type, label, url },
    });

    return res.status(201).json({ error: false, message: 'Link criado com sucesso!', externalLink });
  } catch (error) {
    console.error('Erro ao criar link externo:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const updateExternalLink = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { menuId, type, url, ...rest } = req.body;

  if (!menuId) {
    return res.status(400).json({ error: true, message: 'Ops! menuId é obrigatório.' });
  }

  if (type && !ALLOWED_TYPES.has(type)) {
    return res.status(400).json({
      error: true,
      message: `Ops! type inválido. Valores aceitos: ${[...ALLOWED_TYPES].join(', ')}.`,
    });
  }

  if (url) {
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: true, message: 'Ops! url inválida.' });
    }
  }

  try {
    const link = await prisma.externalLink.findFirst({
      where: { id, menu: { id: menuId, userId } },
    });

    if (!link) {
      return res.status(404).json({ error: true, message: 'Ops! Link não encontrado.' });
    }

    await prisma.externalLink.update({
      where: { id: link.id },
      data: { ...rest, ...(type && { type }), ...(url && { url }) },
    });

    return res.status(200).json({ error: false, message: 'Link atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar link externo:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const deleteExternalLink = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id, menuId } = req.params;

  try {
    const link = await prisma.externalLink.findFirst({
      where: { id, menu: { id: menuId, userId } },
    });

    if (!link) {
      return res.status(404).json({ error: true, message: 'Ops! Link não encontrado.' });
    }

    await prisma.externalLink.delete({ where: { id: link.id } });

    return res.status(200).json({ error: false, message: 'Link deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar link externo:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};
