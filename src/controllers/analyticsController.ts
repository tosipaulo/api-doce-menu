import { Response, Request } from "express";
import { prisma } from "../lib/prisma";
import { CustomRequest } from "../types/CustomRequest";

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
