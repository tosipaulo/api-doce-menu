import { Response } from "express";
import { prisma } from '../lib/prisma';
import { CustomRequest } from "../types/CustomRequest";

export const getTestimonials = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId } = req.query as { menuId?: string };

  try {
    const menu = await prisma.menu.findFirst({ where: { id: menuId, userId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: 'Ops! Menu não encontrado.' });
    }

    const testimonials = await prisma.testimonial.findMany({
      where: { menuId: menu.id },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ error: false, testimonials });
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const createTestimonial = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId, name, message, avatarUrl, rating } = req.body;

  if (!menuId || !name || !message || rating === undefined) {
    return res.status(400).json({ error: true, message: 'Ops! menuId, name, message e rating são obrigatórios.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: true, message: 'Ops! rating deve ser entre 1 e 5.' });
  }

  try {
    const menu = await prisma.menu.findFirst({ where: { id: menuId, userId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: 'Ops! Menu não encontrado.' });
    }

    const testimonial = await prisma.testimonial.create({
      data: { menuId, name, message, avatarUrl: avatarUrl || null, rating: Number(rating) },
    });

    return res.status(201).json({ error: false, message: 'Depoimento criado com sucesso!', testimonial });
  } catch (error) {
    console.error('Erro ao criar depoimento:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const updateTestimonial = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id } = req.params;
  const { menuId, rating, ...rest } = req.body;

  if (!menuId) {
    return res.status(400).json({ error: true, message: 'Ops! menuId é obrigatório.' });
  }

  if (rating !== undefined && (rating < 1 || rating > 5)) {
    return res.status(400).json({ error: true, message: 'Ops! rating deve ser entre 1 e 5.' });
  }

  try {
    const testimonial = await prisma.testimonial.findFirst({
      where: { id, menu: { id: menuId, userId } },
    });

    if (!testimonial) {
      return res.status(404).json({ error: true, message: 'Ops! Depoimento não encontrado.' });
    }

    await prisma.testimonial.update({
      where: { id: testimonial.id },
      data: { ...rest, ...(rating !== undefined && { rating: Number(rating) }) },
    });

    return res.status(200).json({ error: false, message: 'Depoimento atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar depoimento:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};

export const deleteTestimonial = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { id, menuId } = req.params;

  try {
    const testimonial = await prisma.testimonial.findFirst({
      where: { id, menu: { id: menuId, userId } },
    });

    if (!testimonial) {
      return res.status(404).json({ error: true, message: 'Ops! Depoimento não encontrado.' });
    }

    await prisma.testimonial.delete({ where: { id: testimonial.id } });

    return res.status(200).json({ error: false, message: 'Depoimento deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar depoimento:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor.' });
  }
};
