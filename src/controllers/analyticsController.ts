import { Response, Request } from "express";
import { prisma } from "../lib/prisma";
import { CustomRequest } from "../types/CustomRequest";

const PERIOD_DAYS: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };

export const getAnalytics = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  const { menuId, period = '30d' } = req.query as { menuId?: string; period?: string };

  if (!menuId) {
    return res.status(400).json({ error: true, message: "Ops! 'menuId' é obrigatório." });
  }

  if (!PERIOD_DAYS[period]) {
    return res.status(400).json({ error: true, message: "Ops! 'period' deve ser '7d', '30d' ou '90d'." });
  }

  try {
    const menu = await prisma.menu.findFirst({ where: { id: menuId, userId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: 'Ops! Menu não encontrado.' });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - PERIOD_DAYS[period]);

    const events = await prisma.analytics.findMany({
      where: { menuId, createdAt: { gte: startDate } },
      include: { product: { select: { id: true, name: true } } },
    });

    const totalViews = events.filter(e => e.action === 'view').length;
    const totalClicks = events.filter(e => e.action === 'click').length;

    const clicksByProduct = events
      .filter(e => e.action === 'click' && e.productId)
      .reduce((acc, e) => {
        const key = e.productId!;
        if (!acc[key]) acc[key] = { productId: key, name: e.product?.name ?? 'Produto removido', clicks: 0 };
        acc[key].clicks++;
        return acc;
      }, {} as Record<string, { productId: string; name: string; clicks: number }>);

    const topProducts = Object.values(clicksByProduct)
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);

    const viewsByDay = events
      .filter(e => e.action === 'view')
      .reduce((acc, e) => {
        const day = e.createdAt.toISOString().split('T')[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const dailyViews = Object.entries(viewsByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return res.status(200).json({
      error: false,
      period,
      totals: { views: totalViews, clicks: totalClicks },
      topProducts,
      dailyViews,
    });

  } catch (error) {
    console.error('Erro ao buscar analytics:', error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor' });
  }
};

export const createAnalytics = async (req: Request, res: Response) => {
  try {
    const { menuId, productId, action } = req.body as {
      menuId?: string;
      productId?: string | null;
      action?: string;
    };

    if (!menuId || !action) {
      return res.status(400).json({
        error: true,
        message: "Ops! 'menuId' e 'action' são obrigatórios.",
      });
    }

    const allowedActions = new Set(["view", "click"]);
    if (!allowedActions.has(action)) {
      return res.status(400).json({
        error: true,
        message: "Ops! Ação inválida. Use 'view' ou 'click'.",
      });
    }

    // Verifica se o menu existe
    const menu = await prisma.menu.findFirst({ where: { id: menuId } });
    if (!menu) {
      return res.status(404).json({ error: true, message: "Ops! Menu não encontrado." });
    }

    // Se informado productId, valida se pertence ao menu
    if (productId) {
      const product = await prisma.product.findFirst({ where: { id: productId, menuId } });
      if (!product) {
        return res.status(400).json({ error: true, message: "Produto inválido para este menu." });
      }
    }

    const analytics = await prisma.analytics.create({
      data: {
        menuId,
        productId: productId || null,
        action,
      },
    });

    return res.status(201).json({
      error: false,
      message: "Legal! Evento de analytics registrado com sucesso!",
      analytics,
    });
  } catch (error) {
    console.error("Erro ao criar analytics:", error);
    return res.status(500).json({ error: true, message: "Erro interno do servidor" });
  }
};
